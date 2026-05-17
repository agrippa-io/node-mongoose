'use strict'
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p]
        }
        return t
    }
    return __assign.apply(this, arguments)
}
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
exports.Hydrator = void 0
var path = require('path')
var node_errors_1 = require('@agrippa-io/node-errors')
var node_utils_1 = require('@agrippa-io/node-utils')
var isEmpty_1 = require('lodash/isEmpty')
var Serializer_1 = require('src/utils/Serializer')
var DEFAULT_POPULATE_OPTIONS = {
    rootModel: null,
    pathToModels: path.join(__dirname, '../../../../../src/models'),
    serialize: true,
    transform: false,
}
var DELIMETER_FIELD = '.'
var Hydrator = /** @class */ (function () {
    function Hydrator() {
    }
    Hydrator.populate = function (data_1) {
        return __awaiter(this, arguments, void 0, function (data, fields, options) {
            var rootModelByIndex
            if (fields === void 0) { fields = [] }
            if (options === void 0) { options = DEFAULT_POPULATE_OPTIONS }
            return __generator(this, function (_a) {
                rootModelByIndex = options.rootModelByIndex
                if (rootModelByIndex) {
                    return [2 /*return*/, Hydrator.populateManyByIndex(data, fields, options)]
                }
                return [2 /*return*/, data instanceof Array
                        ? Hydrator.populateMany(data, fields, options)
                        : Hydrator.populateOne(data, fields, options)]
            })
        })
    }
    Hydrator.populateManyByIndex = function (data_1) {
        return __awaiter(this, arguments, void 0, function (data, fields, options) {
            var rootModelByIndex, index, populated, _i, data_2, item, modelType, populatedItem, err_1
            if (fields === void 0) { fields = [] }
            if (options === void 0) { options = DEFAULT_POPULATE_OPTIONS }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rootModelByIndex = options.rootModelByIndex
                        index = 0
                        populated = []
                        _i = 0, data_2 = data
                        _a.label = 1
                    case 1:
                        if (!(_i < data_2.length)) return [3 /*break*/, 7]
                        item = data_2[_i]
                        _a.label = 2
                    case 2:
                        _a.trys.push([2, 4, , 5])
                        modelType = rootModelByIndex[index]
                        return [4 /*yield*/, Hydrator.populateOne(item, fields, {
                                rootModel: modelType,
                            })]
                    case 3:
                        populatedItem = _a.sent()
                        populated.push(populatedItem)
                        return [3 /*break*/, 5]
                    case 4:
                        err_1 = _a.sent()
                        node_utils_1.Logger.error('Failed to Hydrate data', err_1)
                        return [3 /*break*/, 5]
                    case 5:
                        index++
                        _a.label = 6
                    case 6:
                        _i++
                        return [3 /*break*/, 1]
                    case 7: return [2 /*return*/, populated]
                }
            })
        })
    }
    Hydrator.populateMany = function (data_1) {
        return __awaiter(this, arguments, void 0, function (data, fields, options) {
            var populatedRecords, _i, data_3, record, populatedRecord
            if (fields === void 0) { fields = [] }
            if (options === void 0) { options = DEFAULT_POPULATE_OPTIONS }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        populatedRecords = []
                        _i = 0, data_3 = data
                        _a.label = 1
                    case 1:
                        if (!(_i < data_3.length)) return [3 /*break*/, 4]
                        record = data_3[_i]
                        return [4 /*yield*/, Hydrator.populateOne(record, fields, options)]
                    case 2:
                        populatedRecord = _a.sent()
                        populatedRecords.push(populatedRecord)
                        _a.label = 3
                    case 3:
                        _i++
                        return [3 /*break*/, 1]
                    case 4: return [2 /*return*/, populatedRecords]
                }
            })
        })
    }
    Hydrator.populateOne = function (data_1) {
        return __awaiter(this, arguments, void 0, function (data, fields, options) {
            var _options, rootModel, pathToModels, populateFieldMap
            if (fields === void 0) { fields = [] }
            if (options === void 0) { options = DEFAULT_POPULATE_OPTIONS }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _options = __assign(__assign({}, DEFAULT_POPULATE_OPTIONS), options)
                        rootModel = _options.rootModel, pathToModels = _options.pathToModels
                        if (!rootModel) {
                            throw new node_errors_1.ErrorAPI("InterfacePopulateOptions requires 'rootModel'")
                        }
                        populateFieldMap = Hydrator.fieldMap(pathToModels, null, rootModel, fields)
                        return [4 /*yield*/, Hydrator.hydrateNode(populateFieldMap, data)]
                    case 1: return [2 /*return*/, _a.sent()]
                }
            })
        })
    }
    Hydrator.hydrateNode = function (node, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, err_2
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6])
                        if (!(data instanceof Array)) return [3 /*break*/, 2]
                        return [4 /*yield*/, Hydrator.hydrateNodeDataArray(node, data)]
                    case 1:
                        _a = _b.sent()
                        return [3 /*break*/, 4]
                    case 2: return [4 /*yield*/, Hydrator.hydrateNodeData(node, data)]
                    case 3:
                        _a = _b.sent()
                        _b.label = 4
                    case 4: return [2 /*return*/, _a]
                    case 5:
                        err_2 = _b.sent()
                        node_utils_1.Logger.error('Failed To Populate node['.concat(node.fieldKey, ']'))
                        return [2 /*return*/, data]
                    case 6: return [2 /*return*/]
                }
            })
        })
    }
    Hydrator.hydrateNodeDataArray = function (node, data) {
        return __awaiter(this, void 0, void 0, function () {
            var records, _i, data_1, record, _a, _b
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        records = []
                        _i = 0, data_1 = data
                        _c.label = 1
                    case 1:
                        if (!(_i < data_1.length)) return [3 /*break*/, 4]
                        record = data_1[_i]
                        _b = (_a = records).push
                        return [4 /*yield*/, Hydrator.hydrateNodeData(node, record)]
                    case 2:
                        _b.apply(_a, [_c.sent()])
                        _c.label = 3
                    case 3:
                        _i++
                        return [3 /*break*/, 1]
                    case 4: return [2 /*return*/, records]
                }
            })
        })
    }
    Hydrator.hydrateNodeData = function (node, data) {
        return __awaiter(this, void 0, void 0, function () {
            var populated, _i, _a, childNode, virtualKey, childData, _b, _c
            var _d
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        populated = __assign({}, data._doc)
                        if (!!(0, isEmpty_1.default)(node.fields)) return [3 /*break*/, 5]
                        _i = 0, _a = node.fields
                        _e.label = 1
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5]
                        childNode = _a[_i]
                        virtualKey = childNode.serializer.aliasOrigin[childNode.fieldKey] ||
                            childNode.fieldKey
                        return [4 /*yield*/, data[virtualKey]]
                    case 2:
                        childData = _e.sent()
                        _b = [__assign({}, populated)]
                        _d = {}
                        _c = childNode.fieldKey
                        return [4 /*yield*/, Hydrator.hydrateNode(childNode, childData)]
                    case 3:
                        populated = __assign.apply(void 0, _b.concat([(_d[_c] = _e.sent(), _d)]))
                        _e.label = 4
                    case 4:
                        _i++
                        return [3 /*break*/, 1]
                    case 5: return [2 /*return*/, Serializer_1.Serializer.serialize({ serializeProperties: node.serializer.fields }, populated)]
                }
            })
        })
    }
    Hydrator.fieldMap = function (pathToModels, key, model, fields) {
        if (fields === void 0) { fields = [] }
        var serializer = Serializer_1.Serializer.getSerializer(pathToModels, model)
        var fieldGroups = Hydrator.groupFields(fields)
        return Object.keys(fieldGroups).reduce(function (map, groupKey) {
            var groupFields = fieldGroups[groupKey]
            if (groupFields.length) {
                var groupModel = serializer.associationTypeMap[groupKey]
                map.fields.push(Hydrator.fieldMap(pathToModels, groupKey, groupModel, groupFields))
            }
            else {
                var childModel = serializer.associationTypeMap[groupKey]
                map.fields.push({
                    fieldKey: groupKey,
                    model: childModel,
                    serializer: Serializer_1.Serializer.getSerializer(pathToModels, childModel),
                })
            }
            return map
        }, {
            fieldKey: key,
            model: model,
            serializer: serializer,
            fields: [],
        })
    }
    Hydrator.groupFields = function (fields) {
        return fields.reduce(function (map, field) {
            var fieldNodes = field.split(DELIMETER_FIELD)
            var fieldKey = fieldNodes.shift()
            var groupArray = map[fieldKey] || []
            fieldNodes.length && groupArray.push(fieldNodes.join(DELIMETER_FIELD))
            map[fieldKey] = groupArray
            return map
        }, {})
    }
    return Hydrator
}())
exports.Hydrator = Hydrator
