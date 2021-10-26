import { InterfaceConnectionProps } from '@agrippa-io/node-connection-manager/src/InterfaceConnectionProps'
import { Logger } from '@agrippa-io/node-utils/src'

import loadModels from '../ModelLoader'

export default async (props: InterfaceConnectionProps) => {
  const { path, databaseName } = props
  const models = loadModels(path, databaseName)

  for (const modelName of Object.keys(models)) {
    const model = models[modelName]

    await model.createIndexes()
    Logger.info(`Mongo - Created indexes for Model['${modelName}']`)
  }
}
