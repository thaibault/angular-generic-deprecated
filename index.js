// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module angularGeneric */
'use strict'
/* !
    region header
    [Project page](http://torben.website/angularGeneric)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import type {PlainObject} from 'clientnode'
import {$, globalContext, default as Tools} from 'clientnode'
import {
    AfterViewInit, Component, ElementRef, EventEmitter, Injectable, Injector,
    Input, Output, Pipe, PipeTransform, ReflectiveInjector, ViewChild
} from '@angular/core'
import {CanDeactivate} from '@angular/router'
import PouchDB from 'pouchdb'
import PouchDBFindPlugin from 'pouchdb-find'
import PouchDBValidationPlugin from 'pouchdb-validation'
import {Observable} from 'rxjs/Observable'
// endregion
// region services
@Injectable()
export default class GenericToolsService {
    $:any = $
    globalContext:Object = globalContext
    tools:Tools = Tools
}
@Injectable()
export class GenericInitialDataService {
    configuration:PlainObject
    constructor(tools:GenericToolsService):void {
        for (
            const key:string in tools.globalContext.bpvWebNodePluginInitialData
        )
            if (tools.globalContext.bpvWebNodePluginInitialData.hasOwnProperty(
                key
            ))
                // IgnoreTypeCheck
                this[key] = tools.globalContext.bpvWebNodePluginInitialData[
                    key]
    }
}
@Injectable()
export class GenericCanDeactivateRouteLeaveGuard implements
CanDeactivate<Object> {
    canDeactivate(
        component:Object
    ):Observable<boolean>|Promise<boolean>|boolean {
        return 'canDeactivate' in component ? component.canDeactivate() : true
    }
}
@Injectable()
export class GenericDataService {
    database:PouchDB
    connection:PouchDB
    synchronisation:Object
    tools:Tools
    constructor(
        tools:GenericToolsService, initialData:GenericInitialDataService
    ):void {
        this.tools = tools.tools
        this.database = PouchDB.plugin(PouchDBFindPlugin)
                               .plugin(PouchDBValidationPlugin)
        this.connection = new this.database(this.tools.stringFormat(
            initialData.configuration.database.url,
            `${initialData.configuration.database.user.name}:` +
            `${initialData.configuration.database.user.password}@`
        ) + `/${initialData.configuration.name}`)
        /*
            For local database:

            this.connection = new this.database('local')
        */
        this.connection.installValidationMethods()
        /*
            For local database:

            this.synchronisation = PouchDB.sync(this.tools.stringFormat(
                initialData.configuration.database.url,
                `${initialData.configuration.database.user.name}:` +
                `${initialData.configuration.database.user.password}@`
            ) + `/${initialData.configuration.name}`, 'local', {
                live: true, retry: true
            }).on('change', (info:Object):void => console.info('change', info))
            .on('paused', (error:Object):void => console.info('paused', error))
            .on('active', ():void => console.info('active'))
            .on('denied', (error:Object):void => console.info('denied', error))
            .on('complete', (info:Object):void =>
                console.log('complete', info))
            .on('error', (error:Object):void => console.log('error', error))
        */
    }
    async get(
        selector:PlainObject, options:PlainObject = {}
    ):Promise<Array<PlainObject>> {
        return (await this.connection.find(this.tools.extendObject(
            true, {selector}, options
        ))).docs
    }
    put(...parameter:Array<any>):Promise<PlainObject> {
        return this.connection.put(...parameter)
    }
    remove(...parameter:Array<any>):Promise<PlainObject> {
        return this.connection.remove(...parameter)
    }
}
@Injectable()
export class GenericDataScopeService {
    configuration:PlainObject
    data:GenericDataService
    tools:Tools
    constructor(
        data:GenericDataService, initialData:GenericInitialDataService,
        tools:GenericToolsService
    ):void {
        this.configuration = initialData.configuration
        this.data = data
        this.tools = tools.tools
    }
    generate(
        modelName:string, propertyNames:?Array<string> = null,
        data:PlainObject = {}
    ):PlainObject {
        const modelSpecification:PlainObject =
            this.configuration.modelConfiguration.models[modelName]
        for (const name:string in modelSpecification)
            if (modelSpecification.hasOwnProperty(name))
                if (name === '_attachments') {
                    for (const fileName:string in modelSpecification[name])
                        if (modelSpecification[name].hasOwnProperty(fileName))
                            modelSpecification[name][fileName] =
                                this.tools.extendObject(
                                    true, this.tools.copyLimitedRecursively(
                                        this.configuration.modelConfiguration
                                            .default.propertySpecification
                                    ), modelSpecification[name][fileName])
                } else
                    modelSpecification[name] = this.tools.extendObject(
                        true, this.tools.copyLimitedRecursively(
                            this.configuration.modelConfiguration.default
                                .propertySpecification,
                        ), modelSpecification[name])
        if (!propertyNames)
            propertyNames = Object.keys(modelSpecification)
        const result:PlainObject = {}
        for (const name:string of propertyNames) {
            if (modelSpecification.hasOwnProperty(name))
                result[name] = this.tools.copyLimitedRecursively(
                    modelSpecification[name])
            else if (modelSpecification._attachments.hasOwnProperty(name))
                result[name] = this.tools.copyLimitedRecursively(
                    modelSpecification._attachments[name])
            else
                result[name] = {}
            result[name].name = name
            if (!name.startsWith('_')) {
                result[name].value = null
                if (Object.keys(data).length === 0)
                    for (const type:string of [
                        'onCreateExpression', 'onCreateExecution'
                    ])
                        if (result[name].hasOwnProperty(type))
                            result[name].value = (new Function(
                                'newDocument', 'oldDocument', 'userContext',
                                'securitySettings', 'name', 'models',
                                'modelConfiguration', 'serialize', 'modelName',
                                'model', 'propertySpecification', (
                                    type.endsWith('Expression') ?
                                    'return ' : ''
                                ) + result[name][type]
                            ))(
                                data, null, {}, {}, name,
                                this.configuration.modelConfiguration.models,
                                this.configuration.modelConfiguration,
                                (object:Object):string => JSON.stringify(
                                    object, null, 4
                                ), modelName, modelSpecification, result[name])
                if (data.hasOwnProperty(name) && ![undefined, null].includes(
                    data[name]
                ))
                    result[name].value = data[name]
                else if (result[name].hasOwnProperty('default') && ![
                    undefined, null
                ].includes(result[name].default))
                    result[name].value = result[name].default
                else if (result[name].hasOwnProperty(
                    'selection'
                ) && Array.isArray(
                    result[name].selection
                ) && result[name].selection.length)
                    result[name].value = result[name].selection[0]
            }
        }
        for (const name:string of ['_id', '_rev', '-type'])
            if (data.hasOwnProperty(name))
                result[name] = data[name]
            else if (name === '-type')
                result[name] = modelName
        result._metaData = {submitted: false}
        return result
    }
    async set(
        modelName:string, scope:?Array<Object>|?Object = null,
        id:?string = null, propertyNames:?Array<string> = null,
        options:PlainObject = {}
    ):Promise<PlainObject> {
        if (propertyNames && !options.hasOwnProperty('fields'))
            options.fields = propertyNames
        let data:PlainObject = {}
        if (id) {
            const result:Array<PlainObject> = await this.data.get(
                {'-type': modelName, _id: id}, options)
            if (result.length === 0)
                throw new Error(
                    `Document with given id "${id}" isn't available.`)
            data = result[0]
        }
        const result:PlainObject = this.generate(
            modelName, propertyNames, data)
        if (scope) {
            if (!Array.isArray(scope))
                scope = [scope]
            for (const object:Object of scope)
                this.tools.extendObject(true, object, result)
            return result
        }
        return result
    }
    get(scope:Object):PlainObject {
        const result:PlainObject = {}
        for (const key:string in scope)
            if (
                scope.hasOwnProperty(key) && !key.startsWith('_') &&
                typeof scope[key] === 'object' && scope[key] !== null &&
                'hasOwnProperty' in scope && scope[key].hasOwnProperty('value')
            )
                result[key] = scope[key].value
        for (const name:string of ['_id', '_rev', '-type'])
            if (scope.hasOwnProperty(name))
                result[name] = scope[name]
        return result
    }
}
// endregion
// region pipes
// / region forwarded methods
// // region dynamic
const reference:Object = {}
for (const name:string of Object.getOwnPropertyNames(Tools))
    if (!['caller', 'arguments'].includes(name))
        reference[name] = Tools[name]
for (const configuration:PlainObject of [
    {
        reference: window,
        invert: ['array'],
        methodGroups: {
            string: ['encodeURIComponent'],
            number: ['pow']
        }
    }, {
        reference: reference,
        invert: ['array'],
        methodGroups: {
            '': ['equals', 'sort'],
            array: '*',
            string: '*',
            number: '*'
        }
    }
])
    for (const methodTypePrefix:string in configuration.methodGroups)
        if (configuration.methodGroups.hasOwnProperty(methodTypePrefix)) {
            let methodNames:Array<string> = []
            if (configuration.methodGroups[methodTypePrefix] === '*') {
                for (const name:string in configuration.reference)
                    if (configuration.reference.hasOwnProperty(
                        name
                    ) && configuration.reference.hasOwnProperty(name) && (
                        new RegExp(`^${methodTypePrefix}[A-Z0-9]`)
                    ).test(name))
                        methodNames.push(name)
            } else
                methodNames = configuration.methodGroups[methodTypePrefix]
            for (const methodName:string of methodNames) {
                const pipeName:string = Tools.stringCapitalize(methodName)
                module.exports[`Generic${pipeName}Pipe`] = class {
                    tools:Tools
                    constructor():void {
                        const injector:ReflectiveInjector =
                            ReflectiveInjector.resolveAndCreate(
                                [GenericToolsService])
                        this.tools = injector.get(GenericToolsService).tools
                    }
                    transform(...parameter:Array<any>):any {
                        return this.tools[methodName](...parameter)
                    }
                }
                Pipe({name: `generic${pipeName}`})(
                    module.exports[`Generic${pipeName}Pipe`])
                if (configuration.invert.includes(methodTypePrefix)) {
                    module.exports[`generic${pipeName}InvertedPipe`] = class {
                        tools:Tools
                        constructor():void {
                            const injector:ReflectiveInjector =
                                ReflectiveInjector.resolveAndCreate(
                                    [GenericToolsService])
                            this.tools = injector.get(
                                GenericToolsService
                            ).tools
                        }
                        transform(...parameter:Array<any>):any {
                            return this.tools.invertArrayFilter(
                                this.tools[methodName]
                            )(...parameter)
                        }
                    }
                    Pipe({name: `generic${pipeName}Inverted`})(
                        module.exports[`generic${pipeName}InvertedPipe`])
                }
            }
        }
// // endregion
// / region object
@Pipe({name: 'genericExtractRawData'})
export class GenericExtractRawDataPipe implements PipeTransform {
    transform(data:PlainObject):string {
        const result:PlainObject = {}
        for (const name:string in data)
            if (data.hasOwnProperty(name) && ![undefined, null, ''].includes(
                data[name]
            ) && name !== '_revisions')
                result[name] = data[name]
        return result
    }
}
/**
 * Returns given object with where each item was processed through given
 * filter.
*/
@Pipe({name: 'genericMap'})
export class GenericMapPipe implements PipeTransform {
    injector:Injector
    constructor(injector:Injector):void {
        this.injector = injector
    }
    transform(
        object:any, filterName:string, ...additionalArguments:Array<any>
    ):any {
        if (Array.isArray(object)) {
            const result:Array<any> = []
            for (const item:any of object)
                result.push(this.injector.get(filterName).transform(
                    item, ...additionalArguments))
            return result
        }
        const result:Object = {}
        for (const key:string in object)
            if (object.hasOwnProperty(key))
                result[key] = this.injector.get(filterName).transform(
                    value, ...additionalArguments)
        return result
    }
}
/**
 * Returns type of given object.
 */
@Pipe({name: 'genericType'})
export class GenericTypePipe implements PipeTransform {
    transform(object:any):string {
        return typeof object
    }
}
/**
 * Checks if given reference is defined.
 */
@Pipe({name: 'genericIsDefined'})
export class GenericIsDefinedPipe implements PipeTransform {
    transform(object:any, nullIsUndefined:boolean = false):boolean {
        return !(object === undefined || nullIsUndefined && indicator === null)
    }
}
/* TODO
.filter('genericLimitTo', ($window) -> (input, limit, begin) ->
    ###
        Implements native "String.substring()" method as filter and angular's
        native "limitTo" filter in one.
    ###
    # TODO: Remove this method if angular-2.0 is ported.
    if $window.Math.abs($window.Number limit) is $window.Infinity
        limit = $window.Number limit
    else
        limit = $window.parseInt limit
    return input if $window.isNaN limit
    input = input.toString() if $window.angular.isNumber input
    if not ($window.angular.isArray(input) or $window.angular.isString input)
        return input
    if not begin or $window.isNaN begin
        begin = 0
    else
        begin = $window.parseInt begin
    begin = $window.Math.max(0, input.length + begin) if begin < 0
    if limit >= 0
        return input.slice begin, begin + limit
    else if begin is 0
        return input.slice limit, input.length
    input.slice $window.Math.max(0, begin + limit), begin
).filter('genericShallowFilter', ($filter, $window) -> (
    data, searchQuery, comparator=null
) ->
    ###Like angular's native filter but doesn't search recursively.###
    if not $window.angular.isDefined(data) or not $window.angular.isDefined(
        searchQuery
    ) or searchQuery is ''
        return data
    match = (date, index, data) ->
        if $window.angular.isFunction searchQuery
            return searchQuery date, index, data
        if $window.angular.isObject date
            hasMatch = false
            for key, value of date
                if date.hasOwnProperty(key) and not $window.angular.isFunction(
                    value
                ) and key.charAt(0) isnt '$'
                    if $window.angular.isObject searchQuery
                        if searchQuery.hasOwnProperty key
                            currentSearchQuery = "#{searchQuery[key]}"
                        else
                            continue
                    else
                        currentSearchQuery = "#{searchQuery}"
                    value = "#{value}"
                    if comparator isnt null and not comparator
                        currentSearchQuery = currentSearchQuery.toLowerCase()
                        value = value.toLowerCase()
                    else if $window.angular.isFunction comparator
                        if comparator value, currentSearchQuery
                            hasMatch = true
                        continue
                    if comparator is true
                        if $filter('genericEquals')(
                            currentSearchQuery, value, null, 1
                        )
                            hasMatch = true
                    else if value.indexOf(currentSearchQuery) isnt -1
                        hasMatch = true
            return hasMatch
        searchQuery = "#{searchQuery}"
        date = "#{date}"
        if comparator isnt null and not comparator
            searchQuery = searchQuery.toLowerCase()
            date = date.toLowerCase()
        else if $window.angular.isFunction comparator
            return comparator date, searchQuery
        return searchQuery is date if comparator is true
        date.indexOf(searchQuery) isnt -1
    result = []
    for index, date of data
        index = $window.parseInt index
        result.push(date) if match date, index, data
    result
).filter('genericShallowFilterInverted', ($filter, genericTool) ->
    ###Inverted version of the shallow filter implementation.###
    # TODO test
    genericTool.constructor.invertArrayFilter $filter 'genericShallowFilter'
).filter('genericSliceObjects', ($window) -> (item) ->
    ###Removes all model connections from given item.###
    # TODO test
    result = {}
    for key, value of item
        if not (['_', '$'].indexOf(
            key.charAt 0
        ) is -1 and $window.angular.isObject value)
            result[key] = value
    result
).filter('genericSliceMethods', ($window) -> (item) ->
    ###Removes all model connections from given item.###
    # TODO test
    result = {}
    for key, value of item
        if not (['_', '$'].indexOf(
            key.charAt 0
        ) is -1 and $window.angular.isFunction value)
            result[key] = value
    result
).filter('genericFilterInverted', ($filter, genericTool) ->
    ###Inverted version of angular's native filter implementation.###
    genericTool.constructor.invertArrayFilter $filter 'filter'
).filter('genericNullIgnoreFilterInverted', ($filter, genericTool) -> ->
    ###
        Inverted version of angular's native filter implementation which
        doesn't filter if filter property is null.
    ###
    if arguments.length > 1 and arguments[1] is null
        return arguments[0]
    genericTool.constructor.invertArrayFilter($filter 'filter').apply this, arguments
).filter('genericFilterIfDefined', ($filter, $window) -> (
    data, filterName, indicator, parameter...
) ->
    ###
        Apply given filter with given parameter if given indicator is defined.
        If indicator isn't defined first argument will be returned.
    ###
    undefinedValues = [undefined, null]
    if $window.angular.isArray filterName
        undefinedValues = undefinedValues.concat filterName.slice(
            0, filterName.length - 1)
        filterName = filterName[filterName.length - 1]
    if indicator not in undefinedValues
        return $filter(filterName).apply this, [data, indicator].concat(
            parameter)
    data
)
// / endregion
// region string
*/
@Pipe({name: 'genericStringReplace'})
export class GenericStringReplacePipe implements PipeTransform {
    transform(
        string:string, search:string|RegExp, replacement:string = '',
        modifier:string = ''
    ):string {
        return string.replace(new RegExp(search, modifier), replacement)
    }
}
/*
.filter('genericStringShowIfPatternMatches', ($window) -> (
    string, pattern, invert
) ->
    ###Returns given string if it matches given pattern.###
    indicator = new $window.RegExp(pattern, 'g').test string
    indicator = not indicator if invert
    if indicator then string else ''
# TODO test
).filter('genericStringStartsWith', ($window) -> (string, needle) ->
    ###Replaces a string with given replacement.###
    if string and typeof needle is 'string'
        return string.startsWith(needle)
    false
# TODO test
).filter('genericStringEndsWith', ($window) -> (string, needle) ->
    ###Replaces a string with given replacement.###
    if string and typeof needle is 'string'
        return string.endsWith(needle)
    false
).filter('genericStringMatch', ($window) -> (pattern, subject) ->
    ###Tests if given pattern matches against given subject.###
    (new $window.RegExp(pattern)).test subject
).filter('genericStringSliceMatch', ($window) -> (subject, pattern, index=0) ->
    ###
        Returns a matched part of given subject with given pattern. Default is
        the whole (zero) matched part.
    ###
    return subject.match(new $window.RegExp pattern)[index] if subject
    ''
).filter('genericStringGetLastDataStateHeaderName', (
    $filter, genericOption
) -> (resourceName='data') ->
    ###Determines last data write time stamp for given resource name.###
    $filter('genericStringCapitalize')(
        $filter('genericStringCamelCaseToDelimited')(
            genericOption.lastDataWriteHeaderName
        ).replace /-([a-z])/g, (match) -> "-#{match[1].toUpperCase()}"
    ).replace 'Data', $filter('genericStringCapitalize') resourceName
).filter('genericStringHasTimeSuffix', ($filter) -> (string) ->
    ###Determines if given string has a time indicating suffix.###
    return false if not string?
    $filter('genericStringEndsWith')(string, 'DateTime') or $filter(
        'genericStringEndsWith'
    )(string, 'Date') or $filter('genericStringEndsWith')(
        string, 'Time'
    ) or string is 'timestamp'
)
// / endregion
// / region number
.filter('genericNumberPercent', ($window) -> (part, all) ->
    ###Returns part in percent of all.###
    (part / all) * 100
).filter('genericNumberDistance', ($filter) -> (number) ->
    ###Returns a distance representation for given number.###
    $filter('number')(number) + ' km'
)
*/
// / endregion
// endregion
// region components
// / region default inputs
// // region text
const propertyInputContent:string = `
    [disabled]="model.disabled || model.mutable === false || model.writable === false"
    [maxlength]="model.type === 'string' ? model.maximum : null"
    [minlength]="model.type === 'string' ? model.minimum : null"
    [pattern]="model.type === 'string' ? model.regularExpressionPattern : null"
    [placeholder]="model.description || model.name"
    [required]="!model.nullable"
    [(ngModel)]="model.value"
    #state="ngModel"
    #data
    (change)="onChange(state)"
`
const mdInputContent:string = `
    <span
        md-suffix (click)="showDeclaration = !showDeclaration" title="info"
        *ngIf="model.declaration"
    >[i]</span>
    <md-hint align="start">
        <span *ngIf="showValidationErrorMessages">
            <span *ngIf="state.errors?.required">
                Bitte füllen Sie das Feld "{{model.description}}" aus.
            </span>
            <span *ngIf="state.errors?.maxlength">
                Bitte geben Sie maximal {{model.maximum}} Zeichen ein.
            </span>
            <span *ngIf="state.errors?.minlength">
                Bitte geben Sie mindestens {{model.minimum}} Zeichen ein.
            </span>
            <span *ngIf="state.errors?.max">
                Bitte geben Sie eine Zahl kleiner oder gleich {{model.maximum}}
                ein.
            </span>
            <span *ngIf="state.errors?.min">
                Bitte geben Sie eine Zahl großer oder gleich {{model.minimum}}
                ein.
            </span>
            <span *ngIf="state.errors?.pattern">
                Bitte geben Sie eine Zeinefolge ein die dem regulären Ausdruck
                "{{model.regularExpressionPattern}}" entspricht.
            </span>
        </span>
        <span *ngIf="showDeclaration">{{model.declaration}}</span>
    </md-hint>
    <md-hint
        align="end"
        *ngIf="model.type === 'string' && model.maximum !== null && model.maximum < 100"
    >{{data.characterCount}} / {{model.maximum}}</md-hint>
`
@Component({
    selector: 'generic-input',
    template: `<md-input
        [max]="model.type === 'number' ? model.maximum : null"
        [min]="model.type === 'number' ? model.minimum : null"
        [type]="model.name.startsWith('password') ? 'password' : model.type === 'string' ? 'text' : 'number'"
        ${propertyInputContent}>${mdInputContent}</md-input>
    `
})
export class GenericInputComponent {
    @Input() model:PlainObject = {}
    @Output() modelChange:EventEmitter = new EventEmitter()
    @Input() showValidationErrorMessages:boolean = false
    _tools:Tools
    constructor(tools:GenericToolsService):void {
        this._tools = tools.tools
    }
    ngOnInit():void {
        this._tools.extendObject(this.model, this._tools.extendObject({
            disabled: false,
            maximum: Infinity,
            minimum: (this.model.type === 'string') ? 0 : -Infinity,
            nullable: true,
            regularExpressionPattern: '.*',
            type: 'string'
        }, this.model))
    }
    onChange(state:Object):void {
        this.model.state = state
        this.modelChange.emit(this.model)
    }
}
@Component({
    selector: 'generic-textarea',
    template: `
        <md-textarea ${propertyInputContent}>${mdInputContent}</md-textarea>`
})
export class GenericTextareaComponent {
    @Input() model:PlainObject = {}
    @Output() modelChange:EventEmitter = new EventEmitter()
    @Input() showValidationErrorMessages:boolean = false
    _tools:Tools
    constructor(tools:GenericToolsService):void {
        this._tools = tools.tools
    }
    ngOnInit():void {
        this._tools.extendObject(this.model, this._tools.extendObject({
            disabled: false,
            maximum: Infinity,
            minimum: (this.model.type === 'string') ? 0 : -Infinity,
            nullable: true,
            regularExpressionPattern: '.*',
            type: 'string'
        }, this.model))
    }
    onChange(state:Object):void {
        this.model.state = state
        this.modelChange.emit(this.model)
    }
}
// // endregion
@Component({
    selector: 'generic-file-input',
    template: `
        {{label}}
        <input type="file"/>
    `
})
export class GenericFileInputComponent {
    @Input() model:?PlainObject = null
    @Output() modelChange:EventEmitter<?PlainObject> = new EventEmitter()
}
// / endregion
@Component({
    selector: 'generic-medium-input',
    template: `
        <span>
            {{model[name]?.description || (name | genericStringReplace:'\\.[^.]+$' | genericStringCapitalize)}}
        </span>
        <img
            [attr.alt]="name"
            [attr.src]="'http://127.0.0.1:5984/bpvWebNodePlugin/' + model._id + '/' + name + '#' + hash"
        />
        <input #input type="file"/>
        <span
            md-suffix (click)="showDeclaration = !showDeclaration" title="info"
            *ngIf="model.declaration"
        >[i]</span>
        <span>
            <span *ngIf="showValidationErrorMessages">
                <span *ngIf="state.errors?.required">
                    Bitte füllen Sie das Feld "{{model.description}}" aus.
                </span>
            </span>
            <span *ngIf="showDeclaration">{{model.declaration}}</span>
        </span>
    `
})
export class GenericMediumInputComponent implements AfterViewInit {
    _data:GenericDataService
    _tools:Tools
    hash:number = (new Date()).getTime()
    @ViewChild('input') input:ElementRef
    @Input() model:{
        id:?string;
        [key:string]:any;
    } = {}
    @Output() modelChange:EventEmitter = new EventEmitter()
    @Input() name:?string = null
    @Input() showValidationErrorMessages:boolean = true
    state:PlainObject = {}
    constructor(data:GenericDataService, tools:GenericToolsService):void {
        this._data = data
        this._tools = tools.tools
        this._data.state = this.state
    }
    ngAfterViewInit():void {
        this.input.nativeElement.addEventListener('change', async (
        ):Promise<void> => {
            this.state.errors = null
            console.log('A', this.input.nativeElement.files[0].name)
            if (!this.name)
                this.name = this.input.nativeElement.files[0].name
            let result:PlainObject
            try {
                result = await this._data.put({
                    '-type': this.model['-type'],
                    _id: this.model._id,
                    _rev: this.model._rev,
                    _attachments: {
                        [this.name]: {
                            content_type: this.input.nativeElement.files[0].type,
                            data: this.input.nativeElement.files[0]
                        }
                    }
                })
            } catch (error) {
                this.state.errors = {
                    initialize: this._tools.representObject(error)
                }
                return
            }
            this.model._rev = result.rev
            this.hash = (new Date()).getTime()
            this.modelChange.emit(this.model)
        })
    }
}
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
