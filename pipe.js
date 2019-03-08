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
export * from './basePipe'
// region imports
import Tools, {PlainObject} from 'clientnode'
import {Injector, NgModule, NgZone, Pipe, PipeTransform} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import PouchDB from 'pouchdb'

/*
    NOTE: Default import is not yet support for angular's ahead of time
    compiler.
*/
import {
    BasePipeModule,
    EqualsPipe,
    NumberGetUTCTimestampPipe,
    RepresentObjectPipe,
    StringMD5Pipe
} from './basePipe'
import {
    DataScopeService, DataService, InitialDataService, UtilityService
} from './service'
// endregion
// region attachments are equal
@Pipe({name: 'genericAttachmentsAreEqual'})
/**
 * Determines if given attachments are representing the same data.
 * @property data - Database service instance.
 * @property representObject - Represent object pipe's method.
 * @property specialNames - A mapping to database specific special property
 * names.
 * @property stringMD5 - String md5 pipe's instance transform method.
 * @property zone - Zone service instance.
 */
export class AttachmentsAreEqualPipe implements PipeTransform {
    data:DataService
    representObject:Function
    specialNames:PlainObject
    stringMD5:Function
    zone:NgZone
    /**
     * Gets needed services injected.
     * @param data - Injected data service instance.
     * @param initialData - Injected initial data service instance.
     * @param injector - Application specific injector instance.
     * @param ngZone - Injected zone service instance.
     * @param representObjectPipe - Represent object pipe instance.
     * @param stringMD5Pipe - Injected string md5 pipe instance.
     * @returns Nothing.
     */
    constructor(
        data:DataService,
        initialData:InitialDataService,
        injector:Injector,
        ngZone:NgZone,
        representObjectPipe:RepresentObjectPipe,
        stringMD5Pipe:StringMD5Pipe
    ) {
        this.data = data
        this.representObject = representObjectPipe.transform.bind(
            representObjectPipe)
        this.specialNames =
            initialData.configuration.database.model.property.name.special
        this.stringMD5 = stringMD5Pipe.transform.bind(stringMD5Pipe)
        this.zone = ngZone
    }
    /**
     * Performs the actual transformations process.
     * @param first - First attachment to compare.
     * @param second - Second attachment to compare.
     * @returns Comparison result.
     */
    async transform(first:any, second:any):Promise<boolean> {
        /*
            Identical implies equality and should be checked first for
            performance.
        */
        if (first === second)
            return true
        // Normalize properties.
        type Data = {
            data?:any;
            given:any;
            hash?:any;
        }
        const data:{
            first:Data;
            second:Data;
        } = {
            first: {given: first},
            second: {given: second}
        }
        for (const type of ['first', 'second']) {
            if (
                typeof data[type].given !== 'object' ||
                data[type].given === null
            )
                return false
            /* eslint-disable camelcase */
            data[type].content_type =
                data[type].given.type || data[type].given.content_type
            /* eslint-enable camelcase */
            data[type].data = (
                ('data' in data[type].given) ?
                    data[type].given.data :
                    data[type].given
                ) ||
                NaN
            data[type].hash =
                data[type].given.digest || data[type].given.hash || NaN
            data[type].size = data[type].given.size || data[type].given.length
        }
        // Search for an exclusion criterion.
        for (const type of ['content_type', 'size'])
            if (
                ![data.first[type], data.second[type]].includes(undefined) &&
                data.first[type] !== data.second[type]
            )
                return false
        // Check for a sufficient criterion.
        if (data.first.data === data.second.data)
            return true
        for (const type of ['first', 'second'])
            if (!data[type].hash) {
                if (data[type].data === null || !['object', 'string'].includes(
                    typeof data[type].data
                ))
                    return false
                const name:string = 'genericTemp'
                const databaseConnection:PouchDB = new this.data.database(name)
                try {
                    await this.zone.run(async ():Promise<void> => {
                        try {
                            await databaseConnection.put({
                                [this.specialNames.id]: name,
                                [this.specialNames.attachment]: {
                                    [name]: {
                                        data: data[type].data,
                                        /* eslint-disable camelcase */
                                        content_type:
                                            'application/octet-stream'
                                        /* eslint-enable camelcase */
                                    }
                                }
                            })
                            data[type].hash = (
                                await databaseConnection.get(name)
                            )[this.specialNames.attachment][name].digest
                        } catch (error) {
                            let message:string = 'unknown'
                            try {
                                message = this.representObject(error)
                            } catch (error) {}
                            console.warn(
                                'Given attachments for equality check are ' +
                                `not valid: ${message}`)
                            throw error
                        } finally {
                            await databaseConnection.destroy()
                        }
                    })
                } catch (error) {
                    return false
                }
            }
        return data.first.hash === data.second.hash
    }
}
// endregion
// region extract raw data
@Pipe({name: 'genericExtractRawData'})
/**
 * Removes all meta or computable data and already existing data (compared to
 * an old document) from a document recursively.
 * @property attachmentsAreEqual - Attachments are equal pip's transformation
 * method.
 * @property dataScope - Date scope service instance.
 * @property equals - Equals pipe transform function.
 * @property modelConfiguration - Model configuration object.
 * @property numberGetUTCTimestamp - Date (and time) to unix timstamp converter
 * pipe transform function.
 * @property specialnames - A mapping to database specific special property
 * names.
 * @property tools - Holds the tools class from the tools service.
 */
export class ExtractRawDataPipe implements PipeTransform {
    attachmentsAreEqual:Function
    dataScope:DataScopeService
    equals:Function
    // NOTE: Could not be referenced directly to avoid cyclic dependency.
    modelConfiguration:any
    numberGetUTCTimestamp:Function
    // NOTE: Could not be referenced directly to avoid cyclic dependency.
    specialNames:any
    tools:Tools
    /**
     * Gets injected services.
     * @param attachmentsAreEqualPipe - Injected attachments are equal pipe
     * instance.
     * @param equalsPipe - Equals pipe instance.
     * @param initialData - Initial data service instance.
     * @param injector - Injector service instance.
     * @param numberGetUTCTimestampPipe - Date (and time) to unix timestamp
     * conversion.
     * @param utility - Injected utility service instance.
     * @returns Nothing.
     */
    constructor(
        attachmentsAreEqualPipe:AttachmentsAreEqualPipe,
        dataScope:DataScopeService,
        equalsPipe:EqualsPipe,
        initialData:InitialDataService,
        injector:Injector,
        numberGetUTCTimestampPipe:NumberGetUTCTimestampPipe,
        utility:UtilityService
    ) {
        this.attachmentsAreEqual = attachmentsAreEqualPipe.transform.bind(
            attachmentsAreEqualPipe)
        this.dataScope = dataScope
        this.equals = equalsPipe.transform.bind(equalsPipe)
        this.modelConfiguration = initialData.configuration.database.model
        this.numberGetUTCTimestamp = numberGetUTCTimestampPipe.transform.bind(
            numberGetUTCTimestampPipe)
        this.specialNames = this.modelConfiguration.property.name.special
        this.tools = utility.fixed.tools
    }
    /**
     * Converts all (nested) date object in given data structure to their
     * corresponding utc timestamps in milliseconds.
     * @param value - Given data structure to convert.
     * @returns Given converted object.
     */
    convertDateToTimestampRecursively(value:any):any {
        if (value !== null && typeof value === 'object') {
            if (value instanceof Date)
                return this.numberGetUTCTimestamp(value)
            if (Array.isArray(value)) {
                const result:Array<any> = []
                for (const subValue of value)
                    result.push(this.convertDateToTimestampRecursively(
                        subValue))
                return result
            }
            if (Object.getPrototypeOf(value) === Object.prototype) {
                const result:PlainObject = {}
                for (const name in value)
                    if (value.hasOwnProperty(name))
                        result[name] = this.convertDateToTimestampRecursively(
                            value[name])
                return result
            }
        }
        return value
    }
    /**
     * Slices already existing attachment content from given new document
     * compared to given existing document.
     * @param newDocument - New document to take into account.
     * @param oldDocument - Old document to take into account for comparison.
     * @param specification - Specification object to check for expected
     * attachment types.
     * @returns An object indicating existing data and sliced given attachment
     * data wrapped in a promise (to asynchronous compare attachment content).
     */
    async getNotAlreadyExistingAttachmentData(
        newDocument:PlainObject,
        oldDocument:PlainObject,
        specification:PlainObject
    ):Promise<{payloadExists:boolean;result:PlainObject}> {
        const result:PlainObject = {}
        if (specification && specification.hasOwnProperty(
            this.specialNames.attachment
        ))
            for (const type in specification[this.specialNames.attachment])
                if (specification[this.specialNames.attachment].hasOwnProperty(
                    type
                )) {
                    // region retrieve all type specific existing attachments
                    const oldAttachments:PlainObject = {}
                    if (
                        oldDocument.hasOwnProperty(
                            this.specialNames.attachment) &&
                        oldDocument[this.specialNames.attachment]
                    )
                        for (const fileName in oldDocument[
                            this.specialNames.attachment
                        ])
                            if (
                                oldDocument[
                                    this.specialNames.attachment
                                ].hasOwnProperty(fileName) &&
                                new RegExp(type).test(fileName)
                            )
                                oldAttachments[fileName] = oldDocument[
                                    this.specialNames.attachment
                                ][fileName]
                    // endregion
                    if (newDocument.hasOwnProperty(
                        this.specialNames.attachment
                    ))
                        for (const fileName in newDocument[
                            this.specialNames.attachment
                        ])
                            if (
                                newDocument[
                                    this.specialNames.attachment
                                ].hasOwnProperty(fileName) &&
                                new RegExp(type).test(fileName)
                            )
                                // region determine latest attachment
                                if (
                                    newDocument[this.specialNames.attachment][
                                        fileName
                                    ].hasOwnProperty('data') ||
                                    newDocument[this.specialNames.attachment][
                                        fileName
                                    ].hasOwnProperty('stub')
                                ) {
                                    // Insert new attachment.
                                    result[fileName] = newDocument[
                                        this.specialNames.attachment
                                    ][fileName]
                                    // region remove already existing data
                                    if (oldAttachments.hasOwnProperty(
                                        fileName
                                    )) {
                                        if (await this.attachmentsAreEqual(
                                            newDocument[
                                                this.specialNames.attachment
                                            ][fileName],
                                            oldAttachments[fileName]
                                        ))
                                            /*
                                                Existing attachment has not
                                                been changed.
                                            */
                                            delete result[fileName]
                                        delete oldAttachments[fileName]
                                    } else if (
                                        Object.keys(oldAttachments).length &&
                                        specification[
                                            this.specialNames.attachment
                                        ][type].maximumNumber === 1
                                    ) {
                                        const firstOldAttachmentName:string =
                                            Object.keys(oldAttachments)[0]
                                        if (await this.attachmentsAreEqual(
                                            newDocument[
                                                this.specialNames.attachment
                                            ][fileName],
                                            oldAttachments[
                                                firstOldAttachmentName]
                                        )) {
                                            /*
                                                Existing attachment has been
                                                renamed.
                                            */
                                            result[fileName] = this.tools.copy(
                                                oldAttachments[
                                                    firstOldAttachmentName])
                                            result[fileName].name = fileName
                                        }
                                    }
                                    // endregion
                                } else if (oldAttachments.hasOwnProperty(
                                    fileName
                                ))
                                    // Existing attachment has not been changed.
                                    delete oldAttachments[fileName]
                                else if (
                                    Object.keys(oldAttachments).length &&
                                    specification[
                                        this.specialNames.attachment
                                    ][type].maximumNumber === 1
                                ) {
                                    // Existing attachment has been renamed.
                                    const firstOldAttachmentName:string =
                                        Object.keys(oldAttachments)[0]
                                    result[fileName] = this.tools.copy(
                                        oldAttachments[firstOldAttachmentName])
                                    result[fileName].name = fileName
                                    delete oldAttachments[
                                        firstOldAttachmentName]
                                }
                                // endregion
                    // region mark all not mentioned old attachments as removed
                    for (const fileName in oldAttachments)
                        if (oldAttachments.hasOwnProperty(fileName))
                            result[fileName] = {data: null}
                    // endregion
                }
        return {
            payloadExists: Object.keys(result).length !== 0,
            result
        }
    }
    /**
     * Remove already existing values and mark removed or truncated values
     * (only respect values if specified in model).
     * @param newData - Data to consider.
     * @param oldData - Old data to use for checking for equality.
     * @param specification - Specification object for given document.
     * @returns An object holding new data and boolean indicating if there
     * exists any payload.
     */
    removeAlreadyExistingData(
        newData:any, oldData:any, specification?:PlainObject
    ):{newData:any;payloadExists:boolean} {
        let payloadExists:boolean = false
        if (Array.isArray(newData)) {
            /*
                NOTE: We do not have to take any specification data into
                account for an array since any change in any item breaks
                complete array equality.
            */
            if (!this.equals(newData, oldData))
                payloadExists = true
        } else if (
            specification && typeof newData === 'object' && newData !== null &&
            typeof oldData === 'object' && oldData !== null
        ) {
            const newPropertyNames:Array<string> = Object.keys(newData)
            for (const name in oldData)
                if (oldData.hasOwnProperty(name)) {
                    const index:number = newPropertyNames.indexOf(name)
                    if (index !== -1)
                        newPropertyNames.splice(index, 1)
                    if (!this.modelConfiguration.property.name.reserved.concat(
                        this.specialNames.deleted,
                        this.specialNames.id,
                        this.specialNames.revision,
                        this.specialNames.type
                    ).includes(name))
                        if (newData.hasOwnProperty(name)) {
                            const result:{newData:any;payloadExists:boolean} =
                                this.removeAlreadyExistingData(
                                    newData[name],
                                    oldData[name],
                                    this.dataScope.determineNestedSpecifcation(
                                        name, specification))
                            if (result.payloadExists) {
                                payloadExists = true
                                newData[name] = result.newData
                            } else if (specification.hasOwnProperty(name))
                                delete newData[name]
                        } else {
                            payloadExists = true
                            newData[name] = null
                        }
                }
            if (newPropertyNames.length)
                payloadExists = true
        } else if (!this.equals(
            newData, this.convertDateToTimestampRecursively(oldData)
        ))
            payloadExists = true
        return {newData, payloadExists}
    }
    /**
     * Removes all special property names with meta data from given document.
     * @param data - To trim.
     * @param specification - Specification object for given document.
     * @returns Sliced given document.
     */
    removeMetaData(data:PlainObject, specification?:PlainObject):any {
        if (data instanceof Date)
            return this.numberGetUTCTimestamp(data)
        if (Array.isArray(data)) {
            let index:number = 0
            for (const item of data) {
                data[index] = this.removeMetaData(item, specification)
                index += 1
            }
            return data
        }
        if (data !== null && typeof data === 'object') {
            const result:PlainObject = {}
            for (const name in data)
                if (data.hasOwnProperty(name)) {
                    let propertySpecification:PlainObject = {
                        computed: false,
                        emptyEqualsToNull: true
                    }
                    if (specification)
                        if (specification.hasOwnProperty(name))
                            propertySpecification = specification[name]
                        else if (
                            specification.hasOwnProperty(
                                this.specialNames.additional) &&
                            specification[this.specialNames.additional]
                        )
                            propertySpecification =
                                specification[this.specialNames.additional]
                    if (!(
                        propertySpecification.computed ||
                        [undefined, null].includes(data[name]) ||
                        (
                            propertySpecification.emptyEqualsToNull && (
                                data[name] === '' ||
                                Array.isArray(data[name]) &&
                                data[name].length === 0 ||
                                typeof data[name] === 'object' &&
                                !(data[name] instanceof Date) &&
                                Object.keys(data[name]).length === 0
                            )
                        )
                    ))
                        if (
                            this.modelConfiguration.property.name.reserved
                                .concat(
                                    this.specialNames.deleted,
                                    this.specialNames.id,
                                    this.specialNames.revision,
                                    this.specialNames.type
                                ).includes(name)
                        )
                            result[name] = data[name]
                        else if (name === this.specialNames.attachment) {
                            if (
                                typeof data[name] === 'object' &&
                                data[name] !== null
                            ) {
                                result[name] = {}
                                for (const fileName in data[name])
                                    if (data[name].hasOwnProperty(fileName)) {
                                        result[name][fileName] = {
                                            /* eslint-disable camelcase */
                                            content_type:
                                                data[name][fileName]
                                                    .content_type ||
                                                'application/octet-stream'
                                            /* eslint-enable camelcase */
                                        }
                                        if (data[name][
                                            fileName
                                        ].hasOwnProperty('data'))
                                            result[name][fileName].data =
                                                data[name][fileName].data
                                        else
                                            for (const type of [
                                                'digest', 'stub'
                                            ])
                                                if (data[name][
                                                    fileName
                                                ].hasOwnProperty(type))
                                                    result[name][fileName][
                                                        type
                                                    ] = data[name][fileName][
                                                        type]
                                    }
                            }
                        } else if (
                            ![
                                this.specialNames.additional,
                                this.specialNames.allowedRole,
                                this.specialNames.conflict,
                                this.specialNames.constraint.execution,
                                this.specialNames.constraint.expression,
                                this.specialNames.deletedConflict,
                                this.specialNames.extend,
                                this.specialNames.localSequence,
                                this.specialNames.maximumAggregatedSize,
                                this.specialNames.minimumAggregatedSize,
                                this.specialNames.oldType,
                                this.specialNames.revisions,
                                this.specialNames.revisionsInformation
                            ].includes(name) &&
                            (
                                !specification ||
                                specification.hasOwnProperty(name) ||
                                specification.hasOwnProperty(
                                    this.specialNames.additional)
                            )
                        )
                            result[name] = this.removeMetaData(
                                data[name],
                                this.dataScope.determineNestedSpecifcation(
                                    name, specification))
                }
            return result
        }
        return data
    }
    /**
     * Implements the meta data removing of given document.
     * @param newDocument - Document to slice meta data from.
     * @param oldDocument - Optionally existing old document to take into
     * account.
     * @returns The copied sliced version of given document if changes exists
     * (checked against given old document) and "null" otherwise. Result is
     * wrapped into a promise to process binary data asynchronous.
     */
    async transform(
        newDocument:PlainObject, oldDocument?:PlainObject
    ):Promise<PlainObject|null> {
        let specification:PlainObject|null = null
        if (
            this.specialNames.type in newDocument &&
            this.modelConfiguration.entities.hasOwnProperty(newDocument[
                this.specialNames.type])
        )
            specification = this.modelConfiguration.entities[newDocument[
                this.specialNames.type]]
        let result:PlainObject = this.removeMetaData(
            newDocument, specification)
        let payloadExists:boolean = false
        if (oldDocument) {
            const attachmentDifference:{
                payloadExists:boolean;result:PlainObject
            } = await this.getNotAlreadyExistingAttachmentData(
                result, oldDocument, specification)
            if (attachmentDifference.payloadExists) {
                result[this.specialNames.attachment] =
                    attachmentDifference.result
                payloadExists = attachmentDifference.payloadExists
            }
            if (this.removeAlreadyExistingData(
                result,
                this.removeMetaData(oldDocument, specification),
                specification
            ).payloadExists)
                payloadExists = true
        }
        // Check if real payload exists in currently determined raw data.
        if (!payloadExists)
            /*
                NOTE: We have to check first level only since all unneeded
                nested values should have been already removed if not
                necessary.
            */
            for (const name in result)
                if (
                    result.hasOwnProperty(name) &&
                    !this.modelConfiguration.property.name.reserved.concat(
                        this.specialNames.deleted,
                        this.specialNames.id,
                        this.specialNames.revision,
                        this.specialNames.type
                    ).includes(name)
                ) {
                    payloadExists = true
                    break
                }
        return payloadExists ? result : null
    }
}
// endregion
// region module
@NgModule({
    declarations: [AttachmentsAreEqualPipe, ExtractRawDataPipe],
    exports: [AttachmentsAreEqualPipe, BasePipeModule, ExtractRawDataPipe],
    imports: [
        BasePipeModule,
        BrowserModule.withServerTransition({appId: 'generic-pipe-universal'})
    ],
    providers: [AttachmentsAreEqualPipe, ExtractRawDataPipe]
})
/**
 * Represents the importable angular module.
 */
export class PipeModule {}
export default PipeModule
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
