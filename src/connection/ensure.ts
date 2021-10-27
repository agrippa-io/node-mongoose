import { InterfaceConnectionProps } from '@agrippa-io/node-connection-manager'
import { Logger } from '@agrippa-io/node-utils'

import { loadModels } from '../ModelLoader'

export async function ensure(props: InterfaceConnectionProps) {
  const { path, databaseName } = props
  const models = loadModels(path, databaseName)

  for (const modelName of Object.keys(models)) {
    const model = models[modelName]

    await model.createIndexes()
    Logger.info(`Mongo - Created indexes for Model['${modelName}']`)
  }
}
