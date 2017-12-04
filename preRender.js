// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module preRender */
'use strict'
/* !
    region header
    [Project page](https://bitbucket.org/posic/bpvwebapp)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012
    endregion
*/
// region imports
import type {DomNode, File, Window} from 'clientnode'
import Tools, {globalContext} from 'clientnode'
import {APP_INITIALIZER, enableProdMode, NgModule} from '@angular/core'
import {APP_BASE_HREF} from '@angular/common'
import {renderModule, ServerModule} from '@angular/platform-server'
import {Routes} from '@angular/router'
import fileSystem from 'fs'
import {JSDOM, VirtualConsole} from 'jsdom'
import makeDirectoryPath from 'mkdirp'
import path from 'path'
import PouchDBAdapterMemory from 'pouchdb-adapter-memory'
import removeDirectoryRecursively from 'rimraf'

import {
    applicationDomNodeSelector, globalVariableNameToRetrieveDataFrom
} from './index'
// endregion
/**
 * Determines pre-renderable paths from given angular routes configuration
 * object.
 * @param basePath - Applications base path.
 * @param routes - Routes configuration object to analyze.
 * @param root - Current components root path (usually only needed for
 * recursive function calls).
 * @returns Set of distinct paths and linkes representing redirects.
 */
export function determinePaths(
    basePath:string = '/', routes:Routes = [], root:string = ''
):{links:{[key:string]:string};paths:Set<string>} {
    let links:{[key:string]:string} = {}
    let paths:Set<string> = new Set()
    routes.reverse()
    let defaultPath:string = ''
    for (const route:Object of routes)
        if (route.hasOwnProperty('path')) {
            if (route.hasOwnProperty('redirectTo')) {
                if (route.path === '**')
                    if (route.redirectTo.startsWith('/'))
                        defaultPath = path.join(basePath, route.redirectTo)
                    else
                        defaultPath = path.join(
                            basePath, root, route.redirectTo)
                links[path.join(basePath, root, route.path)] = defaultPath
            } else if (route.path.includes(':')) {
                if (defaultPath)
                    paths.add(defaultPath)
                continue
            } else if (route.path !== '**' && !(route.hasOwnProperty(
                'children'
            ) && route.children[route.children.length - 1].path === '**'))
                paths.add(path.join(basePath, root, route.path))
            if (route.hasOwnProperty('children')) {
                const result:{
                    links:{[key:string]:string};
                    paths:Set<string>;
                } = determinePaths(basePath, route.children, path.join(
                    root, route.path))
                Tools.extendObject(links, result.links)
                paths = new Set([...paths, ...result.paths])
            }
        } else if (route.hasOwnProperty('children')) {
            const result:{
                links:{[key:string]:string};
                paths:Set<string>;
            } = determinePaths(basePath, route.children, root)
            Tools.extendObject(links, result.links)
            paths = new Set([...paths, ...result.paths])
        }
    return {links, paths}
}
/**
 * Pre-renders given application routes to given target directory structure.
 * @param component - Application component to pre-render.
 * @param module - Application module to pre-render.
 * @param routes - Route or routes configuration object or array of paths to
 * pre-render.
 * @param domNodeReferenceToRetrieveInitialDataFrom - A reference or instance
 * of a dom node to retrieve initial data from.
 * @param htmlFilePath - HTML file path to use as index.
 * @param globalVariableNamesToInject - Global variable names to inject into
 * the node context evaluated from given index html file.
 * @param targetDirectoryPath - Target directory path to generate pre-rendered
 * html files in.
 * @param scope - Object to inject into the global scope before running
 * pre-rendering.
 * @param encoding - Encoding to use for reading given html file reference.
 * @returns A promise which resolves to a list of pre-rendered html strings.
 */
export function render(
    component:Object,
    module:Object,
    // IgnoreTypeCheck
    routes:string|Array<string>|Routes = [],
    domNodeReferenceToRetrieveInitialDataFrom:DomNode|string =
    applicationDomNodeSelector,
    htmlFilePath:string = path.resolve(
        path.dirname(process.argv[1]), 'index.html'),
    globalVariableNamesToInject:string|Array<string> =
    globalVariableNameToRetrieveDataFrom,
    targetDirectoryPath:string = path.resolve(
        path.dirname(process.argv[1]), 'preRendered'),
    scope:Object = {[globalVariableNameToRetrieveDataFrom]: {configuration: {
        database: {
            connector: {adapter: 'memory'},
            plugins: [PouchDBAdapterMemory]
        }
    }}},
    encoding:string = 'utf-8'
):Promise<Array<string>> {
    globalVariableNamesToInject = [].concat(globalVariableNamesToInject)
    routes = [].concat(routes)
    return new Promise((
        resolve:Function, reject:Function
    // IgnoreTypeCheck
    ):void => fileSystem.readFile(htmlFilePath, {encoding}, async (
        error:?Error, data:string
    ):Promise<void> => {
        if (error)
            return reject(error)
        // region prepare environment
        const virtualConsole:Object = new VirtualConsole()
        for (const name:string of [
            'assert', 'dir', 'error', 'info', 'log', 'time', 'timeEnd',
            'trace', 'warn'
        ])
            virtualConsole.on(name, console[name].bind(console))
        const window:Window = (new JSDOM(data, {
            runScripts: 'dangerously', virtualConsole
        })).window
        const domNodeToRetrieveInitialDataFrom:DomNode|null = (
            typeof domNodeReferenceToRetrieveInitialDataFrom === 'string'
        ) ? window.document.querySelector(
                domNodeReferenceToRetrieveInitialDataFrom
            ) : domNodeReferenceToRetrieveInitialDataFrom
        const basePath:string = window.document.getElementsByTagName(
            'base'
        )[0].href
        for (const name:string in window)
            if (
                window.hasOwnProperty(name) &&
                !globalContext.hasOwnProperty(name) && (
                    globalVariableNamesToInject.length === 0 ||
                    globalVariableNamesToInject.includes(name)
                )
            ) {
                console.info(`Inject variable "${name}".`)
                globalContext[name] = window[name]
            }
        Tools.plainObjectPrototypes = Tools.plainObjectPrototypes.concat(
            // IgnoreTypeCheck
            window.Object.prototype)
        Tools.extendObject(true, globalContext, scope)
        // endregion
        // region determine pre-renderable paths
        const links:Array<string> = []
        let urls:Array<string>
        if (routes.length)
            if (typeof routes[0] === 'string')
                // IgnoreTypeCheck
                urls = routes
            else {
                const result:{
                    links:{[key:string]:string};
                    paths:Set<string>;
                } = determinePaths(basePath, routes)
                for (const sourcePath:string in result.links)
                    if (result.links.hasOwnProperty(sourcePath)) {
                        const realSourcePath:string = path.join(
                            targetDirectoryPath, sourcePath.substring(
                                basePath.length
                            ).replace(/^\/+(.+)/, '$1'))
                        links.push(realSourcePath)
                        const targetPath:string = path.join(
                            targetDirectoryPath,
                            result.links[sourcePath].substring(
                                basePath.length
                            ).replace(/^\/+(.+)/, '$1')) + '.html'
                        await makeDirectoryPath(path.dirname(
                            realSourcePath
                        ), async (error:?Error):Promise<void> => {
                            if (error)
                                return reject(error)
                            if (await Tools.isFile(realSourcePath))
                                await new Promise((
                                    resolve:Function, reject:Function
                                ):void => removeDirectoryRecursively(
                                    realSourcePath, (error:?Error):void =>
                                        error ? reject(error) : resolve()))
                            // IgnoreTypeCheck
                            fileSystem.symlink(targetPath, realSourcePath, (
                                error:?Error
                            ):void => error ? reject(error) : resolve())
                        })
                    }
                urls = Array.from(result.paths).sort()
            }
        else
            urls = [basePath]
        // endregion
        console.info(`Found ${urls.length} pre-renderable urls.`)
        // region create server pre-renderable module
        /**
         * Dummy server compatible root application module to pre-render.
         */
        @NgModule({
            bootstrap: [component],
            imports: [module, ServerModule],
            providers: [
                InitialDataService,
                {provide: APP_BASE_HREF, useValue: basePath}
            ].concat(domNodeToRetrieveInitialDataFrom ? {
                deps: [InitialDataService],
                multi: true,
                provide: APP_INITIALIZER,
                useFactory: (initialData:InitialDataService):void =>
                    initialData.retrieveFromDomNode(
                        domNodeToRetrieveInitialDataFrom)
            } : [])
        })
        class ApplicationServerModule {}
        // endregion
        enableProdMode()
        // region generate pre-rendered html files
        const results:Array<string> = []
        const filePaths:Array<string> = []
        for (const url:string of urls) {
            const filePath:string = path.join(targetDirectoryPath, (
                url === basePath
            ) ? '/' :
                url.substring(basePath.length).replace(/^\/+(.+)/, '$1')) +
                '.html'
            filePaths.push(filePath)
            try {
                await new Promise((
                    resolve:Function, reject:Function
                ):void => makeDirectoryPath(path.dirname(filePath), async (
                    error:?Error
                ):Promise<void> => {
                    if (error)
                        return reject(error)
                    console.info(`Pre-render url "${url}".`)
                    let result:string = ''
                    try {
                        result = await renderModule(
                            ApplicationServerModule, {document: data, url})
                    } catch (error) {
                        console.warn(
                            'Error occurred during pre-rendering path "' +
                            `${url}": ${Tools.representObject(error)}`)
                    }
                    results.push(result)
                    console.info(`Write file "${filePath}".`)
                    fileSystem.writeFile(filePath, result, ((
                        error:?Error
                    ):void => error ? reject(error) : resolve(result)))
                }))
            } catch (error) {
                reject(error)
                return
            }
        }
        // endregion
        // region tidy up
        const files:Array<File> = await Tools.walkDirectoryRecursively(
            targetDirectoryPath)
        files.reverse()
        let currentFile:?File = null
        for (const file:File of files)
            if (filePaths.includes(file.path) || links.includes(file.path))
                currentFile = file
            else if (!(currentFile && currentFile.path.startsWith(file.path)))
                await new Promise((resolve:Function, reject:Function):void =>
                    removeDirectoryRecursively(file.path, (
                        error:?Error
                    ):void => error ? reject(error) : resolve()))
        // endregion
        resolve(results)
    }))
}
export default render
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
