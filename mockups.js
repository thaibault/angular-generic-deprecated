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

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import {Component, Directive, Injectable, Input} from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
// endregion
// region services
@Injectable()
export class RouterStub {
    navigate(commands:Array<any>, extras:?NavigationExtras) {}
}
@Injectable()
export class ActivatedRouteStub {
    subject:BehaviorSubject = new BehaviorSubject(this.testParams)
    parameter:Object = this.subject.asObservable()
    _testParameter:PlainObject = {}

    set testParameter(parameter:PlainObject = {}) {
        this._testParameters = parameter
        this.subject.next(parameter)
    }
    get snapshot() {
        return {params: this._testParameter}
    }
}
// endregion
// region directives
@Directive({
    selector: '[routerLink]',
    host: {'(click)': 'onClick()'}
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParameter:Array<string>
    navigatedTo:?Array<string> = null
    onClick() {
        this.navigatedTo = this.linkParameter
    }
}
// endregion
// region components
@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent {}
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
