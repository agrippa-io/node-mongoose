"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.UseCaseExecutor = void 0;
const path = __importStar(require("path"));
const node_utils_1 = require("@agrippa-io/node-utils");
const ExpressRequestMongooseUtil_1 = require("../utils/ExpressRequestMongooseUtil");
const Hydrator_1 = require("../utils/Hydrator");
const ResponseHelper_1 = require("../utils/ResponseHelper");
const Serializer_1 = require("../utils/Serializer");
class UseCaseExecutor {
    static async hydrate(request, options, result) {
        const { rootModel, rootModelByIndex } = options;
        const queryBuilder = new ExpressRequestMongooseUtil_1.ExpressRequestMongooseUtil(request);
        const queryOptions = queryBuilder.requestOptions();
        const fields = queryOptions.fields || [];
        return await Hydrator_1.Hydrator.populate(result, fields, {
            rootModel,
            rootModelByIndex,
        });
    }
    static async renderUseCase(UseCase, request, response, options) {
        const info = options.additionalInfo || {};
        if (UseCase.success) {
            const populated = await this.hydrate(request, options, UseCase.result);
            let transformed;
            if (options.transform) {
                const pathToModels = options.pathToModels || path.join(__dirname, '../../models');
                const serializer = Serializer_1.Serializer.getSerializer(pathToModels, options.rootModel);
                transformed = await serializer?.transform?.(populated);
            }
            ResponseHelper_1.ResponseHelper.success(response, 'Success!', transformed || populated, info);
        }
        else {
            ResponseHelper_1.ResponseHelper.internalServerError(response, UseCase.error, UseCase.result, info);
        }
    }
    async execute(useCaseClass, useCaseArguments, request, response, options) {
        node_utils_1.Logger.info(`${useCaseClass.name} :: ${JSON.stringify(useCaseArguments)}`);
        const useCase = new useCaseClass(useCaseArguments);
        await useCase.perform();
        await UseCaseExecutor.renderUseCase(useCase, request, response, options);
    }
}
exports.UseCaseExecutor = UseCaseExecutor;
