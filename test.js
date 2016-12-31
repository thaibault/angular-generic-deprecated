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
// endregion
declare var DEBUG:boolean
registerTest(function(roundType:string, targetTechnology:?string, $:any):void {
    const self:Object = this
    $.global.genericInitialData = {configuration: {test: true}}

    $.global.window = $.global
    $.global.document = $.context
    global.document = $.context
    global.Element = $.global.Element
    const core:Object = require('@angular/core')
    const Component = core.Component
    const enableProdMode = core.enableProdMode
    const NgModule = core.NgModule
    const platformBrowserDynamic = require('@angular/platform-browser-dynamic').platformBrowserDynamic
    const index:Object = require('./index')
    const GenericModule = index.default
    const GenericToolsService = index.GenericToolsService
    const GenericInitialDataService = index.GenericInitialDataService
    const GenericStringMD5Pipe = index.GenericStringMD5Pipe
    const GenericExtractRawDataPipe = index.GenericExtractRawDataPipe
    const GenericGetFilenameByPrefixPipe = index.GenericGetFilenameByPrefixPipe
    const GenericMapPipe = index.GenericMapPipe
    const GenericTypePipe = index.GenericTypePipe
    const GenericIsDefinedPipe = index.GenericIsDefinedPipe
    const GenericStringReplacePipe = index.GenericStringReplacePipe
    const GenericStringShowIfPatternMatchesPipe = index.GenericStringShowIfPatternMatchesPipe
    const GenericStringStartsWithPipe = index.GenericStringStartsWithPipe
    const GenericStringEndsWithPipe = index.GenericStringEndsWithPipe
    const GenericStringMatchPipe = index.GenericStringMatchPipe
    const GenericStringSliceMatchPipe = index.GenericStringSliceMatchPipe
    const GenericStringHasTimeSuffixPipe = index.GenericStringHasTimeSuffixPipe
    const GenericNumberPercentPipe = index.GenericNumberPercentPipe
    const GenericCanDeactivateRouteLeaveGuard = index.GenericCanDeactivateRouteLeaveGuard
    const GenericDataService = index.GenericDataService
    const GenericDataScopeService = index.GenericDataScopeService
    const AbstractResolver = index.AbstractResolver
    const AbstractItemsComponent = index.AbstractItemsComponent
    const GenericInputComponent = index.GenericInputComponent
    const GenericTextareaComponent = index.GenericTextareaComponent
    const GenericFileInputComponent = index.GenericFileInputComponent
    const GenericPaginationComponent = index.GenericPaginationComponent

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
            numberPercent:GenericNumberPercentPipe
        ):void {
            // region tests
            // / region basic services
            self.test('GenericToolsService', (assert:Object):void => {
                assert.ok(tools.$)
                assert.ok(tools.globalContext)
                assert.strictEqual(tools.tools.stringMD5(
                    'test'
                ), '098f6bcd4621d373cade4e832627b4f6')
            })
            self.test('GenericInitialDataService', (assert:Object):void => {
                assert.strictEqual(initialData.configuration.test, true)
            })
            // / endregion
            // / region pipes
            // // region forwarded
            self.test('GenericStringMD5Pipe', (assert:Object):void => {
                assert.strictEqual(md5.transform(
                    'test'
                ), '098f6bcd4621d373cade4e832627b4f6')
            })
            // // endregion
            self.test('GenericExtractRawDataPipe', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericGetFilenameByPrefixPipe', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericMapPipe', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericTypePipe', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericIsDefinedPipe', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericStringReplacePipe', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericStringShowIfPatternMatchesPipe', (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericStringStartsWithPipe', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericStringEndsWithPipe', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GericStringMatchPipe', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericStringSliceMatchPipe', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericStringHasTimeSuffixPipe', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericNumberPercentPipe', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            // / endregion
            // / region services
            self.test('GenericCanDeactivateRouteLeaveGuard', (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericDataService', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericDataScopeService', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('AbstractResolver', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('AbstractItemsComponent', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericInputComponent', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericTextareaComponent', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericFileInputComponent', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            self.test('GenericPaginationComponent', (assert:Object):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            // / endregion
            // endregion
        }
    }
    if (!DEBUG)
        enableProdMode()
    this.test('GenericModule', (assert:Object):void =>
        assert.ok(platformBrowserDynamic().bootstrapModule(ApplicationModule)))
}, ['full'])
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
