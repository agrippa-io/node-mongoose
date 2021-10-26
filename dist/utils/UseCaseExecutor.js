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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCaseExecutor = void 0;
const path = __importStar(require("path"));
const Logger_1 = __importDefault(require("@agrippa-io/node-utils/src/Logger"));
const ExpressRequestMongooseUtil_1 = require("./ExpressRequestMongooseUtil");
const Hydrator_1 = require("./Hydrator");
const ResponseHelper_1 = require("./ResponseHelper");
const Serializer_1 = require("./Serializer");
class UseCaseExecutor {
    static hydrate(request, options, result) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rootModel, rootModelByIndex } = options;
            const queryBuilder = new ExpressRequestMongooseUtil_1.ExpressRequestMongooseUtil(request);
            const queryOptions = queryBuilder.requestOptions();
            const fields = queryOptions.fields || [];
            return yield Hydrator_1.Hydrator.populate(result, fields, {
                rootModel,
                rootModelByIndex,
            });
        });
    }
    static renderUseCase(UseCase, request, response, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const info = options.additionalInfo || {};
            if (UseCase.success) {
                const populated = yield this.hydrate(request, options, UseCase.result);
                let transformed;
                if (options.transform) {
                    const pathToModels = options.pathToModels || path.join(__dirname, '../../models');
                    const serializer = Serializer_1.Serializer.getSerializer(pathToModels, options.rootModel);
                    transformed = yield ((_a = serializer === null || serializer === void 0 ? void 0 : serializer.transform) === null || _a === void 0 ? void 0 : _a.call(serializer, populated));
                }
                ResponseHelper_1.ResponseHelper.success(response, 'Success!', transformed || populated, info);
            }
            else {
                ResponseHelper_1.ResponseHelper.internalServerError(response, UseCase.error, UseCase.result, info);
            }
        });
    }
    execute(useCaseClass, useCaseArguments, request, response, options) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger_1.default.info(`${useCaseClass.name} :: ${JSON.stringify(useCaseArguments)}`);
            const useCase = new useCaseClass(useCaseArguments);
            yield useCase.perform();
            yield UseCaseExecutor.renderUseCase(useCase, request, response, options);
        });
    }
}
exports.UseCaseExecutor = UseCaseExecutor;
//# sourceMappingURL=UseCaseExecutor.js.map