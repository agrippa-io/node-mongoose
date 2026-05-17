'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.loadMethods = loadMethods
var node_utils_1 = require('@agrippa-io/node-utils')
function loadMethods(_a) {
    var path = _a.path, modelName = _a.modelName, schema = _a.schema
    try {
        var methods_1 = require(''.concat(path, '/').concat(modelName, '/methods')).default
        Object.keys(methods_1).forEach(function (methodName) {
            node_utils_1.Logger.info(''.concat(modelName, ' - Methods[').concat(methodName, ']'))
            schema.method(methodName, methods_1[methodName])
        })
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.error("Failed to load methods for Schema['".concat(modelName, "']"))
            node_utils_1.Logger.error(err)
        }
    }
    return schema
}
