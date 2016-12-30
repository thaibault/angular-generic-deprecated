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
import {Component, enableProdMode, NgModule} from '@angular/core'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'

import {
    default as GenericModule,
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
} from './index'
// endregion
declare var DEBUG:boolean
registerTest(function(roundType:string, targetTechnology:?string, $:any):void {
    const self:Object = this
    $.global.genericInitialData = {configuration: {test: true}}

    $.global.window = $.global
    $.global.document = $.context

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
    console.log('D', DEBUG)
    if (!DEBUG)
        enableProdMode()
    this.test('GenericModule', (assert:Object):void =>
        assert.ok(platformBrowserDynamic().bootstrapModule(ApplicationModule)))
}, ['full'])
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
