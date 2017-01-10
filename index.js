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
    /* AfterViewInit,*/ Component, ElementRef, EventEmitter, Injectable,
    Injector, Input, NgModule, /* OnInit,*/ Output, Pipe, PipeTransform,
    ReflectiveInjector, ViewChild
} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {MaterialModule} from '@angular/material'
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import {
    ActivatedRoute, ActivatedRouteSnapshot, /* CanDeactivate, Resolve,*/
    Router, RouterStateSnapshot
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
export class GenericToolsService {
    $:any = $
    globalContext:Object = globalContext
    tools:Object = Tools
}
// IgnoreTypeCheck
@Injectable()
/**
 * Serves initial data provided via a global variable.
 */
export class GenericInitialDataService {
    configuration:PlainObject
    /**
     * Sets all properties of given initial data as properties to this
     * initializing instance.
     * @param tools - Saves the generic tools service.
     * @returns Nothing.
     */
    constructor(tools:GenericToolsService):void {
        for (const key:string in tools.globalContext.genericInitialData)
            if (tools.globalContext.genericInitialData.hasOwnProperty(key))
                // IgnoreTypeCheck
                this[key] = tools.globalContext.genericInitialData[key]
    }
}
// endregion
// region pipes
// / region forwarded methods
const reference:Object = {}
for (const name:string of Object.getOwnPropertyNames(Tools))
    if (!['caller', 'arguments'].includes(name))
        // IgnoreTypeCheck
        reference[name] = Tools[name]
for (const configuration:PlainObject of [
    {
        invert: ['array'],
        methodGroups: {
            string: ['encodeURIComponent'],
            number: ['pow']
        },
        reference: window
    }, {
        invert: ['array'],
        methodGroups: {
            '': [
                'convertCircularObjectToJSON', 'equals', 'extendObject',
                'representObject', 'sort'
            ],
            array: '*',
            number: '*',
            string: '*'
        },
        reference: reference
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
                    /**
                     * Performs the concrete conversion logic.
                     * @param parameter - Saves all generic parameter to
                     * forward it for triggering the underlying tools utility.
                     * @returns Whatever the underlying tools function returns.
                     */
                    transform(...parameter:Array<any>):any {
                        return ReflectiveInjector.resolveAndCreate([
                            GenericToolsService
                        ]).get(GenericToolsService).tools[methodName](
                            ...parameter)
                    }
                }
                Pipe({name: `generic${pipeName}`})(
                    module.exports[`Generic${pipeName}Pipe`])
                if (configuration.invert.includes(methodTypePrefix)) {
                    module.exports[`generic${pipeName}InvertedPipe`] = class {
                        /**
                         * Performs the concrete conversion logic.
                         * @param parameter - Saves all generic parameter to
                         * forward it for triggering the underlying tools
                         * utility.
                         * @returns Whatever the underlying tools function
                         * returns.
                         */
                        transform(...parameter:Array<any>):any {
                            const tools:typeof Tools =
                                ReflectiveInjector.resolveAndCreate([
                                    GenericToolsService
                                ]).get(GenericToolsService).tools
                            // IgnoreTypeCheck
                            return tools.invertArrayFilter(tools[methodName])(
                                ...parameter)
                        }
                    }
                    Pipe({name: `generic${pipeName}Inverted`})(
                        module.exports[`generic${pipeName}InvertedPipe`])
                }
            }
        }
// / endregion
// / region object
// IgnoreTypeCheck
@Pipe({name: 'genericExtractRawData'})
/**
 * Removes all meta data from documents.
 */
export class GenericExtractRawDataPipe/* implements PipeTransform*/ {
    /**
     * Implements attachment changes or removes.
     * @param newDocument - Document to slice meta data from.
     * @param oldAttachments - Old document to take into account.
     * @param fileTypeReplacement - Indicates weather file type replacements
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
                if (newDocument._attachments) {
                    if (newDocument._attachments.hasOwnProperty(
                        oldAttachments[type].value.name
                    ))
                        continue
                } else if (!untouchedAttachments.includes(
                    oldAttachments[type].value.name
                )) {
                    newDocument._attachments = {
                        [oldAttachments[type].value.name]: {data: null}}
                    continue
                }
                if (fileTypeReplacement)
                    for (const fileName:string in newDocument._attachments)
                        if (newDocument._attachments.hasOwnProperty(
                            fileName
                        ) && (new RegExp(type)).test(fileName))
                            newDocument._attachments[oldAttachments[
                                type
                            ].value.name] = {data: null}
            }
        return newDocument
    }
    /**
     * Implements the meta data removing of given document.
     * @param newDocument - Document to slice meta data from.
     * @param oldDocument - Optionally existing old document to take into
     * account.
     * @param fileTypeReplacement - Indicates weather file type replacements
     * and removes should be taken into account.
     * @returns The copies sliced version of given document.
     */
    transform(
        newDocument:PlainObject, oldDocument:?PlainObject,
        fileTypeReplacement:boolean = true
    ):PlainObject {
        const result:PlainObject = {}
        const untouchedAttachments:Array<string> = []
        for (const name:string in newDocument)
            if (newDocument.hasOwnProperty(name) && ![
                undefined, null, ''
            ].includes(newDocument[name]) && name !== '_revisions')
                if (name === '_attachments') {
                    result[name] = {}
                    let empty:boolean = true
                    for (const fileName:string in newDocument[name])
                        if (newDocument[name].hasOwnProperty(
                            fileName
                        ))
                            if (newDocument[name][fileName].hasOwnProperty(
                                'data'
                            ) && !(oldDocument && oldDocument.hasOwnProperty(
                                name
                            ) && oldDocument[name].hasOwnProperty(
                                fileName
                            ) && newDocument[name][
                                fileName
                            ].data === oldDocument[name][fileName].data)) {
                                result[name][fileName] = {
                                    content_type: newDocument[name][
                                        fileName
                                    ].content_type,
                                    data: newDocument[name][fileName].data
                                }
                                empty = false
                            } else
                                untouchedAttachments.push(fileName)
                    if (empty)
                        delete result[name]
                } else
                    result[name] = newDocument[name]
        // Handle attachment removes or replacements.
        if (oldDocument && oldDocument.hasOwnProperty(
            '_attachments'
        ) && oldDocument._attachments)
            this._handleAttachmentChanges(
                result, oldDocument._attachments, fileTypeReplacement,
                untouchedAttachments)
        return result
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericIsDefined'})
/**
 * Checks if given reference is defined.
 */
export class GenericIsDefinedPipe/* implements PipeTransform*/ {
    /**
     * Performs the actual comparison.
     * @param object - Object to compare against "undefined" or "null".
     * @param nullIsUndefined - Indicates weather "null" should be handles as
     * "undefined".
     * @returns The comparison result.
     */
    transform(object:any, nullIsUndefined:boolean = false):boolean {
        return !(object === undefined || nullIsUndefined && object === null)
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericGetFilenameByPrefix'})
/**
 * Retrieves a matching filename by given filename prefix.
 */
export class GenericGetFilenameByPrefixPipe/* implements PipeTransform*/ {
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
                if (attachments.hasOwnProperty(name) && name.startsWith(prefix))
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
@Pipe({name: 'genericMap'})
/**
 * Returns a copy of given object where each item was processed through given
 * function.
 * @property injector - Pipe specific injector to determine pipe dynamically at
 * runtime.
 */
export class GenericMapPipe/* implements PipeTransform*/ {
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
        if (Array.isArray(object)) {
            const result:Array<any> = []
            for (const item:any of object)
                result.push(this.injector.get(pipeName).transform(
                    item, ...additionalArguments))
            return result
        }
        const result:Object = {}
        for (const key:string in object)
            if (object.hasOwnProperty(key))
                result[key] = this.injector.get(pipeName).transform(
                    object[key], key, ...additionalArguments)
        return result
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericType'})
/**
 * Determines type of given object.
 */
export class GenericTypePipe/* implements PipeTransform*/ {
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
 * Forwards javascript's native "stringEndsWith" method.
 */
export class GenericStringEndsWithPipe/* implements PipeTransform*/ {
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
export class GenericStringHasTimeSuffixPipe/* implements PipeTransform*/ {
    /**
     * Performs the actual string suffix check.
     * @param string - To search in.
     * @returns The boolean result.
     */
    transform(string:?string):boolean {
        if (typeof string !== 'string')
            return false
        return string.endsWith('DateTime') || string.endsWith(
            'Date'
        ) || string.endsWith('Time') || string === 'timestamp'
    }
}
// IgnoreTypeCheck
@Pipe({name: 'genericStringMatch'})
/**
 * Tests if given pattern matches against given subject.
 */
export class GenericStringMatchPipe/* implements PipeTransform*/ {
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
export class GenericStringReplacePipe/* implements PipeTransform*/ {
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
export class GenericStringShowIfPatternMatchesPipe
/* implements PipeTransform*/ {
    /**
     * Performs the actual matching.
     * @param string - String to replace content.
     * @param pattern - String or regular expression to us as matcher.
     * @param invert - Indicates weather given string should be shown if given
     * pattern matches or not.
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns Given string if matching indicator was successful.
     */
    transform(
        string:string, pattern:string|RegExp, invert:boolean = false,
        modifier:string = 'g'
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
export class GenericStringStartsWithPipe/* implements PipeTransform*/ {
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
export class GenericStringSliceMatchPipe/* implements PipeTransform*/ {
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
export class GenericNumberPercentPipe/* implements PipeTransform*/ {
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
const GenericArrayMakeRangePipe:PipeTransform =
    module.exports.GenericArrayMakeRangePipe
const GenericStringEscapeRegularExpressionsPipe:PipeTransform =
    module.exports.GenericStringEscapeRegularExpressionsPipe
const GenericExtendObjectPipe:PipeTransform =
    module.exports.GenericExtendObjectPipe
const GenericRepresentObjectPipe:PipeTransform =
    module.exports.GenericRepresentObjectPipe
const GenericStringFormatPipe:PipeTransform =
    module.exports.GenericStringFormatPipe
// region services
// IgnoreTypeCheck
@Injectable()
/**
 * A generic guard which prevents from switching to route if its component's
 * "canDeactivate()" method returns "false", a promise or observable wrapping
 * a boolean.
 */
export class GenericCanDeactivateRouteLeaveGuard
/* implements CanDeactivate<Object>*/ {
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
export class GenericDataService {
    connection:PouchDB
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
    synchronisation:Object
    /**
     * Creates the database constructor applies all plugins instantiates
     * the connection instance and registers all middlewares.
     * @param extendObject - Injected extend object pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param stringFormat - Injected string format pipe instance.
     * @returns Nothing.
     */
    constructor(
        extendObject:GenericExtendObjectPipe,
        initialData:GenericInitialDataService,
        stringFormat:GenericStringFormatPipe
    ):void {
        this.stringFormat = stringFormat.transform
        this.extendObject = extendObject.transform
        this.database = PouchDB.plugin(PouchDBFindPlugin)
                               .plugin(PouchDBValidationPlugin)
        for (
            const plugin:Object of
            initialData.configuration.database.plugins || []
        )
            this.database = this.database.plugin(plugin)
        this.connection = new this.database(this.stringFormat(
            initialData.configuration.database.url, ''
        ) + `/${initialData.configuration.name}`, this.extendObject(true, {
            skip_setup: true
        }, initialData.configuration.database.options || {}))
        for (const name:string in this.connection)
            if (typeof this.connection[name] === 'function') {
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
                    let result:any = method.apply(
                        this.connection, parameter)
                    for (const methodName:string of [name, '_all'])
                        if (this.middlewares.post.hasOwnProperty(
                            methodName
                        ))
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
        /*
            For local database:

            this.connection = new this.database('local')
        */
        this.connection.installValidationMethods()
        /*
            For local database:

            this.synchronisation = PouchDB.sync(this.stringFormat(
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
    /**
     * TODO
     */
    async get(
        selector:PlainObject, options:PlainObject = {}
    ):Promise<Array<PlainObject>> {
        return (await this.connection.find(
            this.extendObject(true, {selector}, options)
        )).docs
    }
    put(...parameter:Array<any>):Promise<PlainObject> {
        return this.connection.put(...parameter)
    }
    remove(...parameter:Array<any>):Promise<PlainObject> {
        return this.connection.remove(...parameter)
    }
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
            }
        }
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
export class GenericDataScopeService {
    configuration:PlainObject
    data:GenericDataService
    extendObject:Function
    tools:typeof Tools
    /**
     * Saves alle needed services as property values.
     * @param data - Injected data service instance.
     * @param initialData - Injected initial data service instance.
     * @param extendObject - Injected extend object pipe instance.
     * @param tools - Injected tools service instance.
     * @returns Nothing.
     */
    constructor(
        data:GenericDataService, initialData:GenericInitialDataService,
        extendObject:GenericExtendObjectPipe, tools:GenericToolsService
    ):void {
        this.configuration = initialData.configuration
        this.data = data
        this.extendObject = extendObject.transform
        this.tools = tools.tools
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
            this.configuration.modelConfiguration.models[modelName]
        for (const name:string in modelSpecification)
            if (modelSpecification.hasOwnProperty(name))
                if (name === '_attachments') {
                    for (const fileName:string in modelSpecification[name])
                        if (modelSpecification[name].hasOwnProperty(fileName))
                            modelSpecification[name][fileName] =
                                this.extendObject(
                                    true, this.tools.copyLimitedRecursively(
                                        this.configuration.modelConfiguration
                                            .default.propertySpecification
                                    ), modelSpecification[name][fileName])
                } else
                    modelSpecification[name] = this.extendObject(
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
            else
                result[name] = {}
            if (name === '_attachments') {
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
                                ) && result[name][type][hookType])
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
                                        this.configuration.modelConfiguration
                                            .models,
                                        modelSpecification, (
                                            object:Object
                                        ):string => JSON.stringify(
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
                        if (result[name].hasOwnProperty(type) && result[name][
                            type
                        ])
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
    /**
     * Useful to sets route specific data in a resolver.
     * @param modelName - Name of model to retrieve data from.
     * @param scope - Scope to extend or set values in.
     * @param id - ID of an entity to retrieve data from.
     * @param propertyNames - List of property names to retrieve data from.
     * @param options - To use for retrieving needed data from data service.
     * @returns A promise wrapping requested data.
     */
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
                this.extendObject(true, object, result)
            return result
        }
        return result
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
// / region abstract
export class AbstractResolver/* implements Resolve<PlainObject>*/ {
    _type:string = 'Item'
    data:PlainObject
    extendObject:Function
    escapeRegularExpressions:Function
    models:PlainObject
    relevantKeys:?Array<string> = null
    constructor(
        data:GenericDataService,
        extendObject:GenericExtendObjectPipe,
        initialData:GenericInitialDataService,
        escapeRegularExpressions:GenericStringEscapeRegularExpressionsPipe
    ):void {
        this.data = data
        this.extendObject = extendObject.transform
        this.models = initialData.configuration.modelConfiguration.models
        this.escapeRegularExpressions = escapeRegularExpressions.transform
    }
    async list(
        sort:Array<PlainObject> = [{_id: 'asc'}], page:number = 1,
        limit:number = 10, searchTerm:string = '',
        additionalSelectors:PlainObject = {}
    ):Promise<Array<PlainObject>> {
        if (!this.relevantKeys)
            this.relevantKeys = Object.keys(this.models[this._type]).filter((
                name:string
            ):boolean => !name.startsWith('_') && [
                undefined, 'string'
            ].includes(this.models[this._type][name].type))
        const selector:PlainObject = {'-type': this._type}
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
        const options:PlainObject = {skip: (page - 1) * limit}
        if (options.skip === 0)
            delete options.skip
        if (sort.length)
            options.sort = [{'-type': 'asc'}].concat(sort)
        return this.data.get(this.extendObject(
            true, selector, additionalSelectors
        ), options)
    }
    /* eslint-disable no-unused-vars */
    resolve(
        route:ActivatedRouteSnapshot, state:RouterStateSnapshot
    ):Observable<Array<PlainObject>> {
    /* eslint-enable no-unused-vars */
        let searchTerm:string = decodeURIComponent(route.params.searchTerm)
        if (searchTerm.startsWith('exact-'))
            searchTerm = this.escapeRegularExpressions(searchTerm.substring(
                'exact-'.length))
        else if (searchTerm.startsWith('regex-')) {
            searchTerm = searchTerm.substring('regex-'.length)
            try {
                new RegExp(searchTerm)
            } catch (error) {
                searchTerm = ''
            }
        }
        const sort:Array<PlainObject> = route.params.sort.split(',').map((
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
        return Observable.fromPromise(this.list(sort, parseInt(
            route.params.page
        ), parseInt(route.params.limit), searchTerm))
    }
}
// / endregion
// endregion
// region components
// / region abstract
export class AbstractInputComponent {
    _extendObject:Function
    @Input() model:PlainObject = {}
    @Output() modelChange:EventEmitter = new EventEmitter()
    @Input() showValidationErrorMessages:boolean = false
    constructor(extendObject:GenericExtendObjectPipe):void {
        this._extendObject = extendObject.transform
    }
    ngOnInit():void {
        this._extendObject(this.model, this._extendObject({
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
export class AbstractItemsComponent {
    _itemPath:string = 'admin/item'
    _itemsPath:string = 'admin/items'
    _route:ActivatedRoute
    _router:Router
    _tools:typeof Tools

    items:Observable<Array<PlainObject>>
    limit:number
    page:number
    regularExpression:boolean = false
    searchTerm:string = ''
    searchTermStream:Subject<string> = new Subject()
    selectedItems:Set<PlainObject> = new Set()
    sort:PlainObject = {_id: 'asc'}

    constructor(
        route:ActivatedRoute, router:Router, tools:GenericToolsService
    ):void {
        this._route = route
        this._router = router
        this._tools = tools.tools
        this._route.params.subscribe((data:PlainObject):void => {
            this.page = parseInt(data.page)
            this.limit = parseInt(data.limit)
            const match:Array<string> = /(regex|exact)-(.*)/.exec(
                data.searchTerm)
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
                this._tools.timeout(():boolean => this.update())
        })
        this.searchTermStream.debounceTime(200).distinctUntilChanged().map((
        ):boolean => {
            this.page = 1
            return this.update()
        }).subscribe()
    }
    delete(event:Object):void {
        let index:number = 0
        for (const item:PlainObject of this.items) {
            if (item._id === event.id) {
                this.items.splice(index, 1)
                break
            }
            index += 1
        }
    }
    deleteSelectedItems():void {
        this.selectedItems = new Set()
    }
    goToItem(itemID:string):void {
        this._router.navigate([this._itemPath, itemID])
    }
    applyPageConstraints():boolean {
        const oldPage:number = this.page
        const oldLimit:number = this.limit
        this.limit = Math.max(1, this.limit || 1)
        this.page = Math.max(1, Math.min(this.page, Math.ceil(
            this.items.total / this.limit)))
        return this.page !== oldPage || this.limit !== oldLimit
    }
    update(reload:boolean = false):boolean {
        this.applyPageConstraints()
        if (reload)
            /*
                NOTE: Will be normalised to "1" after route reload (hack to
                enforce route reloading).
            */
            this.page = 0
        let sort = ''
        for (const name:string in this.sort)
            if (this.sort.hasOwnProperty(name))
                sort += `${sort ? ',' : ''}${name}-${this.sort[name]}`
        return this._router.navigate([
            this._itemsPath, sort, this.page, this.limit,
            `${this.regularExpression ? 'regex' : 'exact'}-` +
            encodeURIComponent(this.searchTerm)
        ])
    }
    updateSearch():void {
        this.searchTermStream.next(this.searchTerm)
    }
}
// / endregion
// // region text
/* eslint-disable max-len */
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
            <span *ngIf="model.state.errors?.required">
                Bitte füllen Sie das Feld "{{model.description || model.name}}"
                aus.
            </span>
            <span *ngIf="model.state.errors?.maxlength">
                Bitte geben Sie maximal {{model.maximum}} Zeichen ein.
            </span>
            <span *ngIf="model.state.errors?.minlength">
                Bitte geben Sie mindestens {{model.minimum}} Zeichen ein.
            </span>
            <span *ngIf="model.state.errors?.max">
                Bitte geben Sie eine Zahl kleiner oder gleich {{model.maximum}}
                ein.
            </span>
            <span *ngIf="model.state.errors?.min">
                Bitte geben Sie eine Zahl großer oder gleich {{model.minimum}}
                ein.
            </span>
            <span *ngIf="model.state.errors?.pattern">
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
// IgnoreTypeCheck
@Component({
    selector: 'generic-input',
    template: `
        <md-input
            [max]="model.type === 'number' ? model.maximum : null"
            [min]="model.type === 'number' ? model.minimum : null"
            [type]="model.name.startsWith('password') ? 'password' : model.type === 'string' ? 'text' : 'number'"
            ${propertyInputContent}
        >${mdInputContent}</md-input>`
})
/* eslint-enable max-len */
export class GenericInputComponent extends AbstractInputComponent {
    constructor(extendObject:GenericExtendObjectPipe):void {
        super(extendObject)
    }
}
// IgnoreTypeCheck
@Component({
    selector: 'generic-textarea',
    template: `
        <md-textarea ${propertyInputContent}>${mdInputContent}</md-textarea>`
})
export class GenericTextareaComponent extends AbstractInputComponent {
    constructor(extendObject:GenericExtendObjectPipe):void {
        super(extendObject)
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
/* eslint-enable max-len */
/**
 * TODO
 */
export class GenericFileInputComponent/* implements OnInit, AfterViewInit*/ {
    static imageMimeTypeRegularExpression:RegExp = new RegExp(
        '^image/(?:p?jpe?g|png|svg(?:\\+xml)?|vnd\\.microsoft\\.icon|gif|' +
        'tiff|webp|vnd\\.wap\\.wbmp|x-(?:icon|jng|ms-bmp))$')
    static textMimeTypeRegularExpression:RegExp = new RegExp(
        '^(?:application/xml)|(?:text/(?:plain|x-ndpb[wy]html|(?:x-)?csv))$')
    static videoMimeTypeRegularExpression:RegExp = new RegExp(
        '^video/(?:(?:x-)?(?:x-)?webm|3gpp|mp2t|mp4|mpeg|quicktime|' +
        '(?:x-)?flv|(?:x-)?m4v|(?:x-)mng|x-ms-as|x-ms-wmv|x-msvideo)|' +
        '(?:application/(?:x-)?shockwave-flash)$')

    _data:GenericDataService
    _domSanitizer:DomSanitizer
    _extendObject:Function
    _getFilenameByPrefix:Function
    _representObject:Function
    _prefixMatch:boolean = false

    // Holds the current selected file object if present.
    file:any = null
    // Technical regular expression style file type.
    internalName:string

    @Input() model:{id:?string;[key:string]:any;} = {
        id: null
    }
    // Asset name.
    @Input() name:?string = null
    @Input() showValidationErrorMessages:boolean = false
    /*
        Indicates weather changed file selections should be immediately
        attached to given document.
    */
    @Input() synchronizeImmediately:boolean|PlainObject = false
    @Input() mapNameToField:?string|?Array<string> = null
    @Output() delete:EventEmitter = new EventEmitter()
    @Output() fileChange:EventEmitter = new EventEmitter()
    @Output() modelChange:EventEmitter = new EventEmitter()
    @ViewChild('input') input:ElementRef
    /**
     * Sets needed services as property values.
     * @param data - Saves the data service instance.
     * @param domSanitizer - Saves the dom sanitizer service instance.
     * @param extendObject - Saves the object extender pipe instance.
     * @param getFilenameByPrefix - Saves the file name by prefix retriever
     * pipe instance.
     * @param representObject - Saves the object to string representation pipe
     * instance.
     * @returns Nothing.
     */
    constructor(
        data:GenericDataService, domSanitizer:DomSanitizer,
        extendObject:GenericExtendObjectPipe,
        getFilenameByPrefix:GenericGetFilenameByPrefixPipe,
        representObject:GenericRepresentObjectPipe
    ):void {
        this._data = data
        this._domSanitizer = domSanitizer
        this._extendObject = extendObject.transform
        this._getFilenameByPrefix = getFilenameByPrefix.transform
        this._representObject = representObject.transform
    }
    /**
     * Initializes file upload handler.
     * @returns Nothing.
     */
    ngOnInit():void {
        if (this.mapNameToField && !Array.isArray(this.mapNameToField))
            this.mapNameToField = [this.mapNameToField]
        const name:string = this._getFilenameByPrefix(
            this.model._attachments, this.name)
        if (this.name && name !== this.name)
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
            this.file.source =
                this._domSanitizer.bypassSecurityTrustResourceUrl(
                    'http://127.0.0.1:5984/bpvWebNodePlugin/' +
                    this.model._id + '/' + this.file.name + this.file.hash)
            this.file.hash = `#${this.file.digest}`
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
            // IgnoreTypeCheck
            this.file.data = this.input.nativeElement.files[0]
            // IgnoreTypeCheck
            this.file.content_type = this.file.data.type || 'text/plain'
            // IgnoreTypeCheck
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
                    _attachments: {
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
                if (oldFileName && oldFileName !== this.file.name)
                    newData._attachments[oldFileName] = {data: null}
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
                            this.model._attachments[
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
                try {
                    result = await this._data.put(newData)
                } catch (error) {
                    this.model._attachments[this.internalName].state.errors = {
                        database: 'message' in error ? error.message :
                            this._representObject(error)
                    }
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
     * Removes current file.
     * @returns A Promise which will be resolved after current file will be
     * removed.
     */
    async remove():Promise<void> {
        if (this.synchronizeImmediately && this.file) {
            let result:PlainObject
            const update:PlainObject = {
                '-type': this.model['-type'],
                _id: this.model._id,
                _rev: this.model._rev,
                _attachments: {[this.file.name]: {data: null}}
            }
            if (this.mapNameToField && this.mapNameToField.includes('_id'))
                update._deleted = true
            try {
                result = await this._data.put(update)
            } catch (error) {
                this.model._attachments[this.internalName].state.errors = {
                    database: this._representObject(error)
                }
                return
            }
            if (this.mapNameToField && this.mapNameToField.includes('_id'))
                this.delete.emit(result)
            else
                this.model._rev = result.rev
        }
        this.model._attachments[this.internalName].state.errors =
            this.model._attachments[this.internalName].value = this.file = null
        if (!this.model._attachments[this.internalName].nullable)
            this.model._attachments[this.internalName].state.errors = {
                required: true}
        this.fileChange.emit(this.file)
        this.modelChange.emit(this.model)
    }
    /**
     * Determines which type of file we have to present.
     * @returns Nothing.
     */
    determinePresentationType():void {
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
 * @property _makeRange - Saves the make range pipe transformation function.
 * @property itemsPerPage - Number of items to show per page as maximum.
 * @property page - Contains currently selected page number.
 * @property pageChange - Event emitter to fire on each page change event.
 * @property total - Contains total number of pages.
 * @property pageRangeLimit - Number of concrete page links to show.
 */
export class GenericPaginationComponent {
    _makeRange:Function
    @Input() itemsPerPage:number = 20
    @Input() page:number = 1
    @Output() pageChange:EventEmitter = new EventEmitter()
    @Input() total:number = 0
    @Input() pageRangeLimit:number = 4
    /**
     * Sets needed services as property values.
     * @param makeRange - Saves the make range pipe instance.
     * @returns Nothing.
     */
    constructor(makeRange:GenericArrayMakeRangePipe):void {
        this._makeRange = makeRange.transform
    }
    /**
     * Determines the highest page number.
     * @returns The determines page number.
     */
    get lastPage():number {
        return Math.ceil(this.total / this.itemsPerPage)
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
    /**
     * Retrieves the next or last (if last is current) page.
     * @returns The new determined page number.
     */
    get nextPage():number {
        return Math.min(this.page + 1, this.lastPage)
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
}
// / endregion
// endregion
// region modules
const declarations:Array<Object> = Object.keys(module.exports).filter((
    name:string
):boolean => !name.startsWith('Abstract') && (
    name.endsWith('Component') || name.endsWith('Pipe')
)).map((name:string):Object => module.exports[name])
const providers:Array<Object> = Object.keys(module.exports).filter((
    name:string
):boolean => !name.startsWith('Abstract') && (
    name.endsWith('Resolver') || name.endsWith('Pipe') ||
    name.endsWith('Guard') || name.endsWith('Service')
)).map((name:string):Object => module.exports[name])
const modules:Array<Object> = [
    BrowserModule,
    FormsModule,
    MaterialModule.forRoot()
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
export default class GenericModule {}
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
