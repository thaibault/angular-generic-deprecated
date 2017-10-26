// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module angularGeneric */
'use strict';
/* !
    region header
    [Project page](http://torben.website/angularGeneric)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by torben sickert stand under a creative commons
    naming 3.0 unported license.
    see http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register');
}
catch (error) { }
// endregion
export const determineExports = (module) => Object.keys(module.exports).filter((name) => !name.startsWith('Abstract') &&
    ['Component', 'Directive', 'Pipe'].some((suffix) => name.endsWith(suffix))).map((name) => module.exports[name]);
export const determineDeclarations = (module) => determineExports(module).concat(Object.keys(module.exports).filter((name) => !name.startsWith('Abstract') && ['Accessor'].some((suffix) => name.endsWith(suffix))).map((name) => module.exports[name]));
export default ;
const determineProviders = (module) => Object.keys(module.exports).filter((name) => name.endsWith('Resolver') || name.endsWith('Pipe') ||
    name.endsWith('Guard') || name.endsWith('Service')).map((name) => module.exports[name]);
//# sourceMappingURL=moduleHelper.js.map