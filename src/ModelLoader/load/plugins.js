'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.loadPlugins = loadPlugins
var fs = require('fs')
var node_utils_1 = require('@agrippa-io/node-utils')
var mongoose_batches_1 = require('mongoose-batches')
function loadPlugins(_a) {
    var path = _a.path, modelName = _a.modelName, schema = _a.schema
    try {
        // Load default plugins
        schema.plugin(mongoose_batches_1.default)
        // Load Schema-specific plugins
        var pluginsPath = ''.concat(path, '/').concat(modelName, '/plugins')
        if (fs.existsSync(pluginsPath)) {
            var filenames = fs
                .readdirSync(pluginsPath)
                .map(function (filename) { return filename.replace('.js', '') })
            for (var _i = 0, filenames_1 = filenames; _i < filenames_1.length; _i++) {
                var filename = filenames_1[_i]
                try {
                    var pluginConfig = require(''.concat(path, '/').concat(modelName, '/plugins/').concat(filename))
                        .default
                    var plugin = pluginConfig.plugin, options = pluginConfig.options
                    if (plugin) {
                        node_utils_1.Logger.info(''.concat(modelName, ' - Plugin[').concat(filename, ']'))
                        schema.plugin(plugin, options || {})
                    }
                }
                catch (err) {
                    // do nothing
                }
            }
        }
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.error("Failed to load plugins for Schema['".concat(modelName, "']"))
            node_utils_1.Logger.error(err)
        }
    }
    return schema
}
