import { Schema } from 'mongoose'

import { loadClass } from 'src/ModelLoader/load/class'
import { loadMethods } from 'src/ModelLoader/load/methods'
import { loadMiddleware } from 'src/ModelLoader/load/middleware'
import { loadPlugins } from 'src/ModelLoader/load/plugins'
import { loadQueries } from 'src/ModelLoader/load/queries'
import { loadSerializer } from 'src/ModelLoader/load/serializer'
import { loadStatics } from 'src/ModelLoader/load/statics'
import { loadVirtuals } from 'src/ModelLoader/load/virtuals'

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
