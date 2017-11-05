
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module preRender */
'use strict';
/* !
    region header
    [Project page](https://bitbucket.org/posic/bpvwebapp)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012
    endregion
*/
// region imports

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

exports.determinePaths = determinePaths;

exports.default = function (ApplicationComponent, ApplicationModule) {
    var routes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var globalVariableNamesToInject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'genericInitialData';
    var htmlFilePath = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _path2.default.resolve(_path2.default.dirname(process.argv[1]), 'index.html');
    var targetDirectoryPath = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _path2.default.resolve(_path2.default.dirname(process.argv[1]), 'preRendered');

    var _this = this;

    var scope = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : { genericInitialData: { configuration: { database: {
                    connector: { adapter: 'memory' },
                    plugins: [_pouchdbAdapterMemory2.default]
                } } } };
    var encoding = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'utf-8';

    globalVariableNamesToInject = [].concat(globalVariableNamesToInject);
    routes = [].concat(routes);
    return new _promise2.default(function (resolve, reject) {
        return _fs2.default.readFile(htmlFilePath, { encoding: encoding }, function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(error, data) {
                var _dec, _class;

                var virtualConsole, _arr, _i, name, window, basePath, _name, _name2, links, urls, result, sourcePath, ApplicationServerModule, results, filePaths, _loop, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, url, _ret2, files, currentFile, _loop2, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, file;

                return _regenerator2.default.wrap(function _callee4$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                if (!error) {
                                    _context6.next = 2;
                                    break;
                                }

                                return _context6.abrupt('return', reject(error));

                            case 2:
                                // region prepare environment
                                virtualConsole = new _jsdom.VirtualConsole();
                                _arr = ['assert', 'dir', 'error', 'info', 'log', 'time', 'timeEnd', 'trace', 'warn'];

                                for (_i = 0; _i < _arr.length; _i++) {
                                    name = _arr[_i];

                                    virtualConsole.on(name, console[name].bind(console));
                                }window = new _jsdom.JSDOM(data, {
                                    runScripts: 'dangerously', virtualConsole: virtualConsole
                                }).window;
                                basePath = window.document.getElementsByTagName('base')[0].href;

                                for (_name in window) {
                                    if (window.hasOwnProperty(_name) && !_clientnode.globalContext.hasOwnProperty(_name) && (globalVariableNamesToInject.length === 0 || globalVariableNamesToInject.includes(_name))) {
                                        console.info('Inject variable "' + _name + '".');
                                        _clientnode.globalContext[_name] = window[_name];
                                    }
                                }_clientnode2.default.plainObjectPrototypes = _clientnode2.default.plainObjectPrototypes.concat(
                                // IgnoreTypeCheck
                                window.Object.prototype);
                                for (_name2 in scope) {
                                    if (scope.hasOwnProperty(_name2)) _clientnode2.default.extendObject(true, _clientnode.globalContext[_name2], scope[_name2]);
                                } // endregion
                                // region determine pre-renderable paths
                                links = [];
                                urls = void 0;

                                if (!routes.length) {
                                    _context6.next = 28;
                                    break;
                                }

                                if (!(typeof routes[0] === 'string')) {
                                    _context6.next = 17;
                                    break;
                                }

                                // IgnoreTypeCheck
                                urls = routes;
                                _context6.next = 26;
                                break;

                            case 17:
                                result = determinePaths(basePath, routes);
                                _context6.t0 = _regenerator2.default.keys(result.links);

                            case 19:
                                if ((_context6.t1 = _context6.t0()).done) {
                                    _context6.next = 25;
                                    break;
                                }

                                sourcePath = _context6.t1.value;

                                if (!result.links.hasOwnProperty(sourcePath)) {
                                    _context6.next = 23;
                                    break;
                                }

                                return _context6.delegateYield( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                                    var realSourcePath, targetPath;
                                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    realSourcePath = _path2.default.join(targetDirectoryPath, sourcePath.substring(basePath.length).replace(/^\/+(.+)/, '$1'));

                                                    links.push(realSourcePath);
                                                    targetPath = _path2.default.join(targetDirectoryPath, result.links[sourcePath].substring(basePath.length).replace(/^\/+(.+)/, '$1')) + '.html';
                                                    _context2.next = 5;
                                                    return (0, _mkdirp2.default)(_path2.default.dirname(realSourcePath), function () {
                                                        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(error) {
                                                            return _regenerator2.default.wrap(function _callee$(_context) {
                                                                while (1) {
                                                                    switch (_context.prev = _context.next) {
                                                                        case 0:
                                                                            if (!error) {
                                                                                _context.next = 2;
                                                                                break;
                                                                            }

                                                                            return _context.abrupt('return', reject(error));

                                                                        case 2:
                                                                            _context.next = 4;
                                                                            return _clientnode2.default.isFile(realSourcePath);

                                                                        case 4:
                                                                            if (!_context.sent) {
                                                                                _context.next = 7;
                                                                                break;
                                                                            }

                                                                            _context.next = 7;
                                                                            return new _promise2.default(function (resolve, reject) {
                                                                                return (0, _rimraf2.default)(realSourcePath, function (error) {
                                                                                    return error ? reject(error) : resolve();
                                                                                });
                                                                            });

                                                                        case 7:
                                                                            // IgnoreTypeCheck
                                                                            _fs2.default.symlink(targetPath, realSourcePath, function (error) {
                                                                                return error ? reject(error) : resolve();
                                                                            });

                                                                        case 8:
                                                                        case 'end':
                                                                            return _context.stop();
                                                                    }
                                                                }
                                                            }, _callee, _this);
                                                        }));

                                                        return function (_x12) {
                                                            return _ref2.apply(this, arguments);
                                                        };
                                                    }());

                                                case 5:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, _this);
                                })(), 't2', 23);

                            case 23:
                                _context6.next = 19;
                                break;

                            case 25:
                                urls = (0, _from2.default)(result.paths).sort();

                            case 26:
                                _context6.next = 29;
                                break;

                            case 28:
                                urls = [basePath];

                            case 29:
                                // endregion
                                console.info('Found ' + urls.length + ' pre-renderable urls.');
                                // region create server pre-renderable module
                                /**
                                 * Dummy server compatible root application module to pre-render.
                                 */
                                ApplicationServerModule = (_dec = (0, _core.NgModule)({
                                    bootstrap: [ApplicationComponent],
                                    imports: [ApplicationModule, _platformServer.ServerModule],
                                    providers: [{ provide: _common.APP_BASE_HREF, useValue: basePath }]
                                }), _dec(_class = function ApplicationServerModule() {
                                    (0, _classCallCheck3.default)(this, ApplicationServerModule);
                                }) || _class);
                                // endregion

                                (0, _core.enableProdMode)();
                                // region generate pre-rendered html files
                                results = [];
                                filePaths = [];
                                _loop = /*#__PURE__*/_regenerator2.default.mark(function _loop(url) {
                                    var filePath;
                                    return _regenerator2.default.wrap(function _loop$(_context4) {
                                        while (1) {
                                            switch (_context4.prev = _context4.next) {
                                                case 0:
                                                    filePath = _path2.default.join(targetDirectoryPath, url === basePath ? '/' : url.substring(basePath.length).replace(/^\/+(.+)/, '$1')) + '.html';

                                                    filePaths.push(filePath);
                                                    _context4.prev = 2;
                                                    _context4.next = 5;
                                                    return new _promise2.default(function (resolve, reject) {
                                                        return (0, _mkdirp2.default)(_path2.default.dirname(filePath), function () {
                                                            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(error) {
                                                                var result;
                                                                return _regenerator2.default.wrap(function _callee3$(_context3) {
                                                                    while (1) {
                                                                        switch (_context3.prev = _context3.next) {
                                                                            case 0:
                                                                                if (!error) {
                                                                                    _context3.next = 2;
                                                                                    break;
                                                                                }

                                                                                return _context3.abrupt('return', reject(error));

                                                                            case 2:
                                                                                console.info('Pre-render url "' + url + '".');
                                                                                result = '';
                                                                                _context3.prev = 4;
                                                                                _context3.next = 7;
                                                                                return (0, _platformServer.renderModule)(ApplicationServerModule, { document: data, url: url });

                                                                            case 7:
                                                                                result = _context3.sent;
                                                                                _context3.next = 13;
                                                                                break;

                                                                            case 10:
                                                                                _context3.prev = 10;
                                                                                _context3.t0 = _context3['catch'](4);

                                                                                console.warn('Error occurred during pre-rendering path "' + (url + '": ' + _clientnode2.default.representObject(_context3.t0)));

                                                                            case 13:
                                                                                results.push(result);
                                                                                console.info('Write file "' + filePath + '".');
                                                                                _fs2.default.writeFile(filePath, result, function (error) {
                                                                                    return error ? reject(error) : resolve(result);
                                                                                });

                                                                            case 16:
                                                                            case 'end':
                                                                                return _context3.stop();
                                                                        }
                                                                    }
                                                                }, _callee3, _this, [[4, 10]]);
                                                            }));

                                                            return function (_x13) {
                                                                return _ref3.apply(this, arguments);
                                                            };
                                                        }());
                                                    });

                                                case 5:
                                                    _context4.next = 11;
                                                    break;

                                                case 7:
                                                    _context4.prev = 7;
                                                    _context4.t0 = _context4['catch'](2);

                                                    reject(_context4.t0);
                                                    return _context4.abrupt('return', {
                                                        v: void 0
                                                    });

                                                case 11:
                                                case 'end':
                                                    return _context4.stop();
                                            }
                                        }
                                    }, _loop, _this, [[2, 7]]);
                                });
                                _iteratorNormalCompletion2 = true;
                                _didIteratorError2 = false;
                                _iteratorError2 = undefined;
                                _context6.prev = 38;
                                _iterator2 = (0, _getIterator3.default)(urls);

                            case 40:
                                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                    _context6.next = 49;
                                    break;
                                }

                                url = _step2.value;
                                return _context6.delegateYield(_loop(url), 't3', 43);

                            case 43:
                                _ret2 = _context6.t3;

                                if (!((typeof _ret2 === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret2)) === "object")) {
                                    _context6.next = 46;
                                    break;
                                }

                                return _context6.abrupt('return', _ret2.v);

                            case 46:
                                _iteratorNormalCompletion2 = true;
                                _context6.next = 40;
                                break;

                            case 49:
                                _context6.next = 55;
                                break;

                            case 51:
                                _context6.prev = 51;
                                _context6.t4 = _context6['catch'](38);
                                _didIteratorError2 = true;
                                _iteratorError2 = _context6.t4;

                            case 55:
                                _context6.prev = 55;
                                _context6.prev = 56;

                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }

                            case 58:
                                _context6.prev = 58;

                                if (!_didIteratorError2) {
                                    _context6.next = 61;
                                    break;
                                }

                                throw _iteratorError2;

                            case 61:
                                return _context6.finish(58);

                            case 62:
                                return _context6.finish(55);

                            case 63:
                                _context6.next = 65;
                                return _clientnode2.default.walkDirectoryRecursively(targetDirectoryPath);

                            case 65:
                                files = _context6.sent;

                                files.reverse();
                                currentFile = null;
                                _loop2 = /*#__PURE__*/_regenerator2.default.mark(function _loop2(file) {
                                    return _regenerator2.default.wrap(function _loop2$(_context5) {
                                        while (1) {
                                            switch (_context5.prev = _context5.next) {
                                                case 0:
                                                    if (!(filePaths.includes(file.path) || links.includes(file.path))) {
                                                        _context5.next = 4;
                                                        break;
                                                    }

                                                    currentFile = file;
                                                    _context5.next = 7;
                                                    break;

                                                case 4:
                                                    if (currentFile && currentFile.path.startsWith(file.path)) {
                                                        _context5.next = 7;
                                                        break;
                                                    }

                                                    _context5.next = 7;
                                                    return new _promise2.default(function (resolve, reject) {
                                                        return (0, _rimraf2.default)(file.path, function (error) {
                                                            return error ? reject(error) : resolve();
                                                        });
                                                    });

                                                case 7:
                                                case 'end':
                                                    return _context5.stop();
                                            }
                                        }
                                    }, _loop2, _this);
                                });
                                _iteratorNormalCompletion3 = true;
                                _didIteratorError3 = false;
                                _iteratorError3 = undefined;
                                _context6.prev = 72;
                                _iterator3 = (0, _getIterator3.default)(files);

                            case 74:
                                if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                                    _context6.next = 80;
                                    break;
                                }

                                file = _step3.value;
                                return _context6.delegateYield(_loop2(file), 't5', 77);

                            case 77:
                                _iteratorNormalCompletion3 = true;
                                _context6.next = 74;
                                break;

                            case 80:
                                _context6.next = 86;
                                break;

                            case 82:
                                _context6.prev = 82;
                                _context6.t6 = _context6['catch'](72);
                                _didIteratorError3 = true;
                                _iteratorError3 = _context6.t6;

                            case 86:
                                _context6.prev = 86;
                                _context6.prev = 87;

                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }

                            case 89:
                                _context6.prev = 89;

                                if (!_didIteratorError3) {
                                    _context6.next = 92;
                                    break;
                                }

                                throw _iteratorError3;

                            case 92:
                                return _context6.finish(89);

                            case 93:
                                return _context6.finish(86);

                            case 94:
                                // endregion
                                resolve(results);

                            case 95:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee4, _this, [[38, 51, 55, 63], [56,, 58, 62], [72, 82, 86, 94], [87,, 89, 93]]);
            }));

            return function (_x10, _x11) {
                return _ref.apply(this, arguments);
            };
        }());
    });
};

var _clientnode = require('clientnode');

var _clientnode2 = _interopRequireDefault(_clientnode);

var _core = require('@angular/core');

var _common = require('@angular/common');

var _platformServer = require('@angular/platform-server');

var _router = require('@angular/router');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsdom = require('jsdom');

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pouchdbAdapterMemory = require('pouchdb-adapter-memory');

var _pouchdbAdapterMemory2 = _interopRequireDefault(_pouchdbAdapterMemory);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

require('zone.js/dist/zone-node');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// endregion
/**
 * Determines pre-renderable paths from given angular routes configuration
 * object.
 * @param basePath - Applications base path.
 * @param routes - Routes configuration object to analyze.
 * @param root - Current components root path (usually only needed for
 * recursive function calls).
 * @returns Set of distinct paths and linkes representing redirects.
 */

// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
function determinePaths() {
    var basePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
    var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var links = {};
    var paths = new _set2.default();
    routes.reverse();
    var defaultPath = '';
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(routes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var route = _step.value;

            if (route.hasOwnProperty('path')) {
                if (route.hasOwnProperty('redirectTo')) {
                    if (route.path === '**') if (route.redirectTo.startsWith('/')) defaultPath = _path2.default.join(basePath, route.redirectTo);else defaultPath = _path2.default.join(basePath, root, route.redirectTo);
                    links[_path2.default.join(basePath, root, route.path)] = defaultPath;
                } else if (route.path.includes(':')) {
                    if (defaultPath) paths.add(defaultPath);
                    continue;
                } else if (route.path !== '**' && !(route.hasOwnProperty('children') && route.children[route.children.length - 1].path === '**')) paths.add(_path2.default.join(basePath, root, route.path));
                if (route.hasOwnProperty('children')) {
                    var result = determinePaths(basePath, route.children, _path2.default.join(root, route.path));
                    _clientnode2.default.extendObject(links, result.links);
                    paths = new _set2.default([].concat((0, _toConsumableArray3.default)(paths), (0, _toConsumableArray3.default)(result.paths)));
                }
            } else if (route.hasOwnProperty('children')) {
                var _result = determinePaths(basePath, route.children, root);
                _clientnode2.default.extendObject(links, _result.links);
                paths = new _set2.default([].concat((0, _toConsumableArray3.default)(paths), (0, _toConsumableArray3.default)(_result.paths)));
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return { links: links, paths: paths };
}
/**
 * Pre-renders given application routes to given target directory structure.
 * @param ApplicationComponent - Application component to pre-render.
 * @param ApplicationModule - Application module to pre-render.
 * @param routes - Route or routes configuration object or array of paths to
 * pre-render.
 * @param globalVariableNamesToInject - Global variable names to inject into
 * the node context evaluated from given index html file.
 * @param htmlFilePath - HTML file path to use as index.
 * @param targetDirectoryPath - Target directory path to generate pre-rendered
 * html files in.
 * @param scope - Object to inject into the global scope before running
 * pre-rendering.
 * @param encoding - Encoding to use for reading given html file reference.
 * @returns A promise which resolves to a list of pre-rendered html strings.
 */

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUksTUFBTSxjQUFOLENBQXFCLFVBQXJCLENBQUosRUFBc0M7QUFDekMsb0JBQU0sVUFHRixlQUFlLFFBQWYsRUFBeUIsTUFBTSxRQUEvQixFQUF5QyxJQUF6QyxDQUhKO0FBSUEscUNBQU0sWUFBTixDQUFtQixLQUFuQixFQUEwQixRQUFPLEtBQWpDO0FBQ0Esd0JBQVEsNkRBQVksS0FBWixvQ0FBc0IsUUFBTyxLQUE3QixHQUFSO0FBQ0g7QUFsQ0w7QUFMOEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUF3QzlDLFdBQU8sRUFBQyxZQUFELEVBQVEsWUFBUixFQUFQO0FBQ0g7QUFDRCIsImZpbGUiOiJwcmVSZW5kZXIuY29tcGlsZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuLy8gIyEvdXNyL2Jpbi9lbnYgbm9kZVxuLy8gLSotIGNvZGluZzogdXRmLTggLSotXG4vKiogQG1vZHVsZSBwcmVSZW5kZXIgKi9cbid1c2Ugc3RyaWN0J1xuLyogIVxuICAgIHJlZ2lvbiBoZWFkZXJcbiAgICBbUHJvamVjdCBwYWdlXShodHRwczovL2JpdGJ1Y2tldC5vcmcvcG9zaWMvYnB2d2ViYXBwKVxuXG4gICAgQ29weXJpZ2h0IFRvcmJlbiBTaWNrZXJ0IChpbmZvW1wifmF0flwiXXRvcmJlbi53ZWJzaXRlKSAxNi4xMi4yMDEyXG4gICAgZW5kcmVnaW9uXG4qL1xuLy8gcmVnaW9uIGltcG9ydHNcbmltcG9ydCB0eXBlIHtGaWxlLCBXaW5kb3d9IGZyb20gJ2NsaWVudG5vZGUnXG5pbXBvcnQgVG9vbHMsIHtnbG9iYWxDb250ZXh0fSBmcm9tICdjbGllbnRub2RlJ1xuaW1wb3J0IHtlbmFibGVQcm9kTW9kZSwgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnXG5pbXBvcnQge0FQUF9CQVNFX0hSRUZ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbidcbmltcG9ydCB7cmVuZGVyTW9kdWxlLCBTZXJ2ZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLXNlcnZlcidcbmltcG9ydCB7Um91dGVzfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInXG5pbXBvcnQgZmlsZVN5c3RlbSBmcm9tICdmcydcbmltcG9ydCB7SlNET00sIFZpcnR1YWxDb25zb2xlfSBmcm9tICdqc2RvbSdcbmltcG9ydCBtYWtlRGlyZWN0b3J5UGF0aCBmcm9tICdta2RpcnAnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IFBvdWNoREJBZGFwdGVyTWVtb3J5IGZyb20gJ3BvdWNoZGItYWRhcHRlci1tZW1vcnknXG5pbXBvcnQgcmVtb3ZlRGlyZWN0b3J5UmVjdXJzaXZlbHkgZnJvbSAncmltcmFmJ1xuaW1wb3J0ICd6b25lLmpzL2Rpc3Qvem9uZS1ub2RlJ1xuLy8gZW5kcmVnaW9uXG4vKipcbiAqIERldGVybWluZXMgcHJlLXJlbmRlcmFibGUgcGF0aHMgZnJvbSBnaXZlbiBhbmd1bGFyIHJvdXRlcyBjb25maWd1cmF0aW9uXG4gKiBvYmplY3QuXG4gKiBAcGFyYW0gYmFzZVBhdGggLSBBcHBsaWNhdGlvbnMgYmFzZSBwYXRoLlxuICogQHBhcmFtIHJvdXRlcyAtIFJvdXRlcyBjb25maWd1cmF0aW9uIG9iamVjdCB0byBhbmFseXplLlxuICogQHBhcmFtIHJvb3QgLSBDdXJyZW50IGNvbXBvbmVudHMgcm9vdCBwYXRoICh1c3VhbGx5IG9ubHkgbmVlZGVkIGZvclxuICogcmVjdXJzaXZlIGZ1bmN0aW9uIGNhbGxzKS5cbiAqIEByZXR1cm5zIFNldCBvZiBkaXN0aW5jdCBwYXRocyBhbmQgbGlua2VzIHJlcHJlc2VudGluZyByZWRpcmVjdHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZXRlcm1pbmVQYXRocyhcbiAgICBiYXNlUGF0aDpzdHJpbmcgPSAnLycsIHJvdXRlczpSb3V0ZXMgPSBbXSwgcm9vdDpzdHJpbmcgPSAnJ1xuKTp7bGlua3M6e1trZXk6c3RyaW5nXTpzdHJpbmd9O3BhdGhzOlNldDxzdHJpbmc+fSB7XG4gICAgbGV0IGxpbmtzOntba2V5OnN0cmluZ106c3RyaW5nfSA9IHt9XG4gICAgbGV0IHBhdGhzOlNldDxzdHJpbmc+ID0gbmV3IFNldCgpXG4gICAgcm91dGVzLnJldmVyc2UoKVxuICAgIGxldCBkZWZhdWx0UGF0aDpzdHJpbmcgPSAnJ1xuICAgIGZvciAoY29uc3Qgcm91dGU6T2JqZWN0IG9mIHJvdXRlcylcbiAgICAgICAgaWYgKHJvdXRlLmhhc093blByb3BlcnR5KCdwYXRoJykpIHtcbiAgICAgICAgICAgIGlmIChyb3V0ZS5oYXNPd25Qcm9wZXJ0eSgncmVkaXJlY3RUbycpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJvdXRlLnBhdGggPT09ICcqKicpXG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3V0ZS5yZWRpcmVjdFRvLnN0YXJ0c1dpdGgoJy8nKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQYXRoID0gcGF0aC5qb2luKGJhc2VQYXRoLCByb3V0ZS5yZWRpcmVjdFRvKVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UGF0aCA9IHBhdGguam9pbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlUGF0aCwgcm9vdCwgcm91dGUucmVkaXJlY3RUbylcbiAgICAgICAgICAgICAgICBsaW5rc1twYXRoLmpvaW4oYmFzZVBhdGgsIHJvb3QsIHJvdXRlLnBhdGgpXSA9IGRlZmF1bHRQYXRoXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJvdXRlLnBhdGguaW5jbHVkZXMoJzonKSkge1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0UGF0aClcbiAgICAgICAgICAgICAgICAgICAgcGF0aHMuYWRkKGRlZmF1bHRQYXRoKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJvdXRlLnBhdGggIT09ICcqKicgJiYgIShyb3V0ZS5oYXNPd25Qcm9wZXJ0eShcbiAgICAgICAgICAgICAgICAnY2hpbGRyZW4nXG4gICAgICAgICAgICApICYmIHJvdXRlLmNoaWxkcmVuW3JvdXRlLmNoaWxkcmVuLmxlbmd0aCAtIDFdLnBhdGggPT09ICcqKicpKVxuICAgICAgICAgICAgICAgIHBhdGhzLmFkZChwYXRoLmpvaW4oYmFzZVBhdGgsIHJvb3QsIHJvdXRlLnBhdGgpKVxuICAgICAgICAgICAgaWYgKHJvdXRlLmhhc093blByb3BlcnR5KCdjaGlsZHJlbicpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OntcbiAgICAgICAgICAgICAgICAgICAgbGlua3M6e1trZXk6c3RyaW5nXTpzdHJpbmd9O1xuICAgICAgICAgICAgICAgICAgICBwYXRoczpTZXQ8c3RyaW5nPjtcbiAgICAgICAgICAgICAgICB9ID0gZGV0ZXJtaW5lUGF0aHMoYmFzZVBhdGgsIHJvdXRlLmNoaWxkcmVuLCBwYXRoLmpvaW4oXG4gICAgICAgICAgICAgICAgICAgIHJvb3QsIHJvdXRlLnBhdGgpKVxuICAgICAgICAgICAgICAgIFRvb2xzLmV4dGVuZE9iamVjdChsaW5rcywgcmVzdWx0LmxpbmtzKVxuICAgICAgICAgICAgICAgIHBhdGhzID0gbmV3IFNldChbLi4ucGF0aHMsIC4uLnJlc3VsdC5wYXRoc10pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocm91dGUuaGFzT3duUHJvcGVydHkoJ2NoaWxkcmVuJykpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdDp7XG4gICAgICAgICAgICAgICAgbGlua3M6e1trZXk6c3RyaW5nXTpzdHJpbmd9O1xuICAgICAgICAgICAgICAgIHBhdGhzOlNldDxzdHJpbmc+O1xuICAgICAgICAgICAgfSA9IGRldGVybWluZVBhdGhzKGJhc2VQYXRoLCByb3V0ZS5jaGlsZHJlbiwgcm9vdClcbiAgICAgICAgICAgIFRvb2xzLmV4dGVuZE9iamVjdChsaW5rcywgcmVzdWx0LmxpbmtzKVxuICAgICAgICAgICAgcGF0aHMgPSBuZXcgU2V0KFsuLi5wYXRocywgLi4ucmVzdWx0LnBhdGhzXSlcbiAgICAgICAgfVxuICAgIHJldHVybiB7bGlua3MsIHBhdGhzfVxufVxuLyoqXG4gKiBQcmUtcmVuZGVycyBnaXZlbiBhcHBsaWNhdGlvbiByb3V0ZXMgdG8gZ2l2ZW4gdGFyZ2V0IGRpcmVjdG9yeSBzdHJ1Y3R1cmUuXG4gKiBAcGFyYW0gQXBwbGljYXRpb25Db21wb25lbnQgLSBBcHBsaWNhdGlvbiBjb21wb25lbnQgdG8gcHJlLXJlbmRlci5cbiAqIEBwYXJhbSBBcHBsaWNhdGlvbk1vZHVsZSAtIEFwcGxpY2F0aW9uIG1vZHVsZSB0byBwcmUtcmVuZGVyLlxuICogQHBhcmFtIHJvdXRlcyAtIFJvdXRlIG9yIHJvdXRlcyBjb25maWd1cmF0aW9uIG9iamVjdCBvciBhcnJheSBvZiBwYXRocyB0b1xuICogcHJlLXJlbmRlci5cbiAqIEBwYXJhbSBnbG9iYWxWYXJpYWJsZU5hbWVzVG9JbmplY3QgLSBHbG9iYWwgdmFyaWFibGUgbmFtZXMgdG8gaW5qZWN0IGludG9cbiAqIHRoZSBub2RlIGNvbnRleHQgZXZhbHVhdGVkIGZyb20gZ2l2ZW4gaW5kZXggaHRtbCBmaWxlLlxuICogQHBhcmFtIGh0bWxGaWxlUGF0aCAtIEhUTUwgZmlsZSBwYXRoIHRvIHVzZSBhcyBpbmRleC5cbiAqIEBwYXJhbSB0YXJnZXREaXJlY3RvcnlQYXRoIC0gVGFyZ2V0IGRpcmVjdG9yeSBwYXRoIHRvIGdlbmVyYXRlIHByZS1yZW5kZXJlZFxuICogaHRtbCBmaWxlcyBpbi5cbiAqIEBwYXJhbSBzY29wZSAtIE9iamVjdCB0byBpbmplY3QgaW50byB0aGUgZ2xvYmFsIHNjb3BlIGJlZm9yZSBydW5uaW5nXG4gKiBwcmUtcmVuZGVyaW5nLlxuICogQHBhcmFtIGVuY29kaW5nIC0gRW5jb2RpbmcgdG8gdXNlIGZvciByZWFkaW5nIGdpdmVuIGh0bWwgZmlsZSByZWZlcmVuY2UuXG4gKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgdG8gYSBsaXN0IG9mIHByZS1yZW5kZXJlZCBodG1sIHN0cmluZ3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKFxuICAgIEFwcGxpY2F0aW9uQ29tcG9uZW50Ok9iamVjdCxcbiAgICBBcHBsaWNhdGlvbk1vZHVsZTpPYmplY3QsXG4gICAgLy8gSWdub3JlVHlwZUNoZWNrXG4gICAgcm91dGVzOnN0cmluZ3xBcnJheTxzdHJpbmc+fFJvdXRlcyA9IFtdLFxuICAgIGdsb2JhbFZhcmlhYmxlTmFtZXNUb0luamVjdDpzdHJpbmd8QXJyYXk8c3RyaW5nPiA9ICdnZW5lcmljSW5pdGlhbERhdGEnLFxuICAgIGh0bWxGaWxlUGF0aDpzdHJpbmcgPSBwYXRoLnJlc29sdmUoXG4gICAgICAgIHBhdGguZGlybmFtZShwcm9jZXNzLmFyZ3ZbMV0pLCAnaW5kZXguaHRtbCcpLFxuICAgIHRhcmdldERpcmVjdG9yeVBhdGg6c3RyaW5nID0gcGF0aC5yZXNvbHZlKFxuICAgICAgICBwYXRoLmRpcm5hbWUocHJvY2Vzcy5hcmd2WzFdKSwgJ3ByZVJlbmRlcmVkJyksXG4gICAgc2NvcGU6T2JqZWN0ID0ge2dlbmVyaWNJbml0aWFsRGF0YToge2NvbmZpZ3VyYXRpb246IHtkYXRhYmFzZToge1xuICAgICAgICBjb25uZWN0b3I6IHthZGFwdGVyOiAnbWVtb3J5J30sXG4gICAgICAgIHBsdWdpbnM6IFtQb3VjaERCQWRhcHRlck1lbW9yeV1cbiAgICB9fX19LFxuICAgIGVuY29kaW5nOnN0cmluZyA9ICd1dGYtOCdcbik6UHJvbWlzZTxBcnJheTxzdHJpbmc+PiB7XG4gICAgZ2xvYmFsVmFyaWFibGVOYW1lc1RvSW5qZWN0ID0gW10uY29uY2F0KGdsb2JhbFZhcmlhYmxlTmFtZXNUb0luamVjdClcbiAgICByb3V0ZXMgPSBbXS5jb25jYXQocm91dGVzKVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoXG4gICAgICAgIHJlc29sdmU6RnVuY3Rpb24sIHJlamVjdDpGdW5jdGlvblxuICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICk6dm9pZCA9PiBmaWxlU3lzdGVtLnJlYWRGaWxlKGh0bWxGaWxlUGF0aCwge2VuY29kaW5nfSwgYXN5bmMgKFxuICAgICAgICBlcnJvcjo/RXJyb3IsIGRhdGE6c3RyaW5nXG4gICAgKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcilcbiAgICAgICAgLy8gcmVnaW9uIHByZXBhcmUgZW52aXJvbm1lbnRcbiAgICAgICAgY29uc3QgdmlydHVhbENvbnNvbGU6T2JqZWN0ID0gbmV3IFZpcnR1YWxDb25zb2xlKClcbiAgICAgICAgZm9yIChjb25zdCBuYW1lOnN0cmluZyBvZiBbXG4gICAgICAgICAgICAnYXNzZXJ0JywgJ2RpcicsICdlcnJvcicsICdpbmZvJywgJ2xvZycsICd0aW1lJywgJ3RpbWVFbmQnLFxuICAgICAgICAgICAgJ3RyYWNlJywgJ3dhcm4nXG4gICAgICAgIF0pXG4gICAgICAgICAgICB2aXJ0dWFsQ29uc29sZS5vbihuYW1lLCBjb25zb2xlW25hbWVdLmJpbmQoY29uc29sZSkpXG4gICAgICAgIGNvbnN0IHdpbmRvdzpXaW5kb3cgPSAobmV3IEpTRE9NKGRhdGEsIHtcbiAgICAgICAgICAgIHJ1blNjcmlwdHM6ICdkYW5nZXJvdXNseScsIHZpcnR1YWxDb25zb2xlXG4gICAgICAgIH0pKS53aW5kb3dcbiAgICAgICAgY29uc3QgYmFzZVBhdGg6c3RyaW5nID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFxuICAgICAgICAgICAgJ2Jhc2UnXG4gICAgICAgIClbMF0uaHJlZlxuICAgICAgICBmb3IgKGNvbnN0IG5hbWU6c3RyaW5nIGluIHdpbmRvdylcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGFzT3duUHJvcGVydHkobmFtZSkgJiZcbiAgICAgICAgICAgICAgICAhZ2xvYmFsQ29udGV4dC5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbFZhcmlhYmxlTmFtZXNUb0luamVjdC5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsVmFyaWFibGVOYW1lc1RvSW5qZWN0LmluY2x1ZGVzKG5hbWUpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGBJbmplY3QgdmFyaWFibGUgXCIke25hbWV9XCIuYClcbiAgICAgICAgICAgICAgICBnbG9iYWxDb250ZXh0W25hbWVdID0gd2luZG93W25hbWVdXG4gICAgICAgICAgICB9XG4gICAgICAgIFRvb2xzLnBsYWluT2JqZWN0UHJvdG90eXBlcyA9IFRvb2xzLnBsYWluT2JqZWN0UHJvdG90eXBlcy5jb25jYXQoXG4gICAgICAgICAgICAvLyBJZ25vcmVUeXBlQ2hlY2tcbiAgICAgICAgICAgIHdpbmRvdy5PYmplY3QucHJvdG90eXBlKVxuICAgICAgICBmb3IgKGNvbnN0IG5hbWU6c3RyaW5nIGluIHNjb3BlKVxuICAgICAgICAgICAgaWYgKHNjb3BlLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgICAgICAgIFRvb2xzLmV4dGVuZE9iamVjdCh0cnVlLCBnbG9iYWxDb250ZXh0W25hbWVdLCBzY29wZVtuYW1lXSlcbiAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgICAgIC8vIHJlZ2lvbiBkZXRlcm1pbmUgcHJlLXJlbmRlcmFibGUgcGF0aHNcbiAgICAgICAgY29uc3QgbGlua3M6QXJyYXk8c3RyaW5nPiA9IFtdXG4gICAgICAgIGxldCB1cmxzOkFycmF5PHN0cmluZz5cbiAgICAgICAgaWYgKHJvdXRlcy5sZW5ndGgpXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJvdXRlc1swXSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgLy8gSWdub3JlVHlwZUNoZWNrXG4gICAgICAgICAgICAgICAgdXJscyA9IHJvdXRlc1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OntcbiAgICAgICAgICAgICAgICAgICAgbGlua3M6e1trZXk6c3RyaW5nXTpzdHJpbmd9O1xuICAgICAgICAgICAgICAgICAgICBwYXRoczpTZXQ8c3RyaW5nPjtcbiAgICAgICAgICAgICAgICB9ID0gZGV0ZXJtaW5lUGF0aHMoYmFzZVBhdGgsIHJvdXRlcylcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHNvdXJjZVBhdGg6c3RyaW5nIGluIHJlc3VsdC5saW5rcylcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5saW5rcy5oYXNPd25Qcm9wZXJ0eShzb3VyY2VQYXRoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVhbFNvdXJjZVBhdGg6c3RyaW5nID0gcGF0aC5qb2luKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldERpcmVjdG9yeVBhdGgsIHNvdXJjZVBhdGguc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlUGF0aC5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnJlcGxhY2UoL15cXC8rKC4rKS8sICckMScpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua3MucHVzaChyZWFsU291cmNlUGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFBhdGg6c3RyaW5nID0gcGF0aC5qb2luKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldERpcmVjdG9yeVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmxpbmtzW3NvdXJjZVBhdGhdLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVBhdGgubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5yZXBsYWNlKC9eXFwvKyguKykvLCAnJDEnKSkgKyAnLmh0bWwnXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBtYWtlRGlyZWN0b3J5UGF0aChwYXRoLmRpcm5hbWUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhbFNvdXJjZVBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICksIGFzeW5jIChlcnJvcjo/RXJyb3IpOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXdhaXQgVG9vbHMuaXNGaWxlKHJlYWxTb3VyY2VQYXRoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZTpGdW5jdGlvbiwgcmVqZWN0OkZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk6dm9pZCA9PiByZW1vdmVEaXJlY3RvcnlSZWN1cnNpdmVseShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWxTb3VyY2VQYXRoLCAoZXJyb3I6P0Vycm9yKTp2b2lkID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmVUeXBlQ2hlY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU3lzdGVtLnN5bWxpbmsodGFyZ2V0UGF0aCwgcmVhbFNvdXJjZVBhdGgsIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6P0Vycm9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTp2b2lkID0+IGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1cmxzID0gQXJyYXkuZnJvbShyZXN1bHQucGF0aHMpLnNvcnQoKVxuICAgICAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB1cmxzID0gW2Jhc2VQYXRoXVxuICAgICAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgY29uc29sZS5pbmZvKGBGb3VuZCAke3VybHMubGVuZ3RofSBwcmUtcmVuZGVyYWJsZSB1cmxzLmApXG4gICAgICAgIC8vIHJlZ2lvbiBjcmVhdGUgc2VydmVyIHByZS1yZW5kZXJhYmxlIG1vZHVsZVxuICAgICAgICAvKipcbiAgICAgICAgICogRHVtbXkgc2VydmVyIGNvbXBhdGlibGUgcm9vdCBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gcHJlLXJlbmRlci5cbiAgICAgICAgICovXG4gICAgICAgIEBOZ01vZHVsZSh7XG4gICAgICAgICAgICBib290c3RyYXA6IFtBcHBsaWNhdGlvbkNvbXBvbmVudF0sXG4gICAgICAgICAgICBpbXBvcnRzOiBbQXBwbGljYXRpb25Nb2R1bGUsIFNlcnZlck1vZHVsZV0sXG4gICAgICAgICAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQVBQX0JBU0VfSFJFRiwgdXNlVmFsdWU6IGJhc2VQYXRofV1cbiAgICAgICAgfSlcbiAgICAgICAgY2xhc3MgQXBwbGljYXRpb25TZXJ2ZXJNb2R1bGUge31cbiAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgICAgIGVuYWJsZVByb2RNb2RlKClcbiAgICAgICAgLy8gcmVnaW9uIGdlbmVyYXRlIHByZS1yZW5kZXJlZCBodG1sIGZpbGVzXG4gICAgICAgIGNvbnN0IHJlc3VsdHM6QXJyYXk8c3RyaW5nPiA9IFtdXG4gICAgICAgIGNvbnN0IGZpbGVQYXRoczpBcnJheTxzdHJpbmc+ID0gW11cbiAgICAgICAgZm9yIChjb25zdCB1cmw6c3RyaW5nIG9mIHVybHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoOnN0cmluZyA9IHBhdGguam9pbih0YXJnZXREaXJlY3RvcnlQYXRoLCAoXG4gICAgICAgICAgICAgICAgdXJsID09PSBiYXNlUGF0aFxuICAgICAgICAgICAgKSA/ICcvJyA6XG4gICAgICAgICAgICAgICAgdXJsLnN1YnN0cmluZyhiYXNlUGF0aC5sZW5ndGgpLnJlcGxhY2UoL15cXC8rKC4rKS8sICckMScpKSArXG4gICAgICAgICAgICAgICAgJy5odG1sJ1xuICAgICAgICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZTpGdW5jdGlvbiwgcmVqZWN0OkZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgKTp2b2lkID0+IG1ha2VEaXJlY3RvcnlQYXRoKHBhdGguZGlybmFtZShmaWxlUGF0aCksIGFzeW5jIChcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6P0Vycm9yXG4gICAgICAgICAgICAgICAgKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGBQcmUtcmVuZGVyIHVybCBcIiR7dXJsfVwiLmApXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6c3RyaW5nID0gJydcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHJlbmRlck1vZHVsZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNlcnZlck1vZHVsZSwge2RvY3VtZW50OiBkYXRhLCB1cmx9KVxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFcnJvciBvY2N1cnJlZCBkdXJpbmcgcHJlLXJlbmRlcmluZyBwYXRoIFwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7dXJsfVwiOiAke1Rvb2xzLnJlcHJlc2VudE9iamVjdChlcnJvcil9YClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oYFdyaXRlIGZpbGUgXCIke2ZpbGVQYXRofVwiLmApXG4gICAgICAgICAgICAgICAgICAgIGZpbGVTeXN0ZW0ud3JpdGVGaWxlKGZpbGVQYXRoLCByZXN1bHQsICgoXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjo/RXJyb3JcbiAgICAgICAgICAgICAgICAgICAgKTp2b2lkID0+IGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUocmVzdWx0KSkpXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgLy8gcmVnaW9uIHRpZHkgdXBcbiAgICAgICAgY29uc3QgZmlsZXM6QXJyYXk8RmlsZT4gPSBhd2FpdCBUb29scy53YWxrRGlyZWN0b3J5UmVjdXJzaXZlbHkoXG4gICAgICAgICAgICB0YXJnZXREaXJlY3RvcnlQYXRoKVxuICAgICAgICBmaWxlcy5yZXZlcnNlKClcbiAgICAgICAgbGV0IGN1cnJlbnRGaWxlOj9GaWxlID0gbnVsbFxuICAgICAgICBmb3IgKGNvbnN0IGZpbGU6RmlsZSBvZiBmaWxlcylcbiAgICAgICAgICAgIGlmIChmaWxlUGF0aHMuaW5jbHVkZXMoZmlsZS5wYXRoKSB8fCBsaW5rcy5pbmNsdWRlcyhmaWxlLnBhdGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRGaWxlID0gZmlsZVxuICAgICAgICAgICAgZWxzZSBpZiAoIShjdXJyZW50RmlsZSAmJiBjdXJyZW50RmlsZS5wYXRoLnN0YXJ0c1dpdGgoZmlsZS5wYXRoKSkpXG4gICAgICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmU6RnVuY3Rpb24sIHJlamVjdDpGdW5jdGlvbik6dm9pZCA9PlxuICAgICAgICAgICAgICAgICAgICByZW1vdmVEaXJlY3RvcnlSZWN1cnNpdmVseShmaWxlLnBhdGgsIChcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOj9FcnJvclxuICAgICAgICAgICAgICAgICAgICApOnZvaWQgPT4gZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZSgpKSlcbiAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgICAgIHJlc29sdmUocmVzdWx0cylcbiAgICB9KSlcbn1cbi8vIHJlZ2lvbiB2aW0gbW9kbGluZVxuLy8gdmltOiBzZXQgdGFic3RvcD00IHNoaWZ0d2lkdGg9NCBleHBhbmR0YWI6XG4vLyB2aW06IGZvbGRtZXRob2Q9bWFya2VyIGZvbGRtYXJrZXI9cmVnaW9uLGVuZHJlZ2lvbjpcbi8vIGVuZHJlZ2lvblxuIl19