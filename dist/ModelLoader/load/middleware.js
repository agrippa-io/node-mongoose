"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMiddleware = exports.HOOKS_MONGOOSE = void 0;
const node_errors_1 = require("@agrippa-io/node-errors");
const node_utils_1 = require("@agrippa-io/node-utils");
exports.HOOKS_MONGOOSE = {
    PRE: 'pre',
    POST: 'post',
};
function loadMiddleware({ path, modelName, schema, options = {}, isDefaultModule = true }) {
    try {
        const _path = `${path}/${modelName}/middleware`;
        const middleware = isDefaultModule
            ? require(_path).default
            : require(_path);
        for (const key of Object.keys(middleware)) {
            const [hook, methodName] = key.split('.');
            node_utils_1.Logger.info(`${modelName} - Hook[${hook}][${methodName}]`);
            const handler = middleware[key];
            switch (hook) {
                case exports.HOOKS_MONGOOSE.PRE:
                    schema.pre(methodName, options, handler);
                    break;
                case exports.HOOKS_MONGOOSE.POST:
                    schema.post(methodName, options, handler);
                    break;
                default:
                    throw new node_errors_1.ErrorMissingMongooseHookRegistration(`No hook registration for Schema.${hook}(${methodName}, handler)`);
            }
        }
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.error(`Failed to load middlewares for Schema['${modelName}']`);
            node_utils_1.Logger.error(err);
        }
    }
    return schema;
}
exports.loadMiddleware = loadMiddleware;
