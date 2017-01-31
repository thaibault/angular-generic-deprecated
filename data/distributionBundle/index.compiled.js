'use strict';
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/router"), require("@angular/forms"), require("@angular/material"), require("@angular/platform-browser"), require("clientnode"), require("pouchdb-find/dist/pouchdb.find.min.js"), require("pouchdb-validation"), require("pouchdb/dist/pouchdb.min.js"), require("rxjs"), require("rxjs/Observable"));
	else if(typeof define === 'function' && define.amd)
		define("index", ["@angular/core", "@angular/router", "@angular/forms", "@angular/material", "@angular/platform-browser", "clientnode", "pouchdb-find/dist/pouchdb.find.min.js", "pouchdb-validation", "pouchdb/dist/pouchdb.min.js", "rxjs", "rxjs/Observable"], factory);
	else if(typeof exports === 'object')
		exports["index"] = factory(require("@angular/core"), require("@angular/router"), require("@angular/forms"), require("@angular/material"), require("@angular/platform-browser"), require("clientnode"), require("pouchdb-find/dist/pouchdb.find.min.js"), require("pouchdb-validation"), require("pouchdb/dist/pouchdb.min.js"), require("rxjs"), require("rxjs/Observable"));
	else
		root["index"] = factory(root["@angular/core"], root["@angular/router"], root["@angular/forms"], root["@angular/material"], root["@angular/platform-browser"], root["clientnode"], root["pouchdb-find/dist/pouchdb.find.min.js"], root["pouchdb-validation"], root["pouchdb/dist/pouchdb.min.js"], root["rxjs"], root["rxjs/Observable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_14__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module angularGeneric *//* !
    region header
    [Project page](http://torben.website/angularGeneric)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/// region imports
exports.__esModule=true;exports.default=exports.GenericPaginationComponent=exports.GenericFileInputComponent=exports.GenericTextareaComponent=exports.GenericInputComponent=exports.AbstractItemsComponent=exports.AbstractInputComponent=exports.AbstractResolver=exports.GenericDataScopeService=exports.GenericDataService=exports.GenericCanDeactivateRouteLeaveGuard=exports.GenericNumberPercentPipe=exports.GenericStringSliceMatchPipe=exports.GenericStringStartsWithPipe=exports.GenericStringShowIfPatternMatchesPipe=exports.GenericStringReplacePipe=exports.GenericStringMatchPipe=exports.GenericStringHasTimeSuffixPipe=exports.GenericStringEndsWithPipe=exports.GenericTypePipe=exports.GenericMapPipe=exports.GenericGetFilenameByPrefixPipe=exports.GenericIsDefinedPipe=exports.GenericExtractRawDataPipe=exports.GenericInitialDataService=exports.GenericToolsService=undefined;var _dec,_class,_dec2,_class3,_dec3,_class5,_dec4,_class6,_dec5,_class7,_dec6,_class8,_dec7,_class10,_dec8,_class11,_dec9,_class12,_dec10,_class13,_dec11,_class14,_dec12,_class15,_dec13,_class16,_dec14,_class17,_dec15,_class18,_dec16,_class19,_dec17,_class20,_class21,_temp,_dec18,_class22,_dec19,_dec20,_dec21,_desc,_value,_class25,_descriptor,_descriptor2,_descriptor3,_dec22,_dec23,_class28,_desc2,_value2,_class29,_descriptor4,_dec24,_class31,_dec25,_dec26,_dec27,_dec28,_dec29,_dec30,_dec31,_dec32,_dec33,_dec34,_class32,_desc3,_value3,_class33,_descriptor5,_descriptor6,_descriptor7,_descriptor8,_descriptor9,_descriptor10,_descriptor11,_descriptor12,_descriptor13,_class34,_temp2,_dec35,_dec36,_dec37,_dec38,_dec39,_dec40,_class35,_desc4,_value4,_class36,_descriptor14,_descriptor15,_descriptor16,_descriptor17,_descriptor18,_dec41,_class38;var _clientnode=__webpack_require__(8);var _clientnode2=_interopRequireDefault(_clientnode);var _core=__webpack_require__(0);var _forms=__webpack_require__(5);var _material=__webpack_require__(6);var _platformBrowser=__webpack_require__(7);var _router=__webpack_require__(1);var _pouchdb=__webpack_require__(11);var _pouchdb2=_interopRequireDefault(_pouchdb);var _pouchdbFind=__webpack_require__(9);var _pouchdbFind2=_interopRequireDefault(_pouchdbFind);var _pouchdbValidation=__webpack_require__(10);var _pouchdbValidation2=_interopRequireDefault(_pouchdbValidation);var _rxjs=__webpack_require__(12);var _Observable=__webpack_require__(14);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _initDefineProp(target,property,descriptor,context){if(!descriptor)return;Object.defineProperty(target,property,{enumerable:descriptor.enumerable,configurable:descriptor.configurable,writable:descriptor.writable,value:descriptor.initializer?descriptor.initializer.call(context):void 0})}function _applyDecoratedDescriptor(target,property,decorators,descriptor,context){var desc={};Object['ke'+'ys'](descriptor).forEach(function(key){desc[key]=descriptor[key]});desc.enumerable=!!desc.enumerable;desc.configurable=!!desc.configurable;if('value'in desc||desc.initializer){desc.writable=true}desc=decorators.slice().reverse().reduce(function(desc,decorator){return decorator(target,property,desc)||desc},desc);if(context&&desc.initializer!==void 0){desc.value=desc.initializer?desc.initializer.call(context):void 0;desc.initializer=undefined}if(desc.initializer===void 0){Object['define'+'Property'](target,property,desc);desc=null}return desc}function _initializerWarningHelper(descriptor,context){throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.')}function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{return Promise.resolve(value).then(function(value){step('next',value)},function(err){step('throw',err)})}}return step('next')})}}// NOTE: Only needed for debugging this file.
try{module.require('source-map-support/register')}catch(error){}// endregion
// region basic services
// IgnoreTypeCheck
/**
 * Injectable angular service for the tools class.
 * @property $ - Holds an instance of a generic dom abstraction layer like
 * jquery.
 * @property globalContext - Hold a reference to the environment specific
 * global scope.
 * @property tools - Holds a reference to the wrapped tools class.
 */let GenericToolsService=exports.GenericToolsService=(_dec=(0,_core.Injectable)(),_dec(_class=class GenericToolsService{constructor(){this.$=_clientnode.$;this.globalContext=_clientnode.globalContext;this.tools=_clientnode2.default}})||_class);// IgnoreTypeCheck
/**
 * Serves initial data provided via a global variable.
 */let GenericInitialDataService=exports.GenericInitialDataService=(_dec2=(0,_core.Injectable)(),_dec2(_class3=class GenericInitialDataService{/**
     * Sets all properties of given initial data as properties to this
     * initializing instance.
     * @param tools - Saves the generic tools service.
     * @returns Nothing.
     */constructor(tools){this.configuration=this.configuration;for(const key in tools.globalContext.genericInitialData)if(tools.globalContext.genericInitialData.hasOwnProperty(key))// IgnoreTypeCheck
this[key]=tools.globalContext.genericInitialData[key]}})||_class3);// endregion
// region pipes
// / region forwarded methods
Reflect.defineMetadata('design:paramtypes',[GenericToolsService],GenericInitialDataService);const reference={};for(const name of Object.getOwnPropertyNames(_clientnode2.default))if(!['caller','arguments'].includes(name))// IgnoreTypeCheck
reference[name]=_clientnode2.default[name];for(const configuration of[{invert:['array'],methodGroups:{string:['encodeURIComponent'],number:['pow']},reference:window},{invert:['array'],methodGroups:{'':['convertCircularObjectToJSON','equals','extendObject','representObject','sort'],array:'*',number:'*',string:'*'},reference:reference}])for(const methodTypePrefix in configuration.methodGroups)if(configuration.methodGroups.hasOwnProperty(methodTypePrefix)){let methodNames=[];if(configuration.methodGroups[methodTypePrefix]==='*'){for(const name in configuration.reference)if(configuration.reference.hasOwnProperty(name)&&configuration.reference.hasOwnProperty(name)&&new RegExp(`^${methodTypePrefix}[A-Z0-9]`).test(name))methodNames.push(name)}else methodNames=configuration.methodGroups[methodTypePrefix];for(const methodName of methodNames){const pipeName=_clientnode2.default.stringCapitalize(methodName);module.exports[`Generic${pipeName}Pipe`]=class{/**
                     * Performs the concrete conversion logic.
                     * @param parameter - Saves all generic parameter to
                     * forward it for triggering the underlying tools utility.
                     * @returns Whatever the underlying tools function returns.
                     */transform(...parameter){return _core.ReflectiveInjector.resolveAndCreate([GenericToolsService]).get(GenericToolsService).tools[methodName](...parameter)}};(0,_core.Pipe)({name:`generic${pipeName}`})(module.exports[`Generic${pipeName}Pipe`]);if(configuration.invert.includes(methodTypePrefix)){module.exports[`generic${pipeName}InvertedPipe`]=class{/**
                         * Performs the concrete conversion logic.
                         * @param parameter - Saves all generic parameter to
                         * forward it for triggering the underlying tools
                         * utility.
                         * @returns Whatever the underlying tools function
                         * returns.
                         */transform(...parameter){const tools=_core.ReflectiveInjector.resolveAndCreate([GenericToolsService]).get(GenericToolsService).tools;// IgnoreTypeCheck
return tools.invertArrayFilter(tools[methodName])(...parameter)}};(0,_core.Pipe)({name:`generic${pipeName}Inverted`})(module.exports[`generic${pipeName}InvertedPipe`])}}}// / endregion
// / region object
// IgnoreTypeCheck
/**
 * Removes all meta data from documents.
 */let GenericExtractRawDataPipe/* implements PipeTransform*/=exports.GenericExtractRawDataPipe=(_dec3=(0,_core.Pipe)({name:'genericExtractRawData'}),_dec3(_class5=class GenericExtractRawDataPipe{/**
     * Implements attachment changes or removes.
     * @param newDocument - Document to slice meta data from.
     * @param oldAttachments - Old document to take into account.
     * @param fileTypeReplacement - Indicates weather file type replacements
     * and removes should be taken into account.
     * @param untouchedAttachments - List of file names which doesn't exist in
     * given new document.
     * @returns The sliced attachment version of given document.
     */_handleAttachmentChanges(newDocument,oldAttachments,fileTypeReplacement,untouchedAttachments){for(const type in oldAttachments)if(oldAttachments.hasOwnProperty(type)&&![undefined,null].includes(oldAttachments[type].value)){if(newDocument._attachments){if(newDocument._attachments.hasOwnProperty(oldAttachments[type].value.name))continue}else if(!untouchedAttachments.includes(oldAttachments[type].value.name)){newDocument._attachments={[oldAttachments[type].value.name]:{data:null}};continue}if(fileTypeReplacement)for(const fileName in newDocument._attachments)if(newDocument._attachments.hasOwnProperty(fileName)&&new RegExp(type).test(fileName))newDocument._attachments[oldAttachments[type].value.name]={data:null}}return newDocument}/**
     * Implements the meta data removing of given document.
     * @param newDocument - Document to slice meta data from.
     * @param oldDocument - Optionally existing old document to take into
     * account.
     * @param fileTypeReplacement - Indicates weather file type replacements
     * and removes should be taken into account.
     * @returns The copies sliced version of given document.
     */transform(newDocument,oldDocument,fileTypeReplacement=true){const result={};const untouchedAttachments=[];for(const name in newDocument)if(newDocument.hasOwnProperty(name)&&![undefined,null,''].includes(newDocument[name])&&name!=='_revisions')if(name==='_attachments'){result[name]={};let empty=true;for(const fileName in newDocument[name])if(newDocument[name].hasOwnProperty(fileName))if(newDocument[name][fileName].hasOwnProperty('data')&&!(oldDocument&&oldDocument.hasOwnProperty(name)&&oldDocument[name].hasOwnProperty(fileName)&&newDocument[name][fileName].data===oldDocument[name][fileName].data&&(oldDocument[name][fileName].content_type||'application/octet-stream')===(newDocument[name][fileName].content_type||'application/octet-stream'))){result[name][fileName]={content_type:newDocument[name][fileName].content_type||'application/octet-stream',data:newDocument[name][fileName].data};empty=false}else untouchedAttachments.push(fileName);if(empty)delete result[name]}else result[name]=newDocument[name];// Handle attachment removes or replacements.
if(oldDocument&&oldDocument.hasOwnProperty('_attachments')&&oldDocument._attachments)this._handleAttachmentChanges(result,oldDocument._attachments,fileTypeReplacement,untouchedAttachments);return result}})||_class5);// IgnoreTypeCheck
/**
 * Checks if given reference is defined.
 */let GenericIsDefinedPipe/* implements PipeTransform*/=exports.GenericIsDefinedPipe=(_dec4=(0,_core.Pipe)({name:'genericIsDefined'}),_dec4(_class6=class GenericIsDefinedPipe{/**
     * Performs the actual comparison.
     * @param object - Object to compare against "undefined" or "null".
     * @param nullIsUndefined - Indicates weather "null" should be handles as
     * "undefined".
     * @returns The comparison result.
     */transform(object,nullIsUndefined=false){return!(object===undefined||nullIsUndefined&&object===null)}})||_class6);// IgnoreTypeCheck
/**
 * Retrieves a matching filename by given filename prefix.
 */let GenericGetFilenameByPrefixPipe/* implements PipeTransform*/=exports.GenericGetFilenameByPrefixPipe=(_dec5=(0,_core.Pipe)({name:'genericGetFilenameByPrefix'}),_dec5(_class7=class GenericGetFilenameByPrefixPipe{/**
     * Performs the actual transformations process.
     * @param attachments - Documents attachments object to determine file with
     * matching file name prefix.
     * @param prefix - Prefix or nothing to search for. If nothing given first
     * file name will be returned.
     * @returns Matching file name or null if no file matches.
     */transform(attachments,prefix){if(prefix){for(const name in attachments)if(attachments.hasOwnProperty(name)&&name.startsWith(prefix))return name}else{const keys=Object.keys(attachments);if(keys.length)return keys[0]}return null}})||_class7);// IgnoreTypeCheck
/**
 * Returns a copy of given object where each item was processed through given
 * function.
 * @property injector - Pipe specific injector to determine pipe dynamically at
 * runtime.
 */let GenericMapPipe/* implements PipeTransform*/=exports.GenericMapPipe=(_dec6=(0,_core.Pipe)({name:'genericMap'}),_dec6(_class8=class GenericMapPipe{/**
     * Injects the injector and saves as instance property.
     * @param injector - Pipe injector service instance.
     * @returns Nothing.
     */constructor(injector){this.injector=this.injector;this.injector=injector}/**
     * Performs the actual transformation.
     * @param object - Iterable item where given pipe should be applied to each
     * value.
     * @param pipeName - Pipe to apply to each value.
     * @param additionalArguments - All additional arguments will be forwarded
     * to given pipe (after the actual value).
     * @returns Given transform copied object.
     */transform(object,pipeName,...additionalArguments){const pipe=this.injector.get(pipeName);if(Array.isArray(object)){const result=[];for(const item of object)result.push(pipe.transform(item,...additionalArguments));return result}const result={};for(const key in object)if(object.hasOwnProperty(key))result[key]=pipe.transform.transform(object[key],key,...additionalArguments);return result}})||_class8);// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[_core.Injector],GenericMapPipe);/**
 * Determines type of given object.
 */let GenericTypePipe/* implements PipeTransform*/=exports.GenericTypePipe=(_dec7=(0,_core.Pipe)({name:'genericType'}),_dec7(_class10=class GenericTypePipe{/**
     * Returns type of given object.
     * @param object - Object to determine type of.
     * @returns Type name.
     */transform(object){return typeof object}})||_class10);// / endregion
// region string
// IgnoreTypeCheck
/**
 * Forwards javaScript's native "stringEndsWith" method.
 */let GenericStringEndsWithPipe/* implements PipeTransform*/=exports.GenericStringEndsWithPipe=(_dec8=(0,_core.Pipe)({name:'genericStringEndsWith'}),_dec8(_class11=class GenericStringEndsWithPipe{/**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param needle - Suffix to search for.
     * @returns The boolean result.
     */transform(string,needle){return typeof string==='string'&&typeof needle==='string'&&string.endsWith(needle)}})||_class11);// IgnoreTypeCheck
/**
 * Determines if given string has a time indicating suffix.
 */let GenericStringHasTimeSuffixPipe/* implements PipeTransform*/=exports.GenericStringHasTimeSuffixPipe=(_dec9=(0,_core.Pipe)({name:'genericStringHasTimeSuffix'}),_dec9(_class12=class GenericStringHasTimeSuffixPipe{/**
     * Performs the actual string suffix check.
     * @param string - To search in.
     * @returns The boolean result.
     */transform(string){if(typeof string!=='string')return false;return string.endsWith('Date')||string.endsWith('Time')||string==='timestamp'}})||_class12);// IgnoreTypeCheck
/**
 * Tests if given pattern matches against given subject.
 */let GenericStringMatchPipe/* implements PipeTransform*/=exports.GenericStringMatchPipe=(_dec10=(0,_core.Pipe)({name:'genericStringMatch'}),_dec10(_class13=class GenericStringMatchPipe{/**
     * Performs the actual matching.
     * @param pattern - String or regular expression to search for.
     * @param subject - String to search in.
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns Boolean test result.
     */transform(pattern,subject,modifier=''){// IgnoreTypeCheck
return new RegExp(pattern,modifier).test(subject)}})||_class13);// IgnoreTypeCheck
/**
 * Provides javascript's native string replacement method as pipe.
 */let GenericStringReplacePipe/* implements PipeTransform*/=exports.GenericStringReplacePipe=(_dec11=(0,_core.Pipe)({name:'genericStringReplace'}),_dec11(_class14=class GenericStringReplacePipe{/**
     * Performs the actual replacement.
     * @param string - String to replace content.
     * @param search - String or regular expression to us as matcher.
     * @param replacement - String to replace with matching parts in given
     * "string".
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns A new string with replacements done.
     */transform(string,search,replacement='',modifier='g'){// IgnoreTypeCheck
return string.replace(new RegExp(search,modifier),replacement)}})||_class14);// IgnoreTypeCheck
/**
 * Returns given string if it matches given pattern.
 */let GenericStringShowIfPatternMatchesPipe/* implements PipeTransform*/=exports.GenericStringShowIfPatternMatchesPipe=(_dec12=(0,_core.Pipe)({name:'genericStringShowIfPatternMatches'}),_dec12(_class15=class GenericStringShowIfPatternMatchesPipe{/**
     * Performs the actual matching.
     * @param string - String to replace content.
     * @param pattern - String or regular expression to us as matcher.
     * @param invert - Indicates weather given string should be shown if given
     * pattern matches or not.
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns Given string if matching indicator was successful.
     */transform(string,pattern,invert=false,modifier=''){// IgnoreTypeCheck
let indicator=new RegExp(pattern,modifier).test(string);if(invert)indicator=!indicator;return indicator?string:''}})||_class15);// IgnoreTypeCheck
/**
 * Forwards javascript's native "stringStartsWith" method.
 */let GenericStringStartsWithPipe/* implements PipeTransform*/=exports.GenericStringStartsWithPipe=(_dec13=(0,_core.Pipe)({name:'genericStringStartsWith'}),_dec13(_class16=class GenericStringStartsWithPipe{/**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param needle - Prefix to search for.
     * @returns The boolean result.
     */transform(string,needle){return typeof string==='string'&&typeof needle==='string'&&string.startsWith(needle)}})||_class16);// IgnoreTypeCheck
/**
 * Returns a matched part of given subject with given pattern. Default is the
 * whole (zero) matched part.
 */let GenericStringSliceMatchPipe/* implements PipeTransform*/=exports.GenericStringSliceMatchPipe=(_dec14=(0,_core.Pipe)({name:'genericStringSliceMatch'}),_dec14(_class17=class GenericStringSliceMatchPipe{/**
     * Performs the actual matching.
     * @param subject - String to search in.
     * @param pattern - String or regular expression to search for.
     * @param index - Match group to extract.
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns Matching group.
     */transform(subject,pattern,index=0,modifier=''){if(typeof subject==='string'){const match=subject.match(new RegExp(// IgnoreTypeCheck
pattern,modifier));if(match&&typeof match[index]==='string')return match[index]}return''}})||_class17);// / endregion
// / region number
// IgnoreTypeCheck
/**
 * Returns part in percent of all.
 */let GenericNumberPercentPipe/* implements PipeTransform*/=exports.GenericNumberPercentPipe=(_dec15=(0,_core.Pipe)({name:'genericNumberPercent'}),_dec15(_class18=class GenericNumberPercentPipe{/**
     * Performs the actual calculation.
     * @param part - Part to divide "all" through.
     * @param all - Reference value to calculate part of.
     * @returns The calculated part.
     */transform(part,all){return part/all*100}})||_class18);// / endregion
// endregion
const GenericArrayMakeRangePipe=module.exports.GenericArrayMakeRangePipe;const GenericStringEscapeRegularExpressionsPipe=module.exports.GenericStringEscapeRegularExpressionsPipe;const GenericExtendObjectPipe=module.exports.GenericExtendObjectPipe;const GenericRepresentObjectPipe=module.exports.GenericRepresentObjectPipe;const GenericStringFormatPipe=module.exports.GenericStringFormatPipe;// region services
// IgnoreTypeCheck
/**
 * A generic guard which prevents from switching to route if its component's
 * "canDeactivate()" method returns "false", a promise or observable wrapping
 * a boolean.
 */let GenericCanDeactivateRouteLeaveGuard/* implements CanDeactivate<Object>*/=exports.GenericCanDeactivateRouteLeaveGuard=(_dec16=(0,_core.Injectable)(),_dec16(_class19=class GenericCanDeactivateRouteLeaveGuard{/**
     * Calls the component specific "canDeactivate()" method.
     * @param component - Component instance of currently selected route.
     * @returns A boolean, promise or observable which wraps the indicator.
     */canDeactivate(component){return'canDeactivate'in component?component.canDeactivate():true}})||_class19);// IgnoreTypeCheck
let/**
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
 */GenericDataService=exports.GenericDataService=(_dec17=(0,_core.Injectable)(),_dec17(_class20=(_temp=_class21=class GenericDataService{/**
     * Creates the database constructor applies all plugins instantiates
     * the connection instance and registers all middlewares.
     * @param extendObject - Injected extend object pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param stringFormat - Injected string format pipe instance.
     * @returns Nothing.
     */constructor(extendObject,initialData,stringFormat){this.connection=this.connection;this.configuration=this.configuration;this.database=this.database;this.extendObject=this.extendObject;this.middlewares={post:{},pre:{}};this.stringFormat=this.stringFormat;this.synchronisation=this.synchronisation;this.database=_pouchdb2.default.plugin(_pouchdbFind2.default).plugin(_pouchdbValidation2.default);this.extendObject=extendObject.transform.bind(extendObject);this.configuration=initialData.configuration;this.stringFormat=stringFormat.transform.bind(stringFormat);for(const plugin of this.configuration.database.plugins||[])this.database=this.database.plugin(plugin);this.initialize()}/**
     * Initializes database connection and synchronisation if needed.
     * @returns Nothing.
     */initialize(){var _this=this;const type=this.configuration.database.local?'local':this.configuration.database.url;this.connection=new this.database(this.stringFormat(type,'')+(/^[a-z]+:\/\/.+$/g.test(type)?`/${this.configuration.name||'generic'}`:''),this.extendObject(true,{skip_setup:true},this.configuration.database.options||{}));for(const name in this.connection)if(this.constructor.wrappableMethodNames.includes(name)&&typeof this.connection[name]==='function'){const method=this.connection[name];this.connection[name]=function(...parameter){for(const methodName of[name,'_all'])if(_this.middlewares.pre.hasOwnProperty(methodName))for(const interceptor of _this.middlewares.pre[methodName])parameter=interceptor.apply(_this.connection,parameter.concat(methodName==='_all'?name:[]));let result=method.apply(_this.connection,parameter);for(const methodName of[name,'_all'])if(_this.middlewares.post.hasOwnProperty(methodName))for(const interceptor of _this.middlewares.post[methodName])result=interceptor.call(_this.connection,result,...parameter.concat(methodName==='_all'?name:[]));return result}}this.connection.installValidationMethods();if(this.configuration.database.local)this.synchronisation=_pouchdb2.default.sync(this.stringFormat(this.configuration.database.url,`${this.configuration.database.user.name}:`+`${this.configuration.database.user.password}@`)+`/${this.configuration.name}`,'local',{live:true,retry:true}).on('change',function(info){return console.info('change',info)}).on('paused',function(error){return console.info('paused',error)}).on('active',function(){return console.info('active')}).on('denied',function(error){return console.warn('denied',error)}).on('complete',function(info){return console.info('complete',info)}).on('error',function(error){return console.error('error',error)})}/**
     * Creates a database index.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb-find's "createIndex()" method.
     * @returns Whatever pouchdb-find's "createIndex()" method returns.
     */createIndex(...parameter){return this.connection.createIndex(...parameter)}/**
     * Removes current active database.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "destroy()" method.
     * @returns Whatever pouchdb's "destroy()" method returns.
     */destroy(...parameter){if(this.synchronisation)this.synchronisation.cancel();const result=this.connection.destroy(...parameter);this.middlewares={post:{},pre:{}};return result}/**
     * Retrieves a database resource determined by given selector.
     * @param selector - Selector object in mango.
     * @param options - Options to use during selecting items.
     * @returns A promise with resulting array of retrieved resources.
     */find(selector,options={}){var _this2=this;return _asyncToGenerator(function*(){return(yield _this2.connection.find(_this2.extendObject(true,{selector},options))).docs})()}/**
     * Retrieves a resource by id.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "get()" method.
     * @returns Whatever pouchdb's "get()" method returns.
     */get(...parameter){return this.connection.get(...parameter)}/**
     * Creates or updates given data.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "put()" method.
     * @returns Whatever pouchdb's "put()" method returns.
     */put(...parameter){return this.connection.put(...parameter)}/**
     * Registers a new middleware.
     * @param names - Event names to intercept.
     * @param callback - Callback function to trigger when specified event
     * happens.
     * @param type - Specifies weather callback should be triggered before or
     * after specified event has happened.
     * @returns A cancel function which will deregister given middleware.
     */register(names,callback,type='post'){var _this3=this;if(!Array.isArray(names))names=[names];for(const name of names){if(!this.middlewares[type].hasOwnProperty(name))this.middlewares[type][name]=[];this.middlewares[type][name].push(callback)}return function(){for(const name of names){const index=_this3.middlewares[type][name].indexOf(callback);if(index!==-1)_this3.middlewares[type][name].splice(index,1);if(_this3.middlewares[type][name].length===0)delete _this3.middlewares[type][name]}}}/**
     * Removes specified entities in database.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "remove()" method.
     * @returns Whatever pouchdb's "remove()" method return.
     */remove(...parameter){return this.connection.remove(...parameter)}},_class21.wrappableMethodNames=['allDocs','bulkDocs','bulkGet','changes','close','compact','compactDocument','createIndex','deleteIndexs','destroy','find','get','getAttachment','getIndexes','info','post','put','putAttachment','query','remove','removeAttachment','sync'],_temp))||_class20);// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[GenericExtendObjectPipe,GenericInitialDataService,GenericStringFormatPipe],GenericDataService);/**
 * Auto generates a components scope environment for a specified model.
 * @property configuration - Holds the configuration service instance.
 * @property data - Holds the data exchange service instance.
 * @property extendObject - Holds the extend object's pipe transformation
 * method.
 * @property tools - Holds the tools class from the tools service.
 */let GenericDataScopeService=exports.GenericDataScopeService=(_dec18=(0,_core.Injectable)(),_dec18(_class22=class GenericDataScopeService{/**
     * Saves alle needed services as property values.
     * @param data - Injected data service instance.
     * @param extendObject - Injected extend object pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param tools - Injected tools service instance.
     * @returns Nothing.
     */constructor(data,extendObject,initialData,tools){this.configuration=this.configuration;this.data=this.data;this.extendObject=this.extendObject;this.tools=this.tools;this.configuration=initialData.configuration;this.data=data;this.extendObject=extendObject.transform.bind(extendObject);this.tools=tools.tools}/**
     * Retrieves needed data for given scope.
     * @param scope - Scope to use to determine which data is needed.
     * @returns Resolved data.
     */get(scope){const result={};for(const key in scope)if(scope.hasOwnProperty(key)&&!key.startsWith('_')&&typeof scope[key]==='object'&&scope[key]!==null&&'hasOwnProperty'in scope&&scope[key].hasOwnProperty('value'))result[key]=scope[key].value;if(scope.hasOwnProperty('_attachments')&&scope._attachments)for(const key in scope._attachments)if(scope._attachments.hasOwnProperty(key)&&typeof scope._attachments[key]==='object'&&scope._attachments[key]!==null&&'hasOwnProperty'in scope._attachments&&scope._attachments[key].hasOwnProperty('value')&&scope._attachments[key].value){if(!result._attachments)result._attachments={};result._attachments[scope._attachments[key].value.name]=scope._attachments[key].value}for(const name of['_id','_rev','-type'])if(scope.hasOwnProperty(name))result[name]=scope[name];return result}/**
     * Generates a scope object for given model with given property names and
     * property value mapping data.
     * @param modelName - Name of model to generate scope for.
     * @param propertyNames - List of property names to generate meta data in
     * scope for. If "null" is given all properties in given model will be
     * taken into account.
     * @param data - Data to use for given properties.
     * @returns The generated scope object.
     */generate(modelName,propertyNames=null,data={}){const modelSpecification=this.configuration.modelConfiguration.models[modelName];for(const name in modelSpecification)if(modelSpecification.hasOwnProperty(name))if(name==='_attachments'){for(const fileName in modelSpecification[name])if(modelSpecification[name].hasOwnProperty(fileName))modelSpecification[name][fileName]=this.extendObject(true,this.tools.copyLimitedRecursively(this.configuration.modelConfiguration.default.propertySpecification),modelSpecification[name][fileName])}else modelSpecification[name]=this.extendObject(true,this.tools.copyLimitedRecursively(this.configuration.modelConfiguration.default.propertySpecification),modelSpecification[name]);if(!propertyNames)propertyNames=Object.keys(modelSpecification);const result={};for(const name of propertyNames){if(modelSpecification.hasOwnProperty(name))result[name]=this.tools.copyLimitedRecursively(modelSpecification[name]);else result[name]={};if(name==='_attachments'){for(const type in modelSpecification[name])if(modelSpecification[name].hasOwnProperty(type)){result[name][type].name=type;result[name][type].value=null;if(Object.keys(data).length===0)for(const hookType of['onCreateExpression','onCreateExecution'])if(result[name][type].hasOwnProperty(hookType)&&result[name][type][hookType]){result[name][type].value=new Function('newDocument','oldDocument','userContext','securitySettings','name','models','modelConfiguration','serialize','modelName','model','propertySpecification',(hookType.endsWith('Expression')?'return ':'')+result[name][type][hookType])(data,null,{},{},type,this.configuration.modelConfiguration.models,modelSpecification,function(object){return JSON.stringify(object,null,4)},modelName,modelSpecification,result[name][type]);if(result[name][type].hasOwnProperty('value')&&result[name][type].value===undefined)delete result[name][type].value}let fileFound=false;if(data.hasOwnProperty(name)&&![undefined,null].includes(data[name]))for(const fileName in data[name])if(result[name].hasOwnProperty(type)&&new RegExp(type).test(fileName)){fileFound=true;result[name][type].value=data[name][fileName];result[name][type].value.name=fileName;break}if(!fileFound&&result[name][type].hasOwnProperty('default')&&![undefined,null].includes(result[name][type].default))result[name][type].value=result[name][type].default}}else if(!name.startsWith('_')){result[name].name=name;result[name].value=null;if(Object.keys(data).length===0)for(const type of['onCreateExpression','onCreateExecution'])if(result[name].hasOwnProperty(type)&&result[name][type])result[name].value=new Function('newDocument','oldDocument','userContext','securitySettings','name','models','modelConfiguration','serialize','modelName','model','propertySpecification',(type.endsWith('Expression')?'return ':'')+result[name][type])(data,null,{},{},name,this.configuration.modelConfiguration.models,this.configuration.modelConfiguration,function(object){return JSON.stringify(object,null,4)},modelName,modelSpecification,result[name]);if(data.hasOwnProperty(name)&&![undefined,null].includes(data[name]))result[name].value=data[name];else if(result[name].hasOwnProperty('default')&&![undefined,null].includes(result[name].default))result[name].value=result[name].default;else if(result[name].hasOwnProperty('selection')&&Array.isArray(result[name].selection)&&result[name].selection.length)result[name].value=result[name].selection[0];if(!(result[name].value instanceof Date)&&(name.endsWith('Time')||name.endsWith('Date')))result[name].value=new Date(result[name].value)}}for(const name of['_id','_rev','-type'])if(data.hasOwnProperty(name))result[name]=data[name];else if(name==='-type')result[name]=modelName;result._metaData={submitted:false};return result}/**
     * Useful to sets route specific data in a resolver.
     * @param modelName - Name of model to retrieve data from.
     * @param scope - Scope or array of scopes to extend and set retrieved
     * values in.
     * @param id - ID of an entity to retrieve data from.
     * @param propertyNames - List of property names to retrieve data from.
     * @param options - To use for retrieving needed data from data service.
     * @returns A promise wrapping requested data.
     */set(modelName,scope=null,id=null,propertyNames=null,options={}){var _this4=this;return _asyncToGenerator(function*(){if(propertyNames&&!options.hasOwnProperty('fields'))options.fields=propertyNames;let data={};if(id){const result=yield _this4.data.find({'-type':modelName,_id:id},options);if(result.length===0)throw new Error(`Document with given id "${id}" isn't available.`);data=result[0]}const result=_this4.generate(modelName,propertyNames,data);if(scope){if(!Array.isArray(scope))scope=[scope];for(const object of scope)_this4.extendObject(true,object,result);return result}return result})()}})||_class22);// / region abstract
/**
 * Helper class to extend from to have some basic methods to deal with database
 * entities.
 * @property _type - Model name to handle /should be overwritten in concrete
 * implementations.
 * @property data - Holds currently retrieved data.
 * @property escapeRegularExpressions - Holds the escape regular expressions's
 * pipe transformation method.
 * @property extendObject - Holds the extend object's pipe transformation
 * method.
 * @property models - Saves a mapping from all available model names to their
 * specification.
 * @property relevantKeys - Saves a list of relevant key names to take into
 * account during resolving.
 */Reflect.defineMetadata('design:paramtypes',[GenericDataService,GenericExtendObjectPipe,GenericInitialDataService,GenericToolsService],GenericDataScopeService);let AbstractResolver/* implements Resolve<PlainObject>*/=exports.AbstractResolver=class AbstractResolver{/**
     * Sets all needed injected services as instance properties.
     * @param data - Injected data service instance.
     * @param escapeRegularExpressions - Injected escape regular expression
     * pipe instance.
     * @param extendObject - Injected extend object pipe instance.
     * @param initialData - Injected initial data service instance.
     * @returns Nothing.
     */constructor(data,escapeRegularExpressions,extendObject,initialData){this._type='Item';this.data=this.data;this.escapeRegularExpressions=this.escapeRegularExpressions;this.extendObject=this.extendObject;this.models=this.models;this.relevantKeys=null;this.data=data;this.escapeRegularExpressions=escapeRegularExpressions.transform.bind(escapeRegularExpressions);this.extendObject=extendObject.transform.bind(extendObject);this.models=initialData.configuration.modelConfiguration.models}/**
     * List items which matches given filter criteria.
     * @param sort - List of items.
     * @param page - Page to show.
     * @param limit - Maximal number of entities to retrieve.
     * @param searchTerm - String query to search for.
     * @param additionalSelectors - Custom filter criteria.
     * @returns A promise wrapping retrieved data.
     */list(sort=[{_id:'asc'}],page=1,limit=10,searchTerm='',additionalSelectors={}){var _this5=this;if(!this.relevantKeys)this.relevantKeys=Object.keys(this.models[this._type]).filter(function(name){return!name.startsWith('_')&&[undefined,'string'].includes(_this5.models[_this5._type][name].type)});const selector={'-type':this._type};if(searchTerm||Object.keys(additionalSelectors).length){if(sort.length)selector[Object.keys(sort[0])[0]]={$gt:null};selector.$or=[];for(const name of this.relevantKeys)selector.$or.push({[name]:{$regex:searchTerm}})}/*
            NOTE: We can't use "limit" here since we want to provide total data
            set size for pagination.
        */const options={skip:(page-1)*limit};if(options.skip===0)delete options.skip;if(sort.length)options.sort=[{'-type':'asc'}].concat(sort);return this.data.find(this.extendObject(true,selector,additionalSelectors),options)}/* eslint-disable no-unused-vars *//**
     * Implements the resolver method which converts route informations into
     * "list()" method parameter and forward their result as result in an
     * observable.
     * @param route - Current route informations.
     * @param state - Current state informations.
     * @returns Observable with data filtered by current route informations.
     */resolve(route,state){/* eslint-enable no-unused-vars */let searchTerm='';if('searchTerm'in route.params){const term=decodeURIComponent(route.params.searchTerm);if(term.startsWith('exact-'))searchTerm=this.escapeRegularExpressions(term.substring('exact-'.length));else if(term.startsWith('regex-')){searchTerm=term.substring('regex-'.length);try{new RegExp(searchTerm)}catch(error){searchTerm=''}}}let sort=[];if('sort'in route.params)sort=route.params.sort.split(',').map(function(name){const lastIndex=name.lastIndexOf('-');let type='asc';if(lastIndex!==-1){name=name.substring(0,lastIndex);type=name.substring(lastIndex+1)||type}return{[name]:type}});return _Observable.Observable.fromPromise(this.list(sort,parseInt(route.params.page||1),parseInt(route.params.limit||10),searchTerm))}};// / endregion
// endregion
// region components
// / region abstract
/**
 * Generic input component.
 * @property extendObject - Holds the extend object's pipe transformation
 * @property model - Holds model informations including actual value and
 * metadata.
 * @property modelChange - Model event emitter emitting events on each model
 * change.
 * @property showValidationErrorMessages - Indicates weather validation errors
 * should be suppressed or be shown automatically. Useful to prevent error
 * component from showing error messages before the user has submit the form.
 */Reflect.defineMetadata('design:paramtypes',[GenericDataService,GenericStringEscapeRegularExpressionsPipe,GenericExtendObjectPipe,GenericInitialDataService],AbstractResolver);let AbstractInputComponent=exports.AbstractInputComponent=(_dec19=(0,_core.Input)(),_dec20=(0,_core.Output)(),_dec21=(0,_core.Input)(),(_class25=class AbstractInputComponent{/**
     * Sets needed services as property values.
     * @param extendObject - Injected extend object pipe instance.
     * @returns Nothing.
     */constructor(extendObject){this._extendObject=this._extendObject;_initDefineProp(this,'model',_descriptor,this);_initDefineProp(this,'modelChange',_descriptor2,this);_initDefineProp(this,'showValidationErrorMessages',_descriptor3,this);this._extendObject=extendObject.transform.bind(extendObject)}/**
     * Triggers after input values have been resolved.
     * @returns Nothing.
     */ngOnInit(){this._extendObject(this.model,this._extendObject({disabled:false,maximum:Infinity,minimum:this.model.type==='string'?0:-Infinity,nullable:true,regularExpressionPattern:'.*',state:{},type:'string'},this.model))}/**
     * Triggers when ever a change to current model happens inside this
     * component.
     * @param state - Saves the current model state.
     * @returns Nothing.
     */onChange(state){this.model.state=state;this.modelChange.emit(this.model)}},(_descriptor=_applyDecoratedDescriptor(_class25.prototype,'model',[_dec19],{enumerable:true,initializer:function initializer(){return{}}}),_descriptor2=_applyDecoratedDescriptor(_class25.prototype,'modelChange',[_dec20],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor3=_applyDecoratedDescriptor(_class25.prototype,'showValidationErrorMessages',[_dec21],{enumerable:true,initializer:function initializer(){return false}})),_class25));/**
 * A generic abstract component to edit, search, navigate and filter a list of
 * entities.
 * @property _itemPath - Routing path to a specific item.
 * @property _itemsPath - Routing path to the items overview.
 * @property _route - Current route configuration.
 * @property _router - Router service instance.
 * @property _tools - Tools service instance property.
 * @property items - Current list of visible items.
 * @property limit - Maximal number of visible items.
 * @property page - Current page number of each item list part.
 * @property regularExpression - Indicator weather searching via regular
 * expressions should be used.
 * @property searchTerm - Search string to filter visible item list.
 * @property searchTermStream - Search term stream which debounces and caches
 * search results.
 * @property selectedItems - List of currently selected items for group editing
 * purposes.
 * @property sort - Sorting informations.
 */Reflect.defineMetadata('design:paramtypes',[GenericExtendObjectPipe],AbstractInputComponent);let AbstractItemsComponent=exports.AbstractItemsComponent=class AbstractItemsComponent{/**
     * Saves injected service instances as instance properties.
     * @param route - Current route configuration.
     * @param router - Injected router service instance.
     * @param tools - Injected tools service instance.
     * @returns Nothing.
     */constructor(route,router,tools){var _this6=this;this._itemPath='admin/item';this._itemsPath='admin/items';this._route=this._route;this._router=this._router;this._tools=this._tools;this.items=this.items;this.limit=this.limit;this.page=this.page;this.regularExpression=false;this.searchTerm='';this.searchTermStream=new _rxjs.Subject;this.selectedItems=new Set;this.sort={_id:'asc'};this._route=route;this._router=router;this._tools=tools.tools;this._route.params.subscribe(function(data){_this6.page=parseInt(data.page);_this6.limit=parseInt(data.limit);const match=/(regex|exact)-(.*)/.exec(data.searchTerm);if(match){_this6.regularExpression=match[1]==='regex';_this6.searchTerm=match[2]}});this._route.data.subscribe(function(data){_this6.limit=Math.max(1,_this6.limit||1);const total=data.items.length+(Math.max(1,_this6.page||1)-1)*_this6.limit;if(data.items.length>_this6.limit)data.items.splice(_this6.limit,data.items.length-_this6.limit);_this6.items=data.items;_this6.items.total=total;if(_this6.applyPageConstraints())_this6._tools.timeout(function(){return _this6.update()})});this.searchTermStream.debounceTime(200).distinctUntilChanged().map(function(){_this6.page=1;return _this6.update()}).subscribe()}/**
     * Updates constraints between limit, page number and number of total
     * available items.
     * @returns Nothing.
     */applyPageConstraints(){const oldPage=this.page;const oldLimit=this.limit;this.limit=Math.max(1,this.limit||1);this.page=Math.max(1,Math.min(this.page,Math.ceil(this.items.total/this.limit)));return this.page!==oldPage||this.limit!==oldLimit}/* eslint-disable no-unused-vars *//**
     * Deletes item which has same id provided by the id property through given
     * event object.
     * @param event - Event object which triggers action.
     * @returns Nothing.
     */delete(event){this.update(true)}/* eslint-enable no-unused-vars *//**
     * Removes all items currently selected and clear current selection.
     * @returns Nothing.
     */deleteSelectedItems(){this.update(true)}/**
     * Switches section to item which has given id.
     * @param itemID - ID of item to switch to.
     * @returns Nothing.
     */goToItem(itemID){this._router.navigate([this._itemPath,itemID])}/**
     * Applies current filter criteria to current visible item set.
     * @param reload - Indicates weather a simple reload should be made because
     * a changed list of available items is expected for example.
     * @returns A boolean indicating weather route change was successful.
     */update(reload=false){this.applyPageConstraints();if(reload)/*
                NOTE: Will be normalised to "1" after route reload (hack to
                enforce route reloading).
            */this.page=0;let sort='';for(const name in this.sort)if(this.sort.hasOwnProperty(name))sort+=`${sort?',':''}${name}-${this.sort[name]}`;return this._router.navigate([this._itemsPath,sort,this.page,this.limit,`${this.regularExpression?'regex':'exact'}-`+encodeURIComponent(this.searchTerm)])}/**
     * Applies current search term to the search term stream.
     * @returns Nothing.
     */updateSearch(){this.searchTermStream.next(this.searchTerm)}};// / endregion
// // region text
/* eslint-disable max-len */Reflect.defineMetadata('design:paramtypes',[_router.ActivatedRoute,_router.Router,GenericToolsService],AbstractItemsComponent);const propertyInputContent=`
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
`;const mdInputContent=`
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
`;// IgnoreTypeCheck
/* eslint-enable max-len *//**
 * A generic form input component with validation, labeling and info
 * description support.
 * @property type - Optionally defines an input type explicitly.
 */let GenericInputComponent=exports.GenericInputComponent=(_dec22=(0,_core.Component)({selector:'generic-input',template:`
        <md-input
            [max]="model.type === 'number' ? model.maximum : null"
            [min]="model.type === 'number' ? model.minimum : null"
            [type]="type || model.name.startsWith('password') ? 'password' : model.type === 'string' ? 'text' : 'number'"
            ${propertyInputContent}
        >${mdInputContent}</md-input>`}),_dec23=(0,_core.Input)(),_dec22(_class28=(_class29=class GenericInputComponent extends AbstractInputComponent{/**
     * Forwards injected service instances to the abstract input component's
     * constructor.
     * @param extendObject - Injected extend object pipe instance.
     * @returns Nothing.
     */constructor(extendObject){super(extendObject);_initDefineProp(this,'type',_descriptor4,this)}},(_descriptor4=_applyDecoratedDescriptor(_class29.prototype,'type',[_dec23],{enumerable:true,initializer:function initializer(){return this.type}})),_class29))||_class28);// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[GenericExtendObjectPipe],GenericInputComponent);/**
 * A generic form textarea component with validation, labeling and info
 * description support.
 */let GenericTextareaComponent=exports.GenericTextareaComponent=(_dec24=(0,_core.Component)({selector:'generic-textarea',template:`
        <md-textarea ${propertyInputContent}>${mdInputContent}</md-textarea>`}),_dec24(_class31=class GenericTextareaComponent extends AbstractInputComponent{/**
     * Forwards injected service instances to the abstract input component's
     * constructor.
     * @param extendObject - Injected extend object pipe instance.
     * @returns Nothing.
     */constructor(extendObject){super(extendObject)}})||_class31);// // endregion
// / region file input
/* eslint-disable max-len */// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[GenericExtendObjectPipe],GenericTextareaComponent);/* eslint-enable max-len *//**
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
 * @property _prefixMatch - Holds the prefix match pipe instance's transform
 * method.
 * @property delete - Event emitter which triggers its handler when current
 * file should be removed.
 * @property file - Holds the current selected file object if present.
 * @property fileChange - Event emitter emitting when file changes happen.
 * @property input - Virtual file input dom node.
 * @property internalName - Technical regular expression style file type.
 * @property mapNameToField - Indicates weather current file name should be
 * mapped to a specific model property.
 * @property model - File property specification.
 * @property modelChange -
 * @property name - Name of currently active file.
 * @property showValidationErrorMessages - Indicates weather validation errors
 * should be displayed. Useful to hide error messages until user tries to
 * submit a form.
 * @property synchronizeImmediately - Indicates weather file upload should be
 * done immediately after a file was selected (or synchronously with other
 * model data).
 */let GenericFileInputComponent/* implements OnInit, AfterViewInit*/=exports.GenericFileInputComponent=(_dec25=(0,_core.Component)({selector:'generic-file-input',template:`
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
    `}),_dec26=(0,_core.Output)(),_dec27=(0,_core.Output)(),_dec28=(0,_core.ViewChild)('input'),_dec29=(0,_core.Input)(),_dec30=(0,_core.Input)(),_dec31=(0,_core.Output)(),_dec32=(0,_core.Input)(),_dec33=(0,_core.Input)(),_dec34=(0,_core.Input)(),_dec25(_class32=(_class33=(_temp2=_class34=class GenericFileInputComponent{/**
     * Sets needed services as property values.
     * @param data - Injected data service instance.
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @param extendObject - Injected extend object pipe instance.
     * @param getFilenameByPrefix - Saves the file name by prefix retriever
     * pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param representObject - Saves the object to string representation pipe
     * instance.
     * @returns Nothing.
     */constructor(data,domSanitizer,extendObject,getFilenameByPrefix,initialData,representObject){this._configuration=this._configuration;this._data=this._data;this._domSanitizer=this._domSanitizer;this._extendObject=this._extendObject;this._getFilenameByPrefix=this._getFilenameByPrefix;this._representObject=this._representObject;this._prefixMatch=false;_initDefineProp(this,'delete',_descriptor5,this);this.file=null;_initDefineProp(this,'fileChange',_descriptor6,this);_initDefineProp(this,'input',_descriptor7,this);this.internalName=this.internalName;_initDefineProp(this,'mapNameToField',_descriptor8,this);_initDefineProp(this,'model',_descriptor9,this);_initDefineProp(this,'modelChange',_descriptor10,this);_initDefineProp(this,'name',_descriptor11,this);_initDefineProp(this,'showValidationErrorMessages',_descriptor12,this);_initDefineProp(this,'synchronizeImmediately',_descriptor13,this);this._configuration=initialData.configuration;this._data=data;this._domSanitizer=domSanitizer;this._extendObject=extendObject.transform.bind(extendObject);this._getFilenameByPrefix=getFilenameByPrefix.transform.bind(getFilenameByPrefix);this._representObject=representObject.transform.bind(representObject)}/**
     * Initializes file upload handler.
     * @returns Nothing.
     */ngOnInit(){if(this.mapNameToField&&!Array.isArray(this.mapNameToField))this.mapNameToField=[this.mapNameToField];const name=this._getFilenameByPrefix(this.model._attachments,this.name);if(this.name&&name!==this.name)this._prefixMatch=true;this.internalName=name;this.file=this.model._attachments[this.internalName].value;this.model._attachments[this.internalName].state={};if(this.file)this.file.descriptionName=this.name;else if(!this.model._attachments[this.internalName].nullable)this.model._attachments[this.internalName].state.errors={required:true};if(this.file){this.file.hash=`#${this.file.digest}`;this.file.source=this._domSanitizer.bypassSecurityTrustResourceUrl(this._configuration.database.url+`/${this._configuration.name||'generic'}/`+`${this.model._id}/${this.file.name}${this.file.hash}`)}this.determinePresentationType();this.fileChange.emit(this.file)}/**
     * Initializes current file input field. Adds needed event observer.
     * @returns Nothing.
     */ngAfterViewInit(){var _this7=this;this.input.nativeElement.addEventListener('change',_asyncToGenerator(function*(){if(_this7.input.nativeElement.files.length<1)return;_this7.model._attachments[_this7.internalName].state={};const oldFileName=_this7.file?_this7.file.name:null;_this7.file={descriptionName:_this7.name,name:_this7.input.nativeElement.files[0].name};if(!_this7.name)_this7.name=_this7.file.name;else if(_this7._prefixMatch){const lastIndex=_this7.file.name.lastIndexOf('.');if([0,-1].includes(lastIndex))_this7.file.name=_this7.name;else _this7.file.name=_this7.name+_this7.file.name.substring(lastIndex)}// IgnoreTypeCheck
_this7.file.data=_this7.input.nativeElement.files[0];// IgnoreTypeCheck
_this7.file.content_type=_this7.file.data.type||'text/plain';// IgnoreTypeCheck
_this7.file.length=_this7.file.data.size;_this7.model._attachments[_this7.internalName].value=_this7.file;if(!new RegExp(_this7.internalName).test(_this7.file.name))_this7.model._attachments[_this7.internalName].state.errors={name:true};if(!([undefined,null].includes(_this7.model._attachments[_this7.internalName].contentTypeRegularExpressionPattern)||new RegExp(_this7.model._attachments[_this7.internalName].contentTypeRegularExpressionPattern).test(_this7.file.content_type))){if(_this7.model._attachments[_this7.internalName].state.errors)_this7.model._attachments[_this7.internalName].state.errors.contentType=true;else _this7.model._attachments[_this7.internalName].state.errors={contentType:true};_this7.determinePresentationType()}if(_this7.synchronizeImmediately&&!_this7.model._attachments[_this7.internalName].state.errors){let result;const newData={'-type':_this7.model['-type'],_id:_this7.model._id,_attachments:{[_this7.file.name]:{content_type:_this7.file.content_type,data:_this7.file.data}}};if(_this7.synchronizeImmediately!==true)_this7._extendObject(true,newData,_this7.synchronizeImmediately);// NOTE: We want to replace old medium.
if(oldFileName&&oldFileName!==_this7.file.name)newData._attachments[oldFileName]={data:null};if(![undefined,null].includes(_this7.model._rev))newData._rev=_this7.model._rev;if(_this7.mapNameToField){if(_this7.model._id&&_this7.mapNameToField.includes('_id')){newData._deleted=true;try{result=yield _this7._data.put(newData)}catch(error){_this7.model._attachments[_this7.internalName].state.errors={database:'message'in error?error.message:_this7._representObject(error)};return}delete newData._deleted;delete newData._rev}for(const name of _this7.mapNameToField){newData[name]=_this7.file.name;_this7.model[name]=_this7.file.name}}try{result=yield _this7._data.put(newData)}catch(error){_this7.model._attachments[_this7.internalName].state.errors={database:'message'in error?error.message:_this7._representObject(error)};return}_this7.file.revision=_this7.model._rev=result.rev;_this7.file.hash=`#${result.rev}`;_this7.file.source=_this7._domSanitizer.bypassSecurityTrustResourceUrl(_this7._configuration.database.url+`/${_this7._configuration.name}/${_this7.model._id}/`+`${_this7.file.name}${_this7.file.hash}`);_this7.determinePresentationType();_this7.fileChange.emit(_this7.file);_this7.modelChange.emit(_this7.model)}else{_this7.determinePresentationType();const fileReader=new FileReader;fileReader.onload=function(event){_this7.file.source=_this7._domSanitizer.bypassSecurityTrustResourceUrl(event.target.result);if(_this7.mapNameToField)for(const name of _this7.mapNameToField)_this7.model[name]=_this7.file.name;_this7.fileChange.emit(_this7.file);_this7.modelChange.emit(_this7.model)};fileReader.readAsDataURL(_this7.file.data)}}))}/**
     * Determines which type of file we have to present.
     * @returns Nothing.
     */determinePresentationType(){if(this.file&&this.file.content_type&&this.constructor.textMimeTypeRegularExpression.test(this.file.content_type))this.file.type='text';else if(this.file&&this.file.content_type&&this.constructor.imageMimeTypeRegularExpression.test(this.file.content_type))this.file.type='image';else if(this.file&&this.file.content_type&&this.constructor.videoMimeTypeRegularExpression.test(this.file.content_type))this.file.type='video';else this.file.type='binary'}/**
     * Removes current file.
     * @returns A Promise which will be resolved after current file will be
     * removed.
     */remove(){var _this8=this;return _asyncToGenerator(function*(){if(_this8.synchronizeImmediately&&_this8.file){let result;const update={'-type':_this8.model['-type'],_id:_this8.model._id,_rev:_this8.model._rev,_attachments:{[_this8.file.name]:{content_type:'text/plain',data:null}}};if(_this8.mapNameToField&&_this8.mapNameToField.includes('_id'))update._deleted=true;try{result=yield _this8._data.put(update)}catch(error){_this8.model._attachments[_this8.internalName].state.errors={database:_this8._representObject(error)};return}if(_this8.mapNameToField&&_this8.mapNameToField.includes('_id'))_this8.delete.emit(result);else _this8.model._rev=result.rev}_this8.model._attachments[_this8.internalName].state.errors=_this8.model._attachments[_this8.internalName].value=_this8.file=null;if(!_this8.model._attachments[_this8.internalName].nullable)_this8.model._attachments[_this8.internalName].state.errors={required:true};_this8.fileChange.emit(_this8.file);_this8.modelChange.emit(_this8.model)})()}},_class34.imageMimeTypeRegularExpression=new RegExp('^image/(?:p?jpe?g|png|svg(?:\\+xml)?|vnd\\.microsoft\\.icon|gif|'+'tiff|webp|vnd\\.wap\\.wbmp|x-(?:icon|jng|ms-bmp))$'),_class34.textMimeTypeRegularExpression=new RegExp('^(?:application/xml)|(?:text/(?:plain|x-ndpb[wy]html|(?:x-)?csv))$'),_class34.videoMimeTypeRegularExpression=new RegExp('^video/(?:(?:x-)?(?:x-)?webm|3gpp|mp2t|mp4|mpeg|quicktime|'+'(?:x-)?flv|(?:x-)?m4v|(?:x-)mng|x-ms-as|x-ms-wmv|x-msvideo)|'+'(?:application/(?:x-)?shockwave-flash)$'),_temp2),(_descriptor5=_applyDecoratedDescriptor(_class33.prototype,'delete',[_dec26],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor6=_applyDecoratedDescriptor(_class33.prototype,'fileChange',[_dec27],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor7=_applyDecoratedDescriptor(_class33.prototype,'input',[_dec28],{enumerable:true,initializer:function initializer(){return this.input}}),_descriptor8=_applyDecoratedDescriptor(_class33.prototype,'mapNameToField',[_dec29],{enumerable:true,initializer:function initializer(){return null}}),_descriptor9=_applyDecoratedDescriptor(_class33.prototype,'model',[_dec30],{enumerable:true,initializer:function initializer(){return{_attachments:[],id:null}}}),_descriptor10=_applyDecoratedDescriptor(_class33.prototype,'modelChange',[_dec31],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor11=_applyDecoratedDescriptor(_class33.prototype,'name',[_dec32],{enumerable:true,initializer:function initializer(){return null}}),_descriptor12=_applyDecoratedDescriptor(_class33.prototype,'showValidationErrorMessages',[_dec33],{enumerable:true,initializer:function initializer(){return false}}),_descriptor13=_applyDecoratedDescriptor(_class33.prototype,'synchronizeImmediately',[_dec34],{enumerable:true,initializer:function initializer(){return false}})),_class33))||_class32);// / endregion
// / region pagination
/* eslint-disable max-len */// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[GenericDataService,_platformBrowser.DomSanitizer,GenericExtendObjectPipe,GenericGetFilenameByPrefixPipe,GenericInitialDataService,GenericRepresentObjectPipe],GenericFileInputComponent);/* eslint-enable max-len *//**
 * Provides a generic pagination component.
 * @property _makeRange - Saves the make range pipe transformation function.
 * @property itemsPerPage - Number of items to show per page as maximum.
 * @property page - Contains currently selected page number.
 * @property pageChange - Event emitter to fire on each page change event.
 * @property pageRangeLimit - Number of concrete page links to show.
 * @property total - Contains total number of pages.
 */let GenericPaginationComponent=exports.GenericPaginationComponent=(_dec35=(0,_core.Component)({selector:'generic-pagination',template:`
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
    `}),_dec36=(0,_core.Input)(),_dec37=(0,_core.Input)(),_dec38=(0,_core.Output)(),_dec39=(0,_core.Input)(),_dec40=(0,_core.Input)(),_dec35(_class35=(_class36=class GenericPaginationComponent{/**
     * Sets needed services as property values.
     * @param makeRange - Saves the make range pipe instance.
     * @returns Nothing.
     */constructor(makeRange){this._makeRange=this._makeRange;_initDefineProp(this,'itemsPerPage',_descriptor14,this);_initDefineProp(this,'page',_descriptor15,this);_initDefineProp(this,'pageChange',_descriptor16,this);_initDefineProp(this,'pageRangeLimit',_descriptor17,this);_initDefineProp(this,'total',_descriptor18,this);this._makeRange=makeRange.transform.bind(makeRange)}/**
     * Is called whenever a page change should be performed.
     * @param event - The responsible event.
     * @param newPage - New page number to change to.
     * @returns Nothing.
     */change(event,newPage){event.preventDefault();this.page=newPage;this.pageChange.emit(this.page)}/**
     * Determines the highest page number.
     * @returns The determines page number.
     */get lastPage(){return Math.ceil(this.total/this.itemsPerPage)}/**
     * Retrieves the next or last (if last is current) page.
     * @returns The new determined page number.
     */get nextPage(){return Math.min(this.page+1,this.lastPage)}/**
     * Determines the number of pages to show.
     * @returns A list of page numbers.
     */get pagesRange(){if(this.page-this.pageRangeLimit<1){const start=1;const startRest=this.pageRangeLimit-(this.page-start);const end=Math.min(this.lastPage,this.page+this.pageRangeLimit+startRest);return this._makeRange([start,end])}const end=Math.min(this.lastPage,this.page+this.pageRangeLimit);const endRest=this.pageRangeLimit-(end-this.page);const start=Math.max(1,this.page-this.pageRangeLimit-endRest);return this._makeRange([start,end])}/**
     * Determines the previous or first (if first is current) page.
     * @returns The previous determined page number.
     */get previousPage(){return Math.max(1,this.page-1)}},(_descriptor14=_applyDecoratedDescriptor(_class36.prototype,'itemsPerPage',[_dec36],{enumerable:true,initializer:function initializer(){return 20}}),_descriptor15=_applyDecoratedDescriptor(_class36.prototype,'page',[_dec37],{enumerable:true,initializer:function initializer(){return 1}}),_descriptor16=_applyDecoratedDescriptor(_class36.prototype,'pageChange',[_dec38],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor17=_applyDecoratedDescriptor(_class36.prototype,'pageRangeLimit',[_dec39],{enumerable:true,initializer:function initializer(){return 4}}),_descriptor18=_applyDecoratedDescriptor(_class36.prototype,'total',[_dec40],{enumerable:true,initializer:function initializer(){return 0}})),_class36))||_class35);// / endregion
// endregion
// region modules
Reflect.defineMetadata('design:paramtypes',[GenericArrayMakeRangePipe],GenericPaginationComponent);const declarations=Object.keys(module.exports).filter(function(name){return!name.startsWith('Abstract')&&(name.endsWith('Component')||name.endsWith('Pipe'))}).map(function(name){return module.exports[name]});const providers=Object.keys(module.exports).filter(function(name){return!name.startsWith('Abstract')&&(name.endsWith('Resolver')||name.endsWith('Pipe')||name.endsWith('Guard')||name.endsWith('Service'))}).map(function(name){return module.exports[name]});const modules=[_platformBrowser.BrowserModule,_forms.FormsModule,_material.MaterialModule.forRoot()];// IgnoreTypeCheck
/**
 * Represents the importable angular module.
 */let GenericModule=(_dec41=(0,_core.NgModule)({declarations,exports:declarations,imports:modules,providers}),_dec41(_class38=class GenericModule{})||_class38);// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
exports.default=GenericModule;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ })
/******/ ]);
});