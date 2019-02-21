// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module angularGenericCodeEditor */
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
import Tools, {$DomNode, PlainObject} from 'clientnode'
import {AnimationTriggerMetadata} from '@angular/animations'
import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    NgModule,
    Renderer2 as Renderer,
    Output,
    ViewChild
} from '@angular/core'
import {createCustomElement} from '@angular/elements'
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms'
import {ɵgetDOM as getDOM, BrowserModule} from '@angular/platform-browser'

/*
    NOTE: Default import is not yet support for angular's ahead of time
    compiler.
*/
import {ExtendPipe} from './pipe'
import {
    animations, determineInjector, isAndroid, UtilityService
} from './service'
// endregion
// region configuration
export const CODE_MIRROR_DEFAULT_OPTIONS:PlainObject = {
    // region paths
    path: {
        cascadingStyleSheet: 'lib/codemirror.css',
        base: '/codemirror/',
        mode: 'mode/{mode}/{mode}.js',
        script: 'lib/codemirror.js'
    },
    // endregion
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    lineWrapping: false,
    lineNumbers: true,
    scrollbarStyle: 'native'
}
// endregion
// region abstract
/**
 * Generic value accessor with "ngModel" support.
 * @property composing - Indicates whether the user is creating a composition
 * string (IME events).
 * @property compositionMode - Indicates whether composition is active.
 * @property elementReference - Current dom node to handle input for.
 * @property onChangeCallback - Saves current on change callback.
 * @property onTouchedCallback - Saves current on touch callback.
 * @property renderer - Rendering abstraction layer.
 * @property type - Saves current input type.
 */
export class AbstractValueAccessor implements ControlValueAccessor {
    composing:boolean = false
    compositionMode:boolean = false
    elementReference:ElementRef
    onChangeCallback:(value:any) => void = () => {}// TODO UtilityService.tools.noop
    onTouchedCallback:() => void = () => {}//UtilityService.tools.noop
    renderer:Renderer
    @Input() type:string|null = null
    /**
     * Initializes and forwards needed services to the default value accessor
     * constructor.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector:Injector) {
        this.renderer = injector.get(Renderer)
        this.elementReference = injector.get(ElementRef)
        /*
         * NOTE: "No provider for InjectionToken CompositionEventMode"
         * triggered  if this IME compatible code is activated:
         * "this.compositionMode = injector.get(COMPOSITION_BUFFER_MODE)"
         */
        this.compositionMode = null
        if ([null, undefined].includes(this.compositionMode))
            this.compositionMode = !isAndroid()
    }
    /**
     * Indicates the end of composition.
     * @param value - Current value.
     * @returns Nothing.
     */
    compositionEnd(value:any):void {
        this.composing = false
        if (this.compositionMode)
            this.onChangeCallback(value)
    }
    /**
     * Indicates compositions start event.
     */
    compositionStart():void {
        this.composing = true
    }
    /**
     * Manipulates editable value representation.
     * @param value - Value to manipulate.
     * @returns Given and transformed value.
     */
    export(value:any):any {
        return value
    }
    /**
     * This method is triggered on each input.
     * @param value - Changed value.
     * @returns Nothing.
     */
    handleInput(value:any):void {
        if (!this.compositionMode || this.compositionMode && !this.composing)
            this.onChangeCallback(value)
    }
    /**
     * Reads internal value representation.
     * @param value - Value to convert to its internal representation.
     * @returns Given and transformed value.
     */
    import(value:any):any {
        return value
    }
    /**
     * Needed implementation for an angular control value accessor.
     * @param callback - Callback function to register.
     * @returns What inherited method returns.
     */
    registerOnChange(callback:(...parameter:Array<any>) => void):void {
        this.onChangeCallback = (value:any):void => callback(this.import(
            value))
    }
    /**
     * Needed implementation for an angular control value accessor.
     * @param callback - Callback function to register.
     * @returns What inherited method returns.
     */
    registerOnTouched(callback:() => void):void {
        this.onTouchedCallback = callback
    }
    /**
     * Renders the disabled state into view.
     * @param isDisabled - Represents the state itself.
     * @returns Nothing.
     */
    setDisabledState(isDisabled:boolean):void {
        this.renderer.setProperty(
            this.elementReference.nativeElement, 'disabled', isDisabled)
    }
    /**
     * Overridden inherited function for value export.
     * @param value - Value to export.
     * @returns The transformed give value.
     */
    writeValue(value:any):void {
        value = this.export(value)
        this.renderer.setProperty(
            this.elementReference.nativeElement, 'value',
            [null, undefined].includes(value) ? '' : value)
    }
}
/**
 * Provides a generic editor.
 * @property static:applicationInterfaceLoad - Promise which resolves when
 * specific editor factories are fully loaded.
 * @property static:factories - Should saves all seen factories to load from
 * if the initial provided one was deleted from global scope.
 *
 * @property configuration - Code mirror configuration.
 * @property contentSetterMethodName - Defines the instance method to set
 * content updates.
 * @property disabled - Indicates inputs disabled state.
 * @property extend - Extend object pipe's transform method.
 * @property factory - Current editor constructor.
 * @property hostDomNode - Host textarea dom element to bind editor to.
 * @property instance - Currently active editor instance.
 * @property initialized - Initialized event emitter.
 * @property tools - Tools service instance.
 * @property model - Current editable text string.
 * @property modelChange - Change event emitter.
 */
export class AbstractEditorComponent extends AbstractValueAccessor
    implements AfterViewInit {
    static applicationInterfaceLoad:{[key:string]:Promise<any>|null} = {}
    static factories:{[key:string]:any} = {}

    @Input() configuration:PlainObject = {}
    contentSetterMethodName:string = 'setContent'
    @Input() disabled:boolean|null = null
    extend:Function
    factory:any
    factoryName:string = ''
    fixedUtility:typeof UtilityService
    @ViewChild('hostDomNode') hostDomNode:ElementRef
    instance:any = null
    @Output() initialized:EventEmitter<any> = new EventEmitter()
    @Input() model:string = ''
    @Output() modelChange:EventEmitter<string> = new EventEmitter()
    /**
     * Initializes the code mirror resource loading if not available yet.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector:Injector) {
        super(injector)
        const get:Function = determineInjector(
            injector, this, this.constructor)
        this.extend = get(ExtendPipe).transform.bind(get(ExtendPipe))
        this.fixedUtility = get(UtilityService).fixed
    }
    /**
     * Initializes the code editor element.
     * @returns Nothing.
     */
    async ngAfterViewInit():Promise<void> {
        if (!this.factory)
            if (this.fixedUtility.globalContext[this.factoryName])
                this.factory =
                    this.fixedUtility.globalContext[this.factoryName]
            else if (AbstractEditorComponent.factories[this.factoryName])
                this.factory = AbstractEditorComponent.factories[
                    this.factoryName]
        if (this.factory) {
            AbstractEditorComponent.factories[this.factoryName] = this.factory
            /*
                NOTE: We have to do a dummy timeout to avoid an event emit in
                first initializing call stack.
            */
            await this.fixedUtility.tools.timeout()
        } else {
            await AbstractEditorComponent.applicationInterfaceLoad[
                this.factoryName]
            AbstractEditorComponent.factories[this.factoryName] = this.factory
        }
    }
    /**
     * Synchronizes given value into internal instance.
     * @param value - Given value to set in code editor.
     * @returns What inherited method returns.
     */
    export(value:any):any {
        this.model = [null, undefined].includes(value) ? '' : value.toString()
        if (this.instance)
            this.instance[this.contentSetterMethodName](this.model)
        return super.export(value)
    }
    /**
     * Triggers disabled state changes.
     * @param isDisabled - Indicates disabled state.
     * @returns Nothing.
     */
    setDisabledState(isDisabled:boolean):void {
        this.disabled = isDisabled
    }
}
// endregion
// region components/directives
@Component({
    animations,
    // TODO: vsavkin replace the above selector with the one below it once
    // https://github.com/angular/angular/issues/3011 is implemented
    // selector: '[ngModel],[formControl],[formControlName]',
    host: {
        '(compositionend)': '$any(this).compositionEnd($event.target.value)',
        '(compositionstart)': '$any(this).compositionStart()',
        '(blur)': 'onTouchedCallback()',
        '(input)': '$any(this).handleInput($event.target.value)'
    },
    providers: [{
        multi: true,
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(():typeof CodeEditorComponent =>
            CodeEditorComponent)
    }],
    selector: 'code-editor',
    template: '<textarea #hostDomNode></textarea>'
})
/**
 * Provides a generic code editor.
 * @property static:modesLoad - Mapping from mode to their loading state.
 *
 * @property blur - Blur event emitter.
 * @property focus - Focus event emitter.
 */
export class CodeEditorComponent extends AbstractEditorComponent
    implements AfterViewInit {
    static modesLoad:{[key:string]:Promise<void>|true} = {}

    @Output() blur:EventEmitter<any> = new EventEmitter()
    @Input() configuration:PlainObject = CODE_MIRROR_DEFAULT_OPTIONS
    contentSetterMethodName:string = 'setValue'
    factoryName:string = 'CodeMirror'
    @Output() focus:EventEmitter<any> = new EventEmitter()
    /**
     * Initializes the code mirror resource loading if not available yet.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector:Injector) {
        super(injector)
        if (typeof CodeEditorComponent.applicationInterfaceLoad[
            this.factoryName
        ] !== 'object')
            CodeEditorComponent.applicationInterfaceLoad[
                this.factoryName
            ] = Promise.all([
                new Promise((resolve:Function):$DomNode =>
                    this.fixedUtility.$(`
                        <link
                            href="${CODE_MIRROR_DEFAULT_OPTIONS.path.base}` +
                            CODE_MIRROR_DEFAULT_OPTIONS.path
                                .cascadingStyleSheet +
                            `" rel="stylesheet"
                            type="text/css"
                        />
                    `).appendTo('head').on('load', resolve)),
                new Promise((resolve:Function, reject:Function):Object =>
                    this.fixedUtility.$.ajax({
                        cache: true,
                        dataType: 'script',
                        error: reject,
                        success: ():void => {
                            this.factory = this.fixedUtility.globalContext[
                                this.factoryName]
                            resolve(this.factory)
                        },
                        url: CODE_MIRROR_DEFAULT_OPTIONS.path.base +
                            CODE_MIRROR_DEFAULT_OPTIONS.path.script
                    }))
            ])
    }
    /**
     * Initializes the code editor element.
     * @returns Nothing.
     */
    ngAfterViewInit():Promise<void> {
        /*
            NOTE: "await super.ngAfterViewInit()" is not supported by
            transpiler yet.
        */
        return super.ngAfterViewInit().then(async ():Promise<void> => {
            if (this.configuration.mode)
                if (CodeEditorComponent.modesLoad.hasOwnProperty(
                    this.configuration.mode
                )) {
                    if (CodeEditorComponent.modesLoad[
                        this.configuration.mode
                    ] !== true)
                        await CodeEditorComponent.modesLoad[
                            this.configuration.mode]
                } else {
                    CodeEditorComponent.modesLoad[this.configuration.mode] =
                        new Promise((
                            resolve:Function, reject:Function
                        ):Object => this.fixedUtility.$.ajax({
                            cache: true,
                            dataType: 'script',
                            error: reject,
                            success: resolve,
                            url: this.configuration.path.base +
                                this.configuration.path.mode.replace(
                                    /{mode}/g, this.configuration.mode)
                        }))
                    await CodeEditorComponent.modesLoad[
                        this.configuration.mode]
                }
            const configuration:PlainObject = this.extend(
                {}, this.configuration, {readOnly: this.disabled})
            delete configuration.path
            this.instance = this.factory.fromTextArea(
                this.hostDomNode.nativeElement, configuration)
            this.instance[this.contentSetterMethodName](this.model)
            this.instance.on('blur', (instance:any, event:any):void =>
                this.blur.emit(event))
            this.instance.on('change', ():void => {
                this.onChangeCallback(this.instance.getValue())
                this.modelChange.emit(this.model)
            })
            this.instance.on('focus', (instance:any, event:any):void =>
                this.focus.emit(event))
            this.initialized.emit(this.instance)
        })
    }
    /**
     * Triggers disabled state changes.
     * @param isDisabled - Indicates disabled state.
     * @returns Nothing.
     */
    setDisabledState(isDisabled:boolean):void {
        super.setDisabledState(isDisabled)
        if (this.instance)
            this.instance.setOption('readOnly', this.disabled)
    }
}
// endregion
// region module
@NgModule({
    declarations: [CodeEditorComponent],
    entryComponents: [CodeEditorComponent],
    exports: [CodeEditorComponent],
    imports: [BrowserModule.withServerTransition({
        appId: 'generic-code-editor-universal'
    })]
})
/**
 * Represents the importable angular module.
 */
export class Module {
    constructor(injector:Injector) {
        customElements.define(
            'generic-code-editor',
            createCustomElement(CodeEditorComponent, {injector})
        )
    }
}
export default Module
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
