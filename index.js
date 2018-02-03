
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
import Tools, {
    $, $DomNode, DomNode, globalContext, PlainObject
} from 'clientnode'
import {AnimationTriggerMetadata} from '@angular/animations'
import {
    AfterContentChecked,
    AfterViewInit,
    APP_INITIALIZER,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    Injectable,
    /* eslint-disable no-unused-vars */
    Inject,
    /* eslint-enable no-unused-vars */
    Injector,
    Input,
    NgModule,
    OnChanges,
    OnDestroy,
    OnInit,
    /* eslint-disable no-unused-vars */
    Optional,
    /* eslint-enable no-unused-vars */
    Output,
    Pipe,
    PipeTransform,
    /* eslint-disable no-unused-vars */
    PLATFORM_ID,
    /* eslint-enable no-unused-vars */
    Renderer2 as Renderer,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core'
import {DatePipe, isPlatformServer} from '@angular/common'
import {
    HttpInterceptor, HTTP_INTERCEPTORS, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http'
import {
    DefaultValueAccessor, FormsModule, NG_VALUE_ACCESSOR
} from '@angular/forms'
/*
    NOTE: We should not import directly from "@angular/material" to improve
    tree shaking results.
*/
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {
    /* eslint-disable no-unused-vars */
    MAT_DIALOG_DATA,
    /* eslint-enable no-unused-vars */
    MatDialog,
    MatDialogRef,
    MatDialogModule
} from '@angular/material/dialog'
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select'
import {
    MatSnackBar, MatSnackBarConfig, MatSnackBarModule
} from '@angular/material/snack-bar'
import {MatTooltipModule} from '@angular/material/tooltip'
import {
    BrowserModule,
    DomSanitizer,
    SafeScript,
    SafeHtml,
    SafeResourceUrl,
    SafeStyle,
    SafeUrl
} from '@angular/platform-browser'
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    CanDeactivate,
    NavigationEnd,
    Resolve,
    Router,
    RouterStateSnapshot
} from '@angular/router'
import PouchDB from 'pouchdb'
import PouchDBFindPlugin from 'pouchdb-find'
import PouchDBValidationPlugin from 'pouchdb-validation'
import {Subject} from 'rxjs/Subject'
import {Observable} from 'rxjs/Observable'
import {ISubscription} from 'rxjs/Subscription'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
// NOTE: Only needed for debugging this file.
try {
    eval('require')('source-map-support/register')
} catch (error) {}

/*
    NOTE: Default import is not yet support for angular's ahead of time
    compiler.
*/
import {defaultAnimation} from './animation'
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
    deleted:string;
    deletedConflict:string;
    extend:string;
    id:string;
    localSequence:string;
    maximumAggregatedSize:string;
    minimumAggregatedSize:string;
    revision:string;
    revisions:string;
    revisionsInformation:string;
    strategy:string;
    type:string;
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
            validatedDocumentsCache:string;
        }
    }
}
export type Configuration = {database:{
    connector:{
        auto_compaction:boolean;
        revs_limit:number;
    },
    model:ModelConfiguration,
    plugins:Array<Object>;
    url:string;
}}
export type Stream = {
    cancel:Function;
    on:Function;
}
// endregion
if (typeof CHANGE_DETECTION_STRATEGY_NAME === 'undefined')
    /* eslint-disable no-var */
    var CHANGE_DETECTION_STRATEGY_NAME:string = 'default'
    /* eslint-enable no-var */
if (typeof require === 'undefined')
    /* eslint-disable no-var */
    var require:Function = Tools.noop
    /* eslint-enable no-var */
if (typeof UTC_BUILD_TIMESTAMP === 'undefined')
    /* eslint-disable no-var */
    var UTC_BUILD_TIMESTAMP:number = 1
    /* eslint-enable no-var */
export let LAST_KNOWN_DATA:{data:PlainObject;sequence:number|string} = {
    data: {}, sequence: 'now'
}
export let currentInstanceToSearchInjectorFor:Object|null = null
export const globalVariableNameToRetrieveDataFrom:string = 'genericInitialData'
export const applicationDomNodeSelector:string = 'application, [application]'
export const SYMBOL:string = `${new Date().getTime()}/${Math.random()}`
// region configuration
const animations:Array<AnimationTriggerMetadata> = [defaultAnimation]
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
const tinymceBasePath:string = '/tinymce/'
export const TINYMCE_DEFAULT_OPTIONS:PlainObject = {
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
    /* eslint-enable camelcase */
}
// endregion
// region basic services
// IgnoreTypeCheck
@Injectable()
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
    static $:any = $
    static globalContext:any = globalContext
    static tools:typeof Tools = Tools

    fixed:typeof UtilityService = UtilityService
    tools:Tools = new Tools()
}
// IgnoreTypeCheck
@Injectable()
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
                        create: {
                            execution: '_createExecution',
                            expression: '_createExpression'
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
                        type: '-type',
                        update: {
                            execution: '_updateExecution',
                            expression: '_updateExpression'
                        }
                    },
                    validatedDocumentsCache: '_validatedDocuments'
                }
            }
        },
        plugins: [],
        url: 'generic'
    }}}
    static injectors:Set<Injector> = new Set()
    static removeFoundData:boolean = true

    configuration:PlainObject
    globalContext:any
    tools:Tools
    /**
     * Sets all properties of given initial data as properties to this
     * initializing instance.
     * @param utility - Saves the generic tools service instance.
     * @returns Nothing.
     */
    constructor(utility:UtilityService) {
        if (!utility)
            utility = new UtilityService()
        this.globalContext = utility.fixed.globalContext
        this.tools = utility.fixed.tools
        this.set(
            InitialDataService.defaultScope,
            globalVariableNameToRetrieveDataFrom in utility.fixed.globalContext
                ?
                utility.fixed.globalContext[
                    globalVariableNameToRetrieveDataFrom]
                :
                {})
        if (InitialDataService.removeFoundData)
            delete utility.fixed.globalContext[
                globalVariableNameToRetrieveDataFrom]
    }
    /**
     * Retrieve initial data from given dom node or dom node identifier.
     * @param domNodeReference - Dom node or a selector to retrieve a dom node.
     * @param removeFoundData - Removes found attribute value from dom node.
     * @param attributeName - An attribute name to retrieve data from.
     * @returns Nothing.
     */
    retrieveFromDomNode(
        domNodeReference:DomNode|string = applicationDomNodeSelector,
        removeFoundData:boolean = InitialDataService.removeFoundData,
        attributeName:string = 'initialData'
    ):PlainObject {
        let domNode:DomNode|null = null
        if (typeof domNodeReference === 'string') {
            if (
                'document' in this.globalContext &&
                'querySelector' in this.globalContext.document
            )
                domNode = this.globalContext.document.querySelector(
                    domNodeReference)
        } else
            domNode = domNodeReference
        let result:PlainObject = {}
        if (domNode && 'getAttribute' in domNode && domNode.getAttribute(
            attributeName
        )) {
            result = this.set(JSON.parse(domNode.getAttribute(attributeName)))
            if (removeFoundData)
                domNode.removeAttribute(attributeName)
        }
        return result
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
export const determineInjector:Function = (
    injector?:Injector, instance?:Object, constructor?:Object
):Function|void => {
    if (injector)
        return injector.get.bind(injector)
    if (currentInstanceToSearchInjectorFor === this)
        throw SYMBOL
    currentInstanceToSearchInjectorFor = this
    // NOTE: Converting set to array is necessary to avoid transpiling issues.
    for (const injector of Array.from(InitialDataService.injectors))
        try {
            if (injector.get(constructor, NaN) === instance)
                return injector.get.bind(injector)
        } catch (error) {
            currentInstanceToSearchInjectorFor = null
            if (error === SYMBOL)
                return injector.get.bind(injector)
            throw error
        }
    currentInstanceToSearchInjectorFor = null
    if (InitialDataService.injectors.size === 1) {
        console.warn(
            'Could not determine injector, but using the only registered ' +
            'one. This will fail an multiple application instances.')
        const injector:Injector = Array.from(InitialDataService.injectors)[0]
        return injector.get.bind(injector)
    }
    throw new Error(
        'No unambiguously injector could be determined automatically.')
}
// endregion
// region pipes
// / region wrapped
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
@Pipe({name: `genericExtendObject`})
/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */
export class ExtendObjectPipe extends AbstractToolsPipe
    implements PipeTransform {
    methodName:string = 'extendObject'
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
// / endregion
// / region object
// IgnoreTypeCheck
@Pipe({name: 'genericAttachmentsAreEqual'})
/**
 * Determines if given attachments are representing the same data.
 * @property data - Database service instance.
 * @property representObject - Represent object pipe's method.
 * @property specialNames - A mapping to database specific special property
 * names.
 * @property stringMD5 - String md5 pipe's instance transform method.
 */
export class AttachmentsAreEqualPipe implements PipeTransform {
    data:DataService
    representObject:Function
    specialNames:PlainObject
    stringMD5:Function
    /**
     * Gets needed services injected.
     * @param initialData - Injected initial data service instance.
     * @param injector - Application specific injector instance.
     * @param representObjectPipe - Represent object pipe instance.
     * @param stringMD5Pipe - Injected string md5 pipe instance.
     * @returns Nothing.
     */
    constructor(
        initialData:InitialDataService,
        injector:Injector,
        representObjectPipe:RepresentObjectPipe,
        stringMD5Pipe:StringMD5Pipe
    ) {
        this.data = injector.get(DataService)
        this.representObject = representObjectPipe.transform.bind(
            representObjectPipe)
        this.specialNames =
            initialData.configuration.database.model.property.name.special
        this.stringMD5 = stringMD5Pipe.transform.bind(stringMD5Pipe)
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
                    await databaseConnection.put({
                        [this.specialNames.id]: name,
                        [this.specialNames.attachment]: {
                            [name]: {
                                data: data[type].data,
                                /* eslint-disable camelcase */
                                content_type: 'application/octet-stream'
                                /* eslint-enable camelcase */
                            }
                        }
                    })
                    data[type].hash = (await databaseConnection.get(
                        name
                    ))[this.specialNames.attachment][name].digest
                } catch (error) {
                    let message:string = 'unknown'
                    try {
                        message = this.representObject(error)
                    } catch (error) {}
                    console.warn(
                        'Given attachments for equality check are not ' +
                        `valid: ${message}`)
                    return false
                } finally {
                    await databaseConnection.destroy()
                }
            }
        return data.first.hash === data.second.hash
    }
}
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
    dataScope:DataScopeService
    equals:Function
    modelConfiguration:ModelConfiguration
    numberGetUTCTimestamp:Function
    specialNames:SpecialPropertyNames
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
        if (typeof value === 'object' && value !== null) {
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
        newDocument:PlainObject, oldDocument:PlainObject,
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
                                    newData[name], oldData[name],
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
        if (typeof data === 'object' && data !== null) {
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
                    if (![undefined, null].includes(data[name]) && !(
                        emptyEqualsToNull && (
                            data[name] === '' ||
                            Array.isArray(data[name]) &&
                            data[name].length === 0 ||
                            typeof data[name] === 'object' &&
                            !(data[name] instanceof Date) &&
                            Object.keys(data[name]).length === 0))
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
                                this.specialNames.revisions,
                                this.specialNames.revisionsInformation
                            ].includes(name) && (
                                !specification ||
                                specification.hasOwnProperty(name) ||
                                specification.hasOwnProperty(
                                    this.specialNames.additional))
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
                result, this.removeMetaData(oldDocument, specification),
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
// IgnoreTypeCheck
@Pipe({name: 'genericIsDefined'})
/**
 * Checks if given reference is defined.
 */
export class IsDefinedPipe implements PipeTransform {
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
// / endregion
// region array
// IgnoreTypeCheck
@Pipe({name: 'genericArrayDependentConcat'})
/**
 * Dependently concatenate given data to piped data.
 */
export class ArrayDependentConcatPipe/* immplements PipeTransform*/ {
    /**
     * Does the given array transformation logic.
     * @param array - Array to transform.
     * @param indicator - Indicator to decide if concatenation should be done.
     * @param item - Object(s) to concatenate.
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
@Pipe({name: 'genericStringHasTimeSuffix'})
/**
 * Determines if given string has a time indicating suffix.
 */
export class StringHasTimeSuffixPipe implements PipeTransform {
    /**
     * Performs the actual string suffix check.
     * @param string - To search in.
     * @returns The boolean result.
     */
    transform(string?:string):boolean {
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
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
// IgnoreTypeCheck
@Pipe({name: 'genericStringTemplate'})
/**
 * Provides angular's template engine as pipe.
 * @property extendObject - Extend object's pipe transform method.
 */
export class StringTemplatePipe implements PipeTransform {
    extendObject:Function
    /**
     * Sets injected extend object pipe instance as instance property.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @returns Nothing.
     */
    constructor(extendObjectPipe:ExtendObjectPipe) {
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
    }
    /**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param scopes - Scopes to merge and render again given template string
     * again.
     * @returns The rendered result.
     */
    transform(string:string = '', ...scopes:Array<PlainObject>):string {
        const scope:PlainObject = this.extendObject(true, {}, ...scopes)
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
// / region number
// IgnoreTypeCheck
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
        return 'canDeactivate' in component ? component.canDeactivate(
            ...additionalParameter) : true
    }
}
// / region confirm
// IgnoreTypeCheck
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
            <button (click)="dialogReference.close(true)" mat-raised-button>
                {{okText}}
            </button>
            <button (click)="dialogReference.close(false)" mat-raised-button>
                {{cancelText}}
            </button>
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
    dialogReference:MatDialogRef<ConfirmComponent>|null = null
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
        // IgnoreTypeCheck
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
// IgnoreTypeCheck
@Injectable()
/**
 * Alert service to trigger a dialog window which can be confirmed.
 * @property dialog - Reference to the dialog component instance.
 * @property dialogReference - Reference to the dialog service instance.
 */
export class AlertService {
    dialog:MatDialog
    dialogReference:MatDialogRef<ConfirmComponent>
    /**
     * Gets needed component dialog service instance injected.
     * @param dialog - Reference to the dialog component instance.
     * @returns Nothing.
     */
    constructor(dialog:MatDialog) {
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
 * @property static:skipGenericIndexManagementOnServer - Indicates whether
 * generic index creation deletion should be done on server context.
 * @property static:skipRemoteConnectionOnServer - Indicates whether remote
 * connections should be avoided on server contexts.
 * @property static:wrappableMethodNames - Saves a list of method names which
 * can be intercepted.
 *
 * @property connection - The current database connection instance.
 * @property database - The entire database constructor.
 * @property errorCallbacks - Holds all registered error callbacks.
 * @property equals - Hilds the equals pipe transformation method.
 * @property extendObject - Holds the extend object's pipe transformation
 * method.
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
    // NOTE: Native regular expression definition is not allowed here.
    static revisionNumberRegularExpression:RegExp = new RegExp('^([0-9]+)-')
    static skipGenericIndexManagementOnServer:boolean = true
    static skipRemoteConnectionOnServer:boolean = true
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
    errorCallbacks:Array<Function> = []
    equals:Function
    extendObject:Function
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
    /**
     * Creates the database constructor applies all plugins instantiates
     * the connection instance and registers all middlewares.
     * @param equalsPipe - Equals pipe service instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param platformID - Platform identification string.
     * @param stringFormatPipe - Injected string format pipe instance.
     * @param utility - Injected utility service instance.
     * @returns Nothing.
     */
    constructor(
        equalsPipe:EqualsPipe,
        extendObjectPipe:ExtendObjectPipe,
        initialData:InitialDataService,
        @Inject(PLATFORM_ID) platformID:string,
        stringFormatPipe:StringFormatPipe,
        utility:UtilityService
    ) {
        this.configuration = initialData.configuration
        this.database = PouchDB
        this.equals = equalsPipe.transform.bind(equalsPipe)
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
        this.platformID = platformID
        this.stringFormat = stringFormatPipe.transform.bind(stringFormatPipe)
        this.tools = utility.fixed.tools
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
                NOTE: "bulkDocs()" does not get constructor given options
                if none were provided for a single function call.
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
        /*
            NOTE: We want to allow other services to manipulate the database
            constructor and configurations before initializing them.
        */
        await this.tools.timeout()
        if (this.configuration.database.hasOwnProperty('publicURL'))
            this.configuration.database.url =
                this.configuration.database.publicURL
        for (const plugin of this.configuration.database.plugins)
            this.database.plugin(plugin)
        const options:PlainObject = this.extendObject(
            /* eslint-disable camelcase */
            true, {skip_setup: true},
            /* eslint-enable camelcase */
            this.configuration.database.connector || {})
        const databaseName:string = this.configuration.name || 'generic'
        if (!(
            DataService.skipRemoteConnectionOnServer &&
            isPlatformServer(this.platformID)
        ))
            this.remoteConnection = new this.database(this.stringFormat(
                this.configuration.database.url, ''
            ) + `/${databaseName}`, options)
        if (
            this.configuration.database.local ||
            DataService.skipRemoteConnectionOnServer &&
            isPlatformServer(this.platformID)
        )
            this.connection = new this.database(databaseName, options)
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
                        try {
                            result.rev =
                                revisionName in firstParameter &&
                                !['latest', 'upsert'].includes(
                                    revision
                                ) ? revision : (await this.get(result.id))[
                                    revisionName]
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
        // region register interceptor
        for (const name in this.connection)
            if (
                DataService.wrappableMethodNames.includes(name) &&
                typeof this.connection[name] === 'function'
            ) {
                const method:Function = this.connection[name]
                this.connection[name] = async (
                    ...parameter:Array<any>
                ):Promise<any> => {
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
                        if (this.middlewares.pre.hasOwnProperty(methodName))
                            for (
                                const interceptor of
                                this.middlewares.pre[methodName]
                            ) {
                                let wrappedParameter:any = interceptor.apply(
                                    this.connection,
                                    request.wrappedParameter.concat(
                                        methodName === '_all' ? name : []))
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
                        context:any=this.connection,
                        givenParameter:Array<any>=request.wrappedParameter
                    ):any => method.apply(context, givenParameter)
                    let result:any
                    try {
                        result = action()
                    } catch (error) {
                        await this.triggerErrorCallbacks(error, result, action)
                    }
                    for (const methodName of [name, '_all'])
                        if (this.middlewares.post.hasOwnProperty(methodName))
                            for (
                                const interceptor of
                                this.middlewares.post[methodName]
                            ) {
                                result = interceptor.call(
                                    this.connection, result, action,
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
                )
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
                                this.configuration.database.model
                                    .property.name.special.type,
                                name
                            ],
                            name: `${modelName}-${name}-GenericIndex`
                        }})
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
                            for (const name of DataService
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
                        await this.connection.deleteIndex(index)
                }
            // endregion
        }
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
                DataService.revisionNumberRegularExpression
            )[1]) < parseInt(
                    LAST_KNOWN_DATA.data[result[idName]][revisionName].match(
                        DataService.revisionNumberRegularExpression
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
     * @param utility - Injected utility service instance.
     * @returns Nothing.
     */
    constructor(
        attachmentWithPrefixExistsPipe:AttachmentWithPrefixExistsPipe,
        data:DataService,
        extendObjectPipe:ExtendObjectPipe,
        extractDataPipe:ExtractDataPipe,
        getFilenameByPrefixPipe:GetFilenameByPrefixPipe,
        initialData:InitialDataService,
        numberGetUTCTimestampPipe:NumberGetUTCTimestampPipe,
        representObjectPipe:RepresentObjectPipe,
        utility:UtilityService
    ) {
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
        modelName:string, id:string|null = null,
        propertyNames:Array<string>|null = null, revision:string = 'latest',
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
        }
        return this.generate(modelName, propertyNames, data)
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
        modelSpecification:PlainObject, propertyNames?:Array<string>,
        propertyNamesToIgnore:Array<string> = []
    ):PlainObject {
        if (!propertyNames)
            propertyNames = Object.keys(modelSpecification)
        const result:PlainObject = {}
        for (const name of propertyNames)
            if (
                modelSpecification.hasOwnProperty(name) &&
                !propertyNamesToIgnore.includes(name)
            )
                if (
                    name === this.configuration.database.model.property.name
                        .special.attachment
                ) {
                    result[name] = {}
                    for (const fileType in modelSpecification[name])
                        if (modelSpecification[name].hasOwnProperty(fileType))
                            result[name][fileType] = this.extendObject(
                                true, this.tools.copy(
                                    this.configuration.database.model
                                        .property.defaultSpecification
                                ), modelSpecification[name][fileType])
                } else {
                    result[name] = this.extendObject(true, this.tools.copy(
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
        modelName:string, propertyNames?:Array<string>,
        data:PlainObject = {}, propertyNamesToIgnore?:Array<string>
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
                specialNames.revisions,
                specialNames.revisionsInformation,
                specialNames.type)
        const specification:PlainObject = this.determineSpecificationObject(
            modelSpecification, propertyNames,
            propertyNamesToIgnore.concat(reservedNames))
        if (!propertyNames) {
            propertyNames = Object.keys(specification).filter(
                (key:string):boolean =>
                    typeof specification[key] === 'object' &&
                    typeof specification[key] !== null &&
                    !Array.isArray(specification[key]))
            propertyNames = propertyNames.concat(Object.keys(data).filter((
                name:string
            // IgnoreTypeCheck
            ):boolean => !propertyNames.concat(reservedNames).includes(name)))
        }
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
                                newDocument: data,
                                oldDocument: null,
                                userConteyt: {},
                                securitySettings: {},
                                name: type,
                                models: entities,
                                modelConfiguration:
                                    this.configuration.database.model,
                                serialize: (object:Object):string =>
                                    JSON.stringify(object, null, 4),
                                modelName,
                                model: modelSpecification,
                                propertySpecification: result[name][type],
                                now,
                                nowUTCTimestamp,
                                getFilenameByPrefix: this.getFilenameByPrefix,
                                attachmentWithPrefixExists:
                                    this.attachmentWithPrefixExists.bind(
                                        data, data)
                            }
                            for (const hookType of [
                                'onCreateExecution', 'onCreateExpression'
                            ])
                                if (result[name][type].hasOwnProperty(
                                    hookType
                                ) && result[name][type][hookType]) {
                                    result[name][type].value = (new Function(
                                        ...Object.keys(scope), (
                                            hookType.endsWith(
                                                'Expression'
                                            ) ? 'return ' : ''
                                        ) + result[name][type][hookType]
                                    ))(...Object.values(scope))
                                    if (result[name][type].hasOwnProperty(
                                        'value'
                                    ) && result[name][type].value === undefined
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
                            result[name][type].value = this.tools.copy(
                                {}, result[name][type].default)
                    }
            } else {
                result[name].name = name
                result[name].value = null
                if (Object.keys(data).length === 0) {
                    const scope:Object = {
                        newDocument: data,
                        oldDocument: null,
                        userContext: {},
                        securitySettings: {},
                        name,
                        models: entities,
                        modelConfiguration: this.configuration.database.model,
                        serialize: (object:Object):string => JSON.stringify(
                            object, null, 4),
                        modelName,
                        model: modelSpecification,
                        propertySpecification: result[name],
                        now,
                        nowUTCTimestamp,
                        getFilenameByPrefix: this.getFilenameByPrefix,
                        attachmentWithPrefixExists:
                            this.attachmentWithPrefixExists.bind(
                                data, data)
                    }
                    for (const type of [
                        'onCreateExpression', 'onCreateExecution'
                    ])
                        if (
                            result[name].hasOwnProperty(type) &&
                            result[name][type]
                        ) {
                            result[name].value = (new Function(
                                ...Object.keys(scope), (
                                    type.endsWith('Expression') ? 'return ' :
                                    ''
                                ) + result[name][type]
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
                else if (
                    result[name].hasOwnProperty('selection') &&
                    Array.isArray(result[name].selection) &&
                    result[name].selection.length
                )
                    result[name].value = result[name].selection[0]
                if (
                    typeof result[name].value === 'number' &&
                    result[name].hasOwnProperty('type') &&
                    (
                        result[name].type.endsWith('Date') ||
                        result[name].type.endsWith('Time')
                    )
                )
                    // NOTE: We interpret given value as an utc timestamp.
                    result[name].value = new Date(result[name].value * 1000)
                else if (result[name].hasOwnProperty('type'))
                    if (entities.hasOwnProperty(result[name].type))
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
                            for (const item of result[name].value) {
                                result[name].value[index] = this.generate(
                                    type, null, item || {},
                                    [specialNames.attachment, specialNames.id])
                                index += 1
                            }
                        }
                    }
            }
        }
        for (const name of reservedNames)
            if (data.hasOwnProperty(name))
                result[name] = data[name]
            else if (name === specialNames.type)
                result[name] = modelName
        result._metaData = {submitted: false}
        return result
    }
}
// IgnoreTypeCheck
@Injectable()
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
        return next.handle(request).do(unregister, unregister)
    }
}
// / region abstract
// IgnoreTypeCheck
@Injectable()
/**
 * Helper class to extend from to have some basic methods to deal with database
 * entities.
 * @property static:skipResolvingOnServer - Indicates whether to skip resolving
 * data on server contexts.
 *
 * @property convertCircularObjectToJSON - Saves convert circular object to
 * json's pipe transform method.
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
 * @property platformID - Platform identification string.
 * @property relevantKeys - Saves a list of relevant key names to take into
 * account during resolving.
 * @property relevantSearchKeys - Saves a list of relevant key names to take
 * into during searching.
 * @property representObject - Represent object pipe transformation function.
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
    static skipResolvingOnServer:boolean = true

    convertCircularObjectToJSON:Function
    data:PlainObject
    databaseBaseURL:string
    databaseURL:string
    databaseURLCache:{[key:string]:SafeResourceUrl} = {}
    domSanitizer:DomSanitizer
    escapeRegularExpressions:Function
    extendObject:Function
    message:Function
    messageConfiguration:PlainObject = new MatSnackBarConfig()
    modelConfiguration:PlainObject
    platformID:string
    relevantKeys:Array<string>|null = null
    relevantSearchKeys:Array<string>|null = null
    representObject:Function
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
        this.extendObject = get(ExtendObjectPipe).transform.bind(get(
            ExtendObjectPipe))
        this.messageConfiguration.duration = 5 * 1000
        this.message = (message:string):void =>
            get(MatSnackBar).open(message, false, this.messageConfiguration)
        this.modelConfiguration = get(
            InitialDataService
        ).configuration.database.model
        this.platformID = get(PLATFORM_ID)
        this.representObject = get(RepresentObjectPipe).transform.bind(get(
            RepresentObjectPipe))
        this.specialNames = get(
            InitialDataService
        ).configuration.database.model.property.name.special
        this.tools = get(UtilityService).fixed.tools
    }
    /**
     * Determines item specific database url by given item data object.
     * @param item - Given item object.
     * @returns Determined url.
     */
    getDatabaseURL(item:PlainObject):SafeResourceUrl {
        const url:string = this.databaseBaseURL + ((
            typeof item[this.specialNames.id] === 'object'
        ) ? item[this.specialNames.id].value : item[this.specialNames.id])
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
    async list(
        sort:Array<PlainObject> = [{
            [
            InitialDataService.defaultScope.configuration.database.model
                .property.name.special.id
            ]: 'asc'
        }], page:number = 1, limit:number = 10, searchTerm:string = '',
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
        if (sort.length)
            options.sort = [this.specialNames.type].concat(sort).map((
                item:PlainObject
            ):PlainObject|string =>
                Object.values(item)[0] === 'asc' ? Object.keys(item)[0] : item)
        return await this.data.find(
            this.extendObject(true, selector, additionalSelector), options)
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
    ):Array<PlainObject>|Promise<Array<PlainObject>> {
    /* eslint-enable no-unused-vars */
        if (AbstractResolver.skipResolvingOnServer && isPlatformServer(
            this.platformID
        ))
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
        return this.list(sort, parseInt(
            route.params.page || 1
        ), parseInt(route.params.limit || 10), searchTerm)
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
        const newData:PlainObject = data ? this.extendObject({
            [this.specialNames.id]: (
                typeof item[this.specialNames.id] === 'object'
            ) ? item[this.specialNames.id].value :
                item[this.specialNames.id],
            [this.specialNames.revision]: 'latest',
            [this.specialNames.type]: item[this.specialNames.type]
        }, data) : item
        try {
            item[this.specialNames.revision] =
                (await this.data.put(newData)).rev
        } catch (error) {
            this.message(
                'message' in error ? error.message : this.representObject(
                    error))
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
    /*
        NOTE: We need this statement here to avoid having an ugly typescript
        error.
    */
    // TODO remove if corresponding aot bug is fixed.
    2
    return ():Promise<void> => {
        InitialDataService.injectors.add(injector)
        return data.initialize()
    }
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
    @Input() declaration:string|null = null
    @Input() description:string|null = null
    @Input() disabled:boolean|null = null
    @Input() maximum:number|null = null
    @Input() maximumLength:number|null = null
    @Input() maximumLengthText:string =
        'Please type less or equal than ${model.maximumLength} symbols.'
    @Input() maximumText:string =
        'Please give a number less or equal than ${model.maximum}.'
    @Input() minimum:number|null = null
    @Input() minimumLength:number|null = null
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
    @Input() required:boolean|null = null
    @Input() requiredText:string = 'Please fill this field.'
    @Input() showDeclarationText:string = 'ℹ'
    @Input() showValidationErrorMessages:boolean = false
    @Input() type:string
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
export class AbstractNativeInputComponent extends AbstractInputComponent
    implements OnInit {
    _attachmentWithPrefixExists:Function
    _extendObject:Function
    _getFilenameByPrefix:Function
    _modelConfiguration:PlainObject
    _numberGetUTCTimestamp:Function
    /**
     * Sets needed services as property values.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(@Optional() injector:Injector) {
        super()
        const get:Function = determineInjector(
            injector, this, this.constructor)
        this._attachmentWithPrefixExists = get(
            AttachmentWithPrefixExistsPipe
        ).transform.bind(get(AttachmentWithPrefixExistsPipe))
        this._extendObject = get(ExtendObjectPipe).transform.bind(get(
            ExtendObjectPipe))
        this._getFilenameByPrefix = get(
            GetFilenameByPrefixPipe
        ).transform.bind(get(GetFilenameByPrefixPipe))
        this._modelConfiguration =
            get(InitialDataService).configuration.database.model
        this._numberGetUTCTimestamp = get(
            NumberGetUTCTimestampPipe
        ).transform.bind(get(NumberGetUTCTimestampPipe))
    }
    /**
     * Triggers after input values have been resolved.
     * @returns Nothing.
     */
    ngOnInit():void {
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
        }, this.model))
        if (typeof this.model.value === 'string' && this.model.trim)
            this.model.value === this.model.value.trim()
        for (const hookType of ['onUpdateExpression', 'onUpdateExecution'])
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
        for (const hookType of ['onUpdateExpression', 'onUpdateExecution'])
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
export class AbstractLiveDataComponent implements OnDestroy, OnInit {
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
    autoRestartOnError:boolean = true

    _canceled:boolean = false
    _changeDetectorReference:ChangeDetectorRef
    _changesStream:Stream
    _data:DataService
    _extendObject:Function
    _liveUpdateOptions:PlainObject = {}
    _stringCapitalize:Function
    _tools:typeof Tools
    /**
     * Saves injected service instances as instance properties.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(@Optional() injector:Injector) {
        const get:Function = determineInjector(
            injector, this, this.constructor)
        this._changeDetectorReference = get(ChangeDetectorRef)
        this._data = get(DataService)
        this._extendObject = get(ExtendObjectPipe).transform.bind(get(
            ExtendObjectPipe))
        this._stringCapitalize = get(StringCapitalizePipe).transform.bind(get(
            StringCapitalizePipe))
        this._tools = get(UtilityService).fixed.tools
    }
    /**
     * Initializes data observation when view has been initialized.
     * @returns Nothing.
     */
    ngOnInit():void {
        const initialize:Function = this._tools.debounce(():void => {
            if (this._changesStream)
                this._changesStream.cancel()
            this._changesStream = this._data.connection.changes(
                this._extendObject(
                    true, {}, {since: LAST_KNOWN_DATA.sequence},
                    AbstractLiveDataComponent.defaultLiveUpdateOptions,
                    this._liveUpdateOptions))
            for (const type of ['change', 'complete', 'error'])
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
                        result !== null &&
                        typeof result === 'object' &&
                        'then' in result
                    )
                        result = await result
                    if (result)
                        this._changeDetectorReference.detectChanges()
                    if (type === 'error')
                        if (
                            action.hasOwnProperty('name') &&
                            action.name === 'unauthorized' ||
                            action.hasOwnProperty('error') &&
                            action.error === 'unauthorized'
                        ) {
                            if (this._changesStream)
                                this._changesStream.cancel()
                        } else if (this.autoRestartOnError)
                            initialize()
                })
        }, 3000)
        /*
            NOTE: We have to break out of the "zone.js" since long polling
            seems to confuse its mocked environment.
        */
        this._tools.timeout(initialize)
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
    /* eslint-disable no-unused-vars */
    /**
     * Triggers on any data changes.
     * @param event - An event object holding informations about the triggered
     * reason.
     * @returns A boolean (or promise wrapped) indicating whether a view update
     * should be triggered or not.
     */
    onDataChange(event:any = null):Promise<boolean>|boolean {
        return true
    }
    /**
     * Triggers on completed data change observation.
     * @param event - An event object holding informations about the triggered
     * reason.
     * @returns A boolean (or promise wrapped) indicating whether a view update
     * should be triggered or not.
     */
    onDataComplete(event:any = null):Promise<boolean>|boolean {
        return false
    }
    /**
     * Triggers on data change observation errors.
     * @param event - An event object holding informations about the triggered
     * reason.
     * @returns A boolean (or promise wrapped) indicating whether a view update
     * should be triggered or not.
     */
    onDataError(event:any = null):Promise<boolean>|boolean {
        return false
    }
    /* eslint-enable no-unused-vars */
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
export class AbstractItemsComponent extends AbstractLiveDataComponent
    implements AfterContentChecked, OnDestroy {
    allItems:Array<PlainObject>
    allItemsChecked:boolean = false
    debouncedUpdate:Function
    idName:string
    items:Array<PlainObject>
    keyCode:{[key:string]:number}
    limit:number
    navigateAway:boolean = false
    page:number
    preventedDataUpdate:Array<any>|null = null
    regularExpression:boolean = false
    revisionName:string
    searchTerm:string = ''
    searchTermStream:Subject<string> = new Subject()
    selectedItems:Set<PlainObject> = new Set()
    sort:PlainObject = {
        [
        InitialDataService.defaultScope.configuration.database.model.property
            .name.special.id
        ]: 'asc'}

    _currentParameter:PlainObject
    _itemPath:string = 'item'
    _itemsPath:string = 'items'
    _route:ActivatedRoute
    _router:Router
    _subscriptions:Array<ISubscription> = []
    _toolsInstance:Tools
    /**
     * Saves injected service instances as instance properties.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(@Optional() injector:Injector) {
        super(injector)
        const get:Function = determineInjector(injector)
        this.idName = get(
            InitialDataService
        ).configuration.database.model.property.name.special.id
        this.revisionName = get(
            InitialDataService
        ).configuration.database.model.property.name.special.revision
        this.keyCode = this._tools.keyCode
        this._route = get(ActivatedRoute)
        this._router = get(Router)
        // IgnoreTypeCheck
        this._toolsInstance = get(UtilityService).tools
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
            this.allItems = data.items.slice()
            data.items.splice(0, (this.page - 1) * this.limit)
            if (data.items.length > this.limit)
                data.items.splice(this.limit, data.items.length - this.limit)
            this.items = data.items
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
            this.allItems.length / this.limit)))
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
            this._subscriptions.push(subscription)
            const result:any = callback(...parameter)
            if (
                typeof result === 'object' &&
                result !== null &&
                'then' in result
            )
                await result
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
        for (const item of this.items) {
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
    goToItem(itemID:string, itemVersion:string = 'latest'):Promise<boolean> {
        this.navigateAway = true
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
        /*
            NOTE: We have to avoid that unexpected view changes do not happen
            on remote data changes.
        */
        if (
            this.selectedItems.size ||
            ![0, 1].includes(parseInt(this._currentParameter.page))
        )
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
     * @returns Returns the super values return value.
     */
    ngOnDestroy():any {
        const result:any = super.ngOnDestroy()
        for (const subscription of this._subscriptions)
            subscription.unsubscribe()
        return result
    }
    /**
     * Select all available items.
     * @returns Nothing.
     */
    selectAllItems():void {
        for (const item of this.items) {
            this.selectedItems.add(item)
            item.selected = true
        }
    }
    /**
     * Determines an items content specific hash value combined from id and
     * revision.
     * @param item - Item with id and revision property.
     * @returns Indicator string.
     */
    trackByIDAndRevision(item:PlainObject):string {
        return `${item[this.idName]}/${item[this.revisionName]}`
    }
    /**
     * Applies current filter criteria to current visible item set.
     * @param reload - Indicates whether a simple reload should be made because
     * a changed list of available items is expected for example.
     * @returns A boolean indicating whether route change was successful.
     */
    async update(reload:boolean = false):Promise<boolean> {
        let result:boolean = false
        await this._toolsInstance.acquireLock(`${this.constructor.name}Update`)
        if (!this.navigateAway) {
            this.applyPageConstraints()
            if (reload && parseInt(this._currentParameter.page) !== 0)
                /*
                    NOTE: Will be normalised to "1" after route reload (hack to
                    enforce route reloading).
                */
                this.page = 0
            let sort:string = ''
            for (const name in this.sort)
                if (this.sort.hasOwnProperty(name)) {
                    sort += `${sort ? ',' : ''}${name}`
                    if (this.sort[name] !== 'asc')
                        sort += `-${this.sort[name]}`
                }
            result = await this._router.navigate([
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
        }
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
    onChangeCallback:(value:any) => void = UtilityService.tools.noop
    onTouchedCallback:() => void = UtilityService.tools.noop
    @Input() type:string|null = null
    /**
     * Initializes and forwards needed services to the default value accessor
     * constructor.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector:Injector) {
        super(injector.get(Renderer), injector.get(ElementRef), null)
    }
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
     * @returns What inherited method returns.
     */
    registerOnChange(
        callback:(...parameter:Array<any>) => void
    ):any {
        this.onChangeCallback = (value:any):void => callback(this.import(
            value))
        return super.registerOnChange(this.onChangeCallback)
    }
    /**
     * Needed implementation for an angular control value accessor.
     * @param callback - Callback function to register.
     * @returns What inherited method returns.
     */
    registerOnTouched(callback:() => void):any {
        this.onTouchedCallback = callback
        return super.registerOnTouched(this.onTouchedCallback)
    }
    /**
     * Overridden inherited function for value export.
     * @param value - Value to export.
     * @returns The transformed give value.
     */
    writeValue(value:any):any {
        return super.writeValue(this.export(value))
    }
}
// / endregion
// // region date/time
// IgnoreTypeCheck
@Directive({selector: '[genericDate]'})
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
    dateFormatter:Function
    extendObject:Function
    options:{
        dateTime:Date|number|string;
        format:string;
        freeze:boolean;
        updateIntervalInMilliseconds:number;
    } = {
        dateTime: 'now',
        format: 'HH:mm:ss',
        freeze: false,
        updateIntervalInMilliseconds: 1000
    }
    templateReference:TemplateRef<any>
    timerID:any
    viewContainerReference:ViewContainerRef
    /**
     * Saves injected services as instance properties.
     * @param datePipe - Injected date pipe service instance.
     * @param extendObjectPipe - Injected extend object pipe service instance.
     * @param templateReference - Specified template reference.
     * @param viewContainerReference - Injected view container reference.
     * @returns Nothing.
     */
    constructor(
        datePipe:DatePipe,
        extendObjectPipe:ExtendObjectPipe,
        templateReference:TemplateRef<any>,
        viewContainerReference:ViewContainerRef
    ) {
        this.dateFormatter = datePipe.transform.bind(datePipe)
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
        this.templateReference = templateReference
        this.viewContainerReference = viewContainerReference
    }
    /* eslint-disable flowtype/require-return-type */
    /**
     * Options setter to merge into options interactively.
     * @param options - Options object to merge into.
     * @returns Nothing.
     */
    @Input('genericDate')
    set insertOptions(options:PlainObject) {
        if (
            ['string', 'number'].includes(typeof options) ||
            [null, undefined].includes(options) ||
            typeof options === 'object' &&
            options instanceof Date
        )
            options = {dateTime: options}
        this.extendObject(true, this.options, options)
    }
    /* eslint-enable flowtype/require-return-type */
    /**
     * Inserts a rendered template instance into current view.
     * @returns Nothing.
     */
    insert():void {
        let dateTime:Date|number|string = this.options.dateTime
        if (
            typeof dateTime === 'string' && ['now', ''].includes(dateTime) ||
            typeof dateTime === 'number' && isNaN(dateTime) ||
            [null, undefined].includes(dateTime)
        )
            dateTime = Date.now()
        else if (
            typeof dateTime === 'string' &&
            `${parseFloat(dateTime)}` === dateTime
        )
            dateTime = parseFloat(dateTime) * 1000
        this.viewContainerReference.createEmbeddedView(
            this.templateReference, {
                dateTime: this.dateFormatter(dateTime, this.options.format)
            })
    }
    /**
     * On destroy life cycle hook to cancel initialized interval timer.
     * @returns Nothing.
     */
    ngOnDestroy():void {
        if (this.timerID)
            clearInterval(this.timerID)
    }
    /**
     * Initializes interval timer and inserts initial template instance into
     * current view.
     * @returns Nothing.
     */
    ngOnInit():void {
        this.timerID = setInterval(():void => {
            if (!this.options.freeze) {
                this.viewContainerReference.remove()
                this.insert()
            }
        }, this.options.updateIntervalInMilliseconds)
        this.insert()
    }
}
// IgnoreTypeCheck
@Directive({selector: '[genericSlider]'})
/**
 * Directive to automatically switch a list of content elements.
 * @property extendObject - Extend object's pipe transform method.
 * @property index - Index of currently selected content.
 * @property options - Sliding options.
 * @property templateReference - Content element template to slide.
 * @property timerID - Timer id of next content switch.
 * @property viewContainerReference - View container reference to inject
 * instantiated template reference into.
 */
export class SliderDirective implements OnInit {
    extendObject:Function
    index:number = 0
    options:{
        freeze:boolean;
        startIndex:number;
        step:number;
        slides:Array<any>;
        updateIntervalInMilliseconds:number;
    } = {
        freeze: false,
        startIndex: 0,
        step: 1,
        slides: [],
        updateIntervalInMilliseconds: 6000
    }
    templateReference:TemplateRef<any>
    timerID:any
    viewContainerReference:ViewContainerRef
    /**
     * Saves injected services as instance properties.
     * @param extendObjectPipe - Injected extend object pipe service instance.
     * @param templateReference - Specified template reference.
     * @param viewContainerReference - Injected view container reference.
     * @returns Nothing.
     */
    constructor(
        extendObjectPipe:ExtendObjectPipe,
        templateReference:TemplateRef<any>,
        viewContainerReference:ViewContainerRef
    ) {
        this.extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
        this.templateReference = templateReference
        this.viewContainerReference = viewContainerReference
    }
    /**
     * Calculates next index from given reference point.
     * @param startIndex - Reference index.
     * @returns New calculated index.
     */
    getNextIndex(startIndex:number = -1):number {
        if (startIndex === -1)
            startIndex = this.index
        return (startIndex + this.options.step) % this.options.slides.length
    }
    /* eslint-disable flowtype/require-return-type */
    /**
     * Options setter to merge into options interactively.
     * @param options - Options object to merge into.
     * @returns Nothing.
     */
    @Input('genericSlider')
    set insertOptions(options:Array<any>|PlainObject) {
        if (Array.isArray(options))
            options = {slides: options}
        this.extendObject(true, this.options, options)
    }
    /* eslint-enable flowtype/require-return-type */
    /**
     * Inserts a rendered template instance into current view.
     * @returns Nothing.
     */
    update():void {
        if (this.options.slides.length)
            this.viewContainerReference.createEmbeddedView(
                this.templateReference, {
                    getNextIndex: this.getNextIndex.bind(this),
                    index: this.index,
                    options: this.options,
                    slide: this.options.slides[this.index],
                    slides: this.options.slides
                })
    }
    /**
     * On destroy life cycle hook to cancel initialized interval timer.
     * @returns Nothing.
     */
    ngOnDestroy():void {
        if (this.timerID)
            clearInterval(this.timerID)
    }
    /**
     * Initializes interval timer and inserts initial template instance into
     * current view.
     * @returns Nothing.
     */
    ngOnInit():void {
        this.timerID = setInterval(():void => {
            const newIndex:number = (this.index + this.options.step) %
                this.options.slides.length
            if (
                this.options.freeze !== true &&
                newIndex !== this.index && !(
                    typeof this.options.freeze === 'number' &&
                    this.options.freeze >= this.options.slides.length
                )
            ) {
                this.viewContainerReference.remove()
                this.index = this.getNextIndex()
                this.update()
            }
        }, this.options.updateIntervalInMilliseconds)
        this.index = this.options.startIndex
        this.update()
    }
}
const providers:Array<PlainObject> = [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(
        ():typeof DateTimeValueAccessor => DateTimeValueAccessor),
    multi: true
}]
/*
    NOTE: This core update resistent version is not compatible with angular's
    ahead of time compilation.

// IgnoreTypeCheck
@Directive(UtilityService.tools.extendObject(true, {
}, DefaultValueAccessor.decorators[0].args[0], {providers}))
*/
@Directive({
    selector: `
        input:not([type=checkbox])[formControlName],
        textarea[formControlName],
        input:not([type=checkbox])[formControl],
        textarea[formControl],
        input:not([type=checkbox])[ngModel],
        textarea[ngModel],[ngDefaultControl]'
    `,
    // TODO: vsavkin replace the above selector with the one below it once
    // https://github.com/angular/angular/issues/3011 is implemented
    // selector: '[ngModel],[formControl],[formControlName]',
    host: {
        '(input)': '_handleInput($event.target.value)',
        '(blur)': 'onTouched()',
        '(compositionstart)': '_compositionStart()',
        '(compositionend)': '_compositionEnd($event.target.value)'
    },
    providers
})
/**
 * Time value accessor with "ngModel" support.
 */
export class DateTimeValueAccessor extends AbstractValueAccessor {
    /**
     * Delegates injected injector service instance to the super constructor.
     * @param injector - Injected injector service instance.
     * @returns Nothing.
     */
    constructor(injector:Injector) {
        super(injector)
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
    animations,
    changeDetection: ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],
    selector: 'generic-interval-input',
    template: `
        <generic-input
            [declaration]="startDeclaration"
            [description]="startDescription"
            [disabled]="startDisabled"
            [showDeclarationText]="startShowDeclarationText"
            [maximum]="startMaximum"
            [maximumText]="startMaximumText"
            [minimum]="startMinimum"
            [required]="startRequired"
            [requiredText]="startRequiredText"
            [minimumText]="startMinimumText"
            [model]="model.start"
            (model)="change($event, 'start')"
            [showValidationErrorMessages]="startShowValidationErrorMessages"
            type="time"
        ></generic-input>
        <ng-content></ng-content>
        <generic-input
            [declaration]="endDeclaration"
            [description]="endDescription"
            [disabled]="endDisabled"
            [showDeclarationText]="endShowDeclarationText"
            [maximum]="endMaximum"
            [maximumText]="endMaximumText"
            [minimum]="endMinimum"
            [required]="endRequired"
            [requiredText]="endRequiredText"
            [minimumText]="endMinimumText"
            [model]="model.end"
            (model)="change($event, 'end')"
            [showValidationErrorMessages]="endShowValidationErrorMessages"
            type="time"
        ></generic-input>
    `
})
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
    @Input() endDeclaration:string|null = null
    @Input() startDeclaration:string|null = null

    @Input() endDescription:string|null = null
    @Input() startDescription:string|null = null

    @Input() endDisabled:boolean|null = null
    @Input() startDisabled:boolean|null = null

    @Input() endMaximum:number|null = null
    @Input() startMaximum:number|null = null

    @Input() endMaximumText:string =
        'Please give a number less or equal than ${model.maximum}.'
    @Input() startMaximumText:string =
        'Please give a number less or equal than ${model.maximum}.'

    @Input() endMinimum:number|null = null
    @Input() startMinimum:number|null = null

    @Input() endMinimumText:string =
        'Please given a number at least or equal to {{model.minimum}}.'
    @Input() startMinimumText:string =
        'Please given a number at least or equal to {{model.minimum}}.'

    @Input() endRequired:boolean|null = null
    @Input() startRequired:boolean|null = null

    @Input() endRequiredText:string = 'Please fill this field.'
    @Input() startRequiredText:string = 'Please fill this field.'

    @Input() endShowDeclarationText:string = 'ℹ'
    @Input() startShowDeclarationText:string = 'ℹ'

    @Input() endShowValidationErrorMessages:boolean = false
    @Input() startShowValidationErrorMessages:boolean = false

    @Input() model:{end:any;start:any} = {
        end: {value: new Date(1970, 0, 1)},
        start: {value: new Date(1970, 0, 1)}
    }
    @Output() modelChange:EventEmitter<PlainObject> = new EventEmitter()
    /**
     * Triggers on any change events of any nested input.
     * @param event - Events payload data.
     * @param type - Indicates which input field has changed.
     * @returns Nothing.
     */
    change(event:any, type:'end'|'start'):void {
        this.modelChange.emit({value: event, type})
    }
}
// IgnoreTypeCheck
@Component({
    animations,
    changeDetection: ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],
    selector: 'generic-intervals-input',
    /* eslint-disable max-len */
    template: `
        <div
            *ngIf="description !== '' && (description || model.description || model.name)"
        >{{description || model.description || model.name}}</div>
        <div
            @defaultAnimation
            *ngFor="let interval of (model.value || []); let first = first; let index = index"
        >
            <generic-interval-input
                [endDisabled]="endDisabled"
                [startDisabled]="startDisabled"

                [endShowDeclarationText]="endShowDeclarationText"
                [startShowDeclarationText]="startShowDeclarationText"

                [endMaximum]="endMaximum"
                [startMaximum]="startMaximum"

                [endMaximumText]="endMaximumText"
                [startMaximumText]="startMaximumText"

                [endMinimum]="endMinimum"
                [startMinimum]="startMinimum"

                [endRequired]="endRequired"
                [startRequired]="startRequired"

                [endRequiredText]="endRequiredText"
                [startRequiredText]="startRequiredText"

                [endMinimumText]="endMinimumText"
                [startMinimumText]="startMinimumText"

                [endDescription]="first ? endDescription : ''"
                [startDescription]="first ? startDescription : ''"

                [model]="interval"
                (model)="change($event, index)"

                [endDeclaration]="endDeclaration"
                [startDeclaration]="startDeclaration"

                [endShowValidationErrorMessages]="endShowValidationErrorMessages"
                [startShowValidationErrorMessages]="startShowValidationErrorMessages"
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
            *ngIf="model.maximumNumber === null || (model.value?.length || 0) < model.maximumNumber"
        >+</a>
        <ng-template #fallback>--</ng-template>
    `
    /* eslint-enable max-len */
})
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
export class IntervalsInputComponent implements OnInit {
    @Input() additionalObjectData:PlainObject
    @ContentChild(TemplateRef) contentTemplate:TemplateRef<any>
    @Input() description:string|null = null

    @Input() endDeclaration:string|null = null
    @Input() startDeclaration:string|null = null

    @Input() endDescription:string|null = null
    @Input() startDescription:string|null = null

    @Input() endDisabled:boolean|null = null
    @Input() startDisabled:boolean|null = null

    @Input() endMaximum:number|null = null
    @Input() startMaximum:number|null = null

    @Input() endMaximumText:string =
        'Please give a number less or equal than ${model.maximum}.'
    @Input() startMaximumText:string =
        'Please give a number less or equal than ${model.maximum}.'

    @Input() endMinimum:number|null = null
    @Input() startMinimum:number|null = null

    @Input() endMinimumText:string =
        'Please given a number at least or equal to {{model.minimum}}.'
    @Input() startMinimumText:string =
        'Please given a number at least or equal to {{model.minimum}}.'

    @Input() endRequired:boolean|null = null
    @Input() startRequired:boolean|null = null

    @Input() endRequiredText:string = 'Please fill this field.'
    @Input() startRequiredText:string = 'Please fill this field.'

    @Input() endShowDeclarationText:string = 'ℹ'
    @Input() startShowDeclarationText:string = 'ℹ'

    @Input() endShowValidationErrorMessages:boolean = false
    @Input() startShowValidationErrorMessages:boolean = false

    @Input() model:PlainObject = {value: []}
    @Output() modelChange:EventEmitter<PlainObject> = new EventEmitter()

    _dataScope:DataScopeService
    _extendObject:Function
    /**
     * Constructs the interval list component.
     * @param dataScope - Data scope service instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @returns Nothing.
     */
    constructor(
        dataScope:DataScopeService, extendObjectPipe:ExtendObjectPipe
    ) {
        this._dataScope = dataScope
        this._extendObject = extendObjectPipe.transform.bind(extendObjectPipe)
    }
    /**
     * Triggers on any change events of any nested input.
     * @param event - Events payload data.
     * @param index - Indicates which input field has changed.
     * @returns Nothing.
     */
    change(event:any, index:number):void {
        this.modelChange.emit({value: event, index})
    }
    /**
     * Extends additional model data with default one if nothing is provided.
     * @returns Nothing.
     */
    ngOnInit():void {
        if (!this.additionalObjectData)
            this.additionalObjectData = this._dataScope.generate('_interval')
        if (this.model.value)
            this.model.value.sort((
                first:PlainObject, second:PlainObject
            ):number => first.start.value - second.start.value)
        else
            this.model.value = []
    }
    /**
     * Adds a new interval.
     * @param data - Additional data to use for newly created entity.
     * @returns Nothing.
     */
    add(data:PlainObject = {}):void {
        if (!this.model.value)
            this.model.value = []
        const lastEnd:number = this.model.value.length ? (new Date(
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
export class AbstractEditorComponent extends AbstractValueAccessor
    implements AfterViewInit {
    static applicationInterfaceLoad:{[key:string]:Promise<any>|null} = {}
    static factories:{[key:string]:any} = {}

    @Input() configuration:PlainObject = {}
    contentSetterMethodName:string = 'setContent'
    @Input() disabled:boolean|null = null
    extendObject:Function
    factory:any
    factoryName:string = ''
    fixedUtility:typeof UtilityService
    @ViewChild('hostDomNode') hostDomNode:ElementRef
    instance:any = null
    @Output() initialized:EventEmitter<any> = new EventEmitter()
    @Input() model:string = ''
    @Output() modelChange:EventEmitter<string> = new EventEmitter()
    /**
     * Initializes the code mirror resource loading if not available yet.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector:Injector) {
        super(injector)
        const get:Function = determineInjector(
            injector, this, this.constructor)
        this.extendObject = get(ExtendObjectPipe).transform.bind(get(
            ExtendObjectPipe))
        this.fixedUtility = get(UtilityService).fixed
    }
    /**
     * Initializes the code editor element.
     * @returns Nothing.
     */
    async ngAfterViewInit():Promise<void> {
        if (!this.factory)
            if (this.fixedUtility.globalContext[this.factoryName])
                this.factory =
                    this.fixedUtility.globalContext[this.factoryName]
            else if (AbstractEditorComponent.factories[this.factoryName])
                this.factory = AbstractEditorComponent.factories[
                    this.factoryName]
        if (this.factory) {
            AbstractEditorComponent.factories[this.factoryName] = this.factory
            /*
                NOTE: We have to do a dummy timeout to avoid an event emit in
                first initializing call stack.
            */
            await this.fixedUtility.tools.timeout()
        } else {
            await AbstractEditorComponent.applicationInterfaceLoad[
                this.factoryName]
            AbstractEditorComponent.factories[this.factoryName] = this.factory
        }
    }
    /**
     * Synchronizes given value into internal code mirror instance.
     * @param value - Given value to set in code editor.
     * @returns What inherited method returns.
     */
    export(value:any):any {
        this.model = [null, undefined].includes(value) ? '' : value.toString()
        if (this.instance)
            this.instance[this.contentSetterMethodName](this.model)
        return super.export(value)
    }
    /**
     * Triggers disabled state changes.
     * @param isDisabled - Indicates disabled state.
     * @returns Nothing.
     */
    setDisabledState(isDisabled:boolean):void {
        this.disabled = isDisabled
    }
}
@Component({
    animations,
    changeDetection: ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],
    providers: [{
        multi: true,
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(():typeof CodeEditorComponent =>
            CodeEditorComponent)
    }],
    selector: 'code-editor',
    template: '<textarea #hostDomNode></textarea>'
})
/**
 * Provides a generic code editor.
 * @property static:modesLoad - Mapping from mode to their loading state.
 *
 * @property blur - Blur event emitter.
 * @property focus - Focus event emitter.
 */
export class CodeEditorComponent extends AbstractEditorComponent
    implements AfterViewInit {
    static modesLoad:{[key:string]:Promise<void>|true} = {}

    @Output() blur:EventEmitter<any> = new EventEmitter()
    @Input() configuration:PlainObject = CODE_MIRROR_DEFAULT_OPTIONS
    contentSetterMethodName:string = 'setValue'
    factoryName:string = 'CodeMirror'
    @Output() focus:EventEmitter<any> = new EventEmitter()
    /**
     * Initializes the code mirror resource loading if not available yet.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector:Injector) {
        super(injector)
        if (typeof CodeEditorComponent.applicationInterfaceLoad[
            this.factoryName
        ] !== 'object')
            CodeEditorComponent.applicationInterfaceLoad[
                this.factoryName
            ] = Promise.all([
                new Promise((resolve:Function):$DomNode =>
                    this.fixedUtility.$(`
                        <link
                            href="${CODE_MIRROR_DEFAULT_OPTIONS.path.base}` +
                            CODE_MIRROR_DEFAULT_OPTIONS.path
                                .cascadingStyleSheet +
                            `" rel="stylesheet"
                            type="text/css"
                        />
                    `).appendTo('head').on('load', resolve)),
                new Promise((resolve:Function, reject:Function):Object =>
                    this.fixedUtility.$.ajax({
                        cache: true,
                        dataType: 'script',
                        error: reject,
                        success: ():void => {
                            this.factory = this.fixedUtility.globalContext[
                                this.factoryName]
                            resolve(this.factory)
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
    ngAfterViewInit():Promise<void> {
        /*
            NOTE: "await super.ngAfterViewInit()" is not supported by
            transpiler yet.
        */
        return super.ngAfterViewInit().then(async ():Promise<void> => {
            if (this.configuration.mode)
                if (CodeEditorComponent.modesLoad.hasOwnProperty(
                    this.configuration.mode
                )) {
                    if (CodeEditorComponent.modesLoad[
                        this.configuration.mode
                    ] !== true)
                        await CodeEditorComponent.modesLoad[
                            this.configuration.mode]
                } else {
                    CodeEditorComponent.modesLoad[this.configuration.mode] =
                        new Promise((
                            resolve:Function, reject:Function
                        ):Object => this.fixedUtility.$.ajax({
                            cache: true,
                            dataType: 'script',
                            error: reject,
                            success: resolve,
                            url: this.configuration.path.base +
                                this.configuration.path.mode.replace(
                                    /{mode}/g, this.configuration.mode)
                        }))
                    await CodeEditorComponent.modesLoad[
                        this.configuration.mode]
                }
            const configuration:PlainObject = this.extendObject(
                {}, this.configuration, {readOnly: this.disabled})
            delete configuration.path
            this.instance = this.factory.fromTextArea(
                this.hostDomNode.nativeElement, configuration)
            this.instance[this.contentSetterMethodName](this.model)
            this.instance.on('blur', (instance:any, event:any):void =>
                this.blur.emit(event))
            this.instance.on('change', ():void => {
                this.onChangeCallback(this.instance.getValue())
                this.modelChange.emit(this.model)
            })
            this.instance.on('focus', (instance:any, event:any):void =>
                this.focus.emit(event))
            this.initialized.emit(this.instance)
        })
    }
    /**
     * Triggers disabled state changes.
     * @param isDisabled - Indicates disabled state.
     * @returns Nothing.
     */
    setDisabledState(isDisabled:boolean):void {
        super.setDisabledState(isDisabled)
        if (this.instance)
            this.instance.setOption('readOnly', this.disabled)
    }
}
@Component({
    animations,
    changeDetection: ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],
    providers: [{
        multi: true,
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(():typeof TextEditorComponent =>
            TextEditorComponent)
    }],
    selector: 'text-editor',
    template: '<textarea #hostDomNode></textarea>'
})
/**
 * Provides a generic text editor.
 */
export class TextEditorComponent extends AbstractEditorComponent
    implements AfterViewInit, OnDestroy {
    @Input() configuration:PlainObject = TINYMCE_DEFAULT_OPTIONS
    factoryName:string = 'tinymce'
    // region events
    // / region native
    @Output() click:EventEmitter<any> = new EventEmitter()
    @Output() dblclick:EventEmitter<any> = new EventEmitter()
    @Output() MouseDown:EventEmitter<any> = new EventEmitter()
    @Output() MouseUp:EventEmitter<any> = new EventEmitter()
    @Output() MouseMove:EventEmitter<any> = new EventEmitter()
    @Output() MouseOver:EventEmitter<any> = new EventEmitter()
    @Output() MouseOut:EventEmitter<any> = new EventEmitter()
    @Output() MouseEnter:EventEmitter<any> = new EventEmitter()
    @Output() MouseLeave:EventEmitter<any> = new EventEmitter()
    @Output() KeyDown:EventEmitter<any> = new EventEmitter()
    @Output() KeyPress:EventEmitter<any> = new EventEmitter()
    @Output() KeyUp:EventEmitter<any> = new EventEmitter()
    @Output() ContextMenu:EventEmitter<any> = new EventEmitter()
    @Output() Paste:EventEmitter<any> = new EventEmitter()
    // / endregion
    // / region core
    @Output() Focus:EventEmitter<any> = new EventEmitter()
    @Output() Blur:EventEmitter<any> = new EventEmitter()
    @Output() BeforeSetContent:EventEmitter<any> = new EventEmitter()
    @Output() SetContent:EventEmitter<any> = new EventEmitter()
    @Output() GetContent:EventEmitter<any> = new EventEmitter()
    @Output() PreProcess:EventEmitter<any> = new EventEmitter()
    @Output() PostProcess:EventEmitter<any> = new EventEmitter()
    @Output() NodeChange:EventEmitter<any> = new EventEmitter()
    @Output() Undo:EventEmitter<any> = new EventEmitter()
    @Output() Redo:EventEmitter<any> = new EventEmitter()
    @Output() Change:EventEmitter<any> = new EventEmitter()
    @Output() Dirty:EventEmitter<any> = new EventEmitter()
    @Output() Remove:EventEmitter<any> = new EventEmitter()
    @Output() ExecCommand:EventEmitter<any> = new EventEmitter()
    @Output() PastePreProcess:EventEmitter<any> = new EventEmitter()
    @Output() PastePostProcess:EventEmitter<any> = new EventEmitter()
    // / endregion
    // endregion
    /**
     * Initializes the tinymce resource loading if not available yet.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector:Injector) {
        super(injector)
        if (typeof TextEditorComponent.applicationInterfaceLoad[
            this.factoryName
        ] !== 'object')
            TextEditorComponent.applicationInterfaceLoad[
                this.factoryName
            ] = new Promise((resolve:Function, reject:Function):Object =>
                this.fixedUtility.$.ajax({
                    cache: true,
                    dataType: 'script',
                    error: reject,
                    success: ():void => {
                        this.factory = this.fixedUtility.globalContext.tinymce
                        resolve(this.factory)
                    },
                    url: TINYMCE_DEFAULT_OPTIONS.scriptPath
                }))
    }
    /**
     * Initializes the text editor element.
     * @returns Nothing.
     */
    ngAfterViewInit():Promise<void> {
        /*
            NOTE: "await super.ngAfterViewInit()" is not supported by
            transpiler yet.
        */
        return super.ngAfterViewInit().then(():void => {
            const configuration:PlainObject = this.extendObject(
                {}, this.configuration)
            this.factory.baseURL = configuration.baseURL
            delete configuration.baseURL
            delete configuration.scriptPath
            configuration.target = this.hostDomNode.nativeElement
            const initializeInstanceCallback:Function =
                configuration.init_instance_callback
            /* eslint-disable camelcase */
            configuration.init_instance_callback = (instance:any):void => {
            /* eslint-disable camelcase */
                this.instance = instance
                this.instance[this.contentSetterMethodName](this.model)
                this.instance.on('Change', ():void => {
                    this.onChangeCallback(this.instance.getContent())
                    this.modelChange.emit(this.model)
                })
                if (initializeInstanceCallback)
                    initializeInstanceCallback(this.instance)
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
                    this.instance.on(name, this[name].emit.bind(this[name]))
                this.instance.on('KeyUp', (event:any):void => {
                    this.KeyUp.emit(event)
                    this.onChangeCallback(this.instance.getContent())
                    this.onTouchedCallback()
                    this.modelChange.emit(this.model)
                })
                this.instance.on('ExecCommand', (event:any):void => {
                    this.ExecCommand.emit(event)
                    const content:any = this.instance.getContent()
                    if (typeof content === 'string' && content.length > 0) {
                        this.onChangeCallback(this.instance.getContent())
                        this.onTouchedCallback()
                        this.modelChange.emit(this.model)
                    }
                })
            }
            configuration.setup = (instance:any):void => instance.on('Init', (
            ):void => this.initialized.emit(instance))
            this.factory.init(configuration)
        })
    }
    /**
     * Frees all tinymce allocated data from memory if there exists some.
     * @returns Nothing.
     */
    ngOnDestroy():void {
        if (this.instance)
            this.factory.remove(this.instance)
    }
    /**
     * Triggers disabled state changes.
     * @param isDisabled - Indicates disabled state.
     * @returns Nothing.
     */
    setDisabledState(isDisabled:boolean):void {
        super.setDisabledState(isDisabled)
        if (this.instance)
            this.instance.setMode(this.disabled ? 'readonly' : 'design')
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
}
const inputContent:string = `
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
`
/* eslint-enable max-len */
// IgnoreTypeCheck
@Component({
    animations,
    changeDetection: ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],
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
    @Input() activeEditor:boolean|null = null
    @Input() editor:PlainObject|string|null = null
    @Input() labels:{[key:string]:string} = {}
    @Input() maximumNumberOfRows:string
    @Input() minimumNumberOfRows:string
    @Input() rows:string
    @Input() selectableEditor:boolean|null = null
    @Input() type:string
}
/* eslint-disable max-len */
// IgnoreTypeCheck
@Component({
    animations,
    changeDetection: ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],
    selector: 'generic-simple-input',
    template: `
        <ng-container
            @defaultAnimation *ngIf="model.selection; else textInput"
        >
            <mat-form-field>
                <mat-select [(ngModel)]="model.value" ${propertyContent.nativ}>
                    <mat-option
                        *ngFor="let value of model.selection" [value]="value"
                    >
                        {{labels.hasOwnProperty(value) ? labels[value] : value}}
                    </mat-option>
                </mat-select>
                ${inputContent}
                <ng-content></ng-content>
            </mat-form-field>
        </ng-container>
        <ng-template #textInput><mat-form-field>
            <input
                ${propertyContent.nativ}
                ${propertyContent.nativText}
                [max]="maximum === null ? (model.type === 'number' ? model.maximum : null) : maximum"
                matInput
                [min]="minimum === null ? (model.type === 'number' ? model.minimum : null) : minimum"
                [type]="type ? type : model.name.startsWith('password') ? 'password' : model.type === 'string' ? 'text' : 'number'"
            />
            ${inputContent}
            <ng-content></ng-content>
        </mat-form-field></ng-template>
    `
})
/* eslint-enable max-len */
/**
 * A generic form input or select component with validation, labeling and info
 * description support.
 * @property labels - Defines some selectable value labels.
 * @property type - Optionally defines an input type explicitly.
 */
export class SimpleInputComponent extends AbstractNativeInputComponent {
    @Input() labels:{[key:string]:string} = {}
    @Input() type:string
    /**
     * Delegates injected injector service instance to the super constructor.
     * @param injector - Injected injector service instance.
     * @returns Nothing.
     */
    constructor(injector:Injector) {
        super(injector)
    }
}
/* eslint-disable max-len */
// IgnoreTypeCheck
@Component({
    animations,
    changeDetection: ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],
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
                *ngIf="editorType === 'code' || editor.indentUnit; else tinymce"
            ></code-editor>
            <ng-template #tinymce><text-editor
                ${propertyContent.editor}
                [configuration]="editor"
                [disabled]="disabled === null ? (model.disabled || model.mutable === false || model.writable === false) : disabled"
                (initialized)="initialized = true"
            ></text-editor></ng-template>
            ${inputContent}
            <ng-content></ng-content>
        </ng-container>
        <ng-template #plain><mat-form-field @defaultAnimation>
            <textarea
                ${propertyContent.nativ}
                ${propertyContent.nativText}
                [matAutosizeMaxRows]="maximumNumberOfRows"
                [matAutosizeMinRows]="minimumNumberOfRows"
                matInput
                matTextareaAutosize
                [rows]="rows"
            ></textarea>
            ${inputContent}
            <ng-content></ng-content>
        </mat-form-field></ng-template>
    `
})
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
export class TextareaComponent extends AbstractNativeInputComponent
    implements OnInit {
    static defaultEditorOptions:{code:PlainObject;markup:PlainObject} = {
        code: {},
        markup: {}
    }

    @Input() activeEditor:boolean|null = null
    @Input() editor:PlainObject|string|null = null
    editorType:string = 'custom'
    @Input() maximumNumberOfRows:string
    @Input() minimumNumberOfRows:string
    @Input() rows:string
    @Input() selectableEditor:boolean|null = null
    /**
     * Forwards injected service instances to the abstract input component's
     * constructor.
     * @param initialData - Injected initial data service instance.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(initialData:InitialDataService, injector:Injector) {
        super(injector)
        if (initialData.configuration.hasOwnProperty(
            'defaultEditorOptions'
        ) && typeof initialData.configuration.defaultEditorOptions ===
        'object' && initialData.configuration.defaultEditorOptions !== null)
            TextareaComponent.defaultEditorOptions =
                initialData.configuration.defaultEditorOptions
    }
    /**
     * Triggers after input values have been resolved.
     * @returns Nothing.
     */
    ngOnInit():void {
        super.ngOnInit()
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
                    TextareaComponent.defaultEditorOptions.code, this.editor)
            else
                this.editor = this._extendObject(
                    true, {}, TINYMCE_DEFAULT_OPTIONS,
                    TextareaComponent.defaultEditorOptions.markup, this.editor)
        else
            this.selectableEditor = false
    }
}
// // endregion
// / region file input
/* eslint-disable max-len */
// IgnoreTypeCheck
@Component({
    animations,
    changeDetection: ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],
    selector: 'generic-file-input',
    template: `
        <mat-card>
            <mat-card-header
                @defaultAnimation
                *ngIf="headerText !== '' && (headerText || file?.name || model[attachmentTypeName][internalName]?.declaration || headerText || file?.name || name || model[attachmentTypeName][internalName]?.description || name)"
            >
                <mat-card-title>
                    <span
                        @defaultAnimation
                        *ngIf="!editableName || revision || headerText || !file?.name; else editable"
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
                            <mat-form-field
                                [class.dirty]="editedName && editedName !== file.name"
                                matTooltip="Focus to edit."
                            >
                                <input
                                    matInput
                                    [ngModel]="editedName || file.name"
                                    (ngModelChange)="editedName = $event"
                                />
                                <mat-hint
                                    [class.active]="showDeclaration"
                                    (click)="showDeclaration = !showDeclaration"
                                    @defaultAnimation
                                    matTooltip="info"
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
                                </mat-hint>
                            </mat-form-field>
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
                        <ng-template #parent><mat-form-field
                            [class.dirty]="file.initialName !== file.name"
                            @defaultAnimation
                            matTooltip="Focus to edit."
                            *ngIf="!synchronizeImmediately"
                        >
                            <input
                                matInput [ngModel]="file.name"
                                (ngModelChange)="file.name = $event;modelChange.emit(this.model); fileChange.emit(file)"
                            />
                            <mat-hint
                                [class.active]="showDeclaration"
                                (click)="showDeclaration = !showDeclaration"
                                @defaultAnimation
                                matTooltip="info"
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
                            </mat-hint>
                        </mat-form-field></ng-template>
                    </ng-template>
                </mat-card-title>
            </mat-card-header>
            <img mat-card-image
                [attr.alt]="name"
                [attr.src]="file.source"
                @defaultAnimation
                *ngIf="file?.type === 'image' && file?.source"
            >
            <video
                autoplay
                @defaultAnimation
                mat-card-image
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
                mat-card-image
                *ngIf="(!file?.type && (file?.source || (file?.source | genericType) === 'string') ? noPreviewText : noFileText) as text"
            ><p>{{text}}</p></div>
            <mat-card-content>
                <ng-content></ng-content>
                <div
                    @defaultAnimation
                    generic-error
                    *ngIf="showValidationErrorMessages && model[attachmentTypeName][internalName]?.state?.errors"
                >
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
                        *ngIf="model[attachmentTypeName][internalName].state.errors.database"
                    >
                        {{
                            model[attachmentTypeName][
                                internalName
                            ].state.errors.database
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
                </div>
            </mat-card-content>
            <mat-card-actions>
                <input #input style="display: none" type="file" />
                <button
                    @defaultAnimation
                    (click)="input.click()"
                    mat-raised-button
                    *ngIf="newButtonText"
                >{{newButtonText}}</button>
                <button
                    (click)="remove()"
                    @defaultAnimation
                    mat-raised-button
                    *ngIf="deleteButtonText && file"
                >{{deleteButtonText}}</button>
                <button mat-raised-button
                    @defaultAnimation
                    *ngIf="downloadButtonText && file"
                ><a [download]="file.name" [href]="file.source">
                    {{downloadButtonText}}
                </a></button>
            </mat-card-actions>
        </mat-card>
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
 * @property abstractResolver - Abstract resolver service instance.
 * @property attachmentTypeName - Current attachment type name.
 * @property autoMessages - Indicates whether to show messages as file upload
 * results.
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
 * @property template - String template pipes transform method.
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
export class FileInputComponent implements AfterViewInit, OnChanges {
    static imageMimeTypeRegularExpression:RegExp = new RegExp(
        '^image/(?:p?jpe?g|png|svg(?:\\+xml)?|vnd\\.microsoft\\.icon|gif|' +
        'tiff|webp|vnd\\.wap\\.wbmp|x-(?:icon|jng|ms-bmp))$')
    static textMimeTypeRegularExpression:RegExp = new RegExp(
        '^(?:application/xml)|(?:text/(?:plain|x-ndpb[wy]html|(?:x-)?csv))$')
    static videoMimeTypeRegularExpression:RegExp = new RegExp(
        '^video/(?:(?:x-)?(?:x-)?webm|3gpp|mp2t|mp4|mpeg|quicktime|' +
        '(?:x-)?flv|(?:x-)?m4v|(?:x-)mng|x-ms-as|x-ms-wmv|x-msvideo)|' +
        '(?:application/(?:x-)?shockwave-flash)$')

    abstractResolver:AbstractResolver
    attachmentTypeName:string
    @Input() autoMessages:boolean = true
    configuration:PlainObject
    @Output() delete:EventEmitter<string> = new EventEmitter()
    @Input() deleteButtonText:string = 'delete'
    deletedName:string
    @Input() downloadButtonText:string = 'download'
    @Input() editableName:boolean = true
    file:any = null
    @Output() fileChange:EventEmitter<any> = new EventEmitter()
    @Input() filter:Array<{
        source?:{
            contentType?:string;
            name?:string;
        };
        target:{
            contentType?:string;
            name?:string;
        };
    }> = []
    @Input() headerText:string|null = null
    idName:string
    @ViewChild('input') input:ElementRef
    @Input() resetNameText:string = '×'
    @Input() saveNameText:string = '✓'
    @Input() showDeclarationText:string = 'ℹ'
    typeName:string
    internalName:string
    keyCode:{[key:string]:number}
    @Input() mapNameToField:string|Array<string>|null = null
    @Input() maximumSizeText:string =
        'Filesize (${file.length} byte) is more than specified maximum of ' +
        '${model.maximumSize} byte.'
    @Input() minimumSizeText:string =
        'Filesize (${file.length} byte) is less than specified minimum of ' +
        '${model.minimumSize} byte.'
    @Input() model:{id?:string;[key:string]:any}
    @Output() modelChange:EventEmitter<{
        id?:string;[key:string]:any;
    }> = new EventEmitter()
    @Input() name:string|null = null
    @Input() namePatternText:string =
        'Given filename "${file.name}" doesn\'t match specified pattern "' +
        '${internalName}".'
    @Input() newButtonText:string = 'new'
    @Input() noFileText:string = ''
    @Input() noPreviewText:string = ''
    @Input() oneDocumentPerFileMode:boolean = true
    @Input() requiredText:string = 'Please select a file.'
    @Input() revision:string|null = null
    revisionName:string
    @Input() showValidationErrorMessages:boolean = false
    @Input() synchronizeImmediately:boolean|PlainObject = false
    template:Function
    @Input() typePatternText:string =
        'Filetype "${file.content_type}" doesn\'t match specified pattern "' +
        '${model.contentTypeRegularExpressionPattern}".'

    _data:DataService
    _domSanitizer:DomSanitizer
    _extendObject:Function
    _getFilenameByPrefix:Function
    _idIsObject:boolean = false
    _representObject:Function
    _stringFormat:Function
    _prefixMatch:boolean = false
    /**
     * Sets needed services as property values.
     * @param abstractResolver - Injected abstract resolver service instance.
     * @param data - Injected data service instance.
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @param getFilenameByPrefixPipe - Saves the file name by prefix retriever
     * pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param representObjectPipe - Saves the object to string representation
     * pipe instance.
     * @param stringFormatPipe - Saves the string formation pipe instance.
     * @param stringTemplatePipe - Injected sString template pipe instance.
     * @param utility - Utility service instance.
     * @returns Nothing.
     */
    constructor(
        abstractResolver:AbstractResolver,
        data:DataService,
        domSanitizer:DomSanitizer,
        extendObjectPipe:ExtendObjectPipe,
        getFilenameByPrefixPipe:GetFilenameByPrefixPipe,
        initialData:InitialDataService,
        representObjectPipe:RepresentObjectPipe,
        stringFormatPipe:StringFormatPipe,
        stringTemplatePipe:StringTemplatePipe,
        utility:UtilityService
    ) {
        this.abstractResolver = abstractResolver
        this.configuration = initialData.configuration
        this.attachmentTypeName =
            this.configuration.database.model.property.name.special.attachment
        this.keyCode = utility.fixed.tools.keyCode
        this.deletedName =
            this.configuration.database.model.property.name.special.deleted
        this.idName =
            this.configuration.database.model.property.name.special.id
        this.model = {[this.attachmentTypeName]: {}, id: null}
        this.revisionName =
            this.configuration.database.model.property.name.special.revision
        this.template = stringTemplatePipe.transform.bind(stringTemplatePipe)
        this.typeName =
            this.configuration.database.model.property.name.special.type
        this._data = data
        this._domSanitizer = domSanitizer
        this._extendObject = extendObjectPipe.transform.bind(
            extendObjectPipe)
        this._getFilenameByPrefix = getFilenameByPrefixPipe.transform.bind(
            getFilenameByPrefixPipe)
        this._representObject = representObjectPipe.transform.bind(
            representObjectPipe)
        this._stringFormat = stringFormatPipe.transform.bind(stringFormatPipe)
    }
    /**
     * Determines which type of file we have to present.
     * @returns Nothing.
     */
    determinePresentationType():void {
        if (this.file && this.file.content_type)
            if (FileInputComponent.textMimeTypeRegularExpression.test(
                this.file.content_type
            ))
                this.file.type = 'text'
            else if (FileInputComponent.imageMimeTypeRegularExpression.test(
                this.file.content_type
            ))
                this.file.type = 'image'
            else if (FileInputComponent.videoMimeTypeRegularExpression.test(
                this.file.content_type
            ))
                this.file.type = 'video'
            else
                this.file.type = 'binary'
    }
    /**
     * TODO
     */
    updateErrorState(errors:any = null):void {
        let currentErrors:PlainObject = this.model[this.attachmentTypeName][
            this.internalName
        ].state.errors
        if (errors) {
            if (!currentErrors)
                currentErrors = this.model[this.attachmentTypeName][
                    this.internalName
                ].state.errors = {}
            for (const name in errors)
                if (errors[name])
                    currentErrors[name] = errors[name]
                else if (currentErrors.hasOwnProperty(name))
                    delete currentErrors[name]
            if (Object.keys(currentErrors).length === 0)
                delete this.model[this.attachmentTypeName][
                    this.internalName
                ].state.errors
        } else if (currentErrors)
            delete this.model[this.attachmentTypeName][
                this.internalName
            ].state.errors
    }
    /**
     * Initializes file upload handler.
     * @param changes - Holds informations about changed bound properties.
     * @returns Nothing.
     */
    async ngOnChanges(changes:SimpleChanges):Promise<void> {
        if (typeof this.model[this.idName] === 'object')
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
            if (this.file) {
                this.file.initialName = this.file.name
                this.updateErrorState({required: null})
            } else if (!this.model[this.attachmentTypeName][
                this.internalName
            ].nullable)
                this.updateErrorState({required: true})
            else
                this.updateErrorState({required: null})
        }
        if (
            changes.hasOwnProperty('model') ||
            changes.hasOwnProperty('name') ||
            changes.hasOwnProperty('revision')
        ) {
            if (this.file) {
                this.file.query = `?version=${this.file.digest}`
                /*
                    NOTE: Only set new file source if isn't already present to
                    prevent to download an immediately uploaded file and grab
                    and older cached one.
                */
                if (!this.file.source) {
                    const id:any = this._idIsObject ? this.model[
                        this.idName
                    ].value : this.model[this.idName]
                    if (
                        this.revision &&
                        changes.revision.currentValue !==
                        changes.revision.previousValue
                    )
                        try {
                            await this.retrieveAttachment(
                                id, {rev: this.revision})
                        } catch (error) {
                            this.updateErrorState({database: (
                                'message' in error
                            ) ? error.message : this._representObject(error)})
                            this.modelChange.emit(this.model)
                            return
                        }
                    else
                        this.file.source =
                            this._domSanitizer.bypassSecurityTrustResourceUrl(
                                this._stringFormat(
                                    this.configuration.database.url, ''
                                ) + '/' + (
                                    this.configuration.name || 'generic'
                                ) + `/${id}/${this.file.name}` +
                                this.file.query)
                    this.updateErrorState({database: null})
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
                const types:Array<string> = ['content_type', 'name']
                for (const filter of this.filter) {
                    let match:boolean = true
                    for (const type of types)
                        if (
                            filter.hasOwnProperty('source') &&
                            filter.source.hasOwnProperty(type) &&
                            !new RegExp(filter.source[type], 'g').test(
                                this.file[type])
                        ) {
                            match = false
                            break
                        }
                    if (match)
                        for (const type of types)
                            if (filter.target.hasOwnProperty(type))
                                this.file[type] = (
                                    filter.hasOwnProperty(type) &&
                                    filter.source.hasOwnProperty(type)
                                ) ? this.file[type].replace(new RegExp(
                                        filter.source[type], 'g'
                                    ), filter.target[type]) :
                                    filter.target[type]
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
                [this.typeName]: this.model[this.typeName],
                [this.idName]: this._idIsObject ? this.model[
                    this.idName
                ].value : this.model[this.idName],
                [this.revisionName]: this.model[this.revisionName]
            }
            if (this.oneDocumentPerFileMode)
                update[this.deletedName] = true
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
                this.updateErrorState({database: (
                    'message' in error
                ) ? error.message : this._representObject(error)})
                this.modelChange.emit(this.model)
                return
            }
            this.updateErrorState({database: null})
            if (this.mapNameToField && this.mapNameToField.includes(
                this.idName
            ))
                this.delete.emit(result)
            else
                this.model[this.revisionName] = result.rev
        }
        this.model[this.attachmentTypeName][this.internalName].state.errors =
            this.model[this.attachmentTypeName][this.internalName].value =
                this.file = null
        if (this.model[this.attachmentTypeName][this.internalName].nullable)
            this.updateErrorState({required: null})
        else
            this.updateErrorState({required: true})
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
            this.idName
        ].value : this.model[this.idName]
        const oldName:string = this.file.name
        if (
            this.file.stub && this.mapNameToField && id &&
            this.mapNameToField.includes(this.idName)
        ) {
            try {
                await this.retrieveAttachment(id)
            } catch (error) {
                this.updateErrorState({database: (
                    'message' in error
                ) ? error.message : this._representObject(error)})
                this.modelChange.emit(this.model)
                return
            }
            this.updateErrorState({database: null})
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
        const file:{
            size:number;
            toString:(value:string) => string;
            type:string;
        } = await this._data.getAttachment(id, this.file.name, options)
        this.file = {
            /* eslint-disable camelcase */
            content_type: file.type || 'text/plain',
            /* eslint-enable camelcase */
            data: typeof Blob === 'undefined' ?
                file.toString('base64') :
                await require('blob-util').blobToBase64String(file),
            length: file.size,
            name: this.file.name
        }
        this.file.source = this._domSanitizer.bypassSecurityTrustResourceUrl(
            `data:${this.file.content_type};base64,${this.file.data}`)
    }
    /**
     * Uploads current file into database (replaces if old name is given).
     * @param oldName - Name of saved file to update or replace.
     * @returns A Promise which will be resolved after current file will be
     * synchronized.
     */
    async update(oldName?:string):Promise<void> {
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
        this.updateErrorState({
            name: !(new RegExp(this.internalName)).test(this.file.name),
            contentType: !(
                [undefined, null].includes(this.model[
                    this.attachmentTypeName
                ][this.internalName].contentTypeRegularExpressionPattern) || (
                    new RegExp(this.model[this.attachmentTypeName][
                        this.internalName
                    ].contentTypeRegularExpressionPattern)
                ).test(this.file.content_type)
            ),
            minimumSize: !(
                [undefined, null].includes(this.model[
                    this.attachmentTypeName
                ][this.internalName].minimumSize) || this.model[
                    this.attachmentTypeName
                ][this.internalName].minimumSize <= this.file.length
            ),
            maximumSize: !(
                [undefined, null].includes(this.model[
                    this.attachmentTypeName
                ][this.internalName].maximumSize) || this.model[
                    this.attachmentTypeName
                ][this.internalName].maximumSize >= this.file.length
            )
        })
        // endregion
        if (
            this.model[this.attachmentTypeName][this.internalName].state.errors
        ) {
            let message:string =
                'There was encountered an error during uploading file "' +
                `${this.file.name}": `
            for (const name in this.model[this.attachmentTypeName][
                this.internalName
            ].state.errors)
                if (this.model[this.attachmentTypeName][
                    this.internalName
                ].state.errors.hasOwnProperty(name))
                    message += (`\n${name} - ` + this.template(this[{
                        contentType: 'typePatternText',
                        maximumSize: 'maximumSizeText',
                        minimumSize: 'minimumSizeText',
                        name: 'namePatternText',
                        required: 'requiredText'
                    }[name]], {
                        attachmentTypeName: this.attachmentTypeName,
                        file: this.file,
                        internalName: this.internalName,
                        model: this.model[this.attachmentTypeName][
                            this.internalName]
                    }))
            this.abstractResolver.message(message)
        } else if (this.synchronizeImmediately) {
            let newData:PlainObject = {
                [this.typeName]: this.model[this.typeName],
                [this.idName]: this._idIsObject ? this.model[
                    this.idName
                ].value : this.model[this.idName]
            }
            if (
                this.synchronizeImmediately !== null &&
                typeof this.synchronizeImmediately === 'object'
            ) {
                const data = {}
                for (const name in this.synchronizeImmediately)
                    if (this.synchronizeImmediately.hasOwnProperty(name))
                        data[name] = this.template(
                            this.synchronizeImmediately[name], this.file)
                this._extendObject(true, newData, data)
            }
            let id:any = this._idIsObject ? this.model[
                this.idName
            ].value : this.model[this.idName]
            // NOTE: We want to replace old medium.
            if (oldName && oldName !== this.file.name && !(
                this.mapNameToField && id &&
                this.mapNameToField.includes(this.idName)
            ))
                newData[this.attachmentTypeName] = {[oldName]: {data: null}}
            if (![undefined, null].includes(this.model[this.revisionName]))
                newData[this.revisionName] = this.model[this.revisionName]
            const tasks:Array<PlainObject> = []
            if (this.mapNameToField) {
                if (
                    id && id !== this.file.name &&
                    this.mapNameToField.includes(this.idName)
                ) {
                    newData[this.deletedName] = true
                    tasks.unshift(newData)
                    newData = this._extendObject(
                        true, {}, newData, {[this.deletedName]: false})
                }
                for (const name of this.mapNameToField) {
                    newData[name] = this.file.name
                    if (name === this.idName && this._idIsObject)
                        this.model[name].value = this.file.name
                    else
                        this.model[name] = this.file.name
                }
            }
            newData[this.revisionName] = 'upsert'
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
                this.updateErrorState({database: (
                    'message' in error
                ) ? error.message : this._representObject(error)})
                if (this.autoMessages)
                    this.abstractResolver.message(
                        'Database has encountered an error during uploading ' +
                        `file "${this.file.name}": ` +
                        this.model[this.attachmentTypeName][
                            this.internalName
                        ].state.errors.database)
                this.modelChange.emit(this.model)
                return
            }
            id = newData[this.idName]
            let revision:string
            for (const item of result) {
                if (item.error) {
                    this.updateErrorState({database: item.message})
                    if (this.autoMessages)
                        this.abstractResolver.message(
                            'Database has encountered an error during ' +
                            `uploading file "${this.file.name}": ` +
                            item.message)
                    this.modelChange.emit(this.model)
                    return
                }
                if (item.id === id)
                    revision = item.rev
            }
            this.updateErrorState({database: null})
            if (this.file) {
                this.file.revision = this.model[this.revisionName] = revision
                this.file.query = `?rev=${revision}`
                this.file.source =
                    this._domSanitizer.bypassSecurityTrustResourceUrl(
                        this._stringFormat(
                            this.configuration.database.url, ''
                        ) + `/${this.configuration.name}/${id}/` +
                        `${this.file.name}${this.file.query}`)
                this.determinePresentationType()
            }
            if (this.autoMessages)
                this.abstractResolver.message(
                    `Uploading file ${this.file.name} was succesful.`)
            this.modelChange.emit(this.model)
            this.fileChange.emit(this.file)
        } else if (this.file.data) {
            this.determinePresentationType()
            const fileReader:FileReader = new FileReader()
            fileReader.onload = (event:Event):void => {
                this.file.digest = (new Date()).getTime()
                this.file.source =
                    this._domSanitizer.bypassSecurityTrustResourceUrl(
                        event.target['result'])
                if (this.mapNameToField)
                    for (const name of this.mapNameToField)
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
    animations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'generic-pagination',
    template: `
        <ul class="hans" @defaultAnimation *ngIf="lastPage > 1">
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
 * @property _changeDetectorReference - Current views change detector reference
 * service instance.
 * @property _makeRangePipe - Saves the make range pipe transformation
 * function.
 */
export class PaginationComponent {
    @Input() itemsPerPage:number = 10
    @Input() page:number = 1
    @Output() pageChange:EventEmitter<number> = new EventEmitter()
    @Input() pageRangeLimit:number = 4
    @Input() total:number = 0

    _changeDetectorReference:ChangeDetectorRef
    _makeRange:Function
    /**
     * Sets needed services as property values.
     * @param changeDetectorReference - Model dirty checking service.
     * @param makeRangePipe - Saves the make range pipe instance.
     * @returns Nothing.
     */
    constructor(
        changeDetectorReference:ChangeDetectorRef,
        makeRangePipe:ArrayMakeRangePipe
    ) {
        this._changeDetectorReference = changeDetectorReference
        this._makeRange = makeRangePipe.transform.bind(makeRangePipe)
    }
    /**
     * Is called whenever a page change should be performed.
     * @param event - The responsible event.
     * @param newPage - New page number to change to.
     * @returns Nothing.
     */
    change(event:Event, newPage:number):void {
        event.preventDefault()
        this._changeDetectorReference.markForCheck()
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
// IgnoreTypeCheck
@NgModule({
    /*
        NOTE: Running "moduleHelper.determineDeclarations()" is not yet
        supported by the AOT-Compiler.
    */
    declarations: [
        // region pipes
        // / region wrapped
        // // region object
        ConvertCircularObjectToJSONPipe,
        EqualsPipe,
        ExtendObjectPipe,
        RepresentObjectPipe,
        SortPipe,
        // // endregion
        // // region array
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
        // // endregion
        // // region string
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
        // // endregion
        // // region number
        NumberGetUTCTimestampPipe,
        NumberIsNotANumberPipe,
        NumberRoundPipe,
        // // endregion
        // / endregion
        // / region object
        AttachmentsAreEqualPipe,
        GetFilenameByPrefixPipe,
        AttachmentWithPrefixExistsPipe,
        ExtractDataPipe,
        ExtractRawDataPipe,
        IsDefinedPipe,
        LimitToPipe,
        MapPipe,
        ObjectKeysPipe,
        ReversePipe,
        TypePipe,
        // / endregion
        // / region array
        ArrayDependentConcatPipe,
        // / endregion
        // / region string
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
        // / endregion
        // / region number
        NumberPercentPipe,
        // / endregion
        // endregion
        // region accessors
        AbstractValueAccessor,
        DateTimeValueAccessor,
        // endregion
        // region directives
        DateDirective,
        SliderDirective,
        // endregion
        // region components
        AbstractEditorComponent,
        ConfirmComponent,
        IntervalInputComponent,
        IntervalsInputComponent,
        CodeEditorComponent,
        InputComponent,
        SimpleInputComponent,
        TextEditorComponent,
        TextareaComponent,
        FileInputComponent,
        PaginationComponent
        // endregion
    ],
    entryComponents: [ConfirmComponent],
    /*
        NOTE: Running "moduleHelper.determineExports()" is not yet supported by
        the AOT-Compiler.
    */
    exports: [
        // region pipes
        // / region wrapped
        // // region object
        ConvertCircularObjectToJSONPipe,
        EqualsPipe,
        ExtendObjectPipe,
        RepresentObjectPipe,
        SortPipe,
        // // endregion
        // // region array
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
        // // endregion
        // // region string
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
        // // endregion
        // // region number
        NumberGetUTCTimestampPipe,
        NumberIsNotANumberPipe,
        NumberRoundPipe,
        // // endregion
        // / endregion
        // / region object
        AttachmentsAreEqualPipe,
        GetFilenameByPrefixPipe,
        AttachmentWithPrefixExistsPipe,
        ExtractDataPipe,
        ExtractRawDataPipe,
        IsDefinedPipe,
        LimitToPipe,
        MapPipe,
        ObjectKeysPipe,
        ReversePipe,
        TypePipe,
        // / endregion
        // / region array
        ArrayDependentConcatPipe,
        // / endregion
        // / region string
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
        // / endregion
        // / region number
        NumberPercentPipe,
        // / endregion
        // endregion
        // region directives
        DateDirective,
        SliderDirective,
        // endregion
        // region components
        ConfirmComponent,
        IntervalInputComponent,
        IntervalsInputComponent,
        CodeEditorComponent,
        InputComponent,
        SimpleInputComponent,
        TextEditorComponent,
        TextareaComponent,
        FileInputComponent,
        PaginationComponent
        // endregion
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'generic-universal'}),
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTooltipModule
    ],
    /*
        NOTE: Running "moduleHelper.determineProviders()" is not yet supported
        by the AOT-Compiler.
    */
    providers: [
        // region services
        UtilityService,
        InitialDataService,
        AlertService,
        DataService,
        DataScopeService,
        // / region guards
        CanDeactivateRouteLeaveGuard,
        // / endregion
        // / region resolver
        AbstractResolver,
        // / endregion
        // endregion
        // region pipes
        // / region wrapped
        // // region object
        ConvertCircularObjectToJSONPipe,
        EqualsPipe,
        ExtendObjectPipe,
        RepresentObjectPipe,
        SortPipe,
        // // endregion
        // // region array
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
        // // endregion
        // // region string
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
        // // endregion
        // // region number
        NumberGetUTCTimestampPipe,
        NumberIsNotANumberPipe,
        NumberRoundPipe,
        // // endregion
        // / endregion
        // / region object
        AttachmentsAreEqualPipe,
        GetFilenameByPrefixPipe,
        AttachmentWithPrefixExistsPipe,
        ExtractDataPipe,
        ExtractRawDataPipe,
        IsDefinedPipe,
        LimitToPipe,
        MapPipe,
        ObjectKeysPipe,
        ReversePipe,
        TypePipe,
        // / endregion
        // / region array
        ArrayDependentConcatPipe,
        // / endregion
        // / region string
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
        // / endregion
        // / region number
        NumberPercentPipe,
        // / endregion
        // endregion
        DatePipe,
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
export class Module {}
export default Module
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
