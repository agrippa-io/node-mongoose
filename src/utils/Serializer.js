'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Serializer = exports.UNHANDLED_SERIALIZER_KEYS = void 0
var node_errors_1 = require('@agrippa-io/node-errors')
var isEmpty_1 = require('lodash/isEmpty')
exports.UNHANDLED_SERIALIZER_KEYS = {
    Source: 'Source',
    Object: 'Object',
    IndirectObject: 'IndirectObject',
    Context: 'Context',
    Ignore: 'Ignore',
}
var Serializer = /** @class */ (function () {
    function Serializer() {
    }
    Serializer.serialize = function (options, data) {
        var serializeProperties = options.serializeProperties, serializeByIndex = options.serializeByIndex
        if (serializeByIndex) {
            return Serializer.serializeByIndex(options, data)
        }
        // Determine whether data is an Object or an Array of objects
        if (data instanceof Array) {
            return Serializer.serializeArray(serializeProperties, data)
        }
        return Serializer.serializeObject(serializeProperties, data)
    }
    Serializer.serializeByIndex = function (options, data) {
        var serializeByIndex = options.serializeByIndex, pathToModels = options.pathToModels
        var isArrayOfModels = serializeByIndex[0] instanceof String
        var isArrayOfFields = serializeByIndex[0] instanceof Array
        if (isArrayOfModels) {
            return Serializer.serializeByIndexModel(options, data)
        }
        else if (isArrayOfFields) {
            return Serializer.serializeByIndexFields(options, data)
        }
        else {
            throw new node_errors_1.ErrorAPI('Serializer - serializeByIndex is not of type string[] or string[][]')
        }
    }
    Serializer.serializeByIndexModel = function (options, data) {
        var serializeByIndex = options.serializeByIndex
        if ((0, isEmpty_1.default)(serializeByIndex)) {
            throw new node_errors_1.ErrorAPI('Serializer - serializeByIndex must have a minimum length of 1')
        }
        if ((serializeByIndex === null || serializeByIndex === void 0 ? void 0 : serializeByIndex.length) !== data.length) {
            throw new node_errors_1.ErrorAPI('Serializer - data and serializeByIndex must have the same length')
        }
        return ['Not implemented']
    }
    Serializer.serializeByIndexFields = function (options, data) {
        var serializeByIndex = options.serializeByIndex
        if ((0, isEmpty_1.default)(serializeByIndex)) {
            throw new node_errors_1.ErrorAPI('Serializer - serializeByIndex must have a minimum length of 1')
        }
        if ((serializeByIndex === null || serializeByIndex === void 0 ? void 0 : serializeByIndex.length) !== data.length) {
            throw new node_errors_1.ErrorAPI('Serializer - data and serializeByIndex must have the same length')
        }
        return serializeByIndex.map(function (props, index) {
            return Serializer.serializeObject(props, data[index])
        })
    }
    Serializer.serializeArray = function (serializeProperties, data) {
        var _this = this
        return data.map(function (item) {
            return _this.serializeObject(serializeProperties, item)
        })
    }
    Serializer.serializeObject = function (serializeProperties, obj) {
        if (!obj) {
            // TODO - Determine what we should return if 'obj' is undefined
            return null
        }
        return serializeProperties.reduce(function (acc, prop) {
            var propName = prop === '_id' ? 'id' : prop
            acc[propName] = obj[prop]
            return acc
        }, {})
    }
    Serializer.getSerializer = function (pathToModels, model) {
        if (exports.UNHANDLED_SERIALIZER_KEYS[model]) {
            return undefined
        }
        return require(''.concat(pathToModels, '/').concat(model, '/serializer')).default
    }
    return Serializer
}())
exports.Serializer = Serializer
