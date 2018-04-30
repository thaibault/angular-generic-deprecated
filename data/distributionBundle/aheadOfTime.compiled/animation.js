// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module angularGeneric */
'use strict';
import Tools from 'clientnode';
import { animate, style, transition, trigger } from '@angular/animations';
// NOTE: Only needed for debugging this file.
try {
    require('source-map-support/register');
}
catch (error) { }
// endregion
export const defaultOptions = {
    duration: '.3s',
    enterState: ':enter',
    leaveState: ':leave',
    name: 'fadeAnimation',
    style: {
        enter: {
            final: { opacity: 1 },
            initial: { opacity: 0 }
        }
    }
};
/**
 * Fade in/out animation factory.
 * @param options - Animations meta data options.
 * @returns Animations meta data object.
 */
export function createFadeAnimation(options = {}) {
    if (typeof options === 'string')
        options = { name: options };
    options = Tools.extendObject(true, {}, defaultOptions, options);
    return trigger(options.name, [
        transition(options.enterState, [
            style(options.style.enter.initial),
            animate(options.enterDuration || options.duration, style(options.style.enter.final))
        ]),
        transition(options.leaveState, [
            style(options.style.leave &&
                options.style.leave.initial || options.style.enter.final),
            animate(options.leaveDuration || options.duration, style(options.style.leave && options.style.leave.final ||
                options.style.enter.initial))
        ])
    ]);
}
export const createDefaultAnimation = createFadeAnimation.bind({}, 'defaultAnimation');
/*
    NOTE: Simply calling "createDefaultAnimation()" does not work in
    combination with angular's ahead of time compiler.
*/
export const defaultAnimation = trigger('defaultAnimation', [
    transition(defaultOptions.enterState, [
        style(defaultOptions.style.enter.initial),
        animate(defaultOptions.enterDuration || defaultOptions.duration, style(defaultOptions.style.enter.final))
    ]),
    transition(defaultOptions.leaveState, [
        style(defaultOptions.style.leave &&
            defaultOptions.style.leave.initial ||
            defaultOptions.style.enter.final),
        animate(defaultOptions.leaveDuration || defaultOptions.duration, style(defaultOptions.style.leave &&
            defaultOptions.style.leave.final ||
            defaultOptions.style.enter.initial))
    ])
]);
export default defaultAnimation;
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion