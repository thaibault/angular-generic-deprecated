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
// region imports 
import Tools, {$, DomNode, globalContext, PlainObject} from 'clientnode'
import {APP_INITIALIZER, Injectable, Injector, NgModule} from '@angular/core'
// endregion
// region variables
export let LAST_KNOWN_DATA:{data:PlainObject;sequence:number|string} = {
    data: {}, sequence: 'now'
}
export let currentInstanceToSearchInjectorFor:Object|null = null
export const globalVariableNameToRetrieveDataFrom:string = 'genericInitialData'
export const applicationDomNodeSelector:string = 'application, [application]'
export const SYMBOL:string = `${new Date().getTime()}/${Math.random()}`
// endregion
// region provider
/**
 * Initialized initial given data.
 * @param domNode - Pre-renderable dom node when existing.
 * @param initialData - Injected initial data service instance.
 * @param utility - Injected utility service instance.
 * @returns Initializer function.
 */
export function initialDataInitializerFactory(
    domNode:DomNode, initialData:InitialDataService, utility:UtilityService
):Function {
    /*
        NOTE: If not pre-rendering the generic base service application
        initializer handles initial data retrieving.
    */
    console.log('A', domNode, initialData, utility)
    if (domNode)
        initialData.retrieveFromDomNode(domNode, false)
    else
        initialData.retrieveFromDomNode(applicationDomNodeSelector)
    return utility.fixed.tools.noop
}
// endregion
// region basic services
@Injectable({providedIn: 'root'})
/**
 * Injectable angular service for the tools class.
 * @property static:$ - Holds an instance of a generic dom abstraction layer
 * like jquery.
 * @property static:globalContext - Hold a reference to the environment specific
 * global scope.
 * @property static:tools - Holds a reference to the wrapped tools class.
 *
 * @property fixed - Reference to this static members.
 * @property tools - Holds an injector scope specific tools instance.
 */
export class UtilityService {
    static $:any = $
    static globalContext:any = globalContext
    static tools:typeof Tools = Tools

    fixed:typeof UtilityService = UtilityService
    tools:Tools = new Tools()
}
@Injectable({providedIn: 'root'})
/**
 * Serves initial data provided via a global variable.
 * @property static:defaultScope - Saves all minimal needed environment
 * variables.
 * @property static:injectors - Saves a set of all root injectors.
 * @property static:removeFoundData - Indicates whether to remove found data to
 * tidy up global scope or free memory (by removing dom node attributes).
 *
 * @property configuration - Expected initial data name.
 * @property utility - Injected or given utility service instance.
 */
export class InitialDataService {
    static defaultScope:PlainObject = {configuration: {database: {
        connector: {
            /* eslint-disable camelcase */
            auto_compaction: true,
            revs_limit: 10
            /* eslint-enable camelcase */
        },
        createGenericFlatIndex: true,
        model: {
            entities: {},
            property: {
                defaultSpecification: {
                    minimum: 0,
                    minimumLength: 0,
                    minimumNumber: 0
                },
                name: {
                    reserved: [],
                    special: {
                        allowedRole: '_allowedRoles',
                        attachment: '_attachments',
                        conflict: '_conflicts',
                        constraint: {
                            execution: '_constraintExecutions',
                            expression: '_constraintExpressions'
                        },
                        create: {
                            execution: '_createExecution',
                            expression: '_createExpression'
                        },
                        deleted: '_deleted',
                        deletedConflict: '_deleted_conflicts',
                        extend: '_extends',
                        id: '_id',
                        localSequence: '_local_seq',
                        maximumAggregatedSize:
                            '_maximumAggregatedSize',
                        minimumAggregatedSize:
                            '_minimumAggregatedSize',
                        oldType: '_oldType',
                        revision: '_rev',
                        revisions: '_revisions',
                        revisionsInformation: '_revs_info',
                        strategy: '_updateStrategy',
                        type: '-type',
                        update: {
                            execution: '_updateExecution',
                            expression: '_updateExpression'
                        }
                    },
                    typeRegularExpressionPattern: {
                        private: '^_[a-z][A-Za-z0-9]+$',
                        public: '^[A-Z][A-Za-z0-9]+$'
                    },
                    validatedDocumentsCache: '_validatedDocuments'
                }
            }
        },
        plugins: [],
        url: 'generic'
    }}}
    static injectors:Set<Injector> = new Set()
    static removeFoundData:boolean = false

    configuration:PlainObject
    globalContext:any
    tools:Tools
    /**
     * Sets all properties of given initial data as properties to this
     * initializing instance.
     * @param utility - Saves the generic tools service instance.
     * @returns Nothing.
     */
    constructor(utility:UtilityService) {
        if (!utility)
            utility = new UtilityService()
        this.globalContext = utility.fixed.globalContext
        this.tools = utility.fixed.tools
        this.set(
            InitialDataService.defaultScope,
            globalVariableNameToRetrieveDataFrom in
                utility.fixed.globalContext ?
                    utility.fixed.globalContext[
                        globalVariableNameToRetrieveDataFrom] :
                    {}
        )
        if (InitialDataService.removeFoundData)
            delete utility.fixed.globalContext[
                globalVariableNameToRetrieveDataFrom]
    }
    /**
     * Retrieve initial data from given dom node or dom node identifier.
     * @param domNodeReference - Dom node or a selector to retrieve a dom node.
     * @param removeFoundData - Removes found attribute value from dom node.
     * @param attributeName - An attribute name to retrieve data from.
     * @returns Nothing.
     */
    retrieveFromDomNode(
        domNodeReference:DomNode|string = applicationDomNodeSelector,
        removeFoundData:boolean|null = null,
        attributeName:string = 'initialData'
    ):PlainObject {
        /*
            NOTE: We cannot define this as default parameter since it should be
            resolved at runtime (to be able to change this value during
            initialisation).
        */
        if (removeFoundData === null)
            removeFoundData = InitialDataService.removeFoundData
        let domNode:DomNode|null = null
        if (typeof domNodeReference === 'string') {
            if (
                'document' in this.globalContext &&
                'querySelector' in this.globalContext.document
            )
                domNode = this.globalContext.document.querySelector(
                    domNodeReference)
        } else
            domNode = domNodeReference
        let result:PlainObject = {}
        if (
            domNode &&
            'getAttribute' in domNode &&
            domNode.getAttribute(attributeName)
        ) {
            result = this.set(JSON.parse(domNode.getAttribute(attributeName)))
            if (removeFoundData)
                domNode.removeAttribute(attributeName)
        }
        return result
    }
    /**
     * Sets initial data.
     * @param parameter - All given data objects will be merged into current
     * scope.
     * @returns Complete generated data.
     */
    set(...parameter:Array<PlainObject>):InitialDataService {
        return this.tools.extend(true, this, ...parameter)
    }
}
/**
 * Helper function to easy create abstract classes without tight bounds.
 * @param injector - Application specific injector to use instead auto
 * detected one.
 * @param instance - Instance reference to determine corresponding responsible
 * injector.
 * @param constructor - Matched to given instance to try to inject for each
 * known injector instance.
 * @returns Nothing.
 */
export const determineInjector:Function = (
    injector?:Injector, instance?:Object, constructor?:Object
):Function|void => {
    if (injector)
        return injector.get.bind(injector)
    if (currentInstanceToSearchInjectorFor === this)
        throw SYMBOL
    currentInstanceToSearchInjectorFor = this
    // NOTE: Converting set to array is necessary to avoid transpiling issues.
    for (const injector of Array.from(InitialDataService.injectors))
        try {
            if (injector.get(constructor, NaN) === instance)
                return injector.get.bind(injector)
        } catch (error) {
            currentInstanceToSearchInjectorFor = null
            if (error === SYMBOL)
                return injector.get.bind(injector)
            throw error
        }
    currentInstanceToSearchInjectorFor = null
    if (InitialDataService.injectors.size === 1) {
        console.warn(
            'Could not determine injector, but using the only registered ' +
            'one. This will fail an multiple application instances.')
        const injector:Injector = Array.from(InitialDataService.injectors)[0]
        return injector.get.bind(injector)
    }
    throw new Error(
        'No unambiguously injector could be determined automatically.')
}
@Injectable({providedIn: 'root'})
/**
 * Represents current global offline state. Saves buffered offline caching
 * events.
 * @property static:changeCallbacks - List of registered offline state change
 * callbacks.
 * @property static:events - List of triggered events.
 *
 * @property changeCallbacks - List of registered offline state change
 * callbacks.
 * @property events - List of triggered events.
 */
export class OfflineState {
    static changeCallbacks:Array<Function> = []
    static events:Array<Array<any>> = []

    changeCallbacks:Array<Function>
    events:Array<Array<any>>
    /**
     * Sets static properties as instance properties to be compatible with
     * angulars singleton dependency injection concept.
     * @returns Nothing.
     */
    constructor() {
        this.changeCallbacks = OfflineState.changeCallbacks
        this.events = OfflineState.events
    }
}
// endregion
// region module
@NgModule({
    providers: [
        InitialDataService,
        OfflineState,
        UtilityService,
        {
            deps: [InitialDataService, UtilityService],
            multi: true,
            provide: APP_INITIALIZER,
            useFactory: initialDataInitializerFactory.bind(null, null)
        }
    ]
})
/**
 * Represents the importable angular module.
 */
export class BaseServiceModule {}
export default BaseServiceModule
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
