
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

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (callback, template = '<div></div>', roundTypes = ['full'], productionMode = false, ...additionalParameter) {
    return (0, _test2.default)(function () {
        var _ref = _asyncToGenerator(function* (roundType, targetTechnology, $, ...parameter) {
            var _dec,
                _class,
                _this = this;

            // region mocking angular environment
            $('head').append('<base href="/">');
            /*
                NOTE: A working polymorphic angular environment needs some
                assumptions about the global scope, so mocking and initializing
                that environment after a working browser environment is present.
            */
            if (TARGET_TECHNOLOGY === 'node') {
                global.window.Reflect = global.Reflect;
                if (!('matchMedia' in global.window)) global.window.matchMedia = function (mediaQuery) {
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
            const { platformBrowserDynamic } = require('@angular/platform-browser-dynamic');
            const { BrowserDynamicTestingModule, platformBrowserDynamicTesting } = require('@angular/platform-browser-dynamic/testing');
            // IgnoreTypeCheck

            /**
             * Dummy application root component to test bootstrapping.
             */
            let ApplicationComponent = (_dec = Component({ selector: '#qunit-fixture', template }), _dec(_class = class ApplicationComponent {}) || _class);
            // endregion
            // region test services

            if (typeof callback === 'function') callback = callback.call(this, ApplicationComponent, roundType, targetTechnology, $, ...parameter);
            let result = callback.bootstrap.call(this, ApplicationComponent, roundType, targetTechnology, $, ...parameter);
            if (!Array.isArray(result)) result = [result];
            // / region bootstrap test application
            if (!DEBUG && productionMode) enableProdMode();
            let platform;
            let module;
            if (result[0]) {
                try {
                    platform = platformBrowserDynamic();
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
            TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting()).configureTestingModule(...result.slice(1));
            yield TestBed.compileComponents();
            yield callback.component.call(this, TestBed, roundType, targetTechnology, $, ...parameter);
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
 * @param productionMode - Indicates weather amgular's production mode should
 * be activated in none debug mode.
 * @param additionalParameter - All additional parameter will be forwarded to
 * the underlying clientnode test environment.
 * @returns Whatever the underlying clientnode test runner returns.
 */

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3RSdW5uZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUFZQTs7Ozs7O2tCQXdCZSxVQUNYLFFBRFcsRUFFWCxXQUFrQixhQUZQLEVBRXNCLGFBQTJCLENBQUMsTUFBRCxDQUZqRCxFQUdYLGlCQUF5QixLQUhkLEVBR3FCLEdBQUcsbUJBSHhCLEVBSVQ7QUFDRixXQUFPO0FBQUEscUNBQWEsV0FDaEIsU0FEZ0IsRUFDRSxnQkFERixFQUM0QixDQUQ1QixFQUVoQixHQUFHLFNBRmEsRUFHSjtBQUFBO0FBQUE7QUFBQTs7QUFDWjtBQUNBLGNBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsaUJBQWpCO0FBQ0E7Ozs7O0FBS0EsZ0JBQUksc0JBQXNCLE1BQTFCLEVBQWtDO0FBQzlCLHVCQUFPLE1BQVAsQ0FBYyxPQUFkLEdBQXdCLE9BQU8sT0FBL0I7QUFDQSxvQkFBSSxFQUFFLGdCQUFnQixPQUFPLE1BQXpCLENBQUosRUFDSSxPQUFPLE1BQVAsQ0FBYyxVQUFkLEdBQTJCLFVBQUMsVUFBRCxFQUt0QjtBQUNELDJCQUFPO0FBQ0gscUNBQWEsdUJBQVcsQ0FBRSxDQUR2QjtBQUVILGlDQUFTLElBRk47QUFHSCwrQkFBTyxVQUhKO0FBSUgsd0NBQWdCLDBCQUFXLENBQUU7QUFKMUIscUJBQVA7QUFNSCxpQkFaRDtBQWFKLHdCQUFRLGVBQVIsQ0FBd0IsRUFBeEI7QUFDSDtBQUNELG9CQUFRLFVBQVI7QUFDQSxrQkFBTSxFQUFDLFNBQUQsRUFBWSxjQUFaLEtBQThCLFFBQVEsZUFBUixDQUFwQztBQUNBLGtCQUFNLEVBQUMsT0FBRCxLQUFZLFFBQVEsdUJBQVIsQ0FBbEI7QUFDQSxrQkFBTSxFQUFDLHNCQUFELEtBQTJCLFFBQzdCLG1DQUQ2QixDQUFqQztBQUVBLGtCQUFNLEVBQUMsMkJBQUQsRUFBOEIsNkJBQTlCLEtBQ0YsUUFBUSwyQ0FBUixDQURKO0FBRUE7O0FBRUE7OztBQW5DWSxnQkFzQ04sb0JBdENNLFdBa0NYLFVBQVUsRUFBQyxVQUFVLGdCQUFYLEVBQTZCLFFBQTdCLEVBQVYsQ0FsQ1csZ0JBc0NaLE1BQU0sb0JBQU4sQ0FBMkIsRUF0Q2Y7QUF1Q1o7QUFDQTs7QUFDQSxnQkFBSSxPQUFPLFFBQVAsS0FBb0IsVUFBeEIsRUFDSSxXQUFXLFNBQVMsSUFBVCxDQUNQLElBRE8sRUFDRCxvQkFEQyxFQUNxQixTQURyQixFQUNnQyxnQkFEaEMsRUFDa0QsQ0FEbEQsRUFFUCxHQUFHLFNBRkksQ0FBWDtBQUdKLGdCQUFJLFNBQWEsU0FBUyxTQUFULENBQW1CLElBQW5CLENBQ2IsSUFEYSxFQUNQLG9CQURPLEVBQ2UsU0FEZixFQUMwQixnQkFEMUIsRUFDNEMsQ0FENUMsRUFFYixHQUFHLFNBRlUsQ0FBakI7QUFHQSxnQkFBSSxDQUFDLE1BQU0sT0FBTixDQUFjLE1BQWQsQ0FBTCxFQUNJLFNBQVMsQ0FBQyxNQUFELENBQVQ7QUFDSjtBQUNBLGdCQUFJLENBQUMsS0FBRCxJQUFVLGNBQWQsRUFDSTtBQUNKLGdCQUFJLFFBQUo7QUFDQSxnQkFBSSxNQUFKO0FBQ0EsZ0JBQUksT0FBTyxDQUFQLENBQUosRUFBZTtBQUNYLG9CQUFJO0FBQ0EsK0JBQVcsd0JBQVg7QUFDQSw2QkFBUyxNQUFNLFNBQVMsZUFBVCxDQUF5QixPQUFPLENBQVAsQ0FBekIsQ0FBZjtBQUNILGlCQUhELENBR0UsT0FBTyxLQUFQLEVBQWM7QUFDWiwwQkFBTSxLQUFOO0FBQ0g7QUFDRCxxQkFBSyxJQUFMO0FBQ0Esc0JBQU0sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQTJCO0FBQ3pDLHdCQUFJLE9BQWUsS0FBbkI7QUFDQSwwQkFBSyxVQUFMLENBQWdCLFlBQVc7QUFDdkIsNEJBQUksSUFBSixFQUNJO0FBQ0osK0JBQU8sSUFBUDtBQUNBLCtCQUFPLE9BQVA7QUFDQSxpQ0FBUyxPQUFUO0FBQ0E7QUFDSCxxQkFQRDtBQVFILGlCQVZLLENBQU47QUFXSDtBQUNEO0FBQ0E7QUFDQTtBQUNBLGdCQUFJLE9BQU8sTUFBUCxHQUFnQixDQUFwQixFQUNJO0FBQ0osb0JBQVEsbUJBQVIsQ0FDSSwyQkFESixFQUNpQywrQkFEakMsRUFFRSxzQkFGRixDQUV5QixHQUFHLE9BQU8sS0FBUCxDQUFhLENBQWIsQ0FGNUI7QUFHQSxrQkFBTSxRQUFRLGlCQUFSLEVBQU47QUFDQSxrQkFBTSxTQUFTLFNBQVQsQ0FBbUIsSUFBbkIsQ0FDRixJQURFLEVBQ0ksT0FESixFQUNhLFNBRGIsRUFDd0IsZ0JBRHhCLEVBQzBDLENBRDFDLEVBQzZDLEdBQUcsU0FEaEQsQ0FBTjtBQUVBO0FBQ0gsU0ExRk07O0FBQUE7QUFBQTtBQUFBO0FBQUEsU0EwRkosVUExRkksRUEwRlEsR0FBRyxtQkExRlgsQ0FBUDtBQTJGSCxDOztBQXZIRDs7Ozs7Ozs7QUFDQTs7QUF1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQTFIQSxJQUFJO0FBQ0EsV0FBTyxPQUFQLENBQWUsNkJBQWY7QUFDSCxDQUZELENBRUUsT0FBTyxLQUFQLEVBQWMsQ0FBRTtBQUNsQjtBQUNBOztBQUdBO0FBQ0E7QUFDQSIsImZpbGUiOiJ0ZXN0UnVubmVyLmNvbXBpbGVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbi8vICMhL3Vzci9iaW4vZW52IG5vZGVcbi8vIC0qLSBjb2Rpbmc6IHV0Zi04IC0qLVxuJ3VzZSBzdHJpY3QnXG4vKiAhXG4gICAgcmVnaW9uIGhlYWRlclxuICAgIENvcHlyaWdodCBUb3JiZW4gU2lja2VydCAoaW5mb1tcIn5hdH5cIl10b3JiZW4ud2Vic2l0ZSkgMTYuMTIuMjAxMlxuXG4gICAgTGljZW5zZVxuICAgIC0tLS0tLS1cblxuICAgIFRoaXMgbGlicmFyeSB3cml0dGVuIGJ5IFRvcmJlbiBTaWNrZXJ0IHN0YW5kIHVuZGVyIGEgY3JlYXRpdmUgY29tbW9uc1xuICAgIG5hbWluZyAzLjAgdW5wb3J0ZWQgbGljZW5zZS5cbiAgICBTZWUgaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbGljZW5zZXMvYnkvMy4wL2RlZWQuZGVcbiAgICBlbmRyZWdpb25cbiovXG4vLyByZWdpb24gaW1wb3J0c1xuaW1wb3J0IHJlZ2lzdGVyVGVzdCBmcm9tICdjbGllbnRub2RlL3Rlc3QnXG4vLyBOT1RFOiBPbmx5IG5lZWRlZCBmb3IgZGVidWdnaW5nIHRoaXMgZmlsZS5cbnRyeSB7XG4gICAgbW9kdWxlLnJlcXVpcmUoJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3RlcicpXG59IGNhdGNoIChlcnJvcikge31cbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIGRlY2xhcmF0aW9uXG5kZWNsYXJlIHZhciBERUJVRzpib29sZWFuXG5kZWNsYXJlIHZhciBUQVJHRVRfVEVDSE5PTE9HWTpzdHJpbmdcbi8vIGVuZHJlZ2lvblxuLy8gcmVnaW9uIHRlc3QgcnVubmVyXG4vKipcbiAqIFByb3ZpZGVzIGEgZ2VuZXJpYyB0ZXN0IHJ1bm5lciBpbnRlcmZhY2UuXG4gKiBAcGFyYW0gY2FsbGJhY2sgLSBBIGNhbGxiYWNrIHRvIHJ1biBpZiB0ZXN0IGVudmlyb25tZW50IGlzIHJlYWR5LlxuICogQHBhcmFtIHRlbXBsYXRlIC0gVGVtcGxhdGUgdG8gdXNlIGFzIHJvb3QgYXBwbGljYXRpb24gY29tcG9uZW50IHRvXG4gKiBib290c3RyYXAuXG4gKiBAcGFyYW0gcm91bmRUeXBlcyAtIFRlc3QgdHlwZXMgdG8gcnVuLlxuICogQHBhcmFtIHByb2R1Y3Rpb25Nb2RlIC0gSW5kaWNhdGVzIHdlYXRoZXIgYW1ndWxhcidzIHByb2R1Y3Rpb24gbW9kZSBzaG91bGRcbiAqIGJlIGFjdGl2YXRlZCBpbiBub25lIGRlYnVnIG1vZGUuXG4gKiBAcGFyYW0gYWRkaXRpb25hbFBhcmFtZXRlciAtIEFsbCBhZGRpdGlvbmFsIHBhcmFtZXRlciB3aWxsIGJlIGZvcndhcmRlZCB0b1xuICogdGhlIHVuZGVybHlpbmcgY2xpZW50bm9kZSB0ZXN0IGVudmlyb25tZW50LlxuICogQHJldHVybnMgV2hhdGV2ZXIgdGhlIHVuZGVybHlpbmcgY2xpZW50bm9kZSB0ZXN0IHJ1bm5lciByZXR1cm5zLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihcbiAgICBjYWxsYmFjazpGdW5jdGlvbnx7Ym9vdHN0cmFwOkZ1bmN0aW9uO2NvbXBvbmVudDpGdW5jdGlvbn0sXG4gICAgdGVtcGxhdGU6c3RyaW5nID0gJzxkaXY+PC9kaXY+Jywgcm91bmRUeXBlczpBcnJheTxzdHJpbmc+ID0gWydmdWxsJ10sXG4gICAgcHJvZHVjdGlvbk1vZGU6Ym9vbGVhbiA9IGZhbHNlLCAuLi5hZGRpdGlvbmFsUGFyYW1ldGVyOkFycmF5PGFueT5cbik6YW55IHtcbiAgICByZXR1cm4gcmVnaXN0ZXJUZXN0KGFzeW5jIGZ1bmN0aW9uKFxuICAgICAgICByb3VuZFR5cGU6c3RyaW5nLCB0YXJnZXRUZWNobm9sb2d5Oj9zdHJpbmcsICQ6YW55LFxuICAgICAgICAuLi5wYXJhbWV0ZXI6QXJyYXk8YW55PlxuICAgICk6UHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIC8vIHJlZ2lvbiBtb2NraW5nIGFuZ3VsYXIgZW52aXJvbm1lbnRcbiAgICAgICAgJCgnaGVhZCcpLmFwcGVuZCgnPGJhc2UgaHJlZj1cIi9cIj4nKVxuICAgICAgICAvKlxuICAgICAgICAgICAgTk9URTogQSB3b3JraW5nIHBvbHltb3JwaGljIGFuZ3VsYXIgZW52aXJvbm1lbnQgbmVlZHMgc29tZVxuICAgICAgICAgICAgYXNzdW1wdGlvbnMgYWJvdXQgdGhlIGdsb2JhbCBzY29wZSwgc28gbW9ja2luZyBhbmQgaW5pdGlhbGl6aW5nXG4gICAgICAgICAgICB0aGF0IGVudmlyb25tZW50IGFmdGVyIGEgd29ya2luZyBicm93c2VyIGVudmlyb25tZW50IGlzIHByZXNlbnQuXG4gICAgICAgICovXG4gICAgICAgIGlmIChUQVJHRVRfVEVDSE5PTE9HWSA9PT0gJ25vZGUnKSB7XG4gICAgICAgICAgICBnbG9iYWwud2luZG93LlJlZmxlY3QgPSBnbG9iYWwuUmVmbGVjdFxuICAgICAgICAgICAgaWYgKCEoJ21hdGNoTWVkaWEnIGluIGdsb2JhbC53aW5kb3cpKVxuICAgICAgICAgICAgICAgIGdsb2JhbC53aW5kb3cubWF0Y2hNZWRpYSA9IChtZWRpYVF1ZXJ5OnN0cmluZyk6e1xuICAgICAgICAgICAgICAgICAgICBhZGRMaXN0ZW5lcjpGdW5jdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hlczpib29sZWFuO1xuICAgICAgICAgICAgICAgICAgICBtZWRpYTpzdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUxpc3RlbmVyOkZ1bmN0aW9uO1xuICAgICAgICAgICAgICAgIH0gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkTGlzdGVuZXI6ICgpOnZvaWQgPT4ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVkaWE6IG1lZGlhUXVlcnksXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVMaXN0ZW5lcjogKCk6dm9pZCA9PiB7fVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvY2Vzcy5zZXRNYXhMaXN0ZW5lcnMoMzApXG4gICAgICAgIH1cbiAgICAgICAgcmVxdWlyZSgnaGFtbWVyanMnKVxuICAgICAgICBjb25zdCB7Q29tcG9uZW50LCBlbmFibGVQcm9kTW9kZX0gPSByZXF1aXJlKCdAYW5ndWxhci9jb3JlJylcbiAgICAgICAgY29uc3Qge1Rlc3RCZWR9ID0gcmVxdWlyZSgnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJylcbiAgICAgICAgY29uc3Qge3BsYXRmb3JtQnJvd3NlckR5bmFtaWN9ID0gcmVxdWlyZShcbiAgICAgICAgICAgICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnKVxuICAgICAgICBjb25zdCB7QnJvd3NlckR5bmFtaWNUZXN0aW5nTW9kdWxlLCBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljVGVzdGluZ30gPVxuICAgICAgICAgICAgcmVxdWlyZSgnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3Rlc3RpbmcnKVxuICAgICAgICAvLyBJZ25vcmVUeXBlQ2hlY2tcbiAgICAgICAgQENvbXBvbmVudCh7c2VsZWN0b3I6ICcjcXVuaXQtZml4dHVyZScsIHRlbXBsYXRlfSlcbiAgICAgICAgLyoqXG4gICAgICAgICAqIER1bW15IGFwcGxpY2F0aW9uIHJvb3QgY29tcG9uZW50IHRvIHRlc3QgYm9vdHN0cmFwcGluZy5cbiAgICAgICAgICovXG4gICAgICAgIGNsYXNzIEFwcGxpY2F0aW9uQ29tcG9uZW50IHt9XG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgICAgICAvLyByZWdpb24gdGVzdCBzZXJ2aWNlc1xuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjay5jYWxsKFxuICAgICAgICAgICAgICAgIHRoaXMsIEFwcGxpY2F0aW9uQ29tcG9uZW50LCByb3VuZFR5cGUsIHRhcmdldFRlY2hub2xvZ3ksICQsXG4gICAgICAgICAgICAgICAgLi4ucGFyYW1ldGVyKVxuICAgICAgICBsZXQgcmVzdWx0OmFueSA9IGNhbGxiYWNrLmJvb3RzdHJhcC5jYWxsKFxuICAgICAgICAgICAgdGhpcywgQXBwbGljYXRpb25Db21wb25lbnQsIHJvdW5kVHlwZSwgdGFyZ2V0VGVjaG5vbG9neSwgJCxcbiAgICAgICAgICAgIC4uLnBhcmFtZXRlcilcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlc3VsdCkpXG4gICAgICAgICAgICByZXN1bHQgPSBbcmVzdWx0XVxuICAgICAgICAvLyAvIHJlZ2lvbiBib290c3RyYXAgdGVzdCBhcHBsaWNhdGlvblxuICAgICAgICBpZiAoIURFQlVHICYmIHByb2R1Y3Rpb25Nb2RlKVxuICAgICAgICAgICAgZW5hYmxlUHJvZE1vZGUoKVxuICAgICAgICBsZXQgcGxhdGZvcm06T2JqZWN0XG4gICAgICAgIGxldCBtb2R1bGU6T2JqZWN0XG4gICAgICAgIGlmIChyZXN1bHRbMF0pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcGxhdGZvcm0gPSBwbGF0Zm9ybUJyb3dzZXJEeW5hbWljKClcbiAgICAgICAgICAgICAgICBtb2R1bGUgPSBhd2FpdCBwbGF0Zm9ybS5ib290c3RyYXBNb2R1bGUocmVzdWx0WzBdKVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sb2FkKClcbiAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlOkZ1bmN0aW9uKTp2b2lkID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZG9uZTpib29sZWFuID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZURvbmUoKCk6dm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb25lKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZS5kZXN0cm95KClcbiAgICAgICAgICAgICAgICAgICAgcGxhdGZvcm0uZGVzdHJveSgpXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIC8vIC8gZW5kcmVnaW9uXG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgICAgICAvLyByZWdpb24gdGVzdCBjb21wb25lbnRzXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoIDwgMilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBUZXN0QmVkLmluaXRUZXN0RW52aXJvbm1lbnQoXG4gICAgICAgICAgICBCcm93c2VyRHluYW1pY1Rlc3RpbmdNb2R1bGUsIHBsYXRmb3JtQnJvd3NlckR5bmFtaWNUZXN0aW5nKClcbiAgICAgICAgKS5jb25maWd1cmVUZXN0aW5nTW9kdWxlKC4uLnJlc3VsdC5zbGljZSgxKSlcbiAgICAgICAgYXdhaXQgVGVzdEJlZC5jb21waWxlQ29tcG9uZW50cygpXG4gICAgICAgIGF3YWl0IGNhbGxiYWNrLmNvbXBvbmVudC5jYWxsKFxuICAgICAgICAgICAgdGhpcywgVGVzdEJlZCwgcm91bmRUeXBlLCB0YXJnZXRUZWNobm9sb2d5LCAkLCAuLi5wYXJhbWV0ZXIpXG4gICAgICAgIC8vIGVuZHJlZ2lvblxuICAgIH0sIHJvdW5kVHlwZXMsIC4uLmFkZGl0aW9uYWxQYXJhbWV0ZXIpXG59XG4vLyBlbmRyZWdpb25cbi8vIHJlZ2lvbiB2aW0gbW9kbGluZVxuLy8gdmltOiBzZXQgdGFic3RvcD00IHNoaWZ0d2lkdGg9NCBleHBhbmR0YWI6XG4vLyB2aW06IGZvbGRtZXRob2Q9bWFya2VyIGZvbGRtYXJrZXI9cmVnaW9uLGVuZHJlZ2lvbjpcbi8vIGVuZHJlZ2lvblxuIl19