import * as fs from 'fs'

import { Logger } from '@agrippa-io/node-utils'
import findInBatches from 'mongoose-batches'

export default (path: string, modelName: string, schema: any): any => {
  try {
    // Load default plugins
    schema.plugin(findInBatches)

    // Load Schema-specific plugins
    const pluginsPath = `${path}/${modelName}/plugins`

    if (fs.existsSync(pluginsPath)) {
      const filenames = fs
        .readdirSync(pluginsPath)
        .map((filename) => filename.replace('.js', ''))

      for (const filename of filenames) {
        try {
          const pluginConfig = require(`${path}/${modelName}/plugins/${filename}`)
            .default
          const { plugin, options } = pluginConfig

          if (plugin) {
            Logger.info(`${modelName} - Plugin[${filename}]`)
            schema.plugin(plugin, options || {})
          }
        } catch (err) {
          // do nothing
        }
      }
    }
  } catch (err) {
    if (!err.message.includes('Cannot find module')) {
      Logger.error(`Failed to load plugins for Schema['${modelName}']`)
      Logger.error(err)
    }
  }

  return schema
}
