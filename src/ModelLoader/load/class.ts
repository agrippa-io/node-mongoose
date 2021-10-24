import ErrorMissingDependency from '@agrippa-io/node-errors/src/ErrorMissingDependency'
import { Logger } from '@agrippa-io/node-utils/src'
import { Schema } from 'mongoose'

export default (path: string, modelName: string, schema: Schema) => {
  try {
    const schemaClass = require(`${path}/${modelName}/private`).default

    if (!schemaClass) {
      throw new ErrorMissingDependency(
        `Failed to load Schema Public Class for Mongoose Model[${modelName}]`
      )
    }

    Logger.info(`${modelName} - Class`)
    schema.loadClass(schemaClass)
  } catch (err) {
    if (!err.message.includes('Cannot find module')) {
      Logger.warn(`Failed to load Class methods for Schema['${modelName}']`)
      Logger.error(err)
    }
  }

  return schema
}
