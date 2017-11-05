// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module angularGeneric */
'use strict';
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
import Tools, { $, $DomNode, DomNode, globalContext, PlainObject } from 'clientnode';
import { AfterContentChecked, AfterViewInit, APP_INITIALIZER, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Directive, ElementRef, EventEmitter, forwardRef, Injectable, /* eslint-disable no-unused-vars */
Inject, /* eslint-enable no-unused-vars */
Injector, Input, NgModule, NgZone, OnChanges, OnDestroy, OnInit, /* eslint-disable no-unused-vars */
Optional, /* eslint-enable no-unused-vars */
Output, Pipe, PipeTransform, /* eslint-disable no-unused-vars */
PLATFORM_ID, /* eslint-enable no-unused-vars */
Renderer2, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DatePipe, isPlatformServer } from '@angular/common';
import { DefaultValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { 
// IgnoreTypeCheck
MatButtonModule, MatCardModule, /* eslint-disable no-unused-vars */
MAT_DIALOG_DATA, /* eslint-enable no-unused-vars */
MatDialog, MatDialogRef, MatDialogModule, MatInputModule, MatSelectModule, MatSnackBar, MatSnackBarConfig, MatTooltipModule } from '@angular/material';
import { BrowserModule, DomSanitizer, SafeScript, SafeHtml, SafeResourceUrl, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, NavigationEnd, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import PouchDB from 'pouchdb';
import PouchDBFindPlugin from 'pouchdb-find';
import PouchDBValidationPlugin from 'pouchdb-validation';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register');
}
catch (error) { }
import { defaultAnimation } from './animation';
// endregion
if (typeof CHANGE_DETECTION_STRATEGY_NAME === 'undefined')
    /* eslint-disable no-var */
    var CHANGE_DETECTION_STRATEGY_NAME = 'default';
/* eslint-enable no-var */
if (typeof UTC_BUILD_TIMESTAMP === 'undefined')
    /* eslint-disable no-var */
    var UTC_BUILD_TIMESTAMP = 1;
/* eslint-enable no-var */
export let LAST_KNOWN_DATA = {
    data: {}, sequence: 'now'
};
export let currentInstanceToSearchInjectorFor = null;
export const SYMBOL = `${new Date().getTime()}/${Math.random()}`;
// region configuration
export const CODE_MIRROR_DEFAULT_OPTIONS = {
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
};
const tinymceBasePath = '/tinymce/';
export const TINYMCE_DEFAULT_OPTIONS = {
    /* eslint-disable camelcase */
    // region paths
    baseURL: tinymceBasePath,
    scriptPath: `${tinymceBasePath}tinymce.min.js`,
    skin_url: `${tinymceBasePath}skins/lightgray`,
    theme_url: `${tinymceBasePath}themes/modern/theme.min.js`,
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
};
// endregion
// region basic services
// IgnoreTypeCheck
/**
 * Injectable angular service for the tools class.
 * @property static:$ - Holds an instance of a generic dom abstraction layer
 * like jquery.
 * @property static:globalContext - Hold a reference to the environment specific
 * global scope.
 * @property static:tools - Holds a reference to the wrapped tools class.
 *
 * @property fixed - Reference to this static members.
 * @property tools - Holds an injector scope specific tools instance.
 */
export class UtilityService {
}
// IgnoreTypeCheck
/**
 * Serves initial data provided via a global variable.
 * @property static:defaultScope - Saves all minimal needed environment
 * variables.
 * @property static:injectors - Saves a set of all root injectors.
 * @property static:removeFoundData - Indicates whether to remove found data to
 * tidy up global scope or free memory (by removing dom node attributes).
 *
 * @property configuration - Expected initial data name.
 * @property utility - Injected or given utility service instance.
 */
export class InitialDataService {
    /**
         * Sets all properties of given initial data as properties to this
         * initializing instance.
         * @param utility - Saves the generic tools service instance.
         * @returns Nothing.
         */
    constructor(utility) {
        if (!utility)
            utility = new UtilityService();
        this.tools = utility.fixed.tools;
        this.set(InitialDataService.defaultScope, 'genericInitialData' in utility.fixed.globalContext ?
            utility.fixed.globalContext.genericInitialData :
            {});
        if (InitialDataService.removeFoundData)
            delete utility.fixed.globalContext.genericInitialData;
        if ('document' in utility.fixed.globalContext &&
            'querySelector' in utility.fixed.globalContext.document) {
            // TODO how to get right dom node?
            const domNode = utility.fixed.globalContext.document.querySelector('application');
            if (domNode && 'getAttribute' in domNode && domNode.getAttribute('initialData')) {
                this.set(JSON.parse(domNode.getAttribute('initialData')));
                if (InitialDataService.removeFoundData)
                    domNode.removeAttribute('initialData');
            }
        }
    }
    /**
         * Sets initial data.
         * @param parameter - All given data objects will be merged into current
         * scope.
         * @returns Complete generated data.
         */
    set(...parameter) {
        return this.tools.extendObject(true, this, ...parameter);
    }
}
/**
 * Helper function to easy create abstract classes without tight bounds.
 * @param injector - Application specific injector to use instead auto
 * detected one.
 * @param instance - Instance reference to determine corresponding responsible
 * injector.
 * @param constructor - Matched to given instance to try to inject for each
 * known injector instance.
 * @returns Nothing.
 */
export const determineInjector = (injector, instance, constructor) => {
    if (injector)
        return injector.get.bind(injector);
    if (currentInstanceToSearchInjectorFor === this)
        throw SYMBOL;
    currentInstanceToSearchInjectorFor = this;
    for (const injector of InitialDataService.injectors)
        try {
            if (injector.get(constructor, NaN) === instance)
                return injector.get.bind(injector);
        }
        catch (error) {
            currentInstanceToSearchInjectorFor = null;
            if (error === SYMBOL)
                return injector.get.bind(injector);
            throw error;
        }
    currentInstanceToSearchInjectorFor = null;
    if (InitialDataService.injectors.size === 1) {
        console.warn('Could not determine injector, but using the only registered ' +
            'one. This will fail an multiple application instances.');
        const injector = Array.from(InitialDataService.injectors)[0];
        return injector.get.bind(injector);
    }
    throw new Error('No unambiguously injector could be determined automatically.');
};
// endregion
// region pipes
// / region wrapped
/**
 * Generic pipe transform class to wrapp simple pure functions as pipe
 * transformation.
 * @property methodName - Name of forwarded method.
 */
export class AbstractToolsPipe {
    /**
         * Performs the concrete conversion logic.
         * @param parameter - Saves all generic parameter to forward it
         * for triggering the underlying tools utility.
         * @returns Whatever the underlying tools function returns.
         */
    transform(...parameter) {
        return UtilityService.tools[this.methodName](...parameter);
    }
}
/**
 * Generic pipe transform class to wrapp simple pure functions as inverted pipe
 * transformation.
 * @property methodName - Name of forwarded method.
 */
export class AbstractInvertedToolsPipe extends AbstractToolsPipe {
    /**
         * Performs the concrete conversion logic.
         * @param parameter - Saves all generic parameter to
         * forward it for triggering the underlying tools utility.
         * @returns Whatever the underlying tools function returns.
         */
    transform(...parameter) {
        const tools = UtilityService.tools;
        // IgnoreTypeCheck
        return tools.invertArrayFilter(tools[this.methodName])(...parameter);
    }
}
/*
    NOTE: This would dynamically load all possible pipes from the "Tools"
    library but does not support angular's ahead of time compilation yet.

// // region configuration
const invert:Array<string> = ['array']
const methodGroups:PlainObject = {
    '': [
        'convertCircularObjectToJSON',
        'equals',
        'extendObject',
        'representObject',
        'sort'
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
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ConvertCircularObjectToJSONPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class EqualsPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ExtendObjectPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class RepresentObjectPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class SortPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayMergePipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayMakePipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayUniquePipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayAggregatePropertyIfEqualPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayDeleteEmptyItemsPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayExtractPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayExtractIfMatchesPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayExtractIfPropertyExistsPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayExtractIfPropertyMatchesPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayIntersectPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayMakeRangePipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArraySumUpPropertyPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayAppendAddPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArrayRemovePipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ArraySortTopologicalPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringEscapeRegularExpressionsPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringConvertToValidVariableNamePipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringEncodeURIComponentPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringAddSeparatorToPathPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringHasPathPrefixPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringGetDomainNamePipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringGetPortNumberPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringGetProtocolNamePipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringGetURLVariablePipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringIsInternalURLPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringNormalizeURLPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringRepresentURLPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringCompressStyleValuePipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringCamelCaseToDelimitedPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringCapitalizePipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringDelimitedToCamelCasePipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringFormatPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringGetRegularExpressionValidatedPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringLowerCasePipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringFindNormalizedMatchRangePipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringMarkPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringMD5Pipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringNormalizePhoneNumberPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringParseEncodedObjectPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringRepresentPhoneNumberPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringDecodeHTMLEntitiesPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class StringNormalizeDomNodeSelectorPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class NumberGetUTCTimestampPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class NumberIsNotANumberPipe extends AbstractToolsPipe {
}
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class NumberRoundPipe extends AbstractToolsPipe {
}
// / endregion
// / region object
// IgnoreTypeCheck
/**
 * Determines if given attachments are representing the same data.
 * @property data - Database service instance.
 * @property ngZone - Execution context service instance.
 * @property representObject - Represent object pipe's method.
 * @property specialNames - A mapping to database specific special property
 * names.
 * @property stringMD5 - String md5 pipe's instance transform method.
 */
export class AttachmentsAreEqualPipe {
    /**
         * Gets needed services injected.
         * @param initialData - Injected initial data service instance.
         * @param injector - Application specific injector instance.
         * @param ngZone - Injected execution context service instance.
         * @param representObjectPipe - Represent object pipe instance.
         * @param stringMD5Pipe - Injected string md5 pipe instance.
         * @returns Nothing.
         */
    constructor(initialData, injector, ngZone, representObjectPipe, stringMD5Pipe) {
        this.data = injector.get(DataService);
        this.ngZone = ngZone;
        this.representObject = representObjectPipe.transform.bind(representObjectPipe);
        this.specialNames =
            initialData.configuration.database.model.property.name.special;
        this.stringMD5 = stringMD5Pipe.transform.bind(stringMD5Pipe);
    }
    /**
         * Performs the actual transformations process.
         * @param first - First attachment to compare.
         * @param second - Second attachment to compare.
         * @returns Comparison result.
         */
    async transform(first, second) {
        /*
                    Identical implies equality and should be checked first for
                    performance.
                */
        if (first === second)
            return true;
        const data = {
            first: { given: first },
            second: { given: second }
        };
        for (const type of ['first', 'second']) {
            if (typeof data[type].given !== 'object' ||
                data[type].given === null)
                return false;
            /* eslint-disable camelcase */
            data[type].content_type =
                data[type].given.type || data[type].given.content_type;
            /* eslint-enable camelcase */
            data[type].data = (('data' in data[type].given) ? data[type].given.data : data[type].given) || NaN;
            data[type].hash =
                data[type].given.digest || data[type].given.hash || NaN;
            data[type].size = data[type].given.size || data[type].given.length;
        }
        // Search for an exclusion criterion.
        for (const type of ['content_type', 'size'])
            if (![data.first[type], data.second[type]].includes(undefined) &&
                data.first[type] !== data.second[type])
                return false;
        // Check for a sufficient criterion.
        if (data.first.data === data.second.data)
            return true;
        for (const type of ['first', 'second'])
            if (!data[type].hash) {
                if (data[type].data === null || !['object', 'string'].includes(typeof data[type].data))
                    return false;
                const name = 'genericTemp';
                const databaseConnection = new this.data.database(name);
                try {
                    await databaseConnection.put({
                        [this.specialNames.id]: name,
                        [this.specialNames.attachment]: {
                            [name]: {
                                data: data[type].data,
                                /* eslint-disable camelcase */
                                content_type: 'application/octet-stream'
                            }
                        }
                    });
                    data[type].hash = (await databaseConnection.get(name))[this.specialNames.attachment][name].digest;
                }
                catch (error) {
                    let message = 'unknown';
                    try {
                        message = this.representObject(error);
                    }
                    catch (error) { }
                    console.warn('Given attachments for equality check are not ' +
                        `valid: ${message}`);
                    return false;
                }
                finally {
                    await databaseConnection.destroy();
                }
            }
        return data.first.hash === data.second.hash;
    }
}
// IgnoreTypeCheck
/**
 * Retrieves a matching filename by given filename prefix.
 */
export class GetFilenameByPrefixPipe {
    /**
         * Performs the actual transformations process.
         * @param attachments - Documents attachments object to determine file with
         * matching file name prefix.
         * @param prefix - Prefix or nothing to search for. If nothing given first
         * file name will be returned.
         * @returns Matching file name or null if no file matches.
         */
    transform(attachments, prefix) {
        if (prefix) {
            for (const name in attachments)
                if (attachments.hasOwnProperty(name) && name.startsWith(prefix))
                    return name;
        }
        else {
            const keys = Object.keys(attachments);
            if (keys.length)
                return keys[0];
        }
        return null;
    }
}
// IgnoreTypeCheck
/**
 * Retrieves if a filename with given prefix exists.
 * @property attachmentName - Name of attachment property.
 * @property getFilenameByPrefix - Filename by prefix pipe's transformation
 * function.
 */
export class AttachmentWithPrefixExistsPipe {
    /**
         * Gets needed file name by prefix pipe injected.
         * @param getFilenameByPrefixPipe - Filename by prefix pipe instance.
         * @param initialData - Injected initial data service.
         * @returns Nothing.
         */
    constructor(getFilenameByPrefixPipe, initialData) {
        this.attachmentName =
            initialData.configuration.database.model.property.name.special
                .attachment;
        this.getFilenameByPrefix = getFilenameByPrefixPipe.transform.bind(getFilenameByPrefixPipe);
    }
    /**
         * Performs the actual transformations process.
         * @param document - Documents with attachments to analyse.
         * @param namePrefix - Prefix or nothing to search for. If nothing given
         * "false" will be returned either.
         * @returns Boolean indication if given file name prefix exists.
         */
    transform(document, namePrefix) {
        if (document.hasOwnProperty(this.attachmentName)) {
            const name = this.getFilenameByPrefix(document[this.attachmentName], namePrefix);
            if (name)
                return document[this.attachmentName][name].hasOwnProperty('data') && ![undefined, null].includes(document[this.attachmentName][name].data);
        }
        return false;
    }
}
// IgnoreTypeCheck
/**
 * Removes all meta data from a document recursively.
 * @property modelConfiguration - Model configuration object.
 */
export class ExtractDataPipe {
    /**
         * Gets injected services.
         * @param initialData - Initial data service instance.
         * @returns Nothing.
         */
    constructor(initialData) {
        this.modelConfiguration = initialData.configuration.database.model;
    }
    /**
         * Extracts raw data from given scope item.
         * @param item - Item to extract data from.
         * @returns Given extracted data.
         */
    transform(item) {
        if (Array.isArray(item)) {
            const result = [];
            for (const subItem of item)
                result.push(this.transform(subItem));
            return result;
        }
        else if (typeof item === 'object' && item !== null) {
            const specialNames = this.modelConfiguration.property.name.special;
            if (item.hasOwnProperty('value')) {
                if (typeof item.value === 'object' &&
                    item.value !== null &&
                    specialNames.type in item.value &&
                    this.modelConfiguration.entities.hasOwnProperty(item.value[specialNames.type]))
                    return this._extractFromObject(item.value);
                return this.transform(item.value);
            }
            else if (specialNames.type in item &&
                this.modelConfiguration.entities.hasOwnProperty(item[specialNames.type]))
                return this._extractFromObject(item);
            return item;
        }
        return item;
    }
    /**
         * Retrieves raw data (without meta data) for given scope recursively.
         * @param object - Object to use to determine data from.
         * @returns Resolved data.
         */
    _extractFromObject(object) {
        const specialNames = this.modelConfiguration.property.name.special;
        const result = {};
        for (const key in object)
            if (object.hasOwnProperty(key) && (!object.hasOwnProperty(specialNames.type) ||
                this.modelConfiguration.entities[object[specialNames.type]].hasOwnProperty(key) ||
                this.modelConfiguration.entities[object[specialNames.type]].hasOwnProperty(specialNames.additional)) && ![
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
            ].includes(key))
                result[key] = this.transform(object[key]);
        if (object.hasOwnProperty(specialNames.attachment) &&
            object[specialNames.attachment])
            for (const key in object[specialNames.attachment])
                if (object[specialNames.attachment].hasOwnProperty(key) &&
                    typeof object[specialNames.attachment][key] === 'object' &&
                    object[specialNames.attachment][key] !== null &&
                    'hasOwnProperty' in object[specialNames.attachment] &&
                    object[specialNames.attachment][key].hasOwnProperty('value') &&
                    object[specialNames.attachment][key].value) {
                    if (!result[specialNames.attachment])
                        result[specialNames.attachment] = {};
                    result[specialNames.attachment][object[specialNames.attachment][key].value.name] = object[specialNames.attachment][key].value;
                }
        return result;
    }
}
// IgnoreTypeCheck
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
export class ExtractRawDataPipe {
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
    constructor(attachmentsAreEqualPipe, equalsPipe, initialData, injector, numberGetUTCTimestampPipe, utility) {
        this.attachmentsAreEqual = attachmentsAreEqualPipe.transform.bind(attachmentsAreEqualPipe);
        this.dataScope = injector.get(DataScopeService);
        this.equals = equalsPipe.transform.bind(equalsPipe);
        this.modelConfiguration = initialData.configuration.database.model;
        this.numberGetUTCTimestamp = numberGetUTCTimestampPipe.transform.bind(numberGetUTCTimestampPipe);
        this.specialNames = this.modelConfiguration.property.name.special;
        this.tools = utility.fixed.tools;
    }
    /**
         * Converts all (nested) date object in given data structure to their
         * corresponding utc timestamps in milliseconds.
         * @param value - Given data structure to convert.
         * @returns Given converted object.
         */
    convertDateToTimestampRecursively(value) {
        if (typeof value === 'object' && value !== null) {
            if (value instanceof Date)
                return this.numberGetUTCTimestamp(value);
            if (Array.isArray(value)) {
                const result = [];
                for (const subValue of value)
                    result.push(this.convertDateToTimestampRecursively(subValue));
                return result;
            }
            if (Object.getPrototypeOf(value) === Object.prototype) {
                const result = {};
                for (const name in value)
                    if (value.hasOwnProperty(name))
                        result[name] = this.convertDateToTimestampRecursively(value[name]);
                return result;
            }
        }
        return value;
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
    async getNotAlreadyExistingAttachmentData(newDocument, oldDocument, specification) {
        const result = {};
        if (specification && specification.hasOwnProperty(this.specialNames.attachment))
            for (const type in specification[this.specialNames.attachment])
                if (specification[this.specialNames.attachment].hasOwnProperty(type)) {
                    // region retrieve all type specific existing attachments
                    const oldAttachments = {};
                    if (oldDocument.hasOwnProperty(this.specialNames.attachment) &&
                        oldDocument[this.specialNames.attachment])
                        for (const fileName in oldDocument[this.specialNames.attachment])
                            if (oldDocument[this.specialNames.attachment].hasOwnProperty(fileName) &&
                                new RegExp(type).test(fileName))
                                oldAttachments[fileName] = oldDocument[this.specialNames.attachment][fileName];
                    // endregion
                    if (newDocument.hasOwnProperty(this.specialNames.attachment))
                        for (const fileName in newDocument[this.specialNames.attachment])
                            if (newDocument[this.specialNames.attachment].hasOwnProperty(fileName) &&
                                new RegExp(type).test(fileName))
                                // region determine latest attachment
                                if (newDocument[this.specialNames.attachment][fileName].hasOwnProperty('data') ||
                                    newDocument[this.specialNames.attachment][fileName].hasOwnProperty('stub')) {
                                    // Insert new attachment.
                                    result[fileName] = newDocument[this.specialNames.attachment][fileName];
                                    // region remove already existing data
                                    if (oldAttachments.hasOwnProperty(fileName)) {
                                        if (await this.attachmentsAreEqual(newDocument[this.specialNames.attachment][fileName], oldAttachments[fileName]))
                                            /*
                                                                                            Existing attachment has not
                                                                                            been changed.
                                                                                        */
                                            delete result[fileName];
                                        delete oldAttachments[fileName];
                                    }
                                    else if (Object.keys(oldAttachments).length &&
                                        specification[this.specialNames.attachment][type].maximumNumber === 1) {
                                        const firstOldAttachmentName = Object.keys(oldAttachments)[0];
                                        if (await this.attachmentsAreEqual(newDocument[this.specialNames.attachment][fileName], oldAttachments[firstOldAttachmentName])) {
                                            /*
                                                                                            Existing attachment has been
                                                                                            renamed.
                                                                                        */
                                            result[fileName] = this.tools
                                                .copyLimitedRecursively(oldAttachments[firstOldAttachmentName]);
                                            result[fileName].name = fileName;
                                        }
                                    }
                                    // endregion
                                }
                                else if (oldAttachments.hasOwnProperty(fileName))
                                    // Existing attachment has not been changed.
                                    delete oldAttachments[fileName];
                                else if (Object.keys(oldAttachments).length &&
                                    specification[this.specialNames.attachment][type].maximumNumber === 1) {
                                    // Existing attachment has been renamed.
                                    const firstOldAttachmentName = Object.keys(oldAttachments)[0];
                                    result[fileName] =
                                        this.tools.copyLimitedRecursively(oldAttachments[firstOldAttachmentName]);
                                    result[fileName].name = fileName;
                                    delete oldAttachments[firstOldAttachmentName];
                                }
                    // endregion
                    // region mark all not mentioned old attachments as removed
                    for (const fileName in oldAttachments)
                        if (oldAttachments.hasOwnProperty(fileName))
                            result[fileName] = { data: null };
                    // endregion
                }
        return {
            payloadExists: Object.keys(result).length !== 0,
            result
        };
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
    removeAlreadyExistingData(newData, oldData, specification) {
        let payloadExists = false;
        if (Array.isArray(newData)) {
            /*
                            NOTE: We do not have to take any specification data into
                            account for an array since any change in any item breaks
                            complete array equality.
                        */
            if (!this.equals(newData, oldData))
                payloadExists = true;
        }
        else if (specification && typeof newData === 'object' && newData !== null &&
            typeof oldData === 'object' && oldData !== null) {
            const newPropertyNames = Object.keys(newData);
            for (const name in oldData)
                if (oldData.hasOwnProperty(name)) {
                    const index = newPropertyNames.indexOf(name);
                    if (index !== -1)
                        newPropertyNames.splice(index, 1);
                    if (!this.modelConfiguration.property.name.reserved.concat(this.specialNames.deleted, this.specialNames.id, this.specialNames.revision, this.specialNames.type).includes(name))
                        if (newData.hasOwnProperty(name)) {
                            const result = this.removeAlreadyExistingData(newData[name], oldData[name], this.dataScope.determineNestedSpecifcation(name, specification));
                            if (result.payloadExists) {
                                payloadExists = true;
                                newData[name] = result.newData;
                            }
                            else if (specification.hasOwnProperty(name))
                                delete newData[name];
                        }
                        else {
                            payloadExists = true;
                            newData[name] = null;
                        }
                }
            if (newPropertyNames.length)
                payloadExists = true;
        }
        else if (!this.equals(newData, this.convertDateToTimestampRecursively(oldData)))
            payloadExists = true;
        return { newData, payloadExists };
    }
    /**
         * Removes all special property names with meta data from given document.
         * @param data - To trim.
         * @param specification - Specification object for given document.
         * @returns Sliced given document.
         */
    removeMetaData(data, specification) {
        if (data instanceof Date)
            return this.numberGetUTCTimestamp(data);
        if (Array.isArray(data)) {
            let index = 0;
            for (const item of data) {
                data[index] = this.removeMetaData(item, specification);
                index += 1;
            }
            return data;
        }
        if (typeof data === 'object' && data !== null) {
            const result = {};
            for (const name in data)
                if (data.hasOwnProperty(name)) {
                    const emptyEqualsToNull = Boolean((specification && (specification.hasOwnProperty(name) &&
                        specification[name] ||
                        specification.hasOwnProperty(this.specialNames.additional) &&
                            specification[this.specialNames.additional]) || {}).emptyEqualsToNull);
                    if (![undefined, null].includes(data[name]) && !(emptyEqualsToNull && (data[name] === '' ||
                        Array.isArray(data[name]) &&
                            data[name].length === 0 ||
                        typeof data[name] === 'object' &&
                            !(data[name] instanceof Date) &&
                            Object.keys(data[name]).length === 0)))
                        if (this.modelConfiguration.property.name.reserved
                            .concat(this.specialNames.deleted, this.specialNames.id, this.specialNames.revision, this.specialNames.type).includes(name))
                            result[name] = data[name];
                        else if (name === this.specialNames.attachment) {
                            if (typeof data[name] === 'object' &&
                                data[name] !== null) {
                                result[name] = {};
                                for (const fileName in data[name]) {
                                    if (data[name].hasOwnProperty(fileName))
                                        result[name][fileName] = {
                                            /* eslint-disable camelcase */
                                            content_type: data[name][fileName]
                                                .content_type ||
                                                'application/octet-stream'
                                        };
                                    if (data[name][fileName].hasOwnProperty('data'))
                                        result[name][fileName].data =
                                            data[name][fileName].data;
                                    else
                                        for (const type of ['digest', 'stub'])
                                            if (data[name][fileName].hasOwnProperty(type))
                                                result[name][fileName][type] =
                                                    data[name][fileName][type];
                                }
                            }
                        }
                        else if (![
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
                            this.specialNames.revisions,
                            this.specialNames.revisionsInformation
                        ].includes(name) && (!specification ||
                            specification.hasOwnProperty(name) ||
                            specification.hasOwnProperty(this.specialNames.additional)))
                            result[name] = this.removeMetaData(data[name], this.dataScope.determineNestedSpecifcation(name, specification));
                }
            return result;
        }
        return data;
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
    async transform(newDocument, oldDocument) {
        let specification = null;
        if (this.specialNames.type in newDocument &&
            this.modelConfiguration.entities.hasOwnProperty(newDocument[this.specialNames.type]))
            specification = this.modelConfiguration.entities[newDocument[this.specialNames.type]];
        let result = this.removeMetaData(newDocument, specification);
        let payloadExists = false;
        if (oldDocument) {
            const attachmentDifference = await this.getNotAlreadyExistingAttachmentData(result, oldDocument, specification);
            if (attachmentDifference.payloadExists) {
                result[this.specialNames.attachment] =
                    attachmentDifference.result;
                payloadExists = attachmentDifference.payloadExists;
            }
            if (this.removeAlreadyExistingData(result, this.removeMetaData(oldDocument, specification), specification).payloadExists)
                payloadExists = true;
        }
        // Check if real payload exists in currently determined raw data.
        if (!payloadExists)
            /*
                            NOTE: We have to check first level only since all unneeded
                            nested values should have been already removed if not
                            necessary.
                        */
            for (const name in result)
                if (result.hasOwnProperty(name) &&
                    !this.modelConfiguration.property.name.reserved.concat(this.specialNames.deleted, this.specialNames.id, this.specialNames.revision, this.specialNames.type).includes(name)) {
                    payloadExists = true;
                    break;
                }
        return payloadExists ? result : null;
    }
}
// IgnoreTypeCheck
/**
 * Checks if given reference is defined.
 */
export class IsDefinedPipe {
    /**
         * Performs the actual comparison.
         * @param object - Object to compare against "undefined" or "null".
         * @param nullIsUndefined - Indicates whether "null" should be handles as
         * "undefined".
         * @returns The comparison result.
         */
    transform(object, nullIsUndefined = false) {
        return !(object === undefined || nullIsUndefined && object === null);
    }
}
// IgnoreTypeCheck
/**
 * Retrieves a matching filename by given filename prefix.
 */
export class LimitToPipe {
    /**
         * Limits number of items of given string, Object (keys) or Array.
         * @param input - Object to retrieve key names from.
         * @param limit - Number of needed items.
         * @param begin - Starting point to slice from.
         * @returns Copy of given sliced object.
         */
    transform(input, limit, begin) {
        limit = Math.abs(Number(limit)) === Infinity ? Number(limit) : parseInt(limit);
        if (isNaN(limit))
            return input;
        if (typeof input === 'number')
            input = input.toString();
        else if (typeof input === 'object' && input !== null && !Array.isArray(input))
            input = Object.keys(input).sort();
        if (!(Array.isArray(input) || typeof input === 'string'))
            return input;
        begin = !begin || isNaN(begin) ? 0 : parseInt(begin);
        if (begin < 0)
            begin = Math.max(0, input.length + begin);
        if (limit >= 0)
            return input.slice(begin, begin + limit);
        else if (begin === 0)
            return input.slice(limit, input.length);
        return input.slice(Math.max(0, begin + limit), begin);
    }
}
// IgnoreTypeCheck
/**
 * Returns a copy of given object where each item was processed through given
 * function.
 * @property injector - Pipe specific injector to determine pipe dynamically at
 * runtime.
 */
export class MapPipe {
    /**
         * Injects the injector and saves as instance property.
         * @param injector - Pipe injector service instance.
         * @returns Nothing.
         */
    constructor(injector) {
        this.injector = injector;
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
    transform(object, pipeName, ...additionalArguments) {
        const pipe = this.injector.get(pipeName);
        if (Array.isArray(object)) {
            const result = [];
            for (const item of object)
                result.push(pipe.transform(item, ...additionalArguments));
            return result;
        }
        const result = {};
        for (const key in object)
            if (object.hasOwnProperty(key))
                result[key] = pipe.transform(object[key], key, ...additionalArguments);
        return result;
    }
}
// IgnoreTypeCheck
/**
 * Retrieves a matching filename by given filename prefix.
 */
export class ObjectKeysPipe {
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
    transform(object, sort = false, reverse = false, asNumber = false) {
        if (typeof object === 'object' && object !== null) {
            const result = Object.keys(object);
            if (sort) {
                if (!Array.isArray(sort))
                    sort = asNumber ? [(first, second) => {
                            first = parseInt(first);
                            second = parseInt(second);
                            if (isNaN(first))
                                return isNaN(second) ? 0 : +1;
                            else if (isNaN(second))
                                return -1;
                            return first - second;
                        }] : [];
                result.sort(...sort);
                if (reverse)
                    result.reverse();
                return result;
            }
            return result;
        }
        return [];
    }
}
// IgnoreTypeCheck
/**
 * Reverses a given list.
 */
export class ReversePipe {
    /**
         * Performs the "Arrays" native "reverse()" method.
         * @param list - List to reverse.
         * @param copy - Indicates whether a reversed copy should be created or
         * reversion can be done in place.
         * @returns Reverted arrays.
         */
    transform(list, copy = false) {
        if (list) {
            if (copy)
                list = list.slice();
        }
        else
            list = [];
        if ('reverse' in list)
            list.reverse();
        return list;
    }
}
// IgnoreTypeCheck
/**
 * Determines type of given object.
 */
export class TypePipe {
    /**
         * Returns type of given object.
         * @param object - Object to determine type of.
         * @returns Type name.
         */
    transform(object) {
        return typeof object;
    }
}
// / endregion
// region array
// IgnoreTypeCheck
/**
 * Dependently concatenate given data to piped data.
 */
export class ArrayDependentConcatPipe {
    /**
         * Does the given array transformation logic.
         * @param array - Array to transform.
         * @param indicator - Indicator to decide if concatenation should be done.
         * @param item - Object(s) to concatenate.
         * @returns Transformed given array.
         */
    transform(array, indicator, item) {
        if (indicator)
            return array.concat(item);
        return array;
    }
}
// endregion
// region string
// IgnoreTypeCheck
/**
 * Forwards javaScript's native "stringEndsWith" method.
 */
export class StringEndsWithPipe {
    /**
         * Performs the actual indicator method.
         * @param string - To check.
         * @param needle - Suffix to search for.
         * @returns The boolean result.
         */
    transform(string, needle) {
        return typeof string === 'string' && typeof needle === 'string' &&
            string.endsWith(needle);
    }
}
// IgnoreTypeCheck
/**
 * Determines if given string has a time indicating suffix.
 */
export class StringHasTimeSuffixPipe {
    /**
         * Performs the actual string suffix check.
         * @param string - To search in.
         * @returns The boolean result.
         */
    transform(string) {
        if (typeof string !== 'string')
            return false;
        return string.endsWith('Date') || string.endsWith('Time') || string === 'timestamp';
    }
}
// IgnoreTypeCheck
/**
 * Tests if given pattern matches against given subject.
 */
export class StringMatchPipe {
    /**
         * Performs the actual matching.
         * @param pattern - String or regular expression to search for.
         * @param subject - String to search in.
         * @param modifier - Regular expression modifier (second argument to the
         * "RegExp" constructor).
         * @returns Boolean test result.
         */
    transform(pattern, subject, modifier = '') {
        // IgnoreTypeCheck
        return (new RegExp(pattern, modifier)).test(subject);
    }
}
// IgnoreTypeCheck
/**
 * Trims given string if it is longer then given length.
 */
export class StringMaximumLengthPipe {
    /**
         * Performs the actual indicator method.
         * @param string - To check.
         * @param maximumLength - Maximum number of symbols in given string.
         * @param suffix - Suffix to append if given string has to bee trimmed.
         * @returns The potentially trimmed given string.
         */
    transform(string, maximumLength = 100, suffix = '...') {
        if (string) {
            if (string.length > maximumLength &&
                string.length - 1 > suffix.length)
                string = string.substring(0, Math.max(1, maximumLength - suffix.length)) + suffix;
            return string;
        }
        return '';
    }
}
// IgnoreTypeCheck
/**
 * Provides javascript's native string replacement method as pipe.
 */
export class StringReplacePipe {
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
    transform(string, search, replacement = '', modifier = 'g') {
        return string.replace(typeof search === 'string' ?
            new RegExp(search, modifier) :
            search, replacement);
    }
}
// IgnoreTypeCheck
/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */
export class StringSafeHTMLPipe {
    /**
         * @param domSanitizer - Injected dom sanitizer service instance.
         * @returns Nothing.
         */
    constructor(domSanitizer) {
        this.transform = domSanitizer.bypassSecurityTrustHtml.bind(domSanitizer);
    }
}
// IgnoreTypeCheck
/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */
export class StringSafeResourceURLPipe {
    /**
         * @param domSanitizer - Injected dom sanitizer service instance.
         * @returns Nothing.
         */
    constructor(domSanitizer) {
        this.transform = domSanitizer.bypassSecurityTrustResourceUrl.bind(domSanitizer);
    }
}
// IgnoreTypeCheck
/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */
export class StringSafeScriptPipe {
    /**
         * @param domSanitizer - Injected dom sanitizer service instance.
         * @returns Nothing.
         */
    constructor(domSanitizer) {
        this.transform = domSanitizer.bypassSecurityTrustScript.bind(domSanitizer);
    }
}
// IgnoreTypeCheck
/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */
export class StringSafeStylePipe {
    /**
         * @param domSanitizer - Injected dom sanitizer service instance.
         * @returns Nothing.
         */
    constructor(domSanitizer) {
        this.transform = domSanitizer.bypassSecurityTrustStyle.bind(domSanitizer);
    }
}
// IgnoreTypeCheck
/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */
export class StringSafeURLPipe {
    /**
         * @param domSanitizer - Injected dom sanitizer service instance.
         * @returns Nothing.
         */
    constructor(domSanitizer) {
        this.transform = domSanitizer.bypassSecurityTrustUrl.bind(domSanitizer);
    }
}
// IgnoreTypeCheck
/**
 * Returns given string if it matches given pattern.
 */
export class StringShowIfPatternMatchesPipe {
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
    transform(string, pattern, invert = false, modifier = '') {
        let indicator = (typeof pattern === 'string' ?
            new RegExp(pattern, modifier) : pattern).test(string);
        if (invert)
            indicator = !indicator;
        return indicator ? string : '';
    }
}
// IgnoreTypeCheck
/**
 * Returns a matched part of given subject with given pattern. Default is the
 * whole (zero) matched part.
 */
export class StringSliceMatchPipe {
    /**
         * Performs the actual matching.
         * @param subject - String to search in.
         * @param pattern - String or regular expression to search for.
         * @param index - Match group to extract.
         * @param modifier - Regular expression modifier (second argument to the
         * "RegExp" constructor).
         * @returns Matching group.
         */
    transform(subject, pattern, index = 0, modifier = '') {
        if (typeof subject === 'string') {
            const match = subject.match(new RegExp(pattern, modifier));
            if (match && typeof match[index] === 'string')
                return match[index];
        }
        return '';
    }
}
// IgnoreTypeCheck
/**
 * Forwards javascript's native "stringStartsWith" method.
 */
export class StringStartsWithPipe {
    /**
         * Performs the actual indicator method.
         * @param string - To check.
         * @param needle - Prefix to search for.
         * @returns The boolean result.
         */
    transform(string, needle) {
        return typeof string === 'string' && typeof needle === 'string' &&
            string.startsWith(needle);
    }
}
// IgnoreTypeCheck
/**
 * Provides angular's template engine as pipe.
 * @property extendObject - Extend object's pipe transform method.
 */
export class StringTemplatePipe {
    /**
         * Sets injected extend object pipe instance as instance property.
         * @param extendObjectPipe - Injected extend object pipe instance.
         * @returns Nothing.
         */
    constructor(extendObjectPipe) {
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe);
    }
    /**
         * Performs the actual indicator method.
         * @param string - To check.
         * @param scopes - Scopes to merge and render again given template string
         * again.
         * @returns The rendered result.
         */
    transform(string = '', ...scopes) {
        const scope = this.extendObject(true, {}, ...scopes);
        const validNames = Object.keys(scope).filter((name) => {
            try {
                new Function(`var ${name}`)();
            }
            catch (error) {
                return false;
            }
            return true;
        });
        return new Function('scope', ...validNames, `return \`${string}\``)(scope, ...validNames.map((name) => scope[name]));
    }
}
// / endregion
// / region number
// IgnoreTypeCheck
/**
 * Returns part in percent of all.
 */
export class NumberPercentPipe {
    /**
         * Performs the actual calculation.
         * @param part - Part to divide "all" through.
         * @param all - Reference value to calculate part of.
         * @returns The calculated part.
         */
    transform(part, all) {
        return (part / all) * 100;
    }
}
// / endregion
// endregion
// region services
// IgnoreTypeCheck
/**
 * A generic guard which prevents from switching to route if its component's
 * "canDeactivate()" method returns "false", a promise or observable wrapping
 * a boolean.
 */
export class CanDeactivateRouteLeaveGuard {
    /**
         * Calls the component specific "canDeactivate()" method.
         * @param component - Component instance of currently selected route.
         * @param additionalParameter - All additional parameter are forwarded to
         * the components "canDeactivate" method.
         * @returns A boolean, promise or observable which wraps the indicator.
         */
    canDeactivate(component, ...additionalParameter) {
        return 'canDeactivate' in component ? component.canDeactivate(...additionalParameter) : true;
    }
}
// / region confirm
// IgnoreTypeCheck
/**
 * Provides a generic confirmation component.
 * @property cancelText - Text to use as cancel button label.
 * @property dialogReference - Reference to the dialog component instance.
 * @property okText - Text to use as confirm button label.
 * @property title - Title to show in dialog.
 * @property message - Message to show in dialog.
 */
export class ConfirmComponent {
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
        // IgnoreTypeCheck
        data, dialogReference) {
        /* eslint-enable indent */
        this.dialogReference = dialogReference;
        if (typeof data === 'object' && data !== null)
            for (const key in data)
                if (data.hasOwnProperty(key))
                    this[key] = data[key];
    }
}
// IgnoreTypeCheck
/**
 * Alert service to trigger a dialog window which can be confirmed.
 * @property dialog - Reference to the dialog component instance.
 * @property dialogReference - Reference to the dialog service instance.
 */
export class AlertService {
    /**
         * Gets needed component dialog service instance injected.
         * @param dialog - Reference to the dialog component instance.
         * @returns Nothing.
         */
    constructor(dialog) {
        this.dialog = dialog;
    }
    /**
         * Triggers a confirmation dialog to show.
         * @param data - Data to provide for the confirmations component instance.
         * @returns A promise resolving when confirmation window where confirmed or
         * rejected due to user interaction. A promised wrapped boolean indicates
         * which decision was made.
         */
    confirm(data) {
        if (typeof data === 'string')
            data = { data: { message: data } };
        else if (typeof data !== 'object' || data === null || !data.hasOwnProperty('data'))
            data = { data };
        this.dialogReference = this.dialog.open(ConfirmComponent, data);
        return this.dialogReference.afterClosed().toPromise();
    }
}
// / endregion
// IgnoreTypeCheck
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
 * @property ngZone - Execution service instance.
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
    /**
         * Creates the database constructor applies all plugins instantiates
         * the connection instance and registers all middlewares.
         * @param equalsPipe - Equals pipe service instance.
         * @param extendObjectPipe - Injected extend object pipe instance.
         * @param initialData - Injected initial data service instance.
         * @param ngZone - Injected execution context service instance.
         * @param platformID - Platform identification string.
         * @param stringFormatPipe - Injected string format pipe instance.
         * @param utility - Injected utility service instance.
         * @returns Nothing.
         */
    constructor(equalsPipe, extendObjectPipe, initialData, ngZone, platformID, stringFormatPipe, utility) {
        this.configuration = initialData.configuration;
        if (this.configuration.database.hasOwnProperty('publicURL'))
            this.configuration.database.url =
                this.configuration.database.publicURL;
        this.database = PouchDB;
        this.equals = equalsPipe.transform.bind(equalsPipe);
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe);
        this.ngZone = ngZone;
        this.platformID = platformID;
        this.stringFormat = stringFormatPipe.transform.bind(stringFormatPipe);
        this.tools = utility.fixed.tools;
        const idName = this.configuration.database.model.property.name.special.id;
        const revisionName = this.configuration.database.model.property.name.special.revision;
        const nativeBulkDocs = this.database.prototype.bulkDocs;
        const self = this;
        this.database.plugin({ bulkDocs: async function (firstParameter, ...parameter) {
                /*
                                Implements a generic retry mechanism for "upsert" and "latest"
                                updates and optionally supports to ignore "NoChange" errors.
                            */
                if (!Array.isArray(firstParameter) &&
                    typeof firstParameter === 'object' &&
                    firstParameter !== null &&
                    firstParameter.hasOwnProperty(idName))
                    firstParameter = [firstParameter];
                let result = [];
                try {
                    result = await nativeBulkDocs.call(this, firstParameter, ...parameter);
                }
                catch (error) {
                    /*
                                        NOTE: We retrieve lastest revision in an additional request
                                        if backend doesn't support the "latest" or "upsert" syntax.
                                    */
                    if (error.name === 'bad_request') {
                        for (const item of firstParameter)
                            if (['latest', 'upsert'].includes(item[revisionName]))
                                try {
                                    item[revisionName] = (await this.get(item[idName]))[revisionName];
                                }
                                catch (error) {
                                    if (error.name === 'not_found')
                                        delete item[revisionName];
                                    else
                                        throw error;
                                }
                        try {
                            result = await nativeBulkDocs.call(this, firstParameter, ...parameter);
                        }
                        catch (error) {
                            throw error;
                        }
                    }
                    else
                        throw error;
                }
                const conflictingIndexes = [];
                const conflicts = [];
                let index = 0;
                for (const item of result) {
                    if (typeof firstParameter[index] === 'object' &&
                        firstParameter !== null)
                        if (revisionName in firstParameter[index] &&
                            item.name === 'conflict' &&
                            ['latest', 'upsert'].includes(firstParameter[index][revisionName])) {
                            conflicts.push(item);
                            conflictingIndexes.push(index);
                        }
                        else if (idName in firstParameter[index] &&
                            self.configuration.database.ignoreNoChangeError &&
                            'name' in item &&
                            item.name === 'forbidden' &&
                            'message' in item &&
                            item.message.startsWith('NoChange:')) {
                            result[index] = {
                                id: firstParameter[index][idName],
                                ok: true
                            };
                            try {
                                result[index].rev =
                                    revisionName in firstParameter[index] &&
                                        !['latest', 'upsert'].includes(firstParameter[index][revisionName]) ? firstParameter[index][revisionName] : (await this.get(result[index].id))[revisionName];
                            }
                            catch (error) {
                                throw error;
                            }
                        }
                    index += 1;
                }
                if (conflicts.length) {
                    firstParameter = conflicts;
                    const retriedResults = await this.bulkDocs(firstParameter, ...parameter);
                    for (const retriedResult of retriedResults)
                        result[conflictingIndexes.shift()] = retriedResult;
                }
                return result;
            } });
        this.database
            .plugin(PouchDBFindPlugin)
            .plugin(PouchDBValidationPlugin);
        for (const plugin of this.configuration.database.plugins)
            this.database.plugin(plugin);
    }
    /**
         * Determines all property names which are indexable in a generic manner.
         * @param modelConfiguration - Model specification object.
         * @param model - Model to determine property names from.
         * @returns The mapping object.
         */
    static determineGenericIndexablePropertyNames(modelConfiguration, model) {
        const specialNames = modelConfiguration.property.name.special;
        return Object.keys(model).filter((name) => model[name].index || !(modelConfiguration.property.name.reserved.concat(specialNames.additional, specialNames.allowedRole, specialNames.attachment, specialNames.conflict, specialNames.constraint.execution, specialNames.constraint.expression, specialNames.deleted, specialNames.deleted_conflict, specialNames.extend, specialNames.id, specialNames.maximumAggregatedSize, specialNames.minimumAggregatedSize, specialNames.revision, specialNames.revisions, specialNames.revisionsInformation, specialNames.type).includes(name) || model[name].type && (typeof model[name].type === 'string' &&
            model[name].type.endsWith('[]') ||
            Array.isArray(model[name].type) &&
                model[name].type.length &&
                Array.isArray(model[name].type[0]) ||
            modelConfiguration.entities.hasOwnProperty(model[name].type)))).concat(specialNames.id, specialNames.revision);
    }
    /**
         * Initializes database connection and synchronisation if needed.
         * @returns A promise resolving when initialisation has finished.
         */
    async initialize() {
        const options = this.extendObject(/* eslint-disable camelcase */
        true, { skip_setup: true }, /* eslint-enable camelcase */
        this.configuration.database.connector || {});
        const databaseName = this.configuration.name || 'generic';
        if (!isPlatformServer(this.platformID))
            this.remoteConnection = new this.database(this.stringFormat(this.configuration.database.url, '') + `/${databaseName}`, options);
        if (this.configuration.database.local || isPlatformServer(this.platformID))
            this.connection = new this.database(databaseName, options);
        else
            this.connection = this.remoteConnection;
        // region apply "latest/upsert" and ignore "NoChange" error feature
        /*
                    NOTE: A "bulkDocs" plugin does not get called for every "put" and
                    "post" call so we have to wrap runtime generated methods.
                */
        const configuration = this.configuration;
        const idName = this.configuration.database.model.property.name.special.id;
        const revisionName = this.configuration.database.model.property.name.special.revision;
        for (const pluginName of ['post', 'put']) {
            const nativeMethod = this.connection[pluginName].bind(this.connection);
            this.connection[pluginName] = async function (firstParameter, secondParameter, ...parameter) {
                try {
                    return await nativeMethod(firstParameter, secondParameter, ...parameter);
                }
                catch (error) {
                    const id = (typeof firstParameter === 'object' &&
                        idName in firstParameter) ? firstParameter[idName] : firstParameter;
                    if (id &&
                        configuration.database.ignoreNoChangeError &&
                        'name' in error &&
                        error.name === 'forbidden' &&
                        'message' in error &&
                        error.message.startsWith('NoChange:')) {
                        const result = { id, ok: true };
                        const revision = (typeof secondParameter === 'object' &&
                            revisionName in secondParameter) ? secondParameter[revisionName] : secondParameter;
                        try {
                            result.rev =
                                revisionName in firstParameter &&
                                    !['latest', 'upsert'].includes(revision) ? revision : (await this.get(result.id))[revisionName];
                        }
                        catch (error) {
                            throw error;
                        }
                        return result;
                    }
                    throw error;
                }
            };
        }
        // endregion
        for (const name in this.connection)
            if (DataService.wrappableMethodNames.includes(name) &&
                typeof this.connection[name] === 'function') {
                const method = this.connection[name];
                this.connection[name] = async (...parameter) => {
                    const request = { name, parameter };
                    this.runningRequests.push(request);
                    this.runningRequestsStream.next(this.runningRequests);
                    const clear = () => {
                        const index = this.runningRequests.indexOf(request);
                        if (index !== -1)
                            this.runningRequests.splice(index, 1);
                        this.runningRequestsStream.next(this.runningRequests);
                    };
                    for (const methodName of [name, '_all'])
                        if (this.middlewares.pre.hasOwnProperty(methodName))
                            for (const interceptor of this.middlewares.pre[methodName]) {
                                parameter = interceptor.apply(this.connection, parameter.concat(methodName === '_all' ? name : []));
                                if ('then' in parameter)
                                    try {
                                        parameter = await parameter;
                                    }
                                    catch (error) {
                                        clear();
                                        throw error;
                                    }
                            }
                    request.wrappedParameter = parameter;
                    const action = (context = this.connection, givenParameter = parameter) => method.apply(context, givenParameter);
                    let result = action();
                    for (const methodName of [name, '_all'])
                        if (this.middlewares.post.hasOwnProperty(methodName))
                            for (const interceptor of this.middlewares.post[methodName]) {
                                result = interceptor.call(this.connection, result, action, ...parameter.concat(methodName === '_all' ? name : []));
                                if ('then' in result)
                                    try {
                                        result = await result;
                                    }
                                    catch (error) {
                                        clear();
                                        throw error;
                                    }
                            }
                    if ('then' in result)
                        try {
                            result = await result;
                        }
                        catch (error) {
                            clear();
                            throw error;
                        }
                    clear();
                    return result;
                };
            }
        this.connection.installValidationMethods();
        if (this.configuration.database.local && this.remoteConnection)
            /*
                            NOTE: We want to allow other services to integrate an
                            interception promise.
                        */
            // IgnoreTypeCheck
            this.tools.timeout(async () => {
                if (this.interceptSynchronisationPromise)
                    await this.interceptSynchronisationPromise;
                this.startSynchronisation();
            });
        if (isPlatformServer(this.platformID) &&
            this.configuration.database.createGenericFlatIndex) {
            // region create/remove needed/unneeded generic indexes
            for (const modelName in this.configuration.database.model.entities)
                if (this.configuration.database.model.entities.hasOwnProperty(modelName) && (new RegExp(this.configuration.database.model.property.name
                    .typeRegularExpressionPattern.public)).test(modelName))
                    for (const name of DataService.determineGenericIndexablePropertyNames(this.configuration.database.model, this.configuration.database.model.entities[modelName]))
                        try {
                            await this.connection.createIndex({ index: {
                                    ddoc: `${modelName}-${name}-GenericIndex`,
                                    fields: [
                                        this.configuration.database.model
                                            .property.name.special.type,
                                        name
                                    ],
                                    name: `${modelName}-${name}-GenericIndex`
                                } });
                        }
                        catch (error) {
                            throw error;
                        }
            let indexes;
            try {
                indexes = (await this.connection.getIndexes()).indexes;
            }
            catch (error) {
                throw error;
            }
            for (const index of indexes)
                if (index.name.endsWith('-GenericIndex')) {
                    let exists = false;
                    for (const modelName in this.configuration.database.model.entities)
                        if (index.name.startsWith(`${modelName}-`)) {
                            for (const name of DataService
                                .determineGenericIndexablePropertyNames(this.configuration.database.model, this.configuration.database.model.entities[modelName]))
                                if (index.name ===
                                    `${modelName}-${name}-GenericIndex`)
                                    exists = true;
                            break;
                        }
                    if (!exists)
                        try {
                            await this.connection.deleteIndex(index);
                        }
                        catch (error) {
                            throw error;
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
    createIndex(...parameter) {
        return this.connection.createIndex(...parameter);
    }
    /**
         * Creates or updates given data.
         * @param parameter - All parameter will be forwarded to the underlining
         * pouchdb's "bulkDocs()" method.
         * @returns Whatever pouchdb's method returns.
         */
    bulkDocs(...parameter) {
        return this.connection.bulkDocs(...parameter);
    }
    /**
         * Removes current active database.
         * @param parameter - All parameter will be forwarded to the underlining
         * pouchdb's "destroy()" method.
         * @returns Whatever pouchdb's method returns.
         */
    destroy(...parameter) {
        if (this.synchronisation)
            this.synchronisation.cancel();
        const result = this.connection.destroy(...parameter);
        this.middlewares = { post: {}, pre: {} };
        return result;
    }
    /**
         * Retrieves a database resource determined by given selector.
         * @param selector - Selector object in mango.
         * @param options - Options to use during selecting items.
         * @returns A promise with resulting array of retrieved resources.
         */
    async find(selector, options = {}) {
        return (await this.connection.find(this.extendObject(true, {
            selector
        }, options))).docs;
    }
    /**
         * Retrieves a resource by id.
         * @param parameter - All parameter will be forwarded to the underlining
         * pouchdb's "get()" method.
         * @returns Whatever pouchdb's method returns.
         */
    async get(...parameter) {
        const idName = this.configuration.database.model.property.name.special.id;
        const revisionName = this.configuration.database.model.property.name.special.revision;
        const result = await this.connection.get(...parameter);
        if (LAST_KNOWN_DATA.data.hasOwnProperty(result[idName]) &&
            parameter.length > 1 && (this.equals(parameter[1], { rev: 'latest' }) ||
            this.equals(parameter[1], { latest: true }) ||
            this.equals(parameter[1], { latest: true, rev: 'latest' })) &&
            parseInt(result[revisionName].match(DataService.revisionNumberRegularExpression)[1]) < parseInt(LAST_KNOWN_DATA.data[result[idName]][revisionName].match(DataService.revisionNumberRegularExpression)[1]))
            return LAST_KNOWN_DATA.data[result[idName]];
        return result;
    }
    /**
         * Retrieves an attachment by given id.
         * @param parameter - All parameter will be forwarded to the underlining
         * pouchdb's "get()" method.
         * @returns Whatever pouchdb's method returns.
         */
    getAttachment(...parameter) {
        return this.connection.getAttachment(...parameter);
    }
    /**
         * Creates or updates given data.
         * @param parameter - All parameter will be forwarded to the underlining
         * pouchdb's "put()" method.
         * @returns Whatever pouchdb's method returns.
         */
    put(...parameter) {
        return this.connection.put(...parameter);
    }
    /**
         * Creates or updates given attachment.
         * @param parameter - All parameter will be forwarded to the underlining
         * pouchdb's "put()" method.
         * @returns Whatever pouchdb's method returns.
         */
    putAttachment(...parameter) {
        return this.connection.putAttachment(...parameter);
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
    register(names, callback, type = 'post') {
        if (!Array.isArray(names))
            names = [names];
        for (const name of names) {
            if (!this.middlewares[type].hasOwnProperty(name))
                this.middlewares[type][name] = [];
            this.middlewares[type][name].push(callback);
        }
        return () => {
            for (const name of names) {
                const index = this.middlewares[type][name].indexOf(callback);
                if (index !== -1)
                    this.middlewares[type][name].splice(index, 1);
                if (this.middlewares[type][name].length === 0)
                    delete this.middlewares[type][name];
            }
        };
    }
    /**
         * Removes specified entities in database.
         * @param parameter - All parameter will be forwarded to the underlining
         * pouchdb's "remove()" method.
         * @returns Whatever pouchdb's "remove()" method return.
         */
    remove(...parameter) {
        return this.connection.remove(...parameter);
    }
    /**
         * Removes specified attachment from entity in database.
         * @param parameter - All parameter will be forwarded to the underlining
         * pouchdb's "removeAttachment()" method.
         * @returns Whatever pouchdb's "removeAttachment()" method return.
         */
    removeAttachment(...parameter) {
        return this.connection.removeAttachment(...parameter);
    }
    /**
         * Starts synchronisation between a local and remote database.
         * @returns Nothing.
         */
    startSynchronisation() {
        return this.synchronisation = this.connection.sync(this.remoteConnection, { live: true, retry: true })
            .on('change', (info) => console.info('change', info))
            .on('paused', () => console.info('paused'))
            .on('active', () => console.info('active'))
            .on('denied', (error) => console.warn('denied', error))
            .on('complete', (info) => console.info('complete', info))
            .on('error', (error) => console.error('error', error));
    }
}
// IgnoreTypeCheck
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
         * @param utility - Injected utility service instance.
         * @returns Nothing.
         */
    constructor(attachmentWithPrefixExistsPipe, data, extendObjectPipe, extractDataPipe, getFilenameByPrefixPipe, initialData, numberGetUTCTimestampPipe, representObjectPipe, utility) {
        this.attachmentWithPrefixExists =
            attachmentWithPrefixExistsPipe.transform.bind(attachmentWithPrefixExistsPipe);
        this.configuration = initialData.configuration;
        this.data = data;
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe);
        this.extractData = extractDataPipe.transform.bind(extractDataPipe);
        this.getFilenameByPrefix = getFilenameByPrefixPipe.transform.bind(getFilenameByPrefixPipe);
        this.numberGetUTCTimestamp = numberGetUTCTimestampPipe.transform.bind(numberGetUTCTimestampPipe);
        this.representObject = representObjectPipe.transform.bind(representObjectPipe);
        this.tools = utility.fixed.tools;
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
    async determine(modelName, id = null, propertyNames = null, revision = 'latest', revisionHistory = false) {
        let data = {};
        if (id) {
            const options = {};
            if (revision === 'latest') {
                options.latest = true;
                if (revisionHistory)
                    /* eslint-disable camelcase */
                    options.revs_info = true;
                /* eslint-enable camelcase */
            }
            else
                options.rev = revision;
            try {
                data = await this.data.get(id, options);
            }
            catch (error) {
                throw new Error(`Document with given id "${id}" and revision "` +
                    `${revision}" isn't available: ` + (('message' in error) ? error.message : this.representObject(error)));
            }
            if (revisionHistory) {
                const revisionsInformationName = this.configuration.database.model.property.name.special
                    .revisionsInformation;
                let revisions;
                let latestData = null;
                if (revision !== 'latest') {
                    delete options.rev;
                    /* eslint-disable camelcase */
                    options.revs_info = true;
                    /* eslint-enable camelcase */
                    try {
                        latestData = await this.data.get(id, options);
                    }
                    catch (error) {
                        throw new Error(`Document with given id "${id}" and revision "` +
                            `${revision}" isn't available: ` + (('message' in error) ? error.message :
                            this.representObject(error)));
                    }
                    revisions = latestData[revisionsInformationName];
                    delete latestData[revisionsInformationName];
                }
                else
                    revisions = data[revisionsInformationName];
                data[revisionsInformationName] = {};
                let first = true;
                for (const item of revisions)
                    if (item.status === 'available') {
                        data[revisionsInformationName][first ? 'latest' : item.rev] = { revision: item.rev };
                        first = false;
                    }
                if (latestData)
                    data[revisionsInformationName].latest.scope =
                        this.generate(modelName, propertyNames, latestData);
            }
        }
        return this.generate(modelName, propertyNames, data);
    }
    // TODO test
    /**
         * Determines a nested specification object for given property name and
         * corresponding specification object where given property is bound to.
         * @param name - Property name to search specification for.
         * @param specification - Parents object specification.
         * @returns New specification object or null if it could not be determined.
         */
    determineNestedSpecifcation(name, specification) {
        const entities = this.configuration.database.model.entities;
        const additionalName = this.configuration.database.model.property.name.special.additional;
        if (specification)
            if (specification.hasOwnProperty(name)) {
                if (entities.hasOwnProperty(specification[name].type))
                    return entities[specification[name].type];
            }
            else if (specification.hasOwnProperty(additionalName) &&
                entities.hasOwnProperty(specification[additionalName].type))
                return entities[specification[additionalName].type];
        return null;
    }
    /**
         * Determines a recursive resolved specification object for given (flat)
         * model object.
         * @param modelSpecification - Specification object to traverse.
         * @param propertyNames - List of property names to consider.
         * @param propertyNamesToIgnore - List of property names to skip.
         * @returns Resolved specification object.
         */
    determineSpecificationObject(modelSpecification, propertyNames, propertyNamesToIgnore = []) {
        if (!propertyNames)
            propertyNames = Object.keys(modelSpecification);
        const result = {};
        for (const name of propertyNames)
            if (modelSpecification.hasOwnProperty(name) &&
                !propertyNamesToIgnore.includes(name))
                if (name === this.configuration.database.model.property.name
                    .special.attachment) {
                    result[name] = {};
                    for (const fileType in modelSpecification[name])
                        if (modelSpecification[name].hasOwnProperty(fileType))
                            result[name][fileType] = this.extendObject(true, this.tools.copyLimitedRecursively(this.configuration.database.model
                                .property.defaultSpecification), modelSpecification[name][fileType]);
                }
                else {
                    result[name] = this.extendObject(true, this.tools.copyLimitedRecursively(this.configuration.database.model.property
                        .defaultSpecification), modelSpecification[name]);
                    if (this.configuration.database.model.entities
                        .hasOwnProperty(result[name].type))
                        result[name].value = this.determineSpecificationObject(this.configuration.database.model.entities[result[name].type]);
                }
        return result;
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
    generate(modelName, propertyNames, data = {}, propertyNamesToIgnore) {
        const entities = this.configuration.database.model.entities;
        const modelSpecification = entities[modelName];
        const specialNames = this.configuration.database.model.property.name.special;
        if (!propertyNamesToIgnore)
            propertyNamesToIgnore = modelName.startsWith('_') ? [
                specialNames.id, specialNames.attachment
            ] : [];
        const reservedNames = this.configuration.database.model.property.name.reserved.concat(specialNames.conflict, specialNames.deleted, specialNames.deletedConflict, specialNames.localSequence, specialNames.revision, specialNames.revisions, specialNames.revisionsInformation, specialNames.type);
        const specification = this.determineSpecificationObject(modelSpecification, propertyNames, propertyNamesToIgnore.concat(reservedNames));
        if (!propertyNames) {
            propertyNames = Object.keys(specification).filter((key) => typeof specification[key] === 'object' &&
                typeof specification[key] !== null &&
                !Array.isArray(specification[key]));
            propertyNames = propertyNames.concat(Object.keys(data).filter((name) => !propertyNames.concat(reservedNames).includes(name)));
        }
        const result = {};
        for (const name of propertyNames) {
            if (propertyNamesToIgnore.includes(name))
                continue;
            if (specification.hasOwnProperty(name))
                result[name] = this.tools.copyLimitedRecursively(specification[name]);
            else
                result[name] = this.tools.copyLimitedRecursively(('additional' in specialNames &&
                    specialNames.additional) ? specification[specialNames.additional] : {});
            const now = new Date();
            const nowUTCTimestamp = this.numberGetUTCTimestamp(now);
            if (name === specialNames.attachment) {
                for (const type in specification[name])
                    if (specification[name].hasOwnProperty(type)) {
                        result[name][type].name = type;
                        result[name][type].value = null;
                        if (Object.keys(data).length === 0) {
                            const scope = {
                                newDocument: data,
                                oldDocument: null,
                                userConteyt: {},
                                securitySettings: {},
                                name: type,
                                models: entities,
                                modelConfiguration: this.configuration.database.model,
                                serialize: (object) => JSON.stringify(object, null, 4),
                                modelName,
                                model: modelSpecification,
                                propertySpecification: result[name][type],
                                now,
                                nowUTCTimestamp,
                                getFilenameByPrefix: this.getFilenameByPrefix,
                                attachmentWithPrefixExists: this.attachmentWithPrefixExists.bind(data, data)
                            };
                            for (const hookType of [
                                'onCreateExecution', 'onCreateExpression'
                            ])
                                if (result[name][type].hasOwnProperty(hookType) && result[name][type][hookType]) {
                                    result[name][type].value = (new Function(...Object.keys(scope), (hookType.endsWith('Expression') ? 'return ' : '') + result[name][type][hookType]))(...Object.values(scope));
                                    if (result[name][type].hasOwnProperty('value') && result[name][type].value === undefined)
                                        delete result[name][type].value;
                                }
                        }
                        let fileFound = false;
                        if (data.hasOwnProperty(name) &&
                            ![undefined, null].includes(data[name]))
                            for (const fileName in data[name])
                                if (result[name].hasOwnProperty(type) && (new RegExp(type)).test(fileName)) {
                                    fileFound = true;
                                    result[name][type].value = data[name][fileName];
                                    result[name][type].value.name = fileName;
                                    break;
                                }
                        if (!fileFound &&
                            result[name][type].hasOwnProperty('default') &&
                            ![undefined, null].includes(result[name][type].default))
                            result[name][type].value =
                                this.tools.copyLimitedRecursively({}, result[name][type].default);
                    }
            }
            else {
                result[name].name = name;
                result[name].value = null;
                if (Object.keys(data).length === 0) {
                    const scope = {
                        newDocument: data,
                        oldDocument: null,
                        userContext: {},
                        securitySettings: {},
                        name,
                        models: entities,
                        modelConfiguration: this.configuration.database.model,
                        serialize: (object) => JSON.stringify(object, null, 4),
                        modelName,
                        model: modelSpecification,
                        propertySpecification: result[name],
                        now,
                        nowUTCTimestamp,
                        getFilenameByPrefix: this.getFilenameByPrefix,
                        attachmentWithPrefixExists: this.attachmentWithPrefixExists.bind(data, data)
                    };
                    for (const type of [
                        'onCreateExpression', 'onCreateExecution'
                    ])
                        if (result[name].hasOwnProperty(type) &&
                            result[name][type]) {
                            result[name].value = (new Function(...Object.keys(scope), (type.endsWith('Expression') ? 'return ' :
                                '') + result[name][type]))(...Object.values(scope));
                            if (result[name].value === undefined)
                                result[name].value = null;
                        }
                }
                if (data.hasOwnProperty(name) &&
                    ![undefined, null].includes(data[name]))
                    result[name].value = data[name];
                else if (result[name].hasOwnProperty('default') &&
                    ![undefined, null].includes(result[name].default))
                    result[name].value = this.tools.copyLimitedRecursively(result[name].default);
                else if (result[name].hasOwnProperty('selection') &&
                    Array.isArray(result[name].selection) &&
                    result[name].selection.length)
                    result[name].value = result[name].selection[0];
                if (typeof result[name].value === 'number' &&
                    result[name].hasOwnProperty('type') &&
                    (result[name].type.endsWith('Date') ||
                        result[name].type.endsWith('Time')))
                    // NOTE: We interpret given value as an utc timestamp.
                    result[name].value = new Date(result[name].value * 1000);
                else if (result[name].hasOwnProperty('type'))
                    if (entities.hasOwnProperty(result[name].type))
                        result[name].value = this.generate(result[name].type, null, result[name].value || {}, [specialNames.attachment, specialNames.id]);
                    else if (result[name].type.endsWith('[]')) {
                        const type = result[name].type.substring(0, result[name].type.length - 2);
                        if (Array.isArray(result[name].value) &&
                            entities.hasOwnProperty(type)) {
                            let index = 0;
                            for (const item of result[name].value) {
                                result[name].value[index] = this.generate(type, null, item || {}, [specialNames.attachment, specialNames.id]);
                                index += 1;
                            }
                        }
                    }
            }
        }
        for (const name of reservedNames)
            if (data.hasOwnProperty(name))
                result[name] = data[name];
            else if (name === specialNames.type)
                result[name] = modelName;
        result._metaData = { submitted: false };
        return result;
    }
}
// / region abstract
// IgnoreTypeCheck
/**
 * Helper class to extend from to have some basic methods to deal with database
 * entities.
 * @property data - Holds currently retrieved data.
 * @property databaseBaseURL - Determined database base url.
 * @property databaseURL - Determined database url.
 * @property domSanitizer - Dom sanitizer service instance.
 * @property escapeRegularExpressions - Holds the escape regular expressions's
 * pipe transformation method.
 * @property extendObject - Holds the extend object's pipe transformation
 * method.
 * @property message - Message box service.
 * @property messageConfiguration - Plain message box configuration object.
 * @property modelConfiguration - Saves a mapping from all available model
 * names to their specification.
 * @property relevantKeys - Saves a list of relevant key names to take into
 * account during resolving.
 * @property relevantSearchKeys - Saves a list of relevant key names to take
 * into during searching.
 * @property representObject - Represent object pipe transformation function.
 * @property specialNames - mapping of special database field names.
 * @property type - Model name to handle. Should be overwritten in concrete
 * implementations.
 * @property useLimit - Indicates whether an upper bound should be used by
 * retrieving backend items. NOTE: We can't use "limit" if we need total data
 * set size for pagination e.g.
 * @property useSkip - Indicates whether an lower bound should be used by
 * retrieving backend items. NOTE: We can't use "skip" if we need data for
 * auto completion e.g.
 */
export class AbstractResolver {
    /**
         * Sets all needed injected services as instance properties.
         * @param injector - Application specific injector to use instead auto
         * detected one.
         * @returns Nothing.
         */
    constructor(injector) {
        const get = determineInjector(injector, this, this.constructor);
        this.data = get(DataService);
        this.domSanitizer = get(DomSanitizer);
        const databaseBaseURL = get(StringFormatPipe).transform(get(InitialDataService).configuration.database.url, '') + '/';
        this.databaseBaseURL =
            `${databaseBaseURL}_utils/#/database/` +
                `${get(InitialDataService).configuration.name}/`;
        this.databaseURL =
            databaseBaseURL + get(InitialDataService).configuration.name;
        this.escapeRegularExpressions =
            get(StringEscapeRegularExpressionsPipe).transform.bind(get(StringEscapeRegularExpressionsPipe));
        this.extendObject = get(ExtendObjectPipe).transform.bind(get(ExtendObjectPipe));
        this.messageConfiguration.duration = 5 * 1000;
        this.message = (message) => get(MatSnackBar).open(message, false, this.messageConfiguration);
        this.modelConfiguration = get(InitialDataService).configuration.database.model;
        this.representObject = get(RepresentObjectPipe).transform.bind(get(RepresentObjectPipe));
        this.specialNames = get(InitialDataService).configuration.database.model.property.name.special;
    }
    /**
         * Determines item specific database url by given item data object.
         * @param item - Given item object.
         * @returns Determined url.
         */
    getDatabaseURL(item) {
        const url = this.databaseBaseURL + ((typeof item[this.specialNames.id] === 'object') ? item[this.specialNames.id].value : item[this.specialNames.id]);
        // NOTE: We cache sanitized urls to avoid reloads.
        if (!this.databaseURLCache.hasOwnProperty(url))
            this.databaseURLCache[url] =
                this.domSanitizer.bypassSecurityTrustResourceUrl(url);
        return this.databaseURLCache[url];
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
    list(sort = [{
                [InitialDataService.defaultScope.configuration.database.model
                    .property.name.special.id]: 'asc'
            }], page = 1, limit = 10, searchTerm = '', additionalSelector = {}) {
        if (!this.relevantSearchKeys) {
            this.relevantSearchKeys =
                DataService.determineGenericIndexablePropertyNames(this.modelConfiguration, this.modelConfiguration.entities[this.type]);
            this.relevantSearchKeys.splice(this.relevantSearchKeys.indexOf(this.specialNames.revision), 1);
        }
        const selector = { [this.specialNames.type]: this.type };
        if (searchTerm || Object.keys(additionalSelector).length) {
            if (sort.length)
                selector[Object.keys(sort[0])[0]] = { $gt: null };
            selector.$or = [];
            for (const name of this.relevantSearchKeys)
                selector.$or.push({ [name]: { $regex: searchTerm } });
            if (additionalSelector.hasOwnProperty('$or') &&
                additionalSelector.$or.length) {
                /*
                                    NOTE: We have to integrate search expression into existing
                                    selector.
                                */
                for (const item of selector.$or)
                    item.$or = additionalSelector.$or;
                delete additionalSelector.$or;
            }
        }
        const options = {};
        if (this.useLimit)
            options.limit = limit;
        if (this.useSkip)
            options.skip = Math.max(page - 1, 0) * limit;
        if (this.relevantKeys)
            options.fields = this.relevantKeys;
        if (options.skip === 0)
            delete options.skip;
        if (sort.length)
            options.sort = [this.specialNames.type].concat(sort).map((item) => Object.values(item)[0] === 'asc' ? Object.keys(item)[0] : item);
        return this.data.find(this.extendObject(true, selector, additionalSelector), options);
    }
    /**
         * Removes given item.
         * @param item - Item or id to delete.
         * @param message - Message to show after successful removement.
         * @returns Nothing.
         */
    remove(item, message = '') {
        return this.update(item, { [this.specialNames.deleted]: true }, message);
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
    resolve(route, state) {
        /* eslint-enable no-unused-vars */
        let searchTerm = '';
        if ('searchTerm' in route.params) {
            const term = decodeURIComponent(route.params.searchTerm);
            if (term.startsWith('exact-'))
                searchTerm = this.escapeRegularExpressions(term.substring('exact-'.length));
            else if (term.startsWith('regex-')) {
                searchTerm = term.substring('regex-'.length);
                try {
                    new RegExp(searchTerm);
                }
                catch (error) {
                    searchTerm = '';
                }
            }
        }
        let sort = [];
        if ('sort' in route.params)
            sort = route.params.sort.split(',').map((name) => {
                const lastIndex = name.lastIndexOf('-');
                let type = 'asc';
                if (lastIndex !== -1) {
                    type = name.substring(lastIndex + 1) || type;
                    name = name.substring(0, lastIndex);
                }
                return { [name]: type };
            });
        return this.list(sort, parseInt(route.params.page || 1), parseInt(route.params.limit || 10), searchTerm);
    }
    /**
         * Updates given item.
         * @param item - Item to update.
         * @param data - Optional given data to update into given item.
         * @param message - Message to should if process was successfully.
         * @returns A boolean indicating if requested update was successful.
         */
    async update(item, data, message = '') {
        let newData;
        if (data)
            newData = this.extendObject({
                [this.specialNames.id]: (typeof item[this.specialNames.id] === 'object') ? item[this.specialNames.id].value :
                    item[this.specialNames.id],
                [this.specialNames.revision]: 'latest',
                [this.specialNames.type]: item[this.specialNames.type]
            }, data);
        else
            newData = item;
        try {
            item[this.specialNames.revision] =
                (await this.data.put(newData)).rev;
        }
        catch (error) {
            this.message('message' in error ? error.message : this.representObject(error));
            return false;
        }
        if (message)
            this.message(message);
        return true;
    }
}
// / endregion
// endregion
// region provider
/**
 * Creates a database connection and/or synchronisation stream plus missing
 * local indexes.
 * @param data - Injected data service instance.
 * @param injector - Injected injector service instance.
 * @returns Initializer function.
 */
export function dataServiceInitializerFactory(data, injector) {
    /*
            NOTE: We need this statement here to avoid having an ugly typescript
            error.
        */
    2;
    return () => {
        InitialDataService.injectors.add(injector);
        return data.initialize();
    };
}
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
 * @property minimumText - Minimum number validation text.
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
 */
export class AbstractInputComponent {
}
/**
 * Generic input component.
 * @property _attachmentWithPrefixExists - Holds the attachment by prefix
 * checker pipe instance
 * @property _extendObject - Holds the extend object's pipe transformation
 * @property _getFilenameByPrefix - Holds the get file name by prefix's pipe
 * transformation method.
 * @property _modelConfiguration - All model configurations.
 * @property _numberGetUTCTimestamp - Date (and time) to unix timstamp
 * converter pipe transform method.
 */
export class AbstractNativeInputComponent extends AbstractInputComponent {
    /**
         * Sets needed services as property values.
         * @param injector - Application specific injector to use instead auto
         * detected one.
         * @returns Nothing.
         */
    constructor(injector) {
        super();
        const get = determineInjector(injector, this, this.constructor);
        this._attachmentWithPrefixExists = get(AttachmentWithPrefixExistsPipe).transform.bind(get(AttachmentWithPrefixExistsPipe));
        this._extendObject = get(ExtendObjectPipe).transform.bind(get(ExtendObjectPipe));
        this._getFilenameByPrefix = get(GetFilenameByPrefixPipe).transform.bind(get(GetFilenameByPrefixPipe));
        this._modelConfiguration =
            get(InitialDataService).configuration.database.model;
        this._numberGetUTCTimestamp = get(NumberGetUTCTimestampPipe).transform.bind(get(NumberGetUTCTimestampPipe));
    }
    /**
         * Triggers after input values have been resolved.
         * @returns Nothing.
         */
    ngOnInit() {
        this._extendObject(this.model, this._extendObject({
            disabled: false,
            emptyEqualsToNull: true,
            maximum: Infinity,
            minimum: 0,
            maximumLength: Infinity,
            minimumLength: 0,
            nullable: true,
            regularExpressionPattern: '.*',
            state: {},
            trim: true,
            type: 'string'
        }, this.model));
        if (typeof this.model.value === 'string' && this.model.trim)
            this.model.value === this.model.value.trim();
        for (const hookType of ['onUpdateExpression', 'onUpdateExecution'])
            if (this.model.hasOwnProperty(hookType) && this.model[hookType] &&
                typeof this.model[hookType] !== 'function')
                this.model[hookType] = new Function('newDocument', 'oldDocument', 'userContext', 'securitySettings', 'name', 'models', 'modelConfiguration', 'serialize', 'modelName', 'model', 'propertySpecification', 'now', 'nowUTCTimestamp', 'getFilenameByPrefix', 'attachmentWithPrefixExists', (hookType.endsWith('Expression') ? 'return ' : '') + this.model[hookType]);
    }
    /**
         * Triggers when ever a change to current model happens inside this
         * component.
         * @param newValue - Value to use to update model with.
         * @param state - Saves the current model state.
         * @returns Nothing.
         */
    onChange(newValue, state) {
        if (this.model.type === 'integer')
            newValue = parseInt(newValue);
        else if (this.model.type === 'number')
            newValue = parseFloat(newValue);
        else if (newValue && this.model.type === 'string' && this.model.trim)
            newValue = newValue.trim();
        const now = new Date();
        const nowUTCTimestamp = this._numberGetUTCTimestamp(now);
        const newData = { [this.model.name]: newValue };
        for (const hookType of ['onUpdateExpression', 'onUpdateExecution'])
            if (this.model.hasOwnProperty(hookType) && this.model[hookType] &&
                typeof this.model[hookType] === 'function') {
                newValue = this.model[hookType](newData, null, {}, {}, this.model.name, this._modelConfiguration.entities, this._modelConfiguration, (object) => JSON.stringify(object, null, 4), 'generic', { generic: { [this.model.name]: this.model } }, this.model, now, nowUTCTimestamp, this._getFilenameByPrefix, this._attachmentWithPrefixExists.bind(newData, newData), newValue);
                if (!(newValue instanceof Date) && (this.model.type.endsWith('Date') ||
                    this.model.type.endsWith('Time')))
                    newValue *= 1000;
            }
        this.model.state = state;
        return newValue;
    }
}
/**
 * Observes database for any data changes and triggers corresponding methods
 * on corresponding events.
 * @property static:defaultLiveUpdateOptions - Options for database
 * observation.
 *
 * @property actions - Array if actions which have happen.
 * @property autoRestartOnError - Indicates whether we should re-initialize
 * the changes stream on errors.
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
 * @property _tools - Holds the tools class from the tools service.
 */
export class AbstractLiveDataComponent {
    /**
         * Saves injected service instances as instance properties.
         * @param injector - Application specific injector to use instead auto
         * detected one.
         * @returns Nothing.
         */
    constructor(injector) {
        const get = determineInjector(injector, this, this.constructor);
        this._changeDetectorReference = get(ChangeDetectorRef);
        this._data = get(DataService);
        this._extendObject = get(ExtendObjectPipe).transform.bind(get(ExtendObjectPipe));
        this._stringCapitalize = get(StringCapitalizePipe).transform.bind(get(StringCapitalizePipe));
        this._tools = get(UtilityService).fixed.tools;
    }
    /**
         * Initializes data observation when view has been initialized.
         * @returns Nothing.
         */
    ngOnInit() {
        const initialize = this._tools.debounce(() => {
            this._changesStream = this._data.connection.changes(this._extendObject(true, {}, { since: LAST_KNOWN_DATA.sequence }, AbstractLiveDataComponent.defaultLiveUpdateOptions, this._liveUpdateOptions));
            for (const type of ['change', 'complete', 'error'])
                this._changesStream.on(type, async (action) => {
                    if (this._canceled)
                        return;
                    if (type === 'change') {
                        if ('seq' in action && typeof action.seq === 'number')
                            LAST_KNOWN_DATA.sequence = action.seq;
                        LAST_KNOWN_DATA.data[action.id] = action.doc;
                    }
                    action.name = type;
                    this.actions.unshift(action);
                    // IgnoreTypeCheck
                    let result = this[`onData${this._stringCapitalize(type)}`](action);
                    if (result !== null && typeof result === 'object' &&
                        'then' in result)
                        result = await result;
                    if (result)
                        this._changeDetectorReference.detectChanges();
                    if (type === 'error' && this.autoRestartOnError)
                        initialize();
                });
        }, 3000);
        /*
                    NOTE: We have to break out of the "zone.js" since long polling
                    themes to confuse its mocked environment.
                */
        this._tools.timeout(initialize);
    }
    /**
         * Marks current live data observation as canceled and closes initially
         * requested update stream.
         * @returns Nothing.
         */
    ngOnDestroy() {
        this._canceled = true;
        if (this._changesStream)
            this._changesStream.cancel();
    }
    /**
         * Triggers on any data changes.
         * @returns A boolean indicating whether a view update should be triggered
         * or not.
         */
    onDataChange() {
        return true;
    }
    /**
         * Triggers on completed data change observation.
         * @returns A boolean indicating whether a view update should be triggered
         * or not.
         */
    onDataComplete() {
        return false;
    }
    /**
         * Triggers on data change observation errors.
         * @returns A boolean indicating whether a view update should be triggered
         * or not.
         */
    onDataError() {
        return false;
    }
}
/**
 * A generic abstract component to edit, search, navigate and filter a list of
 * entities.
 * @property allItems - Current list of items.
 * @property allItemsChecked - Indicates whether all currently selected items
 * are checked via select all selector.
 * @property idName - Document property id name.
 * @property items - Current list of visible items.
 * @property keyCode - Mapping from key names to their key codes.
 * @property limit - Maximal number of visible items.
 * @property page - Current page number of each item list part.#
 * @property preventedDataUpdate - Saves null or arguments to a prevented data
 * updates.
 * @property regularExpression - Indicator whether searching via regular
 * expressions should be used.
 * @property revisionName - Document property revision name.
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
export class AbstractItemsComponent extends AbstractLiveDataComponent {
    /**
         * Saves injected service instances as instance properties.
         * @param injector - Application specific injector to use instead auto
         * detected one.
         * @returns Nothing.
         */
    constructor(injector) {
        super(injector);
        const get = determineInjector(injector);
        this.idName = get(InitialDataService).configuration.database.model.property.name.special.id;
        this.revisionName = get(InitialDataService).configuration.database.model.property.name.special.revision;
        this.keyCode = this._tools.keyCode;
        this._route = get(ActivatedRoute);
        this._router = get(Router);
        // IgnoreTypeCheck
        this._toolsInstance = get(UtilityService).tools;
        /*
                    NOTE: Parameter have to be read before data to ensure that all page
                    constraints have been set correctly before item slicing.
                */
        this._subscriptions.push(this._route.params.subscribe((data) => {
            this._currentParameter = data;
            this.limit = parseInt(this._currentParameter.limit);
            this.page = parseInt(this._currentParameter.page);
            const match = /(regex|exact)-(.*)/.exec(this._currentParameter.searchTerm);
            if (match) {
                this.regularExpression = match[1] === 'regex';
                this.searchTerm = decodeURIComponent(match[2]);
            }
        }));
        this._subscriptions.push(this._route.data.subscribe((data) => {
            this.limit = Math.max(1, this.limit || 1);
            // TODO wen in pagination "++" ausgewählt wird verschwinden alle
            // pages
            this.allItems = data.items.slice();
            data.items.splice(0, (this.page - 1) * this.limit);
            if (data.items.length > this.limit)
                data.items.splice(this.limit, data.items.length - this.limit);
            this.items = data.items;
            if (this.applyPageConstraints())
                this.update();
        }));
        this._subscriptions.push(this.searchTermStream.debounceTime(200)
            .distinctUntilChanged().subscribe(() => {
            this.page = 1;
            return this.update();
        }));
        this.debouncedUpdate = this._tools.debounce(this.update.bind(this));
    }
    /**
         * Updates constraints between limit, page number and number of total
         * available items.
         * @returns A boolean indicating if something has changed to fulfill page
         * constraints.
         */
    applyPageConstraints() {
        const oldPage = this.page;
        const oldLimit = this.limit;
        this.limit = Math.max(1, this.limit || 1);
        this.page = Math.max(1, Math.min(this.page, Math.ceil(
        // IgnoreTypeCheck
        this.allItems.length / this.limit)));
        return this.page !== oldPage || this.limit !== oldLimit;
    }
    /**
         * A function factory to generate functions which updates current view if
         * no route change happened between an asynchronous process.
         * @param callback - Function to wrap.
         * @returns Given function wrapped.
         */
    changeItemWrapperFactory(callback) {
        return async (...parameter) => {
            let update = true;
            const subscription = this._router.events.subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    update = false;
                    subscription.unsubscribe();
                }
            });
            this._subscriptions.push(subscription);
            const result = callback(...parameter);
            if (typeof result === 'object' &&
                result !== null &&
                'then' in result)
                await result;
            if (update)
                await this.update(true);
            return result;
        };
    }
    /**
         * Clear all currently selected items.
         * @returns Nothing.
         */
    clearSelectedItems() {
        for (const item of this.items) {
            this.selectedItems.delete(item);
            item.selected = false;
        }
    }
    /**
         * Switches section to item which has given id.
         * @param itemID - ID of item to switch to.
         * @param itemVersion - Version of item to switch to.
         * @returns A promise wrapping the navigation result.
         */
    goToItem(itemID, itemVersion = 'latest') {
        this.navigateAway = true;
        return this._router.navigate([this._itemPath, itemID, itemVersion]);
    }
    /**
         * Checks if selection has changed.
         * @returns Nothing.
         */
    ngAfterContentChecked() {
        if (this.preventedDataUpdate)
            this.onDataChange(...this.preventedDataUpdate);
    }
    /**
         * Triggers on any data changes and updates item constraints.
         * @param parameter - Parameter to save for delayed update.
         * @returns False so their wont be a view update since a complete route
         * reload will be triggered.
         */
    onDataChange(...parameter) {
        /*
                    NOTE: We have to avoid that unexpected view changes do not happen
                    on remote data changes.
                */
        if (this.selectedItems.size ||
            ![0, 1].includes(parseInt(this._currentParameter.page)))
            this.preventedDataUpdate = parameter;
        else {
            this.preventedDataUpdate = null;
            this.debouncedUpdate(true);
        }
        /*
                    NOTE: We want to avoid another reload if page is already violating
                    page constraints which indicates a page reload.
                */
        return false;
    }
    /**
         * Unsubscribes all subscriptions when this component should be disposed.
         * @param parameter - List of all parameter to forward to super method.
         * @returns Returns the super values return value.
         */
    ngOnDestroy(...parameter) {
        const result = super.ngOnDestroy(...parameter);
        for (const subscription of this._subscriptions)
            subscription.unsubscribe();
        return result;
    }
    /**
         * Select all available items.
         * @returns Nothing.
         */
    selectAllItems() {
        for (const item of this.items) {
            this.selectedItems.add(item);
            item.selected = true;
        }
    }
    /**
         * Determines an items content specific hash value combined from id and
         * revision.
         * @param item - Item with id and revision property.
         * @returns Indicator string.
         */
    trackByIDAndRevision(item) {
        return `${item[this.idName]}/${item[this.revisionName]}`;
    }
    /**
         * Applies current filter criteria to current visible item set.
         * @param reload - Indicates whether a simple reload should be made because
         * a changed list of available items is expected for example.
         * @returns A boolean indicating whether route change was successful.
         */
    async update(reload = false) {
        let result = false;
        await this._toolsInstance.acquireLock(`${this.constructor.name}Update`);
        if (!this.navigateAway) {
            this.applyPageConstraints();
            if (reload && parseInt(this._currentParameter.page) !== 0)
                /*
                                    NOTE: Will be normalised to "1" after route reload (hack to
                                    enforce route reloading).
                                */
                this.page = 0;
            let sort = '';
            for (const name in this.sort)
                if (this.sort.hasOwnProperty(name)) {
                    sort += `${sort ? ',' : ''}${name}`;
                    if (this.sort[name] !== 'asc')
                        sort += `-${this.sort[name]}`;
                }
            result = await this._router.navigate([
                this._itemsPath, sort, this.page, this.limit,
                `${this.regularExpression ? 'regex' : 'exact'}-` +
                    encodeURIComponent(this.searchTerm)
            ], {
                preserveFragment: true,
                replaceUrl: parseInt(this._currentParameter.page) === 0,
                skipLocationChange: this.page === 0
            });
            if (result)
                this.allItemsChecked = false;
        }
        this._toolsInstance.releaseLock(`${this.constructor.name}Update`);
        return result;
    }
    /**
         * Applies current search term to the search term stream.
         * @returns Nothing.
         */
    updateSearch() {
        this.searchTermStream.next(this.searchTerm);
    }
}
/**
 * Generic value accessor with "ngModel" support.
 * @property onChangeCallback - Saves current on change callback.
 * @property onTouchedCallback - Saves current on touch callback.
 * @property type - Saves current input type.
 */
export class AbstractValueAccessor extends DefaultValueAccessor {
    /**
         * Initializes and forwards needed services to the default value accessor
         * constructor.
         * @param injector - Application specific injector to use instead auto
         * detected one.
         * @returns Nothing.
         */
    constructor(injector) {
        super(injector.get(Renderer2), injector.get(ElementRef), null);
    }
    /**
         * Manipulates editable value representation.
         * @param value - Value to manipulate.
         * @returns Given and transformed value.
         */
    export(value) {
        return value;
    }
    /**
         * Reads internal value representation.
         * @param value - Value to convert to its internal representation.
         * @returns Given and transformed value.
         */
    import(value) {
        return value;
    }
    /**
         * Needed implementation for an angular control value accessor.
         * @param callback - Callback function to register.
         * @param additionalParameter - Additional parameter will be forwarded to
         * inherited super method.
         * @returns What inherited method returns.
         */
    registerOnChange(callback, ...additionalParameter) {
        this.onChangeCallback = (value, ...additionalParameter) => callback(this.import(value), ...additionalParameter);
        return super.registerOnChange(this.onChangeCallback, ...additionalParameter);
    }
    /**
         * Needed implementation for an angular control value accessor.
         * @param callback - Callback function to register.
         * @param additionalParameter - Additional parameter will be forwarded to
         * inherited super method.
         * @returns What inherited method returns.
         */
    registerOnTouched(callback, ...additionalParameter) {
        this.onTouchedCallback = callback;
        return super.registerOnTouched(this.onTouchedCallback, ...additionalParameter);
    }
    /**
         * Overridden inherited function for value export.
         * @param value - Value to export.
         * @param additionalParameter - Additional arguments will be forwarded to
         * the overridden method invocation.
         * @returns The transformed give value.
         */
    writeValue(value, ...additionalParameter) {
        return super.writeValue(this.export(value, ...additionalParameter), ...additionalParameter);
    }
}
// / endregion
// // region date/time
// IgnoreTypeCheck
/**
 * Displays dates and/or times formated with markup and through angular date
 * pipe.
 * @property dateFormatter - Angular's date pipe transformation method.
 * @property extendObject - Extend object pipe's transform method.
 * @property options - Given formatting and update options.
 * @property templateReference - Reference to given template.
 * @property timerID - Interval id to cancel it on destroy life cycle hook.
 * @property viewContainerReference - View container reference to embed
 * rendered template instance into.
 */
export class DateDirective {
    /**
         * Saves injected services as instance properties.
         * @param datePipe - Injected date pipe service instance.
         * @param extendObjectPipe - Injected extend object pipe service instance.
         * @param templateReference - Specified template reference.
         * @param viewContainerReference - Injected view container reference.
         * @returns Nothing.
         */
    constructor(datePipe, extendObjectPipe, templateReference, viewContainerReference) {
        this.dateFormatter = datePipe.transform.bind(datePipe);
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe);
        this.templateReference = templateReference;
        this.viewContainerReference = viewContainerReference;
    }
    /* eslint-disable flowtype/require-return-type */
    /**
         * Options setter to merge into options interactively.
         * @param options - Options object to merge into.
         * @returns Nothing.
         */
    set insertOptions(options) {
        if (['string', 'number'].includes(typeof options) ||
            [null, undefined].includes(options) ||
            typeof options === 'object' &&
                options instanceof Date)
            options = { dateTime: options };
        this.extendObject(true, this.options, options);
    }
    /* eslint-enable flowtype/require-return-type */
    /**
         * Inserts a rendered template instance into current view.
         * @returns Nothing.
         */
    insert() {
        let dateTime = this.options.dateTime;
        if (typeof dateTime === 'string' && ['now', ''].includes(dateTime) ||
            typeof dateTime === 'number' && isNaN(dateTime) ||
            [null, undefined].includes(dateTime))
            dateTime = Date.now();
        else if (typeof dateTime === 'string' &&
            `${parseFloat(dateTime)}` === dateTime)
            dateTime = parseFloat(dateTime) * 1000;
        this.viewContainerReference.createEmbeddedView(this.templateReference, {
            dateTime: this.dateFormatter(dateTime, this.options.format)
        });
    }
    /**
         * On destroy life cycle hook to cancel initialized interval timer.
         * @returns Nothing.
         */
    ngOnDestroy() {
        if (this.timerID)
            clearInterval(this.timerID);
    }
    /**
         * Initializes interval timer and inserts initial template instance into
         * current view.
         * @returns Nothing.
         */
    ngOnInit() {
        this.timerID = setInterval(() => {
            if (!this.options.freeze) {
                this.viewContainerReference.remove();
                this.insert();
            }
        }, this.options.updateIntervalInMilliseconds);
        this.insert();
    }
}
// IgnoreTypeCheck
/**
 * TODO
 */
export class SliderDirective {
    /**
         * Saves injected services as instance properties.
         * @param extendObjectPipe - Injected extend object pipe service instance.
         * @param templateReference - Specified template reference.
         * @param viewContainerReference - Injected view container reference.
         * @returns Nothing.
         */
    constructor(extendObjectPipe, templateReference, viewContainerReference) {
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe);
        this.templateReference = templateReference;
        this.viewContainerReference = viewContainerReference;
    }
    /**
         * Calculates next index from given reference point.
         * @param startIndex - Reference index.
         * @returns New calculated index.
         */
    getNextIndex(startIndex = -1) {
        if (startIndex === -1)
            startIndex = this.index;
        return (startIndex + this.options.step) % this.options.slides.length;
    }
    /* eslint-disable flowtype/require-return-type */
    /**
         * Options setter to merge into options interactively.
         * @param options - Options object to merge into.
         * @returns Nothing.
         */
    set insertOptions(options) {
        if (Array.isArray(options))
            options = { slides: options };
        this.extendObject(true, this.options, options);
    }
    /* eslint-enable flowtype/require-return-type */
    /**
         * Inserts a rendered template instance into current view.
         * @returns Nothing.
         */
    update() {
        if (this.options.slides.length)
            this.viewContainerReference.createEmbeddedView(this.templateReference, {
                getNextIndex: this.getNextIndex.bind(this),
                index: this.index,
                options: this.options,
                slide: this.options.slides[this.index],
                slides: this.options.slides
            });
    }
    /**
         * On destroy life cycle hook to cancel initialized interval timer.
         * @returns Nothing.
         */
    ngOnDestroy() {
        if (this.timerID)
            clearInterval(this.timerID);
    }
    /**
         * Initializes interval timer and inserts initial template instance into
         * current view.
         * @returns Nothing.
         */
    ngOnInit() {
        this.timerID = setInterval(() => {
            const newIndex = (this.index + this.options.step) %
                this.options.slides.length;
            if (this.options.freeze !== true &&
                newIndex !== this.index && !(typeof this.options.freeze === 'number' &&
                this.options.freeze >= this.options.slides.length)) {
                this.viewContainerReference.remove();
                this.index = this.getNextIndex();
                this.update();
            }
        }, this.options.updateIntervalInMilliseconds);
        this.index = this.options.startIndex;
        this.update();
    }
}
const providers = [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DateTimeValueAccessor),
        multi: true
    }];
/*
    NOTE: This core update resistent version is not compatible with angular's
    ahead of time compilation.

// IgnoreTypeCheck
@Directive(UtilityService.tools.extendObject(true, {
}, DefaultValueAccessor.decorators[0].args[0], {providers}))
*/
/**
 * Time value accessor with "ngModel" support.
 */
export class DateTimeValueAccessor extends AbstractValueAccessor {
    /**
         * Delegates injected injector service instance to the super constructor.
         * @param injector - Injected injector service instance.
         * @returns Nothing.
         */
    constructor(injector) {
        super(injector);
    }
    /**
         * Manipulates editable value representation.
         * @param value - Value to manipulate.
         * @returns Given and transformed value.
         */
    export(value) {
        if (![undefined, null].includes(value) &&
            ['date', 'time'].includes(this.type)) {
            const date = new Date(value);
            if (isNaN(date.getDate()))
                return;
            else if (this.type === 'time') {
                let hours = `${date.getHours()}`;
                if (hours.length === 1)
                    hours = `0${hours}`;
                let minutes = `${date.getMinutes()}`;
                if (minutes.length === 1)
                    minutes = `0${minutes}`;
                return `${hours}:${minutes}`;
            }
            else if (this.type === 'date') {
                let month = `${date.getMonth() + 1}`;
                if (month.length === 1)
                    month = `0${month}`;
                let day = `${date.getDate()}`;
                if (day.length === 1)
                    day = `0${day}`;
                return `${date.getFullYear()}-${month}-${day}`;
            }
        }
        return value;
    }
    /**
         * Reads internal value representation.
         * @param value - Value to convert to its internal representation.
         * @returns Given and transformed value.
         */
    import(value) {
        if (typeof value === 'string')
            if (this.type === 'time') {
                const match = /^([0-9]{2}):([0-9]{2})$/.exec(value);
                if (match)
                    return new Date(1970, 0, 1, parseInt(match[1]), parseInt(match[2]));
            }
            else if (this.type === 'date') {
                const match = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(value);
                if (match)
                    return new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
            }
        return value;
    }
}
// // / region interval
// IgnoreTypeCheck
/**
 * Represents an interval input.
 * @property endDeclaration - End declaration info text.
 * @property startDeclaration - End declaration info text.
 *
 * @property endDescription - Description for end input.
 * @property startDescription - Description for start input.
 *
 * @property endDisabled - Sets end disabled state.
 * @property startDisabled - Sets start disabled state.
 *
 * @property endMaximum - Maximum allowed number end value.
 * @property startMaximum - Maximum allowed number start value.
 *
 * @property endMaximumText - Maximum number validation end text.
 * @property startMaximumText - Maximum number validation start text.
 *
 * @property endMinimum - Minimum allowed end number.
 * @property endMinimum - Minimum allowed start number.
 *
 * @property endMinimumText - Minimum end number validation text.
 * @property startMinimumText - Minimum start number validation text.
 *
 * @property endRequired - Indicates whether end input have to be filled.
 * @property startRequired - Indicates whether start input have to be filled.
 *
 * @property endRequiredText - Required validation end text.
 * @property startRequiredText - Required validation start text.
 *
 * @property endShowDeclarationText - Info text to click for more end input
 * informations.
 * @property startShowDeclarationText - Info text to click for more start input
 * informations.
 *
 * @property endShowDeclarationText - Info text to click for more end input
 * informations.
 * @property startShowDeclarationText - Info text to click for more
 * start input informations.
 *
 * @property endShowValidationErrorMessages - Indicates whether validation
 * errors should be suppressed or be shown automatically for end input.
 * @property startShowValidationErrorMessages - Indicates whether validation
 * errors should be suppressed or be shown automatically for start input.
 *
 * @property model - Object that saves start and end time as unix timestamp in
 * milliseconds.*
 * @property modelChange - Model event emitter emitting events on each model
 * change.
 */
export class IntervalInputComponent {
    /**
         * Triggers on any change events of any nested input.
         * @param event - Events payload data.
         * @param type - Indicates which input field has changed.
         * @returns Nothing.
         */
    change(event, type) {
        this.modelChange.emit({ value: event, type });
    }
}
// IgnoreTypeCheck
/**
 * Represents an editable list of intervals.
 * @property additionalObjectData - Additional object data to save with current
 * interval object.
 * @property contentTemplate - Reference to transcluded node.
 * @property description - Interval description to use as label.
 *
 * @property endDeclaration - End declaration info text.
 * @property startDeclaration - End declaration info text.
 *
 * @property endDescription - Description for end input.
 * @property startDescription - Description for start input.
 *
 * @property endDisabled - Sets end disabled state.
 * @property startDisabled - Sets start disabled state.
 *
 * @property endMaximum - Maximum allowed number end value.
 * @property startMaximum - Maximum allowed number start value.
 *
 * @property endMaximumText - Maximum number validation end text.
 * @property startMaximumText - Maximum number validation start text.
 *
 * @property endMinimum - Minimum allowed end number.
 * @property endMinimum - Minimum allowed start number.
 *
 * @property endMinimumText - Minimum end number validation text.
 * @property startMinimumText - Minimum start number validation text.
 *
 * @property endRequired - Indicates whether end input have to be filled.
 * @property startRequired - Indicates whether start input have to be filled.
 *
 * @property endRequiredText - Required validation end text.
 * @property startRequiredText - Required validation start text.
 *
 * @property endShowDeclarationText - Info text to click for more end input
 * informations.
 * @property startShowDeclarationText - Info text to click for more start input
 * informations.
 *
 * @property endShowDeclarationText - Info text to click for more end input
 * informations.
 * @property startShowDeclarationText - Info text to click for more
 * start input informations.
 *
 * @property endShowValidationErrorMessages - Indicates whether validation
 * errors should be suppressed or be shown automatically for end input.
 * @property startShowValidationErrorMessages - Indicates whether validation
 * errors should be suppressed or be shown automatically for start input.
 *
 * @property model - Saves current list of intervals.
 * @property modelChange - Event emitter for interval list changes.
 *
 * @property _dataScope - Data scope service instance.
 * @property _extendObject - Holds the extend object pipe instance's transform
 * method.
 */
export class IntervalsInputComponent {
    /**
         * Constructs the interval list component.
         * @param dataScope - Data scope service instance.
         * @param extendObjectPipe - Injected extend object pipe instance.
         * @returns Nothing.
         */
    constructor(dataScope, extendObjectPipe) {
        this._dataScope = dataScope;
        this._extendObject = extendObjectPipe.transform.bind(extendObjectPipe);
    }
    /**
         * Triggers on any change events of any nested input.
         * @param event - Events payload data.
         * @param index - Indicates which input field has changed.
         * @returns Nothing.
         */
    change(event, index) {
        this.modelChange.emit({ value: event, index });
    }
    /**
         * Extends additional model data with default one if nothing is provided.
         * @returns Nothing.
         */
    ngOnInit() {
        if (!this.additionalObjectData)
            this.additionalObjectData = this._dataScope.generate('_interval');
        if (this.model.value)
            this.model.value.sort((first, second) => first.start.value - second.start.value);
        else
            this.model.value = [];
    }
    /**
         * Adds a new interval.
         * @param data - Additional data to use for newly created entity.
         * @returns Nothing.
         */
    add(data = {}) {
        if (!this.model.value)
            this.model.value = [];
        const lastEnd = this.model.value.length ? (new Date(this.model.value[this.model.value.length - 1].end.value)).getTime() : 0;
        this.model.value.push(this._extendObject(true, {}, this.additionalObjectData, {
            // NOTE: We add one hour in milliseconds as default interval.
            end: { value: new Date(lastEnd + 60 ** 2 * 1000) },
            start: { value: new Date(lastEnd) }
        }, data));
        this.modelChange.emit(this.model);
    }
    /**
         * Removes given interval.
         * @param interval - Interval to remove from current list.
         * @returns Nothing.
         */
    remove(interval) {
        const index = this.model.value.indexOf(interval);
        if (index !== -1) {
            this.model.value.splice(index, 1);
            this.modelChange.emit(this.model);
        }
    }
}
// // / endregion
// // endregion
// // region text/selection
/**
 * Provides a generic editor.
 * @property static:applicationInterfaceLoad - Promise which resolves when
 * specific editor factories are fully loaded.
 * @property static:factories - Should saves all seen factories to load from
 * if the initial provided one was deleted from global scope.
 *
 * @property configuration - Code mirror configuration.
 * @property contentSetterMethodName - Defines the instance method to set
 * content updates.
 * @property disabled - Indicates inputs disabled state.
 * @property extendObject - Extend object pipe's transform method.
 * @property factory - Current editor constructor.
 * @property hostDomNode - Host textarea dom element to bind editor to.
 * @property instance - Currently active editor instance.
 * @property initialized - Initialized event emitter.
 * @property tools - Tools service instance.
 * @property model - Current editable text string.
 * @property modelChange - Change event emitter.
 */
export class AbstractEditorComponent extends AbstractValueAccessor {
    /**
         * Initializes the code mirror resource loading if not available yet.
         * @param injector - Application specific injector to use instead auto
         * detected one.
         * @returns Nothing.
         */
    constructor(injector) {
        super(injector);
        const get = determineInjector(injector, this, this.constructor);
        this.extendObject = get(ExtendObjectPipe).transform.bind(get(ExtendObjectPipe));
        this.fixedUtility = get(UtilityService).fixed;
    }
    /**
         * Initializes the code editor element.
         * @returns Nothing.
         */
    async ngAfterViewInit() {
        if (!this.factory)
            if (this.fixedUtility.globalContext[this.factoryName])
                this.factory =
                    this.fixedUtility.globalContext[this.factoryName];
            else if (AbstractEditorComponent.factories[this.factoryName])
                this.factory = AbstractEditorComponent.factories[this.factoryName];
        if (this.factory) {
            AbstractEditorComponent.factories[this.factoryName] = this.factory;
            /*
                            NOTE: We have to do a dummy timeout to avoid an event emit in
                            first initializing call stack.
                        */
            await this.fixedUtility.tools.timeout();
        }
        else {
            try {
                await AbstractEditorComponent.applicationInterfaceLoad[this.factoryName];
            }
            catch (error) {
                throw error;
            }
            AbstractEditorComponent.factories[this.factoryName] = this.factory;
        }
    }
    /**
         * Synchronizes given value into internal code mirror instance.
         * @param value - Given value to set in code editor.
         * @param additionalParameter - Additional arguments will be forwarded to
         * the overridden method invocation.
         * @returns What inherited method returns.
         */
    export(value, ...additionalParameter) {
        this.model = [null, undefined].includes(value) ? '' : value.toString();
        if (this.instance)
            this.instance[this.contentSetterMethodName](this.model);
        return super.export(value, ...additionalParameter);
    }
    /**
         * Triggers disabled state changes.
         * @param isDisabled - Indicates disabled state.
         * @returns Nothing.
         */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
/**
 * Provides a generic code editor.
 * @property static:modesLoad - Mapping from mode to their loading state.
 *
 * @property blur - Blur event emitter.
 * @property focus - Focus event emitter.
 */
export class CodeEditorComponent extends AbstractEditorComponent {
    /**
         * Initializes the code mirror resource loading if not available yet.
         * @param injector - Application specific injector to use instead auto
         * detected one.
         * @returns Nothing.
         */
    constructor(injector) {
        super(injector);
        if (typeof CodeEditorComponent.applicationInterfaceLoad[this.factoryName] !== 'object')
            CodeEditorComponent.applicationInterfaceLoad[this.factoryName] = Promise.all([
                new Promise((resolve) => this.fixedUtility.$(`
                        <link
                            href="${CODE_MIRROR_DEFAULT_OPTIONS.path.base}` +
                    CODE_MIRROR_DEFAULT_OPTIONS.path
                        .cascadingStyleSheet +
                    `" rel="stylesheet"
                            type="text/css"
                        />
                    `).appendTo('head').on('load', resolve)),
                new Promise((resolve, reject) => this.fixedUtility.$.ajax({
                    cache: true,
                    dataType: 'script',
                    error: reject,
                    success: () => {
                        this.factory = this.fixedUtility.globalContext[this.factoryName];
                        resolve(this.factory);
                    },
                    url: CODE_MIRROR_DEFAULT_OPTIONS.path.base +
                        CODE_MIRROR_DEFAULT_OPTIONS.path.script
                }))
            ]);
    }
    /**
         * Initializes the code editor element.
         * @returns Nothing.
         */
    async ngAfterViewInit() {
        await super.ngAfterViewInit();
        if (this.configuration.mode)
            if (CodeEditorComponent.modesLoad.hasOwnProperty(this.configuration.mode)) {
                if (CodeEditorComponent.modesLoad[this.configuration.mode] !== true)
                    try {
                        await CodeEditorComponent.modesLoad[this.configuration.mode];
                    }
                    catch (error) {
                        throw error;
                    }
            }
            else {
                CodeEditorComponent.modesLoad[this.configuration.mode] =
                    new Promise((resolve, reject) => this.fixedUtility.$.ajax({
                        cache: true,
                        dataType: 'script',
                        error: reject,
                        success: resolve,
                        url: this.configuration.path.base +
                            this.configuration.path.mode.replace(/{mode}/g, this.configuration.mode)
                    }));
                try {
                    await CodeEditorComponent.modesLoad[this.configuration.mode];
                }
                catch (error) {
                    throw error;
                }
            }
        const configuration = this.extendObject({}, this.configuration, { readOnly: this.disabled });
        delete configuration.path;
        this.instance = this.factory.fromTextArea(this.hostDomNode.nativeElement, configuration);
        this.instance[this.contentSetterMethodName](this.model);
        this.instance.on('blur', (instance, event) => this.blur.emit(event));
        this.instance.on('change', () => {
            this.onChangeCallback(this.instance.getValue());
            this.modelChange.emit(this.model);
        });
        this.instance.on('focus', (instance, event) => this.focus.emit(event));
        this.initialized.emit(this.instance);
    }
    /**
         * Triggers disabled state changes.
         * @param isDisabled - Indicates disabled state.
         * @returns Nothing.
         */
    setDisabledState(isDisabled) {
        super.setDisabledState(isDisabled);
        if (this.instance)
            this.instance.setOption('readOnly', this.disabled);
    }
}
/**
 * Provides a generic text editor.
 */
export class TextEditorComponent extends AbstractEditorComponent {
    // / endregion
    // endregion
    /**
         * Initializes the tinymce resource loading if not available yet.
         * @param injector - Application specific injector to use instead auto
         * detected one.
         * @returns Nothing.
         */
    constructor(injector) {
        super(injector);
        if (typeof TextEditorComponent.applicationInterfaceLoad[this.factoryName] !== 'object')
            TextEditorComponent.applicationInterfaceLoad[this.factoryName] = new Promise((resolve, reject) => this.fixedUtility.$.ajax({
                cache: true,
                dataType: 'script',
                error: reject,
                success: () => {
                    this.factory = this.fixedUtility.globalContext.tinymce;
                    resolve(this.factory);
                },
                url: TINYMCE_DEFAULT_OPTIONS.scriptPath
            }));
    }
    /**
         * Initializes the text editor element.
         * @returns Nothing.
         */
    async ngAfterViewInit() {
        await super.ngAfterViewInit();
        const configuration = this.extendObject({}, this.configuration);
        this.factory.baseURL = configuration.baseURL;
        delete configuration.baseURL;
        delete configuration.scriptPath;
        configuration.target = this.hostDomNode.nativeElement;
        const initializeInstanceCallback = configuration.init_instance_callback;
        /* eslint-disable camelcase */
        configuration.init_instance_callback = (instance) => {
            /* eslint-disable camelcase */
            this.instance = instance;
            this.instance[this.contentSetterMethodName](this.model);
            this.instance.on('Change', () => {
                this.onChangeCallback(this.instance.getContent());
                this.modelChange.emit(this.model);
            });
            if (initializeInstanceCallback)
                initializeInstanceCallback(this.instance);
            for (const name of [
                'click',
                'dblclick',
                'MouseDown',
                'MouseUp',
                'MouseMove',
                'MouseOver',
                'MouseOut',
                'MouseEnter',
                'MouseLeave',
                'KeyDown',
                'KeyPress',
                'ContextMenu',
                'Paste',
                'Focus',
                'Blur',
                'BeforeSetContent',
                'SetContent',
                'GetContent',
                'PreProcess',
                'PostProcess',
                'NodeChange',
                'Undo',
                'Redo',
                'Change',
                'Dirty',
                'Remove',
                'PastePreProcess',
                'PastePostProcess'
            ])
                this.instance.on(name, this[name].emit.bind(this[name]));
            this.instance.on('KeyUp', (event) => {
                this.KeyUp.emit(event);
                this.onChangeCallback(this.instance.getContent());
                this.onTouchedCallback();
                this.modelChange.emit(this.model);
            });
            this.instance.on('ExecCommand', (event) => {
                this.ExecCommand.emit(event);
                const content = this.instance.getContent();
                if (typeof content === 'string' && content.length > 0) {
                    this.onChangeCallback(this.instance.getContent());
                    this.onTouchedCallback();
                    this.modelChange.emit(this.model);
                }
            });
        };
        configuration.setup = (instance) => instance.on('Init', () => this.initialized.emit(instance));
        this.factory.init(configuration);
    }
    /**
         * Frees all tinymce allocated data from memory if there exists some.
         * @returns Nothing.
         */
    ngOnDestroy() {
        if (this.instance)
            this.factory.remove(this.instance);
    }
    /**
         * Triggers disabled state changes.
         * @param isDisabled - Indicates disabled state.
         * @returns Nothing.
         */
    setDisabledState(isDisabled) {
        super.setDisabledState(isDisabled);
        if (this.instance)
            this.instance.setMode(this.disabled ? 'readonly' : 'design');
    }
}
/* eslint-disable max-len */
const propertyContent = {
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
        [minimumLengthText]="minimumLengthText"
        [minimumText]="minimumText"
        [model]="model"
        [pattern]="pattern"
        [required]="required"
        [requiredText]="requiredText"
        [patternText]="patternText"
        [showValidationErrorMessages]="showValidationErrorMessages"
        [type]="type"
    `
};
const inputContent = `
    <mat-hint align="start" @defaultAnimation matTooltip="info">
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
    </mat-hint>
    <span generic-error *ngIf="showValidationErrorMessages">
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
    <mat-hint
        align="end"
        @defaultAnimation
        *ngIf="!model.selection && model.type === 'string' && model.maximumLength !== null && model.maximumLength < 100"
    >{{model.value?.length}} / {{model.maximumLength}}</mat-hint>
`;
/* eslint-enable max-len */
// IgnoreTypeCheck
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
}
/* eslint-disable max-len */
// IgnoreTypeCheck
/* eslint-enable max-len */
/**
 * A generic form input or select component with validation, labeling and info
 * description support.
 * @property labels - Defines some selectable value labels.
 * @property type - Optionally defines an input type explicitly.
 */
export class SimpleInputComponent extends AbstractNativeInputComponent {
    /**
         * Delegates injected injector service instance to the super constructor.
         * @param injector - Injected injector service instance.
         * @returns Nothing.
         */
    constructor(injector) {
        super(injector);
    }
}
/* eslint-disable max-len */
// IgnoreTypeCheck
/* eslint-enable max-len */
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
export class TextareaComponent extends AbstractNativeInputComponent {
    /**
         * Forwards injected service instances to the abstract input component's
         * constructor.
         * @param initialData - Injected initial data service instance.
         * @param injector - Application specific injector to use instead auto
         * detected one.
         * @returns Nothing.
         */
    constructor(initialData, injector) {
        super(injector);
        if (initialData.configuration.hasOwnProperty('defaultEditorOptions') && typeof initialData.configuration.defaultEditorOptions ===
            'object' && initialData.configuration.defaultEditorOptions !== null)
            TextareaComponent.defaultEditorOptions =
                initialData.configuration.defaultEditorOptions;
    }
    /**
         * Triggers after input values have been resolved.
         * @param additionalParameter - Additional arguments will be forwarded to
         * the overridden method invocation.
         * @returns Nothing.
         */
    ngOnInit(...additionalParameter) {
        super.ngOnInit(...additionalParameter);
        if (this.editor === null && this.model.editor)
            this.editor = this.model.editor;
        if (typeof this.editor === 'string') {
            if (this.editor.startsWith('!')) {
                this.editor = this.editor.substring(1);
                if (this.selectableEditor === null)
                    this.selectableEditor = false;
            }
            if (this.editor.startsWith('(') && this.editor.endsWith(')'))
                this.editor = this.editor.substring(1, this.editor.length - 1);
            else if (this.activeEditor === null)
                this.activeEditor = true;
            this.editorType = this.editor;
            if (this.editor.startsWith('code'))
                if (this.editor.startsWith('code:'))
                    this.editor = {
                        mode: this.editor.substring('code:'.length)
                    };
                else
                    this.editor = {};
            else if (this.editor === 'raw')
                this.editor = {
                    /* eslint-disable max-len */
                    toolbar1: 'cut copy paste | undo redo removeformat | code | fullscreen',
                    /* eslint-enable max-len */
                    toolbar2: false
                };
            else if (this.editor === 'simple')
                this.editor = {
                    /* eslint-disable max-len */
                    toolbar1: 'cut copy paste | undo redo removeformat | bold italic underline strikethrough subscript superscript | fullscreen',
                    toolbar2: false
                };
            else if (this.editor === 'normal')
                this.editor = {
                    /* eslint-disable max-len */
                    toolbar1: 'cut copy paste | undo redo removeformat | styleselect formatselect | searchreplace visualblocks fullscreen code'
                };
            else
                // Advanced editor.
                this.editor = {};
        }
        else if (this.editor === null && this.activeEditor)
            this.editor = {};
        if (this.activeEditor === null)
            this.activeEditor = false;
        if (this.selectableEditor === null)
            if (typeof this.model.selectableEditor === 'boolean')
                this.selectableEditor = this.model.selectableEditor;
            else
                this.selectableEditor = true;
        if (typeof this.editor === 'object' && this.editor !== null)
            if (this.editorType.startsWith('code') || this.editor.indentUnit)
                this.editor = this._extendObject(true, {}, CODE_MIRROR_DEFAULT_OPTIONS, TextareaComponent.defaultEditorOptions.code, this.editor);
            else
                this.editor = this._extendObject(true, {}, TINYMCE_DEFAULT_OPTIONS, TextareaComponent.defaultEditorOptions.markup, this.editor);
        else
            this.selectableEditor = false;
    }
}
// // endregion
// / region file input
/* eslint-disable max-len */
// IgnoreTypeCheck
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
 * @property configuration - Configuration object.
 * @property delete - Event emitter which triggers its handler when current
 * file should be removed.
 * @property deleteButtonText - Text for button to trigger file removing.
 * @property deletedName - Holds the deleted model field name.
 * @property downloadButtonText - Text for button to download current file.
 * @property editableName - Indicates whether file name could be edited.
 * @property file - Holds the current selected file object if present.
 * @property headerText - Header text to show instead of property description
 * or name.
 * @property idName - Name if id field.
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
 * @property revisionName - Name if revision field.
 * @property showDeclarationText - Info text to click for more informations.
 * @property showValidationErrorMessages - Indicates whether validation errors
 * should be displayed. Useful to hide error messages until user tries to
 * submit a form.
 * @property synchronizeImmediately - Indicates whether file upload should be
 * done immediately after a file was selected (or synchronously with other
 * model data).
 * @property typeName - Name of type field.
 * @property typePatternText - File type validation text.
 *
 * @property _data - Holds the data service instance.
 * @property _domSanitizer - Holds the dom sanitizer service instance.
 * @property _extendObject - Holds the extend object pipe instance's transform
 * method.
 * @property _getFilenameByPrefix - Holds the file name by prefix getter pipe
 * instance's transform method.
 * @property _idIsObject - Indicates whether the model document specific id is
 * provided as object and "value" named property or directly.
 * @property _representObject - Holds the represent object pipe instance's
 * transform method.
 * @property _stringFormat - Saves the string formatting pip's transformation
 * function.
 * @property _prefixMatch - Holds the prefix match pipe instance's transform
 * method.
 */
export class FileInputComponent {
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
         * @param utility - Utility service instance.
         * @returns Nothing.
         */
    constructor(data, domSanitizer, extendObjectPipe, getFilenameByPrefixPipe, initialData, representObjectPipe, stringFormatPipe, utility) {
        this.configuration = initialData.configuration;
        this.attachmentTypeName =
            this.configuration.database.model.property.name.special.attachment;
        this.keyCode = utility.fixed.tools.keyCode;
        this.deletedName =
            this.configuration.database.model.property.name.special.deleted;
        this.idName =
            this.configuration.database.model.property.name.special.id;
        this.model = { [this.attachmentTypeName]: {}, id: null };
        this.revisionName =
            this.configuration.database.model.property.name.special.revision;
        this.typeName =
            this.configuration.database.model.property.name.special.type;
        this._data = data;
        this._domSanitizer = domSanitizer;
        this._extendObject = extendObjectPipe.transform.bind(extendObjectPipe);
        this._getFilenameByPrefix = getFilenameByPrefixPipe.transform.bind(getFilenameByPrefixPipe);
        this._representObject = representObjectPipe.transform.bind(representObjectPipe);
        this._stringFormat = stringFormatPipe.transform.bind(stringFormatPipe);
    }
    /**
         * Determines which type of file we have to present.
         * @returns Nothing.
         */
    determinePresentationType() {
        if (this.file && this.file.content_type)
            if (FileInputComponent.textMimeTypeRegularExpression.test(this.file.content_type))
                this.file.type = 'text';
            else if (FileInputComponent.imageMimeTypeRegularExpression.test(this.file.content_type))
                this.file.type = 'image';
            else if (FileInputComponent.videoMimeTypeRegularExpression.test(this.file.content_type))
                this.file.type = 'video';
            else
                this.file.type = 'binary';
    }
    /**
         * Initializes file upload handler.
         * @param changes - Holds informations about changed bound properties.
         * @returns Nothing.
         */
    async ngOnChanges(changes) {
        if (typeof this.model[this.idName] === 'object')
            this._idIsObject = true;
        if (changes.hasOwnProperty('mapNameToField') && this.mapNameToField && !Array.isArray(this.mapNameToField))
            this.mapNameToField = [this.mapNameToField];
        if (changes.hasOwnProperty('model') || changes.hasOwnProperty('name')) {
            this.internalName = this._getFilenameByPrefix(this.model[this.attachmentTypeName], this.name);
            if (this.name && this.internalName &&
                this.internalName !== this.name)
                this._prefixMatch = true;
            this.model[this.attachmentTypeName][this.internalName].state = {};
            this.file = this.model[this.attachmentTypeName][this.internalName].value;
            if (this.file)
                this.file.initialName = this.file.name;
            else if (!this.model[this.attachmentTypeName][this.internalName].nullable)
                this.model[this.attachmentTypeName][this.internalName].state.errors = { required: true };
        }
        if (changes.hasOwnProperty('model') ||
            changes.hasOwnProperty('name') ||
            changes.hasOwnProperty('revision')) {
            if (this.file) {
                this.file.query = `?version=${this.file.digest}`;
                /*
                                    NOTE: Only set new file source if isn't already present to
                                    prevent to download an immediately uploaded file and grab
                                    and older cached one.
                                */
                if (!this.file.source) {
                    const id = this._idIsObject ? this.model[this.idName].value : this.model[this.idName];
                    if (this.revision &&
                        changes.revision.currentValue !==
                            changes.revision.previousValue)
                        try {
                            await this.retrieveAttachment(id, { rev: this.revision });
                        }
                        catch (error) {
                            this.model[this.attachmentTypeName][this.internalName].state.errors.database = ('message' in error) ? error.message : this._representObject(error);
                            return;
                        }
                    else
                        this.file.source =
                            this._domSanitizer.bypassSecurityTrustResourceUrl(this._stringFormat(this.configuration.database.url, '') + '/' + (this.configuration.name || 'generic') + `/${id}/${this.file.name}` +
                                this.file.query);
                }
            }
            this.determinePresentationType();
            this.modelChange.emit(this.model);
            this.fileChange.emit(this.file);
        }
    }
    /**
         * Initializes current file input field. Adds needed event observer.
         * @returns Nothing.
         */
    ngAfterViewInit() {
        this.input.nativeElement.addEventListener('change', () => {
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
                };
                this.update(this.file ? this.file.name : null);
            }
        });
    }
    /**
         * Removes current file.
         * @returns A Promise which will be resolved after current file will be
         * removed.
         */
    async remove() {
        if (this.synchronizeImmediately && this.file) {
            let result;
            const update = {
                [this.typeName]: this.model[this.typeName],
                [this.idName]: this._idIsObject ? this.model[this.idName].value : this.model[this.idName],
                [this.revisionName]: this.model[this.revisionName]
            };
            if (this.mapNameToField && this.mapNameToField.includes(this.idName))
                update[this.deletedName] = true;
            else
                update[this.attachmentTypeName] = { [this.file.name]: {
                        /* eslint-disable camelcase */
                        content_type: 'text/plain',
                        /* eslint-enable camelcase */
                        data: null
                    } };
            try {
                result = await this._data.put(update);
            }
            catch (error) {
                this.model[this.attachmentTypeName][this.internalName].state.errors = { database: ('message' in error) ? error.message : this._representObject(error) };
                return;
            }
            if (this.mapNameToField && this.mapNameToField.includes(this.idName))
                this.delete.emit(result);
            else
                this.model[this.revisionName] = result.rev;
        }
        this.model[this.attachmentTypeName][this.internalName].state.errors =
            this.model[this.attachmentTypeName][this.internalName].value =
                this.file = null;
        if (!this.model[this.attachmentTypeName][this.internalName].nullable)
            this.model[this.attachmentTypeName][this.internalName].state
                .errors = { required: true };
        this.modelChange.emit(this.model);
        this.fileChange.emit(this.file);
    }
    /**
         * Renames current file.
         * @param name - New name to rename current file to.
         * @returns A Promise which will be resolved after current file will be
         * renamed.
         */
    async rename(name) {
        const id = this._idIsObject ? this.model[this.idName].value : this.model[this.idName];
        const oldName = this.file.name;
        if (this.file.stub && this.mapNameToField && id &&
            this.mapNameToField.includes(this.idName))
            try {
                await this.retrieveAttachment(id);
            }
            catch (error) {
                this.model[this.attachmentTypeName][this.internalName].state.errors = { database: ('message' in error) ? error.message : this._representObject(error) };
                return;
            }
        this.file.name = name;
        return this.update(oldName);
    }
    /**
         * Retrieves current attachment with given document id and converts them
         * into a base 64 string which will be set as file source.
         * @param id - Document id which should hold needed attachment.
         * @param options - Options to use for the attachment retrieving.
         * @returns A promise which resolves if requested attachment was retrieved.
         */
    async retrieveAttachment(id, options = {}) {
        const file = await this._data.getAttachment(id, this.file.name, options);
        this.file = {
            /* eslint-disable camelcase */
            content_type: file.type || 'text/plain',
            /* eslint-enable camelcase */
            data: typeof Blob === 'undefined' ?
                file.toString('base64') :
                await eval('require')('blob-util').blobToBase64String(file),
            length: file.size,
            name: this.file.name
        };
        this.file.source = this._domSanitizer.bypassSecurityTrustResourceUrl(`data:${this.file.content_type};base64,${this.file.data}`);
    }
    /**
         * Updates given current file into database (replaces if old name is
         * given).
         * @param oldName - Name of saved file to update or replace.
         * @returns A Promise which will be resolved after current file will be
         * synchronized.
         */
    async update(oldName) {
        this.model[this.attachmentTypeName][this.internalName].state = {};
        if (this._prefixMatch) {
            const lastIndex = this.file.name.lastIndexOf('.');
            if ([0, -1].includes(lastIndex))
                this.file.name = this.name;
            else
                this.file.name = this.name + this.file.name.substring(lastIndex);
        }
        this.model[this.attachmentTypeName][this.internalName].value = this.file;
        // region determine errors
        if (!this.model[this.attachmentTypeName][this.internalName].state.errors)
            this.model[this.attachmentTypeName][this.internalName].state.errors = {};
        if (!(new RegExp(this.internalName)).test(this.file.name))
            this.model[this.attachmentTypeName][this.internalName].state.errors = { name: true };
        if (!([undefined, null].includes(this.model[this.attachmentTypeName][this.internalName].contentTypeRegularExpressionPattern) || (new RegExp(this.model[this.attachmentTypeName][this.internalName].contentTypeRegularExpressionPattern)).test(this.file.content_type)))
            this.model[this.attachmentTypeName][this.internalName].state.errors.contentType = true;
        if (!([undefined, null].includes(this.model[this.attachmentTypeName][this.internalName].minimumSize) || this.model[this.attachmentTypeName][this.internalName].minimumSize <= this.file.length))
            this.model[this.attachmentTypeName][this.internalName].state.errors.minimuSize = true;
        if (!([undefined, null].includes(this.model[this.attachmentTypeName][this.internalName].maximumSize) || this.model[this.attachmentTypeName][this.internalName].maximumSize >= this.file.length))
            this.model[this.attachmentTypeName][this.internalName].state.errors.maximumSize = true;
        if (Object.keys(this.model[this.attachmentTypeName][this.internalName].state.errors).length === 0)
            delete this.model[this.attachmentTypeName][this.internalName]
                .state.errors;
        // endregion
        if (this.synchronizeImmediately && !this.model[this.attachmentTypeName][this.internalName].state.errors) {
            let newData = {
                [this.typeName]: this.model[this.typeName],
                [this.idName]: this._idIsObject ? this.model[this.idName].value : this.model[this.idName]
            };
            if (this.synchronizeImmediately !== true)
                this._extendObject(true, newData, this.synchronizeImmediately);
            let id = this._idIsObject ? this.model[this.idName].value : this.model[this.idName];
            // NOTE: We want to replace old medium.
            if (oldName && oldName !== this.file.name && !(this.mapNameToField && id &&
                this.mapNameToField.includes(this.idName)))
                newData[this.attachmentTypeName] = { [oldName]: { data: null } };
            if (![undefined, null].includes(this.model[this.revisionName]))
                newData[this.revisionName] = this.model[this.revisionName];
            const tasks = [];
            if (this.mapNameToField) {
                if (id && id !== this.file.name &&
                    this.mapNameToField.includes(this.idName)) {
                    newData[this.deletedName] = true;
                    tasks.unshift(newData);
                    newData = this._extendObject(true, {}, newData, { [this.deletedName]: false });
                }
                for (const name of this.mapNameToField) {
                    newData[name] = this.file.name;
                    if (name === this.idName && this._idIsObject)
                        this.model[name].value = this.file.name;
                    else
                        this.model[name] = this.file.name;
                }
            }
            newData[this.revisionName] = 'upsert';
            newData[this.attachmentTypeName] = { [this.file.name]: {
                    /* eslint-disable camelcase */
                    content_type: this.file.content_type,
                    /* eslint-enable camelcase */
                    data: this.file.data
                } };
            tasks.unshift(newData);
            let result;
            try {
                result = await this._data.bulkDocs(tasks);
            }
            catch (error) {
                this.model[this.attachmentTypeName][this.internalName].state.errors = { database: ('message' in error) ? error.message : this._representObject(error) };
                return;
            }
            id = newData[this.idName];
            let revision;
            for (const item of result) {
                if (item.error) {
                    this.model[this.attachmentTypeName][this.internalName].state.errors = { database: item.message };
                    return;
                }
                if (item.id === id)
                    revision = item.rev;
            }
            if (this.file) {
                this.file.revision = this.model[this.revisionName] = revision;
                this.file.query = `?rev=${revision}`;
                this.file.source =
                    this._domSanitizer.bypassSecurityTrustResourceUrl(this._stringFormat(this.configuration.database.url, '') + `/${this.configuration.name}/${id}/` +
                        `${this.file.name}${this.file.query}`);
                this.determinePresentationType();
            }
            this.modelChange.emit(this.model);
            this.fileChange.emit(this.file);
        }
        else if (this.file.data) {
            this.determinePresentationType();
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                this.file.digest = (new Date()).getTime();
                this.file.source =
                    this._domSanitizer.bypassSecurityTrustResourceUrl(event.target['result']);
                if (this.mapNameToField)
                    for (const name of this.mapNameToField)
                        this.model[name] = this.file.name;
                this.modelChange.emit(this.model);
                this.fileChange.emit(this.file);
            };
            fileReader.readAsDataURL(this.file.data);
        }
    }
}
// / endregion
// / region pagination
/* eslint-disable max-len */
// IgnoreTypeCheck
/* eslint-enable max-len */
/**
 * Provides a generic pagination component.
 * @property itemsPerPage - Number of items to show per page as maximum.
 * @property page - Contains currently selected page number.
 * @property pageChange - Event emitter to fire on each page change event.
 * @property pageRangeLimit - Number of concrete page links to show.
 * @property total - Contains total number of pages.
 *
 * @property _changeDetectorReference - Current views change detector reference
 * service instance.
 * @property _makeRangePipe - Saves the make range pipe transformation
 * function.
 */
export class PaginationComponent {
    /**
         * Sets needed services as property values.
         * @param changeDetectorReference - Model dirty checking service.
         * @param makeRangePipe - Saves the make range pipe instance.
         * @returns Nothing.
         */
    constructor(changeDetectorReference, makeRangePipe) {
        this._changeDetectorReference = changeDetectorReference;
        this._makeRange = makeRangePipe.transform.bind(makeRangePipe);
    }
    /**
         * Is called whenever a page change should be performed.
         * @param event - The responsible event.
         * @param newPage - New page number to change to.
         * @returns Nothing.
         */
    change(event, newPage) {
        event.preventDefault();
        this._changeDetectorReference.markForCheck();
        this.page = newPage;
        this.pageChange.emit(this.page);
    }
    /**
         * Determines the highest page number.
         * @returns The determines page number.
         */
    get lastPage() {
        return Math.ceil(this.total / this.itemsPerPage);
    }
    /**
         * Retrieves the next or last (if last is current) page.
         * @returns The new determined page number.
         */
    get nextPage() {
        return Math.min(this.page + 1, this.lastPage);
    }
    /**
         * Determines the number of pages to show.
         * @returns A list of page numbers.
         */
    get pagesRange() {
        if (this.page - this.pageRangeLimit < 1) {
            const start = 1;
            const startRest = this.pageRangeLimit - (this.page - start);
            const end = Math.min(this.lastPage, this.page + this.pageRangeLimit + startRest);
            return this._makeRange([start, end]);
        }
        const end = Math.min(this.lastPage, this.page + this.pageRangeLimit);
        const endRest = this.pageRangeLimit - (end - this.page);
        const start = Math.max(1, this.page - this.pageRangeLimit - endRest);
        return this._makeRange([start, end]);
    }
    /**
         * Determines the previous or first (if first is current) page.
         * @returns The previous determined page number.
         */
    get previousPage() {
        return Math.max(1, this.page - 1);
    }
}
// / endregion
// endregion
// region module
// IgnoreTypeCheck
/**
 * Represents the importable angular module.
 */
export class Module {
}
export default Module;
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
