// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module preRender */
'use strict'
/* !
    region header
    [Project page](https://bitbucket.org/posic/bpvwebapp)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012
    endregion
*/
export function determinePaths() {
    return {links: {}, paths: new Set()}
}
export async function render() {
    return []
}
export default render
export const renderScope = {
    applicationDomNode: null,
    basePath: '',
    innerHTMLToReInject: ''
}
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
