// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module angularUser */
'use strict'
/* !
    region header
    [Project page](http://torben.website/angularUser)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import {default as GenericModule, GenericDataService} from 'angular-generic'
import {Component, Injectable, NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'
import {MaterialModule} from '@angular/material'
import {BrowserModule} from '@angular/platform-browser'
import {
    ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router,
    RouterStateSnapshot
} from '@angular/router'
import {Observable} from 'rxjs/Observable'
import PouchDBAuthenticationPlugin from 'pouchdb-authentication'
// endregion
@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild {
    router:Router
    loggedIn:boolean = false
    constructor(data:GenericDataService, router:Router):void {
        data.database = database.plugin(PouchDBAuthenticationPlugin)
        this.router = router
    }
    canActivate(
        route:ActivatedRouteSnapshot, state:RouterStateSnapshot
    ):boolean {
        return this.checkLogin(state.url)
    }
    canActivateChild(
        route:ActivatesRouteSnapshot, state: RouterStateSnapshot
    ):boolean {
        return this.canActivate(route, state)
    }
    checkLogin(url:string):boolean {
        if (this.loggedIn) {
            this.router.navigate([url])
            return true
        }
        this.router.navigate(['/login'])
        return false
    }
}
@Component({
    selector: 'login',
    template: `
        <md-input placeholder="login" [(ngModel)]="login"></md-input>
        <md-input
            type="password" placeholder="password" [(ngModel)]="password">
        </md-input>
        <button md-raised-button (click)="performLogin()">login</button>
    `
})
export class LoginComponent {
    _authentication:AuthenticationGuard
    login:?string
    password:?string
    constructor(authentication:AuthenticationGuard):void {
        this._authentication = authentication
    }
    performLogin():void {
        console.log(this.login, this.password)
    }
}
// region modules
const declarations:Array<Object> = Object.keys(module.exports).filter((
    name:string
):boolean => name.endsWith('Component') || name.endsWith('Pipe')).map((
    name:string
):Object => module.exports[name])
const providers:Array<Object> = Object.keys(module.exports).filter((
    name:string
):boolean =>
    name.endsWith('Resolver') || name.endsWith('Pipe') ||
    name.endsWith('Guard') || name.endsWith('Service')
).map((name:string):Object => module.exports[name])
const modules:Array<Object> = [
    BrowserModule,
    FormsModule,
    GenericModule,
    MaterialModule.forRoot()
]
@NgModule({
    declarations,
    exports: declarations,
    imports: modules,
    providers
})
export default class UserModule {}
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
