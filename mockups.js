 // export for convenience.
import {Component, Directive, Injectable, Input} from '@angular/core'
export {
    ActivatedRoute, NavigationExtras, Router, RouterLink, RouterOutlet
} from '@angular/router'

@Directive({
    selector: '[routerLink]',
    host: {'(click)': 'onClick()'}
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams:any
    navigatedTo:any = null
    onClick() {
        this.navigatedTo = this.linkParams
    }
}

@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent {}

@Injectable()
export class RouterStub {
    navigate(commands:Array<any>, extras:?NavigationExtras) {}
}

// Only implements params and part of snapshot.params
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

@Injectable()
export class ActivatedRouteStub {
    // ActivatedRoute.params is Observable
    subject = new BehaviorSubject(this.testParams)
    params = this.subject.asObservable()
    _testParams = {}

    get testParams() {
        return this._testParams
    }
    set testParams(params = {}) {
        this._testParams = params
        this.subject.next(params)
    }
    // ActivatedRoute.snapshot.params
    get snapshot() {
        return {params: this.testParams}
    }
}
