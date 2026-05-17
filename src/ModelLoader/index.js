'use strict'
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k
    var desc = Object.getOwnPropertyDescriptor(m, k)
    if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k] } }
    }
    Object.defineProperty(o, k2, desc)
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k
    o[k2] = m[k]
}))
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p)
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.loadModels = loadModels
var node_utils_1 = require('@agrippa-io/node-utils')
var mongoose_1 = require('mongoose')
__exportStar(require('src/ModelLoader/load'), exports)
function loadModels(pathToModels, databaseName) {
    // Ensure Connection to DB
    mongoose_1.default.connection.useDb(databaseName)
    // Get Model Names
    var modelNames = (0, node_utils_1.getDirectoryNames)(pathToModels)
    // Create Mongoose Schema, Class, Serializer and Model
    return modelNames.reduce(function (exportObj, modelName) {
        // Ignore loading models if directory starts with an underscore
        if (!modelName.startsWith('_')) {
            try {
                exportObj[modelName] = require(''.concat(pathToModels, '/').concat(modelName)).default
                node_utils_1.Logger.info("Mongo - Loaded Model['".concat(modelName, "']"))
            }
            catch (err) {
                node_utils_1.Logger.error("Failed to load Model['".concat(modelName, "']"), err)
            }
        }
        return exportObj
    }, {})
}
