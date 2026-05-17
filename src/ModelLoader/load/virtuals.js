'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.VIRTUALS_MONGOOSE = void 0
exports.loadVirtuals = loadVirtuals
var node_errors_1 = require('@agrippa-io/node-errors')
var node_utils_1 = require('@agrippa-io/node-utils')
exports.VIRTUALS_MONGOOSE = {
    GET: 'get',
    SET: 'set',
}
function loadVirtuals(_a) {
    var path = _a.path, modelName = _a.modelName, schema = _a.schema, _b = _a.isDefaultModule, isDefaultModule = _b === void 0 ? true : _b
    try {
        var _path = ''.concat(path, '/').concat(modelName, '/virtuals')
        var virtuals = isDefaultModule
            ? require(_path).default
            : require(_path)
        for (var _i = 0, _c = Object.keys(virtuals); _i < _c.length; _i++) {
            var key = _c[_i]
            var _d = key.split('.'), type = _d[0], propName = _d[1]
            var handler = virtuals[key]
            switch (type) {
                case exports.VIRTUALS_MONGOOSE.GET:
                    schema.virtual(propName).get(handler)
                    break
                case exports.VIRTUALS_MONGOOSE.SET:
                    schema.virtual(propName).set(handler)
                    break
                default:
                    throw new node_errors_1.ErrorMissingMongooseHookRegistration("No hook registration for Schema['".concat(modelName, "'].virtual(").concat(propName, ').').concat(type, '(handler)'))
            }
            node_utils_1.Logger.info(''.concat(modelName, ' - Virtual[').concat(type, '][').concat(propName, ']'))
        }
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.error("Failed to load virtuals for Schema['".concat(modelName, "']"))
            node_utils_1.Logger.error(err)
        }
    }
    return schema
}
