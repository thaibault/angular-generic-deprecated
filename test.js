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
import type {DomNode, PlainObject} from 'clientnode'
import registerAngularTest from './testRunner'
import PouchDBAdabterMemory from 'pouchdb-adapter-memory'
// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register')
} catch (error) {}
// endregion
// region tests
registerAngularTest(function(
    ApplicationComponent:Object, roundType:string, targetTechnology:?string,
    $:any
):{
    bootstrap:Function;
    component:Function;
} {
    // region imports
    const {getNativeEvent} = require('./mockup')
    const {DebugElement, Injectable, NgModule} = require('@angular/core')
    const {ComponentFixture} = require('@angular/core/testing')
    const {By} = require('@angular/platform-browser')
    const index:Object = require('./index')
    // endregion
    return {
        bootstrap: ():Array<Object> => {
            // region prepare services
            $.global.genericInitialData = {configuration: {
                database: {
                    url: 'test',
                    options: {adapter: 'memory'},
                    plugins: [PouchDBAdabterMemory]
                },
                modelConfiguration: {models: {Test: {}}},
                test: true
            }}
            const GenericModule:Object = index.default
            const {
                GenericToolsService,
                GenericExtendObjectPipe,
                GenericInitialDataService,
                GenericStringMD5Pipe,
                GenericExtractRawDataPipe,
                GenericGetFilenameByPrefixPipe,
                GenericMapPipe,
                GenericTypePipe,
                GenericIsDefinedPipe,
                GenericStringEscapeRegularExpressionsPipe,
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
                AbstractResolver
            } = index
            // IgnoreTypeCheck
            @Injectable()
            class Resolver extends AbstractResolver {
                _type:string = 'Test'
                constructor(
                    data:GenericDataService,
                    extendObject:GenericExtendObjectPipe,
                    initialData:GenericInitialDataService,
                    escapeRegularExpressions:GenericStringEscapeRegularExpressionsPipe
                ):void {
                    super(data, extendObject, initialData, escapeRegularExpressions)
                }
            }
            const self:Object = this
            // IgnoreTypeCheck
            @NgModule({
                bootstrap: [ApplicationComponent],
                declarations: [ApplicationComponent],
                imports: [GenericModule],
                providers: [Resolver]
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
                    dataScope:GenericDataScopeService,

                    resolver:Resolver
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
                    ):void => assert.strictEqual(
                        initialData.configuration.test, true))
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
                    self.test(
                        `GenericGetFilenameByPrefixPipe (${roundType})`,
                        (assert:Object):void => {
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
                    self.test(
                        `GenericStringShowIfPatternMatchesPipe (${roundType})`,
                        (assert:Object):void => {
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
                    self.test(
                        `GenericStringHasTimeSuffixPipe (${roundType})`,
                        (assert:Object):void => {
                            assert.strictEqual('TODO', 'TODO')
                        })
                    self.test(`GenericNumberPercentPipe (${roundType})`, (
                        assert:Object
                    ):void => {
                        assert.strictEqual('TODO', 'TODO')
                    })
                    // endregion
                    // region services
                    self.test(
                        `GenericCanDeactivateRouteLeaveGuard (${roundType})`,
                        (assert:Object):void => {
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
            this.module(`GenericModule.services (${roundType})`)
            return [Module, {imports: [Module]}]
            // endregion
        },
        component: function(TestBed:Object, roundType:string):void {
            // region prepare components
            const {
                AbstractInputComponent,
                AbstractItemsComponent,
                GenericExtendObjectPipe,
                GenericInputComponent,
                GenericTextareaComponent,
                GenericFileInputComponent,
                GenericPaginationComponent
            } = index
            // endregion
            // region test components
            this.module(`GenericModule.components (${roundType})`)
            this.test(`AbstractInputComponent (${roundType})`, (
                assert:Object
            ):void => {
                const instance:AbstractInputComponent =
                    new AbstractInputComponent(new GenericExtendObjectPipe())
                instance.model = {name: 'test'}
                instance.ngOnInit()
                assert.strictEqual(instance.model.name, 'test')
                assert.ok(instance.model.hasOwnProperty('type'))
            })
            this.test(`AbstractItemsComponent (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            for (const component:AbstractInputComponent of [
                GenericInputComponent, GenericTextareaComponent
            ])
                this.test(`${component.name} (${roundType})`, async (
                    assert:Object
                ):Promise<void> => {
                    const done:Function = assert.async()
                    const fixture:ComponentFixture<AbstractInputComponent> =
                        TestBed.createComponent(component)
                    fixture.componentInstance.model = {
                        disabled: true, name: 'test'
                    }
                    fixture.componentInstance.ngOnInit()
                    assert.strictEqual(
                        fixture.componentInstance.model.disabled, true)
                    assert.ok(
                        fixture.componentInstance.model.hasOwnProperty('type'),
                        true)
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.strictEqual(fixture.debugElement.query(By.css(
                        'label'
                    )).nativeElement.textContent.trim(), 'test')
                    const inputDomNode:DomNode = fixture.debugElement.query(
                        By.css(component.name.replace(
                            /^Generic(.+)Component$/, '$1'
                        ).toLowerCase())
                    ).nativeElement
                    inputDomNode.value = 'aa'
                    inputDomNode.dispatchEvent(getNativeEvent('input'))
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.strictEqual(
                        fixture.componentInstance.model.value, 'aa')
                    fixture.componentInstance.model.maximum = 2
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.strictEqual(
                        inputDomNode.attributes.maxlength.value, '2')
                    let eventGivenModel:PlainObject
                    fixture.componentInstance.modelChange.subscribe((
                        model:PlainObject
                    ):void => {
                        eventGivenModel = model
                    })
                    const state:PlainObject = {errors: {required: true}}
                    fixture.componentInstance.onChange(state)
                    assert.deepEqual(
                        fixture.componentInstance.model.state, state)
                    assert.deepEqual(
                        eventGivenModel, fixture.componentInstance.model)
                    fixture.componentInstance.showValidationErrorMessages =
                        true
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.strictEqual(fixture.debugElement.query(By.css(
                        'md-hint span'
                    )).nativeElement.textContent.trim().replace(/\s+/g, ' '),
                    'Bitte füllen Sie das Feld "test" aus.')
                    done()
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
        }
    }
})
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
