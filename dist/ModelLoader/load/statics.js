"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("@agrippa-io/node-utils/src");
exports.default = (path, modelName, schema) => {
    try {
        const staticMethods = require(`${path}/${modelName}/statics`).default;
        Object.keys(staticMethods).forEach((methodName) => {
            src_1.Logger.info(`${modelName} - Static[${methodName}]`);
            schema.static(methodName, staticMethods[methodName]);
        });
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            src_1.Logger.error(`Failed to load statics for Schema['${modelName}']`);
            src_1.Logger.error(err);
        }
    }
    return schema;
};
//# sourceMappingURL=statics.js.map