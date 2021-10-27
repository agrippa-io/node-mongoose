import { Logger } from '@agrippa-io/node-utils'
import { Schema } from 'mongoose'

export default (path: string, modelName: string, schema: Schema) => {
  try {
    const serializer = require(`${path}/${modelName}/serializer`).default

    schema.statics.serializer = serializer
  } catch (err) {
    if (!err.message.includes('Cannot find module')) {
      Logger.warn(`Failed to attach Serializer for Schema['${modelName}']`)
      Logger.error(err)
    }
  }

  return schema
}
