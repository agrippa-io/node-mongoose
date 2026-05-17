'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.loadSerializer = loadSerializer
var node_utils_1 = require('@agrippa-io/node-utils')
function loadSerializer(_a) {
    var path = _a.path, modelName = _a.modelName, schema = _a.schema
    try {
        var serializer = require(''.concat(path, '/').concat(modelName, '/serializer')).default
        schema.statics.serializer = serializer
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.warn("Failed to attach Serializer for Schema['".concat(modelName, "']"))
            node_utils_1.Logger.error(err)
        }
    }
    return schema
}
