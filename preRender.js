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
import {enableProdMode, NgModule} from '@angular/core'
import {APP_BASE_HREF} from '@angular/common'
import {
    renderModule, renderModuleFactory, ServerModule
} from '@angular/platform-server'
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
    let defaultPath:string = ''
    /*
        NOTE: We have to reverse the url list to ensure that default paths are
        already registered before linking to them due to the fact that default
        paths are listed later to avoid shadowing non-default paths.
    */
    routes.reverse()
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
    // NOTE: We have to forward links cascades.
    for (const source:string in links)
        if (links.hasOwnProperty(`${links[source]}/**`))
            links[source] = links[`${links[source]}/**`]
    return {links, paths}
}
/**
 * Pre-renders given application routes to given target directory structure.
 * @param module - Application module to pre-render.
 * @param routes - Route or routes configuration object or array of paths to
 * pre-render.
 * @param component - Indicates whether given module is ahead of time compiled.
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
    module:Object,
    // IgnoreTypeCheck
    routes:string|Array<string>|Routes = [],
    component:Object|null = null,
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
    encoding:string = 'utf-8',
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
        renderScope.virtualConsole = new VirtualConsole()
        for (const name:string of [
            'assert', 'dir', 'error', 'info', 'log', 'time', 'timeEnd',
            'trace', 'warn'
        ])
            renderScope.virtualConsole.on(name, console[name].bind(console))
        renderScope.window = (new JSDOM(data, {
            runScripts: 'dangerously',
            virtualConsole: renderScope.virtualConsole
        })).window
        renderScope.domNodeToRetrieveInitialDataFrom = (
            typeof domNodeReferenceToRetrieveInitialDataFrom === 'string'
        ) ? renderScope.window.document.querySelector(
                domNodeReferenceToRetrieveInitialDataFrom
            ) : domNodeReferenceToRetrieveInitialDataFrom
        renderScope.basePath =
            renderScope.window.document.getElementsByTagName('base')[0].href
        for (const name:string in renderScope.window)
            if (
                renderScope.window.hasOwnProperty(name) &&
                !globalContext.hasOwnProperty(name) && (
                    globalVariableNamesToInject.length === 0 ||
                    globalVariableNamesToInject.includes(name)
                )
            ) {
                console.info(`Inject variable "${name}".`)
                // IgnoreTypeCheck
                globalContext[name] = renderScope.window[name]
            }
        Tools.plainObjectPrototypes = Tools.plainObjectPrototypes.concat(
            // IgnoreTypeCheck
            renderScope.window.Object.prototype)
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
                } = determinePaths(renderScope.basePath, routes)
                for (const sourcePath:string in result.links)
                    if (result.links.hasOwnProperty(sourcePath)) {
                        const realSourcePath:string = path.join(
                            targetDirectoryPath, sourcePath.substring(
                                // IgnoreTypeCheck
                                renderScope.basePath.length
                            ).replace(/^\/+(.+)/, '$1'))
                        links.push(realSourcePath)
                        const targetPath:string = path.join(
                            targetDirectoryPath,
                            result.links[sourcePath].substring(
                                // IgnoreTypeCheck
                                renderScope.basePath.length
                            ).replace(/^\/+(.+)/, '$1')) + '.html'
                        await makeDirectoryPath(path.dirname(
                            realSourcePath
                        ), async (error:?Error):Promise<void> => {
                            if (error)
                                return reject(error)
                            let stats:any = null
                            try {
                                stats = await new Promise((
                                    resolve:Function, reject:Function
                                ):void => fileSystem.lstat(realSourcePath, (
                                    error:any, stats:any
                                ):void => error ? reject(error) : resolve(
                                    stats)))
                            } catch (error) {
                                if (error.code !== 'ENOENT')
                                    throw error
                            }
                            if (stats && (
                                stats.isSymbolicLink() ||
                                stats.isFile()
                            ))
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
            // IgnoreTypeCheck
            urls = [renderScope.basePath]
        // endregion
        console.info(`Found ${urls.length} pre-renderable urls.`)
        enableProdMode()
        // region generate pre-rendered html files
        const results:Array<string> = []
        const filePaths:Array<string> = []
        // IgnoreTypeCheck
        for (const url:string of urls) {
            const filePath:string = path.join(targetDirectoryPath, (
                url === renderScope.basePath
            // IgnoreTypeCheck
            ) ? '/' : url.substring(renderScope.basePath.length).replace(
                    /^\/+(.+)/, '$1'
                )) + '.html'
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
                    if (component) {
                        // region create server pre-renderable module
                        /**
                         * Dummy server compatible root application module to
                         * pre-render.
                         */
                        @NgModule({
                            bootstrap: [component],
                            imports: [module, ServerModule],
                            providers: [{
                                provide: APP_BASE_HREF,
                                useValue: renderScope.basePath
                            }]
                        })
                        class ApplicationServerModule {}
                        // endregion
                        try {
                            result = await renderModule(
                                ApplicationServerModule, {document: data, url})
                        } catch (error) {
                            console.warn(
                                'Error occurred during dynamic pre-rendering' +
                                ` path "${url}": ` +
                                Tools.representObject(error))
                            return reject(error)
                        }
                    } else
                        try {
                            result = await renderModuleFactory(
                                module, {document: data, url})
                        } catch (error) {
                            console.warn(
                                'Error occurred during ahead of time ' +
                                `compiled pre-rendering path "${url}": ` +
                                Tools.representObject(error))
                            return reject(error)
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
export const renderScope:{
    basePath?:string;
    domNodeToRetrieveInitialDataFrom?:DomNode|null;
    virtualConsole?:Object;
    window?:Window;
} = {}
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
