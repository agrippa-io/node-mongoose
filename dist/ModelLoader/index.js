"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("@agrippa-io/node-utils/src");
const mongoose = __importStar(require("mongoose"));
function loadModels(pathToModels, databaseName) {
    // Ensure Connection to DB
    mongoose.connection.useDb(databaseName);
    // Get Model Names
    const modelNames = src_1.getDirectoryNames(pathToModels);
    // Create Mongoose Schema, Class, Serializer and Model
    return modelNames.reduce((exportObj, modelName) => {
        // Ignore loading models if directory starts with an underscore
        if (!modelName.startsWith('_')) {
            try {
                exportObj[modelName] = require(`${pathToModels}/${modelName}`).default;
                src_1.Logger.info(`Mongo - Loaded Model['${modelName}']`);
            }
            catch (err) {
                src_1.Logger.error(`Failed to load Model['${modelName}']`, err);
            }
        }
        return exportObj;
    }, {});
}
exports.default = loadModels;
//# sourceMappingURL=index.js.map