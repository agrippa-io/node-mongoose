"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const class_1 = __importDefault(require("./class"));
const methods_1 = __importDefault(require("./methods"));
const middleware_1 = __importDefault(require("./middleware"));
const plugins_1 = __importDefault(require("./plugins"));
const queries_1 = __importDefault(require("./queries"));
const serializer_1 = __importDefault(require("./serializer"));
const statics_1 = __importDefault(require("./statics"));
const virtuals_1 = __importDefault(require("./virtuals"));
exports.default = (path, modelName) => {
    const schemaDefinition = require(`${path}/${modelName}/schemaDefinition`)
        .default;
    const schema = new mongoose_1.Schema(schemaDefinition, { timestamps: true });
    class_1.default(path, modelName, schema);
    serializer_1.default(path, modelName, schema);
    middleware_1.default(path, modelName, schema);
    plugins_1.default(path, modelName, schema);
    methods_1.default(path, modelName, schema);
    statics_1.default(path, modelName, schema);
    queries_1.default(path, modelName, schema);
    virtuals_1.default(path, modelName, schema);
    return schema;
};
//# sourceMappingURL=schema.js.map