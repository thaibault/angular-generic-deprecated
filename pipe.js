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
// region imports
import Tools, {PlainObject} from 'clientnode'
import {DatePipe} from '@angular/common'
import {Injector, NgModule, NgZone, Pipe, PipeTransform} from '@angular/core'
import {
    BrowserModule,
    DomSanitizer,
    SafeScript,
    SafeHtml,
    SafeResourceUrl,
    SafeStyle,
    SafeUrl
} from '@angular/platform-browser'
import PouchDB from 'pouchdb'
import {InitialDataService, UtilityService} from './baseService'
// endregion
// region wrapped
/**
 * Generic pipe transform class to wrapp simple pure functions as pipe
 * transformation.
 * @property methodName - Name of forwarded method.
 */
export class AbstractToolsPipe implements PipeTransform {
    methodName:string
    /**
     * Performs the concrete conversion logic.
     * @param parameter - Saves all generic parameter to forward it
     * for triggering the underlying tools utility.
     * @returns Whatever the underlying tools function returns.
     */
    transform(...parameter:Array<any>):any {
        return UtilityService.tools[this.methodName](...parameter)
    }
}
/**
 * Generic pipe transform class to wrapp simple pure functions as inverted pipe
 * transformation.
 * @property methodName - Name of forwarded method.
 */
export class AbstractInvertedToolsPipe extends AbstractToolsPipe
    implements PipeTransform {
    /**
     * Performs the concrete conversion logic.
     * @param parameter - Saves all generic parameter to
     * forward it for triggering the underlying tools utility.
     * @returns Whatever the underlying tools function returns.
     */
    transform(...parameter:Array<any>):any {
        const tools:typeof Tools = UtilityService.tools
        // IgnoreTypeCheck
        return tools.invertArrayFilter(tools[this.methodName])(...parameter)
    }
}
/*
    NOTE: This would dynamically load all possible pipes from the "Tools"
    library but does not support angular's ahead of time compilation yet.

// / region configuration
const invert:Array<string> = ['array']
const methodGroups:PlainObject = {
    '': [
        'convertCircularObjectToJSON',
        'equals',
        'extend',
        'representObject',
        'sort'
    ],
    array: '*',
    number: '*',
    string: '*'
}
// / endregion
for (const methodTypePrefix:string in methodGroups)
    if (methodGroups.hasOwnProperty(methodTypePrefix)) {
        let methodNames:Array<string> = []
        if (methodGroups[methodTypePrefix] === '*')
            /* eslint-disable curly * /
            for (const name:string of Object.getOwnPropertyNames(Tools)) {
                if (Tools.hasOwnProperty(name) && Tools.hasOwnProperty(
                    name
                ) && (new RegExp(`^${methodTypePrefix}[A-Z0-9]`)).test(name))
                    methodNames.push(name)
            }
            /* eslint-enable curly * /
        else
            methodNames = methodGroups[methodTypePrefix]
        for (const methodName:string of methodNames) {
            const pipeName:string = Tools.stringCapitalize(methodName)
            module.exports[`${pipeName}Pipe`] =
                class extends AbstractToolsPipe implements PipeTransform {
                    methodName:string = methodMame
                }
            Pipe({name: `generic${pipeName}`})(
                module.exports[`${pipeName}Pipe`])
            if (invert.includes(methodTypePrefix)) {
                module.exports[`${pipeName}InvertedPipe`] =
                    class extends AbstractInvertedToolsPipe {
                        methodName:string = methodMame
                    }
                Pipe({name: `generic${pipeName}Inverted`})(
                    module.exports[`${pipeName}InvertedPipe`])
            }
        }
    }
// NOTE: We have to declare referenced dependencies for injection mechanism.
// const ...:PipeTransform = module.exports.ArrayMakeRangePipe
*/
@Pipe({name: `genericConvertCircularObjectToJSON`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ConvertCircularObjectToJSONPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'convertCircularObjectToJSON'
}
@Pipe({name: `genericEquals`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class EqualsPipe extends AbstractToolsPipe implements PipeTransform {
    methodName:string = 'equals'
}
@Pipe({name: `genericExtend`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ExtendPipe extends AbstractToolsPipe implements PipeTransform {
    methodName:string = 'extend'
}
@Pipe({name: `genericRepresentObject`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class RepresentObjectPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'representObject'
}
@Pipe({name: `genericSort`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class SortPipe extends AbstractToolsPipe implements PipeTransform {
    methodName:string = 'sort'
}
@Pipe({name: `genericArrayAggregatePropertyIfEqual`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayAggregatePropertyIfEqualPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayAggregatePropertyIfEqual'
}
@Pipe({name: `genericArrayDeleteEmptyItems`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayDeleteEmptyItemsPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayDeleteEmptyItems'
}
@Pipe({name: `genericArrayExtract`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayExtractPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayExtract'
}
@Pipe({name: `genericArrayExtractIfMatches`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayExtractIfMatchesPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayExtractIfMatches'
}
@Pipe({name: `genericArrayExtractIfPropertyExists`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayExtractIfPropertyExistsPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayExtractIfPropertyExists'
}
@Pipe({name: `genericArrayExtractIfPropertyMatches`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayExtractIfPropertyMatchesPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayExtractIfPropertyMatches'
}
@Pipe({name: `genericArrayIntersect`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayIntersectPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayIntersect'
}
@Pipe({name: `genericArrayMakeRange`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayMakeRangePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayMakeRange'
}
@Pipe({name: `genericArrayMerge`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayMergePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayMerge'
}
@Pipe({name: `genericArrayMake`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayMakePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayMake'
}
@Pipe({name: `genericArrayUnique`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayUniquePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayUnique'
}
@Pipe({name: `genericArrayPermutate`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayPermutatePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayPermutate'
}
@Pipe({name: `genericArrayPermutateLength`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayPermutateLengthPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayPermutateLength'
}
@Pipe({name: `genericArraySumUpProperty`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArraySumUpPropertyPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arraySumUpProperty'
}
@Pipe({name: `genericArrayAppendAdd`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayAppendAddPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayAppendAdd'
}
@Pipe({name: `genericArrayRemove`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayRemovePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arrayRemove'
}
@Pipe({name: `genericArraySortTopological`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArraySortTopologicalPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'arraySortTopological'
}
@Pipe({name: `genericStringEscapeRegularExpressions`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringEscapeRegularExpressionsPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringEscapeRegularExpressions'
}
@Pipe({name: `genericStringConvertToValidVariableName`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringConvertToValidVariableNamePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringConvertToValidVariableName'
}
@Pipe({name: `genericStringEncodeURIComponent`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringEncodeURIComponentPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringEncodeURIComponent'
}
@Pipe({name: `genericStringAddSeparatorToPath`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringAddSeparatorToPathPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringAddSeparatorToPath'
}
@Pipe({name: `genericStringHasPathPrefix`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringHasPathPrefixPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringHasPathPrefix'
}
@Pipe({name: `genericStringGetDomainName`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringGetDomainNamePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringGetDomainName'
}
@Pipe({name: `genericStringGetPortNumber`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringGetPortNumberPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringGetPortNumber'
}
@Pipe({name: `genericStringGetProtocolName`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringGetProtocolNamePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringGetProtocolName'
}
@Pipe({name: `genericStringGetURLVariable`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringGetURLVariablePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringGetURLVariable'
}
@Pipe({name: `genericStringIsInternalURL`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringIsInternalURLPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringIsInternalURL'
}
@Pipe({name: `genericStringNormalizeURL`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringNormalizeURLPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringNormalizeURL'
}
@Pipe({name: `genericStringRepresentURL`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringRepresentURLPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringRepresentURL'
}
@Pipe({name: `genericStringCompressStyleValue`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringCompressStyleValuePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringCompressStyleValue'
}
@Pipe({name: `genericStringCamelCaseToDelimited`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringCamelCaseToDelimitedPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringCamelCaseToDelimited'
}
@Pipe({name: `genericStringCapitalize`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringCapitalizePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringCapitalize'
}
@Pipe({name: `genericStringDelimitedToCamelCase`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringDelimitedToCamelCasePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringDelimitedToCamelCase'
}
@Pipe({name: `genericStringFormat`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringFormatPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringFormat'
}
@Pipe({name: `genericStringGetEditDistance`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringGetEditDistancePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringGetEditDistance'
}
@Pipe({name: `genericStringGetRegularExpressionValidated`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringGetRegularExpressionValidatedPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringGetRegularExpressionValidated'
}
@Pipe({name: `genericStringLowerCase`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringLowerCasePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringLowerCase'
}
@Pipe({name: `genericStringFindNormalizedMatchRange`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringFindNormalizedMatchRangePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringFindNormalizedMatchRange'
}
@Pipe({name: `genericStringMark`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringMarkPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringMark'
}
@Pipe({name: `genericStringMD5`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringMD5Pipe extends AbstractToolsPipe implements PipeTransform {
    methodName:string = 'stringMD5'
}
@Pipe({name: `genericStringNormalizePhoneNumber`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringNormalizePhoneNumberPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringNormalizePhoneNumber'
}
@Pipe({name: `genericStringParseEncodedObject`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringParseEncodedObjectPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringParseEncodedObject'
}
@Pipe({name: `genericStringRepresentPhoneNumber`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringRepresentPhoneNumberPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringRepresentPhoneNumber'
}
@Pipe({name: `genericStringDecodeHTMLEntities`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringDecodeHTMLEntitiesPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringDecodeHTMLEntities'
}
@Pipe({name: `genericStringNormalizeDomNodeSelector`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringNormalizeDomNodeSelectorPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'stringNormalizeDomNodeSelector'
}
@Pipe({name: `genericNumberGetUTCTimestamp`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class NumberGetUTCTimestampPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'numberGetUTCTimestamp'
}
@Pipe({name: `genericNumberIsNotANumber`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class NumberIsNotANumberPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'numberIsNotANumber'
}
@Pipe({name: `genericNumberRound`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class NumberRoundPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'numberRound'
}
// endregion
// region object
@Pipe({name: 'genericAttachmentsAreEqual'})
/**
 * Determines if given attachments are representing the same data.
 * @property data - Database service instance.
 * @property representObject - Represent object pipe's method.
 * @property specialNames - A mapping to database specific special property
 * names.
 * @property stringMD5 - String md5 pipe's instance transform method.
 * @property zone - Zone service instance.
 */
export class AttachmentsAreEqualPipe implements PipeTransform {
    // NOTE: Could not be referenced directly to avoid cyclic dependency.
    data:any
    representObject:Function
    specialNames:PlainObject
    stringMD5:Function
    zone:NgZone
    /**
     * Gets needed services injected.
     * @param initialData - Injected initial data service instance.
     * @param injector - Application specific injector instance.
     * @param ngZone - Injected zone service instance.
     * @param representObjectPipe - Represent object pipe instance.
     * @param stringMD5Pipe - Injected string md5 pipe instance.
     * @returns Nothing.
     */
    constructor(
        initialData:InitialDataService,
        injector:Injector,
        ngZone:NgZone,
        representObjectPipe:RepresentObjectPipe,
        stringMD5Pipe:StringMD5Pipe
    ) {
        const {DataService} = require('./service')
        this.data = injector.get(DataService)
        this.representObject = representObjectPipe.transform.bind(
            representObjectPipe)
        this.specialNames =
            initialData.configuration.database.model.property.name.special
        this.stringMD5 = stringMD5Pipe.transform.bind(stringMD5Pipe)
        this.zone = ngZone
    }
    /**
     * Performs the actual transformations process.
     * @param first - First attachment to compare.
     * @param second - Second attachment to compare.
     * @returns Comparison result.
     */
    async transform(first:any, second:any):Promise<boolean> {
        /*
            Identical implies equality and should be checked first for
            performance.
        */
        if (first === second)
            return true
        // Normalize properties.
        type Data = {
            data?:any;
            given:any;
            hash?:any;
        }
        const data:{
            first:Data;
            second:Data;
        } = {
            first: {given: first},
            second: {given: second}
        }
        for (const type of ['first', 'second']) {
            if (
                typeof data[type].given !== 'object' ||
                data[type].given === null
            )
                return false
            /* eslint-disable camelcase */
            data[type].content_type =
                data[type].given.type || data[type].given.content_type
            /* eslint-enable camelcase */
            data[type].data = ((
                'data' in data[type].given
            ) ? data[type].given.data : data[type].given) || NaN
            data[type].hash =
                data[type].given.digest || data[type].given.hash || NaN
            data[type].size = data[type].given.size || data[type].given.length
        }
        // Search for an exclusion criterion.
        for (const type of ['content_type', 'size'])
            if (
                ![data.first[type], data.second[type]].includes(undefined) &&
                data.first[type] !== data.second[type]
            )
                return false
        // Check for a sufficient criterion.
        if (data.first.data === data.second.data)
            return true
        for (const type of ['first', 'second'])
            if (!data[type].hash) {
                if (data[type].data === null || !['object', 'string'].includes(
                    typeof data[type].data
                ))
                    return false
                const name:string = 'genericTemp'
                const databaseConnection:PouchDB = new this.data.database(name)
                try {
                    await this.zone.run(async ():Promise<void> => {
                        try {
                            await databaseConnection.put({
                                [this.specialNames.id]: name,
                                [this.specialNames.attachment]: {
                                    [name]: {
                                        data: data[type].data,
                                        /* eslint-disable camelcase */
                                        content_type:
                                            'application/octet-stream'
                                        /* eslint-enable camelcase */
                                    }
                                }
                            })
                            data[type].hash = (
                                await databaseConnection.get(name)
                            )[this.specialNames.attachment][name].digest
                        } catch (error) {
                            let message:string = 'unknown'
                            try {
                                message = this.representObject(error)
                            } catch (error) {}
                            console.warn(
                                'Given attachments for equality check are ' +
                                `not valid: ${message}`)
                            throw error
                        } finally {
                            await databaseConnection.destroy()
                        }
                    })
                } catch (error) {
                    return false
                }
            }
        return data.first.hash === data.second.hash
    }
}
@Pipe({name: 'genericGetFilenameByPrefix'})
/**
 * Retrieves a matching filename by given filename prefix.
 */
export class GetFilenameByPrefixPipe implements PipeTransform {
    /**
     * Performs the actual transformations process.
     * @param attachments - Documents attachments object to determine file with
     * matching file name prefix.
     * @param prefix - Prefix or nothing to search for. If nothing given first
     * file name will be returned.
     * @returns Matching file name or null if no file matches.
     */
    transform(attachments:PlainObject, prefix?:string):string|null {
        if (prefix) {
            for (const name in attachments)
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
@Pipe({name: `genericGetSubstructure`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class GetSubstructurePipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'getSubstructure'
}
@Pipe({name: 'genericAttachmentWithPrefixExists'})
/**
 * Retrieves if a filename with given prefix exists.
 * @property attachmentName - Name of attachment property.
 * @property getFilenameByPrefix - Filename by prefix pipe's transformation
 * function.
 */
export class AttachmentWithPrefixExistsPipe implements PipeTransform {
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
    ) {
        this.attachmentName =
            initialData.configuration.database.model.property.name.special
                .attachment
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
    transform(document:PlainObject, namePrefix?:string):boolean {
        if (document.hasOwnProperty(this.attachmentName)) {
            const name:string|null = this.getFilenameByPrefix(
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
@Pipe({name: 'genericExtractData'})
/**
 * Removes all meta data from a document recursively.
 * @property modelConfiguration - Model configuration object.
 */
export class ExtractDataPipe implements PipeTransform {
    modelConfiguration:PlainObject
    /**
     * Gets injected services.
     * @param initialData - Initial data service instance.
     * @returns Nothing.
     */
    constructor(initialData:InitialDataService) {
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
            for (const subItem of item)
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
        for (const key in object)
            if (
                object.hasOwnProperty(key) && (
                    !object.hasOwnProperty(specialNames.type) ||
                    this.modelConfiguration.entities[object[
                        specialNames.type
                    ]].hasOwnProperty(key) ||
                    this.modelConfiguration.entities[object[
                        specialNames.type
                    ]].hasOwnProperty(specialNames.additional)
                ) && ![
                    '_metaData',
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
                    specialNames.revisionsInformation
                ].includes(key)
            )
                result[key] = this.transform(object[key])
        if (
            object.hasOwnProperty(specialNames.attachment) &&
            object[specialNames.attachment]
        )
            for (const key in object[specialNames.attachment])
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
@Pipe({name: 'genericExtractRawData'})
/**
 * Removes all meta data and already existing data (compared to an old
 * document) from a document recursively.
 * @property attachmentsAreEqual - Attachments are equal pip's transformation
 * method.
 * @property dataScope - Date scope service instance.
 * @property equals - Equals pipe transform function.
 * @property modelConfiguration - Model configuration object.
 * @property numberGetUTCTimestamp - Date (and time) to unix timstamp converter
 * pipe transform function.
 * @property specialnames - A mapping to database specific special property
 * names.
 * @property tools - Holds the tools class from the tools service.
 */
export class ExtractRawDataPipe implements PipeTransform {
    attachmentsAreEqual:Function
    // NOTE: Could not be referenced directly to avoid cyclic dependency.
    dataScope:any
    equals:Function
    // NOTE: Could not be referenced directly to avoid cyclic dependency.
    modelConfiguration:any
    numberGetUTCTimestamp:Function
    // NOTE: Could not be referenced directly to avoid cyclic dependency.
    specialNames:any
    tools:Tools
    /**
     * Gets injected services.
     * @param attachmentsAreEqualPipe - Injected attachments are equal pipe
     * instance.
     * @param equalsPipe - Equals pipe instance.
     * @param initialData - Initial data service instance.
     * @param injector - Injector service instance.
     * @param numberGetUTCTimestampPipe - Date (and time) to unix timestamp
     * conversion.
     * @param utility - Injected utility service instance.
     * @returns Nothing.
     */
    constructor(
        attachmentsAreEqualPipe:AttachmentsAreEqualPipe,
        equalsPipe:EqualsPipe,
        initialData:InitialDataService,
        injector:Injector,
        numberGetUTCTimestampPipe:NumberGetUTCTimestampPipe,
        utility:UtilityService
    ) {
        this.attachmentsAreEqual = attachmentsAreEqualPipe.transform.bind(
            attachmentsAreEqualPipe)
        const {DataScopeService} = require('./service')
        this.dataScope = injector.get(DataScopeService)
        this.equals = equalsPipe.transform.bind(equalsPipe)
        this.modelConfiguration = initialData.configuration.database.model
        this.numberGetUTCTimestamp = numberGetUTCTimestampPipe.transform.bind(
            numberGetUTCTimestampPipe)
        this.specialNames = this.modelConfiguration.property.name.special
        this.tools = utility.fixed.tools
    }
    /**
     * Converts all (nested) date object in given data structure to their
     * corresponding utc timestamps in milliseconds.
     * @param value - Given data structure to convert.
     * @returns Given converted object.
     */
    convertDateToTimestampRecursively(value:any):any {
        if (value !== null && typeof value === 'object') {
            if (value instanceof Date)
                return this.numberGetUTCTimestamp(value)
            if (Array.isArray(value)) {
                const result:Array<any> = []
                for (const subValue of value)
                    result.push(this.convertDateToTimestampRecursively(
                        subValue))
                return result
            }
            if (Object.getPrototypeOf(value) === Object.prototype) {
                const result:PlainObject = {}
                for (const name in value)
                    if (value.hasOwnProperty(name))
                        result[name] = this.convertDateToTimestampRecursively(
                            value[name])
                return result
            }
        }
        return value
    }
    /**
     * Slices already existing attachment content from given new document
     * compared to given existing document.
     * @param newDocument - New document to take into account.
     * @param oldDocument - Old document to take into account for comparison.
     * @param specification - Specification object to check for expected
     * attachment types.
     * @returns An object indicating existing data and sliced given attachment
     * data wrapped in a promise (to asynchronous compare attachment content).
     */
    async getNotAlreadyExistingAttachmentData(
        newDocument:PlainObject,
        oldDocument:PlainObject,
        specification:PlainObject
    ):Promise<{payloadExists:boolean;result:PlainObject}> {
        const result:PlainObject = {}
        if (specification && specification.hasOwnProperty(
            this.specialNames.attachment
        ))
            for (const type in specification[this.specialNames.attachment])
                if (specification[this.specialNames.attachment].hasOwnProperty(
                    type
                )) {
                    // region retrieve all type specific existing attachments
                    const oldAttachments:PlainObject = {}
                    if (
                        oldDocument.hasOwnProperty(
                            this.specialNames.attachment) &&
                        oldDocument[this.specialNames.attachment]
                    )
                        for (const fileName in oldDocument[
                            this.specialNames.attachment
                        ])
                            if (
                                oldDocument[
                                    this.specialNames.attachment
                                ].hasOwnProperty(fileName) &&
                                new RegExp(type).test(fileName)
                            )
                                oldAttachments[fileName] = oldDocument[
                                    this.specialNames.attachment
                                ][fileName]
                    // endregion
                    if (newDocument.hasOwnProperty(
                        this.specialNames.attachment
                    ))
                        for (const fileName in newDocument[
                            this.specialNames.attachment
                        ])
                            if (
                                newDocument[
                                    this.specialNames.attachment
                                ].hasOwnProperty(fileName) &&
                                new RegExp(type).test(fileName)
                            )
                                // region determine latest attachment
                                if (
                                    newDocument[this.specialNames.attachment][
                                        fileName
                                    ].hasOwnProperty('data') ||
                                    newDocument[this.specialNames.attachment][
                                        fileName
                                    ].hasOwnProperty('stub')
                                ) {
                                    // Insert new attachment.
                                    result[fileName] = newDocument[
                                        this.specialNames.attachment
                                    ][fileName]
                                    // region remove already existing data
                                    if (oldAttachments.hasOwnProperty(
                                        fileName
                                    )) {
                                        if (await this.attachmentsAreEqual(
                                            newDocument[
                                                this.specialNames.attachment
                                            ][fileName],
                                            oldAttachments[fileName]
                                        ))
                                            /*
                                                Existing attachment has not
                                                been changed.
                                            */
                                            delete result[fileName]
                                        delete oldAttachments[fileName]
                                    } else if (
                                        Object.keys(oldAttachments).length &&
                                        specification[
                                            this.specialNames.attachment
                                        ][type].maximumNumber === 1
                                    ) {
                                        const firstOldAttachmentName:string =
                                            Object.keys(oldAttachments)[0]
                                        if (await this.attachmentsAreEqual(
                                            newDocument[
                                                this.specialNames.attachment
                                            ][fileName],
                                            oldAttachments[
                                                firstOldAttachmentName]
                                        )) {
                                            /*
                                                Existing attachment has been
                                                renamed.
                                            */
                                            result[fileName] = this.tools.copy(
                                                oldAttachments[
                                                    firstOldAttachmentName])
                                            result[fileName].name = fileName
                                        }
                                    }
                                    // endregion
                                } else if (oldAttachments.hasOwnProperty(
                                    fileName
                                ))
                                    // Existing attachment has not been changed.
                                    delete oldAttachments[fileName]
                                else if (
                                    Object.keys(oldAttachments).length &&
                                    specification[
                                        this.specialNames.attachment
                                    ][type].maximumNumber === 1
                                ) {
                                    // Existing attachment has been renamed.
                                    const firstOldAttachmentName:string =
                                        Object.keys(oldAttachments)[0]
                                    result[fileName] = this.tools.copy(
                                        oldAttachments[firstOldAttachmentName])
                                    result[fileName].name = fileName
                                    delete oldAttachments[
                                        firstOldAttachmentName]
                                }
                                // endregion
                    // region mark all not mentioned old attachments as removed
                    for (const fileName in oldAttachments)
                        if (oldAttachments.hasOwnProperty(fileName))
                            result[fileName] = {data: null}
                    // endregion
                }
        return {
            payloadExists: Object.keys(result).length !== 0,
            result
        }
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
        newData:any, oldData:any, specification?:PlainObject
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
            specification && typeof newData === 'object' && newData !== null &&
            typeof oldData === 'object' && oldData !== null
        ) {
            const newPropertyNames:Array<string> = Object.keys(newData)
            for (const name in oldData)
                if (oldData.hasOwnProperty(name)) {
                    const index:number = newPropertyNames.indexOf(name)
                    if (index !== -1)
                        newPropertyNames.splice(index, 1)
                    if (!this.modelConfiguration.property.name.reserved.concat(
                        this.specialNames.deleted,
                        this.specialNames.id,
                        this.specialNames.revision,
                        this.specialNames.type
                    ).includes(name))
                        if (newData.hasOwnProperty(name)) {
                            const result:{newData:any;payloadExists:boolean} =
                                this.removeAlreadyExistingData(
                                    newData[name],
                                    oldData[name],
                                    this.dataScope.determineNestedSpecifcation(
                                        name, specification))
                            if (result.payloadExists) {
                                payloadExists = true
                                newData[name] = result.newData
                            } else if (specification.hasOwnProperty(name))
                                delete newData[name]
                        } else {
                            payloadExists = true
                            newData[name] = null
                        }
                }
            if (newPropertyNames.length)
                payloadExists = true
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
    removeMetaData(data:PlainObject, specification?:PlainObject):any {
        if (data instanceof Date)
            return this.numberGetUTCTimestamp(data)
        if (Array.isArray(data)) {
            let index:number = 0
            for (const item of data) {
                data[index] = this.removeMetaData(item, specification)
                index += 1
            }
            return data
        }
        if (data !== null && typeof data === 'object') {
            const result:PlainObject = {}
            for (const name in data)
                if (data.hasOwnProperty(name)) {
                    const emptyEqualsToNull:boolean = Boolean((
                        specification && (
                            specification.hasOwnProperty(name) &&
                            specification[name] ||
                            specification.hasOwnProperty(
                                this.specialNames.additional) &&
                            specification[this.specialNames.additional]
                        ) || {}).emptyEqualsToNull)
                    if (
                        ![undefined, null].includes(data[name]) &&
                        !(
                            emptyEqualsToNull && (
                                data[name] === '' ||
                                Array.isArray(data[name]) &&
                                data[name].length === 0 ||
                                typeof data[name] === 'object' &&
                                !(data[name] instanceof Date) &&
                                Object.keys(data[name]).length === 0
                            )
                        )
                    )
                        if (
                            this.modelConfiguration.property.name.reserved
                                .concat(
                                    this.specialNames.deleted,
                                    this.specialNames.id,
                                    this.specialNames.revision,
                                    this.specialNames.type
                                ).includes(name)
                        )
                            result[name] = data[name]
                        else if (name === this.specialNames.attachment) {
                            if (
                                typeof data[name] === 'object' &&
                                data[name] !== null
                            ) {
                                result[name] = {}
                                for (const fileName in data[name])
                                    if (data[name].hasOwnProperty(fileName)) {
                                        result[name][fileName] = {
                                            /* eslint-disable camelcase */
                                            content_type:
                                                data[name][fileName]
                                                    .content_type ||
                                                'application/octet-stream'
                                            /* eslint-enable camelcase */
                                        }
                                        if (data[name][
                                            fileName
                                        ].hasOwnProperty('data'))
                                            result[name][fileName].data =
                                                data[name][fileName].data
                                        else
                                            for (const type of [
                                                'digest', 'stub'
                                            ])
                                                if (data[name][
                                                    fileName
                                                ].hasOwnProperty(type))
                                                    result[name][fileName][
                                                        type
                                                    ] = data[name][fileName][
                                                        type]
                                    }
                            }
                        } else if (
                            ![
                                this.specialNames.additional,
                                this.specialNames.allowedRole,
                                this.specialNames.conflict,
                                this.specialNames.constraint.execution,
                                this.specialNames.constraint.expression,
                                this.specialNames.deletedConflict,
                                this.specialNames.extend,
                                this.specialNames.localSequence,
                                this.specialNames.maximumAggregatedSize,
                                this.specialNames.minimumAggregatedSize,
                                this.specialNames.oldType,
                                this.specialNames.revisions,
                                this.specialNames.revisionsInformation
                            ].includes(name) && (
                                !specification ||
                                specification.hasOwnProperty(name) ||
                                specification.hasOwnProperty(
                                    this.specialNames.additional)
                            )
                        )
                            result[name] = this.removeMetaData(
                                data[name],
                                this.dataScope.determineNestedSpecifcation(
                                    name, specification))
                }
            return result
        }
        return data
    }
    /**
     * Implements the meta data removing of given document.
     * @param newDocument - Document to slice meta data from.
     * @param oldDocument - Optionally existing old document to take into
     * account.
     * @returns The copied sliced version of given document if changes exists
     * (checked against given old document) and "null" otherwise. Result is
     * wrapped into a promise to process binary data asynchronous.
     */
    async transform(
        newDocument:PlainObject, oldDocument?:PlainObject
    ):Promise<PlainObject|null> {
        let specification:PlainObject|null = null
        if (
            this.specialNames.type in newDocument &&
            this.modelConfiguration.entities.hasOwnProperty(newDocument[
                this.specialNames.type])
        )
            specification = this.modelConfiguration.entities[newDocument[
                this.specialNames.type]]
        let result:PlainObject = this.removeMetaData(
            newDocument, specification)
        let payloadExists:boolean = false
        if (oldDocument) {
            const attachmentDifference:{
                payloadExists:boolean;result:PlainObject
            } = await this.getNotAlreadyExistingAttachmentData(
                result, oldDocument, specification)
            if (attachmentDifference.payloadExists) {
                result[this.specialNames.attachment] =
                    attachmentDifference.result
                payloadExists = attachmentDifference.payloadExists
            }
            if (this.removeAlreadyExistingData(
                result,
                this.removeMetaData(oldDocument, specification),
                specification
            ).payloadExists)
                payloadExists = true
        }
        // Check if real payload exists in currently determined raw data.
        if (!payloadExists)
            /*
                NOTE: We have to check first level only since all unneeded
                nested values should have been already removed if not
                necessary.
            */
            for (const name in result)
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
}
@Pipe({name: 'genericIsArray'})
/**
 * Checks if given reference points to an array.
 */
export class IsArrayPipe implements PipeTransform {
    /**
     * Performs the actual check.
     * @param object - Object to compare against "undefined" or "null".
     * @returns The test result.
     */
    transform(object:any):boolean {
        return Array.isArray(object)
    }
}
@Pipe({name: 'genericIsDefined'})
/**
 * Checks if given reference is defined.
 */
export class IsDefinedPipe implements PipeTransform {
    /**
     * Performs the actual check.
     * @param object - Object to compare against "undefined" or "null".
     * @param nullIsUndefined - Indicates whether "null" should be handles as
     * "undefined".
     * @returns The test result.
     */
    transform(object:any, nullIsUndefined:boolean = false):boolean {
        return !(object === undefined || nullIsUndefined && object === null)
    }
}
@Pipe({name: 'genericLimitTo'})
/**
 * Retrieves a matching filename by given filename prefix.
 */
export class LimitToPipe implements PipeTransform {
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
@Pipe({name: 'genericMap'})
/**
 * Returns a copy of given object where each item was processed through given
 * function.
 * @property injector - Pipe specific injector to determine pipe dynamically at
 * runtime.
 */
export class MapPipe implements PipeTransform {
    injector:Injector
    /**
     * Injects the injector and saves as instance property.
     * @param injector - Pipe injector service instance.
     * @returns Nothing.
     */
    constructor(injector:Injector) {
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
        const pipe:PipeTransform = this.injector.get(pipeName)
        if (Array.isArray(object)) {
            const result:Array<any> = []
            for (const item of object)
                result.push(pipe.transform(item, ...additionalArguments))
            return result
        }
        const result:Object = {}
        for (const key in object)
            if (object.hasOwnProperty(key))
                result[key] = pipe.transform(
                    object[key], key, ...additionalArguments)
        return result
    }
}
@Pipe({name: 'genericObjectKeys'})
/**
 * Retrieves a matching filename by given filename prefix.
 */
export class ObjectKeysPipe implements PipeTransform {
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
        object?:Object, sort:any = false, reverse:boolean = false,
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
@Pipe({name: 'genericObjectValues'})
/**
 * Retrieves a matching filename by given filename prefix.
 */
export class ObjectValuesPipe implements PipeTransform {
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
        object?:Object, sort:any = false, reverse:boolean = false,
        asNumber:boolean = false
    ):Array<string> {
        if (typeof object === 'object' && object !== null) {
            const result:Array<string> = Object.values(object)
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
@Pipe({name: 'genericReverse'})
/**
 * Reverses a given list.
 */
export class ReversePipe implements PipeTransform {
    /**
     * Performs the "Arrays" native "reverse()" method.
     * @param list - List to reverse.
     * @param copy - Indicates whether a reversed copy should be created or
     * reversion can be done in place.
     * @returns Reverted arrays.
     */
    transform(list?:Array<any>, copy:boolean = false):Array<any> {
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
@Pipe({name: 'genericType'})
/**
 * Determines type of given object.
 */
export class TypePipe implements PipeTransform {
    /**
     * Returns type of given object.
     * @param object - Object to determine type of.
     * @returns Type name.
     */
    transform(object:any):string {
        return typeof object
    }
}
// endregion
// region array
@Pipe({name: 'genericArrayDependentConcat'})
/**
 * Dependently concatenate given data to piped data.
 */
export class ArrayDependentConcatPipe/* immplements PipeTransform*/ {
    /**
     * Does the given array transformation logic.
     * @param array - Array to transform.
     * @param indicator - Indicator to decide if concatenation should be done.
     * @param item - One ore object or array of objects to concatenate.
     * @returns Transformed given array.
     */
    transform(array:Array<any>, indicator:boolean, item:any):Array<any> {
        if (indicator)
            return array.concat(item)
        return array
    }
}
// endregion
// region string
@Pipe({name: 'genericStringEndsWith'})
/**
 * Forwards javaScript's native "stringEndsWith" method.
 */
export class StringEndsWithPipe implements PipeTransform {
    /**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param needle - Suffix to search for.
     * @returns The boolean result.
     */
    transform(string?:string, needle?:string):boolean {
        return typeof string === 'string' && typeof needle === 'string' &&
            string.endsWith(needle)
    }
}
@Pipe({name: 'genericStringHasTimeSuffix'})
/**
 * Determines if given string has a time indicating suffix.
 */
export class StringHasTimeSuffixPipe implements PipeTransform {
    /**
     * Performs the actual string suffix check.
     * @param value - To search in.
     * @returns The boolean result.
     */
    transform(value?:string):boolean {
        if (typeof value !== 'string')
            return false
        return (
            value.endsWith('Date') ||
            value.endsWith('Time') ||
            value === 'timestamp'
        )
    }
}
@Pipe({name: 'genericStringMatch'})
/**
 * Tests if given pattern matches against given subject.
 */
export class StringMatchPipe implements PipeTransform {
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
@Pipe({name: 'genericStringMaximumLength'})
/**
 * Trims given string if it is longer then given length.
 */
export class StringMaximumLengthPipe implements PipeTransform {
    /**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param maximumLength - Maximum number of symbols in given string.
     * @param suffix - Suffix to append if given string has to bee trimmed.
     * @returns The potentially trimmed given string.
     */
    transform(
        string?:string, maximumLength:number = 100, suffix:string = '...'
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
@Pipe({name: 'genericStringReplace'})
/**
 * Provides javascript's native string replacement method as pipe.
 */
export class StringReplacePipe implements PipeTransform {
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
        return string.replace(
            typeof search === 'string' ?
                new RegExp(search, modifier) :
                search,
            replacement)
    }
}
@Pipe({name: 'genericStringSafeHTML'})
/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */
export class StringSafeHTMLPipe implements PipeTransform {
    transform:(value:string) => SafeHtml
    /**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */
    constructor(domSanitizer:DomSanitizer) {
        this.transform = domSanitizer.bypassSecurityTrustHtml.bind(
            domSanitizer)
    }
}
@Pipe({name: 'genericStringSafeResourceURL'})
/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */
export class StringSafeResourceURLPipe implements PipeTransform {
    transform:(value:string) => SafeUrl
    /**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */
    constructor(domSanitizer:DomSanitizer) {
        this.transform = domSanitizer.bypassSecurityTrustResourceUrl.bind(
            domSanitizer)
    }
}
@Pipe({name: 'genericStringSafeScript'})
/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */
export class StringSafeScriptPipe implements PipeTransform {
    transform:(value:string) => SafeScript
    /**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */
    constructor(domSanitizer:DomSanitizer) {
        this.transform = domSanitizer.bypassSecurityTrustScript.bind(
            domSanitizer)
    }
}
@Pipe({name: 'genericStringSafeStyle'})
/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */
export class StringSafeStylePipe implements PipeTransform {
    transform:(value:string) => SafeStyle
    /**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */
    constructor(domSanitizer:DomSanitizer) {
        this.transform = domSanitizer.bypassSecurityTrustStyle.bind(
            domSanitizer)
    }
}
@Pipe({name: 'genericStringSafeURL'})
/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */
export class StringSafeURLPipe implements PipeTransform {
    transform:(value:string) => SafeUrl
    /**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */
    constructor(domSanitizer:DomSanitizer) {
        this.transform = domSanitizer.bypassSecurityTrustUrl.bind(
            domSanitizer)
    }
}
@Pipe({name: 'genericStringShowIfPatternMatches'})
/**
 * Returns given string if it matches given pattern.
 */
export class StringShowIfPatternMatchesPipe implements PipeTransform {
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
        let indicator:boolean = (
            typeof pattern === 'string' ?
                new RegExp(pattern, modifier) : pattern
        ).test(string)
        if (invert)
            indicator = !indicator
        return indicator ? string : ''
    }
}
@Pipe({name: 'genericStringSliceMatch'})
/**
 * Returns a matched part of given subject with given pattern. Default is the
 * whole (zero) matched part.
 */
export class StringSliceMatchPipe implements PipeTransform {
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
        subject:string|null|undefined, pattern:string, index:number = 0,
        modifier:string = ''
    ):string {
        if (typeof subject === 'string') {
            const match:Array<string>|null = subject.match(new RegExp(
                // IgnoreTypeCheck
                pattern, modifier))
            if (match && typeof match[index] === 'string')
                return match[index]
        }
        return ''
    }
}
@Pipe({name: 'genericStringStartsWith'})
/**
 * Forwards javascript's native "stringStartsWith" method.
 */
export class StringStartsWithPipe implements PipeTransform {
    /**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param needle - Prefix to search for.
     * @returns The boolean result.
     */
    transform(string?:string, needle?:string):boolean {
        return typeof string === 'string' && typeof needle === 'string' &&
            string.startsWith(needle)
    }
}
@Pipe({name: 'genericStringTemplate'})
/**
 * Provides angular's template engine as pipe.
 * @property extend - Extend object's pipe transform method.
 */
export class StringTemplatePipe implements PipeTransform {
    extend:Function
    /**
     * Sets injected extend object pipe instance as instance property.
     * @param extendPipe - Injected extend object pipe instance.
     * @returns Nothing.
     */
    constructor(extendPipe:ExtendPipe) {
        this.extend = extendPipe.transform.bind(extendPipe)
    }
    /**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param scopes - Scopes to merge and render again given template string
     * again.
     * @returns The rendered result.
     */
    transform(string:string = '', ...scopes:Array<PlainObject>):string {
        const scope:PlainObject = this.extend(true, {}, ...scopes)
        const validNames:Array<string> = Object.keys(scope).filter((
            name:string
        ):boolean => {
            try {
                new Function(`var ${name}`)()
            } catch (error) {
                return false
            }
            return true
        })
        return new Function('scope', ...validNames, `return \`${string}\``)(
            scope, ...validNames.map((name:string):any => scope[name]))
    }
}
// / endregion
// region number
@Pipe({name: 'genericNumberPercent'})
/**
 * Returns part in percent of all.
 */
export class NumberPercentPipe implements PipeTransform {
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
// endregion
// region module
@NgModule({
    /*
        NOTE: Running "moduleHelper.determineDeclarations()" is not yet
        supported by the AOT-Compiler.
    */
    declarations: [
        // region wrapped
        // / region object
        ConvertCircularObjectToJSONPipe,
        EqualsPipe,
        ExtendPipe,
        RepresentObjectPipe,
        SortPipe,
        // / endregion
        // / region array
        ArrayAggregatePropertyIfEqualPipe,
        ArrayDeleteEmptyItemsPipe,
        ArrayExtractPipe,
        ArrayExtractIfMatchesPipe,
        ArrayExtractIfPropertyExistsPipe,
        ArrayExtractIfPropertyMatchesPipe,
        ArrayIntersectPipe,
        ArrayMakeRangePipe,
        ArrayMergePipe,
        ArrayMakePipe,
        ArrayPermutatePipe,
        ArrayPermutateLengthPipe,
        ArrayUniquePipe,
        ArraySumUpPropertyPipe,
        ArrayAppendAddPipe,
        ArrayRemovePipe,
        ArraySortTopologicalPipe,
        // / endregion
        // / region string
        StringEscapeRegularExpressionsPipe,
        StringConvertToValidVariableNamePipe,
        StringEncodeURIComponentPipe,
        StringAddSeparatorToPathPipe,
        StringHasPathPrefixPipe,
        StringGetDomainNamePipe,
        StringGetPortNumberPipe,
        StringGetProtocolNamePipe,
        StringGetURLVariablePipe,
        StringIsInternalURLPipe,
        StringNormalizeURLPipe,
        StringRepresentURLPipe,
        StringCompressStyleValuePipe,
        StringCamelCaseToDelimitedPipe,
        StringCapitalizePipe,
        StringDelimitedToCamelCasePipe,
        StringFormatPipe,
        StringGetEditDistancePipe,
        StringGetRegularExpressionValidatedPipe,
        StringLowerCasePipe,
        StringFindNormalizedMatchRangePipe,
        StringMarkPipe,
        StringMD5Pipe,
        StringNormalizePhoneNumberPipe,
        StringParseEncodedObjectPipe,
        StringRepresentPhoneNumberPipe,
        StringDecodeHTMLEntitiesPipe,
        StringNormalizeDomNodeSelectorPipe,
        // / endregion
        // / region number
        NumberGetUTCTimestampPipe,
        NumberIsNotANumberPipe,
        NumberRoundPipe,
        // / endregion
        // endregion
        // region object
        AttachmentsAreEqualPipe,
        GetFilenameByPrefixPipe,
        GetSubstructurePipe,
        AttachmentWithPrefixExistsPipe,
        ExtractDataPipe,
        ExtractRawDataPipe,
        IsArrayPipe,
        IsDefinedPipe,
        LimitToPipe,
        MapPipe,
        ObjectKeysPipe,
        ObjectValuesPipe,
        ReversePipe,
        TypePipe,
        // endregion
        // region array
        ArrayDependentConcatPipe,
        // endregion
        // region string
        StringEndsWithPipe,
        StringHasTimeSuffixPipe,
        StringMatchPipe,
        StringMaximumLengthPipe,
        StringReplacePipe,
        StringSafeHTMLPipe,
        StringSafeResourceURLPipe,
        StringSafeScriptPipe,
        StringSafeStylePipe,
        StringSafeURLPipe,
        StringShowIfPatternMatchesPipe,
        StringSliceMatchPipe,
        StringStartsWithPipe,
        StringTemplatePipe,
        // endregion
        // region number
        NumberPercentPipe
        // endregion
    ],
    /*
        NOTE: Running "moduleHelper.determineExports()" is not yet supported by
        the AOT-Compiler.
    */
    exports: [
        // region wrapped
        // / region object
        ConvertCircularObjectToJSONPipe,
        EqualsPipe,
        ExtendPipe,
        RepresentObjectPipe,
        SortPipe,
        // / endregion
        // / region array
        ArrayMergePipe,
        ArrayMakePipe,
        ArrayUniquePipe,
        ArrayAggregatePropertyIfEqualPipe,
        ArrayDeleteEmptyItemsPipe,
        ArrayExtractPipe,
        ArrayExtractIfMatchesPipe,
        ArrayExtractIfPropertyExistsPipe,
        ArrayExtractIfPropertyMatchesPipe,
        ArrayIntersectPipe,
        ArrayMakeRangePipe,
        ArraySumUpPropertyPipe,
        ArrayAppendAddPipe,
        ArrayRemovePipe,
        ArraySortTopologicalPipe,
        // / endregion
        // / region string
        StringEscapeRegularExpressionsPipe,
        StringConvertToValidVariableNamePipe,
        StringEncodeURIComponentPipe,
        StringAddSeparatorToPathPipe,
        StringHasPathPrefixPipe,
        StringGetDomainNamePipe,
        StringGetPortNumberPipe,
        StringGetProtocolNamePipe,
        StringGetURLVariablePipe,
        StringIsInternalURLPipe,
        StringNormalizeURLPipe,
        StringRepresentURLPipe,
        StringCompressStyleValuePipe,
        StringCamelCaseToDelimitedPipe,
        StringCapitalizePipe,
        StringDelimitedToCamelCasePipe,
        StringFormatPipe,
        StringGetRegularExpressionValidatedPipe,
        StringLowerCasePipe,
        StringFindNormalizedMatchRangePipe,
        StringMarkPipe,
        StringMD5Pipe,
        StringNormalizePhoneNumberPipe,
        StringParseEncodedObjectPipe,
        StringRepresentPhoneNumberPipe,
        StringDecodeHTMLEntitiesPipe,
        StringNormalizeDomNodeSelectorPipe,
        // / endregion
        // / region number
        NumberGetUTCTimestampPipe,
        NumberIsNotANumberPipe,
        NumberRoundPipe,
        // / endregion
        // endregion
        // region object
        AttachmentsAreEqualPipe,
        GetFilenameByPrefixPipe,
        GetSubstructurePipe,
        AttachmentWithPrefixExistsPipe,
        ExtractDataPipe,
        ExtractRawDataPipe,
        IsArrayPipe,
        IsDefinedPipe,
        LimitToPipe,
        MapPipe,
        ObjectKeysPipe,
        ObjectValuesPipe,
        ReversePipe,
        TypePipe,
        // endregion
        // region array
        ArrayDependentConcatPipe,
        // endregion
        // region string
        StringEndsWithPipe,
        StringHasTimeSuffixPipe,
        StringMatchPipe,
        StringMaximumLengthPipe,
        StringReplacePipe,
        StringSafeHTMLPipe,
        StringSafeResourceURLPipe,
        StringSafeScriptPipe,
        StringSafeStylePipe,
        StringSafeURLPipe,
        StringShowIfPatternMatchesPipe,
        StringSliceMatchPipe,
        StringStartsWithPipe,
        StringTemplatePipe,
        // endregion
        // region number
        NumberPercentPipe
        // endregion
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'generic-pipe-universal'})
    ],
    /*
        NOTE: Running "moduleHelper.determineProviders()" is not yet supported
        by the AOT-Compiler.
    */
    providers: [
        // region wrapped
        // / region object
        ConvertCircularObjectToJSONPipe,
        EqualsPipe,
        ExtendPipe,
        RepresentObjectPipe,
        SortPipe,
        // / endregion
        // / region array
        ArrayMergePipe,
        ArrayMakePipe,
        ArrayUniquePipe,
        ArrayAggregatePropertyIfEqualPipe,
        ArrayDeleteEmptyItemsPipe,
        ArrayExtractPipe,
        ArrayExtractIfMatchesPipe,
        ArrayExtractIfPropertyExistsPipe,
        ArrayExtractIfPropertyMatchesPipe,
        ArrayIntersectPipe,
        ArrayMakeRangePipe,
        ArraySumUpPropertyPipe,
        ArrayAppendAddPipe,
        ArrayRemovePipe,
        ArraySortTopologicalPipe,
        // / endregion
        // / region string
        StringEscapeRegularExpressionsPipe,
        StringConvertToValidVariableNamePipe,
        StringEncodeURIComponentPipe,
        StringAddSeparatorToPathPipe,
        StringHasPathPrefixPipe,
        StringGetDomainNamePipe,
        StringGetPortNumberPipe,
        StringGetProtocolNamePipe,
        StringGetURLVariablePipe,
        StringIsInternalURLPipe,
        StringNormalizeURLPipe,
        StringRepresentURLPipe,
        StringCompressStyleValuePipe,
        StringCamelCaseToDelimitedPipe,
        StringCapitalizePipe,
        StringDelimitedToCamelCasePipe,
        StringFormatPipe,
        StringGetRegularExpressionValidatedPipe,
        StringLowerCasePipe,
        StringFindNormalizedMatchRangePipe,
        StringMarkPipe,
        StringMD5Pipe,
        StringNormalizePhoneNumberPipe,
        StringParseEncodedObjectPipe,
        StringRepresentPhoneNumberPipe,
        StringDecodeHTMLEntitiesPipe,
        StringNormalizeDomNodeSelectorPipe,
        // / endregion
        // / region number
        NumberGetUTCTimestampPipe,
        NumberIsNotANumberPipe,
        NumberRoundPipe,
        // / endregion
        // endregion
        // region object
        AttachmentsAreEqualPipe,
        GetFilenameByPrefixPipe,
        GetSubstructurePipe,
        AttachmentWithPrefixExistsPipe,
        ExtractDataPipe,
        ExtractRawDataPipe,
        IsArrayPipe,
        IsDefinedPipe,
        LimitToPipe,
        MapPipe,
        ObjectKeysPipe,
        ObjectValuesPipe,
        ReversePipe,
        TypePipe,
        // endregion
        // region array
        ArrayDependentConcatPipe,
        // endregion
        // region string
        StringEndsWithPipe,
        StringHasTimeSuffixPipe,
        StringMatchPipe,
        StringMaximumLengthPipe,
        StringReplacePipe,
        StringSafeHTMLPipe,
        StringSafeResourceURLPipe,
        StringSafeScriptPipe,
        StringSafeStylePipe,
        StringSafeURLPipe,
        StringShowIfPatternMatchesPipe,
        StringSliceMatchPipe,
        StringStartsWithPipe,
        StringTemplatePipe,
        // endregion
        // region number
        NumberPercentPipe,
        // endregion
        DatePipe
    ]
})
/**
 * Represents the importable angular module.
 */
export class Module {}
export default Module
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
