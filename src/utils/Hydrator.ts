import * as path from 'path'

import ErrorAPI from '@agrippa-io/node-errors/src/ErrorAPI'
import Logger from '@agrippa-io/node-utils/src/Logger'
import isEmpty from 'lodash/isEmpty'

import Serializer from './Serializer'

const DEFAULT_POPULATE_OPTIONS = {
  rootModel: null,
  pathToModels: path.join(__dirname, '../../../models'),
  serialize: true,
  transform: false,
}

export interface InterfacePopulateOptions {
  rootModel?: string
  rootModelByIndex?: string[]
  pathToModels?: string
  serialize?: boolean
}

const DELIMETER_FIELD = '.'

export default class Hydrator {
  static async populate(
    data: any | any[],
    fields: string[] = [],
    options: InterfacePopulateOptions = DEFAULT_POPULATE_OPTIONS
  ) {
    const { rootModelByIndex } = options

    if (rootModelByIndex) {
      return Hydrator.populateManyByIndex(data, fields, options)
    }

    return data instanceof Array
      ? Hydrator.populateMany(data, fields, options)
      : Hydrator.populateOne(data, fields, options)
  }

  static async populateManyByIndex(
    data: any[],
    fields: string[] = [],
    options: InterfacePopulateOptions = DEFAULT_POPULATE_OPTIONS
  ) {
    const { rootModelByIndex } = options

    let index = 0
    const populated = []

    for (const item of data) {
      try {
        const modelType = rootModelByIndex[index]
        const populatedItem = await Hydrator.populateOne(item, fields, {
          rootModel: modelType,
        })

        populated.push(populatedItem)
      } catch (err) {
        Logger.error('Failed to Hydrate data', err)
      }

      index++
    }

    return populated
  }

  static async populateMany(
    data: any[],
    fields: string[] = [],
    options: InterfacePopulateOptions = DEFAULT_POPULATE_OPTIONS
  ) {
    const populatedRecords = []

    for (const record of data) {
      const populatedRecord = await Hydrator.populateOne(
        record,
        fields,
        options
      )

      populatedRecords.push(populatedRecord)
    }

    return populatedRecords
  }

  static async populateOne(
    data: any,
    fields: string[] = [],
    options: InterfacePopulateOptions = DEFAULT_POPULATE_OPTIONS
  ) {
    const _options: InterfacePopulateOptions = {
      ...DEFAULT_POPULATE_OPTIONS,
      ...options,
    }

    const { rootModel, pathToModels } = _options

    if (!rootModel) {
      throw new ErrorAPI("InterfacePopulateOptions requires 'rootModel'")
    }

    const populateFieldMap = Hydrator.fieldMap(
      pathToModels,
      null,
      rootModel,
      fields
    )

    return await Hydrator.hydrateNode(populateFieldMap, data)
  }

  static async hydrateNode(node: any, data: any) {
    try {
      return data instanceof Array
        ? await Hydrator.hydrateNodeDataArray(node, data)
        : await Hydrator.hydrateNodeData(node, data)
    } catch (err) {
      Logger.error(`Failed To Populate node[${node.fieldKey}]`)
      return data
    }
  }

  static async hydrateNodeDataArray(node: any, data: any[]) {
    const records = []

    for (const record of data) {
      records.push(await Hydrator.hydrateNodeData(node, record))
    }

    return records
  }

  static async hydrateNodeData(node: any, data: any) {
    let populated = { ...data._doc }

    if (!isEmpty(node.fields)) {
      for (const childNode of node.fields) {
        const virtualKey =
          childNode.serializer.aliasOrigin[childNode.fieldKey] ||
          childNode.fieldKey

        const childData = await data[virtualKey]

        populated = {
          ...populated,
          [childNode.fieldKey]: await Hydrator.hydrateNode(
            childNode,
            childData
          ),
        }
      }
    }

    return Serializer.serialize(
      { serializeProperties: node.serializer.fields },
      populated
    )
  }

  static fieldMap(pathToModels, key, model, fields = []) {
    const serializer: any = Serializer.getSerializer(pathToModels, model)
    const fieldGroups = Hydrator.groupFields(fields)

    return Object.keys(fieldGroups).reduce(
      (map, groupKey) => {
        const groupFields = fieldGroups[groupKey]

        if (groupFields.length) {
          const groupModel = serializer.associationTypeMap[groupKey]

          map.fields.push(
            Hydrator.fieldMap(pathToModels, groupKey, groupModel, groupFields)
          )
        } else {
          const childModel = serializer.associationTypeMap[groupKey]

          map.fields.push({
            fieldKey: groupKey,
            model: childModel,
            serializer: Serializer.getSerializer(pathToModels, childModel),
          })
        }

        return map
      },
      {
        fieldKey: key,
        model: model,
        serializer,
        fields: [],
      }
    )
  }

  static groupFields(fields: string[]) {
    return fields.reduce((map, field) => {
      const fieldNodes = field.split(DELIMETER_FIELD)
      const fieldKey = fieldNodes.shift()
      const groupArray = map[fieldKey] || []

      fieldNodes.length && groupArray.push(fieldNodes.join(DELIMETER_FIELD))
      map[fieldKey] = groupArray

      return map
    }, {})
  }
}
