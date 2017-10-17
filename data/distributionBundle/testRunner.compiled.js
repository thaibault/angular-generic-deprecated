
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
'use strict';
/* !
    region header
    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
/* eslint-disable no-unused-vars */

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (callback, template = '<div></div>', roundTypes = ['full'], productionMode = false, ...additionalParameter) {
    return (0, _test2.default)(function () {
        var _ref = _asyncToGenerator(function* (roundType, targetTechnology, $, ...extraParameter) {
            var _dec,
                _class,
                _this = this;

            // region mocking angular environment
            $('head').append('<base href="/">');
            for (const domNodeSpecification of [{ link: {
                    attributes: {
                        href: 'node_modules/@angular/material/prebuilt-themes/' + 'deeppurple-amber.css',
                        rel: 'stylesheet',
                        type: 'text/css'
                    },
                    inject: window.document.getElementsByTagName('head')[0]
                } }]) {
                const domNodeName = Object.keys(domNodeSpecification)[0];
                const domNode = window.document.createElement(domNodeName);
                for (const name in domNodeSpecification[domNodeName].attributes) if (domNodeSpecification[domNodeName].attributes.hasOwnProperty(name)) domNode.setAttribute(name, domNodeSpecification[domNodeName].attributes[name]);
                domNodeSpecification[domNodeName].inject.appendChild(domNode);
                yield new Promise(function (resolve) {
                    return domNode.addEventListener('load', resolve);
                });
            }
            /*
                NOTE: A working polymorphic angular environment needs some
                assumptions about the global scope, so mocking and initializing
                that environment after a working browser environment is present.
            */
            if (typeof TARGET_TECHNOLOGY === 'string' && TARGET_TECHNOLOGY === 'node') {
                global.window.Reflect = global.Reflect;
                if (!('matchMedia' in global.window)) global.window.matchMedia = function (mediaQuery) {
                    /*
                        NOTE: It is syntactically impossible to return an
                        object literal in functional style.
                    */
                    return {
                        addListener: function addListener() {},
                        matches: true,
                        media: mediaQuery,
                        removeListener: function removeListener() {}
                    };
                };
                process.setMaxListeners(30);
            }
            require('hammerjs');
            const { Component, enableProdMode } = require('@angular/core');
            const { TestBed } = require('@angular/core/testing');
            /**
             * Dummy application root component to test bootstrapping.
             */
            let ApplicationComponent = (_dec = Component({ selector: '#qunit-fixture', template }), _dec(_class = class ApplicationComponent {}) || _class);
            // endregion
            // region test services

            if (typeof callback === 'function') callback = callback.call(this, ApplicationComponent, roundType, targetTechnology, $, ...extraParameter);
            if ('then' in callback) callback = yield callback;
            let result = callback.bootstrap.call(this, ApplicationComponent, roundType, targetTechnology, $, ...extraParameter);
            if ('then' in result) result = yield result;
            if (!Array.isArray(result)) result = [result];
            // / region bootstrap test application
            if (!(typeof DEBUG === 'boolean' && DEBUG) && productionMode) enableProdMode();
            let platform;
            let module;
            if (result[0]) {
                try {
                    platform = (typeof TARGET_TECHNOLOGY === 'string' && TARGET_TECHNOLOGY === 'node' ? require('@angular/platform-server').platformServer : require('@angular/platform-browser-dynamic').platformBrowserDynamic)();
                    module = yield platform.bootstrapModule(result[0]);
                } catch (error) {
                    throw error;
                }
                this.load();
                yield new Promise(function (resolve) {
                    let done = false;
                    _this.moduleDone(function () {
                        if (done) return;
                        done = true;
                        module.destroy();
                        platform.destroy();
                        resolve();
                    });
                });
            }
            // / endregion
            // endregion
            // region test components
            if (result.length < 2) return;
            let parameter;
            if (typeof TARGET_TECHNOLOGY === 'string' && TARGET_TECHNOLOGY === 'node') {
                const { ServerTestingModule, platformServerTesting } = require('@angular/platform-server/testing');
                parameter = [ServerTestingModule, platformServerTesting()];
            } else {
                const {
                    BrowserDynamicTestingModule, platformBrowserDynamicTesting
                } = require('@angular/platform-browser-dynamic/testing');
                parameter = [BrowserDynamicTestingModule, platformBrowserDynamicTesting()];
            }
            TestBed.initTestEnvironment(...parameter).configureTestingModule(result[1]);
            yield TestBed.compileComponents();
            yield callback.component.call(this, TestBed, roundType, targetTechnology, $, ...parameter.concat(result.slice(2)));
            // endregion
        });

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }(), roundTypes, ...additionalParameter);
};

var _test = require('clientnode/test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
/* eslint-disable no-unused-vars */


// NOTE: Only needed for debugging this file.

// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
try {
    module.require('source-map-support/register');
} catch (error) {}
// endregion
// region declaration

// endregion
// region test runner
/**
 * Provides a generic test runner interface.
 * @param callback - A callback to run if test environment is ready.
 * @param template - Template to use as root application component to
 * bootstrap.
 * @param roundTypes - Test types to run.
 * @param productionMode - Indicates whether angular's production mode should
 * be activated in none debug mode.
 * @param additionalParameter - All additional parameter will be forwarded to
 * the underlying clientnode test environment.
 * @returns Whatever the underlying clientnode test runner returns.
 */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxzQkFBTSxFQUFDLG1CQUFELEVBQXNCLHFCQUF0QixLQUErQyxRQUNqRCxrQ0FEaUQsQ0FBckQ7QUFFQSw0QkFBWSxDQUFDLG1CQUFELEVBQXNCLHVCQUF0QixDQUFaO0FBQ0gsYUFQRCxNQU9PO0FBQ0gsc0JBQU07QUFDRiwrQ0FERSxFQUMyQjtBQUQzQixvQkFFRixRQUFRLDJDQUFSLENBRko7QUFHQSw0QkFBWSxDQUNSLDJCQURRLEVBQ3FCLCtCQURyQixDQUFaO0FBRUg7QUFDRCxvQkFBUSxtQkFBUixDQUE0QixHQUFHLFNBQS9CLEVBQTBDLHNCQUExQyxDQUNJLE9BQU8sQ0FBUCxDQURKO0FBRUEsa0JBQU0sUUFBUSxpQkFBUixFQUFOO0FBQ0Esa0JBQU0sU0FBUyxTQUFULENBQW1CLElBQW5CLENBQ0YsSUFERSxFQUNJLE9BREosRUFDYSxTQURiLEVBQ3dCLGdCQUR4QixFQUMwQyxDQUQxQyxFQUM2QyxHQUFHLFVBQVUsTUFBVixDQUM5QyxPQUFPLEtBQVAsQ0FBYSxDQUFiLENBRDhDLENBRGhELENBQU47QUFHQTtBQUNILFNBL0lNOztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBK0lKLFVBL0lJLEVBK0lRLEdBQUcsbUJBL0lYLENBQVA7QUFnSkgsQzs7QUE1S0Q7Ozs7Ozs7QUFEQTs7O0FBRUE7O0FBNEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUEvS0EsSUFBSTtBQUNBLFdBQU8sT0FBUCxDQUFlLDZCQUFmO0FBQ0gsQ0FGRCxDQUVFLE9BQU8sS0FBUCxFQUFjLENBQUU7QUFDbEI7QUFDQTs7QUFHQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdFJ1bm5lci5jb21waWxlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG4vLyAjIS91c3IvYmluL2VudiBub2RlXG4vLyAtKi0gY29kaW5nOiB1dGYtOCAtKi1cbid1c2Ugc3RyaWN0J1xuLyogIVxuICAgIHJlZ2lvbiBoZWFkZXJcbiAgICBDb3B5cmlnaHQgVG9yYmVuIFNpY2tlcnQgKGluZm9bXCJ+YXR+XCJddG9yYmVuLndlYnNpdGUpIDE2LjEyLjIwMTJcblxuICAgIExpY2Vuc2VcbiAgICAtLS0tLS0tXG5cbiAgICBUaGlzIGxpYnJhcnkgd3JpdHRlbiBieSBUb3JiZW4gU2lja2VydCBzdGFuZCB1bmRlciBhIGNyZWF0aXZlIGNvbW1vbnNcbiAgICBuYW1pbmcgMy4wIHVucG9ydGVkIGxpY2Vuc2UuXG4gICAgU2VlIGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LzMuMC9kZWVkLmRlXG4gICAgZW5kcmVnaW9uXG4qL1xuLy8gcmVnaW9uIGltcG9ydHNcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgdHlwZSB7RG9tTm9kZSwgUGxhaW5PYmplY3R9IGZyb20gJ2NsaWVudG5vZGUnXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHJlZ2lzdGVyVGVzdCBmcm9tICdjbGllbnRub2RlL3Rlc3QnXG4vLyBOT1RFOiBPbmx5IG5lZWRlZCBmb3IgZGVidWdnaW5nIHRoaXMgZmlsZS5cbnRyeSB7XG4gICAgbW9kdWxlLnJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlcicpXG59IGNhdGNoIChlcnJvcikge31cbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIGRlY2xhcmF0aW9uXG5kZWNsYXJlIHZhciBERUJVRzpib29sZWFuXG5kZWNsYXJlIHZhciBUQVJHRVRfVEVDSE5PTE9HWTpzdHJpbmdcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIHRlc3QgcnVubmVyXG4vKipcbiAqIFByb3ZpZGVzIGEgZ2VuZXJpYyB0ZXN0IHJ1bm5lciBpbnRlcmZhY2UuXG4gKiBAcGFyYW0gY2FsbGJhY2sgLSBBIGNhbGxiYWNrIHRvIHJ1biBpZiB0ZXN0IGVudmlyb25tZW50IGlzIHJlYWR5LlxuICogQHBhcmFtIHRlbXBsYXRlIC0gVGVtcGxhdGUgdG8gdXNlIGFzIHJvb3QgYXBwbGljYXRpb24gY29tcG9uZW50IHRvXG4gKiBib290c3RyYXAuXG4gKiBAcGFyYW0gcm91bmRUeXBlcyAtIFRlc3QgdHlwZXMgdG8gcnVuLlxuICogQHBhcmFtIHByb2R1Y3Rpb25Nb2RlIC0gSW5kaWNhdGVzIHdoZXRoZXIgYW5ndWxhcidzIHByb2R1Y3Rpb24gbW9kZSBzaG91bGRcbiAqIGJlIGFjdGl2YXRlZCBpbiBub25lIGRlYnVnIG1vZGUuXG4gKiBAcGFyYW0gYWRkaXRpb25hbFBhcmFtZXRlciAtIEFsbCBhZGRpdGlvbmFsIHBhcmFtZXRlciB3aWxsIGJlIGZvcndhcmRlZCB0b1xuICogdGhlIHVuZGVybHlpbmcgY2xpZW50bm9kZSB0ZXN0IGVudmlyb25tZW50LlxuICogQHJldHVybnMgV2hhdGV2ZXIgdGhlIHVuZGVybHlpbmcgY2xpZW50bm9kZSB0ZXN0IHJ1bm5lciByZXR1cm5zLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihcbiAgICBjYWxsYmFjazpGdW5jdGlvbnx7Ym9vdHN0cmFwOkZ1bmN0aW9uO2NvbXBvbmVudDpGdW5jdGlvbn0sXG4gICAgdGVtcGxhdGU6c3RyaW5nID0gJzxkaXY+PC9kaXY+Jywgcm91bmRUeXBlczpBcnJheTxzdHJpbmc+ID0gWydmdWxsJ10sXG4gICAgcHJvZHVjdGlvbk1vZGU6Ym9vbGVhbiA9IGZhbHNlLCAuLi5hZGRpdGlvbmFsUGFyYW1ldGVyOkFycmF5PGFueT5cbik6YW55IHtcbiAgICByZXR1cm4gcmVnaXN0ZXJUZXN0KGFzeW5jIGZ1bmN0aW9uKFxuICAgICAgICByb3VuZFR5cGU6c3RyaW5nLCB0YXJnZXRUZWNobm9sb2d5Oj9zdHJpbmcsICQ6YW55LFxuICAgICAgICAuLi5leHRyYVBhcmFtZXRlcjpBcnJheTxhbnk+XG4gICAgKTpQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gcmVnaW9uIG1vY2tpbmcgYW5ndWxhciBlbnZpcm9ubWVudFxuICAgICAgICAkKCdoZWFkJykuYXBwZW5kKCc8YmFzZSBocmVmPVwiL1wiPicpXG4gICAgICAgIGZvciAoY29uc3QgZG9tTm9kZVNwZWNpZmljYXRpb246UGxhaW5PYmplY3Qgb2YgW1xuICAgICAgICAgICAge2xpbms6IHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhyZWY6ICdub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvcHJlYnVpbHQtdGhlbWVzLycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2RlZXBwdXJwbGUtYW1iZXIuY3NzJyxcbiAgICAgICAgICAgICAgICAgICAgcmVsOiAnc3R5bGVzaGVldCcsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2NzcydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGluamVjdDogd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cbiAgICAgICAgICAgIH19XG4gICAgICAgIF0pIHtcbiAgICAgICAgICAgIGNvbnN0IGRvbU5vZGVOYW1lOnN0cmluZyA9IE9iamVjdC5rZXlzKGRvbU5vZGVTcGVjaWZpY2F0aW9uKVswXVxuICAgICAgICAgICAgY29uc3QgZG9tTm9kZTpEb21Ob2RlID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZG9tTm9kZU5hbWUpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IG5hbWU6c3RyaW5nIGluIGRvbU5vZGVTcGVjaWZpY2F0aW9uW1xuICAgICAgICAgICAgICAgIGRvbU5vZGVOYW1lXG4gICAgICAgICAgICBdLmF0dHJpYnV0ZXMpXG4gICAgICAgICAgICAgICAgaWYgKGRvbU5vZGVTcGVjaWZpY2F0aW9uW1xuICAgICAgICAgICAgICAgICAgICBkb21Ob2RlTmFtZVxuICAgICAgICAgICAgICAgIF0uYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgZG9tTm9kZS5zZXRBdHRyaWJ1dGUobmFtZSwgZG9tTm9kZVNwZWNpZmljYXRpb25bXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21Ob2RlTmFtZVxuICAgICAgICAgICAgICAgICAgICBdLmF0dHJpYnV0ZXNbbmFtZV0pXG4gICAgICAgICAgICBkb21Ob2RlU3BlY2lmaWNhdGlvbltkb21Ob2RlTmFtZV0uaW5qZWN0LmFwcGVuZENoaWxkKGRvbU5vZGUpXG4gICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZTpGdW5jdGlvbik6dm9pZCA9PlxuICAgICAgICAgICAgICAgIGRvbU5vZGUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHJlc29sdmUpKVxuICAgICAgICB9XG4gICAgICAgIC8qXG4gICAgICAgICAgICBOT1RFOiBBIHdvcmtpbmcgcG9seW1vcnBoaWMgYW5ndWxhciBlbnZpcm9ubWVudCBuZWVkcyBzb21lXG4gICAgICAgICAgICBhc3N1bXB0aW9ucyBhYm91dCB0aGUgZ2xvYmFsIHNjb3BlLCBzbyBtb2NraW5nIGFuZCBpbml0aWFsaXppbmdcbiAgICAgICAgICAgIHRoYXQgZW52aXJvbm1lbnQgYWZ0ZXIgYSB3b3JraW5nIGJyb3dzZXIgZW52aXJvbm1lbnQgaXMgcHJlc2VudC5cbiAgICAgICAgKi9cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIFRBUkdFVF9URUNITk9MT0dZID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgVEFSR0VUX1RFQ0hOT0xPR1kgPT09ICdub2RlJ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIGdsb2JhbC53aW5kb3cuUmVmbGVjdCA9IGdsb2JhbC5SZWZsZWN0XG4gICAgICAgICAgICBpZiAoISgnbWF0Y2hNZWRpYScgaW4gZ2xvYmFsLndpbmRvdykpXG4gICAgICAgICAgICAgICAgZ2xvYmFsLndpbmRvdy5tYXRjaE1lZGlhID0gKG1lZGlhUXVlcnk6c3RyaW5nKTp7XG4gICAgICAgICAgICAgICAgICAgIGFkZExpc3RlbmVyOkZ1bmN0aW9uO1xuICAgICAgICAgICAgICAgICAgICBtYXRjaGVzOmJvb2xlYW47XG4gICAgICAgICAgICAgICAgICAgIG1lZGlhOnN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTGlzdGVuZXI6RnVuY3Rpb247XG4gICAgICAgICAgICAgICAgfSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAgICBOT1RFOiBJdCBpcyBzeW50YWN0aWNhbGx5IGltcG9zc2libGUgdG8gcmV0dXJuIGFuXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgbGl0ZXJhbCBpbiBmdW5jdGlvbmFsIHN0eWxlLlxuICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTGlzdGVuZXI6ICgpOnZvaWQgPT4ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVkaWE6IG1lZGlhUXVlcnksXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMaXN0ZW5lcjogKCk6dm9pZCA9PiB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvY2Vzcy5zZXRNYXhMaXN0ZW5lcnMoMzApXG4gICAgICAgIH1cbiAgICAgICAgcmVxdWlyZSgnaGFtbWVyanMnKVxuICAgICAgICBjb25zdCB7Q29tcG9uZW50LCBlbmFibGVQcm9kTW9kZX0gPSByZXF1aXJlKCdAYW5ndWxhci9jb3JlJylcbiAgICAgICAgY29uc3Qge1Rlc3RCZWR9ID0gcmVxdWlyZSgnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJylcbiAgICAgICAgLyoqXG4gICAgICAgICAqIER1bW15IGFwcGxpY2F0aW9uIHJvb3QgY29tcG9uZW50IHRvIHRlc3QgYm9vdHN0cmFwcGluZy5cbiAgICAgICAgICovXG4gICAgICAgIEBDb21wb25lbnQoe3NlbGVjdG9yOiAnI3F1bml0LWZpeHR1cmUnLCB0ZW1wbGF0ZX0pXG4gICAgICAgIGNsYXNzIEFwcGxpY2F0aW9uQ29tcG9uZW50IHt9XG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgICAgICAvLyByZWdpb24gdGVzdCBzZXJ2aWNlc1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjay5jYWxsKFxuICAgICAgICAgICAgICAgIHRoaXMsIEFwcGxpY2F0aW9uQ29tcG9uZW50LCByb3VuZFR5cGUsIHRhcmdldFRlY2hub2xvZ3ksICQsXG4gICAgICAgICAgICAgICAgLi4uZXh0cmFQYXJhbWV0ZXIpXG4gICAgICAgIGlmICgndGhlbicgaW4gY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjayA9IGF3YWl0IGNhbGxiYWNrXG4gICAgICAgIGxldCByZXN1bHQ6YW55ID0gY2FsbGJhY2suYm9vdHN0cmFwLmNhbGwoXG4gICAgICAgICAgICB0aGlzLCBBcHBsaWNhdGlvbkNvbXBvbmVudCwgcm91bmRUeXBlLCB0YXJnZXRUZWNobm9sb2d5LCAkLFxuICAgICAgICAgICAgLi4uZXh0cmFQYXJhbWV0ZXIpXG4gICAgICAgIGlmICgndGhlbicgaW4gcmVzdWx0KVxuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgcmVzdWx0XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZXN1bHQpKVxuICAgICAgICAgICAgcmVzdWx0ID0gW3Jlc3VsdF1cbiAgICAgICAgLy8gLyByZWdpb24gYm9vdHN0cmFwIHRlc3QgYXBwbGljYXRpb25cbiAgICAgICAgaWYgKCEodHlwZW9mIERFQlVHID09PSAnYm9vbGVhbicgJiYgREVCVUcpICYmIHByb2R1Y3Rpb25Nb2RlKVxuICAgICAgICAgICAgZW5hYmxlUHJvZE1vZGUoKVxuICAgICAgICBsZXQgcGxhdGZvcm06T2JqZWN0XG4gICAgICAgIGxldCBtb2R1bGU6T2JqZWN0XG4gICAgICAgIGlmIChyZXN1bHRbMF0pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGxhdGZvcm0gPSAoKFxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgVEFSR0VUX1RFQ0hOT0xPR1kgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICAgICAgICAgIFRBUkdFVF9URUNITk9MT0dZID09PSAnbm9kZSdcbiAgICAgICAgICAgICAgICApID8gcmVxdWlyZSgnQGFuZ3VsYXIvcGxhdGZvcm0tc2VydmVyJykucGxhdGZvcm1TZXJ2ZXIgOlxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYydcbiAgICAgICAgICAgICAgICAgICAgKS5wbGF0Zm9ybUJyb3dzZXJEeW5hbWljKSgpXG4gICAgICAgICAgICAgICAgbW9kdWxlID0gYXdhaXQgcGxhdGZvcm0uYm9vdHN0cmFwTW9kdWxlKHJlc3VsdFswXSlcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9hZCgpXG4gICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZTpGdW5jdGlvbik6dm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGRvbmU6Ym9vbGVhbiA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVEb25lKCgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBtb2R1bGUuZGVzdHJveSgpXG4gICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtLmRlc3Ryb3koKVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICAvLyAvIGVuZHJlZ2lvblxuICAgICAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgLy8gcmVnaW9uIHRlc3QgY29tcG9uZW50c1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA8IDIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgbGV0IHBhcmFtZXRlcjpBcnJheTxPYmplY3Q+XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgICAgIFRBUkdFVF9URUNITk9MT0dZID09PSAnbm9kZSdcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCB7U2VydmVyVGVzdGluZ01vZHVsZSwgcGxhdGZvcm1TZXJ2ZXJUZXN0aW5nfSA9IHJlcXVpcmUoXG4gICAgICAgICAgICAgICAgJ0Bhbmd1bGFyL3BsYXRmb3JtLXNlcnZlci90ZXN0aW5nJylcbiAgICAgICAgICAgIHBhcmFtZXRlciA9IFtTZXJ2ZXJUZXN0aW5nTW9kdWxlLCBwbGF0Zm9ybVNlcnZlclRlc3RpbmcoKV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBCcm93c2VyRHluYW1pY1Rlc3RpbmdNb2R1bGUsIHBsYXRmb3JtQnJvd3NlckR5bmFtaWNUZXN0aW5nXG4gICAgICAgICAgICB9ID0gcmVxdWlyZSgnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3Rlc3RpbmcnKVxuICAgICAgICAgICAgcGFyYW1ldGVyID0gW1xuICAgICAgICAgICAgICAgIEJyb3dzZXJEeW5hbWljVGVzdGluZ01vZHVsZSwgcGxhdGZvcm1Ccm93c2VyRHluYW1pY1Rlc3RpbmcoKV1cbiAgICAgICAgfVxuICAgICAgICBUZXN0QmVkLmluaXRUZXN0RW52aXJvbm1lbnQoLi4ucGFyYW1ldGVyKS5jb25maWd1cmVUZXN0aW5nTW9kdWxlKFxuICAgICAgICAgICAgcmVzdWx0WzFdKVxuICAgICAgICBhd2FpdCBUZXN0QmVkLmNvbXBpbGVDb21wb25lbnRzKClcbiAgICAgICAgYXdhaXQgY2FsbGJhY2suY29tcG9uZW50LmNhbGwoXG4gICAgICAgICAgICB0aGlzLCBUZXN0QmVkLCByb3VuZFR5cGUsIHRhcmdldFRlY2hub2xvZ3ksICQsIC4uLnBhcmFtZXRlci5jb25jYXQoXG4gICAgICAgICAgICAgICAgcmVzdWx0LnNsaWNlKDIpKSlcbiAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgfSwgcm91bmRUeXBlcywgLi4uYWRkaXRpb25hbFBhcmFtZXRlcilcbn1cbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIHZpbSBtb2RsaW5lXG4vLyB2aW06IHNldCB0YWJzdG9wPTQgc2hpZnR3aWR0aD00IGV4cGFuZHRhYjpcbi8vIHZpbTogZm9sZG1ldGhvZD1tYXJrZXIgZm9sZG1hcmtlcj1yZWdpb24sZW5kcmVnaW9uOlxuLy8gZW5kcmVnaW9uXG4iXX0=