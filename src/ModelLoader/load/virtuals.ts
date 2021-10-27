import { ErrorMissingMongooseHookRegistration } from '@agrippa-io/node-errors'
import { Logger } from '@agrippa-io/node-utils'
import { Schema } from 'mongoose'

export const VIRTUALS_MONGOOSE = {
  GET: 'get',
  SET: 'set',
}

export function loadVirtuals(
  path: string,
  modelName: string,
  schema: Schema,
  isDefaultModule = true
) {
  try {
    const _path = `${path}/${modelName}/virtuals`
    const virtuals: any = isDefaultModule
      ? require(_path).default
      : require(_path)

    for (const key of Object.keys(virtuals)) {
      const [type, propName] = key.split('.')
      const handler: any = virtuals[key]

      switch (type) {
        case VIRTUALS_MONGOOSE.GET:
          schema.virtual(propName).get(handler)
          break

        case VIRTUALS_MONGOOSE.SET:
          schema.virtual(propName).set(handler)
          break

        default:
          throw new ErrorMissingMongooseHookRegistration(
            `No hook registration for Schema['${modelName}'].virtual(${propName}).${type}(handler)`
          )
      }

      Logger.info(`${modelName} - Virtual[${type}][${propName}]`)
    }
  } catch (err) {
    if (!err.message.includes('Cannot find module')) {
      Logger.error(`Failed to load virtuals for Schema['${modelName}']`)
      Logger.error(err)
    }
  }

  return schema
}
