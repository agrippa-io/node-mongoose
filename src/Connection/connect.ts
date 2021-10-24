import * as mongoose from 'mongoose'

export default async (uri = 'mongodb://localhost:27017', options = {}) => {
  return mongoose.connect(uri, options)
}
