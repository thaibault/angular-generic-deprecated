// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import registerTest from 'clientnode/test'
import type {$DomNode} from 'clientnode'
import type Incrementer from './index'
// endregion
registerTest(function(roundType:string, targetTechnology:?string, $:any):void {
    require('./index')
    $('#qunit-fixture').append(
        '<form action="#"><input name="test" value="10"></form>')
    const $incrementerDomNode:$DomNode = $(
        '#qunit-fixture form input'
    ).Incrementer()
    const incrementer:Incrementer = $incrementerDomNode.data('Incrementer')
    // region tests
    // / region public  methods
    // //  region special
    this.test('initialize', (assert:Object):void => {
        assert.ok(incrementer)
        assert.strictEqual($incrementerDomNode.parent().find(
            'a.plus, a.minus'
        ).length, 2)
    })
    // // endregion
    // / endregion
    // / region protected methods
    // // region event
    this.test('_preventOtherThanNumberInput', (assert:Object):void => {
        assert.strictEqual(incrementer._preventOtherThanNumberInput({
            keyCode: 49, preventDefault: ():void => {}
        }), incrementer)
        assert.strictEqual(incrementer._preventOtherThanNumberInput({
            keyCode: 47, preventDefault: ():void => {}
        }), incrementer)
    })
    this.test('_onClick', (assert:Object):void => assert.strictEqual(
        incrementer._onClick({
            preventDefault: ():void => {}, target: $('body')[0]
        }), incrementer))
    this.test('_onChangeInput', (assert:Object):void => assert.strictEqual(
        incrementer._onChangeInput({
            preventDefault: ():void => {}, target: $('body')[0]
        }), incrementer))
    this.test('_onTypeInvalidLetter', (assert:Object):void =>
        assert.strictEqual(incrementer._onTypeInvalidLetter({
            preventDefault: ():void => {}, keyCode: 49
        }), incrementer))
    this.test('_onInvalidNumber', (assert:Object):void => assert.strictEqual(
        incrementer._onInvalidNumber({
            preventDefault: ():void => {}, keyCode: 49
        }), incrementer))
    // // endregion
    // / endregion
    // endregion
}, ['withJQuery'])
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
