
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

exports.default = function (callback) {
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
};

var _test = require('clientnode/test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUQxQyw0QkFDZ0QsVUFBVSxNQUFWLENBQzlDLE9BQU8sS0FBUCxDQUFhLENBQWIsQ0FEOEMsQ0FEaEQsR0E5SVU7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBYjs7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQWtKSixVQWxKSSxTQWtKVyxtQkFsSlgsRUFBUDtBQW1KSCxDOztBQS9LRDs7Ozs7Ozs7Ozs7QUFEQTs7O0FBRUE7O0FBK0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFsTEEsSUFBSTtBQUNBLFdBQU8sT0FBUCxDQUFlLDZCQUFmO0FBQ0gsQ0FGRCxDQUVFLE9BQU8sS0FBUCxFQUFjLENBQUU7QUFDbEI7QUFDQTs7QUFHQTtBQUNBO0FBQ0EiLCJmaWxlIjoidGVzdFJ1bm5lci5jb21waWxlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG4vLyAjIS91c3IvYmluL2VudiBub2RlXG4vLyAtKi0gY29kaW5nOiB1dGYtOCAtKi1cbid1c2Ugc3RyaWN0J1xuLyogIVxuICAgIHJlZ2lvbiBoZWFkZXJcbiAgICBDb3B5cmlnaHQgVG9yYmVuIFNpY2tlcnQgKGluZm9bXCJ+YXR+XCJddG9yYmVuLndlYnNpdGUpIDE2LjEyLjIwMTJcblxuICAgIExpY2Vuc2VcbiAgICAtLS0tLS0tXG5cbiAgICBUaGlzIGxpYnJhcnkgd3JpdHRlbiBieSBUb3JiZW4gU2lja2VydCBzdGFuZCB1bmRlciBhIGNyZWF0aXZlIGNvbW1vbnNcbiAgICBuYW1pbmcgMy4wIHVucG9ydGVkIGxpY2Vuc2UuXG4gICAgU2VlIGh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LzMuMC9kZWVkLmRlXG4gICAgZW5kcmVnaW9uXG4qL1xuLy8gcmVnaW9uIGltcG9ydHNcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5pbXBvcnQgdHlwZSB7RG9tTm9kZSwgUGxhaW5PYmplY3R9IGZyb20gJ2NsaWVudG5vZGUnXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuaW1wb3J0IHJlZ2lzdGVyVGVzdCBmcm9tICdjbGllbnRub2RlL3Rlc3QnXG4vLyBOT1RFOiBPbmx5IG5lZWRlZCBmb3IgZGVidWdnaW5nIHRoaXMgZmlsZS5cbnRyeSB7XG4gICAgbW9kdWxlLnJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlcicpXG59IGNhdGNoIChlcnJvcikge31cbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIGRlY2xhcmF0aW9uXG5kZWNsYXJlIHZhciBERUJVRzpib29sZWFuXG5kZWNsYXJlIHZhciBUQVJHRVRfVEVDSE5PTE9HWTpzdHJpbmdcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIHRlc3QgcnVubmVyXG4vKipcbiAqIFByb3ZpZGVzIGEgZ2VuZXJpYyB0ZXN0IHJ1bm5lciBpbnRlcmZhY2UuXG4gKiBAcGFyYW0gY2FsbGJhY2sgLSBBIGNhbGxiYWNrIHRvIHJ1biBpZiB0ZXN0IGVudmlyb25tZW50IGlzIHJlYWR5LlxuICogQHBhcmFtIHRlbXBsYXRlIC0gVGVtcGxhdGUgdG8gdXNlIGFzIHJvb3QgYXBwbGljYXRpb24gY29tcG9uZW50IHRvXG4gKiBib290c3RyYXAuXG4gKiBAcGFyYW0gcm91bmRUeXBlcyAtIFRlc3QgdHlwZXMgdG8gcnVuLlxuICogQHBhcmFtIHByb2R1Y3Rpb25Nb2RlIC0gSW5kaWNhdGVzIHdoZXRoZXIgYW5ndWxhcidzIHByb2R1Y3Rpb24gbW9kZSBzaG91bGRcbiAqIGJlIGFjdGl2YXRlZCBpbiBub25lIGRlYnVnIG1vZGUuXG4gKiBAcGFyYW0gYWRkaXRpb25hbFBhcmFtZXRlciAtIEFsbCBhZGRpdGlvbmFsIHBhcmFtZXRlciB3aWxsIGJlIGZvcndhcmRlZCB0b1xuICogdGhlIHVuZGVybHlpbmcgY2xpZW50bm9kZSB0ZXN0IGVudmlyb25tZW50LlxuICogQHJldHVybnMgV2hhdGV2ZXIgdGhlIHVuZGVybHlpbmcgY2xpZW50bm9kZSB0ZXN0IHJ1bm5lciByZXR1cm5zLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihcbiAgICBjYWxsYmFjazpGdW5jdGlvbnx7Ym9vdHN0cmFwOkZ1bmN0aW9uO2NvbXBvbmVudDpGdW5jdGlvbn0sXG4gICAgdGVtcGxhdGU6c3RyaW5nID0gJzxkaXY+PC9kaXY+Jywgcm91bmRUeXBlczpBcnJheTxzdHJpbmc+ID0gWydmdWxsJ10sXG4gICAgcHJvZHVjdGlvbk1vZGU6Ym9vbGVhbiA9IGZhbHNlLCAuLi5hZGRpdGlvbmFsUGFyYW1ldGVyOkFycmF5PGFueT5cbik6YW55IHtcbiAgICByZXR1cm4gcmVnaXN0ZXJUZXN0KGFzeW5jIGZ1bmN0aW9uKFxuICAgICAgICByb3VuZFR5cGU6c3RyaW5nLCB0YXJnZXRUZWNobm9sb2d5Oj9zdHJpbmcsICQ6YW55LFxuICAgICAgICAuLi5leHRyYVBhcmFtZXRlcjpBcnJheTxhbnk+XG4gICAgKTpQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gcmVnaW9uIG1vY2tpbmcgYW5ndWxhciBlbnZpcm9ubWVudFxuICAgICAgICAvKlxuICAgICAgICAgICAgTk9URTogQSB3b3JraW5nIHBvbHltb3JwaGljIGFuZ3VsYXIgZW52aXJvbm1lbnQgbmVlZHMgc29tZVxuICAgICAgICAgICAgYXNzdW1wdGlvbnMgYWJvdXQgdGhlIGdsb2JhbCBzY29wZSwgc28gbW9ja2luZyBhbmQgaW5pdGlhbGl6aW5nXG4gICAgICAgICAgICB0aGF0IGVudmlyb25tZW50IGFmdGVyIGEgd29ya2luZyBicm93c2VyIGVudmlyb25tZW50IGlzIHByZXNlbnQuXG4gICAgICAgICovXG4gICAgICAgICQoJ2hlYWQnKS5hcHBlbmQoJzxiYXNlIGhyZWY9XCIvXCI+JylcbiAgICAgICAgaWYgKHR5cGVvZiBUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ3dlYicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkb21Ob2RlU3BlY2lmaWNhdGlvbjpQbGFpbk9iamVjdCA9IHtsaW5rOiB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY6ICdub2RlX21vZHVsZXMvQGFuZ3VsYXIvbWF0ZXJpYWwvJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3ByZWJ1aWx0LXRoZW1lcy9kZWVwcHVycGxlLWFtYmVyLmNzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWw6ICdzdHlsZXNoZWV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2NzcydcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0OiB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgY29uc3QgZG9tTm9kZU5hbWU6c3RyaW5nID0gT2JqZWN0LmtleXMoZG9tTm9kZVNwZWNpZmljYXRpb24pWzBdXG4gICAgICAgICAgICAgICAgY29uc3QgZG9tTm9kZTpEb21Ob2RlID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIGRvbU5vZGVOYW1lKVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmFtZTpzdHJpbmcgaW4gZG9tTm9kZVNwZWNpZmljYXRpb25bXG4gICAgICAgICAgICAgICAgICAgIGRvbU5vZGVOYW1lXG4gICAgICAgICAgICAgICAgXS5hdHRyaWJ1dGVzKVxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9tTm9kZVNwZWNpZmljYXRpb25bXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21Ob2RlTmFtZVxuICAgICAgICAgICAgICAgICAgICBdLmF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBkb21Ob2RlLnNldEF0dHJpYnV0ZShuYW1lLCBkb21Ob2RlU3BlY2lmaWNhdGlvbltcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Ob2RlTmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgXS5hdHRyaWJ1dGVzW25hbWVdKVxuICAgICAgICAgICAgICAgIGRvbU5vZGVTcGVjaWZpY2F0aW9uW2RvbU5vZGVOYW1lXS5pbmplY3QuYXBwZW5kQ2hpbGQoZG9tTm9kZSlcbiAgICAgICAgICAgICAgICBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZTpGdW5jdGlvbik6dm9pZCA9PlxuICAgICAgICAgICAgICAgICAgICBkb21Ob2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByZXNvbHZlKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ25vZGUnKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsLndpbmRvdy5SZWZsZWN0ID0gZ2xvYmFsLlJlZmxlY3RcbiAgICAgICAgICAgICAgICBpZiAoISgnQ1NTJyBpbiBnbG9iYWwpKVxuICAgICAgICAgICAgICAgICAgICBnbG9iYWwuQ1NTID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGlmICghKCdtYXRjaE1lZGlhJyBpbiBnbG9iYWwud2luZG93KSlcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLndpbmRvdy5tYXRjaE1lZGlhID0gKG1lZGlhUXVlcnk6c3RyaW5nKTp7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRMaXN0ZW5lcjpGdW5jdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZXM6Ym9vbGVhbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lZGlhOnN0cmluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUxpc3RlbmVyOkZ1bmN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTk9URTogSXQgaXMgc3ludGFjdGljYWxseSBpbXBvc3NpYmxlIHRvIHJldHVybiBhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCBsaXRlcmFsIGluIGZ1bmN0aW9uYWwgc3R5bGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRMaXN0ZW5lcjogKCk6dm9pZCA9PiB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lZGlhOiBtZWRpYVF1ZXJ5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUxpc3RlbmVyOiAoKTp2b2lkID0+IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoISgnbmF2aWdhdG9yJyBpbiBnbG9iYWwpKVxuICAgICAgICAgICAgICAgICAgICBnbG9iYWwubmF2aWdhdG9yID0ge3VzZXJBZ2VudDogJ25vZGUnfVxuICAgICAgICAgICAgICAgIHByb2Nlc3Muc2V0TWF4TGlzdGVuZXJzKDMwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlcXVpcmUoJ2hhbW1lcmpzJylcbiAgICAgICAgY29uc3Qge0NvbXBvbmVudCwgZW5hYmxlUHJvZE1vZGV9ID0gcmVxdWlyZSgnQGFuZ3VsYXIvY29yZScpXG4gICAgICAgIGNvbnN0IHtUZXN0QmVkfSA9IHJlcXVpcmUoJ0Bhbmd1bGFyL2NvcmUvdGVzdGluZycpXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEdW1teSBhcHBsaWNhdGlvbiByb290IGNvbXBvbmVudCB0byB0ZXN0IGJvb3RzdHJhcHBpbmcuXG4gICAgICAgICAqL1xuICAgICAgICBAQ29tcG9uZW50KHtzZWxlY3RvcjogJyNxdW5pdC1maXh0dXJlJywgdGVtcGxhdGV9KVxuICAgICAgICBjbGFzcyBBcHBsaWNhdGlvbkNvbXBvbmVudCB7fVxuICAgICAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgLy8gcmVnaW9uIHRlc3Qgc2VydmljZXNcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2suY2FsbChcbiAgICAgICAgICAgICAgICB0aGlzLCBBcHBsaWNhdGlvbkNvbXBvbmVudCwgcm91bmRUeXBlLCB0YXJnZXRUZWNobm9sb2d5LCAkLFxuICAgICAgICAgICAgICAgIC4uLmV4dHJhUGFyYW1ldGVyKVxuICAgICAgICBpZiAoJ3RoZW4nIGluIGNhbGxiYWNrKVxuICAgICAgICAgICAgY2FsbGJhY2sgPSBhd2FpdCBjYWxsYmFja1xuICAgICAgICBsZXQgcmVzdWx0OmFueSA9IGNhbGxiYWNrLmJvb3RzdHJhcC5jYWxsKFxuICAgICAgICAgICAgdGhpcywgQXBwbGljYXRpb25Db21wb25lbnQsIHJvdW5kVHlwZSwgdGFyZ2V0VGVjaG5vbG9neSwgJCxcbiAgICAgICAgICAgIC4uLmV4dHJhUGFyYW1ldGVyKVxuICAgICAgICBpZiAoJ3RoZW4nIGluIHJlc3VsdClcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHJlc3VsdFxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVzdWx0KSlcbiAgICAgICAgICAgIHJlc3VsdCA9IFtyZXN1bHRdXG4gICAgICAgIC8vIC8gcmVnaW9uIGJvb3RzdHJhcCB0ZXN0IGFwcGxpY2F0aW9uXG4gICAgICAgIGlmICghKHR5cGVvZiBERUJVRyA9PT0gJ2Jvb2xlYW4nICYmIERFQlVHKSAmJiBwcm9kdWN0aW9uTW9kZSlcbiAgICAgICAgICAgIGVuYWJsZVByb2RNb2RlKClcbiAgICAgICAgbGV0IHBsYXRmb3JtOk9iamVjdFxuICAgICAgICBsZXQgbW9kdWxlOk9iamVjdFxuICAgICAgICBpZiAocmVzdWx0WzBdKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBsYXRmb3JtID0gKChcbiAgICAgICAgICAgICAgICAgICAgdHlwZW9mIFRBUkdFVF9URUNITk9MT0dZID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgICAgICAgICBUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ25vZGUnXG4gICAgICAgICAgICAgICAgKSA/IHJlcXVpcmUoJ0Bhbmd1bGFyL3BsYXRmb3JtLXNlcnZlcicpLnBsYXRmb3JtRHluYW1pY1NlcnZlciA6XG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljJ1xuICAgICAgICAgICAgICAgICAgICApLnBsYXRmb3JtQnJvd3NlckR5bmFtaWMpKClcbiAgICAgICAgICAgICAgICBtb2R1bGUgPSBhd2FpdCBwbGF0Zm9ybS5ib290c3RyYXBNb2R1bGUocmVzdWx0WzBdKVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2FkKClcbiAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlOkZ1bmN0aW9uKTp2b2lkID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZG9uZTpib29sZWFuID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZURvbmUoKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb25lKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZS5kZXN0cm95KClcbiAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm0uZGVzdHJveSgpXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIC8vIC8gZW5kcmVnaW9uXG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgICAgICAvLyByZWdpb24gdGVzdCBjb21wb25lbnRzXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoIDwgMilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBsZXQgcGFyYW1ldGVyOkFycmF5PE9iamVjdD5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIFRBUkdFVF9URUNITk9MT0dZID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgVEFSR0VUX1RFQ0hOT0xPR1kgPT09ICdub2RlJ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnN0IHtTZXJ2ZXJUZXN0aW5nTW9kdWxlLCBwbGF0Zm9ybVNlcnZlclRlc3Rpbmd9ID0gcmVxdWlyZShcbiAgICAgICAgICAgICAgICAnQGFuZ3VsYXIvcGxhdGZvcm0tc2VydmVyL3Rlc3RpbmcnKVxuICAgICAgICAgICAgcGFyYW1ldGVyID0gW1NlcnZlclRlc3RpbmdNb2R1bGUsIHBsYXRmb3JtU2VydmVyVGVzdGluZygpXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIEJyb3dzZXJEeW5hbWljVGVzdGluZ01vZHVsZSwgcGxhdGZvcm1Ccm93c2VyRHluYW1pY1Rlc3RpbmdcbiAgICAgICAgICAgIH0gPSByZXF1aXJlKCdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMvdGVzdGluZycpXG4gICAgICAgICAgICBwYXJhbWV0ZXIgPSBbXG4gICAgICAgICAgICAgICAgQnJvd3NlckR5bmFtaWNUZXN0aW5nTW9kdWxlLCBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljVGVzdGluZygpXVxuICAgICAgICB9XG4gICAgICAgIFRlc3RCZWQuaW5pdFRlc3RFbnZpcm9ubWVudCguLi5wYXJhbWV0ZXIpLmNvbmZpZ3VyZVRlc3RpbmdNb2R1bGUoXG4gICAgICAgICAgICByZXN1bHRbMV0pXG4gICAgICAgIGF3YWl0IFRlc3RCZWQuY29tcGlsZUNvbXBvbmVudHMoKVxuICAgICAgICBhd2FpdCBjYWxsYmFjay5jb21wb25lbnQuY2FsbChcbiAgICAgICAgICAgIHRoaXMsIFRlc3RCZWQsIHJvdW5kVHlwZSwgdGFyZ2V0VGVjaG5vbG9neSwgJCwgLi4ucGFyYW1ldGVyLmNvbmNhdChcbiAgICAgICAgICAgICAgICByZXN1bHQuc2xpY2UoMikpKVxuICAgICAgICAvLyBlbmRyZWdpb25cbiAgICB9LCByb3VuZFR5cGVzLCAuLi5hZGRpdGlvbmFsUGFyYW1ldGVyKVxufVxuLy8gZW5kcmVnaW9uXG4vLyByZWdpb24gdmltIG1vZGxpbmVcbi8vIHZpbTogc2V0IHRhYnN0b3A9NCBzaGlmdHdpZHRoPTQgZXhwYW5kdGFiOlxuLy8gdmltOiBmb2xkbWV0aG9kPW1hcmtlciBmb2xkbWFya2VyPXJlZ2lvbixlbmRyZWdpb246XG4vLyBlbmRyZWdpb25cbiJdfQ==