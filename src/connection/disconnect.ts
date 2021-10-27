import { Logger } from '@agrippa-io/node-utils'
import * as mongoose from 'mongoose'

export async function disconnect() {
  Logger.info('Mongo - Disconnecting...')
  await mongoose.connection.close()
  Logger.info('Mongo - Disconnected')
}
