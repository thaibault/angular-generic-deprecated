// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module index */
'use strict'
/* !
    region header
    [Project page](https://bitbucket.org/tsickert/bpvwebapp)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012
    endregion
*/
// region imports
import {render as preRender} from 'angular-generic/preRender'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'

import {
    PreRenderableModuleNgFactory
} from './aheadOfTimePreRenderableModule.ngfactory'
import {ApplicationComponent} from './component/application'
import {applicationDomNodeSelector, Module, routes} from './module'
// endregion 
// region declarations
declare var DEBUG:boolean
declare var PRERENDER:boolean
// endregion
// region bootstrap
if (PRERENDER)
    preRender(
        DEBUG ? Module : PreRenderableModuleNgFactory,
        {
            applicationDomNodeSelector,
            component: DEBUG ? ApplicationComponent : null,
            minify: DEBUG ? false : {},
            routes
        }
    )
else
    platformBrowserDynamic().bootstrapModule(Module)
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
