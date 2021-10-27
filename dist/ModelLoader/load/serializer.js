"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_utils_1 = require("@agrippa-io/node-utils");
exports.default = (path, modelName, schema) => {
    try {
        const serializer = require(`${path}/${modelName}/serializer`).default;
        schema.statics.serializer = serializer;
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.warn(`Failed to attach Serializer for Schema['${modelName}']`);
            node_utils_1.Logger.error(err);
        }
    }
    return schema;
};
//# sourceMappingURL=serializer.js.map