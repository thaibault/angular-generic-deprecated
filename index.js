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
    /* AfterViewInit,*/ ChangeDetectorRef, Component, Directive, ElementRef,
    EventEmitter, forwardRef, Injectable, Injector, Input, NgModule,
    /* OnInit,*/ Output, Pipe, PipeTransform, ReflectiveInjector, Renderer,
    ViewChild
} from '@angular/core'
import {
    DefaultValueAccessor, FormsModule, NG_VALUE_ACCESSOR
} from '@angular/forms'
import {MdCardModule, MdInputModule, MdSelectModule} from '@angular/material'
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
// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register')
} catch (error) {}
// endregion
let LAST_KNOWN_DATA:{data:PlainObject;sequence:number|string} = {
    data: {}, sequence: 'now'
}
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
    configuration:PlainObject
    /**
     * Sets all properties of given initial data as properties to this
     * initializing instance.
     * @param tools - Saves the generic tools service.
     * @returns Nothing.
     */
    constructor(tools:ToolsService):void {
        for (const key:string in tools.globalContext.genericInitialData)
            if (tools.globalContext.genericInitialData.hasOwnProperty(key))
                // IgnoreTypeCheck
                this[key] = tools.globalContext.genericInitialData[key]
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
const RepresentObjectPipe:PipeTransform = module.exports.RepresentObjectPipe
const StringCapitalizePipe:PipeTransform = module.exports.StringCapitalizePipe
const StringEscapeRegularExpressionsPipe:PipeTransform =
    module.exports.StringEscapeRegularExpressionsPipe
const StringFormatPipe:PipeTransform = module.exports.StringFormatPipe
// / endregion
// / region object
// IgnoreTypeCheck
@Pipe({name: 'genericExtractRawData'})
/**
 * Removes all meta data from documents.
 * @property configuration - Initial given configuration object.
 * @property equals - Equals pipe transform function.
 */
export class ExtractRawDataPipe/* implements PipeTransform*/ {
    configuration:PlainObject
    equals:Function
    /**
     * Gets injected services.
     * @param equalsPipe - Equals pipe service instance.
     * @param initialData - Initial data service instance.
     */
    constructor(
        equalsPipe:EqualsPipe, initialData:InitialDataService
    ):void {
        this.configuration = initialData.configuration
        this.equals = equalsPipe.transform.bind(equalsPipe)
    }
    /**
     * Converts all (nested) date object in given data structure to their
     * corresponding utc timestamps in milliseconds.
     * @param value - Given data structure to convert.
     * @returns Given converted object.
     */
    static _convertDateToTimestampRecursively(value:any):any {
        if (typeof value === 'object' && value !== null)
            if (value instanceof Date)
                // NOTE: We save given date as an utc timestamp.
                return Date.UTC(
                    value.getUTCFullYear(),
                    value.getUTCMonth(),
                    value.getUTCDate(),
                    value.getUTCHours(),
                    value.getUTCMinutes(),
                    value.getUTCSeconds(),
                    value.getUTCMilliseconds())
            else if (Array.isArray(value)) {
                const result:Array<any> = []
                for (const subValue:any of value)
                    result.push(ExtractRawDataPipe
                        ._convertDateToTimestampRecursively(subValue))
                return result
            } else if (Object.getPrototypeOf(value) === Object.prototype) {
                const result:PlainObject = {}
                for (const name:string in value)
                    if (value.hasOwnProperty(name))
                        result[name] = ExtractRawDataPipe
                            ._convertDateToTimestampRecursively(value[name])
                return result
            }
        return value
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
            if (oldAttachments.hasOwnProperty(type) && ![
                undefined, null
            ].includes(oldAttachments[type].value)) {
                if (newDocument[
                    this.configuration.database.model.property.name.special
                        .attachment
                ]) {
                    if (newDocument[
                        this.configuration.database.model.property.name.special
                            .attachment
                    ].hasOwnProperty(oldAttachments[type].value.name))
                        continue
                } else if (!untouchedAttachments.includes(
                    oldAttachments[type].value.name
                )) {
                    newDocument[
                        this.configuration.database.model.property.name.special
                            .attachment
                    ] = {[oldAttachments[type].value.name]: {data: null}}
                    continue
                }
                if (fileTypeReplacement)
                    for (const fileName:string in newDocument[
                        this.configuration.database.model.property.name.special
                            .attachment
                    ])
                        if (newDocument[
                            this.configuration.database.model.property.name
                                .special.attachment
                        ].hasOwnProperty(
                            fileName
                        ) && (new RegExp(type)).test(fileName))
                            newDocument[
                                this.configuration.database.model.property.name
                                    .special.attachment
                            ][oldAttachments[type].value.name] = {data: null}
            }
        return newDocument
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
        oldDocument = this.constructor._convertDateToTimestampRecursively(
            oldDocument)
        newDocument = this.constructor._convertDateToTimestampRecursively(
            newDocument)
        const specialNames:PlainObject =
            this.configuration.database.model.property.name.special
        const result:PlainObject = {}
        const untouchedAttachments:Array<string> = []
        /*
            Add all needed values in new document (respect only values in model
            if present).
        */
        for (const name:string in newDocument)
            if (newDocument.hasOwnProperty(name) && ![
                undefined, null, ''
            ].includes(newDocument[name]) && (
                this.configuration.database.model.property.name.reserved
                    .concat(
                        specialNames.deleted,
                        specialNames.id,
                        specialNames.revision,
                        specialNames.type
                    ).includes(name) ||
            ![
                specialNames.allowedRole,
                specialNames.constraint.execution,
                specialNames.constraint.expression,
                specialNames.extend,
                specialNames.revisionsInformations,
                specialNames.revisions,
                specialNames.validatedDocumentsCache
            ].includes(name) && (!(
                specialNames.type in newDocument
            ) || this.configuration.database.model.entities[newDocument[
                specialNames.type
            ]].hasOwnProperty(name))))
                if (name === specialNames.attachment) {
                    result[name] = {}
                    let empty:boolean = true
                    for (const fileName:string in newDocument[name])
                        if (newDocument[name].hasOwnProperty(fileName)) {
                            let oldAttachment:?PlainObject
                            if (oldDocument && oldDocument.hasOwnProperty(
                                name
                            ))
                                for (const type:string in oldDocument[name])
                                    if (oldDocument[name][
                                        type
                                    ].value && oldDocument[name][
                                        type
                                    ].value.name === fileName)
                                        oldAttachment = oldDocument[name][
                                            type
                                        ].value
                            if (newDocument[name][fileName].hasOwnProperty(
                                'data'
                            ) && !(oldAttachment && newDocument[name][
                                fileName
                            ].length === oldAttachment.length && (
                                oldAttachment.content_type ||
                                'application/octet-stream'
                            ) === (newDocument[name][
                                fileName
                            ].content_type || 'application/octet-stream'))) {
                                result[name][fileName] = {
                                    content_type: newDocument[name][
                                        fileName
                                    ].content_type ||
                                    'application/octet-stream',
                                    data: newDocument[name][fileName].data
                                }
                                empty
                             = false
                            } else
                                untouchedAttachments.push(fileName)
                        }
                    if (empty)
                        delete result[name]
                } else
                    result[name] = newDocument[name]
        let payloadExists:boolean = false
        if (oldDocument) {
            /*
                Remove already existing values and mark removed or truncated
                values (respect values in model only if specified).
            */
            for (const name:string in oldDocument)
                if (oldDocument.hasOwnProperty(
                    name
                ) && !(this.configuration.database.model.property.name.reserved
                    .concat([
                        specialNames.allowedRole,
                        specialNames.attachment,
                        specialNames.constraint.execution,
                        specialNames.constraint.expression,
                        specialNames.deleted,
                        specialNames.extend,
                        specialNames.id,
                        specialNames.revision,
                        specialNames.revisionsInformation,
                        specialNames.revisions,
                        specialNames.type,
                        specialNames.validatedDocumentsCache
                    ]).includes(name) || [null, undefined].includes(
                        oldDocument[name].value)
                ) && (!(
                    specialNames.type in newDocument
                ) || this.configuration.database.model.entities[newDocument[
                    specialNames.type
                ]].hasOwnProperty(name)))
                    if (result.hasOwnProperty(name)) {
                        if (Array.isArray(result[name])) {
                            if (this.equals(result[name], oldDocument[
                                name
                            ].value))
                                delete result[name]
                        } else if (
                            typeof result[name] === 'object' &&
                            result[name] !== null &&
                            result[name].hasOwnProperty(specialNames.type)
                        ) {
                            result[name] = this.transform(
                                result[name], oldDocument[name],
                                fileTypeReplacement)
                            /*
                                NOTE: If only the type property is given we can
                                skip the key completely.
                            */
                            if (result[name] === null)
                                delete result[name]
                        } else if (this.equals(
                            result[name], oldDocument[name].value
                        ))
                            delete result[name]
                    } else {
                        payloadExists = true
                        result[name] = null
                    }
            // Handle attachment removes or replacements.
            if (oldDocument.hasOwnProperty(
                specialNames.attachment
            ) && oldDocument[specialNames]) {
                this._handleAttachmentChanges(result, oldDocument[
                    specialNames.attachment
                ], fileTypeReplacement, untouchedAttachments)
                if (specialNames.attachment in result)
                    payloadExists = true
            } else if (specialNames.attachment in result)
                payloadExists = true
        }
        // Check if real payload exists in currently determined raw data.
        if (!payloadExists)
            for (const name:string in result)
                if (result.hasOwnProperty(
                    name
                ) && !this.configuration.database.model.property.name.reserved
                    .concat(
                        specialNames.deleted,
                        specialNames.id,
                        specialNames.revision,
                        specialNames.type
                    ).includes(name)
                ) {
                    payloadExists = true
                    break
                }
        return payloadExists ? result : null
    }
}
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
// IgnoreTypeCheck
@Injectable()
/**
 * A generic database connector.
 * @property static:revisionNumberRegularExpression - Compiled regular
 * expression to retrieve revision number from revision hash.
 * @property static:wrappableMethodNames - Saves a list of method names which
 * can be intercepted.
 * @property connection - The current database connection instance.
 * @property database - The entire database constructor.
 * @property extendObject - Holds the extend object's pipe transformation
 * method.
 * @property middlewares - Mapping of post and pre callback arrays to trigger
 * before or after each database transaction.
 * @property synchronisation - This synchronisation instance represents the
 * active synchronisation process if a local offline database is in use.
 * @property stringFormat - Holds the string format's pipe transformation
 * method.
 */
export class DataService {
    static revisionNumberRegularExpression:RegExp = /^([0-9]+)-/
    static wrappableMethodNames:Array<string> = [
        'allDocs', 'bulkDocs', 'bulkGet', 'changes', 'close', 'compact',
        'compactDocument', 'createIndex', 'deleteIndexs', 'destroy', 'find',
        'get', 'getAttachment', 'getIndexes', 'info', 'post', 'put',
        'putAttachment', 'query', 'remove', 'removeAttachment', 'sync']
    connection:PouchDB
    configuration:PlainObject
    database:PouchDB
    extendObject:Function
    middlewares:{
        pre:{[key:string]:Array<Function>};
        post:{[key:string]:Array<Function>};
    } = {
        post: {},
        pre: {}
    }
    stringFormat:Function
    synchronisation:?Object
    /**
     * Creates the database constructor applies all plugins instantiates
     * the connection instance and registers all middlewares.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param stringFormatPipe - Injected string format pipe instance.
     * @returns Nothing.
     */
    constructor(
        extendObjectPipe:ExtendObjectPipe, initialData:InitialDataService,
        stringFormatPipe:StringFormatPipe
    ):void {
        this.database = PouchDB.plugin(PouchDBFindPlugin)
                               .plugin(PouchDBValidationPlugin)
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
        this.configuration = initialData.configuration
        if (this.configuration.database.hasOwnProperty('publicURL'))
            this.configuration.database.url =
                this.configuration.database.publicURL
        this.stringFormat = stringFormatPipe.transform.bind(stringFormatPipe)
        for (const plugin:Object of this.configuration.database.plugins || [])
            this.database = this.database.plugin(plugin)
        this.initialize()
    }
    /**
     * Initializes database connection and synchronisation if needed.
     * @returns Nothing.
     */
    initialize():void {
        const options:PlainObject = {}
        let type:string
        if (this.configuration.database.local)
            type = 'local'
        else {
            options.skip_setup = false
            type = this.stringFormat(this.configuration.database.url, '')
        }
        this.connection = new this.database(type + (/^[a-z]+:\/\/.+$/g.test(
            type
        ) ? `/${this.configuration.name || 'generic'}` : ''),
        this.extendObject(
            true, options, this.configuration.database.connector || {}))
        for (const name:string in this.connection)
            if (this.constructor.wrappableMethodNames.includes(
                name
            ) && typeof this.connection[name] === 'function') {
                const method:Function = this.connection[name]
                this.connection[name] = (...parameter:Array<any>):any => {
                    for (const methodName:string of [name, '_all'])
                        if (this.middlewares.pre.hasOwnProperty(methodName))
                            for (
                                const interceptor:Function of
                                this.middlewares.pre[methodName]
                            )
                                parameter = interceptor.apply(
                                    this.connection, parameter.concat(
                                        methodName === '_all' ? name : []))
                    let result:any = method.apply(this.connection, parameter)
                    for (const methodName:string of [name, '_all'])
                        if (this.middlewares.post.hasOwnProperty(methodName))
                            for (
                                const interceptor:Function of
                                this.middlewares.post[methodName]
                            )
                                result = interceptor.call(
                                    this.connection, result,
                                    ...parameter.concat(
                                        methodName === '_all' ? name : []))
                    return result
                }
            }
        this.connection.installValidationMethods()
        if (this.configuration.database.local)
            this.synchronisation = PouchDB.sync(this.stringFormat(
                this.configuration.database.url, ''
            ) + `/${this.configuration.name}`, 'local', {
                live: true, retry: true
            })
            .on('change', (info:Object):void => console.info('change', info))
            .on('paused', (error:Object):void => console.info('paused', error))
            .on('active', ():void => console.info('active'))
            .on('denied', (error:Object):void => console.warn('denied', error))
            .on('complete', (info:Object):void => console.info(
                'complete', info))
            .on('error', (error:Object):void => console.error('error', error))
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
    bulkDocs(...parameter:Array<any>):Promise<PlainObject> {
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
        const result:PlainObject = await this.connection.get(...parameter)
        if (parameter.length > 1 && typeof parameter[
            1
        ] === 'object' && parameter[1] !== null && parameter[1].hasOwnProperty(
            'rev'
        ) && parameter[1].rev === 'latest' &&
        LAST_KNOWN_DATA.data.hasOwnProperty(result._id) && parseInt(
            result._rev.match(
                this.constructor.revisionNumberRegularExpression)[1]
        ) < parseInt(LAST_KNOWN_DATA.data[result._id]._rev.match(
            this.constructor.revisionNumberRegularExpression
        )[1]))
            return LAST_KNOWN_DATA.data[result._id]
        return result
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
}
// IgnoreTypeCheck
@Injectable()
/**
 * Auto generates a components scope environment for a specified model.
 * @property configuration - Holds the configuration service instance.
 * @property data - Holds the data exchange service instance.
 * @property extendObject - Holds the extend object's pipe transformation
 * method.
 * @property tools - Holds the tools class from the tools service.
 */
export class DataScopeService {
    configuration:PlainObject
    data:DataService
    extendObject:Function
    tools:typeof Tools
    /**
     * Saves alle needed services as property values.
     * @param data - Injected data service instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param tools - Injected tools service instance.
     * @returns Nothing.
     */
    constructor(
        data:DataService, extendObjectPipe:ExtendObjectPipe,
        initialData:InitialDataService, tools:ToolsService
    ):void {
        this.configuration = initialData.configuration
        this.data = data
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
        this.tools = tools.tools
    }
    /**
     * Retrieves needed data for given scope.
     * @param scope - Scope to use to determine which data is needed.
     * @returns Resolved data.
     */
    get(scope:Object):PlainObject {
        const result:PlainObject = {}
        for (const key:string in scope)
            if (
                scope.hasOwnProperty(key) && !key.startsWith('_') &&
                typeof scope[key] === 'object' && scope[key] !== null &&
                'hasOwnProperty' in scope && scope[key].hasOwnProperty('value')
            )
                result[key] = scope[key].value
        const specialNames:PlainObject =
            this.configuration.database.model.property.name.special
        const attachmentName:string = specialNames.attachment
        if (scope.hasOwnProperty(attachmentName) && scope[attachmentName])
            for (const key:string in scope[attachmentName])
                if (scope[attachmentName].hasOwnProperty(key) && typeof scope[
                    attachmentName
                ][key] === 'object' && scope[attachmentName][
                    key
                ] !== null && 'hasOwnProperty' in scope[
                    attachmentName
                ] && scope[attachmentName][key].hasOwnProperty(
                    'value'
                ) && scope[attachmentName][key].value) {
                    if (!result[attachmentName])
                        result[attachmentName] = {}
                    result[attachmentName][scope[attachmentName][
                        key
                    ].value.name] = scope[attachmentName][key].value
                }
        for (const name:string of this.configuration.database.model.property
            .name.reserved.concat(
                specialNames.deleted,
                specialNames.id,
                specialNames.revision,
                specialNames.type
            )
        )
            if (scope.hasOwnProperty(name))
                result[name] = scope[name]
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
     * @returns The generated scope object.
     */
    generate(
        modelName:string, propertyNames:?Array<string> = null,
        data:PlainObject = {}
    ):PlainObject {
        const modelSpecification:PlainObject =
            this.configuration.database.model.entities[modelName]
        for (const name:string in modelSpecification)
            if (modelSpecification.hasOwnProperty(name))
                if (name === this.configuration.database.model.property.name
                    .special.attachment
                ) {
                    for (const fileName:string in modelSpecification[name])
                        if (modelSpecification[name].hasOwnProperty(fileName))
                            modelSpecification[name][fileName] =
                                this.extendObject(
                                    true, this.tools.copyLimitedRecursively(
                                        this.configuration.database.model
                                            .property.defaultSpecification
                                    ), modelSpecification[name][fileName])
                } else
                    modelSpecification[name] = this.extendObject(
                        true, this.tools.copyLimitedRecursively(
                            this.configuration.database.model.property
                                .defaultSpecification,
                        ), modelSpecification[name])
        if (!propertyNames)
            propertyNames = Object.keys(modelSpecification)
        const result:PlainObject = {}
        for (const name:string of propertyNames) {
            if (modelSpecification.hasOwnProperty(name))
                result[name] = this.tools.copyLimitedRecursively(
                    modelSpecification[name])
            else
                result[name] = {}
            if (name === this.configuration.database.model.property.name
                .special.attachment
            ) {
                for (const type:string in modelSpecification[name])
                    if (modelSpecification[name].hasOwnProperty(type)) {
                        result[name][type].name = type
                        result[name][type].value = null
                        if (Object.keys(data).length === 0)
                            for (const hookType:string of [
                                'onCreateExpression', 'onCreateExecution'
                            ])
                                if (result[name][type].hasOwnProperty(
                                    hookType
                                ) && result[name][type][hookType]) {
                                    result[name][type].value = (new Function(
                                        'newDocument', 'oldDocument',
                                        'userContext', 'securitySettings',
                                        'name', 'models', 'modelConfiguration',
                                        'serialize', 'modelName', 'model',
                                        'propertySpecification', (
                                            hookType.endsWith(
                                                'Expression'
                                            ) ? 'return ' : ''
                                        ) + result[name][type][hookType]
                                    ))(
                                        data, null, {}, {}, type,
                                        this.configuration.database.model
                                            .entities,
                                        modelSpecification, (
                                            object:Object
                                        ):string => JSON.stringify(
                                            object, null, 4
                                        ), modelName, modelSpecification,
                                        result[name][type])
                                    if (result[name][type].hasOwnProperty(
                                        'value'
                                    ) && result[name][type].value === undefined
                                    )
                                        delete result[name][type].value
                                }
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
                        if (result[name].hasOwnProperty(type) && result[name][
                            type
                        ]) {
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
                                this.configuration.database.model.entities,
                                this.configuration.database.model,
                                (object:Object):string => JSON.stringify(
                                    object, null, 4
                                ), modelName, modelSpecification, result[name])
                            if (result[name].value === undefined)
                                result[name].value = null
                        }
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
                if (!(result[name].value instanceof Date) && (name.endsWith(
                    'Time'
                ) || name.endsWith('Date')))
                    // NOTE: We interpret given value as an utc timestamp.
                    result[name].value = new Date(result[name].value)
            }
        }
        for (const name:string of this.configuration.database.model.property
            .name.reserved.concat(
                this.configuration.database.model.property.name.special
                    .deleted,
                this.configuration.database.model.property.name.special.id,
                this.configuration.database.model.property.name.special
                    .revision,
                this.configuration.database.model.property.name.special
                    .revisionsInformation,
                this.configuration.database.model.property.name.special
                    .revisions,
                this.configuration.database.model.property.name.special.type)
        )
            if (data.hasOwnProperty(name))
                result[name] = data[name]
            else if (name === this.configuration.database.model.property.name
                .special.type
            )
                result[name] = modelName
        result._metaData = {submitted: false}
        return result
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
                    options.revs_info = true
            } else
                options.rev = revision
            try {
                data = await this.data.get(id, options)
            } catch (error) {
                throw new Error(
                    `Document with given id "${id}" and revision "` +
                    `${revision}" isn't available: ` +
                    this.tools.representObject(error))
            }
            if (revisionHistory) {
                let revisions:Array<PlainObject>
                let latestData:?PlainObject
                if (revision !== 'latest') {
                    delete options.rev
                    options.revs_info = true
                    try {
                        latestData = await this.data.get(id, options)
                    } catch (error) {
                        throw new Error(
                            `Document with given id "${id}" and revision "` +
                            `${revision}" isn't available: ` +
                            this.tools.representObject(error))
                    }
                    revisions = latestData[
                        this.configuration.database.model.property.name.special
                        .revisionsInformation]
                    delete latestData[
                        this.configuration.database.model.property.name.special
                        .revisionsInformation]
                } else
                    revisions = data[
                        this.configuration.database.model.property.name.special
                        .revisionsInformation]
                data[
                    this.configuration.database.model.property.name.special
                    .revisionsInformation
                ] = {}
                let first:boolean = true
                for (const item:PlainObject of revisions)
                    if (item.status === 'available') {
                        data[
                            this.configuration.database.model.property.name
                                .special.revisionsInformation
                        ][first ? 'latest' : item.rev] = {revision: item.rev}
                        first = false
                    }
                if (latestData)
                    data[
                        this.configuration.database.model.property.name.special
                        .revisionsInformation
                    ].latest.scope = this.generate(
                        modelName, propertyNames, latestData)
            }
        }
        return this.generate(modelName, propertyNames, data)
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
 * @property models - Saves a mapping from all available model names to their
 * specification.
 * @property relevantKeys - Saves a list of relevant key names to take into
 * account during resolving.
 * @property type - Model name to handle. Should be overwritten in concrete
 * implementations.
 */
export class AbstractResolver/* implements Resolve<PlainObject>*/ {
    data:PlainObject
    escapeRegularExpressions:Function
    extendObject:Function
    models:PlainObject
    relevantKeys:?Array<string> = null
    type:string = 'Item'
    typeName:string
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
        this.models = initialData.configuration.database.model.entities
        this.typeName = initialData.configuration.database.model.property.name
            .special.type
    }
    /**
     * List items which matches given filter criteria.
     * @param sort - List of items.
     * @param page - Page to show.
     * @param limit - Maximal number of entities to retrieve.
     * @param searchTerm - String query to search for.
     * @param additionalSelectors - Custom filter criteria.
     * @returns A promise wrapping retrieved data.
     */
    list(
        sort:Array<PlainObject> = [{_id: 'asc'}], page:number = 1,
        limit:number = 10, searchTerm:string = '',
        additionalSelectors:PlainObject = {}
    ):Promise<Array<PlainObject>> {
        if (!this.relevantKeys)
            this.relevantKeys = Object.keys(this.models[this.type]).filter((
                name:string
            ):boolean => !name.startsWith('_') && [
                undefined, 'string'
            ].includes(this.models[this.type][name].type))
        const selector:PlainObject = {[this.typeName]: this.type}
        if (searchTerm || Object.keys(additionalSelectors).length) {
            if (sort.length)
                selector[Object.keys(sort[0])[0]] = {$gt: null}
            selector.$or = []
            for (const name:string of this.relevantKeys)
                selector.$or.push({[name]: {$regex: searchTerm}})
        }
        /*
            NOTE: We can't use "limit" here since we want to provide total data
            set size for pagination.
        */
        const options:PlainObject = {skip: Math.max(page - 1, 0) * limit}
        if (options.skip === 0)
            delete options.skip
        if (sort.length)
            options.sort = [{[this.typeName]: 'asc'}].concat(sort)
        return this.data.find(this.extendObject(
            true, selector, additionalSelectors
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
 * @property extendObject - Holds the extend object's pipe transformation
 * @property model - Holds model informations including actual value and
 * metadata.
 * @property modelChange - Model event emitter emitting events on each model
 * change.
 * @property showValidationErrorMessages - Indicates whether validation errors
 * should be suppressed or be shown automatically. Useful to prevent error
 * component from showing error messages before the user has submit the form.
 */
export class AbstractInputComponent/* implements OnInit*/ {
    _extendObject:Function
    @Input() model:PlainObject = {}
    @Output() modelChange:EventEmitter = new EventEmitter()
    parseInt = parseInt
    parseFloat = parseFloat
    @Input() showValidationErrorMessages:boolean = false
    /**
     * Sets needed services as property values.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @returns Nothing.
     */
    constructor(extendObjectPipe:ExtendObjectPipe):void {
        this._extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
    }
    /**
     * Triggers after input values have been resolved.
     * @returns Nothing.
     */
    ngOnInit():void {
        this._extendObject(this.model, this._extendObject({
            disabled: false,
            maximum: Infinity,
            minimum: (this.model.type === 'string') ? 0 : -Infinity,
            nullable: true,
            regularExpressionPattern: '.*',
            state: {},
            type: 'string'
        }, this.model))
    }
    /**
     * Triggers when ever a change to current model happens inside this
     * component.
     * @param state - Saves the current model state.
     * @returns Nothing.
     */
    onChange(state:Object):void {
        this.model.state = state
        this.modelChange.emit(this.model)
    }
}
/**
 * Observes database for any data changes and triggers corresponding methods
 * on corresponding events.
 * @property static:_defaultLiveUpdateOptions - Options for database
 * observation.
 * @property actions - Array if actions which have happen.
 * @property _canceled - Indicates whether current view has been destroyed and
 * data observation should bee canceled.
 * @property _changeDetectorRef - Current views change detector reference
 * service instance.
 * @property _changesStream - Database observation representation.
 * @property _data - Data service instance.
 * @property _liveUpdateOptions - Options for database observation.
 * @property _stringCapitalize - String capitalize pipe transformation
 * function.
 */
export class AbstractLiveDataComponent/* implements OnDestroy, OnInit*/ {
    static _defaultLiveUpdateOptions:PlainObject = {
        heartbeat: 3000, include_docs: true, live: true, timeout: false}
    actions:Array<PlainObject> = []
    _canceled:boolean = false
    _changeDetectorRef:ChangeDetectorRef
    _changesStream:Object
    _data:DataService
    _liveUpdateOptions:PlainObject = {}
    _stringCapitalize:Function
    _tools:typeof Tools
    /**
     * Saves injected service instances as instance properties.
     * @param changeDetectorRef - Model dirty checking service.
     * @param data - Data stream service.
     * @param stringCapitalizePipe - The string capitalize pipe instance.
     * @param tools - The injected tools service instance.
     * @returns Nothing.
     */
    constructor(
        changeDetectorRef:ChangeDetectorRef, data:DataService,
        stringCapitalizePipe:StringCapitalizePipe, tools:ToolsService
    ):void {
        this._changeDetectorRef = changeDetectorRef
        this._data = data
        this._stringCapitalize = stringCapitalizePipe.transform.bind(
            stringCapitalizePipe)
        this._tools = tools.tools
    }
    /**
     * Initializes data observation when view has been initialized.
     * @returns Nothing.
     */
    ngOnInit():void {
        this._changesStream = this._data.connection.changes(
            this._tools.extendObject(
                {since: LAST_KNOWN_DATA.sequence},
                this.constructor._defaultLiveUpdateOptions,
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
                    this._changeDetectorRef.detectChanges()
            })
    }
    /**
     * Marks current live data observation as canceled and closes initially
     * requested update stream.
     * @returns Nothing.
     */
    ngOnDestroy():void {
        this._canceled = true
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
/**
 * A generic abstract component to edit, search, navigate and filter a list of
 * entities.
 * @property _currentParameter - Saves current route url parameter.
 * @property _itemPath - Routing path to a specific item.
 * @property _itemsPath - Routing path to the items overview.
 * @property _route - Current route configuration.
 * @property _router - Router service instance.
 * @property _toolsInstance - Instance of tools service instance property.
 * @property allItemsChecked - Indicates whether all currently selected items
 * are checked via select all selector.
 * @property items - Current list of visible items.
 * @property limit - Maximal number of visible items.
 * @property page - Current page number of each item list part.
 * @property regularExpression - Indicator whether searching via regular
 * expressions should be used.
 * @property searchTerm - Search string to filter visible item list.
 * @property searchTermStream - Search term stream which debounces and caches
 * search results.
 * @property selectedItems - List of currently selected items for group editing
 * purposes.
 * @property sort - Sorting informations.
 */
export class AbstractItemsComponent extends AbstractLiveDataComponent {
    _currentParameter:PlainObject
    _itemPath:string = 'item'
    _itemsPath:string = 'items'
    _route:ActivatedRoute
    _router:Router
    _toolsInstance:Tools
    allItemsChecked:boolean = false
    debouncedUpdate:Function
    items:Array<PlainObject>
    limit:number
    page:number
    regularExpression:boolean = false
    searchTerm:string = ''
    searchTermStream:Subject<string> = new Subject()
    selectedItems:Set<PlainObject> = new Set()
    sort:PlainObject = {_id: 'asc'}
    /**
     * Saves injected service instances as instance properties.
     * @param changeDetectorRef - Model dirty checking service.
     * @param data - Data stream service.
     * @param route - Current route configuration.
     * @param router - Injected router service instance.
     * @param stringCapitalizePipe - String capitalize pipe instance.
     * @param tools - Injected tools service instance.
     * @returns Nothing.
     */
    constructor(
        changeDetectorRef:ChangeDetectorRef, data:DataService,
        route:ActivatedRoute, router:Router,
        stringCapitalizePipe:StringCapitalizePipe, tools:ToolsService
    ):void {
        super(changeDetectorRef, data, stringCapitalizePipe, tools)
        this._route = route
        this._router = router
        // IgnoreTypeCheck
        this._toolsInstance = new tools.tools()
        /*
            NOTE: Parameter have to be read before data to ensure that all page
            constraints have been set correctly before item slicing.
        */
        this._route.params.subscribe((data:PlainObject):void => {
            this._currentParameter = data
            this.limit = parseInt(this._currentParameter.limit)
            this.page = parseInt(this._currentParameter.page)
            const match:Array<string> = /(regex|exact)-(.*)/.exec(
                this._currentParameter.searchTerm)
            if (match) {
                this.regularExpression = match[1] === 'regex'
                this.searchTerm = match[2]
            }
        })
        this._route.data.subscribe((data:PlainObject):void => {
            this.limit = Math.max(1, this.limit || 1)
            const total:number = data.items.length + (
                Math.max(1, this.page || 1) - 1
            ) * this.limit
            if (data.items.length > this.limit)
                data.items.splice(this.limit, data.items.length - this.limit)
            this.items = data.items
            this.items.total = total
            if (this.applyPageConstraints())
                this.update()
        })
        this.searchTermStream.debounceTime(200).distinctUntilChanged().map((
        ):Promise<boolean> => {
            this.page = 1
            return this.update()
        }).subscribe()
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
            const subscribing:Object = this._router.events.subscribe((
                event:Object
            ):void => {
                if (event instanceof NavigationEnd) {
                    update = false
                    subscribing.unsubscribe()
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
     * Triggers on any data changes and updates item constraints.
     * @returns False so their wont be a view update since a complete route
     * reload will be triggered.
     */
    onDataChange():false {
        /*
            NOTE: We want to avoid another reload if page is already violating
            page constraints which indicates a page reload workaround.
        */
        if (!this.selectedItems.size)
            this.debouncedUpdate(true)
        return false
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
 * @property type - Saves current input type.
 */
export class AbstractValueAccessor extends DefaultValueAccessor {
    // TODO check tests
    @Input() type:?string
    /**
     * Manipulates editable value representation.
     * @param value - Value to manipulate.
     * @returns Given and transformed value.
     */
    exportValue(value:any):any {
        return value
    }
    /**
     * Reads internal value representation.
     * @param value - Value to convert to its internal representation.
     * @returns Given and transformed value.
     */
    importValue(value:any):any {
        return value
    }
    /**
     * Overridden inherited function for value export.
     * @param value - Value to export.
     * @param additionalParameter - Additional arguments will be forwarded to
     * the overridden method invocation.
     * @returns The transformed give value.
     */
    writeValue(value:any, ...additionalParameter:Array<any>):any {
        return super.writeValue(this.exportValue(
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
        return super._handleInput(this.importValue(
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
    // TODO check tests
    /**
     * Initializes and forwards needed services to the default value accesor
     * constructor.
     * @param renderer - Angular's dom abstraction layer.
     * @param elementRef - Host element reference.
     */
    constructor(renderer:Renderer, elementRef:ElementRef):void {
        super(renderer, elementRef, null)
    }
    /**
     * Manipulates editable value representation.
     * @param value - Value to manipulate.
     * @returns Given and transformed value.
     */
    exportValue(value:any):any {
        if (value && ['date', 'time'].includes(this.type)) {
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
    importValue(value:any):any {
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
// // / region intervall
// TODO test
// IgnoreTypeCheck
@Component({
    selector: 'generic-interval-input',
    template: `
        <md-input-container><input
            mdInput type="time" [(ngModel)]="model.start" placeholder="Start"
        /></md-input-container>
        <span class="delimiter"><ng-content></ng-content></span>
        <md-input-container><input
            mdInput type="time" [(ngModel)]="model.end" placeholder="Ende"
        /></md-input-container>
    `
})
/**
 * Represents an interval input.
 * @property model - Object that saves start and end time as unix timestamp in
 * milliseconds.
 */
export class IntervalInputComponent {
    @Input() model:{end:number;start:number} = {
        end: (new Date(1970, 0, 1)).getTime(),
        start: (new Date(1970, 0, 1)).getTime()
    }
}
// TODO test
// IgnoreTypeCheck
@Component({
    selector: 'generic-intervals-input',
    template: `
        <div>{{model.description || model.name}}</div>
        <div *ngFor="let interval of model.value">
            <generic-interval-input [model]="interval">
                <ng-content></ng-content>
            </generic-interval-input>
            <span (click)="remove(interval)">x</span>
        </div>
        <span (click)="add()">+</span>
    `
})
/**
 * Represents an editable list of intervals.
 * @property _extendObject - Holds the extend object pipe instance's transform
 * method.
 * @property _typeNameDescription - Saves current configured type name.
 * @property additionalObjectData - Additional object data to save with current
 * interval object.
 * @property model - Saves current list of intervals.
 * @property modelChange - Event emitter for interval list changes.
 */
export class IntervalsInputComponent {
    _extendObject:Function
    _typeNameDescription:string
    @Input() additionalObjectData:PlainObject
    @Input() model:PlainObject = {value: []}
    @Output() modelChange:EventEmitter<Array<PlainObject>> = new EventEmitter()
    /**
     * Constructs the interval list component.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param initialData - Injected initial data service instance.
     * @returns Nothing.
     */
    constructor(
        extendObjectPipe:ExtendObjectPipe, initialData:InitialDataService
    ):void {
        this._extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
        this._typeNameDescription =
            initialData.configuration.database.model.property.name.special.type
    }
    /**
     * Extends additional model data with default one if nothing is provided.
     * @returns Nothing.
     */
    ngOnInit():void {
        if (!this.additionalObjectData)
            this.additionalObjectData = {
                [this._typeNameDescription]: '_interval'
            }
    }
    /**
     * Adds a new interval.
     * @returns Nothing.
     */
    add():void {
        const lastEnd:Date = (
            this.model.value && this.model.value.length
        ) ? new Date(
            this.model.value[this.model.value.length - 1].end
        ) : new Date(1970, 0, 1)
        this.model.value.push(this._extendObject({
            end: new Date(lastEnd.getTime() + (new Date(
                1970, 0, 1, 2
            )).getTime()),
            start: lastEnd
        }, this.additionalObjectData))
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
            this.model.value.splice(index)
            this.modelChange.emit(this.model)
        }
    }
}
// // / endregion
// // endregion
// // region text/selection
/* eslint-disable max-len */
const propertyGenericContent:string = `
    [required]="!model.nullable"
    [ngModel]="model.value"
    (ngModelChange)="model.value = model.type === 'integer' ? parseInt($event) : model.type === 'number' ? parseFloat($event) : $event"
    [placeholder]="model.description || model.name"
    #state="ngModel"
    (change)="onChange(state)"
`
const propertyInputContent:string = `
    [disabled]="model.disabled || model.mutable === false || model.writable === false"
    [maxlength]="model.type === 'string' ? model.maximum : null"
    [minlength]="model.type === 'string' ? model.minimum : null"
    [pattern]="model.type === 'string' ? model.regularExpressionPattern : null"
`
const inputContent:string = `
    <md-hint
        align="start" (click)="showDeclaration = !showDeclaration" title="info"
        *ngIf="model.declaration"
    >[i]<span *ngIf="showDeclaration"> {{model.declaration}}</span></md-hint>
    <span generic-error *ngIf="showValidationErrorMessages">
        <p *ngIf="model.state?.errors?.required">
            Bitte füllen Sie das Feld "{{model.description || model.name}}"
            aus.
        </p>
        <p *ngIf="model.state?.errors?.maxlength">
            Bitte geben Sie maximal {{model.maximum}} Zeichen ein.
        </p>
        <p *ngIf="model.state?.errors?.minlength">
            Bitte geben Sie mindestens {{model.minimum}} Zeichen ein.
        </p>
        <p *ngIf="model.state?.errors?.max">
            Bitte geben Sie eine Zahl kleiner oder gleich {{model.maximum}}
            ein.
        </p>
        <p *ngIf="model.state?.errors?.min">
            Bitte geben Sie eine Zahl größer oder gleich {{model.minimum}} ein.
        </p>
        <p *ngIf="model.state?.errors?.pattern">
            Bitte geben Sie eine Zeinefolge ein die dem regulären Ausdruck
            "{{model.regularExpressionPattern}}" entspricht.
        </p>
    </span>
    <md-hint
        align="end"
        *ngIf="!model.selection && model.type === 'string' && model.maximum !== null && model.maximum < 100"
    >{{model.value?.length}} / {{model.maximum}}</md-hint>
`
// IgnoreTypeCheck
@Component({
    selector: 'generic-input',
    template: `
        <ng-container *ngIf="model.selection; else textInput">
            <md-select [(ngModel)]="model.value" ${propertyGenericContent}>
                <md-option
                    *ngFor="let value of model.selection" [value]="value"
                >
                    {{labels.hasOwnProperty(value) ? labels[value] : value}}
                </md-option>
            </md-select>
            ${inputContent}
            <ng-content></ng-content>
        </ng-container>
        <ng-template #textInput>
            <md-input-container>
                <input
                    mdInput [max]="model.type === 'number' ? model.maximum : null"
                    [min]="model.type === 'number' ? model.minimum : null"
                    [type]="type ? type : model.name.startsWith('password') ? 'password' : model.type === 'string' ? 'text' : 'number'"
                    ${propertyInputContent}
                    ${propertyGenericContent}
                >
                ${inputContent}
                <ng-content></ng-content>
            </md-input-container>
        </ng-template>
    `
})
/* eslint-enable max-len */
/**
 * A generic form input component with validation, labeling and info
 * description support.
 * @property type - Optionally defines an input type explicitly.
 */
export class InputComponent extends AbstractInputComponent {
    @Input() labels:{[key:string]:string} = {}
    @Input() type:?string
    /**
     * Forwards injected service instances to the abstract input component's
     * constructor.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @returns Nothing.
     */
    constructor(extendObjectPipe:ExtendObjectPipe):void {
        super(extendObjectPipe)
    }
}
// IgnoreTypeCheck
@Component({
    selector: 'generic-textarea',
    template: `
        <md-input-container>
            <textarea
                mdInput [rows]="rows" ${propertyInputContent}
                ${propertyGenericContent}
            ></textarea>
            ${inputContent}
            <ng-content></ng-content>
        </md-input-container>
    `
})
/**
 * A generic form textarea component with validation, labeling and info
 * description support.
 */
export class TextareaComponent extends AbstractInputComponent {
    @Input() rows:?string
    /**
     * Forwards injected service instances to the abstract input component's
     * constructor.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @returns Nothing.
     */
    constructor(extendObjectPipe:ExtendObjectPipe):void {
        super(extendObjectPipe)
    }
}
// // endregion
// / region file input
/* eslint-disable max-len */
// IgnoreTypeCheck
@Component({
    selector: 'generic-file-input',
    template: `
        <md-card>
            <md-card-header>
                <md-card-title>
                    {{headerText || file?.name || name || model[attachmentTypeName][internalName]?.description}}
                </md-card-title>
                <md-card-subtitle
                    (click)="showDeclaration = !showDeclaration"
                    title="info"
                    *ngIf="model[attachmentTypeName][internalName]?.declaration"
                >
                    [i]
                    <span *ngIf="showDeclaration">
                        {{model[attachmentTypeName][internalName].declaration}}
                    </span>
                </md-card-subtitle>
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
            <div md-card-image>
                <ng-container
                    *ngIf="!file?.type && (file?.source || (file?.source | genericType) === 'string')"
                >
                    Keine Vorschau möglich.
                </ng-container>
                <ng-container *ngIf="!file">
                    Keine Datei ausgewählt.
                </ng-container>
            </div>
            <md-card-content>
                <ng-content></ng-content>
                <div *ngIf="showValidationErrorMessages">
                    <p
                        *ngIf="model[attachmentTypeName][internalName]?.state?.errors?.required"
                    >Bitte wählen Sie eine Datei aus.</p>
                    <p
                        *ngIf="model[attachmentTypeName][internalName]?.state?.errors?.name"
                    >
                        Der Dateiname "{{file.name}}" entspricht nicht dem
                        vorgegebenen Muster "{{this.internalName}}".
                    </p>
                    <p
                        *ngIf="model[attachmentTypeName][internalName]?.state?.errors?.contentType"
                    >
                        Der Daten-Typ "{{file.content_type}}" entspricht
                        nicht dem vorgegebenen Muster
                        "{{model[attachmentTypeName][internalName].contentTypeRegularExpressionPattern}}".
                    </p>
                    <p
                        *ngIf="model[attachmentTypeName][internalName]?.state?.errors?.database"
                    >
                        {{model[attachmentTypeName][internalName]?.state?.errors?.database}}
                    </p>
                </div>
            </md-card-content>
            <md-card-actions>
                <input #input type="file" style="display:none" />
                <button
                    *ngIf="newButtonText" md-button (click)="input.click()"
                >{{newButtonText}}</button>
                <button
                    *ngIf="deleteButtonText && file" md-button
                    (click)="remove()"
                >{{deleteButtonText}}</button>
                <a
                    *ngIf="downloadButtonText && file" [download]="file.name"
                    [href]="file.source"
                ><button md-button>{{downloadButtonText}}</button></a>
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
 * @property _data - Holds the data service instance.
 * @property _domSanitizer - Holds the dom sanitizer service instance.
 * @property _extendObject - Holds the extend object pipe instance's transform
 * method.
 * @property _getFilenameByPrefix - Holds the file name by prefix getter pipe
 * instance's transform method.
 * @property _representObject - Holds the represent object pipe instance's
 * transform method.
 * @property _stringFormat - Saves the string formatting pips transformation
 * function.
 * @property _prefixMatch - Holds the prefix match pipe instance's transform
 * method.
 * @property delete - Event emitter which triggers its handler when current
 * file should be removed.
 * @property deleteButtonText - Text for button to trigger file removing.
 * @property downloadButtonText - Text for button to download current file.
 * @property file - Holds the current selected file object if present.
 * @property fileChange - Event emitter emitting when file changes happen.
 * @property headerText - Header text to show instead of property description
 * or name.
 * @property input - Virtual file input dom node.
 * @property internalName - Technical regular expression style file type.
 * @property mapNameToField - Indicates whether current file name should be
 * mapped to a specific model property.
 * @property model - File property specification.
 * @property modelChange -
 * @property name - Name of currently active file.
 * @property newButtonText - Text for button to trigger new file upload.
 * @property showValidationErrorMessages - Indicates whether validation errors
 * should be displayed. Useful to hide error messages until user tries to
 * submit a form.
 * @property synchronizeImmediately - Indicates whether file upload should be
 * done immediately after a file was selected (or synchronously with other
 * model data).
 */
export class FileInputComponent/* implements OnInit, AfterViewInit*/ {
    static imageMimeTypeRegularExpression:RegExp = new RegExp(
        '^image/(?:p?jpe?g|png|svg(?:\\+xml)?|vnd\\.microsoft\\.icon|gif|' +
        'tiff|webp|vnd\\.wap\\.wbmp|x-(?:icon|jng|ms-bmp))$')
    static textMimeTypeRegularExpression:RegExp = new RegExp(
        '^(?:application/xml)|(?:text/(?:plain|x-ndpb[wy]html|(?:x-)?csv))$')
    static videoMimeTypeRegularExpression:RegExp = new RegExp(
        '^video/(?:(?:x-)?(?:x-)?webm|3gpp|mp2t|mp4|mpeg|quicktime|' +
        '(?:x-)?flv|(?:x-)?m4v|(?:x-)mng|x-ms-as|x-ms-wmv|x-msvideo)|' +
        '(?:application/(?:x-)?shockwave-flash)$')
    _configuration:PlainObject
    _data:DataService
    _domSanitizer:DomSanitizer
    _extendObject:Function
    _getFilenameByPrefix:Function
    _representObject:Function
    _stringFormat:Function
    _prefixMatch:boolean = false
    attachmentTypeName:string
    @Output() delete:EventEmitter = new EventEmitter()
    @Input() deleteButtonText:string = 'delete'
    @Input() downloadButtonText:string = 'download'
    file:any = null
    @Output() fileChange:EventEmitter = new EventEmitter()
    @ViewChild('input') input:ElementRef
    internalName:string
    @Input() headerText:string = ''
    @Input() mapNameToField:?string|?Array<string> = null
    @Input() model:{id:?string;[key:string]:any;}
    @Output() modelChange:EventEmitter = new EventEmitter()
    @Input() name:?string = null
    @Input() newButtonText:string = 'new'
    @Input() showValidationErrorMessages:boolean = false
    @Input() synchronizeImmediately:boolean|PlainObject = false
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
     * @returns Nothing.
     */
    constructor(
        data:DataService, domSanitizer:DomSanitizer,
        extendObjectPipe:ExtendObjectPipe,
        getFilenameByPrefixPipe:GetFilenameByPrefixPipe,
        initialData:InitialDataService,
        representObjectPipe:RepresentObjectPipe,
        stringFormatPipe:StringFormatPipe
    ):void {
        this._configuration = initialData.configuration
        this._data = data
        this._domSanitizer = domSanitizer
        this._extendObject = extendObjectPipe.transform.bind(
            extendObjectPipe)
        this._getFilenameByPrefix = getFilenameByPrefixPipe.transform.bind(
            getFilenameByPrefixPipe)
        this._representObject = representObjectPipe.transform.bind(
            representObjectPipe)
        this._stringFormat = stringFormatPipe.transform.bind(stringFormatPipe)
        this.attachmentTypeName = this._configuration.database.model.property
            .name.special.attachment
        this.model = {[this.attachmentTypeName]: [], id: null}
    }
    /**
     * Initializes file upload handler.
     * @returns Nothing.
     */
    ngOnChanges():void {
        if (this.mapNameToField && !Array.isArray(this.mapNameToField))
            this.mapNameToField = [this.mapNameToField]
        const name:string = this._getFilenameByPrefix(
            this.model[this.attachmentTypeName], this.name)
        if (this.name && name !== this.name)
            this._prefixMatch = true
        this.internalName = name
        this.model[this.attachmentTypeName][this.internalName].state = {}
        this.file = this.model[this.attachmentTypeName][
            this.internalName
        ].value
        if (this.file)
            this.file.descriptionName = this.name
        else if (!this.model[this.attachmentTypeName][
            this.internalName
        ].nullable)
            this.model[this.attachmentTypeName][
                this.internalName
            ].state.errors = {required: true}
        if (this.file) {
            this.file.query = `?version=${this.file.digest}`
            /*
                NOTE: Only set new file source if isn't already present to
                prevent to download an immediately uploaded file and grab and
                older cached one.
            */
            if (!this.file.source)
                this.file.source =
                    this._domSanitizer.bypassSecurityTrustResourceUrl(
                        this._stringFormat(
                            this._configuration.database.url, ''
                        ) + `/${this._configuration.name || 'generic'}/` +
                        `${this.model._id}/${this.file.name}${this.file.query}`
                    )
        }
        this.determinePresentationType()
        this.fileChange.emit(this.file)
    }
    /**
     * Initializes current file input field. Adds needed event observer.
     * @returns Nothing.
     */
    ngAfterViewInit():void {
        this.input.nativeElement.addEventListener('change', async (
        ):Promise<void> => {
            if (this.input.nativeElement.files.length < 1)
                return
            this.model[this.attachmentTypeName][this.internalName].state = {}
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
            // IgnoreTypeCheck
            this.file.data = this.input.nativeElement.files[0]
            // IgnoreTypeCheck
            this.file.content_type = this.file.data.type || 'text/plain'
            // IgnoreTypeCheck
            this.file.length = this.file.data.size
            this.model[this.attachmentTypeName][
                this.internalName
            ].value = this.file
            if (!(new RegExp(this.internalName)).test(this.file.name))
                this.model[this.attachmentTypeName][
                    this.internalName
                ].state.errors = {name: true}
            if (!([undefined, null].includes(this.model[
                this.attachmentTypeName
            ][this.internalName].contentTypeRegularExpressionPattern) || (
                new RegExp(this.model[this.attachmentTypeName][
                    this.internalName
                ].contentTypeRegularExpressionPattern)
            ).test(this.file.content_type))) {
                if (this.model[this.attachmentTypeName][
                    this.internalName
                ].state.errors)
                    this.model[this.attachmentTypeName][
                        this.internalName
                    ].state.errors.contentType = true
                else
                    this.model[this.attachmentTypeName][
                        this.internalName
                    ].state.errors = {contentType: true}
                this.determinePresentationType()
            }
            if (this.synchronizeImmediately && !this.model[
                this.attachmentTypeName
            ][this.internalName].state.errors) {
                let result:PlainObject
                const newData:PlainObject = {
                    [
                        this._configuration.database.model.property.name
                            .special.type
                    ]: this.model[
                        this._configuration.database.model.property.name
                            .special.type
                    ],
                    _id: this.model._id,
                    [this.attachmentTypeName]: {
                        [this.file.name]: {
                            content_type: this.file.content_type,
                            data: this.file.data
                        }
                    }
                }
                if (this.synchronizeImmediately !== true)
                    this._extendObject(
                        true, newData, this.synchronizeImmediately)
                // NOTE: We want to replace old medium.
                if (oldFileName && oldFileName !== this.file.name && !(
                    this.mapNameToField && this.model._id &&
                    this.mapNameToField.includes('_id')
                ))
                    newData[this.attachmentTypeName][oldFileName] = {
                        data: null}
                if (![undefined, null].includes(this.model._rev))
                    newData._rev = this.model._rev
                if (this.mapNameToField) {
                    if (this.model._id && this.mapNameToField.includes(
                        '_id'
                    )) {
                        newData._deleted = true
                        try {
                            result = await this._data.put(newData)
                        } catch (error) {
                            this.model[this.attachmentTypeName][
                                this.internalName
                            ].state.errors = {
                                database: 'message' in error ? error.message :
                                    this._representObject(error)
                            }
                            return
                        }
                        delete newData._deleted
                        delete newData._rev
                    }
                    for (const name:string of this.mapNameToField) {
                        newData[name] = this.file.name
                        this.model[name] = this.file.name
                    }
                }
                newData._rev = 'upsert'
                try {
                    result = await this._data.put(newData)
                } catch (error) {
                    this.model[this.attachmentTypeName][
                        this.internalName
                    ].state.errors = {
                        database: 'message' in error ? error.message :
                            this._representObject(error)
                    }
                    return
                }
                this.file.revision = this.model._rev = result.rev
                this.file.query = `?version=${result.rev}`
                this.file.source =
                    this._domSanitizer.bypassSecurityTrustResourceUrl(
                        this._stringFormat(
                            this._configuration.database.url, ''
                        ) + `/${this._configuration.name}/${this.model._id}/` +
                        `${this.file.name}${this.file.query}`)
                this.determinePresentationType()
                this.fileChange.emit(this.file)
                this.modelChange.emit(this.model)
            } else {
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
                    this.fileChange.emit(this.file)
                    this.modelChange.emit(this.model)
                }
                fileReader.readAsDataURL(this.file.data)
            }
        })
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
     * Removes current file.
     * @returns A Promise which will be resolved after current file will be
     * removed.
     */
    async remove():Promise<void> {
        if (this.synchronizeImmediately && this.file) {
            let result:PlainObject
            const update:PlainObject = {
                [
                    this._configuration.database.model.property.name.special
                        .type
                ]: this.model[
                    this._configuration.database.model.property.name.special
                        .type
                ],
                _id: this.model._id,
                _rev: this.model._rev,
                [this.attachmentTypeName]: {[this.file.name]: {
                    content_type: 'text/plain',
                    data: null
                }}
            }
            if (this.mapNameToField && this.mapNameToField.includes('_id'))
                update._deleted = true
            try {
                result = await this._data.put(update)
            } catch (error) {
                this.model[this.attachmentTypeName][
                    this.internalName
                ].state.errors = {database: this._representObject(error)}
                return
            }
            if (this.mapNameToField && this.mapNameToField.includes('_id'))
                this.delete.emit(result)
            else
                this.model._rev = result.rev
        }
        this.model[this.attachmentTypeName][this.internalName].state.errors =
            this.model[this.attachmentTypeName][this.internalName].value =
                this.file = null
        if (!this.model[this.attachmentTypeName][this.internalName].nullable)
            this.model[this.attachmentTypeName][this.internalName].state
                .errors = {required: true}
        this.fileChange.emit(this.file)
        this.modelChange.emit(this.model)
    }
}
// / endregion
// / region pagination
/* eslint-disable max-len */
// IgnoreTypeCheck
@Component({
    selector: 'generic-pagination',
    template: `
        <ul *ngIf="lastPage > 1">
            <li *ngIf="page > 2">
                <a href="" (click)="change($event, 1)">--</a>
            </li>
            <li *ngIf="page > 1">
                <a href="" (click)="change($event, previousPage)">-</a>
            </li>
            <li *ngFor="let currentPage of pagesRange;let even = even">
                <a
                    href="" class="page-{{currentPage}}"
                    [ngClass]="{current: currentPage === page, previous: currentPage === previousPage, next: currentPage === nextPage, even: even, 'even-page': currentPage % 2 === 0, first: currentPage === firstPage, last: currentPage === lastPage}"
                    (click)="change($event, currentPage)"
                >{{currentPage}}</a>
            </li>
            <li *ngIf="lastPage > page">
                <a href="" (click)="change($event, nextPage)">+</a>
            </li>
            <li *ngIf="lastPage > page + 1">
                <a href="" (click)="change($event, lastPage)">++</a>
            </li>
        </ul>
    `
})
/* eslint-enable max-len */
/**
 * Provides a generic pagination component.
 * @property _makeRangePipe - Saves the make range pipe transformation
 * function.
 * @property itemsPerPage - Number of items to show per page as maximum.
 * @property page - Contains currently selected page number.
 * @property pageChange - Event emitter to fire on each page change event.
 * @property pageRangeLimit - Number of concrete page links to show.
 * @property total - Contains total number of pages.
 */
export class PaginationComponent {
    _makeRange:Function
    @Input() itemsPerPage:number = 20
    @Input() page:number = 1
    @Output() pageChange:EventEmitter = new EventEmitter()
    @Input() pageRangeLimit:number = 4
    @Input() total:number = 0
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
// region modules
const declarations:Array<Object> = Object.keys(module.exports).filter((
    name:string
):boolean => !name.startsWith('Abstract') && [
    'Accessor', 'Component', 'Directive', 'Pipe'
].some((suffix:string):boolean => name.endsWith(suffix))).map((
    name:string
):Object => module.exports[name])
const providers:Array<Object> = Object.keys(module.exports).filter((
    name:string
):boolean => !name.startsWith('Abstract') && (
    name.endsWith('Resolver') || name.endsWith('Pipe') ||
    name.endsWith('Guard') || name.endsWith('Service')
)).map((name:string):Object => module.exports[name])
const modules:Array<Object> = [
    BrowserModule,
    FormsModule,
    MdCardModule,
    MdInputModule,
    MdSelectModule
]
// IgnoreTypeCheck
@NgModule({
    declarations,
    exports: declarations,
    imports: modules,
    providers
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
