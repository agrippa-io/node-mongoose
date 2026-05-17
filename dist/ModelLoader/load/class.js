"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadClass = void 0;
const node_errors_1 = require("@agrippa-io/node-errors");
const node_utils_1 = require("@agrippa-io/node-utils");
function loadClass({ path, modelName, schema, }) {
    try {
        const schemaClass = require(`${path}/${modelName}/private`).default;
        if (!schemaClass) {
            throw new node_errors_1.ErrorMissingDependency(`Failed to load Schema Public Class for Mongoose Model[${modelName}]`);
        }
        node_utils_1.Logger.info(`${modelName} - Class`);
        schema.loadClass(schemaClass);
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.warn(`Failed to load Class methods for Schema['${modelName}']`);
            node_utils_1.Logger.error(err);
        }
    }
    return schema;
}
exports.loadClass = loadClass;
