'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.AccessTokenable = AccessTokenable
var capitalize_1 = require('lodash/capitalize')
var uuid_1 = require('uuid')
var SCHEMA_OPTION = {
    type: String,
    default: uuid_1.v4,
    required: true,
}
function AccessTokenable(schema, options) {
    var _a
    var _this = this
    var _b
    if (options === void 0) { options = {} }
    var schemaField = (_b = options === null || options === void 0 ? void 0 : options.field) !== null && _b !== void 0 ? _b : 'accessToken'
    var schemaOption = (_a = {},
        _a[schemaField] = SCHEMA_OPTION,
        _a)
    schema.add(schemaOption)
    schema.methods['regenerate'.concat((0, capitalize_1.default)(schemaField))] = function () {
        _this[schemaField] = (0, uuid_1.v4)()
        return _this
    }
}
