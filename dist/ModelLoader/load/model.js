"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./schema");
function loadModel(path, modelName) {
    const schema = (0, schema_1.loadSchema)(path, modelName);
    return mongoose_1.default.model(modelName, schema);
}
exports.loadModel = loadModel;
