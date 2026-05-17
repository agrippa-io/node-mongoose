'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.HOOKS_MONGOOSE = void 0
exports.loadMiddleware = loadMiddleware
var node_errors_1 = require('@agrippa-io/node-errors')
var node_utils_1 = require('@agrippa-io/node-utils')
exports.HOOKS_MONGOOSE = {
    PRE: 'pre',
    POST: 'post',
}
function loadMiddleware(_a) {
    var path = _a.path, modelName = _a.modelName, schema = _a.schema, _b = _a.options, options = _b === void 0 ? {} : _b, _c = _a.isDefaultModule, isDefaultModule = _c === void 0 ? true : _c
    try {
        var _path = ''.concat(path, '/').concat(modelName, '/middleware')
        var middleware = isDefaultModule
            ? require(_path).default
            : require(_path)
        for (var _i = 0, _d = Object.keys(middleware); _i < _d.length; _i++) {
            var key = _d[_i]
            var _e = key.split('.'), hook = _e[0], methodName = _e[1]
            node_utils_1.Logger.info(''.concat(modelName, ' - Hook[').concat(hook, '][').concat(methodName, ']'))
            var handler = middleware[key]
            switch (hook) {
                case exports.HOOKS_MONGOOSE.PRE:
                    schema.pre(methodName, options, handler)
                    break
                case exports.HOOKS_MONGOOSE.POST:
                    schema.post(methodName, options, handler)
                    break
                default:
                    throw new node_errors_1.ErrorMissingMongooseHookRegistration('No hook registration for Schema.'.concat(hook, '(').concat(methodName, ', handler)'))
            }
        }
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.error("Failed to load middlewares for Schema['".concat(modelName, "']"))
            node_utils_1.Logger.error(err)
        }
    }
    return schema
}
