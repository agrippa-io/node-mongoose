import * as mongoose from 'mongoose'

export const MONGO_STATUS = {
  DISCONNECTED: 0,
  CONNECTED: 1,
  CONNECTING: 2,
  DISCONNECTING: 3,
}

export default () => mongoose.connection.readyState
