'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.loadStatics = loadStatics
var node_utils_1 = require('@agrippa-io/node-utils')
function loadStatics(_a) {
    var path = _a.path, modelName = _a.modelName, schema = _a.schema
    try {
        var staticMethods_1 = require(''.concat(path, '/').concat(modelName, '/statics')).default
        Object.keys(staticMethods_1).forEach(function (methodName) {
            node_utils_1.Logger.info(''.concat(modelName, ' - Static[').concat(methodName, ']'))
            schema.static(methodName, staticMethods_1[methodName])
        })
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.error("Failed to load statics for Schema['".concat(modelName, "']"))
            node_utils_1.Logger.error(err)
        }
    }
    return schema
}
