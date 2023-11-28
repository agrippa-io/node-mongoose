"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMethods = void 0;
const node_utils_1 = require("@agrippa-io/node-utils");
function loadMethods({ path, modelName, schema, }) {
    try {
        const methods = require(`${path}/${modelName}/methods`).default;
        Object.keys(methods).forEach((methodName) => {
            node_utils_1.Logger.info(`${modelName} - Methods[${methodName}]`);
            schema.method(methodName, methods[methodName]);
        });
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.error(`Failed to load methods for Schema['${modelName}']`);
            node_utils_1.Logger.error(err);
        }
    }
    return schema;
}
exports.loadMethods = loadMethods;
