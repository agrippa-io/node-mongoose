import { Logger } from '@agrippa-io/node-utils'

export interface ILoadStatics {
  path: string
  modelName: string
  schema: any
}

export function loadStatics({
  path,
  modelName,
  schema,
}: ILoadStatics): any {
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
