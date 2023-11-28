import { ErrorMissingDependency } from '@agrippa-io/node-errors'
import { Logger } from '@agrippa-io/node-utils'
import { Schema } from 'mongoose'

export interface ILoadClass {
  path: string
  modelName: string
  schema: Schema
}
export function loadClass({
  path,
  modelName,
  schema,
}: ILoadClass) {
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
