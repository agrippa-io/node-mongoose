'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.loadModel = loadModel
var mongoose_1 = require('mongoose')
var schema_1 = require('src/ModelLoader/load/schema')
function loadModel(path, modelName) {
    var schema = (0, schema_1.loadSchema)(path, modelName)
    return mongoose_1.default.model(modelName, schema)
}
