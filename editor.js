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
    OnDestroy,
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
// NOTE: Could be set via module bundler environment variables.
if (typeof UTC_BUILD_TIMESTAMP === 'undefined')
    /* eslint-disable no-var */
    var UTC_BUILD_TIMESTAMP:number = 1
    /* eslint-enable no-var */
// / region code mirror
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
// / endregion
// / region tinymce
const tinymceBasePath:string = '/tinymce/'
export const TINYMCE_DEFAULT_OPTIONS:PlainObject = {
    /* eslint-disable camelcase */
    // region paths
    baseURL: tinymceBasePath,
    scriptPath: `${tinymceBasePath}tinymce.min.js`,
    skin_url: `${tinymceBasePath}skins/lightgray`,
    theme_url: `${tinymceBasePath}themes/modern/theme.min.js`,
    // endregion
    allow_conditional_comments: false,
    allow_script_urls: false,
    cache_suffix: `?version=${UTC_BUILD_TIMESTAMP}`,
    convert_fonts_to_spans: true,
    document_base_url: '/',
    element_format: 'xhtml',
    entity_encoding: 'raw',
    fix_list_elements: true,
    forced_root_block: null,
    hidden_input: false,
    invalid_elements: 'em',
    invalid_styles: 'color font-size line-height',
    keep_styles: false,
    menubar: false,
    /* eslint-disable max-len */
    plugins: 'fullscreen link code hr nonbreaking searchreplace visualblocks',
    /* eslint-enable max-len */
    relative_urls: false,
    remove_script_host: false,
    remove_trailing_brs: true,
    schema: 'html5',
    /* eslint-disable max-len */
    toolbar1: 'cut copy paste | undo redo removeformat | styleselect formatselect fontselect fontsizeselect | searchreplace visualblocks fullscreen code',
    toolbar2: 'alignleft aligncenter alignright alignjustify outdent indent | link hr nonbreaking bullist numlist bold italic underline strikethrough',
    /* eslint-enable max-len */
    trim: true
    /* eslint-enable camelcase */
}
// / endregion
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
    onChangeCallback:(value:any) => void = () => UtilityService.tools.noop
    onTouchedCallback:() => void = () => UtilityService.tools.noop
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
        useExisting: forwardRef(():typeof TextEditorComponent =>
            TextEditorComponent)
    }],
    selector: 'text-editor',
    template: '<textarea #hostDomNode></textarea>'
})
/**
 * Provides a generic text editor.
 */
export class TextEditorComponent extends AbstractEditorComponent
    implements AfterViewInit, OnDestroy {
    @Input() configuration:PlainObject = TINYMCE_DEFAULT_OPTIONS
    factoryName:string = 'tinymce'
    // region events
    // / region native
    @Output() click:EventEmitter<any> = new EventEmitter()
    @Output() dblclick:EventEmitter<any> = new EventEmitter()
    @Output() MouseDown:EventEmitter<any> = new EventEmitter()
    @Output() MouseUp:EventEmitter<any> = new EventEmitter()
    @Output() MouseMove:EventEmitter<any> = new EventEmitter()
    @Output() MouseOver:EventEmitter<any> = new EventEmitter()
    @Output() MouseOut:EventEmitter<any> = new EventEmitter()
    @Output() MouseEnter:EventEmitter<any> = new EventEmitter()
    @Output() MouseLeave:EventEmitter<any> = new EventEmitter()
    @Output() KeyDown:EventEmitter<any> = new EventEmitter()
    @Output() KeyPress:EventEmitter<any> = new EventEmitter()
    @Output() KeyUp:EventEmitter<any> = new EventEmitter()
    @Output() ContextMenu:EventEmitter<any> = new EventEmitter()
    @Output() Paste:EventEmitter<any> = new EventEmitter()
    // / endregion
    // / region core
    @Output() Focus:EventEmitter<any> = new EventEmitter()
    @Output() Blur:EventEmitter<any> = new EventEmitter()
    @Output() BeforeSetContent:EventEmitter<any> = new EventEmitter()
    @Output() SetContent:EventEmitter<any> = new EventEmitter()
    @Output() GetContent:EventEmitter<any> = new EventEmitter()
    @Output() PreProcess:EventEmitter<any> = new EventEmitter()
    @Output() PostProcess:EventEmitter<any> = new EventEmitter()
    @Output() NodeChange:EventEmitter<any> = new EventEmitter()
    @Output() Undo:EventEmitter<any> = new EventEmitter()
    @Output() Redo:EventEmitter<any> = new EventEmitter()
    @Output() Change:EventEmitter<any> = new EventEmitter()
    @Output() Dirty:EventEmitter<any> = new EventEmitter()
    @Output() Remove:EventEmitter<any> = new EventEmitter()
    @Output() ExecCommand:EventEmitter<any> = new EventEmitter()
    @Output() PastePreProcess:EventEmitter<any> = new EventEmitter()
    @Output() PastePostProcess:EventEmitter<any> = new EventEmitter()
    // / endregion
    // endregion
    /**
     * Initializes the tinymce resource loading if not available yet.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(injector:Injector) {
        super(injector)
        if (typeof TextEditorComponent.applicationInterfaceLoad[
            this.factoryName
        ] !== 'object')
            TextEditorComponent.applicationInterfaceLoad[
                this.factoryName
            ] = new Promise((resolve:Function, reject:Function):Object =>
                this.fixedUtility.$.ajax({
                    cache: true,
                    dataType: 'script',
                    error: reject,
                    success: ():void => {
                        this.factory = this.fixedUtility.globalContext.tinymce
                        resolve(this.factory)
                    },
                    url: TINYMCE_DEFAULT_OPTIONS.scriptPath
                }))
    }
    /**
     * Initializes the text editor element.
     * @returns Nothing.
     */
    ngAfterViewInit():Promise<void> {
        /*
            NOTE: "await super.ngAfterViewInit()" is not supported by
            transpiler yet.
        */
        return super.ngAfterViewInit().then(():void => {
            const configuration:PlainObject = this.extend(
                {}, this.configuration)
            this.factory.baseURL = configuration.baseURL
            delete configuration.baseURL
            delete configuration.scriptPath
            configuration.target = this.hostDomNode.nativeElement
            const initializeInstanceCallback:Function =
                configuration.init_instance_callback
            /* eslint-disable camelcase */
            configuration.init_instance_callback = (instance:any):void => {
            /* eslint-disable camelcase */
                this.instance = instance
                this.instance[this.contentSetterMethodName](this.model)
                this.instance.on('Change', ():void => {
                    this.onChangeCallback(this.instance.getContent())
                    this.modelChange.emit(this.model)
                })
                if (initializeInstanceCallback)
                    initializeInstanceCallback(this.instance)
                for (const name of [
                    'click',
                    'dblclick',
                    'MouseDown',
                    'MouseUp',
                    'MouseMove',
                    'MouseOver',
                    'MouseOut',
                    'MouseEnter',
                    'MouseLeave',
                    'KeyDown',
                    'KeyPress',
                    'ContextMenu',
                    'Paste',
                    'Focus',
                    'Blur',
                    'BeforeSetContent',
                    'SetContent',
                    'GetContent',
                    'PreProcess',
                    'PostProcess',
                    'NodeChange',
                    'Undo',
                    'Redo',
                    'Change',
                    'Dirty',
                    'Remove',
                    'PastePreProcess',
                    'PastePostProcess'
                ])
                    this.instance.on(name, this[name].emit.bind(this[name]))
                this.instance.on('KeyUp', (event:any):void => {
                    this.KeyUp.emit(event)
                    this.onChangeCallback(this.instance.getContent())
                    this.onTouchedCallback()
                    this.modelChange.emit(this.model)
                })
                this.instance.on('ExecCommand', (event:any):void => {
                    this.ExecCommand.emit(event)
                    const content:any = this.instance.getContent()
                    if (typeof content === 'string' && content.length > 0) {
                        this.onChangeCallback(this.instance.getContent())
                        this.onTouchedCallback()
                        this.modelChange.emit(this.model)
                    }
                })
            }
            configuration.setup = (instance:any):void => instance.on('Init', (
            ):void => this.initialized.emit(instance))
            this.factory.init(configuration)
        })
    }
    /**
     * Frees all tinymce allocated data from memory if there exists some.
     * @returns Nothing.
     */
    ngOnDestroy():void {
        if (this.instance)
            this.factory.remove(this.instance)
    }
    /**
     * Triggers disabled state changes.
     * @param isDisabled - Indicates disabled state.
     * @returns Nothing.
     */
    setDisabledState(isDisabled:boolean):void {
        super.setDisabledState(isDisabled)
        if (this.instance)
            this.instance.setMode(this.disabled ? 'readonly' : 'design')
    }
}
/* eslint-disable max-len */
export const propertyContent:PlainObject = {
    editor: `
        (blur)="focused = false"
        @defaultAnimation
        (focus)="focused = true"
        [ngModel]="model.value"
        (ngModelChange)="model.value = onChange($event, state); modelChange.emit(model)"
        [style.visibilty]="initialized ? 'visible' : 'hidden'"
        #state="ngModel"
    `,
    nativ: `
        [name]="model.name"
        [ngModel]="model.value"
        (ngModelChange)="model.value = onChange($event, state); modelChange.emit(model)"
        [placeholder]="description === '' ? null : description ? description : (model.description || model.name)"
        [required]="required === null ? !model.nullable : required"
        #state="ngModel"
    `,
    nativText: `
        [disabled]="disabled === null ? (model.disabled || model.mutable === false || model.writable === false) : disabled"
        [maxlength]="maximumLength === null ? (model.type === 'string' ? model.maximumLength : null) : maximumLength"
        [minlength]="minimumLength === null ? (model.type === 'string' ? model.minimumLength : null) : minimumLength"
        [pattern]="pattern === null ? (model.type === 'string' ? model.regularExpressionPattern : null) : pattern"
    `,
    wrapper: `
        [declaration]="declaration"
        [description]="description"
        [disabled]="disabled"
        [showDeclarationText]="showDeclarationText"
        [maximum]="maximum"
        [maximumLength]="maximumLength"
        [maximumLengthText]="maximumLengthText"
        [maximumText]="maximumText"
        [minimum]="minimum"
        [minimumLength]="minimumLength"
        [minimumLengthText]="minimumLengthText"
        [minimumText]="minimumText"
        [model]="model"
        [pattern]="pattern"
        [required]="required"
        [requiredText]="requiredText"
        [patternText]="patternText"
        [showValidationErrorMessages]="showValidationErrorMessages"
        [type]="type"
    `
}
export const inputContent:string = `
    <mat-hint align="start" @defaultAnimation matTooltip="info">
        <span
            [class.active]="showDeclaration"
            (click)="showDeclaration = !showDeclaration"
            *ngIf="declaration || model.declaration"
        >
            <a
                (click)="$event.preventDefault()"
                @defaultAnimation
                href=""
                *ngIf="showDeclarationText"
            >{{showDeclarationText}}</a>
            <span @defaultAnimation *ngIf="showDeclaration">
                {{declaration || model.declaration}}
            </span>
        </span>
        <span *ngIf="editor && selectableEditor && !model.disabled">
            <span *ngIf="declaration || model.declaration">|</span>
            <a
                [class.active]="activeEditor"
                (click)="$event.preventDefault(); $event.stopPropagation(); activeEditor = true"
                href=""
            >editor</a>
            <span>|</span>
            <a
                [class.active]="!activeEditor"
                (click)="$event.preventDefault(); $event.stopPropagation(); activeEditor = false"
                href=""
            >plain</a>
        </span>
    </mat-hint>
    <span generic-error *ngIf="showValidationErrorMessages">
        <p @defaultAnimation *ngIf="model.state?.errors?.maxlength">
            {{maximumLengthText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state?.errors?.max">
            {{maximumText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state?.errors?.minlength">
            {{minimumLengthText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state?.errors?.min">
            {{minimumText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state?.errors?.pattern">
            {{patternText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state?.errors?.required">
            {{requiredText | genericStringTemplate:model}}
        </p>
    </span>
    <mat-hint
        align="end"
        @defaultAnimation
        *ngIf="!model.selection && model.type === 'string' && model.maximumLength !== null && model.maximumLength < 100"
    >{{model.value?.length || 0}} / {{model.maximumLength}}</mat-hint>
`
/* eslint-enable max-len */
@Component({
    animations,
    selector: 'generic-input',
    template: `
        <generic-textarea
            ${propertyContent.wrapper}
            [activeEditor]="activeEditor"
            [editor]="editor"
            [maximumNumberOfRows]="maximumNumberOfRows"
            [minimumNumberOfRows]="minimumNumberOfRows"
            *ngIf="editor || model.editor; else simpleInput"
            [rows]="rows"
            [selectableEditor]="selectableEditor"
        ><ng-content></ng-content></generic-textarea>
        <ng-template #simpleInput><generic-simple-input
            ${propertyContent.wrapper}
            [labels]="labels"
        ><ng-content></ng-content></generic-simple-input></ng-template>
    `
})
/**
 * A generic form input, selection or textarea component with validation,
 * labeling and info description support.
 * @property activeEditor - Indicates whether current editor is active.
 * @property editor - Editor to choose from for an activated editor.
 * @property labels - Defines some selectable value labels.
 * @property maximumNumberOfRows - Maximum resizeable number of rows.
 * @property minimumNumberOfRows - Minimum resizeable number of rows.
 * @property rows - Number of rows to show.
 * @property selectableEditor - Indicates whether an editor is selectable.
 * @property type - Optionally defines an input type explicitly.
 */
export class InputComponent extends AbstractInputComponent {
    @Input() activeEditor:boolean|null = null
    @Input() editor:PlainObject|string|null = null
    @Input() labels:{[key:string]:string} = {}
    @Input() maximumNumberOfRows:string
    @Input() minimumNumberOfRows:string
    @Input() rows:string
    @Input() selectableEditor:boolean|null = null
    @Input() type:string
}
/* eslint-disable max-len */
@Component({
    animations,
    selector: 'generic-simple-input',
    template: `
        <ng-container
            @defaultAnimation *ngIf="model.selection; else textInput"
        >
            <ng-container
                @defaultAnimation
                *ngIf="model.selection | genericIsArray; else labeledSelect"
            >
                <mat-form-field>
                    <mat-select
                        [(ngModel)]="model.value"
                        ${propertyContent.nativ}
                    ><mat-option
                        *ngFor="let value of model.selection" [value]="value"
                    >
                        {{labels.hasOwnProperty(value) ? labels[value] : value}}
                    </mat-option></mat-select>
                    ${inputContent}
                    <ng-content></ng-content>
                </mat-form-field>
            </ng-container>
            <ng-template #labeledSelect><mat-form-field>
                <mat-select [(ngModel)]="model.value" ${propertyContent.nativ}>
                    <mat-option
                        *ngFor="let key of model.selection | genericObjectKeys:true"
                        [value]="model.selection[key]"
                    >{{key}}</mat-option>
                </mat-select>
                ${inputContent}
                <ng-content></ng-content>
            </mat-form-field></ng-template>
        </ng-container>
        <ng-template #textInput><mat-form-field>
            <input
                ${propertyContent.nativ}
                ${propertyContent.nativText}
                [max]="maximum === null ? (model.type === 'number' ? model.maximum : null) : maximum"
                matInput
                [min]="minimum === null ? (model.type === 'number' ? model.minimum : null) : minimum"
                [type]="type ? type : model.name.startsWith('password') ? 'password' : model.type === 'string' ? 'text' : 'number'"
            />
            ${inputContent}
            <ng-content></ng-content>
        </mat-form-field></ng-template>
    `
})
/* eslint-enable max-len */
/**
 * A generic form input or select component with validation, labeling and info
 * description support.
 * @property labels - Defines some selectable value labels.
 * @property type - Optionally defines an input type explicitly.
 */
export class SimpleInputComponent extends AbstractNativeInputComponent {
    @Input() labels:{[key:string]:string} = {}
    @Input() type:string
    /**
     * Delegates injected injector service instance to the super constructor.
     * @param injector - Injected injector service instance.
     * @returns Nothing.
     */
    constructor(injector:Injector) {
        super(injector)
    }
}
/* eslint-disable max-len */
@Component({
    animations,
    selector: 'generic-textarea',
    template: `
        <ng-container *ngIf="activeEditor; else plain">
            <span [class.focused]="focused" class="editor-label">
                {{
                    description === '' ? null : description ? description : (
                        model.description || model.name
                    )
                }}
            </span>
            <code-editor
                ${propertyContent.editor}
                [configuration]="editor"
                [disabled]="disabled === null ? (model.disabled || model.mutable === false || model.writable === false) : disabled"
                (initialized)="initialized = true"
                *ngIf="editorType === 'code' || editor.indentUnit; else tinymce"
            ></code-editor>
            <ng-template #tinymce><text-editor
                ${propertyContent.editor}
                [configuration]="editor"
                [disabled]="disabled === null ? (model.disabled || model.mutable === false || model.writable === false) : disabled"
                (initialized)="initialized = true"
            ></text-editor></ng-template>
            ${inputContent}
            <ng-content></ng-content>
        </ng-container>
        <ng-template #plain><mat-form-field @defaultAnimation>
            <textarea
                ${propertyContent.nativ}
                ${propertyContent.nativText}
                [cdkAutosizeMaxRows]="maximumNumberOfRows"
                [cdkAutosizeMinRows]="minimumNumberOfRows"
                matInput
                cdkTextareaAutosize
                [rows]="rows"
            ></textarea>
            ${inputContent}
            <ng-content></ng-content>
        </mat-form-field></ng-template>
    `
})
/* eslint-enable max-len */
/**
 * A generic form textarea component with validation, labeling and info
 * description support.
 * @property static:defaultEditorOptions - Globale default editor options.
 *
 * @property activeEditor - Indicated weather current editor is active or not.
 * @property editor - Editor options to choose from for an activated editor.
 * @property editorType - Editor type description.
 * @property maximumNumberOfRows - Maximum resizeable number of rows.
 * @property minimumNumberOfRows - Minimum resizeable number of rows.
 * @property rows - Number of rows to show.
 * @property selectableEditor - Indicates whether an editor is selectable.
 */
export class TextareaComponent extends AbstractNativeInputComponent
    implements OnInit {
    static defaultEditorOptions:{code:PlainObject;markup:PlainObject} = {
        code: {},
        markup: {}
    }

    @Input() activeEditor:boolean|null = null
    @Input() editor:PlainObject|string|null = null
    editorType:string = 'custom'
    @Input() maximumNumberOfRows:string
    @Input() minimumNumberOfRows:string
    @Input() rows:string
    @Input() selectableEditor:boolean|null = null
    /**
     * Forwards injected service instances to the abstract input component's
     * constructor.
     * @param initialData - Injected initial data service instance.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(initialData:InitialDataService, injector:Injector) {
        super(injector)
        if (initialData.configuration.hasOwnProperty(
            'defaultEditorOptions'
        ) && typeof initialData.configuration.defaultEditorOptions ===
        'object' && initialData.configuration.defaultEditorOptions !== null)
            TextareaComponent.defaultEditorOptions =
                initialData.configuration.defaultEditorOptions
    }
    /**
     * Triggers after input values have been resolved.
     * @returns Nothing.
     */
    ngOnInit():void {
        super.ngOnInit()
        if (this.editor === null && this.model.editor)
            this.editor = this.model.editor
        if (typeof this.editor === 'string') {
            if (this.editor.startsWith('!')) {
                this.editor = this.editor.substring(1)
                if (this.selectableEditor === null)
                    this.selectableEditor = false
            }
            if (this.editor.startsWith('(') && this.editor.endsWith(')'))
                this.editor = this.editor.substring(1, this.editor.length - 1)
            else if (this.activeEditor === null)
                this.activeEditor = true
            this.editorType = this.editor
            if (this.editor.startsWith('code'))
                if (this.editor.startsWith('code:'))
                    this.editor = {
                        mode: this.editor.substring('code:'.length)
                    }
                else
                    this.editor = {}
            else if (this.editor === 'raw')
                this.editor = {
                    /* eslint-disable max-len */
                    toolbar1: 'cut copy paste | undo redo removeformat | code | fullscreen',
                    /* eslint-enable max-len */
                    toolbar2: false
                }
            else if (this.editor === 'simple')
                this.editor = {
                    /* eslint-disable max-len */
                    toolbar1: 'cut copy paste | undo redo removeformat | bold italic underline strikethrough subscript superscript | fullscreen',
                    toolbar2: false
                    /* eslint-enable max-len */
                }
            else if (this.editor === 'normal')
                this.editor = {
                    /* eslint-disable max-len */
                    toolbar1: 'cut copy paste | undo redo removeformat | styleselect formatselect | searchreplace visualblocks fullscreen code'
                    /* eslint-enable max-len */
                }
            else
                // Advanced editor.
                this.editor = {}
        } else if (this.editor === null && this.activeEditor)
            this.editor = {}
        if (this.activeEditor === null)
            this.activeEditor = false
        if (this.selectableEditor === null)
            if (typeof this.model.selectableEditor === 'boolean')
                this.selectableEditor = this.model.selectableEditor
            else
                this.selectableEditor = true
        if (typeof this.editor === 'object' && this.editor !== null)
            if (this.editorType.startsWith('code') || this.editor.indentUnit)
                this.editor = this._extend(
                    true,
                    {},
                    CODE_MIRROR_DEFAULT_OPTIONS,
                    TextareaComponent.defaultEditorOptions.code,
                    this.editor
                )
            else
                this.editor = this._extend(
                    true,
                    {},
                    TINYMCE_DEFAULT_OPTIONS,
                    TextareaComponent.defaultEditorOptions.markup,
                    this.editor
                )
        else
            this.selectableEditor = false
    }
}
// endregion
// region module
@NgModule({
    declarations: [
        CodeEditorComponent,
        InputComponent,
        SimpleInputComponent,
        TextareaComponent,
        TextEditorComponent
    ],
    /* TODO needed for web component export
    entryComponents: [
        CodeEditorComponent,
        InputComponent,
        SimpleInputComponent,
        TextareaComponent,
        TextEditorComponent
    ],
    */
    exports: [
        CodeEditorComponent,
        InputComponent,
        SimpleInputComponent,
        TextareaComponent,
        TextEditorComponent
    ],
    imports: [BrowserModule.withServerTransition({
        appId: 'generic-editor-universal'
    })]
})
/**
 * Represents the importable angular module.
 */
export class Module {
    /* TODO needed for web component export
    constructor(injector:Injector) {
        customElements.define(
            'generic-code-editor',
            createCustomElement(CodeEditorComponent, {injector})
        )
    }
    */
}
export default Module
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
