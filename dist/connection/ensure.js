"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensure = void 0;
const node_utils_1 = require("@agrippa-io/node-utils");
const ModelLoader_1 = require("../ModelLoader");
async function ensure(props) {
    const { path, databaseName } = props;
    const models = (0, ModelLoader_1.loadModels)(path, databaseName);
    for (const modelName of Object.keys(models)) {
        const model = models[modelName];
        await model.createIndexes();
        node_utils_1.Logger.info(`Mongo - Created indexes for Model['${modelName}']`);
    }
}
exports.ensure = ensure;
