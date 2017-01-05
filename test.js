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
import PouchDBAdabterMemory from 'pouchdb-adapter-memory'
// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register')
} catch (error) {}
// endregion
// region declaration
declare var DEBUG:boolean
declare var TARGET_TECHNOLOGY:string
// endregion
registerTest(async function(
    roundType:string, targetTechnology:?string, $:any
):Promise<void> {
    // region mocking angular environment
    const self:Object = this
    $.global.genericInitialData = {configuration: {
        database: {
            url: 'test',
            options: {adapter: 'memory'},
            plugins: [PouchDBAdabterMemory]
        },
        test: true
    }}
    /*
        NOTE: A working polymorphic angular environment needs some assumptions
        about the global scope, so mocking and initializing that environment
        after a working browser environment is present.
    */
    if (TARGET_TECHNOLOGY === 'node') {
        global.window = $.global
        global.document = $.context
        global.Element = $.global.Element
        global.window.Reflect = global.Reflect
        process.setMaxListeners(30)
    }
    require('hammerjs')
    const {Component, enableProdMode, NgModule} = require('@angular/core')
    const {TestBed} = require('@angular/core/testing')
    const {By} = require('@angular/platform-browser')
    const {platformBrowserDynamic} = require(
        '@angular/platform-browser-dynamic')
    const {BrowserDynamicTestingModule, platformBrowserDynamicTesting} =
        require('@angular/platform-browser-dynamic/testing')
    const index:Object = require('./index')
    const GenericModule:Object = index.default
    const {
        GenericToolsService,
        GenericInitialDataService,
        GenericStringMD5Pipe,
        GenericExtractRawDataPipe,
        GenericGetFilenameByPrefixPipe,
        GenericMapPipe,
        GenericTypePipe,
        GenericIsDefinedPipe,
        GenericStringReplacePipe,
        GenericStringShowIfPatternMatchesPipe,
        GenericStringStartsWithPipe,
        GenericStringEndsWithPipe,
        GenericStringMatchPipe,
        GenericStringSliceMatchPipe,
        GenericStringHasTimeSuffixPipe,
        GenericNumberPercentPipe,
        GenericCanDeactivateRouteLeaveGuard,
        GenericDataService,
        GenericDataScopeService,
        AbstractResolver,
        AbstractItemsComponent,
        GenericInputComponent,
        GenericTextareaComponent,
        GenericFileInputComponent,
        GenericPaginationComponent
    } = index
    @Component({
        selector: '#qunit-fixture',
        template: '<div></div>'
    })
    class ApplicationComponent {}
    @NgModule({
        bootstrap: [ApplicationComponent],
        declarations: [ApplicationComponent],
        imports: [GenericModule]
    })
    // endregion
    // region test services
    class Module {
        constructor(
            tools:GenericToolsService,
            initialData:GenericInitialDataService,

            md5:GenericStringMD5Pipe,
            extractRawData:GenericExtractRawDataPipe,
            getFilenameByPrefix:GenericGetFilenameByPrefixPipe,
            map:GenericMapPipe,
            type:GenericTypePipe,
            isDefined:GenericIsDefinedPipe,
            stringReplace:GenericStringReplacePipe,
            stringShowIfPatternMatches:GenericStringShowIfPatternMatchesPipe,
            stringStartsWith:GenericStringStartsWithPipe,
            stringEndsWith:GenericStringEndsWithPipe,
            stringMatch:GenericStringMatchPipe,
            stringSliceMatch:GenericStringSliceMatchPipe,
            stringHasTimeSuffix:GenericStringHasTimeSuffixPipe,
            numberPercent:GenericNumberPercentPipe,

            canDeactivateRouteLeave:GenericCanDeactivateRouteLeaveGuard,
            data:GenericDataService,
            dataScope:GenericDataScopeService
        ):void {
            // region basic services
            self.test(`GenericToolsService (${roundType})`, (
                assert:Object
            ):void => {
                assert.ok(tools.$)
                assert.ok(tools.globalContext)
                assert.strictEqual(tools.tools.stringMD5(
                    'test'
                ), '098f6bcd4621d373cade4e832627b4f6')
            })
            self.test(`GenericInitialDataService (${roundType})`, (
                assert:Object
            ):void => assert.strictEqual(initialData.configuration.test, true))
            // endregion
            // region pipes
            // / region forwarded
            self.test(`GenericStringMD5Pipe (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual(md5.transform(
                    ''
                ), 'd41d8cd98f00b204e9800998ecf8427e')
                assert.strictEqual(md5.transform(
                    'test'
                ), '098f6bcd4621d373cade4e832627b4f6')
            })
            // / endregion
            self.test(`GenericExtractRawDataPipe (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`GenericGetFilenameByPrefixPipe (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`GenericMapPipe (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`GenericTypePipe (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`GenericIsDefinedPipe (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`GenericStringReplacePipe (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`GenericStringShowIfPatternMatchesPipe (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`GenericStringStartsWithPipe (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`GenericStringEndsWithPipe (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`GericStringMatchPipe (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`GenericStringSliceMatchPipe (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`GenericStringHasTimeSuffixPipe (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`GenericNumberPercentPipe (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            // endregion
            // region services
            self.test(`GenericCanDeactivateRouteLeaveGuard (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`GenericDataService (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`GenericDataScopeService (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test(`AbstractResolver (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            // endregion
        }
    }
    if (!DEBUG)
        enableProdMode()
    this.module(`GenericModule.services (${roundType})`)
    let platform:Object
    let module:Object
    try {
        platform = platformBrowserDynamic()
        module = await platform.bootstrapModule(Module)
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
    // endregion
    // region test components
    this.module(`GenericModule.components (${roundType})`)
    this.test(`AbstractItemsComponent (${roundType})`, (
        assert:Object
    ):void => {
        assert.strictEqual('TODO', 'TODO')
    })
    TestBed.initTestEnvironment(
        BrowserDynamicTestingModule, platformBrowserDynamicTesting()
    ).configureTestingModule({imports: [Module]})
    await TestBed.compileComponents()
    this.test(`GenericInputComponent (${roundType})`, (assert:Object):void => {
        const {componentInstance} = TestBed.createComponent(
            GenericInputComponent)
        componentInstance.model = {disabled: true}
        componentInstance.ngOnInit()
        assert.strictEqual(componentInstance.model.disabled, true)
        assert.ok(componentInstance.model.hasOwnProperty('type'), true)
    })
    this.test(`GenericTextareaComponent (${roundType})`, (
        assert:Object
    ):void => {
        assert.strictEqual('TODO', 'TODO')
    })
    this.test(`GenericFileInputComponent (${roundType})`, (
        assert:Object
    ):void => {
        assert.strictEqual('TODO', 'TODO')
    })
    this.test(`GenericPaginationComponent (${roundType})`, (
        assert:Object
    ):void => {
        assert.strictEqual('TODO', 'TODO')
    })
    // endregion
}, ['document'])
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
