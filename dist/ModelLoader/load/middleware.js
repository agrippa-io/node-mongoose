"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorMissingMongooseHookRegistration_1 = __importDefault(require("@agrippa-io/node-errors/src/ErrorMissingMongooseHookRegistration"));
const src_1 = require("@agrippa-io/node-utils/src");
const HOOKS_MONGOOSE = {
    PRE: 'pre',
    POST: 'post',
};
exports.default = (path, modelName, schema, isDefaultModule = true) => {
    try {
        const _path = `${path}/${modelName}/middleware`;
        const middleware = isDefaultModule
            ? require(_path).default
            : require(_path);
        for (const key of Object.keys(middleware)) {
            const [hook, methodName] = key.split('.');
            src_1.Logger.info(`${modelName} - Hook[${hook}][${methodName}]`);
            const handler = middleware[key];
            switch (hook) {
                case HOOKS_MONGOOSE.PRE:
                    schema.pre(methodName, handler);
                    break;
                case HOOKS_MONGOOSE.POST:
                    schema.post(methodName, handler);
                    break;
                default:
                    throw new ErrorMissingMongooseHookRegistration_1.default(`No hook registration for Schema.${hook}(${methodName}, handler)`);
            }
        }
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            src_1.Logger.error(`Failed to load middlewares for Schema['${modelName}']`);
            src_1.Logger.error(err);
        }
    }
    return schema;
};
//# sourceMappingURL=middleware.js.map