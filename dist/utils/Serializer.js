"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serializer = exports.UNHANDLED_SERIALIZER_KEYS = void 0;
const ErrorAPI_1 = __importDefault(require("@agrippa-io/node-errors/src/ErrorAPI"));
const isEmpty_1 = __importDefault(require("lodash/isEmpty"));
exports.UNHANDLED_SERIALIZER_KEYS = {
    Source: 'Source',
    Object: 'Object',
    IndirectObject: 'IndirectObject',
    Context: 'Context',
    Ignore: 'Ignore',
};
class Serializer {
    static serialize(options, data) {
        const { serializeProperties, serializeByIndex } = options;
        if (serializeByIndex) {
            return Serializer.serializeByIndex(options, data);
        }
        // Determine whether data is an Object or an Array of objects
        if (data instanceof Array) {
            return Serializer.serializeArray(serializeProperties, data);
        }
        return Serializer.serializeObject(serializeProperties, data);
    }
    static serializeByIndex(options, data) {
        const { serializeByIndex, pathToModels } = options;
        const isArrayOfModels = serializeByIndex[0] instanceof String;
        const isArrayOfFields = serializeByIndex[0] instanceof Array;
        if (isArrayOfModels) {
            return Serializer.serializeByIndexModel(options, data);
        }
        else if (isArrayOfFields) {
            return Serializer.serializeByIndexFields(options, data);
        }
        else {
            throw new ErrorAPI_1.default('Serializer - serializeByIndex is not of type string[] or string[][]');
        }
    }
    static serializeByIndexModel(options, data) {
        const { serializeByIndex } = options;
        if (isEmpty_1.default(serializeByIndex)) {
            throw new ErrorAPI_1.default('Serializer - serializeByIndex must have a minimum length of 1');
        }
        if ((serializeByIndex === null || serializeByIndex === void 0 ? void 0 : serializeByIndex.length) !== data.length) {
            throw new ErrorAPI_1.default('Serializer - data and serializeByIndex must have the same length');
        }
        return ['Not implemented'];
    }
    static serializeByIndexFields(options, data) {
        const { serializeByIndex } = options;
        if (isEmpty_1.default(serializeByIndex)) {
            throw new ErrorAPI_1.default('Serializer - serializeByIndex must have a minimum length of 1');
        }
        if ((serializeByIndex === null || serializeByIndex === void 0 ? void 0 : serializeByIndex.length) !== data.length) {
            throw new ErrorAPI_1.default('Serializer - data and serializeByIndex must have the same length');
        }
        return serializeByIndex.map((props, index) => Serializer.serializeObject(props, data[index]));
    }
    static serializeArray(serializeProperties, data) {
        return data.map((item) => this.serializeObject(serializeProperties, item));
    }
    static serializeObject(serializeProperties, obj) {
        if (!obj) {
            // TODO - Determine what we should return if 'obj' is undefined
            return null;
        }
        return serializeProperties.reduce((acc, prop) => {
            const propName = prop === '_id' ? 'id' : prop;
            acc[propName] = obj[prop];
            return acc;
        }, {});
    }
    static getSerializer(pathToModels, model) {
        if (exports.UNHANDLED_SERIALIZER_KEYS[model]) {
            return undefined;
        }
        return require(`${pathToModels}/${model}/serializer`).default;
    }
}
exports.Serializer = Serializer;
//# sourceMappingURL=Serializer.js.map