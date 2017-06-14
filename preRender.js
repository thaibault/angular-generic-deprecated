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
import {default as Tools, globalContext} from 'clientnode'
import {enableProdMode, NgModule} from '@angular/core'
import {APP_BASE_HREF} from '@angular/common'
import {renderModule, ServerModule} from '@angular/platform-server'
import {Routes} from '@angular/router'
import fileSystem from 'fs'
import {JSDOM, VirtualConsole} from 'jsdom'
import makeDirectoryPath from 'mkdirp'
import path from 'path'
import 'zone.js/dist/zone-node'
// endregion
/**
 * Determines pre-renderable paths from given angular routes configuration
 * object.
 * @param basePath - Applications base path.
 * @param routes - Routes configuration object to analyze.
 * @param root - Current components root path (usually only needed for
 * recursive function calls).
 * @returns Set of distinct paths.
 */
export function determinePaths(
    basePath:string = '/', routes:Routes = [], root:string = ''
):Set<string> {
    let paths:Set<string> = new Set()
    routes.reverse()
    let defaultParameter:string = ''
    for (const route:Object of routes)
        if (route.hasOwnProperty('path')) {
            if (route.hasOwnProperty('redirectTo'))
                defaultParameter = route.redirectTo
            else if (route.path.includes(':')) {
                if (defaultParameter)
                    if (defaultParameter.startsWith('/'))
                        paths.add(path.join(basePath, defaultParameter))
                    else
                        paths.add(path.join(basePath, root, defaultParameter))
                continue
            } else if (route.path !== '**' && !(route.hasOwnProperty(
                'children'
            ) && route.children[route.children.length - 1].path === '**'))
                paths.add(path.join(basePath, root, route.path))
            if (route.hasOwnProperty('children'))
                paths = new Set([...paths, ...determinePaths(
                    basePath, route.children, path.join(root, route.path))])
        } else if (route.hasOwnProperty('children'))
            paths = new Set([...paths, ...determinePaths(
                basePath, route.children, root)])
    return paths
}
/**
 * Pre-renders given application routes to given target directory structure.
 * @param ApplicationComponent - Application component to pre-render.
 * @param ApplicationModule - Application module to pre-render.
 * @param routes - Routes configuration object or array of paths to pre-render.
 * @param globalVariableNamesToInject - Global variable names to inject into
 * the node context evaluated from given index html file.
 * @param htmlFilePath - HTML file path to use as index.
 * @param targetDirectoryPath - Target directory path to generate pre-rendered
 * html files in.
 * @param globalVariables - Object to inject into the global scope before
 * running pre-rendering.
 * @param encoding - Encoding to use for reading given html file reference.
 * @returns A promise which resolves to a list of pre-rendered html strings.
 */
export default function(
    ApplicationComponent:Object, ApplicationModule:Object,
    // IgnoreTypeCheck
    routes:Array<string>|Routes = [],
    globalVariableNamesToInject:string|Array<string> = 'genericInitialData',
    htmlFilePath:string = './build/index.html',
    targetDirectoryPath:string = './build/pre-rendered',
    globalVariables:Object = {}, encoding:string = 'utf-8'
):Promise<Array<string>> {
    globalVariableNamesToInject = [].concat(globalVariableNamesToInject)
    return new Promise((resolve:Function, reject:Function):void => {
        fileSystem.readFile(htmlFilePath, {encoding}, (
            error:?Error, data:string
        ):void => {
            if (error)
                return reject(error)
            // region prepare environment
            const virtualConsole:Object = new VirtualConsole()
            for (const name:string of [
                'assert', 'dir', 'error', 'info', 'log', 'time', 'timeEnd',
                'trace', 'warn'
            ])
                virtualConsole.on(name, console[name].bind(console))
            const {document, window} = (new JSDOM(data, {
                runScripts: 'dangerously', virtualConsole}))
            const basePath:string = document.getElementsByTagName('base')[
                0
            ].href
            for (const name:string in window)
                if (window.hasOwnProperty(
                    name
                ) && !globalContext.hasOwnProperty(name) && (
                    globalVariableNamesToInject.length === 0 ||
                    globalVariableNamesToInject.includes(name)
                )) {
                    console.info(`Inject variable "${name}".`)
                    globalContext[name] = window[name]
                }
            for (const name:string in globalVariables)
                if (globalVariables.hasOwnProperty(
                    name
                ) && !globalContext.hasOwnProperty(name))
                    globalContext[name] = globalVariables[name]
            // endregion
            // region determine prerenderable paths
            let urls:Array<string>
            if (routes.length)
                urls = typeof routes[0] === 'string' ? routes : Array.from(
                    determinePaths(basePath, routes))
            else
                urls = [basePath]
            // endregion
            console.info(`Found ${urls.length} pre-renderable urls.`)
            // region create server renderable module
            // IgnoreTypeCheck
            @NgModule({
                bootstrap: [ApplicationComponent],
                imports: [ApplicationModule, ServerModule],
                providers: [{provide: APP_BASE_HREF, useValue: basePath}]
            })
            /**
             * Dummy server compatible root application module to pre-render.
             */
            class ApplicationServerModule {}
            // endregion
            enableProdMode()
            // region generate prerendered html files
            const promises:Array<Promise<string>> = []
            for (const url:string of urls.sort())
                promises.push(new Promise((
                    resolve:Function, reject:Function
                ):void => {
                    const filePath:string = path.join(targetDirectoryPath, (
                        url === basePath
                    ) ? '/' : url.substring(basePath.length).replace(
                        /^\/+(.+)/, '$1'
                    )) + '.html'
                    makeDirectoryPath(path.dirname(filePath), async (
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
                        console.info(`Write file "${filePath}".`)
                        fileSystem.writeFile(filePath, result, ((
                            error:?Error
                        ):void => error ? reject(error) : resolve(result)))
                    })
                }))
            Promise.all(promises).then(resolve).catch(reject)
            // endregion
        })
    })
}
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion