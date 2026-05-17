'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.loadClass = loadClass
var node_errors_1 = require('@agrippa-io/node-errors')
var node_utils_1 = require('@agrippa-io/node-utils')
function loadClass(_a) {
    var path = _a.path, modelName = _a.modelName, schema = _a.schema
    try {
        var schemaClass = require(''.concat(path, '/').concat(modelName, '/private')).default
        if (!schemaClass) {
            throw new node_errors_1.ErrorMissingDependency('Failed to load Schema Public Class for Mongoose Model['.concat(modelName, ']'))
        }
        node_utils_1.Logger.info(''.concat(modelName, ' - Class'))
        schema.loadClass(schemaClass)
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.warn("Failed to load Class methods for Schema['".concat(modelName, "']"))
            node_utils_1.Logger.error(err)
        }
    }
    return schema
}
