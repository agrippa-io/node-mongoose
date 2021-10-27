"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensure = void 0;
const node_utils_1 = require("@agrippa-io/node-utils");
const ModelLoader_1 = require("../ModelLoader");
function ensure(props) {
    return __awaiter(this, void 0, void 0, function* () {
        const { path, databaseName } = props;
        const models = ModelLoader_1.loadModels(path, databaseName);
        for (const modelName of Object.keys(models)) {
            const model = models[modelName];
            yield model.createIndexes();
            node_utils_1.Logger.info(`Mongo - Created indexes for Model['${modelName}']`);
        }
    });
}
exports.ensure = ensure;
//# sourceMappingURL=ensure.js.map