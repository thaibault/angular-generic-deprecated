// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module angularGeneric */
'use strict'
/* !
    region header
    [Project page](https://torben.website/angularGeneric)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by torben sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
export * from './component'
export * from './pipe'
export * from './service'
// region imports
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

/*
    NOTE: Default import is not yet support for angular's ahead of time
    compiler.
*/
import {ComponentModule} from './component'
import {PipeModule} from './pipe'
import {ServiceModule} from './service'
// endregion
// region module
@NgModule({
    imports: [
        BrowserModule.withServerTransition({appId: 'generic-universal'}),
        ComponentModule,
        PipeModule,
        ServiceModule
    ],
    exports: [ComponentModule, PipeModule, ServiceModule]
})
/**
 * Represents the importable angular module.
 */
export class Module {}
export default Module
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
