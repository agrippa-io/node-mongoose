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
exports.Hydrator = void 0;
const path = __importStar(require("path"));
const node_errors_1 = require("@agrippa-io/node-errors");
const node_utils_1 = require("@agrippa-io/node-utils");
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
const Serializer_1 = require("./Serializer");
const DEFAULT_POPULATE_OPTIONS = {
    rootModel: null,
    pathToModels: path.join(__dirname, '../../../../../src/models'),
    serialize: true,
    transform: false,
};
const DELIMETER_FIELD = '.';
class Hydrator {
    static populate(data, fields = [], options = DEFAULT_POPULATE_OPTIONS) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rootModelByIndex } = options;
            if (rootModelByIndex) {
                return Hydrator.populateManyByIndex(data, fields, options);
            }
            return data instanceof Array
                ? Hydrator.populateMany(data, fields, options)
                : Hydrator.populateOne(data, fields, options);
        });
    }
    static populateManyByIndex(data, fields = [], options = DEFAULT_POPULATE_OPTIONS) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rootModelByIndex } = options;
            let index = 0;
            const populated = [];
            for (const item of data) {
                try {
                    const modelType = rootModelByIndex[index];
                    const populatedItem = yield Hydrator.populateOne(item, fields, {
                        rootModel: modelType,
                    });
                    populated.push(populatedItem);
                }
                catch (err) {
                    node_utils_1.Logger.error('Failed to Hydrate data', err);
                }
                index++;
            }
            return populated;
        });
    }
    static populateMany(data, fields = [], options = DEFAULT_POPULATE_OPTIONS) {
        return __awaiter(this, void 0, void 0, function* () {
            const populatedRecords = [];
            for (const record of data) {
                const populatedRecord = yield Hydrator.populateOne(record, fields, options);
                populatedRecords.push(populatedRecord);
            }
            return populatedRecords;
        });
    }
    static populateOne(data, fields = [], options = DEFAULT_POPULATE_OPTIONS) {
        return __awaiter(this, void 0, void 0, function* () {
            const _options = Object.assign(Object.assign({}, DEFAULT_POPULATE_OPTIONS), options);
            const { rootModel, pathToModels } = _options;
            if (!rootModel) {
                throw new node_errors_1.ErrorAPI("InterfacePopulateOptions requires 'rootModel'");
            }
            const populateFieldMap = Hydrator.fieldMap(pathToModels, null, rootModel, fields);
            return yield Hydrator.hydrateNode(populateFieldMap, data);
        });
    }
    static hydrateNode(node, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return data instanceof Array
                    ? yield Hydrator.hydrateNodeDataArray(node, data)
                    : yield Hydrator.hydrateNodeData(node, data);
            }
            catch (err) {
                node_utils_1.Logger.error(`Failed To Populate node[${node.fieldKey}]`);
                return data;
            }
        });
    }
    static hydrateNodeDataArray(node, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = [];
            for (const record of data) {
                records.push(yield Hydrator.hydrateNodeData(node, record));
            }
            return records;
        });
    }
    static hydrateNodeData(node, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let populated = Object.assign({}, data._doc);
            if (!(0, isEmpty_1.default)(node.fields)) {
                for (const childNode of node.fields) {
                    const virtualKey = childNode.serializer.aliasOrigin[childNode.fieldKey] ||
                        childNode.fieldKey;
                    const childData = yield data[virtualKey];
                    populated = Object.assign(Object.assign({}, populated), { [childNode.fieldKey]: yield Hydrator.hydrateNode(childNode, childData) });
                }
            }
            return Serializer_1.Serializer.serialize({ serializeProperties: node.serializer.fields }, populated);
        });
    }
    static fieldMap(pathToModels, key, model, fields = []) {
        const serializer = Serializer_1.Serializer.getSerializer(pathToModels, model);
        const fieldGroups = Hydrator.groupFields(fields);
        return Object.keys(fieldGroups).reduce((map, groupKey) => {
            const groupFields = fieldGroups[groupKey];
            if (groupFields.length) {
                const groupModel = serializer.associationTypeMap[groupKey];
                map.fields.push(Hydrator.fieldMap(pathToModels, groupKey, groupModel, groupFields));
            }
            else {
                const childModel = serializer.associationTypeMap[groupKey];
                map.fields.push({
                    fieldKey: groupKey,
                    model: childModel,
                    serializer: Serializer_1.Serializer.getSerializer(pathToModels, childModel),
                });
            }
            return map;
        }, {
            fieldKey: key,
            model: model,
            serializer,
            fields: [],
        });
    }
    static groupFields(fields) {
        return fields.reduce((map, field) => {
            const fieldNodes = field.split(DELIMETER_FIELD);
            const fieldKey = fieldNodes.shift();
            const groupArray = map[fieldKey] || [];
            fieldNodes.length && groupArray.push(fieldNodes.join(DELIMETER_FIELD));
            map[fieldKey] = groupArray;
            return map;
        }, {});
    }
}
exports.Hydrator = Hydrator;
//# sourceMappingURL=Hydrator.js.map