import { Logger } from '@agrippa-io/node-utils'
import { Schema } from 'mongoose'

export interface ILoadQueries {
  path: string
  modelName: string
  schema: Schema
  isDefaultModule?: boolean
}

export function loadQueries({
  path,
  modelName,
  schema,
  isDefaultModule = true
}: ILoadQueries) {
  try {
    const _path = `${path}/${modelName}/queries`
    const queries: any = isDefaultModule
      ? require(_path).default
      : require(_path)

    Object.keys(queries).forEach((queryName: string) => {
      Logger.info(`${modelName} - Query[${queryName}]`)
      schema.query[queryName] = queries[queryName]
    })
  } catch (err) {
    if (!err.message.includes('Cannot find module')) {
      Logger.error(`Failed to load queries for Schema['${modelName}']`)
      Logger.error(err)
    }
  }

  return schema
}
