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
import {NavigationExtras} from '@angular/router'
import type {PlainObject} from 'clientnode'
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
// endregion
// region native
/**
 * Creates a document event.
 * @param name - Event name.
 * @param bubbles - Indicates if the event should be forwarded to parent dom
 * nodes.
 * @param cancelable - Indicates weather child node can prevent further event
 * handler callback to be triggered from parent dom nodes.
 * @returns The newly generated event.
 */
export function getNativeEvent(
    name:string, bubbles:boolean = false, cancelable:boolean = false
):Object {
    const event:Object = document.createEvent('CustomEvent')
    event.initCustomEvent(name, bubbles, cancelable, null)
    return event
}
export const dummyEvent = {preventDefault: ():void => {}}
// endregion
// region services
// IgnoreTypeCheck
@Injectable()
/**
 * Mocks the router.
 */
export class RouterStub {
    url:string
    /* eslint-disable no-unused-vars */
    /**
     * Mocks the imperative router navigation method.
     * @param commands - New route parameter.
     * @param extras - Defines new route meta data.
     * @returns Nothing.
     */
    navigate(commands:Array<any>, extras:?NavigationExtras):void {
        this.url = commands[0]
    }
    /**
     * Mocks the imperative router navigation method.
     * @param url - URL to emulate section switch to.
     * @returns Nothing.
     */
    navigateByUrl(url:string):void {
        this.url = url
    }
    /* eslint-enable no-unused-vars */
}
// IgnoreTypeCheck
@Injectable()
/**
 * Mocks the current route data instance.
 */
export class ActivatedRouteStub {
    _testParameter:PlainObject = {}
    parameter:Object = this.subject.asObservable()
    subject:BehaviorSubject = new BehaviorSubject(this._testParameter)
    /**
     * Setter for test parameter property value.
     * @param parameter - Sets parameter of current route.
     * @returns Nothing.
     */
    set testParameter(parameter:PlainObject):void {
        this._testParameter = parameter
        this.subject.next(parameter)
    }
    /**
     * Getter for route parameter property value.
     * @returns The current routing state.
     */
    get snapshot():PlainObject {
        return {params: this._testParameter}
    }
}
// endregion
// region directives
// IgnoreTypeCheck
@Directive({
    selector: '[routerLink]',
    host: {'(click)': 'onClick()'}
})
/**
 * Mocks the router link directive.
 */
export class RouterLinkStubDirective {
    @Input('routerLink') linkParameter:Array<string>
    navigatedTo:?Array<string> = null
    /**
     * Mocks the click event on route links.
     * @returns Nothing.
     */
    onClick():void {
        this.navigatedTo = this.linkParameter
    }
}
// endregion
// region components
// IgnoreTypeCheck
@Component({selector: 'router-outlet', template: ''})
/**
 * Mocks the router outlet component.
 */
export class RouterOutletStubComponent {}
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
