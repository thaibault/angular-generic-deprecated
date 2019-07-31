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
export * from './editor'
// region imports
import {blobToBase64String, dataURLToBlob} from 'blob-util'
import Tools, {PlainObject} from 'clientnode'
import {
    AfterContentChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    /* eslint-disable no-unused-vars */
    Inject,
    /* eslint-enable no-unused-vars */
    Injector,
    Input,
    NgModule,
    OnChanges,
    OnDestroy,
    OnInit,
    /* eslint-disable no-unused-vars */
    Optional,
    /* eslint-enable no-unused-vars */
    Output,
    /* eslint-disable no-unused-vars */
    PLATFORM_ID,
    /* eslint-enable no-unused-vars */
    Renderer2 as Renderer,
    SecurityContext,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core'
import {DatePipe, isPlatformBrowser, isPlatformServer} from '@angular/common'
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms'
/*
    NOTE: We should not import directly from "@angular/material" to improve
    tree shaking results.
*/
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatDialogModule} from '@angular/material/dialog'
import {MatInputModule} from '@angular/material/input'
import {MatTooltipModule} from '@angular/material/tooltip'
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router'
import {Subject, Subscription} from 'rxjs'
import {debounceTime, distinctUntilChanged} from 'rxjs/operators'

import {
    ArrayMakeRangePipe,
    ExtendPipe,
    GetFilenameByPrefixPipe,
    BasePipeModule,
    RepresentPipe,
    StringCapitalizePipe,
    StringFormatPipe,
    StringTemplatePipe
} from './basePipe'
/*
    NOTE: Default import is not yet support for angular's ahead of time
    compiler.
*/
import {EditorModule} from './editor'
import {
    AbstractResolver,
    AlertService,
    animations,
    CanDeactivateRouteLeaveGuard,
    DataService,
    dataServiceInitializerFactory,
    DataScopeService,
    determineInjector,
    InitialDataService,
    LAST_KNOWN_DATA,
    ServiceModule,
    OfflineState,
    Stream,
    RegisterHTTPRequestInterceptor,
    UtilityService
} from './service'
// endregion
// region components/directives
// / region abstract
/**
 * Observes database for any data changes and triggers corresponding methods
 * on corresponding events.
 * @property static:defaultLiveUpdateOptions - Options for database
 * observation.
 *
 * @property actions - Array if actions which have happen.
 * @property autoRestartOnError - Indicates whether we should re-initialize
 * the changes stream on errors.
 *
 * @property _canceled - Indicates whether current view has been destroyed and
 * data observation should bee canceled.
 * @property _changeDetectorReference - Current views change detector reference
 * service instance.
 * @property _changesStream - Database observation representation.
 * @property _data - Data service instance.
 * @property _extend - Extend object pipe's transformation method.
 * @property _liveUpdateOptions - Options for database observation.
 * @property _platformID - Platform identification string.
 * @property _stringCapitalize - String capitalize pipe transformation
 * function.
 * @property _tools - Holds the tools class from the tools service.
 */
export class AbstractLiveDataComponent implements OnDestroy, OnInit {
    static defaultLiveUpdateOptions:PlainObject = {
        heartbeat: 10000,
        /* eslint-disable camelcase */
        include_docs: true,
        /* eslint-enable camelcase */
        live: true,
        since: 'now',
        timeout: false
    }

    actions:Array<PlainObject> = []
    autoRestartOnError:boolean = true
    disabled = false

    _canceled:boolean = false
    _changesStream:Stream
    _data:DataService
    _extend:Function
    _liveUpdateOptions:PlainObject = {}
    _platformID:string
    _stringCapitalize:Function
    _tools:typeof Tools
    /**
     * Saves injected service instances as instance properties.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(@Optional() injector:Injector) {
        const get:Function = determineInjector(
            injector, this, this.constructor)
        this._data = get(DataService)
        this._extend = get(ExtendPipe).transform.bind(get(ExtendPipe))
        this._platformID = get(PLATFORM_ID)
        this._stringCapitalize = get(StringCapitalizePipe).transform.bind(get(
            StringCapitalizePipe))
        this._tools = get(UtilityService).fixed.tools
    }
    /**
     * Initializes data observation when view has been initialized.
     * @returns Nothing.
     */
    ngOnInit():void {
        if (this.disabled || isPlatformServer(this._platformID))
            return
        const initialize:Function = this._tools.debounce(():void => {
            if (this._changesStream)
                this._changesStream.cancel()
            this._changesStream = this._data.connection.changes(this._extend(
                true,
                {},
                {since: LAST_KNOWN_DATA.sequence},
                AbstractLiveDataComponent.defaultLiveUpdateOptions,
                this._liveUpdateOptions
            ))
            for (const type of ['change', 'complete', 'error'])
                this._changesStream.on(type, async (
                    action:PlainObject
                ):Promise<void> => {
                    if (this._canceled)
                        return
                    if (type === 'change') {
                        if ('seq' in action && typeof action.seq === 'number')
                            LAST_KNOWN_DATA.sequence = action.seq
                        LAST_KNOWN_DATA.data[action.id] = action.doc
                    }
                    action.name = type
                    this.actions.unshift(action)
                    // IgnoreTypeCheck
                    let result:Promise<boolean>|boolean = this[
                        `onData${this._stringCapitalize(type)}`
                    ](action)
                    if (
                        result !== null &&
                        typeof result === 'object' &&
                        'then' in result
                    )
                        result = await result
                    if (type === 'error')
                        if (
                            action.hasOwnProperty('name') &&
                            action.name === 'unauthorized' ||
                            action.hasOwnProperty('error') &&
                            action.error === 'unauthorized'
                        ) {
                            if (this._changesStream)
                                this._changesStream.cancel()
                        } else if (this.autoRestartOnError)
                            initialize()
                })
        }, 3000)
        this._tools.timeout(initialize, 3000)
    }
    /**
     * Marks current live data observation as canceled and closes initially
     * requested update stream.
     * @returns Nothing.
     */
    ngOnDestroy():void {
        this._canceled = true
        if (this._changesStream)
            this._changesStream.cancel()
    }
    /**
     * Triggers on any data changes.
     * @param _event - An event object holding informations about the triggered
     * reason.
     * @returns A boolean (or promise wrapped) indicating whether a view update
     * should be triggered or not.
     */
    onDataChange(_event:any = null):Promise<boolean>|boolean {
        return true
    }
    /**
     * Triggers on completed data change observation.
     * @param _event - An event object holding informations about the triggered
     * reason.
     * @returns A boolean (or promise wrapped) indicating whether a view update
     * should be triggered or not.
     */
    onDataComplete(_event:any = null):Promise<boolean>|boolean {
        return false
    }
    /**
     * Triggers on data change observation errors.
     * @param _event - An event object holding informations about the triggered
     * reason.
     * @returns A boolean (or promise wrapped) indicating whether a view update
     * should be triggered or not.
     */
    onDataError(_event:any = null):Promise<boolean>|boolean {
        return false
    }
}
/**
 * A generic abstract component to edit, search, navigate and filter a list of
 * entities.
 * @property allItems - Current list of items.
 * @property allItemsChecked - Indicates whether all currently selected items
 * are checked via select all selector.
 * @property idName - Document property id name.
 * @property items - Current list of visible items.
 * @property keyCode - Mapping from key names to their key codes.
 * @property limit - Maximal number of visible items.
 * @property page - Current page number of each item list part.#
 * @property preventedDataUpdate - Saves null or arguments to a prevented data
 * updates.
 * @property regularExpression - Indicator whether searching via regular
 * expressions should be used.
 * @property revisionName - Document property revision name.
 * @property searchTerm - Search string to filter visible item list.
 * @property searchTermStream - Search term stream which debounces and caches
 * search results.
 * @property selectedItems - List of currently selected items for group editing
 * purposes.
 * @property sort - Sorting informations.
 *
 * @property _currentParameter - Saves current route url parameter.
 * @property _itemPath - Routing path to a specific item.
 * @property _itemsPath - Routing path to the items overview.
 * @property _route - Current route configuration.
 * @property _router - Router service instance.
 * @property _toolsInstance - Instance of tools service instance property.
 */
export class AbstractItemsComponent extends AbstractLiveDataComponent
    implements AfterContentChecked, OnDestroy {
    allItems:Array<PlainObject>
    allItemsChecked:boolean = false
    debouncedUpdate:Function
    idName:string
    items:Array<PlainObject>
    keyCode:{[key:string]:number}
    limit:number
    navigateAway:boolean = false
    page:number
    preventedDataUpdate:Array<any>|null = null
    regularExpression:boolean = false
    revisionName:string
    searchTerm:string = ''
    searchTermStream:Subject<string> = new Subject()
    selectedItems:Set<PlainObject> = new Set()
    sort:PlainObject = {
        [
        InitialDataService.defaultScope.configuration.database.model.property
            .name.special.id
        ]: 'asc'}

    _currentParameter:PlainObject
    _itemPath:string = 'item'
    _itemsPath:string = 'items'
    _route:ActivatedRoute
    _router:Router
    _subscriptions:Array<Subscription> = []
    _toolsInstance:Tools
    /**
     * Saves injected service instances as instance properties.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(@Optional() injector:Injector) {
        super(injector)
        const get:Function = determineInjector(injector)
        this.idName = get(
            InitialDataService
        ).configuration.database.model.property.name.special.id
        this.revisionName = get(
            InitialDataService
        ).configuration.database.model.property.name.special.revision
        this.keyCode = this._tools.keyCode
        this._route = get(ActivatedRoute)
        this._router = get(Router)
        // IgnoreTypeCheck
        this._toolsInstance = get(UtilityService).tools
        /*
            NOTE: Parameter have to be read before data to ensure that all page
            constraints have been set correctly before item slicing.
        */
        this._subscriptions.push(this._route.params.subscribe((
            data:PlainObject
        ):void => {
            this._currentParameter = data
            this.limit = parseInt(this._currentParameter.limit)
            this.page = parseInt(this._currentParameter.page)
            const match:Array<string> = /(regex|exact)-(.*)/.exec(
                this._currentParameter.searchTerm)
            if (match) {
                this.regularExpression = match[1] === 'regex'
                this.searchTerm = decodeURIComponent(match[2])
            }
        }))
        this._subscriptions.push(this._route.data.subscribe((
            data:PlainObject
        ):void => {
            this.limit = Math.max(1, this.limit || 1)
            this.allItems = data.items.slice()
            data.items.splice(0, (this.page - 1) * this.limit)
            if (data.items.length > this.limit)
                data.items.splice(this.limit, data.items.length - this.limit)
            this.items = data.items
            if (this.applyPageConstraints())
                this.update()
        }))
        this._subscriptions.push(this.searchTermStream.pipe(
            debounceTime(200),
            distinctUntilChanged()
        ).subscribe(():Promise<boolean> => {
            this.page = 1
            return this.update()
        }))
        this.debouncedUpdate = this._tools.debounce(this.update.bind(this))
    }
    /**
     * Updates constraints between limit, page number and number of total
     * available items.
     * @returns A boolean indicating if something has changed to fulfill page
     * constraints.
     */
    applyPageConstraints():boolean {
        const oldPage:number = this.page
        const oldLimit:number = this.limit
        this.limit = Math.max(1, this.limit || 1)
        this.page = Math.max(1, Math.min(this.page, Math.ceil(
            // IgnoreTypeCheck
            this.allItems.length / this.limit)))
        return this.page !== oldPage || this.limit !== oldLimit
    }
    /**
     * A function factory to generate functions which updates current view if
     * no route change happened between an asynchronous process.
     * @param callback - Function to wrap.
     * @returns Given function wrapped.
     */
    changeItemWrapperFactory(callback:Function):Function {
        return async (...parameter:Array<any>):Promise<any> => {
            let update:boolean = true
            const subscription:Subscription = this._router.events.subscribe((
                event:Object
            ):void => {
                if (event instanceof NavigationEnd) {
                    update = false
                    subscription.unsubscribe()
                }
            })
            this._subscriptions.push(subscription)
            const result:any = callback(...parameter)
            if (
                typeof result === 'object' &&
                result !== null &&
                'then' in result
            )
                await result
            if (update)
                await this.update(true)
            return result
        }
    }
    /**
     * Clear all currently selected items.
     * @returns Nothing.
     */
    clearSelectedItems():void {
        for (const item of this.items) {
            this.selectedItems.delete(item)
            item.selected = false
        }
    }
    /**
     * Switches section to item which has given id.
     * @param itemID - ID of item to switch to.
     * @param itemVersion - Version of item to switch to.
     * @returns A promise wrapping the navigation result.
     */
    goToItem(itemID:string, itemVersion:string = 'latest'):Promise<boolean> {
        this.navigateAway = true
        return this._router.navigate([this._itemPath, itemID, itemVersion])
    }
    /**
     * Checks if selection has changed.
     * @returns Nothing.
     */
    ngAfterContentChecked():void {
        if (this.preventedDataUpdate)
            this.onDataChange(...this.preventedDataUpdate)
    }
    /**
     * Triggers on any data changes and updates item constraints.
     * @param parameter - Parameter to save for delayed update.
     * @returns False so their wont be a view update since a complete route
     * reload will be triggered.
     */
    onDataChange(...parameter:Array<any>):false {
        /*
            NOTE: We have to avoid that unexpected view changes do not happen
            on remote data changes.
        */
        if (
            this.selectedItems.size ||
            ![0, 1].includes(parseInt(this._currentParameter.page))
        )
            this.preventedDataUpdate = parameter
        else {
            this.preventedDataUpdate = null
            this.debouncedUpdate(true)
        }
        /*
            NOTE: We want to avoid another reload if page is already violating
            page constraints which indicates a page reload.
        */
        return false
    }
    /**
     * Unsubscribes all subscriptions when this component should be disposed.
     * @returns Returns the super values return value.
     */
    ngOnDestroy():any {
        const result:any = super.ngOnDestroy()
        for (const subscription of this._subscriptions)
            subscription.unsubscribe()
        return result
    }
    /**
     * Select all available items.
     * @returns Nothing.
     */
    selectAllItems():void {
        for (const item of this.items) {
            this.selectedItems.add(item)
            item.selected = true
        }
    }
    /**
     * Determines an items content specific hash value combined from id and
     * revision.
     * @param index - Current index of current item in list.
     * @param item - Item with id and revision property.
     * @returns Indicator string.
     */
    trackByIDAndRevision(index:number, item:PlainObject):string {
        let id:any = item[this.idName]
        if (
            typeof id === 'object' && id !== null && id.hasOwnProperty('value')
        )
            id = id.value
        return `${id}/${item[this.revisionName]}`
    }
    /**
     * Applies current filter criteria to current visible item set.
     * @param reload - Indicates whether a simple reload should be made because
     * a changed list of available items is expected for example.
     * @returns A boolean indicating whether route change was successful.
     */
    async update(reload:boolean = false):Promise<boolean> {
        let result:boolean = false
        await this._toolsInstance.acquireLock(`${this.constructor.name}Update`)
        if (!this.navigateAway) {
            this.applyPageConstraints()
            if (reload && parseInt(this._currentParameter.page) !== 0)
                /*
                    NOTE: Will be normalised to "1" after route reload (hack to
                    enforce route reloading).
                */
                this.page = 0
            let sort:string = ''
            for (const name in this.sort)
                if (this.sort.hasOwnProperty(name)) {
                    sort += `${sort ? ',' : ''}${name}`
                    if (this.sort[name] !== 'asc')
                        sort += `-${this.sort[name]}`
                }
            result = await this._router.navigate([
                this._itemsPath,
                sort,
                this.page,
                this.limit,
                `${this.regularExpression ? 'regex' : 'exact'}-` +
                encodeURIComponent(this.searchTerm)
            ], {
                preserveFragment: true,
                replaceUrl: parseInt(this._currentParameter.page) === 0,
                skipLocationChange: this.page === 0
            })
            if (result)
                this.allItemsChecked = false
        }
        this._toolsInstance.releaseLock(`${this.constructor.name}Update`)
        return result
    }
    /**
     * Applies current search term to the search term stream.
     * @returns Nothing.
     */
    updateSearch():void {
        this.searchTermStream.next(this.searchTerm)
    }
}
/**
 * Abstract offline applications root component.
 * @property offlineState - Offline state representation.
 * @property renderer - Renderer service instance.
 * @property showStateDomNode - Indicates whether to render offline state dom
 * node.
 * @property stateDescription - Current state representations.
 * @property stateDescriptionDomNode - Nested node which shows current state
 * description.
 *
 * @property _changeDetectorReference - Change detector reference service
 * instance.
 * @property _platformID - Holds a platform specific identifier.
 * @property _renderer - Rendering abstraction layer.
 */
export class AbstractOfflineApplicationComponent {
    offlineState:OfflineState
    renderer:Renderer
    showStateDomNode:boolean = true
    stateDescription:string = 'loading...'
    stateDescriptionDomNode:ElementRef|null = null

    _changeDetectorReference:ChangeDetectorRef
    _platformID:string
    _renderer:Renderer
    /**
     * Initializes root application component.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(@Optional() injector:Injector) {
        const get:Function = determineInjector(
            injector, this, this.constructor)
        this.offlineState = get(OfflineState)
        this._changeDetectorReference = get(ChangeDetectorRef)
        this._platformID = get(PLATFORM_ID)
        this._renderer = get(Renderer)
        if (isPlatformBrowser(this._platformID))
            this.showStateDomNode = Boolean(this.offlineState.events.length)
    }
    /**
     * Initializes offline state handler.
     * @returns Nothing.
     */
    ngAfterViewInit():void {
        if (isPlatformServer(this._platformID))
            return
        let timerID:any = null
        const onOfflineStateChange:Function = (state:string):void => {
            this.stateDescription = `Offline-cache state: "${state}"`
            let counter:number|null = null
            this.showStateDomNode = state === 'running'
            if (['error', 'installed', 'updated'].includes(state)) {
                counter = 30
                this.stateDescription += ` ${counter}sec`
                this.showStateDomNode = true
            }
            if (timerID)
                clearInterval(timerID)
            timerID = setInterval(():void => {
                if (typeof counter === 'number') {
                    counter -= 1
                    if (counter <= 0) {
                        clearInterval(timerID)
                        this.showStateDomNode = false
                    } else
                        this.stateDescription =
                            `Offline-cache state: "${state}" ${counter}sec`
                } else
                    this.stateDescription =
                        `Offline-cache state: "${state}"`
                this._changeDetectorReference.detectChanges()
            }, 1000)
            if (this.stateDescriptionDomNode)
                this._renderer.addClass(
                    this.stateDescriptionDomNode.nativeElement,
                    state.replace(/[ _+]+/g, '-'))
            this._changeDetectorReference.detectChanges()
        }
        /*
            NOTE: We only want to show initial loading and real offline state
            changes.
        */
        this.showStateDomNode = false
        this.offlineState.changeCallbacks.push(onOfflineStateChange)
        for (const event of this.offlineState.events)
            onOfflineStateChange(...event)
    }
}
// / endregion
// // region date/time
@Directive({selector: '[genericDate]'})
/**
 * Displays dates and/or times formated with markup and through angular date
 * pipe.
 * @property dateFormatter - Angular's date pipe transformation method.
 * @property extend - Extend object pipe's transform method.
 * @property options - Given formatting and update options.
 * @property platformID - Platform identification string.
 * @property templateReference - Reference to given template.
 * @property timerID - Interval id to cancel it on destroy life cycle hook.
 * @property viewContainerReference - View container reference to embed
 * rendered template instance into.
 */
export class DateDirective {
    dateFormatter:Function
    extend:Function
    options:{
        dateTime:Date|number|string;
        format:string;
        freeze:boolean;
        updateIntervalInMilliseconds:number;
    } = {
        dateTime: 'now',
        format: 'HH:mm:ss',
        freeze: false,
        updateIntervalInMilliseconds: 1000
    }
    platformID:string
    templateReference:TemplateRef<any>
    timerID:any
    viewContainerReference:ViewContainerRef
    /**
     * Saves injected services as instance properties.
     * @param datePipe - Injected date pipe service instance.
     * @param extendPipe - Injected extend object pipe service instance.
     * @param platformID - Platform specific identifier.
     * @param templateReference - Specified template reference.
     * @param viewContainerReference - Injected view container reference.
     * @returns Nothing.
     */
    constructor(
        datePipe:DatePipe,
        extendPipe:ExtendPipe,
        @Inject(PLATFORM_ID) platformID:string,
        templateReference:TemplateRef<any>,
        viewContainerReference:ViewContainerRef
    ) {
        this.dateFormatter = datePipe.transform.bind(datePipe)
        this.extend = extendPipe.transform.bind(extendPipe)
        this.platformID = platformID
        this.templateReference = templateReference
        this.viewContainerReference = viewContainerReference
    }
    /* eslint-disable flowtype/require-return-type */
    /**
     * Options setter to merge into options interactively.
     * @param options - Options object to merge into.
     * @returns Nothing.
     */
    @Input('genericDate')
    set insertOptions(options:PlainObject) {
        if (
            ['string', 'number'].includes(typeof options) ||
            [null, undefined].includes(options) ||
            typeof options === 'object' &&
            options instanceof Date
        )
            options = {dateTime: options}
        this.extend(true, this.options, options)
    }
    /* eslint-enable flowtype/require-return-type */
    /**
     * Inserts a rendered template instance into current view.
     * @returns Nothing.
     */
    insert():void {
        let dateTime:Date|number|string = this.options.dateTime
        if (
            typeof dateTime === 'string' &&
            ['now', ''].includes(dateTime) ||
            typeof dateTime === 'number' &&
            isNaN(dateTime) ||
            [null, undefined].includes(dateTime)
        )
            dateTime = Date.now()
        else if (
            typeof dateTime === 'string' &&
            `${parseFloat(dateTime)}` === dateTime
        )
            dateTime = parseFloat(dateTime) * 1000
        let result:any
        try {
            result = this.dateFormatter(dateTime, this.options.format)
        } catch (error) {
            console.warn(
                `Given date time "${dateTime}" could not be formatted. ` +
                'Using current date time.')
            result = this.dateFormatter(Date.now(), this.options.format)
        }
        this.viewContainerReference.createEmbeddedView(
            this.templateReference, {dateTime: result})
    }
    /**
     * On destroy life cycle hook to cancel initialized interval timer.
     * @returns Nothing.
     */
    ngOnDestroy():void {
        if (this.timerID)
            clearInterval(this.timerID)
    }
    /**
     * Initializes interval timer and inserts initial template instance into
     * current view.
     * @returns Nothing.
     */
    ngOnInit():void {
        if (isPlatformBrowser(this.platformID))
            this.timerID = setInterval(():void => {
                if (!this.options.freeze) {
                    this.viewContainerReference.remove()
                    this.insert()
                }
            }, this.options.updateIntervalInMilliseconds)
        this.insert()
    }
}
// // / region interval
@Component({
    animations,
    selector: 'generic-interval-input',
    template: `
        <generic-input
            [declaration]="startDeclaration"
            [description]="startDescription"
            [disabled]="startDisabled"
            [showDeclarationText]="startShowDeclarationText"
            [maximum]="startMaximum"
            [maximumText]="startMaximumText"
            [minimum]="startMinimum"
            [required]="startRequired"
            [requiredText]="startRequiredText"
            [minimumText]="startMinimumText"
            [model]="model.start"
            (model)="change($event, 'start')"
            [showValidationState]="startShowValidationState"
            type="time"
        ></generic-input>
        <ng-content></ng-content>
        <generic-input
            [declaration]="endDeclaration"
            [description]="endDescription"
            [disabled]="endDisabled"
            [showDeclarationText]="endShowDeclarationText"
            [maximum]="endMaximum"
            [maximumText]="endMaximumText"
            [minimum]="endMinimum"
            [required]="endRequired"
            [requiredText]="endRequiredText"
            [minimumText]="endMinimumText"
            [model]="model.end"
            (model)="change($event, 'end')"
            [showValidationState]="endShowValidationState"
            type="time"
        ></generic-input>
    `
})
/**
 * Represents an interval input.
 * @property endDeclaration - End declaration info text.
 * @property startDeclaration - End declaration info text.
 *
 * @property endDescription - Description for end input.
 * @property startDescription - Description for start input.
 *
 * @property endDisabled - Sets end disabled state.
 * @property startDisabled - Sets start disabled state.
 *
 * @property endMaximum - Maximum allowed number end value.
 * @property startMaximum - Maximum allowed number start value.
 *
 * @property endMaximumText - Maximum number validation end text.
 * @property startMaximumText - Maximum number validation start text.
 *
 * @property endMinimum - Minimum allowed end number.
 * @property endMinimum - Minimum allowed start number.
 *
 * @property endMinimumText - Minimum end number validation text.
 * @property startMinimumText - Minimum start number validation text.
 *
 * @property endRequired - Indicates whether end input have to be filled.
 * @property startRequired - Indicates whether start input have to be filled.
 *
 * @property endRequiredText - Required validation end text.
 * @property startRequiredText - Required validation start text.
 *
 * @property endShowDeclarationText - Info text to click for more end input
 * informations.
 * @property startShowDeclarationText - Info text to click for more start input
 * informations.
 *
 * @property endShowDeclarationText - Info text to click for more end input
 * informations.
 * @property startShowDeclarationText - Info text to click for more
 * start input informations.
 *
 * @property endShowValidationState - Indicates whether validation errors
 * should be suppressed or be shown automatically for end input.
 * @property startShowValidationState - Indicates whether validation errors
 * should be suppressed or be shown automatically for start input.
 *
 * @property model - Object that saves start and end time as unix timestamp in
 * milliseconds.*
 * @property modelChange - Model event emitter emitting events on each model
 * change.
 */
export class IntervalInputComponent {
    @Input() endDeclaration:string|null = null
    @Input() startDeclaration:string|null = null

    @Input() endDescription:string|null = null
    @Input() startDescription:string|null = null

    @Input() endDisabled:boolean|null = null
    @Input() startDisabled:boolean|null = null

    @Input() endMaximum:number|null = null
    @Input() startMaximum:number|null = null

    @Input() endMaximumText:string =
        'Please give a number less or equal than ${maximum}.'
    @Input() startMaximumText:string =
        'Please give a number less or equal than ${maximum}.'

    @Input() endMinimum:number|null = null
    @Input() startMinimum:number|null = null

    @Input() endMinimumText:string =
        'Please given a number at least or equal to ${minimum}.'
    @Input() startMinimumText:string =
        'Please given a number at least or equal to ${minimum}.'

    @Input() endRequired:boolean|null = null
    @Input() startRequired:boolean|null = null

    @Input() endRequiredText:string = 'Please fill this field.'
    @Input() startRequiredText:string = 'Please fill this field.'

    @Input() endShowDeclarationText:string = 'ℹ'
    @Input() startShowDeclarationText:string = 'ℹ'

    @Input() endShowValidationState:boolean = false
    @Input() startShowValidationState:boolean = false

    @Input() model:{end:any;start:any} = {
        end: {value: new Date(1970, 0, 1)},
        start: {value: new Date(1970, 0, 1)}
    }
    @Output() modelChange:EventEmitter<PlainObject> = new EventEmitter()
    /**
     * Triggers on any change events of any nested input.
     * @param event - Events payload data.
     * @param type - Indicates which input field has changed.
     * @returns Nothing.
     */
    change(event:any, type:'end'|'start'):void {
        this.modelChange.emit({value: event, type})
    }
}
@Component({
    animations,
    selector: 'generic-intervals-input',
    /* eslint-disable max-len */
    template: `
        <div
            *ngIf="description !== '' && (description || model.description || model.name)"
        >{{description || model.description || model.name}}</div>
        <div
            @defaultAnimation
            *ngFor="let interval of (model.value || []); let first = first; let index = index"
        >
            <generic-interval-input
                [endDisabled]="endDisabled"
                [startDisabled]="startDisabled"

                [endShowDeclarationText]="endShowDeclarationText"
                [startShowDeclarationText]="startShowDeclarationText"

                [endMaximum]="endMaximum"
                [startMaximum]="startMaximum"

                [endMaximumText]="endMaximumText"
                [startMaximumText]="startMaximumText"

                [endMinimum]="endMinimum"
                [startMinimum]="startMinimum"

                [endRequired]="endRequired"
                [startRequired]="startRequired"

                [endRequiredText]="endRequiredText"
                [startRequiredText]="startRequiredText"

                [endMinimumText]="endMinimumText"
                [startMinimumText]="startMinimumText"

                [endDescription]="first ? endDescription : ''"
                [startDescription]="first ? startDescription : ''"

                [model]="interval"
                (model)="change($event, index)"

                [endDeclaration]="endDeclaration"
                [startDeclaration]="startDeclaration"

                [endShowValidationState]="endShowValidationState"
                [startShowValidationState]="startShowValidationState"
            >
                <ng-container *ngIf="contentTemplate; else fallback">
                    <ng-container
                        *ngTemplateOutlet="contentTemplate; context: {\$implicit:interval}"
                    ></ng-container>
                </ng-container>
            </generic-interval-input>
            <a
                class="remove"
                (click)="$event.preventDefault(); $event.stopPropagation(); remove(interval)"
                href=""
                *ngIf="model.minimumNumber === null || model.value.length > model.minimumNumber"
            >-</a>
        </div>
        <a
            class="add"
            (click)="$event.preventDefault(); $event.stopPropagation(); add()"
            href=""
            *ngIf="model.maximumNumber === null || (model.value?.length || 0) < model.maximumNumber"
        >+</a>
        <ng-template #fallback>--</ng-template>
    `
    /* eslint-enable max-len */
})
/**
 * Represents an editable list of intervals.
 * @property additionalObjectData - Additional object data to save with current
 * interval object.
 * @property contentTemplate - Reference to transcluded node.
 * @property description - Interval description to use as label.
 *
 * @property endDeclaration - End declaration info text.
 * @property startDeclaration - End declaration info text.
 *
 * @property endDescription - Description for end input.
 * @property startDescription - Description for start input.
 *
 * @property endDisabled - Sets end disabled state.
 * @property startDisabled - Sets start disabled state.
 *
 * @property endMaximum - Maximum allowed number end value.
 * @property startMaximum - Maximum allowed number start value.
 *
 * @property endMaximumText - Maximum number validation end text.
 * @property startMaximumText - Maximum number validation start text.
 *
 * @property endMinimum - Minimum allowed end number.
 * @property endMinimum - Minimum allowed start number.
 *
 * @property endMinimumText - Minimum end number validation text.
 * @property startMinimumText - Minimum start number validation text.
 *
 * @property endRequired - Indicates whether end input have to be filled.
 * @property startRequired - Indicates whether start input have to be filled.
 *
 * @property endRequiredText - Required validation end text.
 * @property startRequiredText - Required validation start text.
 *
 * @property endShowDeclarationText - Info text to click for more end input
 * informations.
 * @property startShowDeclarationText - Info text to click for more start input
 * informations.
 *
 * @property endShowDeclarationText - Info text to click for more end input
 * informations.
 * @property startShowDeclarationText - Info text to click for more
 * start input informations.
 *
 * @property endShowValidationState - Indicates whether validation errors
 * should be suppressed or be shown automatically for end input.
 * @property startShowValidationState - Indicates whether validation errors
 * should be suppressed or be shown automatically for start input.
 *
 * @property model - Saves current list of intervals.
 * @property modelChange - Event emitter for interval list changes.
 *
 * @property _dataScope - Data scope service instance.
 * @property _extend - Holds the extend object pipe instance's transform
 * method.
 */
export class IntervalsInputComponent implements OnInit {
    @Input() additionalObjectData:PlainObject
    @ContentChild(TemplateRef, {static: true}) contentTemplate:TemplateRef<any>
    @Input() description:string|null = null

    @Input() endDeclaration:string|null = null
    @Input() startDeclaration:string|null = null

    @Input() endDescription:string|null = null
    @Input() startDescription:string|null = null

    @Input() endDisabled:boolean|null = null
    @Input() startDisabled:boolean|null = null

    @Input() endMaximum:number|null = null
    @Input() startMaximum:number|null = null

    @Input() endMaximumText:string =
        'Please give a number less or equal than ${maximum}.'
    @Input() startMaximumText:string =
        'Please give a number less or equal than ${maximum}.'

    @Input() endMinimum:number|null = null
    @Input() startMinimum:number|null = null

    @Input() endMinimumText:string =
        'Please given a number at least or equal to ${minimum}.'
    @Input() startMinimumText:string =
        'Please given a number at least or equal to ${minimum}.'

    @Input() endRequired:boolean|null = null
    @Input() startRequired:boolean|null = null

    @Input() endRequiredText:string = 'Please fill this field.'
    @Input() startRequiredText:string = 'Please fill this field.'

    @Input() endShowDeclarationText:string = 'ℹ'
    @Input() startShowDeclarationText:string = 'ℹ'

    @Input() endShowValidationState:boolean = false
    @Input() startShowValidationState:boolean = false

    @Input() model:PlainObject = {value: []}
    @Output() modelChange:EventEmitter<PlainObject> = new EventEmitter()

    _dataScope:DataScopeService
    _extend:Function
    /**
     * Constructs the interval list component.
     * @param dataScope - Data scope service instance.
     * @param extendPipe - Injected extend object pipe instance.
     * @returns Nothing.
     */
    constructor(dataScope:DataScopeService, extendPipe:ExtendPipe) {
        this._dataScope = dataScope
        this._extend = extendPipe.transform.bind(extendPipe)
    }
    /**
     * Triggers on any change events of any nested input.
     * @param event - Events payload data.
     * @param index - Indicates which input field has changed.
     * @returns Nothing.
     */
    change(event:any, index:number):void {
        this.modelChange.emit({value: event, index})
    }
    /**
     * Extends additional model data with default one if nothing is provided.
     * @returns Nothing.
     */
    ngOnInit():void {
        if (!this.additionalObjectData)
            this.additionalObjectData = this._dataScope.generate('_interval')
        if (this.model.value)
            this.model.value.sort((
                first:PlainObject, second:PlainObject
            ):number => first.start.value - second.start.value)
        else
            this.model.value = []
    }
    /**
     * Adds a new interval.
     * @param data - Additional data to use for newly created entity.
     * @returns Nothing.
     */
    add(data:PlainObject = {}):void {
        if (!this.model.value)
            this.model.value = []
        const lastEnd:number = this.model.value.length ? (new Date(
            this.model.value[this.model.value.length - 1].end.value
        )).getTime() : 0
        this.model.value.push(this._extend(
            true,
            {},
            this.additionalObjectData,
            {
                // NOTE: We add one hour in milliseconds as default interval.
                end: {value: new Date(lastEnd + 60 ** 2 * 1000)},
                start: {value: new Date(lastEnd)}
            },
            data
        ))
        this.modelChange.emit(this.model)
    }
    /**
     * Removes given interval.
     * @param interval - Interval to remove from current list.
     * @returns Nothing.
     */
    remove(interval:PlainObject):void {
        const index:number = this.model.value.indexOf(interval)
        if (index !== -1) {
            this.model.value.splice(index, 1)
            this.modelChange.emit(this.model)
        }
    }
}
// // / endregion
// // endregion
@Directive({selector: '[genericSlider]'})
/**
 * Directive to automatically switch a list of content elements.
 * @property extend - Extend object's pipe transform method.
 * @property index - Index of currently selected content.
 * @property options - Sliding options.
 * @property platformID - Platform identification string.
 * @property templateReference - Content element template to slide.
 * @property timerID - Timer id of next content switch.
 * @property viewContainerReference - View container reference to inject
 * instantiated template reference into.
 */
export class SliderDirective implements OnInit {
    extend:Function
    index:number = 0
    options:{
        freeze:boolean;
        startIndex:number;
        step:number;
        slides:Array<any>;
        updateIntervalInMilliseconds:number;
    } = {
        freeze: false,
        startIndex: 0,
        step: 1,
        slides: [],
        updateIntervalInMilliseconds: 6000
    }
    platformID:string
    templateReference:TemplateRef<any>
    timerID:any
    viewContainerReference:ViewContainerRef
    /**
     * Saves injected services as instance properties.
     * @param extendPipe - Injected extend object pipe service instance.
     * @param platformID - Platform identification string.
     * @param templateReference - Specified template reference.
     * @param viewContainerReference - Injected view container reference.
     * @returns Nothing.
     */
    constructor(
        extendPipe:ExtendPipe,
        @Inject(PLATFORM_ID) platformID:string,
        templateReference:TemplateRef<any>,
        viewContainerReference:ViewContainerRef
    ) {
        this.extend = extendPipe.transform.bind(extendPipe)
        this.platformID = platformID
        this.templateReference = templateReference
        this.viewContainerReference = viewContainerReference
    }
    /**
     * Calculates next index from given reference point.
     * @param startIndex - Reference index.
     * @returns New calculated index.
     */
    getNextIndex(startIndex:number = -1):number {
        if (startIndex === -1)
            startIndex = this.index
        return (startIndex + this.options.step) % this.options.slides.length
    }
    /* eslint-disable flowtype/require-return-type */
    /**
     * Options setter to merge into options interactively.
     * @param options - Options object to merge into.
     * @returns Nothing.
     */
    @Input('genericSlider')
    set insertOptions(options:Array<any>|PlainObject) {
        if (Array.isArray(options))
            options = {slides: options}
        this.extend(true, this.options, options)
    }
    /* eslint-enable flowtype/require-return-type */
    /**
     * Inserts a rendered template instance into current view.
     * @returns Nothing.
     */
    update():void {
        if (this.options.slides.length)
            this.viewContainerReference.createEmbeddedView(
                this.templateReference, {
                    getNextIndex: this.getNextIndex.bind(this),
                    index: this.index,
                    options: this.options,
                    slide: this.options.slides[this.index],
                    slides: this.options.slides
                })
    }
    /**
     * On destroy life cycle hook to cancel initialized interval timer.
     * @returns Nothing.
     */
    ngOnDestroy():void {
        if (this.timerID)
            clearInterval(this.timerID)
    }
    /**
     * Initializes interval timer and inserts initial template instance into
     * current view.
     * @returns Nothing.
     */
    ngOnInit():void {
        if (isPlatformBrowser(this.platformID))
            this.timerID = setInterval(():void => {
                const newIndex:number = (this.index + this.options.step) %
                    this.options.slides.length
                if (
                    this.options.freeze !== true &&
                    newIndex !== this.index && !(
                        typeof this.options.freeze === 'number' &&
                        this.options.freeze >= this.options.slides.length
                    )
                ) {
                    this.viewContainerReference.remove()
                    this.index = this.getNextIndex()
                    this.update()
                }
            }, this.options.updateIntervalInMilliseconds)
        this.index = this.options.startIndex
        this.update()
    }
}
@Directive({selector: '[genericRepresentTextFile]'})
/**
 * Displays text files.
 * @property change - Change event emitter triggering when new has been
 * consumed.
 * @property data -  Data service instance.
 * @property domSanitizer - Sanitizing service instance.
 * @property extend - Extend object pipe's transform method.
 * @property lastContent - Caches last content to avoid unneeded re-reading of
 * blob file objects.
 * @property options - Given formatting and update options.
 * @property templateReference - Reference to given template.
 * @property viewContainerReference - View container reference to embed
 * rendered template instance into.
 */
export class RepresentTextFileDirective {
    @Output() change:EventEmitter<string> = new EventEmitter()
    data:DataService
    domSanitizer:DomSanitizer
    extend:Function
    lastContent:{input:string;output:any} = {
        input: '',
        output: null
    }
    options:{
        content:string;
        encoding:string;
        placeholder:string
    } = {
        content: '',
        encoding: 'utf-8',
        placeholder: 'Loading preview...'
    }
    templateReference:TemplateRef<any>
    viewContainerReference:ViewContainerRef
    /**
     * Saves injected services as instance properties.
     * @param data - Injected data service instance.
     * @param domSanitizer - Injected dom sanitizer object service instance.
     * @param extendPipe - Injected extend object pipe service instance.
     * @param templateReference - Specified template reference.
     * @param viewContainerReference - Injected view container reference.
     * @returns Nothing.
     */
    constructor(
        data:DataService,
        domSanitizer:DomSanitizer,
        extendPipe:ExtendPipe,
        templateReference:TemplateRef<any>,
        viewContainerReference:ViewContainerRef
    ) {
        this.data = data
        this.domSanitizer = domSanitizer
        this.extend = extendPipe.transform.bind(extendPipe)
        this.templateReference = templateReference
        this.viewContainerReference = viewContainerReference
    }
    /* eslint-disable flowtype/require-return-type */
    /**
     * Options setter to merge into options interactively.
     * @param options - Options object to merge into.
     * @returns Nothing.
     */
    @Input('genericRepresentTextFile')
    set insertOptions(options:any) {
        if (
            ['string', 'number'].includes(typeof options) ||
            [null, undefined].includes(options)
        )
            options = {content: `${options}`}
        if (typeof options.content === 'object')
            for (const name in SecurityContext)
                if (
                    SecurityContext.hasOwnProperty(name) &&
                    name !== 'NONE' &&
                    typeof SecurityContext[name] === 'number'
                ) {
                    const context:any = SecurityContext[name]
                    try {
                        options.content = this.domSanitizer.sanitize(
                            context, options.content)
                        break
                    } catch (error) {}
                }
        this.extend(true, this.options, options)
        const readBinaryDataIntoText = (blob:any):void => {
            this.lastContent.output = blob
            const fileReader:FileReader = new FileReader()
            fileReader.onload = (event:Event):void => {
                this.options.content = event.target['result']
                // Remove preceding BOM.
                if (
                    this.options.encoding.endsWith('-sig') &&
                    this.options.content.length &&
                    this.options.content.charCodeAt(0) === 0xFEFF
                )
                    this.options.content = this.options.content.slice(1)
                // Normalize line endings to unix format.
                this.options.content = this.options.content.replace(
                    /\r\n/g, '\n')
                this.change.emit(this.options.content)
                this.viewContainerReference.remove()
                this.viewContainerReference.createEmbeddedView(
                    this.templateReference, {
                        content: this.options.content,
                        options: this.options
                    })
            }
            fileReader.readAsText(blob, this.options.encoding.endsWith(
                '-sig'
            ) ? this.options.encoding.substring(
                    0, this.options.encoding.length - '-sig'.length
                ) : this.options.encoding)
        }
        if (/^(data:|((file|https?):\/\/)).+/.test(this.options.content)) {
            if (this.lastContent.input === this.options.content) {
                if (this.lastContent.output)
                    readBinaryDataIntoText(this.lastContent.output)
            } else {
                this.lastContent.input = this.options.content
                if (this.options.content.startsWith('data:'))
                    readBinaryDataIntoText(dataURLToBlob(this.options.content))
                else
                    this.data.getAttachment(this.options.content).then(
                        readBinaryDataIntoText)
            }
            this.options.content = this.options.placeholder
        }
    }
    /* eslint-enable flowtype/require-return-type */
    /**
     * Initializes interval timer and inserts initial template instance into
     * current view.
     * @returns Nothing.
     */
    ngOnInit():void {
        this.viewContainerReference.createEmbeddedView(
            this.templateReference, {
                content: this.options.content,
                options: this.options
            })
    }
}
// / region file input
/* eslint-disable max-len */
@Component({
    animations,
    selector: 'generic-file-input',
    template: `
        <mat-card>
            <mat-card-header
                @defaultAnimation
                *ngIf="headerText !== '' && (headerText || file?.name || model[attachmentTypeName][internalName]?.declaration || headerText || file?.name || name || model[attachmentTypeName][internalName]?.description || name)"
            >
                <mat-card-title>
                    <span
                        @defaultAnimation
                        *ngIf="!editableName || revision || headerText || !file?.name; else editable"
                    >
                        {{
                            headerText ||
                            file?.name ||
                            model[attachmentTypeName][
                                internalName
                            ]?.description ||
                            name
                        }}
                    </span>
                    <ng-template #editable>
                        <ng-container *ngIf="synchronizeImmediately; else parent">
                            <mat-form-field
                                [class.dirty]="temporaryEditedName && temporaryEditedName !== file.name"
                                matTooltip="Focus to edit."
                            >
                                <input
                                    matInput
                                    [ngModel]="temporaryEditedName || file.name"
                                    (ngModelChange)="temporaryEditedName = $event"
                                />
                                <mat-hint
                                    [class.active]="showDeclarationState"
                                    (click)="showDeclarationState = !showDeclarationState"
                                    @defaultAnimation
                                    matTooltip="info"
                                    *ngIf="model[attachmentTypeName][internalName]?.declaration"
                                >
                                    <a
                                        (click)="$event.preventDefault()"
                                        @defaultAnimation
                                        href=""
                                        *ngIf="showDeclarationText"
                                    >{{showDeclarationText}}</a>
                                    <span
                                        @defaultAnimation
                                        *ngIf="showDeclarationState"
                                    >
                                        {{
                                            model[attachmentTypeName][
                                                internalName
                                            ].declaration
                                        }}
                                    </span>
                                </mat-hint>
                            </mat-form-field>
                            <ng-container
                                *ngIf="temporaryEditedName && temporaryEditedName !== file.name"
                            >
                                <a
                                    (click)="$event.preventDefault(); rename(temporaryEditedName)"
                                    @defaultAnimation
                                    href=""
                                >{{saveNameText}}</a>
                                <a
                                    (click)="$event.preventDefault(); temporaryEditedName = file.name"
                                    @defaultAnimation
                                    href=""
                                >{{resetNameText}}</a>
                            </ng-container>
                        </ng-container>
                        <ng-template #parent><mat-form-field
                            [class.dirty]="file.initialName !== file.name"
                            @defaultAnimation
                            matTooltip="Focus to edit."
                            *ngIf="!synchronizeImmediately"
                        >
                            <input
                                matInput [ngModel]="file.name"
                                (ngModelChange)="file.name = $event;modelChange.emit(this.model); fileChange.emit(file)"
                            />
                            <mat-hint
                                [class.active]="showDeclarationState"
                                (click)="showDeclarationState = !showDeclarationState"
                                @defaultAnimation
                                matTooltip="info"
                                *ngIf="model[attachmentTypeName][internalName]?.declaration"
                            >
                                <a
                                    (click)="$event.preventDefault()"
                                    @defaultAnimation
                                    href=""
                                    *ngIf="showDeclarationText"
                                >{{showDeclarationText}}</a>
                                <span
                                    @defaultAnimation
                                    *ngIf="showDeclarationState"
                                >
                                    {{
                                        model[attachmentTypeName][
                                            internalName
                                        ].declaration
                                    }}
                                </span>
                            </mat-hint>
                        </mat-form-field></ng-template>
                    </ng-template>
                </mat-card-title>
            </mat-card-header>
            <img
                [attr.alt]="name"
                [attr.src]="file.source"
                @defaultAnimation
                mat-card-image
                *ngIf="file?.type === 'image' && file.source"
            >
            <video
                autoplay
                @defaultAnimation
                mat-card-image
                muted
                *ngIf="file?.type === 'video' && file.source"
                loop
            >
                <source [attr.src]="file.source" [type]="file.content_type">
                {{noPreviewText}}
            </video>
            <div
                class="iframe-wrapper"
                [class.wrapped]="['text/html', 'text/plain'].includes(file?.content_type)"
                *ngIf="file?.type === 'renderableText' && file.source"
            ><iframe
                @defaultAnimation
                [src]="file.source"
                style="border: none; height: 125%; overflow: hidden; transform: scale(.75); transform-origin: 0 0; width: 125%"
            ></iframe></div>
            <ng-container *ngIf="file?.type === 'text' && file.source"><pre
                class="preview"
                @defaultAnimation
                *genericRepresentTextFile="{content: file.source, encoding: encoding}; let content = content"
                mat-card-image
            >{{content}}</pre></ng-container>
            <div
                class="no-preview"
                @defaultAnimation
                mat-card-image
                *ngIf="file?.type === 'binary' && noPreviewText"
            >{{noPreviewText}}</div>
            <div
                class="no-file"
                @defaultAnimation
                mat-card-image
                *ngIf="!file?.type && noFileText"
            >{{noFileText}}</div>
            <mat-card-content>
                <ng-content></ng-content>
                <div
                    @defaultAnimation
                    generic-error
                    *ngIf="showValidationState && model[attachmentTypeName][internalName]?.state?.errors"
                >
                    <p
                        @defaultAnimation
                        *ngIf="model[attachmentTypeName][internalName].state.errors.contentType"
                    >
                        {{
                            typePatternText | genericStringTemplate:{
                                attachmentTypeName: attachmentTypeName,
                                file: file,
                                internalName: internalName,
                                model: model[attachmentTypeName][internalName]
                            }
                        }}
                    </p>
                    <p
                        @defaultAnimation
                        *ngIf="model[attachmentTypeName][internalName].state.errors.database"
                    >
                        {{
                            model[attachmentTypeName][
                                internalName
                            ].state.errors.database
                        }}
                    </p>
                    <p
                        @defaultAnimation
                        *ngIf="model[attachmentTypeName][internalName].state.errors.maximumSize"
                    >
                        {{
                            maximumSizeText | genericStringTemplate:{
                                attachmentTypeName: attachmentTypeName,
                                file: file,
                                internalName: internalName,
                                model: model[attachmentTypeName][internalName]
                            }
                        }}
                    </p>
                    <p
                        @defaultAnimation
                        *ngIf="model[attachmentTypeName][internalName].state.errors.minimumSize"
                    >
                        {{
                            minimumSizeText | genericStringTemplate:{
                                attachmentTypeName: attachmentTypeName,
                                file: file,
                                internalName: internalName,
                                model: model[attachmentTypeName][internalName]
                            }
                        }}
                    </p>
                    <p
                        @defaultAnimation
                        *ngIf="model[attachmentTypeName][internalName].state.errors.name"
                    >
                        {{
                            namePatternText | genericStringTemplate:{
                                attachmentTypeName: attachmentTypeName,
                                file: file,
                                internalName: internalName,
                                model: model[attachmentTypeName][internalName]
                            }
                        }}
                    </p>
                    <p
                        @defaultAnimation
                        *ngIf="model[attachmentTypeName][internalName].state.errors.required"
                    >
                        {{
                            requiredText | genericStringTemplate:{
                                attachmentTypeName: attachmentTypeName,
                                file: file,
                                internalName: internalName,
                                model: model[attachmentTypeName][internalName]
                            }
                        }}
                    </p>
                </div>
            </mat-card-content>
            <mat-card-actions>
                <input #input style="display: none" type="file" />
                <button
                    @defaultAnimation
                    (click)="input.click()"
                    mat-raised-button
                    *ngIf="newButtonText"
                >{{newButtonText}}</button>
                <button
                    (click)="remove()"
                    @defaultAnimation
                    mat-raised-button
                    *ngIf="deleteButtonText && file"
                >{{deleteButtonText}}</button>
                <button mat-raised-button
                    @defaultAnimation
                    *ngIf="downloadButtonText && file"
                ><a [download]="file.name" [href]="file.source">
                    {{downloadButtonText}}
                </a></button>
            </mat-card-actions>
        </mat-card>
    `
})
/* eslint-enable max-len */
/**
 * A file type independent file uploader with file content preview (if
 * supported).
 * @property static:imageMimeTypeRegularExpression - Regular expression which
 * should match to each known image mime type.
 * @property static:textMimeTypeRegularExpression - Regular expression which
 * should match to each known text mime type.
 * @property static:videoMimeTypeRegularExpression - Regular expression which
 * should match to each known video mime type.
 *
 * @property abstractResolver - Abstract resolver service instance.
 * @property attachmentTypeName - Current attachment type name.
 * @property autoMessages - Indicates whether to show messages as file upload
 * results.
 * @property configuration - Configuration object.
 * @property delete - Event emitter which triggers its handler when current
 * file should be removed.
 * @property deleteButtonText - Text for button to trigger file removing.
 * @property deletedName - Holds the deleted model field name.
 * @property downloadButtonText - Text for button to download current file.
 * @property editableName - Indicates whether file name could be edited.
 * @property encoding - Encoding to use to represent given text files.
 * @property file - Holds the current selected file object if present.
 * @property fileChange - Holds an event emitter triggering on file changes.
 * @property filter - Holds filter to transform given file name or content
 * type.
 * @property headerText - Header text to show instead of property description
 * or name.
 * @property idName - Name if id field.
 * @property input - Virtual file input dom node.
 * @property internalName - Technical regular expression style file type.
 * @property keyCode - Mapping from key code to their description.
 * @property mapNameToField - Indicates whether current file name should be
 * mapped to a specific model property.
 * @property maximumSizeText - Maximum file size validation text.
 * @property minimumSizeText - Minimum file size validation text.
 * @property model - File property specification.
 * @property modelChange - Event emitter triggering when model changes happen.
 * @property name - Name or prefix of currently active file.
 * @property namePatternText - Name pattern validation text.
 * @property newButtonText - Text for button to trigger new file upload.
 * @property noFileText - Text to show if now file is selected.
 * @property noPreviewText - Text to show if no preview is available.
 * @property oneDocumentPerFileMode - Indicates whether there exists a one to
 * one relation between document and file.
 * @property resetNameText - Label for button to reset temporary changed file
 * name.
 * @property requiredText - Required file selection validation text.
 * @property revision - Revision of given model to show.
 * @property revisionName - Name if revision field.
 * @property saveNameText - Label for button to save temporary changed file
 * name.
 * @property showDeclarationState - Represents current declaration show state.
 * @property showDeclarationText - Info text to click for more informations.
 * @property showValidationState - Indicates whether validation errors should
 * be displayed. Useful to hide error messages until user tries to submit a
 * form.
 * @property synchronizeImmediately - Indicates whether file upload should be
 * done immediately after a file was selected (or synchronously with other
 * model data).
 * @property template - String template pipes transform method.
 * @property temporaryEditedName - Holds a temporary changed file name.
 * @property typeName - Name of type field.
 * @property typePatternText - File type validation text.
 *
 * @property _data - Holds the data service instance.
 * @property _domSanitizer - Holds the dom sanitizer service instance.
 * @property _extend - Holds the extend object pipe instance's transform
 * method.
 * @property _getFilenameByPrefix - Holds the file name by prefix getter pipe
 * instance's transform method.
 * @property _idIsObject - Indicates whether the model document specific id is
 * provided as object and "value" named property or directly.
 * @property _represent - Holds the represent object pipe instance's transform
 * method.
 * @property _stringFormat - Saves the string formatting pip's transformation
 * function.
 * @property _prefixMatch - Holds the prefix match pipe instance's transform
 * method.
 */
export class FileInputComponent implements AfterViewInit, OnChanges {
    static imageMimeTypeRegularExpression:RegExp = new RegExp(
        '^image/(?:p?jpe?g|png|svg(?:\\+xml)?|vnd\\.microsoft\\.icon|gif|' +
        'tiff|webp|vnd\\.wap\\.wbmp|x-(?:icon|jng|ms-bmp))$')
    static textMimeTypeRegularExpression:RegExp = new RegExp(
        '^(?:application/xml)|' +
        '(?:text/(?:plain|x-ndpb[wy]html|(?:x-)?csv|x?html?|xml))$')
    static representableTextMimeTypeRegularExpression:RegExp = new RegExp(
        // Plain version:
        '^text/plain$'
        // Rendered version:
        // '^(?:application/xml)|(?:text/(?:plain|x?html?|xml))$'
    )
    static videoMimeTypeRegularExpression:RegExp = new RegExp(
        '^video/(?:(?:x-)?(?:x-)?webm|3gpp|mp2t|mp4|mpeg|quicktime|' +
        '(?:x-)?flv|(?:x-)?m4v|(?:x-)mng|x-ms-as|x-ms-wmv|x-msvideo)|' +
        '(?:application/(?:x-)?shockwave-flash)$')

    abstractResolver:AbstractResolver
    attachmentTypeName:string
    @Input() autoMessages:boolean = true
    configuration:PlainObject
    @Output() delete:EventEmitter<string> = new EventEmitter()
    @Input() deleteButtonText:string = 'delete'
    deletedName:string
    @Input() downloadButtonText:string = 'download'
    @Input() editableName:boolean = true
    @Input() encoding:string = 'utf-8'
    file:any = null
    @Output() fileChange:EventEmitter<any> = new EventEmitter()
    @Input() filter:Array<{
        source?:{
            contentType?:string;
            name?:string;
        };
        target:{
            contentType?:string;
            name?:string;
        };
    }> = []
    @Input() headerText:string|null = null
    idName:string
    @ViewChild('input', {static: true}) input:ElementRef
    internalName:string
    keyCode:{[key:string]:number}
    @Input() mapNameToField:string|Array<string>|null = null
    @Input() maximumSizeText:string =
        'Filesize (${file.length} byte) is more than specified maximum of ' +
        '${model.maximumSize} byte.'
    @Input() minimumSizeText:string =
        'Filesize (${file.length} byte) is less than specified minimum of ' +
        '${model.minimumSize} byte.'
    @Input() model:{id?:string;[key:string]:any}
    @Output() modelChange:EventEmitter<{
        id?:string;[key:string]:any;
    }> = new EventEmitter()
    @Input() name:string|null = null
    @Input() namePatternText:string =
        'Given filename "${file.name}" doesn\'t match specified pattern "' +
        '${internalName}".'
    @Input() newButtonText:string = 'new'
    @Input() noFileText:string = 'No file selected.'
    @Input() noPreviewText:string = 'No preview available.'
    @Input() oneDocumentPerFileMode:boolean = true
    @Input() resetNameText:string = '×'
    @Input() requiredText:string = 'Please select a file.'
    @Input() revision:string|null = null
    revisionName:string
    @Input() saveNameText:string = '✓'
    @Input() showDeclarationState:boolean = false
    @Input() showDeclarationText:string = 'ℹ'
    @Input() showValidationState:boolean = false
    @Input() synchronizeImmediately:boolean|PlainObject = false
    template:Function
    temporaryEditedName:string = ''
    typeName:string
    @Input() typePatternText:string =
        'Filetype "${file.content_type}" doesn\'t match specified pattern "' +
        '${model.contentTypeRegularExpressionPattern}".'

    _data:DataService
    _domSanitizer:DomSanitizer
    _extend:Function
    _getFilenameByPrefix:Function
    _idIsObject:boolean = false
    _represent:Function
    _stringFormat:Function
    _prefixMatch:boolean = false
    /**
     * Sets needed services as property values.
     * @param abstractResolver - Injected abstract resolver service instance.
     * @param data - Injected data service instance.
     * @param domSanitizer - Injected dom sanitizer service instance.
     * @param extendPipe - Injected extend object pipe instance.
     * @param getFilenameByPrefixPipe - Saves the file name by prefix retriever
     * pipe instance.
     * @param initialData - Injected initial data service instance.
     * @param representPipe - Saves the object to string representation pipe
     * instance.
     * @param stringFormatPipe - Saves the string formation pipe instance.
     * @param stringTemplatePipe - Injected sString template pipe instance.
     * @param utility - Utility service instance.
     * @returns Nothing.
     */
    constructor(
        abstractResolver:AbstractResolver,
        data:DataService,
        domSanitizer:DomSanitizer,
        extendPipe:ExtendPipe,
        getFilenameByPrefixPipe:GetFilenameByPrefixPipe,
        initialData:InitialDataService,
        representPipe:RepresentPipe,
        stringFormatPipe:StringFormatPipe,
        stringTemplatePipe:StringTemplatePipe,
        utility:UtilityService
    ) {
        this.abstractResolver = abstractResolver
        this.configuration = initialData.configuration
        this.attachmentTypeName =
            this.configuration.database.model.property.name.special.attachment
        this.keyCode = utility.fixed.tools.keyCode
        this.deletedName =
            this.configuration.database.model.property.name.special.deleted
        this.idName =
            this.configuration.database.model.property.name.special.id
        this.model = {[this.attachmentTypeName]: {}, id: null}
        this.revisionName =
            this.configuration.database.model.property.name.special.revision
        this.template = stringTemplatePipe.transform.bind(stringTemplatePipe)
        this.typeName =
            this.configuration.database.model.property.name.special.type
        this._data = data
        this._domSanitizer = domSanitizer
        this._extend = extendPipe.transform.bind(extendPipe)
        this._getFilenameByPrefix = getFilenameByPrefixPipe.transform.bind(
            getFilenameByPrefixPipe)
        this._represent = representPipe.transform.bind(representPipe)
        this._stringFormat = stringFormatPipe.transform.bind(stringFormatPipe)
    }
    /**
     * Determines which type of file we have to present.
     * @returns Nothing.
     */
    determinePresentationType():void {
        if (this.file && this.file.content_type) {
            const contentType:string = this.file.content_type.replace(
                /; *charset=.+$/, '')
            if (FileInputComponent.textMimeTypeRegularExpression.test(
                contentType
            ))
                if (
                    FileInputComponent
                        .representableTextMimeTypeRegularExpression.test(
                            contentType)
                )
                    this.file.type = 'renderableText'
                else
                    this.file.type = 'text'
            else if (FileInputComponent.imageMimeTypeRegularExpression.test(
                contentType
            ))
                this.file.type = 'image'
            else if (FileInputComponent.videoMimeTypeRegularExpression.test(
                contentType
            ))
                this.file.type = 'video'
            else
                this.file.type = 'binary'
        }
    }
    /**
     * Includes given error in current error state object.
     * @param errors - Errors to apply in state.
     * @returns Nothing.
     */
    updateErrorState(errors:any = null):void {
        let currentErrors:PlainObject = this.model[this.attachmentTypeName][
            this.internalName
        ].state.errors
        if (errors) {
            if (!currentErrors)
                currentErrors = this.model[this.attachmentTypeName][
                    this.internalName
                ].state.errors = {}
            for (const name in errors)
                if (errors[name])
                    currentErrors[name] = errors[name]
                else if (currentErrors.hasOwnProperty(name))
                    delete currentErrors[name]
            if (Object.keys(currentErrors).length === 0)
                delete this.model[this.attachmentTypeName][
                    this.internalName
                ].state.errors
        } else if (currentErrors)
            delete this.model[this.attachmentTypeName][
                this.internalName
            ].state.errors
    }
    /**
     * Initializes file upload handler.
     * @param changes - Holds informations about changed bound properties.
     * @returns Nothing.
     */
    async ngOnChanges(changes:SimpleChanges):Promise<void> {
        if (typeof this.model[this.idName] === 'object')
            this._idIsObject = true
        if (
            changes.hasOwnProperty('mapNameToField') &&
            this.mapNameToField &&
            !Array.isArray(this.mapNameToField)
        )
            this.mapNameToField = [this.mapNameToField]
        if (changes.hasOwnProperty('model') || changes.hasOwnProperty(
            'name'
        )) {
            this.internalName = this._getFilenameByPrefix(
                this.model[this.attachmentTypeName], this.name)
            if (
                this.name &&
                this.internalName &&
                this.internalName !== this.name
            )
                this._prefixMatch = true
            this.model[this.attachmentTypeName][this.internalName].state = {}
            this.file = this.model[this.attachmentTypeName][
                this.internalName
            ].value
            if (this.file) {
                this.file.initialName = this.file.name
                this.updateErrorState({required: null})
            } else if (!this.model[this.attachmentTypeName][
                this.internalName
            ].nullable)
                this.updateErrorState({required: true})
            else
                this.updateErrorState({required: null})
        }
        if (
            changes.hasOwnProperty('model') ||
            changes.hasOwnProperty('name') ||
            changes.hasOwnProperty('revision')
        ) {
            if (this.file) {
                this.file.query = `?version=${this.file.digest}`
                /*
                    NOTE: Only set new file source if isn't already present to
                    prevent to download an immediately uploaded file and grab
                    and older cached one.
                */
                if (!this.file.source) {
                    const id:any = this._idIsObject ? this.model[
                        this.idName
                    ].value : this.model[this.idName]
                    if (
                        this.revision &&
                        changes.revision.currentValue !==
                        changes.revision.previousValue
                    )
                        try {
                            await this.retrieveAttachment(
                                id, {rev: this.revision})
                        } catch (error) {
                            this.updateErrorState({database: (
                                'message' in error
                            ) ? error.message : this._represent(error)})
                            this.modelChange.emit(this.model)
                            return
                        }
                    else
                        this.file.source =
                            this._domSanitizer.bypassSecurityTrustResourceUrl(
                                this._stringFormat(
                                    this.configuration.database.url, ''
                                ) + '/' + (
                                    this.configuration.name || 'generic'
                                ) + `/${id}/${this.file.name}` +
                                this.file.query)
                    this.updateErrorState({database: null})
                }
            }
            this.determinePresentationType()
            this.modelChange.emit(this.model)
            this.fileChange.emit(this.file)
        }
    }
    /**
     * Initializes current file input field. Adds needed event observer.
     * @returns Nothing.
     */
    ngAfterViewInit():void {
        this.input.nativeElement.addEventListener('change', ():void => {
            if (this.input.nativeElement.files.length > 0) {
                this.file = {
                    /* eslint-disable camelcase */
                    // IgnoreTypeCheck
                    content_type: this.input.nativeElement.files[0].type ||
                        'text/plain',
                    /* eslint-enable camelcase */
                    // IgnoreTypeCheck
                    data: this.input.nativeElement.files[0],
                    initialName: this.input.nativeElement.files[0].name,
                    // IgnoreTypeCheck
                    length: this.input.nativeElement.files[0].size,
                    name: this.input.nativeElement.files[0].name
                }
                const types:Array<string> = ['content_type', 'name']
                for (const filter of this.filter) {
                    let match:boolean = true
                    for (const type of types)
                        if (
                            filter.hasOwnProperty('source') &&
                            filter.source.hasOwnProperty(type) &&
                            !new RegExp(filter.source[type], 'g').test(
                                this.file[type])
                        ) {
                            match = false
                            break
                        }
                    if (match)
                        for (const type of types)
                            if (filter.target.hasOwnProperty(type))
                                this.file[type] = (
                                    filter.hasOwnProperty(type) &&
                                    filter.source.hasOwnProperty(type)
                                ) ?
                                    this.file[type].replace(
                                        new RegExp(
                                            filter.source[type], 'g'
                                        ),
                                        filter.target[type]
                                    ) :
                                    filter.target[type]
                }
                this.update(this.file ? this.file.name : null)
            }
        })
    }
    /**
     * Removes current file.
     * @returns A Promise which will be resolved after current file will be
     * removed.
     */
    async remove():Promise<void> {
        if (this.synchronizeImmediately && this.file) {
            let result:PlainObject
            const update:PlainObject = {
                [this.typeName]: this.model[this.typeName],
                [this.idName]: this._idIsObject ? this.model[
                    this.idName
                ].value : this.model[this.idName],
                [this.revisionName]: this.model[this.revisionName]
            }
            if (this.oneDocumentPerFileMode)
                update[this.deletedName] = true
            else
                update[this.attachmentTypeName] = {[this.file.name]: {
                    /* eslint-disable camelcase */
                    content_type: 'text/plain',
                    /* eslint-enable camelcase */
                    data: null
                }}
            try {
                result = await this._data.put(update)
            } catch (error) {
                this.updateErrorState({database: (
                    'message' in error
                ) ? error.message : this._represent(error)})
                this.modelChange.emit(this.model)
                return
            }
            this.updateErrorState({database: null})
            if (this.mapNameToField && this.mapNameToField.includes(
                this.idName
            ))
                this.delete.emit(result)
            else
                this.model[this.revisionName] = result.rev
        }
        this.model[this.attachmentTypeName][this.internalName].state.errors =
            this.model[this.attachmentTypeName][this.internalName].value =
                this.file = null
        if (this.model[this.attachmentTypeName][this.internalName].nullable)
            this.updateErrorState({required: null})
        else
            this.updateErrorState({required: true})
        this.modelChange.emit(this.model)
        this.fileChange.emit(this.file)
    }
    /**
     * Renames current file.
     * @param name - New name to rename current file to.
     * @returns A Promise which will be resolved after current file will be
     * renamed.
     */
    async rename(name:string):Promise<void> {
        const id:any = this._idIsObject ? this.model[
            this.idName
        ].value : this.model[this.idName]
        const oldName:string = this.file.name
        if (
            this.file.stub && this.mapNameToField && id &&
            this.mapNameToField.includes(this.idName)
        ) {
            try {
                await this.retrieveAttachment(id)
            } catch (error) {
                this.updateErrorState({database: (
                    'message' in error
                ) ? error.message : this._represent(error)})
                this.modelChange.emit(this.model)
                return
            }
            this.updateErrorState({database: null})
        }
        this.file.name = name
        return this.update(oldName)
    }
    /**
     * Retrieves current attachment with given document id and converts them
     * into a base 64 string which will be set as file source.
     * @param id - Document id which should hold needed attachment.
     * @param options - Options to use for the attachment retrieving.
     * @returns A promise which resolves if requested attachment was retrieved.
     */
    async retrieveAttachment(id:any, options:PlainObject = {}):Promise<void> {
        const file:any = await this._data.getAttachment(
            id, this.file.name, options)
        this.file = {
            /* eslint-disable camelcase */
            content_type: file.type || 'text/plain',
            /* eslint-enable camelcase */
            data: typeof Blob === 'undefined' ?
                file.toString('base64') : await blobToBase64String(file),
            length: file.size,
            name: this.file.name
        }
        this.file.source = this._domSanitizer.bypassSecurityTrustResourceUrl(
            `data:${this.file.content_type};base64,${this.file.data}`)
    }
    /**
     * Uploads current file into database (replaces if old name is given).
     * @param oldName - Name of saved file to update or replace.
     * @returns A Promise which will be resolved after current file will be
     * synchronized.
     */
    async update(oldName?:string):Promise<void> {
        this.model[this.attachmentTypeName][this.internalName].state = {}
        if (this._prefixMatch) {
            const lastIndex:number = this.file.name.lastIndexOf('.')
            if ([0, -1].includes(lastIndex))
                this.file.name = this.name
            else
                this.file.name = this.name + this.file.name.substring(
                    lastIndex)
        }
        this.model[this.attachmentTypeName][
            this.internalName
        ].value = this.file
        // region determine errors
        this.updateErrorState({
            name: !(new RegExp(this.internalName)).test(this.file.name),
            contentType: !(
                [undefined, null].includes(this.model[
                    this.attachmentTypeName
                ][this.internalName].contentTypeRegularExpressionPattern) || (
                    new RegExp(this.model[this.attachmentTypeName][
                        this.internalName
                    ].contentTypeRegularExpressionPattern)
                ).test(this.file.content_type)
            ),
            minimumSize: !(
                [undefined, null].includes(this.model[
                    this.attachmentTypeName
                ][this.internalName].minimumSize) || this.model[
                    this.attachmentTypeName
                ][this.internalName].minimumSize <= this.file.length
            ),
            maximumSize: !(
                [undefined, null].includes(this.model[
                    this.attachmentTypeName
                ][this.internalName].maximumSize) || this.model[
                    this.attachmentTypeName
                ][this.internalName].maximumSize >= this.file.length
            )
        })
        // endregion
        if (
            this.model[this.attachmentTypeName][this.internalName].state.errors
        ) {
            let message:string =
                'There was encountered an error during uploading file "' +
                `${this.file.name}": `
            for (const name in this.model[this.attachmentTypeName][
                this.internalName
            ].state.errors)
                if (this.model[this.attachmentTypeName][
                    this.internalName
                ].state.errors.hasOwnProperty(name))
                    message += (`\n${name} - ` + this.template(this[{
                        contentType: 'typePatternText',
                        maximumSize: 'maximumSizeText',
                        minimumSize: 'minimumSizeText',
                        name: 'namePatternText',
                        required: 'requiredText'
                    }[name]], {
                        attachmentTypeName: this.attachmentTypeName,
                        file: this.file,
                        internalName: this.internalName,
                        model: this.model[this.attachmentTypeName][
                            this.internalName]
                    }))
            this.abstractResolver.message(message)
        } else if (this.synchronizeImmediately) {
            let newData:PlainObject = {
                [this.typeName]: this.model[this.typeName],
                [this.idName]: this._idIsObject ? this.model[
                    this.idName
                ].value : this.model[this.idName]
            }
            if (
                this.synchronizeImmediately !== null &&
                typeof this.synchronizeImmediately === 'object'
            ) {
                const data = {}
                for (const name in this.synchronizeImmediately)
                    if (this.synchronizeImmediately.hasOwnProperty(name))
                        data[name] = this.template(
                            this.synchronizeImmediately[name], this.file)
                this._extend(true, newData, data)
            }
            let id:any = this._idIsObject ? this.model[
                this.idName
            ].value : this.model[this.idName]
            // NOTE: We want to replace old medium.
            if (oldName && oldName !== this.file.name && !(
                this.mapNameToField && id &&
                this.mapNameToField.includes(this.idName)
            ))
                newData[this.attachmentTypeName] = {[oldName]: {data: null}}
            if (![undefined, null].includes(this.model[this.revisionName]))
                newData[this.revisionName] = this.model[this.revisionName]
            const tasks:Array<PlainObject> = []
            if (this.mapNameToField) {
                if (
                    id && id !== this.file.name &&
                    this.mapNameToField.includes(this.idName)
                ) {
                    newData[this.deletedName] = true
                    tasks.unshift(newData)
                    newData = this._extend(
                        true, {}, newData, {[this.deletedName]: false})
                }
                for (const name of this.mapNameToField) {
                    newData[name] = this.file.name
                    if (name === this.idName && this._idIsObject)
                        this.model[name].value = this.file.name
                    else
                        this.model[name] = this.file.name
                }
            }
            newData[this.revisionName] = 'upsert'
            newData[this.attachmentTypeName] = {[this.file.name]: {
                /* eslint-disable camelcase */
                content_type: this.file.content_type,
                /* eslint-enable camelcase */
                data: this.file.data
            }}
            tasks.unshift(newData)
            let result:Array<PlainObject>
            try {
                result = await this._data.bulkDocs(tasks)
            } catch (error) {
                this.updateErrorState({database: (
                    'message' in error
                ) ? error.message : this._represent(error)})
                if (this.autoMessages)
                    this.abstractResolver.message(
                        'Database has encountered an error during uploading ' +
                        `file "${this.file.name}": ` +
                        this.model[this.attachmentTypeName][
                            this.internalName
                        ].state.errors.database)
                this.modelChange.emit(this.model)
                return
            }
            id = newData[this.idName]
            let revision:string
            for (const item of result) {
                if (item.error) {
                    this.updateErrorState({database: item.message})
                    if (this.autoMessages)
                        this.abstractResolver.message(
                            'Database has encountered an error during ' +
                            `uploading file "${this.file.name}": ` +
                            item.message)
                    this.modelChange.emit(this.model)
                    return
                }
                if (item.id === id)
                    revision = item.rev
            }
            this.updateErrorState({database: null})
            if (this.file) {
                this.file.revision = this.model[this.revisionName] = revision
                this.file.query = `?rev=${revision}`
                this.file.source =
                    this._domSanitizer.bypassSecurityTrustResourceUrl(
                        this._stringFormat(
                            this.configuration.database.url, ''
                        ) + `/${this.configuration.name}/${id}/` +
                        `${this.file.name}${this.file.query}`)
                this.determinePresentationType()
            }
            if (this.autoMessages)
                this.abstractResolver.message(
                    `Uploading file ${this.file.name} was succesful.`)
            this.modelChange.emit(this.model)
            this.fileChange.emit(this.file)
        } else if (this.file.data) {
            this.determinePresentationType()
            const fileReader:FileReader = new FileReader()
            fileReader.onload = (event:Event):void => {
                this.file.digest = (new Date()).getTime()
                this.file.source =
                    this._domSanitizer.bypassSecurityTrustResourceUrl(
                        event.target['result'])
                if (this.mapNameToField)
                    for (const name of this.mapNameToField)
                        this.model[name] = this.file.name
                this.modelChange.emit(this.model)
                this.fileChange.emit(this.file)
            }
            fileReader.readAsDataURL(this.file.data)
        }
    }
}
// / endregion
// / region pagination
/* eslint-disable max-len */
@Component({
    animations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'generic-pagination',
    template: `
        <ul @defaultAnimation *ngIf="lastPage > 1">
            <li @defaultAnimation *ngIf="page > 2">
                <a href="" (click)="change($event, 1)">--</a>
            </li>
            <li @defaultAnimation *ngIf="page > 1">
                <a href="" (click)="change($event, previousPage)">-</a>
            </li>
            <li
                class="page-{{currentPage}}"
                @defaultAnimation
                [ngClass]="{current: currentPage === page, previous: currentPage === previousPage, next: currentPage === nextPage, even: even, 'even-page': currentPage % 2 === 0, first: currentPage === 1, last: currentPage === lastPage}"
                *ngFor="let currentPage of pagesRange;let even = even"
            >
                <a (click)="change($event, currentPage)" href="">
                    {{currentPage}}
                </a>
            </li>
            <li @defaultAnimation *ngIf="lastPage > page">
                <a href="" (click)="change($event, nextPage)">+</a>
            </li>
            <li @defaultAnimation *ngIf="lastPage > page + 1">
                <a href="" (click)="change($event, lastPage)">++</a>
            </li>
        </ul>
    `
})
/* eslint-enable max-len */
/**
 * Provides a generic pagination component.
 * @property itemsPerPage - Number of items to show per page as maximum.
 * @property page - Contains currently selected page number.
 * @property pageChange - Event emitter to fire on each page change event.
 * @property pageRangeLimit - Number of concrete page links to show.
 * @property total - Contains total number of pages.
 *
 * @property _changeDetectorReference - Current views change detector reference
 * service instance.
 * @property _makeRangePipe - Saves the make range pipe transformation
 * function.
 */
export class PaginationComponent {
    @Input() itemsPerPage:number = 10
    @Input() page:number = 1
    @Output() pageChange:EventEmitter<number> = new EventEmitter()
    @Input() pageRangeLimit:number = 4
    @Input() total:number = 0

    _changeDetectorReference:ChangeDetectorRef
    _makeRange:Function
    /**
     * Sets needed services as property values.
     * @param changeDetectorReference - Model dirty checking service.
     * @param makeRangePipe - Saves the make range pipe instance.
     * @returns Nothing.
     */
    constructor(
        changeDetectorReference:ChangeDetectorRef,
        makeRangePipe:ArrayMakeRangePipe
    ) {
        this._changeDetectorReference = changeDetectorReference
        this._makeRange = makeRangePipe.transform.bind(makeRangePipe)
    }
    /**
     * Is called whenever a page change should be performed.
     * @param event - The responsible event.
     * @param newPage - New page number to change to.
     * @returns Nothing.
     */
    change(event:Event, newPage:number):void {
        event.preventDefault()
        this._changeDetectorReference.markForCheck()
        this.page = newPage
        this.pageChange.emit(this.page)
    }
    /**
     * Determines the highest page number.
     * @returns The determined page number.
     */
    get lastPage():number {
        return Math.ceil(this.total / this.itemsPerPage)
    }
    /**
     * Retrieves the next or last (if last is current) page.
     * @returns The new determined page number.
     */
    get nextPage():number {
        return Math.min(this.page + 1, this.lastPage)
    }
    /**
     * Determines the number of pages to show.
     * @returns A list of page numbers.
     */
    get pagesRange():Array<number> {
        if (this.page - this.pageRangeLimit < 1) {
            const start:number = 1
            const startRest:number = this.pageRangeLimit - (this.page - start)
            const end:number = Math.min(
                this.lastPage, this.page + this.pageRangeLimit + startRest
            )
            return this._makeRange([start, end])
        }
        const end:number = Math.min(
            this.lastPage, this.page + this.pageRangeLimit)
        const endRest:number = this.pageRangeLimit - (end - this.page)
        const start:number = Math.max(
            1, this.page - this.pageRangeLimit - endRest)
        return this._makeRange([start, end])
    }
    /**
     * Determines the previous or first (if first is current) page.
     * @returns The previous determined page number.
     */
    get previousPage():number {
        return Math.max(1, this.page - 1)
    }
}
// / endregion
// endregion
// region module
@NgModule({
    /*
        NOTE: Running "moduleHelper.determineDeclarations()" is not yet
        supported by the AOT-Compiler.
    */
    declarations: [
        // region directives
        DateDirective,
        RepresentTextFileDirective,
        SliderDirective,
        // endregion
        // region components
        IntervalInputComponent,
        IntervalsInputComponent,
        FileInputComponent,
        PaginationComponent
        // endregion
    ],
    /*
        NOTE: Running "moduleHelper.determineExports()" is not yet supported by
        the AOT-Compiler.
    */
    exports: [
        // region components
        IntervalInputComponent,
        IntervalsInputComponent,
        FileInputComponent,
        PaginationComponent,
        // endregion
        // region directives
        DateDirective,
        RepresentTextFileDirective,
        SliderDirective,
        // endregion
        EditorModule
    ],
    imports: [
        BasePipeModule,
        BrowserModule.withServerTransition({
            appId: 'generic-component-universal'
        }),
        EditorModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatInputModule,
        MatTooltipModule
    ]
})
/**
 * Represents the importable angular module.
 */
export class ComponentModule {}
export default ComponentModule
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
