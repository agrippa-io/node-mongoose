import * as mongoose from 'mongoose'

import loadSchema from './schema'

export default <Document extends mongoose.Document<any, any>>(
  path: string,
  modelName: string
) => {
  const schema = loadSchema(path, modelName)

  return mongoose.model<Document>(modelName, schema)
}
