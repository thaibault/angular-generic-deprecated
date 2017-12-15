
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b0NBQVEsbUJBQVIsbUNBQStCLFNBQS9CLEdBQTBDLHNCQUExQyxDQUNJLE9BQU8sQ0FBUCxDQURKO0FBNUlnQjtBQUFBLG1DQThJVixRQUFRLGlCQUFSLEVBOUlVOztBQUFBO0FBQUE7QUFBQSxtQ0ErSVYsZ0NBQVMsU0FBVCxFQUFtQixJQUFuQiw2QkFDRixJQURFLEVBQ0ksT0FESixFQUNhLFNBRGIsRUFDd0IsZ0JBRHhCLEVBQzBDLENBRDFDLDRCQUNnRCxVQUFVLE1BQVYsQ0FDOUMsT0FBTyxLQUFQLENBQWEsQ0FBYixDQUQ4QyxDQURoRCxHQS9JVTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUFiOztBQUFBO0FBQUE7QUFBQTtBQUFBLFNBbUpKLFVBbkpJLFNBbUpXLG1CQW5KWCxFQUFQO0FBb0pIO2tCQUNjLG1CO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0ZXN0UnVubmVyLmNvbXBpbGVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbi8vICMhL3Vzci9iaW4vZW52IG5vZGVcbi8vIC0qLSBjb2Rpbmc6IHV0Zi04IC0qLVxuJ3VzZSBzdHJpY3QnXG4vKiAhXG4gICAgcmVnaW9uIGhlYWRlclxuICAgIENvcHlyaWdodCBUb3JiZW4gU2lja2VydCAoaW5mb1tcIn5hdH5cIl10b3JiZW4ud2Vic2l0ZSkgMTYuMTIuMjAxMlxuXG4gICAgTGljZW5zZVxuICAgIC0tLS0tLS1cblxuICAgIFRoaXMgbGlicmFyeSB3cml0dGVuIGJ5IFRvcmJlbiBTaWNrZXJ0IHN0YW5kIHVuZGVyIGEgY3JlYXRpdmUgY29tbW9uc1xuICAgIG5hbWluZyAzLjAgdW5wb3J0ZWQgbGljZW5zZS5cbiAgICBTZWUgaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnkvMy4wL2RlZWQuZGVcbiAgICBlbmRyZWdpb25cbiovXG4vLyByZWdpb24gaW1wb3J0c1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmltcG9ydCB0eXBlIHtEb21Ob2RlLCBQbGFpbk9iamVjdH0gZnJvbSAnY2xpZW50bm9kZSdcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgcmVnaXN0ZXJUZXN0IGZyb20gJ2NsaWVudG5vZGUvdGVzdCdcbi8vIE5PVEU6IE9ubHkgbmVlZGVkIGZvciBkZWJ1Z2dpbmcgdGhpcyBmaWxlLlxudHJ5IHtcbiAgICBtb2R1bGUucmVxdWlyZSgnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJylcbn0gY2F0Y2ggKGVycm9yKSB7fVxuXG5pbXBvcnQgZHVtbXlFdmVudCBmcm9tICcuL21vY2t1cCdcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIGRlY2xhcmF0aW9uXG5kZWNsYXJlIHZhciBERUJVRzpib29sZWFuXG5kZWNsYXJlIHZhciBUQVJHRVRfVEVDSE5PTE9HWTpzdHJpbmdcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIHRlc3QgcnVubmVyXG4vKipcbiAqIFByb3ZpZGVzIGEgZ2VuZXJpYyB0ZXN0IHJ1bm5lciBpbnRlcmZhY2UuXG4gKiBAcGFyYW0gY2FsbGJhY2sgLSBBIGNhbGxiYWNrIHRvIHJ1biBpZiB0ZXN0IGVudmlyb25tZW50IGlzIHJlYWR5LlxuICogQHBhcmFtIHRlbXBsYXRlIC0gVGVtcGxhdGUgdG8gdXNlIGFzIHJvb3QgYXBwbGljYXRpb24gY29tcG9uZW50IHRvXG4gKiBib290c3RyYXAuXG4gKiBAcGFyYW0gcm91bmRUeXBlcyAtIFRlc3QgdHlwZXMgdG8gcnVuLlxuICogQHBhcmFtIHByb2R1Y3Rpb25Nb2RlIC0gSW5kaWNhdGVzIHdoZXRoZXIgYW5ndWxhcidzIHByb2R1Y3Rpb24gbW9kZSBzaG91bGRcbiAqIGJlIGFjdGl2YXRlZCBpbiBub25lIGRlYnVnIG1vZGUuXG4gKiBAcGFyYW0gYWRkaXRpb25hbFBhcmFtZXRlciAtIEFsbCBhZGRpdGlvbmFsIHBhcmFtZXRlciB3aWxsIGJlIGZvcndhcmRlZCB0b1xuICogdGhlIHVuZGVybHlpbmcgY2xpZW50bm9kZSB0ZXN0IGVudmlyb25tZW50LlxuICogQHJldHVybnMgV2hhdGV2ZXIgdGhlIHVuZGVybHlpbmcgY2xpZW50bm9kZSB0ZXN0IHJ1bm5lciByZXR1cm5zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJBbmd1bGFyVGVzdChcbiAgICBjYWxsYmFjazpGdW5jdGlvbnx7Ym9vdHN0cmFwOkZ1bmN0aW9uO2NvbXBvbmVudDpGdW5jdGlvbn0sXG4gICAgdGVtcGxhdGU6c3RyaW5nID0gJzxkaXY+PC9kaXY+Jywgcm91bmRUeXBlczpBcnJheTxzdHJpbmc+ID0gWydmdWxsJ10sXG4gICAgcHJvZHVjdGlvbk1vZGU6Ym9vbGVhbiA9IGZhbHNlLCAuLi5hZGRpdGlvbmFsUGFyYW1ldGVyOkFycmF5PGFueT5cbik6YW55IHtcbiAgICByZXR1cm4gcmVnaXN0ZXJUZXN0KGFzeW5jIGZ1bmN0aW9uKFxuICAgICAgICByb3VuZFR5cGU6c3RyaW5nLCB0YXJnZXRUZWNobm9sb2d5Oj9zdHJpbmcsICQ6YW55LFxuICAgICAgICAuLi5leHRyYVBhcmFtZXRlcjpBcnJheTxhbnk+XG4gICAgKTpQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gcmVnaW9uIG1vY2tpbmcgYW5ndWxhciBlbnZpcm9ubWVudFxuICAgICAgICAvKlxuICAgICAgICAgICAgTk9URTogQSB3b3JraW5nIHBvbHltb3JwaGljIGFuZ3VsYXIgZW52aXJvbm1lbnQgbmVlZHMgc29tZVxuICAgICAgICAgICAgYXNzdW1wdGlvbnMgYWJvdXQgdGhlIGdsb2JhbCBzY29wZSwgc28gbW9ja2luZyBhbmQgaW5pdGlhbGl6aW5nXG4gICAgICAgICAgICB0aGF0IGVudmlyb25tZW50IGFmdGVyIGEgd29ya2luZyBicm93c2VyIGVudmlyb25tZW50IGlzIHByZXNlbnQuXG4gICAgICAgICovXG4gICAgICAgICQoJ2hlYWQnKS5hcHBlbmQoJzxiYXNlIGhyZWY9XCIvXCI+JylcbiAgICAgICAgaWYgKHR5cGVvZiBUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ3dlYicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkb21Ob2RlU3BlY2lmaWNhdGlvbjpQbGFpbk9iamVjdCA9IHtsaW5rOiB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICdub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ByZWJ1aWx0LXRoZW1lcy9kZWVwcHVycGxlLWFtYmVyLmNzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWw6ICdzdHlsZXNoZWV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2NzcydcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0OiB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgY29uc3QgZG9tTm9kZU5hbWU6c3RyaW5nID0gT2JqZWN0LmtleXMoZG9tTm9kZVNwZWNpZmljYXRpb24pWzBdXG4gICAgICAgICAgICAgICAgY29uc3QgZG9tTm9kZTpEb21Ob2RlID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIGRvbU5vZGVOYW1lKVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmFtZTpzdHJpbmcgaW4gZG9tTm9kZVNwZWNpZmljYXRpb25bXG4gICAgICAgICAgICAgICAgICAgIGRvbU5vZGVOYW1lXG4gICAgICAgICAgICAgICAgXS5hdHRyaWJ1dGVzKVxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9tTm9kZVNwZWNpZmljYXRpb25bXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21Ob2RlTmFtZVxuICAgICAgICAgICAgICAgICAgICBdLmF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21Ob2RlLnNldEF0dHJpYnV0ZShuYW1lLCBkb21Ob2RlU3BlY2lmaWNhdGlvbltcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Ob2RlTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgXS5hdHRyaWJ1dGVzW25hbWVdKVxuICAgICAgICAgICAgICAgIGRvbU5vZGVTcGVjaWZpY2F0aW9uW2RvbU5vZGVOYW1lXS5pbmplY3QuYXBwZW5kQ2hpbGQoZG9tTm9kZSlcbiAgICAgICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZTpGdW5jdGlvbik6dm9pZCA9PlxuICAgICAgICAgICAgICAgICAgICBkb21Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByZXNvbHZlKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ25vZGUnKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsLndpbmRvdy5SZWZsZWN0ID0gZ2xvYmFsLlJlZmxlY3RcbiAgICAgICAgICAgICAgICBnbG9iYWwuRXZlbnQgPSBkdW1teUV2ZW50XG4gICAgICAgICAgICAgICAgaWYgKCEoJ0NTUycgaW4gZ2xvYmFsKSlcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLkNTUyA9IHRydWVcbiAgICAgICAgICAgICAgICBpZiAoISgnbWF0Y2hNZWRpYScgaW4gZ2xvYmFsLndpbmRvdykpXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC53aW5kb3cubWF0Y2hNZWRpYSA9IChtZWRpYVF1ZXJ5OnN0cmluZyk6e1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTGlzdGVuZXI6RnVuY3Rpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzOmJvb2xlYW47XG4gICAgICAgICAgICAgICAgICAgICAgICBtZWRpYTpzdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMaXN0ZW5lcjpGdW5jdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5PVEU6IEl0IGlzIHN5bnRhY3RpY2FsbHkgaW1wb3NzaWJsZSB0byByZXR1cm4gYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgbGl0ZXJhbCBpbiBmdW5jdGlvbmFsIHN0eWxlLlxuICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkTGlzdGVuZXI6ICgpOnZvaWQgPT4ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWRpYTogbWVkaWFRdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMaXN0ZW5lcjogKCk6dm9pZCA9PiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCEoJ25hdmlnYXRvcicgaW4gZ2xvYmFsKSlcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLm5hdmlnYXRvciA9IHt1c2VyQWdlbnQ6ICdub2RlJ31cbiAgICAgICAgICAgICAgICBwcm9jZXNzLnNldE1heExpc3RlbmVycygzMClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXF1aXJlKCdoYW1tZXJqcycpXG4gICAgICAgIGNvbnN0IHtDb21wb25lbnQsIGVuYWJsZVByb2RNb2RlfSA9IHJlcXVpcmUoJ0Bhbmd1bGFyL2NvcmUnKVxuICAgICAgICBjb25zdCB7VGVzdEJlZH0gPSByZXF1aXJlKCdAYW5ndWxhci9jb3JlL3Rlc3RpbmcnKVxuICAgICAgICAvKipcbiAgICAgICAgICogRHVtbXkgYXBwbGljYXRpb24gcm9vdCBjb21wb25lbnQgdG8gdGVzdCBib290c3RyYXBwaW5nLlxuICAgICAgICAgKi9cbiAgICAgICAgQENvbXBvbmVudCh7c2VsZWN0b3I6ICcjcXVuaXQtZml4dHVyZScsIHRlbXBsYXRlfSlcbiAgICAgICAgY2xhc3MgQXBwbGljYXRpb25Db21wb25lbnQge31cbiAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgICAgIC8vIHJlZ2lvbiB0ZXN0IHNlcnZpY2VzXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrLmNhbGwoXG4gICAgICAgICAgICAgICAgdGhpcywgQXBwbGljYXRpb25Db21wb25lbnQsIHJvdW5kVHlwZSwgdGFyZ2V0VGVjaG5vbG9neSwgJCxcbiAgICAgICAgICAgICAgICAuLi5leHRyYVBhcmFtZXRlcilcbiAgICAgICAgaWYgKCd0aGVuJyBpbiBjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrID0gYXdhaXQgY2FsbGJhY2tcbiAgICAgICAgbGV0IHJlc3VsdDphbnkgPSBjYWxsYmFjay5ib290c3RyYXAuY2FsbChcbiAgICAgICAgICAgIHRoaXMsIEFwcGxpY2F0aW9uQ29tcG9uZW50LCByb3VuZFR5cGUsIHRhcmdldFRlY2hub2xvZ3ksICQsXG4gICAgICAgICAgICAuLi5leHRyYVBhcmFtZXRlcilcbiAgICAgICAgaWYgKCd0aGVuJyBpbiByZXN1bHQpXG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCByZXN1bHRcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlc3VsdCkpXG4gICAgICAgICAgICByZXN1bHQgPSBbcmVzdWx0XVxuICAgICAgICAvLyAvIHJlZ2lvbiBib290c3RyYXAgdGVzdCBhcHBsaWNhdGlvblxuICAgICAgICBpZiAoISh0eXBlb2YgREVCVUcgPT09ICdib29sZWFuJyAmJiBERUJVRykgJiYgcHJvZHVjdGlvbk1vZGUpXG4gICAgICAgICAgICBlbmFibGVQcm9kTW9kZSgpXG4gICAgICAgIGxldCBwbGF0Zm9ybTpPYmplY3RcbiAgICAgICAgbGV0IG1vZHVsZTpPYmplY3RcbiAgICAgICAgaWYgKHJlc3VsdFswXSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwbGF0Zm9ybSA9ICgoXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiBUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgICAgICAgICAgICAgVEFSR0VUX1RFQ0hOT0xPR1kgPT09ICdub2RlJ1xuICAgICAgICAgICAgICAgICkgPyByZXF1aXJlKCdAYW5ndWxhci9wbGF0Zm9ybS1zZXJ2ZXInKS5wbGF0Zm9ybUR5bmFtaWNTZXJ2ZXIgOlxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYydcbiAgICAgICAgICAgICAgICAgICAgKS5wbGF0Zm9ybUJyb3dzZXJEeW5hbWljKSgpXG4gICAgICAgICAgICAgICAgbW9kdWxlID0gYXdhaXQgcGxhdGZvcm0uYm9vdHN0cmFwTW9kdWxlKHJlc3VsdFswXSlcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubG9hZCgpXG4gICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZTpGdW5jdGlvbik6dm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGRvbmU6Ym9vbGVhbiA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVEb25lKCgpOnZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBtb2R1bGUuZGVzdHJveSgpXG4gICAgICAgICAgICAgICAgICAgIHBsYXRmb3JtLmRlc3Ryb3koKVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICAvLyAvIGVuZHJlZ2lvblxuICAgICAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgLy8gcmVnaW9uIHRlc3QgY29tcG9uZW50c1xuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCA8IDIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgbGV0IHBhcmFtZXRlcjpBcnJheTxPYmplY3Q+XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgICAgIFRBUkdFVF9URUNITk9MT0dZID09PSAnbm9kZSdcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCB7U2VydmVyVGVzdGluZ01vZHVsZSwgcGxhdGZvcm1TZXJ2ZXJUZXN0aW5nfSA9IHJlcXVpcmUoXG4gICAgICAgICAgICAgICAgJ0Bhbmd1bGFyL3BsYXRmb3JtLXNlcnZlci90ZXN0aW5nJylcbiAgICAgICAgICAgIHBhcmFtZXRlciA9IFtTZXJ2ZXJUZXN0aW5nTW9kdWxlLCBwbGF0Zm9ybVNlcnZlclRlc3RpbmcoKV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICBCcm93c2VyRHluYW1pY1Rlc3RpbmdNb2R1bGUsIHBsYXRmb3JtQnJvd3NlckR5bmFtaWNUZXN0aW5nXG4gICAgICAgICAgICB9ID0gcmVxdWlyZSgnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3Rlc3RpbmcnKVxuICAgICAgICAgICAgcGFyYW1ldGVyID0gW1xuICAgICAgICAgICAgICAgIEJyb3dzZXJEeW5hbWljVGVzdGluZ01vZHVsZSwgcGxhdGZvcm1Ccm93c2VyRHluYW1pY1Rlc3RpbmcoKV1cbiAgICAgICAgfVxuICAgICAgICBUZXN0QmVkLmluaXRUZXN0RW52aXJvbm1lbnQoLi4ucGFyYW1ldGVyKS5jb25maWd1cmVUZXN0aW5nTW9kdWxlKFxuICAgICAgICAgICAgcmVzdWx0WzFdKVxuICAgICAgICBhd2FpdCBUZXN0QmVkLmNvbXBpbGVDb21wb25lbnRzKClcbiAgICAgICAgYXdhaXQgY2FsbGJhY2suY29tcG9uZW50LmNhbGwoXG4gICAgICAgICAgICB0aGlzLCBUZXN0QmVkLCByb3VuZFR5cGUsIHRhcmdldFRlY2hub2xvZ3ksICQsIC4uLnBhcmFtZXRlci5jb25jYXQoXG4gICAgICAgICAgICAgICAgcmVzdWx0LnNsaWNlKDIpKSlcbiAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgfSwgcm91bmRUeXBlcywgLi4uYWRkaXRpb25hbFBhcmFtZXRlcilcbn1cbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdGVyQW5ndWxhclRlc3Rcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIHZpbSBtb2RsaW5lXG4vLyB2aW06IHNldCB0YWJzdG9wPTQgc2hpZnR3aWR0aD00IGV4cGFuZHRhYjpcbi8vIHZpbTogZm9sZG1ldGhvZD1tYXJrZXIgZm9sZG1hcmtlcj1yZWdpb24sZW5kcmVnaW9uOlxuLy8gZW5kcmVnaW9uXG4iXX0=