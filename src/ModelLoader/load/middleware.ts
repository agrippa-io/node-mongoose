import { ErrorMissingMongooseHookRegistration } from '@agrippa-io/node-errors'
import { Logger } from '@agrippa-io/node-utils'
import { Schema } from 'mongoose'

const HOOKS_MONGOOSE = {
  PRE: 'pre',
  POST: 'post',
}

export default (
  path: string,
  modelName: string,
  schema: Schema,
  isDefaultModule = true
) => {
  try {
    const _path = `${path}/${modelName}/middleware`
    const middleware: any = isDefaultModule
      ? require(_path).default
      : require(_path)

    for (const key of Object.keys(middleware)) {
      const [hook, methodName] = key.split('.')

      Logger.info(`${modelName} - Hook[${hook}][${methodName}]`)
      const handler: any = middleware[key]

      switch (hook) {
        case HOOKS_MONGOOSE.PRE:
          schema.pre(methodName, handler)
          break

        case HOOKS_MONGOOSE.POST:
          schema.post(methodName, handler)
          break

        default:
          throw new ErrorMissingMongooseHookRegistration(
            `No hook registration for Schema.${hook}(${methodName}, handler)`
          )
      }
    }
  } catch (err) {
    if (!err.message.includes('Cannot find module')) {
      Logger.error(`Failed to load middlewares for Schema['${modelName}']`)
      Logger.error(err)
    }
  }

  return schema
}
