"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionAt = void 0;
const capitalize_1 = __importDefault(require("lodash/capitalize"));
const SCHEMA_OPTION = {
    type: Date,
};
function ActionAt(schema, options = {}) {
    const action = (options === null || options === void 0 ? void 0 : options.action) || 'action';
    const field = (options === null || options === void 0 ? void 0 : options.field) || `${action}At`;
    const schemaOption = {
        [field]: SCHEMA_OPTION,
    };
    schema.add(schemaOption);
    schema.methods[action] = () => {
        this[field] = new Date();
        return this;
    };
    schema.methods[`remove${(0, capitalize_1.default)(action)}`] = () => {
        this[field] = null;
        return this;
    };
}
exports.ActionAt = ActionAt;
