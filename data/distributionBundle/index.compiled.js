'use strict';
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/router"), require("rxjs"), require("clientnode"), require("@angular/common"), require("@angular/forms"), require("@angular/material"), require("@angular/platform-browser"), require("pouchdb/dist/pouchdb.min.js"), require("pouchdb-find"), require("pouchdb-validation"), require("rxjs/Observable"), require("rxjs/Subscription"), require("@angular/animations"));
	else if(typeof define === 'function' && define.amd)
		define("index", ["@angular/core", "@angular/router", "rxjs", "clientnode", "@angular/common", "@angular/forms", "@angular/material", "@angular/platform-browser", "pouchdb/dist/pouchdb.min.js", "pouchdb-find", "pouchdb-validation", "rxjs/Observable", "rxjs/Subscription", "@angular/animations"], factory);
	else if(typeof exports === 'object')
		exports["index"] = factory(require("@angular/core"), require("@angular/router"), require("rxjs"), require("clientnode"), require("@angular/common"), require("@angular/forms"), require("@angular/material"), require("@angular/platform-browser"), require("pouchdb/dist/pouchdb.min.js"), require("pouchdb-find"), require("pouchdb-validation"), require("rxjs/Observable"), require("rxjs/Subscription"), require("@angular/animations"));
	else
		root["index"] = factory(root["@angular/core"], root["@angular/router"], root["rxjs"], root["clientnode"], root["@angular/common"], root["@angular/forms"], root["@angular/material"], root["@angular/platform-browser"], root["pouchdb/dist/pouchdb.min.js"], root["pouchdb-find"], root["pouchdb-validation"], root["rxjs/Observable"], root["rxjs/Subscription"], root["@angular/animations"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_17__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
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

    This library written by torben sickert stand under a creative commons
    naming 3.0 unported license.
    see http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/// region imports
Object.defineProperty(exports,'__esModule',{value:true});exports.Module=exports.PaginationComponent=exports.FileInputComponent=exports.TextareaComponent=exports.SimpleInputComponent=exports.InputComponent=exports.TextEditorComponent=exports.CodeEditorComponent=exports.AbstractEditorComponent=exports.IntervalsInputComponent=exports.IntervalInputComponent=exports.DateTimeValueAccessor=undefined;exports.SliderDirective=exports.DateDirective=exports.AbstractValueAccessor=exports.AbstractItemsComponent=exports.AbstractLiveDataComponent=exports.AbstractNativeInputComponent=exports.AbstractInputComponent=exports.AbstractResolver=exports.DataScopeService=exports.DataService=exports.AlertService=exports.ConfirmComponent=exports.CanDeactivateRouteLeaveGuard=exports.NumberPercentPipe=exports.StringTemplatePipe=exports.StringStartsWithPipe=exports.StringSliceMatchPipe=exports.StringShowIfPatternMatchesPipe=exports.StringSafeURLPipe=exports.StringSafeStylePipe=exports.StringSafeScriptPipe=exports.StringSafeResourceURLPipe=exports.StringSafeHTMLPipe=exports.StringReplacePipe=exports.StringMaximumLengthPipe=exports.StringMatchPipe=exports.StringHasTimeSuffixPipe=exports.StringEndsWithPipe=exports.ArrayDependentConcatPipe=exports.TypePipe=exports.ReversePipe=exports.ObjectKeysPipe=exports.MapPipe=exports.LimitToPipe=exports.IsDefinedPipe=exports.ExtractRawDataPipe=exports.ExtractDataPipe=exports.AttachmentWithPrefixExistsPipe=exports.GetFilenameByPrefixPipe=exports.AttachmentsAreEqualPipe=exports.NumberRoundPipe=exports.NumberIsNotANumberPipe=exports.NumberGetUTCTimestampPipe=exports.StringNormalizeDomNodeSelectorPipe=exports.StringDecodeHTMLEntitiesPipe=exports.StringRepresentPhoneNumberPipe=exports.StringParseEncodedObjectPipe=exports.StringNormalizePhoneNumberPipe=exports.StringMD5Pipe=exports.StringMarkPipe=exports.StringFindNormalizedMatchRangePipe=exports.StringLowerCasePipe=exports.StringGetRegularExpressionValidatedPipe=exports.StringFormatPipe=exports.StringDelimitedToCamelCasePipe=exports.StringCapitalizePipe=exports.StringCamelCaseToDelimitedPipe=exports.StringCompressStyleValuePipe=exports.StringRepresentURLPipe=exports.StringNormalizeURLPipe=exports.StringIsInternalURLPipe=exports.StringGetURLVariablePipe=exports.StringGetProtocolNamePipe=exports.StringGetPortNumberPipe=exports.StringGetDomainNamePipe=exports.StringHasPathPrefixPipe=exports.StringAddSeparatorToPathPipe=exports.StringEncodeURIComponentPipe=exports.StringConvertToValidVariableNamePipe=exports.StringEscapeRegularExpressionsPipe=exports.ArraySortTopologicalPipe=exports.ArrayRemovePipe=exports.ArrayAppendAddPipe=exports.ArraySumUpPropertyPipe=exports.ArrayMakeRangePipe=exports.ArrayIntersectPipe=exports.ArrayExtractIfPropertyMatchesPipe=exports.ArrayExtractIfPropertyExistsPipe=exports.ArrayExtractIfMatchesPipe=exports.ArrayExtractPipe=exports.ArrayDeleteEmptyItemsPipe=exports.ArrayAggregatePropertyIfEqualPipe=exports.ArrayUniquePipe=exports.ArrayMakePipe=exports.ArrayMergePipe=exports.SortPipe=exports.RepresentObjectPipe=exports.ExtendObjectPipe=exports.EqualsPipe=exports.ConvertCircularObjectToJSONPipe=exports.AbstractInvertedToolsPipe=exports.AbstractToolsPipe=exports.determineInjector=exports.InitialDataService=exports.UtilityService=exports.TINYMCE_DEFAULT_OPTIONS=exports.CODE_MIRROR_DEFAULT_OPTIONS=exports.SYMBOL=exports.currentInstanceToSearchInjectorFor=exports.LAST_KNOWN_DATA=undefined;var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{return get(parent,property,receiver)}}else if('value'in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}};var _typeof=typeof Symbol==='function'&&typeof Symbol.iterator==='symbol'?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==='function'&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _dec,_class,_class2,_temp,_dec2,_class3,_class4,_temp2,_dec3,_class6,_dec4,_class8,_dec5,_class10,_dec6,_class12,_dec7,_class14,_dec8,_class16,_dec9,_class18,_dec10,_class20,_dec11,_class22,_dec12,_class24,_dec13,_class26,_dec14,_class28,_dec15,_class30,_dec16,_class32,_dec17,_class34,_dec18,_class36,_dec19,_class38,_dec20,_class40,_dec21,_class42,_dec22,_class44,_dec23,_class46,_dec24,_class48,_dec25,_class50,_dec26,_class52,_dec27,_class54,_dec28,_class56,_dec29,_class58,_dec30,_class60,_dec31,_class62,_dec32,_class64,_dec33,_class66,_dec34,_class68,_dec35,_class70,_dec36,_class72,_dec37,_class74,_dec38,_class76,_dec39,_class78,_dec40,_class80,_dec41,_class82,_dec42,_class84,_dec43,_class86,_dec44,_class88,_dec45,_class90,_dec46,_class92,_dec47,_class94,_dec48,_class96,_dec49,_class98,_dec50,_class100,_dec51,_class102,_dec52,_class104,_dec53,_class106,_dec54,_class108,_dec55,_class109,_dec56,_class111,_dec57,_class113,_dec58,_class115,_dec59,_class116,_dec60,_class117,_dec61,_class119,_dec62,_class120,_dec63,_class121,_dec64,_class122,_dec65,_class123,_dec66,_class124,_dec67,_class125,_dec68,_class126,_dec69,_class127,_dec70,_class128,_dec71,_class130,_dec72,_class132,_dec73,_class134,_dec74,_class136,_dec75,_class138,_dec76,_class139,_dec77,_class140,_dec78,_class141,_dec79,_class143,_dec80,_class144,_dec81,_dec82,_dec83,_class145,_desc,_value,_class146,_descriptor,_descriptor2,_dec84,_class148,_dec85,_class150,_class151,_temp53,_dec86,_class152,_dec87,_class154,_dec88,_dec89,_dec90,_dec91,_dec92,_dec93,_dec94,_dec95,_dec96,_dec97,_dec98,_dec99,_dec100,_dec101,_dec102,_dec103,_dec104,_dec105,_dec106,_dec107,_desc2,_value2,_class156,_descriptor3,_descriptor4,_descriptor5,_descriptor6,_descriptor7,_descriptor8,_descriptor9,_descriptor10,_descriptor11,_descriptor12,_descriptor13,_descriptor14,_descriptor15,_descriptor16,_descriptor17,_descriptor18,_descriptor19,_descriptor20,_descriptor21,_descriptor22,_class159,_temp54,_dec108,_desc3,_value3,_class161,_descriptor23,_dec109,_dec110,_class163,_desc4,_value4,_class164,_dec111,_dec112,_class166,_desc5,_value5,_class167,_dec113,_class169,_dec114,_dec115,_dec116,_dec117,_dec118,_dec119,_dec120,_dec121,_dec122,_dec123,_dec124,_dec125,_dec126,_dec127,_dec128,_dec129,_dec130,_dec131,_dec132,_dec133,_dec134,_dec135,_dec136,_dec137,_dec138,_class170,_desc6,_value6,_class171,_descriptor24,_descriptor25,_descriptor26,_descriptor27,_descriptor28,_descriptor29,_descriptor30,_descriptor31,_descriptor32,_descriptor33,_descriptor34,_descriptor35,_descriptor36,_descriptor37,_descriptor38,_descriptor39,_descriptor40,_descriptor41,_descriptor42,_descriptor43,_descriptor44,_descriptor45,_descriptor46,_descriptor47,_dec139,_dec140,_dec141,_dec142,_dec143,_dec144,_dec145,_dec146,_dec147,_dec148,_dec149,_dec150,_dec151,_dec152,_dec153,_dec154,_dec155,_dec156,_dec157,_dec158,_dec159,_dec160,_dec161,_dec162,_dec163,_dec164,_dec165,_dec166,_class173,_desc7,_value7,_class174,_descriptor48,_descriptor49,_descriptor50,_descriptor51,_descriptor52,_descriptor53,_descriptor54,_descriptor55,_descriptor56,_descriptor57,_descriptor58,_descriptor59,_descriptor60,_descriptor61,_descriptor62,_descriptor63,_descriptor64,_descriptor65,_descriptor66,_descriptor67,_descriptor68,_descriptor69,_descriptor70,_descriptor71,_descriptor72,_descriptor73,_descriptor74,_dec167,_dec168,_dec169,_dec170,_dec171,_dec172,_desc8,_value8,_class176,_descriptor75,_descriptor76,_descriptor77,_descriptor78,_descriptor79,_descriptor80,_class177,_temp55,_dec173,_dec174,_dec175,_dec176,_class178,_desc9,_value9,_class179,_descriptor81,_descriptor82,_descriptor83,_class180,_temp56,_dec177,_dec178,_dec179,_dec180,_dec181,_dec182,_dec183,_dec184,_dec185,_dec186,_dec187,_dec188,_dec189,_dec190,_dec191,_dec192,_dec193,_dec194,_dec195,_dec196,_dec197,_dec198,_dec199,_dec200,_dec201,_dec202,_dec203,_dec204,_dec205,_dec206,_dec207,_dec208,_class181,_desc10,_value10,_class182,_descriptor84,_descriptor85,_descriptor86,_descriptor87,_descriptor88,_descriptor89,_descriptor90,_descriptor91,_descriptor92,_descriptor93,_descriptor94,_descriptor95,_descriptor96,_descriptor97,_descriptor98,_descriptor99,_descriptor100,_descriptor101,_descriptor102,_descriptor103,_descriptor104,_descriptor105,_descriptor106,_descriptor107,_descriptor108,_descriptor109,_descriptor110,_descriptor111,_descriptor112,_descriptor113,_descriptor114,_dec209,_dec210,_dec211,_dec212,_dec213,_dec214,_dec215,_dec216,_dec217,_class184,_desc11,_value11,_class185,_descriptor115,_descriptor116,_descriptor117,_descriptor118,_descriptor119,_descriptor120,_descriptor121,_descriptor122,_dec218,_dec219,_dec220,_class187,_desc12,_value12,_class188,_descriptor123,_descriptor124,_dec221,_dec222,_dec223,_dec224,_dec225,_dec226,_dec227,_class190,_desc13,_value13,_class191,_descriptor125,_descriptor126,_descriptor127,_descriptor128,_descriptor129,_descriptor130,_class192,_temp58,_dec228,_dec229,_dec230,_dec231,_dec232,_dec233,_dec234,_dec235,_dec236,_dec237,_dec238,_dec239,_dec240,_dec241,_dec242,_dec243,_dec244,_dec245,_dec246,_dec247,_dec248,_dec249,_dec250,_dec251,_dec252,_dec253,_class193,_desc14,_value14,_class194,_descriptor131,_descriptor132,_descriptor133,_descriptor134,_descriptor135,_descriptor136,_descriptor137,_descriptor138,_descriptor139,_descriptor140,_descriptor141,_descriptor142,_descriptor143,_descriptor144,_descriptor145,_descriptor146,_descriptor147,_descriptor148,_descriptor149,_descriptor150,_descriptor151,_descriptor152,_descriptor153,_descriptor154,_descriptor155,_class195,_temp59,_dec254,_dec255,_dec256,_dec257,_dec258,_dec259,_class196,_desc15,_value15,_class197,_descriptor156,_descriptor157,_descriptor158,_descriptor159,_descriptor160,_dec260,_class199;exports.dataServiceInitializerFactory=dataServiceInitializerFactory;var _clientnode=__webpack_require__(4);var _clientnode2=_interopRequireDefault(_clientnode);var _core=__webpack_require__(0);var _common=__webpack_require__(7);var _forms=__webpack_require__(8);var _material=__webpack_require__(9);var _platformBrowser=__webpack_require__(10);var _router=__webpack_require__(1);var _pouchdb=__webpack_require__(11);var _pouchdb2=_interopRequireDefault(_pouchdb);var _pouchdbFind=__webpack_require__(12);var _pouchdbFind2=_interopRequireDefault(_pouchdbFind);var _pouchdbValidation=__webpack_require__(13);var _pouchdbValidation2=_interopRequireDefault(_pouchdbValidation);var _rxjs=__webpack_require__(2);var _Observable=__webpack_require__(14);var _Subscription=__webpack_require__(15);var _animation=__webpack_require__(16);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _initDefineProp(target,property,descriptor,context){if(!descriptor)return;Object.defineProperty(target,property,{enumerable:descriptor.enumerable,configurable:descriptor.configurable,writable:descriptor.writable,value:descriptor.initializer?descriptor.initializer.call(context):void 0})}function _applyDecoratedDescriptor(target,property,decorators,descriptor,context){var desc={};Object['ke'+'ys'](descriptor).forEach(function(key){desc[key]=descriptor[key]});desc.enumerable=!!desc.enumerable;desc.configurable=!!desc.configurable;if('value'in desc||desc.initializer){desc.writable=true}desc=decorators.slice().reverse().reduce(function(desc,decorator){return decorator(target,property,desc)||desc},desc);if(context&&desc.initializer!==void 0){desc.value=desc.initializer?desc.initializer.call(context):void 0;desc.initializer=undefined}if(desc.initializer===void 0){Object['define'+'Property'](target,property,desc);desc=null}return desc}function _initializerWarningHelper(descriptor,context){throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.')}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{return Promise.resolve(value).then(function(value){step('next',value)},function(err){step('throw',err)})}}return step('next')})}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}// NOTE: Only needed for debugging this file.
try{module.require('source-map-support/register')}catch(error){}// endregion
// endregion
// region types
if(typeof CHANGE_DETECTION_STRATEGY_NAME==='undefined')/* eslint-disable no-var */var CHANGE_DETECTION_STRATEGY_NAME='default';/* eslint-enable no-var */if(typeof UTC_BUILD_TIMESTAMP==='undefined')/* eslint-disable no-var */var UTC_BUILD_TIMESTAMP=1;/* eslint-enable no-var */var LAST_KNOWN_DATA=exports.LAST_KNOWN_DATA={data:{},sequence:'now'};var currentInstanceToSearchInjectorFor=exports.currentInstanceToSearchInjectorFor=null;var SYMBOL=exports.SYMBOL=new Date().getTime()+'/'+Math.random();// region configuration
var CODE_MIRROR_DEFAULT_OPTIONS=exports.CODE_MIRROR_DEFAULT_OPTIONS={// region paths
path:{cascadingStyleSheet:'lib/codemirror.css',base:'/codemirror/',mode:'mode/{mode}/{mode}.js',script:'lib/codemirror.js'},// endregion
indentUnit:4,tabSize:4,indentWithTabs:false,lineWrapping:false,lineNumbers:true,scrollbarStyle:'native'};var tinymceBasePath='/tinymce/';var TINYMCE_DEFAULT_OPTIONS=exports.TINYMCE_DEFAULT_OPTIONS={/* eslint-disable camelcase */// region paths
baseURL:tinymceBasePath,scriptPath:tinymceBasePath+'tinymce.min.js',skin_url:tinymceBasePath+'skins/lightgray',theme_url:tinymceBasePath+'themes/modern/theme.min.js',// endregion
allow_conditional_comments:false,allow_script_urls:false,cache_suffix:'?version='+UTC_BUILD_TIMESTAMP,convert_fonts_to_spans:true,document_base_url:'/',element_format:'xhtml',entity_encoding:'raw',fix_list_elements:true,forced_root_block:null,hidden_input:false,invalid_elements:'em',invalid_styles:'color font-size line-height',keep_styles:false,menubar:false,/* eslint-disable max-len */plugins:'fullscreen link code hr nonbreaking searchreplace visualblocks',/* eslint-enable max-len */relative_urls:false,remove_script_host:false,remove_trailing_brs:true,schema:'html5',/* eslint-disable max-len */toolbar1:'cut copy paste | undo redo removeformat | styleselect formatselect fontselect fontsizeselect | searchreplace visualblocks fullscreen code',toolbar2:'alignleft aligncenter alignright alignjustify outdent indent | link hr nonbreaking bullist numlist bold italic underline strikethrough',/* eslint-enable max-len */trim:true/* eslint-enable camelcase */// endregion
// region basic services
// IgnoreTypeCheck
};/**
 * Injectable angular service for the tools class.
 * @property static:$ - Holds an instance of a generic dom abstraction layer
 * like jquery.
 * @property static:globalContext - Hold a reference to the environment specific
 * global scope.
 * @property static:tools - Holds a reference to the wrapped tools class.
 *
 * @property fixed - Reference to this static members.
 * @property tools - Holds an injector scope specific tools instance.
 */var UtilityService=exports.UtilityService=(_dec=(0,_core.Injectable)(),_dec(_class=(_temp=_class2=function UtilityService(){_classCallCheck(this,UtilityService);this.fixed=UtilityService;this.tools=new _clientnode2.default},_class2.$=_clientnode.$,_class2.globalContext=_clientnode.globalContext,_class2.tools=_clientnode2.default,_temp))||_class);// IgnoreTypeCheck
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
 */var InitialDataService=exports.InitialDataService=(_dec2=(0,_core.Injectable)(),_dec2(_class3=(_temp2=_class4=function(){/**
     * Sets all properties of given initial data as properties to this
     * initializing instance.
     * @param utility - Saves the generic tools service instance.
     * @returns Nothing.
     */function InitialDataService(utility){_classCallCheck(this,InitialDataService);this.configuration=this.configuration;this.tools=this.tools;if(!utility)utility=new UtilityService;this.tools=utility.fixed.tools;this.set(InitialDataService.defaultScope,'genericInitialData'in utility.fixed.globalContext?utility.fixed.globalContext.genericInitialData:{});if(InitialDataService.removeFoundData)delete utility.fixed.globalContext.genericInitialData;if('document'in utility.fixed.globalContext&&'querySelector'in utility.fixed.globalContext.document){// TODO how to get right dom node?
var domNode=utility.fixed.globalContext.document.querySelector('application');if(domNode&&'getAttribute'in domNode&&domNode.getAttribute('initialData')){this.set(JSON.parse(domNode.getAttribute('initialData')));if(InitialDataService.removeFoundData)domNode.removeAttribute('initialData')}}}/**
     * Sets initial data.
     * @param parameter - All given data objects will be merged into current
     * scope.
     * @returns Complete generated data.
     */_createClass(InitialDataService,[{key:'set',value:function set(){var _tools;for(var _len=arguments.length,parameter=Array(_len),_key=0;_key<_len;_key++){parameter[_key]=arguments[_key]}return(_tools=this.tools).extendObject.apply(_tools,[true,this].concat(parameter))}}]);return InitialDataService}(),_class4.defaultScope={configuration:{database:{connector:{/* eslint-disable camelcase */auto_compaction:true,revs_limit:10/* eslint-enable camelcase */},model:{entities:{},property:{defaultSpecification:{minimum:0,minimumLength:0,minimumNumber:0},name:{reserved:[],special:{allowedRole:'_allowedRoles',attachment:'_attachments',conflict:'_conflicts',constraint:{execution:'_constraintExecutions',expression:'_constraintExpressions'},deleted:'_deleted',deletedConflict:'_deleted_conflicts',extend:'_extends',id:'_id',localSequence:'_local_seq',maximumAggregatedSize:'_maximumAggregatedSize',minimumAggregatedSize:'_minimumAggregatedSize',revision:'_rev',revisions:'_revisions',revisionsInformation:'_revs_info',strategy:'_updateStrategy',type:'-type'},validatedDocumentsCache:'_validatedDocuments'}}},plugins:[],url:'generic'}}},_class4.injectors=new Set,_class4.removeFoundData=true,_temp2))||_class3);/**
 * Helper function to easy create abstract classes without tight bounds.
 * @param injector - Application specific injector to use instead auto
 * detected one.
 * @param instance - Instance reference to determine corresponding responsible
 * injector.
 * @param constructor - Matched to given instance to try to inject for each
 * known injector instance.
 * @returns Nothing.
 */Reflect.defineMetadata('design:paramtypes',[UtilityService],InitialDataService);var determineInjector=exports.determineInjector=function determineInjector(injector,instance,constructor){if(injector)return injector.get.bind(injector);if(currentInstanceToSearchInjectorFor===undefined)throw SYMBOL;exports.currentInstanceToSearchInjectorFor=currentInstanceToSearchInjectorFor=undefined;var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=InitialDataService.injectors[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var _injector=_step.value;try{if(_injector.get(constructor,NaN)===instance)return _injector.get.bind(_injector)}catch(error){exports.currentInstanceToSearchInjectorFor=currentInstanceToSearchInjectorFor=null;if(error===SYMBOL)return _injector.get.bind(_injector);throw error}}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}exports.currentInstanceToSearchInjectorFor=currentInstanceToSearchInjectorFor=null;if(InitialDataService.injectors.size===1){console.warn('Could not determine injector, but using the only registered '+'one. This will fail an multiple application instances.');var _injector2=Array.from(InitialDataService.injectors)[0];return _injector2.get.bind(_injector2)}throw new Error('No unambiguously injector could be determined automatically.')};// endregion
// region pipes
// / region wrapped
/**
 * Generic pipe transform class to wrapp simple pure functions as pipe
 * transformation.
 * @property methodName - Name of forwarded method.
 */var AbstractToolsPipe=exports.AbstractToolsPipe=function(){function AbstractToolsPipe(){_classCallCheck(this,AbstractToolsPipe);this.methodName=this.methodName}_createClass(AbstractToolsPipe,[{key:'transform',/**
     * Performs the concrete conversion logic.
     * @param parameter - Saves all generic parameter to forward it
     * for triggering the underlying tools utility.
     * @returns Whatever the underlying tools function returns.
     */value:function transform(){var _UtilityService$tools;return(_UtilityService$tools=UtilityService.tools)[this.methodName].apply(_UtilityService$tools,arguments)}}]);return AbstractToolsPipe}();/**
 * Generic pipe transform class to wrapp simple pure functions as inverted pipe
 * transformation.
 * @property methodName - Name of forwarded method.
 */var AbstractInvertedToolsPipe=exports.AbstractInvertedToolsPipe=function(_AbstractToolsPipe){_inherits(AbstractInvertedToolsPipe,_AbstractToolsPipe);function AbstractInvertedToolsPipe(){_classCallCheck(this,AbstractInvertedToolsPipe);return _possibleConstructorReturn(this,(AbstractInvertedToolsPipe.__proto__||Object.getPrototypeOf(AbstractInvertedToolsPipe)).apply(this,arguments))}_createClass(AbstractInvertedToolsPipe,[{key:'transform',/**
     * Performs the concrete conversion logic.
     * @param parameter - Saves all generic parameter to
     * forward it for triggering the underlying tools utility.
     * @returns Whatever the underlying tools function returns.
     */value:function transform(){var tools=UtilityService.tools;// IgnoreTypeCheck
return tools.invertArrayFilter(tools[this.methodName]).apply(undefined,arguments)}}]);return AbstractInvertedToolsPipe}(AbstractToolsPipe);/*
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
*//**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ConvertCircularObjectToJSONPipe=exports.ConvertCircularObjectToJSONPipe=(_dec3=(0,_core.Pipe)({name:'genericConvertCircularObjectToJSON'}),_dec3(_class6=function(_AbstractToolsPipe2){_inherits(ConvertCircularObjectToJSONPipe,_AbstractToolsPipe2);function ConvertCircularObjectToJSONPipe(){var _ref;var _temp3,_this2,_ret;_classCallCheck(this,ConvertCircularObjectToJSONPipe);for(var _len2=arguments.length,args=Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2]}return _ret=(_temp3=(_this2=_possibleConstructorReturn(this,(_ref=ConvertCircularObjectToJSONPipe.__proto__||Object.getPrototypeOf(ConvertCircularObjectToJSONPipe)).call.apply(_ref,[this].concat(args))),_this2),_this2.methodName='convertCircularObjectToJSON',_temp3),_possibleConstructorReturn(_this2,_ret)}return ConvertCircularObjectToJSONPipe}(AbstractToolsPipe))||_class6);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var EqualsPipe=exports.EqualsPipe=(_dec4=(0,_core.Pipe)({name:'genericEquals'}),_dec4(_class8=function(_AbstractToolsPipe3){_inherits(EqualsPipe,_AbstractToolsPipe3);function EqualsPipe(){var _ref2;var _temp4,_this3,_ret2;_classCallCheck(this,EqualsPipe);for(var _len3=arguments.length,args=Array(_len3),_key3=0;_key3<_len3;_key3++){args[_key3]=arguments[_key3]}return _ret2=(_temp4=(_this3=_possibleConstructorReturn(this,(_ref2=EqualsPipe.__proto__||Object.getPrototypeOf(EqualsPipe)).call.apply(_ref2,[this].concat(args))),_this3),_this3.methodName='equals',_temp4),_possibleConstructorReturn(_this3,_ret2)}return EqualsPipe}(AbstractToolsPipe))||_class8);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ExtendObjectPipe=exports.ExtendObjectPipe=(_dec5=(0,_core.Pipe)({name:'genericExtendObject'}),_dec5(_class10=function(_AbstractToolsPipe4){_inherits(ExtendObjectPipe,_AbstractToolsPipe4);function ExtendObjectPipe(){var _ref3;var _temp5,_this4,_ret3;_classCallCheck(this,ExtendObjectPipe);for(var _len4=arguments.length,args=Array(_len4),_key4=0;_key4<_len4;_key4++){args[_key4]=arguments[_key4]}return _ret3=(_temp5=(_this4=_possibleConstructorReturn(this,(_ref3=ExtendObjectPipe.__proto__||Object.getPrototypeOf(ExtendObjectPipe)).call.apply(_ref3,[this].concat(args))),_this4),_this4.methodName='extendObject',_temp5),_possibleConstructorReturn(_this4,_ret3)}return ExtendObjectPipe}(AbstractToolsPipe))||_class10);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var RepresentObjectPipe=exports.RepresentObjectPipe=(_dec6=(0,_core.Pipe)({name:'genericRepresentObject'}),_dec6(_class12=function(_AbstractToolsPipe5){_inherits(RepresentObjectPipe,_AbstractToolsPipe5);function RepresentObjectPipe(){var _ref4;var _temp6,_this5,_ret4;_classCallCheck(this,RepresentObjectPipe);for(var _len5=arguments.length,args=Array(_len5),_key5=0;_key5<_len5;_key5++){args[_key5]=arguments[_key5]}return _ret4=(_temp6=(_this5=_possibleConstructorReturn(this,(_ref4=RepresentObjectPipe.__proto__||Object.getPrototypeOf(RepresentObjectPipe)).call.apply(_ref4,[this].concat(args))),_this5),_this5.methodName='representObject',_temp6),_possibleConstructorReturn(_this5,_ret4)}return RepresentObjectPipe}(AbstractToolsPipe))||_class12);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var SortPipe=exports.SortPipe=(_dec7=(0,_core.Pipe)({name:'genericSort'}),_dec7(_class14=function(_AbstractToolsPipe6){_inherits(SortPipe,_AbstractToolsPipe6);function SortPipe(){var _ref5;var _temp7,_this6,_ret5;_classCallCheck(this,SortPipe);for(var _len6=arguments.length,args=Array(_len6),_key6=0;_key6<_len6;_key6++){args[_key6]=arguments[_key6]}return _ret5=(_temp7=(_this6=_possibleConstructorReturn(this,(_ref5=SortPipe.__proto__||Object.getPrototypeOf(SortPipe)).call.apply(_ref5,[this].concat(args))),_this6),_this6.methodName='sort',_temp7),_possibleConstructorReturn(_this6,_ret5)}return SortPipe}(AbstractToolsPipe))||_class14);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArrayMergePipe=exports.ArrayMergePipe=(_dec8=(0,_core.Pipe)({name:'genericArrayMerge'}),_dec8(_class16=function(_AbstractToolsPipe7){_inherits(ArrayMergePipe,_AbstractToolsPipe7);function ArrayMergePipe(){var _ref6;var _temp8,_this7,_ret6;_classCallCheck(this,ArrayMergePipe);for(var _len7=arguments.length,args=Array(_len7),_key7=0;_key7<_len7;_key7++){args[_key7]=arguments[_key7]}return _ret6=(_temp8=(_this7=_possibleConstructorReturn(this,(_ref6=ArrayMergePipe.__proto__||Object.getPrototypeOf(ArrayMergePipe)).call.apply(_ref6,[this].concat(args))),_this7),_this7.methodName='arrayMerge',_temp8),_possibleConstructorReturn(_this7,_ret6)}return ArrayMergePipe}(AbstractToolsPipe))||_class16);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArrayMakePipe=exports.ArrayMakePipe=(_dec9=(0,_core.Pipe)({name:'genericArrayMake'}),_dec9(_class18=function(_AbstractToolsPipe8){_inherits(ArrayMakePipe,_AbstractToolsPipe8);function ArrayMakePipe(){var _ref7;var _temp9,_this8,_ret7;_classCallCheck(this,ArrayMakePipe);for(var _len8=arguments.length,args=Array(_len8),_key8=0;_key8<_len8;_key8++){args[_key8]=arguments[_key8]}return _ret7=(_temp9=(_this8=_possibleConstructorReturn(this,(_ref7=ArrayMakePipe.__proto__||Object.getPrototypeOf(ArrayMakePipe)).call.apply(_ref7,[this].concat(args))),_this8),_this8.methodName='arrayMake',_temp9),_possibleConstructorReturn(_this8,_ret7)}return ArrayMakePipe}(AbstractToolsPipe))||_class18);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArrayUniquePipe=exports.ArrayUniquePipe=(_dec10=(0,_core.Pipe)({name:'genericArrayUnique'}),_dec10(_class20=function(_AbstractToolsPipe9){_inherits(ArrayUniquePipe,_AbstractToolsPipe9);function ArrayUniquePipe(){var _ref8;var _temp10,_this9,_ret8;_classCallCheck(this,ArrayUniquePipe);for(var _len9=arguments.length,args=Array(_len9),_key9=0;_key9<_len9;_key9++){args[_key9]=arguments[_key9]}return _ret8=(_temp10=(_this9=_possibleConstructorReturn(this,(_ref8=ArrayUniquePipe.__proto__||Object.getPrototypeOf(ArrayUniquePipe)).call.apply(_ref8,[this].concat(args))),_this9),_this9.methodName='arrayUnique',_temp10),_possibleConstructorReturn(_this9,_ret8)}return ArrayUniquePipe}(AbstractToolsPipe))||_class20);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArrayAggregatePropertyIfEqualPipe=exports.ArrayAggregatePropertyIfEqualPipe=(_dec11=(0,_core.Pipe)({name:'genericArrayAggregatePropertyIfEqual'}),_dec11(_class22=function(_AbstractToolsPipe10){_inherits(ArrayAggregatePropertyIfEqualPipe,_AbstractToolsPipe10);function ArrayAggregatePropertyIfEqualPipe(){var _ref9;var _temp11,_this10,_ret9;_classCallCheck(this,ArrayAggregatePropertyIfEqualPipe);for(var _len10=arguments.length,args=Array(_len10),_key10=0;_key10<_len10;_key10++){args[_key10]=arguments[_key10]}return _ret9=(_temp11=(_this10=_possibleConstructorReturn(this,(_ref9=ArrayAggregatePropertyIfEqualPipe.__proto__||Object.getPrototypeOf(ArrayAggregatePropertyIfEqualPipe)).call.apply(_ref9,[this].concat(args))),_this10),_this10.methodName='arrayAggregatePropertyIfEqual',_temp11),_possibleConstructorReturn(_this10,_ret9)}return ArrayAggregatePropertyIfEqualPipe}(AbstractToolsPipe))||_class22);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArrayDeleteEmptyItemsPipe=exports.ArrayDeleteEmptyItemsPipe=(_dec12=(0,_core.Pipe)({name:'genericArrayDeleteEmptyItems'}),_dec12(_class24=function(_AbstractToolsPipe11){_inherits(ArrayDeleteEmptyItemsPipe,_AbstractToolsPipe11);function ArrayDeleteEmptyItemsPipe(){var _ref10;var _temp12,_this11,_ret10;_classCallCheck(this,ArrayDeleteEmptyItemsPipe);for(var _len11=arguments.length,args=Array(_len11),_key11=0;_key11<_len11;_key11++){args[_key11]=arguments[_key11]}return _ret10=(_temp12=(_this11=_possibleConstructorReturn(this,(_ref10=ArrayDeleteEmptyItemsPipe.__proto__||Object.getPrototypeOf(ArrayDeleteEmptyItemsPipe)).call.apply(_ref10,[this].concat(args))),_this11),_this11.methodName='arrayDeleteEmptyItems',_temp12),_possibleConstructorReturn(_this11,_ret10)}return ArrayDeleteEmptyItemsPipe}(AbstractToolsPipe))||_class24);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArrayExtractPipe=exports.ArrayExtractPipe=(_dec13=(0,_core.Pipe)({name:'genericArrayExtract'}),_dec13(_class26=function(_AbstractToolsPipe12){_inherits(ArrayExtractPipe,_AbstractToolsPipe12);function ArrayExtractPipe(){var _ref11;var _temp13,_this12,_ret11;_classCallCheck(this,ArrayExtractPipe);for(var _len12=arguments.length,args=Array(_len12),_key12=0;_key12<_len12;_key12++){args[_key12]=arguments[_key12]}return _ret11=(_temp13=(_this12=_possibleConstructorReturn(this,(_ref11=ArrayExtractPipe.__proto__||Object.getPrototypeOf(ArrayExtractPipe)).call.apply(_ref11,[this].concat(args))),_this12),_this12.methodName='arrayExtract',_temp13),_possibleConstructorReturn(_this12,_ret11)}return ArrayExtractPipe}(AbstractToolsPipe))||_class26);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArrayExtractIfMatchesPipe=exports.ArrayExtractIfMatchesPipe=(_dec14=(0,_core.Pipe)({name:'genericArrayExtractIfMatches'}),_dec14(_class28=function(_AbstractToolsPipe13){_inherits(ArrayExtractIfMatchesPipe,_AbstractToolsPipe13);function ArrayExtractIfMatchesPipe(){var _ref12;var _temp14,_this13,_ret12;_classCallCheck(this,ArrayExtractIfMatchesPipe);for(var _len13=arguments.length,args=Array(_len13),_key13=0;_key13<_len13;_key13++){args[_key13]=arguments[_key13]}return _ret12=(_temp14=(_this13=_possibleConstructorReturn(this,(_ref12=ArrayExtractIfMatchesPipe.__proto__||Object.getPrototypeOf(ArrayExtractIfMatchesPipe)).call.apply(_ref12,[this].concat(args))),_this13),_this13.methodName='arrayExtractIfMatches',_temp14),_possibleConstructorReturn(_this13,_ret12)}return ArrayExtractIfMatchesPipe}(AbstractToolsPipe))||_class28);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArrayExtractIfPropertyExistsPipe=exports.ArrayExtractIfPropertyExistsPipe=(_dec15=(0,_core.Pipe)({name:'genericArrayExtractIfPropertyExists'}),_dec15(_class30=function(_AbstractToolsPipe14){_inherits(ArrayExtractIfPropertyExistsPipe,_AbstractToolsPipe14);function ArrayExtractIfPropertyExistsPipe(){var _ref13;var _temp15,_this14,_ret13;_classCallCheck(this,ArrayExtractIfPropertyExistsPipe);for(var _len14=arguments.length,args=Array(_len14),_key14=0;_key14<_len14;_key14++){args[_key14]=arguments[_key14]}return _ret13=(_temp15=(_this14=_possibleConstructorReturn(this,(_ref13=ArrayExtractIfPropertyExistsPipe.__proto__||Object.getPrototypeOf(ArrayExtractIfPropertyExistsPipe)).call.apply(_ref13,[this].concat(args))),_this14),_this14.methodName='arrayExtractIfPropertyExists',_temp15),_possibleConstructorReturn(_this14,_ret13)}return ArrayExtractIfPropertyExistsPipe}(AbstractToolsPipe))||_class30);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArrayExtractIfPropertyMatchesPipe=exports.ArrayExtractIfPropertyMatchesPipe=(_dec16=(0,_core.Pipe)({name:'genericArrayExtractIfPropertyMatches'}),_dec16(_class32=function(_AbstractToolsPipe15){_inherits(ArrayExtractIfPropertyMatchesPipe,_AbstractToolsPipe15);function ArrayExtractIfPropertyMatchesPipe(){var _ref14;var _temp16,_this15,_ret14;_classCallCheck(this,ArrayExtractIfPropertyMatchesPipe);for(var _len15=arguments.length,args=Array(_len15),_key15=0;_key15<_len15;_key15++){args[_key15]=arguments[_key15]}return _ret14=(_temp16=(_this15=_possibleConstructorReturn(this,(_ref14=ArrayExtractIfPropertyMatchesPipe.__proto__||Object.getPrototypeOf(ArrayExtractIfPropertyMatchesPipe)).call.apply(_ref14,[this].concat(args))),_this15),_this15.methodName='arrayExtractIfPropertyMatches',_temp16),_possibleConstructorReturn(_this15,_ret14)}return ArrayExtractIfPropertyMatchesPipe}(AbstractToolsPipe))||_class32);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArrayIntersectPipe=exports.ArrayIntersectPipe=(_dec17=(0,_core.Pipe)({name:'genericArrayIntersect'}),_dec17(_class34=function(_AbstractToolsPipe16){_inherits(ArrayIntersectPipe,_AbstractToolsPipe16);function ArrayIntersectPipe(){var _ref15;var _temp17,_this16,_ret15;_classCallCheck(this,ArrayIntersectPipe);for(var _len16=arguments.length,args=Array(_len16),_key16=0;_key16<_len16;_key16++){args[_key16]=arguments[_key16]}return _ret15=(_temp17=(_this16=_possibleConstructorReturn(this,(_ref15=ArrayIntersectPipe.__proto__||Object.getPrototypeOf(ArrayIntersectPipe)).call.apply(_ref15,[this].concat(args))),_this16),_this16.methodName='arrayIntersect',_temp17),_possibleConstructorReturn(_this16,_ret15)}return ArrayIntersectPipe}(AbstractToolsPipe))||_class34);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArrayMakeRangePipe=exports.ArrayMakeRangePipe=(_dec18=(0,_core.Pipe)({name:'genericArrayMakeRange'}),_dec18(_class36=function(_AbstractToolsPipe17){_inherits(ArrayMakeRangePipe,_AbstractToolsPipe17);function ArrayMakeRangePipe(){var _ref16;var _temp18,_this17,_ret16;_classCallCheck(this,ArrayMakeRangePipe);for(var _len17=arguments.length,args=Array(_len17),_key17=0;_key17<_len17;_key17++){args[_key17]=arguments[_key17]}return _ret16=(_temp18=(_this17=_possibleConstructorReturn(this,(_ref16=ArrayMakeRangePipe.__proto__||Object.getPrototypeOf(ArrayMakeRangePipe)).call.apply(_ref16,[this].concat(args))),_this17),_this17.methodName='arrayMakeRange',_temp18),_possibleConstructorReturn(_this17,_ret16)}return ArrayMakeRangePipe}(AbstractToolsPipe))||_class36);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArraySumUpPropertyPipe=exports.ArraySumUpPropertyPipe=(_dec19=(0,_core.Pipe)({name:'genericArraySumUpProperty'}),_dec19(_class38=function(_AbstractToolsPipe18){_inherits(ArraySumUpPropertyPipe,_AbstractToolsPipe18);function ArraySumUpPropertyPipe(){var _ref17;var _temp19,_this18,_ret17;_classCallCheck(this,ArraySumUpPropertyPipe);for(var _len18=arguments.length,args=Array(_len18),_key18=0;_key18<_len18;_key18++){args[_key18]=arguments[_key18]}return _ret17=(_temp19=(_this18=_possibleConstructorReturn(this,(_ref17=ArraySumUpPropertyPipe.__proto__||Object.getPrototypeOf(ArraySumUpPropertyPipe)).call.apply(_ref17,[this].concat(args))),_this18),_this18.methodName='arraySumUpProperty',_temp19),_possibleConstructorReturn(_this18,_ret17)}return ArraySumUpPropertyPipe}(AbstractToolsPipe))||_class38);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArrayAppendAddPipe=exports.ArrayAppendAddPipe=(_dec20=(0,_core.Pipe)({name:'genericArrayAppendAdd'}),_dec20(_class40=function(_AbstractToolsPipe19){_inherits(ArrayAppendAddPipe,_AbstractToolsPipe19);function ArrayAppendAddPipe(){var _ref18;var _temp20,_this19,_ret18;_classCallCheck(this,ArrayAppendAddPipe);for(var _len19=arguments.length,args=Array(_len19),_key19=0;_key19<_len19;_key19++){args[_key19]=arguments[_key19]}return _ret18=(_temp20=(_this19=_possibleConstructorReturn(this,(_ref18=ArrayAppendAddPipe.__proto__||Object.getPrototypeOf(ArrayAppendAddPipe)).call.apply(_ref18,[this].concat(args))),_this19),_this19.methodName='arrayAppendAdd',_temp20),_possibleConstructorReturn(_this19,_ret18)}return ArrayAppendAddPipe}(AbstractToolsPipe))||_class40);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArrayRemovePipe=exports.ArrayRemovePipe=(_dec21=(0,_core.Pipe)({name:'genericArrayRemove'}),_dec21(_class42=function(_AbstractToolsPipe20){_inherits(ArrayRemovePipe,_AbstractToolsPipe20);function ArrayRemovePipe(){var _ref19;var _temp21,_this20,_ret19;_classCallCheck(this,ArrayRemovePipe);for(var _len20=arguments.length,args=Array(_len20),_key20=0;_key20<_len20;_key20++){args[_key20]=arguments[_key20]}return _ret19=(_temp21=(_this20=_possibleConstructorReturn(this,(_ref19=ArrayRemovePipe.__proto__||Object.getPrototypeOf(ArrayRemovePipe)).call.apply(_ref19,[this].concat(args))),_this20),_this20.methodName='arrayRemove',_temp21),_possibleConstructorReturn(_this20,_ret19)}return ArrayRemovePipe}(AbstractToolsPipe))||_class42);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var ArraySortTopologicalPipe=exports.ArraySortTopologicalPipe=(_dec22=(0,_core.Pipe)({name:'genericArraySortTopological'}),_dec22(_class44=function(_AbstractToolsPipe21){_inherits(ArraySortTopologicalPipe,_AbstractToolsPipe21);function ArraySortTopologicalPipe(){var _ref20;var _temp22,_this21,_ret20;_classCallCheck(this,ArraySortTopologicalPipe);for(var _len21=arguments.length,args=Array(_len21),_key21=0;_key21<_len21;_key21++){args[_key21]=arguments[_key21]}return _ret20=(_temp22=(_this21=_possibleConstructorReturn(this,(_ref20=ArraySortTopologicalPipe.__proto__||Object.getPrototypeOf(ArraySortTopologicalPipe)).call.apply(_ref20,[this].concat(args))),_this21),_this21.methodName='arraySortTopological',_temp22),_possibleConstructorReturn(_this21,_ret20)}return ArraySortTopologicalPipe}(AbstractToolsPipe))||_class44);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringEscapeRegularExpressionsPipe=exports.StringEscapeRegularExpressionsPipe=(_dec23=(0,_core.Pipe)({name:'genericStringEscapeRegularExpressions'}),_dec23(_class46=function(_AbstractToolsPipe22){_inherits(StringEscapeRegularExpressionsPipe,_AbstractToolsPipe22);function StringEscapeRegularExpressionsPipe(){var _ref21;var _temp23,_this22,_ret21;_classCallCheck(this,StringEscapeRegularExpressionsPipe);for(var _len22=arguments.length,args=Array(_len22),_key22=0;_key22<_len22;_key22++){args[_key22]=arguments[_key22]}return _ret21=(_temp23=(_this22=_possibleConstructorReturn(this,(_ref21=StringEscapeRegularExpressionsPipe.__proto__||Object.getPrototypeOf(StringEscapeRegularExpressionsPipe)).call.apply(_ref21,[this].concat(args))),_this22),_this22.methodName='stringEscapeRegularExpressions',_temp23),_possibleConstructorReturn(_this22,_ret21)}return StringEscapeRegularExpressionsPipe}(AbstractToolsPipe))||_class46);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringConvertToValidVariableNamePipe=exports.StringConvertToValidVariableNamePipe=(_dec24=(0,_core.Pipe)({name:'genericStringConvertToValidVariableName'}),_dec24(_class48=function(_AbstractToolsPipe23){_inherits(StringConvertToValidVariableNamePipe,_AbstractToolsPipe23);function StringConvertToValidVariableNamePipe(){var _ref22;var _temp24,_this23,_ret22;_classCallCheck(this,StringConvertToValidVariableNamePipe);for(var _len23=arguments.length,args=Array(_len23),_key23=0;_key23<_len23;_key23++){args[_key23]=arguments[_key23]}return _ret22=(_temp24=(_this23=_possibleConstructorReturn(this,(_ref22=StringConvertToValidVariableNamePipe.__proto__||Object.getPrototypeOf(StringConvertToValidVariableNamePipe)).call.apply(_ref22,[this].concat(args))),_this23),_this23.methodName='stringConvertToValidVariableName',_temp24),_possibleConstructorReturn(_this23,_ret22)}return StringConvertToValidVariableNamePipe}(AbstractToolsPipe))||_class48);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringEncodeURIComponentPipe=exports.StringEncodeURIComponentPipe=(_dec25=(0,_core.Pipe)({name:'genericStringEncodeURIComponent'}),_dec25(_class50=function(_AbstractToolsPipe24){_inherits(StringEncodeURIComponentPipe,_AbstractToolsPipe24);function StringEncodeURIComponentPipe(){var _ref23;var _temp25,_this24,_ret23;_classCallCheck(this,StringEncodeURIComponentPipe);for(var _len24=arguments.length,args=Array(_len24),_key24=0;_key24<_len24;_key24++){args[_key24]=arguments[_key24]}return _ret23=(_temp25=(_this24=_possibleConstructorReturn(this,(_ref23=StringEncodeURIComponentPipe.__proto__||Object.getPrototypeOf(StringEncodeURIComponentPipe)).call.apply(_ref23,[this].concat(args))),_this24),_this24.methodName='stringEncodeURIComponent',_temp25),_possibleConstructorReturn(_this24,_ret23)}return StringEncodeURIComponentPipe}(AbstractToolsPipe))||_class50);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringAddSeparatorToPathPipe=exports.StringAddSeparatorToPathPipe=(_dec26=(0,_core.Pipe)({name:'genericStringAddSeparatorToPath'}),_dec26(_class52=function(_AbstractToolsPipe25){_inherits(StringAddSeparatorToPathPipe,_AbstractToolsPipe25);function StringAddSeparatorToPathPipe(){var _ref24;var _temp26,_this25,_ret24;_classCallCheck(this,StringAddSeparatorToPathPipe);for(var _len25=arguments.length,args=Array(_len25),_key25=0;_key25<_len25;_key25++){args[_key25]=arguments[_key25]}return _ret24=(_temp26=(_this25=_possibleConstructorReturn(this,(_ref24=StringAddSeparatorToPathPipe.__proto__||Object.getPrototypeOf(StringAddSeparatorToPathPipe)).call.apply(_ref24,[this].concat(args))),_this25),_this25.methodName='stringAddSeparatorToPath',_temp26),_possibleConstructorReturn(_this25,_ret24)}return StringAddSeparatorToPathPipe}(AbstractToolsPipe))||_class52);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringHasPathPrefixPipe=exports.StringHasPathPrefixPipe=(_dec27=(0,_core.Pipe)({name:'genericStringHasPathPrefix'}),_dec27(_class54=function(_AbstractToolsPipe26){_inherits(StringHasPathPrefixPipe,_AbstractToolsPipe26);function StringHasPathPrefixPipe(){var _ref25;var _temp27,_this26,_ret25;_classCallCheck(this,StringHasPathPrefixPipe);for(var _len26=arguments.length,args=Array(_len26),_key26=0;_key26<_len26;_key26++){args[_key26]=arguments[_key26]}return _ret25=(_temp27=(_this26=_possibleConstructorReturn(this,(_ref25=StringHasPathPrefixPipe.__proto__||Object.getPrototypeOf(StringHasPathPrefixPipe)).call.apply(_ref25,[this].concat(args))),_this26),_this26.methodName='stringHasPathPrefix',_temp27),_possibleConstructorReturn(_this26,_ret25)}return StringHasPathPrefixPipe}(AbstractToolsPipe))||_class54);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringGetDomainNamePipe=exports.StringGetDomainNamePipe=(_dec28=(0,_core.Pipe)({name:'genericStringGetDomainName'}),_dec28(_class56=function(_AbstractToolsPipe27){_inherits(StringGetDomainNamePipe,_AbstractToolsPipe27);function StringGetDomainNamePipe(){var _ref26;var _temp28,_this27,_ret26;_classCallCheck(this,StringGetDomainNamePipe);for(var _len27=arguments.length,args=Array(_len27),_key27=0;_key27<_len27;_key27++){args[_key27]=arguments[_key27]}return _ret26=(_temp28=(_this27=_possibleConstructorReturn(this,(_ref26=StringGetDomainNamePipe.__proto__||Object.getPrototypeOf(StringGetDomainNamePipe)).call.apply(_ref26,[this].concat(args))),_this27),_this27.methodName='stringGetDomainName',_temp28),_possibleConstructorReturn(_this27,_ret26)}return StringGetDomainNamePipe}(AbstractToolsPipe))||_class56);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringGetPortNumberPipe=exports.StringGetPortNumberPipe=(_dec29=(0,_core.Pipe)({name:'genericStringGetPortNumber'}),_dec29(_class58=function(_AbstractToolsPipe28){_inherits(StringGetPortNumberPipe,_AbstractToolsPipe28);function StringGetPortNumberPipe(){var _ref27;var _temp29,_this28,_ret27;_classCallCheck(this,StringGetPortNumberPipe);for(var _len28=arguments.length,args=Array(_len28),_key28=0;_key28<_len28;_key28++){args[_key28]=arguments[_key28]}return _ret27=(_temp29=(_this28=_possibleConstructorReturn(this,(_ref27=StringGetPortNumberPipe.__proto__||Object.getPrototypeOf(StringGetPortNumberPipe)).call.apply(_ref27,[this].concat(args))),_this28),_this28.methodName='stringGetPortNumber',_temp29),_possibleConstructorReturn(_this28,_ret27)}return StringGetPortNumberPipe}(AbstractToolsPipe))||_class58);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringGetProtocolNamePipe=exports.StringGetProtocolNamePipe=(_dec30=(0,_core.Pipe)({name:'genericStringGetProtocolName'}),_dec30(_class60=function(_AbstractToolsPipe29){_inherits(StringGetProtocolNamePipe,_AbstractToolsPipe29);function StringGetProtocolNamePipe(){var _ref28;var _temp30,_this29,_ret28;_classCallCheck(this,StringGetProtocolNamePipe);for(var _len29=arguments.length,args=Array(_len29),_key29=0;_key29<_len29;_key29++){args[_key29]=arguments[_key29]}return _ret28=(_temp30=(_this29=_possibleConstructorReturn(this,(_ref28=StringGetProtocolNamePipe.__proto__||Object.getPrototypeOf(StringGetProtocolNamePipe)).call.apply(_ref28,[this].concat(args))),_this29),_this29.methodName='stringGetProtocolName',_temp30),_possibleConstructorReturn(_this29,_ret28)}return StringGetProtocolNamePipe}(AbstractToolsPipe))||_class60);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringGetURLVariablePipe=exports.StringGetURLVariablePipe=(_dec31=(0,_core.Pipe)({name:'genericStringGetURLVariable'}),_dec31(_class62=function(_AbstractToolsPipe30){_inherits(StringGetURLVariablePipe,_AbstractToolsPipe30);function StringGetURLVariablePipe(){var _ref29;var _temp31,_this30,_ret29;_classCallCheck(this,StringGetURLVariablePipe);for(var _len30=arguments.length,args=Array(_len30),_key30=0;_key30<_len30;_key30++){args[_key30]=arguments[_key30]}return _ret29=(_temp31=(_this30=_possibleConstructorReturn(this,(_ref29=StringGetURLVariablePipe.__proto__||Object.getPrototypeOf(StringGetURLVariablePipe)).call.apply(_ref29,[this].concat(args))),_this30),_this30.methodName='stringGetURLVariable',_temp31),_possibleConstructorReturn(_this30,_ret29)}return StringGetURLVariablePipe}(AbstractToolsPipe))||_class62);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringIsInternalURLPipe=exports.StringIsInternalURLPipe=(_dec32=(0,_core.Pipe)({name:'genericStringIsInternalURL'}),_dec32(_class64=function(_AbstractToolsPipe31){_inherits(StringIsInternalURLPipe,_AbstractToolsPipe31);function StringIsInternalURLPipe(){var _ref30;var _temp32,_this31,_ret30;_classCallCheck(this,StringIsInternalURLPipe);for(var _len31=arguments.length,args=Array(_len31),_key31=0;_key31<_len31;_key31++){args[_key31]=arguments[_key31]}return _ret30=(_temp32=(_this31=_possibleConstructorReturn(this,(_ref30=StringIsInternalURLPipe.__proto__||Object.getPrototypeOf(StringIsInternalURLPipe)).call.apply(_ref30,[this].concat(args))),_this31),_this31.methodName='stringIsInternalURL',_temp32),_possibleConstructorReturn(_this31,_ret30)}return StringIsInternalURLPipe}(AbstractToolsPipe))||_class64);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringNormalizeURLPipe=exports.StringNormalizeURLPipe=(_dec33=(0,_core.Pipe)({name:'genericStringNormalizeURL'}),_dec33(_class66=function(_AbstractToolsPipe32){_inherits(StringNormalizeURLPipe,_AbstractToolsPipe32);function StringNormalizeURLPipe(){var _ref31;var _temp33,_this32,_ret31;_classCallCheck(this,StringNormalizeURLPipe);for(var _len32=arguments.length,args=Array(_len32),_key32=0;_key32<_len32;_key32++){args[_key32]=arguments[_key32]}return _ret31=(_temp33=(_this32=_possibleConstructorReturn(this,(_ref31=StringNormalizeURLPipe.__proto__||Object.getPrototypeOf(StringNormalizeURLPipe)).call.apply(_ref31,[this].concat(args))),_this32),_this32.methodName='stringNormalizeURL',_temp33),_possibleConstructorReturn(_this32,_ret31)}return StringNormalizeURLPipe}(AbstractToolsPipe))||_class66);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringRepresentURLPipe=exports.StringRepresentURLPipe=(_dec34=(0,_core.Pipe)({name:'genericStringRepresentURL'}),_dec34(_class68=function(_AbstractToolsPipe33){_inherits(StringRepresentURLPipe,_AbstractToolsPipe33);function StringRepresentURLPipe(){var _ref32;var _temp34,_this33,_ret32;_classCallCheck(this,StringRepresentURLPipe);for(var _len33=arguments.length,args=Array(_len33),_key33=0;_key33<_len33;_key33++){args[_key33]=arguments[_key33]}return _ret32=(_temp34=(_this33=_possibleConstructorReturn(this,(_ref32=StringRepresentURLPipe.__proto__||Object.getPrototypeOf(StringRepresentURLPipe)).call.apply(_ref32,[this].concat(args))),_this33),_this33.methodName='stringRepresentURL',_temp34),_possibleConstructorReturn(_this33,_ret32)}return StringRepresentURLPipe}(AbstractToolsPipe))||_class68);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringCompressStyleValuePipe=exports.StringCompressStyleValuePipe=(_dec35=(0,_core.Pipe)({name:'genericStringCompressStyleValue'}),_dec35(_class70=function(_AbstractToolsPipe34){_inherits(StringCompressStyleValuePipe,_AbstractToolsPipe34);function StringCompressStyleValuePipe(){var _ref33;var _temp35,_this34,_ret33;_classCallCheck(this,StringCompressStyleValuePipe);for(var _len34=arguments.length,args=Array(_len34),_key34=0;_key34<_len34;_key34++){args[_key34]=arguments[_key34]}return _ret33=(_temp35=(_this34=_possibleConstructorReturn(this,(_ref33=StringCompressStyleValuePipe.__proto__||Object.getPrototypeOf(StringCompressStyleValuePipe)).call.apply(_ref33,[this].concat(args))),_this34),_this34.methodName='stringCompressStyleValue',_temp35),_possibleConstructorReturn(_this34,_ret33)}return StringCompressStyleValuePipe}(AbstractToolsPipe))||_class70);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringCamelCaseToDelimitedPipe=exports.StringCamelCaseToDelimitedPipe=(_dec36=(0,_core.Pipe)({name:'genericStringCamelCaseToDelimited'}),_dec36(_class72=function(_AbstractToolsPipe35){_inherits(StringCamelCaseToDelimitedPipe,_AbstractToolsPipe35);function StringCamelCaseToDelimitedPipe(){var _ref34;var _temp36,_this35,_ret34;_classCallCheck(this,StringCamelCaseToDelimitedPipe);for(var _len35=arguments.length,args=Array(_len35),_key35=0;_key35<_len35;_key35++){args[_key35]=arguments[_key35]}return _ret34=(_temp36=(_this35=_possibleConstructorReturn(this,(_ref34=StringCamelCaseToDelimitedPipe.__proto__||Object.getPrototypeOf(StringCamelCaseToDelimitedPipe)).call.apply(_ref34,[this].concat(args))),_this35),_this35.methodName='stringCamelCaseToDelimited',_temp36),_possibleConstructorReturn(_this35,_ret34)}return StringCamelCaseToDelimitedPipe}(AbstractToolsPipe))||_class72);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringCapitalizePipe=exports.StringCapitalizePipe=(_dec37=(0,_core.Pipe)({name:'genericStringCapitalize'}),_dec37(_class74=function(_AbstractToolsPipe36){_inherits(StringCapitalizePipe,_AbstractToolsPipe36);function StringCapitalizePipe(){var _ref35;var _temp37,_this36,_ret35;_classCallCheck(this,StringCapitalizePipe);for(var _len36=arguments.length,args=Array(_len36),_key36=0;_key36<_len36;_key36++){args[_key36]=arguments[_key36]}return _ret35=(_temp37=(_this36=_possibleConstructorReturn(this,(_ref35=StringCapitalizePipe.__proto__||Object.getPrototypeOf(StringCapitalizePipe)).call.apply(_ref35,[this].concat(args))),_this36),_this36.methodName='stringCapitalize',_temp37),_possibleConstructorReturn(_this36,_ret35)}return StringCapitalizePipe}(AbstractToolsPipe))||_class74);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringDelimitedToCamelCasePipe=exports.StringDelimitedToCamelCasePipe=(_dec38=(0,_core.Pipe)({name:'genericStringDelimitedToCamelCase'}),_dec38(_class76=function(_AbstractToolsPipe37){_inherits(StringDelimitedToCamelCasePipe,_AbstractToolsPipe37);function StringDelimitedToCamelCasePipe(){var _ref36;var _temp38,_this37,_ret36;_classCallCheck(this,StringDelimitedToCamelCasePipe);for(var _len37=arguments.length,args=Array(_len37),_key37=0;_key37<_len37;_key37++){args[_key37]=arguments[_key37]}return _ret36=(_temp38=(_this37=_possibleConstructorReturn(this,(_ref36=StringDelimitedToCamelCasePipe.__proto__||Object.getPrototypeOf(StringDelimitedToCamelCasePipe)).call.apply(_ref36,[this].concat(args))),_this37),_this37.methodName='stringDelimitedToCamelCase',_temp38),_possibleConstructorReturn(_this37,_ret36)}return StringDelimitedToCamelCasePipe}(AbstractToolsPipe))||_class76);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringFormatPipe=exports.StringFormatPipe=(_dec39=(0,_core.Pipe)({name:'genericStringFormat'}),_dec39(_class78=function(_AbstractToolsPipe38){_inherits(StringFormatPipe,_AbstractToolsPipe38);function StringFormatPipe(){var _ref37;var _temp39,_this38,_ret37;_classCallCheck(this,StringFormatPipe);for(var _len38=arguments.length,args=Array(_len38),_key38=0;_key38<_len38;_key38++){args[_key38]=arguments[_key38]}return _ret37=(_temp39=(_this38=_possibleConstructorReturn(this,(_ref37=StringFormatPipe.__proto__||Object.getPrototypeOf(StringFormatPipe)).call.apply(_ref37,[this].concat(args))),_this38),_this38.methodName='stringFormat',_temp39),_possibleConstructorReturn(_this38,_ret37)}return StringFormatPipe}(AbstractToolsPipe))||_class78);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringGetRegularExpressionValidatedPipe=exports.StringGetRegularExpressionValidatedPipe=(_dec40=(0,_core.Pipe)({name:'genericStringGetRegularExpressionValidated'}),_dec40(_class80=function(_AbstractToolsPipe39){_inherits(StringGetRegularExpressionValidatedPipe,_AbstractToolsPipe39);function StringGetRegularExpressionValidatedPipe(){var _ref38;var _temp40,_this39,_ret38;_classCallCheck(this,StringGetRegularExpressionValidatedPipe);for(var _len39=arguments.length,args=Array(_len39),_key39=0;_key39<_len39;_key39++){args[_key39]=arguments[_key39]}return _ret38=(_temp40=(_this39=_possibleConstructorReturn(this,(_ref38=StringGetRegularExpressionValidatedPipe.__proto__||Object.getPrototypeOf(StringGetRegularExpressionValidatedPipe)).call.apply(_ref38,[this].concat(args))),_this39),_this39.methodName='stringGetRegularExpressionValidated',_temp40),_possibleConstructorReturn(_this39,_ret38)}return StringGetRegularExpressionValidatedPipe}(AbstractToolsPipe))||_class80);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringLowerCasePipe=exports.StringLowerCasePipe=(_dec41=(0,_core.Pipe)({name:'genericStringLowerCase'}),_dec41(_class82=function(_AbstractToolsPipe40){_inherits(StringLowerCasePipe,_AbstractToolsPipe40);function StringLowerCasePipe(){var _ref39;var _temp41,_this40,_ret39;_classCallCheck(this,StringLowerCasePipe);for(var _len40=arguments.length,args=Array(_len40),_key40=0;_key40<_len40;_key40++){args[_key40]=arguments[_key40]}return _ret39=(_temp41=(_this40=_possibleConstructorReturn(this,(_ref39=StringLowerCasePipe.__proto__||Object.getPrototypeOf(StringLowerCasePipe)).call.apply(_ref39,[this].concat(args))),_this40),_this40.methodName='stringLowerCase',_temp41),_possibleConstructorReturn(_this40,_ret39)}return StringLowerCasePipe}(AbstractToolsPipe))||_class82);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringFindNormalizedMatchRangePipe=exports.StringFindNormalizedMatchRangePipe=(_dec42=(0,_core.Pipe)({name:'genericStringFindNormalizedMatchRange'}),_dec42(_class84=function(_AbstractToolsPipe41){_inherits(StringFindNormalizedMatchRangePipe,_AbstractToolsPipe41);function StringFindNormalizedMatchRangePipe(){var _ref40;var _temp42,_this41,_ret40;_classCallCheck(this,StringFindNormalizedMatchRangePipe);for(var _len41=arguments.length,args=Array(_len41),_key41=0;_key41<_len41;_key41++){args[_key41]=arguments[_key41]}return _ret40=(_temp42=(_this41=_possibleConstructorReturn(this,(_ref40=StringFindNormalizedMatchRangePipe.__proto__||Object.getPrototypeOf(StringFindNormalizedMatchRangePipe)).call.apply(_ref40,[this].concat(args))),_this41),_this41.methodName='stringFindNormalizedMatchRange',_temp42),_possibleConstructorReturn(_this41,_ret40)}return StringFindNormalizedMatchRangePipe}(AbstractToolsPipe))||_class84);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringMarkPipe=exports.StringMarkPipe=(_dec43=(0,_core.Pipe)({name:'genericStringMark'}),_dec43(_class86=function(_AbstractToolsPipe42){_inherits(StringMarkPipe,_AbstractToolsPipe42);function StringMarkPipe(){var _ref41;var _temp43,_this42,_ret41;_classCallCheck(this,StringMarkPipe);for(var _len42=arguments.length,args=Array(_len42),_key42=0;_key42<_len42;_key42++){args[_key42]=arguments[_key42]}return _ret41=(_temp43=(_this42=_possibleConstructorReturn(this,(_ref41=StringMarkPipe.__proto__||Object.getPrototypeOf(StringMarkPipe)).call.apply(_ref41,[this].concat(args))),_this42),_this42.methodName='stringMark',_temp43),_possibleConstructorReturn(_this42,_ret41)}return StringMarkPipe}(AbstractToolsPipe))||_class86);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringMD5Pipe=exports.StringMD5Pipe=(_dec44=(0,_core.Pipe)({name:'genericStringMD5'}),_dec44(_class88=function(_AbstractToolsPipe43){_inherits(StringMD5Pipe,_AbstractToolsPipe43);function StringMD5Pipe(){var _ref42;var _temp44,_this43,_ret42;_classCallCheck(this,StringMD5Pipe);for(var _len43=arguments.length,args=Array(_len43),_key43=0;_key43<_len43;_key43++){args[_key43]=arguments[_key43]}return _ret42=(_temp44=(_this43=_possibleConstructorReturn(this,(_ref42=StringMD5Pipe.__proto__||Object.getPrototypeOf(StringMD5Pipe)).call.apply(_ref42,[this].concat(args))),_this43),_this43.methodName='stringMD5',_temp44),_possibleConstructorReturn(_this43,_ret42)}return StringMD5Pipe}(AbstractToolsPipe))||_class88);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringNormalizePhoneNumberPipe=exports.StringNormalizePhoneNumberPipe=(_dec45=(0,_core.Pipe)({name:'genericStringNormalizePhoneNumber'}),_dec45(_class90=function(_AbstractToolsPipe44){_inherits(StringNormalizePhoneNumberPipe,_AbstractToolsPipe44);function StringNormalizePhoneNumberPipe(){var _ref43;var _temp45,_this44,_ret43;_classCallCheck(this,StringNormalizePhoneNumberPipe);for(var _len44=arguments.length,args=Array(_len44),_key44=0;_key44<_len44;_key44++){args[_key44]=arguments[_key44]}return _ret43=(_temp45=(_this44=_possibleConstructorReturn(this,(_ref43=StringNormalizePhoneNumberPipe.__proto__||Object.getPrototypeOf(StringNormalizePhoneNumberPipe)).call.apply(_ref43,[this].concat(args))),_this44),_this44.methodName='stringNormalizePhoneNumber',_temp45),_possibleConstructorReturn(_this44,_ret43)}return StringNormalizePhoneNumberPipe}(AbstractToolsPipe))||_class90);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringParseEncodedObjectPipe=exports.StringParseEncodedObjectPipe=(_dec46=(0,_core.Pipe)({name:'genericStringParseEncodedObject'}),_dec46(_class92=function(_AbstractToolsPipe45){_inherits(StringParseEncodedObjectPipe,_AbstractToolsPipe45);function StringParseEncodedObjectPipe(){var _ref44;var _temp46,_this45,_ret44;_classCallCheck(this,StringParseEncodedObjectPipe);for(var _len45=arguments.length,args=Array(_len45),_key45=0;_key45<_len45;_key45++){args[_key45]=arguments[_key45]}return _ret44=(_temp46=(_this45=_possibleConstructorReturn(this,(_ref44=StringParseEncodedObjectPipe.__proto__||Object.getPrototypeOf(StringParseEncodedObjectPipe)).call.apply(_ref44,[this].concat(args))),_this45),_this45.methodName='stringParseEncodedObject',_temp46),_possibleConstructorReturn(_this45,_ret44)}return StringParseEncodedObjectPipe}(AbstractToolsPipe))||_class92);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringRepresentPhoneNumberPipe=exports.StringRepresentPhoneNumberPipe=(_dec47=(0,_core.Pipe)({name:'genericStringRepresentPhoneNumber'}),_dec47(_class94=function(_AbstractToolsPipe46){_inherits(StringRepresentPhoneNumberPipe,_AbstractToolsPipe46);function StringRepresentPhoneNumberPipe(){var _ref45;var _temp47,_this46,_ret45;_classCallCheck(this,StringRepresentPhoneNumberPipe);for(var _len46=arguments.length,args=Array(_len46),_key46=0;_key46<_len46;_key46++){args[_key46]=arguments[_key46]}return _ret45=(_temp47=(_this46=_possibleConstructorReturn(this,(_ref45=StringRepresentPhoneNumberPipe.__proto__||Object.getPrototypeOf(StringRepresentPhoneNumberPipe)).call.apply(_ref45,[this].concat(args))),_this46),_this46.methodName='stringRepresentPhoneNumber',_temp47),_possibleConstructorReturn(_this46,_ret45)}return StringRepresentPhoneNumberPipe}(AbstractToolsPipe))||_class94);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringDecodeHTMLEntitiesPipe=exports.StringDecodeHTMLEntitiesPipe=(_dec48=(0,_core.Pipe)({name:'genericStringDecodeHTMLEntities'}),_dec48(_class96=function(_AbstractToolsPipe47){_inherits(StringDecodeHTMLEntitiesPipe,_AbstractToolsPipe47);function StringDecodeHTMLEntitiesPipe(){var _ref46;var _temp48,_this47,_ret46;_classCallCheck(this,StringDecodeHTMLEntitiesPipe);for(var _len47=arguments.length,args=Array(_len47),_key47=0;_key47<_len47;_key47++){args[_key47]=arguments[_key47]}return _ret46=(_temp48=(_this47=_possibleConstructorReturn(this,(_ref46=StringDecodeHTMLEntitiesPipe.__proto__||Object.getPrototypeOf(StringDecodeHTMLEntitiesPipe)).call.apply(_ref46,[this].concat(args))),_this47),_this47.methodName='stringDecodeHTMLEntities',_temp48),_possibleConstructorReturn(_this47,_ret46)}return StringDecodeHTMLEntitiesPipe}(AbstractToolsPipe))||_class96);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var StringNormalizeDomNodeSelectorPipe=exports.StringNormalizeDomNodeSelectorPipe=(_dec49=(0,_core.Pipe)({name:'genericStringNormalizeDomNodeSelector'}),_dec49(_class98=function(_AbstractToolsPipe48){_inherits(StringNormalizeDomNodeSelectorPipe,_AbstractToolsPipe48);function StringNormalizeDomNodeSelectorPipe(){var _ref47;var _temp49,_this48,_ret47;_classCallCheck(this,StringNormalizeDomNodeSelectorPipe);for(var _len48=arguments.length,args=Array(_len48),_key48=0;_key48<_len48;_key48++){args[_key48]=arguments[_key48]}return _ret47=(_temp49=(_this48=_possibleConstructorReturn(this,(_ref47=StringNormalizeDomNodeSelectorPipe.__proto__||Object.getPrototypeOf(StringNormalizeDomNodeSelectorPipe)).call.apply(_ref47,[this].concat(args))),_this48),_this48.methodName='stringNormalizeDomNodeSelector',_temp49),_possibleConstructorReturn(_this48,_ret47)}return StringNormalizeDomNodeSelectorPipe}(AbstractToolsPipe))||_class98);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var NumberGetUTCTimestampPipe=exports.NumberGetUTCTimestampPipe=(_dec50=(0,_core.Pipe)({name:'genericNumberGetUTCTimestamp'}),_dec50(_class100=function(_AbstractToolsPipe49){_inherits(NumberGetUTCTimestampPipe,_AbstractToolsPipe49);function NumberGetUTCTimestampPipe(){var _ref48;var _temp50,_this49,_ret48;_classCallCheck(this,NumberGetUTCTimestampPipe);for(var _len49=arguments.length,args=Array(_len49),_key49=0;_key49<_len49;_key49++){args[_key49]=arguments[_key49]}return _ret48=(_temp50=(_this49=_possibleConstructorReturn(this,(_ref48=NumberGetUTCTimestampPipe.__proto__||Object.getPrototypeOf(NumberGetUTCTimestampPipe)).call.apply(_ref48,[this].concat(args))),_this49),_this49.methodName='numberGetUTCTimestamp',_temp50),_possibleConstructorReturn(_this49,_ret48)}return NumberGetUTCTimestampPipe}(AbstractToolsPipe))||_class100);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var NumberIsNotANumberPipe=exports.NumberIsNotANumberPipe=(_dec51=(0,_core.Pipe)({name:'genericNumberIsNotANumber'}),_dec51(_class102=function(_AbstractToolsPipe50){_inherits(NumberIsNotANumberPipe,_AbstractToolsPipe50);function NumberIsNotANumberPipe(){var _ref49;var _temp51,_this50,_ret49;_classCallCheck(this,NumberIsNotANumberPipe);for(var _len50=arguments.length,args=Array(_len50),_key50=0;_key50<_len50;_key50++){args[_key50]=arguments[_key50]}return _ret49=(_temp51=(_this50=_possibleConstructorReturn(this,(_ref49=NumberIsNotANumberPipe.__proto__||Object.getPrototypeOf(NumberIsNotANumberPipe)).call.apply(_ref49,[this].concat(args))),_this50),_this50.methodName='numberIsNotANumber',_temp51),_possibleConstructorReturn(_this50,_ret49)}return NumberIsNotANumberPipe}(AbstractToolsPipe))||_class102);/**
 * Wrapper pipe for corresponding tools function.
 * @property methodName - Saves the name of wrapped tools function.
 */var NumberRoundPipe=exports.NumberRoundPipe=(_dec52=(0,_core.Pipe)({name:'genericNumberRound'}),_dec52(_class104=function(_AbstractToolsPipe51){_inherits(NumberRoundPipe,_AbstractToolsPipe51);function NumberRoundPipe(){var _ref50;var _temp52,_this51,_ret50;_classCallCheck(this,NumberRoundPipe);for(var _len51=arguments.length,args=Array(_len51),_key51=0;_key51<_len51;_key51++){args[_key51]=arguments[_key51]}return _ret50=(_temp52=(_this51=_possibleConstructorReturn(this,(_ref50=NumberRoundPipe.__proto__||Object.getPrototypeOf(NumberRoundPipe)).call.apply(_ref50,[this].concat(args))),_this51),_this51.methodName='numberRound',_temp52),_possibleConstructorReturn(_this51,_ret50)}return NumberRoundPipe}(AbstractToolsPipe))||_class104);// / endregion
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
 */var AttachmentsAreEqualPipe=exports.AttachmentsAreEqualPipe=(_dec53=(0,_core.Pipe)({name:'genericAttachmentsAreEqual'}),_dec53(_class106=function(){/**
     * Gets needed services injected.
     * @param initialData - Injected initial data service instance.
     * @param injector - Application specific injector instance.
     * @param ngZone - Injected execution context service instance.
     * @param representObjectPipe - Represent object pipe instance.
     * @param stringMD5Pipe - Injected string md5 pipe instance.
     * @returns Nothing.
     */function AttachmentsAreEqualPipe(initialData,injector,ngZone,representObjectPipe,stringMD5Pipe){_classCallCheck(this,AttachmentsAreEqualPipe);this.data=this.data;this.ngZone=this.ngZone;this.representObject=this.representObject;this.specialNames=this.specialNames;this.stringMD5=this.stringMD5;this.data=injector.get(DataService);this.ngZone=ngZone;this.representObject=representObjectPipe.transform.bind(representObjectPipe);this.specialNames=initialData.configuration.database.model.property.name.special;this.stringMD5=stringMD5Pipe.transform.bind(stringMD5Pipe)}/**
     * Performs the actual transformations process.
     * @param first - First attachment to compare.
     * @param second - Second attachment to compare.
     * @returns Comparison result.
     */_createClass(AttachmentsAreEqualPipe,[{key:'transform',value:function(){var _ref51=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(first,second){var data,_arr,_i,_type,_arr2,_i2,_type2,_arr3,_i3,_type3,_name,databaseConnection,_databaseConnection$p,message;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(!(first===second)){_context.next=2;break}return _context.abrupt('return',true);case 2:data={first:{given:first},second:{given:second}};_arr=['first','second'];_i=0;case 5:if(!(_i<_arr.length)){_context.next=16;break}_type=_arr[_i];if(!(_typeof(data[_type].given)!=='object'||data[_type].given===null)){_context.next=9;break}return _context.abrupt('return',false);case 9:/* eslint-disable camelcase */data[_type].content_type=data[_type].given.type||data[_type].given.content_type;/* eslint-enable camelcase */data[_type].data=('data'in data[_type].given?data[_type].given.data:data[_type].given)||NaN;data[_type].hash=data[_type].given.digest||data[_type].given.hash||NaN;data[_type].size=data[_type].given.size||data[_type].given.length;case 13:_i++;_context.next=5;break;case 16:// Search for an exclusion criterion.
_arr2=['content_type','size'];_i2=0;case 18:if(!(_i2<_arr2.length)){_context.next=25;break}_type2=_arr2[_i2];if(!(![data.first[_type2],data.second[_type2]].includes(undefined)&&data.first[_type2]!==data.second[_type2])){_context.next=22;break}return _context.abrupt('return',false);case 22:_i2++;_context.next=18;break;case 25:if(!(data.first.data===data.second.data)){_context.next=27;break}return _context.abrupt('return',true);case 27:_arr3=['first','second'];_i3=0;case 29:if(!(_i3<_arr3.length)){_context.next=59;break}_type3=_arr3[_i3];if(data[_type3].hash){_context.next=56;break}if(!(data[_type3].data===null||!['object','string'].includes(_typeof(data[_type3].data)))){_context.next=34;break}return _context.abrupt('return',false);case 34:_name='genericTemp';databaseConnection=new this.data.database(_name);_context.prev=36;_context.next=39;return databaseConnection.put((_databaseConnection$p={},_defineProperty(_databaseConnection$p,this.specialNames.id,_name),_defineProperty(_databaseConnection$p,this.specialNames.attachment,_defineProperty({},_name,{data:data[_type3].data,/* eslint-disable camelcase */content_type:'application/octet-stream'/* eslint-enable camelcase */})),_databaseConnection$p));case 39:_context.next=41;return databaseConnection.get(_name);case 41:_context.t0=this.specialNames.attachment;_context.t1=_name;data[_type3].hash=_context.sent[_context.t0][_context.t1].digest;_context.next=52;break;case 46:_context.prev=46;_context.t2=_context['catch'](36);message='unknown';try{message=this.representObject(_context.t2)}catch(error){}console.warn('Given attachments for equality check are not '+('valid: '+message));return _context.abrupt('return',false);case 52:_context.prev=52;_context.next=55;return databaseConnection.destroy();case 55:return _context.finish(52);case 56:_i3++;_context.next=29;break;case 59:return _context.abrupt('return',data.first.hash===data.second.hash);case 60:case'end':return _context.stop();}}},_callee,this,[[36,46,52,56]])}));function transform(_x,_x2){return _ref51.apply(this,arguments)}return transform}()}]);return AttachmentsAreEqualPipe}())||_class106);// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[InitialDataService,_core.Injector,_core.NgZone,RepresentObjectPipe,StringMD5Pipe],AttachmentsAreEqualPipe);/**
 * Retrieves a matching filename by given filename prefix.
 */var GetFilenameByPrefixPipe=exports.GetFilenameByPrefixPipe=(_dec54=(0,_core.Pipe)({name:'genericGetFilenameByPrefix'}),_dec54(_class108=function(){function GetFilenameByPrefixPipe(){_classCallCheck(this,GetFilenameByPrefixPipe)}_createClass(GetFilenameByPrefixPipe,[{key:'transform',/**
     * Performs the actual transformations process.
     * @param attachments - Documents attachments object to determine file with
     * matching file name prefix.
     * @param prefix - Prefix or nothing to search for. If nothing given first
     * file name will be returned.
     * @returns Matching file name or null if no file matches.
     */value:function transform(attachments,prefix){if(prefix){for(var _name2 in attachments){if(attachments.hasOwnProperty(_name2)&&_name2.startsWith(prefix))return _name2}}else{var keys=Object.keys(attachments);if(keys.length)return keys[0]}return null}}]);return GetFilenameByPrefixPipe}())||_class108);// IgnoreTypeCheck
/**
 * Retrieves if a filename with given prefix exists.
 * @property attachmentName - Name of attachment property.
 * @property getFilenameByPrefix - Filename by prefix pipe's transformation
 * function.
 */var AttachmentWithPrefixExistsPipe=exports.AttachmentWithPrefixExistsPipe=(_dec55=(0,_core.Pipe)({name:'genericAttachmentWithPrefixExists'}),_dec55(_class109=function(){/**
     * Gets needed file name by prefix pipe injected.
     * @param getFilenameByPrefixPipe - Filename by prefix pipe instance.
     * @param initialData - Injected initial data service.
     * @returns Nothing.
     */function AttachmentWithPrefixExistsPipe(getFilenameByPrefixPipe,initialData){_classCallCheck(this,AttachmentWithPrefixExistsPipe);this.attachmentName=this.attachmentName;this.getFilenameByPrefix=this.getFilenameByPrefix;this.attachmentName=initialData.configuration.database.model.property.name.special.attachment;this.getFilenameByPrefix=getFilenameByPrefixPipe.transform.bind(getFilenameByPrefixPipe)}/**
     * Performs the actual transformations process.
     * @param document - Documents with attachments to analyse.
     * @param namePrefix - Prefix or nothing to search for. If nothing given
     * "false" will be returned either.
     * @returns Boolean indication if given file name prefix exists.
     */_createClass(AttachmentWithPrefixExistsPipe,[{key:'transform',value:function transform(document,namePrefix){if(document.hasOwnProperty(this.attachmentName)){var _name3=this.getFilenameByPrefix(document[this.attachmentName],namePrefix);if(_name3)return document[this.attachmentName][_name3].hasOwnProperty('data')&&![undefined,null].includes(document[this.attachmentName][_name3].data)}return false}}]);return AttachmentWithPrefixExistsPipe}())||_class109);// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[GetFilenameByPrefixPipe,InitialDataService],AttachmentWithPrefixExistsPipe);/**
 * Removes all meta data from a document recursively.
 * @property modelConfiguration - Model configuration object.
 */var ExtractDataPipe=exports.ExtractDataPipe=(_dec56=(0,_core.Pipe)({name:'genericExtractData'}),_dec56(_class111=function(){/**
     * Gets injected services.
     * @param initialData - Initial data service instance.
     * @returns Nothing.
     */function ExtractDataPipe(initialData){_classCallCheck(this,ExtractDataPipe);this.modelConfiguration=this.modelConfiguration;this.modelConfiguration=initialData.configuration.database.model}/**
     * Extracts raw data from given scope item.
     * @param item - Item to extract data from.
     * @returns Given extracted data.
     */_createClass(ExtractDataPipe,[{key:'transform',value:function transform(item){if(Array.isArray(item)){var result=[];var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=item[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var subItem=_step2.value;result.push(this.transform(subItem))}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally{if(_didIteratorError2){throw _iteratorError2}}}return result}else if((typeof item==='undefined'?'undefined':_typeof(item))==='object'&&item!==null){var specialNames=this.modelConfiguration.property.name.special;if(item.hasOwnProperty('value')){if(_typeof(item.value)==='object'&&item.value!==null&&specialNames.type in item.value&&this.modelConfiguration.entities.hasOwnProperty(item.value[specialNames.type]))return this._extractFromObject(item.value);return this.transform(item.value)}else if(specialNames.type in item&&this.modelConfiguration.entities.hasOwnProperty(item[specialNames.type]))return this._extractFromObject(item);return item}return item}/**
     * Retrieves raw data (without meta data) for given scope recursively.
     * @param object - Object to use to determine data from.
     * @returns Resolved data.
     */},{key:'_extractFromObject',value:function _extractFromObject(object){var specialNames=this.modelConfiguration.property.name.special;var result={};for(var _key52 in object){if(object.hasOwnProperty(_key52)&&(!object.hasOwnProperty(specialNames.type)||this.modelConfiguration.entities[object[specialNames.type]].hasOwnProperty(_key52)||this.modelConfiguration.entities[object[specialNames.type]].hasOwnProperty(specialNames.additional))&&!['_metaData',specialNames.additional,specialNames.allowedRole,// NOTE: Will be handled later.
specialNames.attachment,specialNames.conflict,specialNames.constraint.execution,specialNames.constraint.expression,specialNames.deletedConflict,specialNames.extend,specialNames.localSequence,specialNames.maximumAggregatedSize,specialNames.minimumAggregatedSize,specialNames.revisions,specialNames.revisionsInformation].includes(_key52))result[_key52]=this.transform(object[_key52])}if(object.hasOwnProperty(specialNames.attachment)&&object[specialNames.attachment])for(var _key53 in object[specialNames.attachment]){if(object[specialNames.attachment].hasOwnProperty(_key53)&&_typeof(object[specialNames.attachment][_key53])==='object'&&object[specialNames.attachment][_key53]!==null&&'hasOwnProperty'in object[specialNames.attachment]&&object[specialNames.attachment][_key53].hasOwnProperty('value')&&object[specialNames.attachment][_key53].value){if(!result[specialNames.attachment])result[specialNames.attachment]={};result[specialNames.attachment][object[specialNames.attachment][_key53].value.name]=object[specialNames.attachment][_key53].value}}return result}}]);return ExtractDataPipe}())||_class111);// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[InitialDataService],ExtractDataPipe);/**
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
 */var ExtractRawDataPipe=exports.ExtractRawDataPipe=(_dec57=(0,_core.Pipe)({name:'genericExtractRawData'}),_dec57(_class113=function(){/**
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
     */function ExtractRawDataPipe(attachmentsAreEqualPipe,equalsPipe,initialData,injector,numberGetUTCTimestampPipe,utility){_classCallCheck(this,ExtractRawDataPipe);this.attachmentsAreEqual=this.attachmentsAreEqual;this.dataScope=this.dataScope;this.equals=this.equals;this.modelConfiguration=this.modelConfiguration;this.numberGetUTCTimestamp=this.numberGetUTCTimestamp;this.specialNames=this.specialNames;this.tools=this.tools;this.attachmentsAreEqual=attachmentsAreEqualPipe.transform.bind(attachmentsAreEqualPipe);this.dataScope=injector.get(DataScopeService);this.equals=equalsPipe.transform.bind(equalsPipe);this.modelConfiguration=initialData.configuration.database.model;this.numberGetUTCTimestamp=numberGetUTCTimestampPipe.transform.bind(numberGetUTCTimestampPipe);this.specialNames=this.modelConfiguration.property.name.special;this.tools=utility.fixed.tools}/**
     * Converts all (nested) date object in given data structure to their
     * corresponding utc timestamps in milliseconds.
     * @param value - Given data structure to convert.
     * @returns Given converted object.
     */_createClass(ExtractRawDataPipe,[{key:'convertDateToTimestampRecursively',value:function convertDateToTimestampRecursively(value){if((typeof value==='undefined'?'undefined':_typeof(value))==='object'&&value!==null){if(value instanceof Date)return this.numberGetUTCTimestamp(value);if(Array.isArray(value)){var result=[];var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=value[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var subValue=_step3.value;result.push(this.convertDateToTimestampRecursively(subValue))}}catch(err){_didIteratorError3=true;_iteratorError3=err}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return()}}finally{if(_didIteratorError3){throw _iteratorError3}}}return result}if(Object.getPrototypeOf(value)===Object.prototype){var _result={};for(var _name4 in value){if(value.hasOwnProperty(_name4))_result[_name4]=this.convertDateToTimestampRecursively(value[_name4])}return _result}}return value}/**
     * Slices already existing attachment content from given new document
     * compared to given existing document.
     * @param newDocument - New document to take into account.
     * @param oldDocument - Old document to take into account for comparison.
     * @param specification - Specification object to check for expected
     * attachment types.
     * @returns An object indicating existing data and sliced given attachment
     * data wrapped in a promise (to asynchronous compare attachment content).
     */},{key:'getNotAlreadyExistingAttachmentData',value:function(){var _ref52=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee2(newDocument,oldDocument,specification){var result,_type4,oldAttachments,fileName,_fileName,firstOldAttachmentName,_firstOldAttachmentName,_fileName2;return regeneratorRuntime.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:result={};if(!(specification&&specification.hasOwnProperty(this.specialNames.attachment))){_context2.next=38;break}_context2.t0=regeneratorRuntime.keys(specification[this.specialNames.attachment]);case 3:if((_context2.t1=_context2.t0()).done){_context2.next=38;break}_type4=_context2.t1.value;if(!specification[this.specialNames.attachment].hasOwnProperty(_type4)){_context2.next=36;break}// region retrieve all type specific existing attachments
oldAttachments={};if(oldDocument.hasOwnProperty(this.specialNames.attachment)&&oldDocument[this.specialNames.attachment])for(fileName in oldDocument[this.specialNames.attachment]){if(oldDocument[this.specialNames.attachment].hasOwnProperty(fileName)&&new RegExp(_type4).test(fileName))oldAttachments[fileName]=oldDocument[this.specialNames.attachment][fileName]}// endregion
if(!newDocument.hasOwnProperty(this.specialNames.attachment)){_context2.next=35;break}_context2.t2=regeneratorRuntime.keys(newDocument[this.specialNames.attachment]);case 10:if((_context2.t3=_context2.t2()).done){_context2.next=35;break}_fileName=_context2.t3.value;if(!(newDocument[this.specialNames.attachment].hasOwnProperty(_fileName)&&new RegExp(_type4).test(_fileName))){_context2.next=33;break}if(!(newDocument[this.specialNames.attachment][_fileName].hasOwnProperty('data')||newDocument[this.specialNames.attachment][_fileName].hasOwnProperty('stub'))){_context2.next=32;break}// Insert new attachment.
result[_fileName]=newDocument[this.specialNames.attachment][_fileName];// region remove already existing data
if(!oldAttachments.hasOwnProperty(_fileName)){_context2.next=23;break}_context2.next=18;return this.attachmentsAreEqual(newDocument[this.specialNames.attachment][_fileName],oldAttachments[_fileName]);case 18:if(!_context2.sent){_context2.next=20;break}/*
                                                Existing attachment has not
                                                been changed.
                                            */delete result[_fileName];case 20:delete oldAttachments[_fileName];_context2.next=30;break;case 23:if(!(Object.keys(oldAttachments).length&&specification[this.specialNames.attachment][_type4].maximumNumber===1)){_context2.next=30;break}firstOldAttachmentName=Object.keys(oldAttachments)[0];_context2.next=27;return this.attachmentsAreEqual(newDocument[this.specialNames.attachment][_fileName],oldAttachments[firstOldAttachmentName]);case 27:if(!_context2.sent){_context2.next=30;break}/*
                                                Existing attachment has been
                                                renamed.
                                            */result[_fileName]=this.tools.copyLimitedRecursively(oldAttachments[firstOldAttachmentName]);result[_fileName].name=_fileName;case 30:_context2.next=33;break;case 32:if(oldAttachments.hasOwnProperty(_fileName))// Existing attachment has not been changed.
delete oldAttachments[_fileName];else if(Object.keys(oldAttachments).length&&specification[this.specialNames.attachment][_type4].maximumNumber===1){// Existing attachment has been renamed.
_firstOldAttachmentName=Object.keys(oldAttachments)[0];result[_fileName]=this.tools.copyLimitedRecursively(oldAttachments[_firstOldAttachmentName]);result[_fileName].name=_fileName;delete oldAttachments[_firstOldAttachmentName]}case 33:_context2.next=10;break;case 35:// endregion
// region mark all not mentioned old attachments as removed
for(_fileName2 in oldAttachments){if(oldAttachments.hasOwnProperty(_fileName2))result[_fileName2]={data:null// endregion
}}case 36:_context2.next=3;break;case 38:return _context2.abrupt('return',{payloadExists:Object.keys(result).length!==0,result:result});case 39:case'end':return _context2.stop();}}},_callee2,this)}));function getNotAlreadyExistingAttachmentData(_x3,_x4,_x5){return _ref52.apply(this,arguments)}return getNotAlreadyExistingAttachmentData}()/**
     * Remove already existing values and mark removed or truncated values
     * (only respect values if specified in model).
     * @param newData - Data to consider.
     * @param oldData - Old data to use for checking for equality.
     * @param specification - Specification object for given document.
     * @returns An object holding new data and boolean indicating if there
     * exists any payload.
     */},{key:'removeAlreadyExistingData',value:function removeAlreadyExistingData(newData,oldData,specification){var payloadExists=false;if(Array.isArray(newData)){/*
                NOTE: We do not have to take any specification data into
                account for an array since any change in any item breaks
                complete array equality.
            */if(!this.equals(newData,oldData))payloadExists=true}else if(specification&&(typeof newData==='undefined'?'undefined':_typeof(newData))==='object'&&newData!==null&&(typeof oldData==='undefined'?'undefined':_typeof(oldData))==='object'&&oldData!==null){var newPropertyNames=Object.keys(newData);for(var _name5 in oldData){if(oldData.hasOwnProperty(_name5)){var _index=newPropertyNames.indexOf(_name5);if(_index!==-1)newPropertyNames.splice(_index,1);if(!this.modelConfiguration.property.name.reserved.concat(this.specialNames.deleted,this.specialNames.id,this.specialNames.revision,this.specialNames.type).includes(_name5))if(newData.hasOwnProperty(_name5)){var result=this.removeAlreadyExistingData(newData[_name5],oldData[_name5],this.dataScope.determineNestedSpecifcation(_name5,specification));if(result.payloadExists){payloadExists=true;newData[_name5]=result.newData}else if(specification.hasOwnProperty(_name5))delete newData[_name5]}else{payloadExists=true;newData[_name5]=null}}}if(newPropertyNames.length)payloadExists=true}else if(!this.equals(newData,this.convertDateToTimestampRecursively(oldData)))payloadExists=true;return{newData:newData,payloadExists:payloadExists}}/**
     * Removes all special property names with meta data from given document.
     * @param data - To trim.
     * @param specification - Specification object for given document.
     * @returns Sliced given document.
     */},{key:'removeMetaData',value:function removeMetaData(data,specification){if(data instanceof Date)return this.numberGetUTCTimestamp(data);if(Array.isArray(data)){var _index2=0;var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=data[Symbol.iterator](),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var item=_step4.value;data[_index2]=this.removeMetaData(item,specification);_index2+=1}}catch(err){_didIteratorError4=true;_iteratorError4=err}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return()}}finally{if(_didIteratorError4){throw _iteratorError4}}}return data}if((typeof data==='undefined'?'undefined':_typeof(data))==='object'&&data!==null){var result={};for(var _name6 in data){if(data.hasOwnProperty(_name6)){var _emptyEqualsToNull=Boolean((specification&&(specification.hasOwnProperty(_name6)&&specification[_name6]||specification.hasOwnProperty(this.specialNames.additional)&&specification[this.specialNames.additional])||{}).emptyEqualsToNull);if(![undefined,null].includes(data[_name6])&&!(_emptyEqualsToNull&&(data[_name6]===''||Array.isArray(data[_name6])&&data[_name6].length===0||_typeof(data[_name6])==='object'&&!(data[_name6]instanceof Date)&&Object.keys(data[_name6]).length===0)))if(this.modelConfiguration.property.name.reserved.concat(this.specialNames.deleted,this.specialNames.id,this.specialNames.revision,this.specialNames.type).includes(_name6))result[_name6]=data[_name6];else if(_name6===this.specialNames.attachment){if(_typeof(data[_name6])==='object'&&data[_name6]!==null){result[_name6]={};for(var fileName in data[_name6]){if(data[_name6].hasOwnProperty(fileName))result[_name6][fileName]={/* eslint-disable camelcase */content_type:data[_name6][fileName].content_type||'application/octet-stream'/* eslint-enable camelcase */};if(data[_name6][fileName].hasOwnProperty('data'))result[_name6][fileName].data=data[_name6][fileName].data;else{var _arr4=['digest','stub'];for(var _i4=0;_i4<_arr4.length;_i4++){var _type5=_arr4[_i4];if(data[_name6][fileName].hasOwnProperty(_type5))result[_name6][fileName][_type5]=data[_name6][fileName][_type5]}}}}}else if(![this.specialNames.additional,this.specialNames.allowedRole,this.specialNames.conflict,this.specialNames.constraint.execution,this.specialNames.constraint.expression,this.specialNames.deletedConflict,this.specialNames.extend,this.specialNames.localSequence,this.specialNames.maximumAggregatedSize,this.specialNames.minimumAggregatedSize,this.specialNames.revisions,this.specialNames.revisionsInformation].includes(_name6)&&(!specification||specification.hasOwnProperty(_name6)||specification.hasOwnProperty(this.specialNames.additional)))result[_name6]=this.removeMetaData(data[_name6],this.dataScope.determineNestedSpecifcation(_name6,specification))}}return result}return data}/**
     * Implements the meta data removing of given document.
     * @param newDocument - Document to slice meta data from.
     * @param oldDocument - Optionally existing old document to take into
     * account.
     * @returns The copied sliced version of given document if changes exists
     * (checked against given old document) and "null" otherwise. Result is
     * wrapped into a promise to process binary data asynchronous.
     */},{key:'transform',value:function(){var _ref53=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee3(newDocument,oldDocument){var specification,result,payloadExists,attachmentDifference,_name7;return regeneratorRuntime.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:specification=null;if(this.specialNames.type in newDocument&&this.modelConfiguration.entities.hasOwnProperty(newDocument[this.specialNames.type]))specification=this.modelConfiguration.entities[newDocument[this.specialNames.type]];result=this.removeMetaData(newDocument,specification);payloadExists=false;if(!oldDocument){_context3.next=10;break}_context3.next=7;return this.getNotAlreadyExistingAttachmentData(result,oldDocument,specification);case 7:attachmentDifference=_context3.sent;if(attachmentDifference.payloadExists){result[this.specialNames.attachment]=attachmentDifference.result;payloadExists=attachmentDifference.payloadExists}if(this.removeAlreadyExistingData(result,this.removeMetaData(oldDocument,specification),specification).payloadExists)payloadExists=true;case 10:if(payloadExists){_context3.next=19;break}_context3.t0=regeneratorRuntime.keys(result);case 12:if((_context3.t1=_context3.t0()).done){_context3.next=19;break}_name7=_context3.t1.value;if(!(result.hasOwnProperty(_name7)&&!this.modelConfiguration.property.name.reserved.concat(this.specialNames.deleted,this.specialNames.id,this.specialNames.revision,this.specialNames.type).includes(_name7))){_context3.next=17;break}payloadExists=true;return _context3.abrupt('break',19);case 17:_context3.next=12;break;case 19:return _context3.abrupt('return',payloadExists?result:null);case 20:case'end':return _context3.stop();}}},_callee3,this)}));function transform(_x6,_x7){return _ref53.apply(this,arguments)}return transform}()}]);return ExtractRawDataPipe}())||_class113);// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[AttachmentsAreEqualPipe,EqualsPipe,InitialDataService,_core.Injector,NumberGetUTCTimestampPipe,UtilityService],ExtractRawDataPipe);/**
 * Checks if given reference is defined.
 */var IsDefinedPipe=exports.IsDefinedPipe=(_dec58=(0,_core.Pipe)({name:'genericIsDefined'}),_dec58(_class115=function(){function IsDefinedPipe(){_classCallCheck(this,IsDefinedPipe)}_createClass(IsDefinedPipe,[{key:'transform',/**
     * Performs the actual comparison.
     * @param object - Object to compare against "undefined" or "null".
     * @param nullIsUndefined - Indicates whether "null" should be handles as
     * "undefined".
     * @returns The comparison result.
     */value:function transform(object){var nullIsUndefined=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;return!(object===undefined||nullIsUndefined&&object===null)}}]);return IsDefinedPipe}())||_class115);// IgnoreTypeCheck
/**
 * Retrieves a matching filename by given filename prefix.
 */var LimitToPipe=exports.LimitToPipe=(_dec59=(0,_core.Pipe)({name:'genericLimitTo'}),_dec59(_class116=function(){function LimitToPipe(){_classCallCheck(this,LimitToPipe)}_createClass(LimitToPipe,[{key:'transform',/**
     * Limits number of items of given string, Object (keys) or Array.
     * @param input - Object to retrieve key names from.
     * @param limit - Number of needed items.
     * @param begin - Starting point to slice from.
     * @returns Copy of given sliced object.
     */value:function transform(input,limit,begin){limit=Math.abs(Number(limit))===Infinity?Number(limit):parseInt(limit);if(isNaN(limit))return input;if(typeof input==='number')input=input.toString();else if((typeof input==='undefined'?'undefined':_typeof(input))==='object'&&input!==null&&!Array.isArray(input))input=Object.keys(input).sort();if(!(Array.isArray(input)||typeof input==='string'))return input;begin=!begin||isNaN(begin)?0:parseInt(begin);if(begin<0)begin=Math.max(0,input.length+begin);if(limit>=0)return input.slice(begin,begin+limit);else if(begin===0)return input.slice(limit,input.length);return input.slice(Math.max(0,begin+limit),begin)}}]);return LimitToPipe}())||_class116);// IgnoreTypeCheck
/**
 * Returns a copy of given object where each item was processed through given
 * function.
 * @property injector - Pipe specific injector to determine pipe dynamically at
 * runtime.
 */var MapPipe=exports.MapPipe=(_dec60=(0,_core.Pipe)({name:'genericMap'}),_dec60(_class117=function(){/**
     * Injects the injector and saves as instance property.
     * @param injector - Pipe injector service instance.
     * @returns Nothing.
     */function MapPipe(injector){_classCallCheck(this,MapPipe);this.injector=this.injector;this.injector=injector}/**
     * Performs the actual transformation.
     * @param object - Iterable item where given pipe should be applied to each
     * value.
     * @param pipeName - Pipe to apply to each value.
     * @param additionalArguments - All additional arguments will be forwarded
     * to given pipe (after the actual value).
     * @returns Given transform copied object.
     */_createClass(MapPipe,[{key:'transform',value:function transform(object,pipeName){var pipe=this.injector.get(pipeName);for(var _len52=arguments.length,additionalArguments=Array(_len52>2?_len52-2:0),_key54=2;_key54<_len52;_key54++){additionalArguments[_key54-2]=arguments[_key54]}if(Array.isArray(object)){var _result2=[];var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=object[Symbol.iterator](),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var item=_step5.value;_result2.push(pipe.transform.apply(pipe,[item].concat(additionalArguments)))}}catch(err){_didIteratorError5=true;_iteratorError5=err}finally{try{if(!_iteratorNormalCompletion5&&_iterator5.return){_iterator5.return()}}finally{if(_didIteratorError5){throw _iteratorError5}}}return _result2}var result={};for(var _key55 in object){if(object.hasOwnProperty(_key55))result[_key55]=pipe.transform.apply(pipe,[object[_key55],_key55].concat(additionalArguments))}return result}}]);return MapPipe}())||_class117);// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[_core.Injector],MapPipe);/**
 * Retrieves a matching filename by given filename prefix.
 */var ObjectKeysPipe=exports.ObjectKeysPipe=(_dec61=(0,_core.Pipe)({name:'genericObjectKeys'}),_dec61(_class119=function(){function ObjectKeysPipe(){_classCallCheck(this,ObjectKeysPipe)}_createClass(ObjectKeysPipe,[{key:'transform',/**
     * Performs the "Object" native "keys()" method.
     * @param object - Object to retrieve key names from.
     * @param sort - Indicates whether sorting should be enabled. If an array
     * is provided it will be interpreted as arguments given to the array's
     * sort method.
     * @param reverse - Reverses sorted list.
     * @param asNumber - Sort number aware.
     * @returns Arrays of key names.
     */value:function transform(object){var sort=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var reverse=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var asNumber=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;if((typeof object==='undefined'?'undefined':_typeof(object))==='object'&&object!==null){var result=Object.keys(object);if(sort){if(!Array.isArray(sort))sort=asNumber?[function(first,second){first=parseInt(first);second=parseInt(second);if(isNaN(first))return isNaN(second)?0:+1;else if(isNaN(second))return-1;return first-second}]:[];result.sort.apply(result,_toConsumableArray(sort));if(reverse)result.reverse();return result}return result}return[]}}]);return ObjectKeysPipe}())||_class119);// IgnoreTypeCheck
/**
 * Reverses a given list.
 */var ReversePipe=exports.ReversePipe=(_dec62=(0,_core.Pipe)({name:'genericReverse'}),_dec62(_class120=function(){function ReversePipe(){_classCallCheck(this,ReversePipe)}_createClass(ReversePipe,[{key:'transform',/**
     * Performs the "Arrays" native "reverse()" method.
     * @param list - List to reverse.
     * @param copy - Indicates whether a reversed copy should be created or
     * reversion can be done in place.
     * @returns Reverted arrays.
     */value:function transform(list){var copy=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(list){if(copy)list=list.slice()}else list=[];if('reverse'in list)list.reverse();return list}}]);return ReversePipe}())||_class120);// IgnoreTypeCheck
/**
 * Determines type of given object.
 */var TypePipe=exports.TypePipe=(_dec63=(0,_core.Pipe)({name:'genericType'}),_dec63(_class121=function(){function TypePipe(){_classCallCheck(this,TypePipe)}_createClass(TypePipe,[{key:'transform',/**
     * Returns type of given object.
     * @param object - Object to determine type of.
     * @returns Type name.
     */value:function transform(object){return typeof object==='undefined'?'undefined':_typeof(object)}}]);return TypePipe}())||_class121);// / endregion
// region array
// IgnoreTypeCheck
/**
 * Dependently concatenate given data to piped data.
 */var ArrayDependentConcatPipe/* immplements PipeTransform*/=exports.ArrayDependentConcatPipe=(_dec64=(0,_core.Pipe)({name:'genericArrayDependentConcat'}),_dec64(_class122=function(){function ArrayDependentConcatPipe(){_classCallCheck(this,ArrayDependentConcatPipe)}_createClass(ArrayDependentConcatPipe,[{key:'transform',/**
     * Does the given array transformation logic.
     * @param array - Array to transform.
     * @param indicator - Indicator to decide if concatenation should be done.
     * @param item - Object(s) to concatenate.
     * @returns Transformed given array.
     */value:function transform(array,indicator,item){if(indicator)return array.concat(item);return array}}]);return ArrayDependentConcatPipe}())||_class122);// endregion
// region string
// IgnoreTypeCheck
/**
 * Forwards javaScript's native "stringEndsWith" method.
 */var StringEndsWithPipe=exports.StringEndsWithPipe=(_dec65=(0,_core.Pipe)({name:'genericStringEndsWith'}),_dec65(_class123=function(){function StringEndsWithPipe(){_classCallCheck(this,StringEndsWithPipe)}_createClass(StringEndsWithPipe,[{key:'transform',/**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param needle - Suffix to search for.
     * @returns The boolean result.
     */value:function transform(string,needle){return typeof string==='string'&&typeof needle==='string'&&string.endsWith(needle)}}]);return StringEndsWithPipe}())||_class123);// IgnoreTypeCheck
/**
 * Determines if given string has a time indicating suffix.
 */var StringHasTimeSuffixPipe=exports.StringHasTimeSuffixPipe=(_dec66=(0,_core.Pipe)({name:'genericStringHasTimeSuffix'}),_dec66(_class124=function(){function StringHasTimeSuffixPipe(){_classCallCheck(this,StringHasTimeSuffixPipe)}_createClass(StringHasTimeSuffixPipe,[{key:'transform',/**
     * Performs the actual string suffix check.
     * @param string - To search in.
     * @returns The boolean result.
     */value:function transform(string){if(typeof string!=='string')return false;return string.endsWith('Date')||string.endsWith('Time')||string==='timestamp'}}]);return StringHasTimeSuffixPipe}())||_class124);// IgnoreTypeCheck
/**
 * Tests if given pattern matches against given subject.
 */var StringMatchPipe=exports.StringMatchPipe=(_dec67=(0,_core.Pipe)({name:'genericStringMatch'}),_dec67(_class125=function(){function StringMatchPipe(){_classCallCheck(this,StringMatchPipe)}_createClass(StringMatchPipe,[{key:'transform',/**
     * Performs the actual matching.
     * @param pattern - String or regular expression to search for.
     * @param subject - String to search in.
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns Boolean test result.
     */value:function transform(pattern,subject){var modifier=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'';// IgnoreTypeCheck
return new RegExp(pattern,modifier).test(subject)}}]);return StringMatchPipe}())||_class125);// IgnoreTypeCheck
/**
 * Trims given string if it is longer then given length.
 */var StringMaximumLengthPipe=exports.StringMaximumLengthPipe=(_dec68=(0,_core.Pipe)({name:'genericStringMaximumLength'}),_dec68(_class126=function(){function StringMaximumLengthPipe(){_classCallCheck(this,StringMaximumLengthPipe)}_createClass(StringMaximumLengthPipe,[{key:'transform',/**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param maximumLength - Maximum number of symbols in given string.
     * @param suffix - Suffix to append if given string has to bee trimmed.
     * @returns The potentially trimmed given string.
     */value:function transform(string){var maximumLength=arguments.length>1&&arguments[1]!==undefined?arguments[1]:100;var suffix=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'...';if(string){if(string.length>maximumLength&&string.length-1>suffix.length)string=string.substring(0,Math.max(1,maximumLength-suffix.length))+suffix;return string}return''}}]);return StringMaximumLengthPipe}())||_class126);// IgnoreTypeCheck
/**
 * Provides javascript's native string replacement method as pipe.
 */var StringReplacePipe=exports.StringReplacePipe=(_dec69=(0,_core.Pipe)({name:'genericStringReplace'}),_dec69(_class127=function(){function StringReplacePipe(){_classCallCheck(this,StringReplacePipe)}_createClass(StringReplacePipe,[{key:'transform',/**
     * Performs the actual replacement.
     * @param string - String to replace content.
     * @param search - String or regular expression to us as matcher.
     * @param replacement - String to replace with matching parts in given
     * "string".
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns A new string with replacements done.
     */value:function transform(string,search){var replacement=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'';var modifier=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'g';return string.replace(typeof search==='string'?new RegExp(search,modifier):search,replacement)}}]);return StringReplacePipe}())||_class127);// IgnoreTypeCheck
/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */var StringSafeHTMLPipe=exports.StringSafeHTMLPipe=(_dec70=(0,_core.Pipe)({name:'genericStringSafeHTML'}),_dec70(_class128=/**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */function StringSafeHTMLPipe(domSanitizer){_classCallCheck(this,StringSafeHTMLPipe);this.transform=this.transform;this.transform=domSanitizer.bypassSecurityTrustHtml.bind(domSanitizer)})||_class128);// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[_platformBrowser.DomSanitizer],StringSafeHTMLPipe);/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */var StringSafeResourceURLPipe=exports.StringSafeResourceURLPipe=(_dec71=(0,_core.Pipe)({name:'genericStringSafeResourceURL'}),_dec71(_class130=/**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */function StringSafeResourceURLPipe(domSanitizer){_classCallCheck(this,StringSafeResourceURLPipe);this.transform=this.transform;this.transform=domSanitizer.bypassSecurityTrustResourceUrl.bind(domSanitizer)})||_class130);// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[_platformBrowser.DomSanitizer],StringSafeResourceURLPipe);/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */var StringSafeScriptPipe=exports.StringSafeScriptPipe=(_dec72=(0,_core.Pipe)({name:'genericStringSafeScript'}),_dec72(_class132=/**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */function StringSafeScriptPipe(domSanitizer){_classCallCheck(this,StringSafeScriptPipe);this.transform=this.transform;this.transform=domSanitizer.bypassSecurityTrustScript.bind(domSanitizer)})||_class132);// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[_platformBrowser.DomSanitizer],StringSafeScriptPipe);/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */var StringSafeStylePipe=exports.StringSafeStylePipe=(_dec73=(0,_core.Pipe)({name:'genericStringSafeStyle'}),_dec73(_class134=/**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */function StringSafeStylePipe(domSanitizer){_classCallCheck(this,StringSafeStylePipe);this.transform=this.transform;this.transform=domSanitizer.bypassSecurityTrustStyle.bind(domSanitizer)})||_class134);// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[_platformBrowser.DomSanitizer],StringSafeStylePipe);/**
 * Provides angular dom html sanitizer.
 * @property transform - Binded dom sanitizer's validation marker.
 */var StringSafeURLPipe=exports.StringSafeURLPipe=(_dec74=(0,_core.Pipe)({name:'genericStringSafeURL'}),_dec74(_class136=/**
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @returns Nothing.
     */function StringSafeURLPipe(domSanitizer){_classCallCheck(this,StringSafeURLPipe);this.transform=this.transform;this.transform=domSanitizer.bypassSecurityTrustUrl.bind(domSanitizer)})||_class136);// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[_platformBrowser.DomSanitizer],StringSafeURLPipe);/**
 * Returns given string if it matches given pattern.
 */var StringShowIfPatternMatchesPipe=exports.StringShowIfPatternMatchesPipe=(_dec75=(0,_core.Pipe)({name:'genericStringShowIfPatternMatches'}),_dec75(_class138=function(){function StringShowIfPatternMatchesPipe(){_classCallCheck(this,StringShowIfPatternMatchesPipe)}_createClass(StringShowIfPatternMatchesPipe,[{key:'transform',/**
     * Performs the actual matching.
     * @param string - String to replace content.
     * @param pattern - String or regular expression to us as matcher.
     * @param invert - Indicates whether given string should be shown if given
     * pattern matches or not.
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns Given string if matching indicator was successful.
     */value:function transform(string,pattern){var invert=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var modifier=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'';var indicator=(typeof pattern==='string'?new RegExp(pattern,modifier):pattern).test(string);if(invert)indicator=!indicator;return indicator?string:''}}]);return StringShowIfPatternMatchesPipe}())||_class138);// IgnoreTypeCheck
/**
 * Returns a matched part of given subject with given pattern. Default is the
 * whole (zero) matched part.
 */var StringSliceMatchPipe=exports.StringSliceMatchPipe=(_dec76=(0,_core.Pipe)({name:'genericStringSliceMatch'}),_dec76(_class139=function(){function StringSliceMatchPipe(){_classCallCheck(this,StringSliceMatchPipe)}_createClass(StringSliceMatchPipe,[{key:'transform',/**
     * Performs the actual matching.
     * @param subject - String to search in.
     * @param pattern - String or regular expression to search for.
     * @param index - Match group to extract.
     * @param modifier - Regular expression modifier (second argument to the
     * "RegExp" constructor).
     * @returns Matching group.
     */value:function transform(subject,pattern){var index=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var modifier=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'';if(typeof subject==='string'){var match=subject.match(new RegExp(// IgnoreTypeCheck
pattern,modifier));if(match&&typeof match[index]==='string')return match[index]}return''}}]);return StringSliceMatchPipe}())||_class139);// IgnoreTypeCheck
/**
 * Forwards javascript's native "stringStartsWith" method.
 */var StringStartsWithPipe=exports.StringStartsWithPipe=(_dec77=(0,_core.Pipe)({name:'genericStringStartsWith'}),_dec77(_class140=function(){function StringStartsWithPipe(){_classCallCheck(this,StringStartsWithPipe)}_createClass(StringStartsWithPipe,[{key:'transform',/**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param needle - Prefix to search for.
     * @returns The boolean result.
     */value:function transform(string,needle){return typeof string==='string'&&typeof needle==='string'&&string.startsWith(needle)}}]);return StringStartsWithPipe}())||_class140);// IgnoreTypeCheck
/**
 * Provides angular's template engine as pipe.
 * @property extendObject - Extend object's pipe transform method.
 */var StringTemplatePipe=exports.StringTemplatePipe=(_dec78=(0,_core.Pipe)({name:'genericStringTemplate'}),_dec78(_class141=function(){/**
     * Sets injected extend object pipe instance as instance property.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @returns Nothing.
     */function StringTemplatePipe(extendObjectPipe){_classCallCheck(this,StringTemplatePipe);this.extendObject=this.extendObject;this.extendObject=extendObjectPipe.transform.bind(extendObjectPipe)}/**
     * Performs the actual indicator method.
     * @param string - To check.
     * @param scopes - Scopes to merge and render again given template string
     * again.
     * @returns The rendered result.
     */_createClass(StringTemplatePipe,[{key:'transform',value:function transform(){var string=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'';for(var _len53=arguments.length,scopes=Array(_len53>1?_len53-1:0),_key56=1;_key56<_len53;_key56++){scopes[_key56-1]=arguments[_key56]}var scope=this.extendObject.apply(this,[true,{}].concat(scopes));var validNames=Object.keys(scope).filter(function(name){try{new Function('var '+name)()}catch(error){return false}return true});return new(Function.prototype.bind.apply(Function,[null].concat(['scope'],_toConsumableArray(validNames),['return `'+string+'`'])))().apply(undefined,[scope].concat(_toConsumableArray(validNames.map(function(name){return scope[name]}))))}}]);return StringTemplatePipe}())||_class141);// / endregion
// / region number
// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[ExtendObjectPipe],StringTemplatePipe);/**
 * Returns part in percent of all.
 */var NumberPercentPipe=exports.NumberPercentPipe=(_dec79=(0,_core.Pipe)({name:'genericNumberPercent'}),_dec79(_class143=function(){function NumberPercentPipe(){_classCallCheck(this,NumberPercentPipe)}_createClass(NumberPercentPipe,[{key:'transform',/**
     * Performs the actual calculation.
     * @param part - Part to divide "all" through.
     * @param all - Reference value to calculate part of.
     * @returns The calculated part.
     */value:function transform(part,all){return part/all*100}}]);return NumberPercentPipe}())||_class143);// / endregion
// endregion
// region services
// IgnoreTypeCheck
/**
 * A generic guard which prevents from switching to route if its component's
 * "canDeactivate()" method returns "false", a promise or observable wrapping
 * a boolean.
 */var CanDeactivateRouteLeaveGuard=exports.CanDeactivateRouteLeaveGuard=(_dec80=(0,_core.Injectable)(),_dec80(_class144=function(){function CanDeactivateRouteLeaveGuard(){_classCallCheck(this,CanDeactivateRouteLeaveGuard)}_createClass(CanDeactivateRouteLeaveGuard,[{key:'canDeactivate',/**
     * Calls the component specific "canDeactivate()" method.
     * @param component - Component instance of currently selected route.
     * @param additionalParameter - All additional parameter are forwarded to
     * the components "canDeactivate" method.
     * @returns A boolean, promise or observable which wraps the indicator.
     */value:function canDeactivate(component){for(var _len54=arguments.length,additionalParameter=Array(_len54>1?_len54-1:0),_key57=1;_key57<_len54;_key57++){additionalParameter[_key57-1]=arguments[_key57]}return'canDeactivate'in component?component.canDeactivate.apply(component,additionalParameter):true}}]);return CanDeactivateRouteLeaveGuard}())||_class144);// / region confirm
// IgnoreTypeCheck
/**
 * Provides a generic confirmation component.
 * @property cancelText - Text to use as cancel button label.
 * @property dialogReference - Reference to the dialog component instance.
 * @property okText - Text to use as confirm button label.
 * @property title - Title to show in dialog.
 * @property message - Message to show in dialog.
 */var ConfirmComponent=exports.ConfirmComponent=(_dec81=(0,_core.Component)({animations:[_animation.defaultAnimation],changeDetection:_core.ChangeDetectionStrategy.OnPush,selector:'generic-confirm',template:'\n        <h2 @defaultAnimation mat-dialog-title *ngIf="title">{{title}}</h2>\n        <mat-dialog-content @defaultAnimation *ngIf="message">\n            {{message}}\n        </mat-dialog-content>\n        <mat-dialog-actions>\n            <button (click)="dialogReference.close(true)" mat-raised-button>\n                {{okText}}\n            </button>\n            <button (click)="dialogReference.close(false)" mat-raised-button>\n                {{cancelText}}\n            </button>\n        </mat-dialog-actions>\n    '}),_dec82=(0,_core.Input)(),_dec83=(0,_core.Input)(),_dec81(_class145=(_class146=/* eslint-disable indent *//**
     * Gets needed component data injected.
     * NOTE: The "@Optional" decorator makes test instances possible.
     * NOTE: Don't set default values for theses optional parameter since the
     * would overwrite an injected value.
     * @param data - Data to provide for the dialog component instance.
     * @param dialogReference - Dialog component instance.
     * @returns Nothing.
     */function ConfirmComponent(data,dialogReference){_classCallCheck(this,ConfirmComponent);_initDefineProp(this,'cancelText',_descriptor,this);this.dialogReference=null;_initDefineProp(this,'okText',_descriptor2,this);this.title='';this.message='';/* eslint-enable indent */this.dialogReference=dialogReference;if((typeof data==='undefined'?'undefined':_typeof(data))==='object'&&data!==null)for(var _key58 in data){if(data.hasOwnProperty(_key58))this[_key58]=data[_key58]}},(_descriptor=_applyDecoratedDescriptor(_class146.prototype,'cancelText',[_dec82],{enumerable:true,initializer:function initializer(){return'Cancel'}}),_descriptor2=_applyDecoratedDescriptor(_class146.prototype,'okText',[_dec83],{enumerable:true,initializer:function initializer(){return'OK'}})),_class146))||_class145);// IgnoreTypeCheck
(0,_core.Optional)()(ConfirmComponent,null,0);(0,_core.Inject)(_material.MAT_DIALOG_DATA)(ConfirmComponent,null,0);(0,_core.Optional)()(ConfirmComponent,null,1);Reflect.defineMetadata('design:paramtypes',[,_material.MatDialogRef],ConfirmComponent);/**
 * Alert service to trigger a dialog window which can be confirmed.
 * @property dialog - Reference to the dialog component instance.
 * @property dialogReference - Reference to the dialog service instance.
 */var AlertService=exports.AlertService=(_dec84=(0,_core.Injectable)(),_dec84(_class148=function(){/**
     * Gets needed component dialog service instance injected.
     * @param dialog - Reference to the dialog component instance.
     * @returns Nothing.
     */function AlertService(dialog){_classCallCheck(this,AlertService);this.dialog=this.dialog;this.dialogReference=this.dialogReference;this.dialog=dialog}/**
     * Triggers a confirmation dialog to show.
     * @param data - Data to provide for the confirmations component instance.
     * @returns A promise resolving when confirmation window where confirmed or
     * rejected due to user interaction. A promised wrapped boolean indicates
     * which decision was made.
     */_createClass(AlertService,[{key:'confirm',value:function confirm(data){if(typeof data==='string')data={data:{message:data}};else if((typeof data==='undefined'?'undefined':_typeof(data))!=='object'||data===null||!data.hasOwnProperty('data'))data={data:data};this.dialogReference=this.dialog.open(ConfirmComponent,data);return this.dialogReference.afterClosed().toPromise()}}]);return AlertService}())||_class148);// / endregion
// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[_material.MatDialog],AlertService);/**
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
 */var DataService=exports.DataService=(_dec85=(0,_core.Injectable)(),_dec85(_class150=(_temp53=_class151=function(){/**
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
     */function DataService(equalsPipe,extendObjectPipe,initialData,ngZone,platformID,stringFormatPipe,utility){_classCallCheck(this,DataService);this.connection=this.connection;this.configuration=this.configuration;this.database=this.database;this.equals=this.equals;this.extendObject=this.extendObject;this.interceptSynchronisationPromise=null;this.ngZone=this.ngZone;this.middlewares={post:{},pre:{}};this.platformID=this.platformID;this.remoteConnection=null;this.runningRequests=[];this.runningRequestsStream=new _rxjs.Subject;this.stringFormat=this.stringFormat;this.synchronisation=null;this.tools=this.tools;this.configuration=initialData.configuration;if(this.configuration.database.hasOwnProperty('publicURL'))this.configuration.database.url=this.configuration.database.publicURL;this.database=_pouchdb2.default;this.equals=equalsPipe.transform.bind(equalsPipe);this.extendObject=extendObjectPipe.transform.bind(extendObjectPipe);this.ngZone=ngZone;this.platformID=platformID;this.stringFormat=stringFormatPipe.transform.bind(stringFormatPipe);this.tools=utility.fixed.tools;var idName=this.configuration.database.model.property.name.special.id;var revisionName=this.configuration.database.model.property.name.special.revision;var nativeBulkDocs=this.database.prototype.bulkDocs;var self=this;this.database.plugin({bulkDocs:function(){var _ref54=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee4(firstParameter){for(var _len55=arguments.length,parameter=Array(_len55>1?_len55-1:0),_key59=1;_key59<_len55;_key59++){parameter[_key59-1]=arguments[_key59]}var result,_iteratorNormalCompletion6,_didIteratorError6,_iteratorError6,_iterator6,_step6,item,conflictingIndexes,conflicts,index,_iteratorNormalCompletion7,_didIteratorError7,_iteratorError7,_iterator7,_step7,_item,retriedResults,_iteratorNormalCompletion8,_didIteratorError8,_iteratorError8,_iterator8,_step8,retriedResult;return regeneratorRuntime.wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:/*
                Implements a generic retry mechanism for "upsert" and "latest"
                updates and optionally supports to ignore "NoChange" errors.
            */if(!Array.isArray(firstParameter)&&(typeof firstParameter==='undefined'?'undefined':_typeof(firstParameter))==='object'&&firstParameter!==null&&firstParameter.hasOwnProperty(idName))firstParameter=[firstParameter];result=[];_context4.prev=2;_context4.next=5;return nativeBulkDocs.call.apply(nativeBulkDocs,[this,firstParameter].concat(parameter));case 5:result=_context4.sent;_context4.next=62;break;case 8:_context4.prev=8;_context4.t0=_context4['catch'](2);if(!(_context4.t0.name==='bad_request')){_context4.next=61;break}_iteratorNormalCompletion6=true;_didIteratorError6=false;_iteratorError6=undefined;_context4.prev=14;_iterator6=firstParameter[Symbol.iterator]();case 16:if(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done){_context4.next=36;break}item=_step6.value;if(!['latest','upsert'].includes(item[revisionName])){_context4.next=33;break}_context4.prev=19;_context4.next=22;return this.get(item[idName]);case 22:_context4.t1=revisionName;item[revisionName]=_context4.sent[_context4.t1];_context4.next=33;break;case 26:_context4.prev=26;_context4.t2=_context4['catch'](19);if(!(_context4.t2.name==='not_found')){_context4.next=32;break}delete item[revisionName];_context4.next=33;break;case 32:throw _context4.t2;case 33:_iteratorNormalCompletion6=true;_context4.next=16;break;case 36:_context4.next=42;break;case 38:_context4.prev=38;_context4.t3=_context4['catch'](14);_didIteratorError6=true;_iteratorError6=_context4.t3;case 42:_context4.prev=42;_context4.prev=43;if(!_iteratorNormalCompletion6&&_iterator6.return){_iterator6.return()}case 45:_context4.prev=45;if(!_didIteratorError6){_context4.next=48;break}throw _iteratorError6;case 48:return _context4.finish(45);case 49:return _context4.finish(42);case 50:_context4.prev=50;_context4.next=53;return nativeBulkDocs.call.apply(nativeBulkDocs,[this,firstParameter].concat(parameter));case 53:result=_context4.sent;_context4.next=59;break;case 56:_context4.prev=56;_context4.t4=_context4['catch'](50);throw _context4.t4;case 59:_context4.next=62;break;case 61:throw _context4.t0;case 62:conflictingIndexes=[];conflicts=[];index=0;_iteratorNormalCompletion7=true;_didIteratorError7=false;_iteratorError7=undefined;_context4.prev=68;_iterator7=result[Symbol.iterator]();case 70:if(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done){_context4.next=99;break}_item=_step7.value;if(!(_typeof(firstParameter[index])==='object'&&firstParameter!==null)){_context4.next=95;break}if(!(revisionName in firstParameter[index]&&_item.name==='conflict'&&['latest','upsert'].includes(firstParameter[index][revisionName]))){_context4.next=78;break}conflicts.push(_item);conflictingIndexes.push(index);_context4.next=95;break;case 78:if(!(idName in firstParameter[index]&&self.configuration.database.ignoreNoChangeError&&'name'in _item&&_item.name==='forbidden'&&'message'in _item&&_item.message.startsWith('NoChange:'))){_context4.next=95;break}result[index]={id:firstParameter[index][idName],ok:true};_context4.prev=80;if(!(revisionName in firstParameter[index]&&!['latest','upsert'].includes(firstParameter[index][revisionName]))){_context4.next=85;break}_context4.t5=firstParameter[index][revisionName];_context4.next=89;break;case 85:_context4.next=87;return this.get(result[index].id);case 87:_context4.t6=revisionName;_context4.t5=_context4.sent[_context4.t6];case 89:result[index].rev=_context4.t5;_context4.next=95;break;case 92:_context4.prev=92;_context4.t7=_context4['catch'](80);throw _context4.t7;case 95:index+=1;case 96:_iteratorNormalCompletion7=true;_context4.next=70;break;case 99:_context4.next=105;break;case 101:_context4.prev=101;_context4.t8=_context4['catch'](68);_didIteratorError7=true;_iteratorError7=_context4.t8;case 105:_context4.prev=105;_context4.prev=106;if(!_iteratorNormalCompletion7&&_iterator7.return){_iterator7.return()}case 108:_context4.prev=108;if(!_didIteratorError7){_context4.next=111;break}throw _iteratorError7;case 111:return _context4.finish(108);case 112:return _context4.finish(105);case 113:if(!conflicts.length){_context4.next=137;break}firstParameter=conflicts;_context4.next=117;return this.bulkDocs.apply(this,[firstParameter].concat(parameter));case 117:retriedResults=_context4.sent;_iteratorNormalCompletion8=true;_didIteratorError8=false;_iteratorError8=undefined;_context4.prev=121;for(_iterator8=retriedResults[Symbol.iterator]();!(_iteratorNormalCompletion8=(_step8=_iterator8.next()).done);_iteratorNormalCompletion8=true){retriedResult=_step8.value;result[conflictingIndexes.shift()]=retriedResult}_context4.next=129;break;case 125:_context4.prev=125;_context4.t9=_context4['catch'](121);_didIteratorError8=true;_iteratorError8=_context4.t9;case 129:_context4.prev=129;_context4.prev=130;if(!_iteratorNormalCompletion8&&_iterator8.return){_iterator8.return()}case 132:_context4.prev=132;if(!_didIteratorError8){_context4.next=135;break}throw _iteratorError8;case 135:return _context4.finish(132);case 136:return _context4.finish(129);case 137:return _context4.abrupt('return',result);case 138:case'end':return _context4.stop();}}},_callee4,this,[[2,8],[14,38,42,50],[19,26],[43,,45,49],[50,56],[68,101,105,113],[80,92],[106,,108,112],[121,125,129,137],[130,,132,136]])}));function bulkDocs(_x23){return _ref54.apply(this,arguments)}return bulkDocs}()});this.database.plugin(_pouchdbFind2.default).plugin(_pouchdbValidation2.default);var _iteratorNormalCompletion9=true;var _didIteratorError9=false;var _iteratorError9=undefined;try{for(var _iterator9=this.configuration.database.plugins[Symbol.iterator](),_step9;!(_iteratorNormalCompletion9=(_step9=_iterator9.next()).done);_iteratorNormalCompletion9=true){var plugin=_step9.value;this.database.plugin(plugin)}}catch(err){_didIteratorError9=true;_iteratorError9=err}finally{try{if(!_iteratorNormalCompletion9&&_iterator9.return){_iterator9.return()}}finally{if(_didIteratorError9){throw _iteratorError9}}}}/**
     * Determines all property names which are indexable in a generic manner.
     * @param modelConfiguration - Model specification object.
     * @param model - Model to determine property names from.
     * @returns The mapping object.
     */// NOTE: Native regular expression definition is not allowed here.
_createClass(DataService,[{key:'initialize',/**
     * Initializes database connection and synchronisation if needed.
     * @returns A promise resolving when initialisation has finished.
     */value:function(){var _ref55=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee8(){var _this52=this;var options,databaseName,configuration,idName,revisionName,_loop,_arr5,_i5,pluginName,_loop2,_name8,modelName,_iteratorNormalCompletion10,_didIteratorError10,_iteratorError10,_iterator10,_step10,_name9,indexes,_iteratorNormalCompletion11,_didIteratorError11,_iteratorError11,_iterator11,_step11,_index3,exists,_modelName,_iteratorNormalCompletion12,_didIteratorError12,_iteratorError12,_iterator12,_step12,_name10;return regeneratorRuntime.wrap(function _callee8$(_context8){while(1){switch(_context8.prev=_context8.next){case 0:options=this.extendObject(/* eslint-disable camelcase */true,{skip_setup:true},/* eslint-enable camelcase */this.configuration.database.connector||{});databaseName=this.configuration.name||'generic';if(!(0,_common.isPlatformServer)(this.platformID))this.remoteConnection=new this.database(this.stringFormat(this.configuration.database.url,'')+('/'+databaseName),options);if(this.configuration.database.local||(0,_common.isPlatformServer)(this.platformID))this.connection=new this.database(databaseName,options);else this.connection=this.remoteConnection;// region apply "latest/upsert" and ignore "NoChange" error feature
/*
            NOTE: A "bulkDocs" plugin does not get called for every "put" and
            "post" call so we have to wrap runtime generated methods.
        */configuration=this.configuration;idName=this.configuration.database.model.property.name.special.id;revisionName=this.configuration.database.model.property.name.special.revision;_loop=function _loop(pluginName){var nativeMethod=_this52.connection[pluginName].bind(_this52.connection);_this52.connection[pluginName]=function(){var _ref57=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee6(firstParameter,secondParameter){var _len56,parameter,_key60,_id,result,_revision,_args6=arguments;return regeneratorRuntime.wrap(function _callee6$(_context6){while(1){switch(_context6.prev=_context6.next){case 0:_context6.prev=0;for(_len56=_args6.length,parameter=Array(_len56>2?_len56-2:0),_key60=2;_key60<_len56;_key60++){parameter[_key60-2]=_args6[_key60]}_context6.next=4;return nativeMethod.apply(undefined,[firstParameter,secondParameter].concat(parameter));case 4:return _context6.abrupt('return',_context6.sent);case 7:_context6.prev=7;_context6.t0=_context6['catch'](0);_id=(typeof firstParameter==='undefined'?'undefined':_typeof(firstParameter))==='object'&&idName in firstParameter?firstParameter[idName]:firstParameter;if(!(_id&&configuration.database.ignoreNoChangeError&&'name'in _context6.t0&&_context6.t0.name==='forbidden'&&'message'in _context6.t0&&_context6.t0.message.startsWith('NoChange:'))){_context6.next=29;break}result={id:_id,ok:true};_revision=(typeof secondParameter==='undefined'?'undefined':_typeof(secondParameter))==='object'&&revisionName in secondParameter?secondParameter[revisionName]:secondParameter;_context6.prev=13;if(!(revisionName in firstParameter&&!['latest','upsert'].includes(_revision))){_context6.next=18;break}_context6.t1=_revision;_context6.next=22;break;case 18:_context6.next=20;return this.get(result.id);case 20:_context6.t2=revisionName;_context6.t1=_context6.sent[_context6.t2];case 22:result.rev=_context6.t1;_context6.next=28;break;case 25:_context6.prev=25;_context6.t3=_context6['catch'](13);throw _context6.t3;case 28:return _context6.abrupt('return',result);case 29:throw _context6.t0;case 30:case'end':return _context6.stop();}}},_callee6,this,[[0,7],[13,25]])}));return function(_x24,_x25){return _ref57.apply(this,arguments)}}()};_arr5=['post','put'];for(_i5=0;_i5<_arr5.length;_i5++){pluginName=_arr5[_i5];_loop(pluginName)}// endregion
_loop2=function _loop2(_name8){if(DataService.wrappableMethodNames.includes(_name8)&&typeof _this52.connection[_name8]==='function'){var method=_this52.connection[_name8];_this52.connection[_name8]=function(){var _ref58=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee7(){for(var _len57=arguments.length,parameter=Array(_len57),_key61=0;_key61<_len57;_key61++){parameter[_key61]=arguments[_key61]}var request,clear,_arr6,_i6,methodName,_iteratorNormalCompletion13,_didIteratorError13,_iteratorError13,_iterator13,_step13,interceptor,action,result,_arr7,_i7,_methodName,_iteratorNormalCompletion14,_didIteratorError14,_iteratorError14,_iterator14,_step14,_interceptor;return regeneratorRuntime.wrap(function _callee7$(_context7){while(1){switch(_context7.prev=_context7.next){case 0:request={name:_name8,parameter:parameter};_this52.runningRequests.push(request);_this52.runningRequestsStream.next(_this52.runningRequests);clear=function clear(){var index=_this52.runningRequests.indexOf(request);if(index!==-1)_this52.runningRequests.splice(index,1);_this52.runningRequestsStream.next(_this52.runningRequests)};_arr6=[_name8,'_all'];_i6=0;case 6:if(!(_i6<_arr6.length)){_context7.next=48;break}methodName=_arr6[_i6];if(!_this52.middlewares.pre.hasOwnProperty(methodName)){_context7.next=45;break}_iteratorNormalCompletion13=true;_didIteratorError13=false;_iteratorError13=undefined;_context7.prev=12;_iterator13=_this52.middlewares.pre[methodName][Symbol.iterator]();case 14:if(_iteratorNormalCompletion13=(_step13=_iterator13.next()).done){_context7.next=31;break}interceptor=_step13.value;parameter=interceptor.apply(_this52.connection,parameter.concat(methodName==='_all'?_name8:[]));if(!('then'in parameter)){_context7.next=28;break}_context7.prev=18;_context7.next=21;return parameter;case 21:parameter=_context7.sent;_context7.next=28;break;case 24:_context7.prev=24;_context7.t0=_context7['catch'](18);clear();throw _context7.t0;case 28:_iteratorNormalCompletion13=true;_context7.next=14;break;case 31:_context7.next=37;break;case 33:_context7.prev=33;_context7.t1=_context7['catch'](12);_didIteratorError13=true;_iteratorError13=_context7.t1;case 37:_context7.prev=37;_context7.prev=38;if(!_iteratorNormalCompletion13&&_iterator13.return){_iterator13.return()}case 40:_context7.prev=40;if(!_didIteratorError13){_context7.next=43;break}throw _iteratorError13;case 43:return _context7.finish(40);case 44:return _context7.finish(37);case 45:_i6++;_context7.next=6;break;case 48:request.wrappedParameter=parameter;action=function action(){var context=arguments.length>0&&arguments[0]!==undefined?arguments[0]:_this52.connection;var givenParameter=arguments.length>1&&arguments[1]!==undefined?arguments[1]:parameter;return method.apply(context,givenParameter)};result=action();_arr7=[_name8,'_all'];_i7=0;case 53:if(!(_i7<_arr7.length)){_context7.next=95;break}_methodName=_arr7[_i7];if(!_this52.middlewares.post.hasOwnProperty(_methodName)){_context7.next=92;break}_iteratorNormalCompletion14=true;_didIteratorError14=false;_iteratorError14=undefined;_context7.prev=59;_iterator14=_this52.middlewares.post[_methodName][Symbol.iterator]();case 61:if(_iteratorNormalCompletion14=(_step14=_iterator14.next()).done){_context7.next=78;break}_interceptor=_step14.value;result=_interceptor.call.apply(_interceptor,[_this52.connection,result,action].concat(_toConsumableArray(parameter.concat(_methodName==='_all'?_name8:[]))));if(!('then'in result)){_context7.next=75;break}_context7.prev=65;_context7.next=68;return result;case 68:result=_context7.sent;_context7.next=75;break;case 71:_context7.prev=71;_context7.t2=_context7['catch'](65);clear();throw _context7.t2;case 75:_iteratorNormalCompletion14=true;_context7.next=61;break;case 78:_context7.next=84;break;case 80:_context7.prev=80;_context7.t3=_context7['catch'](59);_didIteratorError14=true;_iteratorError14=_context7.t3;case 84:_context7.prev=84;_context7.prev=85;if(!_iteratorNormalCompletion14&&_iterator14.return){_iterator14.return()}case 87:_context7.prev=87;if(!_didIteratorError14){_context7.next=90;break}throw _iteratorError14;case 90:return _context7.finish(87);case 91:return _context7.finish(84);case 92:_i7++;_context7.next=53;break;case 95:if(!('then'in result)){_context7.next=106;break}_context7.prev=96;_context7.next=99;return result;case 99:result=_context7.sent;_context7.next=106;break;case 102:_context7.prev=102;_context7.t4=_context7['catch'](96);clear();throw _context7.t4;case 106:clear();return _context7.abrupt('return',result);case 108:case'end':return _context7.stop();}}},_callee7,_this52,[[12,33,37,45],[18,24],[38,,40,44],[59,80,84,92],[65,71],[85,,87,91],[96,102]])}));return function(){return _ref58.apply(this,arguments)}}()}};for(_name8 in this.connection){_loop2(_name8)}this.connection.installValidationMethods();if(this.configuration.database.local&&this.remoteConnection)/*
                NOTE: We want to allow other services to integrate an
                interception promise.
            */// IgnoreTypeCheck
this.tools.timeout(_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee5(){return regeneratorRuntime.wrap(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:if(!_this52.interceptSynchronisationPromise){_context5.next=3;break}_context5.next=3;return _this52.interceptSynchronisationPromise;case 3:_this52.startSynchronisation();case 4:case'end':return _context5.stop();}}},_callee5,_this52)})));if(!((0,_common.isPlatformServer)(this.platformID)&&this.configuration.database.createGenericFlatIndex)){_context8.next=124;break}_context8.t0=regeneratorRuntime.keys(this.configuration.database.model.entities);case 16:if((_context8.t1=_context8.t0()).done){_context8.next=53;break}modelName=_context8.t1.value;if(!(this.configuration.database.model.entities.hasOwnProperty(modelName)&&new RegExp(this.configuration.database.model.property.name.typeRegularExpressionPattern.public).test(modelName))){_context8.next=51;break}_iteratorNormalCompletion10=true;_didIteratorError10=false;_iteratorError10=undefined;_context8.prev=22;_iterator10=DataService.determineGenericIndexablePropertyNames(this.configuration.database.model,this.configuration.database.model.entities[modelName])[Symbol.iterator]();case 24:if(_iteratorNormalCompletion10=(_step10=_iterator10.next()).done){_context8.next=37;break}_name9=_step10.value;_context8.prev=26;_context8.next=29;return this.connection.createIndex({index:{ddoc:modelName+'-'+_name9+'-GenericIndex',fields:[this.configuration.database.model.property.name.special.type,_name9],name:modelName+'-'+_name9+'-GenericIndex'}});case 29:_context8.next=34;break;case 31:_context8.prev=31;_context8.t2=_context8['catch'](26);throw _context8.t2;case 34:_iteratorNormalCompletion10=true;_context8.next=24;break;case 37:_context8.next=43;break;case 39:_context8.prev=39;_context8.t3=_context8['catch'](22);_didIteratorError10=true;_iteratorError10=_context8.t3;case 43:_context8.prev=43;_context8.prev=44;if(!_iteratorNormalCompletion10&&_iterator10.return){_iterator10.return()}case 46:_context8.prev=46;if(!_didIteratorError10){_context8.next=49;break}throw _iteratorError10;case 49:return _context8.finish(46);case 50:return _context8.finish(43);case 51:_context8.next=16;break;case 53:indexes=void 0;_context8.prev=54;_context8.next=57;return this.connection.getIndexes();case 57:indexes=_context8.sent.indexes;_context8.next=63;break;case 60:_context8.prev=60;_context8.t4=_context8['catch'](54);throw _context8.t4;case 63:_iteratorNormalCompletion11=true;_didIteratorError11=false;_iteratorError11=undefined;_context8.prev=66;_iterator11=indexes[Symbol.iterator]();case 68:if(_iteratorNormalCompletion11=(_step11=_iterator11.next()).done){_context8.next=110;break}_index3=_step11.value;if(!_index3.name.endsWith('-GenericIndex')){_context8.next=107;break}exists=false;_context8.t5=regeneratorRuntime.keys(this.configuration.database.model.entities);case 73:if((_context8.t6=_context8.t5()).done){_context8.next=98;break}_modelName=_context8.t6.value;if(!_index3.name.startsWith(_modelName+'-')){_context8.next=96;break}_iteratorNormalCompletion12=true;_didIteratorError12=false;_iteratorError12=undefined;_context8.prev=79;for(_iterator12=DataService.determineGenericIndexablePropertyNames(this.configuration.database.model,this.configuration.database.model.entities[_modelName])[Symbol.iterator]();!(_iteratorNormalCompletion12=(_step12=_iterator12.next()).done);_iteratorNormalCompletion12=true){_name10=_step12.value;if(_index3.name===_modelName+'-'+_name10+'-GenericIndex')exists=true}_context8.next=87;break;case 83:_context8.prev=83;_context8.t7=_context8['catch'](79);_didIteratorError12=true;_iteratorError12=_context8.t7;case 87:_context8.prev=87;_context8.prev=88;if(!_iteratorNormalCompletion12&&_iterator12.return){_iterator12.return()}case 90:_context8.prev=90;if(!_didIteratorError12){_context8.next=93;break}throw _iteratorError12;case 93:return _context8.finish(90);case 94:return _context8.finish(87);case 95:return _context8.abrupt('break',98);case 96:_context8.next=73;break;case 98:if(exists){_context8.next=107;break}_context8.prev=99;_context8.next=102;return this.connection.deleteIndex(_index3);case 102:_context8.next=107;break;case 104:_context8.prev=104;_context8.t8=_context8['catch'](99);throw _context8.t8;case 107:_iteratorNormalCompletion11=true;_context8.next=68;break;case 110:_context8.next=116;break;case 112:_context8.prev=112;_context8.t9=_context8['catch'](66);_didIteratorError11=true;_iteratorError11=_context8.t9;case 116:_context8.prev=116;_context8.prev=117;if(!_iteratorNormalCompletion11&&_iterator11.return){_iterator11.return()}case 119:_context8.prev=119;if(!_didIteratorError11){_context8.next=122;break}throw _iteratorError11;case 122:return _context8.finish(119);case 123:return _context8.finish(116);case 124:case'end':return _context8.stop();}}},_callee8,this,[[22,39,43,51],[26,31],[44,,46,50],[54,60],[66,112,116,124],[79,83,87,95],[88,,90,94],[99,104],[117,,119,123]])}));function initialize(){return _ref55.apply(this,arguments)}return initialize}()/**
     * Creates a database index.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb-find's "createIndex()" method.
     * @returns Whatever pouchdb-find's "createIndex()" method returns.
     */},{key:'createIndex',value:function createIndex(){var _connection;return(_connection=this.connection).createIndex.apply(_connection,arguments)}/**
     * Creates or updates given data.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "bulkDocs()" method.
     * @returns Whatever pouchdb's method returns.
     */},{key:'bulkDocs',value:function bulkDocs(){var _connection2;return(_connection2=this.connection).bulkDocs.apply(_connection2,arguments)}/**
     * Removes current active database.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "destroy()" method.
     * @returns Whatever pouchdb's method returns.
     */},{key:'destroy',value:function destroy(){var _connection3;if(this.synchronisation)this.synchronisation.cancel();var result=(_connection3=this.connection).destroy.apply(_connection3,arguments);this.middlewares={post:{},pre:{}};return result}/**
     * Retrieves a database resource determined by given selector.
     * @param selector - Selector object in mango.
     * @param options - Options to use during selecting items.
     * @returns A promise with resulting array of retrieved resources.
     */},{key:'find',value:function(){var _ref59=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee9(selector){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return regeneratorRuntime.wrap(function _callee9$(_context9){while(1){switch(_context9.prev=_context9.next){case 0:_context9.next=2;return this.connection.find(this.extendObject(true,{selector:selector},options));case 2:return _context9.abrupt('return',_context9.sent.docs);case 3:case'end':return _context9.stop();}}},_callee9,this)}));function find(_x28){return _ref59.apply(this,arguments)}return find}()/**
     * Retrieves a resource by id.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "get()" method.
     * @returns Whatever pouchdb's method returns.
     */},{key:'get',value:function(){var _ref60=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee10(){var _connection4;var idName,revisionName,result,_args10=arguments;return regeneratorRuntime.wrap(function _callee10$(_context10){while(1){switch(_context10.prev=_context10.next){case 0:idName=this.configuration.database.model.property.name.special.id;revisionName=this.configuration.database.model.property.name.special.revision;_context10.next=4;return(_connection4=this.connection).get.apply(_connection4,_args10);case 4:result=_context10.sent;if(!(LAST_KNOWN_DATA.data.hasOwnProperty(result[idName])&&_args10.length>1&&(this.equals(_args10.length<=1?undefined:_args10[1],{rev:'latest'})||this.equals(_args10.length<=1?undefined:_args10[1],{latest:true})||this.equals(_args10.length<=1?undefined:_args10[1],{latest:true,rev:'latest'}))&&parseInt(result[revisionName].match(DataService.revisionNumberRegularExpression)[1])<parseInt(LAST_KNOWN_DATA.data[result[idName]][revisionName].match(DataService.revisionNumberRegularExpression)[1]))){_context10.next=7;break}return _context10.abrupt('return',LAST_KNOWN_DATA.data[result[idName]]);case 7:return _context10.abrupt('return',result);case 8:case'end':return _context10.stop();}}},_callee10,this)}));function get(){return _ref60.apply(this,arguments)}return get}()/**
     * Retrieves an attachment by given id.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "get()" method.
     * @returns Whatever pouchdb's method returns.
     */},{key:'getAttachment',value:function getAttachment(){var _connection5;return(_connection5=this.connection).getAttachment.apply(_connection5,arguments)}/**
     * Creates or updates given data.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "put()" method.
     * @returns Whatever pouchdb's method returns.
     */},{key:'put',value:function put(){var _connection6;return(_connection6=this.connection).put.apply(_connection6,arguments)}/**
     * Creates or updates given attachment.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "put()" method.
     * @returns Whatever pouchdb's method returns.
     */},{key:'putAttachment',value:function putAttachment(){var _connection7;return(_connection7=this.connection).putAttachment.apply(_connection7,arguments)}/**
     * Registers a new middleware.
     * @param names - Event names to intercept.
     * @param callback - Callback function to trigger when specified event
     * happens.
     * @param type - Specifies whether callback should be triggered before or
     * after specified event has happened.
     * @returns A cancel function which will deregister given middleware.
     */},{key:'register',value:function register(names,callback){var _this53=this;var type=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'post';if(!Array.isArray(names))names=[names];var _iteratorNormalCompletion15=true;var _didIteratorError15=false;var _iteratorError15=undefined;try{for(var _iterator15=names[Symbol.iterator](),_step15;!(_iteratorNormalCompletion15=(_step15=_iterator15.next()).done);_iteratorNormalCompletion15=true){var _name11=_step15.value;if(!this.middlewares[type].hasOwnProperty(_name11))this.middlewares[type][_name11]=[];this.middlewares[type][_name11].push(callback)}}catch(err){_didIteratorError15=true;_iteratorError15=err}finally{try{if(!_iteratorNormalCompletion15&&_iterator15.return){_iterator15.return()}}finally{if(_didIteratorError15){throw _iteratorError15}}}return function(){var _iteratorNormalCompletion16=true;var _didIteratorError16=false;var _iteratorError16=undefined;try{for(var _iterator16=names[Symbol.iterator](),_step16;!(_iteratorNormalCompletion16=(_step16=_iterator16.next()).done);_iteratorNormalCompletion16=true){var _name12=_step16.value;var _index4=_this53.middlewares[type][_name12].indexOf(callback);if(_index4!==-1)_this53.middlewares[type][_name12].splice(_index4,1);if(_this53.middlewares[type][_name12].length===0)delete _this53.middlewares[type][_name12]}}catch(err){_didIteratorError16=true;_iteratorError16=err}finally{try{if(!_iteratorNormalCompletion16&&_iterator16.return){_iterator16.return()}}finally{if(_didIteratorError16){throw _iteratorError16}}}}}/**
     * Removes specified entities in database.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "remove()" method.
     * @returns Whatever pouchdb's "remove()" method return.
     */},{key:'remove',value:function remove(){var _connection8;return(_connection8=this.connection).remove.apply(_connection8,arguments)}/**
     * Removes specified attachment from entity in database.
     * @param parameter - All parameter will be forwarded to the underlining
     * pouchdb's "removeAttachment()" method.
     * @returns Whatever pouchdb's "removeAttachment()" method return.
     */},{key:'removeAttachment',value:function removeAttachment(){var _connection9;return(_connection9=this.connection).removeAttachment.apply(_connection9,arguments)}/**
     * Starts synchronisation between a local and remote database.
     * @returns Nothing.
     */},{key:'startSynchronisation',value:function startSynchronisation(){return this.synchronisation=this.connection.sync(this.remoteConnection,{live:true,retry:true}).on('change',function(info){return console.info('change',info)}).on('paused',function(){return console.info('paused')}).on('active',function(){return console.info('active')}).on('denied',function(error){return console.warn('denied',error)}).on('complete',function(info){return console.info('complete',info)}).on('error',function(error){return console.error('error',error)})}}],[{key:'determineGenericIndexablePropertyNames',value:function determineGenericIndexablePropertyNames(modelConfiguration,model){var specialNames=modelConfiguration.property.name.special;return Object.keys(model).filter(function(name){return model[name].index||!(modelConfiguration.property.name.reserved.concat(specialNames.additional,specialNames.allowedRole,specialNames.attachment,specialNames.conflict,specialNames.constraint.execution,specialNames.constraint.expression,specialNames.deleted,specialNames.deleted_conflict,specialNames.extend,specialNames.id,specialNames.maximumAggregatedSize,specialNames.minimumAggregatedSize,specialNames.revision,specialNames.revisions,specialNames.revisionsInformation,specialNames.type).includes(name)||model[name].type&&(typeof model[name].type==='string'&&model[name].type.endsWith('[]')||Array.isArray(model[name].type)&&model[name].type.length&&Array.isArray(model[name].type[0])||modelConfiguration.entities.hasOwnProperty(model[name].type)))}).concat(specialNames.id,specialNames.revision)}}]);return DataService}(),_class151.revisionNumberRegularExpression=new RegExp('^([0-9]+)-'),_class151.wrappableMethodNames=['allDocs','bulkDocs','bulkGet','close','compact','compactDocument','createIndex','deleteIndexs','destroy','find','get','getAttachment','getIndexes','info','post','put','putAttachment','query','remove','removeAttachment'],_temp53))||_class150);// IgnoreTypeCheck
(0,_core.Inject)(_core.PLATFORM_ID)(DataService,null,4);Reflect.defineMetadata('design:paramtypes',[EqualsPipe,ExtendObjectPipe,InitialDataService,_core.NgZone,String,StringFormatPipe,UtilityService],DataService);/**
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
 */var DataScopeService=exports.DataScopeService=(_dec86=(0,_core.Injectable)(),_dec86(_class152=function(){/**
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
     */function DataScopeService(attachmentWithPrefixExistsPipe,data,extendObjectPipe,extractDataPipe,getFilenameByPrefixPipe,initialData,numberGetUTCTimestampPipe,representObjectPipe,utility){_classCallCheck(this,DataScopeService);this.attachmentWithPrefixExists=this.attachmentWithPrefixExists;this.configuration=this.configuration;this.data=this.data;this.extendObject=this.extendObject;this.extractData=this.extractData;this.getFilenameByPrefix=this.getFilenameByPrefix;this.numberGetUTCTimestamp=this.numberGetUTCTimestamp;this.representObject=this.representObject;this.tools=this.tools;this.attachmentWithPrefixExists=attachmentWithPrefixExistsPipe.transform.bind(attachmentWithPrefixExistsPipe);this.configuration=initialData.configuration;this.data=data;this.extendObject=extendObjectPipe.transform.bind(extendObjectPipe);this.extractData=extractDataPipe.transform.bind(extractDataPipe);this.getFilenameByPrefix=getFilenameByPrefixPipe.transform.bind(getFilenameByPrefixPipe);this.numberGetUTCTimestamp=numberGetUTCTimestampPipe.transform.bind(numberGetUTCTimestampPipe);this.representObject=representObjectPipe.transform.bind(representObjectPipe);this.tools=utility.fixed.tools}/**
     * Useful to sets route specific data in a resolver.
     * @param modelName - Name of model to retrieve data from.
     * @param id - ID of an entity to retrieve data from.
     * @param propertyNames - List of property names to retrieve data from.
     * @param revision - Revision to use for retrieving needed data from data
     * service.
     * @param revisionHistory - Indicates whether the revision history should
     * be included.
     * @returns A promise wrapping requested data.
     */_createClass(DataScopeService,[{key:'determine',value:function(){var _ref61=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee11(modelName){var id=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var propertyNames=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var revision=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'latest';var revisionHistory=arguments.length>4&&arguments[4]!==undefined?arguments[4]:false;var data,options,revisionsInformationName,_revisions,latestData,first,_iteratorNormalCompletion17,_didIteratorError17,_iteratorError17,_iterator17,_step17,item;return regeneratorRuntime.wrap(function _callee11$(_context11){while(1){switch(_context11.prev=_context11.next){case 0:data={};if(!id){_context11.next=56;break}options={};if(revision==='latest'){options.latest=true;if(revisionHistory)/* eslint-disable camelcase */options.revs_info=true;/* eslint-enable camelcase */}else options.rev=revision;_context11.prev=4;_context11.next=7;return this.data.get(id,options);case 7:data=_context11.sent;_context11.next=13;break;case 10:_context11.prev=10;_context11.t0=_context11['catch'](4);throw new Error('Document with given id "'+id+'" and revision "'+(revision+'" isn\'t available: ')+('message'in _context11.t0?_context11.t0.message:this.representObject(_context11.t0)));case 13:if(!revisionHistory){_context11.next=56;break}revisionsInformationName=this.configuration.database.model.property.name.special.revisionsInformation;_revisions=void 0;latestData=null;if(!(revision!=='latest')){_context11.next=33;break}delete options.rev;/* eslint-disable camelcase */options.revs_info=true;/* eslint-enable camelcase */_context11.prev=20;_context11.next=23;return this.data.get(id,options);case 23:latestData=_context11.sent;_context11.next=29;break;case 26:_context11.prev=26;_context11.t1=_context11['catch'](20);throw new Error('Document with given id "'+id+'" and revision "'+(revision+'" isn\'t available: ')+('message'in _context11.t1?_context11.t1.message:this.representObject(_context11.t1)));case 29:_revisions=latestData[revisionsInformationName];delete latestData[revisionsInformationName];_context11.next=34;break;case 33:_revisions=data[revisionsInformationName];case 34:data[revisionsInformationName]={};first=true;_iteratorNormalCompletion17=true;_didIteratorError17=false;_iteratorError17=undefined;_context11.prev=39;for(_iterator17=_revisions[Symbol.iterator]();!(_iteratorNormalCompletion17=(_step17=_iterator17.next()).done);_iteratorNormalCompletion17=true){item=_step17.value;if(item.status==='available'){data[revisionsInformationName][first?'latest':item.rev]={revision:item.rev};first=false}}_context11.next=47;break;case 43:_context11.prev=43;_context11.t2=_context11['catch'](39);_didIteratorError17=true;_iteratorError17=_context11.t2;case 47:_context11.prev=47;_context11.prev=48;if(!_iteratorNormalCompletion17&&_iterator17.return){_iterator17.return()}case 50:_context11.prev=50;if(!_didIteratorError17){_context11.next=53;break}throw _iteratorError17;case 53:return _context11.finish(50);case 54:return _context11.finish(47);case 55:if(latestData)data[revisionsInformationName].latest.scope=this.generate(modelName,propertyNames,latestData);case 56:return _context11.abrupt('return',this.generate(modelName,propertyNames,data));case 57:case'end':return _context11.stop();}}},_callee11,this,[[4,10],[20,26],[39,43,47,55],[48,,50,54]])}));function determine(_x31){return _ref61.apply(this,arguments)}return determine}()// TODO test
/**
     * Determines a nested specification object for given property name and
     * corresponding specification object where given property is bound to.
     * @param name - Property name to search specification for.
     * @param specification - Parents object specification.
     * @returns New specification object or null if it could not be determined.
     */},{key:'determineNestedSpecifcation',value:function determineNestedSpecifcation(name,specification){var entities=this.configuration.database.model.entities;var additionalName=this.configuration.database.model.property.name.special.additional;if(specification)if(specification.hasOwnProperty(name)){if(entities.hasOwnProperty(specification[name].type))return entities[specification[name].type]}else if(specification.hasOwnProperty(additionalName)&&entities.hasOwnProperty(specification[additionalName].type))return entities[specification[additionalName].type];return null}/**
     * Determines a recursive resolved specification object for given (flat)
     * model object.
     * @param modelSpecification - Specification object to traverse.
     * @param propertyNames - List of property names to consider.
     * @param propertyNamesToIgnore - List of property names to skip.
     * @returns Resolved specification object.
     */},{key:'determineSpecificationObject',value:function determineSpecificationObject(modelSpecification,propertyNames){var propertyNamesToIgnore=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];if(!propertyNames)propertyNames=Object.keys(modelSpecification);var result={};var _iteratorNormalCompletion18=true;var _didIteratorError18=false;var _iteratorError18=undefined;try{for(var _iterator18=propertyNames[Symbol.iterator](),_step18;!(_iteratorNormalCompletion18=(_step18=_iterator18.next()).done);_iteratorNormalCompletion18=true){var _name13=_step18.value;if(modelSpecification.hasOwnProperty(_name13)&&!propertyNamesToIgnore.includes(_name13))if(_name13===this.configuration.database.model.property.name.special.attachment){result[_name13]={};for(var fileType in modelSpecification[_name13]){if(modelSpecification[_name13].hasOwnProperty(fileType))result[_name13][fileType]=this.extendObject(true,this.tools.copyLimitedRecursively(this.configuration.database.model.property.defaultSpecification),modelSpecification[_name13][fileType])}}else{result[_name13]=this.extendObject(true,this.tools.copyLimitedRecursively(this.configuration.database.model.property.defaultSpecification),modelSpecification[_name13]);if(this.configuration.database.model.entities.hasOwnProperty(result[_name13].type))result[_name13].value=this.determineSpecificationObject(this.configuration.database.model.entities[result[_name13].type])}}}catch(err){_didIteratorError18=true;_iteratorError18=err}finally{try{if(!_iteratorNormalCompletion18&&_iterator18.return){_iterator18.return()}}finally{if(_didIteratorError18){throw _iteratorError18}}}return result}/**
     * Generates a scope object for given model with given property names and
     * property value mapping data.
     * @param modelName - Name of model to generate scope for.
     * @param propertyNames - List of property names to generate meta data in
     * scope for. If "null" is given all properties in given model will be
     * taken into account.
     * @param data - Data to use for given properties.
     * @param propertyNamesToIgnore - Property names ti skip.
     * @returns The generated scope object.
     */},{key:'generate',value:function generate(modelName,propertyNames){var data=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};var propertyNamesToIgnore=arguments[3];var entities=this.configuration.database.model.entities;var modelSpecification=entities[modelName];var specialNames=this.configuration.database.model.property.name.special;if(!propertyNamesToIgnore)propertyNamesToIgnore=modelName.startsWith('_')?[specialNames.id,specialNames.attachment]:[];var reservedNames=this.configuration.database.model.property.name.reserved.concat(specialNames.conflict,specialNames.deleted,specialNames.deletedConflict,specialNames.localSequence,specialNames.revision,specialNames.revisions,specialNames.revisionsInformation,specialNames.type);var specification=this.determineSpecificationObject(modelSpecification,propertyNames,propertyNamesToIgnore.concat(reservedNames));if(!propertyNames){propertyNames=Object.keys(specification).filter(function(key){return _typeof(specification[key])==='object'&&typeof specification[key]!==null&&!Array.isArray(specification[key])});propertyNames=propertyNames.concat(Object.keys(data).filter(function(name){return!propertyNames.concat(reservedNames).includes(name)}))}var result={};var _iteratorNormalCompletion19=true;var _didIteratorError19=false;var _iteratorError19=undefined;try{for(var _iterator19=propertyNames[Symbol.iterator](),_step19;!(_iteratorNormalCompletion19=(_step19=_iterator19.next()).done);_iteratorNormalCompletion19=true){var _name14=_step19.value;if(propertyNamesToIgnore.includes(_name14))continue;if(specification.hasOwnProperty(_name14))result[_name14]=this.tools.copyLimitedRecursively(specification[_name14]);else result[_name14]=this.tools.copyLimitedRecursively('additional'in specialNames&&specialNames.additional?specification[specialNames.additional]:{});var now=new Date;var nowUTCTimestamp=this.numberGetUTCTimestamp(now);if(_name14===specialNames.attachment){for(var _type6 in specification[_name14]){if(specification[_name14].hasOwnProperty(_type6)){result[_name14][_type6].name=_type6;result[_name14][_type6].value=null;if(Object.keys(data).length===0){var scope={newDocument:data,oldDocument:null,userConteyt:{},securitySettings:{},name:_type6,models:entities,modelConfiguration:this.configuration.database.model,serialize:function serialize(object){return JSON.stringify(object,null,4)},modelName:modelName,model:modelSpecification,propertySpecification:result[_name14][_type6],now:now,nowUTCTimestamp:nowUTCTimestamp,getFilenameByPrefix:this.getFilenameByPrefix,attachmentWithPrefixExists:this.attachmentWithPrefixExists.bind(data,data)};var _arr8=['onCreateExecution','onCreateExpression'];for(var _i8=0;_i8<_arr8.length;_i8++){var hookType=_arr8[_i8];if(result[_name14][_type6].hasOwnProperty(hookType)&&result[_name14][_type6][hookType]){result[_name14][_type6].value=new(Function.prototype.bind.apply(Function,[null].concat(_toConsumableArray(Object.keys(scope)),[(hookType.endsWith('Expression')?'return ':'')+result[_name14][_type6][hookType]])))().apply(undefined,_toConsumableArray(Object.values(scope)));if(result[_name14][_type6].hasOwnProperty('value')&&result[_name14][_type6].value===undefined)delete result[_name14][_type6].value}}}var fileFound=false;if(data.hasOwnProperty(_name14)&&![undefined,null].includes(data[_name14]))for(var fileName in data[_name14]){if(result[_name14].hasOwnProperty(_type6)&&new RegExp(_type6).test(fileName)){fileFound=true;result[_name14][_type6].value=data[_name14][fileName];result[_name14][_type6].value.name=fileName;break}}if(!fileFound&&result[_name14][_type6].hasOwnProperty('default')&&![undefined,null].includes(result[_name14][_type6].default))result[_name14][_type6].value=this.tools.copyLimitedRecursively({},result[_name14][_type6].default)}}}else{result[_name14].name=_name14;result[_name14].value=null;if(Object.keys(data).length===0){var _scope={newDocument:data,oldDocument:null,userContext:{},securitySettings:{},name:_name14,models:entities,modelConfiguration:this.configuration.database.model,serialize:function serialize(object){return JSON.stringify(object,null,4)},modelName:modelName,model:modelSpecification,propertySpecification:result[_name14],now:now,nowUTCTimestamp:nowUTCTimestamp,getFilenameByPrefix:this.getFilenameByPrefix,attachmentWithPrefixExists:this.attachmentWithPrefixExists.bind(data,data)};var _arr9=['onCreateExpression','onCreateExecution'];for(var _i9=0;_i9<_arr9.length;_i9++){var _type7=_arr9[_i9];if(result[_name14].hasOwnProperty(_type7)&&result[_name14][_type7]){result[_name14].value=new(Function.prototype.bind.apply(Function,[null].concat(_toConsumableArray(Object.keys(_scope)),[(_type7.endsWith('Expression')?'return ':'')+result[_name14][_type7]])))().apply(undefined,_toConsumableArray(Object.values(_scope)));if(result[_name14].value===undefined)result[_name14].value=null}}}if(data.hasOwnProperty(_name14)&&![undefined,null].includes(data[_name14]))result[_name14].value=data[_name14];else if(result[_name14].hasOwnProperty('default')&&![undefined,null].includes(result[_name14].default))result[_name14].value=this.tools.copyLimitedRecursively(result[_name14].default);else if(result[_name14].hasOwnProperty('selection')&&Array.isArray(result[_name14].selection)&&result[_name14].selection.length)result[_name14].value=result[_name14].selection[0];if(typeof result[_name14].value==='number'&&result[_name14].hasOwnProperty('type')&&(result[_name14].type.endsWith('Date')||result[_name14].type.endsWith('Time')))// NOTE: We interpret given value as an utc timestamp.
result[_name14].value=new Date(result[_name14].value*1000);else if(result[_name14].hasOwnProperty('type'))if(entities.hasOwnProperty(result[_name14].type))result[_name14].value=this.generate(result[_name14].type,null,result[_name14].value||{},[specialNames.attachment,specialNames.id]);else if(result[_name14].type.endsWith('[]')){var _type8=result[_name14].type.substring(0,result[_name14].type.length-2);if(Array.isArray(result[_name14].value)&&entities.hasOwnProperty(_type8)){var _index5=0;var _iteratorNormalCompletion21=true;var _didIteratorError21=false;var _iteratorError21=undefined;try{for(var _iterator21=result[_name14].value[Symbol.iterator](),_step21;!(_iteratorNormalCompletion21=(_step21=_iterator21.next()).done);_iteratorNormalCompletion21=true){var item=_step21.value;result[_name14].value[_index5]=this.generate(_type8,null,item||{},[specialNames.attachment,specialNames.id]);_index5+=1}}catch(err){_didIteratorError21=true;_iteratorError21=err}finally{try{if(!_iteratorNormalCompletion21&&_iterator21.return){_iterator21.return()}}finally{if(_didIteratorError21){throw _iteratorError21}}}}}}}}catch(err){_didIteratorError19=true;_iteratorError19=err}finally{try{if(!_iteratorNormalCompletion19&&_iterator19.return){_iterator19.return()}}finally{if(_didIteratorError19){throw _iteratorError19}}}var _iteratorNormalCompletion20=true;var _didIteratorError20=false;var _iteratorError20=undefined;try{for(var _iterator20=reservedNames[Symbol.iterator](),_step20;!(_iteratorNormalCompletion20=(_step20=_iterator20.next()).done);_iteratorNormalCompletion20=true){var _name15=_step20.value;if(data.hasOwnProperty(_name15))result[_name15]=data[_name15];else if(_name15===specialNames.type)result[_name15]=modelName}}catch(err){_didIteratorError20=true;_iteratorError20=err}finally{try{if(!_iteratorNormalCompletion20&&_iterator20.return){_iterator20.return()}}finally{if(_didIteratorError20){throw _iteratorError20}}}result._metaData={submitted:false};return result}}]);return DataScopeService}())||_class152);// / region abstract
// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[AttachmentWithPrefixExistsPipe,DataService,ExtendObjectPipe,ExtractDataPipe,GetFilenameByPrefixPipe,InitialDataService,NumberGetUTCTimestampPipe,RepresentObjectPipe,UtilityService],DataScopeService);/**
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
 */var AbstractResolver=exports.AbstractResolver=(_dec87=(0,_core.Injectable)(),_dec87(_class154=function(){/**
     * Sets all needed injected services as instance properties.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */function AbstractResolver(injector){var _this54=this;_classCallCheck(this,AbstractResolver);this.data=this.data;this.databaseBaseURL=this.databaseBaseURL;this.databaseURL=this.databaseURL;this.databaseURLCache={};this.domSanitizer=this.domSanitizer;this.escapeRegularExpressions=this.escapeRegularExpressions;this.extendObject=this.extendObject;this.message=this.message;this.messageConfiguration=new _material.MatSnackBarConfig;this.modelConfiguration=this.modelConfiguration;this.relevantKeys=null;this.relevantSearchKeys=null;this.representObject=this.representObject;this.specialNames=this.specialNames;this.type='Item';this.useLimit=false;this.useSkip=false;var get=determineInjector(injector,this,this.constructor);this.data=get(DataService);this.domSanitizer=get(_platformBrowser.DomSanitizer);var databaseBaseURL=get(StringFormatPipe).transform(get(InitialDataService).configuration.database.url,'')+'/';this.databaseBaseURL=databaseBaseURL+'_utils/#/database/'+(get(InitialDataService).configuration.name+'/');this.databaseURL=databaseBaseURL+get(InitialDataService).configuration.name;this.escapeRegularExpressions=get(StringEscapeRegularExpressionsPipe).transform.bind(get(StringEscapeRegularExpressionsPipe));this.extendObject=get(ExtendObjectPipe).transform.bind(get(ExtendObjectPipe));this.messageConfiguration.duration=5*1000;this.message=function(message){return get(_material.MatSnackBar).open(message,false,_this54.messageConfiguration)};this.modelConfiguration=get(InitialDataService).configuration.database.model;this.representObject=get(RepresentObjectPipe).transform.bind(get(RepresentObjectPipe));this.specialNames=get(InitialDataService).configuration.database.model.property.name.special}/**
     * Determines item specific database url by given item data object.
     * @param item - Given item object.
     * @returns Determined url.
     */_createClass(AbstractResolver,[{key:'getDatabaseURL',value:function getDatabaseURL(item){var url=this.databaseBaseURL+(_typeof(item[this.specialNames.id])==='object'?item[this.specialNames.id].value:item[this.specialNames.id]);// NOTE: We cache sanitized urls to avoid reloads.
if(!this.databaseURLCache.hasOwnProperty(url))this.databaseURLCache[url]=this.domSanitizer.bypassSecurityTrustResourceUrl(url);return this.databaseURLCache[url]}/**
     * List items which matches given filter criteria.
     * @param sort - List of items.
     * @param page - Page to show.
     * @param limit - Maximal number of entities to retrieve.
     * @param searchTerm - String query to search for.
     * @param additionalSelector - Custom filter criteria.
     * @returns A promise wrapping retrieved data.
     */},{key:'list',value:function list(){var sort=arguments.length>0&&arguments[0]!==undefined?arguments[0]:[_defineProperty({},InitialDataService.defaultScope.configuration.database.model.property.name.special.id,'asc')];var page=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;var limit=arguments.length>2&&arguments[2]!==undefined?arguments[2]:10;var searchTerm=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'';var additionalSelector=arguments.length>4&&arguments[4]!==undefined?arguments[4]:{};if(!this.relevantSearchKeys){this.relevantSearchKeys=DataService.determineGenericIndexablePropertyNames(this.modelConfiguration,this.modelConfiguration.entities[this.type]);this.relevantSearchKeys.splice(this.relevantSearchKeys.indexOf(this.specialNames.revision),1)}var selector=_defineProperty({},this.specialNames.type,this.type);if(searchTerm||Object.keys(additionalSelector).length){if(sort.length)selector[Object.keys(sort[0])[0]]={$gt:null};selector.$or=[];var _iteratorNormalCompletion22=true;var _didIteratorError22=false;var _iteratorError22=undefined;try{for(var _iterator22=this.relevantSearchKeys[Symbol.iterator](),_step22;!(_iteratorNormalCompletion22=(_step22=_iterator22.next()).done);_iteratorNormalCompletion22=true){var _name16=_step22.value;selector.$or.push(_defineProperty({},_name16,{$regex:searchTerm}))}}catch(err){_didIteratorError22=true;_iteratorError22=err}finally{try{if(!_iteratorNormalCompletion22&&_iterator22.return){_iterator22.return()}}finally{if(_didIteratorError22){throw _iteratorError22}}}if(additionalSelector.hasOwnProperty('$or')&&additionalSelector.$or.length){/*
                    NOTE: We have to integrate search expression into existing
                    selector.
                */var _iteratorNormalCompletion23=true;var _didIteratorError23=false;var _iteratorError23=undefined;try{for(var _iterator23=selector.$or[Symbol.iterator](),_step23;!(_iteratorNormalCompletion23=(_step23=_iterator23.next()).done);_iteratorNormalCompletion23=true){var item=_step23.value;item.$or=additionalSelector.$or}}catch(err){_didIteratorError23=true;_iteratorError23=err}finally{try{if(!_iteratorNormalCompletion23&&_iterator23.return){_iterator23.return()}}finally{if(_didIteratorError23){throw _iteratorError23}}}delete additionalSelector.$or}}var options={};if(this.useLimit)options.limit=limit;if(this.useSkip)options.skip=Math.max(page-1,0)*limit;if(this.relevantKeys)options.fields=this.relevantKeys;if(options.skip===0)delete options.skip;if(sort.length)options.sort=[this.specialNames.type].concat(sort).map(function(item){return Object.values(item)[0]==='asc'?Object.keys(item)[0]:item});return this.data.find(this.extendObject(true,selector,additionalSelector),options)}/**
     * Removes given item.
     * @param item - Item or id to delete.
     * @param message - Message to show after successful removement.
     * @returns Nothing.
     */},{key:'remove',value:function remove(item){var message=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';return this.update(item,_defineProperty({},this.specialNames.deleted,true),message)}/* eslint-disable no-unused-vars *//**
     * Implements the resolver method which converts route informations into
     * "list()" method parameter and forward their result as result in an
     * observable.
     * @param route - Current route informations.
     * @param state - Current state informations.
     * @returns Promise with data filtered by current route informations.
     */},{key:'resolve',value:function resolve(route,state){/* eslint-enable no-unused-vars */var searchTerm='';if('searchTerm'in route.params){var term=decodeURIComponent(route.params.searchTerm);if(term.startsWith('exact-'))searchTerm=this.escapeRegularExpressions(term.substring('exact-'.length));else if(term.startsWith('regex-')){searchTerm=term.substring('regex-'.length);try{new RegExp(searchTerm)}catch(error){searchTerm=''}}}var sort=[];if('sort'in route.params)sort=route.params.sort.split(',').map(function(name){var lastIndex=name.lastIndexOf('-');var type='asc';if(lastIndex!==-1){type=name.substring(lastIndex+1)||type;name=name.substring(0,lastIndex)}return _defineProperty({},name,type)});return this.list(sort,parseInt(route.params.page||1),parseInt(route.params.limit||10),searchTerm)}/**
     * Updates given item.
     * @param item - Item to update.
     * @param data - Optional given data to update into given item.
     * @param message - Message to should if process was successfully.
     * @returns A boolean indicating if requested update was successful.
     */},{key:'update',value:function(){var _ref64=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee12(item,data){var _extendObject;var message=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'';var newData;return regeneratorRuntime.wrap(function _callee12$(_context12){while(1){switch(_context12.prev=_context12.next){case 0:newData=void 0;if(data)newData=this.extendObject((_extendObject={},_defineProperty(_extendObject,this.specialNames.id,_typeof(item[this.specialNames.id])==='object'?item[this.specialNames.id].value:item[this.specialNames.id]),_defineProperty(_extendObject,this.specialNames.revision,'latest'),_defineProperty(_extendObject,this.specialNames.type,item[this.specialNames.type]),_extendObject),data);else newData=item;_context12.prev=2;_context12.next=5;return this.data.put(newData);case 5:item[this.specialNames.revision]=_context12.sent.rev;_context12.next=12;break;case 8:_context12.prev=8;_context12.t0=_context12['catch'](2);this.message('message'in _context12.t0?_context12.t0.message:this.representObject(_context12.t0));return _context12.abrupt('return',false);case 12:if(message)this.message(message);return _context12.abrupt('return',true);case 14:case'end':return _context12.stop();}}},_callee12,this,[[2,8]])}));function update(_x44,_x45){return _ref64.apply(this,arguments)}return update}()}]);return AbstractResolver}())||_class154);// / endregion
// endregion
// region provider
/**
 * Creates a database connection and/or synchronisation stream plus missing
 * local indexes.
 * @param data - Injected data service instance.
 * @param injector - Injected injector service instance.
 * @returns Initializer function.
 */(0,_core.Optional)()(AbstractResolver,null,0);Reflect.defineMetadata('design:paramtypes',[_core.Injector],AbstractResolver);function dataServiceInitializerFactory(data,injector){/*
        NOTE: We need this statement here to avoid having an ugly typescript
        error.
    */2;return function(){InitialDataService.injectors.add(injector);return data.initialize()}}// endregion
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
 */var AbstractInputComponent=exports.AbstractInputComponent=(_dec88=(0,_core.Input)(),_dec89=(0,_core.Input)(),_dec90=(0,_core.Input)(),_dec91=(0,_core.Input)(),_dec92=(0,_core.Input)(),_dec93=(0,_core.Input)(),_dec94=(0,_core.Input)(),_dec95=(0,_core.Input)(),_dec96=(0,_core.Input)(),_dec97=(0,_core.Input)(),_dec98=(0,_core.Input)(),_dec99=(0,_core.Input)(),_dec100=(0,_core.Output)(),_dec101=(0,_core.Input)(),_dec102=(0,_core.Input)(),_dec103=(0,_core.Input)(),_dec104=(0,_core.Input)(),_dec105=(0,_core.Input)(),_dec106=(0,_core.Input)(),_dec107=(0,_core.Input)(),(_class156=function AbstractInputComponent(){_classCallCheck(this,AbstractInputComponent);_initDefineProp(this,'declaration',_descriptor3,this);_initDefineProp(this,'description',_descriptor4,this);_initDefineProp(this,'disabled',_descriptor5,this);_initDefineProp(this,'maximum',_descriptor6,this);_initDefineProp(this,'maximumLength',_descriptor7,this);_initDefineProp(this,'maximumLengthText',_descriptor8,this);_initDefineProp(this,'maximumText',_descriptor9,this);_initDefineProp(this,'minimum',_descriptor10,this);_initDefineProp(this,'minimumLength',_descriptor11,this);_initDefineProp(this,'minimumLengthText',_descriptor12,this);_initDefineProp(this,'minimumText',_descriptor13,this);_initDefineProp(this,'model',_descriptor14,this);_initDefineProp(this,'modelChange',_descriptor15,this);_initDefineProp(this,'pattern',_descriptor16,this);_initDefineProp(this,'patternText',_descriptor17,this);_initDefineProp(this,'required',_descriptor18,this);_initDefineProp(this,'requiredText',_descriptor19,this);_initDefineProp(this,'showDeclarationText',_descriptor20,this);_initDefineProp(this,'showValidationErrorMessages',_descriptor21,this);_initDefineProp(this,'type',_descriptor22,this)},(_descriptor3=_applyDecoratedDescriptor(_class156.prototype,'declaration',[_dec88],{enumerable:true,initializer:function initializer(){return null}}),_descriptor4=_applyDecoratedDescriptor(_class156.prototype,'description',[_dec89],{enumerable:true,initializer:function initializer(){return null}}),_descriptor5=_applyDecoratedDescriptor(_class156.prototype,'disabled',[_dec90],{enumerable:true,initializer:function initializer(){return null}}),_descriptor6=_applyDecoratedDescriptor(_class156.prototype,'maximum',[_dec91],{enumerable:true,initializer:function initializer(){return null}}),_descriptor7=_applyDecoratedDescriptor(_class156.prototype,'maximumLength',[_dec92],{enumerable:true,initializer:function initializer(){return null}}),_descriptor8=_applyDecoratedDescriptor(_class156.prototype,'maximumLengthText',[_dec93],{enumerable:true,initializer:function initializer(){return'Please type less or equal than ${model.maximumLength} symbols.'}}),_descriptor9=_applyDecoratedDescriptor(_class156.prototype,'maximumText',[_dec94],{enumerable:true,initializer:function initializer(){return'Please give a number less or equal than ${model.maximum}.'}}),_descriptor10=_applyDecoratedDescriptor(_class156.prototype,'minimum',[_dec95],{enumerable:true,initializer:function initializer(){return null}}),_descriptor11=_applyDecoratedDescriptor(_class156.prototype,'minimumLength',[_dec96],{enumerable:true,initializer:function initializer(){return null}}),_descriptor12=_applyDecoratedDescriptor(_class156.prototype,'minimumLengthText',[_dec97],{enumerable:true,initializer:function initializer(){return'Please type at least or equal ${model.minimumLength} symbols.'}}),_descriptor13=_applyDecoratedDescriptor(_class156.prototype,'minimumText',[_dec98],{enumerable:true,initializer:function initializer(){return'Please given a number at least or equal to {{model.minimum}}.'}}),_descriptor14=_applyDecoratedDescriptor(_class156.prototype,'model',[_dec99],{enumerable:true,initializer:function initializer(){return{}}}),_descriptor15=_applyDecoratedDescriptor(_class156.prototype,'modelChange',[_dec100],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor16=_applyDecoratedDescriptor(_class156.prototype,'pattern',[_dec101],{enumerable:true,initializer:function initializer(){return this.pattern}}),_descriptor17=_applyDecoratedDescriptor(_class156.prototype,'patternText',[_dec102],{enumerable:true,initializer:function initializer(){return'Your string have to match the regular expression: "'+'${model.regularExpressionPattern}".'}}),_descriptor18=_applyDecoratedDescriptor(_class156.prototype,'required',[_dec103],{enumerable:true,initializer:function initializer(){return null}}),_descriptor19=_applyDecoratedDescriptor(_class156.prototype,'requiredText',[_dec104],{enumerable:true,initializer:function initializer(){return'Please fill this field.'}}),_descriptor20=_applyDecoratedDescriptor(_class156.prototype,'showDeclarationText',[_dec105],{enumerable:true,initializer:function initializer(){return'\u2139'}}),_descriptor21=_applyDecoratedDescriptor(_class156.prototype,'showValidationErrorMessages',[_dec106],{enumerable:true,initializer:function initializer(){return false}}),_descriptor22=_applyDecoratedDescriptor(_class156.prototype,'type',[_dec107],{enumerable:true,initializer:function initializer(){return this.type}})),_class156));/**
 * Generic input component.
 * @property _attachmentWithPrefixExists - Holds the attachment by prefix
 * checker pipe instance
 * @property _extendObject - Holds the extend object's pipe transformation
 * @property _getFilenameByPrefix - Holds the get file name by prefix's pipe
 * transformation method.
 * @property _modelConfiguration - All model configurations.
 * @property _numberGetUTCTimestamp - Date (and time) to unix timstamp
 * converter pipe transform method.
 */var AbstractNativeInputComponent=exports.AbstractNativeInputComponent=function(_AbstractInputCompone){_inherits(AbstractNativeInputComponent,_AbstractInputCompone);/**
     * Sets needed services as property values.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */function AbstractNativeInputComponent(injector){_classCallCheck(this,AbstractNativeInputComponent);var _this55=_possibleConstructorReturn(this,(AbstractNativeInputComponent.__proto__||Object.getPrototypeOf(AbstractNativeInputComponent)).call(this));_this55._attachmentWithPrefixExists=_this55._attachmentWithPrefixExists;_this55._extendObject=_this55._extendObject;_this55._getFilenameByPrefix=_this55._getFilenameByPrefix;_this55._modelConfiguration=_this55._modelConfiguration;_this55._numberGetUTCTimestamp=_this55._numberGetUTCTimestamp;var get=determineInjector(injector,_this55,_this55.constructor);_this55._attachmentWithPrefixExists=get(AttachmentWithPrefixExistsPipe).transform.bind(get(AttachmentWithPrefixExistsPipe));_this55._extendObject=get(ExtendObjectPipe).transform.bind(get(ExtendObjectPipe));_this55._getFilenameByPrefix=get(GetFilenameByPrefixPipe).transform.bind(get(GetFilenameByPrefixPipe));_this55._modelConfiguration=get(InitialDataService).configuration.database.model;_this55._numberGetUTCTimestamp=get(NumberGetUTCTimestampPipe).transform.bind(get(NumberGetUTCTimestampPipe));return _this55}/**
     * Triggers after input values have been resolved.
     * @returns Nothing.
     */_createClass(AbstractNativeInputComponent,[{key:'ngOnInit',value:function ngOnInit(){this._extendObject(this.model,this._extendObject({disabled:false,emptyEqualsToNull:true,maximum:Infinity,minimum:0,maximumLength:Infinity,minimumLength:0,nullable:true,regularExpressionPattern:'.*',state:{},trim:true,type:'string'},this.model));if(typeof this.model.value==='string'&&this.model.trim)this.model.value===this.model.value.trim();var _arr10=['onUpdateExpression','onUpdateExecution'];for(var _i10=0;_i10<_arr10.length;_i10++){var hookType=_arr10[_i10];if(this.model.hasOwnProperty(hookType)&&this.model[hookType]&&typeof this.model[hookType]!=='function')this.model[hookType]=new Function('newDocument','oldDocument','userContext','securitySettings','name','models','modelConfiguration','serialize','modelName','model','propertySpecification','now','nowUTCTimestamp','getFilenameByPrefix','attachmentWithPrefixExists',(hookType.endsWith('Expression')?'return ':'')+this.model[hookType])}}/**
     * Triggers when ever a change to current model happens inside this
     * component.
     * @param newValue - Value to use to update model with.
     * @param state - Saves the current model state.
     * @returns Nothing.
     */},{key:'onChange',value:function onChange(newValue,state){if(this.model.type==='integer')newValue=parseInt(newValue);else if(this.model.type==='number')newValue=parseFloat(newValue);else if(newValue&&this.model.type==='string'&&this.model.trim)newValue=newValue.trim();var now=new Date;var nowUTCTimestamp=this._numberGetUTCTimestamp(now);var newData=_defineProperty({},this.model.name,newValue);var _arr11=['onUpdateExpression','onUpdateExecution'];for(var _i11=0;_i11<_arr11.length;_i11++){var hookType=_arr11[_i11];if(this.model.hasOwnProperty(hookType)&&this.model[hookType]&&typeof this.model[hookType]==='function'){newValue=this.model[hookType](newData,null,{},{},this.model.name,this._modelConfiguration.entities,this._modelConfiguration,function(object){return JSON.stringify(object,null,4)},'generic',{generic:_defineProperty({},this.model.name,this.model)},this.model,now,nowUTCTimestamp,this._getFilenameByPrefix,this._attachmentWithPrefixExists.bind(newData,newData),newValue);if(!(newValue instanceof Date)&&(this.model.type.endsWith('Date')||this.model.type.endsWith('Time')))newValue*=1000}}this.model.state=state;return newValue}}]);return AbstractNativeInputComponent}(AbstractInputComponent);/**
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
 */(0,_core.Optional)()(AbstractNativeInputComponent,null,0);Reflect.defineMetadata('design:paramtypes',[_core.Injector],AbstractNativeInputComponent);var AbstractLiveDataComponent=exports.AbstractLiveDataComponent=(_temp54=_class159=function(){/**
     * Saves injected service instances as instance properties.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */function AbstractLiveDataComponent(injector){_classCallCheck(this,AbstractLiveDataComponent);this.actions=[];this.autoRestartOnError=true;this._canceled=false;this._changeDetectorReference=this._changeDetectorReference;this._changesStream=this._changesStream;this._data=this._data;this._extendObject=this._extendObject;this._liveUpdateOptions={};this._stringCapitalize=this._stringCapitalize;this._tools=this._tools;var get=determineInjector(injector,this,this.constructor);this._changeDetectorReference=get(_core.ChangeDetectorRef);this._data=get(DataService);this._extendObject=get(ExtendObjectPipe).transform.bind(get(ExtendObjectPipe));this._stringCapitalize=get(StringCapitalizePipe).transform.bind(get(StringCapitalizePipe));this._tools=get(UtilityService).fixed.tools}/**
     * Initializes data observation when view has been initialized.
     * @returns Nothing.
     */_createClass(AbstractLiveDataComponent,[{key:'ngOnInit',value:function ngOnInit(){var _this56=this;var initialize=this._tools.debounce(function(){_this56._changesStream=_this56._data.connection.changes(_this56._extendObject(true,{},{since:LAST_KNOWN_DATA.sequence},AbstractLiveDataComponent.defaultLiveUpdateOptions,_this56._liveUpdateOptions));var _loop3=function _loop3(_type9){_this56._changesStream.on(_type9,function(){var _ref65=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee13(action){var result;return regeneratorRuntime.wrap(function _callee13$(_context13){while(1){switch(_context13.prev=_context13.next){case 0:if(!_this56._canceled){_context13.next=2;break}return _context13.abrupt('return');case 2:if(_type9==='change'){if('seq'in action&&typeof action.seq==='number')LAST_KNOWN_DATA.sequence=action.seq;LAST_KNOWN_DATA.data[action.id]=action.doc}action.name=_type9;_this56.actions.unshift(action);// IgnoreTypeCheck
result=_this56['onData'+_this56._stringCapitalize(_type9)](action);if(!(result!==null&&(typeof result==='undefined'?'undefined':_typeof(result))==='object'&&'then'in result)){_context13.next=10;break}_context13.next=9;return result;case 9:result=_context13.sent;case 10:if(result)_this56._changeDetectorReference.detectChanges();if(_type9==='error'&&_this56.autoRestartOnError)initialize();case 12:case'end':return _context13.stop();}}},_callee13,_this56)}));return function(_x47){return _ref65.apply(this,arguments)}}())};var _arr12=['change','complete','error'];for(var _i12=0;_i12<_arr12.length;_i12++){var _type9=_arr12[_i12];_loop3(_type9)}},3000);/*
            NOTE: We have to break out of the "zone.js" since long polling
            themes to confuse its mocked environment.
        */this._tools.timeout(initialize)}/**
     * Marks current live data observation as canceled and closes initially
     * requested update stream.
     * @returns Nothing.
     */},{key:'ngOnDestroy',value:function ngOnDestroy(){this._canceled=true;if(this._changesStream)this._changesStream.cancel()}/**
     * Triggers on any data changes.
     * @returns A boolean indicating whether a view update should be triggered
     * or not.
     */},{key:'onDataChange',value:function onDataChange(){return true}/**
     * Triggers on completed data change observation.
     * @returns A boolean indicating whether a view update should be triggered
     * or not.
     */},{key:'onDataComplete',value:function onDataComplete(){return false}/**
     * Triggers on data change observation errors.
     * @returns A boolean indicating whether a view update should be triggered
     * or not.
     */},{key:'onDataError',value:function onDataError(){return false}}]);return AbstractLiveDataComponent}(),_class159.defaultLiveUpdateOptions={heartbeat:10000,/* eslint-disable camelcase */include_docs:true,/* eslint-enable camelcase */live:true,since:'now',timeout:false},_temp54);/**
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
 */(0,_core.Optional)()(AbstractLiveDataComponent,null,0);Reflect.defineMetadata('design:paramtypes',[_core.Injector],AbstractLiveDataComponent);var AbstractItemsComponent=exports.AbstractItemsComponent=function(_AbstractLiveDataComp){_inherits(AbstractItemsComponent,_AbstractLiveDataComp);/**
     * Saves injected service instances as instance properties.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */function AbstractItemsComponent(injector){_classCallCheck(this,AbstractItemsComponent);var _this57=_possibleConstructorReturn(this,(AbstractItemsComponent.__proto__||Object.getPrototypeOf(AbstractItemsComponent)).call(this,injector));_this57.allItems=_this57.allItems;_this57.allItemsChecked=false;_this57.debouncedUpdate=_this57.debouncedUpdate;_this57.idName=_this57.idName;_this57.items=_this57.items;_this57.keyCode=_this57.keyCode;_this57.limit=_this57.limit;_this57.navigateAway=false;_this57.page=_this57.page;_this57.preventedDataUpdate=null;_this57.regularExpression=false;_this57.revisionName=_this57.revisionName;_this57.searchTerm='';_this57.searchTermStream=new _rxjs.Subject;_this57.selectedItems=new Set;_this57.sort=_defineProperty({},InitialDataService.defaultScope.configuration.database.model.property.name.special.id,'asc');_this57._currentParameter=_this57._currentParameter;_this57._itemPath='item';_this57._itemsPath='items';_this57._route=_this57._route;_this57._router=_this57._router;_this57._subscriptions=[];_this57._toolsInstance=_this57._toolsInstance;var get=determineInjector(injector);_this57.idName=get(InitialDataService).configuration.database.model.property.name.special.id;_this57.revisionName=get(InitialDataService).configuration.database.model.property.name.special.revision;_this57.keyCode=_this57._tools.keyCode;_this57._route=get(_router.ActivatedRoute);_this57._router=get(_router.Router);// IgnoreTypeCheck
_this57._toolsInstance=get(UtilityService).tools;/*
            NOTE: Parameter have to be read before data to ensure that all page
            constraints have been set correctly before item slicing.
        */_this57._subscriptions.push(_this57._route.params.subscribe(function(data){_this57._currentParameter=data;_this57.limit=parseInt(_this57._currentParameter.limit);_this57.page=parseInt(_this57._currentParameter.page);var match=/(regex|exact)-(.*)/.exec(_this57._currentParameter.searchTerm);if(match){_this57.regularExpression=match[1]==='regex';_this57.searchTerm=decodeURIComponent(match[2])}}));_this57._subscriptions.push(_this57._route.data.subscribe(function(data){_this57.limit=Math.max(1,_this57.limit||1);// TODO wen in pagination "++" ausgewählt wird verschwinden alle
// pages
_this57.allItems=data.items.slice();data.items.splice(0,(_this57.page-1)*_this57.limit);if(data.items.length>_this57.limit)data.items.splice(_this57.limit,data.items.length-_this57.limit);_this57.items=data.items;if(_this57.applyPageConstraints())_this57.update()}));_this57._subscriptions.push(_this57.searchTermStream.debounceTime(200).distinctUntilChanged().subscribe(function(){_this57.page=1;return _this57.update()}));_this57.debouncedUpdate=_this57._tools.debounce(_this57.update.bind(_this57));return _this57}/**
     * Updates constraints between limit, page number and number of total
     * available items.
     * @returns A boolean indicating if something has changed to fulfill page
     * constraints.
     */_createClass(AbstractItemsComponent,[{key:'applyPageConstraints',value:function applyPageConstraints(){var oldPage=this.page;var oldLimit=this.limit;this.limit=Math.max(1,this.limit||1);this.page=Math.max(1,Math.min(this.page,Math.ceil(// IgnoreTypeCheck
this.allItems.length/this.limit)));return this.page!==oldPage||this.limit!==oldLimit}/**
     * A function factory to generate functions which updates current view if
     * no route change happened between an asynchronous process.
     * @param callback - Function to wrap.
     * @returns Given function wrapped.
     */},{key:'changeItemWrapperFactory',value:function changeItemWrapperFactory(callback){var _this58=this;return function(){var _ref66=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee14(){var update,subscription,result,_args14=arguments;return regeneratorRuntime.wrap(function _callee14$(_context14){while(1){switch(_context14.prev=_context14.next){case 0:update=true;subscription=_this58._router.events.subscribe(function(event){if(event instanceof _router.NavigationEnd){update=false;subscription.unsubscribe()}});_this58._subscriptions.push(subscription);result=callback.apply(undefined,_args14);if(!((typeof result==='undefined'?'undefined':_typeof(result))==='object'&&result!==null&&'then'in result)){_context14.next=7;break}_context14.next=7;return result;case 7:if(!update){_context14.next=10;break}_context14.next=10;return _this58.update(true);case 10:return _context14.abrupt('return',result);case 11:case'end':return _context14.stop();}}},_callee14,_this58)}));return function(){return _ref66.apply(this,arguments)}}()}/**
     * Clear all currently selected items.
     * @returns Nothing.
     */},{key:'clearSelectedItems',value:function clearSelectedItems(){var _iteratorNormalCompletion24=true;var _didIteratorError24=false;var _iteratorError24=undefined;try{for(var _iterator24=this.items[Symbol.iterator](),_step24;!(_iteratorNormalCompletion24=(_step24=_iterator24.next()).done);_iteratorNormalCompletion24=true){var item=_step24.value;this.selectedItems.delete(item);item.selected=false}}catch(err){_didIteratorError24=true;_iteratorError24=err}finally{try{if(!_iteratorNormalCompletion24&&_iterator24.return){_iterator24.return()}}finally{if(_didIteratorError24){throw _iteratorError24}}}}/**
     * Switches section to item which has given id.
     * @param itemID - ID of item to switch to.
     * @param itemVersion - Version of item to switch to.
     * @returns A promise wrapping the navigation result.
     */},{key:'goToItem',value:function goToItem(itemID){var itemVersion=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'latest';this.navigateAway=true;return this._router.navigate([this._itemPath,itemID,itemVersion])}/**
     * Checks if selection has changed.
     * @returns Nothing.
     */},{key:'ngAfterContentChecked',value:function ngAfterContentChecked(){if(this.preventedDataUpdate)this.onDataChange.apply(this,_toConsumableArray(this.preventedDataUpdate))}/**
     * Triggers on any data changes and updates item constraints.
     * @param parameter - Parameter to save for delayed update.
     * @returns False so their wont be a view update since a complete route
     * reload will be triggered.
     */},{key:'onDataChange',value:function onDataChange(){for(var _len58=arguments.length,parameter=Array(_len58),_key62=0;_key62<_len58;_key62++){parameter[_key62]=arguments[_key62]}/*
            NOTE: We have to avoid that unexpected view changes do not happen
            on remote data changes.
        */if(this.selectedItems.size||![0,1].includes(parseInt(this._currentParameter.page)))this.preventedDataUpdate=parameter;else{this.preventedDataUpdate=null;this.debouncedUpdate(true)}/*
            NOTE: We want to avoid another reload if page is already violating
            page constraints which indicates a page reload.
        */return false}/**
     * Unsubscribes all subscriptions when this component should be disposed.
     * @param parameter - List of all parameter to forward to super method.
     * @returns Returns the super values return value.
     */},{key:'ngOnDestroy',value:function ngOnDestroy(){var _get2;for(var _len59=arguments.length,parameter=Array(_len59),_key63=0;_key63<_len59;_key63++){parameter[_key63]=arguments[_key63]}var result=(_get2=_get(AbstractItemsComponent.prototype.__proto__||Object.getPrototypeOf(AbstractItemsComponent.prototype),'ngOnDestroy',this)).call.apply(_get2,[this].concat(parameter));var _iteratorNormalCompletion25=true;var _didIteratorError25=false;var _iteratorError25=undefined;try{for(var _iterator25=this._subscriptions[Symbol.iterator](),_step25;!(_iteratorNormalCompletion25=(_step25=_iterator25.next()).done);_iteratorNormalCompletion25=true){var subscription=_step25.value;subscription.unsubscribe()}}catch(err){_didIteratorError25=true;_iteratorError25=err}finally{try{if(!_iteratorNormalCompletion25&&_iterator25.return){_iterator25.return()}}finally{if(_didIteratorError25){throw _iteratorError25}}}return result}/**
     * Select all available items.
     * @returns Nothing.
     */},{key:'selectAllItems',value:function selectAllItems(){var _iteratorNormalCompletion26=true;var _didIteratorError26=false;var _iteratorError26=undefined;try{for(var _iterator26=this.items[Symbol.iterator](),_step26;!(_iteratorNormalCompletion26=(_step26=_iterator26.next()).done);_iteratorNormalCompletion26=true){var item=_step26.value;this.selectedItems.add(item);item.selected=true}}catch(err){_didIteratorError26=true;_iteratorError26=err}finally{try{if(!_iteratorNormalCompletion26&&_iterator26.return){_iterator26.return()}}finally{if(_didIteratorError26){throw _iteratorError26}}}}/**
     * Determines an items content specific hash value combined from id and
     * revision.
     * @param item - Item with id and revision property.
     * @returns Indicator string.
     */},{key:'trackByIDAndRevision',value:function trackByIDAndRevision(item){return item[this.idName]+'/'+item[this.revisionName]}/**
     * Applies current filter criteria to current visible item set.
     * @param reload - Indicates whether a simple reload should be made because
     * a changed list of available items is expected for example.
     * @returns A boolean indicating whether route change was successful.
     */},{key:'update',value:function(){var _ref67=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee15(){var reload=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;var result,sort,_name17;return regeneratorRuntime.wrap(function _callee15$(_context15){while(1){switch(_context15.prev=_context15.next){case 0:result=false;_context15.next=3;return this._toolsInstance.acquireLock(this.constructor.name+'Update');case 3:if(this.navigateAway){_context15.next=12;break}this.applyPageConstraints();if(reload&&parseInt(this._currentParameter.page)!==0)/*
                    NOTE: Will be normalised to "1" after route reload (hack to
                    enforce route reloading).
                */this.page=0;sort='';for(_name17 in this.sort){if(this.sort.hasOwnProperty(_name17)){sort+=''+(sort?',':'')+_name17;if(this.sort[_name17]!=='asc')sort+='-'+this.sort[_name17]}}_context15.next=10;return this._router.navigate([this._itemsPath,sort,this.page,this.limit,(this.regularExpression?'regex':'exact')+'-'+encodeURIComponent(this.searchTerm)],{preserveFragment:true,replaceUrl:parseInt(this._currentParameter.page)===0,skipLocationChange:this.page===0});case 10:result=_context15.sent;if(result)this.allItemsChecked=false;case 12:this._toolsInstance.releaseLock(this.constructor.name+'Update');return _context15.abrupt('return',result);case 14:case'end':return _context15.stop();}}},_callee15,this)}));function update(){return _ref67.apply(this,arguments)}return update}()/**
     * Applies current search term to the search term stream.
     * @returns Nothing.
     */},{key:'updateSearch',value:function updateSearch(){this.searchTermStream.next(this.searchTerm)}}]);return AbstractItemsComponent}(AbstractLiveDataComponent);/**
 * Generic value accessor with "ngModel" support.
 * @property onChangeCallback - Saves current on change callback.
 * @property onTouchedCallback - Saves current on touch callback.
 * @property type - Saves current input type.
 */(0,_core.Optional)()(AbstractItemsComponent,null,0);Reflect.defineMetadata('design:paramtypes',[_core.Injector],AbstractItemsComponent);var AbstractValueAccessor=exports.AbstractValueAccessor=(_dec108=(0,_core.Input)(),(_class161=function(_DefaultValueAccessor){_inherits(AbstractValueAccessor,_DefaultValueAccessor);/**
     * Initializes and forwards needed services to the default value accessor
     * constructor.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */function AbstractValueAccessor(injector){_classCallCheck(this,AbstractValueAccessor);var _this59=_possibleConstructorReturn(this,(AbstractValueAccessor.__proto__||Object.getPrototypeOf(AbstractValueAccessor)).call(this,injector.get(_core.Renderer2),injector.get(_core.ElementRef),null));_this59.onChangeCallback=UtilityService.tools.noop;_this59.onTouchedCallback=UtilityService.tools.noop;_initDefineProp(_this59,'type',_descriptor23,_this59);return _this59}/**
     * Manipulates editable value representation.
     * @param value - Value to manipulate.
     * @returns Given and transformed value.
     */_createClass(AbstractValueAccessor,[{key:'export',value:function _export(value){return value}/**
     * Reads internal value representation.
     * @param value - Value to convert to its internal representation.
     * @returns Given and transformed value.
     */},{key:'import',value:function _import(value){return value}/**
     * Needed implementation for an angular control value accessor.
     * @param callback - Callback function to register.
     * @param additionalParameter - Additional parameter will be forwarded to
     * inherited super method.
     * @returns What inherited method returns.
     */},{key:'registerOnChange',value:function registerOnChange(callback){var _this60=this,_get3;for(var _len60=arguments.length,additionalParameter=Array(_len60>1?_len60-1:0),_key64=1;_key64<_len60;_key64++){additionalParameter[_key64-1]=arguments[_key64]}this.onChangeCallback=function(value){for(var _len61=arguments.length,additionalParameter=Array(_len61>1?_len61-1:0),_key65=1;_key65<_len61;_key65++){additionalParameter[_key65-1]=arguments[_key65]}return callback.apply(undefined,[_this60.import(value)].concat(additionalParameter))};return(_get3=_get(AbstractValueAccessor.prototype.__proto__||Object.getPrototypeOf(AbstractValueAccessor.prototype),'registerOnChange',this)).call.apply(_get3,[this,this.onChangeCallback].concat(additionalParameter))}/**
     * Needed implementation for an angular control value accessor.
     * @param callback - Callback function to register.
     * @param additionalParameter - Additional parameter will be forwarded to
     * inherited super method.
     * @returns What inherited method returns.
     */},{key:'registerOnTouched',value:function registerOnTouched(callback){var _get4;this.onTouchedCallback=callback;for(var _len62=arguments.length,additionalParameter=Array(_len62>1?_len62-1:0),_key66=1;_key66<_len62;_key66++){additionalParameter[_key66-1]=arguments[_key66]}return(_get4=_get(AbstractValueAccessor.prototype.__proto__||Object.getPrototypeOf(AbstractValueAccessor.prototype),'registerOnTouched',this)).call.apply(_get4,[this,this.onTouchedCallback].concat(additionalParameter))}/**
     * Overridden inherited function for value export.
     * @param value - Value to export.
     * @param additionalParameter - Additional arguments will be forwarded to
     * the overridden method invocation.
     * @returns The transformed give value.
     */},{key:'writeValue',value:function writeValue(value){var _get5;for(var _len63=arguments.length,additionalParameter=Array(_len63>1?_len63-1:0),_key67=1;_key67<_len63;_key67++){additionalParameter[_key67-1]=arguments[_key67]}return(_get5=_get(AbstractValueAccessor.prototype.__proto__||Object.getPrototypeOf(AbstractValueAccessor.prototype),'writeValue',this)).call.apply(_get5,[this,this.export.apply(this,[value].concat(additionalParameter))].concat(additionalParameter))}}]);return AbstractValueAccessor}(_forms.DefaultValueAccessor),(_descriptor23=_applyDecoratedDescriptor(_class161.prototype,'type',[_dec108],{enumerable:true,initializer:function initializer(){return null}})),_class161));// / endregion
// // region date/time
// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[_core.Injector],AbstractValueAccessor);/**
 * Displays dates and/or times formated with markup and through angular date
 * pipe.
 * @property dateFormatter - Angular's date pipe transformation method.
 * @property extendObject - Extend object pipe's transform method.
 * @property options - Given formatting and update options.
 * @property templateReference - Reference to given template.
 * @property timerID - Interval id to cancel it on destroy life cycle hook.
 * @property viewContainerReference - View container reference to embed
 * rendered template instance into.
 */var DateDirective=exports.DateDirective=(_dec109=(0,_core.Directive)({selector:'[genericDate]'}),_dec110=(0,_core.Input)('genericDate'),_dec109(_class163=(_class164=function(){/**
     * Saves injected services as instance properties.
     * @param datePipe - Injected date pipe service instance.
     * @param extendObjectPipe - Injected extend object pipe service instance.
     * @param templateReference - Specified template reference.
     * @param viewContainerReference - Injected view container reference.
     * @returns Nothing.
     */function DateDirective(datePipe,extendObjectPipe,templateReference,viewContainerReference){_classCallCheck(this,DateDirective);this.dateFormatter=this.dateFormatter;this.extendObject=this.extendObject;this.options={dateTime:'now',format:'HH:mm:ss',freeze:false,updateIntervalInMilliseconds:1000};this.templateReference=this.templateReference;this.timerID=this.timerID;this.viewContainerReference=this.viewContainerReference;this.dateFormatter=datePipe.transform.bind(datePipe);this.extendObject=extendObjectPipe.transform.bind(extendObjectPipe);this.templateReference=templateReference;this.viewContainerReference=viewContainerReference}/* eslint-disable flowtype/require-return-type *//**
     * Options setter to merge into options interactively.
     * @param options - Options object to merge into.
     * @returns Nothing.
     */_createClass(DateDirective,[{key:'insert',/* eslint-enable flowtype/require-return-type *//**
     * Inserts a rendered template instance into current view.
     * @returns Nothing.
     */value:function insert(){var dateTime=this.options.dateTime;if(typeof dateTime==='string'&&['now',''].includes(dateTime)||typeof dateTime==='number'&&isNaN(dateTime)||[null,undefined].includes(dateTime))dateTime=Date.now();else if(typeof dateTime==='string'&&''+parseFloat(dateTime)===dateTime)dateTime=parseFloat(dateTime)*1000;this.viewContainerReference.createEmbeddedView(this.templateReference,{dateTime:this.dateFormatter(dateTime,this.options.format)})}/**
     * On destroy life cycle hook to cancel initialized interval timer.
     * @returns Nothing.
     */},{key:'ngOnDestroy',value:function ngOnDestroy(){if(this.timerID)clearInterval(this.timerID)}/**
     * Initializes interval timer and inserts initial template instance into
     * current view.
     * @returns Nothing.
     */},{key:'ngOnInit',value:function ngOnInit(){var _this61=this;this.timerID=setInterval(function(){if(!_this61.options.freeze){_this61.viewContainerReference.remove();_this61.insert()}},this.options.updateIntervalInMilliseconds);this.insert()}},{key:'insertOptions',set:function set(options){if(['string','number'].includes(typeof options==='undefined'?'undefined':_typeof(options))||[null,undefined].includes(options)||(typeof options==='undefined'?'undefined':_typeof(options))==='object'&&options instanceof Date)options={dateTime:options};this.extendObject(true,this.options,options)}}]);return DateDirective}(),(_applyDecoratedDescriptor(_class164.prototype,'insertOptions',[_dec110],Object.getOwnPropertyDescriptor(_class164.prototype,'insertOptions'),_class164.prototype)),_class164))||_class163);// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[// / endregion
// endregion
_common.DatePipe,ExtendObjectPipe,_core.TemplateRef,_core.ViewContainerRef],DateDirective);/**
 * TODO
 */var SliderDirective=exports.SliderDirective=(_dec111=(0,_core.Directive)({selector:'[genericSlider]'}),_dec112=(0,_core.Input)('genericSlider'),_dec111(_class166=(_class167=function(){/**
     * Saves injected services as instance properties.
     * @param extendObjectPipe - Injected extend object pipe service instance.
     * @param templateReference - Specified template reference.
     * @param viewContainerReference - Injected view container reference.
     * @returns Nothing.
     */function SliderDirective(extendObjectPipe,templateReference,viewContainerReference){_classCallCheck(this,SliderDirective);this.extendObject=this.extendObject;this.index=0;this.options={freeze:false,startIndex:0,step:1,slides:[],updateIntervalInMilliseconds:6000};this.templateReference=this.templateReference;this.timerID=this.timerID;this.viewContainerReference=this.viewContainerReference;this.extendObject=extendObjectPipe.transform.bind(extendObjectPipe);this.templateReference=templateReference;this.viewContainerReference=viewContainerReference}/**
     * Calculates next index from given reference point.
     * @param startIndex - Reference index.
     * @returns New calculated index.
     */_createClass(SliderDirective,[{key:'getNextIndex',value:function getNextIndex(){var startIndex=arguments.length>0&&arguments[0]!==undefined?arguments[0]:-1;if(startIndex===-1)startIndex=this.index;return(startIndex+this.options.step)%this.options.slides.length}/* eslint-disable flowtype/require-return-type *//**
     * Options setter to merge into options interactively.
     * @param options - Options object to merge into.
     * @returns Nothing.
     */},{key:'update',/* eslint-enable flowtype/require-return-type *//**
     * Inserts a rendered template instance into current view.
     * @returns Nothing.
     */value:function update(){if(this.options.slides.length)this.viewContainerReference.createEmbeddedView(this.templateReference,{getNextIndex:this.getNextIndex.bind(this),index:this.index,options:this.options,slide:this.options.slides[this.index],slides:this.options.slides})}/**
     * On destroy life cycle hook to cancel initialized interval timer.
     * @returns Nothing.
     */},{key:'ngOnDestroy',value:function ngOnDestroy(){if(this.timerID)clearInterval(this.timerID)}/**
     * Initializes interval timer and inserts initial template instance into
     * current view.
     * @returns Nothing.
     */},{key:'ngOnInit',value:function ngOnInit(){var _this62=this;this.timerID=setInterval(function(){var newIndex=(_this62.index+_this62.options.step)%_this62.options.slides.length;if(_this62.options.freeze!==true&&newIndex!==_this62.index&&!(typeof _this62.options.freeze==='number'&&_this62.options.freeze>=_this62.options.slides.length)){_this62.viewContainerReference.remove();_this62.index=_this62.getNextIndex();_this62.update()}},this.options.updateIntervalInMilliseconds);this.index=this.options.startIndex;this.update()}},{key:'insertOptions',set:function set(options){if(Array.isArray(options))options={slides:options};this.extendObject(true,this.options,options)}}]);return SliderDirective}(),(_applyDecoratedDescriptor(_class167.prototype,'insertOptions',[_dec112],Object.getOwnPropertyDescriptor(_class167.prototype,'insertOptions'),_class167.prototype)),_class167))||_class166);Reflect.defineMetadata('design:paramtypes',[ExtendObjectPipe,_core.TemplateRef,_core.ViewContainerRef],SliderDirective);var providers=[{provide:_forms.NG_VALUE_ACCESSOR,useExisting:(0,_core.forwardRef)(function(){return DateTimeValueAccessor}),multi:true}];/*
    NOTE: This core update resistent version is not compatible with angular's
    ahead of time compilation.

// IgnoreTypeCheck
@Directive(UtilityService.tools.extendObject(true, {
}, DefaultValueAccessor.decorators[0].args[0], {providers}))
*//**
 * Time value accessor with "ngModel" support.
 */var DateTimeValueAccessor=exports.DateTimeValueAccessor=(_dec113=(0,_core.Directive)({selector:'\n        input:not([type=checkbox])[formControlName],\n        textarea[formControlName],\n        input:not([type=checkbox])[formControl],\n        textarea[formControl],\n        input:not([type=checkbox])[ngModel],\n        textarea[ngModel],[ngDefaultControl]\'\n    ',// TODO: vsavkin replace the above selector with the one below it once
// https://github.com/angular/angular/issues/3011 is implemented
// selector: '[ngModel],[formControl],[formControlName]',
host:{'(input)':'_handleInput($event.target.value)','(blur)':'onTouched()','(compositionstart)':'_compositionStart()','(compositionend)':'_compositionEnd($event.target.value)'},providers:providers}),_dec113(_class169=function(_AbstractValueAccesso){_inherits(DateTimeValueAccessor,_AbstractValueAccesso);/**
     * Delegates injected injector service instance to the super constructor.
     * @param injector - Injected injector service instance.
     * @returns Nothing.
     */function DateTimeValueAccessor(injector){_classCallCheck(this,DateTimeValueAccessor);return _possibleConstructorReturn(this,(DateTimeValueAccessor.__proto__||Object.getPrototypeOf(DateTimeValueAccessor)).call(this,injector))}/**
     * Manipulates editable value representation.
     * @param value - Value to manipulate.
     * @returns Given and transformed value.
     */_createClass(DateTimeValueAccessor,[{key:'export',value:function _export(value){if(![undefined,null].includes(value)&&['date','time'].includes(this.type)){var date=new Date(value);if(isNaN(date.getDate()))return;else if(this.type==='time'){var hours=''+date.getHours();if(hours.length===1)hours='0'+hours;var minutes=''+date.getMinutes();if(minutes.length===1)minutes='0'+minutes;return hours+':'+minutes}else if(this.type==='date'){var month=''+(date.getMonth()+1);if(month.length===1)month='0'+month;var day=''+date.getDate();if(day.length===1)day='0'+day;return date.getFullYear()+'-'+month+'-'+day}}return value}/**
     * Reads internal value representation.
     * @param value - Value to convert to its internal representation.
     * @returns Given and transformed value.
     */},{key:'import',value:function _import(value){if(typeof value==='string')if(this.type==='time'){var match=/^([0-9]{2}):([0-9]{2})$/.exec(value);if(match)return new Date(1970,0,1,parseInt(match[1]),parseInt(match[2]))}else if(this.type==='date'){var _match=/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(value);if(_match)return new Date(parseInt(_match[1]),parseInt(_match[2])-1,parseInt(_match[3]))}return value}}]);return DateTimeValueAccessor}(AbstractValueAccessor))||_class169);// // / region interval
// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[_core.Injector],DateTimeValueAccessor);/**
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
 */var IntervalInputComponent=exports.IntervalInputComponent=(_dec114=(0,_core.Component)({animations:[_animation.defaultAnimation],changeDetection:_core.ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],selector:'generic-interval-input',template:'\n        <generic-input\n            [declaration]="startDeclaration"\n            [description]="startDescription"\n            [disabled]="startDisabled"\n            [showDeclarationText]="startShowDeclarationText"\n            [maximum]="startMaximum"\n            [maximumText]="startMaximumText"\n            [minimum]="startMinimum"\n            [required]="startRequired"\n            [requiredText]="startRequiredText"\n            [minimumText]="startMinimumText"\n            [model]="model.start"\n            (model)="change($event, \'start\')"\n            [showValidationErrorMessages]="startShowValidationErrorMessages"\n            type="time"\n        ></generic-input>\n        <ng-content></ng-content>\n        <generic-input\n            [declaration]="endDeclaration"\n            [description]="endDescription"\n            [disabled]="endDisabled"\n            [showDeclarationText]="endShowDeclarationText"\n            [maximum]="endMaximum"\n            [maximumText]="endMaximumText"\n            [minimum]="endMinimum"\n            [required]="endRequired"\n            [requiredText]="endRequiredText"\n            [minimumText]="endMinimumText"\n            [model]="model.end"\n            (model)="change($event, \'end\')"\n            [showValidationErrorMessages]="endShowValidationErrorMessages"\n            type="time"\n        ></generic-input>\n    '}),_dec115=(0,_core.Input)(),_dec116=(0,_core.Input)(),_dec117=(0,_core.Input)(),_dec118=(0,_core.Input)(),_dec119=(0,_core.Input)(),_dec120=(0,_core.Input)(),_dec121=(0,_core.Input)(),_dec122=(0,_core.Input)(),_dec123=(0,_core.Input)(),_dec124=(0,_core.Input)(),_dec125=(0,_core.Input)(),_dec126=(0,_core.Input)(),_dec127=(0,_core.Input)(),_dec128=(0,_core.Input)(),_dec129=(0,_core.Input)(),_dec130=(0,_core.Input)(),_dec131=(0,_core.Input)(),_dec132=(0,_core.Input)(),_dec133=(0,_core.Input)(),_dec134=(0,_core.Input)(),_dec135=(0,_core.Input)(),_dec136=(0,_core.Input)(),_dec137=(0,_core.Input)(),_dec138=(0,_core.Output)(),_dec114(_class170=(_class171=function(){function IntervalInputComponent(){_classCallCheck(this,IntervalInputComponent);_initDefineProp(this,'endDeclaration',_descriptor24,this);_initDefineProp(this,'startDeclaration',_descriptor25,this);_initDefineProp(this,'endDescription',_descriptor26,this);_initDefineProp(this,'startDescription',_descriptor27,this);_initDefineProp(this,'endDisabled',_descriptor28,this);_initDefineProp(this,'startDisabled',_descriptor29,this);_initDefineProp(this,'endMaximum',_descriptor30,this);_initDefineProp(this,'startMaximum',_descriptor31,this);_initDefineProp(this,'endMaximumText',_descriptor32,this);_initDefineProp(this,'startMaximumText',_descriptor33,this);_initDefineProp(this,'endMinimum',_descriptor34,this);_initDefineProp(this,'startMinimum',_descriptor35,this);_initDefineProp(this,'endMinimumText',_descriptor36,this);_initDefineProp(this,'startMinimumText',_descriptor37,this);_initDefineProp(this,'endRequired',_descriptor38,this);_initDefineProp(this,'startRequired',_descriptor39,this);_initDefineProp(this,'endRequiredText',_descriptor40,this);_initDefineProp(this,'startRequiredText',_descriptor41,this);_initDefineProp(this,'endShowDeclarationText',_descriptor42,this);_initDefineProp(this,'startShowDeclarationText',_descriptor43,this);_initDefineProp(this,'endShowValidationErrorMessages',_descriptor44,this);_initDefineProp(this,'startShowValidationErrorMessages',_descriptor45,this);_initDefineProp(this,'model',_descriptor46,this);_initDefineProp(this,'modelChange',_descriptor47,this)}_createClass(IntervalInputComponent,[{key:'change',/**
     * Triggers on any change events of any nested input.
     * @param event - Events payload data.
     * @param type - Indicates which input field has changed.
     * @returns Nothing.
     */value:function change(event,type){this.modelChange.emit({value:event,type:type})}}]);return IntervalInputComponent}(),(_descriptor24=_applyDecoratedDescriptor(_class171.prototype,'endDeclaration',[_dec115],{enumerable:true,initializer:function initializer(){return null}}),_descriptor25=_applyDecoratedDescriptor(_class171.prototype,'startDeclaration',[_dec116],{enumerable:true,initializer:function initializer(){return null}}),_descriptor26=_applyDecoratedDescriptor(_class171.prototype,'endDescription',[_dec117],{enumerable:true,initializer:function initializer(){return null}}),_descriptor27=_applyDecoratedDescriptor(_class171.prototype,'startDescription',[_dec118],{enumerable:true,initializer:function initializer(){return null}}),_descriptor28=_applyDecoratedDescriptor(_class171.prototype,'endDisabled',[_dec119],{enumerable:true,initializer:function initializer(){return null}}),_descriptor29=_applyDecoratedDescriptor(_class171.prototype,'startDisabled',[_dec120],{enumerable:true,initializer:function initializer(){return null}}),_descriptor30=_applyDecoratedDescriptor(_class171.prototype,'endMaximum',[_dec121],{enumerable:true,initializer:function initializer(){return null}}),_descriptor31=_applyDecoratedDescriptor(_class171.prototype,'startMaximum',[_dec122],{enumerable:true,initializer:function initializer(){return null}}),_descriptor32=_applyDecoratedDescriptor(_class171.prototype,'endMaximumText',[_dec123],{enumerable:true,initializer:function initializer(){return'Please give a number less or equal than ${model.maximum}.'}}),_descriptor33=_applyDecoratedDescriptor(_class171.prototype,'startMaximumText',[_dec124],{enumerable:true,initializer:function initializer(){return'Please give a number less or equal than ${model.maximum}.'}}),_descriptor34=_applyDecoratedDescriptor(_class171.prototype,'endMinimum',[_dec125],{enumerable:true,initializer:function initializer(){return null}}),_descriptor35=_applyDecoratedDescriptor(_class171.prototype,'startMinimum',[_dec126],{enumerable:true,initializer:function initializer(){return null}}),_descriptor36=_applyDecoratedDescriptor(_class171.prototype,'endMinimumText',[_dec127],{enumerable:true,initializer:function initializer(){return'Please given a number at least or equal to {{model.minimum}}.'}}),_descriptor37=_applyDecoratedDescriptor(_class171.prototype,'startMinimumText',[_dec128],{enumerable:true,initializer:function initializer(){return'Please given a number at least or equal to {{model.minimum}}.'}}),_descriptor38=_applyDecoratedDescriptor(_class171.prototype,'endRequired',[_dec129],{enumerable:true,initializer:function initializer(){return null}}),_descriptor39=_applyDecoratedDescriptor(_class171.prototype,'startRequired',[_dec130],{enumerable:true,initializer:function initializer(){return null}}),_descriptor40=_applyDecoratedDescriptor(_class171.prototype,'endRequiredText',[_dec131],{enumerable:true,initializer:function initializer(){return'Please fill this field.'}}),_descriptor41=_applyDecoratedDescriptor(_class171.prototype,'startRequiredText',[_dec132],{enumerable:true,initializer:function initializer(){return'Please fill this field.'}}),_descriptor42=_applyDecoratedDescriptor(_class171.prototype,'endShowDeclarationText',[_dec133],{enumerable:true,initializer:function initializer(){return'\u2139'}}),_descriptor43=_applyDecoratedDescriptor(_class171.prototype,'startShowDeclarationText',[_dec134],{enumerable:true,initializer:function initializer(){return'\u2139'}}),_descriptor44=_applyDecoratedDescriptor(_class171.prototype,'endShowValidationErrorMessages',[_dec135],{enumerable:true,initializer:function initializer(){return false}}),_descriptor45=_applyDecoratedDescriptor(_class171.prototype,'startShowValidationErrorMessages',[_dec136],{enumerable:true,initializer:function initializer(){return false}}),_descriptor46=_applyDecoratedDescriptor(_class171.prototype,'model',[_dec137],{enumerable:true,initializer:function initializer(){return{end:{value:new Date(1970,0,1)},start:{value:new Date(1970,0,1)}}}}),_descriptor47=_applyDecoratedDescriptor(_class171.prototype,'modelChange',[_dec138],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}})),_class171))||_class170);// IgnoreTypeCheck
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
 */var IntervalsInputComponent=exports.IntervalsInputComponent=(_dec139=(0,_core.Component)({animations:[_animation.defaultAnimation],changeDetection:_core.ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],selector:'generic-intervals-input',/* eslint-disable max-len */template:'\n        <div\n            *ngIf="description !== \'\' && (description || model.description || model.name)"\n        >{{description || model.description || model.name}}</div>\n        <div\n            @defaultAnimation\n            *ngFor="let interval of (model.value || []); let first = first; let index = index"\n        >\n            <generic-interval-input\n                [endDisabled]="endDisabled"\n                [startDisabled]="startDisabled"\n\n                [endShowDeclarationText]="endShowDeclarationText"\n                [startShowDeclarationText]="startShowDeclarationText"\n\n                [endMaximum]="endMaximum"\n                [startMaximum]="startMaximum"\n\n                [endMaximumText]="endMaximumText"\n                [startMaximumText]="startMaximumText"\n\n                [endMinimum]="endMinimum"\n                [startMinimum]="startMinimum"\n\n                [endRequired]="endRequired"\n                [startRequired]="startRequired"\n\n                [endRequiredText]="endRequiredText"\n                [startRequiredText]="startRequiredText"\n\n                [endMinimumText]="endMinimumText"\n                [startMinimumText]="startMinimumText"\n\n                [endDescription]="first ? endDescription : \'\'"\n                [startDescription]="first ? startDescription : \'\'"\n\n                [model]="interval"\n                (model)="change($event, index)"\n\n                [endDeclaration]="endDeclaration"\n                [startDeclaration]="startDeclaration"\n\n                [endShowValidationErrorMessages]="endShowValidationErrorMessages"\n                [startShowValidationErrorMessages]="startShowValidationErrorMessages"\n            >\n                <ng-container *ngIf="contentTemplate; else fallback">\n                    <ng-container\n                        *ngTemplateOutlet="contentTemplate; context: {$implicit:interval}"\n                    ></ng-container>\n                </ng-container>\n            </generic-interval-input>\n            <a\n                class="remove"\n                (click)="$event.preventDefault(); $event.stopPropagation(); remove(interval)"\n                href=""\n                *ngIf="model.minimumNumber === null || model.value.length > model.minimumNumber"\n            >-</a>\n        </div>\n        <a\n            class="add"\n            (click)="$event.preventDefault(); $event.stopPropagation(); add()"\n            href=""\n            *ngIf="model.maximumNumber === null || (model.value?.length || 0) < model.maximumNumber"\n        >+</a>\n        <ng-template #fallback>--</ng-template>\n    '/* eslint-enable max-len */}),_dec140=(0,_core.Input)(),_dec141=(0,_core.ContentChild)(_core.TemplateRef),_dec142=(0,_core.Input)(),_dec143=(0,_core.Input)(),_dec144=(0,_core.Input)(),_dec145=(0,_core.Input)(),_dec146=(0,_core.Input)(),_dec147=(0,_core.Input)(),_dec148=(0,_core.Input)(),_dec149=(0,_core.Input)(),_dec150=(0,_core.Input)(),_dec151=(0,_core.Input)(),_dec152=(0,_core.Input)(),_dec153=(0,_core.Input)(),_dec154=(0,_core.Input)(),_dec155=(0,_core.Input)(),_dec156=(0,_core.Input)(),_dec157=(0,_core.Input)(),_dec158=(0,_core.Input)(),_dec159=(0,_core.Input)(),_dec160=(0,_core.Input)(),_dec161=(0,_core.Input)(),_dec162=(0,_core.Input)(),_dec163=(0,_core.Input)(),_dec164=(0,_core.Input)(),_dec165=(0,_core.Input)(),_dec166=(0,_core.Output)(),_dec139(_class173=(_class174=function(){/**
     * Constructs the interval list component.
     * @param dataScope - Data scope service instance.
     * @param extendObjectPipe - Injected extend object pipe instance.
     * @returns Nothing.
     */function IntervalsInputComponent(dataScope,extendObjectPipe){_classCallCheck(this,IntervalsInputComponent);_initDefineProp(this,'additionalObjectData',_descriptor48,this);_initDefineProp(this,'contentTemplate',_descriptor49,this);_initDefineProp(this,'description',_descriptor50,this);_initDefineProp(this,'endDeclaration',_descriptor51,this);_initDefineProp(this,'startDeclaration',_descriptor52,this);_initDefineProp(this,'endDescription',_descriptor53,this);_initDefineProp(this,'startDescription',_descriptor54,this);_initDefineProp(this,'endDisabled',_descriptor55,this);_initDefineProp(this,'startDisabled',_descriptor56,this);_initDefineProp(this,'endMaximum',_descriptor57,this);_initDefineProp(this,'startMaximum',_descriptor58,this);_initDefineProp(this,'endMaximumText',_descriptor59,this);_initDefineProp(this,'startMaximumText',_descriptor60,this);_initDefineProp(this,'endMinimum',_descriptor61,this);_initDefineProp(this,'startMinimum',_descriptor62,this);_initDefineProp(this,'endMinimumText',_descriptor63,this);_initDefineProp(this,'startMinimumText',_descriptor64,this);_initDefineProp(this,'endRequired',_descriptor65,this);_initDefineProp(this,'startRequired',_descriptor66,this);_initDefineProp(this,'endRequiredText',_descriptor67,this);_initDefineProp(this,'startRequiredText',_descriptor68,this);_initDefineProp(this,'endShowDeclarationText',_descriptor69,this);_initDefineProp(this,'startShowDeclarationText',_descriptor70,this);_initDefineProp(this,'endShowValidationErrorMessages',_descriptor71,this);_initDefineProp(this,'startShowValidationErrorMessages',_descriptor72,this);_initDefineProp(this,'model',_descriptor73,this);_initDefineProp(this,'modelChange',_descriptor74,this);this._dataScope=this._dataScope;this._extendObject=this._extendObject;this._dataScope=dataScope;this._extendObject=extendObjectPipe.transform.bind(extendObjectPipe)}/**
     * Triggers on any change events of any nested input.
     * @param event - Events payload data.
     * @param index - Indicates which input field has changed.
     * @returns Nothing.
     */_createClass(IntervalsInputComponent,[{key:'change',value:function change(event,index){this.modelChange.emit({value:event,index:index})}/**
     * Extends additional model data with default one if nothing is provided.
     * @returns Nothing.
     */},{key:'ngOnInit',value:function ngOnInit(){if(!this.additionalObjectData)this.additionalObjectData=this._dataScope.generate('_interval');if(this.model.value)this.model.value.sort(function(first,second){return first.start.value-second.start.value});else this.model.value=[]}/**
     * Adds a new interval.
     * @param data - Additional data to use for newly created entity.
     * @returns Nothing.
     */},{key:'add',value:function add(){var data=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};if(!this.model.value)this.model.value=[];var lastEnd=this.model.value.length?new Date(this.model.value[this.model.value.length-1].end.value).getTime():0;this.model.value.push(this._extendObject(true,{},this.additionalObjectData,{// NOTE: We add one hour in milliseconds as default interval.
end:{value:new Date(lastEnd+Math.pow(60,2)*1000)},start:{value:new Date(lastEnd)}},data));this.modelChange.emit(this.model)}/**
     * Removes given interval.
     * @param interval - Interval to remove from current list.
     * @returns Nothing.
     */},{key:'remove',value:function remove(interval){var index=this.model.value.indexOf(interval);if(index!==-1){this.model.value.splice(index,1);this.modelChange.emit(this.model)}}}]);return IntervalsInputComponent}(),(_descriptor48=_applyDecoratedDescriptor(_class174.prototype,'additionalObjectData',[_dec140],{enumerable:true,initializer:function initializer(){return this.additionalObjectData}}),_descriptor49=_applyDecoratedDescriptor(_class174.prototype,'contentTemplate',[_dec141],{enumerable:true,initializer:function initializer(){return this.contentTemplate}}),_descriptor50=_applyDecoratedDescriptor(_class174.prototype,'description',[_dec142],{enumerable:true,initializer:function initializer(){return null}}),_descriptor51=_applyDecoratedDescriptor(_class174.prototype,'endDeclaration',[_dec143],{enumerable:true,initializer:function initializer(){return null}}),_descriptor52=_applyDecoratedDescriptor(_class174.prototype,'startDeclaration',[_dec144],{enumerable:true,initializer:function initializer(){return null}}),_descriptor53=_applyDecoratedDescriptor(_class174.prototype,'endDescription',[_dec145],{enumerable:true,initializer:function initializer(){return null}}),_descriptor54=_applyDecoratedDescriptor(_class174.prototype,'startDescription',[_dec146],{enumerable:true,initializer:function initializer(){return null}}),_descriptor55=_applyDecoratedDescriptor(_class174.prototype,'endDisabled',[_dec147],{enumerable:true,initializer:function initializer(){return null}}),_descriptor56=_applyDecoratedDescriptor(_class174.prototype,'startDisabled',[_dec148],{enumerable:true,initializer:function initializer(){return null}}),_descriptor57=_applyDecoratedDescriptor(_class174.prototype,'endMaximum',[_dec149],{enumerable:true,initializer:function initializer(){return null}}),_descriptor58=_applyDecoratedDescriptor(_class174.prototype,'startMaximum',[_dec150],{enumerable:true,initializer:function initializer(){return null}}),_descriptor59=_applyDecoratedDescriptor(_class174.prototype,'endMaximumText',[_dec151],{enumerable:true,initializer:function initializer(){return'Please give a number less or equal than ${model.maximum}.'}}),_descriptor60=_applyDecoratedDescriptor(_class174.prototype,'startMaximumText',[_dec152],{enumerable:true,initializer:function initializer(){return'Please give a number less or equal than ${model.maximum}.'}}),_descriptor61=_applyDecoratedDescriptor(_class174.prototype,'endMinimum',[_dec153],{enumerable:true,initializer:function initializer(){return null}}),_descriptor62=_applyDecoratedDescriptor(_class174.prototype,'startMinimum',[_dec154],{enumerable:true,initializer:function initializer(){return null}}),_descriptor63=_applyDecoratedDescriptor(_class174.prototype,'endMinimumText',[_dec155],{enumerable:true,initializer:function initializer(){return'Please given a number at least or equal to {{model.minimum}}.'}}),_descriptor64=_applyDecoratedDescriptor(_class174.prototype,'startMinimumText',[_dec156],{enumerable:true,initializer:function initializer(){return'Please given a number at least or equal to {{model.minimum}}.'}}),_descriptor65=_applyDecoratedDescriptor(_class174.prototype,'endRequired',[_dec157],{enumerable:true,initializer:function initializer(){return null}}),_descriptor66=_applyDecoratedDescriptor(_class174.prototype,'startRequired',[_dec158],{enumerable:true,initializer:function initializer(){return null}}),_descriptor67=_applyDecoratedDescriptor(_class174.prototype,'endRequiredText',[_dec159],{enumerable:true,initializer:function initializer(){return'Please fill this field.'}}),_descriptor68=_applyDecoratedDescriptor(_class174.prototype,'startRequiredText',[_dec160],{enumerable:true,initializer:function initializer(){return'Please fill this field.'}}),_descriptor69=_applyDecoratedDescriptor(_class174.prototype,'endShowDeclarationText',[_dec161],{enumerable:true,initializer:function initializer(){return'\u2139'}}),_descriptor70=_applyDecoratedDescriptor(_class174.prototype,'startShowDeclarationText',[_dec162],{enumerable:true,initializer:function initializer(){return'\u2139'}}),_descriptor71=_applyDecoratedDescriptor(_class174.prototype,'endShowValidationErrorMessages',[_dec163],{enumerable:true,initializer:function initializer(){return false}}),_descriptor72=_applyDecoratedDescriptor(_class174.prototype,'startShowValidationErrorMessages',[_dec164],{enumerable:true,initializer:function initializer(){return false}}),_descriptor73=_applyDecoratedDescriptor(_class174.prototype,'model',[_dec165],{enumerable:true,initializer:function initializer(){return{value:[]}}}),_descriptor74=_applyDecoratedDescriptor(_class174.prototype,'modelChange',[_dec166],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}})),_class174))||_class173);// // / endregion
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
 */Reflect.defineMetadata('design:paramtypes',[DataScopeService,ExtendObjectPipe],IntervalsInputComponent);var AbstractEditorComponent=exports.AbstractEditorComponent=(_dec167=(0,_core.Input)(),_dec168=(0,_core.Input)(),_dec169=(0,_core.ViewChild)('hostDomNode'),_dec170=(0,_core.Output)(),_dec171=(0,_core.Input)(),_dec172=(0,_core.Output)(),(_class176=(_temp55=_class177=function(_AbstractValueAccesso2){_inherits(AbstractEditorComponent,_AbstractValueAccesso2);/**
     * Initializes the code mirror resource loading if not available yet.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */function AbstractEditorComponent(injector){_classCallCheck(this,AbstractEditorComponent);var _this64=_possibleConstructorReturn(this,(AbstractEditorComponent.__proto__||Object.getPrototypeOf(AbstractEditorComponent)).call(this,injector));_initDefineProp(_this64,'configuration',_descriptor75,_this64);_this64.contentSetterMethodName='setContent';_initDefineProp(_this64,'disabled',_descriptor76,_this64);_this64.extendObject=_this64.extendObject;_this64.factory=_this64.factory;_this64.factoryName='';_this64.fixedUtility=_this64.fixedUtility;_initDefineProp(_this64,'hostDomNode',_descriptor77,_this64);_this64.instance=null;_initDefineProp(_this64,'initialized',_descriptor78,_this64);_initDefineProp(_this64,'model',_descriptor79,_this64);_initDefineProp(_this64,'modelChange',_descriptor80,_this64);var get=determineInjector(injector,_this64,_this64.constructor);_this64.extendObject=get(ExtendObjectPipe).transform.bind(get(ExtendObjectPipe));_this64.fixedUtility=get(UtilityService).fixed;return _this64}/**
     * Initializes the code editor element.
     * @returns Nothing.
     */_createClass(AbstractEditorComponent,[{key:'ngAfterViewInit',value:function(){var _ref68=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee16(){return regeneratorRuntime.wrap(function _callee16$(_context16){while(1){switch(_context16.prev=_context16.next){case 0:if(!this.factory)if(this.fixedUtility.globalContext[this.factoryName])this.factory=this.fixedUtility.globalContext[this.factoryName];else if(AbstractEditorComponent.factories[this.factoryName])this.factory=AbstractEditorComponent.factories[this.factoryName];if(!this.factory){_context16.next=7;break}AbstractEditorComponent.factories[this.factoryName]=this.factory;/*
                NOTE: We have to do a dummy timeout to avoid an event emit in
                first initializing call stack.
            */_context16.next=5;return this.fixedUtility.tools.timeout();case 5:_context16.next=16;break;case 7:_context16.prev=7;_context16.next=10;return AbstractEditorComponent.applicationInterfaceLoad[this.factoryName];case 10:_context16.next=15;break;case 12:_context16.prev=12;_context16.t0=_context16['catch'](7);throw _context16.t0;case 15:AbstractEditorComponent.factories[this.factoryName]=this.factory;case 16:case'end':return _context16.stop();}}},_callee16,this,[[7,12]])}));function ngAfterViewInit(){return _ref68.apply(this,arguments)}return ngAfterViewInit}()/**
     * Synchronizes given value into internal code mirror instance.
     * @param value - Given value to set in code editor.
     * @param additionalParameter - Additional arguments will be forwarded to
     * the overridden method invocation.
     * @returns What inherited method returns.
     */},{key:'export',value:function _export(value){var _get6;this.model=[null,undefined].includes(value)?'':value.toString();if(this.instance)this.instance[this.contentSetterMethodName](this.model);for(var _len64=arguments.length,additionalParameter=Array(_len64>1?_len64-1:0),_key68=1;_key68<_len64;_key68++){additionalParameter[_key68-1]=arguments[_key68]}return(_get6=_get(AbstractEditorComponent.prototype.__proto__||Object.getPrototypeOf(AbstractEditorComponent.prototype),'export',this)).call.apply(_get6,[this,value].concat(additionalParameter))}/**
     * Triggers disabled state changes.
     * @param isDisabled - Indicates disabled state.
     * @returns Nothing.
     */},{key:'setDisabledState',value:function setDisabledState(isDisabled){this.disabled=isDisabled}}]);return AbstractEditorComponent}(AbstractValueAccessor),_class177.applicationInterfaceLoad={},_class177.factories={},_temp55),(_descriptor75=_applyDecoratedDescriptor(_class176.prototype,'configuration',[_dec167],{enumerable:true,initializer:function initializer(){return{}}}),_descriptor76=_applyDecoratedDescriptor(_class176.prototype,'disabled',[_dec168],{enumerable:true,initializer:function initializer(){return null}}),_descriptor77=_applyDecoratedDescriptor(_class176.prototype,'hostDomNode',[_dec169],{enumerable:true,initializer:function initializer(){return this.hostDomNode}}),_descriptor78=_applyDecoratedDescriptor(_class176.prototype,'initialized',[_dec170],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor79=_applyDecoratedDescriptor(_class176.prototype,'model',[_dec171],{enumerable:true,initializer:function initializer(){return''}}),_descriptor80=_applyDecoratedDescriptor(_class176.prototype,'modelChange',[_dec172],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}})),_class176));Reflect.defineMetadata('design:paramtypes',[_core.Injector],AbstractEditorComponent);/**
 * Provides a generic code editor.
 * @property static:modesLoad - Mapping from mode to their loading state.
 *
 * @property blur - Blur event emitter.
 * @property focus - Focus event emitter.
 */var CodeEditorComponent=exports.CodeEditorComponent=(_dec173=(0,_core.Component)({animations:[_animation.defaultAnimation],changeDetection:_core.ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],providers:[{multi:true,provide:_forms.NG_VALUE_ACCESSOR,useExisting:(0,_core.forwardRef)(function(){return CodeEditorComponent})}],selector:'code-editor',template:'<textarea #hostDomNode></textarea>'}),_dec174=(0,_core.Output)(),_dec175=(0,_core.Input)(),_dec176=(0,_core.Output)(),_dec173(_class178=(_class179=(_temp56=_class180=function(_AbstractEditorCompon){_inherits(CodeEditorComponent,_AbstractEditorCompon);/**
     * Initializes the code mirror resource loading if not available yet.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */function CodeEditorComponent(injector){_classCallCheck(this,CodeEditorComponent);var _this65=_possibleConstructorReturn(this,(CodeEditorComponent.__proto__||Object.getPrototypeOf(CodeEditorComponent)).call(this,injector));_initDefineProp(_this65,'blur',_descriptor81,_this65);_initDefineProp(_this65,'configuration',_descriptor82,_this65);_this65.contentSetterMethodName='setValue';_this65.factoryName='CodeMirror';_initDefineProp(_this65,'focus',_descriptor83,_this65);if(_typeof(CodeEditorComponent.applicationInterfaceLoad[_this65.factoryName])!=='object')CodeEditorComponent.applicationInterfaceLoad[_this65.factoryName]=Promise.all([new Promise(function(resolve){return _this65.fixedUtility.$('\n                        <link\n                            href="'+CODE_MIRROR_DEFAULT_OPTIONS.path.base+CODE_MIRROR_DEFAULT_OPTIONS.path.cascadingStyleSheet+'" rel="stylesheet"\n                            type="text/css"\n                        />\n                    ').appendTo('head').on('load',resolve)}),new Promise(function(resolve,reject){return _this65.fixedUtility.$.ajax({cache:true,dataType:'script',error:reject,success:function success(){_this65.factory=_this65.fixedUtility.globalContext[_this65.factoryName];resolve(_this65.factory)},url:CODE_MIRROR_DEFAULT_OPTIONS.path.base+CODE_MIRROR_DEFAULT_OPTIONS.path.script})})]);return _this65}/**
     * Initializes the code editor element.
     * @returns Nothing.
     */_createClass(CodeEditorComponent,[{key:'ngAfterViewInit',value:function(){var _ref69=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee17(){var _this66=this;var configuration;return regeneratorRuntime.wrap(function _callee17$(_context17){while(1){switch(_context17.prev=_context17.next){case 0:_context17.next=2;return _get(CodeEditorComponent.prototype.__proto__||Object.getPrototypeOf(CodeEditorComponent.prototype),'ngAfterViewInit',this).call(this);case 2:if(!this.configuration.mode){_context17.next=24;break}if(!CodeEditorComponent.modesLoad.hasOwnProperty(this.configuration.mode)){_context17.next=15;break}if(!(CodeEditorComponent.modesLoad[this.configuration.mode]!==true)){_context17.next=13;break}_context17.prev=5;_context17.next=8;return CodeEditorComponent.modesLoad[this.configuration.mode];case 8:_context17.next=13;break;case 10:_context17.prev=10;_context17.t0=_context17['catch'](5);throw _context17.t0;case 13:_context17.next=24;break;case 15:CodeEditorComponent.modesLoad[this.configuration.mode]=new Promise(function(resolve,reject){return _this66.fixedUtility.$.ajax({cache:true,dataType:'script',error:reject,success:resolve,url:_this66.configuration.path.base+_this66.configuration.path.mode.replace(/{mode}/g,_this66.configuration.mode)})});_context17.prev=16;_context17.next=19;return CodeEditorComponent.modesLoad[this.configuration.mode];case 19:_context17.next=24;break;case 21:_context17.prev=21;_context17.t1=_context17['catch'](16);throw _context17.t1;case 24:configuration=this.extendObject({},this.configuration,{readOnly:this.disabled});delete configuration.path;this.instance=this.factory.fromTextArea(this.hostDomNode.nativeElement,configuration);this.instance[this.contentSetterMethodName](this.model);this.instance.on('blur',function(instance,event){return _this66.blur.emit(event)});this.instance.on('change',function(){_this66.onChangeCallback(_this66.instance.getValue());_this66.modelChange.emit(_this66.model)});this.instance.on('focus',function(instance,event){return _this66.focus.emit(event)});this.initialized.emit(this.instance);case 32:case'end':return _context17.stop();}}},_callee17,this,[[5,10],[16,21]])}));function ngAfterViewInit(){return _ref69.apply(this,arguments)}return ngAfterViewInit}()/**
     * Triggers disabled state changes.
     * @param isDisabled - Indicates disabled state.
     * @returns Nothing.
     */},{key:'setDisabledState',value:function setDisabledState(isDisabled){_get(CodeEditorComponent.prototype.__proto__||Object.getPrototypeOf(CodeEditorComponent.prototype),'setDisabledState',this).call(this,isDisabled);if(this.instance)this.instance.setOption('readOnly',this.disabled)}}]);return CodeEditorComponent}(AbstractEditorComponent),_class180.modesLoad={},_temp56),(_descriptor81=_applyDecoratedDescriptor(_class179.prototype,'blur',[_dec174],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor82=_applyDecoratedDescriptor(_class179.prototype,'configuration',[_dec175],{enumerable:true,initializer:function initializer(){return CODE_MIRROR_DEFAULT_OPTIONS}}),_descriptor83=_applyDecoratedDescriptor(_class179.prototype,'focus',[_dec176],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}})),_class179))||_class178);Reflect.defineMetadata('design:paramtypes',[_core.Injector],CodeEditorComponent);/**
 * Provides a generic text editor.
 */var TextEditorComponent=exports.TextEditorComponent=(_dec177=(0,_core.Component)({animations:[_animation.defaultAnimation],changeDetection:_core.ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],providers:[{multi:true,provide:_forms.NG_VALUE_ACCESSOR,useExisting:(0,_core.forwardRef)(function(){return TextEditorComponent})}],selector:'text-editor',template:'<textarea #hostDomNode></textarea>'}),_dec178=(0,_core.Input)(),_dec179=(0,_core.Output)(),_dec180=(0,_core.Output)(),_dec181=(0,_core.Output)(),_dec182=(0,_core.Output)(),_dec183=(0,_core.Output)(),_dec184=(0,_core.Output)(),_dec185=(0,_core.Output)(),_dec186=(0,_core.Output)(),_dec187=(0,_core.Output)(),_dec188=(0,_core.Output)(),_dec189=(0,_core.Output)(),_dec190=(0,_core.Output)(),_dec191=(0,_core.Output)(),_dec192=(0,_core.Output)(),_dec193=(0,_core.Output)(),_dec194=(0,_core.Output)(),_dec195=(0,_core.Output)(),_dec196=(0,_core.Output)(),_dec197=(0,_core.Output)(),_dec198=(0,_core.Output)(),_dec199=(0,_core.Output)(),_dec200=(0,_core.Output)(),_dec201=(0,_core.Output)(),_dec202=(0,_core.Output)(),_dec203=(0,_core.Output)(),_dec204=(0,_core.Output)(),_dec205=(0,_core.Output)(),_dec206=(0,_core.Output)(),_dec207=(0,_core.Output)(),_dec208=(0,_core.Output)(),_dec177(_class181=(_class182=function(_AbstractEditorCompon2){_inherits(TextEditorComponent,_AbstractEditorCompon2);// / endregion
// endregion
/**
     * Initializes the tinymce resource loading if not available yet.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */// / endregion
// / region core
// region events
// / region native
function TextEditorComponent(injector){_classCallCheck(this,TextEditorComponent);var _this67=_possibleConstructorReturn(this,(TextEditorComponent.__proto__||Object.getPrototypeOf(TextEditorComponent)).call(this,injector));_initDefineProp(_this67,'configuration',_descriptor84,_this67);_this67.factoryName='tinymce';_initDefineProp(_this67,'click',_descriptor85,_this67);_initDefineProp(_this67,'dblclick',_descriptor86,_this67);_initDefineProp(_this67,'MouseDown',_descriptor87,_this67);_initDefineProp(_this67,'MouseUp',_descriptor88,_this67);_initDefineProp(_this67,'MouseMove',_descriptor89,_this67);_initDefineProp(_this67,'MouseOver',_descriptor90,_this67);_initDefineProp(_this67,'MouseOut',_descriptor91,_this67);_initDefineProp(_this67,'MouseEnter',_descriptor92,_this67);_initDefineProp(_this67,'MouseLeave',_descriptor93,_this67);_initDefineProp(_this67,'KeyDown',_descriptor94,_this67);_initDefineProp(_this67,'KeyPress',_descriptor95,_this67);_initDefineProp(_this67,'KeyUp',_descriptor96,_this67);_initDefineProp(_this67,'ContextMenu',_descriptor97,_this67);_initDefineProp(_this67,'Paste',_descriptor98,_this67);_initDefineProp(_this67,'Focus',_descriptor99,_this67);_initDefineProp(_this67,'Blur',_descriptor100,_this67);_initDefineProp(_this67,'BeforeSetContent',_descriptor101,_this67);_initDefineProp(_this67,'SetContent',_descriptor102,_this67);_initDefineProp(_this67,'GetContent',_descriptor103,_this67);_initDefineProp(_this67,'PreProcess',_descriptor104,_this67);_initDefineProp(_this67,'PostProcess',_descriptor105,_this67);_initDefineProp(_this67,'NodeChange',_descriptor106,_this67);_initDefineProp(_this67,'Undo',_descriptor107,_this67);_initDefineProp(_this67,'Redo',_descriptor108,_this67);_initDefineProp(_this67,'Change',_descriptor109,_this67);_initDefineProp(_this67,'Dirty',_descriptor110,_this67);_initDefineProp(_this67,'Remove',_descriptor111,_this67);_initDefineProp(_this67,'ExecCommand',_descriptor112,_this67);_initDefineProp(_this67,'PastePreProcess',_descriptor113,_this67);_initDefineProp(_this67,'PastePostProcess',_descriptor114,_this67);if(_typeof(TextEditorComponent.applicationInterfaceLoad[_this67.factoryName])!=='object')TextEditorComponent.applicationInterfaceLoad[_this67.factoryName]=new Promise(function(resolve,reject){return _this67.fixedUtility.$.ajax({cache:true,dataType:'script',error:reject,success:function success(){_this67.factory=_this67.fixedUtility.globalContext.tinymce;resolve(_this67.factory)},url:TINYMCE_DEFAULT_OPTIONS.scriptPath})});return _this67}/**
     * Initializes the text editor element.
     * @returns Nothing.
     */_createClass(TextEditorComponent,[{key:'ngAfterViewInit',value:function(){var _ref70=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee18(){var _this68=this;var configuration,initializeInstanceCallback;return regeneratorRuntime.wrap(function _callee18$(_context18){while(1){switch(_context18.prev=_context18.next){case 0:_context18.next=2;return _get(TextEditorComponent.prototype.__proto__||Object.getPrototypeOf(TextEditorComponent.prototype),'ngAfterViewInit',this).call(this);case 2:configuration=this.extendObject({},this.configuration);this.factory.baseURL=configuration.baseURL;delete configuration.baseURL;delete configuration.scriptPath;configuration.target=this.hostDomNode.nativeElement;initializeInstanceCallback=configuration.init_instance_callback;/* eslint-disable camelcase */configuration.init_instance_callback=function(instance){/* eslint-disable camelcase */_this68.instance=instance;_this68.instance[_this68.contentSetterMethodName](_this68.model);_this68.instance.on('Change',function(){_this68.onChangeCallback(_this68.instance.getContent());_this68.modelChange.emit(_this68.model)});if(initializeInstanceCallback)initializeInstanceCallback(_this68.instance);var _arr13=['click','dblclick','MouseDown','MouseUp','MouseMove','MouseOver','MouseOut','MouseEnter','MouseLeave','KeyDown','KeyPress','ContextMenu','Paste','Focus','Blur','BeforeSetContent','SetContent','GetContent','PreProcess','PostProcess','NodeChange','Undo','Redo','Change','Dirty','Remove','PastePreProcess','PastePostProcess'];for(var _i13=0;_i13<_arr13.length;_i13++){var _name18=_arr13[_i13];_this68.instance.on(_name18,_this68[_name18].emit.bind(_this68[_name18]))}_this68.instance.on('KeyUp',function(event){_this68.KeyUp.emit(event);_this68.onChangeCallback(_this68.instance.getContent());_this68.onTouchedCallback();_this68.modelChange.emit(_this68.model)});_this68.instance.on('ExecCommand',function(event){_this68.ExecCommand.emit(event);var content=_this68.instance.getContent();if(typeof content==='string'&&content.length>0){_this68.onChangeCallback(_this68.instance.getContent());_this68.onTouchedCallback();_this68.modelChange.emit(_this68.model)}})};configuration.setup=function(instance){return instance.on('Init',function(){return _this68.initialized.emit(instance)})};this.factory.init(configuration);case 11:case'end':return _context18.stop();}}},_callee18,this)}));function ngAfterViewInit(){return _ref70.apply(this,arguments)}return ngAfterViewInit}()/**
     * Frees all tinymce allocated data from memory if there exists some.
     * @returns Nothing.
     */},{key:'ngOnDestroy',value:function ngOnDestroy(){if(this.instance)this.factory.remove(this.instance)}/**
     * Triggers disabled state changes.
     * @param isDisabled - Indicates disabled state.
     * @returns Nothing.
     */},{key:'setDisabledState',value:function setDisabledState(isDisabled){_get(TextEditorComponent.prototype.__proto__||Object.getPrototypeOf(TextEditorComponent.prototype),'setDisabledState',this).call(this,isDisabled);if(this.instance)this.instance.setMode(this.disabled?'readonly':'design')}}]);return TextEditorComponent}(AbstractEditorComponent),(_descriptor84=_applyDecoratedDescriptor(_class182.prototype,'configuration',[_dec178],{enumerable:true,initializer:function initializer(){return TINYMCE_DEFAULT_OPTIONS}}),_descriptor85=_applyDecoratedDescriptor(_class182.prototype,'click',[_dec179],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor86=_applyDecoratedDescriptor(_class182.prototype,'dblclick',[_dec180],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor87=_applyDecoratedDescriptor(_class182.prototype,'MouseDown',[_dec181],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor88=_applyDecoratedDescriptor(_class182.prototype,'MouseUp',[_dec182],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor89=_applyDecoratedDescriptor(_class182.prototype,'MouseMove',[_dec183],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor90=_applyDecoratedDescriptor(_class182.prototype,'MouseOver',[_dec184],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor91=_applyDecoratedDescriptor(_class182.prototype,'MouseOut',[_dec185],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor92=_applyDecoratedDescriptor(_class182.prototype,'MouseEnter',[_dec186],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor93=_applyDecoratedDescriptor(_class182.prototype,'MouseLeave',[_dec187],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor94=_applyDecoratedDescriptor(_class182.prototype,'KeyDown',[_dec188],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor95=_applyDecoratedDescriptor(_class182.prototype,'KeyPress',[_dec189],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor96=_applyDecoratedDescriptor(_class182.prototype,'KeyUp',[_dec190],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor97=_applyDecoratedDescriptor(_class182.prototype,'ContextMenu',[_dec191],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor98=_applyDecoratedDescriptor(_class182.prototype,'Paste',[_dec192],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor99=_applyDecoratedDescriptor(_class182.prototype,'Focus',[_dec193],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor100=_applyDecoratedDescriptor(_class182.prototype,'Blur',[_dec194],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor101=_applyDecoratedDescriptor(_class182.prototype,'BeforeSetContent',[_dec195],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor102=_applyDecoratedDescriptor(_class182.prototype,'SetContent',[_dec196],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor103=_applyDecoratedDescriptor(_class182.prototype,'GetContent',[_dec197],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor104=_applyDecoratedDescriptor(_class182.prototype,'PreProcess',[_dec198],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor105=_applyDecoratedDescriptor(_class182.prototype,'PostProcess',[_dec199],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor106=_applyDecoratedDescriptor(_class182.prototype,'NodeChange',[_dec200],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor107=_applyDecoratedDescriptor(_class182.prototype,'Undo',[_dec201],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor108=_applyDecoratedDescriptor(_class182.prototype,'Redo',[_dec202],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor109=_applyDecoratedDescriptor(_class182.prototype,'Change',[_dec203],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor110=_applyDecoratedDescriptor(_class182.prototype,'Dirty',[_dec204],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor111=_applyDecoratedDescriptor(_class182.prototype,'Remove',[_dec205],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor112=_applyDecoratedDescriptor(_class182.prototype,'ExecCommand',[_dec206],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor113=_applyDecoratedDescriptor(_class182.prototype,'PastePreProcess',[_dec207],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor114=_applyDecoratedDescriptor(_class182.prototype,'PastePostProcess',[_dec208],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}})),_class182))||_class181);/* eslint-disable max-len */Reflect.defineMetadata('design:paramtypes',[_core.Injector],TextEditorComponent);var propertyContent={editor:'\n        (blur)="focused = false"\n        @defaultAnimation\n        (focus)="focused = true"\n        [ngModel]="model.value"\n        (ngModelChange)="model.value = onChange($event, state); modelChange.emit(model)"\n        [style.visibilty]="initialized ? \'visible\' : \'hidden\'"\n        #state="ngModel"\n    ',nativ:'\n        [name]="model.name"\n        [ngModel]="model.value"\n        (ngModelChange)="model.value = onChange($event, state); modelChange.emit(model)"\n        [placeholder]="description === \'\' ? null : description ? description : (model.description || model.name)"\n        [required]="required === null ? !model.nullable : required"\n        #state="ngModel"\n    ',nativText:'\n        [disabled]="disabled === null ? (model.disabled || model.mutable === false || model.writable === false) : disabled"\n        [maxlength]="maximumLength === null ? (model.type === \'string\' ? model.maximumLength : null) : maximumLength"\n        [minlength]="minimumLength === null ? (model.type === \'string\' ? model.minimumLength : null) : minimumLength"\n        [pattern]="pattern === null ? (model.type === \'string\' ? model.regularExpressionPattern : null) : pattern"\n    ',wrapper:'\n        [declaration]="declaration"\n        [description]="description"\n        [disabled]="disabled"\n        [showDeclarationText]="showDeclarationText"\n        [maximum]="maximum"\n        [maximumLength]="maximumLength"\n        [maximumLengthText]="maximumLengthText"\n        [maximumText]="maximumText"\n        [minimum]="minimum"\n        [minimumLength]="minimumLength"\n        [minimumLengthText]="minimumLengthText"\n        [minimumText]="minimumText"\n        [model]="model"\n        [pattern]="pattern"\n        [required]="required"\n        [requiredText]="requiredText"\n        [patternText]="patternText"\n        [showValidationErrorMessages]="showValidationErrorMessages"\n        [type]="type"\n    '};var inputContent='\n    <mat-hint align="start" @defaultAnimation matTooltip="info">\n        <span\n            [class.active]="showDeclaration"\n            (click)="showDeclaration = !showDeclaration"\n            *ngIf="declaration || model.declaration"\n        >\n            <a\n                (click)="$event.preventDefault()"\n                @defaultAnimation\n                href=""\n                *ngIf="showDeclarationText"\n            >{{showDeclarationText}}</a>\n            <span @defaultAnimation *ngIf="showDeclaration">\n                {{declaration || model.declaration}}\n            </span>\n        </span>\n        <span *ngIf="editor && selectableEditor && !model.disabled">\n            <span *ngIf="declaration || model.declaration">|</span>\n            <a\n                [class.active]="activeEditor"\n                (click)="$event.preventDefault(); $event.stopPropagation(); activeEditor = true"\n                href=""\n            >editor</a>\n            <span>|</span>\n            <a\n                [class.active]="!activeEditor"\n                (click)="$event.preventDefault(); $event.stopPropagation(); activeEditor = false"\n                href=""\n            >plain</a>\n        </span>\n    </mat-hint>\n    <span generic-error *ngIf="showValidationErrorMessages">\n        <p @defaultAnimation *ngIf="model.state?.errors?.maxlength">\n            {{maximumLengthText | genericStringTemplate:model}}\n        </p>\n        <p @defaultAnimation *ngIf="model.state?.errors?.max">\n            {{maximumText | genericStringTemplate:model}}\n        </p>\n        <p @defaultAnimation *ngIf="model.state?.errors?.minlength">\n            {{minimumLengthText | genericStringTemplate:model}}\n        </p>\n        <p @defaultAnimation *ngIf="model.state?.errors?.min">\n            {{minimumText | genericStringTemplate:model}}\n        </p>\n        <p @defaultAnimation *ngIf="model.state?.errors?.pattern">\n            {{patternText | genericStringTemplate:model}}\n        </p>\n        <p @defaultAnimation *ngIf="model.state?.errors?.required">\n            {{requiredText | genericStringTemplate:model}}\n        </p>\n    </span>\n    <mat-hint\n        align="end"\n        @defaultAnimation\n        *ngIf="!model.selection && model.type === \'string\' && model.maximumLength !== null && model.maximumLength < 100"\n    >{{model.value?.length}} / {{model.maximumLength}}</mat-hint>\n';/* eslint-enable max-len */// IgnoreTypeCheck
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
 */var InputComponent=exports.InputComponent=(_dec209=(0,_core.Component)({animations:[_animation.defaultAnimation],changeDetection:_core.ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],selector:'generic-input',template:'\n        <generic-textarea\n            '+propertyContent.wrapper+'\n            [activeEditor]="activeEditor"\n            [editor]="editor"\n            [maximumNumberOfRows]="maximumNumberOfRows"\n            [minimumNumberOfRows]="minimumNumberOfRows"\n            *ngIf="editor || model.editor; else simpleInput"\n            [rows]="rows"\n            [selectableEditor]="selectableEditor"\n        ><ng-content></ng-content></generic-textarea>\n        <ng-template #simpleInput><generic-simple-input\n            '+propertyContent.wrapper+'\n            [labels]="labels"\n        ><ng-content></ng-content></generic-simple-input></ng-template>\n    '}),_dec210=(0,_core.Input)(),_dec211=(0,_core.Input)(),_dec212=(0,_core.Input)(),_dec213=(0,_core.Input)(),_dec214=(0,_core.Input)(),_dec215=(0,_core.Input)(),_dec216=(0,_core.Input)(),_dec217=(0,_core.Input)(),_dec209(_class184=(_class185=function(_AbstractInputCompone2){_inherits(InputComponent,_AbstractInputCompone2);function InputComponent(){var _ref71;var _temp57,_this69,_ret54;_classCallCheck(this,InputComponent);for(var _len65=arguments.length,args=Array(_len65),_key69=0;_key69<_len65;_key69++){args[_key69]=arguments[_key69]}return _ret54=(_temp57=(_this69=_possibleConstructorReturn(this,(_ref71=InputComponent.__proto__||Object.getPrototypeOf(InputComponent)).call.apply(_ref71,[this].concat(args))),_this69),_initDefineProp(_this69,'activeEditor',_descriptor115,_this69),_initDefineProp(_this69,'editor',_descriptor116,_this69),_initDefineProp(_this69,'labels',_descriptor117,_this69),_initDefineProp(_this69,'maximumNumberOfRows',_descriptor118,_this69),_initDefineProp(_this69,'minimumNumberOfRows',_descriptor119,_this69),_initDefineProp(_this69,'rows',_descriptor120,_this69),_initDefineProp(_this69,'selectableEditor',_descriptor121,_this69),_initDefineProp(_this69,'type',_descriptor122,_this69),_temp57),_possibleConstructorReturn(_this69,_ret54)}return InputComponent}(AbstractInputComponent),(_descriptor115=_applyDecoratedDescriptor(_class185.prototype,'activeEditor',[_dec210],{enumerable:true,initializer:function initializer(){return null}}),_descriptor116=_applyDecoratedDescriptor(_class185.prototype,'editor',[_dec211],{enumerable:true,initializer:function initializer(){return null}}),_descriptor117=_applyDecoratedDescriptor(_class185.prototype,'labels',[_dec212],{enumerable:true,initializer:function initializer(){return{}}}),_descriptor118=_applyDecoratedDescriptor(_class185.prototype,'maximumNumberOfRows',[_dec213],{enumerable:true,initializer:function initializer(){return this.maximumNumberOfRows}}),_descriptor119=_applyDecoratedDescriptor(_class185.prototype,'minimumNumberOfRows',[_dec214],{enumerable:true,initializer:function initializer(){return this.minimumNumberOfRows}}),_descriptor120=_applyDecoratedDescriptor(_class185.prototype,'rows',[_dec215],{enumerable:true,initializer:function initializer(){return this.rows}}),_descriptor121=_applyDecoratedDescriptor(_class185.prototype,'selectableEditor',[_dec216],{enumerable:true,initializer:function initializer(){return null}}),_descriptor122=_applyDecoratedDescriptor(_class185.prototype,'type',[_dec217],{enumerable:true,initializer:function initializer(){return this.type}})),_class185))||_class184);/* eslint-disable max-len */// IgnoreTypeCheck
/* eslint-enable max-len *//**
 * A generic form input or select component with validation, labeling and info
 * description support.
 * @property labels - Defines some selectable value labels.
 * @property type - Optionally defines an input type explicitly.
 */var SimpleInputComponent=exports.SimpleInputComponent=(_dec218=(0,_core.Component)({animations:[_animation.defaultAnimation],changeDetection:_core.ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],selector:'generic-simple-input',template:'\n        <ng-container\n            @defaultAnimation *ngIf="model.selection; else textInput"\n        >\n            <mat-form-field>\n                <mat-select [(ngModel)]="model.value" '+propertyContent.nativ+'>\n                    <mat-option\n                        *ngFor="let value of model.selection" [value]="value"\n                    >\n                        {{labels.hasOwnProperty(value) ? labels[value] : value}}\n                    </mat-option>\n                </mat-select>\n                '+inputContent+'\n                <ng-content></ng-content>\n            </mat-form-field>\n        </ng-container>\n        <ng-template #textInput><mat-form-field>\n            <input\n                '+propertyContent.nativ+'\n                '+propertyContent.nativText+'\n                [max]="maximum === null ? (model.type === \'number\' ? model.maximum : null) : maximum"\n                matInput\n                [min]="minimum === null ? (model.type === \'number\' ? model.minimum : null) : minimum"\n                [type]="type ? type : model.name.startsWith(\'password\') ? \'password\' : model.type === \'string\' ? \'text\' : \'number\'"\n            />\n            '+inputContent+'\n            <ng-content></ng-content>\n        </mat-form-field></ng-template>\n    '}),_dec219=(0,_core.Input)(),_dec220=(0,_core.Input)(),_dec218(_class187=(_class188=function(_AbstractNativeInputC){_inherits(SimpleInputComponent,_AbstractNativeInputC);/**
     * Delegates injected injector service instance to the super constructor.
     * @param injector - Injected injector service instance.
     * @returns Nothing.
     */function SimpleInputComponent(injector){_classCallCheck(this,SimpleInputComponent);var _this70=_possibleConstructorReturn(this,(SimpleInputComponent.__proto__||Object.getPrototypeOf(SimpleInputComponent)).call(this,injector));_initDefineProp(_this70,'labels',_descriptor123,_this70);_initDefineProp(_this70,'type',_descriptor124,_this70);return _this70}return SimpleInputComponent}(AbstractNativeInputComponent),(_descriptor123=_applyDecoratedDescriptor(_class188.prototype,'labels',[_dec219],{enumerable:true,initializer:function initializer(){return{}}}),_descriptor124=_applyDecoratedDescriptor(_class188.prototype,'type',[_dec220],{enumerable:true,initializer:function initializer(){return this.type}})),_class188))||_class187);/* eslint-disable max-len */// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[_core.Injector],SimpleInputComponent);/* eslint-enable max-len *//**
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
 */var TextareaComponent=exports.TextareaComponent=(_dec221=(0,_core.Component)({animations:[_animation.defaultAnimation],changeDetection:_core.ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],selector:'generic-textarea',template:'\n        <ng-container *ngIf="activeEditor; else plain">\n            <span [class.focused]="focused" class="editor-label">\n                {{\n                    description === \'\' ? null : description ? description : (\n                        model.description || model.name\n                    )\n                }}\n            </span>\n            <code-editor\n                '+propertyContent.editor+'\n                [configuration]="editor"\n                [disabled]="disabled === null ? (model.disabled || model.mutable === false || model.writable === false) : disabled"\n                (initialized)="initialized = true"\n                *ngIf="editorType === \'code\' || editor.indentUnit; else tinymce"\n            ></code-editor>\n            <ng-template #tinymce><text-editor\n                '+propertyContent.editor+'\n                [configuration]="editor"\n                [disabled]="disabled === null ? (model.disabled || model.mutable === false || model.writable === false) : disabled"\n                (initialized)="initialized = true"\n            ></text-editor></ng-template>\n            '+inputContent+'\n            <ng-content></ng-content>\n        </ng-container>\n        <ng-template #plain><mat-form-field @defaultAnimation>\n            <textarea\n                '+propertyContent.nativ+'\n                '+propertyContent.nativText+'\n                [matAutosizeMaxRows]="maximumNumberOfRows"\n                [matAutosizeMinRows]="minimumNumberOfRows"\n                matInput\n                matTextareaAutosize\n                [rows]="rows"\n            ></textarea>\n            '+inputContent+'\n            <ng-content></ng-content>\n        </mat-form-field></ng-template>\n    '}),_dec222=(0,_core.Input)(),_dec223=(0,_core.Input)(),_dec224=(0,_core.Input)(),_dec225=(0,_core.Input)(),_dec226=(0,_core.Input)(),_dec227=(0,_core.Input)(),_dec221(_class190=(_class191=(_temp58=_class192=function(_AbstractNativeInputC2){_inherits(TextareaComponent,_AbstractNativeInputC2);/**
     * Forwards injected service instances to the abstract input component's
     * constructor.
     * @param initialData - Injected initial data service instance.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */function TextareaComponent(initialData,injector){_classCallCheck(this,TextareaComponent);var _this71=_possibleConstructorReturn(this,(TextareaComponent.__proto__||Object.getPrototypeOf(TextareaComponent)).call(this,injector));_initDefineProp(_this71,'activeEditor',_descriptor125,_this71);_initDefineProp(_this71,'editor',_descriptor126,_this71);_this71.editorType='custom';_initDefineProp(_this71,'maximumNumberOfRows',_descriptor127,_this71);_initDefineProp(_this71,'minimumNumberOfRows',_descriptor128,_this71);_initDefineProp(_this71,'rows',_descriptor129,_this71);_initDefineProp(_this71,'selectableEditor',_descriptor130,_this71);if(initialData.configuration.hasOwnProperty('defaultEditorOptions')&&_typeof(initialData.configuration.defaultEditorOptions)==='object'&&initialData.configuration.defaultEditorOptions!==null)TextareaComponent.defaultEditorOptions=initialData.configuration.defaultEditorOptions;return _this71}/**
     * Triggers after input values have been resolved.
     * @param additionalParameter - Additional arguments will be forwarded to
     * the overridden method invocation.
     * @returns Nothing.
     */_createClass(TextareaComponent,[{key:'ngOnInit',value:function ngOnInit(){var _get7;for(var _len66=arguments.length,additionalParameter=Array(_len66),_key70=0;_key70<_len66;_key70++){additionalParameter[_key70]=arguments[_key70]}(_get7=_get(TextareaComponent.prototype.__proto__||Object.getPrototypeOf(TextareaComponent.prototype),'ngOnInit',this)).call.apply(_get7,[this].concat(additionalParameter));if(this.editor===null&&this.model.editor)this.editor=this.model.editor;if(typeof this.editor==='string'){if(this.editor.startsWith('!')){this.editor=this.editor.substring(1);if(this.selectableEditor===null)this.selectableEditor=false}if(this.editor.startsWith('(')&&this.editor.endsWith(')'))this.editor=this.editor.substring(1,this.editor.length-1);else if(this.activeEditor===null)this.activeEditor=true;this.editorType=this.editor;if(this.editor.startsWith('code')){if(this.editor.startsWith('code:'))this.editor={mode:this.editor.substring('code:'.length)};else this.editor={};}else if(this.editor==='raw')this.editor={/* eslint-disable max-len */toolbar1:'cut copy paste | undo redo removeformat | code | fullscreen',/* eslint-enable max-len */toolbar2:false};else if(this.editor==='simple')this.editor={/* eslint-disable max-len */toolbar1:'cut copy paste | undo redo removeformat | bold italic underline strikethrough subscript superscript | fullscreen',toolbar2:false/* eslint-enable max-len */};else if(this.editor==='normal')this.editor={/* eslint-disable max-len */toolbar1:'cut copy paste | undo redo removeformat | styleselect formatselect | searchreplace visualblocks fullscreen code'/* eslint-enable max-len */};else// Advanced editor.
this.editor={}}else if(this.editor===null&&this.activeEditor)this.editor={};if(this.activeEditor===null)this.activeEditor=false;if(this.selectableEditor===null)if(typeof this.model.selectableEditor==='boolean')this.selectableEditor=this.model.selectableEditor;else this.selectableEditor=true;if(_typeof(this.editor)==='object'&&this.editor!==null){if(this.editorType.startsWith('code')||this.editor.indentUnit)this.editor=this._extendObject(true,{},CODE_MIRROR_DEFAULT_OPTIONS,TextareaComponent.defaultEditorOptions.code,this.editor);else this.editor=this._extendObject(true,{},TINYMCE_DEFAULT_OPTIONS,TextareaComponent.defaultEditorOptions.markup,this.editor);}else this.selectableEditor=false}}]);return TextareaComponent}(AbstractNativeInputComponent),_class192.defaultEditorOptions={code:{},markup:{}},_temp58),(_descriptor125=_applyDecoratedDescriptor(_class191.prototype,'activeEditor',[_dec222],{enumerable:true,initializer:function initializer(){return null}}),_descriptor126=_applyDecoratedDescriptor(_class191.prototype,'editor',[_dec223],{enumerable:true,initializer:function initializer(){return null}}),_descriptor127=_applyDecoratedDescriptor(_class191.prototype,'maximumNumberOfRows',[_dec224],{enumerable:true,initializer:function initializer(){return this.maximumNumberOfRows}}),_descriptor128=_applyDecoratedDescriptor(_class191.prototype,'minimumNumberOfRows',[_dec225],{enumerable:true,initializer:function initializer(){return this.minimumNumberOfRows}}),_descriptor129=_applyDecoratedDescriptor(_class191.prototype,'rows',[_dec226],{enumerable:true,initializer:function initializer(){return this.rows}}),_descriptor130=_applyDecoratedDescriptor(_class191.prototype,'selectableEditor',[_dec227],{enumerable:true,initializer:function initializer(){return null}})),_class191))||_class190);// // endregion
// / region file input
/* eslint-disable max-len */// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[InitialDataService,_core.Injector],TextareaComponent);/* eslint-enable max-len *//**
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
 */var FileInputComponent=exports.FileInputComponent=(_dec228=(0,_core.Component)({animations:[_animation.defaultAnimation],changeDetection:_core.ChangeDetectionStrategy[CHANGE_DETECTION_STRATEGY_NAME],selector:'generic-file-input',template:'\n        <mat-card>\n            <mat-card-header\n                @defaultAnimation\n                *ngIf="headerText !== \'\' && (headerText || file?.name || model[attachmentTypeName][internalName]?.declaration || headerText || file?.name || name || model[attachmentTypeName][internalName]?.description || name)"\n            >\n                <mat-card-title>\n                    <span\n                        @defaultAnimation\n                        *ngIf="!editableName || revision || headerText || !file?.name; else editable"\n                    >\n                        {{\n                            headerText ||\n                            file?.name ||\n                            model[attachmentTypeName][\n                                internalName\n                            ]?.description ||\n                            name\n                        }}\n                    </span>\n                    <ng-template #editable>\n                        <ng-container *ngIf="synchronizeImmediately; else parent">\n                            <mat-form-field\n                                [class.dirty]="editedName && editedName !== file.name"\n                                matTooltip="Focus to edit."\n                            >\n                                <input\n                                    matInput\n                                    [ngModel]="editedName || file.name"\n                                    (ngModelChange)="editedName = $event"\n                                />\n                                <mat-hint\n                                    [class.active]="showDeclaration"\n                                    (click)="showDeclaration = !showDeclaration"\n                                    @defaultAnimation\n                                    matTooltip="info"\n                                    *ngIf="model[attachmentTypeName][internalName]?.declaration"\n                                >\n                                    <a\n                                        (click)="$event.preventDefault()"\n                                        @defaultAnimation\n                                        href=""\n                                        *ngIf="showDeclarationText"\n                                    >{{showDeclarationText}}</a>\n                                    <span\n                                        @defaultAnimation\n                                        *ngIf="showDeclaration"\n                                    >\n                                        {{\n                                            model[attachmentTypeName][\n                                                internalName\n                                            ].declaration\n                                        }}\n                                    </span>\n                                </mat-hint>\n                            </mat-form-field>\n                            <ng-container\n                                *ngIf="editedName && editedName !== file.name"\n                            >\n                                <a\n                                    (click)="$event.preventDefault();rename(editedName)"\n                                    @defaultAnimation\n                                    href=""\n                                >{{saveNameText}}</a>\n                                <a\n                                    (click)="$event.preventDefault();editedName = file.name"\n                                    @defaultAnimation\n                                    href=""\n                                >{{resetNameText}}</a>\n                            </ng-container>\n                        </ng-container>\n                        <ng-template #parent><mat-form-field\n                            [class.dirty]="file.initialName !== file.name"\n                            @defaultAnimation\n                            matTooltip="Focus to edit."\n                            *ngIf="!synchronizeImmediately"\n                        >\n                            <input\n                                matInput [ngModel]="file.name"\n                                (ngModelChange)="file.name = $event;modelChange.emit(this.model); fileChange.emit(file)"\n                            />\n                            <mat-hint\n                                [class.active]="showDeclaration"\n                                (click)="showDeclaration = !showDeclaration"\n                                @defaultAnimation\n                                matTooltip="info"\n                                *ngIf="model[attachmentTypeName][internalName]?.declaration"\n                            >\n                                <a\n                                    (click)="$event.preventDefault()"\n                                    @defaultAnimation\n                                    href=""\n                                    *ngIf="showDeclarationText"\n                                >{{showDeclarationText}}</a>\n                                <span\n                                    @defaultAnimation\n                                    *ngIf="showDeclaration"\n                                >\n                                    {{\n                                        model[attachmentTypeName][\n                                            internalName\n                                        ].declaration\n                                    }}\n                                </span>\n                            </mat-hint>\n                        </mat-form-field></ng-template>\n                    </ng-template>\n                </mat-card-title>\n            </mat-card-header>\n            <img mat-card-image\n                [attr.alt]="name"\n                [attr.src]="file.source"\n                @defaultAnimation\n                *ngIf="file?.type === \'image\' && file?.source"\n            >\n            <video\n                autoplay\n                @defaultAnimation\n                mat-card-image\n                muted\n                *ngIf="file?.type === \'video\' && file?.source"\n                loop\n            >\n                <source [attr.src]="file.source" [type]="file.content_type">\n                No preview possible.\n            </video>\n            <iframe\n                @defaultAnimation\n                *ngIf="file?.type === \'text\' && file?.source"\n                [src]="file.source"\n                style="border: none; width: 100%; max-height: 150px"\n            ></iframe>\n            <div\n                @defaultAnimation\n                mat-card-image\n                *ngIf="(!file?.type && (file?.source || (file?.source | genericType) === \'string\') ? noPreviewText : noFileText) as text"\n            ><p>{{text}}</p></div>\n            <mat-card-content>\n                <ng-content></ng-content>\n                <div\n                    @defaultAnimation\n                    generic-error\n                    *ngIf="showValidationErrorMessages && model[attachmentTypeName][internalName]?.state?.errors"\n                >\n                    <p\n                        @defaultAnimation\n                        *ngIf="model[attachmentTypeName][internalName].state.errors.required"\n                    >\n                        {{\n                            requiredText | genericStringTemplate:{\n                                attachmentTypeName: attachmentTypeName,\n                                file: file,\n                                internalName: internalName,\n                                model: model[attachmentTypeName][internalName]\n                            }\n                        }}\n                    </p>\n                    <p\n                        @defaultAnimation\n                        *ngIf="model[attachmentTypeName][internalName].state.errors.name"\n                    >\n                        {{\n                            namePatternText | genericStringTemplate:{\n                                attachmentTypeName: attachmentTypeName,\n                                file: file,\n                                internalName: internalName,\n                                model: model[attachmentTypeName][internalName]\n                            }\n                        }}\n                    </p>\n                    <p\n                        @defaultAnimation\n                        *ngIf="model[attachmentTypeName][internalName].state.errors.contentType"\n                    >\n                        {{\n                            typePatternText | genericStringTemplate:{\n                                attachmentTypeName: attachmentTypeName,\n                                file: file,\n                                internalName: internalName,\n                                model: model[attachmentTypeName][internalName]\n                            }\n                        }}\n                    </p>\n                    <p\n                        @defaultAnimation\n                        *ngIf="model[attachmentTypeName][internalName].state.errors.minimumSize"\n                    >\n                        {{\n                            minimumSizeText | genericStringTemplate:{\n                                attachmentTypeName: attachmentTypeName,\n                                file: file,\n                                internalName: internalName,\n                                model: model[attachmentTypeName][internalName]\n                            }\n                        }}\n                    </p>\n                    <p\n                        @defaultAnimation\n                        *ngIf="model[attachmentTypeName][internalName].state.errors.maximumSize"\n                    >\n                        {{\n                            maximumSizeText | genericStringTemplate:{\n                                attachmentTypeName: attachmentTypeName,\n                                file: file,\n                                internalName: internalName,\n                                model: model[attachmentTypeName][internalName]\n                            }\n                        }}\n                    </p>\n                    <p\n                        @defaultAnimation\n                        *ngIf="model[attachmentTypeName][internalName].state.errors.database"\n                    >\n                        {{\n                            model[attachmentTypeName][\n                                internalName\n                            ].state.errors.database\n                        }}\n                    </p>\n                </div>\n            </mat-card-content>\n            <mat-card-actions>\n                <input #input style="display: none" type="file" />\n                <button\n                    @defaultAnimation\n                    (click)="input.click()"\n                    mat-raised-button\n                    *ngIf="newButtonText"\n                >{{newButtonText}}</button>\n                <button\n                    (click)="remove()"\n                    @defaultAnimation\n                    mat-raised-button\n                    *ngIf="deleteButtonText && file"\n                >{{deleteButtonText}}</button>\n                <button mat-raised-button\n                    @defaultAnimation\n                    *ngIf="downloadButtonText && file"\n                ><a [download]="file.name" [href]="file.source">\n                    {{downloadButtonText}}\n                </a></button>\n            </mat-card-actions>\n        </mat-card>\n    '}),_dec229=(0,_core.Output)(),_dec230=(0,_core.Input)(),_dec231=(0,_core.Input)(),_dec232=(0,_core.Input)(),_dec233=(0,_core.Output)(),_dec234=(0,_core.Input)(),_dec235=(0,_core.ViewChild)('input'),_dec236=(0,_core.Input)(),_dec237=(0,_core.Input)(),_dec238=(0,_core.Input)(),_dec239=(0,_core.Input)(),_dec240=(0,_core.Input)(),_dec241=(0,_core.Input)(),_dec242=(0,_core.Input)(),_dec243=(0,_core.Output)(),_dec244=(0,_core.Input)(),_dec245=(0,_core.Input)(),_dec246=(0,_core.Input)(),_dec247=(0,_core.Input)(),_dec248=(0,_core.Input)(),_dec249=(0,_core.Input)(),_dec250=(0,_core.Input)(),_dec251=(0,_core.Input)(),_dec252=(0,_core.Input)(),_dec253=(0,_core.Input)(),_dec228(_class193=(_class194=(_temp59=_class195=function(){/**
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
     */function FileInputComponent(data,domSanitizer,extendObjectPipe,getFilenameByPrefixPipe,initialData,representObjectPipe,stringFormatPipe,utility){var _model;_classCallCheck(this,FileInputComponent);this.attachmentTypeName=this.attachmentTypeName;this.configuration=this.configuration;_initDefineProp(this,'delete',_descriptor131,this);_initDefineProp(this,'deleteButtonText',_descriptor132,this);this.deletedName=this.deletedName;_initDefineProp(this,'downloadButtonText',_descriptor133,this);_initDefineProp(this,'editableName',_descriptor134,this);this.file=null;_initDefineProp(this,'fileChange',_descriptor135,this);_initDefineProp(this,'headerText',_descriptor136,this);this.idName=this.idName;_initDefineProp(this,'input',_descriptor137,this);_initDefineProp(this,'resetNameText',_descriptor138,this);_initDefineProp(this,'saveNameText',_descriptor139,this);_initDefineProp(this,'showDeclarationText',_descriptor140,this);this.typeName=this.typeName;this.internalName=this.internalName;this.keyCode=this.keyCode;_initDefineProp(this,'mapNameToField',_descriptor141,this);_initDefineProp(this,'maximumSizeText',_descriptor142,this);_initDefineProp(this,'minimumSizeText',_descriptor143,this);_initDefineProp(this,'model',_descriptor144,this);_initDefineProp(this,'modelChange',_descriptor145,this);_initDefineProp(this,'name',_descriptor146,this);_initDefineProp(this,'namePatternText',_descriptor147,this);_initDefineProp(this,'newButtonText',_descriptor148,this);_initDefineProp(this,'noFileText',_descriptor149,this);_initDefineProp(this,'noPreviewText',_descriptor150,this);_initDefineProp(this,'requiredText',_descriptor151,this);_initDefineProp(this,'revision',_descriptor152,this);this.revisionName=this.revisionName;_initDefineProp(this,'showValidationErrorMessages',_descriptor153,this);_initDefineProp(this,'synchronizeImmediately',_descriptor154,this);_initDefineProp(this,'typePatternText',_descriptor155,this);this._data=this._data;this._domSanitizer=this._domSanitizer;this._extendObject=this._extendObject;this._getFilenameByPrefix=this._getFilenameByPrefix;this._idIsObject=false;this._representObject=this._representObject;this._stringFormat=this._stringFormat;this._prefixMatch=false;this.configuration=initialData.configuration;this.attachmentTypeName=this.configuration.database.model.property.name.special.attachment;this.keyCode=utility.fixed.tools.keyCode;this.deletedName=this.configuration.database.model.property.name.special.deleted;this.idName=this.configuration.database.model.property.name.special.id;this.model=(_model={},_defineProperty(_model,this.attachmentTypeName,{}),_defineProperty(_model,'id',null),_model);this.revisionName=this.configuration.database.model.property.name.special.revision;this.typeName=this.configuration.database.model.property.name.special.type;this._data=data;this._domSanitizer=domSanitizer;this._extendObject=extendObjectPipe.transform.bind(extendObjectPipe);this._getFilenameByPrefix=getFilenameByPrefixPipe.transform.bind(getFilenameByPrefixPipe);this._representObject=representObjectPipe.transform.bind(representObjectPipe);this._stringFormat=stringFormatPipe.transform.bind(stringFormatPipe)}/**
     * Determines which type of file we have to present.
     * @returns Nothing.
     */_createClass(FileInputComponent,[{key:'determinePresentationType',value:function determinePresentationType(){if(this.file&&this.file.content_type)if(FileInputComponent.textMimeTypeRegularExpression.test(this.file.content_type))this.file.type='text';else if(FileInputComponent.imageMimeTypeRegularExpression.test(this.file.content_type))this.file.type='image';else if(FileInputComponent.videoMimeTypeRegularExpression.test(this.file.content_type))this.file.type='video';else this.file.type='binary'}/**
     * Initializes file upload handler.
     * @param changes - Holds informations about changed bound properties.
     * @returns Nothing.
     */},{key:'ngOnChanges',value:function(){var _ref72=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee19(changes){var _id2;return regeneratorRuntime.wrap(function _callee19$(_context19){while(1){switch(_context19.prev=_context19.next){case 0:if(_typeof(this.model[this.idName])==='object')this._idIsObject=true;if(changes.hasOwnProperty('mapNameToField')&&this.mapNameToField&&!Array.isArray(this.mapNameToField))this.mapNameToField=[this.mapNameToField];if(changes.hasOwnProperty('model')||changes.hasOwnProperty('name')){this.internalName=this._getFilenameByPrefix(this.model[this.attachmentTypeName],this.name);if(this.name&&this.internalName&&this.internalName!==this.name)this._prefixMatch=true;this.model[this.attachmentTypeName][this.internalName].state={};this.file=this.model[this.attachmentTypeName][this.internalName].value;if(this.file)this.file.initialName=this.file.name;else if(!this.model[this.attachmentTypeName][this.internalName].nullable)this.model[this.attachmentTypeName][this.internalName].state.errors={required:true}}if(!(changes.hasOwnProperty('model')||changes.hasOwnProperty('name')||changes.hasOwnProperty('revision'))){_context19.next=24;break}if(!this.file){_context19.next=21;break}this.file.query='?version='+this.file.digest;/*
                    NOTE: Only set new file source if isn't already present to
                    prevent to download an immediately uploaded file and grab
                    and older cached one.
                */if(this.file.source){_context19.next=21;break}_id2=this._idIsObject?this.model[this.idName].value:this.model[this.idName];if(!(this.revision&&changes.revision.currentValue!==changes.revision.previousValue)){_context19.next=20;break}_context19.prev=9;_context19.next=12;return this.retrieveAttachment(_id2,{rev:this.revision});case 12:_context19.next=18;break;case 14:_context19.prev=14;_context19.t0=_context19['catch'](9);this.model[this.attachmentTypeName][this.internalName].state.errors.database='message'in _context19.t0?_context19.t0.message:this._representObject(_context19.t0);return _context19.abrupt('return');case 18:_context19.next=21;break;case 20:this.file.source=this._domSanitizer.bypassSecurityTrustResourceUrl(this._stringFormat(this.configuration.database.url,'')+'/'+(this.configuration.name||'generic')+('/'+_id2+'/'+this.file.name)+this.file.query);case 21:this.determinePresentationType();this.modelChange.emit(this.model);this.fileChange.emit(this.file);case 24:case'end':return _context19.stop();}}},_callee19,this,[[9,14]])}));function ngOnChanges(_x52){return _ref72.apply(this,arguments)}return ngOnChanges}()/**
     * Initializes current file input field. Adds needed event observer.
     * @returns Nothing.
     */},{key:'ngAfterViewInit',value:function ngAfterViewInit(){var _this72=this;this.input.nativeElement.addEventListener('change',function(){if(_this72.input.nativeElement.files.length>0){_this72.file={/* eslint-disable camelcase */// IgnoreTypeCheck
content_type:_this72.input.nativeElement.files[0].type||'text/plain',/* eslint-enable camelcase */// IgnoreTypeCheck
data:_this72.input.nativeElement.files[0],initialName:_this72.input.nativeElement.files[0].name,// IgnoreTypeCheck
length:_this72.input.nativeElement.files[0].size,name:_this72.input.nativeElement.files[0].name};_this72.update(_this72.file?_this72.file.name:null)}})}/**
     * Removes current file.
     * @returns A Promise which will be resolved after current file will be
     * removed.
     */},{key:'remove',value:function(){var _ref73=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee20(){var _update2,result,update;return regeneratorRuntime.wrap(function _callee20$(_context20){while(1){switch(_context20.prev=_context20.next){case 0:if(!(this.synchronizeImmediately&&this.file)){_context20.next=15;break}result=void 0;update=(_update2={},_defineProperty(_update2,this.typeName,this.model[this.typeName]),_defineProperty(_update2,this.idName,this._idIsObject?this.model[this.idName].value:this.model[this.idName]),_defineProperty(_update2,this.revisionName,this.model[this.revisionName]),_update2);if(this.mapNameToField&&this.mapNameToField.includes(this.idName))update[this.deletedName]=true;else update[this.attachmentTypeName]=_defineProperty({},this.file.name,{/* eslint-disable camelcase */content_type:'text/plain',/* eslint-enable camelcase */data:null});_context20.prev=4;_context20.next=7;return this._data.put(update);case 7:result=_context20.sent;_context20.next=14;break;case 10:_context20.prev=10;_context20.t0=_context20['catch'](4);this.model[this.attachmentTypeName][this.internalName].state.errors={database:'message'in _context20.t0?_context20.t0.message:this._representObject(_context20.t0)};return _context20.abrupt('return');case 14:if(this.mapNameToField&&this.mapNameToField.includes(this.idName))this.delete.emit(result);else this.model[this.revisionName]=result.rev;case 15:this.model[this.attachmentTypeName][this.internalName].state.errors=this.model[this.attachmentTypeName][this.internalName].value=this.file=null;if(!this.model[this.attachmentTypeName][this.internalName].nullable)this.model[this.attachmentTypeName][this.internalName].state.errors={required:true};this.modelChange.emit(this.model);this.fileChange.emit(this.file);case 19:case'end':return _context20.stop();}}},_callee20,this,[[4,10]])}));function remove(){return _ref73.apply(this,arguments)}return remove}()/**
     * Renames current file.
     * @param name - New name to rename current file to.
     * @returns A Promise which will be resolved after current file will be
     * renamed.
     */},{key:'rename',value:function(){var _ref74=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee21(name){var id,oldName;return regeneratorRuntime.wrap(function _callee21$(_context21){while(1){switch(_context21.prev=_context21.next){case 0:id=this._idIsObject?this.model[this.idName].value:this.model[this.idName];oldName=this.file.name;if(!(this.file.stub&&this.mapNameToField&&id&&this.mapNameToField.includes(this.idName))){_context21.next=12;break}_context21.prev=3;_context21.next=6;return this.retrieveAttachment(id);case 6:_context21.next=12;break;case 8:_context21.prev=8;_context21.t0=_context21['catch'](3);this.model[this.attachmentTypeName][this.internalName].state.errors={database:'message'in _context21.t0?_context21.t0.message:this._representObject(_context21.t0)};return _context21.abrupt('return');case 12:this.file.name=name;return _context21.abrupt('return',this.update(oldName));case 14:case'end':return _context21.stop();}}},_callee21,this,[[3,8]])}));function rename(_x53){return _ref74.apply(this,arguments)}return rename}()/**
     * Retrieves current attachment with given document id and converts them
     * into a base 64 string which will be set as file source.
     * @param id - Document id which should hold needed attachment.
     * @param options - Options to use for the attachment retrieving.
     * @returns A promise which resolves if requested attachment was retrieved.
     */},{key:'retrieveAttachment',value:function(){var _ref75=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee22(id){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var file;return regeneratorRuntime.wrap(function _callee22$(_context22){while(1){switch(_context22.prev=_context22.next){case 0:_context22.next=2;return this._data.getAttachment(id,this.file.name,options);case 2:file=_context22.sent;_context22.t0=file.type||'text/plain';if(!(typeof Blob==='undefined')){_context22.next=8;break}_context22.t1=file.toString('base64');_context22.next=11;break;case 8:_context22.next=10;return eval('require')('blob-util').blobToBase64String(file);case 10:_context22.t1=_context22.sent;case 11:_context22.t2=_context22.t1;_context22.t3=file.size;_context22.t4=this.file.name;this.file={content_type:_context22.t0,data:_context22.t2,length:_context22.t3,name:_context22.t4};this.file.source=this._domSanitizer.bypassSecurityTrustResourceUrl('data:'+this.file.content_type+';base64,'+this.file.data);case 16:case'end':return _context22.stop();}}},_callee22,this)}));function retrieveAttachment(_x54){return _ref75.apply(this,arguments)}return retrieveAttachment}()/**
     * Updates given current file into database (replaces if old name is
     * given).
     * @param oldName - Name of saved file to update or replace.
     * @returns A Promise which will be resolved after current file will be
     * synchronized.
     */},{key:'update',value:function(){var _ref76=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee23(oldName){var _this73=this;var lastIndex,_newData2,newData,_id3,tasks,_iteratorNormalCompletion27,_didIteratorError27,_iteratorError27,_iterator27,_step27,_name19,result,_revision2,_iteratorNormalCompletion28,_didIteratorError28,_iteratorError28,_iterator28,_step28,item,fileReader;return regeneratorRuntime.wrap(function _callee23$(_context23){while(1){switch(_context23.prev=_context23.next){case 0:this.model[this.attachmentTypeName][this.internalName].state={};if(this._prefixMatch){lastIndex=this.file.name.lastIndexOf('.');if([0,-1].includes(lastIndex))this.file.name=this.name;else this.file.name=this.name+this.file.name.substring(lastIndex)}this.model[this.attachmentTypeName][this.internalName].value=this.file;// region determine errors
if(!this.model[this.attachmentTypeName][this.internalName].state.errors)this.model[this.attachmentTypeName][this.internalName].state.errors={};if(!new RegExp(this.internalName).test(this.file.name))this.model[this.attachmentTypeName][this.internalName].state.errors={name:true};if(!([undefined,null].includes(this.model[this.attachmentTypeName][this.internalName].contentTypeRegularExpressionPattern)||new RegExp(this.model[this.attachmentTypeName][this.internalName].contentTypeRegularExpressionPattern).test(this.file.content_type)))this.model[this.attachmentTypeName][this.internalName].state.errors.contentType=true;if(!([undefined,null].includes(this.model[this.attachmentTypeName][this.internalName].minimumSize)||this.model[this.attachmentTypeName][this.internalName].minimumSize<=this.file.length))this.model[this.attachmentTypeName][this.internalName].state.errors.minimuSize=true;if(!([undefined,null].includes(this.model[this.attachmentTypeName][this.internalName].maximumSize)||this.model[this.attachmentTypeName][this.internalName].maximumSize>=this.file.length))this.model[this.attachmentTypeName][this.internalName].state.errors.maximumSize=true;if(Object.keys(this.model[this.attachmentTypeName][this.internalName].state.errors).length===0)delete this.model[this.attachmentTypeName][this.internalName].state.errors;// endregion
if(!(this.synchronizeImmediately&&!this.model[this.attachmentTypeName][this.internalName].state.errors)){_context23.next=86;break}newData=(_newData2={},_defineProperty(_newData2,this.typeName,this.model[this.typeName]),_defineProperty(_newData2,this.idName,this._idIsObject?this.model[this.idName].value:this.model[this.idName]),_newData2);if(this.synchronizeImmediately!==true)this._extendObject(true,newData,this.synchronizeImmediately);_id3=this._idIsObject?this.model[this.idName].value:this.model[this.idName];// NOTE: We want to replace old medium.
if(oldName&&oldName!==this.file.name&&!(this.mapNameToField&&_id3&&this.mapNameToField.includes(this.idName)))newData[this.attachmentTypeName]=_defineProperty({},oldName,{data:null});if(![undefined,null].includes(this.model[this.revisionName]))newData[this.revisionName]=this.model[this.revisionName];tasks=[];if(!this.mapNameToField){_context23.next=37;break}if(_id3&&_id3!==this.file.name&&this.mapNameToField.includes(this.idName)){newData[this.deletedName]=true;tasks.unshift(newData);newData=this._extendObject(true,{},newData,_defineProperty({},this.deletedName,false))}_iteratorNormalCompletion27=true;_didIteratorError27=false;_iteratorError27=undefined;_context23.prev=21;for(_iterator27=this.mapNameToField[Symbol.iterator]();!(_iteratorNormalCompletion27=(_step27=_iterator27.next()).done);_iteratorNormalCompletion27=true){_name19=_step27.value;newData[_name19]=this.file.name;if(_name19===this.idName&&this._idIsObject)this.model[_name19].value=this.file.name;else this.model[_name19]=this.file.name}_context23.next=29;break;case 25:_context23.prev=25;_context23.t0=_context23['catch'](21);_didIteratorError27=true;_iteratorError27=_context23.t0;case 29:_context23.prev=29;_context23.prev=30;if(!_iteratorNormalCompletion27&&_iterator27.return){_iterator27.return()}case 32:_context23.prev=32;if(!_didIteratorError27){_context23.next=35;break}throw _iteratorError27;case 35:return _context23.finish(32);case 36:return _context23.finish(29);case 37:newData[this.revisionName]='upsert';newData[this.attachmentTypeName]=_defineProperty({},this.file.name,{/* eslint-disable camelcase */content_type:this.file.content_type,/* eslint-enable camelcase */data:this.file.data});tasks.unshift(newData);result=void 0;_context23.prev=41;_context23.next=44;return this._data.bulkDocs(tasks);case 44:result=_context23.sent;_context23.next=51;break;case 47:_context23.prev=47;_context23.t1=_context23['catch'](41);this.model[this.attachmentTypeName][this.internalName].state.errors={database:'message'in _context23.t1?_context23.t1.message:this._representObject(_context23.t1)};return _context23.abrupt('return');case 51:_id3=newData[this.idName];_revision2=void 0;_iteratorNormalCompletion28=true;_didIteratorError28=false;_iteratorError28=undefined;_context23.prev=56;_iterator28=result[Symbol.iterator]();case 58:if(_iteratorNormalCompletion28=(_step28=_iterator28.next()).done){_context23.next=67;break}item=_step28.value;if(!item.error){_context23.next=63;break}this.model[this.attachmentTypeName][this.internalName].state.errors={database:item.message};return _context23.abrupt('return');case 63:if(item.id===_id3)_revision2=item.rev;case 64:_iteratorNormalCompletion28=true;_context23.next=58;break;case 67:_context23.next=73;break;case 69:_context23.prev=69;_context23.t2=_context23['catch'](56);_didIteratorError28=true;_iteratorError28=_context23.t2;case 73:_context23.prev=73;_context23.prev=74;if(!_iteratorNormalCompletion28&&_iterator28.return){_iterator28.return()}case 76:_context23.prev=76;if(!_didIteratorError28){_context23.next=79;break}throw _iteratorError28;case 79:return _context23.finish(76);case 80:return _context23.finish(73);case 81:if(this.file){this.file.revision=this.model[this.revisionName]=_revision2;this.file.query='?rev='+_revision2;this.file.source=this._domSanitizer.bypassSecurityTrustResourceUrl(this._stringFormat(this.configuration.database.url,'')+('/'+this.configuration.name+'/'+_id3+'/')+(''+this.file.name+this.file.query));this.determinePresentationType()}this.modelChange.emit(this.model);this.fileChange.emit(this.file);_context23.next=87;break;case 86:if(this.file.data){this.determinePresentationType();fileReader=new FileReader;fileReader.onload=function(event){_this73.file.digest=new Date().getTime();_this73.file.source=_this73._domSanitizer.bypassSecurityTrustResourceUrl(event.target['result']);if(_this73.mapNameToField){var _iteratorNormalCompletion29=true;var _didIteratorError29=false;var _iteratorError29=undefined;try{for(var _iterator29=_this73.mapNameToField[Symbol.iterator](),_step29;!(_iteratorNormalCompletion29=(_step29=_iterator29.next()).done);_iteratorNormalCompletion29=true){var _name20=_step29.value;_this73.model[_name20]=_this73.file.name}}catch(err){_didIteratorError29=true;_iteratorError29=err}finally{try{if(!_iteratorNormalCompletion29&&_iterator29.return){_iterator29.return()}}finally{if(_didIteratorError29){throw _iteratorError29}}}}_this73.modelChange.emit(_this73.model);_this73.fileChange.emit(_this73.file)};fileReader.readAsDataURL(this.file.data)}case 87:case'end':return _context23.stop();}}},_callee23,this,[[21,25,29,37],[30,,32,36],[41,47],[56,69,73,81],[74,,76,80]])}));function update(_x56){return _ref76.apply(this,arguments)}return update}()}]);return FileInputComponent}(),_class195.imageMimeTypeRegularExpression=new RegExp('^image/(?:p?jpe?g|png|svg(?:\\+xml)?|vnd\\.microsoft\\.icon|gif|'+'tiff|webp|vnd\\.wap\\.wbmp|x-(?:icon|jng|ms-bmp))$'),_class195.textMimeTypeRegularExpression=new RegExp('^(?:application/xml)|(?:text/(?:plain|x-ndpb[wy]html|(?:x-)?csv))$'),_class195.videoMimeTypeRegularExpression=new RegExp('^video/(?:(?:x-)?(?:x-)?webm|3gpp|mp2t|mp4|mpeg|quicktime|'+'(?:x-)?flv|(?:x-)?m4v|(?:x-)mng|x-ms-as|x-ms-wmv|x-msvideo)|'+'(?:application/(?:x-)?shockwave-flash)$'),_temp59),(_descriptor131=_applyDecoratedDescriptor(_class194.prototype,'delete',[_dec229],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor132=_applyDecoratedDescriptor(_class194.prototype,'deleteButtonText',[_dec230],{enumerable:true,initializer:function initializer(){return'delete'}}),_descriptor133=_applyDecoratedDescriptor(_class194.prototype,'downloadButtonText',[_dec231],{enumerable:true,initializer:function initializer(){return'download'}}),_descriptor134=_applyDecoratedDescriptor(_class194.prototype,'editableName',[_dec232],{enumerable:true,initializer:function initializer(){return true}}),_descriptor135=_applyDecoratedDescriptor(_class194.prototype,'fileChange',[_dec233],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor136=_applyDecoratedDescriptor(_class194.prototype,'headerText',[_dec234],{enumerable:true,initializer:function initializer(){return null}}),_descriptor137=_applyDecoratedDescriptor(_class194.prototype,'input',[_dec235],{enumerable:true,initializer:function initializer(){return this.input}}),_descriptor138=_applyDecoratedDescriptor(_class194.prototype,'resetNameText',[_dec236],{enumerable:true,initializer:function initializer(){return'\xD7'}}),_descriptor139=_applyDecoratedDescriptor(_class194.prototype,'saveNameText',[_dec237],{enumerable:true,initializer:function initializer(){return'\u2713'}}),_descriptor140=_applyDecoratedDescriptor(_class194.prototype,'showDeclarationText',[_dec238],{enumerable:true,initializer:function initializer(){return'\u2139'}}),_descriptor141=_applyDecoratedDescriptor(_class194.prototype,'mapNameToField',[_dec239],{enumerable:true,initializer:function initializer(){return null}}),_descriptor142=_applyDecoratedDescriptor(_class194.prototype,'maximumSizeText',[_dec240],{enumerable:true,initializer:function initializer(){return'Filesize (${file.length} byte) is more than specified maximum of '+'${model.maximumSize} byte.'}}),_descriptor143=_applyDecoratedDescriptor(_class194.prototype,'minimumSizeText',[_dec241],{enumerable:true,initializer:function initializer(){return'Filesize (${file.length} byte) is less than specified minimum of '+'${model.minimumSize} byte.'}}),_descriptor144=_applyDecoratedDescriptor(_class194.prototype,'model',[_dec242],{enumerable:true,initializer:function initializer(){return this.model}}),_descriptor145=_applyDecoratedDescriptor(_class194.prototype,'modelChange',[_dec243],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor146=_applyDecoratedDescriptor(_class194.prototype,'name',[_dec244],{enumerable:true,initializer:function initializer(){return null}}),_descriptor147=_applyDecoratedDescriptor(_class194.prototype,'namePatternText',[_dec245],{enumerable:true,initializer:function initializer(){return'Given filename "${file.name}" doesn\'t match specified pattern "'+'${internalName}".'}}),_descriptor148=_applyDecoratedDescriptor(_class194.prototype,'newButtonText',[_dec246],{enumerable:true,initializer:function initializer(){return'new'}}),_descriptor149=_applyDecoratedDescriptor(_class194.prototype,'noFileText',[_dec247],{enumerable:true,initializer:function initializer(){return''}}),_descriptor150=_applyDecoratedDescriptor(_class194.prototype,'noPreviewText',[_dec248],{enumerable:true,initializer:function initializer(){return''}}),_descriptor151=_applyDecoratedDescriptor(_class194.prototype,'requiredText',[_dec249],{enumerable:true,initializer:function initializer(){return'Please select a file.'}}),_descriptor152=_applyDecoratedDescriptor(_class194.prototype,'revision',[_dec250],{enumerable:true,initializer:function initializer(){return null}}),_descriptor153=_applyDecoratedDescriptor(_class194.prototype,'showValidationErrorMessages',[_dec251],{enumerable:true,initializer:function initializer(){return false}}),_descriptor154=_applyDecoratedDescriptor(_class194.prototype,'synchronizeImmediately',[_dec252],{enumerable:true,initializer:function initializer(){return false}}),_descriptor155=_applyDecoratedDescriptor(_class194.prototype,'typePatternText',[_dec253],{enumerable:true,initializer:function initializer(){return'Filetype "${file.content_type}" doesn\'t match specified pattern "'+'${model.contentTypeRegularExpressionPattern}".'}})),_class194))||_class193);// / endregion
// / region pagination
/* eslint-disable max-len */// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[DataService,_platformBrowser.DomSanitizer,ExtendObjectPipe,GetFilenameByPrefixPipe,InitialDataService,RepresentObjectPipe,StringFormatPipe,UtilityService],FileInputComponent);/* eslint-enable max-len *//**
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
 */var PaginationComponent=exports.PaginationComponent=(_dec254=(0,_core.Component)({animations:[_animation.defaultAnimation],changeDetection:_core.ChangeDetectionStrategy.OnPush,selector:'generic-pagination',template:'\n        <ul class="hans" @defaultAnimation *ngIf="lastPage > 1">\n            <li @defaultAnimation *ngIf="page > 2">\n                <a href="" (click)="change($event, 1)">--</a>\n            </li>\n            <li @defaultAnimation *ngIf="page > 1">\n                <a href="" (click)="change($event, previousPage)">-</a>\n            </li>\n            <li\n                class="page-{{currentPage}}"\n                @defaultAnimation\n                [ngClass]="{current: currentPage === page, previous: currentPage === previousPage, next: currentPage === nextPage, even: even, \'even-page\': currentPage % 2 === 0, first: currentPage === firstPage, last: currentPage === lastPage}"\n                *ngFor="let currentPage of pagesRange;let even = even"\n            >\n                <a (click)="change($event, currentPage)" href="">\n                    {{currentPage}}\n                </a>\n            </li>\n            <li @defaultAnimation *ngIf="lastPage > page">\n                <a href="" (click)="change($event, nextPage)">+</a>\n            </li>\n            <li @defaultAnimation *ngIf="lastPage > page + 1">\n                <a href="" (click)="change($event, lastPage)">++</a>\n            </li>\n        </ul>\n    '}),_dec255=(0,_core.Input)(),_dec256=(0,_core.Input)(),_dec257=(0,_core.Output)(),_dec258=(0,_core.Input)(),_dec259=(0,_core.Input)(),_dec254(_class196=(_class197=function(){/**
     * Sets needed services as property values.
     * @param changeDetectorReference - Model dirty checking service.
     * @param makeRangePipe - Saves the make range pipe instance.
     * @returns Nothing.
     */function PaginationComponent(changeDetectorReference,makeRangePipe){_classCallCheck(this,PaginationComponent);_initDefineProp(this,'itemsPerPage',_descriptor156,this);_initDefineProp(this,'page',_descriptor157,this);_initDefineProp(this,'pageChange',_descriptor158,this);_initDefineProp(this,'pageRangeLimit',_descriptor159,this);_initDefineProp(this,'total',_descriptor160,this);this._changeDetectorReference=this._changeDetectorReference;this._makeRange=this._makeRange;this._changeDetectorReference=changeDetectorReference;this._makeRange=makeRangePipe.transform.bind(makeRangePipe)}/**
     * Is called whenever a page change should be performed.
     * @param event - The responsible event.
     * @param newPage - New page number to change to.
     * @returns Nothing.
     */_createClass(PaginationComponent,[{key:'change',value:function change(event,newPage){event.preventDefault();this._changeDetectorReference.markForCheck();this.page=newPage;this.pageChange.emit(this.page)}/**
     * Determines the highest page number.
     * @returns The determines page number.
     */},{key:'lastPage',get:function get(){return Math.ceil(this.total/this.itemsPerPage)}/**
     * Retrieves the next or last (if last is current) page.
     * @returns The new determined page number.
     */},{key:'nextPage',get:function get(){return Math.min(this.page+1,this.lastPage)}/**
     * Determines the number of pages to show.
     * @returns A list of page numbers.
     */},{key:'pagesRange',get:function get(){if(this.page-this.pageRangeLimit<1){var _start=1;var startRest=this.pageRangeLimit-(this.page-_start);var _end=Math.min(this.lastPage,this.page+this.pageRangeLimit+startRest);return this._makeRange([_start,_end])}var end=Math.min(this.lastPage,this.page+this.pageRangeLimit);var endRest=this.pageRangeLimit-(end-this.page);var start=Math.max(1,this.page-this.pageRangeLimit-endRest);return this._makeRange([start,end])}/**
     * Determines the previous or first (if first is current) page.
     * @returns The previous determined page number.
     */},{key:'previousPage',get:function get(){return Math.max(1,this.page-1)}}]);return PaginationComponent}(),(_descriptor156=_applyDecoratedDescriptor(_class197.prototype,'itemsPerPage',[_dec255],{enumerable:true,initializer:function initializer(){return 10}}),_descriptor157=_applyDecoratedDescriptor(_class197.prototype,'page',[_dec256],{enumerable:true,initializer:function initializer(){return 1}}),_descriptor158=_applyDecoratedDescriptor(_class197.prototype,'pageChange',[_dec257],{enumerable:true,initializer:function initializer(){return new _core.EventEmitter}}),_descriptor159=_applyDecoratedDescriptor(_class197.prototype,'pageRangeLimit',[_dec258],{enumerable:true,initializer:function initializer(){return 4}}),_descriptor160=_applyDecoratedDescriptor(_class197.prototype,'total',[_dec259],{enumerable:true,initializer:function initializer(){return 0}})),_class197))||_class196);// / endregion
// endregion
// region module
// IgnoreTypeCheck
Reflect.defineMetadata('design:paramtypes',[_core.ChangeDetectorRef,ArrayMakeRangePipe],PaginationComponent);/**
 * Represents the importable angular module.
 */var Module=exports.Module=(_dec260=(0,_core.NgModule)({/*
        NOTE: Running "moduleHelper.determineDeclarations()" is not yet
        supported by the AOT-Compiler.
    */declarations:[// region pipes
// / region wrapped
// // region object
ConvertCircularObjectToJSONPipe,EqualsPipe,ExtendObjectPipe,RepresentObjectPipe,SortPipe,// // endregion
// // region array
ArrayMergePipe,ArrayMakePipe,ArrayUniquePipe,ArrayAggregatePropertyIfEqualPipe,ArrayDeleteEmptyItemsPipe,ArrayExtractPipe,ArrayExtractIfMatchesPipe,ArrayExtractIfPropertyExistsPipe,ArrayExtractIfPropertyMatchesPipe,ArrayIntersectPipe,ArrayMakeRangePipe,ArraySumUpPropertyPipe,ArrayAppendAddPipe,ArrayRemovePipe,ArraySortTopologicalPipe,// // endregion
// // region string
StringEscapeRegularExpressionsPipe,StringConvertToValidVariableNamePipe,StringEncodeURIComponentPipe,StringAddSeparatorToPathPipe,StringHasPathPrefixPipe,StringGetDomainNamePipe,StringGetPortNumberPipe,StringGetProtocolNamePipe,StringGetURLVariablePipe,StringIsInternalURLPipe,StringNormalizeURLPipe,StringRepresentURLPipe,StringCompressStyleValuePipe,StringCamelCaseToDelimitedPipe,StringCapitalizePipe,StringDelimitedToCamelCasePipe,StringFormatPipe,StringGetRegularExpressionValidatedPipe,StringLowerCasePipe,StringFindNormalizedMatchRangePipe,StringMarkPipe,StringMD5Pipe,StringNormalizePhoneNumberPipe,StringParseEncodedObjectPipe,StringRepresentPhoneNumberPipe,StringDecodeHTMLEntitiesPipe,StringNormalizeDomNodeSelectorPipe,// // endregion
// // region number
NumberGetUTCTimestampPipe,NumberIsNotANumberPipe,NumberRoundPipe,// // endregion
// / endregion
// / region object
AttachmentsAreEqualPipe,GetFilenameByPrefixPipe,AttachmentWithPrefixExistsPipe,ExtractDataPipe,ExtractRawDataPipe,IsDefinedPipe,LimitToPipe,MapPipe,ObjectKeysPipe,ReversePipe,TypePipe,// / endregion
// / region array
ArrayDependentConcatPipe,// / endregion
// / region string
StringEndsWithPipe,StringHasTimeSuffixPipe,StringMatchPipe,StringMaximumLengthPipe,StringReplacePipe,StringSafeHTMLPipe,StringSafeResourceURLPipe,StringSafeScriptPipe,StringSafeStylePipe,StringSafeURLPipe,StringShowIfPatternMatchesPipe,StringSliceMatchPipe,StringStartsWithPipe,StringTemplatePipe,// / endregion
// / region number
NumberPercentPipe,// / endregion
// endregion
// region accessors
AbstractValueAccessor,DateTimeValueAccessor,// endregion
// region directives
DateDirective,SliderDirective,// endregion
// region components
AbstractEditorComponent,ConfirmComponent,IntervalInputComponent,IntervalsInputComponent,CodeEditorComponent,InputComponent,SimpleInputComponent,TextEditorComponent,TextareaComponent,FileInputComponent,PaginationComponent// endregion
],entryComponents:[ConfirmComponent],/*
        NOTE: Running "moduleHelper.determineExports()" is not yet supported by
        the AOT-Compiler.
    */exports:[// region pipes
// / region wrapped
// // region object
ConvertCircularObjectToJSONPipe,EqualsPipe,ExtendObjectPipe,RepresentObjectPipe,SortPipe,// // endregion
// // region array
ArrayMergePipe,ArrayMakePipe,ArrayUniquePipe,ArrayAggregatePropertyIfEqualPipe,ArrayDeleteEmptyItemsPipe,ArrayExtractPipe,ArrayExtractIfMatchesPipe,ArrayExtractIfPropertyExistsPipe,ArrayExtractIfPropertyMatchesPipe,ArrayIntersectPipe,ArrayMakeRangePipe,ArraySumUpPropertyPipe,ArrayAppendAddPipe,ArrayRemovePipe,ArraySortTopologicalPipe,// // endregion
// // region string
StringEscapeRegularExpressionsPipe,StringConvertToValidVariableNamePipe,StringEncodeURIComponentPipe,StringAddSeparatorToPathPipe,StringHasPathPrefixPipe,StringGetDomainNamePipe,StringGetPortNumberPipe,StringGetProtocolNamePipe,StringGetURLVariablePipe,StringIsInternalURLPipe,StringNormalizeURLPipe,StringRepresentURLPipe,StringCompressStyleValuePipe,StringCamelCaseToDelimitedPipe,StringCapitalizePipe,StringDelimitedToCamelCasePipe,StringFormatPipe,StringGetRegularExpressionValidatedPipe,StringLowerCasePipe,StringFindNormalizedMatchRangePipe,StringMarkPipe,StringMD5Pipe,StringNormalizePhoneNumberPipe,StringParseEncodedObjectPipe,StringRepresentPhoneNumberPipe,StringDecodeHTMLEntitiesPipe,StringNormalizeDomNodeSelectorPipe,// // endregion
// // region number
NumberGetUTCTimestampPipe,NumberIsNotANumberPipe,NumberRoundPipe,// // endregion
// / endregion
// / region object
AttachmentsAreEqualPipe,GetFilenameByPrefixPipe,AttachmentWithPrefixExistsPipe,ExtractDataPipe,ExtractRawDataPipe,IsDefinedPipe,LimitToPipe,MapPipe,ObjectKeysPipe,ReversePipe,TypePipe,// / endregion
// / region array
ArrayDependentConcatPipe,// / endregion
// / region string
StringEndsWithPipe,StringHasTimeSuffixPipe,StringMatchPipe,StringMaximumLengthPipe,StringReplacePipe,StringSafeHTMLPipe,StringSafeResourceURLPipe,StringSafeScriptPipe,StringSafeStylePipe,StringSafeURLPipe,StringShowIfPatternMatchesPipe,StringSliceMatchPipe,StringStartsWithPipe,StringTemplatePipe,// / endregion
// / region number
NumberPercentPipe,// / endregion
// endregion
// region directives
DateDirective,SliderDirective,// endregion
// region components
ConfirmComponent,IntervalInputComponent,IntervalsInputComponent,CodeEditorComponent,InputComponent,SimpleInputComponent,TextEditorComponent,TextareaComponent,FileInputComponent,PaginationComponent// endregion
],imports:[_platformBrowser.BrowserModule.withServerTransition({appId:'generic-universal'}),_forms.FormsModule,_material.MatButtonModule,_material.MatCardModule,_material.MatDialogModule,_material.MatInputModule,_material.MatSelectModule,_material.MatTooltipModule],/*
        NOTE: Running "moduleHelper.determineProviders()" is not yet supported
        by the AOT-Compiler.
    */providers:[// region services
UtilityService,InitialDataService,AlertService,DataService,DataScopeService,// / region guards
CanDeactivateRouteLeaveGuard,// / endregion
// / region resolver
AbstractResolver,// / endregion
// endregion
// region pipes
// / region wrapped
// // region object
ConvertCircularObjectToJSONPipe,EqualsPipe,ExtendObjectPipe,RepresentObjectPipe,SortPipe,// // endregion
// // region array
ArrayMergePipe,ArrayMakePipe,ArrayUniquePipe,ArrayAggregatePropertyIfEqualPipe,ArrayDeleteEmptyItemsPipe,ArrayExtractPipe,ArrayExtractIfMatchesPipe,ArrayExtractIfPropertyExistsPipe,ArrayExtractIfPropertyMatchesPipe,ArrayIntersectPipe,ArrayMakeRangePipe,ArraySumUpPropertyPipe,ArrayAppendAddPipe,ArrayRemovePipe,ArraySortTopologicalPipe,// // endregion
// // region string
StringEscapeRegularExpressionsPipe,StringConvertToValidVariableNamePipe,StringEncodeURIComponentPipe,StringAddSeparatorToPathPipe,StringHasPathPrefixPipe,StringGetDomainNamePipe,StringGetPortNumberPipe,StringGetProtocolNamePipe,StringGetURLVariablePipe,StringIsInternalURLPipe,StringNormalizeURLPipe,StringRepresentURLPipe,StringCompressStyleValuePipe,StringCamelCaseToDelimitedPipe,StringCapitalizePipe,StringDelimitedToCamelCasePipe,StringFormatPipe,StringGetRegularExpressionValidatedPipe,StringLowerCasePipe,StringFindNormalizedMatchRangePipe,StringMarkPipe,StringMD5Pipe,StringNormalizePhoneNumberPipe,StringParseEncodedObjectPipe,StringRepresentPhoneNumberPipe,StringDecodeHTMLEntitiesPipe,StringNormalizeDomNodeSelectorPipe,// // endregion
// // region number
NumberGetUTCTimestampPipe,NumberIsNotANumberPipe,NumberRoundPipe,// // endregion
// / endregion
// / region object
AttachmentsAreEqualPipe,GetFilenameByPrefixPipe,AttachmentWithPrefixExistsPipe,ExtractDataPipe,ExtractRawDataPipe,IsDefinedPipe,LimitToPipe,MapPipe,ObjectKeysPipe,ReversePipe,TypePipe,// / endregion
// / region array
ArrayDependentConcatPipe,// / endregion
// / region string
StringEndsWithPipe,StringHasTimeSuffixPipe,StringMatchPipe,StringMaximumLengthPipe,StringReplacePipe,StringSafeHTMLPipe,StringSafeResourceURLPipe,StringSafeScriptPipe,StringSafeStylePipe,StringSafeURLPipe,StringShowIfPatternMatchesPipe,StringSliceMatchPipe,StringStartsWithPipe,StringTemplatePipe,// / endregion
// / region number
NumberPercentPipe,_common.DatePipe,{deps:[DataService,_core.Injector],multi:true,provide:_core.APP_INITIALIZER,useFactory:dataServiceInitializerFactory}]}),_dec260(_class199=function Module(){_classCallCheck(this,Module)})||_class199);exports.default=Module;// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

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
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }),
/* 16 */
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

    This library written by torben sickert stand under a creative commons
    naming 3.0 unported license.
    see http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/// region imports
// IgnoreTypeCheck
Object.defineProperty(exports,'__esModule',{value:true});exports.defaultAnimation=exports.createDefaultAnimation=exports.defaultOptions=undefined;exports.createFadeAnimation=createFadeAnimation;var _clientnode=__webpack_require__(4);var _clientnode2=_interopRequireDefault(_clientnode);var _animations=__webpack_require__(17);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}// NOTE: Only needed for debugging this file.
try{module.require('source-map-support/register')}catch(error){}// endregion
var defaultOptions=exports.defaultOptions={duration:'.3s',enterState:':enter',leaveState:':leave',name:'fadeAnimation',style:{enter:{final:{opacity:1},initial:{opacity:0}}}/**
 * Fade in/out animation factory.
 * @param options - Animations meta data options.
 * @returns Animations meta data object.
 */};function createFadeAnimation(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};if(typeof options==='string')options={name:options};options=_clientnode2.default.extendObject(true,{},defaultOptions,options);return(0,_animations.trigger)(options.name,[(0,_animations.transition)(options.enterState,[(0,_animations.style)(options.style.enter.initial),(0,_animations.animate)(options.enterDuration||options.duration,(0,_animations.style)(options.style.enter.final))]),(0,_animations.transition)(options.leaveState,[(0,_animations.style)(options.style.leave&&options.style.leave.initial||options.style.enter.final),(0,_animations.animate)(options.leaveDuration||options.duration,(0,_animations.style)(options.style.leave&&options.style.leave.final||options.style.enter.initial))])])}var createDefaultAnimation=exports.createDefaultAnimation=createFadeAnimation.bind({},'defaultAnimation');/*
    NOTE: Simply calling "createDefaultAnimation()" does not work in
    combination with angular's ahead of time compiler.
*/var defaultAnimation=exports.defaultAnimation=(0,_animations.trigger)('defaultAnimation',[(0,_animations.transition)(defaultOptions.enterState,[(0,_animations.style)(defaultOptions.style.enter.initial),(0,_animations.animate)(defaultOptions.enterDuration||defaultOptions.duration,(0,_animations.style)(defaultOptions.style.enter.final))]),(0,_animations.transition)(defaultOptions.leaveState,[(0,_animations.style)(defaultOptions.style.leave&&defaultOptions.style.leave.initial||defaultOptions.style.enter.final),(0,_animations.animate)(defaultOptions.leaveDuration||defaultOptions.duration,(0,_animations.style)(defaultOptions.style.leave&&defaultOptions.style.leave.final||defaultOptions.style.enter.initial))])]);// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ })
/******/ ]);
});