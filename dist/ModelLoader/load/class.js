"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorMissingDependency_1 = __importDefault(require("@agrippa-io/node-errors/src/ErrorMissingDependency"));
const src_1 = require("@agrippa-io/node-utils/src");
exports.default = (path, modelName, schema) => {
    try {
        const schemaClass = require(`${path}/${modelName}/private`).default;
        if (!schemaClass) {
            throw new ErrorMissingDependency_1.default(`Failed to load Schema Public Class for Mongoose Model[${modelName}]`);
        }
        src_1.Logger.info(`${modelName} - Class`);
        schema.loadClass(schemaClass);
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            src_1.Logger.warn(`Failed to load Class methods for Schema['${modelName}']`);
            src_1.Logger.error(err);
        }
    }
    return schema;
};
//# sourceMappingURL=class.js.map