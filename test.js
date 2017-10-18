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
import Tools from 'clientnode'
import type {DomNode, PlainObject} from 'clientnode'
import PouchDBAdapterMemory from 'pouchdb-adapter-memory'
// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register')
} catch (error) {}

import registerAngularTest from './testRunner'
// endregion
const blobToBase64String:Function = typeof Blob === 'undefined' ?
    async (file:Object):Promise<string> => file.toString('base64') :
    eval('require')('blob-util').blobToBase64String
// TODO check if all needed tests exists.
// region tests
registerAngularTest(function(
    ApplicationComponent:Object, roundType:string, targetTechnology:?string,
    $:any
):{bootstrap:Function;component:Function} {
    const now:Date = new Date()
    const nowUTCTimestamp:number = Tools.numberGetUTCTimestamp(now)
    // region imports
    const {
        Component,
        Injector,
        NgModule,
        SimpleChange,
        ViewChild
    } = require('@angular/core')
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
    const {
        AbstractItemsComponent,
        AbstractNativeInputComponent,
        AbstractResolver,
        AlertService,
        AttachmentsAreEqualPipe,
        AttachmentWithPrefixExistsPipe,
        CanDeactivateRouteLeaveGuard,
        ConfirmComponent,
        DataScopeService,
        DataService,
        defaultAnimation,
        ExtendObjectPipe,
        ExtractDataPipe,
        ExtractRawDataPipe,
        fadeAnimation,
        FileInputComponent,
        GetFilenameByPrefixPipe,
        InitialDataService,
        InputComponent,
        IsDefinedPipe,
        LimitToPipe,
        MapPipe,
        NumberPercentPipe,
        ObjectKeysPipe,
        PaginationComponent,
        ReversePipe,
        SimpleInputComponent,
        StringEndsWithPipe,
        StringHasTimeSuffixPipe,
        StringMatchPipe,
        StringMaximumLengthPipe,
        StringMD5Pipe,
        StringReplacePipe,
        StringShowIfPatternMatchesPipe,
        StringSliceMatchPipe,
        StringStartsWithPipe,
        StringTemplatePipe,
        TextareaComponent,
        ToolsService,
        TypePipe
    } = index
    const Module:Object = index.default
    // endregion
    // region extend abstract components
    /**
     * Mockup component to test their abstract ancestor.
     */
    @Component({
        selector: 'items',
        template: '<div></div>'
    })
    class ItemsComponent extends AbstractItemsComponent {
        /**
         * Sets route test parameter.
         * @param injector - Injected injector service instance.
         * @param route - Current route state.
         * @returns Nothing.
         */
        constructor(injector:Injector, route:ActivatedRoute):void {
            route.testData = {items: []}
            route.testParameter = {
                limit: 10,
                page: 1,
                searchTerm: 'exact-'
            }
            super(injector)
        }
    }
    // endregion
    // region host components for simulating on push change detection strategy
    /**
     * Mock host component to test pagination on push change detection.
     * @property instance - Reference to hosted component instance.
     * @property itemsPerPage - Forwarded.
     * @property page - Forwarded.
     * @property pageRangeLimit - Forwarded.
     * @property total - Forwarded.
     */
    @Component({
        template: `
            <generic-pagination
                [itemsPerPage]="itemsPerPage"
                [page]="page"
                [pageRangeLimit]="pageRangeLimit"
                [total]="total"
            ></generic-pagination>
        `
    })
    class PaginationHostComponent {
        @ViewChild(PaginationComponent) instance:PaginationComponent
        itemsPerPage:number = 10
        page:number = 1
        pageRangeLimit:number = 4
        total:number = 0
    }
    // endregion
    return {
        bootstrap: ():Array<Object> => {
            // region prepare services
            let specialNames:PlainObject =
                InitialDataService.defaultScope.configuration.database.model
                    .property.name.special
            $.global.genericInitialData = {configuration: {
                database: {
                    connector: {adapter: 'memory'},
                    model: {entities: {Test: {
                        [specialNames.attachment]: {'.+\\.(?:jpe?g|png)': {
                            contentTypeRegularExpressionPattern:
                                '^image/.+',
                            maximumNumber: 1,
                            minimum: 0,
                            minimumLength: 0,
                            minimumNumber: 0,
                            name: '.+\\.(?:jpe?g|png)',
                            onCreateExpression: `{name: 'a.jpg'}`
                        }},
                        [specialNames.id]: {
                            minimum: 0,
                            minimumLength: 0,
                            minimumNumber: 0,
                            name: specialNames.id,
                            mutable: false
                        },
                        a: {
                            minimum: 0,
                            minimumLength: 0,
                            minimumNumber: 0,
                            name: 'a'
                        }
                    }}},
                    plugins: [PouchDBAdapterMemory],
                    url: 'test'
                },
                test: true
            }}
            const self:Object = this
            const moduleImports:Array<Object> = [Module, NoopAnimationsModule]
            // endregion
            // region test services
            /**
             * Dummy module to inject services to test and test if
             * bootstrapping works.
             */
            @NgModule({
                bootstrap: [ApplicationComponent],
                declarations: [ApplicationComponent, ItemsComponent],
                imports: moduleImports
            })
            class TestModule {
                /**
                 * Dummy constructor to inject needed service instances and
                 * perform various tests.
                 * @param data - Injected data service instance.
                 * @param initialData - Injected initial data service instance.
                 * @param injector - Injected injector service instance.
                 * @returns Nothing.
                 */
                constructor(
                    data:DataService, initialData:InitialDataService,
                    injector:Injector
                ):void {
                    initialData.constructor.injectors.add(injector)
                    const get:Function = injector.get.bind(injector);
                    (async ():Promise<void> => {
                        await data.initialize()
                        const alert:AlertService = get(AlertService)
                        const attachmentsAreEqualPipe:AttachmentsAreEqualPipe =
                            get(AttachmentsAreEqualPipe)
                        /* eslint-disable indent */
        const attachmentWithPrefixExistsPipe:AttachmentWithPrefixExistsPipe =
                            get(AttachmentWithPrefixExistsPipe)
                const canDeactivateRouteLeave:CanDeactivateRouteLeaveGuard =
                            get(CanDeactivateRouteLeaveGuard)
                        /* eslint-enable indent */
                        const dataScope:DataScopeService = get(
                            DataScopeService)
                        const extractDataPipe:ExtractDataPipe = get(
                            ExtractDataPipe)
                        const extractRawDataPipe:ExtractRawDataPipe = get(
                            ExtractRawDataPipe)
                        const extendObjectPipe:ExtendObjectPipe = get(
                            ExtendObjectPipe)
                        const getFilenameByPrefixPipe:GetFilenameByPrefixPipe =
                            get(GetFilenameByPrefixPipe)
                        const isDefinedPipe:IsDefinedPipe = get(IsDefinedPipe)
                        const limitToPipe:LimitToPipe = get(LimitToPipe)
                        const mapPipe:MapPipe = get(MapPipe)
                        const numberPercentPipe:NumberPercentPipe = get(
                            NumberPercentPipe)
                        const objectKeysPipe:ObjectKeysPipe = get(
                            ObjectKeysPipe)
                        const resolver:AbstractResolver = get(AbstractResolver)
                        resolver.type = 'Test'
                        const reversePipe:ReversePipe = get(ReversePipe)
                        const stringEndsWithPipe:StringEndsWithPipe = get(
                            StringEndsWithPipe)
                        const stringHasTimeSuffixPipe:StringHasTimeSuffixPipe =
                            get(StringHasTimeSuffixPipe)
                        const stringMatchPipe:StringMatchPipe = get(
                            StringMatchPipe)
                        const stringMaximumLengthPipe:StringMaximumLengthPipe =
                            get(StringMaximumLengthPipe)
                        const stringMD5Pipe:StringMD5Pipe = get(StringMD5Pipe)
                        const stringReplacePipe:StringReplacePipe = get(
                            StringReplacePipe)
                        /* eslint-disable indent */
        const stringShowIfPatternMatchesPipe:StringShowIfPatternMatchesPipe =
                            get(StringShowIfPatternMatchesPipe)
                        /* eslint-enable indent */
                        const stringSliceMatchPipe:StringSliceMatchPipe = get(
                            StringSliceMatchPipe)
                        const stringStartsWithPipe:StringStartsWithPipe = get(
                            StringStartsWithPipe)
                        const stringTemplatePipe:StringTemplatePipe = get(
                            StringTemplatePipe)
                        const tools:ToolsService = get(ToolsService)
                        const typePipe:TypePipe = get(TypePipe)
                        const getBinary:Function = (data:string):Object => (
                            typeof Blob === 'undefined'
                        ) ? new Buffer(data) : new Blob([data], {
                                type: 'application/octet-stream'})
                        specialNames = initialData.configuration.database.model
                            .property.name.special
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
                        ):void => {
                            assert.strictEqual(
                                initialData.configuration.test, true)
                            assert.strictEqual(
                                initialData.set({
                                    configuration: {test: false}
                                }).configuration.test, false)
                        })
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
                            `AttachmentsAreEqualPipe (${roundType})`, async (
                                assert:Object
                            ):Promise<void> => {
                                const done:Function = assert.async()
                                try {
                                    for (const test:Array<any> of [
                                        [true, true],
                                        [false, false],
                                        [{data: true}, {data: true}],
                                        /* eslint-disable camelcase */
                                        [
                                            {content_type: 'a/b', data: 'a'},
                                            {content_type: 'a/b', data: 'a'}
                                        ],
                                        [
                                            {content_type: 'a/b', data: 'a'},
                                            {content_type: 'a/b', data: 'a'}
                                        ],
                                        [
                                            {
                                                content_type: 'a/b',
                                                data: 'a',
                                                size: 1
                                            },
                                            {
                                                content_type: 'a/b',
                                                data: 'a',
                                                length: 1
                                            }
                                        ],
                                        [
                                            {
                                                type: 'a/b',
                                                data: 'a',
                                                size: 1
                                            },
                                            {
                                                content_type: 'a/b',
                                                data: 'a',
                                                length: 1
                                            }
                                        ],
                                        [
                                            {data: 'a', size: 1},
                                            {
                                                content_type: 'a/b',
                                                data: 'a',
                                                length: 1
                                            }
                                        ],
                                        [
                                            {data: 'a', size: 1},
                                            {
                                                content_type: 'a/b',
                                                data: 'a',
                                                length: 1
                                            }
                                        ],
                                        [
                                            {
                                                digest: 'md5-DMF1ucDxtqcmYQ==',
                                                size: 1
                                            },
                                            {
                                                content_type: 'a/b',
                                                digest: 'md5-DMF1ucDxtqcmYQ==',
                                                data: 'a',
                                                length: 1
                                            }
                                        ],
                                        [
                                            {
                                                digest:
                                                    'md5-CY9rzUYh03PK3k6DJie' +
                                                    '09g=='
                                            },
                                            {data: 'dGVzdA=='}
                                        ],
                                        [
                                            {
                                                digest:
                                                    'md5-DMF1ucDxtqgxw5niaXc' +
                                                    'mYQ==',
                                                size: 1
                                            },
                                            {
                                                content_type: 'a/b',
                                                data: getBinary('a'),
                                                length: 1
                                            }
                                        ],
                                        [
                                            {data: getBinary('a')},
                                            {data: getBinary('a')}
                                        ],
                                        [
                                            getBinary('a'),
                                            {data: getBinary('a')}
                                        ],
                                        [
                                            {data: await blobToBase64String(
                                                getBinary('a')
                                            )},
                                            {data: getBinary('a')}
                                        ]
                                        /* eslint-enable camelcase */
                                    ])
                                        assert.ok(await attachmentsAreEqualPipe
                                            .transform(test[0], test[1]))
                                    for (const test:Array<any> of [
                                        /* eslint-disable camelcase */
                                        [
                                            {content_type: 'a/a', data: 'a'},
                                            {content_type: 'a/b', data: 'a'}
                                        ],
                                        [
                                            {type: 'a/a', data: 'a'},
                                            {content_type: 'a/b', data: 'a'}
                                        ],
                                        [
                                            {data: 'a', size: 1},
                                            {data: 'b', length: 2}
                                        ],
                                        [
                                            {data: 'a', size: 1},
                                            {data: 'b', length: 2}
                                        ],
                                        [
                                            {
                                                data: getBinary('a'),
                                                type: 'a/b'
                                            },
                                            {
                                                data: getBinary('b'),
                                                type: 'a/b'
                                            }
                                        ],
                                        [
                                            {data: getBinary('a')},
                                            {data: getBinary('b')}
                                        ],
                                        [
                                            {data: await blobToBase64String(
                                                getBinary('a')
                                            )},
                                            {data: await blobToBase64String(
                                                getBinary('b')
                                            )}
                                        ],
                                        [{data: 1}, {data: 2}]
                                        /* eslint-enable camelcase */
                                    ])
                                        assert.notOk(
                                            await attachmentsAreEqualPipe
                                                .transform(test[0], test[1]))
                                } catch (error) {
                                    console.warn(error)
                                    assert.ok(false)
                                }
                                done()
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
                        self.test(
                            `AttachmentWithPrefixExistsPipe (${roundType})`, (
                                assert:Object
                            ):void => {
                                for (const test:Array<any> of [
                                    [
                                        {[specialNames.attachment]: {a: {
                                            data: ''
                                        }}}, 'a'
                                    ],
                                    [
                                        {[specialNames.attachment]: {a: {
                                            data: 'a'
                                        }}}, 'a'
                                    ]
                                ])
                                    assert.ok(
                                        attachmentWithPrefixExistsPipe
                                            .transform(test[0], test[1]))
                                for (const test:Array<any> of [
                                    [{}, null],
                                    [{}, 'a'],
                                    [
                                        {[specialNames.attachment]: {a: {
                                            data: 'a'
                                        }}},
                                        'b'
                                    ]
                                ])
                                    assert.notOk(
                                        attachmentWithPrefixExistsPipe
                                            .transform(test[0], test[1]))
                            })
                        self.test(`ExtractDataPipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            // region transform
                            for (const test:Array<any> of [
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
                                    {value: {
                                        a: {value: 2},
                                        [specialNames.type]: 'Test'}
                                    },
                                    {a: 2}
                                ],
                                [
                                    {value: {
                                        a: {value: {
                                            a: {value: 2},
                                            [specialNames.type]: 'Test'
                                        }},
                                        [specialNames.type]: 'Test'}
                                    },
                                    {a: {a: 2}}
                                ],
                                [
                                    {value: {
                                        a: {value: {
                                            a: {value: 2},
                                            [specialNames.type]: 'Test'
                                        }},
                                        [specialNames.type]: 'Test'}
                                    },
                                    {a: {a: 2}}
                                ],
                                [
                                    [{value: {
                                        a: {value: 2},
                                        [specialNames.type]: 'Test'
                                    }}],
                                    [{a: 2}]
                                ],
                                [
                                    [{value: {
                                        a: {value: 2},
                                        metaData: true,
                                        [specialNames.type]: 'Test'
                                    }}],
                                    [{a: 2}]
                                ],
                                [
                                    [[[{value: {
                                        a: {value: 2},
                                        metaData: true,
                                        [specialNames.type]: 'Test'
                                    }}]]],
                                    [[[{a: 2}]]]
                                ]
                            ])
                                assert.deepEqual(
                                    extractDataPipe.transform(test[0]), test[1]
                                )
                            // endregion
                            // region _extractFromObject
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
                                        a: {value: 2},
                                        [specialNames.type]: 'Test'
                                    }}},
                                    {a: {a: 2}}
                                ],
                                [
                                    {a: {value: {
                                        a: {value: 2},
                                        metaData: true,
                                        [specialNames.type]: 'Test'
                                    }}},
                                    {a: {a: 2}}
                                ],
                                [
                                    {a: {value: [{
                                        a: {value: 2},
                                        metaData: true,
                                        [specialNames.type]: 'Test'
                                    }]}},
                                    {a: [{a: 2}]}
                                ],
                                [
                                    {a: {value: [[{
                                        a: {value: 2},
                                        metaData: true,
                                        [specialNames.type]: 'Test'
                                    }]]}},
                                    {a: [[{a: 2}]]}
                                ],
                                [
                                    {a: {value: [[{
                                        a: {value: [[{
                                            a: {value: 2},
                                            metaData: true,
                                            [specialNames.type]: 'Test'
                                        }]]},
                                        metaData: true,
                                        [specialNames.type]: 'Test'
                                    }]]}},
                                    {a: [[{a: [[{a: 2}]]}]]}
                                ],
                                [{
                                    a: {value: 2}, b: 3, _c: {value: 4},
                                    [specialNames.attachment]: null,
                                    [specialNames.type]: 'Test'
                                }, {a: 2}],
                                [{
                                    a: {value: 2}, b: 3, _c: {value: 4},
                                    [specialNames.attachment]: {}
                                }, {a: 2, b: 3, _c: 4}],
                                [
                                    {
                                        a: {value: 2},
                                        b: 3,
                                        [specialNames.attachment]: {a: {
                                            value: {name: 'a'}
                                        }}
                                    }, {
                                        a: 2,
                                        b: 3,
                                        [specialNames.attachment]: {a: {
                                            name: 'a'
                                        }}
                                    }],
                                [{
                                    a: {value: 2}, b: 3, _c: {value: 4},
                                    [specialNames.id]: 2,
                                    [specialNames.attachment]: {a: {value: {
                                        name: 'a'
                                    }}},
                                    [specialNames.type]: 'Test'
                                }, {
                                    a: 2,
                                    [specialNames.attachment]: {a: {
                                        name: 'a'
                                    }},
                                    [specialNames.id]: 2
                                }]
                            ])
                                assert.deepEqual(
                                    extractDataPipe._extractFromObject(
                                        test[0]),
                                    test[1])
                            // endregion
                        })
                        self.test(`ExtractRawDataPipe (${roundType})`, async (
                            assert:Object
                        ):Promise<void> => {
                            const done:Function = assert.async()
                            // region convertDateToTimestampRecursively
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
                                    extractRawDataPipe
                                        .convertDateToTimestampRecursively(
                                            test[0]),
                                    test[1])
                            // endregion
                            // region getNotAlreadyExistingAttachmentData
                            for (const test:Array<any> of [
                                /* eslint-disable camelcase */
                                [
                                    {}, {}, {},
                                    {payloadExists: false, result: {}}
                                ],
                                [
                                    {a: 2}, {}, {},
                                    {payloadExists: false, result: {}}
                                ],
                                [
                                    {a: 2}, {}, {a: {}},
                                    {payloadExists: false, result: {}}
                                ],
                                [
                                    {[specialNames.attachment]: {a: {}}}, {},
                                    {[specialNames.attachment]: {}},
                                    {payloadExists: false, result: {}}
                                ],
                                [
                                    {[specialNames.attachment]: {a: {
                                        data: 'a'
                                    }}}, {},
                                    {[specialNames.attachment]: {a: {}}},
                                    {payloadExists: true, result: {a: {
                                        data: 'a'
                                    }}}
                                ],
                                [
                                    {[specialNames.attachment]: {a: {
                                        data: 'a'
                                    }}},
                                    {[specialNames.attachment]: {a: {
                                        data: 'a'
                                    }}},
                                    {[specialNames.attachment]: {a: {}}},
                                    {payloadExists: false, result: {}}
                                ],
                                [
                                    {[specialNames.attachment]: {a: {
                                        data: getBinary('a')
                                    }}},
                                    {[specialNames.attachment]: {a: {
                                        data: getBinary('a')
                                    }}},
                                    {[specialNames.attachment]: {a: {}}},
                                    {payloadExists: false, result: {}}
                                ],
                                [
                                    {[specialNames.attachment]: {a: {
                                        data: getBinary('a')
                                    }}},
                                    {[specialNames.attachment]: {a: {
                                        data: getBinary('a')
                                    }}},
                                    {[specialNames.attachment]: {'[ab]': {}}},
                                    {payloadExists: false, result: {}}
                                ],
                                [
                                    {[specialNames.attachment]: {a: {
                                        data: getBinary('a')
                                    }}},
                                    {[specialNames.attachment]: {a: {
                                        data: await blobToBase64String(
                                            getBinary('a'))
                                    }}},
                                    {[specialNames.attachment]: {'[ab]': {}}},
                                    {payloadExists: false, result: {}}
                                ],
                                [
                                    {[specialNames.attachment]: {a: {
                                        data: getBinary('a')
                                    }}},
                                    {[specialNames.attachment]: {a: {
                                        digest: 'md5-DMF1ucDxtqgxw5niaXcmYQ=='
                                    }}},
                                    {[specialNames.attachment]: {a: {}}},
                                    {payloadExists: false, result: {}}
                                ],
                                [
                                    {[specialNames.attachment]: {a: {
                                        content_type: 'text/plain',
                                        data: getBinary('a')
                                    }}},
                                    {[specialNames.attachment]: {a: {
                                        content_type: 'text/csv',
                                        digest: 'md5-DMF1ucDxtqgxw5niaXcmYQ=='
                                    }}},
                                    {[specialNames.attachment]: {a: {}}},
                                    {payloadExists: true, result: {
                                        a: {
                                            content_type: 'text/plain',
                                            data: getBinary('a')
                                        }
                                    }}
                                ],
                                [
                                    {[specialNames.attachment]: {b: {
                                        data: getBinary('a')
                                    }}},
                                    {[specialNames.attachment]: {a: {
                                        content_type: 'text/plain',
                                        digest: 'md5-DMF1ucDxtqgxw5niaXcmYQ=='
                                    }}},
                                    {[specialNames.attachment]: {'[ab]': {
                                        maximumNumber: 1
                                    }}},
                                    {payloadExists: true, result: {
                                        a: {data: null},
                                        b: {
                                            content_type: 'text/plain',
                                            digest:
                                                'md5-DMF1ucDxtqgxw5niaXcmYQ==',
                                            name: 'b'
                                        }
                                    }}
                                ],
                                [
                                    {[specialNames.attachment]: {b: {
                                        data: getBinary('b')
                                    }}},
                                    {[specialNames.attachment]: {a: {
                                        data: getBinary('a')
                                    }}},
                                    {[specialNames.attachment]: {'[ab]': {
                                        maximumNumber: 2
                                    }}},
                                    {payloadExists: true, result: {
                                        a: {data: null},
                                        b: {data: getBinary('b')}
                                    }}
                                ],
                                [
                                    {[specialNames.attachment]: {b: {
                                        content_type: 'text/plain',
                                        data: getBinary('b')
                                    }}},
                                    {[specialNames.attachment]: {a: {
                                        data: getBinary('a')
                                    }}},
                                    {[specialNames.attachment]: {'[ab]': {
                                        maximumNumber: 2
                                    }}},
                                    {payloadExists: true, result: {
                                        a: {data: null},
                                        b: {
                                            content_type: 'text/plain',
                                            data: getBinary('b')
                                        }
                                    }}
                                ],
                                [
                                    {[specialNames.attachment]: {
                                        a: {
                                            digest:
                                                'md5-DMF1ucDxtqgxw5niaXcmYQ=='
                                        },
                                        b: {
                                            data: getBinary('b')
                                        }
                                    }},
                                    {[specialNames.attachment]: {a: {
                                        data: getBinary('a')
                                    }}},
                                    {[specialNames.attachment]: {'[ab]': {
                                        maximumNumber: 2
                                    }}},
                                    {payloadExists: true, result: {b: {
                                        data: getBinary('b')
                                    }}}
                                ]
                                /* eslint-enable camelcase */
                            ]) {
                                /*
                                    NOTE: "deepEquals" doesn't handle binary
                                    data well.
                                */
                                const result:any = await extractRawDataPipe
                                    .getNotAlreadyExistingAttachmentData(
                                        test[0], test[1], test[2])
                                if (Tools.equals(result, test[3]))
                                    assert.ok(true)
                                else {
                                    assert.ok(false)
                                    console.warn(Tools.representObject(result), '!=', test[3])
                                }
                            }
                            // endregion
                            // region removeAlreadyExistingData
                            for (const test:Array<any> of [
                                [
                                    {}, {}, null,
                                    {newData: {}, payloadExists: false}
                                ],
                                [
                                    {a: 2}, {}, null,
                                    {newData: {a: 2}, payloadExists: true}
                                ],
                                [
                                    {a: 2}, {a: 2}, null,
                                    {newData: {a: 2}, payloadExists: false}
                                ],
                                [
                                    {a: {a: 2}}, {a: {a: 2}}, null,
                                    {
                                        newData: {a: {a: 2}},
                                        payloadExists: false
                                    }
                                ],
                                [
                                    {[specialNames.type]: 'Test', a: 'a'},
                                    {[specialNames.type]: 'Test', a: 'a'},
                                    {a: {}},
                                    {
                                        newData: {[specialNames.type]: 'Test'},
                                        payloadExists: false
                                    }
                                ],
                                [
                                    {[specialNames.type]: 'Test', a: {a: 'a'}},
                                    {[specialNames.type]: 'Test', a: {a: 'a'}},
                                    {a: {a: {type: 'Test'}}},
                                    {
                                        newData: {[specialNames.type]: 'Test'},
                                        payloadExists: false
                                    }
                                ],
                                [
                                    {a: []}, {a: []}, null,
                                    {
                                        newData: {a: []},
                                        payloadExists: false
                                    }
                                ],
                                [
                                    {a: [1]}, {a: []}, null,
                                    {
                                        newData: {a: [1]},
                                        payloadExists: true
                                    }
                                ],
                                [
                                    {a: []}, {a: [1]}, null,
                                    {
                                        newData: {a: []},
                                        payloadExists: true
                                    }
                                ],
                                [
                                    {
                                        [specialNames.type]: 'Test',
                                        a: nowUTCTimestamp
                                    },
                                    {
                                        [specialNames.type]: 'Test',
                                        a: nowUTCTimestamp
                                    },
                                    {a: {a: {type: 'Test'}}},
                                    {
                                        newData: {[specialNames.type]: 'Test'},
                                        payloadExists: false
                                    }
                                ],
                                [
                                    {[specialNames.type]: 'Test', a: 0},
                                    {[specialNames.type]: 'Test', a: 0},
                                    {a: {a: {type: 'Test'}}},
                                    {
                                        newData: {[specialNames.type]: 'Test'},
                                        payloadExists: false
                                    }
                                ],
                                [
                                    {
                                        [specialNames.type]: 'Test',
                                        a: {a: nowUTCTimestamp}
                                    },
                                    {
                                        [specialNames.type]: 'Test',
                                        a: {a: nowUTCTimestamp}
                                    },
                                    {a: {a: {type: 'Test'}}},
                                    {
                                        newData: {[specialNames.type]: 'Test'},
                                        payloadExists: false
                                    }
                                ],
                                [
                                    {
                                        [specialNames.type]: 'Test',
                                        a: 'a'
                                    },
                                    {
                                        [specialNames.type]: 'Test',
                                        a: 'b'
                                    },
                                    {a: {}},
                                    {
                                        newData: {
                                            [specialNames.type]: 'Test',
                                            a: 'a'
                                        },
                                        payloadExists: true
                                    }
                                ],
                                [
                                    {
                                        [specialNames.type]: 'Test',
                                        a: {a: 'a'}
                                    },
                                    {
                                        [specialNames.type]: 'Test',
                                        a: {a: 'a'}
                                    },
                                    {a: {a: {}}},
                                    {
                                        newData: {[specialNames.type]: 'Test'},
                                        payloadExists: false
                                    }
                                ],
                                [
                                    {
                                        [specialNames.type]: 'Test',
                                        a: {a: 'a'}
                                    },
                                    {
                                        [specialNames.type]: 'Test',
                                        a: {a: 'a'}
                                    },
                                    {},
                                    {
                                        newData: {
                                            [specialNames.type]: 'Test',
                                            a: {a: 'a'}
                                        },
                                        payloadExists: false
                                    }
                                ],
                                [
                                    {
                                        [specialNames.type]: 'Test',
                                        a: {a: 'a'}
                                    },
                                    {
                                        [specialNames.type]: 'Test',
                                        a: {a: 'a'}
                                    },
                                    null,
                                    {
                                        newData: {
                                            [specialNames.type]: 'Test',
                                            a: {a: 'a'}
                                        },
                                        payloadExists: false
                                    }
                                ],
                                [
                                    {
                                        [specialNames.type]: 'Test',
                                        a: {a: 'a'}
                                    },
                                    {
                                        [specialNames.type]: 'Test',
                                        a: {a: 'b'}
                                    },
                                    {},
                                    {
                                        newData: {
                                            [specialNames.type]: 'Test',
                                            a: {a: 'a'}
                                        },
                                        payloadExists: true
                                    }
                                ],
                                [
                                    {
                                        [specialNames.type]: 'Test',
                                        a: {a: 'a'}
                                    },
                                    {
                                        [specialNames.type]: 'Test',
                                        a: {a: 'a', b: 'b'}
                                    },
                                    {a: {[specialNames.additional]: {}}},
                                    {
                                        newData: {
                                            [specialNames.type]: 'Test',
                                            a: {a: 'a'}
                                        },
                                        payloadExists: true
                                    }
                                ],
                                [
                                    {
                                        [specialNames.type]: 'Test',
                                        a: {a: 'a', b: 'b'}
                                    },
                                    {
                                        [specialNames.type]: 'Test',
                                        a: {a: 'a', b: 'b'}
                                    },
                                    {a: {a: {}, b: {}}},
                                    {
                                        newData: {[specialNames.type]: 'Test'},
                                        payloadExists: false
                                    }
                                ]
                            ])
                                assert.deepEqual(
                                    extractRawDataPipe
                                        .removeAlreadyExistingData(
                                            test[0], test[1], test[2]),
                                    test[3])
                            // endregion
                            // region removeMetaData
                            for (const test:Array<any> of [
                                [{}, null, {}],
                                [{a: 2}, null, {a: 2}],
                                [{a: ''}, null, {a: ''}],
                                [{a: []}, null, {a: []}],
                                [{a: {}}, null, {a: {}}],
                                [
                                    {a: ''},
                                    {a: {emptyEqualsToNull: true}},
                                    {}
                                ],
                                [
                                    {a: []},
                                    {a: {emptyEqualsToNull: true}},
                                    {}
                                ],
                                [
                                    {[specialNames.id]: 2, a: 2},
                                    null,
                                    {[specialNames.id]: 2, a: 2}
                                ],
                                [
                                    {
                                        a: 2,
                                        [specialNames.constraint.execution]:
                                            null
                                    },
                                    null,
                                    {a: 2}
                                ],
                                [{a: 2}, {b: {}}, {}],
                                [{a: 2}, {a: {}}, {a: 2}],
                                [
                                    {a: 2},
                                    {[specialNames.additional]: {}},
                                    {a: 2}
                                ]
                            ])
                                assert.deepEqual(
                                    extractRawDataPipe.removeMetaData(
                                        test[0], test[1]),
                                    test[2])
                            // endregion
                            // region transform
                            for (const test:Array<any> of [
                                [
                                    [
                                        {
                                            [specialNames.type]: 'Test',
                                            [specialNames.id]: 1,
                                            a: 'a'
                                        },
                                        {[specialNames.type]: 'Test', a: '2'}
                                    ],
                                    {
                                        [specialNames.type]: 'Test',
                                        [specialNames.id]: 1,
                                        a: 'a'
                                    }
                                ]
                            ])
                                assert.deepEqual(
                                    await extractRawDataPipe.transform(
                                        ...test[0]),
                                    test[1])
                            // endregion
                            done()
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
                        self.test(`ReversePipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            for (const test:Array<any> of [
                                [[], []],
                                [null, []],
                                [[2], [2]],
                                [[[2]], [[2]]],
                                [[{a: 2}], [{a: 2}]],
                                [[1, 2, 3], [3, 2, 1]],
                                [[2, 1, 3], [3, 1, 2]]
                            ])
                                assert.deepEqual(
                                    reversePipe.transform(test[0]), test[1])
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
                        self.test(`StringStartsWithPipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            assert.ok(stringStartsWithPipe.transform(
                                'baa', 'b'))
                            assert.notOk(
                                stringStartsWithPipe.transform('baa', 'a'))
                        })
                        self.test(`StringTemplatePipe (${roundType})`, (
                            assert:Object
                        ):void => {
                            for (const test:Array<any> of [
                                [[], ''],
                                [[''], ''],
                                [['', {}], ''],
                                [['', {a: 1}], ''],
                                [['a', {a: 1}], 'a'],
                                [['a ${1 + 2}'], 'a 3'],
                                [['a ${a}', {a: 1}], 'a 1'],
                                [['a ${a + 2}', {a: 1}], 'a 3']
                            ])
                                assert.strictEqual(
                                    stringTemplatePipe.transform(...test[0]),
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
                        self[targetTechnology === 'web' ? 'test' : 'skip'](
                            `AlertService (${roundType})`, (
                                assert:Object
                            ):void => {
                                const done:Function = assert.async()
                                alert.confirm('test').then((
                                    result:true
                                ):void => assert.ok(result))
                                alert.dialogReference.close(true)
                                alert.confirm('test').then((
                                    result:true
                                ):void => {
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
                                    [specialNames.id]: 'a',
                                    [specialNames.revision]: 'upsert',
                                    [specialNames.type]: 'Test',
                                    a: 'test'}
                                item[specialNames.revision] = (await data.put(
                                    item
                                )).rev
                                assert.deepEqual(await data.get('a'), item)
                                item.a = 'a'
                                item[specialNames.revision] = (
                                    await data.bulkDocs([item])
                                )[0].rev
                                item[specialNames.revision] = 'upsert'
                                item[specialNames.revision] = (
                                    await data.bulkDocs([item])
                                )[0].rev
                                item[specialNames.revision] = 'latest'
                                item[specialNames.revision] = (
                                    await data.bulkDocs([item])
                                )[0].rev
                                item[specialNames.revision] = 'upsert'
                                item[specialNames.revision] = (await data.put(
                                    item
                                )).rev
                                item[specialNames.revision] = 'latest'
                                item[specialNames.revision] = (await data.put(
                                    item
                                )).rev
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
                                console.warn(error)
                                assert.ok(false)
                            }
                            done()
                        })
                        self.test(`DataScopeService (${roundType})`, async (
                            assert:Object
                        ):Promise<void> => {
                            const done:Function = assert.async()
                            try {
                                // region determine
                                assert.deepEqual(await dataScope.determine(
                                    'Test'
                                ), extendObjectPipe.transform(true, {
                                    [specialNames.attachment]: {
                                        '.+\\.(?:jpe?g|png)': {
                                            name: '.+\\.(?:jpe?g|png)',
                                            value: {name: 'a.jpg'}
                                        }
                                    },
                                    [specialNames.id]: {
                                        name: specialNames.id,
                                        value: null
                                    },
                                    _metaData: {submitted: false},
                                    [specialNames.type]: 'Test',
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
                                // region determineSpecificationObject
                                for (const test:Array<any> of [
                                    [[{}], {}],
                                    [[{a: {}}], {a: {
                                        minimum: 0,
                                        minimumLength: 0,
                                        minimumNumber: 0
                                    }}],
                                    [[{a: {}}, ['a']], {a: {
                                        minimum: 0,
                                        minimumLength: 0,
                                        minimumNumber: 0
                                    }}],
                                    [[{a: {}}, ['b']], {}]

                                ])
                                    assert.deepEqual(await dataScope
                                        .determineSpecificationObject(
                                            ...test[0]
                                        ), test[1])
                                // endregion
                                // region generate
                                for (const test:Array<any> of [
                                    [['Test'], {
                                        [specialNames.attachment]: {
                                            '.+\\.(?:jpe?g|png)': {value: {
                                                name: 'a.jpg'
                                            }}
                                        },
                                        [specialNames.id]: {value: null},
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
                                    [['Test', ['a'], {a: {a: 2}}], {a: {
                                        minimum: 0,
                                        minimumLength: 0,
                                        minimumNumber: 0,
                                        name: 'a',
                                        value: {a: 2}
                                    }}],
                                    [['Test', [
                                        specialNames.attachment
                                    ]], {[specialNames.attachment]: {
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
                                                    .Test[
                                                        specialNames.attachment
                                                    ]['.+\\.(?:jpe?g|png)']
                                                    .onCreateExpression,
                                            value: {name: 'a.jpg'}
                                        }
                                    }}],
                                    [
                                        [
                                            'Test', null,
                                            {[specialNames.attachment]: {
                                                'b.jpg': {}
                                            }}
                                        ],
                                        {
                                            [specialNames.attachment]: {
                                                '.+\\.(?:jpe?g|png)': {value: {
                                                    name: 'b.jpg'
                                                }}
                                            },
                                            [specialNames.id]: {value: null},
                                            a: {value: null}
                                        }
                                    ],
                                    [[
                                        'Test', null,
                                        {[specialNames.attachment]: {}}
                                    ], {
                                        [specialNames.attachment]: {
                                            '.+\\.(?:jpe?g|png)': {value: null}
                                        },
                                        [specialNames.id]: {value: null},
                                        a: {value: null}
                                    }],
                                    [[
                                        'Test', null,
                                        {[specialNames.attachment]: {'b.jpg': {
                                            test: 2
                                        }}}
                                    ], {
                                        [specialNames.attachment]: {
                                            '.+\\.(?:jpe?g|png)': {value: {
                                                name: 'b.jpg',
                                                test: 2
                                            }}
                                        },
                                        [specialNames.id]: {value: null},
                                        a: {value: null}
                                    }]
                                ])
                                    assert.deepEqual(dataScope.generate(
                                        ...test[0]
                                    ), extendObjectPipe.transform(true, {
                                        _metaData: {submitted: false},
                                        [specialNames.type]: 'Test'
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
                                    [specialNames.type]: 'Test',
                                    a: {value: extendObjectPipe.transform(
                                        true, {
                                            [specialNames.type]: 'A',
                                            _metaData: {submitted: false},
                                            a: {value: 'a'},
                                            b: {value: 'b'}
                                        },
                                        initialData.configuration.database
                                            .model.entities.A
                                    )}
                                }, initialData.configuration.database.model
                                    .entities.Test))
                                assert.deepEqual(dataScope.generate(
                                    'Test', null, {a: {a: 'A', b: 'B'}}
                                ), extendObjectPipe.transform(true, {
                                    _metaData: {submitted: false},
                                    [specialNames.type]: 'Test',
                                    a: {value: extendObjectPipe.transform(
                                        true, {
                                            [specialNames.type]: 'A',
                                            _metaData: {submitted: false},
                                            a: {value: 'A'},
                                            b: {value: 'B'}
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
                                    [specialNames.type]: 'Test',
                                    a: {value: extendObjectPipe.transform(
                                        true, {
                                            [specialNames.type]: 'A',
                                            _metaData: {submitted: false},
                                            a: {value: null}
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
                                            name: 'a',
                                            type: 'B'
                                        }},
                                        B: {a: {
                                            minimum: 0,
                                            minimumLength: 0,
                                            minimumNumber: 0,
                                            name: 'a'
                                        }},
                                        Test: {a: {
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
                                    [specialNames.type]: 'Test',
                                    a: {value: extendObjectPipe.transform(
                                        true, {
                                            [specialNames.type]: 'A',
                                            _metaData: {submitted: false},
                                            a: {value:
                                                extendObjectPipe.transform(
                                                    true, {
                                                        [
                                                        specialNames.type
                                                        ]: 'B',
                                                        _metaData: {
                                                            submitted: false
                                                        },
                                                        a: {value: null}
                                                    },
                                                    initialData.configuration
                                                        .database.model
                                                        .entities.B)
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
                                        [specialNames.type]: 'Test',
                                        a: {value: [extendObjectPipe.transform(
                                            true, {
                                                [specialNames.type]: 'A',
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
                            } catch (error) {
                                console.warn(error)
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
                                for (const name:string of [
                                    specialNames.id, 'a'
                                ])
                                    await data.createIndex({index: {
                                        ddoc: `Test-${name}-GenericIndex`,
                                        fields: [specialNames.type, name],
                                        name: `Test-${name}-GenericIndex`
                                    }})
                                const item:PlainObject = {
                                    [specialNames.id]: 'a',
                                    [specialNames.revision]: 'upsert',
                                    [specialNames.type]: 'Test',
                                    a: 'test'
                                }
                                item[specialNames.revision] = (await data.put(
                                    item
                                )).rev
                                // region list
                                assert.deepEqual(
                                    (await resolver.list([{a: 'asc'}]))[0],
                                    item)
                                assert.deepEqual(
                                    (await resolver.list())[0], item)
                                assert.deepEqual(
                                    (await resolver.list([]))[0], item)
                                assert.deepEqual((await resolver.list(
                                    [{[specialNames.id]: 'asc'}], 1, 1, 'es'
                                ))[0], item)
                                assert.strictEqual((await resolver.list(
                                    [{[specialNames.id]: 'asc'}], 2
                                )).length, 0)
                                assert.strictEqual((await resolver.list(
                                    [{[specialNames.id]: 'asc'}], 1, 1, 'b'
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
                                    {searchTerm: 'exact-b'},
                                    {page: 2},
                                    {searchTerm: 'exact-testa', page: 1},
                                    {
                                        limit: 2,
                                        page: 1,
                                        searchTerm: 'regex-aa'
                                    },
                                    {
                                        limit: 1, sort: 'a-asc',
                                        page: 2,
                                        searchTerm: 'exact-test'
                                    }
                                ])
                                    assert.strictEqual((await resolver.resolve(
                                        {params: test}
                                    )).length, 0)
                                // endregion
                                await data.destroy()
                                await data.initialize()
                                assert.ok(true)
                            } catch (error) {
                                console.warn(error)
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
                    PaginationHostComponent,
                    RouterOutletStubComponent
                ],
                imports: moduleImports,
                providers: [
                    {provide: ActivatedRoute, useClass: ActivatedRouteStub},
                    {provide: Router, useClass: RouterStub}
                ]
            }, specialNames]
        },
        component: function(
            TestBed:Object, roundType:string, targetTechnology:string,
            $:Object, testingModule:Object, testingPlatform:Object,
            specialNames:PlainObject
        ):void {
            // region test components
            this.module(`Module.components (${roundType})`)
            // / region confirm
            this[targetTechnology === 'web' ? 'test' : 'skip'].test(
                `ConfirmComponent (${roundType})`, async (
                    assert:Object
                ):Promise<void> => {
                    const done:Function = assert.async()
                    const fixture:ComponentFixture<ConfirmComponent> =
                        TestBed.createComponent(ConfirmComponent)
                    const instance:Object = fixture.componentInstance
                    try {
                        fixture.detectChanges()
                        await fixture.whenStable()
                        assert.strictEqual(instance.cancelText, 'Cancel')
                        assert.strictEqual(instance.dialogReference, null)
                        assert.strictEqual(instance.okText, 'OK')
                    } catch (error) {
                        console.warn(error)
                        assert.ok(false)
                    }
                    done()
                })
            // / endregion
            // / region input/select/textarea
            this.test(`${InputComponent.name} (${roundType})`, async (
                assert:Object
            ):Promise<void> => {
                const done:Function = assert.async()
                const fixture:ComponentFixture<InputComponent> =
                    TestBed.createComponent(InputComponent)
                const instance:Object = fixture.componentInstance
                try {
                    instance.model = {
                        disabled: true, name: 'test', trim: true,
                        onUpdateExpression:
                            `typeof newDocument[name] === 'string' ?` +
                            ` newDocument[name].replace('c', 'C') : ` +
                            'newDocument[name]'
                    }
                    assert.strictEqual(instance.model.disabled, true)
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.strictEqual(fixture.debugElement.query(By.css(
                        'label'
                    )).nativeElement.textContent.trim(), 'test')
                    const inputDomNode:DomNode = fixture.debugElement.query(
                        By.css('input, select, textarea')
                    ).nativeElement
                    inputDomNode.value = 'aa'
                    inputDomNode.dispatchEvent(getNativeEvent('input'))
                    await fixture.whenStable()
                    assert.strictEqual(instance.model.value, 'aa')
                    instance.model = Tools.extendObject(
                        {}, instance.model, {maximumLength: 2})
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.strictEqual(
                        inputDomNode.attributes.maxlength.value, '2')
                } catch (error) {
                    console.warn(error)
                    assert.ok(false)
                }
                done()
            })
            for (const component:AbstractNativeInputComponent of [
                TextareaComponent, SimpleInputComponent
            ])
                this.test(
                    `${AbstractNativeInputComponent.name}/${component.name} ` +
                        `(${roundType})`,
                    async (assert:Object):Promise<void> => {
                        const done:Function = assert.async()
                        const fixture:
                            ComponentFixture<AbstractNativeInputComponent> =
                            TestBed.createComponent(component)
                        const instance:Object = fixture.componentInstance
                        try {
                            instance.model = {
                                disabled: true, name: 'test', trim: true,
                                onUpdateExpression:
                                    `typeof newDocument[name] === 'string' ?` +
                                    ` newDocument[name].replace('c', 'C') : ` +
                                    'newDocument[name]'
                            }
                            instance.ngOnInit()
                            assert.strictEqual(instance.model.disabled, true)
                            assert.ok(
                                instance.model.hasOwnProperty('type'), true)
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
                            assert.strictEqual(instance.model.value, 'aa')
                            instance.model = Tools.extendObject(
                                {}, instance.model, {maximumLength: 2})
                            fixture.detectChanges()
                            await fixture.whenStable()
                            assert.strictEqual(
                                inputDomNode.attributes.maxlength.value, '2')
                            let eventGivenModel:PlainObject
                            instance.modelChange.subscribe((
                                model:PlainObject
                            ):void => {
                                eventGivenModel = model
                            })
                            const state:PlainObject = {errors: {
                                required: true
                            }}
                            instance.onChange(null, state)
                            instance.modelChange.emit(instance.model)
                            assert.deepEqual(instance.model.state, state)
                            assert.deepEqual(eventGivenModel, instance.model)
                            instance.showValidationErrorMessages = true
                            fixture.detectChanges()
                            await fixture.whenStable()
                            assert.strictEqual(fixture.debugElement.query(
                                By.css('span[generic-error] p')
                            ).nativeElement.textContent.trim().replace(
                                /\s+/g, ' '
                            ), 'Please fill this field.')
                            instance.requiredText = 'Required'
                            fixture.detectChanges()
                            await fixture.whenStable()
                            assert.strictEqual(fixture.debugElement.query(
                                By.css('span[generic-error] p')
                            ).nativeElement.textContent.trim().replace(
                                /\s+/g, ' '
                            ), 'Required')
                            inputDomNode.value = '  b '
                            inputDomNode.dispatchEvent(getNativeEvent('input'))
                            fixture.detectChanges()
                            await fixture.whenStable()
                            assert.deepEqual('b', instance.model.value)
                            inputDomNode.value = '  cb '
                            inputDomNode.dispatchEvent(getNativeEvent('input'))
                            fixture.detectChanges()
                            await fixture.whenStable()
                            assert.deepEqual('Cb', instance.model.value)
                            if (component.name === 'SimpleInputComponent') {
                                instance.type = 'password'
                                fixture.detectChanges()
                                await fixture.whenStable()
                                assert.strictEqual(fixture.debugElement.query(
                                    By.css('input')
                                ).nativeElement.attributes.type.value,
                                'password')
                                instance.model.type = 'number'
                                inputDomNode.value = 2
                                inputDomNode.dispatchEvent(getNativeEvent(
                                    'input'))
                                await fixture.whenStable()
                                assert.strictEqual(instance.model.value, 2)
                            }
                        } catch (error) {
                            console.warn(error)
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
                const fixture:ComponentFixture<ItemsComponent> =
                    TestBed.createComponent(ItemsComponent)
                const instance:Object = fixture.componentInstance
                try {
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.deepEqual(typeof instance._changesStream, 'object')
                    assert.deepEqual(instance._canceled, false)
                    // region data change listener
                    assert.deepEqual(instance.onDataChange(), false)
                    assert.deepEqual(instance.onDataComplete(), false)
                    assert.deepEqual(instance.onDataError(), false)
                    // endregion
                    assert.deepEqual(instance.items, [])
                    assert.strictEqual(instance.items.length, 0)
                    assert.strictEqual(instance.items.total, 0)
                    // region applyPageConstraints/update
                    instance._route.testData = {items: [{
                        [specialNames.id]: 2}]}
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.deepEqual(instance.items, [{[specialNames.id]: 2}])
                    assert.strictEqual(instance.items.length, 1)
                    assert.strictEqual(instance.items.total, 1)
                    assert.strictEqual(instance.page, 1)
                    assert.strictEqual(instance.limit, 10)
                    assert.strictEqual(instance.regularExpression, false)
                    assert.strictEqual(instance.searchTerm, '')
                    instance._route.testParameter = {
                        limit: 2,
                        page: 2,
                        searchTerm: 'regex-test'
                    }
                    assert.strictEqual(instance.page, 2)
                    assert.strictEqual(instance.limit, 2)
                    assert.strictEqual(instance.regularExpression, true)
                    assert.strictEqual(instance.searchTerm, 'test')
                    instance.applyPageConstraints()
                    await instance.update(true)
                    await fixture.whenStable()
                    assert.strictEqual(
                        instance._router.url,
                        `${instance._itemsPath}/${specialNames.id}-asc/0/2/` +
                        'regex-test')
                    // endregion
                    await instance._router.navigate([
                        instance._itemsPath, `${specialNames.id}-asc`, 1, 2,
                        'regex-'])
                    await fixture.whenStable()
                    assert.strictEqual(
                        instance._router.url,
                        `${instance._itemsPath}/${specialNames.id}-asc/1/2/` +
                        'regex-')
                    // region changeItemWrapperFactory
                    assert.strictEqual(await instance.changeItemWrapperFactory(
                        (a:number):number => a)(2), 2)
                    await fixture.whenStable()
                    assert.strictEqual(
                        instance._router.url,
                        `${instance._itemsPath}/${specialNames.id}-asc/0/2/` +
                        'regex-test')
                    // endregion
                    assert.deepEqual(instance.selectedItems, new Set())
                    assert.deepEqual(instance.items, [{[specialNames.id]: 2}])
                    // region clearSelectedItems
                    instance.selectedItems.add(instance.items[0])
                    instance.clearSelectedItems()
                    assert.deepEqual(
                        instance.items,
                        [{[specialNames.id]: 2, selected: false}])
                    assert.deepEqual(instance.selectedItems, new Set())
                    // endregion
                    // region gotToItem
                    await instance.goToItem(1, 2)
                    await fixture.whenStable()
                    assert.strictEqual(
                        instance._router.url, `${instance._itemPath}/1/2`)
                    // endregion
                    // region selectedAllItems
                    instance.clearSelectedItems()
                    instance.selectAllItems()
                    assert.strictEqual(
                        instance.trackByIDAndRevision({
                            [specialNames.id]: 'id',
                            [specialNames.revision]: 'revision'
                        }), 'id/revision')
                    assert.deepEqual(
                        instance.items,
                        [{[specialNames.id]: 2, selected: true}])
                    assert.deepEqual(
                        instance.selectedItems, new Set(instance.items))
                    // endregion
                    // region updateSearch
                    let test:boolean = false
                    instance.searchTermStream.map(():void => {
                        test = true
                    }).subscribe()
                    instance.updateSearch()
                    await fixture.whenStable()
                    assert.ok(test)
                    // endregion
                } catch (error) {
                    console.warn(error)
                    assert.ok(false)
                }
                done()
            })
            this.test(`FileInputComponent (${roundType})`, async (
                assert:Object
            ):Promise<void> => {
                const done:Function = assert.async()
                const fixture:ComponentFixture<FileInputComponent> =
                    TestBed.createComponent(FileInputComponent)
                const instance:Object = fixture.componentInstance
                try {
                    instance.mapNameToField = [specialNames.id, 'name']
                    instance.showValidationErrorMessages = true
                    instance.model = {
                        [specialNames.id]: 'id',
                        [specialNames.attachment]: {name: {
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
                    await instance.ngOnChanges({
                        model: new SimpleChange(null, instance.model, true)})
                    await fixture.whenStable()
                    assert.strictEqual(instance.file.type, 'text')
                    assert.strictEqual(instance.file.query, '?version=hash')
                    assert.strictEqual(instance.internalName, 'name')
                    assert.deepEqual(
                        instance.model[specialNames.attachment].name.state, {})
                    instance.input.nativeElement.dispatchEvent(getNativeEvent(
                        'change'))
                    await fixture.whenStable()
                    /* eslint-disable camelcase */
                    instance.file.content_type = 'image/png'
                    /* eslint-enable camelcase */
                    instance.determinePresentationType()
                    assert.strictEqual(instance.file.type, 'image')
                    await instance.remove()
                    assert.deepEqual(
                        instance.model[specialNames.attachment].name.value,
                        null)
                    instance.model[specialNames.attachment].name.nullable =
                        false
                    assert.strictEqual(
                        instance.model[
                            specialNames.attachment
                        ].name.state.errors,
                        null)
                    await instance.remove()
                    assert.strictEqual(
                        instance.model[
                            specialNames.attachment
                        ].name.state.errors.required,
                        true)
                    instance.synchronizeImmediately = true
                    instance.model = {
                        [specialNames.attachment]: {name: {
                            nullable: true,
                            value: {
                                /* eslint-disable camelcase */
                                content_type: 'text/plain',
                                /* eslint-enable camelcase */
                                digest: 'hash',
                                name: 'name'
                            }
                        }},
                        [specialNames.id]: 'id',
                        [specialNames.revision]: '1-a',
                        [specialNames.type]: 'Test',
                        name: 'name'
                    }
                    await instance.ngOnChanges({
                        model: new SimpleChange(null, instance.model, true)})
                    instance.ngAfterViewInit()
                    await instance.remove()
                    assert.ok(instance.model[
                        specialNames.attachment
                    ].name.state.errors.database)
                } catch (error) {
                    console.warn(error)
                    assert.ok(false)
                }
                done()
            })
            // / region pagination
            this.test(`PaginationComponent (${roundType})`, async (
                assert:Object
            ):Promise<void> => {
                const done:Function = assert.async()
                const fixture:ComponentFixture<PaginationComponent> =
                    TestBed.createComponent(PaginationHostComponent)
                const instance:Object = fixture.componentInstance
                try {
                    instance.total = 10
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.strictEqual(
                        fixture.debugElement.query(By.css('*')).query(By.css),
                        null)
                    instance.itemsPerPage = 2
                    fixture.detectChanges()
                    await fixture.whenStable()
                    assert.strictEqual(fixture.debugElement.queryAll(By.css(
                        'ul li a'
                    )).length, 7)
                    assert.strictEqual(instance.instance.lastPage, 5)
                    assert.deepEqual(
                        instance.instance.pagesRange, [1, 2, 3, 4, 5])
                    assert.strictEqual(instance.instance.previousPage, 1)
                    assert.strictEqual(instance.instance.nextPage, 2)
                    assert.deepEqual(fixture.debugElement.query(By.css(
                        '.current'
                    )).nativeElement.className.split(' ').filter((
                        name:string
                    ):boolean => !name.startsWith('ng-')).sort(),
                    ['current', 'even', 'page-1', 'previous'])
                    instance.instance.change(dummyEvent, 3)
                    assert.strictEqual(instance.instance.previousPage, 2)
                    assert.strictEqual(instance.instance.nextPage, 4)
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
                    console.warn(error)
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
