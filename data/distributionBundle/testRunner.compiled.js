
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
exports.registerAngularTest = registerAngularTest;

var _test = require('clientnode/test');

var _test2 = _interopRequireDefault(_test);

var _mockup = require('./mockup');

var _mockup2 = _interopRequireDefault(_mockup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
/* eslint-disable no-unused-vars */


// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register');
} catch (error) {}

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

// endregion
// region declaration
function registerAngularTest(callback) {
    var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '<div></div>';
    var roundTypes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['full'];
    var productionMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    for (var _len = arguments.length, additionalParameter = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
        additionalParameter[_key - 4] = arguments[_key];
    }

    return _test2.default.apply(undefined, [function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(roundType, targetTechnology, $) {
            var _dec,
                _class,
                _callback,
                _callback$bootstrap,
                _this = this,
                _callback$component;

            for (var _len2 = arguments.length, extraParameter = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
                extraParameter[_key2 - 3] = arguments[_key2];
            }

            var domNodeSpecification, domNodeName, domNode, name, _require, Component, enableProdMode, _require2, TestBed, ApplicationComponent, result, platform, module, parameter, _require3, ServerTestingModule, platformServerTesting, _require4, BrowserDynamicTestingModule, platformBrowserDynamicTesting;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            // region mocking angular environment
                            /*
                                NOTE: A working polymorphic angular environment needs some
                                assumptions about the global scope, so mocking and initializing
                                that environment after a working browser environment is present.
                            */
                            $('head').append('<base href="/">');

                            if (!(typeof TARGET_TECHNOLOGY === 'string')) {
                                _context.next = 11;
                                break;
                            }

                            if (!(TARGET_TECHNOLOGY === 'web')) {
                                _context.next = 10;
                                break;
                            }

                            domNodeSpecification = { link: {
                                    attributes: {
                                        href: 'node_modules/@angular/material/' + 'prebuilt-themes/deeppurple-amber.css',
                                        rel: 'stylesheet',
                                        type: 'text/css'
                                    },
                                    inject: window.document.getElementsByTagName('head')[0]
                                } };
                            domNodeName = Object.keys(domNodeSpecification)[0];
                            domNode = window.document.createElement(domNodeName);

                            for (name in domNodeSpecification[domNodeName].attributes) {
                                if (domNodeSpecification[domNodeName].attributes.hasOwnProperty(name)) domNode.setAttribute(name, domNodeSpecification[domNodeName].attributes[name]);
                            }domNodeSpecification[domNodeName].inject.appendChild(domNode);
                            _context.next = 10;
                            return new Promise(function (resolve) {
                                return domNode.addEventListener('load', resolve);
                            });

                        case 10:
                            if (TARGET_TECHNOLOGY === 'node') {
                                global.window.Reflect = global.Reflect;
                                global.Event = _mockup2.default;
                                if (!('CSS' in global)) global.CSS = true;
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
                                if (!('navigator' in global)) global.navigator = { userAgent: 'node' };
                                process.setMaxListeners(30);
                            }

                        case 11:
                            require('hammerjs');
                            _require = require('@angular/core'), Component = _require.Component, enableProdMode = _require.enableProdMode;
                            _require2 = require('@angular/core/testing'), TestBed = _require2.TestBed;
                            /* eslint-disable require-jsdoc */
                            // IgnoreTypeCheck

                            /* eslint-enable require-jsdoc */
                            /**
                             * Dummy application root component to test bootstrapping.
                             */
                            ApplicationComponent = (_dec = Component({ selector: '#qunit-fixture', template: template }), _dec(_class = function ApplicationComponent() {
                                _classCallCheck(this, ApplicationComponent);
                            }) || _class);
                            // endregion
                            // region test services

                            if (typeof callback === 'function') callback = (_callback = callback).call.apply(_callback, [this, ApplicationComponent, roundType, targetTechnology, $].concat(extraParameter));

                            if (!('then' in callback)) {
                                _context.next = 20;
                                break;
                            }

                            _context.next = 19;
                            return callback;

                        case 19:
                            callback = _context.sent;

                        case 20:
                            result = (_callback$bootstrap = callback.bootstrap).call.apply(_callback$bootstrap, [this, ApplicationComponent, roundType, targetTechnology, $].concat(extraParameter));

                            if (!('then' in result)) {
                                _context.next = 25;
                                break;
                            }

                            _context.next = 24;
                            return result;

                        case 24:
                            result = _context.sent;

                        case 25:
                            if (!Array.isArray(result)) result = [result];
                            // / region bootstrap test application
                            if (!(typeof DEBUG === 'boolean' && DEBUG) && productionMode) enableProdMode();
                            platform = void 0;
                            module = void 0;

                            if (!result[0]) {
                                _context.next = 43;
                                break;
                            }

                            _context.prev = 30;

                            platform = (typeof TARGET_TECHNOLOGY === 'string' && TARGET_TECHNOLOGY === 'node' ? require('@angular/platform-server').platformDynamicServer : require('@angular/platform-browser-dynamic').platformBrowserDynamic)();
                            _context.next = 34;
                            return platform.bootstrapModule(result[0]);

                        case 34:
                            module = _context.sent;
                            _context.next = 40;
                            break;

                        case 37:
                            _context.prev = 37;
                            _context.t0 = _context['catch'](30);
                            throw _context.t0;

                        case 40:
                            this.load();
                            _context.next = 43;
                            return new Promise(function (resolve) {
                                var done = false;
                                _this.moduleDone(function () {
                                    if (done) return;
                                    done = true;
                                    module.destroy();
                                    platform.destroy();
                                    resolve();
                                });
                            });

                        case 43:
                            if (!(result.length < 2)) {
                                _context.next = 45;
                                break;
                            }

                            return _context.abrupt('return');

                        case 45:
                            parameter = void 0;

                            if (typeof TARGET_TECHNOLOGY === 'string' && TARGET_TECHNOLOGY === 'node') {
                                _require3 = require('@angular/platform-server/testing'), ServerTestingModule = _require3.ServerTestingModule, platformServerTesting = _require3.platformServerTesting;

                                parameter = [ServerTestingModule, platformServerTesting()];
                            } else {
                                _require4 = require('@angular/platform-browser-dynamic/testing'), BrowserDynamicTestingModule = _require4.BrowserDynamicTestingModule, platformBrowserDynamicTesting = _require4.platformBrowserDynamicTesting;

                                parameter = [BrowserDynamicTestingModule, platformBrowserDynamicTesting()];
                            }
                            TestBed.initTestEnvironment.apply(TestBed, _toConsumableArray(parameter)).configureTestingModule(result[1]);
                            _context.next = 50;
                            return TestBed.compileComponents();

                        case 50:
                            _context.next = 52;
                            return (_callback$component = callback.component).call.apply(_callback$component, [this, TestBed, roundType, targetTechnology, $].concat(_toConsumableArray(parameter.concat(result.slice(2)))));

                        case 52:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[30, 37]]);
        }));

        return function (_x4, _x5, _x6) {
            return _ref.apply(this, arguments);
        };
    }(), roundTypes].concat(additionalParameter));
}
exports.default = registerAngularTest;
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBWjtBQUVIO0FBQ0Qsb0NBQVEsbUJBQVIsbUNBQStCLFNBQS9CLEdBQTBDLHNCQUExQyxDQUNJLE9BQU8sQ0FBUCxDQURKO0FBL0lnQjtBQUFBLG1DQWlKVixRQUFRLGlCQUFSLEVBakpVOztBQUFBO0FBQUE7QUFBQSxtQ0FrSlYsZ0NBQVMsU0FBVCxFQUFtQixJQUFuQiw2QkFDRixJQURFLEVBQ0ksT0FESixFQUNhLFNBRGIsRUFDd0IsZ0JBRHhCLEVBQzBDLENBRDFDLDRCQUNnRCxVQUFVLE1BQVYsQ0FDOUMsT0FBTyxLQUFQLENBQWEsQ0FBYixDQUQ4QyxDQURoRCxHQWxKVTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFiOztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBc0pKLFVBdEpJLFNBc0pXLG1CQXRKWCxFQUFQO0FBdUpIO2tCQUNjLG1CO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0ZXN0UnVubmVyLmNvbXBpbGVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbi8vICMhL3Vzci9iaW4vZW52IG5vZGVcbi8vIC0qLSBjb2Rpbmc6IHV0Zi04IC0qLVxuJ3VzZSBzdHJpY3QnXG4vKiAhXG4gICAgcmVnaW9uIGhlYWRlclxuICAgIENvcHlyaWdodCBUb3JiZW4gU2lja2VydCAoaW5mb1tcIn5hdH5cIl10b3JiZW4ud2Vic2l0ZSkgMTYuMTIuMjAxMlxuXG4gICAgTGljZW5zZVxuICAgIC0tLS0tLS1cblxuICAgIFRoaXMgbGlicmFyeSB3cml0dGVuIGJ5IFRvcmJlbiBTaWNrZXJ0IHN0YW5kIHVuZGVyIGEgY3JlYXRpdmUgY29tbW9uc1xuICAgIG5hbWluZyAzLjAgdW5wb3J0ZWQgbGljZW5zZS5cbiAgICBTZWUgaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnkvMy4wL2RlZWQuZGVcbiAgICBlbmRyZWdpb25cbiovXG4vLyByZWdpb24gaW1wb3J0c1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB0eXBlIHtEb21Ob2RlLCBQbGFpbk9iamVjdH0gZnJvbSAnY2xpZW50bm9kZSdcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgcmVnaXN0ZXJUZXN0IGZyb20gJ2NsaWVudG5vZGUvdGVzdCdcbi8vIE5PVEU6IE9ubHkgbmVlZGVkIGZvciBkZWJ1Z2dpbmcgdGhpcyBmaWxlLlxudHJ5IHtcbiAgICBtb2R1bGUucmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJylcbn0gY2F0Y2ggKGVycm9yKSB7fVxuXG5pbXBvcnQgZHVtbXlFdmVudCBmcm9tICcuL21vY2t1cCdcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIGRlY2xhcmF0aW9uXG5kZWNsYXJlIHZhciBERUJVRzpib29sZWFuXG5kZWNsYXJlIHZhciBUQVJHRVRfVEVDSE5PTE9HWTpzdHJpbmdcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIHRlc3QgcnVubmVyXG4vKipcbiAqIFByb3ZpZGVzIGEgZ2VuZXJpYyB0ZXN0IHJ1bm5lciBpbnRlcmZhY2UuXG4gKiBAcGFyYW0gY2FsbGJhY2sgLSBBIGNhbGxiYWNrIHRvIHJ1biBpZiB0ZXN0IGVudmlyb25tZW50IGlzIHJlYWR5LlxuICogQHBhcmFtIHRlbXBsYXRlIC0gVGVtcGxhdGUgdG8gdXNlIGFzIHJvb3QgYXBwbGljYXRpb24gY29tcG9uZW50IHRvXG4gKiBib290c3RyYXAuXG4gKiBAcGFyYW0gcm91bmRUeXBlcyAtIFRlc3QgdHlwZXMgdG8gcnVuLlxuICogQHBhcmFtIHByb2R1Y3Rpb25Nb2RlIC0gSW5kaWNhdGVzIHdoZXRoZXIgYW5ndWxhcidzIHByb2R1Y3Rpb24gbW9kZSBzaG91bGRcbiAqIGJlIGFjdGl2YXRlZCBpbiBub25lIGRlYnVnIG1vZGUuXG4gKiBAcGFyYW0gYWRkaXRpb25hbFBhcmFtZXRlciAtIEFsbCBhZGRpdGlvbmFsIHBhcmFtZXRlciB3aWxsIGJlIGZvcndhcmRlZCB0b1xuICogdGhlIHVuZGVybHlpbmcgY2xpZW50bm9kZSB0ZXN0IGVudmlyb25tZW50LlxuICogQHJldHVybnMgV2hhdGV2ZXIgdGhlIHVuZGVybHlpbmcgY2xpZW50bm9kZSB0ZXN0IHJ1bm5lciByZXR1cm5zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJBbmd1bGFyVGVzdChcbiAgICBjYWxsYmFjazpGdW5jdGlvbnx7Ym9vdHN0cmFwOkZ1bmN0aW9uO2NvbXBvbmVudDpGdW5jdGlvbn0sXG4gICAgdGVtcGxhdGU6c3RyaW5nID0gJzxkaXY+PC9kaXY+Jywgcm91bmRUeXBlczpBcnJheTxzdHJpbmc+ID0gWydmdWxsJ10sXG4gICAgcHJvZHVjdGlvbk1vZGU6Ym9vbGVhbiA9IGZhbHNlLCAuLi5hZGRpdGlvbmFsUGFyYW1ldGVyOkFycmF5PGFueT5cbik6YW55IHtcbiAgICByZXR1cm4gcmVnaXN0ZXJUZXN0KGFzeW5jIGZ1bmN0aW9uKFxuICAgICAgICByb3VuZFR5cGU6c3RyaW5nLCB0YXJnZXRUZWNobm9sb2d5Oj9zdHJpbmcsICQ6YW55LFxuICAgICAgICAuLi5leHRyYVBhcmFtZXRlcjpBcnJheTxhbnk+XG4gICAgKTpQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gcmVnaW9uIG1vY2tpbmcgYW5ndWxhciBlbnZpcm9ubWVudFxuICAgICAgICAvKlxuICAgICAgICAgICAgTk9URTogQSB3b3JraW5nIHBvbHltb3JwaGljIGFuZ3VsYXIgZW52aXJvbm1lbnQgbmVlZHMgc29tZVxuICAgICAgICAgICAgYXNzdW1wdGlvbnMgYWJvdXQgdGhlIGdsb2JhbCBzY29wZSwgc28gbW9ja2luZyBhbmQgaW5pdGlhbGl6aW5nXG4gICAgICAgICAgICB0aGF0IGVudmlyb25tZW50IGFmdGVyIGEgd29ya2luZyBicm93c2VyIGVudmlyb25tZW50IGlzIHByZXNlbnQuXG4gICAgICAgICovXG4gICAgICAgICQoJ2hlYWQnKS5hcHBlbmQoJzxiYXNlIGhyZWY9XCIvXCI+JylcbiAgICAgICAgaWYgKHR5cGVvZiBUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ3dlYicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkb21Ob2RlU3BlY2lmaWNhdGlvbjpQbGFpbk9iamVjdCA9IHtsaW5rOiB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICdub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ByZWJ1aWx0LXRoZW1lcy9kZWVwcHVycGxlLWFtYmVyLmNzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWw6ICdzdHlsZXNoZWV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2NzcydcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0OiB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgY29uc3QgZG9tTm9kZU5hbWU6c3RyaW5nID0gT2JqZWN0LmtleXMoZG9tTm9kZVNwZWNpZmljYXRpb24pWzBdXG4gICAgICAgICAgICAgICAgY29uc3QgZG9tTm9kZTpEb21Ob2RlID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIGRvbU5vZGVOYW1lKVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmFtZTpzdHJpbmcgaW4gZG9tTm9kZVNwZWNpZmljYXRpb25bXG4gICAgICAgICAgICAgICAgICAgIGRvbU5vZGVOYW1lXG4gICAgICAgICAgICAgICAgXS5hdHRyaWJ1dGVzKVxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9tTm9kZVNwZWNpZmljYXRpb25bXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21Ob2RlTmFtZVxuICAgICAgICAgICAgICAgICAgICBdLmF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21Ob2RlLnNldEF0dHJpYnV0ZShuYW1lLCBkb21Ob2RlU3BlY2lmaWNhdGlvbltcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Ob2RlTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgXS5hdHRyaWJ1dGVzW25hbWVdKVxuICAgICAgICAgICAgICAgIGRvbU5vZGVTcGVjaWZpY2F0aW9uW2RvbU5vZGVOYW1lXS5pbmplY3QuYXBwZW5kQ2hpbGQoZG9tTm9kZSlcbiAgICAgICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZTpGdW5jdGlvbik6dm9pZCA9PlxuICAgICAgICAgICAgICAgICAgICBkb21Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByZXNvbHZlKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ25vZGUnKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsLndpbmRvdy5SZWZsZWN0ID0gZ2xvYmFsLlJlZmxlY3RcbiAgICAgICAgICAgICAgICBnbG9iYWwuRXZlbnQgPSBkdW1teUV2ZW50XG4gICAgICAgICAgICAgICAgaWYgKCEoJ0NTUycgaW4gZ2xvYmFsKSlcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLkNTUyA9IHRydWVcbiAgICAgICAgICAgICAgICBpZiAoISgnbWF0Y2hNZWRpYScgaW4gZ2xvYmFsLndpbmRvdykpXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC53aW5kb3cubWF0Y2hNZWRpYSA9IChtZWRpYVF1ZXJ5OnN0cmluZyk6e1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTGlzdGVuZXI6RnVuY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzOmJvb2xlYW47XG4gICAgICAgICAgICAgICAgICAgICAgICBtZWRpYTpzdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMaXN0ZW5lcjpGdW5jdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5PVEU6IEl0IGlzIHN5bnRhY3RpY2FsbHkgaW1wb3NzaWJsZSB0byByZXR1cm4gYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgbGl0ZXJhbCBpbiBmdW5jdGlvbmFsIHN0eWxlLlxuICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkTGlzdGVuZXI6ICgpOnZvaWQgPT4ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWRpYTogbWVkaWFRdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMaXN0ZW5lcjogKCk6dm9pZCA9PiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEoJ25hdmlnYXRvcicgaW4gZ2xvYmFsKSlcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLm5hdmlnYXRvciA9IHt1c2VyQWdlbnQ6ICdub2RlJ31cbiAgICAgICAgICAgICAgICBwcm9jZXNzLnNldE1heExpc3RlbmVycygzMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXF1aXJlKCdoYW1tZXJqcycpXG4gICAgICAgIGNvbnN0IHtDb21wb25lbnQsIGVuYWJsZVByb2RNb2RlfSA9IHJlcXVpcmUoJ0Bhbmd1bGFyL2NvcmUnKVxuICAgICAgICBjb25zdCB7VGVzdEJlZH0gPSByZXF1aXJlKCdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnKVxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSByZXF1aXJlLWpzZG9jICovXG4gICAgICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICAgICBAQ29tcG9uZW50KHtzZWxlY3RvcjogJyNxdW5pdC1maXh0dXJlJywgdGVtcGxhdGV9KVxuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIHJlcXVpcmUtanNkb2MgKi9cbiAgICAgICAgLyoqXG4gICAgICAgICAqIER1bW15IGFwcGxpY2F0aW9uIHJvb3QgY29tcG9uZW50IHRvIHRlc3QgYm9vdHN0cmFwcGluZy5cbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzIEFwcGxpY2F0aW9uQ29tcG9uZW50IHt9XG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgICAgICAvLyByZWdpb24gdGVzdCBzZXJ2aWNlc1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjay5jYWxsKFxuICAgICAgICAgICAgICAgIHRoaXMsIEFwcGxpY2F0aW9uQ29tcG9uZW50LCByb3VuZFR5cGUsIHRhcmdldFRlY2hub2xvZ3ksICQsXG4gICAgICAgICAgICAgICAgLi4uZXh0cmFQYXJhbWV0ZXIpXG4gICAgICAgIGlmICgndGhlbicgaW4gY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjayA9IGF3YWl0IGNhbGxiYWNrXG4gICAgICAgIGxldCByZXN1bHQ6YW55ID0gY2FsbGJhY2suYm9vdHN0cmFwLmNhbGwoXG4gICAgICAgICAgICB0aGlzLCBBcHBsaWNhdGlvbkNvbXBvbmVudCwgcm91bmRUeXBlLCB0YXJnZXRUZWNobm9sb2d5LCAkLFxuICAgICAgICAgICAgLi4uZXh0cmFQYXJhbWV0ZXIpXG4gICAgICAgIGlmICgndGhlbicgaW4gcmVzdWx0KVxuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgcmVzdWx0XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZXN1bHQpKVxuICAgICAgICAgICAgcmVzdWx0ID0gW3Jlc3VsdF1cbiAgICAgICAgLy8gLyByZWdpb24gYm9vdHN0cmFwIHRlc3QgYXBwbGljYXRpb25cbiAgICAgICAgaWYgKCEodHlwZW9mIERFQlVHID09PSAnYm9vbGVhbicgJiYgREVCVUcpICYmIHByb2R1Y3Rpb25Nb2RlKVxuICAgICAgICAgICAgZW5hYmxlUHJvZE1vZGUoKVxuICAgICAgICBsZXQgcGxhdGZvcm06T2JqZWN0XG4gICAgICAgIGxldCBtb2R1bGU6T2JqZWN0XG4gICAgICAgIGlmIChyZXN1bHRbMF0pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGxhdGZvcm0gPSAoKFxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgVEFSR0VUX1RFQ0hOT0xPR1kgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICAgICAgICAgIFRBUkdFVF9URUNITk9MT0dZID09PSAnbm9kZSdcbiAgICAgICAgICAgICAgICApID8gcmVxdWlyZSgnQGFuZ3VsYXIvcGxhdGZvcm0tc2VydmVyJykucGxhdGZvcm1EeW5hbWljU2VydmVyIDpcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZShcbiAgICAgICAgICAgICAgICAgICAgICAgICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnXG4gICAgICAgICAgICAgICAgICAgICkucGxhdGZvcm1Ccm93c2VyRHluYW1pYykoKVxuICAgICAgICAgICAgICAgIG1vZHVsZSA9IGF3YWl0IHBsYXRmb3JtLmJvb3RzdHJhcE1vZHVsZShyZXN1bHRbMF0pXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvYWQoKVxuICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmU6RnVuY3Rpb24pOnZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBkb25lOmJvb2xlYW4gPSBmYWxzZVxuICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlRG9uZSgoKTp2b2lkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvbmUpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgbW9kdWxlLmRlc3Ryb3koKVxuICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybS5kZXN0cm95KClcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgLy8gLyBlbmRyZWdpb25cbiAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgICAgIC8vIHJlZ2lvbiB0ZXN0IGNvbXBvbmVudHNcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPCAyKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGxldCBwYXJhbWV0ZXI6QXJyYXk8T2JqZWN0PlxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgVEFSR0VUX1RFQ0hOT0xPR1kgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICBUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ25vZGUnXG4gICAgICAgICkge1xuICAgICAgICAgICAgY29uc3Qge1NlcnZlclRlc3RpbmdNb2R1bGUsIHBsYXRmb3JtU2VydmVyVGVzdGluZ30gPSByZXF1aXJlKFxuICAgICAgICAgICAgICAgICdAYW5ndWxhci9wbGF0Zm9ybS1zZXJ2ZXIvdGVzdGluZycpXG4gICAgICAgICAgICBwYXJhbWV0ZXIgPSBbU2VydmVyVGVzdGluZ01vZHVsZSwgcGxhdGZvcm1TZXJ2ZXJUZXN0aW5nKCldXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgQnJvd3NlckR5bmFtaWNUZXN0aW5nTW9kdWxlLCBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljVGVzdGluZ1xuICAgICAgICAgICAgfSA9IHJlcXVpcmUoJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy90ZXN0aW5nJylcbiAgICAgICAgICAgIHBhcmFtZXRlciA9IFtcbiAgICAgICAgICAgICAgICBCcm93c2VyRHluYW1pY1Rlc3RpbmdNb2R1bGUsIHBsYXRmb3JtQnJvd3NlckR5bmFtaWNUZXN0aW5nKCldXG4gICAgICAgIH1cbiAgICAgICAgVGVzdEJlZC5pbml0VGVzdEVudmlyb25tZW50KC4uLnBhcmFtZXRlcikuY29uZmlndXJlVGVzdGluZ01vZHVsZShcbiAgICAgICAgICAgIHJlc3VsdFsxXSlcbiAgICAgICAgYXdhaXQgVGVzdEJlZC5jb21waWxlQ29tcG9uZW50cygpXG4gICAgICAgIGF3YWl0IGNhbGxiYWNrLmNvbXBvbmVudC5jYWxsKFxuICAgICAgICAgICAgdGhpcywgVGVzdEJlZCwgcm91bmRUeXBlLCB0YXJnZXRUZWNobm9sb2d5LCAkLCAuLi5wYXJhbWV0ZXIuY29uY2F0KFxuICAgICAgICAgICAgICAgIHJlc3VsdC5zbGljZSgyKSkpXG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgIH0sIHJvdW5kVHlwZXMsIC4uLmFkZGl0aW9uYWxQYXJhbWV0ZXIpXG59XG5leHBvcnQgZGVmYXVsdCByZWdpc3RlckFuZ3VsYXJUZXN0XG4vLyBlbmRyZWdpb25cbi8vIHJlZ2lvbiB2aW0gbW9kbGluZVxuLy8gdmltOiBzZXQgdGFic3RvcD00IHNoaWZ0d2lkdGg9NCBleHBhbmR0YWI6XG4vLyB2aW06IGZvbGRtZXRob2Q9bWFya2VyIGZvbGRtYXJrZXI9cmVnaW9uLGVuZHJlZ2lvbjpcbi8vIGVuZHJlZ2lvblxuIl19