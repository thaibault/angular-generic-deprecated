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
import type {PlainObject} from 'clientnode'
import {Component, Directive, Injectable, Input} from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
// endregion
// region native
export function getNativeEvent(
    name:string, bubbles:boolean = false, cancelable:boolean = false
):Object {
    const event:Object = document.createEvent('CustomEvent')
    event.initCustomEvent(name, bubbles, cancelable, null)
    return event
}
// endregion
// region services
@Injectable()
export class RouterStub {
    url:string
    /* eslint-disable no-unused-vars */
    navigate(commands:Array<any>, extras:?NavigationExtras):void {
        this.url = commands[0]
    }
    navigateByUrl(url:string):void {
        this.url = url
    }
    /* eslint-enable no-unused-vars */
}
@Injectable()
export class ActivatedRouteStub {
    subject:BehaviorSubject = new BehaviorSubject(this.testParams)
    parameter:Object = this.subject.asObservable()
    _testParameter:PlainObject = {}

    set testParameter(parameter:PlainObject = {}):void {
        this._testParameters = parameter
        this.subject.next(parameter)
    }
    get snapshot():PlainObject {
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
    onClick():void {
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
