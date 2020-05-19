// @flow
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

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import {Location} from '@angular/common'
import {
    Component, Directive, Injectable, Input, ViewContainerRef, ViewChild
} from '@angular/core'
import {NavigationExtras} from '@angular/router'
import {PlainObject} from 'clientnode/type'
import {BehaviorSubject, Subject, Subscription} from 'rxjs'
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
export default dummyEvent
// endregion
// region services
@Injectable()
/**
 * Mocks the location service.
 * @property _path - Holds current path state.
 */
export class LocationStub {
    _path:string = ''
    /**
     * Getter and setter for current path state.
     * @param path - New path to set.
     * @returns The current path if used as getter.
     */
    path(path:string|null|true = null):string|void {
        if (path) {
            if (path === true)
                return this._path
            this._path = path
        } else
            return this._path
    }
    /**
     * Dummy subscriber for location changes.
     * @param _parameter - Catches all given parameter.
     * @returns A dummy subscription instance.
     */
    subscribe(..._parameter:Array<any>):Subscription {
        return new Subscription()
    }
}
@Injectable()
/**
 * Mocks the router service.
 * @property events - Triggers when events happens.
 * @property location - Location service instance.
 */
export class RouterStub {
    events:Subject<any> = new Subject()
    location:LocationStub
    /**
     * Initializes service properties.
     * @param location - Injected location service instance.
     * @returns Nothing.
     */
    constructor(location:Location) {
        this.location = location
    }
    /**
     * Mocks the imperative router navigation method.
     * @param commands - New route parameter.
     * @param _extras - Defines new route meta data.
     * @returns Nothing.
     */
    navigate(commands:Array<any>, _extras:NavigationExtras|null = null):void {
        this.location._path = commands.join('/')
    }
    /**
     * Mocks the imperative router navigation method.
     * @param url - URL to emulate section switch to.
     * @returns Nothing.
     */
    navigateByUrl(url:string):void {
        this.location._path = url
    }
}
@Injectable()
/**
 * Mocks the current route data instance.
 * @property dataSubject - Mutable data instance.
 * @property data - Current raw data.
 * @property parameterSubject - Mutable parameter instance.
 * @property params - Current raw parameter data.
 *
 * @property _data - Current test data.
 * @property _parameter - Current test parameter.
 */
export class ActivatedRouteStub {
    dataSubject:BehaviorSubject = new BehaviorSubject(this._data)
    data:Object = this.dataSubject.asObservable()
    parameterSubject:BehaviorSubject = new BehaviorSubject(this._parameter)
    params:Object = this.parameterSubject.asObservable()

    _data:PlainObject = {}
    _parameter:PlainObject = {}
    /**
     * Setter for test data property value.
     * @param data - Sets data of current route.
     * @returns Nothing.
     */
    set testData(data:PlainObject):void {
        this._data = data
        this.dataSubject.next(data)
    }
    /**
     * Setter for test parameter property value.
     * @param parameter - Sets parameter of current route.
     * @returns Nothing.
     */
    set testParameter(parameter:PlainObject):void {
        this._parameter = parameter
        this.parameterSubject.next(this._parameter)
    }
    /**
     * Getter for route parameter property value.
     * @returns The current routing state.
     */
    get snapshot():PlainObject {
        return {
            data: this._data,
            params: this._parameter
        }
    }
}
// endregion
// region directives
@Directive({
    selector: '[routerLink]',
    host: {'(click)': 'onClick()'}
})
/**
 * Mocks the router link directive.
 * @property linkParameter - Link parameter to save as state.
 * @property navigatedTo - Last navigation target.
 */
export class RouterLinkStubDirective {
    @Input('routerLink') linkParameter:Array<string>
    navigatedTo:Array<string>|null = null
    /**
     * Mocks the click event on route links.
     * @returns Nothing.
     */
    onClick():void {
        this.navigatedTo = this.linkParameter
    }
}
@Directive({selector: 'directive-with-view-container'})
/**
 * Mock directive with nested view.
 * @property viewContainerReference - Nested view container reference.
 */
export class DirectiveWithViewContainer {
    viewContainerReference:ViewContainerRef
    /**
     * Initialized needed properties.
     * @param viewContainerReference - Current view container reference.
     * @returns Nothing.
     */
    constructor(viewContainerReference:ViewContainerRef) {
        this.viewContainerReference = viewContainerReference
    }
}
// endregion
// region components
@Component({selector: 'router-outlet', template: ''})
/**
 * Mocks the router outlet component.
 */
export class RouterOutletStubComponent {}
@Component({
    selector: 'component-with-child-view-container',
    template: `
        <directive-with-view-container></directive-with-view-container>
    `
})
/**
 * Mocks a component with mocking child directive.
 * @property childWithViewContainer - Reference to child view container.
 */
export class ComponentWithChildViewContainer {
    @ViewChild(DirectiveWithViewContainer)
    childWithViewContainer:DirectiveWithViewContainer
}
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
