"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadStatics = void 0;
const node_utils_1 = require("@agrippa-io/node-utils");
function loadStatics(path, modelName, schema) {
    try {
        const staticMethods = require(`${path}/${modelName}/statics`).default;
        Object.keys(staticMethods).forEach((methodName) => {
            node_utils_1.Logger.info(`${modelName} - Static[${methodName}]`);
            schema.static(methodName, staticMethods[methodName]);
        });
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.error(`Failed to load statics for Schema['${modelName}']`);
            node_utils_1.Logger.error(err);
        }
    }
    return schema;
}
exports.loadStatics = loadStatics;
//# sourceMappingURL=statics.js.map