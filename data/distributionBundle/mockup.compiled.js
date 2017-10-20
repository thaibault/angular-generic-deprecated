'use strict';
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/router"), require("rxjs"), require("rxjs/BehaviorSubject"));
	else if(typeof define === 'function' && define.amd)
		define("mockup", ["@angular/core", "@angular/router", "rxjs", "rxjs/BehaviorSubject"], factory);
	else if(typeof exports === 'object')
		exports["mockup"] = factory(require("@angular/core"), require("@angular/router"), require("rxjs"), require("rxjs/BehaviorSubject"));
	else
		root["mockup"] = factory(root["@angular/core"], root["@angular/router"], root["rxjs"], root["rxjs/BehaviorSubject"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_20__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// #!/usr/bin/env node
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
Object.defineProperty(exports,'__esModule',{value:true});exports.RouterOutletStubComponent=exports.RouterLinkStubDirective=exports.ActivatedRouteStub=exports.RouterStub=exports.dummyEvent=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _dec,_class,_dec2,_class3,_dec3,_dec4,_class5,_desc,_value,_class6,_descriptor,_dec5,_class8;exports.getNativeEvent=getNativeEvent;var _core=__webpack_require__(0);var _router=__webpack_require__(1);var _rxjs=__webpack_require__(2);var _BehaviorSubject=__webpack_require__(20);function _initDefineProp(target,property,descriptor,context){if(!descriptor)return;Object.defineProperty(target,property,{enumerable:descriptor.enumerable,configurable:descriptor.configurable,writable:descriptor.writable,value:descriptor.initializer?descriptor.initializer.call(context):void 0})}function _applyDecoratedDescriptor(target,property,decorators,descriptor,context){var desc={};Object['ke'+'ys'](descriptor).forEach(function(key){desc[key]=descriptor[key]});desc.enumerable=!!desc.enumerable;desc.configurable=!!desc.configurable;if('value'in desc||desc.initializer){desc.writable=true}desc=decorators.slice().reverse().reduce(function(desc,decorator){return decorator(target,property,desc)||desc},desc);if(context&&desc.initializer!==void 0){desc.value=desc.initializer?desc.initializer.call(context):void 0;desc.initializer=undefined}if(desc.initializer===void 0){Object['define'+'Property'](target,property,desc);desc=null}return desc}function _initializerWarningHelper(descriptor,context){throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.')}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}// endregion
// region native
/**
 * Creates a document event.
 * @param name - Event name.
 * @param bubbles - Indicates if the event should be forwarded to parent dom
 * nodes.
 * @param cancelable - Indicates weather child node can prevent further event
 * handler callback to be triggered from parent dom nodes.
 * @returns The newly generated event.
 */function getNativeEvent(name){var bubbles=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var cancelable=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var event=document.createEvent('CustomEvent');event.initCustomEvent(name,bubbles,cancelable,null);return event}var dummyEvent=exports.dummyEvent={preventDefault:function preventDefault(){}// endregion
// region services
// IgnoreTypeCheck
};/**
 * Mocks the router.
 */var RouterStub=exports.RouterStub=(_dec=(0,_core.Injectable)(),_dec(_class=function(){function RouterStub(){_classCallCheck(this,RouterStub);this.events=new _rxjs.Subject;this.url=this.url}_createClass(RouterStub,[{key:'navigate',/* eslint-disable no-unused-vars *//**
     * Mocks the imperative router navigation method.
     * @param commands - New route parameter.
     * @param extras - Defines new route meta data.
     * @returns Nothing.
     */value:function navigate(commands,extras){this.url=commands.join('/')}/**
     * Mocks the imperative router navigation method.
     * @param url - URL to emulate section switch to.
     * @returns Nothing.
     */},{key:'navigateByUrl',value:function navigateByUrl(url){this.url=url}/* eslint-enable no-unused-vars */}]);return RouterStub}())||_class);// IgnoreTypeCheck
/**
 * Mocks the current route data instance.
 */var ActivatedRouteStub=exports.ActivatedRouteStub=(_dec2=(0,_core.Injectable)(),_dec2(_class3=function(){function ActivatedRouteStub(){_classCallCheck(this,ActivatedRouteStub);this._data={};this._parameter={};this.dataSubject=new _BehaviorSubject.BehaviorSubject(this._data);this.data=this.dataSubject.asObservable();this.parameterSubject=new _BehaviorSubject.BehaviorSubject(this._parameter);this.params=this.parameterSubject.asObservable()}_createClass(ActivatedRouteStub,[{key:'testData',/**
     * Setter for test data property value.
     * @param data - Sets data of current route.
     * @returns Nothing.
     */set:function set(data){this._data=data;this.dataSubject.next(data)}/**
     * Setter for test parameter property value.
     * @param parameter - Sets parameter of current route.
     * @returns Nothing.
     */},{key:'testParameter',set:function set(parameter){this._parameter=parameter;this.parameterSubject.next(this._parameter)}/**
     * Getter for route parameter property value.
     * @returns The current routing state.
     */},{key:'snapshot',get:function get(){return{data:this._data,params:this._parameter}}}]);return ActivatedRouteStub}())||_class3);// endregion
// region directives
// IgnoreTypeCheck
/**
 * Mocks the router link directive.
 */var RouterLinkStubDirective=exports.RouterLinkStubDirective=(_dec3=(0,_core.Directive)({selector:'[routerLink]',host:{'(click)':'onClick()'}}),_dec4=(0,_core.Input)('routerLink'),_dec3(_class5=(_class6=function(){function RouterLinkStubDirective(){_classCallCheck(this,RouterLinkStubDirective);_initDefineProp(this,'linkParameter',_descriptor,this);this.navigatedTo=null}_createClass(RouterLinkStubDirective,[{key:'onClick',/**
     * Mocks the click event on route links.
     * @returns Nothing.
     */value:function onClick(){this.navigatedTo=this.linkParameter}}]);return RouterLinkStubDirective}(),(_descriptor=_applyDecoratedDescriptor(_class6.prototype,'linkParameter',[_dec4],{enumerable:true,initializer:function initializer(){return this.linkParameter}})),_class6))||_class5);// endregion
// region components
// IgnoreTypeCheck
/**
 * Mocks the router outlet component.
 */var RouterOutletStubComponent=exports.RouterOutletStubComponent=(_dec5=(0,_core.Component)({selector:'router-outlet',template:''}),_dec5(_class8=function RouterOutletStubComponent(){_classCallCheck(this,RouterOutletStubComponent)})||_class8);// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_20__;

/***/ })

/******/ });
});