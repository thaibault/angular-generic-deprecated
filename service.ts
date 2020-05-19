// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module angularGeneric */
'use strict'
/* !
    region header
    [Project page](https://torben.website/angularGeneric)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by torben sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
export * from './animation'
export * from './baseService'
// region imports
import Tools from 'clientnode'
import {PlainObject} from 'clientnode/type'
import {
    APP_INITIALIZER,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Injectable,
    /* eslint-disable no-unused-vars */
    Inject,
    /* eslint-enable no-unused-vars */
    Injector,
    Input,
    NgModule,
    NgZone,
    /* eslint-disable no-unused-vars */
    Optional,
    PLATFORM_ID
    /* eslint-enable no-unused-vars */
} from '@angular/core'
import {isPlatformBrowser, isPlatformServer} from '@angular/common'
import {
    HttpInterceptor, HTTP_INTERCEPTORS, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http'
import {MatButtonModule} from '@angular/material/button'
import {
    /* eslint-disable no-unused-vars */
    MAT_DIALOG_DATA,
    /* eslint-enable no-unused-vars */
    MatDialog,
    MatDialogConfig,
    MatDialogModule,
    MatDialogRef
} from '@angular/material/dialog'
import {
    MatSnackBar, MatSnackBarConfig, MatSnackBarModule
} from '@angular/material/snack-bar'
import {
    BrowserModule, DomSanitizer, SafeResourceUrl
} from '@angular/platform-browser'
import {
    ActivatedRouteSnapshot, CanDeactivate, Resolve, RouterStateSnapshot
} from '@angular/router'
import PouchDB from 'pouchdb'
import PouchDBFindPlugin from 'pouchdb-find'
import PouchDBValidationPlugin from 'pouchdb-validation'
import {Observable, Subject} from 'rxjs'
import {tap} from 'rxjs/operators'

import {animations} from './animation'
/*
    NOTE: Default import is not yet support for angular's ahead of time
    compiler.
*/
import {
    determineInjector,
    InitialDataService,
    LAST_KNOWN_DATA,
    BaseServiceModule,
    UtilityService
} from './baseService'
import {
    AttachmentWithPrefixExistsPipe,
    ConvertCircularObjectToJSONPipe,
    EqualsPipe,
    ExtendPipe,
    ExtractDataPipe,
    GetFilenameByPrefixPipe,
    BasePipeModule,
    NumberGetUTCTimestampPipe,
    RepresentPipe,
    StringEscapeRegularExpressionsPipe,
    StringFormatPipe
} from './basePipe'
// endregion
// region types
export type AllowedRoles = string|Array<string>|{
    read:string|Array<string>;
    write:string|Array<string>;
}
export type Constraint = {
    description?:string;
    evaluation:string;
}
export type MetaData = {
    submitted:boolean
}
export type Property = {
    allowedRoles?:AllowedRoles;
    constraintExecution?:Constraint;
    constraintExpression?:Constraint;
    contentTypeRegularExpressionPattern?:string;
    default?:any;
    emptyEqualsToNull?:boolean;
    index?:boolean;
    invertedContentTypeRegularExpressionPattern?:string;
    invertedRegularExpressionPattern?:string;
    maximum?:number;
    minimum?:number;
    maximumLength?:number;
    minimumLength?:number;
    maximumNumber?:number;
    minimumNumber?:number;
    maximumSize?:number;
    minimumSize?:number;
    mutable?:boolean;
    nullable?:boolean;
    onCreateExecution?:string;
    onCreateExpression?:string;
    oldName?:string;
    onUpdateExecution?:string;
    onUpdateExpression?:string;
    regularExpressionPattern?:string;
    selection?:Array<any>;
    trim?:boolean;
    type?:any;
    value?:any;
    writable?:boolean;
}
export type Model = {
    _allowedRoles?:AllowedRoles;
    _extends?:Array<string>;
    _constraintExpressions?:Array<Constraint>;
    _constraintExecutions?:Array<Constraint>;
    _maximumAggregatedSize?:number;
    _minimumAggregatedSize?:number;
    // NOTE: ":Property;" break type checks.
    [key:string]:any;
}
export type SpecialPropertyNames = {
    additional:string;
    allowedRole:string;
    attachment:string;
    conflict:string;
    constraint:{
        execution:string;
        expression:string;
    };
    create:{
        execution:string;
        expression:string;
    };
    deleted:string;
    deletedConflict:string;
    extend:string;
    id:string;
    localSequence:string;
    maximumAggregatedSize:string;
    minimumAggregatedSize:string;
    oldType:string;
    revision:string;
    revisions:string;
    revisionsInformation:string;
    strategy:string;
    type:string;
    update:{
        execution:string;
        expression:string;
    };
}
export type ModelConfiguration = {
    entities:PlainObject;
    property:{
        defaultSpecification:{
            minimum:number;
            minimumLength:number;
            minimumNumber:number;
        };
        name:{
            reserved:Array<string>;
            special:SpecialPropertyNames;
            typeRegularExpressionPattern:{
                private:string;
                public:string;
            };
            validatedDocumentsCache:string;
        }
    }
}
export type Configuration = {database:{
    connector:{
        auto_compaction:boolean;
        revs_limit:number;
    },
    createGenericFlatIndex:boolean;
    model:ModelConfiguration,
    plugins:Array<Object>;
    url:string;
}}
export type Stream = {
    cancel:Function;
    on:Function;
}
// endregion
// region services
@Injectable({providedIn: 'root'})
/**
 * A generic guard which prevents from switching to route if its component's
 * "canDeactivate()" method returns "false", a promise or observable wrapping
 * a boolean.
 */
export class CanDeactivateRouteLeaveGuard implements CanDeactivate<Object> {
    /**
     * Calls the component specific "canDeactivate()" method.
     * @param component - Component instance of currently selected route.
     * @param additionalParameter - All additional parameter are forwarded to
     * the components "canDeactivate" method.
     * @returns A boolean, promise or observable which wraps the indicator.
     */
    canDeactivate(
        component:any, ...additionalParameter:Array<any>
    ):Observable<boolean>|Promise<boolean>|boolean {
        return 'canDeactivate' in component ?
            component.canDeactivate(...additionalParameter) :
            true
    }
}
// / region confirm
@Component({
    animations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'generic-confirm',
    template: `
        <h2 @defaultAnimation mat-dialog-title *ngIf="title">{{title}}</h2>
        <mat-dialog-content @defaultAnimation *ngIf="message">
            {{message}}
        </mat-dialog-content>
        <mat-dialog-actions>
            <button
                cdkFocusInitial [mat-dialog-close]="true" mat-raised-button
            >
                {{okText}}
            </button>
            <button mat-dialog-close mat-raised-button>{{cancelText}}</button>
        </mat-dialog-actions>
    `
})
/**
 * Provides a generic confirmation component.
 * @property cancelText - Text to use as cancel button label.
 * @property dialogReference - Reference to the dialog component instance.
 * @property okText - Text to use as confirm button label.
 * @property title - Title to show in dialog.
 * @property message - Message to show in dialog.
 */
export class ConfirmComponent {
    @Input() cancelText:string = 'Cancel'
    dialogReference:MatDialogRef<ConfirmComponent>
    @Input() okText:string = 'OK'
    title:string = ''
    message:string = ''
    /* eslint-disable indent */
    /**
     * Gets needed component data injected.
     * NOTE: The "@Optional" decorator makes test instances possible.
     * NOTE: Don't set default values for theses optional parameter since the
     * would overwrite an injected value.
     * @param data - Data to provide for the dialog component instance.
     * @param dialogReference - Dialog component instance.
     * @returns Nothing.
     */
    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) data:any,
        @Optional() dialogReference:MatDialogRef<ConfirmComponent>
    ) {
    /* eslint-enable indent */
        this.dialogReference = dialogReference
        if (typeof data === 'object' && data !== null)
            for (const key in data)
                if (data.hasOwnProperty(key))
                    this[key] = data[key]
    }
}
@Injectable({providedIn: 'root'})
/**
 * Alert service to trigger a dialog window which can be confirmed.
 * @property dialog - Reference to the dialog component instance.
 * @property dialogReference - Reference to the dialog service instance.
 * @property extend - Holds the extend object's pipe transformation method.
 */
export class AlertService {
    dialog:MatDialog
    dialogReference:MatDialogRef<ConfirmComponent>
    extend:Function
    /**
     * Gets needed component dialog service instance injected.
     * @param dialog - Reference to the dialog component instance.
     * @param extendPipe - Injected extend object pipe instance.
     * @returns Nothing.
     */
    constructor(dialog:MatDialog, extendPipe:ExtendPipe) {
        this.dialog = dialog
        this.extend = extendPipe.transform.bind(extendPipe)
    }
    /**
     * Triggers a confirmation dialog to show.
     * @param data - Data to provide for the confirmations component instance.
     * @param additionalConfiguration - Additional configuration object to
     * apply to the underlying dialog instance.
     * @returns A promise resolving when confirmation window where confirmed or
     * rejected due to user interaction. A promised wrapped boolean indicates
     * which decision was made.
     */
    confirm(
        data:string|{[key:string]:any},
        additionalConfiguration:PlainObject = {}
    ):Promise<boolean> {
        let configuration:MatDialogConfig<any>
        if (typeof data === 'string')
            configuration = {data: {message: data}}
        else if (
            typeof data !== 'object' ||
            data === null ||
            !data.hasOwnProperty('data')
        )
            configuration = {data}
        else
            configuration = data
        this.dialogReference = this.dialog.open(
            ConfirmComponent,
            this.extend(true, configuration, additionalConfiguration)
        )
        return this.dialogReference.afterClosed().toPromise()
    }
}
// / endregion
@Injectable({providedIn: 'root'})
/**
 * A generic database connector.
 * @property static:revisionNumberRegularExpression - Compiled regular
 * expression to retrieve revision number from revision hash.
 * @property static:skipGenericIndexManagementOnServer - Indicates whether
 * generic index creation deletion should be done on server context.
 * @property static:skipRemoteConnectionOnBrowser - Indicates whether remote
 * connections should be avoided on browser contexts.
 * @property static:skipRemoteConnectionOnServer - Indicates whether remote
 * connections should be avoided on server contexts.
 * @property static:wrappableMethodNames - Saves a list of method names which
 * can be intercepted.
 *
 * @property configuration - Holds the configuration service instance.
 * @property connection - The current database connection instance.
 * @property connectionOptions - The current database connection options.
 * @property database - The entire database constructor.
 * @property errorCallbacks - Holds all registered error callbacks.
 * @property equals - Hilds the equals pipe transformation method.
 * @property extend - Holds the extend object's pipe transformation method.
 * @property initialized - Event emitter triggering when database
 * initialization has finished.
 * @property middlewares - Mapping of post and pre callback arrays to trigger
 * before or after each database transaction.
 * @property platformID - Platform identification string.
 * @property remoteConnection - The current remote database connection
 * instance.
 * @property stringFormat - Holds the string format's pipe transformation
 * method.
 * @property synchronisation - This synchronisation instance represents the
 * active synchronisation process if a local offline database is in use.
 * @property tools - Holds the tools class from the tools service.
 * @property zone - Zone service instance.
 */
export class DataService {
    // NOTE: Native regular expression definition is not allowed here.
    static revisionNumberRegularExpression:RegExp = new RegExp('^([0-9]+)-')
    static skipGenericIndexManagementOnServer:boolean = true
    static skipRemoteConnectionOnBrowser:boolean = false
    static skipRemoteConnectionOnServer:boolean = true
    static wrappableMethodNames:Array<string> = [
        'allDocs', 'bulkDocs', 'bulkGet',
        'close',
        'compact', 'compactDocument',
        'createIndex', 'deleteIndex',
        'destroy',
        'find', 'get',
        'getAttachment', 'getIndexes',
        'info',
        'post', 'put', 'putAttachment',
        'query',
        'remove', 'removeAttachment'
    ]

    configuration:PlainObject
    connection:PouchDB
    connectionOptions:PlainObject = {
        /* eslint-disable camelcase */
        skip_setup: true
        /* eslint-enable camelcase */
    }
    database:typeof PouchDB
    errorCallbacks:Array<Function> = []
    equals:Function
    extend:Function
    initialized:EventEmitter<PouchDB> = new EventEmitter()
    middlewares:{
        pre:{[key:string]:Array<Function>};
        post:{[key:string]:Array<Function>};
    } = {
        post: {},
        pre: {}
    }
    platformID:string
    remoteConnection:PouchDB|null = null
    runningRequests:Array<PlainObject> = []
    runningRequestsStream:Subject<Array<PlainObject>> = new Subject()
    stringFormat:Function
    synchronisation:Stream|null = null
    tools:Tools
    zone:NgZone
    /**
     * Creates the database constructor applies all plugins instantiates
     * the connection instance and registers all middlewares.
     * @param equalsPipe - Equals pipe service instance.
     * @param extendPipe - Injected extend object pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param platformID - Platform identification string.
     * @param stringFormatPipe - Injected string format pipe instance.
     * @param utility - Injected utility service instance.
     * @param zone - Injected zone service instance.
     * @returns Nothing.
     */
    constructor(
        equalsPipe:EqualsPipe,
        extendPipe:ExtendPipe,
        initialData:InitialDataService,
        @Inject(PLATFORM_ID) platformID:string,
        stringFormatPipe:StringFormatPipe,
        utility:UtilityService,
        zone:NgZone
    ) {
        this.configuration = initialData.configuration
        this.database = PouchDB
        this.equals = equalsPipe.transform.bind(equalsPipe)
        this.extend = extendPipe.transform.bind(extendPipe)
        this.platformID = platformID
        this.stringFormat = stringFormatPipe.transform.bind(stringFormatPipe)
        this.tools = utility.fixed.tools
        this.zone = zone
        const nativeBulkDocs:Function = this.database.prototype.bulkDocs
        const self:DataService = this
        this.database.plugin({bulkDocs: async function(
            firstParameter:any, ...parameter:Array<any>
        ):Promise<Array<PlainObject>> {
            /*
                Implements a generic retry mechanism for "upsert" and "latest"
                updates and optionally supports to ignore "NoChange" errors.
            */
            const idName:string =
                self.configuration.database.model.property.name.special.id
            const revisionName:string =
                self.configuration.database.model.property.name.special
                    .revision
            if (
                !Array.isArray(firstParameter) &&
                typeof firstParameter === 'object' &&
                firstParameter !== null &&
                firstParameter.hasOwnProperty(idName)
            )
                firstParameter = [firstParameter]
            /*
                NOTE: "bulkDocs()" does not get constructor given options if
                none were provided for a single function call.
            */
            if (
                self.configuration.database.connector.ajax &&
                self.configuration.database.connector.ajax.timeout && (
                    parameter.length === 0 ||
                    typeof parameter[0] !== 'object')
            )
                parameter.unshift({timeout:
                    self.configuration.database.connector.ajax.timeout})
            let result:Array<PlainObject> = []
            try {
                result = await nativeBulkDocs.call(
                    this, firstParameter, ...parameter)
            } catch (error) {
                /*
                    NOTE: We retrieve lastest revision in an additional request
                    if backend doesn't support the "latest" or "upsert" syntax.
                */
                if (error.name === 'bad_request') {
                    for (const item of firstParameter)
                        if (['latest', 'upsert'].includes(item[revisionName]))
                            try {
                                item[revisionName] = (
                                    await this.get(item[idName])
                                )[revisionName]
                            } catch (error) {
                                if (error.name === 'not_found')
                                    delete item[revisionName]
                                else
                                    throw error
                            }
                    result = await nativeBulkDocs.call(
                        this, firstParameter, ...parameter)
                } else
                    throw error
            }
            const conflictingIndexes:Array<number> = []
            const conflicts:Array<PlainObject> = []
            let index:number = 0
            for (const item of result) {
                if (
                    typeof firstParameter[index] === 'object' &&
                    firstParameter !== null
                )
                    if (
                        revisionName in firstParameter[index] &&
                        item.name === 'conflict' &&
                        ['latest', 'upsert'].includes(
                            firstParameter[index][revisionName])
                    ) {
                        conflicts.push(item)
                        conflictingIndexes.push(index)
                    } else if (
                        idName in firstParameter[index] &&
                        self.configuration.database.ignoreNoChangeError &&
                        'name' in item &&
                        item.name === 'forbidden' &&
                        'message' in item &&
                        item.message.startsWith('NoChange:')
                    ) {
                        result[index] = {
                            id: firstParameter[index][idName],
                            ok: true
                        }
                        result[index].rev =
                            revisionName in firstParameter[index] &&
                            !['latest', 'upsert'].includes(
                                firstParameter[index][revisionName]
                            ) ? firstParameter[index][revisionName] : (
                                await this.get(result[index].id)
                            )[revisionName]
                    }
                index += 1
            }
            if (conflicts.length) {
                firstParameter = conflicts
                const retriedResults:Array<PlainObject> = await this.bulkDocs(
                    firstParameter, ...parameter)
                for (const retriedResult of retriedResults)
                    result[conflictingIndexes.shift()] = retriedResult
            }
            return result
        }})
        this.database.plugin(PouchDBFindPlugin).plugin(PouchDBValidationPlugin)
    }
    /**
     * Adds an error callback to be triggered on database errors.
     * @param callback - Function to call on errors.
     * @returns A boolean indicating if given callback was already attached.
     */
    addErrorCallback(callback:Function):boolean {
        const result:boolean = this.removeErrorCallback(callback)
        this.errorCallbacks.push(callback)
        return result
    }
    /**
     * Determines all property names which are indexable in a generic manner.
     * @param modelConfiguration - Model specification object.
     * @param model - Model to determine property names from.
     * @returns The mapping object.
     */
    static determineGenericIndexablePropertyNames(
        modelConfiguration:ModelConfiguration, model:Model
    ):Array<string> {
        const specialNames:PlainObject =
            modelConfiguration.property.name.special
        return Object.keys(model).filter((name:string):boolean =>
            model[name] !== null &&
            typeof model[name] === 'object' &&
            (
                model[name].hasOwnProperty('index') &&
                model[name].index ||
                !(
                    model[name].hasOwnProperty('index') &&
                    !model[name].index ||
                    modelConfiguration.property.name.reserved.concat(
                        specialNames.additional,
                        specialNames.allowedRole,
                        specialNames.attachment,
                        specialNames.conflict,
                        specialNames.constraint.execution,
                        specialNames.constraint.expression,
                        specialNames.create.execution,
                        specialNames.create.expression,
                        specialNames.deleted,
                        specialNames.deletedConflict,
                        specialNames.extend,
                        specialNames.id,
                        specialNames.maximumAggregatedSize,
                        specialNames.minimumAggregatedSize,
                        specialNames.oldType,
                        specialNames.revision,
                        specialNames.revisions,
                        specialNames.revisionsInformation,
                        specialNames.type,
                        specialNames.update.execution,
                        specialNames.update.expression
                    ).includes(name) ||
                    model[name].type &&
                    (
                        typeof model[name].type === 'string' &&
                        model[name].type.endsWith('[]') ||
                        Array.isArray(model[name].type) &&
                        model[name].type.length &&
                        Array.isArray(model[name].type[0]) ||
                        modelConfiguration.entities.hasOwnProperty(
                            model[name].type)
                    )
                )
            )
        ).concat(specialNames.id, specialNames.revision)
    }
    /**
     * Initializes database connection and synchronisation if needed.
     * @returns A promise resolving when initialisation has finished.
     */
    async initialize():Promise<void> {
        /*
            NOTE: We want to allow other services to manipulate the database
            constructor and configurations before initializing them.
        */
        await this.tools.timeout()
        this.installPlugins()
        await this.initializeConnection()
    }
    /**
     * Initializes database connection and synchronisation if needed.
     * @returns A promise resolving when initialisation has finished.
     */
    async initializeConnection():Promise<void> {
        if (this.configuration.database.hasOwnProperty('publicURL'))
            this.configuration.database.url =
                this.configuration.database.publicURL
        this.extend(
            true,
            this.connectionOptions,
            this.configuration.database.connector || {}
        )
        const databaseName:string = this.configuration.name || 'generic'
        if (!(
            DataService.skipRemoteConnectionOnServer &&
            isPlatformServer(this.platformID) ||
            DataService.skipRemoteConnectionOnBrowser &&
            isPlatformBrowser(this.platformID)
        ))
            this.remoteConnection = new this.database(
                this.stringFormat(this.configuration.database.url, '') +
                    `/${databaseName}`,
                this.connectionOptions
            )
        if (
            this.configuration.database.local ||
            DataService.skipRemoteConnectionOnServer &&
            isPlatformServer(this.platformID)
        )
            this.connection = new this.database(
                databaseName, this.connectionOptions)
        else
            this.connection = this.remoteConnection
        this.connection.installValidationMethods()
        // region observe database changes stream error
        const nativeChangesMethod:Function = this.connection.changes
        this.connection.changes = (...parameter:Array<any>):any => {
            /*
                NOTE: We log a changes stream as running request if its is
                expected to finish at last after expected data is given.
            */
            let track:boolean = false
            if (
                parameter.length &&
                typeof parameter[0] === 'object' &&
                parameter[0] !== null && (
                    !parameter[0].live ||
                    typeof parameter[0].since === 'number' &&
                    parameter[0].since < 2
                )
            )
                track = true
            const changesStream:Stream = nativeChangesMethod.apply(
                this.connection, parameter)
            const clear:Function = track ? ():void => {
                if (!track)
                    return
                track = false
                const index:number = this.runningRequests.indexOf(
                    changesStream)
                if (index !== -1) {
                    this.runningRequests.splice(index, 1)
                    this.runningRequestsStream.next(this.runningRequests)
                }
            } : this.tools.noop
            if (track) {
                this.runningRequests.push(changesStream)
                this.runningRequestsStream.next(this.runningRequests)
                changesStream.on('change', clear)
                changesStream.on('complete', clear)
            }
            changesStream.on('error', (
                ...parameter:Array<any>
            ):Promise<any> => {
                clear()
                // NOTE: Spread parameter does not satisfy typescript.
                /* eslint-disable prefer-spread */
                return this.triggerErrorCallbacks.apply(this, parameter.concat(
                    changesStream))
                /* eslint-disable prefer-spread */
            })
            return changesStream
        }
        // endregion
        // region apply "latest/upsert" and ignore "NoChange" error feature
        /*
            NOTE: A "bulkDocs" plugin does not get called for every "put" and
            "post" call so we have to wrap runtime generated methods.
        */
        const configuration:PlainObject = this.configuration
        const idName:string =
            this.configuration.database.model.property.name.special.id
        const revisionName:string =
            this.configuration.database.model.property.name.special.revision
        for (const pluginName of ['post', 'put']) {
            const nativeMethod:Function = this.connection[pluginName].bind(
                this.connection)
            this.connection[pluginName] = async function(
                firstParameter:any, secondParameter:any,
                ...parameter:Array<any>
            ):Promise<any> {
                try {
                    return await nativeMethod(
                        firstParameter, secondParameter, ...parameter)
                } catch (error) {
                    const id:string = (
                        typeof firstParameter === 'object' &&
                        idName in firstParameter
                    ) ? firstParameter[idName] : firstParameter
                    if (
                        id &&
                        configuration.database.ignoreNoChangeError &&
                        'name' in error &&
                        error.name === 'forbidden' &&
                        'message' in error &&
                        error.message.startsWith('NoChange:')
                    ) {
                        const result:PlainObject = {id, ok: true}
                        const revision:string = (
                            typeof secondParameter === 'object' &&
                            revisionName in secondParameter
                        ) ? secondParameter[revisionName] : secondParameter
                        result.rev =
                            revisionName in firstParameter &&
                            !['latest', 'upsert'].includes(
                                revision
                            ) ? revision : (await this.get(result.id))[
                                revisionName]
                        return result
                    }
                    throw error
                }
            }
        }
        // endregion
        if (!(
            DataService.skipGenericIndexManagementOnServer &&
            isPlatformServer(this.platformID)
        ) && this.configuration.database.createGenericFlatIndex &&
            this.connection !== this.remoteConnection
        ) {
            // region create/remove needed/unneeded generic indexes
            for (const modelName in this.configuration.database.model.entities)
                if (
                    this.configuration.database.model.entities.hasOwnProperty(
                        modelName
                    ) && (
                        new RegExp(
                            this.configuration.database.model.property.name
                                .typeRegularExpressionPattern.public)
                    ).test(modelName)
                ) {
                    await this.connection.createIndex({index: {
                        ddoc: `${modelName}-GenericIndex`,
                        fields: [
                            this.configuration.database.model.property.name
                                .special.type
                        ],
                        name: `${modelName}-GenericIndex`
                    }})
                    for (
                        const name of
                        DataService.determineGenericIndexablePropertyNames(
                            this.configuration.database.model,
                            this.configuration.database.model.entities[
                                modelName])
                    )
                        await this.connection.createIndex({index: {
                            ddoc: `${modelName}-${name}-GenericIndex`,
                            fields: [
                                this.configuration.database.model.property.name
                                    .special.type,
                                name
                            ],
                            name: `${modelName}-${name}-GenericIndex`
                        }})
                }
            let indexes:Array<PlainObject>
            indexes = (await this.connection.getIndexes()).indexes
            for (const index of indexes)
                if (index.name.endsWith('-GenericIndex')) {
                    let exists:boolean = false
                    for (
                        const modelName in
                        this.configuration.database.model.entities
                    )
                        if (index.name.startsWith(`${modelName}-`)) {
                            for (
                                const name of
                                DataService
                                    .determineGenericIndexablePropertyNames(
                                        this.configuration.database.model,
                                        this.configuration.database.model
                                            .entities[modelName])
                            )
                                if ([
                                    `${modelName}-${name}-GenericIndex`,
                                    `${modelName}-GenericIndex`
                                ].includes(index.name))
                                    exists = true
                            break
                        }
                    if (!exists)
                        await this.connection.deleteIndex(index)
                }
            // endregion
        }
        // region register interceptor and apply zones to database interactions
        for (const name of DataService.wrappableMethodNames)
            for (const connection of [this.connection].concat(
                !this.remoteConnection ||
                this.connection === this.remoteConnection ?
                    [] :
                    this.remoteConnection
            ))
                if (typeof connection[name] === 'function') {
                    const method:Function = connection[name]
                    connection[name] = (
                        ...parameter:Array<any>
                    ):Promise<any> => this.zone.run(async ():Promise<any> => {
                        const request:{
                            name:string;
                            parameter:Array<any>;
                            wrappedParameter?:Array<any>;
                        } = {name, parameter, wrappedParameter: parameter}
                        this.runningRequests.push(request)
                        this.runningRequestsStream.next(this.runningRequests)
                        const clear:Function = ():void => {
                            const index:number = this.runningRequests.indexOf(
                                request)
                            if (index !== -1) {
                                this.runningRequests.splice(index, 1)
                                this.runningRequestsStream.next(
                                    this.runningRequests)
                            }
                        }
                        for (const methodName of [name, '_all'])
                            if (this.middlewares.pre.hasOwnProperty(
                                methodName
                            ))
                                for (
                                    const interceptor of
                                    this.middlewares.pre[methodName]
                                ) {
                                    let wrappedParameter:any =
                                        interceptor.apply(
                                            connection,
                                            request.wrappedParameter.concat(
                                                methodName === '_all' ?
                                                    name :
                                                    []))
                                    if (wrappedParameter) {
                                        if ('then' in wrappedParameter)
                                            try {
                                                wrappedParameter =
                                                    await wrappedParameter
                                            } catch (error) {
                                                clear()
                                                throw error
                                            }
                                        if (Array.isArray(wrappedParameter))
                                            request.wrappedParameter =
                                                wrappedParameter
                                    }
                                }
                        const action:Function = (
                            context:any=connection,
                            givenParameter:Array<any>=request.wrappedParameter
                        ):any => method.apply(context, givenParameter)
                        let result:any
                        try {
                            result = action()
                        } catch (error) {
                            await this.triggerErrorCallbacks(
                                error, result, action)
                        }
                        for (const methodName of [name, '_all'])
                            if (this.middlewares.post.hasOwnProperty(
                                methodName
                            ))
                                for (
                                    const interceptor of
                                    this.middlewares.post[methodName]
                                ) {
                                    result = interceptor.call(
                                        connection, result, action,
                                        ...request.wrappedParameter.concat(
                                            methodName === '_all' ? name : []))
                                    if ('then' in result)
                                        try {
                                            result = await result
                                        } catch (error) {
                                            clear()
                                            await this.triggerErrorCallbacks(
                                                error, result, action)
                                        }
                                }
                        if ('then' in result)
                            try {
                                result = await result
                            } catch (error) {
                                clear()
                                await this.triggerErrorCallbacks(
                                    error, result, action)
                            }
                        clear()
                        return result
                    })
                }
        // endregion
        this.initialized.emit(this.connection)
    }
    /**
     * Installs all configured plugins.
     * @returns Nothing.
     */
    installPlugins():void {
        for (const plugin of this.configuration.database.plugins)
            this.database.plugin(plugin)
    }
    /**
     * Creates a database index.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb-find's "createIndex()" method.
     * @returns Whatever pouchdb-find's "createIndex()" method returns.
     */
    createIndex(...parameter:Array<any>):Promise<PlainObject> {
        return this.connection.createIndex(...parameter)
    }
    /**
     * Creates or updates given data.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "bulkDocs()" method.
     * @returns Whatever pouchdb's method returns.
     */
    bulkDocs(...parameter:Array<any>):Promise<Array<any>> {
        return this.connection.bulkDocs(...parameter)
    }
    /**
     * Removes current active database.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "destroy()" method.
     * @returns Whatever pouchdb's method returns.
     */
    destroy(...parameter:Array<any>):Promise<PlainObject> {
        if (this.synchronisation)
            this.synchronisation.cancel()
        const result:Promise<PlainObject> = this.connection.destroy(
            ...parameter)
        this.middlewares = {post: {}, pre: {}}
        return result
    }
    /**
     * Retrieves a database resource determined by given selector.
     * @param selector - Selector object in mango.
     * @param options - Options to use during selecting items.
     * @returns A promise with resulting array of retrieved resources.
     */
    async find(
        selector:PlainObject, options:PlainObject = {}
    ):Promise<Array<PlainObject>> {
        return (await this.connection.find(this.extend(
            true, {selector}, options
        ))).docs
    }
    /**
     * Retrieves a resource by id.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "get()" method.
     * @returns Whatever pouchdb's method returns.
     */
    async get(...parameter:Array<any>):Promise<PlainObject> {
        const idName:string =
            this.configuration.database.model.property.name.special.id
        const revisionName:string =
            this.configuration.database.model.property.name.special.revision
        const result:PlainObject = await this.connection.get(...parameter)
        if (
            LAST_KNOWN_DATA.data.hasOwnProperty(result[idName]) &&
            parameter.length > 1 && (
                this.equals(parameter[1], {rev: 'latest'}) ||
                this.equals(parameter[1], {latest: true}) ||
                this.equals(parameter[1], {latest: true, rev: 'latest'})
            ) &&
            parseInt(
                result[revisionName].match(
                    DataService.revisionNumberRegularExpression
                )[1],
                10
            ) < parseInt(
                LAST_KNOWN_DATA.data[result[idName]][revisionName].match(
                    DataService.revisionNumberRegularExpression
                )[1],
                10
            )
        )
            return LAST_KNOWN_DATA.data[result[idName]]
        return result
    }
    /**
     * Retrieves an attachment by given id.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "get()" method.
     * @returns Whatever pouchdb's method returns.
     */
    getAttachment(...parameter:Array<any>):Promise<PlainObject> {
        if (parameter.length === 1 && typeof parameter[0] === 'string') {
            // NOTE: Support attachment retrieving by given url.
            const match:Array<string> = parameter[0].match(
                /([^/]+)\/([^/]+?)(\?[^?]*)?$/)
            if (match) {
                if (match[3]) {
                    const versionMatch:Array<string> = match[3].match(
                        /^\?(.+&)?rev=([^&]+)[^?]*$/)
                    if (versionMatch)
                        return this.connection.getAttachment(
                            match[1], match[2], {rev: versionMatch[1]})
                }
                return this.connection.getAttachment(match[1], match[2])
            }
        }
        return this.connection.getAttachment(...parameter)
    }
    /**
     * Creates or updates given data.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "put()" method.
     * @returns Whatever pouchdb's method returns.
     */
    put(...parameter:Array<any>):Promise<PlainObject> {
        return this.connection.put(...parameter)
    }
    /**
     * Creates or updates given attachment.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "put()" method.
     * @returns Whatever pouchdb's method returns.
     */
    putAttachment(...parameter:Array<any>):Promise<PlainObject> {
        return this.connection.putAttachment(...parameter)
    }
    /**
     * Registers a new middleware.
     * @param names - Event names to intercept.
     * @param callback - Callback function to trigger when specified event
     * happens.
     * @param type - Specifies whether callback should be triggered before or
     * after specified event has happened.
     * @returns A cancel function which will deregister given middleware.
     */
    register(
        names:string|Array<string>, callback:Function, type:string = 'post'
    ):Function {
        if (!Array.isArray(names))
            names = [names]
        for (const name of names) {
            if (!this.middlewares[type].hasOwnProperty(name))
                this.middlewares[type][name] = []
            this.middlewares[type][name].push(callback)
        }
        return ():void => {
            for (const name of names) {
                const index:number = this.middlewares[type][name].indexOf(
                    callback)
                if (index !== -1)
                    this.middlewares[type][name].splice(index, 1)
                if (this.middlewares[type][name].length === 0)
                    delete this.middlewares[type][name]
            }
        }
    }
    /**
     * Removes specified entities in database.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "remove()" method.
     * @returns Whatever pouchdb's "remove()" method return.
     */
    remove(...parameter:Array<any>):Promise<PlainObject> {
        return this.connection.remove(...parameter)
    }
    /**
     * Removes specified attachment from entity in database.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "removeAttachment()" method.
     * @returns Whatever pouchdb's "removeAttachment()" method return.
     */
    removeAttachment(...parameter:Array<any>):Promise<PlainObject> {
        return this.connection.removeAttachment(...parameter)
    }
    /**
     * Removes given error callback.
     * @param callback - Function to remove.
     * @returns A boolean indicating if given callback was registered.
     */
    removeErrorCallback(callback:Function):boolean {
        const index:number = this.errorCallbacks.indexOf(callback)
        if (index !== -1) {
            this.errorCallbacks.splice(index, 1)
            return true
        }
        return false
    }
    /**
     * Starts synchronisation between a local and remote database.
     * @returns A promise if a synchronisation has been started and is in sync
     * with remote database or null if no stream was initialized due to
     * corresponding database configuration.
     */
    async startSynchronisation():Promise<any> {
        if (
            this.configuration.database.local &&
            this.remoteConnection &&
            this.synchronisation === null
        ) {
            let resolved:boolean = false
            return await new Promise((
                resolve:Function, reject:Function
            ):void => {
                this.synchronisation = this.connection.sync(
                    this.remoteConnection, {live: true, retry: true}
                )
                    .on('change', (info:Object):void =>
                        console.info('change', info))
                    .on('paused', ():void => {
                        if (!resolved) {
                            resolved = true
                            resolve(this.synchronisation)
                        }
                        console.info('paused')
                    })
                    .on('active', ():void => console.info('active'))
                    .on('denied', (error:Object):void => {
                        if (!resolved) {
                            resolved = true
                            reject({name: 'denied', error})
                        }
                        console.warn('denied', error)
                    })
                    .on('complete', (info:Object):void =>
                        console.info('complete', info))
                    .on('error', (error:Object):void => {
                        if (!resolved) {
                            resolved = true
                            reject({name: 'error', error})
                        }
                        console.error('error', error)
                    })
            })
        }
        return null
    }
    /**
     * Stop a current running data synchronisation.
     * @returns A boolean indicating whether a synchronisation was really
     * stopped or there were none.
     */
    async stopSynchronisation():Promise<boolean> {
        if (this.synchronisation) {
            const promise:Promise<Object> = new Promise((
                resolve:Function, reject:Function
            ):void => {
                this.synchronisation.on('complete', resolve)
                this.synchronisation.on('error', reject)
            })
            this.synchronisation.cancel()
            await promise
            this.synchronisation = null
            return true
        }
        return false
    }
    /**
     * Triggers registered error callbacks with given error in given changes
     * stream context.
     * @param error - Error which has been occurred.
     * @param parameter - Additional arguments provided with given error.
     * @returns A Promise resolving when all asynchrone error handler have done
     * their work.
     */
    async triggerErrorCallbacks(
        error:any, ...parameter:Array<any>
    ):Promise<void> {
        let result:boolean|null = null
        for (const callback of this.errorCallbacks) {
            let localResult:any = callback(error, ...parameter)
            if (
                typeof localResult === 'object' &&
                localResult !== null &&
                'then' in localResult
            )
                localResult = await localResult
            if (typeof localResult === 'boolean')
                result = localResult
        }
        if (result === true || result === null && !(
            error.hasOwnProperty('name') &&
            error.name === 'unauthorized' ||
            error.hasOwnProperty('error') &&
            error.error === 'unauthorized' ||
            error.code === 'ETIMEDOUT' ||
            error.status === 0
        ))
            throw error
    }
}
@Injectable({providedIn: 'root'})
/**
 * Auto generates a components scope environment for a specified model.
 * @property attachmentWithPrefixExists - Hold the attachment with prefix
 * exists pipe transformation method.
 * @property configuration - Holds the configuration service instance.
 * @property data - Holds the data exchange service instance.
 * @property extend - Holds the extend object's pipe transformation method.
 * @property extractData - Holds the xtract object's pipe transformation
 * method.
 * @property getFilenameByPrefix - Holds the get file name by prefix's pipe
 * transformation method.
 * @property numberGetUTCTimestamp - Holds a date (and time) to unix timestamp
 * converter pipe transform method.
 * @property represent - Represent object pipe's service transformation method.
 * @property tools - Holds the tools class from the tools service.
 */
export class DataScopeService {
    attachmentWithPrefixExists:Function
    configuration:PlainObject
    data:DataService
    extend:Function
    extractData:Function
    getFilenameByPrefix:Function
    numberGetUTCTimestamp:Function
    represent:Function
    tools:typeof Tools
    /**
     * Saves alle needed services as property values.
     * @param attachmentWithPrefixExistsPipe - Attachment by prefix checker
     * pipe instance.
     * @param data - Injected data service instance.
     * @param extendPipe - Injected extend object pipe instance.
     * @param extractDataPipe - Injected extract data pipe instance.
     * @param getFilenameByPrefixPipe - Saves the file name by prefix retriever
     * pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param numberGetUTCTimestampPipe - Date (and time) to unix timestamp
     * converter pipe instance.
     * @param representPipe - Represent object pipe instance.
     * @param utility - Injected utility service instance.
     * @returns Nothing.
     */
    constructor(
        attachmentWithPrefixExistsPipe:AttachmentWithPrefixExistsPipe,
        data:DataService,
        extendPipe:ExtendPipe,
        extractDataPipe:ExtractDataPipe,
        getFilenameByPrefixPipe:GetFilenameByPrefixPipe,
        initialData:InitialDataService,
        numberGetUTCTimestampPipe:NumberGetUTCTimestampPipe,
        representPipe:RepresentPipe,
        utility:UtilityService
    ) {
        this.attachmentWithPrefixExists =
            attachmentWithPrefixExistsPipe.transform.bind(
                attachmentWithPrefixExistsPipe)
        this.configuration = initialData.configuration
        this.data = data
        this.extend = extendPipe.transform.bind(extendPipe)
        this.extractData = extractDataPipe.transform.bind(extractDataPipe)
        this.getFilenameByPrefix = getFilenameByPrefixPipe.transform.bind(
            getFilenameByPrefixPipe)
        this.numberGetUTCTimestamp = numberGetUTCTimestampPipe.transform.bind(
            numberGetUTCTimestampPipe)
        this.represent = representPipe.transform.bind(representPipe)
        this.tools = utility.fixed.tools
    }
    /**
     * Useful to sets route specific data in a resolver.
     * @param modelName - Name of model to retrieve data from.
     * @param id - ID of an entity to retrieve data from.
     * @param propertyNames - List of property names to retrieve data from.
     * @param revision - Revision to use for retrieving needed data from data
     * service.
     * @param revisionHistory - Indicates whether the revision history should
     * be included.
     * @returns A promise wrapping requested data.
     */
    async determine(
        modelName:string,
        id:string|null = null,
        propertyNames:Array<string>|null = null,
        revision:string = 'latest',
        revisionHistory:boolean = false
    ):Promise<PlainObject> {
        let data:PlainObject = {}
        if (id) {
            const options:PlainObject = {}
            /*
                NOTE: We try to prefer "find()" over "get()" to use a
                pre-calculated index if possible.
            */
            let useGet:boolean = true
            if (revision === 'latest') {
                if (propertyNames && !revisionHistory) {
                    useGet = false
                    options.selector = {[
                        this.configuration.database.model.property.name.special
                            .id
                    ]: id}
                    options.fields = propertyNames
                } else {
                    options.latest = true
                    if (revisionHistory)
                        /* eslint-disable camelcase */
                        options.revs_info = true
                        /* eslint-enable camelcase */
                }
            } else
                options.rev = revision
            if (useGet) {
                try {
                    data = await this.data.get(id, options)
                } catch (error) {
                    throw new Error(
                        `Document with given id "${id}" and revision "` +
                        `${revision}" isn't available: ` +
                        (
                            ('message' in error) ?
                                error.message :
                                this.represent(error)
                        )
                    )
                }
                if (revisionHistory) {
                    const revisionsInformationName:string =
                        this.configuration.database.model.property.name.special
                            .revisionsInformation
                    let revisions:Array<PlainObject>
                    let latestData:PlainObject|null = null
                    if (revision !== 'latest') {
                        delete options.rev
                        /* eslint-disable camelcase */
                        options.revs_info = true
                        /* eslint-enable camelcase */
                        try {
                            latestData = await this.data.get(id, options)
                        } catch (error) {
                            throw new Error(
                                `Document with given id "${id}" and ` +
                                `revision "${revision}" isn't available: ` +
                                (
                                    ('message' in error) ?
                                        error.message :
                                        this.represent(error)
                                )
                            )
                        }
                        revisions = latestData[revisionsInformationName]
                        delete latestData[revisionsInformationName]
                    } else
                        revisions = data[revisionsInformationName]
                    data[revisionsInformationName] = {}
                    let first:boolean = true
                    for (const item of revisions)
                        if (item.status === 'available') {
                            data[revisionsInformationName][
                                first ? 'latest' : item.rev
                            ] = {revision: item.rev}
                            first = false
                        }
                    if (latestData)
                        data[revisionsInformationName].latest.scope =
                            this.generate(modelName, propertyNames, latestData)
                }
            } else
                try {
                    data = await this.data.find({}, options)
                    if (data.length)
                        data = data[0]
                    else
                        throw new Error('Retrieved result is empty.')
                } catch (error) {
                    throw new Error(
                        `Latest document with given id "${id}" and matching ` +
                        `index isn't available: ` +
                        (
                            ('message' in error) ?
                                error.message :
                                this.represent(error)
                        )
                    )
                }
        }
        return this.generate(modelName, propertyNames, data)
    }
    /**
     * TODO TEST
    */
    determineNestedPropertyNames(names:Array<string>):Array<Array<string>> {
        const nestedNames:PlainObject = {}
        const remainingNames:Array<string> = []
        for (const name of names) {
            const index:number = name.indexOf('.')
            if (index > 0) {
                const key:string = name.substring(0, index)
                if (!remainingNames.includes(key))
                    remainingNames.push(key)
                if (!nestedNames.hasOwnProperty(key))
                    nestedNames[key] = []
                nestedNames[key].push(name.substring(index + 1))
            } else
                remainingNames.push(name)
        }
        return [nestedNames, remainingNames]
    }
    /**
     * Determines a nested specification object for given property name and
     * corresponding specification object where given property is bound to.
     * @param name - Property name to search specification for.
     * @param specification - Parents object specification.
     * @returns New specification object or null if it could not be determined.
     */
    determineNestedSpecifcation(
        name:string, specification?:PlainObject
    ):PlainObject|null {
        const entities:PlainObject =
            this.configuration.database.model.entities
        const additionalName:string =
            this.configuration.database.model.property.name.special.additional
        if (specification)
            if (specification.hasOwnProperty(name)) {
                if (entities.hasOwnProperty(specification[name].type))
                    return entities[specification[name].type]
            } else if (
                specification.hasOwnProperty(additionalName) &&
                entities.hasOwnProperty(specification[additionalName].type)
            )
                return entities[specification[additionalName].type]
        return null
    }
    /**
     * Determines a recursive resolved specification object for given (flat)
     * model object.
     * @param modelSpecification - Specification object to traverse.
     * @param propertyNames - List of property names to consider.
     * @param propertyNamesToIgnore - List of property names to skip.
     * @returns Resolved specification object.
     */
    determineSpecificationObject(
        modelSpecification:PlainObject,
        propertyNames:Array<string>|null = null,
        propertyNamesToIgnore:Array<string> = [],
    ):PlainObject {
        const specialNames:PlainObject =
            this.configuration.database.model.property.name.special
        if (!propertyNames)
            propertyNames = Object.keys(modelSpecification)
        let nestedPropertyNames:PlainObject
        [nestedPropertyNames, propertyNames] =
            this.determineNestedPropertyNames(propertyNames)
        let nestedPropertyNamesToIgnore:PlainObject
        [nestedPropertyNamesToIgnore, propertyNamesToIgnore] =
            this.determineNestedPropertyNames(propertyNamesToIgnore)
        const result:PlainObject = {}
        for (const name of propertyNames)
            if (
                modelSpecification.hasOwnProperty(name) &&
                !propertyNamesToIgnore.includes(name)
            )
                if (name === specialNames.attachment) {
                    result[name] = {}
                    for (const fileType in modelSpecification[name])
                        if (modelSpecification[name].hasOwnProperty(fileType))
                            result[name][fileType] = this.extend(
                                true,
                                this.tools.copy(
                                    this.configuration.database.model.property
                                        .defaultSpecification
                                ),
                                modelSpecification[name][fileType]
                            )
                } else {
                    result[name] = this.extend(
                        true,
                        this.tools.copy(
                            this.configuration.database.model.property
                                .defaultSpecification,
                        ),
                        modelSpecification[name]
                    )
                    if (
                        this.configuration.database.model.entities
                            .hasOwnProperty(result[name].type)
                    )
                        result[name].value = this.determineSpecificationObject(
                            this.configuration.database.model.entities[
                                result[name].type],
                            nestedPropertyNames.hasOwnProperty(name) ?
                                nestedPropertyNames[name] : null,
                            (nestedPropertyNamesToIgnore.hasOwnProperty(name) ?
                                nestedPropertyNamesToIgnore[name] : []
                            ).concat(
                                specialNames.id,
                                specialNames.attachment,
                                specialNames.oldType
                            )
                        )
                }
        return result
    }
    /**
     * Generates a scope object for given model with given property names and
     * property value mapping data.
     * @param modelName - Name of model to generate scope for.
     * @param propertyNames - List of property names to generate meta data in
     * scope for. If "null" is given all properties in given model will be
     * taken into account.
     * @param data - Data to use for given properties.
     * @param propertyNamesToIgnore - Property names to skip.
     * @returns The generated scope object.
     */
    generate(
        modelName:string,
        propertyNames:Array<string>|null = null,
        data:PlainObject = {},
        propertyNamesToIgnore?:Array<string>
    ):PlainObject {
        const entities:PlainObject = this.configuration.database.model.entities
        const modelSpecification:PlainObject = entities[modelName]
        const specialNames:PlainObject =
            this.configuration.database.model.property.name.special
        const idName:string = specialNames.id
        const revisionName:string = specialNames.revision
        const typeName:string = specialNames.type
        if (!propertyNamesToIgnore)
            propertyNamesToIgnore = modelName.startsWith('_') ? [
                idName, specialNames.attachment
            ] : []
        const reservedNames:Array<string> =
            this.configuration.database.model.property.name.reserved.concat(
                revisionName,
                specialNames.conflict,
                specialNames.deleted,
                specialNames.deletedConflict,
                specialNames.localSequence,
                specialNames.oldType,
                specialNames.revisions,
                specialNames.revisionsInformation,
                typeName
            )
        const specification:PlainObject = this.determineSpecificationObject(
            modelSpecification,
            propertyNames,
            propertyNamesToIgnore.concat(reservedNames)
        )
        if (!propertyNames) {
            propertyNames = Object.keys(specification).filter(
                (key:string):boolean =>
                    typeof specification[key] === 'object' &&
                    typeof specification[key] !== null &&
                    !Array.isArray(specification[key]))
            propertyNames = propertyNames.concat(Object.keys(data).filter((
                name:string
            ):boolean => !propertyNames.concat(reservedNames).includes(name)))
        }
        let nestedPropertyNames:PlainObject
        [nestedPropertyNames, propertyNames] =
            this.determineNestedPropertyNames(propertyNames)
        let nestedPropertyNamesToIgnore:PlainObject
        [nestedPropertyNamesToIgnore, propertyNamesToIgnore] =
            this.determineNestedPropertyNames(propertyNamesToIgnore)
        const result:PlainObject = {}
        for (const name of propertyNames) {
            if (propertyNamesToIgnore.includes(name))
                continue
            if (specification.hasOwnProperty(name))
                result[name] = this.tools.copy(specification[name])
            else
                result[name] = this.tools.copy((
                    'additional' in specialNames && specialNames.additional
                ) ? specification[specialNames.additional] : {})
            const now:Date = new Date()
            const nowUTCTimestamp:number = this.numberGetUTCTimestamp(now)
            if (name === specialNames.attachment) {
                for (const type in specification[name])
                    if (specification[name].hasOwnProperty(type)) {
                        result[name][type].name = type
                        result[name][type].value = null
                        if (Object.keys(data).length === 0) {
                            const scope:Object = {
                                attachmentWithPrefixExists:
                                    this.attachmentWithPrefixExists.bind(
                                        data, data),
                                getFilenameByPrefix: this.getFilenameByPrefix,
                                idName,
                                model: modelSpecification,
                                modelConfiguration:
                                    this.configuration.database.model,
                                modelName,
                                models: entities,
                                name: type,
                                newDocument: data,
                                now,
                                nowUTCTimestamp,
                                oldDocument: null,
                                propertySpecification: result[name][type],
                                revisionName,
                                securitySettings: {},
                                serialize: (object:Object):string =>
                                    JSON.stringify(object, null, 4),
                                specialNames,
                                typeName,
                                userContext: {}
                            }
                            for (const hookType of [
                                'onCreateExecution', 'onCreateExpression'
                            ])
                                if (
                                    result[name][type].hasOwnProperty(
                                        hookType) &&
                                    result[name][type][hookType]
                                ) {
                                    result[name][type].value = (new Function(
                                        ...Object.keys(scope),
                                        (
                                            hookType.endsWith('Expression') ?
                                                'return ' :
                                                ''
                                        ) +
                                        result[name][type][hookType]
                                    ))(...Object.values(scope))
                                    if (
                                        result[name][type].hasOwnProperty(
                                            'value') &&
                                        result[name][type].value === undefined
                                    )
                                        delete result[name][type].value
                                }
                        }
                        let fileFound:boolean = false
                        if (
                            data.hasOwnProperty(name) &&
                            ![undefined, null].includes(data[name])
                        )
                            for (const fileName in data[name])
                                if (
                                    result[name].hasOwnProperty(type) &&
                                    (new RegExp(type)).test(fileName)
                                ) {
                                    fileFound = true
                                    result[name][type].value = data[name][
                                        fileName]
                                    result[name][type].value.name = fileName
                                    break
                                }
                        if (
                            !fileFound &&
                            result[name][type].hasOwnProperty('default') &&
                            ![undefined, null].includes(result[name][
                                type
                            ].default)
                        )
                            result[name][type].value = this.tools.copy(
                                {}, result[name][type].default)
                    }
            } else {
                result[name].name = name
                result[name].value = null
                if (Object.keys(data).length === 0) {
                    const scope:Object = {
                        attachmentWithPrefixExists:
                            this.attachmentWithPrefixExists.bind(data, data),
                        getFilenameByPrefix: this.getFilenameByPrefix,
                        idName,
                        model: modelSpecification,
                        modelConfiguration: this.configuration.database.model,
                        modelName,
                        models: entities,
                        name,
                        newDocument: data,
                        now,
                        nowUTCTimestamp,
                        oldDocument: null,
                        propertySpecification: result[name],
                        revisionName,
                        securitySettings: {},
                        serialize: (object:Object):string => JSON.stringify(
                            object, null, 4
                        ),
                        specialNames,
                        typeName,
                        userContext: {}
                    }
                    for (const type of [
                        'onCreateExpression', 'onCreateExecution'
                    ])
                        if (
                            result[name].hasOwnProperty(type) &&
                            result[name][type]
                        ) {
                            result[name].value = (new Function(
                                ...Object.keys(scope),
                                (
                                    type.endsWith('Expression') ?
                                        'return ' :
                                        ''
                                ) +
                                result[name][type]
                            ))(...Object.values(scope))
                            if (result[name].value === undefined)
                                result[name].value = null
                        }
                }
                if (
                    data.hasOwnProperty(name) &&
                    ![undefined, null].includes(data[name])
                )
                    result[name].value = data[name]
                else if (
                    result[name].hasOwnProperty('default') &&
                    ![undefined, null].includes(result[name].default)
                )
                    result[name].value = this.tools.copy(result[name].default)
                else if (result[name].hasOwnProperty('selection'))
                    if (
                        Array.isArray(result[name].selection) &&
                        result[name].selection.length
                    )
                        result[name].value = result[name].selection[0]
                    else if (
                        typeof result[name].selection === 'object' &&
                        result[name].selection !== null
                    ) {
                        const selection:Array<any> = Object.values(
                            result[name].selection)
                        if (selection.length)
                            result[name].value = selection.sort()[0]
                    }
                if (
                    result[name].hasOwnProperty('type') &&
                    typeof result[name].type === 'string'
                )
                    if (
                        typeof result[name].value === 'number' &&
                        result[name].type.endsWith('DateTime')
                    )
                        // NOTE: We interpret given value as an utc timestamp.
                        result[name].value = new Date(
                            result[name].value * 1000)
                    else if (entities.hasOwnProperty(result[name].type))
                        result[name].value = this.generate(
                            result[name].type,
                            nestedPropertyNames.hasOwnProperty(name) ?
                                nestedPropertyNames[name] : null,
                            result[name].value || {},
                            (nestedPropertyNamesToIgnore.hasOwnProperty(name) ?
                                nestedPropertyNamesToIgnore[name] : []
                            ).concat(
                                specialNames.attachment,
                                idName,
                                specialNames.oldType
                            )
                        )
                    else if (result[name].type.endsWith('[]')) {
                        const type:string = result[name].type.substring(
                            0, result[name].type.length - 2)
                        if (
                            Array.isArray(result[name].value) &&
                            entities.hasOwnProperty(type)
                        ) {
                            let index:number = 0
                            for (const item of result[name].value) {
                                result[name].value[index] = this.generate(
                                    type,
                                    null,
                                    item || {},
                                    [
                                        specialNames.attachment,
                                        idName,
                                        specialNames.oldType
                                    ]
                                )
                                index += 1
                            }
                        }
                    }
            }
        }
        for (const name of reservedNames)
            if (data.hasOwnProperty(name))
                result[name] = data[name]
            else if (name === typeName)
                result[name] = modelName
        result._metaData = {submitted: false}
        return result
    }
}
@Injectable({providedIn: 'root'})
/**
 * Registers each request in the data requests list to track number of running
 * transactions.
 * @property data - Data service instance.
 */
export class RegisterHTTPRequestInterceptor implements HttpInterceptor {
    data:DataService
    /**
     * Registers needed service instances as instance properties.
     * @param data - Injected data service instance.
     * @returns Nothing.
     */
    constructor(data:DataService) {
        this.data = data
    }
    /**
     * Intercepts each request to perform request registration and
     * un-registration.
     * @param request - Request to register.
     * @param next - Interceptor chain.
     * @returns Result of the interceptor chain.
     */
    intercept(
        request:HttpRequest<any>, next:HttpHandler
    ):Observable<HttpEvent<any>> {
        this.data.runningRequests.push(request)
        this.data.runningRequestsStream.next(this.data.runningRequests)
        const unregister = ():void => {
            const index:number = this.data.runningRequests.indexOf(request)
            if (index !== -1)
                this.data.runningRequests.splice(index, 1)
            this.data.runningRequestsStream.next(this.data.runningRequests)
        }
        return next.handle(request).pipe(tap(unregister, unregister))
    }
}
// / region abstract
@Injectable({providedIn: 'root'})
/**
 * Helper class to extend from to have some basic methods to deal with database
 * entities.
 * @property static:skipResolving - Indicates whether to skip resolving data
 * contexts.
 *
 * @property convertCircularObjectToJSON - Saves convert circular object to
 * json's pipe transform method.
 * @property data - Holds currently retrieved data.
 * @property databaseBaseURL - Determined database base url.
 * @property databaseURL - Determined database url.
 * @property domSanitizer - Dom sanitizer service instance.
 * @property escapeRegularExpressions - Holds the escape regular expressions's
 * pipe transformation method.
 * @property extend - Holds the extend object's pipe transformation method.
 * @property message - Message box service.
 * @property messageConfiguration - Plain message box configuration object.
 * @property modelConfiguration - Saves a mapping from all available model
 * names to their specification.
 * @property platformID - Platform identification string.
 * @property relevantKeys - Saves a list of relevant key names to take into
 * account during resolving.
 * @property relevantSearchKeys - Saves a list of relevant key names to take
 * into during searching.
 * @property represent - Represent object pipe transformation function.
 * @property specialNames - mapping of special database field names.
 * @property tools - Tools service instance.
 * @property type - Model name to handle. Should be overwritten in concrete
 * implementations.
 * @property useLimit - Indicates whether an upper bound should be used by
 * retrieving backend items. NOTE: We can't use "limit" if we need total data
 * set size for pagination e.g.
 * @property useSkip - Indicates whether an lower bound should be used by
 * retrieving backend items. NOTE: We can't use "skip" if we need data for
 * auto completion e.g.
 */
export class AbstractResolver implements Resolve<PlainObject> {
    static skipResolving:boolean = true

    convertCircularObjectToJSON:Function
    data:PlainObject
    databaseBaseURL:string
    databaseURL:string
    databaseURLCache:{[key:string]:SafeResourceUrl} = {}
    domSanitizer:DomSanitizer
    escapeRegularExpressions:Function
    extend:Function
    message:Function
    messageConfiguration:PlainObject = new MatSnackBarConfig()
    modelConfiguration:PlainObject
    platformID:string
    relevantKeys:Array<string>|null = null
    relevantSearchKeys:Array<string>|null = null
    represent:Function
    specialNames:{[key:string]:string}
    tools:Tools
    type:string = 'Item'
    useLimit:boolean = false
    useSkip:boolean = false
    /**
     * Sets all needed injected services as instance properties.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(@Optional() injector:Injector) {
        const get:Function = determineInjector(
            injector, this, this.constructor)
        this.convertCircularObjectToJSON = get(
            ConvertCircularObjectToJSONPipe
        ).transform.bind(get(ConvertCircularObjectToJSONPipe))
        this.data = get(DataService)
        this.domSanitizer = get(DomSanitizer)
        const databaseBaseURL:string = get(StringFormatPipe).transform(
            get(InitialDataService).configuration.database.url, ''
        ) + '/'
        this.databaseBaseURL =
            `${databaseBaseURL}_utils/#/database/` +
            `${get(InitialDataService).configuration.name}/`
        this.databaseURL =
            databaseBaseURL + get(InitialDataService).configuration.name
        this.escapeRegularExpressions =
            get(StringEscapeRegularExpressionsPipe).transform.bind(get(
                StringEscapeRegularExpressionsPipe))
        this.extend = get(ExtendPipe).transform.bind(get(ExtendPipe))
        this.messageConfiguration.duration = 5 * 1000
        this.message = (message:string):void =>
            get(MatSnackBar).open(message, false, this.messageConfiguration)
        this.modelConfiguration = get(
            InitialDataService
        ).configuration.database.model
        this.platformID = get(PLATFORM_ID)
        this.represent = get(RepresentPipe).transform.bind(get(RepresentPipe))
        this.specialNames = get(
            InitialDataService
        ).configuration.database.model.property.name.special
        this.tools = get(UtilityService).fixed.tools
    }
    /**
     * Determines item specific database url by given item data object.
     * @param item - Given item to link to.
     * @returns Determined url.
     */
    getDatabaseURL(item:PlainObject|string):SafeResourceUrl {
        let id:string
        if (typeof item === 'string')
            id = item
        else if (typeof item[this.specialNames.id] === 'object')
            id = item[this.specialNames.id].value
        else
            id = item[this.specialNames.id]
        const url:string = `${this.databaseBaseURL}${id}`
        // NOTE: We cache sanitized urls to avoid reloads.
        if (!this.databaseURLCache.hasOwnProperty(url))
            this.databaseURLCache[url] =
                this.domSanitizer.bypassSecurityTrustResourceUrl(url)
        return this.databaseURLCache[url]
    }
    /**
     * List items which matches given filter criteria.
     * @param sort - List of items.
     * @param page - Page to show.
     * @param limit - Maximal number of entities to retrieve.
     * @param searchTerm - String query to search for.
     * @param additionalSelector - Custom filter criteria.
     * @returns A promise wrapping retrieved data.
     */
    list(
        sort:Array<PlainObject> = [{
            [
            InitialDataService.defaultScope.configuration.database.model
                .property.name.special.id
            ]: 'asc'
        }],
        page:number = 1,
        limit:number = 10,
        searchTerm:string = '',
        additionalSelector:PlainObject = {}
    ):Promise<Array<PlainObject>> {
        if (!this.relevantSearchKeys) {
            this.relevantSearchKeys =
                DataService.determineGenericIndexablePropertyNames(
                    this.modelConfiguration,
                    this.modelConfiguration.entities[this.type])
            this.relevantSearchKeys.splice(
                this.relevantSearchKeys.indexOf(this.specialNames.revision), 1)
        }
        const selector:PlainObject = {[this.specialNames.type]: this.type}
        if (searchTerm || Object.keys(additionalSelector).length) {
            if (sort.length)
                selector[Object.keys(sort[0])[0]] = {$gt: null}
            selector.$or = []
            for (const name of this.relevantSearchKeys)
                selector.$or.push({[name]: {$regex: searchTerm}})
            if (
                additionalSelector.hasOwnProperty('$or') &&
                additionalSelector.$or.length
            ) {
                /*
                    NOTE: We have to integrate search expression into existing
                    selector.
                */
                for (const item of selector.$or)
                    item.$or = additionalSelector.$or
                delete additionalSelector.$or
            }
        }
        const options:PlainObject = {}
        if (this.useLimit)
            options.limit = limit
        if (this.useSkip)
            options.skip = Math.max(page - 1, 0) * limit
        if (this.relevantKeys)
            options.fields = this.relevantKeys
        if (options.skip === 0)
            delete options.skip
        if (sort.length) {
            options.sort = [this.specialNames.type].concat(sort).map((
                item:PlainObject
            ):PlainObject|string =>
                Object.values(item)[0] === 'asc' ? Object.keys(item)[0] : item)
            for (const item of options.sort.slice(1))
                if (
                    item === this.specialNames.type ||
                    typeof item === 'object' &&
                    item.hasOwnProperty(this.specialNames.type)
                ) {
                    options.sort.shift()
                    break
                }
        }
        return this.data.find(
            this.extend(true, selector, additionalSelector), options)
    }
    /**
     * Removes given item.
     * @param item - Item or id to delete.
     * @param message - Message to show after successful deletion.
     * @returns Nothing.
     */
    remove(item:PlainObject, message:string = ''):Promise<boolean> {
        return this.update(item, {[this.specialNames.deleted]: true}, message)
    }
    /**
     * Implements the resolver method which converts route informations into
     * "list()" method parameter and forward their result as result in an
     * observable.
     * @param route - Current route informations.
     * @param _state - Current state informations.
     * @returns Promise with data filtered by current route informations.
     */
    resolve(
        route:ActivatedRouteSnapshot, _state:RouterStateSnapshot
    ):Array<PlainObject>|Promise<Array<PlainObject>> {
        if (
            AbstractResolver.skipResolving &&
            isPlatformServer(this.platformID)
        )
            return []
        let searchTerm:string = ''
        if ('searchTerm' in route.params) {
            const term:string = decodeURIComponent(route.params.searchTerm)
            if (term.startsWith('exact-'))
                searchTerm = this.escapeRegularExpressions(term.substring(
                    'exact-'.length))
            else if (term.startsWith('regex-')) {
                searchTerm = term.substring('regex-'.length)
                try {
                    new RegExp(searchTerm)
                } catch (error) {
                    searchTerm = ''
                }
            }
        }
        let sort:Array<PlainObject> = []
        if ('sort' in route.params)
            sort = route.params.sort.split(',').map((
                name:string
            ):PlainObject => {
                const lastIndex:number = name.lastIndexOf('-')
                let type:string = 'asc'
                if (lastIndex !== -1) {
                    type = name.substring(lastIndex + 1) || type
                    name = name.substring(0, lastIndex)
                }
                return {[name]: type}
            })
        return this.list(
            sort,
            parseInt(route.params.page || 1, 10),
            parseInt(route.params.limit || 10, 10),
            searchTerm
        )
    }
    /**
     * Updates given item.
     * @param item - Item to update.
     * @param data - Optional given data to update into given item.
     * @param message - Message to should if process was successfully.
     * @returns A boolean indicating if requested update was successful.
     */
    async update(
        item:PlainObject, data?:PlainObject, message:string = ''
    ):Promise<boolean> {
        const newData:PlainObject = data ? this.extend(
            {
                [this.specialNames.id]: (
                    typeof item[this.specialNames.id] === 'object'
                ) ? item[this.specialNames.id].value :
                    item[this.specialNames.id],
                [this.specialNames.revision]: 'latest',
                [this.specialNames.type]: item[this.specialNames.type]
            },
            data
        ) : item
        try {
            item[this.specialNames.revision] =
                (await this.data.put(newData)).rev
        } catch (error) {
            this.message(
                'message' in error ? error.message : this.represent(error))
            return false
        }
        if (message)
            this.message(message)
        return true
    }
}
// / endregion
// endregion
// region provider
/**
 * Creates a database connection and/or synchronisation stream plus missing
 * local indexes.
 * @param data - Injected data service instance.
 * @param initialData - Injected initial data service instance.
 * @param injector - Injected injector service instance.
 * @returns Initializer function.
 */
export function dataServiceInitializerFactory(
    data:DataService, initialData:InitialDataService, injector:Injector
):Function {
    // NOTE: We need this statement here to avoid having an typescript error.
    0
    return ():Promise<void> => {
        InitialDataService.injectors.add(injector)
        return data.initialize()
    }
}
// endregion
// region module
@NgModule({
    declarations: [ConfirmComponent],
    entryComponents: [ConfirmComponent],
    exports: [BaseServiceModule, ConfirmComponent],
    imports: [
        BasePipeModule,
        BaseServiceModule,
        BrowserModule.withServerTransition({
            appId: 'generic-service-universal'
        }),
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    /*
        NOTE: Running "moduleHelper.determineProviders()" is not yet supported
        by the AOT-Compiler.
    */
    providers: [
        // region services
        AlertService,
        DataScopeService,
        DataService,
        CanDeactivateRouteLeaveGuard,
        AbstractResolver,
        // endregion
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RegisterHTTPRequestInterceptor,
            multi: true
        },
        {
            deps: [DataService, InitialDataService, Injector],
            multi: true,
            provide: APP_INITIALIZER,
            useFactory: dataServiceInitializerFactory
        }
    ]
})
/**
 * Represents the importable angular module.
 */
export class ServiceModule {}
export default ServiceModule
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
