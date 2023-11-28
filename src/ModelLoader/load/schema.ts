import { Schema } from 'mongoose'

import { loadClass } from './class'
import { loadMethods } from './methods'
import { loadMiddleware } from './middleware'
import { loadPlugins } from './plugins'
import { loadQueries } from './queries'
import { loadSerializer } from './serializer'
import { loadStatics } from './statics'
import { loadVirtuals } from './virtuals'

export function loadSchema(path: string, modelName: string) {
  const schemaDefinition = require(`${path}/${modelName}/schemaDefinition`)
    .default
  const schema = new Schema(schemaDefinition, { timestamps: true })

  loadClass({ path, modelName, schema })
  loadSerializer({ path, modelName, schema })
  loadMiddleware({ path, modelName, schema })
  loadPlugins({ path, modelName, schema })
  loadMethods({ path, modelName, schema })
  loadStatics({ path, modelName, schema })
  loadQueries({ path, modelName, schema })
  loadVirtuals({ path, modelName, schema })

  return schema
}
