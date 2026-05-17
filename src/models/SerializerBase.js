'use strict'
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i)
            ar[i] = from[i]
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from))
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.SerializerBase = void 0
var constants_1 = require('src/constants')
var SerializerBase = /** @class */ (function () {
    function SerializerBase() {
    }
    Object.defineProperty(SerializerBase, 'fields', {
        get: function () {
            var aliasMap = this.associationAliases
            return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], constants_1.MONGOOSE_FIELDS, true), this.properties, true), this.associations, true), Object.values(aliasMap).reduce(function (allAliases, propAliases) {
                return __spreadArray(__spreadArray([], allAliases, true), propAliases, true)
            }, []), true)
        },
        enumerable: false,
        configurable: true
    })
    Object.defineProperty(SerializerBase, 'properties', {
        get: function () {
            return []
        },
        enumerable: false,
        configurable: true
    })
    Object.defineProperty(SerializerBase, 'associations', {
        get: function () {
            return []
        },
        enumerable: false,
        configurable: true
    })
    Object.defineProperty(SerializerBase, 'associationAliases', {
        get: function () {
            return {}
        },
        enumerable: false,
        configurable: true
    })
    Object.defineProperty(SerializerBase, 'aliasOrigin', {
        get: function () {
            return {}
        },
        enumerable: false,
        configurable: true
    })
    Object.defineProperty(SerializerBase, 'associationTypeMap', {
        get: function () {
            return {}
        },
        enumerable: false,
        configurable: true
    })
    return SerializerBase
}())
exports.SerializerBase = SerializerBase
