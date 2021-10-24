import { Logger } from '@agrippa-io/node-utils/src'

export default (path: string, modelName: string, schema: any): any => {
  try {
    const staticMethods = require(`${path}/${modelName}/statics`).default

    Object.keys(staticMethods).forEach((methodName: string) => {
      Logger.info(`${modelName} - Static[${methodName}]`)
      schema.static(methodName, staticMethods[methodName])
    })
  } catch (err) {
    if (!err.message.includes('Cannot find module')) {
      Logger.error(`Failed to load statics for Schema['${modelName}']`)
      Logger.error(err)
    }
  }

  return schema
}
