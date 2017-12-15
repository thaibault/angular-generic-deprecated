import Tools, { DomNode, PlainObject } from 'clientnode';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, Injector, OnChanges, OnDestroy, OnInit, PipeTransform, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DefaultValueAccessor } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeScript, SafeHtml, SafeResourceUrl, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import PouchDB from 'pouchdb';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
export declare type AllowedRoles = string | Array<string> | {
    read: string | Array<string>;
    write: string | Array<string>;
};
export declare type Constraint = {
    description?: string;
    evaluation: string;
};
export declare type MetaData = {
    submitted: boolean;
};
export declare type Property = {
    allowedRoles?: AllowedRoles;
    constraintExecution?: Constraint;
    constraintExpression?: Constraint;
    contentTypeRegularExpressionPattern?: string;
    default?: any;
    emptyEqualsToNull?: boolean;
    index?: boolean;
    invertedContentTypeRegularExpressionPattern?: string;
    invertedRegularExpressionPattern?: string;
    maximum?: number;
    minimum?: number;
    maximumLength?: number;
    minimumLength?: number;
    maximumNumber?: number;
    minimumNumber?: number;
    maximumSize?: number;
    minimumSize?: number;
    mutable?: boolean;
    nullable?: boolean;
    onCreateExecution?: string;
    onCreateExpression?: string;
    onUpdateExecution?: string;
    onUpdateExpression?: string;
    regularExpressionPattern?: string;
    selection?: Array<any>;
    trim?: boolean;
    type?: any;
    value?: any;
    writable?: boolean;
};
export declare type Model = {
    _allowedRoles?: AllowedRoles;
    _extends?: Array<string>;
    _constraintExpressions?: Array<Constraint>;
    _constraintExecutions?: Array<Constraint>;
    _maximumAggregatedSize?: number;
    _minimumAggregatedSize?: number;
    [key: string]: any;
};
export declare type SpecialPropertyNames = {
    additional: string;
    allowedRole: string;
    attachment: string;
    conflict: string;
    constraint: {
        execution: string;
        expression: string;
    };
    deleted: string;
    deletedConflict: string;
    extend: string;
    id: string;
    localSequence: string;
    maximumAggregatedSize: string;
    minimumAggregatedSize: string;
    revision: string;
    revisions: string;
    revisionsInformation: string;
    strategy: string;
    type: string;
};
export declare type ModelConfiguration = {
    entities: PlainObject;
    property: {
        defaultSpecification: {
            minimum: number;
            minimumLength: number;
            minimumNumber: number;
        };
        name: {
            reserved: Array<string>;
            special: SpecialPropertyNames;
            validatedDocumentsCache: string;
        };
    };
};
export declare type Configuration = {
    database: {
        connector: {
            auto_compaction: boolean;
            revs_limit: number;
        };
        model: ModelConfiguration;
        plugins: Array<Object>;
        url: string;
    };
};
export declare type Stream = {
    cancel: Function;
    on: Function;
};
export declare let LAST_KNOWN_DATA: {
    data: PlainObject;
    sequence: number | string;
};
export declare let currentInstanceToSearchInjectorFor: Object | null;
export declare const globalVariableNameToRetrieveDataFrom: string;
export declare const applicationDomNodeSelector: string;
export declare const SYMBOL: string;
export declare const CODE_MIRROR_DEFAULT_OPTIONS: PlainObject;
export declare const TINYMCE_DEFAULT_OPTIONS: PlainObject;
export declare class UtilityService {
    static $: any;
    static globalContext: any;
    static tools: typeof Tools;
    fixed: typeof UtilityService;
    tools: Tools;
}
export declare class InitialDataService {
    static defaultScope: PlainObject;
    static injectors: Set<Injector>;
    static removeFoundData: boolean;
    configuration: PlainObject;
    globalContext: any;
    tools: Tools;
    /**
     * Sets all properties of given initial data as properties to this
     * initializing instance.
     * @param utility - Saves the generic tools service instance.
     * @returns Nothing.
     */
    constructor(utility: UtilityService);
    /**
     * Retrieve initial data from given dom node or dom node identifier.
     * @param domNodeReference - Dom node or a selector to retrieve a dom node.
     * @param removeFoundData - Removes found attribute value from dom node.
     * @param attributeName - An attribute name to retrieve data from.
     * @returns Nothing.
     */
    retrieveFromDomNode(domNodeReference?: DomNode | string, removeFoundData?: boolean, attributeName?: string): PlainObject;
    /**
     * Sets initial data.
     * @param parameter - All given data objects will be merged into current
     * scope.
     * @returns Complete generated data.
     */
    set(...parameter: Array<PlainObject>): InitialDataService;
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
export declare const determineInjector: Function;
/**
 * Generic pipe transform class to wrapp simple pure functions as pipe
 * transformation.
 * @property methodName - Name of forwarded method.
 */
export declare class AbstractToolsPipe implements PipeTransform {
    methodName: string;
    /**
     * Performs the concrete conversion logic.
     * @param parameter - Saves all generic parameter to forward it
     * for triggering the underlying tools utility.
     * @returns Whatever the underlying tools function returns.
     */
    transform(...parameter: Array<any>): any;
}
/**
 * Generic pipe transform class to wrapp simple pure functions as inverted pipe
 * transformation.
 * @property methodName - Name of forwarded method.
 */
export declare class AbstractInvertedToolsPipe extends AbstractToolsPipe implements PipeTransform {
    /**
     * Performs the concrete conversion logic.
     * @param parameter - Saves all generic parameter to
     * forward it for triggering the underlying tools utility.
     * @returns Whatever the underlying tools function returns.
     */
    transform(...parameter: Array<any>): any;
}
export declare class ConvertCircularObjectToJSONPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class EqualsPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ExtendObjectPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class RepresentObjectPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class SortPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArrayMergePipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArrayMakePipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArrayUniquePipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArrayAggregatePropertyIfEqualPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArrayDeleteEmptyItemsPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArrayExtractPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArrayExtractIfMatchesPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArrayExtractIfPropertyExistsPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArrayExtractIfPropertyMatchesPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArrayIntersectPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArrayMakeRangePipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArraySumUpPropertyPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArrayAppendAddPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArrayRemovePipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class ArraySortTopologicalPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringEscapeRegularExpressionsPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringConvertToValidVariableNamePipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringEncodeURIComponentPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringAddSeparatorToPathPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringHasPathPrefixPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringGetDomainNamePipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringGetPortNumberPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringGetProtocolNamePipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringGetURLVariablePipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringIsInternalURLPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringNormalizeURLPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringRepresentURLPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringCompressStyleValuePipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringCamelCaseToDelimitedPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringCapitalizePipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringDelimitedToCamelCasePipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringFormatPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringGetRegularExpressionValidatedPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringLowerCasePipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringFindNormalizedMatchRangePipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringMarkPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringMD5Pipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringNormalizePhoneNumberPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringParseEncodedObjectPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringRepresentPhoneNumberPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringDecodeHTMLEntitiesPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class StringNormalizeDomNodeSelectorPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class NumberGetUTCTimestampPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class NumberIsNotANumberPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class NumberRoundPipe extends AbstractToolsPipe implements PipeTransform {
    methodName: string;
}
export declare class AttachmentsAreEqualPipe implements PipeTransform {
    data: DataService;
    representObject: Function;
    specialNames: PlainObject;
    stringMD5: Function;
    /**
     * Gets needed services injected.
     * @param initialData - Injected initial data service instance.
     * @param injector - Application specific injector instance.
     * @param representObjectPipe - Represent object pipe instance.
     * @param stringMD5Pipe - Injected string md5 pipe instance.
     * @returns Nothing.
     */
    constructor(initialData: InitialDataService, injector: Injector, representObjectPipe: RepresentObjectPipe, stringMD5Pipe: StringMD5Pipe);
    /**
     * Performs the actual transformations process.
     * @param first - First attachment to compare.
     * @param second - Second attachment to compare.
     * @returns Comparison result.
     */
    transform(first: any, second: any): Promise<boolean>;
}
export declare class GetFilenameByPrefixPipe implements PipeTransform {
    /**
     * Performs the actual transformations process.
     * @param attachments - Documents attachments object to determine file with
     * matching file name prefix.
     * @param prefix - Prefix or nothing to search for. If nothing given first
     * file name will be returned.
     * @returns Matching file name or null if no file matches.
     */
    transform(attachments: PlainObject, prefix?: string): string | null;
}
export declare class AttachmentWithPrefixExistsPipe implements PipeTransform {
    attachmentName: string;
    getFilenameByPrefix: Function;
    /**
     * Gets needed file name by prefix pipe injected.
     * @param getFilenameByPrefixPipe - Filename by prefix pipe instance.
     * @param initialData - Injected initial data service.
     * @returns Nothing.
     */
    constructor(getFilenameByPrefixPipe: GetFilenameByPrefixPipe, initialData: InitialDataService);
    /**
     * Performs the actual transformations process.
     * @param document - Documents with attachments to analyse.
     * @param namePrefix - Prefix or nothing to search for. If nothing given
     * "false" will be returned either.
     * @returns Boolean indication if given file name prefix exists.
     */
    transform(document: PlainObject, namePrefix?: string): boolean;
}
export declare class ExtractDataPipe implements PipeTransform {
    modelConfiguration: PlainObject;
    /**
     * Gets injected services.
     * @param initialData - Initial data service instance.
     * @returns Nothing.
     */
    constructor(initialData: InitialDataService);
    /**
     * Extracts raw data from given scope item.
     * @param item - Item to extract data from.
     * @returns Given extracted data.
     */
    transform(item: any): any;
    /**
     * Retrieves raw data (without meta data) for given scope recursively.
     * @param object - Object to use to determine data from.
     * @returns Resolved data.
     */
    _extractFromObject(object: Object): PlainObject;
}
export declare class ExtractRawDataPipe implements PipeTransform {
    attachmentsAreEqual: Function;
    dataScope: DataScopeService;
    equals: Function;
    modelConfiguration: ModelConfiguration;
    numberGetUTCTimestamp: Function;
    specialNames: SpecialPropertyNames;
    tools: Tools;
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
    constructor(attachmentsAreEqualPipe: AttachmentsAreEqualPipe, equalsPipe: EqualsPipe, initialData: InitialDataService, injector: Injector, numberGetUTCTimestampPipe: NumberGetUTCTimestampPipe, utility: UtilityService);
    /**
     * Converts all (nested) date object in given data structure to their
     * corresponding utc timestamps in milliseconds.
     * @param value - Given data structure to convert.
     * @returns Given converted object.
     */
    convertDateToTimestampRecursively(value: any): any;
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
    getNotAlreadyExistingAttachmentData(newDocument: PlainObject, oldDocument: PlainObject, specification: PlainObject): Promise<{
        payloadExists: boolean;
        result: PlainObject;
    }>;
    /**
     * Remove already existing values and mark removed or truncated values
     * (only respect values if specified in model).
     * @param newData - Data to consider.
     * @param oldData - Old data to use for checking for equality.
     * @param specification - Specification object for given document.
     * @returns An object holding new data and boolean indicating if there
     * exists any payload.
     */
    removeAlreadyExistingData(newData: any, oldData: any, specification?: PlainObject): {
        newData: any;
        payloadExists: boolean;
    };
    /**
     * Removes all special property names with meta data from given document.
     * @param data - To trim.
     * @param specification - Specification object for given document.
     * @returns Sliced given document.
     */
    removeMetaData(data: PlainObject, specification?: PlainObject): any;
    /**
     * Implements the meta data removing of given document.
     * @param newDocument - Document to slice meta data from.
     * @param oldDocument - Optionally existing old document to take into
     * account.
     * @returns The copied sliced version of given document if changes exists
     * (checked against given old document) and "null" otherwise. Result is
     * wrapped into a promise to process binary data asynchronous.
     */
    transform(newDocument: PlainObject, oldDocument?: PlainObject): Promise<PlainObject | null>;
}
export declare class IsDefinedPipe implements PipeTransform {
    /**
     * Performs the actual comparison.
     * @param object - Object to compare against "undefined" or "null".
     * @param nullIsUndefined - Indicates whether "null" should be handles as
     * "undefined".
     * @returns The comparison result.
     */
    transform(object: any, nullIsUndefined?: boolean): boolean;
}
export declare class LimitToPipe implements PipeTransform {
    /**
     * Limits number of items of given string, Object (keys) or Array.
     * @param input - Object to retrieve key names from.
     * @param limit - Number of needed items.
     * @param begin - Starting point to slice from.
     * @returns Copy of given sliced object.
     */
    transform(input: any, limit: any, begin: any): any;
}
export declare class MapPipe implements PipeTransform {
    injector: Injector;
    /**
     * Injects the injector and saves as instance property.
     * @param injector - Pipe injector service instance.
     * @returns Nothing.
     */
    constructor(injector: Injector);
    /**
     * Performs the actual transformation.
     * @param object - Iterable item where given pipe should be applied to each
     * value.
     * @param pipeName - Pipe to apply to each value.
     * @param additionalArguments - All additional arguments will be forwarded
     * to given pipe (after the actual value).
     * @returns Given transform copied object.
     */
    transform(object: any, pipeName: string, ...additionalArguments: Array<any>): any;
}
export declare class ObjectKeysPipe implements PipeTransform {
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
    transform(object?: Object, sort?: any, reverse?: boolean, asNumber?: boolean): Array<string>;
}
export declare class ReversePipe implements PipeTransform {
    /**
     * Performs the "Arrays" native "reverse()" method.
     * @param list - List to reverse.
     * @param copy - Indicates whether a reversed copy should be created or
     * reversion can be done in place.
     * @returns Reverted arrays.
     */
    transform(list?: Array<any>, copy?: boolean): Array<any>;
}
export declare class TypePipe implements PipeTransform {
    /**
     * Returns type of given object.
     * @param object - Object to determine type of.
     * @returns Type name.
     */
    transform(object: any): string;
}
export declare class ArrayDependentConcatPipe {
    /**
     * Does the given array transformation logic.
     * @param array - Array to transform.
     * @param indicator - Indicator to decide if concatenation should be done.
     * @param item - Object(s) to concatenate.
     * @returns Transformed given array.
     */
    transform(array: Array<any>, indicator: boolean, item: any): Array<any>;
}
export declare class StringEndsWithPipe implements PipeTransform {
    /**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param needle - Suffix to search for.
     * @returns The boolean result.
     */
    transform(string?: string, needle?: string): boolean;
}
export declare class StringHasTimeSuffixPipe implements PipeTransform {
    /**
     * Performs the actual string suffix check.
     * @param string - To search in.
     * @returns The boolean result.
     */
    transform(string?: string): boolean;
}
export declare class StringMatchPipe implements PipeTransform {
    /**
     * Performs the actual matching.
     * @param pattern - String or regular expression to search for.
     * @param subject - String to search in.
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns Boolean test result.
     */
    transform(pattern: string, subject: string, modifier?: string): boolean;
}
export declare class StringMaximumLengthPipe implements PipeTransform {
    /**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param maximumLength - Maximum number of symbols in given string.
     * @param suffix - Suffix to append if given string has to bee trimmed.
     * @returns The potentially trimmed given string.
     */
    transform(string?: string, maximumLength?: number, suffix?: string): string;
}
export declare class StringReplacePipe implements PipeTransform {
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
    transform(string: string, search: string | RegExp, replacement?: string, modifier?: string): string;
}
export declare class StringSafeHTMLPipe implements PipeTransform {
    transform: (value: string) => SafeHtml;
    /**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */
    constructor(domSanitizer: DomSanitizer);
}
export declare class StringSafeResourceURLPipe implements PipeTransform {
    transform: (value: string) => SafeUrl;
    /**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */
    constructor(domSanitizer: DomSanitizer);
}
export declare class StringSafeScriptPipe implements PipeTransform {
    transform: (value: string) => SafeScript;
    /**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */
    constructor(domSanitizer: DomSanitizer);
}
export declare class StringSafeStylePipe implements PipeTransform {
    transform: (value: string) => SafeStyle;
    /**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */
    constructor(domSanitizer: DomSanitizer);
}
export declare class StringSafeURLPipe implements PipeTransform {
    transform: (value: string) => SafeUrl;
    /**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */
    constructor(domSanitizer: DomSanitizer);
}
export declare class StringShowIfPatternMatchesPipe implements PipeTransform {
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
    transform(string: string, pattern: string | RegExp, invert?: boolean, modifier?: string): string;
}
export declare class StringSliceMatchPipe implements PipeTransform {
    /**
     * Performs the actual matching.
     * @param subject - String to search in.
     * @param pattern - String or regular expression to search for.
     * @param index - Match group to extract.
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns Matching group.
     */
    transform(subject: string | null | undefined, pattern: string, index?: number, modifier?: string): string;
}
export declare class StringStartsWithPipe implements PipeTransform {
    /**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param needle - Prefix to search for.
     * @returns The boolean result.
     */
    transform(string?: string, needle?: string): boolean;
}
export declare class StringTemplatePipe implements PipeTransform {
    extendObject: Function;
    /**
     * Sets injected extend object pipe instance as instance property.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @returns Nothing.
     */
    constructor(extendObjectPipe: ExtendObjectPipe);
    /**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param scopes - Scopes to merge and render again given template string
     * again.
     * @returns The rendered result.
     */
    transform(string?: string, ...scopes: Array<PlainObject>): string;
}
export declare class NumberPercentPipe implements PipeTransform {
    /**
     * Performs the actual calculation.
     * @param part - Part to divide "all" through.
     * @param all - Reference value to calculate part of.
     * @returns The calculated part.
     */
    transform(part: number, all: number): number;
}
export declare class CanDeactivateRouteLeaveGuard implements CanDeactivate<Object> {
    /**
     * Calls the component specific "canDeactivate()" method.
     * @param component - Component instance of currently selected route.
     * @param additionalParameter - All additional parameter are forwarded to
     * the components "canDeactivate" method.
     * @returns A boolean, promise or observable which wraps the indicator.
     */
    canDeactivate(component: any, ...additionalParameter: Array<any>): Observable<boolean> | Promise<boolean> | boolean;
}
export declare class ConfirmComponent {
    cancelText: string;
    dialogReference: MatDialogRef<ConfirmComponent> | null;
    okText: string;
    title: string;
    message: string;
    /**
     * Gets needed component data injected.
     * NOTE: The "@Optional" decorator makes test instances possible.
     * NOTE: Don't set default values for theses optional parameter since the
     * would overwrite an injected value.
     * @param data - Data to provide for the dialog component instance.
     * @param dialogReference - Dialog component instance.
     * @returns Nothing.
     */
    constructor(data: any, dialogReference: MatDialogRef<ConfirmComponent>);
}
export declare class AlertService {
    dialog: MatDialog;
    dialogReference: MatDialogRef<ConfirmComponent>;
    /**
     * Gets needed component dialog service instance injected.
     * @param dialog - Reference to the dialog component instance.
     * @returns Nothing.
     */
    constructor(dialog: MatDialog);
    /**
     * Triggers a confirmation dialog to show.
     * @param data - Data to provide for the confirmations component instance.
     * @returns A promise resolving when confirmation window where confirmed or
     * rejected due to user interaction. A promised wrapped boolean indicates
     * which decision was made.
     */
    confirm(data: string | {
        [key: string]: any;
    }): Promise<boolean>;
}
export declare class DataService {
    static revisionNumberRegularExpression: RegExp;
    static skipGenericIndexManagementOnServer: boolean;
    static skipRemoteConnectionOnServer: boolean;
    static wrappableMethodNames: Array<string>;
    connection: PouchDB;
    configuration: PlainObject;
    database: typeof PouchDB;
    equals: Function;
    extendObject: Function;
    middlewares: {
        pre: {
            [key: string]: Array<Function>;
        };
        post: {
            [key: string]: Array<Function>;
        };
    };
    platformID: string;
    remoteConnection: PouchDB | null;
    runningRequests: Array<PlainObject>;
    runningRequestsStream: Subject<Array<PlainObject>>;
    stringFormat: Function;
    synchronisation: Stream | null;
    tools: Tools;
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
    constructor(equalsPipe: EqualsPipe, extendObjectPipe: ExtendObjectPipe, initialData: InitialDataService, platformID: string, stringFormatPipe: StringFormatPipe, utility: UtilityService);
    /**
     * Determines all property names which are indexable in a generic manner.
     * @param modelConfiguration - Model specification object.
     * @param model - Model to determine property names from.
     * @returns The mapping object.
     */
    static determineGenericIndexablePropertyNames(modelConfiguration: ModelConfiguration, model: Model): Array<string>;
    /**
     * Initializes database connection and synchronisation if needed.
     * @returns A promise resolving when initialisation has finished.
     */
    initialize(): Promise<void>;
    /**
     * Creates a database index.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb-find's "createIndex()" method.
     * @returns Whatever pouchdb-find's "createIndex()" method returns.
     */
    createIndex(...parameter: Array<any>): Promise<PlainObject>;
    /**
     * Creates or updates given data.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "bulkDocs()" method.
     * @returns Whatever pouchdb's method returns.
     */
    bulkDocs(...parameter: Array<any>): Promise<Array<any>>;
    /**
     * Removes current active database.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "destroy()" method.
     * @returns Whatever pouchdb's method returns.
     */
    destroy(...parameter: Array<any>): Promise<PlainObject>;
    /**
     * Retrieves a database resource determined by given selector.
     * @param selector - Selector object in mango.
     * @param options - Options to use during selecting items.
     * @returns A promise with resulting array of retrieved resources.
     */
    find(selector: PlainObject, options?: PlainObject): Promise<Array<PlainObject>>;
    /**
     * Retrieves a resource by id.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "get()" method.
     * @returns Whatever pouchdb's method returns.
     */
    get(...parameter: Array<any>): Promise<PlainObject>;
    /**
     * Retrieves an attachment by given id.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "get()" method.
     * @returns Whatever pouchdb's method returns.
     */
    getAttachment(...parameter: Array<any>): Promise<PlainObject>;
    /**
     * Creates or updates given data.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "put()" method.
     * @returns Whatever pouchdb's method returns.
     */
    put(...parameter: Array<any>): Promise<PlainObject>;
    /**
     * Creates or updates given attachment.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "put()" method.
     * @returns Whatever pouchdb's method returns.
     */
    putAttachment(...parameter: Array<any>): Promise<PlainObject>;
    /**
     * Registers a new middleware.
     * @param names - Event names to intercept.
     * @param callback - Callback function to trigger when specified event
     * happens.
     * @param type - Specifies whether callback should be triggered before or
     * after specified event has happened.
     * @returns A cancel function which will deregister given middleware.
     */
    register(names: string | Array<string>, callback: Function, type?: string): Function;
    /**
     * Removes specified entities in database.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "remove()" method.
     * @returns Whatever pouchdb's "remove()" method return.
     */
    remove(...parameter: Array<any>): Promise<PlainObject>;
    /**
     * Removes specified attachment from entity in database.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "removeAttachment()" method.
     * @returns Whatever pouchdb's "removeAttachment()" method return.
     */
    removeAttachment(...parameter: Array<any>): Promise<PlainObject>;
    /**
     * Starts synchronisation between a local and remote database.
     * @returns A promise if a synchronisation has been started and is in sync
     * with remote database or null if no stream was initialized due to
     * corresponding database configuration.
     */
    startSynchronisation(): Promise<any>;
    /**
     * Stop a current running data synchronisation.
     * @returns A boolean indicating whether a synchronisation was really
     * stopped or there were none.
     */
    stopSynchronisation(): Promise<boolean>;
}
export declare class DataScopeService {
    attachmentWithPrefixExists: Function;
    configuration: PlainObject;
    data: DataService;
    extendObject: Function;
    extractData: Function;
    getFilenameByPrefix: Function;
    numberGetUTCTimestamp: Function;
    representObject: Function;
    tools: typeof Tools;
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
    constructor(attachmentWithPrefixExistsPipe: AttachmentWithPrefixExistsPipe, data: DataService, extendObjectPipe: ExtendObjectPipe, extractDataPipe: ExtractDataPipe, getFilenameByPrefixPipe: GetFilenameByPrefixPipe, initialData: InitialDataService, numberGetUTCTimestampPipe: NumberGetUTCTimestampPipe, representObjectPipe: RepresentObjectPipe, utility: UtilityService);
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
    determine(modelName: string, id?: string | null, propertyNames?: Array<string> | null, revision?: string, revisionHistory?: boolean): Promise<PlainObject>;
    /**
     * Determines a nested specification object for given property name and
     * corresponding specification object where given property is bound to.
     * @param name - Property name to search specification for.
     * @param specification - Parents object specification.
     * @returns New specification object or null if it could not be determined.
     */
    determineNestedSpecifcation(name: string, specification?: PlainObject): PlainObject | null;
    /**
     * Determines a recursive resolved specification object for given (flat)
     * model object.
     * @param modelSpecification - Specification object to traverse.
     * @param propertyNames - List of property names to consider.
     * @param propertyNamesToIgnore - List of property names to skip.
     * @returns Resolved specification object.
     */
    determineSpecificationObject(modelSpecification: PlainObject, propertyNames?: Array<string>, propertyNamesToIgnore?: Array<string>): PlainObject;
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
    generate(modelName: string, propertyNames?: Array<string>, data?: PlainObject, propertyNamesToIgnore?: Array<string>): PlainObject;
}
export declare class AbstractResolver implements Resolve<PlainObject> {
    static skipResolvingOnServer: boolean;
    cache: boolean;
    cacheStore: PlainObject;
    changesStream: Stream;
    convertCircularObjectToJSON: Function;
    data: PlainObject;
    databaseBaseURL: string;
    databaseURL: string;
    databaseURLCache: {
        [key: string]: SafeResourceUrl;
    };
    deepCopyItems: boolean;
    domSanitizer: DomSanitizer;
    escapeRegularExpressions: Function;
    extendObject: Function;
    message: Function;
    messageConfiguration: PlainObject;
    modelConfiguration: PlainObject;
    platformID: string;
    relevantKeys: Array<string> | null;
    relevantSearchKeys: Array<string> | null;
    representObject: Function;
    specialNames: {
        [key: string]: string;
    };
    tools: Tools;
    type: string;
    useLimit: boolean;
    useSkip: boolean;
    /**
     * Sets all needed injected services as instance properties.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector: Injector);
    /**
     * Determines item specific database url by given item data object.
     * @param item - Given item object.
     * @returns Determined url.
     */
    getDatabaseURL(item: PlainObject): SafeResourceUrl;
    /**
     * List items which matches given filter criteria.
     * @param sort - List of items.
     * @param page - Page to show.
     * @param limit - Maximal number of entities to retrieve.
     * @param searchTerm - String query to search for.
     * @param additionalSelector - Custom filter criteria.
     * @returns A promise wrapping retrieved data.
     */
    list(sort?: Array<PlainObject>, page?: number, limit?: number, searchTerm?: string, additionalSelector?: PlainObject): Promise<Array<PlainObject>>;
    /**
     * Removes given item.
     * @param item - Item or id to delete.
     * @param message - Message to show after successful deletion.
     * @returns Nothing.
     */
    remove(item: PlainObject, message?: string): Promise<boolean>;
    /**
     * Implements the resolver method which converts route informations into
     * "list()" method parameter and forward their result as result in an
     * observable.
     * @param route - Current route informations.
     * @param state - Current state informations.
     * @returns Promise with data filtered by current route informations.
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Array<PlainObject> | Promise<Array<PlainObject>>;
    /**
     * Updates given item.
     * @param item - Item to update.
     * @param data - Optional given data to update into given item.
     * @param message - Message to should if process was successfully.
     * @returns A boolean indicating if requested update was successful.
     */
    update(item: PlainObject, data?: PlainObject, message?: string): Promise<boolean>;
}
/**
 * Creates a database connection and/or synchronisation stream plus missing
 * local indexes.
 * @param data - Injected data service instance.
 * @param initialData - Injected initial data service instance.
 * @param injector - Injected injector service instance.
 * @returns Initializer function.
 */
export declare function dataServiceInitializerFactory(data: DataService, initialData: InitialDataService, injector: Injector): Function;
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
export declare class AbstractInputComponent {
    declaration: string | null;
    description: string | null;
    disabled: boolean | null;
    maximum: number | null;
    maximumLength: number | null;
    maximumLengthText: string;
    maximumText: string;
    minimum: number | null;
    minimumLength: number | null;
    minimumLengthText: string;
    minimumText: string;
    model: PlainObject;
    modelChange: EventEmitter<PlainObject>;
    pattern: string;
    patternText: string;
    required: boolean | null;
    requiredText: string;
    showDeclarationText: string;
    showValidationErrorMessages: boolean;
    type: string;
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
export declare class AbstractNativeInputComponent extends AbstractInputComponent implements OnInit {
    _attachmentWithPrefixExists: Function;
    _extendObject: Function;
    _getFilenameByPrefix: Function;
    _modelConfiguration: PlainObject;
    _numberGetUTCTimestamp: Function;
    /**
     * Sets needed services as property values.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector: Injector);
    /**
     * Triggers after input values have been resolved.
     * @returns Nothing.
     */
    ngOnInit(): void;
    /**
     * Triggers when ever a change to current model happens inside this
     * component.
     * @param newValue - Value to use to update model with.
     * @param state - Saves the current model state.
     * @returns Nothing.
     */
    onChange(newValue: any, state: Object): any;
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
export declare class AbstractLiveDataComponent implements OnDestroy, OnInit {
    static defaultLiveUpdateOptions: PlainObject;
    actions: Array<PlainObject>;
    autoRestartOnError: boolean;
    _canceled: boolean;
    _changeDetectorReference: ChangeDetectorRef;
    _changesStream: Stream;
    _data: DataService;
    _extendObject: Function;
    _liveUpdateOptions: PlainObject;
    _stringCapitalize: Function;
    _tools: typeof Tools;
    /**
     * Saves injected service instances as instance properties.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector: Injector);
    /**
     * Initializes data observation when view has been initialized.
     * @returns Nothing.
     */
    ngOnInit(): void;
    /**
     * Marks current live data observation as canceled and closes initially
     * requested update stream.
     * @returns Nothing.
     */
    ngOnDestroy(): void;
    /**
     * Triggers on any data changes.
     * @param event - An event object holding informations about the triggered
     * reason.
     * @returns A boolean (or promise wrapped) indicating whether a view update
     * should be triggered or not.
     */
    onDataChange(event?: any): Promise<boolean> | boolean;
    /**
     * Triggers on completed data change observation.
     * @param event - An event object holding informations about the triggered
     * reason.
     * @returns A boolean (or promise wrapped) indicating whether a view update
     * should be triggered or not.
     */
    onDataComplete(event?: any): Promise<boolean> | boolean;
    /**
     * Triggers on data change observation errors.
     * @param event - An event object holding informations about the triggered
     * reason.
     * @returns A boolean (or promise wrapped) indicating whether a view update
     * should be triggered or not.
     */
    onDataError(event?: any): Promise<boolean> | boolean;
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
export declare class AbstractItemsComponent extends AbstractLiveDataComponent implements AfterContentChecked, OnDestroy {
    allItems: Array<PlainObject>;
    allItemsChecked: boolean;
    debouncedUpdate: Function;
    idName: string;
    items: Array<PlainObject>;
    keyCode: {
        [key: string]: number;
    };
    limit: number;
    navigateAway: boolean;
    page: number;
    preventedDataUpdate: Array<any> | null;
    regularExpression: boolean;
    revisionName: string;
    searchTerm: string;
    searchTermStream: Subject<string>;
    selectedItems: Set<PlainObject>;
    sort: PlainObject;
    _currentParameter: PlainObject;
    _itemPath: string;
    _itemsPath: string;
    _route: ActivatedRoute;
    _router: Router;
    _subscriptions: Array<ISubscription>;
    _toolsInstance: Tools;
    /**
     * Saves injected service instances as instance properties.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector: Injector);
    /**
     * Updates constraints between limit, page number and number of total
     * available items.
     * @returns A boolean indicating if something has changed to fulfill page
     * constraints.
     */
    applyPageConstraints(): boolean;
    /**
     * A function factory to generate functions which updates current view if
     * no route change happened between an asynchronous process.
     * @param callback - Function to wrap.
     * @returns Given function wrapped.
     */
    changeItemWrapperFactory(callback: Function): Function;
    /**
     * Clear all currently selected items.
     * @returns Nothing.
     */
    clearSelectedItems(): void;
    /**
     * Switches section to item which has given id.
     * @param itemID - ID of item to switch to.
     * @param itemVersion - Version of item to switch to.
     * @returns A promise wrapping the navigation result.
     */
    goToItem(itemID: string, itemVersion?: string): Promise<boolean>;
    /**
     * Checks if selection has changed.
     * @returns Nothing.
     */
    ngAfterContentChecked(): void;
    /**
     * Triggers on any data changes and updates item constraints.
     * @param parameter - Parameter to save for delayed update.
     * @returns False so their wont be a view update since a complete route
     * reload will be triggered.
     */
    onDataChange(...parameter: Array<any>): false;
    /**
     * Unsubscribes all subscriptions when this component should be disposed.
     * @param parameter - List of all parameter to forward to super method.
     * @returns Returns the super values return value.
     */
    ngOnDestroy(...parameter: Array<any>): any;
    /**
     * Select all available items.
     * @returns Nothing.
     */
    selectAllItems(): void;
    /**
     * Determines an items content specific hash value combined from id and
     * revision.
     * @param item - Item with id and revision property.
     * @returns Indicator string.
     */
    trackByIDAndRevision(item: PlainObject): string;
    /**
     * Applies current filter criteria to current visible item set.
     * @param reload - Indicates whether a simple reload should be made because
     * a changed list of available items is expected for example.
     * @returns A boolean indicating whether route change was successful.
     */
    update(reload?: boolean): Promise<boolean>;
    /**
     * Applies current search term to the search term stream.
     * @returns Nothing.
     */
    updateSearch(): void;
}
/**
 * Generic value accessor with "ngModel" support.
 * @property onChangeCallback - Saves current on change callback.
 * @property onTouchedCallback - Saves current on touch callback.
 * @property type - Saves current input type.
 */
export declare class AbstractValueAccessor extends DefaultValueAccessor {
    onChangeCallback: (value: any) => void;
    onTouchedCallback: () => void;
    type: string | null;
    /**
     * Initializes and forwards needed services to the default value accessor
     * constructor.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector: Injector);
    /**
     * Manipulates editable value representation.
     * @param value - Value to manipulate.
     * @returns Given and transformed value.
     */
    export(value: any): any;
    /**
     * Reads internal value representation.
     * @param value - Value to convert to its internal representation.
     * @returns Given and transformed value.
     */
    import(value: any): any;
    /**
     * Needed implementation for an angular control value accessor.
     * @param callback - Callback function to register.
     * @param additionalParameter - Additional parameter will be forwarded to
     * inherited super method.
     * @returns What inherited method returns.
     */
    registerOnChange(callback: (value: any) => void, ...additionalParameter: Array<any>): any;
    /**
     * Needed implementation for an angular control value accessor.
     * @param callback - Callback function to register.
     * @param additionalParameter - Additional parameter will be forwarded to
     * inherited super method.
     * @returns What inherited method returns.
     */
    registerOnTouched(callback: () => void, ...additionalParameter: Array<any>): any;
    /**
     * Overridden inherited function for value export.
     * @param value - Value to export.
     * @param additionalParameter - Additional arguments will be forwarded to
     * the overridden method invocation.
     * @returns The transformed give value.
     */
    writeValue(value: any, ...additionalParameter: Array<any>): any;
}
export declare class DateDirective {
    dateFormatter: Function;
    extendObject: Function;
    options: {
        dateTime: Date | number | string;
        format: string;
        freeze: boolean;
        updateIntervalInMilliseconds: number;
    };
    templateReference: TemplateRef<any>;
    timerID: any;
    viewContainerReference: ViewContainerRef;
    /**
     * Saves injected services as instance properties.
     * @param datePipe - Injected date pipe service instance.
     * @param extendObjectPipe - Injected extend object pipe service instance.
     * @param templateReference - Specified template reference.
     * @param viewContainerReference - Injected view container reference.
     * @returns Nothing.
     */
    constructor(datePipe: DatePipe, extendObjectPipe: ExtendObjectPipe, templateReference: TemplateRef<any>, viewContainerReference: ViewContainerRef);
    /**
     * Options setter to merge into options interactively.
     * @param options - Options object to merge into.
     * @returns Nothing.
     */
    insertOptions: PlainObject;
    /**
     * Inserts a rendered template instance into current view.
     * @returns Nothing.
     */
    insert(): void;
    /**
     * On destroy life cycle hook to cancel initialized interval timer.
     * @returns Nothing.
     */
    ngOnDestroy(): void;
    /**
     * Initializes interval timer and inserts initial template instance into
     * current view.
     * @returns Nothing.
     */
    ngOnInit(): void;
}
export declare class SliderDirective implements OnInit {
    extendObject: Function;
    index: number;
    options: {
        freeze: boolean;
        startIndex: number;
        step: number;
        slides: Array<any>;
        updateIntervalInMilliseconds: number;
    };
    templateReference: TemplateRef<any>;
    timerID: any;
    viewContainerReference: ViewContainerRef;
    /**
     * Saves injected services as instance properties.
     * @param extendObjectPipe - Injected extend object pipe service instance.
     * @param templateReference - Specified template reference.
     * @param viewContainerReference - Injected view container reference.
     * @returns Nothing.
     */
    constructor(extendObjectPipe: ExtendObjectPipe, templateReference: TemplateRef<any>, viewContainerReference: ViewContainerRef);
    /**
     * Calculates next index from given reference point.
     * @param startIndex - Reference index.
     * @returns New calculated index.
     */
    getNextIndex(startIndex?: number): number;
    /**
     * Options setter to merge into options interactively.
     * @param options - Options object to merge into.
     * @returns Nothing.
     */
    insertOptions: Array<any> | PlainObject;
    /**
     * Inserts a rendered template instance into current view.
     * @returns Nothing.
     */
    update(): void;
    /**
     * On destroy life cycle hook to cancel initialized interval timer.
     * @returns Nothing.
     */
    ngOnDestroy(): void;
    /**
     * Initializes interval timer and inserts initial template instance into
     * current view.
     * @returns Nothing.
     */
    ngOnInit(): void;
}
export declare class DateTimeValueAccessor extends AbstractValueAccessor {
    /**
     * Delegates injected injector service instance to the super constructor.
     * @param injector - Injected injector service instance.
     * @returns Nothing.
     */
    constructor(injector: Injector);
    /**
     * Manipulates editable value representation.
     * @param value - Value to manipulate.
     * @returns Given and transformed value.
     */
    export(value: any): any;
    /**
     * Reads internal value representation.
     * @param value - Value to convert to its internal representation.
     * @returns Given and transformed value.
     */
    import(value: any): any;
}
export declare class IntervalInputComponent {
    endDeclaration: string | null;
    startDeclaration: string | null;
    endDescription: string | null;
    startDescription: string | null;
    endDisabled: boolean | null;
    startDisabled: boolean | null;
    endMaximum: number | null;
    startMaximum: number | null;
    endMaximumText: string;
    startMaximumText: string;
    endMinimum: number | null;
    startMinimum: number | null;
    endMinimumText: string;
    startMinimumText: string;
    endRequired: boolean | null;
    startRequired: boolean | null;
    endRequiredText: string;
    startRequiredText: string;
    endShowDeclarationText: string;
    startShowDeclarationText: string;
    endShowValidationErrorMessages: boolean;
    startShowValidationErrorMessages: boolean;
    model: {
        end: any;
        start: any;
    };
    modelChange: EventEmitter<PlainObject>;
    /**
     * Triggers on any change events of any nested input.
     * @param event - Events payload data.
     * @param type - Indicates which input field has changed.
     * @returns Nothing.
     */
    change(event: any, type: 'end' | 'start'): void;
}
export declare class IntervalsInputComponent implements OnInit {
    additionalObjectData: PlainObject;
    contentTemplate: TemplateRef<any>;
    description: string | null;
    endDeclaration: string | null;
    startDeclaration: string | null;
    endDescription: string | null;
    startDescription: string | null;
    endDisabled: boolean | null;
    startDisabled: boolean | null;
    endMaximum: number | null;
    startMaximum: number | null;
    endMaximumText: string;
    startMaximumText: string;
    endMinimum: number | null;
    startMinimum: number | null;
    endMinimumText: string;
    startMinimumText: string;
    endRequired: boolean | null;
    startRequired: boolean | null;
    endRequiredText: string;
    startRequiredText: string;
    endShowDeclarationText: string;
    startShowDeclarationText: string;
    endShowValidationErrorMessages: boolean;
    startShowValidationErrorMessages: boolean;
    model: PlainObject;
    modelChange: EventEmitter<PlainObject>;
    _dataScope: DataScopeService;
    _extendObject: Function;
    /**
     * Constructs the interval list component.
     * @param dataScope - Data scope service instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @returns Nothing.
     */
    constructor(dataScope: DataScopeService, extendObjectPipe: ExtendObjectPipe);
    /**
     * Triggers on any change events of any nested input.
     * @param event - Events payload data.
     * @param index - Indicates which input field has changed.
     * @returns Nothing.
     */
    change(event: any, index: number): void;
    /**
     * Extends additional model data with default one if nothing is provided.
     * @returns Nothing.
     */
    ngOnInit(): void;
    /**
     * Adds a new interval.
     * @param data - Additional data to use for newly created entity.
     * @returns Nothing.
     */
    add(data?: PlainObject): void;
    /**
     * Removes given interval.
     * @param interval - Interval to remove from current list.
     * @returns Nothing.
     */
    remove(interval: PlainObject): void;
}
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
export declare class AbstractEditorComponent extends AbstractValueAccessor implements AfterViewInit {
    static applicationInterfaceLoad: {
        [key: string]: Promise<any> | null;
    };
    static factories: {
        [key: string]: any;
    };
    configuration: PlainObject;
    contentSetterMethodName: string;
    disabled: boolean | null;
    extendObject: Function;
    factory: any;
    factoryName: string;
    fixedUtility: typeof UtilityService;
    hostDomNode: ElementRef;
    instance: any;
    initialized: EventEmitter<any>;
    model: string;
    modelChange: EventEmitter<string>;
    /**
     * Initializes the code mirror resource loading if not available yet.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector: Injector);
    /**
     * Initializes the code editor element.
     * @returns Nothing.
     */
    ngAfterViewInit(): Promise<void>;
    /**
     * Synchronizes given value into internal code mirror instance.
     * @param value - Given value to set in code editor.
     * @param additionalParameter - Additional arguments will be forwarded to
     * the overridden method invocation.
     * @returns What inherited method returns.
     */
    export(value: any, ...additionalParameter: Array<any>): any;
    /**
     * Triggers disabled state changes.
     * @param isDisabled - Indicates disabled state.
     * @returns Nothing.
     */
    setDisabledState(isDisabled: boolean): void;
}
export declare class CodeEditorComponent extends AbstractEditorComponent implements AfterViewInit {
    static modesLoad: {
        [key: string]: Promise<void> | true;
    };
    blur: EventEmitter<any>;
    configuration: PlainObject;
    contentSetterMethodName: string;
    factoryName: string;
    focus: EventEmitter<any>;
    /**
     * Initializes the code mirror resource loading if not available yet.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector: Injector);
    /**
     * Initializes the code editor element.
     * @returns Nothing.
     */
    ngAfterViewInit(): Promise<void>;
    /**
     * Triggers disabled state changes.
     * @param isDisabled - Indicates disabled state.
     * @returns Nothing.
     */
    setDisabledState(isDisabled: boolean): void;
}
export declare class TextEditorComponent extends AbstractEditorComponent implements AfterViewInit, OnDestroy {
    configuration: PlainObject;
    factoryName: string;
    click: EventEmitter<any>;
    dblclick: EventEmitter<any>;
    MouseDown: EventEmitter<any>;
    MouseUp: EventEmitter<any>;
    MouseMove: EventEmitter<any>;
    MouseOver: EventEmitter<any>;
    MouseOut: EventEmitter<any>;
    MouseEnter: EventEmitter<any>;
    MouseLeave: EventEmitter<any>;
    KeyDown: EventEmitter<any>;
    KeyPress: EventEmitter<any>;
    KeyUp: EventEmitter<any>;
    ContextMenu: EventEmitter<any>;
    Paste: EventEmitter<any>;
    Focus: EventEmitter<any>;
    Blur: EventEmitter<any>;
    BeforeSetContent: EventEmitter<any>;
    SetContent: EventEmitter<any>;
    GetContent: EventEmitter<any>;
    PreProcess: EventEmitter<any>;
    PostProcess: EventEmitter<any>;
    NodeChange: EventEmitter<any>;
    Undo: EventEmitter<any>;
    Redo: EventEmitter<any>;
    Change: EventEmitter<any>;
    Dirty: EventEmitter<any>;
    Remove: EventEmitter<any>;
    ExecCommand: EventEmitter<any>;
    PastePreProcess: EventEmitter<any>;
    PastePostProcess: EventEmitter<any>;
    /**
     * Initializes the tinymce resource loading if not available yet.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector: Injector);
    /**
     * Initializes the text editor element.
     * @returns Nothing.
     */
    ngAfterViewInit(): Promise<void>;
    /**
     * Frees all tinymce allocated data from memory if there exists some.
     * @returns Nothing.
     */
    ngOnDestroy(): void;
    /**
     * Triggers disabled state changes.
     * @param isDisabled - Indicates disabled state.
     * @returns Nothing.
     */
    setDisabledState(isDisabled: boolean): void;
}
export declare class InputComponent extends AbstractInputComponent {
    activeEditor: boolean | null;
    editor: PlainObject | string | null;
    labels: {
        [key: string]: string;
    };
    maximumNumberOfRows: string;
    minimumNumberOfRows: string;
    rows: string;
    selectableEditor: boolean | null;
    type: string;
}
export declare class SimpleInputComponent extends AbstractNativeInputComponent {
    labels: {
        [key: string]: string;
    };
    type: string;
    /**
     * Delegates injected injector service instance to the super constructor.
     * @param injector - Injected injector service instance.
     * @returns Nothing.
     */
    constructor(injector: Injector);
}
export declare class TextareaComponent extends AbstractNativeInputComponent implements OnInit {
    static defaultEditorOptions: {
        code: PlainObject;
        markup: PlainObject;
    };
    activeEditor: boolean | null;
    editor: PlainObject | string | null;
    editorType: string;
    maximumNumberOfRows: string;
    minimumNumberOfRows: string;
    rows: string;
    selectableEditor: boolean | null;
    /**
     * Forwards injected service instances to the abstract input component's
     * constructor.
     * @param initialData - Injected initial data service instance.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(initialData: InitialDataService, injector: Injector);
    /**
     * Triggers after input values have been resolved.
     * @param additionalParameter - Additional arguments will be forwarded to
     * the overridden method invocation.
     * @returns Nothing.
     */
    ngOnInit(...additionalParameter: Array<any>): void;
}
export declare class FileInputComponent implements AfterViewInit, OnChanges {
    static imageMimeTypeRegularExpression: RegExp;
    static textMimeTypeRegularExpression: RegExp;
    static videoMimeTypeRegularExpression: RegExp;
    abstractResolver: AbstractResolver;
    attachmentTypeName: string;
    autoMessages: boolean;
    configuration: PlainObject;
    delete: EventEmitter<string>;
    deleteButtonText: string;
    deletedName: string;
    downloadButtonText: string;
    editableName: boolean;
    file: any;
    fileChange: EventEmitter<any>;
    filter: Array<{
        source?: {
            contentType?: string;
            name?: string;
        };
        target: {
            contentType?: string;
            name?: string;
        };
    }>;
    headerText: string | null;
    idName: string;
    input: ElementRef;
    resetNameText: string;
    saveNameText: string;
    showDeclarationText: string;
    typeName: string;
    internalName: string;
    keyCode: {
        [key: string]: number;
    };
    mapNameToField: string | Array<string> | null;
    maximumSizeText: string;
    minimumSizeText: string;
    model: {
        id?: string;
        [key: string]: any;
    };
    modelChange: EventEmitter<{
        id?: string;
        [key: string]: any;
    }>;
    name: string | null;
    namePatternText: string;
    newButtonText: string;
    noFileText: string;
    noPreviewText: string;
    oneDocumentPerFileMode: boolean;
    requiredText: string;
    revision: string | null;
    revisionName: string;
    showValidationErrorMessages: boolean;
    synchronizeImmediately: boolean | PlainObject;
    template: Function;
    typePatternText: string;
    _data: DataService;
    _domSanitizer: DomSanitizer;
    _extendObject: Function;
    _getFilenameByPrefix: Function;
    _idIsObject: boolean;
    _representObject: Function;
    _stringFormat: Function;
    _prefixMatch: boolean;
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
    constructor(abstractResolver: AbstractResolver, data: DataService, domSanitizer: DomSanitizer, extendObjectPipe: ExtendObjectPipe, getFilenameByPrefixPipe: GetFilenameByPrefixPipe, initialData: InitialDataService, representObjectPipe: RepresentObjectPipe, stringFormatPipe: StringFormatPipe, stringTemplatePipe: StringTemplatePipe, utility: UtilityService);
    /**
     * Determines which type of file we have to present.
     * @returns Nothing.
     */
    determinePresentationType(): void;
    /**
     * Initializes file upload handler.
     * @param changes - Holds informations about changed bound properties.
     * @returns Nothing.
     */
    ngOnChanges(changes: SimpleChanges): Promise<void>;
    /**
     * Initializes current file input field. Adds needed event observer.
     * @returns Nothing.
     */
    ngAfterViewInit(): void;
    /**
     * Removes current file.
     * @returns A Promise which will be resolved after current file will be
     * removed.
     */
    remove(): Promise<void>;
    /**
     * Renames current file.
     * @param name - New name to rename current file to.
     * @returns A Promise which will be resolved after current file will be
     * renamed.
     */
    rename(name: string): Promise<void>;
    /**
     * Retrieves current attachment with given document id and converts them
     * into a base 64 string which will be set as file source.
     * @param id - Document id which should hold needed attachment.
     * @param options - Options to use for the attachment retrieving.
     * @returns A promise which resolves if requested attachment was retrieved.
     */
    retrieveAttachment(id: any, options?: PlainObject): Promise<void>;
    /**
     * Updates given current file into database (replaces if old name is
     * given).
     * @param oldName - Name of saved file to update or replace.
     * @returns A Promise which will be resolved after current file will be
     * synchronized.
     */
    update(oldName?: string): Promise<void>;
}
export declare class PaginationComponent {
    itemsPerPage: number;
    page: number;
    pageChange: EventEmitter<number>;
    pageRangeLimit: number;
    total: number;
    _changeDetectorReference: ChangeDetectorRef;
    _makeRange: Function;
    /**
     * Sets needed services as property values.
     * @param changeDetectorReference - Model dirty checking service.
     * @param makeRangePipe - Saves the make range pipe instance.
     * @returns Nothing.
     */
    constructor(changeDetectorReference: ChangeDetectorRef, makeRangePipe: ArrayMakeRangePipe);
    /**
     * Is called whenever a page change should be performed.
     * @param event - The responsible event.
     * @param newPage - New page number to change to.
     * @returns Nothing.
     */
    change(event: Event, newPage: number): void;
    /**
     * Determines the highest page number.
     * @returns The determines page number.
     */
    readonly lastPage: number;
    /**
     * Retrieves the next or last (if last is current) page.
     * @returns The new determined page number.
     */
    readonly nextPage: number;
    /**
     * Determines the number of pages to show.
     * @returns A list of page numbers.
     */
    readonly pagesRange: Array<number>;
    /**
     * Determines the previous or first (if first is current) page.
     * @returns The previous determined page number.
     */
    readonly previousPage: number;
}
export declare class Module {
}
export default Module;
