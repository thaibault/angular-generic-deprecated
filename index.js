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
import {globalContext, Tools} from 'clientnode'
import {
    AfterViewInit, Component, ElementRef, EventEmitter, Injectable, Input,
    Output, Pipe, PipeTransform, ViewChild
} from '@angular/core'
import {CanDeactivate} from '@angular/router'
import PouchDB from 'pouchdb'
import PouchDBFindPlugin from 'pouchdb-find'
import PouchDBValidationPlugin from 'pouchdb-validation'
import {Observable} from 'rxjs/Observable'
// endregion
// region pipes
@Pipe({name: 'extractRawData'})
export default class ExtractRawDataPipe implements PipeTransform {
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
// endregion
// region services
@Injectable()
export default class InitialDataService {
    configuration:PlainObject
    constructor():void {
        for (const key:string in globalContext.bpvWebNodePluginInitialData)
            if (globalContext.bpvWebNodePluginInitialData.hasOwnProperty(key))
                // IgnoreTypeCheck
                this[key] = globalContext.bpvWebNodePluginInitialData[key]
    }
}
@Injectable()
export class CanDeactivateRouteLeaveGuard implements CanDeactivate<Object> {
    canDeactivate(
        component:Object
    ):Observable<boolean>|Promise<boolean>|boolean {
        return 'canDeactivate' in component ? component.canDeactivate() : true
    }
}
@Injectable()
export default class DataService {
    database:PouchDB
    connection:PouchDB
    synchronisation:Object
    constructor(initialData:InitialDataService):void {
        this.database = PouchDB.plugin(PouchDBFindPlugin)
                               .plugin(PouchDBValidationPlugin)
        this.connection = new this.database(Tools.stringFormat(
            initialData.configuration.database.url,
            `${initialData.configuration.database.user.name}:` +
            `${initialData.configuration.database.user.password}@`
        ) + `/${initialData.configuration.name}`)
        //this.connection = new this.database('local')
        this.connection.installValidationMethods()
        /*
        this.synchronisation = PouchDB.sync(Tools.stringFormat(
            initialData.configuration.database.url,
            `${initialData.configuration.database.user.name}:` +
            `${initialData.configuration.database.user.password}@`
        ) + `/${initialData.configuration.name}`, 'local', {
            live: true, retry: true
        }).on('change', (info:Object):void => console.info('change', info))
        .on('paused', (error:Object):void => console.info('paused', error))
        .on('active', ():void => console.info('active'))
        .on('denied', (error:Object):void => console.info('denied', error))
        .on('complete', (info:Object):void => console.log('complete', info))
        .on('error', (error:Object):void => console.log('error', error))
        */
    }
    async get(
        selector:PlainObject, options:PlainObject = {}
    ):Promise<Array<PlainObject>> {
        return (await this.connection.find(Tools.extendObject(true, {
            selector
        }, options))).docs
    }
    put(...parameter:Array<any>):Promise<PlainObject> {
        return this.connection.put(...parameter)
    }
    remove(...parameter:Array<any>):Promise<PlainObject> {
        return this.connection.remove(...parameter)
    }
}
@Injectable()
export class DataScopeService {
    configuration:PlainObject
    data:DataService
    constructor(data:DataService, initialData:InitialDataService):void {
        this.configuration = initialData.configuration
        this.data = data
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
                                Tools.extendObject(
                                    true, Tools.copyLimitedRecursively(
                                        this.configuration.modelConfiguration
                                            .default.propertySpecification
                                    ), modelSpecification[name][fileName])
                } else
                    modelSpecification[name] = Tools.extendObject(
                        true, Tools.copyLimitedRecursively(
                            this.configuration.modelConfiguration.default
                                .propertySpecification,
                        ), modelSpecification[name])
        if (!propertyNames)
            propertyNames = Object.keys(modelSpecification)
        const result:PlainObject = {}
        for (const name:string of propertyNames) {
            if (modelSpecification.hasOwnProperty(name))
                result[name] = Tools.copyLimitedRecursively(
                    modelSpecification[name])
            else if (modelSpecification._attachments.hasOwnProperty(name))
                result[name] = Tools.copyLimitedRecursively(
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
                Tools.extendObject(true, object, result)
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
// region components
// / region default inputs
// // region text
const propertyInputContent:string = `
    [type]="model.name.startsWith('password') ? 'password' : model.type === 'string' ? 'text' : 'number'"
    [disabled]="model.disabled || model.mutable === false || model.writable === false"
    [max]="model.type === 'number' ? model.maximum : null"
    [maxlength]="model.type === 'string' ? model.maximum : null"
    [min]="model.type === 'number' ? model.minimum : null"
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
    template: `<md-input ${propertyInputContent}>${mdInputContent}</md-input>`
})
export default class GenericInputComponent {
    @Input() model:PlainObject = {}
    @Output() modelChange:EventEmitter = new EventEmitter()
    @Input() showValidationErrorMessages:boolean = false
    ngOnInit():void {
        Tools.extendObject(this.model, Tools.extendObject({
            disabled: false,
            maximum: null,
            minimum: null,
            nullable: true,
            regularExpressionPattern: '.*',
            type: 'string'
        }, this.model))
        if (this.model.type === 'string')
            Tools.extendObject(this.model, Tools.extendObject({
                maximum: Infinity, minimum: 0
            }, this.model))
        else
            Tools.extendObject(this.model, Tools.extendObject({
                maximum: Infinity, minimum: -Infinity
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
export default class GenericTextareaComponent {
    @Input() model:PlainObject = {}
    @Output() modelChange:EventEmitter = new EventEmitter()
    @Input() showValidationErrorMessages:boolean = false
    ngOnInit():void {
        Tools.extendObject(this.model, Tools.extendObject({
            disabled: false,
            maximum: null,
            minimum: null,
            nullable: true,
            regularExpressionPattern: '.*',
            type: 'string'
        }, this.model))
        if (this.model.type === 'string')
            Tools.extendObject(this.model, Tools.extendObject({
                maximum: Infinity, minimum: 0
            }, this.model))
        else
            Tools.extendObject(this.model, Tools.extendObject({
                maximum: Infinity, minimum: -Infinity
            }, this.model))
    }
    onChange(state:Object):void {
        this.model.state = state
        this.modelChange.emit(this.model)
    }
}
// // endregion
@Component({
    selector: 'file-input',
    template: `
        {{label}}
        <input type="file"/>
    `
})
export default class FileInputComponent {
    @Input() model:?PlainObject = null
    @Output() modelChange:EventEmitter<?PlainObject> = new EventEmitter()
}
// / endregion
@Component({
    selector: 'medium-input',
    template: `
        <ng-content></ng-content>
        <img
            [attr.alt]="name"
            [attr.src]="'http://127.0.0.1:5984/bpvWebNodePlugin/' + model._id + '/' + name"
        />
        <input #input type="file"/>
    `
})
export default class MediumInputComponent implements AfterViewInit {
    _data:DataService
    @ViewChild('input') input:ElementRef
    @Input() model:{
        id:?string;
        [key:string]:any;
    } = {}
    @Output() modelChange:EventEmitter = new EventEmitter()
    @Input() name:?string
    constructor(data:DataService):void {
        this._data = data
    }
    ngAfterViewInit():Promise<void> {
        this.input.nativeElement.addEventListener('change', async (
        ):Promise<void> => {
            try {
                await this._data.put({
                    _id: this.model.id,
                    _attachments: {
                        filename: {
                            type: this.file.type,
                            data: this.file
                        }
                    }
                })
            } catch (error) {
                console.error(error)
                return
            }
            this.modelChange.emit(this.model)
        })
    }
}
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
