"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSchema = void 0;
const mongoose_1 = require("mongoose");
const class_1 = require("../../ModelLoader/load/class");
const methods_1 = require("../../ModelLoader/load/methods");
const middleware_1 = require("../../ModelLoader/load/middleware");
const plugins_1 = require("../../ModelLoader/load/plugins");
const queries_1 = require("../../ModelLoader/load/queries");
const serializer_1 = require("../../ModelLoader/load/serializer");
const statics_1 = require("../../ModelLoader/load/statics");
const virtuals_1 = require("../../ModelLoader/load/virtuals");
function loadSchema(path, modelName) {
    const schemaDefinition = require(`${path}/${modelName}/schemaDefinition`)
        .default;
    const schema = new mongoose_1.Schema(schemaDefinition, { timestamps: true });
    (0, class_1.loadClass)({ path, modelName, schema });
    (0, serializer_1.loadSerializer)({ path, modelName, schema });
    (0, middleware_1.loadMiddleware)({ path, modelName, schema });
    (0, plugins_1.loadPlugins)({ path, modelName, schema });
    (0, methods_1.loadMethods)({ path, modelName, schema });
    (0, statics_1.loadStatics)({ path, modelName, schema });
    (0, queries_1.loadQueries)({ path, modelName, schema });
    (0, virtuals_1.loadVirtuals)({ path, modelName, schema });
    return schema;
}
exports.loadSchema = loadSchema;
