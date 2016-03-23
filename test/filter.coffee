#!/usr/bin/env require
# -*- coding: utf-8 -*-

# region header

# Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

# License
# -------

# This library written by Torben Sickert stand under a creative commons naming
# 3.0 unported license. see http://creativecommons.org/licenses/by/3.0/deed.de

$injector = window.angular.injector ['ng', 'ngMock', 'generic']
module 'angular/generic/filter'

# endregion

## region mock-up

$filter = $injector.get '$filter'
$sce = $injector.get '$sce'

## endregion

# region tests

## region forwarded methods

test 'genericEquals', ->
    genericEquals = $filter 'genericEquals'

    ok genericEquals 5, 5
    ok genericEquals {1: [2]}, {1: [2]}
test 'genericStringMark', ->
    genericStringMark = $filter 'genericStringMark'

    strictEqual genericStringMark('', 'test'), ''
    strictEqual genericStringMark(
        'mockup test mockup', 'test'
    ), 'mockup <span class=\"generic-mark\">test</span> mockup'
    strictEqual $sce.getTrustedHtml(genericStringMark(
        'mockup test mockup', 'test', true
    )), 'mockup <span class=\"generic-mark\">test</span> mockup'
    strictEqual $sce.getTrustedHtml(genericStringMark(
        $sce.trustAsHtml('mockup test mockup'), 'test'
    )), 'mockup <span class=\"generic-mark\">test</span> mockup'
    strictEqual genericStringMark(
        'mockup test mockup', 'test', false, '<pre>{1}</pre>'
    ), 'mockup <pre>test</pre> mockup'
    strictEqual genericStringMark(
        'mockup TEST mockup', 'test', false, '<pre>{1}</pre>'
    ), 'mockup <pre>TEST</pre> mockup'
    strictEqual genericStringMark(
        'mockup TEST mockup', 'test', false, '<pre>{1}</pre>', true
    ), 'mockup TEST mockup'
test 'genericStringHasPathPrefix', ->
    genericStringHasPathPrefix = $filter 'genericStringHasPathPrefix'

    notOk genericStringHasPathPrefix()
    ok genericStringHasPathPrefix '/admin/', '/admin/test'
    notOk genericStringHasPathPrefix '/admin/', '/admin/test', '#'
    notOk genericStringHasPathPrefix '/admin', '/admin/test', '#'
    ok genericStringHasPathPrefix '/admin', '/admin#test', '#'

## endregion

## region object

test 'genericIsValid', ->
    genericIsValid = $filter 'genericIsValid'

    ok genericIsValid 'test', {}
    ok genericIsValid null, {}
    ok genericIsValid 5, {}
    ok genericIsValid false, {}
    ok genericIsValid true, {}
    ok genericIsValid 2, choices: [1, 2, 3]
    notOk genericIsValid 5, choices: [1, 2, 3]
    notOk genericIsValid '', minimumLength: 2
    ok genericIsValid '', minimumLength: 0
    ok genericIsValid 'ab', minimumLength: 2
    ok genericIsValid 'abc', minimumLength: 2
    notOk genericIsValid 'a', minimumLength: 2
    notOk genericIsValid 'abcd', maximumLength: 3
    ok genericIsValid 'ab', maximumLength: 3
    ok genericIsValid 'ab', minimumLength: 2, maximumLength: 3
    notOk genericIsValid 1, minimum: 2
    ok genericIsValid 2, minimum: 2
    notOk genericIsValid 3, minimum: 2, maximum: 2
    ok genericIsValid 3, minimum: 2, maximum: 3
    notOk genericIsValid '', pattern: 'a'
    ok genericIsValid 'a', pattern: 'a'
    notOk genericIsValid 'ab', pattern: '^a$'
    notOk genericIsValid 'a', pattern: 'a', minimumLength: 2
test 'genericIsDefined', ->
    genericIsDefined = $filter 'genericIsDefined'

    ok genericIsDefined 4
    notOk genericIsDefined undefined
    ok genericIsDefined null
    notOk genericIsDefined null, true
    scope = $injector.get('$rootScope').$new true
    scope.a = 4
    ok genericIsDefined 'a', scope
    scope.a = null
    notOk genericIsDefined 'a', scope, true
    scope.a = undefined
    notOk genericIsDefined 'a', scope
test 'genericLimitTo', ->
    # TODO: Remove this method if angular-2.0 is ported.
    genericLimitTo = $filter 'genericLimitTo'

    deepEqual genericLimitTo([1, 2, 3, 4, 5, 6, 7, 8, 9], 3), [1, 2, 3]
    deepEqual genericLimitTo('abcdefghi', 3), 'abc'
    deepEqual genericLimitTo(2345432342, 3), '234'
    string = 'Freiheitsstr.1a, 53842 Troisdorf, Deutschland'
    deepEqual genericLimitTo(
        string, string.length - ', Deutschland'.length
    ), 'Freiheitsstr.1a, 53842 Troisdorf'
test 'genericShallowFilter', ->
    genericShallowFilter = $filter 'genericShallowFilter'

    deepEqual genericShallowFilter([]), []
    deepEqual genericShallowFilter([2]), [2]
    equal genericShallowFilter(null), null
    deepEqual genericShallowFilter(['a'], 'a'), ['a']
    deepEqual genericShallowFilter(['a'], 'b'), []
    deepEqual genericShallowFilter(['hans'], 'a'), ['hans']
    deepEqual genericShallowFilter(['hans'], 'a', true), []
    deepEqual genericShallowFilter(['hans'], 'A'), []
    deepEqual genericShallowFilter(['hans'], 'A', false), ['hans']
    deepEqual genericShallowFilter(['hans'], (-> true)), ['hans']
    deepEqual genericShallowFilter(['hans'], (-> false)), []
    deepEqual genericShallowFilter(['hans'], ((item, index, object) ->
        item is 'hans' and index is 0 and window.angular.equals object, [
            'hans']
    )), ['hans']
    deepEqual genericShallowFilter(['hans'], 'hans', (-> true)), ['hans']
    deepEqual genericShallowFilter(['hans'], 'hans', ((actual, expected) ->
        actual is expected
    )), ['hans']
    deepEqual genericShallowFilter(['hans'], 'hans', ((actual, expected) ->
        actual isnt expected
    )), []
    deepEqual genericShallowFilter([{}]), [{}]
    deepEqual genericShallowFilter([key: 2]), [key: 2]
    deepEqual genericShallowFilter([key: 'a'], 'a'), [key: 'a']
    deepEqual genericShallowFilter([key: 'a'], key: 'a'), [key: 'a']
    deepEqual genericShallowFilter([key: 'a'], key: 'b'), []
    deepEqual genericShallowFilter([key: 'a'], anotherKey: 'a'), []
    deepEqual genericShallowFilter([key: 'a'], 'b'), []
    deepEqual genericShallowFilter([key: 'hans'], 'a'), [key: 'hans']
    deepEqual genericShallowFilter([key: 'hans'], 'a', true), []
    deepEqual genericShallowFilter([key: 'hans'], 'A'), []
    deepEqual genericShallowFilter([key: 'hans'], 'A', false), [key: 'hans']
    deepEqual genericShallowFilter([key: 'hans'], (-> true)), [key: 'hans']
    deepEqual genericShallowFilter([key: 'hans'], (-> false)), []
    deepEqual genericShallowFilter([key: 'hans'], ((item, index, object) ->
        window.angular.equals(item, {
            key: 'hans'
        }) and index is 0 and window.angular.equals object, [key: 'hans']
    )), [key: 'hans']
    deepEqual genericShallowFilter([key: 'hans'], 'hans', (-> true)), [
        key: 'hans']
    deepEqual genericShallowFilter([key: 'hans'], 'hans', ((
        actual, expected
    ) -> actual is expected)), [key: 'hans']
    deepEqual genericShallowFilter([key: 'hans'], 'hans', ((
        actual, expected
    ) -> actual isnt expected)), []
    deepEqual genericShallowFilter([
        anotherProperty: 4, name: 'videoDemo.webm'
    ], 'video'), [anotherProperty: 4, name: 'videoDemo.webm']
test 'genericFilterInverted', ->
    genericFilterInverted = $filter 'genericFilterInverted'

    deepEqual genericFilterInverted([1, 2, 3], 2), [1, 3]
    deepEqual genericFilterInverted([{a: 1}, {b: 2}, {c: 3}], 2), [
        {a: 1}, {c: 3}]
test 'genericFilterIfDefined', ->
    genericFilterIfDefined = $filter 'genericFilterIfDefined'

    deepEqual genericFilterIfDefined([1, 2, 3], 'filter', null), [1, 2, 3]
    deepEqual genericFilterIfDefined([1, 2, 3], 'filter', 2), [2]
    deepEqual genericFilterIfDefined([1, 2, 3], [2, 'filter'], 2), [1, 2, 3]
test 'genericDetermineModelsToWatch', ->
    genericDetermineModelsToWatch = $filter 'genericDetermineModelsToWatch'

    deepEqual genericDetermineModelsToWatch({}), [[], {}, {}]
    deepEqual genericDetermineModelsToWatch({name:
        pattern: '.+', dynamicExtend: ['test', {'test === true': {
            pattern: null
        }}]
    }), [['test'], {name:
        dynamicExtend: 'test === true': pattern: null
        pattern: '.+'
    }, name: {
        dynamicExtend: 'test === true': pattern: null
        pattern: '.+'
    }]
    deepEqual genericDetermineModelsToWatch({
        name:
            pattern: '.+', dynamicExtend: ['test', {'test === true': {
                pattern: null
            }}]
        eMail: minimumLength: 3
    }, 'A.{1}.B'), [['A.test.B'], {name:
        dynamicExtend: 'test === true': pattern: null
        pattern: '.+'
    }, {
        name:
            dynamicExtend: 'test === true': pattern: null
            pattern: '.+'
        eMail: minimumLength: 3
    }]
test 'genericPrepareModelInformation', ->
    genericPrepareModelInformation = $filter 'genericPrepareModelInformation'

    deepEqual genericPrepareModelInformation({}), password: required: false
    deepEqual genericPrepareModelInformation({name:
        maximumLength: 2000, minimumLength: 1, pattern: '.+'
    }), {
        name:
            maximumLength: 2000
            minimumLength: 1
            pattern: /^.+$/
            required: false
        password: required: false
    }

## endregion

## region string

test 'genericStringTemplate', ->
    genericStringTemplate = $filter 'genericStringTemplate'

    strictEqual genericStringTemplate(''), ''
    strictEqual genericStringTemplate('test'), 'test'
    strictEqual genericStringTemplate('test {{ placeholderName }}', {
        placeholderName: 'hans'
    }), 'test hans'
    strictEqual genericStringTemplate('test # placeholderName }}', {
        placeholderName: 'hans'
    }, '#'), 'test hans'
    strictEqual genericStringTemplate('test # placeholderName }}', {
        placeholderName: 'hans'
    }, '#', '#'), 'test # placeholderName }}'
    strictEqual genericStringTemplate('test # placeholderName #', {
        placeholderName: 'hans'
    }, '#', '#'), 'test hans'
    strictEqual genericStringTemplate('# placeholderName #', {
        placeholderName: 'hans'
    }, '#', '#'), 'hans'
test 'genericStringShowIfPatternMatches', ->
    genericStringShowIfPatternMatches = $filter(
        'genericStringShowIfPatternMatches')

    strictEqual genericStringShowIfPatternMatches('', ''), ''
    strictEqual genericStringShowIfPatternMatches('', false), ''
    strictEqual genericStringShowIfPatternMatches('a', 'a'), 'a'
    strictEqual genericStringShowIfPatternMatches('a', 'b'), ''
    strictEqual genericStringShowIfPatternMatches('a', 'b', true), 'a'
    strictEqual genericStringShowIfPatternMatches('a', 'a', true), ''
test 'genericStringReplace', ->
    genericStringReplace = $filter 'genericStringReplace'

    strictEqual genericStringReplace('', '', ''), ''
    strictEqual genericStringReplace('test', 'e', 'a'), 'tast'
    strictEqual genericStringReplace('test', 'es', 'a'), 'tat'
    strictEqual genericStringReplace('test', 'e', 'e'), 'test'
test 'genericStringMatch', ->
    genericStringMatch = $filter 'genericStringMatch'

    ok genericStringMatch 'test', 'test'
    notOk genericStringMatch 'test', 'a'
    ok genericStringMatch 'es', 'test'
test 'genericStringSliceMatch', ->
    genericStringSliceMatch = $filter 'genericStringSliceMatch'

    strictEqual genericStringSliceMatch('test', 'es'), 'es'
    strictEqual genericStringSliceMatch('test', 'e(s)', 1), 's'
test 'genericStringGetLastDataStateHeaderName', ->
    genericStringGetLastDataStateHeaderName = $filter(
        'genericStringGetLastDataStateHeaderName')

    strictEqual genericStringGetLastDataStateHeaderName(
        'data'
    ), 'Application-Last-Data-Write'
test 'genericStringHasTimeSuffix', ->
    genericStringHasTimeSuffix = $filter 'genericStringHasTimeSuffix'

    notOk genericStringHasTimeSuffix 'test'
    notOk genericStringHasTimeSuffix()
    ok genericStringHasTimeSuffix 'timestamp'
    ok genericStringHasTimeSuffix 'DataDate'
    ok genericStringHasTimeSuffix 'DataTime'
    ok genericStringHasTimeSuffix 'DataDateTime'

## endregion

## region number

test 'genericNumberPercent', ->
    genericNumberPercent = $filter 'genericNumberPercent'

    strictEqual genericNumberPercent(20, 100), 20
    strictEqual genericNumberPercent(20, 200), 10
    strictEqual genericNumberPercent(0, 20), 0
test 'genericNumberDistance', ->
    genericNumberDistance = $filter 'genericNumberDistance'

    strictEqual genericNumberDistance(100), '100 km'

## endregion

# endregion

# region vim modline

# vim: set tabstop=4 shiftwidth=4 expandtab:
# vim: foldmethod=marker foldmarker=region,endregion:

# endregion
