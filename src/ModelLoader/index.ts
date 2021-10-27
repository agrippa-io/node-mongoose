import { Logger, getDirectoryNames } from '@agrippa-io/node-utils'
import * as mongoose from 'mongoose'

export default function loadModels(pathToModels: string, databaseName: string) {
  // Ensure Connection to DB
  mongoose.connection.useDb(databaseName)
  // Get Model Names
  const modelNames = getDirectoryNames(pathToModels)

  // Create Mongoose Schema, Class, Serializer and Model
  return modelNames.reduce((exportObj, modelName) => {
    // Ignore loading models if directory starts with an underscore
    if (!modelName.startsWith('_')) {
      try {
        exportObj[modelName] = require(`${pathToModels}/${modelName}`).default
        Logger.info(`Mongo - Loaded Model['${modelName}']`)
      } catch (err) {
        Logger.error(`Failed to load Model['${modelName}']`, err)
      }
    }

    return exportObj
  }, {})
}
