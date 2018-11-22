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
import type {DomNode, File, PlainObject, Window} from 'clientnode'
import Tools, {globalContext} from 'clientnode'
import {enableProdMode, NgModule} from '@angular/core'
import {APP_BASE_HREF} from '@angular/common'
import {
    renderModule, renderModuleFactory, ServerModule
} from '@angular/platform-server'
import {Routes} from '@angular/router'
import fileSystem from 'fs'
import {JSDOM as DOM, VirtualConsole} from 'jsdom'
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
 * @param base - Applications base url.
 * @param routes - Routes configuration object to analyze.
 * @param root - Current components root path (usually only needed for
 * recursive function calls).
 * @returns Set of distinct paths and linkes representing redirects.
 */
export function determinePaths(
    base:string = '/', routes:Routes = [], root:string = ''
):{links:{[key:string]:string};paths:Set<string>} {
    if (base.endsWith('/') && root.startsWith('/'))
        root = root.replace(/^\/+/, '')
    const links:{[key:string]:string} = {}
    let paths:Set<string> = new Set()
    let defaultPath:string = ''
    /*
        NOTE: We have to reverse the url list to ensure that default paths are
        already registered before linking to them internally due to the fact
        that default paths are listed later to avoid shadowing non-default
        paths.
    */
    routes.reverse()
    for (const route:any of routes)
        if (typeof route === 'string')
            paths.add(base + path.join(root, route))
        else if (route.hasOwnProperty('path')) {
            if (route.hasOwnProperty('redirectTo')) {
                if (route.path === '**')
                    if (route.redirectTo.startsWith('/'))
                        defaultPath = base + route.redirectTo
                    else
                        defaultPath = base + path.join(
                            root, route.redirectTo)
                links[base + path.join(root, route.path)] = defaultPath
            } else if (route.path.includes(':')) {
                if (defaultPath)
                    paths.add(defaultPath)
                continue
            } else if (route.path !== '**' && !(route.hasOwnProperty(
                'children'
            ) && route.children[route.children.length - 1].path === '**'))
                paths.add(base + path.join(root, route.path))
            if (route.hasOwnProperty('children')) {
                const result:{
                    links:{[key:string]:string};
                    paths:Set<string>;
                } = determinePaths(
                    base, route.children, path.join(root, route.path))
                Tools.extendObject(links, result.links)
                paths = new Set([...paths, ...result.paths])
            }
        } else if (route.hasOwnProperty('children')) {
            const result:{
                links:{[key:string]:string};
                paths:Set<string>;
            } = determinePaths(base, route.children, root)
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
 * @param givenOptions - Additional options to configure pre-rendering in
 * detail.
 * @returns A promise which resolves to a list of pre-rendered html strings.
 */
export function render(
    module:Object, givenOptions:PlainObject
):Promise<Array<string>> {
    // region determine  options
    const options:{
        applicationDomNodeSelector?:string;
        basePath:string|null;
        component:Object|null;
        encoding:string;
        globalVariableNamesToInject:string|Array<string>;
        htmlFilePath:string;
        minify:PlainObject|false|null;
        reInjectInnerHTMLFromInitialDomNode:boolean;
        routes:Array<string|PlainObject>|Routes;
        scope:Object;
        targetDirectoryPath:string;
    } = Tools.extendObject(true, {
        applicationDomNodeSelector,
        basePath: null,
        component: null,
        encoding: 'utf-8',
        globalVariableNamesToInject: globalVariableNameToRetrieveDataFrom,
        htmlFilePath: path.resolve(
            path.dirname(process.argv[1]), 'index.html'),
        minify: false,
        reInjectInnerHTMLFromInitialDomNode: false,
        routes: [],
        scope: {[globalVariableNameToRetrieveDataFrom]: {configuration: {
            database: {
                connector: {adapter: 'memory'},
                plugins: [PouchDBAdapterMemory]
            }
        }}},
        targetDirectoryPath: 'preRendered'
    }, givenOptions || {})
    if (typeof options.minify === 'object' && options.minify !== null)
        options.minify = Tools.extendObject(true, {
            caseSensitive: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: false,
            collapseWhitespace: true,
            conservativeCollapse: false,
            html5: true,
            includeAutoGeneratedTags: false,
            keepClosingSlash: false,
            maxLineLength: Infinity,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: false,
            preserveLineBreaks: false,
            /*
                NOTE: Needed for attribute nested quotes which should be
                escaped.
            */
            preventAttributesEscaping: true,
            processScripts: [],
            processConditionalComments: false,
            quoteCharacter: '"',
            removeAttributeQuotes: false,
            removeComments: true,
            removeCommentsFromCDATA: true,
            removeCDATASectionsFromCDATA: true,
            removeEmptyAttributes: false,
            removeEmptyElements: false,
            removeOptionalTags: false,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeTagWhitespace: false,
            sortAttributes: true,
            sortClassName: true,
            useShortDoctype: false
        }, options.minify)
    options.targetDirectoryPath = path.resolve(
        path.dirname(process.argv[1]), options.targetDirectoryPath)
    options.globalVariableNamesToInject = [].concat(
        options.globalVariableNamesToInject)
    options.routes = [].concat(options.routes)
    // endregion
    return new Promise((
        resolve:Function, reject:Function
    // IgnoreTypeCheck
    ):void => fileSystem.readFile(options.htmlFilePath, {
        encoding: options.encoding
    }, async (error:?Error, data:string):Promise<void> => {
        if (error)
            return reject(error)
        // region prepare environment
        renderScope.virtualConsole = new VirtualConsole()
        for (const name:string of [
            'assert',
            'dir',
            'error',
            'info',
            'log',
            'time',
            'timeEnd',
            'trace',
            'warn'
        ])
            renderScope.virtualConsole.on(name, console[name].bind(console))
        renderScope.dom = (new DOM(data, {
            includeNodeLocations: true,
            referrer: 'https://localhost',
            runScripts: 'dangerously',
            url: 'https://localhost',
            virtualConsole: renderScope.virtualConsole
        }))
        renderScope.window = renderScope.dom.window
        renderScope.applicationDomNode =
            renderScope.window.document.querySelector(
                options.applicationDomNodeSelector)
        renderScope.innerHTMLToReInject = ''
        if (renderScope.applicationDomNode)
            renderScope.innerHTMLToReInject =
                renderScope.applicationDomNode.innerHTML
        renderScope.basePath = options.basePath ? options.basePath :
            // IgnoreTypeCheck
            renderScope.window.document.getElementsByTagName('base')[0].href
        for (const name:string in renderScope.window)
            if (
                renderScope.window.hasOwnProperty(name) &&
                !globalContext.hasOwnProperty(name) && (
                    options.globalVariableNamesToInject.length === 0 ||
                    options.globalVariableNamesToInject.includes(name)
                )
            ) {
                console.info(`Inject variable "${name}".`)
                // IgnoreTypeCheck
                globalContext[name] = renderScope.window[name]
            }
        Tools.plainObjectPrototypes = Tools.plainObjectPrototypes.concat(
            // IgnoreTypeCheck
            renderScope.window.Object.prototype)
        Tools.extendObject(true, globalContext, options.scope)
        // endregion
        // region determine pre-renderable paths
        const links:Array<string> = []
        let urls:Array<string>
        if (options.routes.length) {
            const result:{
                links:{[key:string]:string};
                paths:Set<string>;
            } = determinePaths(renderScope.basePath, options.routes)
            for (const sourcePath:string in result.links)
                if (result.links.hasOwnProperty(sourcePath)) {
                    const realSourcePath:string = path.join(
                        options.targetDirectoryPath, sourcePath.substring(
                            renderScope.basePath.length
                        ).replace(/^\/+(.+)/, '$1'))
                    links.push(realSourcePath)
                    const targetPath:string = path.join(
                        options.targetDirectoryPath,
                        result.links[sourcePath].substring(
                            renderScope.basePath.length
                        ).replace(/^\/+(.+?)\/?$/, '$1')) + '.html'
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
                            stats.isSymbolicLink() || stats.isFile()
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
        } else
            urls = [renderScope.basePath]
        // endregion
        console.info(
            `Found ${urls.length} pre-renderable url` +
            `${urls.length > 1 ? 's' : ''}.`)
        enableProdMode()
        // region generate pre-rendered html files
        const results:Array<string> = []
        const filePaths:Array<string> = []
        for (const url:string of urls) {
            const filePath:string = path.join(options.targetDirectoryPath, (
                url === renderScope.basePath
            ) ? '/' : url.substring(renderScope.basePath.length).replace(
                    /^\/+(.+?)\/?$/, '$1'
                )) + '.html'
            filePaths.push(filePath)
            try {
                results.push(await new Promise((
                    resolve:Function, reject:Function
                ):void => makeDirectoryPath(path.dirname(filePath), async (
                    error:?Error
                ):Promise<void> => {
                    if (error)
                        return reject(error)
                    console.info(`Pre-render url "${url}".`)
                    let result:string = ''
                    // region pre-render
                    if (options.component) {
                        // region create server pre-renderable module
                        /* eslint-disable require-jsdoc */
                        // IgnoreTypeCheck
                        @NgModule({
                            bootstrap: [options.component],
                            imports: [module, ServerModule],
                            providers: [{
                                provide: APP_BASE_HREF,
                                useValue: renderScope.basePath
                            }]
                        })
                        /* eslint-enable require-jsdoc */
                        /**
                         * Dummy server compatible root application module to
                         * pre-render.
                         */
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
                    // endregion
                    // region re-inject needed initial markup
                    if (options.reInjectInnerHTMLFromInitialDomNode) {
                        /*
                            NOTE: We have to prevent creating native "style"
                            dom nodes to prevent jsdom from parsing the entire
                            cascading style sheet. Which is error prune and
                            very resource intensive.
                        */
                        const styleContents:Array<string> = []
                        result = result.replace(
                            /(<style[^>]*>)([\s\S]*?)(<\/style[^>]*>)/gi, (
                                match:string,
                                startTag:string,
                                content:string,
                                endTag:string
                            ):string => {
                                styleContents.push(content)
                                return `${startTag}${endTag}`
                            })
                        const dom:DOM = new DOM(result)
                        const window:Window = dom.window
                        /*
                            NOTE: We have to re-select the application node
                            here, because it's embedded in another document
                            context.
                        */
                        const applicationDomNode:DomNode =
                            window.document.querySelector(
                                options.applicationDomNodeSelector)
                        const regularExpression:RegExp = new RegExp(
                            '<!--{?generic-inject-application-->' +
                            '(?:[\\s\\S]*?<!--generic-inject-application}' +
                            '-->)?',
                            'i')
                        if (regularExpression.test(
                            renderScope.innerHTMLToReInject
                        ))
                            applicationDomNode.innerHTML =
                                renderScope.innerHTMLToReInject.replace(
                                    regularExpression,
                                    applicationDomNode.innerHTML)
                        else
                            applicationDomNode.innerHTML +=
                                renderScope.innerHTMLToReInject
                        result = dom.serialize().replace(
                            /(<style[^>]*>)[\s\S]*?(<\/style[^>]*>)/gi, (
                                match:string,
                                startTag:string,
                                endTag:string
                            ):string =>
                                `${startTag}${styleContents.shift()}${endTag}`)
                    }
                    // endregion
                    if (options.minify)
                        try {
                            result = require('html-minifier').minify(
                                result, options.minify)
                        } catch (error) {
                            console.warn(
                                'Pre-rendered output could not be minfied: "' +
                                `${error}".`)
                        }
                    let stats:any = null
                    try {
                        stats = await new Promise((
                            resolve:Function, reject:Function
                        ):void => fileSystem.lstat(filePath, (
                            error:any, stats:any
                        ):void => error ? reject(error) : resolve(stats)))
                    } catch (error) {
                        if (error.code !== 'ENOENT')
                            throw error
                    }
                    if (stats && (stats.isSymbolicLink() || stats.isFile()))
                        await new Promise((
                            resolve:Function, reject:Function
                        ):void => removeDirectoryRecursively(filePath, (
                            error:?Error
                        ):void => error ? reject(error) : resolve()))
                    console.info(`Write file "${filePath}".`)
                    fileSystem.writeFile(filePath, result, ((
                        error:?Error
                    ):void => error ? reject(error) : resolve(result)))
                })))
            } catch (error) {
                reject(error)
                return
            }
        }
        // endregion
        // region tidy up
        const files:Array<File> = await Tools.walkDirectoryRecursively(
            options.targetDirectoryPath)
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
    applicationDomNode?:DomNode;
    basePath:string;
    dom?:DOM;
    innerHTMLToReInject:string;
    virtualConsole?:Object;
    window?:Window;
} = {
    basePath: '',
    innerHTMLToReInject: ''
}
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
