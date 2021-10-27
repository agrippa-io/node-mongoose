import { Logger } from '@agrippa-io/node-utils'

export function loadMethods(path: string, modelName: string, schema: any): any {
  try {
    const methods = require(`${path}/${modelName}/methods`).default

    Object.keys(methods).forEach((methodName: string) => {
      Logger.info(`${modelName} - Methods[${methodName}]`)
      schema.method(methodName, methods[methodName])
    })
  } catch (err) {
    if (!err.message.includes('Cannot find module')) {
      Logger.error(`Failed to load methods for Schema['${modelName}']`)
      Logger.error(err)
    }
  }

  return schema
}
