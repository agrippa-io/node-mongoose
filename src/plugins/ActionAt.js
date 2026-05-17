'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ActionAt = ActionAt
var capitalize_1 = require('lodash/capitalize')
var SCHEMA_OPTION = {
    type: Date,
}
function ActionAt(schema, options) {
    var _a
    var _this = this
    if (options === void 0) { options = {} }
    var action = (options === null || options === void 0 ? void 0 : options.action) || 'action'
    var field = (options === null || options === void 0 ? void 0 : options.field) || ''.concat(action, 'At')
    var schemaOption = (_a = {},
        _a[field] = SCHEMA_OPTION,
        _a)
    schema.add(schemaOption)
    schema.methods[action] = function () {
        _this[field] = new Date()
        return _this
    }
    schema.methods['remove'.concat((0, capitalize_1.default)(action))] = function () {
        _this[field] = null
        return _this
    }
}
