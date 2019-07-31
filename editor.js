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
import Tools, {DomNode, PlainObject, $DomNode} from 'clientnode'
import {AnimationTriggerMetadata} from '@angular/animations'
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    NgModule,
    NgZone,
    OnChanges,
    Optional,
    Renderer2 as Renderer,
    SimpleChanges,
    OnDestroy,
    Output,
    ViewChild
} from '@angular/core'
import {
    ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR
} from '@angular/forms'
import {TextFieldModule} from '@angular/cdk/text-field'
import {ErrorStateMatcher} from '@angular/material/core'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select'
import {MatTooltipModule} from '@angular/material/tooltip'
import {ɵgetDOM as getDOM, BrowserModule} from '@angular/platform-browser'

import {animations} from './animation'
/*
    NOTE: Default import is not yet support for angular's ahead of time
    compiler.
*/
import {
    AttachmentWithPrefixExistsPipe,
    ExtendPipe,
    GetFilenameByPrefixPipe,
    BasePipeModule,
    NumberGetUTCTimestampPipe
} from './basePipe'
import {
    BaseServiceModule, determineInjector, InitialDataService, UtilityService
} from './baseService'
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
    skin_url: `${tinymceBasePath}skins/ui/oxide`,
    theme_url: `${tinymceBasePath}themes/silver/theme.min.js`,
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
/**
 * Represents error state when current form is submitted or given reference
 * has a corresponding indicator.
 * @property static:indicatorPropertyName - Holds the name of the indicator
 * property name of referenced component.
 *
 * @property reference - Optionally holds a components instance with indicator
 * property.
 */
export class GenericErrorStateMatcher implements ErrorStateMatcher {
    static indicatorPropertyName:string = 'showValidationState'

    reference:any

    /**
     * Saves a reference pointing to corresponding component with indicator
     * property.
     * @returns Nothing.
     */
    constructor(reference:any) {
        this.reference = reference
    }
    /**
     * @param control - 
     * @param form -
     * @returns Boolean indicating to represent error state or not.
     */
    isErrorState(control:any, form:any):boolean {
        const invalid:boolean = control && control.invalid
        if (invalid) {
            if (
                this.reference &&
                this.constructor['indicatorPropertyName'] in this.reference &&
                ![null, undefined].includes(
                    this.reference[this.constructor['indicatorPropertyName']]
                )
            )
                return this.reference[this.constructor[
                    'indicatorPropertyName'
                ]]
            return Boolean(
                control.dirty || control.touched || form && form.submitted
            )
        }
        return false
    }
}
// region abstract
/**
 * Generic value accessor with "ngModel" support.
 * @property composing - Indicates whether the user is creating a composition
 * string (IME events).
 * @property compositionMode - Indicates whether composition is active.
 * @property domNode - Current dom node to handle input for.
 * @property onChangeCallback - Saves current on change callback.
 * @property onTouchedCallback - Saves current on touch callback.
 * @property renderer - Rendering abstraction layer.
 * @property type - Saves current input type.
 */
export class AbstractValueAccessor implements ControlValueAccessor {
    composing:boolean = false
    compositionMode:boolean = false
    domNode:ElementRef
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
        this.domNode = injector.get(ElementRef)
        /*
         * NOTE: "No provider for InjectionToken CompositionEventMode"
         * triggered if this IME compatible code is activated:
         * "this.compositionMode = injector.get(COMPOSITION_BUFFER_MODE)"
         */
        this.compositionMode = null
        if ([null, undefined].includes(this.compositionMode))
            /*
                We have to check whether the agent is Android because
                composition events behave differently between IOS and Android.
            */
            this.compositionMode = !(/android (\d+)/.test((
                getDOM() ? getDOM().getUserAgent() : ''
            ).toLowerCase()))
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
            this.domNode.nativeElement, 'disabled', isDisabled)
    }
    /**
     * Overridden inherited function for value export.
     * @param value - Value to export.
     * @returns The transformed give value.
     */
    writeValue(value:any):void {
        value = this.export(value)
        this.renderer.setProperty(
            this.domNode.nativeElement,
            'value',
            [null, undefined].includes(value) ? '' : value
        )
    }
}
/**
 * Generic input component. TODO: Test new methods!
 * @property static:defaultModel - Provides a static default model object.
 * @property static:evaluatablePropertyNames - Attribute names which should be
 * evaluated before to store.
 * @property static:reflectableModelPropertyNames - Model property names which
 * should be reflected to the actual dom node.
 * @property static:reflectableStatePropertyNames - State property names which
 * should be reflected to the actual dom node.
 *
 * @property appearance - Input representation type.
 * @property changeDetectorReference - Change detector reference service
 * instance.
 * @property changeTrigger - Trigger property to indicate change detection for
 * explicitly update internal state.
 * @property declaration - Declaration info text.
 * @property description - Description to use instead of those coming from
 * model specification.
 * @property disabled - Sets disabled state.
 * @property domNode - Holds the host dom node.
 * @property emptyEqualsToNull - Defines how to handle empty type specific
 * values.
 * @property maximumLength - Maximum allowed number of symbols.
 * @property maximumLengthText - Maximum length validation text.
 * @property minimumLength - Minimum allowed number of symbols.
 * @property minimumLengthText - Minimum number validation text.
 * @property model - Holds model informations including actual value and
 * metadata.
 * @property modelChange - Model event emitter emitting events on each model
 * change.
 * @property name - Model's field name.
 * @property placeholder - Sets a dummy value.
 * @property pattern - Allowed pattern to match against given input.
 * @property patternText - Pattern validation text.
 * @property required - Indicates whether this inputs have to be filled.
 * @property requiredText - Required validation text.
 * @property selectableEditor - Indicates whether an editor is selectable.
 * @property showDeclaration - Represents current declaration show state.
 * @property showDeclarationText - Info text to click for more informations.
 * @property showValidationState - Indicates whether validation errors or valid
 * states should be suppressed. Useful to prevent error component from showing
 * error states before the user has submit the form.
 * @property stateChange - Event emitter for tracking model meta data state
 * changes.
 *
 */
export class AbstractInputComponent implements OnChanges {
    static defaultModel:PlainObject = {
        declaration: null,
        default: null,
        description: null,
        editor: null,
        emptyEqualsToNull: true,
        maximum: Infinity,
        minimum: 0,
        maximumLength: Infinity,
        minimumLength: 0,
        mutable: true,
        name: 'NO_NAME_DEFINED',
        nullable: true,
        placeholder: null,
        regularExpressionPattern: '.*',
        selection: null,
        state: {
            dirty: true,
            invalid: false,
            pristine: true,
            touched: false,
            untouched: true,
            valid: true
        },
        trim: true,
        type: 'string',
        writable: true
    }
    /*
        NOTE: Not all possible properties are listet here. Concrete
        implementations may provide more specific additional properties.
    */
    static evaluatablePropertyNames:Array<string> = [
        'disabled', 'model', 'required', 'showValidationState'
    ]
    static reflectableModelPropertyNames:Array<string> = ['name', 'value']
    static reflectableStatePropertyNames:Array<string> = [
        'dirty',
        'invalid',
        'pristine',
        'touched',
        'untouched',
        'valid'
    ]

    @Input() appearance:string = 'standard'
    changeDetectorReference:ChangeDetectorRef
    @Input() changeTrigger:boolean = false
    @Input() declaration:string
    @Input() default:any
    @Input() description:string
    @Input() disabled:boolean
    domNode:ElementRef
    @Input() emtyEqualsToNull:boolean
    @Input() infoTooltipDescriptionText:string = ''
    @Input() maximumLength:number
    @Input() maximumLengthText:string =
        'Please type less or equal than ${maximumLength} symbols.'
    @Input() minimumLength:number
    @Input() minimumLengthText:string =
        'Please type at least or equal ${minimumLength} symbols.'
    @Input() model:PlainObject = Tools.copy(
        AbstractInputComponent.defaultModel)
    @Output() modelChange:EventEmitter<PlainObject> = new EventEmitter()
    @Input() name:string
    @Input() placeholder:string
    /*
        NOTE: Name mapped values (which aren't evaluated) have to be
        initialized as their model field pendant ("regularExpressionPattern"
        here) to avoid an additional sync between both of them.
    */
    @Input() pattern:string =
        AbstractInputComponent.defaultModel.regularExpressionPattern
    @Input() patternText:string =
        'Your string have to match the regular expression: "' +
        '${regularExpressionPattern}".'
    renderer:Renderer
    @Input() required:boolean
    @Input() requiredText:string = 'Please fill this field.'
    @Input() selectableEditor:boolean
    @Input() showDeclaration:boolean = false
    @Input() showDeclarationText:string = 'help_outline'
    @Input() showValidationState:boolean|null = null
    @Output() stateChange:EventEmitter<Object> = new EventEmitter()
    /**
     * Sets needed services as property values.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(@Optional() injector:Injector) {
        const get:Function = determineInjector(
            injector, this, this.constructor)
        this.changeDetectorReference = get(ChangeDetectorRef)
        this.domNode = get(ElementRef)
        this.renderer = get(Renderer)
        // NOTE: We have to provide a way to focus inner input node.
        this.domNode.nativeElement.delegateFocus = (
            selector:string = '.ng-model'
        ) => get(NgZone).run(() => {
            /*
                NOTE: We have to focus, blur and focus again to ensure final
                state will be renderer by angular.
                It's a workaround.
            */
            const domNode:DomNode =
                this.domNode.nativeElement.querySelector(selector)
            domNode.focus()
            domNode.blur()
            domNode.focus()
        })
        this.initializeModel()
    }
    /*
     * Initialize model by reading from dom node.
     * @returns Nothing.
     */
    initializeModel():void {
        const changes:any = {}
        for (const name in this.model)
            if (
                this.model.hasOwnProperty(name) &&
                name in this.domNode.nativeElement
            ) {
                this[name] = this.domNode.nativeElement[name]
                changes[name] = {
                    currentValue: this[name],
                    previousValue: this.model[name]
                }
            }
        this.reflectPropertiesToModel(changes)
    }
    /**
     * Triggers after first input values have been resolved or changed.
     * @param changes - Object that represents property changes.
     * @returns Nothing.
     */
    ngOnChanges(changes:SimpleChanges):void {
        /*
            If state was set backup in local instance to reset it to the model
            after reinitializing given model configuration.
        */
        let state:any = null
        if ('state' in this.model)
            state = this.model.state
        for (const name of this.constructor['evaluatablePropertyNames'])
            if (name in changes && typeof this[name] === 'string')
                try {
                    this[name] = (new Function(`return ${this[name]}`))()
                } catch (error) {}
        if (state !== null)
            this.model.state = state
        if (
            !this.showValidationState &&
            'hasAttribute' in this.domNode.nativeElement &&
            this.domNode.nativeElement.hasAttribute('show-validation-state') &&
            'getAttribute' in this.domNode.nativeElement &&
            this.domNode.nativeElement.getAttribute(
                'show-validation-state'
            ).trim() !== 'false'
        )
            this.showValidationState = true
        if ('model' in changes)
            for (const name of this.constructor[
                'reflectableModelPropertyNames'
            ])
                if (!(name in changes) && this.model.hasOwnProperty(name))
                    this[name] = this.model[name]
        this.reflectPropertiesToModel(changes)
        this.prepareModelTransformations()
        this.reflectPropertiesToDomNode()
    }
    /**
     * Initializes model (if not done yet) and pre compiles specified model
     * transformations.
     * @returns Nothing.
     */
    prepareModelTransformations():void {
        if (
            (!this.model.state || this.model.state.pristine) &&
            [null, undefined].includes(this.model.value) &&
            ![null, undefined].includes(this.model.default)
        )
            this.model.value = this.model.default
        if (typeof this.model.value === 'string' && this.model.trim)
            this.model.value === this.model.value.trim()
        for (const hookType of ['onUpdateExecution', 'onUpdateExpression'])
            if (
                this.model.hasOwnProperty(hookType) &&
                this.model[hookType] &&
                typeof this.model[hookType] !== 'function'
            )
                this.model[hookType] = new Function(
                    'attachmentWithPrefixExists',
                    'getFilenameByPrefix',
                    'idName',
                    'model',
                    'modelConfiguration',
                    'modelName',
                    'models',
                    'name',
                    'newDocument',
                    'now',
                    'nowUTCTimestamp',
                    'oldDocument',
                    'propertySpecification',
                    'revisionName',
                    'securitySettings',
                    'serialize',
                    'specialNames',
                    'typeName',
                    'userContext',
                    (hookType.endsWith('Expression') ? 'return ' : '') +
                        this.model[hookType]
                )
    }
    /**
     * Applies given dom node properties changes to the model configuration.
     * @param changes - Object that represents property changes.
     * @returns Nothing.
     */
    reflectPropertiesToModel(changes:SimpleChanges):void {
        /*
            NOTE: Specific given property values overwrite model configured
            ones.
        */
        for (const name in changes)
            if (
                this.constructor['defaultModel'].hasOwnProperty(name) &&
                changes[name].currentValue !== changes[name].previousValue
            )
                this.model[name] = changes[name].currentValue
        /*
            Apply instance specific existing properties to newly given
            configuration, when the model's representation equals to their
            default version but corresponding instance version not.
        */
        if (
            'model' in changes &&
            ![null, undefined].includes(changes.model.currentValue)
        )
            for (const name in this.constructor['defaultModel'])
                if (this.constructor['defaultModel'].hasOwnProperty(name)) {
                    if (
                        name in this &&
                        this[name] !== undefined &&
                        /*
                            NOTE: "type" attribute has another meaning in html
                            context.
                        */
                        name !== 'type' &&
                        (
                            !this.model.hasOwnProperty(name) ||
                            this.model[name] ===
                                this.constructor['defaultModel'][name]
                        )
                    )
                        this.model[name] = this[name]
                    else if (!this.model.hasOwnProperty(name))
                        this.model[name] =
                            this.constructor['defaultModel'][name]
                }
        const nameMapping:{[key:string]:string} = {
            disabled: 'writable', required: 'nullable'
        }
        for (const name in nameMapping)
            if (
                nameMapping.hasOwnProperty(name) &&
                name in changes &&
                changes[name].previousValue !== changes[name].currentValue &&
                Boolean(this[name]) === this[name]
            )
                this.model[nameMapping[name]] = !this[name]
            else if (
                'hasAttribute' in this.domNode.nativeElement &&
                this.domNode.nativeElement.hasAttribute(name) &&
                'getAttribute' in this.domNode.nativeElement &&
                this.domNode.nativeElement.getAttribute(name).trim() !==
                    'false'
            )
                this.model[nameMapping[name]] = false
        if (
            'pattern' in changes &&
            changes.pattern.previousValue !== changes.pattern.currentValue &&
            typeof this.pattern === 'string'
        )
            this.model.regularExpressionPattern = this.pattern
    }
    /**
     * Triggered when model state changes occur. Updates dom node attributes.
     * @param event - Event object containing model, state and changed value
     * informations.
     * @returns Given potentially modified event.
     */
    onStateChange(event:Object):Object {
        this.reflectStatePropertiesToDomNode()
        this.changeDetectorReference.detectChanges()
        return event
    }
    /**
     * Reflect properties to dom node.
     * @returns Nothing.
     */
    reflectPropertiesToDomNode():void {
        this.reflectPropertiesToDomNodeProperties()
        this.reflectPropertiesToDomNodeAttributes()
        this.reflectStatePropertiesToDomNode()
    }
    /**
     * Reflect state properties to dom node.
     * @returns Nothing.
     */
    reflectStatePropertiesToDomNode():void {
        this.reflectStatePropertiesToDomNodeProperties()
        this.reflectStatePropertiesToDomNodeAttributes()
    }
    /**
     * Reflect properties to dom node properties.
     * @returns Nothing.
     */
    reflectPropertiesToDomNodeProperties():void {
        for (const name of this.constructor['reflectableModelPropertyNames'])
            this.domNode.nativeElement[name] = this.model[name]
        if (this.model.writable)
            delete this.domNode.nativeElement.disabled
        else
            this.domNode.nativeElement.disabled = true
        this.domNode.nativeElement.pattern =
            this.model.regularExpressionPattern
        if (this.model.nullable)
            delete this.domNode.nativeElement.required
        else
            this.domNode.nativeElement.required = true
    }
    /**
     * Reflect state properties to dom node properties.
     * @returns Nothing.
     */
    reflectStatePropertiesToDomNodeProperties():void {
        if (this.model.state)
            for (const name of this.constructor[
                'reflectableStatePropertyNames'
            ])
                this.domNode.nativeElement[name] = this.model.state[name]
    }
    /**
     * Reflect properties to dom node attributes.
     * @returns Nothing.
     */
    reflectPropertiesToDomNodeAttributes():void {
        if ('getAttribute' in this.domNode.nativeElement) {
            for (const name of this.constructor[
                'reflectableModelPropertyNames'
            ])
                if (
                    name !== 'value' &&
                    this.domNode.nativeElement.getAttribute(name) !==
                        `${this.model[name]}`
                )
                    this.setDomNodeAttribute(name, this.model[name])
            this.setDomNodeAttribute('disabled', !this.model.writable)
            this.setDomNodeAttribute(
                'pattern', this.model.regularExpressionPattern)
            this.setDomNodeAttribute('required', !this.model.nullable)
        }
    }
    /**
     * Reflect state properties to dom node attributes.
     * @returns Nothing.
     */
    reflectStatePropertiesToDomNodeAttributes():void {
        if ('getAttribute' in this.domNode.nativeElement) {
            if (this.model.state)
                for (
                    const name of
                    this.constructor['reflectableStatePropertyNames']
                )
                    if (
                        name in this.model.state &&
                        this.domNode.nativeElement.getAttribute(name) !==
                            `${this.model.state[name]}`
                    )
                        this.setDomNodeAttribute(name, this.model.state[name])
        }
    }
    /**
     * Reflects given property name to given value on host element.
     * @param name - Given property name.
     * @param value - Value to set on host element.
     * @returns Nothing.
     */
    setDomNodeAttribute(name:string, value:any):void {
        if (
            [false, null, undefined].includes(value) &&
            this.domNode.nativeElement.hasAttribute(name)
        )
            this.renderer.removeAttribute(this.domNode.nativeElement, name)
        else if (typeof value === 'boolean') {
            if (value && this.domNode.nativeElement.getAttribute(name) !== '')
                this.renderer.setAttribute(
                    this.domNode.nativeElement, name, '')
        } else if (this.domNode.nativeElement.getAttribute(name) !== `${value}`)
            this.renderer.setAttribute(
                this.domNode.nativeElement, name, `${value}`)
    }
}
/**
 * Generic input component.
 * @property errorStateMatcher - Instance to indicate whether current error
 * state should be shown.
 *
 * @property _attachmentWithPrefixExists - Holds the attachment by prefix
 * checker pipe instance
 * @property _extend - Holds the extend object's pipe transformation method.
 * @property _getFilenameByPrefix - Holds the get file name by prefix's pipe
 * transformation method.
 * @property _modelConfiguration - All model configurations.
 * @property _numberGetUTCTimestamp - Date (and time) to unix timstamp
 * converter pipe transform method.
 */
export class AbstractNativeInputComponent extends AbstractInputComponent {
    @Input() errorStateMatcher:ErrorStateMatcher

    _attachmentWithPrefixExists:Function
    _extend:Function
    _getFilenameByPrefix:Function
    _modelConfiguration:PlainObject
    _numberGetUTCTimestamp:Function
    /**
     * Setter to synchronize model state value.
     * @param value - Value to set.
     * @returns Nothing.
     */
    @ViewChild('state', {static: false}) set state(value:any) {
        let lastValue:any
        const update:Function = (newValue:any):void => {
            if (newValue === lastValue)
                return
            lastValue = newValue
            if (this.model.state !== value)
                this.model.state = value
            this.reflectStatePropertiesToDomNode()
            this.stateChange.emit({model: this.model, newValue})
            this.changeDetectorReference.detectChanges()
        }
        value.statusChanges.subscribe(update)
        value.update.subscribe(update)
        // NOTE: Maybe needed also?
        // value.valueChanges.subscribe(update)
        update(this.model.value)
    }
    /**
     * Getter to nested model state.
     * @returns State object.
     */
    get state():any {
        return this.model.state
    }
    /**
     * Sets needed services as property values.
     * @param injector - Application specific injector to use instead auto
     * detected one.
     * @returns Nothing.
     */
    constructor(@Optional() injector:Injector) {
        super(injector)
        const get:Function = determineInjector(
            injector, this, this.constructor)
        this.errorStateMatcher = new GenericErrorStateMatcher(this)
        this._attachmentWithPrefixExists = get(
            AttachmentWithPrefixExistsPipe
        ).transform.bind(get(AttachmentWithPrefixExistsPipe))
        this._extend = get(ExtendPipe).transform.bind(get(ExtendPipe))
        this._getFilenameByPrefix = get(
            GetFilenameByPrefixPipe
        ).transform.bind(get(GetFilenameByPrefixPipe))
        this._modelConfiguration =
            get(InitialDataService).configuration.database.model
        this._numberGetUTCTimestamp = get(
            NumberGetUTCTimestampPipe
        ).transform.bind(get(NumberGetUTCTimestampPipe))
    }
    /**
     * Triggers when ever a change to current model happens inside this
     * component.
     * @param newValue - Value to use to update model with.
     * @returns Nothing.
     */
    onChange(newValue:any):any {
        const types:Array<string> = [].concat(this.model.type)
        if (
            types.includes('integer') &&
            !types.includes('number') &&
            !types.includes('string')
        )
            newValue = parseInt(newValue)
        else if (types.includes('number') && !types.includes('string'))
            newValue = parseFloat(newValue)
        else if (typeof newValue === 'string' && this.model.trim)
            newValue = newValue.trim()
        const now:Date = new Date()
        const nowUTCTimestamp:number = this._numberGetUTCTimestamp(now)
        const newData:PlainObject = {[this.model.name]: newValue}
        for (const hookType of ['onUpdateExpression', 'onUpdateExecution'])
            if (
                this.model.hasOwnProperty(hookType) &&
                this.model[hookType] &&
                typeof this.model[hookType] === 'function'
            ) {
                newValue = this.model[hookType](
                    this._attachmentWithPrefixExists.bind(newData, newData),
                    this._getFilenameByPrefix,
                    this._modelConfiguration.property.name.special.id,
                    {generic: {[this.model.name]: this.model}},
                    this._modelConfiguration,
                    'generic',
                    this._modelConfiguration.entities,
                    this.model.name,
                    newData,
                    now,
                    nowUTCTimestamp,
                    null,
                    this.model,
                    this._modelConfiguration.property.name.special.revision,
                    {},
                    (object:Object):string => JSON.stringify(object, null, 4),
                    this._modelConfiguration.property.name.special,
                    this._modelConfiguration.property.name.special.type,
                    {},
                    newValue
                )
                if (
                    !(newValue instanceof Date) &&
                    types.includes('DateTime') &&
                    !types.includes('float') &&
                    !types.includes('integer')
                )
                    newValue *= 1000
            }
        this.reflectPropertiesToDomNode()
        return newValue
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
 * @property factoryName - Current factory name.
 * @property fixedUtility - Holds static helper methods.
 * @property hostDomNode - Host textarea dom element to bind editor to.
 * @property instance - Currently active editor instance.
 * @property initialized - Initialized event emitter.
 * @property model - Current editable text string.
 * @property modelChange - Change event emitter.
 */
export class AbstractEditorComponent extends AbstractValueAccessor
    implements AfterViewInit {
    static applicationInterfaceLoad:{[key:string]:Promise<any>|null} = {}
    static factories:{[key:string]:any} = {}

    @Input() configuration:PlainObject = {}
    contentSetterMethodName:string = 'setContent'
    @Input() disabled:boolean
    extend:Function
    factoryName:string = ''
    fixedUtility:typeof UtilityService
    @ViewChild('hostDomNode', {static: false}) hostDomNode:ElementRef
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
     * @returns Promise resolving to nothing.
     */
    ngAfterViewInit():Promise<void> {
        if (!this.constructor['factories'][this.factoryName])
            if (this.fixedUtility.globalContext[this.factoryName])
                this.constructor['factories'][this.factoryName] =
                    this.fixedUtility.globalContext[this.factoryName]
        if (this.constructor['factories'][this.factoryName])
            /*
                NOTE: We have to do a dummy timeout to avoid an event emit in
                first initializing call stack.
            */
            return this.fixedUtility.tools.timeout()
        return this.constructor['applicationInterfaceLoad'][this.factoryName]
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
const providers:Array<PlainObject> = [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(
        ():typeof DateTimeValueAccessor => DateTimeValueAccessor),
    multi: true
}]
/*
    NOTE: This core update resistent version is not compatible with angular's
    ahead of time compilation.

@Directive(UtilityService.tools.extend(
    true,
    {},
    DefaultValueAccessor.decorators[0].args[0],
    {providers}
))
*/
@Directive({
    // TODO: vsavkin replace the above selector with the one below it once
    // https://github.com/angular/angular/issues/3011 is implemented
    // selector: '[ngModel],[formControl],[formControlName]',
    host: {
        '(compositionend)': '$any(this).compositionEnd($event.target.value)',
        '(compositionstart)': '$any(this).compositionStart()',
        '(blur)': 'onTouchedCallback()',
        '(input)': '$any(this).handleInput($event.target.value)'
    },
    providers,
    selector: `
        input:not([type=checkbox])[formControlName],
        input:not([type=checkbox])[formControl],
        input:not([type=checkbox])[ngModel]
    `
})
/**
 * Time value accessor with "ngModel" support.
 */
export class DateTimeValueAccessor extends AbstractValueAccessor {
    /**
     * Delegates injected injector service instance to the super constructor.
     * @param injector - Injected injector service instance.
     * @returns Nothing.
     */
    constructor(injector:Injector) {
        super(injector)
    }
    /**
     * Manipulates editable value representation.
     * @param value - Value to manipulate.
     * @returns Given and transformed value.
     */
    export(value:any):any {
        if (
            ![undefined, null].includes(value) &&
            ['date', 'time'].includes(this.type)
        ) {
            const date:Date = new Date(value)
            if (isNaN(date.getDate()))
                return
            else if (this.type === 'time') {
                let hours:string = `${date.getHours()}`
                if (hours.length === 1)
                    hours = `0${hours}`
                let minutes:string = `${date.getMinutes()}`
                if (minutes.length === 1)
                    minutes = `0${minutes}`
                return `${hours}:${minutes}`
            } else if (this.type === 'date') {
                let month:string = `${date.getMonth() + 1}`
                if (month.length === 1)
                    month = `0${month}`
                let day:string = `${date.getDate()}`
                if (day.length === 1)
                    day = `0${day}`
                return `${date.getFullYear()}-${month}-${day}`
            }
        }
        return value
    }
    /**
     * Reads internal value representation.
     * @param value - Value to convert to its internal representation.
     * @returns Given and transformed value.
     */
    import(value:any):any {
        if (typeof value === 'string')
            if (this.type === 'time') {
                const match = /^([0-9]{2}):([0-9]{2})$/.exec(value)
                if (match)
                    return new Date(
                        1970, 0, 1, parseInt(match[1]), parseInt(match[2]))
            } else if (this.type === 'date') {
                const match = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(value)
                if (match)
                    return new Date(
                        parseInt(match[1]), parseInt(match[2]) - 1,
                        parseInt(match[3]))
            }
        return value
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
        if (typeof this.constructor['applicationInterfaceLoad'][
            this.factoryName
        ] !== 'object')
            this.constructor['applicationInterfaceLoad'][
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
                            this.constructor['factories'][this.factoryName] =
                                this.fixedUtility.globalContext[
                                    this.factoryName]
                            resolve(
                                this.constructor['factories'][this.factoryName]
                            )
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
            this.instance = this.constructor['factories'][
                this.factoryName
            ].fromTextArea(this.hostDomNode.nativeElement, configuration)
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
        if (typeof this.constructor['applicationInterfaceLoad'][
            this.factoryName
        ] !== 'object')
            this.constructor['applicationInterfaceLoad'][
                this.factoryName
            ] = new Promise((resolve:Function, reject:Function):Object =>
                this.fixedUtility.$.ajax({
                    cache: true,
                    dataType: 'script',
                    error: reject,
                    success: ():void => {
                        this.constructor['factories'][this.factoryName] =
                            this.fixedUtility.globalContext.tinymce
                        resolve(
                            this.constructor['factories'][this.factoryName]
                        )
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
            this.constructor['factories'][this.factoryName].baseURL =
                configuration.baseURL
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
            this.constructor['factories'][this.factoryName].init(configuration)
        })
    }
    /**
     * Frees all tinymce allocated data from memory if there exists some.
     * @param parameter - Given parameter to forward.
     * @returns Nothing.
     */
    ngOnDestroy():void {
        if (this.instance)
            this.constructor['factories'][this.factoryName].remove(
                this.instance)
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
const basePropertyContent:string = `
    class="ng-model"
    [ngModel]="model.value"
    (ngModelChange)="model.value = onChange($event); modelChange.emit(model)"
    #state="ngModel"
`
/* eslint-disable max-len */
export const propertyContent:PlainObject = {
    base: basePropertyContent,
    editor: `
        ${basePropertyContent}
        (blur)="focused = false"
        @defaultAnimation
        (focus)="focused = true"
        [style.visibilty]="initialized ? 'visible' : 'hidden'"
    `,
    // NOTE: A material wrapper got the default animation already here.
    nativ: {
        base: `
            ${basePropertyContent}
            [disabled]="model.mutable === false || model.writable === false"
            [errorStateMatcher]="errorStateMatcher"
            [name]="model.name"
            [required]="!model.nullable"
        `,
        text: {
            base: `
                [placeholder]="model.placeholder"
            `,
            input: `
                [maxlength]="model.type === 'string' ? model.maximumLength : null"
                [minlength]="model.type === 'string' ? model.minimumLength : null"
                [pattern]="model.type === 'string' ? model.regularExpressionPattern : null"
            `
        }
    },
    wrapper: `
        [appearance]="appearance"
        [declaration]="declaration"
        [description]="description"
        [infoTooltipDescriptionText]="infoTooltipDescriptionText"
        [showDeclaration]="showDeclaration"
        [showDeclarationText]="showDeclarationText"
        [maximumLengthText]="maximumLengthText"
        [minimumLengthText]="minimumLengthText"
        [model]="model"
        (modelChange)="modelChange.emit(model)"
        (stateChange)="stateChange.emit(onStateChange($event))"
        [placeholder]="placeholder"
        [requiredText]="requiredText"
        [patternText]="patternText"
        [showValidationState]="showValidationState"
    `
}
export const inputContent:string = `
    <mat-hint
        align="start"
        @defaultAnimation
        [matTooltip]="infoTooltipDescriptionText ? infoTooltipDescriptionText : null"
    >
        <span
            [class.active]="showDeclaration"
            (click)="showDeclaration = !showDeclaration"
            *ngIf="model.declaration"
        >
            <a
                (click)="$event.preventDefault()"
                @defaultAnimation
                href=""
                *ngIf="showDeclarationText"
            ><mat-icon>{{showDeclarationText}}</mat-icon></a>
            <span @defaultAnimation *ngIf="showDeclaration">
                {{model.declaration}}
            </span>
        </span>
        <span *ngIf="editor && selectableEditor && this.model.writable">
            <span *ngIf="model.declaration">|</span>
            <a
                [class.active]="activeEditorState"
                (click)="$event.preventDefault(); $event.stopPropagation(); activeEditorState = true"
                href=""
            >editor</a>
            <span>|</span>
            <a
                [class.active]="!activeEditorState"
                (click)="$event.preventDefault(); $event.stopPropagation(); activeEditorState = false"
                href=""
            >plain</a>
        </span>
    </mat-hint>
    <mat-error *ngIf="showValidationState !== false && model.state?.errors">
        <p @defaultAnimation *ngIf="model.state.errors.maxlength">
            {{maximumLengthText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state.errors.max">
            {{maximumText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state.errors.minlength">
            {{minimumLengthText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state.errors.min">
            {{minimumText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state.errors.pattern">
            {{patternText | genericStringTemplate:model}}
        </p>
        <p @defaultAnimation *ngIf="model.state.errors.required">
            {{requiredText | genericStringTemplate:model}}
        </p>
    </mat-error>
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
            [activeEditorState]="activeEditorState"
            [editor]="editor"
            [maximumNumberOfRows]="maximumNumberOfRows"
            [minimumNumberOfRows]="minimumNumberOfRows"
            *ngIf="(model.editor || maximumNumberOfRows || minimumNumberOfRows || rows) ? true : false; else simpleInput"
            [rows]="rows"
            [selectableEditor]="selectableEditor"
        ><ng-content></ng-content></generic-textarea>
        <ng-template #simpleInput><generic-simple-input
            ${propertyContent.wrapper}
            [labels]="labels"
            [maximum]="maximum"
            [maximumText]="maximumText"
            [minimum]="minimum"
            [minimumText]="minimumText"
            [type]="type"
        ><ng-content></ng-content></generic-simple-input></ng-template>
    `
})
/**
 * A generic form input, selection or textarea component with validation,
 * labeling and info description support.
 * NOTE: Note there is currently no way to de-duplicate the redundancies
 * between this and "SimpleInputComponent" class .
 * @property static:evaluatablePropertyNames - Attribute names which should be
 * evaluated before to store.
 *
 * @property activeEditorState - Indicates whether current editor is active.
 * @property editor - Editor to choose from for an activated editor.
 * @property hidden - Defines whether current given password should be shown as
 * plain text.
 * @property hidePasswordText - Text to show during focusing password hide
 * button.
 * @property labels - Defines some selectable value labels.
 * @property maximum - Maximum allowed number value.
 * @property maximumNumberOfRows - Maximum resizeable number of rows.
 * @property maximumText - Maximum number validation text.
 * @property minimum - Minimum allowed number.
 * @property minimumNumberOfRows - Minimum resizeable number of rows.
 * @property minimumText - Minimum number validation text.
 * @property rows - Number of rows to show.
 * @property showPasswordText - Text to show during focusing password show
 * button.
 * @property type - Optionally defines an input type explicitly.
 */
export class InputComponent extends AbstractInputComponent {
    static evaluatablePropertyNames:Array<string> =
        AbstractInputComponent.evaluatablePropertyNames.concat(
            'editor', 'labels')

    @Input() activeEditorState:boolean
    @Input() editor:PlainObject|string
    @Input() hidden:boolean = true
    @Input() hidePasswordText:string = 'Hide password.'
    @Input() labels:{[key:string]:string} = {}
    @Input() maximum:number
    @Input() maximumNumberOfRows:string
    @Input() maximumText:string =
        'Please give a number less or equal than ${maximum}.'
    @Input() minimum:number
    @Input() minimumNumberOfRows:number
    @Input() minimumText:string =
        'Please give a number at least or equal to ${minimum}.'
    @Input() rows:string
    @Input() showPasswordText:string = 'Show password.'
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
    selector: 'generic-simple-input',
    template: `
        <ng-container
            @defaultAnimation *ngIf="model.selection; else textInput"
        >
            <ng-container
                @defaultAnimation
                *ngIf="model.selection | genericIsArray; else labeledSelect"
            >
                <mat-form-field [appearance]="appearance">
                    <mat-label *ngIf="model.description">
                        {{model.description}}
                    </mat-label>
                    <mat-select
                        ${propertyContent.nativ.base}
                        ${propertyContent.nativ.text.base}
                    ><mat-option
                        *ngFor="let value of model.selection" [value]="value"
                    >
                        {{labels.hasOwnProperty(value) ? labels[value] : value}}
                    </mat-option></mat-select>
                    ${inputContent}
                    <ng-content></ng-content>
                </mat-form-field>
            </ng-container>
            <ng-template #labeledSelect>
                <mat-form-field [appearance]="appearance">
                    <mat-label *ngIf="model.description">
                        {{model.description}}
                    </mat-label>
                    <mat-select
                        ${propertyContent.nativ.base}
                        ${propertyContent.nativ.text.base}
                    >
                        <mat-option
                            *ngFor="let key of model.selection | genericObjectKeys:true"
                            [value]="model.selection[key]"
                        >{{key}}</mat-option>
                    </mat-select>
                    ${inputContent}
                    <ng-content></ng-content>
                </mat-form-field>
            </ng-template>
        </ng-container>
        <ng-template #textInput>
            <mat-form-field [appearance]="appearance">
                <mat-label *ngIf="model.description">
                    {{model.description}}
                </mat-label>
                <input
                    ${propertyContent.nativ.base}
                    ${propertyContent.nativ.text.base}
                    ${propertyContent.nativ.text.input}
                    matInput
                    [max]="model.type === 'number' ? model.maximum : null"
                    [min]="model.type === 'number' ? model.minimum : null"
                    [type]="determineType()"
                />
                <button
                    [attr.aria-label]="hidden ? showPasswordText : hidePasswordText"
                    [attr.aria-pressed]="hidden"
                    (click)="hidden = !hidden"
                    mat-icon-button
                    matSuffix
                    *ngIf="determineType(true) === 'password'"
                >
                    <mat-icon>
                        {{hidden ? 'visibility' : 'visibility_off'}}
                    </mat-icon>
                </button>
                ${inputContent}
                <ng-content></ng-content>
            </mat-form-field>
        </ng-template>
    `
})
/* eslint-enable max-len */
/**
 * A generic form input or select component with validation, labeling and info
 * description support.
 * NOTE: Note there is currently no way to de-duplicate the redundancies
 * between this and "InputComponent" class.
 * @property activeEditorState - Indicator which editor should be used: Always
 * "false" in this component (makes it possible to share same markup with
 * advanced inputs).
 * @property editor - Indicator which editor should be used: Always "false"
 * in this component (makes it possible to share same markup with advanced
 * inputs).
 * @property hidden - Defines whether current given password should be shown as
 * plain text.
 * @property hidePasswordText - Text to show during focusing password hide
 * button.
 * @property labels - Defines some selectable value labels.
 * @property maximum - Maximum allowed number value.
 * @property maximumText - Maximum number validation text.
 * @property minimum - Minimum allowed number.
 * @property minimumText - Minimum number validation text.
 * @property showPasswordText - Text to show during focusing password show
 * button.
 * @property selectableEditor - Indicator which editor should be used: Always
 * "false" in this component (makes it possible to share same markup with
 * advanced inputs).
 * @property type - Optionally defines an input type explicitly.
 */
export class SimpleInputComponent extends AbstractNativeInputComponent {
    activeEditorState:boolean = false
    editor:false = false
    @Input() hidden:boolean = true
    @Input() hidePasswordText:string = 'Hide password.'
    @Input() labels:{[key:string]:string} = {}
    @Input() maximum:number
    @Input() maximumText:string =
        'Please give a number less or equal than ${maximum}.'
    @Input() minimum:number
    @Input() minimumText:string =
        'Please give a number at least or equal to ${minimum}.'
    selectableEditor:false = false
    @Input() showPasswordText:string = 'Show password.'
    @Input() type:string
    /**
     * Delegates injected injector service instance to the super constructor.
     * @param injector - Injected injector service instance.
     * @returns Nothing.
     */
    constructor(injector:Injector) {
        super(injector)
    }
    /**
     * Determines input type.
     * @param persistent - Indicates whether a persistent or current state is
     * requested.
     * @returns Input type.
     */
    determineType(persistent:boolean = false):string {
        let type:string = 'text'
        if (this.type)
             type = this.type
        else if (this.model.name && this.model.name.startsWith('password'))
             type = 'password'
        else if (this.model.type !== 'string')
            type = 'number'
        if (type === 'password' && !persistent)
            return this.hidden ? 'password' : 'text'
        return type
    }
}
/* eslint-disable max-len */
@Component({
    animations,
    selector: 'generic-textarea',
    template: `
        <ng-container *ngIf="activeEditorState; else plain">
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
                [disabled]="model.mutable === false || model.writable === false"
                (initialized)="initialized = true"
                *ngIf="editorType === 'code' || editor.indentUnit; else tinymce"
            ></code-editor>
            <ng-template #tinymce><text-editor
                ${propertyContent.editor}
                [configuration]="editor"
                [disabled]="model.mutable === false || model.writable === false"
                (initialized)="initialized = true"
            ></text-editor></ng-template>
            ${inputContent}
            <ng-content></ng-content>
        </ng-container>
        <ng-template #plain>
            <mat-form-field [appearance]="appearance" @defaultAnimation>
                <mat-label *ngIf="model.description">
                    {{model.description}}
                </mat-label>
                <textarea
                    ${propertyContent.nativ.base}
                    ${propertyContent.nativ.text.base}
                    ${propertyContent.nativ.text.input}
                    [cdkAutosizeMaxRows]="maximumNumberOfRows"
                    [cdkAutosizeMinRows]="minimumNumberOfRows"
                    matInput
                    cdkTextareaAutosize
                    [rows]="rows"
                ></textarea>
                ${inputContent}
                <ng-content></ng-content>
            </mat-form-field>
        </ng-template>
    `
})
/* eslint-enable max-len */
/**
 * A generic form textarea component with validation, labeling and info
 * description support.
 * @property static:defaultEditorOptions - Globale default editor options.
 *
 * @property activeEditorState - Indicated weather current editor is active or
 * not.
 * @property editor - Editor options to choose from for an activated editor.
 * @property editorType - Editor type description.
 * @property focused - Indicates whether the input field is focused.
 * @property initialized - Indicates whether an editor is initialized.
 * @property maximumNumberOfRows - Maximum resizeable number of rows.
 * @property maximumText - Text to show for number validation but could not be
 * shown in this component (exists to be able to share markup with simple
 * input components).
 * @property minimumNumberOfRows - Minimum resizeable number of rows.
 * @property minimumText - Text to show for number validation but could not be
 * shown in this component (exists to be able to share markup with simple
 * input components).
 * @property rows - Number of rows to show.
 * @property selectableEditor - Indicates whether an editor is selectable.
 */
export class TextareaComponent extends AbstractNativeInputComponent
    implements OnChanges {
    static defaultEditorOptions:{code:PlainObject;markup:PlainObject} = {
        code: {},
        markup: {}
    }

    @Input() activeEditorState:boolean
    @Input() editor:PlainObject|string
    editorType:string = 'custom'
    focused:boolean = false
    initialized:boolean = false
    @Input() maximumNumberOfRows:number
    maximumText:string = ''
    @Input() minimumNumberOfRows:number
    minimumText:string = ''
    @Input() rows:number
    @Input() selectableEditor:boolean
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
        if (
            initialData.configuration.hasOwnProperty(
                'defaultEditorOptions') &&
            typeof initialData.configuration.defaultEditorOptions ===
            'object' &&
            initialData.configuration.defaultEditorOptions !== null
        )
            TextareaComponent.defaultEditorOptions =
                initialData.configuration.defaultEditorOptions
    }
    /**
     * Triggers after input values have been resolved.
     * @param changes - Object that represents property changes.
     * @returns Nothing.
     */
    ngOnChanges(changes:SimpleChanges):void {
        super.ngOnChanges(changes)
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
            else if (this.activeEditorState === null)
                this.activeEditorState = true
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
                    /* eslint-enable max-len */
                    toolbar2: false
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
        } else if (this.editor === null && this.activeEditorState)
            this.editor = {}
        if (this.activeEditorState === null)
            this.activeEditorState = false
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
        // region accessors
        DateTimeValueAccessor,
        // endregion
        // region components
        CodeEditorComponent,
        InputComponent,
        SimpleInputComponent,
        TextareaComponent,
        TextEditorComponent
        // endregion
    ],
    exports: [
        CodeEditorComponent,
        InputComponent,
        SimpleInputComponent,
        TextareaComponent,
        TextEditorComponent
    ],
    imports: [
        BasePipeModule,
        BaseServiceModule,
        BrowserModule.withServerTransition({
            appId: 'generic-editor-universal'
        }),
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        TextFieldModule
    ]
})
/**
 * Represents the importable angular module.
 */
export class EditorModule {}
export default EditorModule
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
