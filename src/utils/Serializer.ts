import { ErrorAPI } from '@agrippa-io/node-errors'
import isEmpty from 'lodash/isEmpty'

export const UNHANDLED_SERIALIZER_KEYS = {
  Source: 'Source',
  Object: 'Object',
  IndirectObject: 'IndirectObject',
  Context: 'Context',
  Ignore: 'Ignore',
}

export interface InterfaceSerializerOptions {
  pathToModels?: string
  serializeProperties?: string[]
  serializeByIndex?: string[] | string[][]
}

export interface IntefaceSerializeByIndex {
  pathToModels?: string
  serializeByIndex?: string[] | string[][]
}

export interface InterfaceSerializeByIndexModel {
  pathToModels: string
  serializeByIndex: string[]
}

export interface InterfaceSerializeByIndexFieldsOptions {
  serializeByIndex: string[][]
}

export class Serializer {
  static serialize(
    options: InterfaceSerializerOptions,
    data: any
  ): any | any[] {
    const { serializeProperties, serializeByIndex } = options

    if (serializeByIndex) {
      return Serializer.serializeByIndex(options, data)
    }

    // Determine whether data is an Object or an Array of objects
    if (data instanceof Array) {
      return Serializer.serializeArray(serializeProperties, data)
    }

    return Serializer.serializeObject(serializeProperties, data)
  }

  static serializeByIndex(
    options: IntefaceSerializeByIndex,
    data: any[]
  ): any[] {
    const { serializeByIndex, pathToModels } = options

    const isArrayOfModels = serializeByIndex[0] instanceof String
    const isArrayOfFields = serializeByIndex[0] instanceof Array

    if (isArrayOfModels) {
      return Serializer.serializeByIndexModel(
        <InterfaceSerializeByIndexModel>options,
        data
      )
    } else if (isArrayOfFields) {
      return Serializer.serializeByIndexFields(
        <InterfaceSerializeByIndexFieldsOptions>options,
        data
      )
    } else {
      throw new ErrorAPI(
        'Serializer - serializeByIndex is not of type string[] or string[][]'
      )
    }
  }

  static serializeByIndexModel(
    options: InterfaceSerializeByIndexModel,
    data: any[]
  ): any[] {
    const { serializeByIndex } = options

    if (isEmpty(serializeByIndex)) {
      throw new ErrorAPI(
        'Serializer - serializeByIndex must have a minimum length of 1'
      )
    }

    if (serializeByIndex?.length !== data.length) {
      throw new ErrorAPI(
        'Serializer - data and serializeByIndex must have the same length'
      )
    }

    return ['Not implemented']
  }

  static serializeByIndexFields(
    options: InterfaceSerializeByIndexFieldsOptions,
    data: any[]
  ): any[] {
    const { serializeByIndex } = options

    if (isEmpty(serializeByIndex)) {
      throw new ErrorAPI(
        'Serializer - serializeByIndex must have a minimum length of 1'
      )
    }

    if (serializeByIndex?.length !== data.length) {
      throw new ErrorAPI(
        'Serializer - data and serializeByIndex must have the same length'
      )
    }

    return serializeByIndex.map((props, index): any =>
      Serializer.serializeObject(props, data[index])
    )
  }

  static serializeArray(serializeProperties: string[], data: any[]): any[] {
    return data.map((item: any) =>
      this.serializeObject(serializeProperties, item)
    )
  }

  static serializeObject(serializeProperties: string[], obj: any): any {
    if (!obj) {
      // TODO - Determine what we should return if 'obj' is undefined
      return null
    }

    return serializeProperties.reduce((acc: any, prop: string): any => {
      const propName: string = prop === '_id' ? 'id' : prop

      acc[propName] = obj[prop]
      return acc
    }, {})
  }

  static getSerializer(pathToModels: string, model: string) {
    if (UNHANDLED_SERIALIZER_KEYS[model]) {
      return undefined
    }

    return require(`${pathToModels}/${model}/serializer`).default
  }
}
