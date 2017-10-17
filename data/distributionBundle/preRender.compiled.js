
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

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

exports.determinePaths = determinePaths;

exports.default = function (ApplicationComponent, ApplicationModule,
// IgnoreTypeCheck
routes = [], globalVariableNamesToInject = 'genericInitialData', htmlFilePath = _path2.default.resolve(_path2.default.dirname(process.argv[1]), 'index.html'), targetDirectoryPath = _path2.default.resolve(_path2.default.dirname(process.argv[1]), 'preRendered'), scope = { genericInitialData: { configuration: { database: {
                connector: { adapter: 'memory' },
                plugins: [_pouchdbAdapterMemory2.default]
            } } } }, encoding = 'utf-8') {
    globalVariableNamesToInject = [].concat(globalVariableNamesToInject);
    routes = [].concat(routes);
    return new _promise2.default((resolve, reject) => _fs2.default.readFile(htmlFilePath, { encoding }, (() => {
        var _ref = (0, _asyncToGenerator3.default)(function* (error, data) {
            var _dec, _class;

            if (error) return reject(error);
            // region prepare environment
            const virtualConsole = new _jsdom.VirtualConsole();
            for (const name of ['assert', 'dir', 'error', 'info', 'log', 'time', 'timeEnd', 'trace', 'warn']) virtualConsole.on(name, console[name].bind(console));
            const window = new _jsdom.JSDOM(data, {
                runScripts: 'dangerously', virtualConsole
            }).window;
            const basePath = window.document.getElementsByTagName('base')[0].href;
            for (const name in window) if (window.hasOwnProperty(name) && !_clientnode.globalContext.hasOwnProperty(name) && (globalVariableNamesToInject.length === 0 || globalVariableNamesToInject.includes(name))) {
                console.info(`Inject variable "${name}".`);
                _clientnode.globalContext[name] = window[name];
            }
            _clientnode2.default.plainObjectPrototypes = _clientnode2.default.plainObjectPrototypes.concat(
            // IgnoreTypeCheck
            window.Object.prototype);
            for (const name in scope) if (scope.hasOwnProperty(name)) _clientnode2.default.extendObject(true, _clientnode.globalContext[name], scope[name]);
            // endregion
            // region determine pre-renderable paths
            const links = [];
            let urls;
            if (routes.length) {
                if (typeof routes[0] === 'string')
                    // IgnoreTypeCheck
                    urls = routes;else {
                    const result = determinePaths(basePath, routes);
                    for (const sourcePath in result.links) if (result.links.hasOwnProperty(sourcePath)) {
                        const realSourcePath = _path2.default.join(targetDirectoryPath, sourcePath.substring(basePath.length).replace(/^\/+(.+)/, '$1'));
                        links.push(realSourcePath);
                        const targetPath = _path2.default.join(targetDirectoryPath, result.links[sourcePath].substring(basePath.length).replace(/^\/+(.+)/, '$1')) + '.html';
                        yield (0, _mkdirp2.default)(_path2.default.dirname(realSourcePath), (() => {
                            var _ref2 = (0, _asyncToGenerator3.default)(function* (error) {
                                if (error) return reject(error);
                                if (yield _clientnode2.default.isFile(realSourcePath)) yield new _promise2.default(function (resolve, reject) {
                                    return (0, _rimraf2.default)(realSourcePath, function (error) {
                                        return error ? reject(error) : resolve();
                                    });
                                });
                                // IgnoreTypeCheck
                                _fs2.default.symlink(targetPath, realSourcePath, function (error) {
                                    return error ? reject(error) : resolve();
                                });
                            });

                            return function (_x3) {
                                return _ref2.apply(this, arguments);
                            };
                        })());
                    }
                    urls = (0, _from2.default)(result.paths).sort();
                }
            } else urls = [basePath];
            // endregion
            console.info(`Found ${urls.length} pre-renderable urls.`);
            // region create server pre-renderable module
            /**
             * Dummy server compatible root application module to pre-render.
             */
            let ApplicationServerModule = (_dec = (0, _core.NgModule)({
                bootstrap: [ApplicationComponent],
                imports: [ApplicationModule, _platformServer.ServerModule],
                providers: [{ provide: _common.APP_BASE_HREF, useValue: basePath }]
            }), _dec(_class = class ApplicationServerModule {}) || _class);
            // endregion

            (0, _core.enableProdMode)();
            // region generate pre-rendered html files
            const results = [];
            const filePaths = [];
            for (const url of urls) {
                const filePath = _path2.default.join(targetDirectoryPath, url === basePath ? '/' : url.substring(basePath.length).replace(/^\/+(.+)/, '$1')) + '.html';
                filePaths.push(filePath);
                try {
                    yield new _promise2.default(function (resolve, reject) {
                        return (0, _mkdirp2.default)(_path2.default.dirname(filePath), (() => {
                            var _ref3 = (0, _asyncToGenerator3.default)(function* (error) {
                                if (error) return reject(error);
                                console.info(`Pre-render url "${url}".`);
                                let result = '';
                                try {
                                    result = yield (0, _platformServer.renderModule)(ApplicationServerModule, { document: data, url });
                                } catch (error) {
                                    console.warn('Error occurred during pre-rendering path "' + `${url}": ${_clientnode2.default.representObject(error)}`);
                                }
                                results.push(result);
                                console.info(`Write file "${filePath}".`);
                                _fs2.default.writeFile(filePath, result, function (error) {
                                    return error ? reject(error) : resolve(result);
                                });
                            });

                            return function (_x4) {
                                return _ref3.apply(this, arguments);
                            };
                        })());
                    });
                } catch (error) {
                    reject(error);
                    return;
                }
            }
            // endregion
            // region tidy up
            const files = yield _clientnode2.default.walkDirectoryRecursively(targetDirectoryPath);
            files.reverse();
            let currentFile = null;
            for (const file of files) if (filePaths.includes(file.path) || links.includes(file.path)) currentFile = file;else if (!(currentFile && currentFile.path.startsWith(file.path))) yield new _promise2.default(function (resolve, reject) {
                return (0, _rimraf2.default)(file.path, function (error) {
                    return error ? reject(error) : resolve();
                });
            });
            // endregion
            resolve(results);
        });

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    })()));
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
function determinePaths(basePath = '/', routes = [], root = '') {
    let links = {};
    let paths = new _set2.default();
    routes.reverse();
    let defaultPath = '';
    for (const route of routes) if (route.hasOwnProperty('path')) {
        if (route.hasOwnProperty('redirectTo')) {
            if (route.path === '**') if (route.redirectTo.startsWith('/')) defaultPath = _path2.default.join(basePath, route.redirectTo);else defaultPath = _path2.default.join(basePath, root, route.redirectTo);
            links[_path2.default.join(basePath, root, route.path)] = defaultPath;
        } else if (route.path.includes(':')) {
            if (defaultPath) paths.add(defaultPath);
            continue;
        } else if (route.path !== '**' && !(route.hasOwnProperty('children') && route.children[route.children.length - 1].path === '**')) paths.add(_path2.default.join(basePath, root, route.path));
        if (route.hasOwnProperty('children')) {
            const result = determinePaths(basePath, route.children, _path2.default.join(root, route.path));
            _clientnode2.default.extendObject(links, result.links);
            paths = new _set2.default([...paths, ...result.paths]);
        }
    } else if (route.hasOwnProperty('children')) {
        const result = determinePaths(basePath, route.children, root);
        _clientnode2.default.extendObject(links, result.links);
        paths = new _set2.default([...paths, ...result.paths]);
    }
    return { links, paths };
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RGdDLEtBRS9CLE1BQU0sUUFBTixDQUFlLE1BQU0sUUFBTixDQUFlLE1BQWYsR0FBd0IsQ0FBdkMsRUFBMEMsSUFBMUMsS0FBbUQsSUFGdEIsQ0FBM0IsRUFHSCxNQUFNLEdBQU4sQ0FBVSxlQUFLLElBQUwsQ0FBVSxRQUFWLEVBQW9CLElBQXBCLEVBQTBCLE1BQU0sSUFBaEMsQ0FBVjtBQUNKLFlBQUksTUFBTSxjQUFOLENBQXFCLFVBQXJCLENBQUosRUFBc0M7QUFDbEMsa0JBQU0sU0FHRixlQUFlLFFBQWYsRUFBeUIsTUFBTSxRQUEvQixFQUF5QyxlQUFLLElBQUwsQ0FDekMsSUFEeUMsRUFDbkMsTUFBTSxJQUQ2QixDQUF6QyxDQUhKO0FBS0EsaUNBQU0sWUFBTixDQUFtQixLQUFuQixFQUEwQixPQUFPLEtBQWpDO0FBQ0Esb0JBQVEsa0JBQVEsQ0FBQyxHQUFHLEtBQUosRUFBVyxHQUFHLE9BQU8sS0FBckIsQ0FBUixDQUFSO0FBQ0g7QUFDSixLQTFCRCxNQTBCTyxJQUFJLE1BQU0sY0FBTixDQUFxQixVQUFyQixDQUFKLEVBQXNDO0FBQ3pDLGNBQU0sU0FHRixlQUFlLFFBQWYsRUFBeUIsTUFBTSxRQUEvQixFQUF5QyxJQUF6QyxDQUhKO0FBSUEsNkJBQU0sWUFBTixDQUFtQixLQUFuQixFQUEwQixPQUFPLEtBQWpDO0FBQ0EsZ0JBQVEsa0JBQVEsQ0FBQyxHQUFHLEtBQUosRUFBVyxHQUFHLE9BQU8sS0FBckIsQ0FBUixDQUFSO0FBQ0g7QUFDTCxXQUFPLEVBQUMsS0FBRCxFQUFRLEtBQVIsRUFBUDtBQUNIO0FBQ0QiLCJmaWxlIjoicHJlUmVuZGVyLmNvbXBpbGVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbi8vICMhL3Vzci9iaW4vZW52IG5vZGVcbi8vIC0qLSBjb2Rpbmc6IHV0Zi04IC0qLVxuLyoqIEBtb2R1bGUgcHJlUmVuZGVyICovXG4ndXNlIHN0cmljdCdcbi8qICFcbiAgICByZWdpb24gaGVhZGVyXG4gICAgW1Byb2plY3QgcGFnZV0oaHR0cHM6Ly9iaXRidWNrZXQub3JnL3Bvc2ljL2JwdndlYmFwcClcblxuICAgIENvcHlyaWdodCBUb3JiZW4gU2lja2VydCAoaW5mb1tcIn5hdH5cIl10b3JiZW4ud2Vic2l0ZSkgMTYuMTIuMjAxMlxuICAgIGVuZHJlZ2lvblxuKi9cbi8vIHJlZ2lvbiBpbXBvcnRzXG5pbXBvcnQgdHlwZSB7RmlsZSwgV2luZG93fSBmcm9tICdjbGllbnRub2RlJ1xuaW1wb3J0IFRvb2xzLCB7Z2xvYmFsQ29udGV4dH0gZnJvbSAnY2xpZW50bm9kZSdcbmltcG9ydCB7ZW5hYmxlUHJvZE1vZGUsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHtBUFBfQkFTRV9IUkVGfSBmcm9tICdAYW5ndWxhci9jb21tb24nXG5pbXBvcnQge3JlbmRlck1vZHVsZSwgU2VydmVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1zZXJ2ZXInXG5pbXBvcnQge1JvdXRlc30gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJ1xuaW1wb3J0IGZpbGVTeXN0ZW0gZnJvbSAnZnMnXG5pbXBvcnQge0pTRE9NLCBWaXJ0dWFsQ29uc29sZX0gZnJvbSAnanNkb20nXG5pbXBvcnQgbWFrZURpcmVjdG9yeVBhdGggZnJvbSAnbWtkaXJwJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBQb3VjaERCQWRhcHRlck1lbW9yeSBmcm9tICdwb3VjaGRiLWFkYXB0ZXItbWVtb3J5J1xuaW1wb3J0IHJlbW92ZURpcmVjdG9yeVJlY3Vyc2l2ZWx5IGZyb20gJ3JpbXJhZidcbmltcG9ydCAnem9uZS5qcy9kaXN0L3pvbmUtbm9kZSdcbi8vIGVuZHJlZ2lvblxuLyoqXG4gKiBEZXRlcm1pbmVzIHByZS1yZW5kZXJhYmxlIHBhdGhzIGZyb20gZ2l2ZW4gYW5ndWxhciByb3V0ZXMgY29uZmlndXJhdGlvblxuICogb2JqZWN0LlxuICogQHBhcmFtIGJhc2VQYXRoIC0gQXBwbGljYXRpb25zIGJhc2UgcGF0aC5cbiAqIEBwYXJhbSByb3V0ZXMgLSBSb3V0ZXMgY29uZmlndXJhdGlvbiBvYmplY3QgdG8gYW5hbHl6ZS5cbiAqIEBwYXJhbSByb290IC0gQ3VycmVudCBjb21wb25lbnRzIHJvb3QgcGF0aCAodXN1YWxseSBvbmx5IG5lZWRlZCBmb3JcbiAqIHJlY3Vyc2l2ZSBmdW5jdGlvbiBjYWxscykuXG4gKiBAcmV0dXJucyBTZXQgb2YgZGlzdGluY3QgcGF0aHMgYW5kIGxpbmtlcyByZXByZXNlbnRpbmcgcmVkaXJlY3RzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGV0ZXJtaW5lUGF0aHMoXG4gICAgYmFzZVBhdGg6c3RyaW5nID0gJy8nLCByb3V0ZXM6Um91dGVzID0gW10sIHJvb3Q6c3RyaW5nID0gJydcbik6e2xpbmtzOntba2V5OnN0cmluZ106c3RyaW5nfTtwYXRoczpTZXQ8c3RyaW5nPn0ge1xuICAgIGxldCBsaW5rczp7W2tleTpzdHJpbmddOnN0cmluZ30gPSB7fVxuICAgIGxldCBwYXRoczpTZXQ8c3RyaW5nPiA9IG5ldyBTZXQoKVxuICAgIHJvdXRlcy5yZXZlcnNlKClcbiAgICBsZXQgZGVmYXVsdFBhdGg6c3RyaW5nID0gJydcbiAgICBmb3IgKGNvbnN0IHJvdXRlOk9iamVjdCBvZiByb3V0ZXMpXG4gICAgICAgIGlmIChyb3V0ZS5oYXNPd25Qcm9wZXJ0eSgncGF0aCcpKSB7XG4gICAgICAgICAgICBpZiAocm91dGUuaGFzT3duUHJvcGVydHkoJ3JlZGlyZWN0VG8nKSkge1xuICAgICAgICAgICAgICAgIGlmIChyb3V0ZS5wYXRoID09PSAnKionKVxuICAgICAgICAgICAgICAgICAgICBpZiAocm91dGUucmVkaXJlY3RUby5zdGFydHNXaXRoKCcvJykpXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UGF0aCA9IHBhdGguam9pbihiYXNlUGF0aCwgcm91dGUucmVkaXJlY3RUbylcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFBhdGggPSBwYXRoLmpvaW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVBhdGgsIHJvb3QsIHJvdXRlLnJlZGlyZWN0VG8pXG4gICAgICAgICAgICAgICAgbGlua3NbcGF0aC5qb2luKGJhc2VQYXRoLCByb290LCByb3V0ZS5wYXRoKV0gPSBkZWZhdWx0UGF0aFxuICAgICAgICAgICAgfSBlbHNlIGlmIChyb3V0ZS5wYXRoLmluY2x1ZGVzKCc6JykpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFBhdGgpXG4gICAgICAgICAgICAgICAgICAgIHBhdGhzLmFkZChkZWZhdWx0UGF0aClcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfSBlbHNlIGlmIChyb3V0ZS5wYXRoICE9PSAnKionICYmICEocm91dGUuaGFzT3duUHJvcGVydHkoXG4gICAgICAgICAgICAgICAgJ2NoaWxkcmVuJ1xuICAgICAgICAgICAgKSAmJiByb3V0ZS5jaGlsZHJlbltyb3V0ZS5jaGlsZHJlbi5sZW5ndGggLSAxXS5wYXRoID09PSAnKionKSlcbiAgICAgICAgICAgICAgICBwYXRocy5hZGQocGF0aC5qb2luKGJhc2VQYXRoLCByb290LCByb3V0ZS5wYXRoKSlcbiAgICAgICAgICAgIGlmIChyb3V0ZS5oYXNPd25Qcm9wZXJ0eSgnY2hpbGRyZW4nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDp7XG4gICAgICAgICAgICAgICAgICAgIGxpbmtzOntba2V5OnN0cmluZ106c3RyaW5nfTtcbiAgICAgICAgICAgICAgICAgICAgcGF0aHM6U2V0PHN0cmluZz47XG4gICAgICAgICAgICAgICAgfSA9IGRldGVybWluZVBhdGhzKGJhc2VQYXRoLCByb3V0ZS5jaGlsZHJlbiwgcGF0aC5qb2luKFxuICAgICAgICAgICAgICAgICAgICByb290LCByb3V0ZS5wYXRoKSlcbiAgICAgICAgICAgICAgICBUb29scy5leHRlbmRPYmplY3QobGlua3MsIHJlc3VsdC5saW5rcylcbiAgICAgICAgICAgICAgICBwYXRocyA9IG5ldyBTZXQoWy4uLnBhdGhzLCAuLi5yZXN1bHQucGF0aHNdKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJvdXRlLmhhc093blByb3BlcnR5KCdjaGlsZHJlbicpKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQ6e1xuICAgICAgICAgICAgICAgIGxpbmtzOntba2V5OnN0cmluZ106c3RyaW5nfTtcbiAgICAgICAgICAgICAgICBwYXRoczpTZXQ8c3RyaW5nPjtcbiAgICAgICAgICAgIH0gPSBkZXRlcm1pbmVQYXRocyhiYXNlUGF0aCwgcm91dGUuY2hpbGRyZW4sIHJvb3QpXG4gICAgICAgICAgICBUb29scy5leHRlbmRPYmplY3QobGlua3MsIHJlc3VsdC5saW5rcylcbiAgICAgICAgICAgIHBhdGhzID0gbmV3IFNldChbLi4ucGF0aHMsIC4uLnJlc3VsdC5wYXRoc10pXG4gICAgICAgIH1cbiAgICByZXR1cm4ge2xpbmtzLCBwYXRoc31cbn1cbi8qKlxuICogUHJlLXJlbmRlcnMgZ2l2ZW4gYXBwbGljYXRpb24gcm91dGVzIHRvIGdpdmVuIHRhcmdldCBkaXJlY3Rvcnkgc3RydWN0dXJlLlxuICogQHBhcmFtIEFwcGxpY2F0aW9uQ29tcG9uZW50IC0gQXBwbGljYXRpb24gY29tcG9uZW50IHRvIHByZS1yZW5kZXIuXG4gKiBAcGFyYW0gQXBwbGljYXRpb25Nb2R1bGUgLSBBcHBsaWNhdGlvbiBtb2R1bGUgdG8gcHJlLXJlbmRlci5cbiAqIEBwYXJhbSByb3V0ZXMgLSBSb3V0ZSBvciByb3V0ZXMgY29uZmlndXJhdGlvbiBvYmplY3Qgb3IgYXJyYXkgb2YgcGF0aHMgdG9cbiAqIHByZS1yZW5kZXIuXG4gKiBAcGFyYW0gZ2xvYmFsVmFyaWFibGVOYW1lc1RvSW5qZWN0IC0gR2xvYmFsIHZhcmlhYmxlIG5hbWVzIHRvIGluamVjdCBpbnRvXG4gKiB0aGUgbm9kZSBjb250ZXh0IGV2YWx1YXRlZCBmcm9tIGdpdmVuIGluZGV4IGh0bWwgZmlsZS5cbiAqIEBwYXJhbSBodG1sRmlsZVBhdGggLSBIVE1MIGZpbGUgcGF0aCB0byB1c2UgYXMgaW5kZXguXG4gKiBAcGFyYW0gdGFyZ2V0RGlyZWN0b3J5UGF0aCAtIFRhcmdldCBkaXJlY3RvcnkgcGF0aCB0byBnZW5lcmF0ZSBwcmUtcmVuZGVyZWRcbiAqIGh0bWwgZmlsZXMgaW4uXG4gKiBAcGFyYW0gc2NvcGUgLSBPYmplY3QgdG8gaW5qZWN0IGludG8gdGhlIGdsb2JhbCBzY29wZSBiZWZvcmUgcnVubmluZ1xuICogcHJlLXJlbmRlcmluZy5cbiAqIEBwYXJhbSBlbmNvZGluZyAtIEVuY29kaW5nIHRvIHVzZSBmb3IgcmVhZGluZyBnaXZlbiBodG1sIGZpbGUgcmVmZXJlbmNlLlxuICogQHJldHVybnMgQSBwcm9taXNlIHdoaWNoIHJlc29sdmVzIHRvIGEgbGlzdCBvZiBwcmUtcmVuZGVyZWQgaHRtbCBzdHJpbmdzLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihcbiAgICBBcHBsaWNhdGlvbkNvbXBvbmVudDpPYmplY3QsIEFwcGxpY2F0aW9uTW9kdWxlOk9iamVjdCxcbiAgICAvLyBJZ25vcmVUeXBlQ2hlY2tcbiAgICByb3V0ZXM6c3RyaW5nfEFycmF5PHN0cmluZz58Um91dGVzID0gW10sXG4gICAgZ2xvYmFsVmFyaWFibGVOYW1lc1RvSW5qZWN0OnN0cmluZ3xBcnJheTxzdHJpbmc+ID0gJ2dlbmVyaWNJbml0aWFsRGF0YScsXG4gICAgaHRtbEZpbGVQYXRoOnN0cmluZyA9IHBhdGgucmVzb2x2ZShcbiAgICAgICAgcGF0aC5kaXJuYW1lKHByb2Nlc3MuYXJndlsxXSksICdpbmRleC5odG1sJyksXG4gICAgdGFyZ2V0RGlyZWN0b3J5UGF0aDpzdHJpbmcgPSBwYXRoLnJlc29sdmUoXG4gICAgICAgIHBhdGguZGlybmFtZShwcm9jZXNzLmFyZ3ZbMV0pLCAncHJlUmVuZGVyZWQnKSxcbiAgICBzY29wZTpPYmplY3QgPSB7Z2VuZXJpY0luaXRpYWxEYXRhOiB7Y29uZmlndXJhdGlvbjoge2RhdGFiYXNlOiB7XG4gICAgICAgIGNvbm5lY3Rvcjoge2FkYXB0ZXI6ICdtZW1vcnknfSxcbiAgICAgICAgcGx1Z2luczogW1BvdWNoREJBZGFwdGVyTWVtb3J5XVxuICAgIH19fX0sIGVuY29kaW5nOnN0cmluZyA9ICd1dGYtOCdcbik6UHJvbWlzZTxBcnJheTxzdHJpbmc+PiB7XG4gICAgZ2xvYmFsVmFyaWFibGVOYW1lc1RvSW5qZWN0ID0gW10uY29uY2F0KGdsb2JhbFZhcmlhYmxlTmFtZXNUb0luamVjdClcbiAgICByb3V0ZXMgPSBbXS5jb25jYXQocm91dGVzKVxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoXG4gICAgICAgIHJlc29sdmU6RnVuY3Rpb24sIHJlamVjdDpGdW5jdGlvblxuICAgIC8vIElnbm9yZVR5cGVDaGVja1xuICAgICk6dm9pZCA9PiBmaWxlU3lzdGVtLnJlYWRGaWxlKGh0bWxGaWxlUGF0aCwge2VuY29kaW5nfSwgYXN5bmMgKFxuICAgICAgICBlcnJvcjo/RXJyb3IsIGRhdGE6c3RyaW5nXG4gICAgKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcilcbiAgICAgICAgLy8gcmVnaW9uIHByZXBhcmUgZW52aXJvbm1lbnRcbiAgICAgICAgY29uc3QgdmlydHVhbENvbnNvbGU6T2JqZWN0ID0gbmV3IFZpcnR1YWxDb25zb2xlKClcbiAgICAgICAgZm9yIChjb25zdCBuYW1lOnN0cmluZyBvZiBbXG4gICAgICAgICAgICAnYXNzZXJ0JywgJ2RpcicsICdlcnJvcicsICdpbmZvJywgJ2xvZycsICd0aW1lJywgJ3RpbWVFbmQnLFxuICAgICAgICAgICAgJ3RyYWNlJywgJ3dhcm4nXG4gICAgICAgIF0pXG4gICAgICAgICAgICB2aXJ0dWFsQ29uc29sZS5vbihuYW1lLCBjb25zb2xlW25hbWVdLmJpbmQoY29uc29sZSkpXG4gICAgICAgIGNvbnN0IHdpbmRvdzpXaW5kb3cgPSAobmV3IEpTRE9NKGRhdGEsIHtcbiAgICAgICAgICAgIHJ1blNjcmlwdHM6ICdkYW5nZXJvdXNseScsIHZpcnR1YWxDb25zb2xlXG4gICAgICAgIH0pKS53aW5kb3dcbiAgICAgICAgY29uc3QgYmFzZVBhdGg6c3RyaW5nID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFxuICAgICAgICAgICAgJ2Jhc2UnXG4gICAgICAgIClbMF0uaHJlZlxuICAgICAgICBmb3IgKGNvbnN0IG5hbWU6c3RyaW5nIGluIHdpbmRvdylcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGFzT3duUHJvcGVydHkobmFtZSkgJiZcbiAgICAgICAgICAgICAgICAhZ2xvYmFsQ29udGV4dC5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbFZhcmlhYmxlTmFtZXNUb0luamVjdC5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsVmFyaWFibGVOYW1lc1RvSW5qZWN0LmluY2x1ZGVzKG5hbWUpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGBJbmplY3QgdmFyaWFibGUgXCIke25hbWV9XCIuYClcbiAgICAgICAgICAgICAgICBnbG9iYWxDb250ZXh0W25hbWVdID0gd2luZG93W25hbWVdXG4gICAgICAgICAgICB9XG4gICAgICAgIFRvb2xzLnBsYWluT2JqZWN0UHJvdG90eXBlcyA9IFRvb2xzLnBsYWluT2JqZWN0UHJvdG90eXBlcy5jb25jYXQoXG4gICAgICAgICAgICAvLyBJZ25vcmVUeXBlQ2hlY2tcbiAgICAgICAgICAgIHdpbmRvdy5PYmplY3QucHJvdG90eXBlKVxuICAgICAgICBmb3IgKGNvbnN0IG5hbWU6c3RyaW5nIGluIHNjb3BlKVxuICAgICAgICAgICAgaWYgKHNjb3BlLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgICAgICAgIFRvb2xzLmV4dGVuZE9iamVjdCh0cnVlLCBnbG9iYWxDb250ZXh0W25hbWVdLCBzY29wZVtuYW1lXSlcbiAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgICAgIC8vIHJlZ2lvbiBkZXRlcm1pbmUgcHJlLXJlbmRlcmFibGUgcGF0aHNcbiAgICAgICAgY29uc3QgbGlua3M6QXJyYXk8c3RyaW5nPiA9IFtdXG4gICAgICAgIGxldCB1cmxzOkFycmF5PHN0cmluZz5cbiAgICAgICAgaWYgKHJvdXRlcy5sZW5ndGgpXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJvdXRlc1swXSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgLy8gSWdub3JlVHlwZUNoZWNrXG4gICAgICAgICAgICAgICAgdXJscyA9IHJvdXRlc1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0OntcbiAgICAgICAgICAgICAgICAgICAgbGlua3M6e1trZXk6c3RyaW5nXTpzdHJpbmd9O1xuICAgICAgICAgICAgICAgICAgICBwYXRoczpTZXQ8c3RyaW5nPjtcbiAgICAgICAgICAgICAgICB9ID0gZGV0ZXJtaW5lUGF0aHMoYmFzZVBhdGgsIHJvdXRlcylcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHNvdXJjZVBhdGg6c3RyaW5nIGluIHJlc3VsdC5saW5rcylcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5saW5rcy5oYXNPd25Qcm9wZXJ0eShzb3VyY2VQYXRoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVhbFNvdXJjZVBhdGg6c3RyaW5nID0gcGF0aC5qb2luKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldERpcmVjdG9yeVBhdGgsIHNvdXJjZVBhdGguc3Vic3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYXNlUGF0aC5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLnJlcGxhY2UoL15cXC8rKC4rKS8sICckMScpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbGlua3MucHVzaChyZWFsU291cmNlUGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFBhdGg6c3RyaW5nID0gcGF0aC5qb2luKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldERpcmVjdG9yeVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmxpbmtzW3NvdXJjZVBhdGhdLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZVBhdGgubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5yZXBsYWNlKC9eXFwvKyguKykvLCAnJDEnKSkgKyAnLmh0bWwnXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBtYWtlRGlyZWN0b3J5UGF0aChwYXRoLmRpcm5hbWUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhbFNvdXJjZVBhdGhcbiAgICAgICAgICAgICAgICAgICAgICAgICksIGFzeW5jIChlcnJvcjo/RXJyb3IpOlByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXdhaXQgVG9vbHMuaXNGaWxlKHJlYWxTb3VyY2VQYXRoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZTpGdW5jdGlvbiwgcmVqZWN0OkZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk6dm9pZCA9PiByZW1vdmVEaXJlY3RvcnlSZWN1cnNpdmVseShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWxTb3VyY2VQYXRoLCAoZXJyb3I6P0Vycm9yKTp2b2lkID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmVUeXBlQ2hlY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlU3lzdGVtLnN5bWxpbmsodGFyZ2V0UGF0aCwgcmVhbFNvdXJjZVBhdGgsIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6P0Vycm9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTp2b2lkID0+IGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1cmxzID0gQXJyYXkuZnJvbShyZXN1bHQucGF0aHMpLnNvcnQoKVxuICAgICAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB1cmxzID0gW2Jhc2VQYXRoXVxuICAgICAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgY29uc29sZS5pbmZvKGBGb3VuZCAke3VybHMubGVuZ3RofSBwcmUtcmVuZGVyYWJsZSB1cmxzLmApXG4gICAgICAgIC8vIHJlZ2lvbiBjcmVhdGUgc2VydmVyIHByZS1yZW5kZXJhYmxlIG1vZHVsZVxuICAgICAgICAvKipcbiAgICAgICAgICogRHVtbXkgc2VydmVyIGNvbXBhdGlibGUgcm9vdCBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gcHJlLXJlbmRlci5cbiAgICAgICAgICovXG4gICAgICAgIEBOZ01vZHVsZSh7XG4gICAgICAgICAgICBib290c3RyYXA6IFtBcHBsaWNhdGlvbkNvbXBvbmVudF0sXG4gICAgICAgICAgICBpbXBvcnRzOiBbQXBwbGljYXRpb25Nb2R1bGUsIFNlcnZlck1vZHVsZV0sXG4gICAgICAgICAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogQVBQX0JBU0VfSFJFRiwgdXNlVmFsdWU6IGJhc2VQYXRofV1cbiAgICAgICAgfSlcbiAgICAgICAgY2xhc3MgQXBwbGljYXRpb25TZXJ2ZXJNb2R1bGUge31cbiAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgICAgIGVuYWJsZVByb2RNb2RlKClcbiAgICAgICAgLy8gcmVnaW9uIGdlbmVyYXRlIHByZS1yZW5kZXJlZCBodG1sIGZpbGVzXG4gICAgICAgIGNvbnN0IHJlc3VsdHM6QXJyYXk8c3RyaW5nPiA9IFtdXG4gICAgICAgIGNvbnN0IGZpbGVQYXRoczpBcnJheTxzdHJpbmc+ID0gW11cbiAgICAgICAgZm9yIChjb25zdCB1cmw6c3RyaW5nIG9mIHVybHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoOnN0cmluZyA9IHBhdGguam9pbih0YXJnZXREaXJlY3RvcnlQYXRoLCAoXG4gICAgICAgICAgICAgICAgdXJsID09PSBiYXNlUGF0aFxuICAgICAgICAgICAgKSA/ICcvJyA6XG4gICAgICAgICAgICAgICAgdXJsLnN1YnN0cmluZyhiYXNlUGF0aC5sZW5ndGgpLnJlcGxhY2UoL15cXC8rKC4rKS8sICckMScpKSArXG4gICAgICAgICAgICAgICAgJy5odG1sJ1xuICAgICAgICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZTpGdW5jdGlvbiwgcmVqZWN0OkZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgKTp2b2lkID0+IG1ha2VEaXJlY3RvcnlQYXRoKHBhdGguZGlybmFtZShmaWxlUGF0aCksIGFzeW5jIChcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6P0Vycm9yXG4gICAgICAgICAgICAgICAgKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcilcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGBQcmUtcmVuZGVyIHVybCBcIiR7dXJsfVwiLmApXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6c3RyaW5nID0gJydcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHJlbmRlck1vZHVsZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHBsaWNhdGlvblNlcnZlck1vZHVsZSwge2RvY3VtZW50OiBkYXRhLCB1cmx9KVxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdFcnJvciBvY2N1cnJlZCBkdXJpbmcgcHJlLXJlbmRlcmluZyBwYXRoIFwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7dXJsfVwiOiAke1Rvb2xzLnJlcHJlc2VudE9iamVjdChlcnJvcil9YClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oYFdyaXRlIGZpbGUgXCIke2ZpbGVQYXRofVwiLmApXG4gICAgICAgICAgICAgICAgICAgIGZpbGVTeXN0ZW0ud3JpdGVGaWxlKGZpbGVQYXRoLCByZXN1bHQsICgoXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjo/RXJyb3JcbiAgICAgICAgICAgICAgICAgICAgKTp2b2lkID0+IGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUocmVzdWx0KSkpXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBlbmRyZWdpb25cbiAgICAgICAgLy8gcmVnaW9uIHRpZHkgdXBcbiAgICAgICAgY29uc3QgZmlsZXM6QXJyYXk8RmlsZT4gPSBhd2FpdCBUb29scy53YWxrRGlyZWN0b3J5UmVjdXJzaXZlbHkoXG4gICAgICAgICAgICB0YXJnZXREaXJlY3RvcnlQYXRoKVxuICAgICAgICBmaWxlcy5yZXZlcnNlKClcbiAgICAgICAgbGV0IGN1cnJlbnRGaWxlOj9GaWxlID0gbnVsbFxuICAgICAgICBmb3IgKGNvbnN0IGZpbGU6RmlsZSBvZiBmaWxlcylcbiAgICAgICAgICAgIGlmIChmaWxlUGF0aHMuaW5jbHVkZXMoZmlsZS5wYXRoKSB8fCBsaW5rcy5pbmNsdWRlcyhmaWxlLnBhdGgpKVxuICAgICAgICAgICAgICAgIGN1cnJlbnRGaWxlID0gZmlsZVxuICAgICAgICAgICAgZWxzZSBpZiAoIShjdXJyZW50RmlsZSAmJiBjdXJyZW50RmlsZS5wYXRoLnN0YXJ0c1dpdGgoZmlsZS5wYXRoKSkpXG4gICAgICAgICAgICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmU6RnVuY3Rpb24sIHJlamVjdDpGdW5jdGlvbik6dm9pZCA9PlxuICAgICAgICAgICAgICAgICAgICByZW1vdmVEaXJlY3RvcnlSZWN1cnNpdmVseShmaWxlLnBhdGgsIChcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOj9FcnJvclxuICAgICAgICAgICAgICAgICAgICApOnZvaWQgPT4gZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZSgpKSlcbiAgICAgICAgLy8gZW5kcmVnaW9uXG4gICAgICAgIHJlc29sdmUocmVzdWx0cylcbiAgICB9KSlcbn1cbi8vIHJlZ2lvbiB2aW0gbW9kbGluZVxuLy8gdmltOiBzZXQgdGFic3RvcD00IHNoaWZ0d2lkdGg9NCBleHBhbmR0YWI6XG4vLyB2aW06IGZvbGRtZXRob2Q9bWFya2VyIGZvbGRtYXJrZXI9cmVnaW9uLGVuZHJlZ2lvbjpcbi8vIGVuZHJlZ2lvblxuIl19