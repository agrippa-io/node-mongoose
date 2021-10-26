"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorMissingMongooseHookRegistration_1 = __importDefault(require("@agrippa-io/node-errors/src/ErrorMissingMongooseHookRegistration"));
const src_1 = require("@agrippa-io/node-utils/src");
const VIRTUALS_MONGOOSE = {
    GET: 'get',
    SET: 'set',
};
exports.default = (path, modelName, schema, isDefaultModule = true) => {
    try {
        const _path = `${path}/${modelName}/virtuals`;
        const virtuals = isDefaultModule
            ? require(_path).default
            : require(_path);
        for (const key of Object.keys(virtuals)) {
            const [type, propName] = key.split('.');
            const handler = virtuals[key];
            switch (type) {
                case VIRTUALS_MONGOOSE.GET:
                    schema.virtual(propName).get(handler);
                    break;
                case VIRTUALS_MONGOOSE.SET:
                    schema.virtual(propName).set(handler);
                    break;
                default:
                    throw new ErrorMissingMongooseHookRegistration_1.default(`No hook registration for Schema['${modelName}'].virtual(${propName}).${type}(handler)`);
            }
            src_1.Logger.info(`${modelName} - Virtual[${type}][${propName}]`);
        }
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            src_1.Logger.error(`Failed to load virtuals for Schema['${modelName}']`);
            src_1.Logger.error(err);
        }
    }
    return schema;
};
//# sourceMappingURL=virtuals.js.map