'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.loadSchema = loadSchema
var mongoose_1 = require('mongoose')
var class_1 = require('src/ModelLoader/load/class')
var methods_1 = require('src/ModelLoader/load/methods')
var middleware_1 = require('src/ModelLoader/load/middleware')
var plugins_1 = require('src/ModelLoader/load/plugins')
var queries_1 = require('src/ModelLoader/load/queries')
var serializer_1 = require('src/ModelLoader/load/serializer')
var statics_1 = require('src/ModelLoader/load/statics')
var virtuals_1 = require('src/ModelLoader/load/virtuals')
function loadSchema(path, modelName) {
    var schemaDefinition = require(''.concat(path, '/').concat(modelName, '/schemaDefinition'))
        .default
    var schema = new mongoose_1.Schema(schemaDefinition, { timestamps: true });
    (0, class_1.loadClass)({ path: path, modelName: modelName, schema: schema });
    (0, serializer_1.loadSerializer)({ path: path, modelName: modelName, schema: schema });
    (0, middleware_1.loadMiddleware)({ path: path, modelName: modelName, schema: schema });
    (0, plugins_1.loadPlugins)({ path: path, modelName: modelName, schema: schema });
    (0, methods_1.loadMethods)({ path: path, modelName: modelName, schema: schema });
    (0, statics_1.loadStatics)({ path: path, modelName: modelName, schema: schema });
    (0, queries_1.loadQueries)({ path: path, modelName: modelName, schema: schema });
    (0, virtuals_1.loadVirtuals)({ path: path, modelName: modelName, schema: schema })
    return schema
}
