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
    const hammerjs:Object = require('hammerjs')
    const {DebugElement, Component, enableProdMode, NgModule} = require(
        '@angular/core')
    const platformBrowserDynamic:Function = require(
        '@angular/platform-browser-dynamic'
    ).platformBrowserDynamic
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
        template: '<div>Application</div>'
    })
    class ApplicationComponent {}
    @NgModule({
        bootstrap: [ApplicationComponent],
        declarations: [ApplicationComponent],
        imports: [GenericModule]
    })
    // endregion
    // region test services
    class ApplicationModule {
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
    const module:Object = await platformBrowserDynamic().bootstrapModule(
        ApplicationModule)
    // endregion
    // region test components
    this.done(():void => {
        module.destroy()
        const {ComponentFixture, TestBed} = require('@angular/core/testing')
        const {BrowserDynamicTestingModule, platformBrowserDynamicTesting} =
            require('@angular/platform-browser-dynamic/testing')
        const By:Object = require('@angular/platform-browser').By
        this.module(`GenericModule.components (${roundType})`)
        this.test('AbstractItemsComponent', (assert:Object):void => {
            assert.strictEqual('TODO', 'TODO')
        })
        TestBed.initTestEnvironment(
            BrowserDynamicTestingModule, platformBrowserDynamicTesting()
        ).configureTestingModule({imports: [GenericModule]})
        this.test('GenericInputComponent', (assert:Object):void => {
            assert.strictEqual('TODO', 'TODO')
            const fixture:ComponentFixture<GenericInputComponent> =
                TestBed.createComponent(GenericInputComponent)
            const component:GenericInputComponent = fixture.componentInstance
            console.log('A', fixture.debugElement.nativeElement.innerHTML)
        })
        this.test('GenericTextareaComponent', (assert:Object):void => {
            assert.strictEqual('TODO', 'TODO')
        })
        this.test('GenericFileInputComponent', (assert:Object):void => {
            assert.strictEqual('TODO', 'TODO')
        })
        this.test('GenericPaginationComponent', (assert:Object):void => {
            assert.strictEqual('TODO', 'TODO')
        })
    })
    // endregion
}, ['full'])
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
