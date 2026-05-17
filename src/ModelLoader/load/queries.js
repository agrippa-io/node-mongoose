'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.loadQueries = loadQueries
var node_utils_1 = require('@agrippa-io/node-utils')
function loadQueries(_a) {
    var path = _a.path, modelName = _a.modelName, schema = _a.schema, _b = _a.isDefaultModule, isDefaultModule = _b === void 0 ? true : _b
    try {
        var _path = ''.concat(path, '/').concat(modelName, '/queries')
        var queries_1 = isDefaultModule
            ? require(_path).default
            : require(_path)
        Object.keys(queries_1).forEach(function (queryName) {
            node_utils_1.Logger.info(''.concat(modelName, ' - Query[').concat(queryName, ']'))
            schema.query[queryName] = queries_1[queryName]
        })
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.error("Failed to load queries for Schema['".concat(modelName, "']"))
            node_utils_1.Logger.error(err)
        }
    }
    return schema
}
