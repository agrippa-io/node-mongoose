import { Logger } from '@agrippa-io/node-utils/src'

import * as mongoose from 'mongoose'

import loadModels from '../ModelLoader'
import connect from './connect'

// Handle Errors POST connection established
mongoose.connection.on('error', (err) => {
  Logger.error('MongoDB')
  Logger.error(err)
})

export interface InterfaceConnectionConfig {
  uri: string
  databaseName: string
  pathToModels: string
}

export default async (
  options: InterfaceConnectionConfig,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callback = (connection) => {}
) => {
  try {
    const { uri, databaseName, pathToModels } = options
    const connection = await connect(uri)

    loadModels(pathToModels, databaseName)

    callback(connection)
  } catch (err) {
    Logger.error('Failed to connect to MongoDB')
    Logger.error(err)
  }
}
