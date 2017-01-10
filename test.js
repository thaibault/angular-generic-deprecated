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
import PouchDBAdapterMemory from 'pouchdb-adapter-memory'
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
    const {DebugElement, Injectable, NgModule} = require('@angular/core')
    const {ComponentFixture} = require('@angular/core/testing')
    const {By} = require('@angular/platform-browser')
    const {Router} = require('@angular/router')
    const index:Object = require('./index')
    const {
        dummyEvent, getNativeEvent, RouterOutletStubComponent, RouterStub
    } = require('./mockup')
    // endregion
    return {
        bootstrap: ():Array<Object> => {
            // region prepare services
            $.global.genericInitialData = {configuration: {
                database: {
                    url: 'test',
                    options: {adapter: 'memory'},
                    plugins: [PouchDBAdapterMemory]
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
            /**
             * Dummy resolver to test the abstract resolver class.
             */
            class Resolver extends AbstractResolver {
                _type:string = 'Test'
                /**
                 * Initializes the abstract resolver class.
                 * @param data - Injected data service instance.
                 * @param extendObject - Injected extend object pipe instance.
                 * @param initialData - Injected initial data service instance.
                 * @param escapeRegularExpressions - Injected regular
                 * expression escape pipe instance.
                 * @returns Nothing.
                 */
                constructor(
                    data:GenericDataService,
            escapeRegularExpressions:GenericStringEscapeRegularExpressionsPipe,
                    extendObject:GenericExtendObjectPipe,
                    initialData:GenericInitialDataService
                ):void {
                    super(
                        data, escapeRegularExpressions, extendObject,
                        initialData)
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
            /**
             * Dummy module to inject services to test and test if
             * bootstrapping works.
             */
            class Module {
                /**
                 * Dummy constructor to inject needed service instances and
                 * perform various tests.
                 * @param tools - Injected tools service instance.
                 * @param initialData - Injected initial data service instance.
                 * @param md5 - Injected md5 pipe instance.
                 * @param extractRawData - Injected extract raw data pipe
                 * instance.
                 * @param getFilenameByPrefix - Injected filename getter pipe
                 * instance.
                 * @param map - Injected map pipe instance.
                 * @param type - Injected type pipe instance.
                 * @param isDefined - Injected is defined pipe instance.
                 * @param stringReplace - Injected string replace pipe
                 * instance.
                 * @param stringShowIfPatternMatches - Injected string show
                 * pipe instance.
                 * @param stringStartsWith - Injected start starts with pipe
                 * instance.
                 * @param stringEndsWith - Injected string ends with pipe
                 * instance.
                 * @param stringMatch - Injected string match pipe instance.
                 * @param stringSliceMatch - Injected string slice match pipe
                 * instance.
                 * @param stringHasTimeSuffix - Injected string has time suffix
                 * instance.
                 * @param numberPercent - Injected number percent pipe
                 * instance.
                 * @param canDeactivateRouteLeave - Injected can deactivate
                 * route leave guard instance.
                 * @param data - Injected data service instance.
                 * @param dataScope - Injected data scope service instance.
                 * @param resolver - Injected resolver service instance.
                 * @returns Nothing.
                 */
                constructor(
                canDeactivateRouteLeave:GenericCanDeactivateRouteLeaveGuard,
                    data:GenericDataService,
                    dataScope:GenericDataScopeService,
                    extractRawData:GenericExtractRawDataPipe,
                    getFilenameByPrefix:GenericGetFilenameByPrefixPipe,
                    initialData:GenericInitialDataService,
                    isDefined:GenericIsDefinedPipe,
                    map:GenericMapPipe,
                    md5:GenericStringMD5Pipe,
                    numberPercent:GenericNumberPercentPipe,
                    resolver:Resolver,
                    stringEndsWith:GenericStringEndsWithPipe,
                    stringHasTimeSuffix:GenericStringHasTimeSuffixPipe,
                    stringMatch:GenericStringMatchPipe,
                    stringReplace:GenericStringReplacePipe,
            stringShowIfPatternMatches:GenericStringShowIfPatternMatchesPipe,
                    stringSliceMatch:GenericStringSliceMatchPipe,
                    stringStartsWith:GenericStringStartsWithPipe,
                    tools:GenericToolsService,
                    type:GenericTypePipe
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
                    // / region object
                    self.test(`GenericExtractRawDataPipe (${roundType})`, (
                        assert:Object
                    ):void => {
                        assert.strictEqual('TODO', 'TODO')
                    })
                    self.test(`GenericIsDefinedPipe (${roundType})`, (
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
                    // / endregion
                    // / region string
                    self.test(`GenericStringEndsWithPipe (${roundType})`, (
                        assert:Object
                    ):void => {
                        assert.strictEqual('TODO', 'TODO')
                    })
                    self.test(
                        `GenericStringHasTimeSuffixPipe (${roundType})`,
                        (assert:Object):void => {
                            assert.strictEqual('TODO', 'TODO')
                        })
                    self.test(`GericStringMatchPipe (${roundType})`, (
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
                    self.test(`GenericStringSliceMatchPipe (${roundType})`, (
                        assert:Object
                    ):void => {
                        assert.strictEqual('TODO', 'TODO')
                    })
                    // / endregion
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
                    // / region abstract
                    self.test(`AbstractResolver (${roundType})`, (
                        assert:Object
                    ):void => {
                        resolver.list()
                        assert.ok(true)
                    })
                    // / endregion
                    // endregion
                }
            }
            this.module(`GenericModule.services (${roundType})`)
            return [Module, {
                declarations: [RouterOutletStubComponent],
                imports: [GenericModule],
                providers: [{provide: Router, useClass: RouterStub}]
            }]
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
            // / region input/textarea
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
            // endregion
            this.test(`GenericFileInputComponent (${roundType})`, (
                assert:Object
            ):void => {
                assert.strictEqual('TODO', 'TODO')
            })
            // / region pagination
            this.test(`GenericPaginationComponent (${roundType})`, async (
                assert:Object
            ):Promise<void> => {
                const done:Function = assert.async()
                const fixture:ComponentFixture<GenericPaginationComponent> =
                    TestBed.createComponent(GenericPaginationComponent)
                fixture.componentInstance.total = 10
                fixture.detectChanges()
                await fixture.whenStable()
                assert.strictEqual(
                    fixture.debugElement.query(By.css('*')), null)
                fixture.componentInstance.itemsPerPage = 2
                fixture.detectChanges()
                await fixture.whenStable()
                assert.strictEqual(
                    fixture.debugElement.queryAll(By.css('ul li a')).length, 7)
                assert.strictEqual(fixture.componentInstance.lastPage, 5)
                assert.deepEqual(
                    fixture.componentInstance.pagesRange, [1, 2, 3, 4, 5])
                assert.strictEqual(fixture.componentInstance.previousPage, 1)
                assert.strictEqual(fixture.componentInstance.nextPage, 2)
                assert.deepEqual(fixture.debugElement.query(By.css(
                    '.current'
                )).nativeElement.className.split(' ').sort(),
                ['current', 'even', 'page-1', 'previous'])
                fixture.componentInstance.change(dummyEvent, 3)
                assert.strictEqual(fixture.componentInstance.previousPage, 2)
                assert.strictEqual(fixture.componentInstance.nextPage, 4)
                fixture.detectChanges()
                await fixture.whenStable()
                assert.deepEqual(fixture.debugElement.query(By.css(
                    '.current'
                )).nativeElement.className.split(' ').sort(),
                ['current', 'even', 'page-3'])
                assert.deepEqual(fixture.debugElement.query(By.css(
                    '.previous'
                )).nativeElement.className.split(' ').sort(),
                ['even-page', 'page-2', 'previous'])
                assert.deepEqual(fixture.debugElement.query(By.css(
                    '.next'
                )).nativeElement.className.split(' ').sort(),
                ['even-page', 'next', 'page-4'])
                assert.deepEqual(fixture.debugElement.query(By.css(
                    '.last'
                )).nativeElement.className.split(' ').sort(),
                ['even', 'last', 'page-5'])
                fixture.debugElement.query(By.css(
                    '.next'
                )).triggerEventHandler('click', dummyEvent)
                fixture.detectChanges()
                await fixture.whenStable()
                assert.deepEqual(fixture.debugElement.query(By.css(
                    '.current'
                )).nativeElement.className.split(' ').sort(),
                ['current', 'even-page', 'page-4'])
                done()
            })
            // / endregion
            // endregion
        }
    }
})
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
