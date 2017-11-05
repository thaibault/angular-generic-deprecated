import { PlainObject } from 'clientnode';
import { AnimationTriggerMetadata } from '@angular/animations';
export declare const defaultOptions: PlainObject;
/**
 * Fade in/out animation factory.
 * @param options - Animations meta data options.
 * @returns Animations meta data object.
 */
export declare function createFadeAnimation(options?: string | PlainObject): AnimationTriggerMetadata;
export declare const createDefaultAnimation: Function;
export declare const defaultAnimation: AnimationTriggerMetadata;
