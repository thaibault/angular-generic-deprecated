// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
/* eslint-disable no-unused-vars */
import type {DomNode, PlainObject} from 'clientnode'
/* eslint-disable no-unused-vars */
import registerTest from 'clientnode/test'
// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register')
} catch (error) {}
// endregion
// region declaration
declare var DEBUG:boolean
declare var TARGET_TECHNOLOGY:string
// endregion
// region test runner
/**
 * Provides a generic test runner interface.
 * @param callback - A callback to run if test environment is ready.
 * @param template - Template to use as root application component to
 * bootstrap.
 * @param roundTypes - Test types to run.
 * @param productionMode - Indicates whether angular's production mode should
 * be activated in none debug mode.
 * @param additionalParameter - All additional parameter will be forwarded to
 * the underlying clientnode test environment.
 * @returns Whatever the underlying clientnode test runner returns.
 */
export default function(
    callback:Function|{bootstrap:Function;component:Function},
    template:string = '<div></div>', roundTypes:Array<string> = ['full'],
    productionMode:boolean = false, ...additionalParameter:Array<any>
):any {
    return registerTest(async function(
        roundType:string, targetTechnology:?string, $:any,
        ...extraParameter:Array<any>
    ):Promise<void> {
        // region mocking angular environment
        /*
            NOTE: A working polymorphic angular environment needs some
            assumptions about the global scope, so mocking and initializing
            that environment after a working browser environment is present.
        */
        $('head').append('<base href="/">')
        if (typeof TARGET_TECHNOLOGY === 'string') {
            if (TARGET_TECHNOLOGY === 'web') {
                const domNodeSpecification:PlainObject = {link: {
                    attributes: {
                        href: 'node_modules/@angular/material/' +
                            'prebuilt-themes/deeppurple-amber.css',
                        rel: 'stylesheet',
                        type: 'text/css'
                    },
                    inject: window.document.getElementsByTagName('head')[0]
                }}
                const domNodeName:string = Object.keys(domNodeSpecification)[0]
                const domNode:DomNode = window.document.createElement(
                    domNodeName)
                for (const name:string in domNodeSpecification[
                    domNodeName
                ].attributes)
                    if (domNodeSpecification[
                        domNodeName
                    ].attributes.hasOwnProperty(name))
                        domNode.setAttribute(name, domNodeSpecification[
                            domNodeName
                        ].attributes[name])
                domNodeSpecification[domNodeName].inject.appendChild(domNode)
                await new Promise((resolve:Function):void =>
                    domNode.addEventListener('load', resolve))
            }
            if (TARGET_TECHNOLOGY === 'node') {
                global.window.Reflect = global.Reflect
                if (!('CSS' in global))
                    global.CSS = true
                if (!('matchMedia' in global.window))
                    global.window.matchMedia = (mediaQuery:string):{
                        addListener:Function;
                        matches:boolean;
                        media:string;
                        removeListener:Function;
                    } => {
                        /*
                            NOTE: It is syntactically impossible to return an
                            object literal in functional style.
                        */
                        return {
                            addListener: ():void => {},
                            matches: true,
                            media: mediaQuery,
                            removeListener: ():void => {}
                        }
                    }
                if (!('navigator' in global))
                    global.navigator = {userAgent: 'node'}
                process.setMaxListeners(30)
            }
        }
        require('hammerjs')
        const {Component, enableProdMode} = require('@angular/core')
        const {TestBed} = require('@angular/core/testing')
        /**
         * Dummy application root component to test bootstrapping.
         */
        @Component({selector: '#qunit-fixture', template})
        class ApplicationComponent {}
        // endregion
        // region test services
        if (typeof callback === 'function')
            callback = callback.call(
                this, ApplicationComponent, roundType, targetTechnology, $,
                ...extraParameter)
        if ('then' in callback)
            callback = await callback
        let result:any = callback.bootstrap.call(
            this, ApplicationComponent, roundType, targetTechnology, $,
            ...extraParameter)
        if ('then' in result)
            result = await result
        if (!Array.isArray(result))
            result = [result]
        // / region bootstrap test application
        if (!(typeof DEBUG === 'boolean' && DEBUG) && productionMode)
            enableProdMode()
        let platform:Object
        let module:Object
        if (result[0]) {
            try {
                platform = ((
                    typeof TARGET_TECHNOLOGY === 'string' &&
                    TARGET_TECHNOLOGY === 'node'
                ) ? require('@angular/platform-server').platformDynamicServer :
                    require(
                        '@angular/platform-browser-dynamic'
                    ).platformBrowserDynamic)()
                module = await platform.bootstrapModule(result[0])
            } catch (error) {
                throw error
            }
            this.load()
            await new Promise((resolve:Function):void => {
                let done:boolean = false
                this.moduleDone(():void => {
                    if (done)
                        return
                    done = true
                    module.destroy()
                    platform.destroy()
                    resolve()
                })
            })
        }
        // / endregion
        // endregion
        // region test components
        if (result.length < 2)
            return
        let parameter:Array<Object>
        if (
            typeof TARGET_TECHNOLOGY === 'string' &&
            TARGET_TECHNOLOGY === 'node'
        ) {
            const {ServerTestingModule, platformServerTesting} = require(
                '@angular/platform-server/testing')
            parameter = [ServerTestingModule, platformServerTesting()]
        } else {
            const {
                BrowserDynamicTestingModule, platformBrowserDynamicTesting
            } = require('@angular/platform-browser-dynamic/testing')
            parameter = [
                BrowserDynamicTestingModule, platformBrowserDynamicTesting()]
        }
        TestBed.initTestEnvironment(...parameter).configureTestingModule(
            result[1])
        await TestBed.compileComponents()
        await callback.component.call(
            this, TestBed, roundType, targetTechnology, $, ...parameter.concat(
                result.slice(2)))
        // endregion
    }, roundTypes, ...additionalParameter)
}
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
