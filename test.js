// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
'use strict'
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
import registerTest from 'clientnode/test'
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic'

import {default as GenericModule, GenericInitialDataService} from './index'
// endregion
registerTest(function(roundType:string):void {
    $('#qunit-fixture').append('<application></application>')
    platformBrowserDynamic().bootstrapModule(GenericModule)
    // region tests
    this.test('GenericInitialDataService', (assert:Object):void => {
        console.log('TODO')
        assert.ok(true)
    })
    // endregion
}, ['withJQuery'])
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
