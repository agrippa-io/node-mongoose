"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadVirtuals = exports.VIRTUALS_MONGOOSE = void 0;
const node_errors_1 = require("@agrippa-io/node-errors");
const node_utils_1 = require("@agrippa-io/node-utils");
exports.VIRTUALS_MONGOOSE = {
    GET: 'get',
    SET: 'set',
};
function loadVirtuals({ path, modelName, schema, isDefaultModule = true }) {
    try {
        const _path = `${path}/${modelName}/virtuals`;
        const virtuals = isDefaultModule
            ? require(_path).default
            : require(_path);
        for (const key of Object.keys(virtuals)) {
            const [type, propName] = key.split('.');
            const handler = virtuals[key];
            switch (type) {
                case exports.VIRTUALS_MONGOOSE.GET:
                    schema.virtual(propName).get(handler);
                    break;
                case exports.VIRTUALS_MONGOOSE.SET:
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
}
exports.loadVirtuals = loadVirtuals;
