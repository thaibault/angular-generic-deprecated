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
    const {ChangeDetectorRef, Component, Injectable, NgModule} = require(
        '@angular/core')
    const {ComponentFixture} = require('@angular/core/testing')
    const {By} = require('@angular/platform-browser')
    const {NoopAnimationsModule} = require(
        '@angular/platform-browser/animations')
    const {ActivatedRoute, Router} = require('@angular/router')
    const index:Object = require('./index')
    const {
        ActivatedRouteStub, dummyEvent, getNativeEvent,
        RouterOutletStubComponent, RouterStub
    } = require('./mockup')
    // endregion
    // region extend abstract components
    const {
        AbstractItemsComponent,
        GenericDataService,
        GenericStringCapitalizePipe,
        GenericToolsService
    } = index
    // IgnoreTypeCheck
    @Component({
        selector: 'items',
        template: '<div></div>'
    })
    /**
     * Mockup component to test their abstract ancestor.
     */
    class ItemsComponent extends AbstractItemsComponent {
        /**
         * Sets service instances as instance property values and test route
         * parameter.
         * @param changeDetectorRef - Model dirty checking service.
         * @param data - Data stream service.
         * @param route - Current route state.
         * @param router - Application wide router instance.
         * @param stringCapitalizePipe - String capitalize pipe instance.
         * @param tools - Application wide tools service instance.
         */
        constructor(
            changeDetectorRef:ChangeDetectorRef, data:GenericDataService,
            route:ActivatedRoute, router:Router,
            stringCapitalizePipe:GenericStringCapitalizePipe,
            tools:GenericToolsService
        ):void {
            route.testData = {items: []}
            route.testParameter = {
                limit: 10,
                page: 1,
                searchTerm: 'exact-'
            }
            super(
                changeDetectorRef, data, route, router, stringCapitalizePipe,
                tools)
        }
    }
    // endregion
    return {
        bootstrap: ():Array<Object> => {
            // region prepare services
            $.global.genericInitialData = {configuration: {
                database: {
                    model: {
                        entities: {Test: {
                            _attachments: {'.+\\.(?:jpe?g|png)': {
                                contentTypeRegularExpressionPattern:
                                    '^image/.+',
                                maximum: 1,
                                onCreateExpression: `{name: 'a.jpg'}`
                            }},
                            _id: {mutable: false},
                            _rev: {mutable: false},
                            a: {}
                        }},
                        property: {
                            defaultSpecification: {minimum: 0},
                            name: {
                                reserved: ['_deleted', '_id', '_rev'],
                                special: {
                                    allowedRoles: '_allowedRoles',
                                    attachments: '_attachments',
                                    constraints: {
                                        execution: '_constraintExecutions',
                                        expression: '_constraintExpressions'
                                    },
                                    extend: '_extends',
                                    revisions: '_revisions',
                                    type: '-type',
                                    validatedDocumentsCache:
                                        '_validatedDocuments'
                                }
                            }
                        }
                    },
                    options: {adapter: 'memory'},
                    plugins: [PouchDBAdapterMemory],
                    url: 'test'
                },
                test: true
            }}
            const GenericModule:Object = index.default
            const {
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
                GenericDataScopeService,
                AbstractResolver
            } = index
            // IgnoreTypeCheck
            @Injectable()
            /**
             * Dummy resolver to test the abstract resolver class.
             */
            class Resolver extends AbstractResolver {
                type:string = 'Test'
                /**
                 * Initializes the abstract resolver class.
                 * @param data - Injected data service instance.
                 * @param escapeRegularExpressions - Injected regular
                 * expression escape pipe instance.
                 * @param extendObject - Injected extend object pipe instance.
                 * @param initialData - Injected initial data service instance.
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
                declarations: [ApplicationComponent, ItemsComponent],
                imports: [GenericModule, NoopAnimationsModule],
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
                 * @param canDeactivateRouteLeave - Injected can deactivate
                 * route leave guard instance.
                 * @param data - Injected data service instance.
                 * @param dataScope - Injected data scope service instance.
                 * @param extractRawData - Injected extract raw data pipe
                 * instance.
                 * @param extendObject - Injected extend object data pipe.
                 * @param getFilenameByPrefix - Injected filename getter pipe
                 * instance.
                 * @param initialData - Injected initial data service instance.
                 * @param isDefined - Injected is defined pipe instance.
                 * @param map - Injected map pipe instance.
                 * @param md5 - Injected md5 pipe instance.
                 * @param numberPercent - Injected number percent pipe
                 * instance.
                 * @param resolver - Injected resolver service instance.
                 * @param stringEndsWith - Injected string ends with pipe
                 * instance.
                 * @param stringHasTimeSuffix - Injected string has time suffix
                 * instance.
                 * @param stringMatch - Injected string match pipe instance.
                 * @param stringReplace - Injected string replace pipe
                 * instance.
                 * @param stringShowIfPatternMatches - Injected string show
                 * pipe instance.
                 * @param stringSliceMatch - Injected string slice match pipe
                 * instance.
                 * @param stringStartsWith - Injected start starts with pipe
                 * instances.
                 * @param tools - Injected tools service instance.
                 * @param type - Injected type pipe instance.
                 * @returns Nothing.
                 */
                constructor(
                canDeactivateRouteLeave:GenericCanDeactivateRouteLeaveGuard,
                    data:GenericDataService,
                    dataScope:GenericDataScopeService,
                    extractRawData:GenericExtractRawDataPipe,
                    extendObject:GenericExtendObjectPipe,
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
                        // region _convertDateToTimestampRecursively
                        for (const test:Array<any> of [
                            [{}, {}],
                            [null, null],
                            [true, true],
                            [2, 2],
                            [0, 0],
                            [[], []],
                            [[1], [1]],
                            [[1, 2], [1, 2]],
                            [[1, new Date(0)], [1, 0]],
                            [{a: 1, b: true}, {a: 1, b: true}],
                            [{a: new Date(Date.UTC(1970, 0, 1))}, {a: 0}],
                            [{a: new Date(0)}, {a: 0}],
                            [{a: new Date(0), b: [2, 3]}, {a: 0, b: [2, 3]}],
                            [{a: [new Date(90)]}, {a: [90]}]
                        ])
                            assert.deepEqual(
                                extractRawData.constructor
                                    ._convertDateToTimestampRecursively(
                                        test[0]),
                                test[1])
                        // endregion
                        // region _handleAttachmentChanges
                        for (const test:Array<any> of [
                            [{}, {}, true, [], {}],
                            [
                                {}, {a: {value: {name: 'a'}}}, true, [],
                                {_attachments: {a: {data: null}}}
                            ],
                            [{}, {a: {value: {name: 'a'}}}, true, ['a'], {}],
                            [
                                {_attachments: {a: {}}},
                                {'[ab]': {value: {name: 'b'}}}, true, [],
                                {_attachments: {a: {}, b: {data: null}}}
                            ],
                            [
                                {_attachments: {a: {}}},
                                {'[ab]': {value: {name: 'b'}}}, false, [],
                                {_attachments: {a: {}}}
                            ]
                        ])
                            assert.deepEqual(
                                extractRawData._handleAttachmentChanges(
                                    test[0], test[1], test[2], test[3]
                                ), test[4])
                        // endregion
                        // region transform
                        for (const test:Array<any> of [
                            [[{}], null],
                            [[{}, {}], null],
                            [[{}, {}, false], null],
                            [[{a: 2}, {}, false], {a: 2}],
                            [[{a: undefined, b: null, c: ''}, {}, false], null],
                            [[{a: undefined, b: null, c: '', d: {}}], {d: {}}],
                            [[{a: undefined, b: 3}], {b: 3}],
                            [[{a: undefined, _revisions: 3}], null],
                            [[{_attachments: undefined}], null],
                            [[{_attachments: {a: {}}}], null],
                            [[{_attachments: {a: {data: 2}}}], {_attachments: {
                                a: {
                                    content_type: 'application/octet-stream',
                                    data: 2
                                }
                            }}],
                            [[{_attachments: {a: {
                                content_type: 'a/b', data: 2
                            }}}], {_attachments: {a: {
                                content_type: 'a/b', data: 2
                            }}}],
                            [[{_attachments: {a: {data: 2}}}, {_attachments: {
                                a: {data: 2}
                            }}], null],
                            [[{_attachments: {a: {
                                content_type: 'a/b', data: 2
                            }}}, {_attachments: {a: {
                                content_type: 'a/b',
                                data: 2
                            }}}], null],
                            [[{_attachments: {a: {data: 2}}}, {_attachments: {
                                a: {
                                    content_type: 'application/octet-stream',
                                    data: 2
                                }
                            }}], null],
                            [[{_attachments: {a: {data: 2}}}, {_attachments: {
                                a: {data: 3}
                            }}], {_attachments: {a: {
                                content_type: 'application/octet-stream',
                                data: 2
                            }}}],
                            [[{_attachments: {a: {
                                content_type: 'a/b',
                                data: 2
                            }}}, {_attachments: {a: {data: 2}}}], {
                                _attachments: {a: {
                                    content_type: 'a/b',
                                    data: 2
                                }}
                            }],
                            [[{}, {a: {value: 2}}], {a: null}],
                            [[{'-type': 'Test', b: 2}], null],
                            [
                                [{'-type': 'Test', a: '2', b: 2}],
                                {'-type': 'Test', a: '2'}
                            ],
                            [[{'-type': 'Test', a: '2', b: 2}, {
                                '-type': 'Test', a: {value: '2'}
                            }], null]
                        ])
                            assert.deepEqual(
                                extractRawData.transform(...test[0]), test[1])
                        // endregion
                    })
                    self.test(`GenericIsDefinedPipe (${roundType})`, (
                        assert:Object
                    ):void => {
                        for (const test:any of [
                            2, true, {}, null, new Error('a'), Object, []
                        ])
                            assert.ok(isDefined.transform(test))
                        assert.notOk(isDefined.transform(null, true))
                        assert.notOk(isDefined.transform(undefined))
                        assert.notOk(isDefined.transform(undefined, true))
                    })
                    self.test(
                        `GenericGetFilenameByPrefixPipe (${roundType})`,
                        (assert:Object):void => {
                            for (const test:Array<any> of [
                                [[{}], null],
                                [[{a: 2}], 'a'],
                                [[{a: 2, b: 3}, 'b'], 'b'],
                                [[{a: 2, b: 3}, 'c'], null]
                            ])
                                assert.strictEqual(
                                    getFilenameByPrefix.transform(...test[0]),
                                    test[1])
                        })
                    self.test(`GenericMapPipe (${roundType})`, (
                        assert:Object
                    ):void => {
                        assert.deepEqual(map.transform(
                            ['a', 'b', 'ab'], GenericStringEndsWithPipe, 'b'
                        ), [false, true, true])
                    })
                    self.test(`GenericTypePipe (${roundType})`, (
                        assert:Object
                    ):void => {
                        for (const test:Array<any> of [
                            [null, 'object'],
                            [true, 'boolean'],
                            [false, 'boolean'],
                            [2, 'number'],
                            [{}, 'object'],
                            [[], 'object']
                        ])
                            assert.strictEqual(
                                type.transform(test[0]), test[1])
                    })
                    // / endregion
                    // / region string
                    self.test(`GenericStringEndsWithPipe (${roundType})`, (
                        assert:Object
                    ):void => {
                        assert.ok(stringEndsWith.transform('aab', 'b'))
                        assert.notOk(stringEndsWith.transform('aab', 'a'))
                    })
                    self.test(
                        `GenericStringHasTimeSuffixPipe (${roundType})`,
                        (assert:Object):void => {
                            for (const test:string of [
                                'aDate', 'aTime', 'aDateTime', 'timestamp'
                            ])
                                assert.ok(stringHasTimeSuffix.transform(test))
                            for (const test:any of [
                                'a', 'atime', 'aDatetime', 'timestamptime',
                                false, null, {}
                            ])
                                assert.notOk(stringHasTimeSuffix.transform(
                                    test))
                        })
                    self.test(`GericStringMatchPipe (${roundType})`, (
                        assert:Object
                    ):void => {
                        for (const test:Array<any> of [
                            ['a', 'a'],
                            ['[ab]', 'a'],
                            ['^[ab]$', 'a', 'g'],
                            [/^[ab]$/, 'a', 'g'],
                            [/a/, 'A', 'i']
                        ])
                            assert.ok(stringMatch.transform(...test))
                        for (const test:Array<any> of [
                            ['a', 'b'],
                            ['[ab]', 'c'],
                            ['^[ab]$', 'aa', 'g'],
                            [/^[ab]$/, 'aa', 'g'],
                            [/^[ab]$/, 'AA', 'i']
                        ])
                            assert.notOk(stringMatch.transform(...test))
                    })
                    self.test(`GenericStringReplacePipe (${roundType})`, (
                        assert:Object
                    ):void => {
                        for (const test:Array<any> of [
                            [['a', 'a'], ''],
                            [['a', 'a', 'b'], 'b'],
                            [['aa', 'a', 'b', ''], 'ba'],
                            [['aa', 'a', 'b', 'g'], 'bb']
                        ])
                            assert.strictEqual(
                                stringReplace.transform(...test[0]), test[1])
                    })
                    self.test(
                        `GenericStringShowIfPatternMatchesPipe (${roundType})`,
                        (assert:Object):void => {
                            for (const test:Array<any> of [
                                [['a', 'a'], 'a'],
                                [['a', 'b'], ''],
                                [['aa', 'a'], 'aa'],
                                [['aa', /a/], 'aa'],
                                [['aa', 'a', true], ''],
                                [['aa', 'A', false, 'i'], 'aa']
                            ])
                                assert.strictEqual(
                                    stringShowIfPatternMatches.transform(
                                        ...test[0]
                                    ), test[1])
                        })
                    self.test(`GenericStringStartsWithPipe (${roundType})`, (
                        assert:Object
                    ):void => {
                        assert.ok(stringStartsWith.transform('baa', 'b'))
                        assert.notOk(stringStartsWith.transform('baa', 'a'))
                    })
                    self.test(`GenericStringSliceMatchPipe (${roundType})`, (
                        assert:Object
                    ):void => {
                        for (const test:Array<any> of [
                            [['a', 'a'], 'a'],
                            [['a', 'a', 0], 'a'],
                            [['a', 'A', 0, 'i'], 'a'],
                            [['ab', '.(.)', 1, ''], 'b']
                        ])
                            assert.strictEqual(
                                stringSliceMatch.transform(...test[0]), test[1]
                            )
                    })
                    // / endregion
                    self.test(`GenericNumberPercentPipe (${roundType})`, (
                        assert:Object
                    ):void => {
                        for (const test:Array<number> of [
                            [1, 1, 100],
                            [1, 2, 50],
                            [0, 3, 0],
                            [.3, 1, 30],
                            [9, 10, 90]
                        ])
                            assert.strictEqual(
                                numberPercent.transform(test[0], test[1]),
                                test[2])
                    })
                    // endregion
                    // region services
                    self.test(
                        `GenericCanDeactivateRouteLeaveGuard (${roundType})`,
                        (assert:Object):void => {
                            for (const test:Array<any> of [
                                [{}, true],
                                [{canDeactivate: ():false => false}, false]
                            ])
                                assert.strictEqual(
                                    canDeactivateRouteLeave.canDeactivate(
                                        test[0]
                                    ), test[1])
                        })
                    self.test(`GenericDataService (${roundType})`, async (
                        assert:Object
                    ):Promise<void> => {
                        const done:Function = assert.async()
                        try {
                            const item:PlainObject = {
                                _id: 'a', '-type': 'Test', a: 'test'}
                            item._rev = (await data.put(item)).rev
                            assert.deepEqual(await data.get('a'), item)
                            let test:boolean = false
                            const deregister:Function = data.register(
                                'get', async (
                                    result:Promise<PlainObject>
                                ):Promise<PlainObject> => {
                                    test = true
                                    const data:PlainObject = await result
                                    data.test = 2
                                    return data
                                })
                            assert.ok('get' in data.middlewares.post)
                            assert.strictEqual((await data.get('a')).test, 2)
                            assert.ok(test)
                            deregister()
                            assert.notOk('get' in data.middlewares.post)
                            assert.notOk((await data.get('a')).test)
                            await data.destroy()
                            await data.initialize()
                        } catch (error) {
                            console.error(error)
                        }
                        assert.ok(true)
                        done()
                    })
                    self.test(`GenericDataScopeService (${roundType})`, async (
                        assert:Object
                    ):Promise<void> => {
                        const done:Function = assert.async()
                        // region get
                        for (const test:Array<PlainObject> of [
                            [{}, {}],
                            [{a: {value: 2}}, {a: 2}],
                            [{a: {value: 2}, b: 3, _c: {value: 4}}, {a: 2}],
                            [{a: {value: 2}, b: 3, _c: {value: 4},
                                _attachments: null
                            }, {a: 2}],
                            [{
                                a: {value: 2}, b: 3, _c: {value: 4},
                                _attachments: 2
                            }, {a: 2}],
                            [{
                                a: {value: 2}, b: 3, _c: {value: 4},
                                _attachments: {}
                            }, {a: 2}],
                            [{
                                a: {value: 2}, b: 3, _c: {value: 4},
                                _attachments: {a: {value: {name: 'a'}}}
                            }, {a: 2, _attachments: {a: {name: 'a'}}}],
                            [{
                                a: {value: 2}, b: 3, _c: {value: 4}, _id: 2,
                                _attachments: {a: {value: {name: 'a'}}}
                            }, {a: 2, _attachments: {a: {name: 'a'}}, _id: 2}]
                        ])
                            assert.deepEqual(dataScope.get(test[0]), test[1])
                        // endregion
                        // region generate
                        for (const test:Array<any> of [
                            [['Test'], {
                                _attachments: {'.+\\.(?:jpe?g|png)': {
                                    name: '.+\\.(?:jpe?g|png)',
                                    value: {name: 'a.jpg'}
                                }},
                                a: {minimum: 0, name: 'a', value: null}
                            }],
                            [['Test', ['a']], {a: {
                                minimum: 0, name: 'a', value: null
                            }}],
                            [['Test', ['a'], {a: 2}], {a: {
                                minimum: 0, name: 'a', value: 2
                            }}],
                            [['Test', ['_attachments']], {
                                _attachments: {
                                    '.+\\.(?:jpe?g|png)': {
                                        contentTypeRegularExpressionPattern:
                                            '^image/.+',
                                        maximum: 1,
                                        minimum: 0,
                                        name: '.+\\.(?:jpe?g|png)',
                                        onCreateExpression:
                                            initialData.configuration.database
                                            .model.entities.Test
                                            ._attachments['.+\\.(?:jpe?g|png)']
                                            .onCreateExpression,
                                        value: {name: 'a.jpg'}
                                    }
                                }
                            }],
                            [['Test', null, {_attachments: {'b.jpg': {}}}], {
                                _attachments: {'.+\\.(?:jpe?g|png)': {
                                    name: '.+\\.(?:jpe?g|png)',
                                    value: {name: 'b.jpg'}
                                }},
                                a: {minimum: 0, name: 'a', value: null}
                            }],
                            [['Test', null, {_attachments: {}}], {
                                _attachments: {'.+\\.(?:jpe?g|png)': {
                                    name: '.+\\.(?:jpe?g|png)',
                                    value: null
                                }},
                                a: {minimum: 0, name: 'a', value: null}
                            }],
                            [['Test', null, {_attachments: {
                                'b.jpg': {test: 2}
                            }}], {
                                _attachments: {'.+\\.(?:jpe?g|png)': {
                                    name: '.+\\.(?:jpe?g|png)',
                                    value: {
                                        name: 'b.jpg',
                                        test: 2
                                    }
                                }},
                                a: {minimum: 0, name: 'a', value: null}
                            }]
                        ])
                            assert.deepEqual(dataScope.generate(
                                ...test[0]
                            ), extendObject.transform(true, {
                                _metaData: {submitted: false},
                                '-type': 'Test'
                            }, (
                                test[0].length < 2 || test[0][1] === null ?
                                initialData.configuration.database.model
                                    .entities.Test : {}
                            ), test[1]))
                        // endregion
                        // region set
                        assert.deepEqual(await dataScope.set(
                            'Test'
                        ), extendObject.transform(true, {
                            _attachments: {'.+\\.(?:jpe?g|png)': {
                                name: '.+\\.(?:jpe?g|png)',
                                value: {name: 'a.jpg'}
                            }},
                            _metaData: {submitted: false},
                            '-type': 'Test',
                            a: {minimum: 0, name: 'a', value: null}
                        }, initialData.configuration.database.model.entities
                            .Test))
                        // endregion
                        done()
                    })
                    // / region abstract
                    self.test(`AbstractResolver (${roundType})`, async (
                        assert:Object
                    ):Promise<void> => {
                        const done:Function = assert.async()
                        try {
                            for (const name:string of ['_id', 'a'])
                                await data.createIndex({index: {
                                    ddoc: `Test-${name}-GenericIndex`,
                                    fields: ['-type', name],
                                    name: `Test-${name}-GenericIndex`
                                }})
                            const item:PlainObject = {
                                _id: 'a', '-type': 'Test', a: 'test'}
                            item._rev = (await data.put(item)).rev
                            // region list
                            assert.deepEqual(
                                (await resolver.list([{a: 'asc'}]))[0], item)
                            assert.deepEqual((await resolver.list())[0], item)
                            assert.deepEqual(
                                (await resolver.list([]))[0], item)
                            assert.deepEqual((await resolver.list(
                                [{_id: 'asc'}], 1, 1, 'es'
                            ))[0], item)
                            assert.strictEqual((await resolver.list(
                                [{_id: 'asc'}], 2
                            )).length, 0)
                            assert.strictEqual((await resolver.list(
                                [{_id: 'asc'}], 1, 1, 'a'
                            )).length, 0)
                            // endregion
                            // region resolve
                            for (const test:PlainObject of [
                                {},
                                {searchTerm: 'exact-es'},
                                {page: 1},
                                {searchTerm: 'exact-test', page: 1},
                                {searchTerm: 'exact-test', page: 1, limit: 2},
                                {
                                    searchTerm: 'regex-t[ea]+st', page: 1,
                                    limit: 2
                                },
                                {
                                    searchTerm: 'exact-test', page: 1,
                                    limit: 2, sort: 'a-desc'
                                }
                            ])
                                assert.deepEqual((await resolver.resolve({
                                    params: test
                                }))[0], item)
                            for (const test:PlainObject of [
                                {searchTerm: 'exact-a'},
                                {page: 2},
                                {searchTerm: 'exact-testa', page: 1},
                                {searchTerm: 'regex-aa', page: 1, limit: 2},
                                {
                                    searchTerm: 'exact-test', page: 2,
                                    limit: 1, sort: 'a-asc'
                                }
                            ])
                                assert.strictEqual((await resolver.resolve({
                                    params: test
                                })).length, 0)
                            // endregion
                            await data.destroy()
                            await data.initialize()
                            assert.ok(true)
                        } catch (error) {
                            console.error(error)
                            assert.ok(false)
                        }
                        done()
                    })
                    // / endregion
                    // endregion
                }
            }
            this.module(`GenericModule.services (${roundType})`)
            return [Module, {
                declarations: [
                    ItemsComponent,
                    RouterOutletStubComponent
                ],
                imports: [GenericModule, NoopAnimationsModule],
                providers: [
                    {provide: ActivatedRoute, useClass: ActivatedRouteStub},
                    {provide: Router, useClass: RouterStub}
                ]
            }]
            // endregion
        },
        component: function(TestBed:Object, roundType:string):void {
            // region prepare components
            const {
                AbstractInputComponent,
                GenericInputComponent,
                GenericTextareaComponent,
                GenericFileInputComponent,
                GenericPaginationComponent
            } = index
            // endregion
            // region test components
            this.module(`GenericModule.components (${roundType})`)
            // / region input/textarea
            for (const component:AbstractInputComponent of [
                GenericInputComponent, GenericTextareaComponent
            ])
                this.test(
                    `AbstractInputComponent/${component.name} (${roundType})`,
                    async (assert:Object):Promise<void> => {
                        const done:Function = assert.async()
                        try {
                            const fixture:
                                ComponentFixture<AbstractInputComponent> =
                                TestBed.createComponent(component)
                            fixture.componentInstance.model = {
                                disabled: true, name: 'test'
                            }
                            fixture.componentInstance.ngOnInit()
                            assert.strictEqual(
                                fixture.componentInstance.model.disabled, true)
                            assert.ok(
                                fixture.componentInstance.model.hasOwnProperty(
                                    'type'
                                ), true)
                            fixture.detectChanges()
                            await fixture.whenStable()
                            assert.strictEqual(fixture.debugElement.query(
                                By.css('label')
                            ).nativeElement.textContent.trim(), 'test')
                            const inputDomNode:DomNode =
                                fixture.debugElement.query(By.css(
                                    component.name.replace(
                                        /^Generic(.+)Component$/, '$1'
                                    ).toLowerCase()
                                )).nativeElement
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
                            const state:PlainObject = {errors: {
                                required: true
                            }}
                            fixture.componentInstance.onChange(state)
                            assert.deepEqual(
                                fixture.componentInstance.model.state, state)
                            assert.deepEqual(
                                eventGivenModel,
                                fixture.componentInstance.model)
                            fixture.componentInstance
                                .showValidationErrorMessages = true
                            fixture.detectChanges()
                            await fixture.whenStable()
                            assert.strictEqual(fixture.debugElement.query(
                                By.css('md-hint span')
                            ).nativeElement.textContent.trim().replace(
                                /\s+/g, ' '
                            ), 'Bitte füllen Sie das Feld "test" aus.')
                            if (component.name === 'GenericInputComponent') {
                                fixture.componentInstance.type = 'password'
                                fixture.detectChanges()
                                await fixture.whenStable()
                                assert.strictEqual(fixture.debugElement.query(
                                    By.css('input')
                                ).nativeElement.attributes.type.value,
                                'password')
                                fixture.componentInstance.model.type = 'number'
                                inputDomNode.value = 2
                                inputDomNode.dispatchEvent(getNativeEvent(
                                    'input'))
                                fixture.detectChanges()
                                await fixture.whenStable()
                                assert.strictEqual(
                                    fixture.componentInstance.model.value, 2)
                            }
                        } catch (error) {
                            console.error(error)
                        }
                        done()
                    })
            // endregion
            const testName:string =
                'AbstractLiveDataComponent/AbstractItemsComponent (' +
                `${roundType})`
            this.test(testName, async (assert:Object):Promise<void> => {
                const done:Function = assert.async()
                try {
                    const fixture:ComponentFixture<ItemsComponent> =
                        TestBed.createComponent(ItemsComponent)
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.deepEqual(
                        typeof fixture.componentInstance._changesStream,
                        'object')
                    assert.deepEqual(
                        fixture.componentInstance._canceled, false)
                    assert.deepEqual(
                        fixture.componentInstance.onDataChange(), false)
                    assert.deepEqual(
                        fixture.componentInstance.onDataComplete(), false)
                    assert.deepEqual(
                        fixture.componentInstance.onDataError(), false)
                    assert.deepEqual(fixture.componentInstance.items, [])
                    assert.strictEqual(
                        fixture.componentInstance.items.length, 0)
                    assert.strictEqual(
                        fixture.componentInstance.items.total, 0)
                    fixture.componentInstance._route.testData = {items: [{
                        _id: 2}]}
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.deepEqual(fixture.componentInstance.items, [{
                        _id: 2}])
                    assert.strictEqual(
                        fixture.componentInstance.items.length, 1)
                    assert.strictEqual(
                        fixture.componentInstance.items.total, 1)
                    assert.strictEqual(fixture.componentInstance.page, 1)
                    assert.strictEqual(fixture.componentInstance.limit, 10)
                    assert.strictEqual(
                        fixture.componentInstance.regularExpression, false)
                    assert.strictEqual(
                        fixture.componentInstance.searchTerm, '')
                    fixture.componentInstance._route.testParameter = {
                        limit: 2,
                        page: 2,
                        searchTerm: 'regex-test'
                    }
                    assert.strictEqual(fixture.componentInstance.page, 2)
                    assert.strictEqual(fixture.componentInstance.limit, 2)
                    assert.strictEqual(
                        fixture.componentInstance.regularExpression, true)
                    assert.strictEqual(
                        fixture.componentInstance.searchTerm, 'test')
                    fixture.componentInstance.applyPageConstraints()
                    fixture.componentInstance.update(true)
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.strictEqual(
                        fixture.componentInstance._router.url,
                        'items/_id-asc/0/2/regex-test')
                } catch (error) {
                    console.error(error)
                }
                done()
            })
            this.test(`GenericFileInputComponent (${roundType})`, async (
                assert:Object
            ):Promise<void> => {
                const done:Function = assert.async()
                try {
                    const fixture:ComponentFixture<GenericFileInputComponent> =
                        TestBed.createComponent(GenericFileInputComponent)
                    fixture.componentInstance.mapNameToField = ['_id', 'name']
                    fixture.componentInstance.showValidationErrorMessages =
                        true
                    fixture.componentInstance.model = {
                        _id: 'id',
                        _attachments: {name: {
                            nullable: true,
                            value: {
                                content_type: 'text/plain',
                                digest: 'hash',
                                name: 'name'
                            }
                        }},
                        name: 'name'
                    }
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.strictEqual(
                        fixture.componentInstance.file.type, 'text')
                    assert.strictEqual(
                        fixture.componentInstance.file.hash, '#hash')
                    assert.strictEqual(
                        fixture.componentInstance.internalName, 'name')
                    assert.deepEqual(
                        fixture.componentInstance.model._attachments.name
                            .state,
                        {})
                    fixture.componentInstance.input.nativeElement
                        .dispatchEvent(getNativeEvent('change'))
                    fixture.detectChanges()
                    await fixture.whenStable()
                    fixture.componentInstance.file.content_type = 'image/png'
                    fixture.componentInstance.determinePresentationType()
                    assert.strictEqual(
                        fixture.componentInstance.file.type, 'image')
                    await fixture.componentInstance.remove()
                    assert.deepEqual(
                        fixture.componentInstance.model._attachments.name
                            .value,
                        null)
                    fixture.componentInstance.model._attachments.name
                        .nullable = false
                    assert.strictEqual(
                        fixture.componentInstance.model._attachments.name.state
                            .errors,
                        null)
                    await fixture.componentInstance.remove()
                    assert.strictEqual(
                        fixture.componentInstance.model._attachments.name.state
                            .errors.required,
                        true)
                    fixture.componentInstance.synchronizeImmediately = true
                    fixture.componentInstance.model = {
                        _id: 'id',
                        _attachments: {name: {
                            nullable: true,
                            value: {
                                content_type: 'text/plain',
                                digest: 'hash',
                                name: 'name'
                            }
                        }},
                        _rev: '1-a',
                        '-type': 'Test',
                        name: 'name'
                    }
                    fixture.componentInstance.ngOnInit()
                    fixture.componentInstance.ngAfterViewInit()
                    await fixture.componentInstance.remove()
                    assert.ok(
                        fixture.componentInstance.model._attachments.name.state
                            .errors.database)
                } catch (error) {
                    console.error(error)
                }
                done()
            })
            // /  region pagination
            this.test(`GenericPaginationComponent (${roundType})`, async (
                assert:Object
            ):Promise<void> => {
                const done:Function = assert.async()
                try {
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
                    assert.strictEqual(fixture.debugElement.queryAll(By.css(
                        'ul li a'
                    )).length, 7)
                    assert.strictEqual(fixture.componentInstance.lastPage, 5)
                    assert.deepEqual(
                        fixture.componentInstance.pagesRange, [1, 2, 3, 4, 5])
                    assert.strictEqual(
                        fixture.componentInstance.previousPage, 1)
                    assert.strictEqual(fixture.componentInstance.nextPage, 2)
                    assert.deepEqual(
                        fixture.debugElement.query(By.css(
                            '.current'
                        )).nativeElement.className.split(' ').sort(),
                        ['current', 'even', 'page-1', 'previous'])
                    fixture.componentInstance.change(dummyEvent, 3)
                    assert.strictEqual(
                        fixture.componentInstance.previousPage, 2)
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
                } catch (error) {
                    console.error(error)
                }
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
