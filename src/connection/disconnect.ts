import { Logger } from '@agrippa-io/node-utils/src'
import * as mongoose from 'mongoose'

export default async () => {
  Logger.info('Mongo - Disconnecting...')
  await mongoose.connection.close()
  Logger.info('Mongo - Disconnected')
}