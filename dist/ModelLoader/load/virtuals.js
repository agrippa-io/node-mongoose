"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_errors_1 = require("@agrippa-io/node-errors");
const node_utils_1 = require("@agrippa-io/node-utils");
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
                    throw new node_errors_1.ErrorMissingMongooseHookRegistration(`No hook registration for Schema['${modelName}'].virtual(${propName}).${type}(handler)`);
            }
            node_utils_1.Logger.info(`${modelName} - Virtual[${type}][${propName}]`);
        }
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.error(`Failed to load virtuals for Schema['${modelName}']`);
            node_utils_1.Logger.error(err);
        }
    }
    return schema;
};
//# sourceMappingURL=virtuals.js.map