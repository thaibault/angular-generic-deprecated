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
import PouchDBAdapterMemory from 'pouchdb-adapter-memory'
// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register')
} catch (error) {}

import registerAngularTest from './testRunner'
// endregion
// TODO check if all needed tests exists.
// region tests
registerAngularTest(function(
    ApplicationComponent:Object, roundType:string, targetTechnology:?string,
    $:any
):{
    bootstrap:Function;
    component:Function;
} {
    // region imports
    const {
        ChangeDetectorRef, Component, Injectable, NgModule, SimpleChange
    } = require(
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
        DataService,
        StringCapitalizePipe,
        ToolsService
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
            changeDetectorRef:ChangeDetectorRef, data:DataService,
            route:ActivatedRoute, router:Router,
            stringCapitalizePipe:StringCapitalizePipe, tools:ToolsService
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
                    connector: {
                        adapter: 'memory',
                        /* eslint-disable camelcase */
                        auto_compaction: true,
                        revs_limit: 10
                        /* eslint-enable camelcase */
                    },
                    model: {
                        entities: {Test: {
                            _attachments: {'.+\\.(?:jpe?g|png)': {
                                contentTypeRegularExpressionPattern:
                                    '^image/.+',
                                maximumNumber: 1,
                                minimum: 0,
                                minimumLength: 0,
                                minimumNumber: 0,
                                name: '.+\\.(?:jpe?g|png)',
                                onCreateExpression: `{name: 'a.jpg'}`
                            }},
                            _id: {
                                minimum: 0,
                                minimumLength: 0,
                                minimumNumber: 0,
                                name: '_id',
                                mutable: false
                            },
                            a: {
                                minimum: 0,
                                minimumLength: 0,
                                minimumNumber: 0,
                                name: 'a'
                            }
                        }},
                        property: {
                            defaultSpecification: {
                                minimum: 0,
                                minimumLength: 0,
                                minimumNumber: 0
                            },
                            name: {
                                reserved: [],
                                special: {
                                    allowedRole: '_allowedRoles',
                                    attachment: '_attachments',
                                    conflict: '_conflicts',
                                    constraint: {
                                        execution: '_constraintExecutions',
                                        expression: '_constraintExpressions'
                                    },
                                    deleted: '_deleted',
                                    deletedConflict: '_deleted_conflicts',
                                    extend: '_extends',
                                    id: '_id',
                                    localSequence: '_local_seq',
                                    maximumAggregatedSize:
                                        '_maximumAggregatedSize',
                                    minimumAggregatedSize:
                                        '_minimumAggregatedSize',
                                    revision: '_rev',
                                    revisions: '_revisions',
                                    revisionsInformation: '_revs_info',
                                    strategy: '_updateStrategy',
                                    type: '-type'
                                },
                                validatedDocumentsCache: '_validatedDocuments'
                            }
                        }
                    },
                    plugins: [PouchDBAdapterMemory],
                    url: 'test'
                },
                test: true
            }}
            const Module:Object = index.default
            const {
                AbstractResolver,
                AlertService,
                AttachmentWithPrefixExistsPipe,
                CanDeactivateRouteLeaveGuard,
                DataScopeService,
                ExtendObjectPipe,
                ExtractRawDataPipe,
                GetFilenameByPrefixPipe,
                InitialDataService,
                IsDefinedPipe,
                LimitToPipe,
                MapPipe,
                NumberPercentPipe,
                ObjectKeysPipe,
                StringMD5Pipe,
                StringEscapeRegularExpressionsPipe,
                StringReplacePipe,
                StringShowIfPatternMatchesPipe,
                StringStartsWithPipe,
                StringEndsWithPipe,
                StringMatchPipe,
                StringMaximumLengthPipe,
                StringSliceMatchPipe,
                StringHasTimeSuffixPipe,
                TypePipe,
                defaultAnimation,
                fadeAnimation
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
                 * @param escapeRegularExpressionsPipe - Injected regular
                 * expression escape pipe instance.
                 * @param extendObjectPipe - Injected extend object pipe
                 * instance.
                 * @param initialData - Injected initial data service instance.
                 * @returns Nothing.
                 */
                constructor(
                    data:DataService,
                    /* eslint-disable indent */
            escapeRegularExpressionsPipe:StringEscapeRegularExpressionsPipe,
                    /* eslint-enable indent */
                    extendObjectPipe:ExtendObjectPipe,
                    initialData:InitialDataService
                ):void {
                    super(
                        data, escapeRegularExpressionsPipe, extendObjectPipe,
                        initialData)
                }
            }
            const self:Object = this
            const moduleImports:Array<Object> = [Module, NoopAnimationsModule]
            // IgnoreTypeCheck
            @NgModule({
                bootstrap: [ApplicationComponent],
                declarations: [ApplicationComponent, ItemsComponent],
                imports: moduleImports,
                providers: [Resolver]
            })
            // endregion
            // region test services
            /**
             * Dummy module to inject services to test and test if
             * bootstrapping works.
             */
            class TestModule {
                /**
                 * Dummy constructor to inject needed service instances and
                 * perform various tests.
                 * @param alert - Injected alert service instance.
                 * @param attachmentWithPrefixExistsPipe - Injected attachment
                 * with prefix exists pipe instance.
                 * @param canDeactivateRouteLeave - Injected can deactivate
                 * route leave guard instance.
                 * @param data - Injected data service instance.
                 * @param dataScope - Injected data scope service instance.
                 * @param extractRawDataPipe - Injected extract raw data pipe
                 * instance.
                 * @param extendObjectPipe - Injected extend object data pipe.
                 * @param getFilenameByPrefixPipe - Injected filename getter
                 * pipe instance.
                 * @param initialData - Injected initial data service instance.
                 * @param isDefinedPipe - Injected is defined pipe instance.
                 * @param limitToPipe - Injected limit to pipe instance.
                 * @param mapPipe - Injected map pipe instance.
                 * @param numberPercentPipe - Injected number percent pipe
                 * instance.
                 * @param objectKeysPipe - Injected object keys pipe instance.
                 * @param resolver - Injected resolver service instance.
                 * @param stringEndsWithPipe - Injected string ends with pipe
                 * instance.
                 * @param stringHasTimeSuffixPipe - Injected string has time
                 * suffix pipe instance.
                 * @param stringMatchPipe - Injected string match pipe
                 * instance.
                 * @param stringMaximumLengthPipe - Inject string prefix
                 * description pipe instance.
                 * @param stringMD5Pipe - Injected md5 pipe instance.
                 * @param stringReplacePipe - Injected string replace pipe
                 * instance.
                 * @param stringShowIfPatternMatchesPipe - Injected string show
                 * pipe instance.
                 * @param stringSliceMatchPipe - Injected string slice match
                 * pipe instance.
                 * @param stringStartsWithPipe - Injected start starts with
                 * pipe instances.
                 * @param tools - Injected tools service instance.
                 * @param typePipe - Injected type pipe instance.
                 * @returns Nothing.
                 */
                constructor(
                    alert:AlertService,
                    /* eslint-disable indent */
                attachmentWithPrefixExistsPipe:AttachmentWithPrefixExistsPipe,
                    /* eslint-enable indent */
                    canDeactivateRouteLeave:CanDeactivateRouteLeaveGuard,
                    data:DataService,
                    dataScope:DataScopeService,
                    extractRawDataPipe:ExtractRawDataPipe,
                    extendObjectPipe:ExtendObjectPipe,
                    getFilenameByPrefixPipe:GetFilenameByPrefixPipe,
                    initialData:InitialDataService,
                    isDefinedPipe:IsDefinedPipe,
                    limitToPipe:LimitToPipe,
                    mapPipe:MapPipe,
                    numberPercentPipe:NumberPercentPipe,
                    objectKeysPipe:ObjectKeysPipe,
                    resolver:Resolver,
                    stringEndsWithPipe:StringEndsWithPipe,
                    stringHasTimeSuffixPipe:StringHasTimeSuffixPipe,
                    stringMatchPipe:StringMatchPipe,
                    stringMaximumLengthPipe:StringMaximumLengthPipe,
                    stringMD5Pipe:StringMD5Pipe,
                    stringReplacePipe:StringReplacePipe,
                    /* eslint-disable indent */
                stringShowIfPatternMatchesPipe:StringShowIfPatternMatchesPipe,
                    /* eslint-enable indent */
                    stringSliceMatchPipe:StringSliceMatchPipe,
                    stringStartsWithPipe:StringStartsWithPipe,
                    tools:ToolsService,
                    typePipe:TypePipe
                ):void {
                    (async ():Promise<void> => {
                        await data.initialize()
                        // region basic services
                        self.test(`ToolsService (${roundType})`, (
                            assert:Object
                        ):void => {
                            assert.ok(tools.$)
                            assert.ok(tools.globalContext)
                            assert.strictEqual(tools.tools.stringMD5(
                                'test'
                            ), '098f6bcd4621d373cade4e832627b4f6')
                        })
                        self.test(`InitialDataService (${roundType})`, (
                            assert:Object
                        ):void => assert.strictEqual(
                            initialData.configuration.test, true))
                        // endregion
                        // region pipes
                        // / region forwarded
                        self.test(`StringMD5Pipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            assert.strictEqual(stringMD5Pipe.transform(
                                ''
                            ), 'd41d8cd98f00b204e9800998ecf8427e')
                            assert.strictEqual(stringMD5Pipe.transform(
                                'test'
                            ), '098f6bcd4621d373cade4e832627b4f6')
                        })
                        // / endregion
                        // / region object
                        self.test(
                            `AttachmentWithPrefixExistsPipe (${roundType})`, (
                                assert:Object
                            ):void => {
                                for (const test:Array<any> of [
                                    [{_attachments: {a: {data: ''}}}, 'a'],
                                    [{_attachments: {a: {data: 'a'}}}, 'a']
                                ])
                                    assert.ok(
                                        attachmentWithPrefixExistsPipe
                                            .transform(test[0], test[1]))
                                for (const test:Array<any> of [
                                    [{}, null],
                                    [{}, 'a'],
                                    [{_attachments: {a: {data: 'a'}}}, 'b']
                                ])
                                    assert.notOk(
                                        attachmentWithPrefixExistsPipe
                                            .transform(test[0], test[1]))
                            })
                        self.test(`ExtractRawDataPipe (${roundType})`, (
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
                                [
                                    {a: new Date(0), b: [2, 3]},
                                    {a: 0, b: [2, 3]}
                                ],
                                [{a: [new Date(90000)]}, {a: [90]}]
                            ])
                                assert.deepEqual(
                                    extractRawDataPipe.constructor
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
                                [
                                    {}, {a: {value: {name: 'a'}}}, true, ['a'],
                                    {}
                                ],
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
                                    extractRawDataPipe
                                        ._handleAttachmentChanges(
                                            test[0], test[1], test[2], test[3]
                                        ), test[4])
                            // endregion
                            // region transform
                            for (const test:Array<any> of [
                                [[{}], null],
                                [[{}, {}], null],
                                [[{}, {}, false], null],
                                [[{a: 2}, {}, false], {a: 2}],
                                [[{a: undefined, b: null, c: ''}, {
                                }, false], null],
                                [[{a: undefined, b: null, c: '', d: {
                                }}], {d: {}}],
                                [[{a: undefined, b: 3}], {b: 3}],
                                [[{a: undefined, _revisions: 3}], null],
                                [[{_attachments: undefined}], null],
                                [[{_attachments: {a: {}}}], null],
                                [[{_attachments: {a: {data: 2}}}], {
                                    _attachments: {a: {
                                        /* eslint-disable camelcase */
                                        content_type:
                                            'application/octet-stream',
                                        /* eslint-enable camelcase */
                                        data: 2
                                    }}
                                }],
                                [[{_attachments: {a: {
                                    /* eslint-disable camelcase */
                                    content_type: 'a/b', data: 2
                                    /* eslint-enable camelcase */
                                }}}], {_attachments: {a: {
                                    /* eslint-disable camelcase */
                                    content_type: 'a/b', data: 2
                                    /* eslint-enable camelcase */
                                }}}],
                                [[{_attachments: {a: {data: 2, length: 2}}}, {
                                    _attachments: {a: {value: {
                                        name: 'a', length: 2
                                    }}}
                                }], null],
                                [[{_attachments: {a: {
                                    /* eslint-disable camelcase */
                                    content_type: 'a/b', data: 2, length: 2
                                    /* eslint-enable camelcase */
                                }}}, {_attachments: {a: {value: {
                                    /* eslint-disable camelcase */
                                    content_type: 'a/b', length: 2, name: 'a'
                                    /* eslint-enable camelcase */
                                }}}}], null],
                                // 34.
                                [[{_attachments: {a: {data: 2, length: 2}}}, {
                                    _attachments: {a: {value: {
                                        /* eslint-disable camelcase */
                                        content_type:
                                            'application/octet-stream',
                                        /* eslint-enable camelcase */
                                        length: 2, name: 'a'
                                    }}}
                                }], null],
                                [[{_attachments: {a: {data: 2, length: 2}}}, {
                                    _attachments: {a: {value: {
                                        length: 3, name: 'a'
                                    }}}
                                }], {_attachments: {a: {
                                    /* eslint-disable camelcase */
                                    content_type: 'application/octet-stream',
                                    /* eslint-enable camelcase */
                                    data: 2
                                }}}],
                                [[{_attachments: {a: {
                                    /* eslint-disable camelcase */
                                    content_type: 'a/b', data: 2, length: 2
                                    /* eslint-enable camelcase */
                                }}}, {_attachments: {a: {value: {
                                    length: 2, name: 'a'
                                }}}}], {_attachments: {a: {
                                    /* eslint-disable camelcase */
                                    content_type: 'a/b', data: 2
                                    /* eslint-enable camelcase */
                                }}}],
                                [
                                    [{}, {a: {value: {length: 2, name: 'a'}}}],
                                    {a: null}
                                ],
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
                                    extractRawDataPipe.transform(...test[0]),
                                    test[1])
                            // endregion
                        })
                        self.test(`GetFilenameByPrefixPipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            for (const test:Array<any> of [
                                [[{}], null],
                                [[{a: 2}], 'a'],
                                [[{a: 2, b: 3}, 'b'], 'b'],
                                [[{a: 2, b: 3}, 'c'], null]
                            ])
                                assert.strictEqual(
                                    getFilenameByPrefixPipe.transform(
                                        ...test[0]),
                                    test[1])
                        })

                        self.test(`IsDefinedPipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            for (const test:any of [
                                2, true, {}, null, new Error('a'), Object, []
                            ])
                                assert.ok(isDefinedPipe.transform(test))
                            assert.notOk(isDefinedPipe.transform(null, true))
                            assert.notOk(isDefinedPipe.transform(undefined))
                            assert.notOk(isDefinedPipe.transform(
                                undefined, true))
                        })
                        self.test(`LimitToPipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            for (const test:Array<any> of [
                                [[{}], {}],
                                [[2], 2],
                                [[2, 1], '2'],
                                [[{}, 1], []],
                                [[{a: 2}, 1], ['a']],
                                [[{a: 2}, 0], []],
                                [[{a: 2}, 2], ['a']],
                                [[{b: 1, a: 2}, 2], ['a', 'b']],
                                [[[1, 2]], [1, 2]],
                                [[[1, 2], 1, 1], [2]],
                                [[[1, 2, 3], 1, -1], [3]],
                                [[[1, 2, 3], -2, 0], [2, 3]],
                                [[null], null],
                                [[2], 2],
                                [[[1, 2, 3], 2], [1, 2]]
                            ])
                                assert.deepEqual(
                                    limitToPipe.transform(...test[0]), test[1])
                        })
                        self.test(`MapPipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            assert.deepEqual(mapPipe.transform(
                                ['a', 'b', 'ab'], StringEndsWithPipe, 'b'
                            ), [false, true, true])
                        })
                        self.test(`ObjectKeysPipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            for (const test:Array<any> of [
                                [[{}], []],
                                [[null], []],
                                [[2], []],
                                [[[2]], ['0']],
                                [[{a: 2}], ['a']],
                                [[{b: 3, a: 2}, true], ['a', 'b']],
                                [[{b: 3, a: 2}, true, true], ['b', 'a']],
                                [[{
                                    '2-a': 3, '1-b': 2, '3-c': 3
                                }, true, true, true], ['3-c', '2-a', '1-b']],
                                [[{
                                    '2-a': 3, '1-b': 2, a: 4, '3-c': 3
                                }, true, true, true], [
                                    'a', '3-c', '2-a', '1-b']]
                            ])
                                assert.deepEqual(objectKeysPipe.transform(
                                    ...test[0]
                                ), test[1])
                        })
                        self.test(`TypePipe (${roundType})`, (
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
                                    typePipe.transform(test[0]), test[1])
                        })
                        // / endregion
                        // / region string
                        self.test(`StringEndsWithPipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            assert.ok(stringEndsWithPipe.transform('aab', 'b'))
                            assert.notOk(stringEndsWithPipe.transform(
                                'aab', 'a'))
                        })
                        self.test(`StringHasTimeSuffixPipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            for (const test:string of [
                                'aDate', 'aTime', 'aDateTime', 'timestamp'
                            ])
                                assert.ok(stringHasTimeSuffixPipe.transform(
                                    test))
                            for (const test:any of [
                                'a', 'atime', 'aDatetime', 'timestamptime',
                                false, null, {}
                            ])
                                assert.notOk(stringHasTimeSuffixPipe.transform(
                                    test))
                        })
                        self.test(`StringMatchPipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            for (const test:Array<any> of [
                                ['a', 'a'],
                                ['[ab]', 'a'],
                                ['^[ab]$', 'a', 'g'],
                                [/^[ab]$/, 'a', 'g'],
                                [/a/, 'A', 'i']
                            ])
                                assert.ok(stringMatchPipe.transform(...test))
                            for (const test:Array<any> of [
                                ['a', 'b'],
                                ['[ab]', 'c'],
                                ['^[ab]$', 'aa', 'g'],
                                [/^[ab]$/, 'aa', 'g'],
                                [/^[ab]$/, 'AA', 'i']
                            ])
                                assert.notOk(stringMatchPipe.transform(
                                    ...test))
                        })
                        self.test(`StringMaximumLengthPipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            for (const test:Array<any> of [
                                [[null], ''],
                                [[''], ''],
                                [['a'], 'a'],
                                [['ab', 1], 'ab'],
                                [['abc', 1], 'abc'],
                                [['abc', 3], 'abc'],
                                [['abcd', 3], 'abcd'],
                                [['abcd', 3, '..'], 'a..'],
                                [['abcde', 3], 'a...'],
                                [['abcdef', 3], 'a...'],
                                [['abcdef', 4], 'a...'],
                                [['abcdef', 5], 'ab...'],
                                [['abcde', 5], 'abcde']
                            ])
                                assert.strictEqual(
                                    stringMaximumLengthPipe.transform(
                                        ...test[0]),
                                    test[1])
                        })
                        self.test(`StringReplacePipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            for (const test:Array<any> of [
                                [['a', 'a'], ''],
                                [['a', 'a', 'b'], 'b'],
                                [['aa', 'a', 'b', ''], 'ba'],
                                [['aa', 'a', 'b', 'g'], 'bb']
                            ])
                                assert.strictEqual(
                                    stringReplacePipe.transform(...test[0]),
                                    test[1])
                        })
                        self.test(
                            `StringShowIfPatternMatchesPipe (${roundType})`,
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
                                        stringShowIfPatternMatchesPipe
                                            .transform(...test[0]), test[1])
                            })
                        self.test(`StringStartsWithPipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            assert.ok(stringStartsWithPipe.transform(
                                'baa', 'b'))
                            assert.notOk(
                                stringStartsWithPipe.transform('baa', 'a'))
                        })
                        self.test(`StringSliceMatchPipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            for (const test:Array<any> of [
                                [['a', 'a'], 'a'],
                                [['a', 'a', 0], 'a'],
                                [['a', 'A', 0, 'i'], 'a'],
                                [['ab', '.(.)', 1, ''], 'b']
                            ])
                                assert.strictEqual(
                                    stringSliceMatchPipe.transform(...test[0]),
                                    test[1])
                        })
                        // / endregion
                        // / region number
                        self.test(`NumberPercentPipe (${roundType})`, (
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
                                    numberPercentPipe.transform(
                                        test[0], test[1]),
                                    test[2])
                        })
                        // / endregion
                        // endregion
                        // region animations
                        self.test(`fadeAnimation (${roundType})`, (
                            assert:Object
                        ):void => assert.strictEqual(
                            typeof fadeAnimation(), 'object'))
                        self.test(`defaultAnimation (${roundType})`, (
                            assert:Object
                        ):void => assert.strictEqual(
                            typeof defaultAnimation(), 'object'))
                        // endregion
                        // region services
                        self.test(
                            `CanDeactivateRouteLeaveGuard (${roundType})`, (
                                assert:Object
                            ):void => {
                                for (const test:Array<any> of [
                                    [{}, true],
                                    [{canDeactivate: ():false => false}, false]
                                ])
                                    assert.strictEqual(
                                        canDeactivateRouteLeave.canDeactivate(
                                            test[0]
                                        ), test[1])
                            })
                        // / region confirm
                        self.test(`AlertService (${roundType})`, (
                            assert:Object
                        ):void => {
                            const done:Function = assert.async()
                            alert.confirm('test').then((result:true):void =>
                                assert.ok(result))
                            alert.dialogReference.close(true)
                            alert.confirm('test').then((result:true):void => {
                                assert.notOk(result)
                                done()
                            })
                            alert.dialogReference.close(false)
                        })
                        // / endregion
                        self.test(`DataService (${roundType})`, async (
                            assert:Object
                        ):Promise<void> => {
                            const done:Function = assert.async()
                            try {
                                const item:PlainObject = {
                                    _id: 'a', _rev: 'upsert', '-type': 'Test',
                                    a: 'test'}
                                item._rev = (await data.put(item)).rev
                                assert.deepEqual(await data.get('a'), item)
                                item.a = 'a'
                                item._rev = (await data.bulkDocs([item]))[
                                    0
                                ].rev
                                item._rev = 'upsert'
                                item._rev = (await data.bulkDocs([item]))[
                                    0
                                ].rev
                                item._rev = 'latest'
                                item._rev = (await data.bulkDocs([item]))[
                                    0
                                ].rev
                                item._rev = 'upsert'
                                item._rev = (await data.put(item)).rev
                                item._rev = 'latest'
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
                                assert.strictEqual(
                                    (await data.get('a')).test, 2)
                                assert.ok(test)
                                deregister()
                                assert.notOk('get' in data.middlewares.post)
                                assert.notOk((await data.get('a')).test)
                                await data.destroy()
                                await data.initialize()
                            } catch (error) {
                                console.error(error)
                                assert.ok(false)
                            }
                            assert.ok(true)
                            done()
                        })
                        self.test(`DataScopeService (${roundType})`, async (
                            assert:Object
                        ):Promise<void> => {
                            const done:Function = assert.async()
                            try {
                                // region determine
                                // TODO
                                // endregion
                                // region extract
                                for (const test:Array<PlainObject> of [
                                    [{}, {}],
                                    [2, 2],
                                    [false, false],
                                    [true, true],
                                    [0, 0],
                                    [{value: 2}, 2],
                                    [{value: {a: 2}}, {a: 2}],
                                    [
                                        {value: {a: {value: 2}}},
                                        {a: {value: 2}}
                                    ],
                                    [
                                        {
                                            value: {a: {value: 2},
                                            '-type': 'Test'}
                                        },
                                        {a: 2}
                                    ],
                                    [
                                        [{
                                            value: {a: {value: 2},
                                            '-type': 'Test'}
                                        }],
                                        [{a: 2}]
                                    ],
                                    [
                                        [{
                                            value: {a: {value: 2},
                                            metaData: true,
                                            '-type': 'Test'}
                                        }],
                                        [{a: 2}]
                                    ],
                                    [
                                        [[[{
                                            value: {a: {value: 2},
                                            metaData: true,
                                            '-type': 'Test'}
                                        }]]],
                                        [[[{a: 2}]]]
                                    ]
                                ])
                                    assert.deepEqual(
                                        dataScope.extract(test[0]), test[1])
                                // endregion
                                // region get
                                for (const test:Array<PlainObject> of [
                                    [{}, {}],
                                    [{a: {value: 2}}, {a: 2}],
                                    [
                                        {a: {value: 2}, b: 3, _c: {value: 4}},
                                        {a: 2, b: 3, _c: 4}
                                    ],
                                    [{a: {value: {a: 2}}}, {a: {a: 2}}],
                                    [
                                        {a: {value: {a: {value: 2}}}},
                                        {a: {a: {value: 2}}}
                                    ],
                                    [
                                        {a: {value: {
                                            a: {value: 2}, '-type': 'Test'
                                        }}},
                                        {a: {a: 2}}
                                    ],
                                    [
                                        {a: {value: {
                                            a: {value: 2},
                                            metaData: true,
                                            '-type': 'Test'
                                        }}},
                                        {a: {a: 2}}
                                    ],
                                    [
                                        {a: {value: [{
                                            a: {value: 2},
                                            metaData: true,
                                            '-type': 'Test'
                                        }]}},
                                        {a: [{a: 2}]}
                                    ],
                                    [
                                        {a: {value: [[{
                                            a: {value: 2},
                                            metaData: true,
                                            '-type': 'Test'
                                        }]]}},
                                        {a: [[{a: 2}]]}
                                    ],
                                    [
                                        {a: {value: [[{
                                            a: {value: [[{
                                                a: {value: 2},
                                                metaData: true,
                                                '-type': 'Test'
                                            }]]},
                                            metaData: true,
                                            '-type': 'Test'
                                        }]]}},
                                        {a: [[{a: [[{a: 2}]]}]]}
                                    ],
                                    [{
                                        a: {value: 2}, b: 3, _c: {value: 4},
                                        _attachments: null, '-type': 'Test'
                                    }, {a: 2}],
                                    [{
                                        a: {value: 2}, b: 3, _c: {value: 4},
                                        _attachments: {}
                                    }, {a: 2, b: 3, _c: 4}],
                                    [{a: {value: 2}, b: 3, _attachments: {a: {
                                        value: {name: 'a'}
                                    }}}, {a: 2, b: 3, _attachments: {a: {
                                        name: 'a'
                                    }}}],
                                    [{
                                        a: {value: 2}, b: 3, _c: {value: 4},
                                        _id: 2,
                                        _attachments: {a: {value: {
                                            name: 'a'
                                        }}},
                                        '-type': 'Test'
                                    }, {
                                        a: 2,
                                        _attachments: {a: {name: 'a'}},
                                        _id: 2
                                    }]
                                ])
                                    assert.deepEqual(
                                        dataScope.get(test[0]), test[1])
                                // endregion
                                // region generate
                                for (const test:Array<any> of [
                                    [['Test'], {
                                        _attachments: {'.+\\.(?:jpe?g|png)': {
                                            value: {name: 'a.jpg'}
                                        }},
                                        _id: {value: null},
                                        a: {value: null}
                                    }],
                                    [['Test', ['a']], {a: {
                                        minimum: 0,
                                        minimumLength: 0,
                                        minimumNumber: 0,
                                        name: 'a',
                                        value: null
                                    }}],
                                    [['Test', ['a'], {a: 2}], {a: {
                                        minimum: 0,
                                        minimumLength: 0,
                                        minimumNumber: 0,
                                        name: 'a',
                                        value: 2
                                    }}],
                                    [['Test', [
                                        '_attachments'
                                    ]], {_attachments: {
                                        '.+\\.(?:jpe?g|png)': {
                                            /* eslint-disable indent */
                                        contentTypeRegularExpressionPattern:
                                                '^image/.+',
                                            /* eslint-enable indent */
                                            maximumNumber: 1,
                                            minimum: 0,
                                            minimumLength: 0,
                                            minimumNumber: 0,
                                            name: '.+\\.(?:jpe?g|png)',
                                            onCreateExpression:
                                                initialData.configuration
                                                    .database.model.entities
                                                    .Test._attachments[
                                                        '.+\\.(?:jpe?g|png)'
                                                    ].onCreateExpression,
                                            value: {name: 'a.jpg'}
                                        }
                                    }}],
                                    [['Test', null, {_attachments: {'b.jpg': {
                                    }}}], {
                                        _attachments: {'.+\\.(?:jpe?g|png)': {
                                            value: {name: 'b.jpg'}
                                        }},
                                        _id: {value: null},
                                        a: {value: null}
                                    }],
                                    [['Test', null, {_attachments: {}}], {
                                        _attachments: {'.+\\.(?:jpe?g|png)': {
                                            value: null
                                        }},
                                        _id: {value: null},
                                        a: {value: null}
                                    }],
                                    [['Test', null, {_attachments: {
                                        'b.jpg': {test: 2}
                                    }}], {
                                        _attachments: {'.+\\.(?:jpe?g|png)': {
                                            value: {
                                                name: 'b.jpg',
                                                test: 2
                                            }
                                        }},
                                        _id: {value: null},
                                        a: {value: null}
                                    }]
                                ])
                                    assert.deepEqual(dataScope.generate(
                                        ...test[0]
                                    ), extendObjectPipe.transform(true, {
                                        _metaData: {submitted: false},
                                        '-type': 'Test'
                                    }, (
                                        test[0].length < 2 ||
                                        test[0][1] === null
                                    ) ? initialData.configuration.database
                                            .model.entities.Test : {}, test[1]
                                    ))
                                const modelBackup:PlainObject =
                                    initialData.configuration.database.model
                                        .entities
                                initialData.configuration.database.model
                                    .entities = {
                                        A: {
                                            a: {
                                                minimum: 0,
                                                minimumLength: 0,
                                                minimumNumber: 0,
                                                name: 'a'
                                            },
                                            b: {
                                                minimum: 0,
                                                minimumLength: 0,
                                                minimumNumber: 0,
                                                name: 'b'
                                            }
                                        },
                                        Test: {a: {
                                            default: {
                                                a: 'a',
                                                b: 'b'
                                            },
                                            minimum: 0,
                                            minimumLength: 0,
                                            minimumNumber: 0,
                                            name: 'a',
                                            type: 'A'
                                        }}
                                    }
                                assert.deepEqual(dataScope.generate(
                                    'Test'
                                ), extendObjectPipe.transform(true, {
                                    _metaData: {submitted: false},
                                    '-type': 'Test',
                                    a: {value: extendObjectPipe.transform(
                                        true, {
                                            '-type': 'A',
                                            _metaData: {submitted: false},
                                            a: {
                                                value: 'a'
                                            },
                                            b: {
                                                value: 'b'
                                            }
                                        },
                                        initialData.configuration.database
                                            .model.entities.A
                                    )}
                                }, initialData.configuration.database.model
                                    .entities.Test))
                                initialData.configuration.database.model
                                    .entities = {
                                        A: {a: {
                                            minimum: 0,
                                            minimumLength: 0,
                                            minimumNumber: 0,
                                            name: 'a'
                                        }},
                                        Test: {a: {
                                            default: [{a: 'a'}],
                                            minimum: 0,
                                            minimumLength: 0,
                                            minimumNumber: 0,
                                            name: 'a',
                                            type: 'A[]'
                                        }}
                                    }
                                assert.deepEqual(dataScope.generate(
                                    'Test'
                                ), extendObjectPipe.transform(
                                    true, {},
                                    initialData.configuration.database.model
                                        .entities.Test,
                                    {
                                        _metaData: {submitted: false},
                                        '-type': 'Test',
                                        a: {value: [extendObjectPipe.transform(
                                            true, {
                                                '-type': 'A',
                                                _metaData: {submitted: false},
                                                a: {value: 'a'}
                                            },
                                            initialData.configuration.database
                                                .model.entities.A
                                        )]}
                                    }))
                                initialData.configuration.database.model
                                    .entities = modelBackup
                                // endregion
                                // region set
                                assert.deepEqual(await dataScope.determine(
                                    'Test'
                                ), extendObjectPipe.transform(true, {
                                    _attachments: {'.+\\.(?:jpe?g|png)': {
                                        name: '.+\\.(?:jpe?g|png)',
                                        value: {name: 'a.jpg'}
                                    }},
                                    _id: {
                                        name: '_id',
                                        value: null
                                    },
                                    _metaData: {submitted: false},
                                    '-type': 'Test',
                                    a: {
                                        minimum: 0,
                                        minimumLength: 0,
                                        minimumNumber: 0,
                                        name: 'a',
                                        value: null
                                    }
                                }, initialData.configuration.database.model
                                    .entities.Test))
                                // endregion
                            } catch (error) {
                                console.error(error)
                                assert.ok(false)
                            }
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
                                    _id: 'a', _rev: 'upsert', '-type': 'Test',
                                    a: 'test'}
                                item._rev = (await data.put(item)).rev
                                // region list
                                assert.deepEqual(
                                    (await resolver.list([{a: 'asc'}]))[0],
                                    item)
                                assert.deepEqual(
                                    (await resolver.list())[0], item)
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
                                    {
                                        searchTerm: 'exact-test', page: 1,
                                        limit: 2
                                    },
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
                    })()
                }
            }
            this.module(`Module.services (${roundType})`)
            // endregion
            return [TestModule, {
                declarations: [
                    ItemsComponent,
                    RouterOutletStubComponent
                ],
                imports: moduleImports,
                providers: [
                    {provide: ActivatedRoute, useClass: ActivatedRouteStub},
                    {provide: Router, useClass: RouterStub}
                ]
            }]
        },
        component: function(TestBed:Object, roundType:string):void {
            // region prepare components
            const {
                AbstractInputComponent,
                ConfirmComponent,
                FileInputComponent,
                InputComponent,
                PaginationComponent,
                SimpleInputComponent,
                TextareaComponent
            } = index
            // endregion
            // region test components
            this.module(`Module.components (${roundType})`)
            // /  region confirm
            this.test(`ConfirmComponent (${roundType})`, async (
                assert:Object
            ):Promise<void> => {
                const done:Function = assert.async()
                try {
                    const fixture:ComponentFixture<ConfirmComponent> =
                        TestBed.createComponent(ConfirmComponent)
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.strictEqual(
                        fixture.componentInstance.cancelText, 'Cancel')
                    assert.strictEqual(
                        fixture.componentInstance.dialogReference, null)
                    assert.strictEqual(fixture.componentInstance.okText, 'OK')
                } catch (error) {
                    console.error(error)
                    assert.ok(false)
                }
                done()
            })
            // / endregion
            // / region input/select/textarea
            for (const component:AbstractInputComponent of [
                InputComponent, TextareaComponent, SimpleInputComponent
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
                                disabled: true, name: 'test', trim: true,
                                onUpdateExpression:
                                    `typeof newDocument[name] === 'string' ?` +
                                    ` newDocument[name].replace('c', 'C') : ` +
                                    'newDocument[name]'
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
                                    'input, select, textarea')).nativeElement
                            inputDomNode.value = 'aa'
                            inputDomNode.dispatchEvent(getNativeEvent('input'))
                            await fixture.whenStable()
                            assert.strictEqual(
                                fixture.componentInstance.model.value, 'aa')
                            fixture.componentInstance.model.maximumLength = 2
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
                            fixture.componentInstance.onChange(null, state)
                            fixture.componentInstance.modelChange.emit(
                                fixture.componentInstance.model)
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
                                By.css('span[generic-error] p')
                            ).nativeElement.textContent.trim().replace(
                                /\s+/g, ' '
                            ), 'Bitte füllen Sie das Feld "test" aus.')
                            inputDomNode.value = '  b '
                            inputDomNode.dispatchEvent(getNativeEvent('input'))
                            fixture.detectChanges()
                            await fixture.whenStable()
                            assert.deepEqual(
                                'b', fixture.componentInstance.model.value)
                            inputDomNode.value = '  cb '
                            inputDomNode.dispatchEvent(getNativeEvent('input'))
                            fixture.detectChanges()
                            await fixture.whenStable()
                            assert.deepEqual(
                                'Cb', fixture.componentInstance.model.value)
                            if (component.name === 'SimpleInputComponent') {
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
                                await fixture.whenStable()
                                assert.strictEqual(
                                    fixture.componentInstance.model.value, 2)
                            }
                        } catch (error) {
                            console.error(error)
                            assert.ok(false)
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
                    // region data change listener
                    assert.deepEqual(
                        fixture.componentInstance.onDataChange(), false)
                    assert.deepEqual(
                        fixture.componentInstance.onDataComplete(), false)
                    assert.deepEqual(
                        fixture.componentInstance.onDataError(), false)
                    // endregion
                    assert.deepEqual(fixture.componentInstance.items, [])
                    assert.strictEqual(
                        fixture.componentInstance.items.length, 0)
                    assert.strictEqual(
                        fixture.componentInstance.items.total, 0)
                    // region applyPageConstraints/update
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
                    await fixture.componentInstance.update(true)
                    await fixture.whenStable()
                    assert.strictEqual(
                        fixture.componentInstance._router.url,
                        `${fixture.componentInstance._itemsPath}/_id-asc/0/2` +
                        '/regex-test')
                    // endregion
                    await fixture.componentInstance._router.navigate([
                        fixture.componentInstance._itemsPath, '_id-asc', 1, 2,
                        'regex-'])
                    await fixture.whenStable()
                    assert.strictEqual(
                        fixture.componentInstance._router.url,
                        `${fixture.componentInstance._itemsPath}/_id-asc/1/2` +
                        '/regex-')
                    // region changeItemWrapperFactory
                    assert.strictEqual(
                        await fixture.componentInstance
                            .changeItemWrapperFactory((a:number):number => a)(
                                2),
                        2)
                    await fixture.whenStable()
                    assert.strictEqual(
                        fixture.componentInstance._router.url,
                        `${fixture.componentInstance._itemsPath}/_id-asc/0/2` +
                        '/regex-test')
                    // endregion
                    assert.deepEqual(
                        fixture.componentInstance.selectedItems, new Set())
                    assert.deepEqual(
                        fixture.componentInstance.items, [{_id: 2}])
                    // region clearSelectedItems
                    fixture.componentInstance.selectedItems.add(
                        fixture.componentInstance.items[0])
                    fixture.componentInstance.clearSelectedItems()
                    assert.deepEqual(
                        fixture.componentInstance.items,
                        [{_id: 2, selected: false}])
                    assert.deepEqual(
                        fixture.componentInstance.selectedItems, new Set())
                    // endregion
                    // region gotToItem
                    await fixture.componentInstance.goToItem(1, 2)
                    await fixture.whenStable()
                    assert.strictEqual(
                        fixture.componentInstance._router.url,
                        `${fixture.componentInstance._itemPath}/1/2`)
                    // endregion
                    // region selectedAllItems
                    fixture.componentInstance.clearSelectedItems()
                    fixture.componentInstance.selectAllItems()
                    assert.deepEqual(
                        fixture.componentInstance.items,
                        [{_id: 2, selected: true}])
                    assert.deepEqual(
                        fixture.componentInstance.selectedItems,
                        new Set(fixture.componentInstance.items))
                    // endregion
                    // region updateSearch
                    let test:boolean = false
                    fixture.componentInstance.searchTermStream.map(():void => {
                        test = true
                    }).subscribe()
                    fixture.componentInstance.updateSearch()
                    await fixture.whenStable()
                    assert.ok(test)
                    // endregion
                } catch (error) {
                    console.error(error)
                    assert.ok(false)
                }
                done()
            })
            this.test(`FileInputComponent (${roundType})`, async (
                assert:Object
            ):Promise<void> => {
                const done:Function = assert.async()
                try {
                    const fixture:ComponentFixture<FileInputComponent> =
                        TestBed.createComponent(FileInputComponent)
                    fixture.componentInstance.mapNameToField = ['_id', 'name']
                    fixture.componentInstance.showValidationErrorMessages =
                        true
                    fixture.componentInstance.model = {
                        _id: 'id',
                        _attachments: {name: {
                            nullable: true,
                            value: {
                                /* eslint-disable camelcase */
                                content_type: 'text/plain',
                                /* eslint-enable camelcase */
                                digest: 'hash',
                                name: 'name'
                            }
                        }},
                        name: 'name'
                    }
                    await fixture.componentInstance.ngOnChanges({
                        model: new SimpleChange(
                            null, fixture.componentInstance.model, true)})
                    await fixture.whenStable()
                    assert.strictEqual(
                        fixture.componentInstance.file.type, 'text')
                    assert.strictEqual(
                        fixture.componentInstance.file.query, '?version=hash')
                    assert.strictEqual(
                        fixture.componentInstance.internalName, 'name')
                    assert.deepEqual(
                        fixture.componentInstance.model._attachments.name
                            .state,
                        {})
                    fixture.componentInstance.input.nativeElement
                        .dispatchEvent(getNativeEvent('change'))
                    await fixture.whenStable()
                    /* eslint-disable camelcase */
                    fixture.componentInstance.file.content_type = 'image/png'
                    /* eslint-enable camelcase */
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
                        _attachments: {name: {
                            nullable: true,
                            value: {
                                /* eslint-disable camelcase */
                                content_type: 'text/plain',
                                /* eslint-enable camelcase */
                                digest: 'hash',
                                name: 'name'
                            }
                        }},
                        _id: 'id',
                        _rev: '1-a',
                        '-type': 'Test',
                        name: 'name'
                    }
                    await fixture.componentInstance.ngOnChanges({
                        model: new SimpleChange(
                            null, fixture.componentInstance.model, true)})
                    fixture.componentInstance.ngAfterViewInit()
                    await fixture.componentInstance.remove()
                    assert.ok(
                        fixture.componentInstance.model._attachments.name.state
                            .errors.database)
                } catch (error) {
                    console.error(error)
                    assert.ok(false)
                }
                done()
            })
            // /  region pagination
            this.test(`PaginationComponent (${roundType})`, async (
                assert:Object
            ):Promise<void> => {
                const done:Function = assert.async()
                try {
                    const fixture:ComponentFixture<PaginationComponent> =
                        TestBed.createComponent(PaginationComponent)
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
                    assert.deepEqual(fixture.debugElement.query(By.css(
                        '.current'
                    )).nativeElement.className.split(' ').filter((
                        name:string
                    ):boolean => !name.startsWith('ng-')).sort(),
                    ['current', 'even', 'page-1', 'previous'])
                    fixture.componentInstance.change(dummyEvent, 3)
                    assert.strictEqual(
                        fixture.componentInstance.previousPage, 2)
                    assert.strictEqual(fixture.componentInstance.nextPage, 4)
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.deepEqual(fixture.debugElement.query(By.css(
                        '.current'
                    )).nativeElement.className.split(' ').filter((
                        name:string
                    ):boolean => !name.startsWith('ng-')).sort(),
                    ['current', 'even', 'page-3'])
                    assert.deepEqual(fixture.debugElement.query(By.css(
                        '.previous'
                    )).nativeElement.className.split(' ').filter((
                        name:string
                    ):boolean => !name.startsWith('ng-')).sort(),
                    ['even-page', 'page-2', 'previous'])
                    assert.deepEqual(fixture.debugElement.query(By.css(
                        '.next'
                    )).nativeElement.className.split(' ').filter((
                        name:string
                    ):boolean => !name.startsWith('ng-')).sort(),
                    ['even-page', 'next', 'page-4'])
                    assert.deepEqual(fixture.debugElement.query(By.css(
                        '.last'
                    )).nativeElement.className.split(' ').filter((
                        name:string
                    ):boolean => !name.startsWith('ng-')).sort(),
                    ['even', 'last', 'page-5'])
                    fixture.debugElement.query(By.css(
                        '.next'
                    )).triggerEventHandler('click', dummyEvent)
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.deepEqual(fixture.debugElement.query(By.css(
                        '.current'
                    )).nativeElement.className.split(' ').filter((
                        name:string
                    ):boolean => !name.startsWith('ng-')).sort(),
                    ['current', 'even', 'page-3'])
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
})
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
