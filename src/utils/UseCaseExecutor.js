'use strict'
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
        function rejected(value) { try { step(generator['throw'](value)) } catch (e) { reject(e) } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
        step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
}
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1] }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === 'function' ? Iterator : Object).prototype)
    return g.next = verb(0), g['throw'] = verb(1), g['return'] = verb(2), typeof Symbol === 'function' && (g[Symbol.iterator] = function() { return this }), g
    function verb(n) { return function (v) { return step([n, v]) } }
    function step(op) {
        if (f) throw new TypeError('Generator is already executing.')
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t
            if (y = 0, t) op = [op[0] & 2, t.value]
            switch (op[0]) {
                case 0: case 1: t = op; break
                case 4: _.label++; return { value: op[1], done: false }
                case 5: _.label++; y = op[1]; op = [0]; continue
                case 7: op = _.ops.pop(); _.trys.pop(); continue
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break }
                    if (t[2]) _.ops.pop()
                    _.trys.pop(); continue
            }
            op = body.call(thisArg, _)
        } catch (e) { op = [6, e]; y = 0 } finally { f = t = 0 }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true }
    }
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.UseCaseExecutor = void 0
var path = require('path')
var node_utils_1 = require('@agrippa-io/node-utils')
var ExpressRequestMongooseUtil_1 = require('src/utils/ExpressRequestMongooseUtil')
var Hydrator_1 = require('src/utils/Hydrator')
var ResponseHelper_1 = require('src/utils/ResponseHelper')
var Serializer_1 = require('src/utils/Serializer')
var UseCaseExecutor = /** @class */ (function () {
    function UseCaseExecutor() {
    }
    UseCaseExecutor.hydrate = function (request, options, result) {
        return __awaiter(this, void 0, void 0, function () {
            var rootModel, rootModelByIndex, queryBuilder, queryOptions, fields
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rootModel = options.rootModel, rootModelByIndex = options.rootModelByIndex
                        queryBuilder = new ExpressRequestMongooseUtil_1.ExpressRequestMongooseUtil(request)
                        queryOptions = queryBuilder.requestOptions()
                        fields = queryOptions.fields || []
                        return [4 /*yield*/, Hydrator_1.Hydrator.populate(result, fields, {
                                rootModel: rootModel,
                                rootModelByIndex: rootModelByIndex,
                            })]
                    case 1: return [2 /*return*/, _a.sent()]
                }
            })
        })
    }
    UseCaseExecutor.renderUseCase = function (UseCase, request, response, options) {
        return __awaiter(this, void 0, void 0, function () {
            var info, populated, transformed, pathToModels, serializer
            var _a
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        info = options.additionalInfo || {}
                        if (!UseCase.success) return [3 /*break*/, 4]
                        return [4 /*yield*/, this.hydrate(request, options, UseCase.result)]
                    case 1:
                        populated = _b.sent()
                        transformed = void 0
                        if (!options.transform) return [3 /*break*/, 3]
                        pathToModels = options.pathToModels || path.join(__dirname, '../../models')
                        serializer = Serializer_1.Serializer.getSerializer(pathToModels, options.rootModel)
                        return [4 /*yield*/, ((_a = serializer === null || serializer === void 0 ? void 0 : serializer.transform) === null || _a === void 0 ? void 0 : _a.call(serializer, populated))]
                    case 2:
                        transformed = _b.sent()
                        _b.label = 3
                    case 3:
                        ResponseHelper_1.ResponseHelper.success(response, 'Success!', transformed || populated, info)
                        return [3 /*break*/, 5]
                    case 4:
                        ResponseHelper_1.ResponseHelper.internalServerError(response, UseCase.error, UseCase.result, info)
                        _b.label = 5
                    case 5: return [2 /*return*/]
                }
            })
        })
    }
    UseCaseExecutor.prototype.execute = function (useCaseClass, useCaseArguments, request, response, options) {
        return __awaiter(this, void 0, void 0, function () {
            var useCase
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        node_utils_1.Logger.info(''.concat(useCaseClass.name, ' :: ').concat(JSON.stringify(useCaseArguments)))
                        useCase = new useCaseClass(useCaseArguments)
                        return [4 /*yield*/, useCase.perform()]
                    case 1:
                        _a.sent()
                        return [4 /*yield*/, UseCaseExecutor.renderUseCase(useCase, request, response, options)]
                    case 2:
                        _a.sent()
                        return [2 /*return*/]
                }
            })
        })
    }
    return UseCaseExecutor
}())
exports.UseCaseExecutor = UseCaseExecutor
