// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module angularGeneric */
'use strict'
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
export const determineExports:Function = (module:Object):Array<Object> =>
    Object.keys(module.exports).filter((name:string):boolean =>
        !name.startsWith('Abstract') &&
        ['Component', 'Directive', 'Pipe'].some((suffix:string):boolean =>
            name.endsWith(suffix))
    ).map((name:string):Object => module.exports[name])
export const determineDeclarations:Function = (module:Object):Array<Object> =>
    determineExports(module).concat(Object.keys(module.exports).filter((
        name:string
    ):boolean => !name.startsWith('Abstract') && ['Accessor'].some(
        (suffix:string):boolean => name.endsWith(suffix)
    )).map((name:string):Object => module.exports[name]))
export const determineProviders:Function = (module:Object):Array<Object> =>
    Object.keys(module.exports).filter((name:string):boolean => [
        'Resolver', 'Pipe', 'Guard', 'Service'
    ].some((suffix:string):boolean => name.endsWith(suffix))).map((
        name:string
    ):Object => module.exports[name])
export default determineDeclarations
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
