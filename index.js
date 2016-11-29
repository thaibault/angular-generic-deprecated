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
    Input, NgModule, OnInit, Output, Pipe, PipeTransform, ReflectiveInjector,
    ViewChild
} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {MaterialModule} from '@angular/material'
import {CanDeactivate} from '@angular/router'
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import PouchDB from 'pouchdb'
import PouchDBFindPlugin from 'pouchdb-find'
import PouchDBValidationPlugin from 'pouchdb-validation'
import {Observable} from 'rxjs/Observable'
// endregion
// region services
@Injectable()
export class GenericToolsService {
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
            if (name === '_attachments') {
                for (const type:string in modelSpecification[name])
                    if (modelSpecification[name].hasOwnProperty(type)) {
                        result[name][type].name = type
                        result[name][type].value = null
                        if (Object.keys(data).length === 0)
                            for (const constraintType:string of [
                                'onCreateExpression', 'onCreateExecution'
                            ])
                                if (result[name][type].hasOwnProperty(
                                    constraintType
                                ))
                                    result[name][type].value = (new Function(
                                        'newDocument', 'oldDocument',
                                        'userContext', 'securitySettings',
                                        'name', 'models', 'modelConfiguration',
                                        'serialize', 'modelName', 'model',
                                        'propertySpecification', (
                                            constraintType.endsWith(
                                                'Expression'
                                            ) ? 'return ' : ''
                                        ) + result[name][type][constraintType]
                                    ))(
                                        data, null, {}, {}, type,
                                        this.configuration.modelConfiguration
                                            .models,
                                        this.configuration.modelConfiguration[
                                            name
                                        ][type], (object:Object):string =>
                                            JSON.stringify(
                                                object, null, 4
                                            ), modelName, modelSpecification,
                                            result[name][type])
                        let fileFound:boolean = false
                        if (data.hasOwnProperty(name) && ![
                            undefined, null
                        ].includes(data[name]))
                            for (const fileName:string in data[name])
                                if (result[name].hasOwnProperty(type) && (
                                    new RegExp(type)
                                ).test(fileName)) {
                                    fileFound = true
                                    result[name][type].value = data[name][
                                        fileName]
                                    result[name][type].value.name = fileName
                                    break
                                }
                        if (!fileFound && result[name][type].hasOwnProperty(
                            'default'
                        ) && ![undefined, null].includes(result[name][
                            type
                        ].default))
                            result[name][type].value = result[name][
                                type
                            ].default
                    }
            } else if (!name.startsWith('_')) {
                result[name].name = name
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
                                    type.endsWith('Expression') ? 'return ' :
                                    ''
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
                if (!(result[name].value instanceof Date) && name.endsWith(
                    'Time'
                ))
                    result[name].value = new Date(result[name].value)
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
        if (scope.hasOwnProperty('_attachments') && scope._attachments) {
            result._attachments = {}
            for (const key:string in scope._attachments)
                if (
                    scope._attachments.hasOwnProperty(key) &&
                    typeof scope._attachments[key] === 'object' &&
                    scope._attachments[key] !== null &&
                    'hasOwnProperty' in scope._attachments &&
                    scope._attachments[key].hasOwnProperty('value') &&
                    scope._attachments[key].value
                )
                    result._attachments[scope._attachments[
                        key
                    ].value.name] = scope._attachments[key].value
        }
        for (const name:string of ['_id', '_rev', '-type'])
            if (scope.hasOwnProperty(name))
                result[name] = scope[name]
        return result
    }
}
// endregion
// region pipes
// / region forwarded methods
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
// / endregion
// / region object
@Pipe({name: 'genericExtractRawData'})
export class GenericExtractRawDataPipe implements PipeTransform {
    transform(data:PlainObject):string {
        const result:PlainObject = {}
        for (const name:string in data)
            if (data.hasOwnProperty(name) && ![undefined, null, ''].includes(
                data[name]
            ) && name !== '_revisions')
                if (name === '_attachments') {
                    result[name] = {}
                    for (const fileName:string in data[name])
                        if (data[name].hasOwnProperty(fileName) && data[name][
                            fileName
                        ].hasOwnProperty('data'))
                            result[name][fileName] = {
                                content_type: data[name][fileName].content_type,
                                data: data[name][fileName].data
                            }
                } else
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
// / endregion
// region string
@Pipe({name: 'genericStringReplace'})
export class GenericStringReplacePipe implements PipeTransform {
    transform(
        string:string, search:string|RegExp, replacement:string = '',
        modifier:string = 'g'
    ):string {
        return string.replace(new RegExp(search, modifier), replacement)
    }
}
/**
 * Returns given string if it matches given pattern.
 */
@Pipe({name: 'genericStringShowIfPatternMatches'})
export class GenericStringShowIfPatternMatechsPipe implements PipeTransform {
    transform(
        string:string, pattern:string, invert:boolean = false,
        modifier:string = 'g'
    ):string {
        indicator = new $window.RegExp(pattern, modifier).test(string)
        if (invert)
            indicator = !indicator
        return indicator ? string : ''
    }
}
/**
 * Replaces a string with given replacement.
 */
@Pipe({name: 'genericStringStartsWith'})
export class GenericStringStartsWithPipe implements PipeTransform {
    transform(string:?string, needle:?string):boolean {
        return string && typeof needle === 'string' && string.startsWith(
            needle)
    }
}
/**
 * Replaces a string with given replacement.
 */
@Pipe({name: 'genericStringEndsWith'})
export class GenericStringEndsWith implements PipeTransform {
    transform(string:?string, needle:?string):boolean {
        return string && typeof needle === 'string' && string.endsWith(needle)
    }
}
/**
 * Tests if given pattern matches against given subject.
 */
@Pipe({name: 'genericStringMatch'})
export class GenericStringMatchPipe implements PipeTransform {
    transform(pattern:string, subject:string, modifier:string = ''):boolean {
        return (new $window.RegExp(pattern, modifier)).test(subject)
    }
}
/**
 * Returns a matched part of given subject with given pattern. Default is the
 * whole (zero) matched part.
 */
@Pipe({name: 'genericStringSliceMatch'})
export class GenericStringSliceMatchPipe implements PipeTransform {
    transform(
        subject:?subject, pattern:string, index:number = 0,
        modifier:string = ''
    ):string {
        return subject ? subject.match(new RegExp(
            pattern, modifier
        ))[index] : ''
    }
}
/**
 * Determines if given string has a time indicating suffix.
 */
@Pipe({name: 'genericStringHasTimeSuffix'})
export class GenericStringHasTimeSuffix implements PipeTransform {
    transform(string:?string):boolean {
        if (typeof string !== 'string')
            return false
        return string.endsWith('DateTime') || string.endsWith(
            'Date'
        ) || string.endsWith('Time') || string === 'timestamp'
    }
}
// / endregion
// / region number
/**
 * Returns part in percent of all.
 */
@Pipe({name: 'genericNumberPercent'})
export class GenericNumberPercent implements PipeTransform {
    transform(part:number, all:number):number {
        return (part / all) * 100
    }
}
// / endregion
// endregion
// region components
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
        <md-card>
            <md-card-header>
                <h3>
                    {{model._attachments[internalName]?.description || name}}
                    <span
                        md-suffix (click)="showDeclaration = !showDeclaration"
                        title="info"
                        *ngIf="model._attachments[internalName]?.declaration"
                    >[i]</span>
                </h3>
                <p *ngIf="showDeclaration">
                    {{model._attachments[internalName].declaration}}
                </p>
            </md-card-header>
            <img md-card-image
                *ngIf="file?.type === 'image' && file?.source"
                [attr.alt]="name" [attr.src]="file.source"
            >
            <video
                md-card-image autoplay muted loop
                *ngIf="file?.type === 'video' && file?.source"
            >
                <source [attr.src]="file.source" [type]="file.content_type">
                Keine Vorschau möglich.
            </video>
            <iframe
                [src]="file.source"
                *ngIf="file?.type === 'text' && file?.source"
                style="border:none;width:100%;max-height:150px"
            ></iframe>
            <div
                md-card-image
                *ngIf="!file?.type && (file?.source || (file?.source | genericType) === 'string')"
            >Keine Vorschau möglich.</div>
            <div md-card-image *ngIf="!file">Keine Datei ausgewählt.</div>
            <md-card-content>
                <ng-content></ng-content>
                <span *ngIf="showValidationErrorMessages">
                    <p
                        *ngIf="model._attachments[internalName]?.state.errors?.required"
                    >Bitte wählen Sie eine Datei aus.</p>
                    <p
                        *ngIf="model._attachments[internalName]?.state.errors?.name"
                    >
                        Der Dateiname "{{file.name}}" entspricht nicht dem
                        vorgegebenen Muster "{{this.internalName}}".
                    </p>
                    <p
                        *ngIf="model._attachments[internalName]?.state.errors?.contentType"
                    >
                        Der Daten-Typ "{{file.content_type}}" entspricht
                        nicht dem vorgegebenen Muster
                        "{{model._attachments[internalName].contentTypeRegularExpressionPattern}}".
                    </p>
                    <p
                        *ngIf="model._attachments[internalName]?.state.errors?.database"
                    >
                        {{model._attachments[internalName]?.state.errors?.database}}
                    </p>
                </span>
            </md-card-content>
            <md-card-actions>
                <input #input type="file" style="display:none"/>
                <button md-button (click)="input.click()">Neu</button>
                <button md-button *ngIf="file" (click)="remove()">
                    Löschen
                </button>
                <a *ngIf="file" [download]="file.name" [href]="file.source">
                    <button md-button>Download</button>
                </a>
            </md-card-actions>
        </md-card>
    `
})
export class GenericFileInputComponent implements OnInit, AfterViewInit {
    static imageMimeTypeRegularExpression:RegExp = new RegExp(
        '^image/(?:p?jpe?g|png|svg(?:\\+xml)?|vnd\\.microsoft\\.icon|gif|' +
        'tiff|webp|vnd\\.wap\\.wbmp|x-(?:icon|jng|ms-bmp))$')
    static textMimeTypeRegularExpression:RegExp = new RegExp(
        '^(?:application/xml)|(?:text/(?:plain|x-ndpb[wy]html|(?:x-)csv))$')
    static videoMimeTypeRegularExpression:RegExp = new RegExp(
        '^video/(?:(?:x-)?(?:x-)?webm|3gpp|mp2t|mp4|mpeg|quicktime|' +
        '(?:x-)?flv|(?:x-)?m4v|(?:x-)mng|x-ms-as|x-ms-wmv|x-msvideo)|' +
        '(?:application/(?:x-)?shockwave-flash)$')
    _data:GenericDataService
    _domSanitization:DomSanitizer
    _tools:Tools
    _prefixMatch:boolean = false
    // Holds the current selected file object if present.
    file:?PlainObject = null
    @Output() fileChange:EventEmitter = new EventEmitter()
    @ViewChild('input') input:ElementRef
    // Technical regular expression style file type.
    internalName:?string = null
    @Input() model:{
        id:?string;
        [key:string]:any;
    } = {}
    @Output() modelChange:EventEmitter = new EventEmitter()
    // Asset name.
    @Input() name:?string = null
    @Input() showValidationErrorMessages:boolean = false
    // Indicates weather changed file selections should be immediately attached
    // to given document.
    @Input() synchronizeImmediately:boolean = false
    constructor(
        data:GenericDataService, domSanitizer:DomSanitizer,
        tools:GenericToolsService
    ):void {
        this._data = data
        this._domSanitizer = domSanitizer
        this._tools = tools.tools
    }
    ngOnInit():void {
        for (const name:string in this.model._attachments)
            if (this.model._attachments.hasOwnProperty(name) && name.startsWith(
                this.name
            )) {
                if (name !== this.name)
                    this._prefixMatch = true
                this.internalName = name
                this.file = this.model._attachments[this.internalName].value
                this.model._attachments[this.internalName].state = {}
                if (this.file)
                    this.file.descriptionName = this.name
                else if (!this.model._attachments[this.internalName].nullable)
                    this.model._attachments[this.internalName].state.errors = {
                        required: true}
                if (this.file) {
                    this.file.hash = `#${this.file.digest}`
                    this.file.source =
                        this._domSanitizer.bypassSecurityTrustResourceUrl(
                            'http://127.0.0.1:5984/bpvWebNodePlugin/' +
                            this.model._id + '/' + this.file.name +
                            this.file.hash)
                }
                this.determinePresentationType()
                this.fileChange.emit(this.file)
                break
            }
    }
    ngAfterViewInit():void {
        this.input.nativeElement.addEventListener('change', async (
        ):Promise<void> => {
            if (this.input.nativeElement.files.length < 1)
                return
            this.model._attachments[this.internalName].state = {}
            const oldFileName:?string = this.file ? this.file.name : null
            this.file = {
                descriptionName: this.name,
                name: this.input.nativeElement.files[0].name
            }
            if (!this.name)
                this.name = this.file.name
            else if (this._prefixMatch) {
                const lastIndex:number = this.file.name.lastIndexOf('.')
                if ([0, -1].includes(lastIndex))
                    this.file.name = this.name
                else
                    this.file.name = this.name + this.file.name.substring(
                        lastIndex)
            }
            this.file.data = this.input.nativeElement.files[0]
            this.file.content_type = this.file.data.type || 'text/plain'
            this.file.length = this.file.data.size
            this.model._attachments[this.internalName].value = this.file
            if (!(new RegExp(this.internalName)).test(this.file.name))
                this.model._attachments[this.internalName].state.errors = {
                    name: true}
            if (!([undefined, null].includes(this.model._attachments[
                this.internalName].contentTypeRegularExpressionPattern
            ) || (new RegExp(this.model._attachments[
                this.internalName].contentTypeRegularExpressionPattern
            )).test(this.file.content_type))) {
                if (this.model._attachments[this.internalName].state.errors)
                    this.model._attachments[this.internalName].state.errors
                        .contentType = true
                else
                    this.model._attachments[this.internalName].state.errors = {
                        contentType: true}
                this.determinePresentationType()
            }
            if (this.synchronizeImmediately && !this.model._attachments[
                this.internalName
            ].state.errors) {
                let result:PlainObject
                const newData:PlainObject = {
                    '-type': this.model['-type'],
                    _id: this.model._id,
                    _rev: this.model._rev,
                    _attachments: {
                        [this.file.name]: {
                            content_type: this.file.content_type,
                            data: this.file.data
                        }
                    }
                }
                // NOTE: We want to replace old medium.
                if (oldFileName && oldFileName !== this.file.name)
                    newData._attachments[oldFileName] = {data: null}
                try {
                    result = await this._data.put(newData)
                } catch (error) {
                    this.model._attachments[this.internalName].state.errors = {
                        database: this._tools.representObject(error)}
                    return
                }
                this.file.revision = this.model._rev = result.rev
                this.file.hash = `#${result.rev}`
                this.file.source =
                    this._domSanitizer.bypassSecurityTrustResourceUrl(
                        'http://127.0.0.1:5984/bpvWebNodePlugin/' +
                        this.model._id + '/' + this.file.name + this.file.hash)
                this.determinePresentationType()
                this.fileChange.emit(this.file)
                this.modelChange.emit(this.model)
            } else {
                this.determinePresentationType()
                const fileReader:FileReader = new FileReader()
                fileReader.onload = (event:Object):void => {
                    this.file.source =
                        this._domSanitizer.bypassSecurityTrustResourceUrl(
                            event.target.result)
                    this.fileChange.emit(this.file)
                    this.modelChange.emit(this.model)
                }
                fileReader.readAsDataURL(this.file.data)
            }
        })
    }
    async remove() {
        if (this.synchronizeImmediately && this.file) {
            let result:PlainObject
            try {
                result = await this._data.put({
                    '-type': this.model['-type'],
                    _id: this.model._id,
                    _rev: this.model._rev,
                    _attachments: {[this.file.name]: {data: null}}
                })
            } catch (error) {
                this.model._attachments[this.internalName].state.errors = {
                    database: this._tools.representObject(error)
                }
                return
            }
            this.model._rev = result.rev
        }
        this.model._attachments[this.internalName].state.errors =
            this.model._attachments[this.internalName].value =
            this.file = null
        if (!this.model._attachments[this.internalName].nullable)
            this.model._attachments[this.internalName].state.errors = {
                required: true}
        this.fileChange.emit(this.file)
        this.modelChange.emit(this.model)
    }
    determinePresentationType() {
        if (
            this.file && this.file.content_type &&
            this.constructor.textMimeTypeRegularExpression.test(
                this.file.content_type)
        )
            this.file.type = 'text'
        else if (
            this.file && this.file.content_type &&
            this.constructor.imageMimeTypeRegularExpression.test(
                this.file.content_type)
        )
            this.file.type = 'image'
        else if (
            this.file && this.file.content_type &&
            this.constructor.videoMimeTypeRegularExpression.test(
                this.file.content_type)
        )
            this.file.type = 'video'
    }
}
// endregion
// region modules
const declarations:Array<Object> = Object.keys(module.exports).filter((
    name:string
):boolean => name.endsWith('Component') || name.endsWith('Pipe')).map((
    name:string
):Object => module.exports[name])
const providers:Array<Object> = Object.keys(module.exports).filter((
    name:string
):boolean =>
    name.endsWith('Resolver') || name.endsWith('Pipe') ||
    name.endsWith('Guard') || name.endsWith('Service')
).map((name:string):Object => module.exports[name])
const modules:Array<Object> = [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot()
]
@NgModule({
    declarations,
    exports: declarations,
    imports: modules,
    providers
})
export default class GenericModule {}
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
