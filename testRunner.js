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
 * @param additionalParameter - All additional parameter will be forwarded to
 * the underlying clientnode test environment.
 * @returns Whatever the underlying clientnode test runner returns.
 */
export default function(
    callback:Function|{bootstrap:Function;component:Function},
    template:string = '<div></div>', roundTypes:Array<string> = ['full'],
    ...additionalParameter:Array<any>
):any {
    return registerTest(async function(
        roundType:string, targetTechnology:?string, $:any,
        ...parameter:Array<any>
    ):Promise<void> {
        // region mocking angular environment
        $('head').append('<base href="/">')
        /*
            NOTE: A working polymorphic angular environment needs some
            assumptions about the global scope, so mocking and initializing
            that environment after a working browser environment is present.
        */
        if (TARGET_TECHNOLOGY === 'node') {
            global.window.Reflect = global.Reflect
            if (!('matchMedia' in global.window))
                global.window.matchMedia = (mediaQuery:string):{
                    addListener:Function;
                    matches:boolean;
                    media:string;
                    removeListener:Function;
                } => {
                    return {
                        addListener: ():void => {},
                        matches: true,
                        media: mediaQuery,
                        removeListener: ():void => {}
                    }
                }
            process.setMaxListeners(30)
        }
        require('hammerjs')
        const {Component, enableProdMode} = require('@angular/core')
        const {TestBed} = require('@angular/core/testing')
        const {platformBrowserDynamic} = require(
            '@angular/platform-browser-dynamic')
        const {BrowserDynamicTestingModule, platformBrowserDynamicTesting} =
            require('@angular/platform-browser-dynamic/testing')
        // IgnoreTypeCheck
        @Component({selector: '#qunit-fixture', template})
        /**
         * Dummy application root component to test bootstrapping.
         */
        class ApplicationComponent {}
        // endregion
        // region test services
        if (typeof callback === 'function')
            callback = callback.call(
                this, ApplicationComponent, roundType, targetTechnology, $,
                ...parameter)
        let result:any = callback.bootstrap.call(
            this, ApplicationComponent, roundType, targetTechnology, $,
            ...parameter)
        if (!Array.isArray(result))
            result = [result]
        // / region bootstrap test application
        if (!DEBUG)
            enableProdMode()
        let platform:Object
        let module:Object
        if (result[0]) {
            try {
                platform = platformBrowserDynamic()
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
        TestBed.initTestEnvironment(
            BrowserDynamicTestingModule, platformBrowserDynamicTesting()
        ).configureTestingModule(...result.slice(1))
        await TestBed.compileComponents()
        await callback.component.call(
            this, TestBed, roundType, targetTechnology, $, ...parameter)
        // endregion
    }, roundTypes, ...additionalParameter)
}
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
