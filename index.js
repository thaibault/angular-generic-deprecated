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

    This library written by torben sickert stand under a creative commons
    naming 3.0 unported license.
    see http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import {tinymceDefaultSettings, TinyMceModule} from 'angular-tinymce'
import {blobToBase64String} from 'blob-util'
import type {PlainObject} from 'clientnode'
import Tools, {$, globalContext} from 'clientnode'
import {
    animate, AnimationTriggerMetadata, style, transition, trigger
} from '@angular/animations'
import {
    /* AfterViewInit,*/ APP_INITIALIZER, ChangeDetectorRef, Component,
    /* eslint-disable no-unused-vars */
    ContentChild, Directive, ElementRef, EventEmitter, forwardRef, Injectable,
    Inject, Injector, Input, NgModule, /* OnChanges, OnInit,*/ Optional,
    Output, Pipe, PipeTransform, PLATFORM_ID, ReflectiveInjector, Renderer2,
    TemplateRef, ViewChild
    /* eslint-enyyable no-unused-vars */
} from '@angular/core'
import {isPlatformServer} from '@angular/common'
import {
    DefaultValueAccessor, FormsModule, NG_VALUE_ACCESSOR
} from '@angular/forms'
import {
    /* eslint-disable no-unused-vars */
    // IgnoreTypeCheck
    MdButtonModule, MdCardModule, MD_DIALOG_DATA, MdDialog, MdDialogRef,
    /* eslint-enable no-unused-vars */
    MdDialogModule, MdInputModule, MdSelectModule, MdTooltipModule
} from '@angular/material'
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import {
    ActivatedRoute, ActivatedRouteSnapshot, /* CanDeactivate,*/ NavigationEnd,
    /* Resolve,*/ Router, RouterStateSnapshot
} from '@angular/router'
import PouchDB from 'pouchdb'
import PouchDBFindPlugin from 'pouchdb-find'
import PouchDBValidationPlugin from 'pouchdb-validation'
import {Subject} from 'rxjs'
import {Observable} from 'rxjs/Observable'
import {ISubscription} from 'rxjs/Subscription'
// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register')
} catch (error) {}
// endregion
declare var UTC_BUILD_TIMESTAMP:number
let LAST_KNOWN_DATA:{data:PlainObject;sequence:number|string} = {
    data: {}, sequence: 'now'
}
// region configuration
export const CODE_MIRROR_DEFAULT_OPTIONS:PlainObject = {
    // region paths
    path: {
        cascadingStyleSheet: 'lib/codemirror.css',
        base: '/codemirror/',
        mode: 'mode/{mode}/{mode}.js',
        script: 'lib/codemirror.js'
    },
    // endregion
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: false,
    lineNumbers: true,
    scrollbarStyle: 'native'
}
const tinyMCEBasePath:string = '/tinymce/'
export const TINY_MCE_DEFAULT_OPTIONS:PlainObject = Tools.extendObject(
    true, tinymceDefaultSettings, {
        /* eslint-disable camelcase */
        // region paths
        baseURL: tinyMCEBasePath,
        skin_url: `${tinyMCEBasePath}skins/lightgray`,
        theme_url: `${tinyMCEBasePath}themes/modern/theme.min.js`,
        tinymceScriptURL: `${tinyMCEBasePath}tinymce.min.js`,
        // endregion
        allow_conditional_comments: false,
        allow_script_urls: false,
        cache_suffix: `?version=${UTC_BUILD_TIMESTAMP}`,
        convert_fonts_to_spans: true,
        document_base_url: '/',
        element_format: 'xhtml',
        entity_encoding: 'raw',
        fix_list_elements: true,
        forced_root_block: null,
        hidden_input: false,
        invalid_elements: 'em',
        invalid_styles: 'color font-size line-height',
        keep_styles: false,
        menubar: false,
        /* eslint-disable max-len */
        plugins: 'fullscreen link code hr nonbreaking searchreplace visualblocks',
        /* eslint-enable max-len */
        relative_urls: false,
        remove_script_host: false,
        remove_trailing_brs: true,
        schema: 'html5',
        /* eslint-disable max-len */
        toolbar1: 'cut copy paste | undo redo removeformat | styleselect formatselect fontselect fontsizeselect | searchreplace visualblocks fullscreen code',
        toolbar2: 'alignleft aligncenter alignright alignjustify outdent indent | link hr nonbreaking bullist numlist bold italic underline strikethrough',
        /* eslint-enable max-len */
        trim: true
        /* eslint-enable camelcase */
    })
// endregion
// region basic services
// IgnoreTypeCheck
@Injectable()
/**
 * Injectable angular service for the tools class.
 * @property $ - Holds an instance of a generic dom abstraction layer like
 * jquery.
 * @property globalContext - Hold a reference to the environment specific
 * global scope.
 * @property tools - Holds a reference to the wrapped tools class.
 */
export class ToolsService {
    $:any = $
    globalContext:Object = globalContext
    tools:Object = Tools
}
// IgnoreTypeCheck
@Injectable()
/**
 * Serves initial data provided via a global variable.
 */
export class InitialDataService {
    static defaultScope:PlainObject = {configuration: {database: {
        connector: {
            /* eslint-disable camelcase */
            auto_compaction: true,
            revs_limit: 10
            /* eslint-enable camelcase */
        },
        model: {
            entities: {},
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
        plugins: [],
        url: 'generic'
    }}}

    configuration:PlainObject
    tools:Tools
    /**
     * Sets all properties of given initial data as properties to this
     * initializing instance.
     * @param tools - Saves the generic tools service instance.
     * @returns Nothing.
     */
    constructor(tools:ToolsService):void {
        this.tools = tools.tools
        this.set(
            this.constructor.defaultScope,
            tools.globalContext.genericInitialData || {})
        if (
            'document' in tools.globalContext &&
            'querySelector' in tools.globalContext.document
        ) {
            const domNode:DomNode = tools.globalContext.document.querySelector(
                'application')
            if (domNode && domNode.getAttribute('initialData')) {
                this.set(JSON.parse(domNode.getAttribute('initialData')))
                // NOTE: Free memory.
                domNode.removeAttribute('initialData')
            }
        }
    }
    /**
     * Sets initial data.
     * @param parameter - All given data objects will be merged into current
     * scope.
     * @returns Complete generated data.
     */
    set(...parameter:Array<PlainObject>):InitialDataService {
        return this.tools.extendObject(true, this, ...parameter)
    }
}
// endregion
// region pipes
// / region forwarded methods
// // region configuration
const invert:Array<string> = ['array']
const methodGroups:PlainObject = {
    '': [
        'convertCircularObjectToJSON', 'equals', 'extendObject',
        'representObject', 'sort'
    ],
    array: '*',
    number: '*',
    string: '*'
}
// // endregion
for (const methodTypePrefix:string in methodGroups)
    if (methodGroups.hasOwnProperty(methodTypePrefix)) {
        let methodNames:Array<string> = []
        if (methodGroups[methodTypePrefix] === '*')
            /* eslint-disable curly */
            for (const name:string of Object.getOwnPropertyNames(Tools)) {
                if (Tools.hasOwnProperty(name) && Tools.hasOwnProperty(
                    name
                ) && (new RegExp(`^${methodTypePrefix}[A-Z0-9]`)).test(name))
                    methodNames.push(name)
            }
            /* eslint-enable curly */
        else
            methodNames = methodGroups[methodTypePrefix]
        for (const methodName:string of methodNames) {
            const pipeName:string = Tools.stringCapitalize(methodName)
            module.exports[`${pipeName}Pipe`] = class {
                /**
                 * Performs the concrete conversion logic.
                 * @param parameter - Saves all generic parameter to forward it
                 * for triggering the underlying tools utility.
                 * @returns Whatever the underlying tools function returns.
                 */
                transform(...parameter:Array<any>):any {
                    return ReflectiveInjector.resolveAndCreate([
                        ToolsService
                    ]).get(ToolsService).tools[methodName](...parameter)
                }
            }
            Pipe({name: `generic${pipeName}`})(
                module.exports[`${pipeName}Pipe`])
            if (invert.includes(methodTypePrefix)) {
                module.exports[`${pipeName}InvertedPipe`] = class {
                    /**
                     * Performs the concrete conversion logic.
                     * @param parameter - Saves all generic parameter to
                     * forward it for triggering the underlying tools utility.
                     * @returns Whatever the underlying tools function returns.
                     */
                    transform(...parameter:Array<any>):any {
                        const tools:typeof Tools =
                            ReflectiveInjector.resolveAndCreate([
                                ToolsService
                            ]).get(ToolsService).tools
                        // IgnoreTypeCheck
                        return tools.invertArrayFilter(tools[methodName])(
                            ...parameter)
                    }
                }
                Pipe({name: `generic${pipeName}Inverted`})(
                    module.exports[`${pipeName}InvertedPipe`])
            }
        }
    }
const ArrayMakeRangePipe:PipeTransform = module.exports.ArrayMakeRangePipe
const EqualsPipe:PipeTransform = module.exports.EqualsPipe
const ExtendObjectPipe:PipeTransform = module.exports.ExtendObjectPipe
const NumberGetUTCTimestampPipe:PipeTransform =
    module.exports.NumberGetUTCTimestampPipe
const RepresentObjectPipe:PipeTransform = module.exports.RepresentObjectPipe
const StringCapitalizePipe:PipeTransform = module.exports.StringCapitalizePipe
const StringEscapeRegularExpressionsPipe:PipeTransform =
    module.exports.StringEscapeRegularExpressionsPipe
const StringFormatPipe:PipeTransform = module.exports.StringFormatPipe
// / endregion
// / region object
// IgnoreTypeCheck
@Pipe({name: 'genericGetFilenameByPrefix'})
/**
 * Retrieves a matching filename by given filename prefix.
 */
export class GetFilenameByPrefixPipe/* implements PipeTransform*/ {
    /**
     * Performs the actual transformations process.
     * @param attachments - Documents attachments object to determine file with
     * matching file name prefix.
     * @param prefix - Prefix or nothing to search for. If nothing given first
     * file name will be returned.
     * @returns Matching file name or null if no file matches.
     */
    transform(attachments:PlainObject, prefix:?string):?string {
        if (prefix) {
            for (const name:string in attachments)
                if (attachments.hasOwnProperty(name) && name.startsWith(
                    prefix
                ))
                    return name
        } else {
            const keys:Array<string> = Object.keys(attachments)
            if (keys.length)
                return keys[0]
        }
        return null
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericAttachmentWithPrefixExists'})
/**
 * Retrieves if a filename with given prefix exists.
 * @property attachmentName - Name of attachment property.
 * @property getFilenameByPrefix - Filename by prefix pipe's transformation
 * function.
 */
export class AttachmentWithPrefixExistsPipe/* implements PipeTransform*/ {
    attachmentName:string
    getFilenameByPrefix:Function
    /**
     * Gets needed file name by prefix pipe injected.
     * @param getFilenameByPrefixPipe - Filename by prefix pipe instance.
     * @param initialData - Injected initial data service.
     * @returns Nothing.
     */
    constructor(
        getFilenameByPrefixPipe:GetFilenameByPrefixPipe,
        initialData:InitialDataService
    ):void {
        this.attachmentName = initialData.configuration.database.model.property
            .name.special.attachment
        this.getFilenameByPrefix = getFilenameByPrefixPipe.transform.bind(
            getFilenameByPrefixPipe)
    }
    /**
     * Performs the actual transformations process.
     * @param document - Documents with attachments to analyse.
     * @param namePrefix - Prefix or nothing to search for. If nothing given
     * "false" will be returned either.
     * @returns Boolean indication if given file name prefix exists.
     */
    transform(document:PlainObject, namePrefix:?string):boolean {
        if (document.hasOwnProperty(this.attachmentName)) {
            const name:?string = this.getFilenameByPrefix(
                document[this.attachmentName], namePrefix)
            if (name)
                return document[this.attachmentName][name].hasOwnProperty(
                    'data'
                ) && ![undefined, null].includes(document[this.attachmentName][
                    name
                ].data)
        }
        return false
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericExtractData'})
/**
 * Removes all meta data from a document recursively.
 * @property modelConfiguration - Model configuration object.
 */
export class ExtractDataPipe/* implements PipeTransform*/ {
    modelConfiguration:PlainObject
    /**
     * Gets injected services.
     * @param initialData - Initial data service instance.
     * @returns Nothing.
     */
    constructor(initialData:InitialDataService):void {
        this.modelConfiguration = initialData.configuration.database.model
    }
    /**
     * Extracts raw data from given scope item.
     * @param item - Item to extract data from.
     * @returns Given extracted data.
     */
    transform(item:any):any {
        if (Array.isArray(item)) {
            const result:Array<any> = []
            for (const subItem:any of item)
                result.push(this.transform(subItem))
            return result
        } else if (typeof item === 'object' && item !== null) {
            const specialNames:PlainObject =
                this.modelConfiguration.property.name.special
            if (item.hasOwnProperty('value')) {
                if (
                    typeof item.value === 'object' &&
                    item.value !== null &&
                    specialNames.type in item.value &&
                    this.modelConfiguration.entities.hasOwnProperty(
                        item.value[specialNames.type])
                )
                    return this._extractFromObject(item.value)
                return this.transform(item.value)
            } else if (
                specialNames.type in item &&
                this.modelConfiguration.entities.hasOwnProperty(
                    item[specialNames.type])
            )
                return this._extractFromObject(item)
            return item
        }
        return item
    }
    /**
     * Retrieves raw data (without meta data) for given scope recursively.
     * @param object - Object to use to determine data from.
     * @returns Resolved data.
     */
    _extractFromObject(object:Object):PlainObject {
        const specialNames:PlainObject =
            this.modelConfiguration.property.name.special
        const result:PlainObject = {}
        for (const key:string in object)
            if (
                object.hasOwnProperty(key) && (
                    !(specialNames.type in object) ||
                    this.modelConfiguration.entities[object[
                        specialNames.type
                    ]].hasOwnProperty(key)
                ) && ![
                    specialNames.additional,
                    specialNames.allowedRole,
                    // NOTE: Will be handled later.
                    specialNames.attachment,
                    specialNames.conflict,
                    specialNames.constraint.execution,
                    specialNames.constraint.expression,
                    specialNames.deletedConflict,
                    specialNames.extend,
                    specialNames.localSequence,
                    specialNames.maximumAggregatedSize,
                    specialNames.minimumAggregatedSize,
                    specialNames.revisions,
                    specialNames.revisionsInformations
                ].includes(key)
            )
                result[key] = this.transform(object[key])
        if (
            object.hasOwnProperty(specialNames.attachment) &&
            object[specialNames.attachment]
        )
            for (const key:string in object[specialNames.attachment])
                if (
                    object[specialNames.attachment].hasOwnProperty(key) &&
                    typeof object[specialNames.attachment][key] === 'object' &&
                    object[specialNames.attachment][key] !== null &&
                    'hasOwnProperty' in object[specialNames.attachment] &&
                    object[specialNames.attachment][key].hasOwnProperty(
                        'value') &&
                    object[specialNames.attachment][key].value
                ) {
                    if (!result[specialNames.attachment])
                        result[specialNames.attachment] = {}
                    result[specialNames.attachment][object[
                        specialNames.attachment
                    ][key].value.name] = object[specialNames.attachment][
                        key
                    ].value
                }
        return result
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericExtractRawData'})
/**
 * Removes all meta data and already existing data (compared to an old
 * document) from a document recursively.
 * @property equals - Equals pipe transform function.
 * @property modelConfiguration - Model configuration object.
 * @property numberGetUTCTimestamp - Date (and time) to unix timstamp converter
 * pipe transform function.
 * @property specialnames - A mapping to database specific special property
 * names.
 * @property tools - Holds the tools class from the tools service.
 */
export class ExtractRawDataPipe/* implements PipeTransform*/ {
    equals:Function
    modelConfiguration:PlainObject
    numberGetUTCTimestamp:Function
    specialNames:{[key:string]:string}
    tools:Tools
    /**
     * Gets injected services.
     * @param equalsPipe - Equals pipe instance.
     * @param initialData - Initial data service instance.
     * @param numberGetUTCTimestampPipe - Date (and time) to unix timestamp
     * conversion.
     * @param tools - Injected tools service instance.
     * @returns Nothing.
     */
    constructor(
        equalsPipe:EqualsPipe, initialData:InitialDataService,
        numberGetUTCTimestampPipe:NumberGetUTCTimestampPipe, tools:ToolsService
    ):void {
        this.equals = equalsPipe.transform.bind(equalsPipe)
        this.modelConfiguration = initialData.configuration.database.model
        this.numberGetUTCTimestamp = numberGetUTCTimestampPipe.transform.bind(
            numberGetUTCTimestampPipe)
        this.specialNames = this.modelConfiguration.property.name.special
        this.tools = tools.tools
    }
    /**
     * Converts all (nested) date object in given data structure to their
     * corresponding utc timestamps in milliseconds.
     * @param value - Given data structure to convert.
     * @returns Given converted object.
     */
    convertDateToTimestampRecursively(value:any):any {
        if (typeof value === 'object' && value !== null) {
            if (value instanceof Date)
                return this.numberGetUTCTimestamp(value)
            if (Array.isArray(value)) {
                const result:Array<any> = []
                for (const subValue:any of value)
                    result.push(this.convertDateToTimestampRecursively(
                        subValue))
                return result
            }
            if (Object.getPrototypeOf(value) === Object.prototype) {
                const result:PlainObject = {}
                for (const name:string in value)
                    if (value.hasOwnProperty(name))
                        result[name] = this.convertDateToTimestampRecursively(
                            value[name])
                return result
            }
        }
        return value
    }
    /**
     * Remove already existing values and mark removed or truncated values
     * (only respect values if specified in model).
     * @param newData - Data to consider.
     * @param oldData - Old data to use for checking for equality.
     * @param specification - Specification object for given document.
     * @returns An object holding new data and boolean indicating if there
     * exists any payload.
     */
    removeAlreadyExistingData(
        newData:any, oldData:any, specification:?PlainObject
    ):{newData:any;payloadExists:boolean} {
        let payloadExists:boolean = false
        if (Array.isArray(newData)) {
            /*
                NOTE: We do not have to take any specification data into
                account for an array since any change in any item breaks
                complete array equality.
            */
            if (!this.equals(newData, oldData))
                payloadExists = true
        } else if (
            specification && typeof newData === 'object' && newData !== null
        ) {
            for (const name:string in oldData)
                if (
                    oldData.hasOwnProperty(name) &&
                    !this.modelConfiguration.property.name.reserved.concat(
                        this.specialNames.deleted,
                        this.specialNames.id,
                        this.specialNames.revision,
                        this.specialNames.type
                    ).includes(name)
                )
                    if (newData.hasOwnProperty(name)) {
                        const result:{newData:any;payloadExists:boolean} =
                            this.removeAlreadyExistingData(
                                newData[name], oldData[name],
                                specification[name] ||
                                specification[this.specialNames.additional])
                        if (result.payloadExists) {
                            payloadExists = true
                            newData[name] = result.newData
                        } else
                            delete newData[name]
                    } else {
                        payloadExists = true
                        newData[name] = null
                    }
        } else if (!this.equals(
            newData, this.convertDateToTimestampRecursively(oldData)
        ))
            payloadExists = true
        return {newData, payloadExists}
    }
    /**
     * Removes all special property names with meta data from given document.
     * @param data - To trim.
     * @param specification - Specification object for given document.
     * @returns Sliced given document.
     */
    removeMetaData(data:PlainObject, specification:?PlainObject):any {
        if (data instanceof Date)
            return this.numberGetUTCTimestamp(data)
        if (Array.isArray(data)) {
            let index:number = 0
            for (const item:any of data) {
                data[index] = this.removeMetaData(
                    item, specification && (
                        specification[name] ||
                        specification[this.specialNames.additional]))
                index += 1
            }
            return data
        }
        if (typeof data === 'object' && data !== null) {
            const result:PlainObject = {}
            for (const name:string in data)
                if (
                    data.hasOwnProperty(name) &&
                    ![undefined, null, ''].includes(data[name])
                )
                    if (this.modelConfiguration.property.name.reserved.concat(
                        this.specialNames.deleted,
                        this.specialNames.id,
                        this.specialNames.revision,
                        this.specialNames.type
                    ).includes(name))
                        result[name] = data[name]
                    else if (
                        ![
                            this.specialNames.additional,
                            this.specialNames.allowedRole,
                            this.specialNames.attachment,
                            this.specialNames.conflict,
                            this.specialNames.constraint.execution,
                            this.specialNames.constraint.expression,
                            this.specialNames.deletedConflict,
                            this.specialNames.extend,
                            this.specialNames.localSequence,
                            this.specialNames.maximumAggregatedSize,
                            this.specialNames.minimumAggregatedSize,
                            this.specialNames.revisions,
                            this.specialNames.revisionsInformations
                        ].includes(name) &&
                        (
                            !specification ||
                            specification.hasOwnProperty(name) ||
                            specification.hasOwnProperty(
                                this.specialNames.additional) &&
                            specification[this.specialNames.additional]
                        )
                    )
                        result[name] = this.removeMetaData(
                            data[name], specification && (
                                specification[name] ||
                                specification[this.specialNames.additional]))
            return result
        }
        return data
    }
    /**
     * Implements the meta data removing of given document.
     * @param newDocument - Document to slice meta data from.
     * @param oldDocument - Optionally existing old document to take into
     * account.
     * @param fileTypeReplacement - Indicates whether file type replacements
     * and removes should be taken into account.
     * @returns The copied sliced version of given document if changes exists
     * (checked against given old document) and "null" otherwise.
     */
    transform(
        newDocument:PlainObject, oldDocument:?PlainObject,
        fileTypeReplacement:boolean = true
    ):?PlainObject {
        let specification:?PlainObject = null
        if (
            this.specialNames.type in newDocument &&
            this.modelConfiguration.entities.hasOwnProperty(newDocument[
                this.specialNames.type])
        )
            specification = this.modelConfiguration.entities[newDocument[
                this.specialNames.type]]
        let result:PlainObject = this.removeMetaData(
            newDocument, specification)
        const untouchedAttachments:Array<string> = []
        if (
            newDocument.hasOwnProperty(this.specialNames.attachment) &&
            ![undefined, null, ''].includes(
                newDocument[this.specialNames.attachment])
        ) {
            result[this.specialNames.attachment] = {}
            let empty:boolean = true
            for (const fileName:string in newDocument[
                this.specialNames.attachment
            ])
                if (newDocument[this.specialNames.attachment].hasOwnProperty(
                    fileName
                )) {
                    let oldAttachment:?PlainObject
                    if (oldDocument && oldDocument.hasOwnProperty(
                        this.specialNames.attachment
                    ))
                        for (const type:string in oldDocument[
                            this.specialNames.attachment
                        ])
                            if (
                                oldDocument[this.specialNames.attachment][
                                    type
                                ] && [
                                    fileName,
                                    newDocument[this.specialNames.attachment][
                                        fileName
                                    ].initialName
                                ].includes(
                                    oldDocument[this.specialNames.attachment][
                                        type
                                    ].name)
                            )
                                oldAttachment = oldDocument[
                                    this.specialNames.attachment
                                ][type]
                    if (
                        (
                            newDocument[this.specialNames.attachment][
                                fileName
                            ].hasOwnProperty('data') &&
                            newDocument[this.specialNames.attachment][
                                fileName
                            ].data ||
                            newDocument[this.specialNames.attachment][
                                fileName
                            ].hasOwnProperty('stub') &&
                            newDocument[this.specialNames.attachment][
                                fileName].stub &&
                            oldAttachment
                        ) &&
                        !(
                            oldAttachment &&
                            oldAttachment.name === fileName &&
                            // TODO use digest to compare!
                            newDocument[this.specialNames.attachment][
                                fileName
                            ].length === oldAttachment.length &&
                            (
                                oldAttachment.content_type ||
                                'application/octet-stream'
                            ) === (
                                    newDocument[this.specialNames.attachment][
                                        fileName
                                    ].content_type ||
                                    'application/octet-stream'
                                )
                        )
                    ) {
                        if (
                            newDocument[this.specialNames.attachment][
                                fileName
                            ].hasOwnProperty('data') &&
                            newDocument[this.specialNames.attachment][
                                fileName].data
                        )
                            result[this.specialNames.attachment][fileName] = {
                                /* eslint-disable camelcase */
                                content_type: newDocument[
                                    this.specialNames.attachment
                                ][fileName].content_type ||
                                /* eslint-enable camelcase */
                                'application/octet-stream',
                                data: newDocument[
                                    this.specialNames.attachment
                                ][fileName].data
                            }
                        else {
                            result[this.specialNames.attachment][fileName] =
                                this.tools.copyLimitedRecursively(
                                    oldAttachment)
                            result[this.specialNames.attachment][
                                fileName
                            ].name = fileName
                        }
                        empty = false
                    } else
                        untouchedAttachments.push(fileName)
                }
            if (empty)
                delete result[this.specialNames.attachment]
        }
        let payloadExists:boolean = false
        if (oldDocument) {
            // Handle attachment removes or replacements.
            if (
                oldDocument.hasOwnProperty(this.specialNames.attachment) &&
                oldDocument[this.specialNames.attachment]
            ) {
                this._handleAttachmentChanges(result, oldDocument[
                    this.specialNames.attachment
                ], fileTypeReplacement, untouchedAttachments)
                if (this.specialNames.attachment in result)
                    payloadExists = true
            } else if (this.specialNames.attachment in result)
                payloadExists = true
            if (this.removeAlreadyExistingData(
                result, this.removeMetaData(oldDocument, specification),
                specification
            ).payloadExists)
                payloadExists = true
        }
        // Check if real payload exists in currently determined raw data.
        if (!payloadExists)
            /*
                NOTE: We have to check first level only since all unneeded
                nested values should have been already removed.
            */
            for (const name:string in result)
                if (
                    result.hasOwnProperty(name) &&
                    !this.modelConfiguration.property.name.reserved.concat(
                        this.specialNames.deleted,
                        this.specialNames.id,
                        this.specialNames.revision,
                        this.specialNames.type
                    ).includes(name)
                ) {
                    payloadExists = true
                    break
                }
        return payloadExists ? result : null
    }
    /**
     * Implements attachment changes or removes.
     * @param newDocument - Document to slice meta data from.
     * @param oldAttachments - Old document to take into account.
     * @param fileTypeReplacement - Indicates whether file type replacements
     * and removes should be taken into account.
     * @param untouchedAttachments - List of file names which doesn't exist in
     * given new document.
     * @returns The sliced attachment version of given document.
     */
    _handleAttachmentChanges(
        newDocument:PlainObject, oldAttachments:PlainObject,
        fileTypeReplacement:boolean, untouchedAttachments:Array<string>
    ):PlainObject {
        for (const type:string in oldAttachments)
            if (
                oldAttachments.hasOwnProperty(type) &&
                ![undefined, null].includes(oldAttachments[type])
            ) {
                if (newDocument[this.specialNames.attachment]) {
                    if (newDocument[
                        this.specialNames.attachment
                    ].hasOwnProperty(oldAttachments[type].name))
                        continue
                } else if (!untouchedAttachments.includes(
                    oldAttachments[type].name
                )) {
                    newDocument[this.specialNames.attachment] = {
                        [oldAttachments[type].name]: {data: null}}
                    continue
                }
                if (fileTypeReplacement)
                    for (const fileName:string in newDocument[
                        this.specialNames.attachment
                    ])
                        if (
                            newDocument[
                                this.specialNames.attachment
                            ].hasOwnProperty(fileName) &&
                            (new RegExp(type)).test(fileName)
                        )
                            newDocument[this.specialNames.attachment][
                                oldAttachments[type].name
                            ] = {data: null}
            }
        return newDocument
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericIsDefined'})
/**
 * Checks if given reference is defined.
 */
export class IsDefinedPipe/* implements PipeTransform*/ {
    /**
     * Performs the actual comparison.
     * @param object - Object to compare against "undefined" or "null".
     * @param nullIsUndefined - Indicates whether "null" should be handles as
     * "undefined".
     * @returns The comparison result.
     */
    transform(object:any, nullIsUndefined:boolean = false):boolean {
        return !(object === undefined || nullIsUndefined && object === null)
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericLimitTo'})
/**
 * Retrieves a matching filename by given filename prefix.
 */
export class LimitToPipe/* implements PipeTransform*/ {
    /**
     * Limits number of items of given string, Object (keys) or Array.
     * @param input - Object to retrieve key names from.
     * @param limit - Number of needed items.
     * @param begin - Starting point to slice from.
     * @returns Copy of given sliced object.
     */
    transform(input:any, limit:any, begin:any):any {
        limit = Math.abs(Number(limit)) === Infinity ? Number(
            limit
        ) : parseInt(limit)
        if (isNaN(limit))
            return input
        if (typeof input === 'number')
            input = input.toString()
        else if (typeof input === 'object' && input !== null && !Array.isArray(
            input
        ))
            input = Object.keys(input).sort()
        if (!(Array.isArray(input) || typeof input === 'string'))
            return input
        begin = !begin || isNaN(begin) ? 0 : parseInt(begin)
        if (begin < 0)
            begin = Math.max(0, input.length + begin)
        if (limit >= 0)
            return input.slice(begin, begin + limit)
        else if (begin === 0)
            return input.slice(limit, input.length)
        return input.slice(Math.max(0, begin + limit), begin)
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericMap'})
/**
 * Returns a copy of given object where each item was processed through given
 * function.
 * @property injector - Pipe specific injector to determine pipe dynamically at
 * runtime.
 */
export class MapPipe/* implements PipeTransform*/ {
    injector:Injector
    /**
     * Injects the injector and saves as instance property.
     * @param injector - Pipe injector service instance.
     * @returns Nothing.
     */
    constructor(injector:Injector):void {
        this.injector = injector
    }
    /**
     * Performs the actual transformation.
     * @param object - Iterable item where given pipe should be applied to each
     * value.
     * @param pipeName - Pipe to apply to each value.
     * @param additionalArguments - All additional arguments will be forwarded
     * to given pipe (after the actual value).
     * @returns Given transform copied object.
     */
    transform(
        object:any, pipeName:string, ...additionalArguments:Array<any>
    ):any {
        const pipe:Object = this.injector.get(pipeName)
        if (Array.isArray(object)) {
            const result:Array<any> = []
            for (const item:any of object)
                result.push(pipe.transform(item, ...additionalArguments))
            return result
        }
        const result:Object = {}
        for (const key:string in object)
            if (object.hasOwnProperty(key))
                result[key] = pipe.transform.transform(
                    object[key], key, ...additionalArguments)
        return result
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericObjectKeys'})
/**
 * Retrieves a matching filename by given filename prefix.
 */
export class ObjectKeysPipe/* implements PipeTransform*/ {
    /**
     * Performs the "Object" native "keys()" method.
     * @param object - Object to retrieve key names from.
     * @param sort - Indicates whether sorting should be enabled. If an array
     * is provided it will be interpreted as arguments given to the array's
     * sort method.
     * @param reverse - Reverses sorted list.
     * @param asNumber - Sort number aware.
     * @returns Arrays of key names.
     */
    transform(
        object:?Object, sort:any = false, reverse:boolean = false,
        asNumber:boolean = false
    ):Array<string> {
        if (typeof object === 'object' && object !== null) {
            const result:Array<string> = Object.keys(object)
            if (sort) {
                if (!Array.isArray(sort))
                    sort = asNumber ? [(first:any, second:any):number => {
                        first = parseInt(first)
                        second = parseInt(second)
                        if (isNaN(first))
                            return isNaN(second) ? 0 : +1
                        else if (isNaN(second))
                            return -1
                        return first - second
                    }] : []
                result.sort(...sort)
                if (reverse)
                    result.reverse()
                return result
            }
            return result
        }
        return []
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericReverse'})
/**
 * Reverses a given list.
 */
export class ReversePipe/* implements PipeTransform*/ {
    /**
     * Performs the "Arrays" native "reverse()" method.
     * @param list - List to reverse.
     * @param copy - Indicates whether a reversed copy should be created or
     * reversion can be done in place.
     * @returns Reverted arrays.
     */
    transform(list:?Array<any>, copy:boolean = false):Array<any> {
        if (list) {
            if (copy)
                list = list.slice()
        } else
            list = []
        if ('reverse' in list)
            list.reverse()
        return list
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericType'})
/**
 * Determines type of given object.
 */
export class TypePipe/* implements PipeTransform*/ {
    /**
     * Returns type of given object.
     * @param object - Object to determine type of.
     * @returns Type name.
     */
    transform(object:any):string {
        return typeof object
    }
}
// / endregion
// region string
// IgnoreTypeCheck
@Pipe({name: 'genericStringEndsWith'})
/**
 * Forwards javaScript's native "stringEndsWith" method.
 */
export class StringEndsWithPipe/* implements PipeTransform*/ {
    /**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param needle - Suffix to search for.
     * @returns The boolean result.
     */
    transform(string:?string, needle:?string):boolean {
        return typeof string === 'string' && typeof needle === 'string' &&
            string.endsWith(needle)
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericStringHasTimeSuffix'})
/**
 * Determines if given string has a time indicating suffix.
 */
export class StringHasTimeSuffixPipe/* implements PipeTransform*/ {
    /**
     * Performs the actual string suffix check.
     * @param string - To search in.
     * @returns The boolean result.
     */
    transform(string:?string):boolean {
        if (typeof string !== 'string')
            return false
        return string.endsWith('Date') || string.endsWith(
            'Time'
        ) || string === 'timestamp'
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericStringMatch'})
/**
 * Tests if given pattern matches against given subject.
 */
export class StringMatchPipe/* implements PipeTransform*/ {
    /**
     * Performs the actual matching.
     * @param pattern - String or regular expression to search for.
     * @param subject - String to search in.
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns Boolean test result.
     */
    transform(pattern:string, subject:string, modifier:string = ''):boolean {
        // IgnoreTypeCheck
        return (new RegExp(pattern, modifier)).test(subject)
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericStringMaximumLength'})
/**
 * Trims given string if it is longer then given length.
 */
export class StringMaximumLengthPipe/* implements PipeTransform*/ {
    /**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param maximumLength - Maximum number of symbols in given string.
     * @param suffix - Suffix to append if given string has to bee trimmed.
     * @returns The potentially trimmed given string.
     */
    transform(
        string:?string, maximumLength:number = 100, suffix:string = '...'
    ):string {
        if (string) {
            if (
                string.length > maximumLength &&
                string.length - 1 > suffix.length
            )
                string = string.substring(0, Math.max(
                    1, maximumLength - suffix.length
                )) + suffix
            return string
        }
        return ''
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericStringReplace'})
/**
 * Provides javascript's native string replacement method as pipe.
 */
export class StringReplacePipe/* implements PipeTransform*/ {
    /**
     * Performs the actual replacement.
     * @param string - String to replace content.
     * @param search - String or regular expression to us as matcher.
     * @param replacement - String to replace with matching parts in given
     * "string".
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns A new string with replacements done.
     */
    transform(
        string:string, search:string|RegExp, replacement:string = '',
        modifier:string = 'g'
    ):string {
        // IgnoreTypeCheck
        return string.replace(new RegExp(search, modifier), replacement)
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericStringShowIfPatternMatches'})
/**
 * Returns given string if it matches given pattern.
 */
export class StringShowIfPatternMatchesPipe/* implements PipeTransform*/ {
    /**
     * Performs the actual matching.
     * @param string - String to replace content.
     * @param pattern - String or regular expression to us as matcher.
     * @param invert - Indicates whether given string should be shown if given
     * pattern matches or not.
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns Given string if matching indicator was successful.
     */
    transform(
        string:string, pattern:string|RegExp, invert:boolean = false,
        modifier:string = ''
    ):string {
        // IgnoreTypeCheck
        let indicator:boolean = new RegExp(pattern, modifier).test(string)
        if (invert)
            indicator = !indicator
        return indicator ? string : ''
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericStringSliceMatch'})
/**
 * Returns a matched part of given subject with given pattern. Default is the
 * whole (zero) matched part.
 */
export class StringSliceMatchPipe/* implements PipeTransform*/ {
    /**
     * Performs the actual matching.
     * @param subject - String to search in.
     * @param pattern - String or regular expression to search for.
     * @param index - Match group to extract.
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns Matching group.
     */
    transform(
        subject:?string, pattern:string, index:number = 0, modifier:string = ''
    ):string {
        if (typeof subject === 'string') {
            const match:?Array<string> = subject.match(new RegExp(
                // IgnoreTypeCheck
                pattern, modifier))
            if (match && typeof match[index] === 'string')
                return match[index]
        }
        return ''
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericStringStartsWith'})
/**
 * Forwards javascript's native "stringStartsWith" method.
 */
export class StringStartsWithPipe/* implements PipeTransform*/ {
    /**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param needle - Prefix to search for.
     * @returns The boolean result.
     */
    transform(string:?string, needle:?string):boolean {
        return typeof string === 'string' && typeof needle === 'string' &&
            string.startsWith(needle)
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericStringTemplate'})
/**
 * Provides angular's template engine as pipe.
 */
export class StringTemplatePipe/* implements PipeTransform*/ {
    /**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param scope - Scope to render given string again.
     * @returns The rendered result.
     */
    transform(string:string = '', scope:PlainObject = {}):string {
        return new Function(Object.keys(scope), `return \`${string}\``)(
            ...Object.values(scope))
    }
}
// / endregion
// / region number
// IgnoreTypeCheck
@Pipe({name: 'genericNumberPercent'})
/**
 * Returns part in percent of all.
 */
export class NumberPercentPipe/* implements PipeTransform*/ {
    /**
     * Performs the actual calculation.
     * @param part - Part to divide "all" through.
     * @param all - Reference value to calculate part of.
     * @returns The calculated part.
     */
    transform(part:number, all:number):number {
        return (part / all) * 100
    }
}
// / endregion
// endregion
// region animations
/*
 * Fade in/out animation factory.
 * @param options - Animations meta data options.
 * @returns Animations meta data object.
 */
export const fadeAnimation:Function = (options:PlainObject = {
}):AnimationTriggerMetadata => {
    options = Tools.extendObject({
        duration: '.3s',
        enterState: ':enter',
        leaveState: ':leave',
        name: 'fadeAnimation'
    }, options)
    return trigger(options.name, [
        transition(options.enterState, [
            style({opacity: 0}), animate(options.duration, style({opacity: 1}))
        ]),
        transition(options.leaveState, [
            style({opacity: 1}), animate(options.duration, style({opacity: 0}))
        ])
    ])
}
/*
 * Fade in/out animation factory.
 * @param options - Animations meta data options.
 * @returns Animations meta data object.
 */
export const defaultAnimation:Function = (options:PlainObject = {
}):AnimationTriggerMetadata => fadeAnimation(Tools.extendObject(
    {name: 'defaultAnimation'}, options))
// endregion
// region services
// IgnoreTypeCheck
@Injectable()
/**
 * A generic guard which prevents from switching to route if its component's
 * "canDeactivate()" method returns "false", a promise or observable wrapping
 * a boolean.
 */
export class CanDeactivateRouteLeaveGuard/* implements CanDeactivate<Object>*/ {
    /**
     * Calls the component specific "canDeactivate()" method.
     * @param component - Component instance of currently selected route.
     * @returns A boolean, promise or observable which wraps the indicator.
     */
    canDeactivate(
        component:Object
    ):Observable<boolean>|Promise<boolean>|boolean {
        return 'canDeactivate' in component ? component.canDeactivate() : true
    }
}
// / region confirm
// IgnoreTypeCheck
@Component({
    animations: [defaultAnimation()],
    selector: 'generic-confirm',
    template: `
        <h2 @defaultAnimation md-dialog-title *ngIf="title">{{title}}</h2>
        <md-dialog-content @defaultAnimation *ngIf="message">
            {{message}}
        </md-dialog-content>
        <md-dialog-actions>
            <button (click)="dialogReference.close(true)" md-raised-button>
                {{okText}}
            </button>
            <button (click)="dialogReference.close(false)" md-raised-button>
                {{cancelText}}
            </button>
        </md-dialog-actions>
    `
})
/**
 * Provides a generic confirmation component.
 * @property cancelText - Text to use as cancel button label.
 * @property dialogReference - Reference to the dialog component instance.
 * @property okText - Text to use as confirm button label.
 */
export class ConfirmComponent {
    @Input() cancelText:string = 'Cancel'
    dialogReference:?MdDialogRef<ConfirmComponent> = null
    @Input() okText:string = 'OK'
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
        /* eslint-disable indent */
        @Optional() @Inject(MD_DIALOG_DATA) data:any,
        @Optional() dialogReference:MdDialogRef<ConfirmComponent>
        /* eslint-enable indent */
    ):void {
        this.dialogReference = dialogReference
        if (typeof data === 'object' && data !== null)
            for (const key:string in data)
                if (data.hasOwnProperty(key))
                    this[key] = data[key]
    }
}
// IgnoreTypeCheck
@Injectable()
/**
 * Alert service to trigger a dialog window which can be confirmed.
 * @property dialog - Reference to the dialog component instance.
 * @property dialogReference - Reference to the dialog service instance.
 */
export class AlertService {
    dialog:MdDialog
    dialogReference:MdDialogRef<any>
    /**
     * Gets needed component dialog service instance injected.
     * @param dialog - Reference to the dialog component instance.
     * @returns Nothing.
     */
    constructor(dialog:MdDialog):void {
        this.dialog = dialog
    }
    /**
     * Triggers a confirmation dialog to show.
     * @param data - Data to provide for the confirmations component instance.
     * @returns A promise resolving when confirmation window where confirmed or
     * rejected due to user interaction. A promised wrapped boolean indicates
     * which decision was made.
     */
    confirm(data:string|{[key:string]:any}):Promise<boolean> {
        if (typeof data === 'string')
            data = {data: {message: data}}
        else if (
            typeof data !== 'object' || data === null || !data.hasOwnProperty(
                'data')
        )
            data = {data}
        this.dialogReference = this.dialog.open(ConfirmComponent, data)
        return this.dialogReference.afterClosed().toPromise()
    }
}
// / endregion
// IgnoreTypeCheck
@Injectable()
/**
 * A generic database connector.
 * @property static:revisionNumberRegularExpression - Compiled regular
 * expression to retrieve revision number from revision hash.
 * @property static:wrappableMethodNames - Saves a list of method names which
 * can be intercepted.
 *
 * @property connection - The current database connection instance.
 * @property database - The entire database constructor.
 * @property equals - Hilds the equals pipe transformation method.
 * @property extendObject - Holds the extend object's pipe transformation
 * method.
 * @property interceptSynchronisationPromise - Promise which have to be
 * resolved before synchronisation for local database starts.
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
 */
export class DataService {
    static revisionNumberRegularExpression:RegExp = /^([0-9]+)-/
    static wrappableMethodNames:Array<string> = [
        'allDocs', 'bulkDocs', 'bulkGet',
        'close',
        'compact', 'compactDocument',
        'createIndex', 'deleteIndexs',
        'destroy',
        'find', 'get',
        'getAttachment', 'getIndexes',
        'info',
        'post', 'put', 'putAttachment',
        'query',
        'remove', 'removeAttachment'
    ]
    connection:PouchDB
    configuration:PlainObject
    database:typeof PouchDB
    equals:Function
    extendObject:Function
    interceptSynchronisationPromise:?Promise<any> = null
    middlewares:{
        pre:{[key:string]:Array<Function>};
        post:{[key:string]:Array<Function>};
    } = {
        post: {},
        pre: {}
    }
    platformID:string
    remoteConnection:?PouchDB = null
    runningRequests:Array<PlainObject> = []
    runningRequestsStream:Subject<Array<PlainObject>> = new Subject()
    stringFormat:Function
    synchronisation:?Object
    tools:Tools
    /**
     * Creates the database constructor applies all plugins instantiates
     * the connection instance and registers all middlewares.
     * @param equalsPipe - Equals pipe service instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param platformID - Platform identification string.
     * @param stringFormatPipe - Injected string format pipe instance.
     * @param tools - Injected tools service instance.
     * @returns Nothing.
     */
    constructor(
        equalsPipe:EqualsPipe, extendObjectPipe:ExtendObjectPipe,
        initialData:InitialDataService, @Inject(PLATFORM_ID) platformID:string,
        stringFormatPipe:StringFormatPipe, tools:ToolsService
    ):void {
        this.configuration = initialData.configuration
        if (this.configuration.database.hasOwnProperty('publicURL'))
            this.configuration.database.url =
                this.configuration.database.publicURL
        this.database = PouchDB
        this.equals = equalsPipe.transform.bind(equalsPipe)
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
        this.platformID = platformID
        this.stringFormat = stringFormatPipe.transform.bind(stringFormatPipe)
        this.tools = tools.tools
        const idName:string =
            this.configuration.database.model.property.name.special.id
        const revisionName:string =
            this.configuration.database.model.property.name.special.revision
        const nativeBulkDocs:Function = this.database.prototype.bulkDocs
        const self:DataService = this
        this.database.plugin({bulkDocs: async function(
            firstParameter:any, ...parameter:Array<any>
        ):Promise<Array<PlainObject>> {
            /*
                Implements a generic retry mechanism for "upsert" and "latest"
                updates and optionally supports to ignore "NoChange" errors.
            */
            if (
                !Array.isArray(firstParameter) &&
                typeof firstParameter === 'object' &&
                firstParameter !== null &&
                firstParameter.hasOwnProperty(idName)
            )
                firstParameter = [firstParameter]
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
                    for (const item:PlainObject of firstParameter)
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
                    try {
                        result = await nativeBulkDocs.call(
                            this, firstParameter, ...parameter)
                    } catch (error) {
                        throw error
                    }
                } else
                    throw error
            }
            const conflictingIndexes:Array<number> = []
            const conflicts:Array<PlainObject> = []
            let index:number = 0
            for (const item:PlainObject of result) {
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
                        try {
                            result[index].rev =
                                revisionName in firstParameter[index] &&
                                !['latest', 'upsert'].includes(
                                    firstParameter[index][revisionName]
                                ) ? firstParameter[index][revisionName] : (
                                    await this.get(result[index].id)
                                )[revisionName]
                        } catch (error) {
                            throw error
                        }
                    }
                index += 1
            }
            if (conflicts.length) {
                firstParameter = conflicts
                const retriedResults:Array<PlainObject> = await this.bulkDocs(
                    firstParameter, ...parameter)
                for (const retriedResult:PlainObject of retriedResults)
                    result[conflictingIndexes.shift()] = retriedResult
            }
            return result
        }})
        this.database
            .plugin(PouchDBFindPlugin)
            .plugin(PouchDBValidationPlugin)
        for (const plugin:Object of this.configuration.database.plugins)
            this.database.plugin(plugin)
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
            model[name].index || !(
                modelConfiguration.property.name.reserved.concat(
                    specialNames.additional,
                    specialNames.allowedRole,
                    specialNames.attachment,
                    specialNames.conflict,
                    specialNames.constraint.execution,
                    specialNames.constraint.expression,
                    specialNames.deleted,
                    specialNames.deleted_conflict,
                    specialNames.extend,
                    specialNames.id,
                    specialNames.maximumAggregatedSize,
                    specialNames.minimumAggregatedSize,
                    specialNames.revision,
                    specialNames.revisions,
                    specialNames.revisionsInformation,
                    specialNames.type
                ).includes(name) || model[name].type && (
                    typeof model[name].type === 'string' &&
                    model[name].type.endsWith('[]') ||
                    Array.isArray(model[name].type) &&
                    model[name].type.length &&
                    Array.isArray(model[name].type[0]) ||
                    modelConfiguration.entities.hasOwnProperty(
                        model[name].type))
            )).concat(specialNames.id, specialNames.revision)
    }
    /**
     * Initializes database connection and synchronisation if needed.
     * @returns A promise resolving when initialisation has finished.
     */
    async initialize():Promise<void> {
        const options:PlainObject = this.extendObject(
            /* eslint-disable camelcase */
            true, {skip_setup: true},
            /* eslint-enable camelcase */
            this.configuration.database.connector || {})
        const databaseName:string = this.configuration.name || 'generic'
        if (!isPlatformServer(this.platformID))
            this.remoteConnection = new this.database(this.stringFormat(
                this.configuration.database.url, ''
            ) + `/${databaseName}`, options)
        if (this.configuration.database.local || isPlatformServer(
            this.platformID
        ))
            this.connection = new this.database(databaseName, options)
        else
            this.connection = this.remoteConnection
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
        for (const pluginName:string of ['post', 'put']) {
            const nativeMethod:Function = this.connection[pluginName].bind(
                this.connection)
            this.connection[pluginName] = async function(
                firstParameter:any, ...parameter:Array<any>
            ):Promise<any> {
                try {
                    return await nativeMethod(firstParameter, ...parameter)
                } catch (error) {
                    if (
                        idName in firstParameter &&
                        configuration.database.ignoreNoChangeError &&
                        'name' in error &&
                        error.name === 'forbidden' &&
                        'message' in error &&
                        error.message.startsWith('NoChange:')
                    ) {
                        const result:PlainObject = {
                            id: firstParameter[idName],
                            ok: true
                        }
                        try {
                            result.rev =
                                revisionName in firstParameter &&
                                !['latest', 'upsert'].includes(
                                    firstParameter[revisionName]
                                ) ? firstParameter[revisionName] : (
                                    await this.get(result.id)
                                )[revisionName]
                        } catch (error) {
                            throw error
                        }
                        return result
                    }
                    throw error
                }
            }
        }
        // endregion
        for (const name:string in this.connection)
            if (
                this.constructor.wrappableMethodNames.includes(name) &&
                typeof this.connection[name] === 'function'
            ) {
                const method:Function = this.connection[name]
                this.connection[name] = async (
                    ...parameter:Array<any>
                ):Promise<any> => {
                    const request:{
                        parameter:Array<any>;
                        wrappedParameter:?Array<any>;
                    } = {name, parameter}
                    this.runningRequests.push(request)
                    this.runningRequestsStream.next(this.runningRequests)
                    const clear:Function = ():void => {
                        const index:number = this.runningRequests.indexOf(
                            request)
                        if (index !== -1)
                            this.runningRequests.splice(index, 1)
                        this.runningRequestsStream.next(this.runningRequests)
                    }
                    for (const methodName:string of [name, '_all'])
                        if (this.middlewares.pre.hasOwnProperty(methodName))
                            for (
                                const interceptor:Function of
                                this.middlewares.pre[methodName]
                            ) {
                                parameter = interceptor.apply(
                                    this.connection, parameter.concat(
                                        methodName === '_all' ? name : []))
                                if ('then' in parameter)
                                    try {
                                        parameter = await parameter
                                    } catch (error) {
                                        clear()
                                        throw error
                                    }
                            }
                    request.wrappedParameter = parameter
                    const action:Function = (
                        context:any=this.connection,
                        givenParameter:Array<any>=parameter
                    ):any => method.apply(context, givenParameter)
                    let result:any = action()
                    for (const methodName:string of [name, '_all'])
                        if (this.middlewares.post.hasOwnProperty(methodName))
                            for (
                                const interceptor:Function of
                                this.middlewares.post[methodName]
                            ) {
                                result = interceptor.call(
                                    this.connection, result, action,
                                    ...parameter.concat(
                                        methodName === '_all' ? name : []))
                                if ('then' in result)
                                    try {
                                        result = await result
                                    } catch (error) {
                                        clear()
                                        throw error
                                    }
                            }
                    if ('then' in result)
                        try {
                            result = await result
                        } catch (error) {
                            clear()
                            throw error
                        }
                    clear()
                    return result
                }
            }
        this.connection.installValidationMethods()
        if (this.configuration.database.local && this.remoteConnection)
            /*
                NOTE: We want to allow other services to integrate an
                interception promise.
            */
            // IgnoreTypeCheck
            this.tools.timeout(async ():Promise<void> => {
                if (this.interceptSynchronisationPromise)
                    await this.interceptSynchronisationPromise
                this.startSynchronisation()
            })
        if (
            isPlatformServer(this.platformID) &&
            this.configuration.database.createGenericFlatIndex
        ) {
            // region create/remove needed/unneeded generic indexes
            for (
                const modelName:string in
                this.configuration.database.model.entities
            )
                if (
                    this.configuration.database.model.entities.hasOwnProperty(
                        modelName
                    ) && (
                        new RegExp(
                            this.configuration.database.model.property.name
                                .typeRegularExpressionPattern.public)
                    ).test(modelName)
                )
                    for (
                        const name:string of
                        DataService.determineGenericIndexablePropertyNames(
                            this.configuration.database.model,
                            this.configuration.database.model.entities[
                                modelName])
                    )
                        try {
                            await this.connection.createIndex({index: {
                                ddoc: `${modelName}-${name}-GenericIndex`,
                                fields: [
                                    this.configuration.database.model
                                        .property.name.special.type,
                                    name
                                ],
                                name: `${modelName}-${name}-GenericIndex`
                            }})
                        } catch (error) {
                            throw error
                        }
            let indexes:Array<PlainObject>
            try {
                indexes = (await this.connection.getIndexes()).indexes
            } catch (error) {
                throw error
            }
            for (const index:PlainObject of indexes)
                if (index.name.endsWith('-GenericIndex')) {
                    let exists:boolean = false
                    for (
                        const modelName:string in
                        this.configuration.database.model.entities
                    )
                        if (index.name.startsWith(`${modelName}-`)) {
                            for (const name:string of DataService
                                .determineGenericIndexablePropertyNames(
                                    this.configuration.database.model,
                                    this.configuration.database.model.entities[
                                        modelName])
                            )
                                if (index.name ===
                                    `${modelName}-${name}-GenericIndex`
                                )
                                    exists = true
                            break
                        }
                    if (!exists)
                        try {
                            await this.connection.deleteIndex(index)
                        } catch (error) {
                            throw error
                        }
                }
        }
        // endregion
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
        return (await this.connection.find(this.extendObject(true, {
            selector
        }, options))).docs
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
            parseInt(result[revisionName].match(
                this.constructor.revisionNumberRegularExpression
            )[1]) < parseInt(
                    LAST_KNOWN_DATA.data[result[idName]][revisionName].match(
                        this.constructor.revisionNumberRegularExpression
                    )[1])
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
        for (const name:string of names) {
            if (!this.middlewares[type].hasOwnProperty(name))
                this.middlewares[type][name] = []
            this.middlewares[type][name].push(callback)
        }
        return ():void => {
            for (const name:string of names) {
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
     * Starts synchronisation between a local and remote database.
     * @returns Nothing.
     */
    startSynchronisation():Object {
        return this.synchronisation = this.connection.sync(
            this.remoteConnection, {live: true, retry: true}
        )
            .on('change', (info:Object):void => console.info('change', info))
            .on('paused', ():void => console.info('paused'))
            .on('active', ():void => console.info('active'))
            .on('denied', (error:Object):void => console.warn('denied', error))
            .on('complete', (info:Object):void =>
                console.info('complete', info))
            .on('error', (error:Object):void => console.error('error', error))
    }
}
// IgnoreTypeCheck
@Injectable()
/**
 * Auto generates a components scope environment for a specified model.
 * @property attachmentWithPrefixExists - Hold the attachment with prefix
 * exists pipe transformation method.
 * @property configuration - Holds the configuration service instance.
 * @property data - Holds the data exchange service instance.
 * @property extendObject - Holds the extend object's pipe transformation
 * method.
 * @property extractData - Holds the xtract object's pipe transformation
 * method.
 * @property getFilenameByPrefix - Holds the get file name by prefix's pipe
 * transformation method.
 * @property numberGetUTCTimestamp - Holds a date (and time) to unix timestamp
 * converter pipe transform method.
 * @property representObject - Represent object pipe's method.
 * @property tools - Holds the tools class from the tools service.
 */
export class DataScopeService {
    attachmentWithPrefixExists:Function
    configuration:PlainObject
    data:DataService
    extendObject:Function
    extractData:Function
    getFilenameByPrefix:Function
    numberGetUTCTimestamp:Function
    representObject:Function
    tools:typeof Tools
    /**
     * Saves alle needed services as property values.
     * @param attachmentWithPrefixExistsPipe - Attachment by prefix checker
     * pipe instance.
     * @param data - Injected data service instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param extractDataPipe - Injected extract data pipe instance.
     * @param getFilenameByPrefixPipe - Saves the file name by prefix retriever
     * pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param numberGetUTCTimestampPipe - Date (and time) to unix timestamp
     * converter pipe instance.
     * @param representObjectPipe - Represent object pipe instance.
     * @param tools - Injected tools service instance.
     * @returns Nothing.
     */
    constructor(
        attachmentWithPrefixExistsPipe:AttachmentWithPrefixExistsPipe,
        data:DataService, extendObjectPipe:ExtendObjectPipe,
        extractDataPipe:ExtractDataPipe,
        getFilenameByPrefixPipe:GetFilenameByPrefixPipe,
        initialData:InitialDataService,
        numberGetUTCTimestampPipe:NumberGetUTCTimestampPipe,
        representObjectPipe:RepresentObjectPipe,
        tools:ToolsService
    ):void {
        this.attachmentWithPrefixExists =
            attachmentWithPrefixExistsPipe.transform.bind(
                attachmentWithPrefixExistsPipe)
        this.configuration = initialData.configuration
        this.data = data
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
        this.extractData = extractDataPipe.transform.bind(extractDataPipe)
        this.getFilenameByPrefix = getFilenameByPrefixPipe.transform.bind(
            getFilenameByPrefixPipe)
        this.numberGetUTCTimestamp = numberGetUTCTimestampPipe.transform.bind(
            numberGetUTCTimestampPipe)
        this.representObject = representObjectPipe.transform.bind(
            representObjectPipe)
        this.tools = tools.tools
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
        modelName:string, id:?string = null,
        propertyNames:?Array<string> = null, revision:string = 'latest',
        revisionHistory:boolean = false
    ):Promise<PlainObject> {
        let data:PlainObject = {}
        if (id) {
            const options:PlainObject = {}
            if (revision === 'latest') {
                options.latest = true
                if (revisionHistory)
                    /* eslint-disable camelcase */
                    options.revs_info = true
                    /* eslint-enable camelcase */
            } else
                options.rev = revision
            try {
                data = await this.data.get(id, options)
            } catch (error) {
                throw new Error(
                    `Document with given id "${id}" and revision "` +
                    `${revision}" isn't available: ` + ((
                        'message' in error
                    ) ? error.message : this.representObject(error)))
            }
            if (revisionHistory) {
                const revisionsInformationName:string =
                    this.configuration.database.model.property.name.special
                        .revisionsInformation
                let revisions:Array<PlainObject>
                let latestData:?PlainObject
                if (revision !== 'latest') {
                    delete options.rev
                    /* eslint-disable camelcase */
                    options.revs_info = true
                    /* eslint-enable camelcase */
                    try {
                        latestData = await this.data.get(id, options)
                    } catch (error) {
                        throw new Error(
                            `Document with given id "${id}" and revision "` +
                            `${revision}" isn't available: ` + (
                                ('message' in error) ? error.message :
                                this.representObject(error)))
                    }
                    revisions = latestData[revisionsInformationName]
                    delete latestData[revisionsInformationName]
                } else
                    revisions = data[revisionsInformationName]
                data[revisionsInformationName] = {}
                let first:boolean = true
                for (const item:PlainObject of revisions)
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
        }
        return this.generate(modelName, propertyNames, data)
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
        modelSpecification:PlainObject, propertyNames:?Array<string>,
        propertyNamesToIgnore:Array<string> = []
    ):PlainObject {
        if (!propertyNames)
            propertyNames = Object.keys(modelSpecification)
        const result:PlainObject = {}
        for (const name:string of propertyNames)
            if (
                modelSpecification.hasOwnProperty(name) &&
                !propertyNamesToIgnore.includes(name)
            )
                if (
                    name === this.configuration.database.model.property.name
                        .special.attachment
                ) {
                    result[name] = {}
                    for (const fileType:string in modelSpecification[name])
                        if (modelSpecification[name].hasOwnProperty(fileType))
                            result[name][fileType] = this.extendObject(
                                true, this.tools.copyLimitedRecursively(
                                    this.configuration.database.model
                                        .property.defaultSpecification
                                ), modelSpecification[name][fileType])
                } else {
                    result[name] = this.extendObject(
                        true, this.tools.copyLimitedRecursively(
                            this.configuration.database.model.property
                                .defaultSpecification,
                        ), modelSpecification[name])
                    if (
                        this.configuration.database.model.entities
                            .hasOwnProperty(result[name].type)
                    )
                        result[name].value = this.determineSpecificationObject(
                            this.configuration.database.model.entities[
                                result[name].type])
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
     * @param propertyNamesToIgnore - Property names ti skip.
     * @returns The generated scope object.
     */
    generate(
        modelName:string, propertyNames:?Array<string>,
        data:PlainObject = {}, propertyNamesToIgnore:?Array<string>
    ):PlainObject {
        const entities:PlainObject = this.configuration.database.model.entities
        const modelSpecification:PlainObject = entities[modelName]
        const specialNames:PlainObject =
            this.configuration.database.model.property.name.special
        if (!propertyNamesToIgnore)
            propertyNamesToIgnore = modelName.startsWith('_') ? [
                specialNames.id, specialNames.attachment
            ] : []
        const reservedNames:Array<string> =
            this.configuration.database.model.property.name.reserved.concat(
                specialNames.conflict,
                specialNames.deleted,
                specialNames.deletedConflict,
                specialNames.localSequence,
                specialNames.revision,
                specialNames.revisionsInformation,
                specialNames.revisions,
                specialNames.type)
        const specification:PlainObject = this.determineSpecificationObject(
            modelSpecification, propertyNames,
            propertyNamesToIgnore.concat(reservedNames))
        if (!propertyNames) {
            propertyNames = Object.keys(specification).filter(
                (key:string):boolean => typeof specification[key] === 'object')
            propertyNames = propertyNames.concat(Object.keys(data).filter((
                name:string
            // IgnoreTypeCheck
            ):boolean => !propertyNames.concat(reservedNames).includes(name)))
        }
        const result:PlainObject = {}
        for (const name:string of propertyNames) {
            if (propertyNamesToIgnore.includes(name))
                continue
            if (specification.hasOwnProperty(name))
                result[name] = this.tools.copyLimitedRecursively(
                    specification[name])
            else
                result[name] = this.tools.copyLimitedRecursively((
                    'additional' in specialNames &&
                    specialNames.additional
                ) ? specification[specialNames.additional] : {})
            const now:Date = new Date()
            const nowUTCTimestamp:number = this.numberGetUTCTimestamp(now)
            if (name === specialNames.attachment) {
                for (const type:string in specification[name])
                    if (specification[name].hasOwnProperty(type)) {
                        result[name][type].name = type
                        result[name][type].value = null
                        if (Object.keys(data).length === 0)
                            for (const hookType:string of [
                                'onCreateExecution', 'onCreateExpression'
                            ])
                                if (result[name][type].hasOwnProperty(
                                    hookType
                                ) && result[name][type][hookType]) {
                                    result[name][type].value = (new Function(
                                        'newDocument', 'oldDocument',
                                        'userContext', 'securitySettings',
                                        'name', 'models', 'modelConfiguration',
                                        'serialize', 'modelName', 'model',
                                        'propertySpecification', 'now',
                                        'nowUTCTimestamp',
                                        'getFilenameByPrefix',
                                        'attachmentWithPrefixExists', (
                                            hookType.endsWith(
                                                'Expression'
                                            ) ? 'return ' : ''
                                        ) + result[name][type][hookType]
                                    ))(
                                        data, null, {}, {}, type,
                                        entities,
                                        this.configuration.database.model, (
                                            object:Object
                                        ):string => JSON.stringify(
                                            object, null, 4
                                        ), modelName, modelSpecification,
                                        result[name][type], now,
                                        nowUTCTimestamp,
                                        this.getFilenameByPrefix,
                                        this.attachmentWithPrefixExists.bind(
                                            data, data
                                        ), result[name][type])
                                    if (result[name][type].hasOwnProperty(
                                        'value'
                                    ) && result[name][type].value === undefined
                                    )
                                        delete result[name][type].value
                                }
                        let fileFound:boolean = false
                        if (
                            data.hasOwnProperty(name) &&
                            ![undefined, null].includes(data[name])
                        )
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
                        if (
                            !fileFound &&
                            result[name][type].hasOwnProperty('default') &&
                            ![undefined, null].includes(result[name][
                                type
                            ].default)
                        )
                            result[name][type].value =
                                this.tools.copyLimitedRecursively(
                                    {}, result[name][type].default)
                    }
            } else {
                result[name].name = name
                result[name].value = null
                if (Object.keys(data).length === 0)
                    for (const type:string of [
                        'onCreateExpression', 'onCreateExecution'
                    ])
                        if (result[name].hasOwnProperty(type) && result[name][
                            type
                        ]) {
                            result[name].value = (new Function(
                                'newDocument', 'oldDocument', 'userContext',
                                'securitySettings', 'name', 'models',
                                'modelConfiguration', 'serialize', 'modelName',
                                'model', 'propertySpecification', 'now',
                                'nowUTCTimestamp', 'getFilenameByPrefix',
                                'attachmentWithPrefixExists', (
                                    type.endsWith('Expression') ? 'return ' :
                                    ''
                                ) + result[name][type]
                            ))(
                                data, null, {}, {}, name, entities,
                                this.configuration.database.model,
                                (object:Object):string => JSON.stringify(
                                    object, null, 4
                                ), modelName, modelSpecification, result[name],
                                now, nowUTCTimestamp, this.getFilenameByPrefix,
                                this.attachmentWithPrefixExists.bind(
                                    data, data
                                ), result[name])
                            if (result[name].value === undefined)
                                result[name].value = null
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
                    result[name].value = this.tools.copyLimitedRecursively(
                        result[name].default)
                else if (
                    result[name].hasOwnProperty('selection') &&
                    Array.isArray(result[name].selection) &&
                    result[name].selection.length
                )
                    result[name].value = result[name].selection[0]
                if (
                    typeof result[name].value === 'number' &&
                    (
                        result[name].type.endsWith('Date') ||
                        result[name].type.endsWith('Time')
                    )
                )
                    // NOTE: We interpret given value as an utc timestamp.
                    result[name].value = new Date(result[name].value * 1000)
                else if (
                    typeof result[name].value === 'object' &&
                    result[name].value !== null
                )
                    if (
                        result[name].hasOwnProperty('type') &&
                        entities.hasOwnProperty(result[name].type)
                    )
                        result[name].value = this.generate(
                            result[name].type, null, result[name].value || {},
                            [specialNames.attachment, specialNames.id])
                    else if (result[name].type.endsWith('[]')) {
                        const type:string = result[name].type.substring(
                            0, result[name].type.length - 2)
                        if (
                            Array.isArray(result[name].value) &&
                            entities.hasOwnProperty(type)
                        ) {
                            let index:number = 0
                            for (const item:any of result[name].value) {
                                result[name].value[index] = this.generate(
                                    type, null, item || {},
                                    [specialNames.attachment, specialNames.id])
                                index += 1
                            }
                        }
                    }
            }
        }
        for (const name:string of reservedNames)
            if (data.hasOwnProperty(name))
                result[name] = data[name]
            else if (name === specialNames.type)
                result[name] = modelName
        result._metaData = {submitted: false}
        return result
    }
}
// / region abstract
/**
 * Helper class to extend from to have some basic methods to deal with database
 * entities.
 * @property data - Holds currently retrieved data.
 * @property escapeRegularExpressions - Holds the escape regular expressions's
 * pipe transformation method.
 * @property extendObject - Holds the extend object's pipe transformation
 * method.
 * @property modelConfiguration - Saves a mapping from all available model
 * names to their specification.
 * @property relevantKeys - Saves a list of relevant key names to take into
 * account during resolving.
 * @property specialNames - mapping of special database field names.
 * @property type - Model name to handle. Should be overwritten in concrete
 * implementations.
 */
export class AbstractResolver/* implements Resolve<PlainObject>*/ {
    data:PlainObject
    escapeRegularExpressions:Function
    extendObject:Function
    modelConfiguration:PlainObject
    relevantKeys:?Array<string> = null
    specialNames:{[key:string]:string}
    type:string = 'Item'
    /**
     * Sets all needed injected services as instance properties.
     * @param data - Injected data service instance.
     * @param escapeRegularExpressionsPipe - Injected escape regular expression
     * pipe instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param initialData - Injected initial data service instance.
     * @returns Nothing.
     */
    constructor(
        data:DataService,
        escapeRegularExpressionsPipe:StringEscapeRegularExpressionsPipe,
        extendObjectPipe:ExtendObjectPipe, initialData:InitialDataService
    ):void {
        this.data = data
        this.escapeRegularExpressions =
            escapeRegularExpressionsPipe.transform.bind(
                escapeRegularExpressionsPipe)
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
        this.modelConfiguration = initialData.configuration.database.model
        this.specialNames = initialData.configuration.database.model.property
            .name.special
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
        sort:Array<PlainObject> = [{_id: 'asc'}], page:number = 1,
        limit:number = 10, searchTerm:string = '',
        additionalSelector:PlainObject = {}
    ):Promise<Array<PlainObject>> {
        if (!this.relevantKeys) {
            this.relevantKeys =
                DataService.determineGenericIndexablePropertyNames(
                    this.modelConfiguration,
                    this.modelConfiguration.entities[this.type])
            this.relevantKeys.splice(
                this.relevantKeys.indexOf(this.specialNames.revision), 1)
        }
        const selector:PlainObject = {[this.specialNames.type]: this.type}
        if (searchTerm || Object.keys(additionalSelector).length) {
            if (sort.length)
                selector[Object.keys(sort[0])[0]] = {$gt: null}
            selector.$or = []
            for (const name:string of this.relevantKeys)
                selector.$or.push({[name]: {$regex: searchTerm}})
            if (
                additionalSelector.hasOwnProperty('$or') &&
                additionalSelector.$or.length
            ) {
                /*
                    NOTE: We have to integrate search expression into existing
                    selector.
                */
                for (const item:PlainObject of selector.$or)
                    item.$or = additionalSelector.$or
                delete additionalSelector.$or
            }
        }
        /*
            NOTE: We can't use "limit" here since we want to provide total data
            set size for pagination.
        */
        const options:PlainObject = {skip: Math.max(page - 1, 0) * limit}
        if (options.skip === 0)
            delete options.skip
        if (sort.length)
            options.sort = [{[this.specialNames.type]: 'asc'}].concat(sort)
        return this.data.find(this.extendObject(
            true, selector, additionalSelector
        ), options)
    }
    /* eslint-disable no-unused-vars */
    /**
     * Implements the resolver method which converts route informations into
     * "list()" method parameter and forward their result as result in an
     * observable.
     * @param route - Current route informations.
     * @param state - Current state informations.
     * @returns Promise with data filtered by current route informations.
     */
    resolve(
        route:ActivatedRouteSnapshot, state:RouterStateSnapshot
    ):Promise<Array<PlainObject>> {
    /* eslint-enable no-unused-vars */
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
                    name = name.substring(0, lastIndex)
                    type = name.substring(lastIndex + 1) || type
                }
                return {[name]: type}
            })
        return this.list(sort, parseInt(
            route.params.page || 1
        ), parseInt(route.params.limit || 10), searchTerm)
    }
}
// / endregion
// endregion
// region components/directives
// / region abstract
/**
 * Generic input component.
 * @property declaration - Declaration info text.
 * @property description - Description to use instead of those coming from
 * model specification.
 * @property disabled - Sets disabled state.
 * @property maximum - Maximum allowed number value.
 * @property maximumLength - Maximum allowed number of symbols.
 * @property maximumLengthText - Maximum length validation text.
 * @property maximumText - Maximum number validation text.
 * @property minimum - Minimum allowed number.
 * @property minimumLength - Minimum allowed number of symbols.
 * @property minimumLengthText - Minimum number validation text.
 * @property minimumText - Minimum number of symbols validation text.
 * @property model - Holds model informations including actual value and
 * metadata.
 * @property modelChange - Model event emitter emitting events on each model
 * change.
 * @property pattern - Allowed pattern to match against given input.
 * @property patternText - Pattern validation text.
 * @property required - Indicates whether this inputs have to be filled.
 * @property requiredText - Required validation text.
 * @property showDeclarationText - Info text to click for more informations.
 * @property showValidationErrorMessages - Indicates whether validation errors
 * should be suppressed or be shown automatically. Useful to prevent error
 * component from showing error messages before the user has submit the form.
 * @property type - Type of given input.
 *
 * @property _attachmentWithPrefixExists - Holds the attachment by prefix
 * checker pipe instance
 * @property _extendObject - Holds the extend object's pipe transformation
 * @property _getFilenameByPrefix - Holds the get file name by prefix's pipe
 * transformation method.
 * @property _modelConfiguration - All model configurations.
 * @property _numberGetUTCTimestamp - Date (and time) to unix timstamp
 * converter pipe transform method.
 */
export class AbstractInputComponent/* implements OnInit*/ {
    @Input() declaration:?string = null
    @Input() description:?string = null
    @Input() disabled:?boolean = null
    @Input() maximum:?number = null
    @Input() maximumLength:?number = null
    @Input() maximumLengthText:string =
        'Please type less or equal than ${model.maximumLength} symbols.'
    @Input() maximumText:string =
        'Please give a number less or equal than ${model.maximum}.'
    @Input() minimum:?number = null
    @Input() minimumLength:?number = null
    @Input() minimumLengthText:string =
        'Please type at least or equal ${model.minimumLength} symbols.'
    @Input() minimumText:string =
        'Please given a number at least or equal to {{model.minimum}}.'
    @Input() model:PlainObject = {}
    @Output() modelChange:EventEmitter<PlainObject> = new EventEmitter()
    @Input() pattern:string
    @Input() patternText:string =
        'Your string have to match the regular expression: "' +
        '${model.regularExpressionPattern}".'
    @Input() required:?boolean = null
    @Input() requiredText:string = 'Please fill this field.'
    @Input() showDeclarationText:string = 'ℹ'
    @Input() showValidationErrorMessages:boolean = false
    @Input() type:string

    _attachmentWithPrefixExists:Function
    _extendObject:Function
    _getFilenameByPrefix:Function
    _modelConfiguration:PlainObject
    _numberGetUTCTimestamp:Function
    /**
     * Sets needed services as property values.
     * @param attachmentWithPrefixExistsPipe - Saves the attachment by prefix
     * name checker pipe instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param getFilenameByPrefixPipe - Saves the file name by prefix retriever
     * pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param numberGetUTCTimestampPipe - Injected date (and time) to unix
     * timestamp converter pips instance.
     * @returns Nothing.
     */
    constructor(
        attachmentWithPrefixExistsPipe:AttachmentWithPrefixExistsPipe,
        extendObjectPipe:ExtendObjectPipe,
        getFilenameByPrefixPipe:GetFilenameByPrefixPipe,
        initialData:InitialDataService,
        numberGetUTCTimestampPipe:NumberGetUTCTimestampPipe
    ):void {
        this._attachmentWithPrefixExists =
            attachmentWithPrefixExistsPipe.transform.bind(
                attachmentWithPrefixExistsPipe)
        this._extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
        this._getFilenameByPrefix = getFilenameByPrefixPipe.transform.bind(
            getFilenameByPrefixPipe)
        this._modelConfiguration = initialData.configuration.database.model
        this._numberGetUTCTimestamp = numberGetUTCTimestampPipe.transform.bind(
            numberGetUTCTimestampPipe)
    }
    /**
     * Triggers after input values have been resolved.
     * @returns Nothing.
     */
    ngOnInit():void {
        this._extendObject(this.model, this._extendObject({
            disabled: false,
            maximum: Infinity,
            minimum: 0,
            maximumLength: Infinity,
            minimumLength: 0,
            nullable: true,
            regularExpressionPattern: '.*',
            state: {},
            type: 'string'
        }, this.model))
        for (const hookType:string of [
            'onUpdateExpression', 'onUpdateExecution'
        ])
            if (
                this.model.hasOwnProperty(hookType) && this.model[hookType] &&
                typeof this.model[hookType] !== 'function'
            )
                this.model[hookType] = new Function(
                    'newDocument', 'oldDocument', 'userContext',
                    'securitySettings', 'name', 'models', 'modelConfiguration',
                    'serialize', 'modelName', 'model', 'propertySpecification',
                    'now', 'nowUTCTimestamp', 'getFilenameByPrefix',
                    'attachmentWithPrefixExists', (
                        hookType.endsWith('Expression') ? 'return ' : ''
                    ) + this.model[hookType])
    }
    /**
     * Triggers when ever a change to current model happens inside this
     * component.
     * @param newValue - Value to use to update model with.
     * @param state - Saves the current model state.
     * @returns Nothing.
     */
    onChange(newValue:any, state:Object):any {
        if (this.model.type === 'integer')
            newValue = parseInt(newValue)
        else if (this.model.type === 'number')
            newValue = parseFloat(newValue)
        else if (newValue && this.model.type === 'string' && this.model.trim)
            newValue = newValue.trim()
        const now:Date = new Date()
        const nowUTCTimestamp:number = this._numberGetUTCTimestamp(now)
        const newData:PlainObject = {[this.model.name]: newValue}
        for (const hookType:string of [
            'onUpdateExpression', 'onUpdateExecution'
        ])
            if (
                this.model.hasOwnProperty(hookType) && this.model[hookType] &&
                typeof this.model[hookType] === 'function'
            ) {
                newValue = this.model[hookType](
                    newData, null, {}, {}, this.model.name,
                    this._modelConfiguration.entities,
                    this._modelConfiguration, (object:Object):string =>
                        JSON.stringify(object, null, 4),
                    'generic', {generic: {[this.model.name]: this.model}},
                    this.model, now, nowUTCTimestamp,
                    this._getFilenameByPrefix,
                    this._attachmentWithPrefixExists.bind(newData, newData),
                    newValue)
                if (!(newValue instanceof Date) && (
                    this.model.type.endsWith('Date') ||
                    this.model.type.endsWith('Time')
                ))
                    newValue *= 1000
            }
        this.model.state = state
        return newValue
    }
}
/**
 * Observes database for any data changes and triggers corresponding methods
 * on corresponding events.
 * @property static:defaultLiveUpdateOptions - Options for database
 * observation.
 *
 * @property actions - Array if actions which have happen.
 *
 * @property _canceled - Indicates whether current view has been destroyed and
 * data observation should bee canceled.
 * @property _changeDetectorReference - Current views change detector reference
 * service instance.
 * @property _changesStream - Database observation representation.
 * @property _data - Data service instance.
 * @property _extendObject - Extend object pipe's transformation method.
 * @property _liveUpdateOptions - Options for database observation.
 * @property _stringCapitalize - String capitalize pipe transformation
 * function.
 */
export class AbstractLiveDataComponent/* implements OnDestroy, OnInit*/ {
    static defaultLiveUpdateOptions:PlainObject = {
        heartbeat: 10000,
        /* eslint-disable camelcase */
        include_docs: true,
        /* eslint-enable camelcase */
        live: true,
        since: 'now',
        timeout: false
    }

    actions:Array<PlainObject> = []

    _canceled:boolean = false
    _changeDetectorReference:ChangeDetectorRef
    _changesStream:Object
    _data:DataService
    _extendObject:Function
    _liveUpdateOptions:PlainObject = {}
    _stringCapitalize:Function
    /**
     * Saves injected service instances as instance properties.
     * @param changeDetectorReference - Model dirty checking service.
     * @param data - Data service instance.
     * @param extendObjectPipe - Extend object pipe instance.
     * @param stringCapitalizePipe - The string capitalize pipe instance.
     * @returns Nothing.
     */
    constructor(
        changeDetectorReference:ChangeDetectorRef, data:DataService,
        extendObjectPipe:ExtendObjectPipe,
        stringCapitalizePipe:StringCapitalizePipe
    ):void {
        this._changeDetectorReference = changeDetectorReference
        this._data = data
        this._extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
        this._stringCapitalize = stringCapitalizePipe.transform.bind(
            stringCapitalizePipe)
    }
    /**
     * Initializes data observation when view has been initialized.
     * @returns Nothing.
     */
    ngOnInit():void {
        this._changesStream = this._data.connection.changes(this._extendObject(
            true, {},
            {since: LAST_KNOWN_DATA.sequence},
            this.constructor.defaultLiveUpdateOptions,
            this._liveUpdateOptions))
        for (const type:string of ['change', 'complete', 'error'])
            this._changesStream.on(type, async (
                action:PlainObject
            ):Promise<void> => {
                if (this._canceled)
                    return
                if (type === 'change') {
                    if ('seq' in action && typeof action.seq === 'number')
                        LAST_KNOWN_DATA.sequence = action.seq
                    LAST_KNOWN_DATA.data[action.id] = action.doc
                }
                action.name = type
                this.actions.unshift(action)
                // IgnoreTypeCheck
                let result:Promise<boolean>|boolean = this[
                    `onData${this._stringCapitalize(type)}`
                ](action)
                if (
                    result !== null && typeof result === 'object' &&
                    'then' in result
                )
                    result = await result
                if (result)
                    this._changeDetectorReference.detectChanges()
            })
    }
    /**
     * Marks current live data observation as canceled and closes initially
     * requested update stream.
     * @returns Nothing.
     */
    ngOnDestroy():void {
        this._canceled = true
        if (this._changesStream)
            this._changesStream.cancel()
    }
    /**
     * Triggers on any data changes.
     * @returns A boolean indicating whether a view update should be triggered
     * or not.
     */
    onDataChange():boolean {
        return true
    }
    /**
     * Triggers on completed data change observation.
     * @returns A boolean indicating whether a view update should be triggered
     * or not.
     */
    onDataComplete():boolean {
        return false
    }
    /**
     * Triggers on data change observation errors.
     * @returns A boolean indicating whether a view update should be triggered
     * or not.
     */
    onDataError():boolean {
        return false
    }
}
/* eslint-disable brace-style */
/**
 * A generic abstract component to edit, search, navigate and filter a list of
 * entities.
 * @property allItems - Current list of items.
 * @property allItemsChecked - Indicates whether all currently selected items
 * are checked via select all selector.
 * @property items - Current list of visible items.
 * @property limit - Maximal number of visible items.
 * @property page - Current page number of each item list part.#
 * @property preventedDataUpdate - Saves null or arguments to a prevented data
 * updates.
 * @property regularExpression - Indicator whether searching via regular
 * expressions should be used.
 * @property searchTerm - Search string to filter visible item list.
 * @property searchTermStream - Search term stream which debounces and caches
 * search results.
 * @property selectedItems - List of currently selected items for group editing
 * purposes.
 * @property sort - Sorting informations.
 *
 * @property _currentParameter - Saves current route url parameter.
 * @property _itemPath - Routing path to a specific item.
 * @property _itemsPath - Routing path to the items overview.
 * @property _route - Current route configuration.
 * @property _router - Router service instance.
 * @property _toolsInstance - Instance of tools service instance property.
 */
export class AbstractItemsComponent extends AbstractLiveDataComponent
/* implements AfterContentChecked, OnDestroy*/ {
/* eslint-enable brace-style */
    allItems:Array<PlainObject>
    allItemsChecked:boolean = false
    debouncedUpdate:Function
    items:Array<PlainObject>
    limit:number
    page:number
    preventedDataUpdate:?Array<any> = null
    regularExpression:boolean = false
    searchTerm:string = ''
    searchTermStream:Subject<string> = new Subject()
    selectedItems:Set<PlainObject> = new Set()
    sort:PlainObject = {_id: 'asc'}

    _currentParameter:PlainObject
    _itemPath:string = 'item'
    _itemsPath:string = 'items'
    _route:ActivatedRoute
    _router:Router
    _subscriptions:Array<ISubscription> = []
    _tools:typeof Tools
    _toolsInstance:Tools
    /**
     * Saves injected service instances as instance properties.
     * @param changeDetectorReference - Model dirty checking service.
     * @param data - Data stream service.
     * @param extendObjectPipe - Extend object pipe instance.
     * @param route - Current route configuration.
     * @param router - Injected router service instance.
     * @param stringCapitalizePipe - String capitalize pipe instance.
     * @param tools - Injected tools service instance.
     * @returns Nothing.
     */
    constructor(
        changeDetectorReference:ChangeDetectorRef, data:DataService,
        extendObjectPipe:ExtendObjectPipe, route:ActivatedRoute, router:Router,
        stringCapitalizePipe:StringCapitalizePipe, tools:ToolsService
    ):void {
        super(
            changeDetectorReference, data, extendObjectPipe,
            stringCapitalizePipe)
        this._tools = tools.tools
        this.keyCode = this._tools.keyCode
        this._route = route
        this._router = router
        // IgnoreTypeCheck
        this._toolsInstance = new tools.tools()
        /*
            NOTE: Parameter have to be read before data to ensure that all page
            constraints have been set correctly before item slicing.
        */
        this._subscriptions.push(this._route.params.subscribe((
            data:PlainObject
        ):void => {
            this._currentParameter = data
            this.limit = parseInt(this._currentParameter.limit)
            this.page = parseInt(this._currentParameter.page)
            const match:Array<string> = /(regex|exact)-(.*)/.exec(
                this._currentParameter.searchTerm)
            if (match) {
                this.regularExpression = match[1] === 'regex'
                this.searchTerm = decodeURIComponent(match[2])
            }
        }))
        this._subscriptions.push(this._route.data.subscribe((
            data:PlainObject
        ):void => {
            this.limit = Math.max(1, this.limit || 1)
            const total:number = data.items.length + (
                Math.max(1, this.page || 1) - 1
            ) * this.limit
            this.allItems = data.items.slice()
            if (data.items.length > this.limit)
                data.items.splice(this.limit, data.items.length - this.limit)
            this.items = data.items
            this.items.total = total
            if (this.applyPageConstraints())
                this.update()
        }))
        this._subscriptions.push(this.searchTermStream.debounceTime(200)
            .distinctUntilChanged().subscribe(():Promise<boolean> => {
                this.page = 1
                return this.update()
            }))
        this.debouncedUpdate = this._tools.debounce(this.update.bind(this))
    }
    /**
     * Updates constraints between limit, page number and number of total
     * available items.
     * @returns A boolean indicating if something has changed to fulfill page
     * constraints.
     */
    applyPageConstraints():boolean {
        const oldPage:number = this.page
        const oldLimit:number = this.limit
        this.limit = Math.max(1, this.limit || 1)
        this.page = Math.max(1, Math.min(this.page, Math.ceil(
            // IgnoreTypeCheck
            this.items.total / this.limit)))
        return this.page !== oldPage || this.limit !== oldLimit
    }
    /**
     * A function factory to generate functions which updates current view if
     * no route change happened between an asynchronous process.
     * @param callback - Function to wrap.
     * @returns Given function wrapped.
     */
    changeItemWrapperFactory(callback:Function):Function {
        return async (...parameter:Array<any>):Promise<any> => {
            let update:boolean = true
            const subscription:ISubscription = this._router.events.subscribe((
                event:Object
            ):void => {
                if (event instanceof NavigationEnd) {
                    update = false
                    subscription.unsubscribe()
                }
            })
            const result:any = await callback(...parameter)
            if (update)
                await this.update(true)
            return result
        }
    }
    /**
     * Clear all currently selected items.
     * @returns Nothing.
     */
    clearSelectedItems():void {
        for (const item:PlainObject of this.items) {
            this.selectedItems.delete(item)
            item.selected = false
        }
    }
    /**
     * Switches section to item which has given id.
     * @param itemID - ID of item to switch to.
     * @param itemVersion - Version of item to switch to.
     * @returns A promise wrapping the navigation result.
     */
    goToItem(itemID:string, itemVersion:string):Promise<boolean> {
        return this._router.navigate([this._itemPath, itemID, itemVersion])
    }
    /**
     * Checks if selection has changed.
     * @returns Nothing.
     */
    ngAfterContentChecked():void {
        if (this.preventedDataUpdate)
            this.onDataChange(...this.preventedDataUpdate)
    }
    /**
     * Triggers on any data changes and updates item constraints.
     * @param parameter - Parameter to save for delayed update.
     * @returns False so their wont be a view update since a complete route
     * reload will be triggered.
     */
    onDataChange(...parameter:Array<any>):false {
        if (this.selectedItems.size)
            this.preventedDataUpdate = parameter
        else {
            this.preventedDataUpdate = null
            this.debouncedUpdate(true)
        }
        /*
            NOTE: We want to avoid another reload if page is already violating
            page constraints which indicates a page reload.
        */
        return false
    }
    /**
     * Unsubscribes all subscriptions when this component should be disposed.
     * @param parameter - List of all parameter to forward to super method.
     * @returns Returns the super values return value.
     */
    ngOnDestroy(...parameter:Array<any>):any {
        const result:any = super.ngOnDestroy(...parameter)
        for (const subscription:ISubscription of this._subscriptions)
            subscription.unsubscribe()
        return result
    }
    /**
     * Select all available items.
     * @returns Nothing.
     */
    selectAllItems():void {
        for (const item:PlainObject of this.items) {
            this.selectedItems.add(item)
            item.selected = true
        }
    }
    /**
     * Applies current filter criteria to current visible item set.
     * @param reload - Indicates whether a simple reload should be made because
     * a changed list of available items is expected for example.
     * @returns A boolean indicating whether route change was successful.
     */
    async update(reload:boolean = false):Promise<boolean> {
        await this._toolsInstance.acquireLock(`${this.constructor.name}Update`)
        this.applyPageConstraints()
        if (reload && parseInt(this._currentParameter.page) !== 0)
            /*
                NOTE: Will be normalised to "1" after route reload (hack to
                enforce route reloading).
            */
            this.page = 0
        let sort:string = ''
        for (const name:string in this.sort)
            if (this.sort.hasOwnProperty(name))
                sort += `${sort ? ',' : ''}${name}-${this.sort[name]}`
        const result:boolean = await this._router.navigate([
            this._itemsPath, sort, this.page, this.limit,
            `${this.regularExpression ? 'regex' : 'exact'}-` +
            encodeURIComponent(this.searchTerm)
        ], {
            preserveFragment: true,
            replaceUrl: parseInt(this._currentParameter.page) === 0,
            skipLocationChange: this.page === 0
        })
        if (result)
            this.allItemsChecked = false
        this._toolsInstance.releaseLock(`${this.constructor.name}Update`)
        return result
    }
    /**
     * Applies current search term to the search term stream.
     * @returns Nothing.
     */
    updateSearch():void {
        this.searchTermStream.next(this.searchTerm)
    }
}
/**
 * Generic value accessor with "ngModel" support.
 * @property onChangeCallback - Saves current on change callback.
 * @property onTouchedCallback - Saves current on touch callback.
 * @property type - Saves current input type.
 */
export class AbstractValueAccessor extends DefaultValueAccessor {
    onChangeCallback:Function = Tools.noop
    onTouchedCallback:Function = Tools.noop
    @Input() type:?string
    /**
     * Manipulates editable value representation.
     * @param value - Value to manipulate.
     * @returns Given and transformed value.
     */
    export(value:any):any {
        return value
    }
    /**
     * Reads internal value representation.
     * @param value - Value to convert to its internal representation.
     * @returns Given and transformed value.
     */
    import(value:any):any {
        return value
    }
    /**
     * Needed implementation for an angular control value accessor.
     * @param callback - Callback function to register.
     * @param additionalParameter - Additional parameter will be forwarded to
     * inherited super method.
     * @returns What inherited method returns.
     */
    registerOnChange(
        callback:Function, ...additionalParameter:Array<any>
    ):any {
        this.onChangeCallback = callback
        return super.registerOnChange(callback, ...additionalParameter)
    }
    /**
     * Needed implementation for an angular control value accessor.
     * @param callback - Callback function to register.
     * @param additionalParameter - Additional parameter will be forwarded to
     * inherited super method.
     * @returns What inherited method returns.
     */
    registerOnTouched(
        callback:Function, ...additionalParameter:Array<any>
    ):any {
        this.onTouchedCallback = callback
        return super.registerOnTouched(callback, ...additionalParameter)
    }
    /**
     * Overridden inherited function for value export.
     * @param value - Value to export.
     * @param additionalParameter - Additional arguments will be forwarded to
     * the overridden method invocation.
     * @returns The transformed give value.
     */
    writeValue(value:any, ...additionalParameter:Array<any>):any {
        return super.writeValue(this.export(
            value, ...additionalParameter
        ), ...additionalParameter)
    }
    /**
     * Overridden inherited function for value import.
     * @param value - Value to import.
     * @param additionalParameter - Additional arguments will be forwarded to
     * the overridden method invocation.
     * @returns The transformed give value.
     */
    _handleInput(value:any, ...additionalParameter:Array<any>):any {
        return super._handleInput(this.import(
            value, ...additionalParameter
        ), ...additionalParameter)
    }
}
// / endregion
// // region date/time
// IgnoreTypeCheck
@Directive(Tools.extendObject(true, {
}, DefaultValueAccessor.decorators[0].args[0], {providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(():DateTimeValueAccessor => DateTimeValueAccessor),
    multi: true
}]}))
/**
 * Time value accessor with "ngModel" support.
 */
export class DateTimeValueAccessor extends AbstractValueAccessor {
    /**
     * Initializes and forwards needed services to the default value accesor
     * constructor.
     * @param elementRef - Host element reference.
     * @param renderer - Angular's dom abstraction layer.
     * @returns Nothing.
     */
    constructor(elementRef:ElementRef, renderer:Renderer2):void {
        super(renderer, elementRef, null)
    }
    /**
     * Manipulates editable value representation.
     * @param value - Value to manipulate.
     * @returns Given and transformed value.
     */
    export(value:any):any {
        if (
            ![undefined, null].includes(value) &&
            ['date', 'time'].includes(this.type)
        ) {
            const date:Date = new Date(value)
            if (isNaN(date.getDate()))
                return
            else if (this.type === 'time') {
                let hours:string = `${date.getHours()}`
                if (hours.length === 1)
                    hours = `0${hours}`
                let minutes:string = `${date.getMinutes()}`
                if (minutes.length === 1)
                    minutes = `0${minutes}`
                return `${hours}:${minutes}`
            } else if (this.type === 'date') {
                let month:string = `${date.getMonth() + 1}`
                if (month.length === 1)
                    month = `0${month}`
                let day:string = `${date.getDate()}`
                if (day.length === 1)
                    day = `0${day}`
                return `${date.getFullYear()}-${month}-${day}`
            }
        }
        return value
    }
    /**
     * Reads internal value representation.
     * @param value - Value to convert to its internal representation.
     * @returns Given and transformed value.
     */
    import(value:any):any {
        if (typeof value === 'string')
            if (this.type === 'time') {
                const match = /^([0-9]{2}):([0-9]{2})$/.exec(value)
                if (match)
                    return new Date(
                        1970, 0, 1, parseInt(match[1]), parseInt(match[2]))
            } else if (this.type === 'date') {
                const match = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(value)
                if (match)
                    return new Date(
                        parseInt(match[1]), parseInt(match[2]) - 1,
                        parseInt(match[3]))
            }
        return value
    }
}
// // / region interval
// IgnoreTypeCheck
@Component({
    selector: 'generic-interval-input',
    template: `
        <generic-input
            [description]="startDescription"
            [model]="model.start"
            type="time"
        ></generic-input>
        <ng-content></ng-content>
        <generic-input
            [description]="endDescription"
            [model]="model.end"
            type="time"
        ></generic-input>
    `
})
/**
 * Represents an interval input.
 * @property endDescription - Description for end input.
 * @property startDescription - Description for start input.
 * @property model - Object that saves start and end time as unix timestamp in
 * milliseconds.
 */
export class IntervalInputComponent {
    @Input() endDescription:?string = null
    @Input() startDescription:?string = null
    @Input() model:{end:number;start:number} = {
        end: {value: new Date(1970, 0, 1)},
        start: {value: new Date(1970, 0, 1)}
    }
}
// IgnoreTypeCheck
@Component({
    animations: [defaultAnimation()],
    selector: 'generic-intervals-input',
    /* eslint-disable max-len */
    template: `
        <div
            *ngIf="description !== '' && (description || model.description || model.name)"
        >{{description || model.description || model.name}}</div>
        <div
            @defaultAnimation
            *ngFor="let interval of model.value; let first = first"
        >
            <generic-interval-input
                [endDescription]="first ? null : ''"
                [model]="interval"
                [startDescription]="first ? null : ''"
            >
                <ng-container *ngIf="contentTemplate; else fallback">
                    <ng-container
                        *ngTemplateOutlet="contentTemplate; context: {\$implicit:interval}"
                    ></ng-container>
                </ng-container>
            </generic-interval-input>
            <a
                class="remove"
                (click)="$event.preventDefault(); $event.stopPropagation(); remove(interval)"
                href=""
                *ngIf="model.minimumNumber === null || model.value.length > model.minimumNumber"
            >-</a>
        </div>
        <a
            class="add"
            (click)="$event.preventDefault(); $event.stopPropagation(); add()"
            href=""
            *ngIf="model.maximumNumber === null || model.value.length < model.maximumNumber"
        >+</a>
        <ng-template #fallback>--</ng-template>
    `
    /* eslint-enable max-len */
})
/**
 * Represents an editable list of intervals.
 * @property additionalObjectData - Additional object data to save with current
 * interval object.
 * @property description - Interval description to use as label.
 * @property model - Saves current list of intervals.
 * @property modelChange - Event emitter for interval list changes.
 *
 * @property _dataScope - Data scope service instance.
 * @property _extendObject - Holds the extend object pipe instance's transform
 * method.
 * @property _typeName - Saves current configured type name.
 */
export class IntervalsInputComponent {
    @Input() additionalObjectData:PlainObject
    @ContentChild(TemplateRef) contentTemplate:TemplateRef
    @Input() description:?string = null
    @Input() model:PlainObject = {value: []}
    @Output() modelChange:EventEmitter<Array<PlainObject>> = new EventEmitter()

    _dataScope:DataScopeService
    _extendObject:Function
    _typeName:string
    /**
     * Constructs the interval list component.
     * @param dataScope - Data scope service instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param initialData - Injected initial data service instance.
     * @returns Nothing.
     */
    constructor(
        dataScope:DataScopeService, extendObjectPipe:ExtendObjectPipe,
        initialData:InitialDataService
    ):void {
        this._dataScope = dataScope
        this._extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
        this._typeName =
            initialData.configuration.database.model.property.name.special.type
    }
    /**
     * Extends additional model data with default one if nothing is provided.
     * @returns Nothing.
     */
    ngOnInit():void {
        if (!this.additionalObjectData)
            this.additionalObjectData = this._dataScope.generate('_interval')
    }
    /**
     * Adds a new interval.
     * @param data - Additional data to use for newly created entity.
     * @returns Nothing.
     */
    add(data:PlainObject = {}):void {
        const lastEnd:number = (
            this.model.value && this.model.value.length
        ) ? (new Date(
                this.model.value[this.model.value.length - 1].end.value
            )).getTime() : 0
        this.model.value.push(this._extendObject(
            true, {}, this.additionalObjectData, {
                // NOTE: We add one hour in milliseconds as default interval.
                end: {value: new Date(lastEnd + 60 ** 2 * 1000)},
                start: {value: new Date(lastEnd)}
            }, data))
        this.modelChange.emit(this.model)
    }
    /**
     * Removes given interval.
     * @param interval - Interval to remove from current list.
     * @returns Nothing.
     */
    remove(interval:PlainObject):void {
        const index:number = this.model.value.indexOf(interval)
        if (index !== -1) {
            this.model.value.splice(index, 1)
            this.modelChange.emit(this.model)
        }
    }
}
// // / endregion
// // endregion
// // region text/selection
@Component({
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(():CodeEditorComponent => CodeEditorComponent),
        multi: true
    }],
    selector: 'code-editor',
    template: '<textarea #hostDomNode></textarea>'
})
/* eslint-disable brace-style */
/**
 * Provides a generic code editor.
 * @property static:applicationInterfaceLoad - Promise which resolves when
 * code editor is fully loaded.
 * @property static:modesLoad - Mapping from mode to their loading state.
 *
 * @property blur - Blur event emitter.
 * @property codeMirror - Current code mirror constructor.
 * @property configuration - Code mirror configuration.
 * @property focus - Focus event emitter.
 * @property hostDomNode - Host textarea dom element to bind editor to.
 * @property initialized - Initialized event emitter.
 * @property instance - Currently active code editor instance.
 * @property model - Current editable text string.
 * @property modelChange - Change event emitter.
 */
export class CodeEditorComponent extends AbstractValueAccessor
/* implements AfterViewInit*/ {
/* eslint-enable brace-style */
    static applicationInterfaceLoad:Promise<Object>
    static modesLoad:{[key:string]:Promise<void>|true} = {}

    @Output() blur:EventEmitter<{
        event:Object;
        instance:Object;
    }> = new EventEmitter()
    codeMirror:Object
    @Input() configuration:PlainObject = {}
    @Input() disabled:?boolean = null
    extendObject:Function
    @Output() focus:EventEmitter<{
        event:Object;instance:Object;
    }> = new EventEmitter()
    @ViewChild('hostDomNode') hostDomNode:ElementRef
    @Output() initialized:EventEmitter<Object> = new EventEmitter()
    instance:?Object = null
    @Input() model:string = ''
    @Output() modelChange:EventEmitter<string> = new EventEmitter()
    tools:ToolsService
    /**
     * Initializes the code mirror resource loading if not available yet.
     * @param elementRef - Host element reference.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param renderer - Angular's dom abstraction layer.
     * @param tools - Tools service instance.
     * @returns Nothing.
     */
    constructor(
        elementRef:ElementRef, extendObjectPipe:ExtendObjectPipe,
        renderer:Renderer2, tools:ToolsService
    ):void {
        super(renderer, elementRef, null)
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
        this.tools = tools
        if (this.tools.globalContext.CodeMirror)
            this.codeMirror = this.tools.globalContext.CodeMirror
        else if (
            typeof this.constructor.applicationInterfaceLoad !== 'object'
        )
            this.constructor.applicationInterfaceLoad = Promise.all([
                new Promise((resolve:Function):$DomNode => this.tools.$(`<link
                    href="${CODE_MIRROR_DEFAULT_OPTIONS.path.base}` +
                    `${CODE_MIRROR_DEFAULT_OPTIONS.path.cascadingStyleSheet}"
                    rel="stylesheet"
                    type="text/css"
                />`).appendTo('head').on('load', resolve)),
                new Promise((
                    resolve:Function, reject:Function
                ):Object => this.tools.$.ajax({
                    cache: true,
                    dataType: 'script',
                    error: reject,
                    success: ():void => {
                        this.codeMirror = this.tools.globalContext.CodeMirror
                        resolve(this.codeMirror)
                    },
                    url: CODE_MIRROR_DEFAULT_OPTIONS.path.base +
                        CODE_MIRROR_DEFAULT_OPTIONS.path.script
                }))
            ])
    }
    /**
     * Initializes the code editor element.
     * @returns Nothing.
     */
    async ngAfterViewInit():Promise<void> {
        if (this.codeMirror)
            /*
                NOTE: We have to do a dummy timeout to avoid an event emit in
                first initializing call stack.
            */
            await this.tools.tools.timeout()
        else
            try {
                await this.constructor.applicationInterfaceLoad
            } catch (error) {
                throw error
            }
        if (this.configuration.mode)
            if (this.constructor.modesLoad.hasOwnProperty(
                this.configuration.mode
            )) {
                if (this.constructor.modesLoad[
                    this.configuration.mode
                ] !== true)
                    try {
                        await this.constructor.modesLoad[
                            this.configuration.mode]
                    } catch (error) {
                        throw error
                    }
            } else {
                this.constructor.modesLoad[this.configuration.mode] =
                    new Promise((resolve:Function, reject:Function):Object =>
                        this.tools.$.ajax({
                            cache: true,
                            dataType: 'script',
                            error: reject,
                            success: resolve,
                            url: this.configuration.path.base +
                                this.configuration.path.mode.replace(
                                    /{mode}/g, this.configuration.mode)
                        }))
                try {
                    await this.constructor.modesLoad[this.configuration.mode]
                } catch (error) {
                    throw error
                }
            }
        const configuration:PlainObject = this.extendObject(
            {}, this.configuration, {readOnly: this.disabled === null ? (
                this.model.disabled || model.mutable === false ||
                model.writable === false
            ) : this.disabled})
        delete configuration.path
        this.instance = this.codeMirror.fromTextArea(
            this.hostDomNode.nativeElement, configuration)
        this.instance.setValue(this.model)
        this.instance.on('blur', (instance:Object, event:Object):void =>
            this.blur.emit({event, instance}))
        this.instance.on('change', ():void => {
            this.model = this.onChangeCallback(this.import(
                this.instance.getValue()))
            this.modelChange.emit(this.model)
        })
        this.instance.on('focus', (instance:Object, event:Object):void =>
            this.focus.emit({event, instance}))
        this.initialized.emit(this.codeMirror)
    }
    /**
     * Synchronizes given value into internal code mirror instance.
     * @param value - Given value to set in code editor.
     * @param additionalParameter - Additional arguments will be forwarded to
     * the overridden method invocation.
     * @returns What inherited method returns.
     */
    export(value:any, ...additionalParameter:Array<any>):any {
        this.model = value || ''
        if (this.instance)
            this.instance.setValue(this.model)
        return super.export(value, ...additionalParameter)
    }
    /**
     * Triggers disabled state changes.
     * @param isDisabled - Indicates disabled state.
     * @returns Nothing.
     */
    setDisabledState(isDisabled:boolean):void {
        if (this.instance)
            this.instance.setOption('readOnly', isDisabled)
    }
}
/* eslint-disable max-len */
const propertyContent:PlainObject = {
    editor: `
        (blur)="focused = false"
        @defaultAnimation
        (focus)="focused = true"
        [ngModel]="model.value"
        (ngModelChange)="model.value = onChange($event, state); modelChange.emit(model)"
        [style.visibilty]="initialized ? 'visible' : 'hidden'"
        #state="ngModel"
    `,
    nativ: `
        [name]="model.name"
        [ngModel]="model.value"
        (ngModelChange)="model.value = onChange($event, state); modelChange.emit(model)"
        [placeholder]="description === '' ? null : description ? description : (model.description || model.name)"
        [required]="required === null ? !model.nullable : required"
        #state="ngModel"
    `,
    nativText: `
        [disabled]="disabled === null ? (model.disabled || model.mutable === false || model.writable === false) : disabled"
        [maxlength]="maximumLength === null ? (model.type === 'string' ? model.maximumLength : null) : maximumLength"
        [minlength]="minimumLength === null ? (model.type === 'string' ? model.minimumLength : null) : minimumLength"
        [pattern]="pattern === null ? (model.type === 'string' ? model.regularExpressionPattern : null) : pattern"
    `,
    wrapper: `
        [declaration]="declaration"
        [description]="description"
        [disabled]="disabled"
        [showDeclarationText]="showDeclarationText"
        [maximum]="maximum"
        [maximumLength]="maximumLength"
        [maximumLengthText]="maximumLengthText"
        [maximumText]="maximumText"
        [minimum]="minimum"
        [minimumLength]="minimumLength"
        [model]="model"
        [pattern]="pattern"
        [required]="required"
        [requiredText]="requiredText"
        [minimumLengthText]="minimumLengthText"
        [minimumText]="minimumText"
        [patternText]="patternText"
        [showValidationErrorMessages]="showValidationErrorMessages"
        [type]="type"
    `
}
const inputContent:string = `
    <md-hint align="start" @defaultAnimation mdTooltip="info">
        <span
            [class.active]="showDeclaration"
            (click)="showDeclaration = !showDeclaration"
            *ngIf="declaration || model.declaration"
        >
            <a
                (click)="$event.preventDefault()"
                @defaultAnimation
                href=""
                *ngIf="showDeclarationText"
            >{{showDeclarationText}}</a>
            <span @defaultAnimation *ngIf="showDeclaration">
                {{declaration || model.declaration}}
            </span>
        </span>
        <span *ngIf="editor && selectableEditor && !model.disabled">
            <span *ngIf="declaration || model.declaration">|</span>
            <a
                [class.active]="activeEditor"
                (click)="$event.preventDefault(); $event.stopPropagation(); activeEditor = true"
                href=""
            >editor</a>
            <span>|</span>
            <a
                [class.active]="!activeEditor"
                (click)="$event.preventDefault(); $event.stopPropagation(); activeEditor = false"
                href=""
            >plain</a>
        </span>
    </md-hint>
    <span @defaultAnimation generic-error *ngIf="showValidationErrorMessages">
        <p @defaultAnimation *ngIf="model.state?.errors?.maxlength">
            {{maximumLengthText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state?.errors?.max">
            {{maximumText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state?.errors?.minlength">
            {{minimumLengthText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state?.errors?.min">
            {{minimumText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state?.errors?.pattern">
            {{patternText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state?.errors?.required">
            {{requiredText | genericStringTemplate:model}}
        </p>
    </span>
    <md-hint
        align="end"
        @defaultAnimation
        *ngIf="!model.selection && model.type === 'string' && model.maximumLength !== null && model.maximumLength < 100"
    >{{model.value?.length}} / {{model.maximumLength}}</md-hint>
`
/* eslint-enable max-len */
// IgnoreTypeCheck
@Component({
    animations: [defaultAnimation()],
    selector: 'generic-input',
    template: `
        <generic-textarea
            ${propertyContent.wrapper}
            [activeEditor]="activeEditor"
            [editor]="editor"
            [maximumNumberOfRows]="maximumNumberOfRows"
            [minimumNumberOfRows]="minimumNumberOfRows"
            *ngIf="editor || model.editor; else simpleInput"
            [rows]="rows"
            [selectableEditor]="selectableEditor"
        ><ng-content></ng-content></generic-textarea>
        <ng-template #simpleInput><generic-simple-input
            ${propertyContent.wrapper}
            [labels]="labels"
        ><ng-content></ng-content></generic-simple-input></ng-template>
    `
})
/**
 * A generic form input, selection or textarea component with validation,
 * labeling and info description support.
 * @property activeEditor - Indicates whether current editor is active.
 * @property editor - Editor to choose from for an activated editor.
 * @property labels - Defines some selectable value labels.
 * @property maximumNumberOfRows - Maximum resizeable number of rows.
 * @property minimumNumberOfRows - Minimum resizeable number of rows.
 * @property rows - Number of rows to show.
 * @property selectableEditor - Indicates whether an editor is selectable.
 * @property type - Optionally defines an input type explicitly.
 */
export class InputComponent extends AbstractInputComponent {
    @Input() activeEditor:?boolean = null
    @Input() editor:?PlainObject|string = null
    @Input() labels:{[key:string]:string} = {}
    @Input() maximumNumberOfRows:?string
    @Input() minimumNumberOfRows:?string
    @Input() rows:?string
    @Input() selectableEditor:?boolean = null
    @Input() type:?string
    /**
     * Forwards injected service instances to the abstract input component's
     * constructor.
     * @param attachmentWithPrefixExistsPipe - Saves the attachment by prefix
     * pipe instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param getFilenameByPrefixPipe - Saves the file name by prefix retriever
     * pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param numberGetUTCTimestampPipe - Injected date (and time) to unix
     * timestamp converter pips instance.
     * @returns Nothing.
     */
    constructor(
        attachmentWithPrefixExistsPipe:AttachmentWithPrefixExistsPipe,
        extendObjectPipe:ExtendObjectPipe,
        getFilenameByPrefixPipe:GetFilenameByPrefixPipe,
        initialData:InitialDataService,
        numberGetUTCTimestampPipe:NumberGetUTCTimestampPipe
    ):void {
        super(
            attachmentWithPrefixExistsPipe, extendObjectPipe,
            getFilenameByPrefixPipe, initialData, numberGetUTCTimestampPipe)
    }
}
/* eslint-disable max-len */
// IgnoreTypeCheck
@Component({
    animations: [defaultAnimation()],
    selector: 'generic-simple-input',
    template: `
        <ng-container
            @defaultAnimation *ngIf="model.selection; else textInput"
        >
            <md-select [(ngModel)]="model.value" ${propertyContent.nativ}>
                <md-option
                    *ngFor="let value of model.selection" [value]="value"
                >
                    {{labels.hasOwnProperty(value) ? labels[value] : value}}
                </md-option>
            </md-select>
            ${inputContent}
            <ng-content></ng-content>
        </ng-container>
        <ng-template #textInput><md-form-field>
            <input
                ${propertyContent.nativ}
                ${propertyContent.nativText}
                [max]="maximum === null ? (model.type === 'number' ? model.maximum : null) : maximum"
                mdInput
                [min]="minimum === null ? (model.type === 'number' ? model.minimum : null) : minimum"
                [type]="type ? type : model.name.startsWith('password') ? 'password' : model.type === 'string' ? 'text' : 'number'"
            />
            ${inputContent}
            <ng-content></ng-content>
        </md-form-field></ng-template>
    `
})
/* eslint-enable max-len */
/**
 * A generic form input or select component with validation, labeling and info
 * description support.
 * @property labels - Defines some selectable value labels.
 * @property type - Optionally defines an input type explicitly.
 */
export class SimpleInputComponent extends AbstractInputComponent {
    @Input() labels:{[key:string]:string} = {}
    @Input() type:?string
    /**
     * Forwards injected service instances to the abstract input component's
     * constructor.
     * @param attachmentWithPrefixExistsPipe - Saves the attachment by prefix
     * pipe instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param getFilenameByPrefixPipe - Saves the file name by prefix retriever
     * pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param numberGetUTCTimestampPipe - Injected date (and time) to unix
     * timestamp converter pips instance.
     * @returns Nothing.
     */
    constructor(
        attachmentWithPrefixExistsPipe:AttachmentWithPrefixExistsPipe,
        extendObjectPipe:ExtendObjectPipe,
        getFilenameByPrefixPipe:GetFilenameByPrefixPipe,
        initialData:InitialDataService,
        numberGetUTCTimestampPipe:NumberGetUTCTimestampPipe
    ):void {
        super(
            attachmentWithPrefixExistsPipe, extendObjectPipe,
            getFilenameByPrefixPipe, initialData, numberGetUTCTimestampPipe)
    }
}
/* eslint-disable max-len */
// IgnoreTypeCheck
@Component({
    animations: [defaultAnimation()],
    selector: 'generic-textarea',
    template: `
        <ng-container *ngIf="activeEditor; else plain">
            <span [class.focused]="focused" class="editor-label">
                {{
                    description === '' ? null : description ? description : (
                        model.description || model.name
                    )
                }}
            </span>
            <code-editor
                ${propertyContent.editor}
                [configuration]="editor"
                [disabled]="disabled === null ? (model.disabled || model.mutable === false || model.writable === false) : disabled"
                (initialized)="initialized = true"
                *ngIf="editorType === 'code' || editor.indentUnit; else tinyMCE"
            ></code-editor>
            <ng-template #tinyMCE><angular-tinymce
                ${propertyContent.editor}
                (init)="initialized = true"
                [settings]="editor"
            ></angular-tinymce></ng-template>
            ${inputContent}
            <ng-content></ng-content>
        </ng-container>
        <ng-template #plain><md-form-field @defaultAnimation>
            <textarea
                ${propertyContent.nativ}
                ${propertyContent.nativText}
                [mdAutosizeMaxRows]="maximumNumberOfRows"
                [mdAutosizeMinRows]="minimumNumberOfRows"
                mdInput
                mdTextareaAutosize
                [rows]="rows"
            ></textarea>
            ${inputContent}
            <ng-content></ng-content>
        </md-form-field></ng-template>
    `
})
/* eslint-enable max-len */
/* eslint-disable brace-style */
/**
 * A generic form textarea component with validation, labeling and info
 * description support.
 * @property static:defaultEditorOptions - Globale default editor options.
 *
 * @property activeEditor - Indicated weather current editor is active or not.
 * @property editor - Editor options to choose from for an activated editor.
 * @property editorType - Editor type description.
 * @property maximumNumberOfRows - Maximum resizeable number of rows.
 * @property minimumNumberOfRows - Minimum resizeable number of rows.
 * @property rows - Number of rows to show.
 * @property selectableEditor - Indicates whether an editor is selectable.
 */
export class TextareaComponent extends AbstractInputComponent
/* implements OnInit*/{
/* eslint-enable brace-style */
    static defaultEditorOptions:{code:PlainObject;markup:PlainObject} = {
        code: {},
        markup: {}
    }

    @Input() activeEditor:?boolean = null
    @Input() editor:?PlainObject|?string = null
    editorType:string = 'custom'
    @Input() maximumNumberOfRows:?string
    @Input() minimumNumberOfRows:?string
    @Input() rows:?string
    @Input() selectableEditor:?boolean = null
    /**
     * Forwards injected service instances to the abstract input component's
     * constructor.
     * @param attachmentWithPrefixExistsPipe - Saves the attachment by prefix
     * pipe instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param getFilenameByPrefixPipe - Saves the file name by prefix retriever
     * pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param numberGetUTCTimestampPipe - Injected date (and time) to unix
     * timestamp converter pips instance.
     * @returns Nothing.
     */
    constructor(
        attachmentWithPrefixExistsPipe:AttachmentWithPrefixExistsPipe,
        extendObjectPipe:ExtendObjectPipe,
        getFilenameByPrefixPipe:GetFilenameByPrefixPipe,
        initialData:InitialDataService,
        numberGetUTCTimestampPipe:NumberGetUTCTimestampPipe
    ):void {
        super(
            attachmentWithPrefixExistsPipe, extendObjectPipe,
            getFilenameByPrefixPipe, initialData, numberGetUTCTimestampPipe)
        if (initialData.configuration.hasOwnProperty(
            'defaultEditorOptions'
        ) && typeof initialData.configuration.defaultEditorOptions ===
        'object' && initialData.configuration.defaultEditorOptions !== null)
            this.constructor.defaultEditorOptions =
                initialData.configuration.defaultEditorOptions
    }
    /**
     * Triggers after input values have been resolved.
     * @param additionalParameter - Additional arguments will be forwarded to
     * the overridden method invocation.
     * @returns Nothing.
     */
    ngOnInit(...additionalParameter:Array<any>):void {
        super.ngOnInit(...additionalParameter)
        if (this.editor === null && this.model.editor)
            this.editor = this.model.editor
        if (typeof this.editor === 'string') {
            if (this.editor.startsWith('!')) {
                this.editor = this.editor.substring(1)
                if (this.selectableEditor === null)
                    this.selectableEditor = false
            }
            if (this.editor.startsWith('(') && this.editor.endsWith(')'))
                this.editor = this.editor.substring(1, this.editor.length - 1)
            else if (this.activeEditor === null)
                this.activeEditor = true
            this.editorType = this.editor
            if (this.editor.startsWith('code'))
                if (this.editor.startsWith('code:'))
                    this.editor = {
                        mode: this.editor.substring('code:'.length)
                    }
                else
                    this.editor = {}
            else if (this.editor === 'raw')
                this.editor = {
                    /* eslint-disable max-len */
                    toolbar1: 'cut copy paste | undo redo removeformat | code | fullscreen',
                    /* eslint-enable max-len */
                    toolbar2: false
                }
            else if (this.editor === 'simple')
                this.editor = {
                    /* eslint-disable max-len */
                    toolbar1: 'cut copy paste | undo redo removeformat | bold italic underline strikethrough subscript superscript | fullscreen',
                    toolbar2: false
                    /* eslint-enable max-len */
                }
            else if (this.editor === 'normal')
                this.editor = {
                    /* eslint-disable max-len */
                    toolbar1: 'cut copy paste | undo redo removeformat | styleselect formatselect | searchreplace visualblocks fullscreen code'
                    /* eslint-enable max-len */
                }
            else
                // Advanced editor.
                this.editor = {}
        } else if (this.editor === null && this.activeEditor)
            this.editor = {}
        if (this.activeEditor === null)
            this.activeEditor = false
        if (this.selectableEditor === null)
            if (typeof this.model.selectableEditor === 'boolean')
                this.selectableEditor = this.model.selectableEditor
            else
                this.selectableEditor = true
        if (typeof this.editor === 'object' && this.editor !== null)
            if (this.editorType.startsWith('code') || this.editor.indentUnit)
                this.editor = this._extendObject(
                    true, {}, CODE_MIRROR_DEFAULT_OPTIONS,
                    this.constructor.defaultEditorOptions.code, this.editor)
            else
                this.editor = this._extendObject(
                    true, {}, TINY_MCE_DEFAULT_OPTIONS,
                    this.constructor.defaultEditorOptions.markup, this.editor)
    }
}
// // endregion
// / region file input
/* eslint-disable max-len */
// IgnoreTypeCheck
@Component({
    animations: [defaultAnimation()],
    selector: 'generic-file-input',
    template: `
        <md-card>
            <md-card-header
                @defaultAnimation
                *ngIf="headerText !== '' && (headerText || file?.name || model[attachmentTypeName][internalName]?.declaration || headerText || file?.name || name || model[attachmentTypeName][internalName]?.description || name)"
            >
                <md-card-title>
                    <span
                        @defaultAnimation
                        *ngIf="revision || headerText || !file?.name; else editable"
                    >
                        {{
                            headerText ||
                            file?.name ||
                            model[attachmentTypeName][
                                internalName
                            ]?.description ||
                            name
                        }}
                    </span>
                    <ng-template #editable>
                        <ng-container *ngIf="synchronizeImmediately; else parent">
                            <md-form-field
                                [class.dirty]="editedName && editedName !== file.name"
                                mdTooltip="Focus to edit."
                            >
                                <input
                                    mdInput
                                    [ngModel]="editedName || file.name"
                                    (ngModelChange)="editedName = $event"
                                />
                                <md-hint
                                    [class.active]="showDeclaration"
                                    (click)="showDeclaration = !showDeclaration"
                                    @defaultAnimation
                                    mdTooltip="info"
                                    *ngIf="model[attachmentTypeName][internalName]?.declaration"
                                >
                                    <a
                                        (click)="$event.preventDefault()"
                                        @defaultAnimation
                                        href=""
                                        *ngIf="showDeclarationText"
                                    >{{showDeclarationText}}</a>
                                    <span
                                        @defaultAnimation
                                        *ngIf="showDeclaration"
                                    >
                                        {{
                                            model[attachmentTypeName][
                                                internalName
                                            ].declaration
                                        }}
                                    </span>
                                </md-hint>
                            </md-form-field>
                            <ng-container
                                *ngIf="editedName && editedName !== file.name"
                            >
                                <a
                                    (click)="$event.preventDefault();rename(editedName)"
                                    @defaultAnimation
                                    href=""
                                >{{saveNameText}}</a>
                                <a
                                    (click)="$event.preventDefault();editedName = file.name"
                                    @defaultAnimation
                                    href=""
                                >{{resetNameText}}</a>
                            </ng-container>
                        </ng-container>
                        <ng-template #parent><md-form-field
                            [class.dirty]="file.initialName !== file.name"
                            @defaultAnimation
                            mdTooltip="Focus to edit."
                            *ngIf="!synchronizeImmediately"
                        >
                            <input
                                mdInput [ngModel]="file.name"
                                (ngModelChange)="file.name = $event;modelChange.emit(this.model); fileChange.emit(file)"
                            />
                            <md-hint
                                [class.active]="showDeclaration"
                                (click)="showDeclaration = !showDeclaration"
                                @defaultAnimation
                                mdTooltip="info"
                                *ngIf="model[attachmentTypeName][internalName]?.declaration"
                            >
                                <a
                                    (click)="$event.preventDefault()"
                                    @defaultAnimation
                                    href=""
                                    *ngIf="showDeclarationText"
                                >{{showDeclarationText}}</a>
                                <span
                                    @defaultAnimation
                                    *ngIf="showDeclaration"
                                >
                                    {{
                                        model[attachmentTypeName][
                                            internalName
                                        ].declaration
                                    }}
                                </span>
                            </md-hint>
                        </md-form-field></ng-template>
                    </ng-template>
                </md-card-title>
            </md-card-header>
            <img md-card-image
                [attr.alt]="name"
                [attr.src]="file.source"
                @defaultAnimation
                *ngIf="file?.type === 'image' && file?.source"
            >
            <video
                autoplay
                @defaultAnimation
                md-card-image
                muted
                *ngIf="file?.type === 'video' && file?.source"
                loop
            >
                <source [attr.src]="file.source" [type]="file.content_type">
                No preview possible.
            </video>
            <iframe
                @defaultAnimation
                *ngIf="file?.type === 'text' && file?.source"
                [src]="file.source"
                style="border: none; width: 100%; max-height: 150px"
            ></iframe>
            <div
                @defaultAnimation
                md-card-image
                *ngIf="(!file?.type && (file?.source || (file?.source | genericType) === 'string') ? noPreviewText : noFileText) as text"
            ><p>{{text}}</p></div>
            <md-card-content>
                <ng-content></ng-content>
                <div
                    @defaultAnimation
                    generic-error
                    *ngIf="showValidationErrorMessages && model[attachmentTypeName][internalName]?.state?.errors"
                >
                    <p
                        @defaultAnimation
                        *ngIf="model[attachmentTypeName][internalName].state.errors.required"
                    >
                        {{
                            requiredText | genericStringTemplate:{
                                attachmentTypeName: attachmentTypeName,
                                file: file,
                                internalName: internalName,
                                model: model[attachmentTypeName][internalName]
                            }
                        }}
                    </p>
                    <p
                        @defaultAnimation
                        *ngIf="model[attachmentTypeName][internalName].state.errors.name"
                    >
                        {{
                            namePatternText | genericStringTemplate:{
                                attachmentTypeName: attachmentTypeName,
                                file: file,
                                internalName: internalName,
                                model: model[attachmentTypeName][internalName]
                            }
                        }}
                    </p>
                    <p
                        @defaultAnimation
                        *ngIf="model[attachmentTypeName][internalName].state.errors.contentType"
                    >
                        {{
                            typePatternText | genericStringTemplate:{
                                attachmentTypeName: attachmentTypeName,
                                file: file,
                                internalName: internalName,
                                model: model[attachmentTypeName][internalName]
                            }
                        }}
                    </p>
                    <p
                        @defaultAnimation
                        *ngIf="model[attachmentTypeName][internalName].state.errors.minimumSize"
                    >
                        {{
                            minimumSizeText | genericStringTemplate:{
                                attachmentTypeName: attachmentTypeName,
                                file: file,
                                internalName: internalName,
                                model: model[attachmentTypeName][internalName]
                            }
                        }}
                    </p>
                    <p
                        @defaultAnimation
                        *ngIf="model[attachmentTypeName][internalName].state.errors.maximumSize"
                    >
                        {{
                            maximumSizeText | genericStringTemplate:{
                                attachmentTypeName: attachmentTypeName,
                                file: file,
                                internalName: internalName,
                                model: model[attachmentTypeName][internalName]
                            }
                        }}
                    </p>
                    <p
                        @defaultAnimation
                        *ngIf="model[attachmentTypeName][internalName].state.errors.database"
                    >
                        {{
                            model[attachmentTypeName][
                                internalName
                            ].state.errors.database
                        }}
                    </p>
                </div>
            </md-card-content>
            <md-card-actions>
                <input #input style="display: none" type="file" />
                <button
                    @defaultAnimation
                    (click)="input.click()"
                    md-raised-button
                    *ngIf="newButtonText"
                >{{newButtonText}}</button>
                <button
                    (click)="remove()"
                    @defaultAnimation
                    md-raised-button
                    *ngIf="deleteButtonText && file"
                >{{deleteButtonText}}</button>
                <button md-raised-button
                    @defaultAnimation
                    *ngIf="downloadButtonText && file"
                ><a [download]="file.name" [href]="file.source">
                    {{downloadButtonText}}
                </a></button>
            </md-card-actions>
        </md-card>
    `
})
/* eslint-enable max-len */
/**
 * A file type independent file uploader with file content preview (if
 * supported).
 * @property static:imageMimeTypeRegularExpression - Regular expression which
 * should match to each known image mime type.
 * @property static:textMimeTypeRegularExpression - Regular expression which
 * should match to each known text mime type.
 * @property static:videoMimeTypeRegularExpression - Regular expression which
 * should match to each known video mime type.
 *
 * @property attachmentTypeName - Current attachment type name.
 * @property change - File change event emitter.
 * @property delete - Event emitter which triggers its handler when current
 * file should be removed.
 * @property deleteButtonText - Text for button to trigger file removing.
 * @property downloadButtonText - Text for button to download current file.
 * @property file - Holds the current selected file object if present.
 * @property headerText - Header text to show instead of property description
 * or name.
 * @property showDeclarationText - Info text to click for more informations.
 * @property input - Virtual file input dom node.
 * @property internalName - Technical regular expression style file type.
 * @property keyCode - Mapping from key code to their description.
 * @property mapNameToField - Indicates whether current file name should be
 * mapped to a specific model property.
 * @property maximumSizeText - Maximum file size validation text.
 * @property minimumSizeText - Minimum file size validation text.
 * @property model - File property specification.
 * @property modelChange - Event emitter triggering when model changes happen.
 * @property name - Name or prefix of currently active file.
 * @property namePatternText - Name pattern validation text.
 * @property newButtonText - Text for button to trigger new file upload.
 * @property noFileText - Text to show if now file is selected.
 * @property noPreviewText - Text to show if no preview is available.
 * @property requiredText - Required file selection validation text.
 * @property revision - Revision of given model to show.
 * @property showValidationErrorMessages - Indicates whether validation errors
 * should be displayed. Useful to hide error messages until user tries to
 * submit a form.
 * @property synchronizeImmediately - Indicates whether file upload should be
 * done immediately after a file was selected (or synchronously with other
 * model data).
 * @property typePatternText - File type validation text.
 *
 * @property _data - Holds the data service instance.
 * @property _deletedName - Holds the deleted model field name.
 * @property _domSanitizer - Holds the dom sanitizer service instance.
 * @property _extendObject - Holds the extend object pipe instance's transform
 * method.
 * @property _getFilenameByPrefix - Holds the file name by prefix getter pipe
 * instance's transform method.
 * @property _idIsObject - Indicates whether the model document specific id is
 * provided as object and "value" named property or directly.
 * @property _idName - Name if id field.
 * @property _representObject - Holds the represent object pipe instance's
 * transform method.
 * @property _revisionName - Name if revision field.
 * @property _stringFormat - Saves the string formatting pips transformation
 * function.
 * @property _typeName - Name of type field.
 * @property _prefixMatch - Holds the prefix match pipe instance's transform
 * method.
 */
export class FileInputComponent/* implements AfterViewInit, OnChanges */ {
    static imageMimeTypeRegularExpression:RegExp = new RegExp(
        '^image/(?:p?jpe?g|png|svg(?:\\+xml)?|vnd\\.microsoft\\.icon|gif|' +
        'tiff|webp|vnd\\.wap\\.wbmp|x-(?:icon|jng|ms-bmp))$')
    static textMimeTypeRegularExpression:RegExp = new RegExp(
        '^(?:application/xml)|(?:text/(?:plain|x-ndpb[wy]html|(?:x-)?csv))$')
    static videoMimeTypeRegularExpression:RegExp = new RegExp(
        '^video/(?:(?:x-)?(?:x-)?webm|3gpp|mp2t|mp4|mpeg|quicktime|' +
        '(?:x-)?flv|(?:x-)?m4v|(?:x-)mng|x-ms-as|x-ms-wmv|x-msvideo)|' +
        '(?:application/(?:x-)?shockwave-flash)$')

    attachmentTypeName:string
    @Output() delete:EventEmitter<string> = new EventEmitter()
    @Input() deleteButtonText:string = 'delete'
    @Input() downloadButtonText:string = 'download'
    file:any = null
    @Output() fileChange:EventEmitter<any> = new EventEmitter()
    @Input() headerText:?string = null
    @Input() resetNameText:string = '×'
    @Input() saveNameText:string = '✓'
    @Input() showDeclarationText:string = 'ℹ'
    @ViewChild('input') input:ElementRef
    internalName:string
    keyCode:{[key:string]:number}
    @Input() mapNameToField:?string|?Array<string> = null
    @Input() maximumSizeText:string =
        'Filesize (${file.length} byte) is more than specified maximum of ' +
        '${model.maximumSize} byte.'
    @Input() minimumSizeText:string =
        'Filesize (${file.length} byte) is less than specified minimum of ' +
        '${model.minimumSize} byte.'
    @Input() model:{id:?string;[key:string]:any;}
    @Output() modelChange:EventEmitter<{
        id:?string;[key:string]:any;
    }> = new EventEmitter()
    @Input() name:?string = null
    @Input() namePatternText:string =
        'Given filename "${file.name}" doesn\'t match specified pattern "' +
        '${internalName}".'
    @Input() newButtonText:string = 'new'
    @Input() noFileText:string = ''
    @Input() noPreviewText:string = ''
    @Input() requiredText:string = 'Please select a file.'
    @Input() revision:?string = null
    @Input() showValidationErrorMessages:boolean = false
    @Input() synchronizeImmediately:boolean|PlainObject = false
    @Input() typePatternText:string =
        'Filetype "${file.content_type}" doesn\'t match specified pattern "' +
        '${model.contentTypeRegularExpressionPattern}".'

    _configuration:PlainObject
    _data:DataService
    _deletedName:string
    _domSanitizer:DomSanitizer
    _extendObject:Function
    _getFilenameByPrefix:Function
    _idIsObject:boolean = false
    _idName:string
    _representObject:Function
    _revisionName:string
    _stringFormat:Function
    _typeName:string
    _prefixMatch:boolean = false
    /**
     * Sets needed services as property values.
     * @param data - Injected data service instance.
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param getFilenameByPrefixPipe - Saves the file name by prefix retriever
     * pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param representObjectPipe - Saves the object to string representation
     * pipe instance.
     * @param stringFormatPipe - Saves the string formation pipe instance.
     * @param tools - Tools service instance.
     * @returns Nothing.
     */
    constructor(
        data:DataService, domSanitizer:DomSanitizer,
        extendObjectPipe:ExtendObjectPipe,
        getFilenameByPrefixPipe:GetFilenameByPrefixPipe,
        initialData:InitialDataService,
        representObjectPipe:RepresentObjectPipe,
        stringFormatPipe:StringFormatPipe, tools:ToolsService
    ):void {
        this.keyCode = tools.tools.keyCode
        this._configuration = initialData.configuration
        this._data = data
        this._deletedName =
            this._configuration.database.model.property.name.special.deleted
        this._domSanitizer = domSanitizer
        this._extendObject = extendObjectPipe.transform.bind(
            extendObjectPipe)
        this._getFilenameByPrefix = getFilenameByPrefixPipe.transform.bind(
            getFilenameByPrefixPipe)
        this._idName =
            this._configuration.database.model.property.name.special.id
        this._revisionName =
            this._configuration.database.model.property.name.special.revision
        this._typeName =
            this._configuration.database.model.property.name.special.type
        this._representObject = representObjectPipe.transform.bind(
            representObjectPipe)
        this._stringFormat = stringFormatPipe.transform.bind(stringFormatPipe)
        this.attachmentTypeName =
            this._configuration.database.model.property.name.special.attachment
        this.model = {[this.attachmentTypeName]: {}, id: null}
    }
    /**
     * Determines which type of file we have to present.
     * @returns Nothing.
     */
    determinePresentationType():void {
        if (this.file && this.file.content_type)
            if (this.constructor.textMimeTypeRegularExpression.test(
                this.file.content_type
            ))
                this.file.type = 'text'
            else if (this.constructor.imageMimeTypeRegularExpression.test(
                this.file.content_type
            ))
                this.file.type = 'image'
            else if (this.constructor.videoMimeTypeRegularExpression.test(
                this.file.content_type
            ))
                this.file.type = 'video'
            else
                this.file.type = 'binary'
    }
    /**
     * Initializes file upload handler.
     * @param changes - Holds informations about changed bound properties.
     * @returns Nothing.
     */
    async ngOnChanges(changes:Object):Promise<void> {
        if (typeof this.model[this._idName] === 'object')
            this._idIsObject = true
        if (changes.hasOwnProperty(
            'mapNameToField'
        ) && this.mapNameToField && !Array.isArray(this.mapNameToField))
            this.mapNameToField = [this.mapNameToField]
        if (changes.hasOwnProperty('model') || changes.hasOwnProperty(
            'name'
        )) {
            this.internalName = this._getFilenameByPrefix(
                this.model[this.attachmentTypeName], this.name)
            if (
                this.name && this.internalName &&
                this.internalName !== this.name
            )
                this._prefixMatch = true
            this.model[this.attachmentTypeName][this.internalName].state = {}
            this.file = this.model[this.attachmentTypeName][
                this.internalName
            ].value
            if (this.file)
                this.file.initialName = this.file.name
            else if (!this.model[this.attachmentTypeName][
                this.internalName
            ].nullable)
                this.model[this.attachmentTypeName][
                    this.internalName
                ].state.errors = {required: true}
        }
        if (changes.hasOwnProperty('model') || changes.hasOwnProperty(
            'name'
        ) || changes.hasOwnProperty('revision')) {
            if (this.file) {
                this.file.query = `?version=${this.file.digest}`
                /*
                    NOTE: Only set new file source if isn't already present to
                    prevent to download an immediately uploaded file and grab
                    and older cached one.
                */
                if (!this.file.source) {
                    const id:any = this._idIsObject ? this.model[
                        this._idName
                    ].value : this.model[this._idName]
                    if (
                        this.revision &&
                        changes.revision.currentValue !==
                        changes.revision.previousValue
                    )
                        try {
                            await this.retrieveAttachment(
                                id, {rev: this.revision})
                        } catch (error) {
                            model[attachmentTypeName][
                                internalName
                            ].state.errors.database = (
                                'message' in error
                            ) ? error.message : this._representObject(error)
                            return
                        }
                    else
                        this.file.source =
                            this._domSanitizer.bypassSecurityTrustResourceUrl(
                                this._stringFormat(
                                    this._configuration.database.url, ''
                                ) + '/' + (
                                    this._configuration.name || 'generic'
                                ) + `/${id}/${this.file.name}` +
                                `${this.file.query}`)
                }
            }
            this.determinePresentationType()
            this.modelChange.emit(this.model)
            this.fileChange.emit(this.file)
        }
    }
    /**
     * Initializes current file input field. Adds needed event observer.
     * @returns Nothing.
     */
    ngAfterViewInit():void {
        this.input.nativeElement.addEventListener('change', ():void => {
            if (this.input.nativeElement.files.length > 0) {
                this.file = {
                    /* eslint-disable camelcase */
                    // IgnoreTypeCheck
                    content_type: this.input.nativeElement.files[0].type ||
                        'text/plain',
                    /* eslint-enable camelcase */
                    // IgnoreTypeCheck
                    data: this.input.nativeElement.files[0],
                    initialName: this.input.nativeElement.files[0].name,
                    // IgnoreTypeCheck
                    length: this.input.nativeElement.files[0].size,
                    name: this.input.nativeElement.files[0].name
                }
                this.update(this.file ? this.file.name : null)
            }
        })
    }
    /**
     * Removes current file.
     * @returns A Promise which will be resolved after current file will be
     * removed.
     */
    async remove():Promise<void> {
        if (this.synchronizeImmediately && this.file) {
            let result:PlainObject
            const update:PlainObject = {
                [this._typeName]: this.model[this._typeName],
                [this._idName]: this._idIsObject ? this.model[
                    this._idName
                ].value : this.model[this._idName],
                [this._revisionName]: this.model[this._revisionName]
            }
            if (this.mapNameToField && this.mapNameToField.includes(
                this._idName
            ))
                update[this._deletedName] = true
            else
                update[this.attachmentTypeName] = {[this.file.name]: {
                    /* eslint-disable camelcase */
                    content_type: 'text/plain',
                    /* eslint-enable camelcase */
                    data: null
                }}
            try {
                result = await this._data.put(update)
            } catch (error) {
                this.model[this.attachmentTypeName][
                    this.internalName
                ].state.errors = {database: (
                    'message' in error
                ) ? error.message : this._representObject(error)}
                return
            }
            if (this.mapNameToField && this.mapNameToField.includes(
                this._idName
            ))
                this.delete.emit(result)
            else
                this.model[this._revisionName] = result.rev
        }
        this.model[this.attachmentTypeName][this.internalName].state.errors =
            this.model[this.attachmentTypeName][this.internalName].value =
                this.file = null
        if (!this.model[this.attachmentTypeName][this.internalName].nullable)
            this.model[this.attachmentTypeName][this.internalName].state
                .errors = {required: true}
        this.modelChange.emit(this.model)
        this.fileChange.emit(this.file)
    }
    /**
     * Renames current file.
     * @param name - New name to rename current file to.
     * @returns A Promise which will be resolved after current file will be
     * renamed.
     */
    async rename(name:string):Promise<void> {
        const id:any = this._idIsObject ? this.model[
            this._idName
        ].value : this.model[this._idName]
        const oldName:string = this.file.name
        if (
            this.file.stub && this.mapNameToField && id &&
            this.mapNameToField.includes(this._idName)
        )
            try {
                await this.retrieveAttachment(id)
            } catch (error) {
                this.model[this.attachmentTypeName][
                    this.internalName
                ].state.errors = {database: (
                    'message' in error
                ) ? error.message : this._representObject(error)}
                return
            }
        this.file.name = name
        return this.update(oldName)
    }
    /**
     * Retrieves current attachment with given document id and converts them
     * into a base 64 string which will be set as file source.
     * @param id - Document id which should hold needed attachment.
     * @param options - Options to use for the attachment retrieving.
     * @returns A promise which resolves if requested attachment was retrieved.
     */
    async retrieveAttachment(id:any, options:PlainObject = {}):Promise<void> {
        const file:Object = await this._data.getAttachment(
            id, this.file.name, options)
        this.file = {
            /* eslint-disable camelcase */
            content_type: file.type || 'text/plain',
            /* eslint-enable camelcase */
            data: await blobToBase64String(file),
            length: file.size,
            name: this.file.name
        }
        this.file.source = this._domSanitizer.bypassSecurityTrustResourceUrl(
            `data:${this.file.content_type};base64,${this.file.data}`)
    }
    /**
     * Updates given current file into database (replaces if old name is
     * given).
     * @param oldName - Name of saved file to update or replace.
     * @returns A Promise which will be resolved after current file will be
     * synchronized.
     */
    async update(oldName:?string):Promise<void> {
        this.model[this.attachmentTypeName][this.internalName].state = {}
        if (this._prefixMatch) {
            const lastIndex:number = this.file.name.lastIndexOf('.')
            if ([0, -1].includes(lastIndex))
                this.file.name = this.name
            else
                this.file.name = this.name + this.file.name.substring(
                    lastIndex)
        }
        this.model[this.attachmentTypeName][
            this.internalName
        ].value = this.file
        // region determine errors
        if (!this.model[this.attachmentTypeName][
            this.internalName
        ].state.errors)
            this.model[this.attachmentTypeName][
                this.internalName
            ].state.errors = {}
        if (!(new RegExp(this.internalName)).test(this.file.name))
            this.model[this.attachmentTypeName][
                this.internalName
            ].state.errors = {name: true}
        if (!(
            [undefined, null].includes(this.model[
                this.attachmentTypeName
            ][this.internalName].contentTypeRegularExpressionPattern) || (
                new RegExp(this.model[this.attachmentTypeName][
                    this.internalName
                ].contentTypeRegularExpressionPattern)
            ).test(this.file.content_type)
        ))
            this.model[this.attachmentTypeName][
                this.internalName
            ].state.errors.contentType = true
        if (!(
            [undefined, null].includes(this.model[
                this.attachmentTypeName
            ][this.internalName].minimumSize) || this.model[
                this.attachmentTypeName
            ][this.internalName].minimumSize <= this.file.length
        ))
            this.model[this.attachmentTypeName][
                this.internalName
            ].state.errors.minimuSize = true
        if (!(
            [undefined, null].includes(this.model[
                this.attachmentTypeName
            ][this.internalName].maximumSize) || this.model[
                this.attachmentTypeName
            ][this.internalName].maximumSize >= this.file.length
        ))
            this.model[this.attachmentTypeName][
                this.internalName
            ].state.errors.maximumSize = true
        if (Object.keys(this.model[this.attachmentTypeName][
            this.internalName
        ].state.errors).length === 0)
            delete this.model[this.attachmentTypeName][this.internalName]
                .state.errors
        // endregion
        if (this.synchronizeImmediately && !this.model[
            this.attachmentTypeName
        ][this.internalName].state.errors) {
            let newData:PlainObject = {
                [this._typeName]: this.model[this._typeName],
                [this._idName]: this._idIsObject ? this.model[
                    this._idName
                ].value : this.model[this._idName]
            }
            if (this.synchronizeImmediately !== true)
                this._extendObject(
                    true, newData, this.synchronizeImmediately)
            let id:any = this._idIsObject ? this.model[
                this._idName
            ].value : this.model[this._idName]
            // NOTE: We want to replace old medium.
            if (oldName && oldName !== this.file.name && !(
                this.mapNameToField && id &&
                this.mapNameToField.includes(this._idName)
            ))
                newData[this.attachmentTypeName] = {[oldName]: {data: null}}
            if (![undefined, null].includes(this.model[this._revisionName]))
                newData[this._revisionName] = this.model[
                    this._revisionName]
            const tasks:Array<PlainObject> = []
            if (this.mapNameToField) {
                if (
                    id && id !== this.file.name &&
                    this.mapNameToField.includes(this._idName)
                ) {
                    newData[this._deletedName] = true
                    tasks.unshift(newData)
                    newData = this._extendObject(
                        true, {}, newData, {[this._deletedName]: false})
                }
                for (const name:string of this.mapNameToField) {
                    newData[name] = this.file.name
                    if (name === this._idName && this._idIsObject)
                        this.model[name].value = this.file.name
                    else
                        this.model[name] = this.file.name
                }
            }
            newData[this._revisionName] = 'upsert'
            newData[this.attachmentTypeName] = {[this.file.name]: {
                /* eslint-disable camelcase */
                content_type: this.file.content_type,
                /* eslint-enable camelcase */
                data: this.file.data
            }}
            tasks.unshift(newData)
            let result:Array<PlainObject>
            try {
                result = await this._data.bulkDocs(tasks)
            } catch (error) {
                this.model[this.attachmentTypeName][
                    this.internalName
                ].state.errors = {database: (
                    'message' in error
                ) ? error.message : this._representObject(error)}
                return
            }
            id = newData[this._idName]
            let revision:string
            for (const item:PlainObject of result) {
                if (item.error) {
                    this.model[this.attachmentTypeName][
                        this.internalName
                    ].state.errors = {database: item.message}
                    return
                }
                if (item.id === id)
                    revision = item.rev
            }
            if (this.file) {
                this.file.revision = this.model[this._revisionName] = revision
                this.file.query = `?rev=${revision}`
                this.file.source =
                    this._domSanitizer.bypassSecurityTrustResourceUrl(
                        this._stringFormat(
                            this._configuration.database.url, ''
                        ) + `/${this._configuration.name}/${id}/` +
                        `${this.file.name}${this.file.query}`)
                this.determinePresentationType()
            }
            this.modelChange.emit(this.model)
            this.fileChange.emit(this.file)
        } else if (this.file.data) {
            this.determinePresentationType()
            const fileReader:FileReader = new FileReader()
            fileReader.onload = (event:Object):void => {
                this.file.digest = (new Date()).getTime()
                this.file.source =
                    this._domSanitizer.bypassSecurityTrustResourceUrl(
                        event.target.result)
                if (this.mapNameToField)
                    for (const name:string of this.mapNameToField)
                        this.model[name] = this.file.name
                this.modelChange.emit(this.model)
                this.fileChange.emit(this.file)
            }
            fileReader.readAsDataURL(this.file.data)
        }
    }
}
// / endregion
// / region pagination
/* eslint-disable max-len */
// IgnoreTypeCheck
@Component({
    animations: [defaultAnimation()],
    selector: 'generic-pagination',
    template: `
        <ul @defaultAnimation *ngIf="lastPage > 1">
            <li @defaultAnimation *ngIf="page > 2">
                <a href="" (click)="change($event, 1)">--</a>
            </li>
            <li @defaultAnimation *ngIf="page > 1">
                <a href="" (click)="change($event, previousPage)">-</a>
            </li>
            <li
                class="page-{{currentPage}}"
                @defaultAnimation
                [ngClass]="{current: currentPage === page, previous: currentPage === previousPage, next: currentPage === nextPage, even: even, 'even-page': currentPage % 2 === 0, first: currentPage === firstPage, last: currentPage === lastPage}"
                *ngFor="let currentPage of pagesRange;let even = even"
            >
                <a (click)="change($event, currentPage)" href="">
                    {{currentPage}}
                </a>
            </li>
            <li @defaultAnimation *ngIf="lastPage > page">
                <a href="" (click)="change($event, nextPage)">+</a>
            </li>
            <li @defaultAnimation *ngIf="lastPage > page + 1">
                <a href="" (click)="change($event, lastPage)">++</a>
            </li>
        </ul>
    `
})
/* eslint-enable max-len */
/**
 * Provides a generic pagination component.
 * @property itemsPerPage - Number of items to show per page as maximum.
 * @property page - Contains currently selected page number.
 * @property pageChange - Event emitter to fire on each page change event.
 * @property pageRangeLimit - Number of concrete page links to show.
 * @property total - Contains total number of pages.
 *
 * @property _makeRangePipe - Saves the make range pipe transformation
 * function.
 */
export class PaginationComponent {
    @Input() itemsPerPage:number = 20
    @Input() page:number = 1
    @Output() pageChange:EventEmitter<number> = new EventEmitter()
    @Input() pageRangeLimit:number = 4
    @Input() total:number = 0

    _makeRange:Function
    /**
     * Sets needed services as property values.
     * @param makeRangePipe - Saves the make range pipe instance.
     * @returns Nothing.
     */
    constructor(makeRangePipe:ArrayMakeRangePipe):void {
        this._makeRange = makeRangePipe.transform.bind(makeRangePipe)
    }
    /**
     * Is called whenever a page change should be performed.
     * @param event - The responsible event.
     * @param newPage - New page number to change to.
     * @returns Nothing.
     */
    change(event:Object, newPage:number):void {
        event.preventDefault()
        this.page = newPage
        this.pageChange.emit(this.page)
    }
    /**
     * Determines the highest page number.
     * @returns The determines page number.
     */
    get lastPage():number {
        return Math.ceil(this.total / this.itemsPerPage)
    }
    /**
     * Retrieves the next or last (if last is current) page.
     * @returns The new determined page number.
     */
    get nextPage():number {
        return Math.min(this.page + 1, this.lastPage)
    }
    /**
     * Determines the number of pages to show.
     * @returns A list of page numbers.
     */
    get pagesRange():Array<number> {
        if (this.page - this.pageRangeLimit < 1) {
            const start:number = 1
            const startRest:number = this.pageRangeLimit - (this.page - start)
            const end:number = Math.min(
                this.lastPage, this.page + this.pageRangeLimit + startRest
            )
            return this._makeRange([start, end])
        }
        const end:number = Math.min(
            this.lastPage, this.page + this.pageRangeLimit)
        const endRest:number = this.pageRangeLimit - (end - this.page)
        const start:number = Math.max(
            1, this.page - this.pageRangeLimit - endRest)
        return this._makeRange([start, end])
    }
    /**
     * Determines the previous or first (if first is current) page.
     * @returns The previous determined page number.
     */
    get previousPage():number {
        return Math.max(1, this.page - 1)
    }
}
// / endregion
// endregion
// region module
export const determineExports:Function = (module:Object):Array<Object> =>
    Object.keys(module.exports).filter((name:string):boolean =>
        !name.startsWith('Abstract') &&
        ['Component', 'Directive', 'Pipe'].some((suffix:string):boolean =>
            name.endsWith(suffix))
    ).map((name:string):Object => module.exports[name])
export const determineDeclarations:Function = (module:Object):Array<Object> =>
    determineExports(module).concat(Object.keys(module.exports).filter((
        name:string
    ):boolean => !name.startsWith('Abstract') && ['Accessor'].some(
        (suffix:string):boolean => name.endsWith(suffix)
    )).map((name:string):Object => module.exports[name]))
export const determineProviders:Function = (module:Object):Array<Object> =>
    Object.keys(module.exports).filter((name:string):boolean =>
        !name.startsWith('Abstract') && (
            name.endsWith('Resolver') || name.endsWith('Pipe') ||
            name.endsWith('Guard') || name.endsWith('Service')
        )
    ).map((name:string):Object => module.exports[name])
// IgnoreTypeCheck
@NgModule({
    declarations: determineDeclarations(module),
    entryComponents: [ConfirmComponent],
    exports: determineExports(module),
    imports: [
        BrowserModule.withServerTransition({appId: 'generic-universal'}),
        FormsModule,
        MdButtonModule,
        MdCardModule,
        MdDialogModule,
        MdInputModule,
        MdSelectModule,
        MdTooltipModule,
        TinyMceModule.forRoot(TINY_MCE_DEFAULT_OPTIONS)
    ],
    providers: determineProviders(module).concat({
        deps: [DataService],
        multi: true,
        provide: APP_INITIALIZER,
        useFactory: (data:DataService):Function => ():Promise<void> =>
            data.initialize()
    })
})
/**
 * Represents the importable angular module.
 */
export default class Module {}
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
