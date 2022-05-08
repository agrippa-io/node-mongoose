"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenable = void 0;
const capitalize_1 = __importDefault(require("lodash/capitalize"));
const uuid_1 = require("uuid");
const SCHEMA_OPTION = {
    type: String,
    default: uuid_1.v4,
    required: true,
};
function AccessTokenable(schema, options = {}) {
    var _a;
    const schemaField = (_a = options === null || options === void 0 ? void 0 : options.field) !== null && _a !== void 0 ? _a : 'accessToken';
    const schemaOption = {
        [schemaField]: SCHEMA_OPTION,
    };
    schema.add(schemaOption);
    schema.methods[`regenerate${(0, capitalize_1.default)(schemaField)}`] = () => {
        this[schemaField] = (0, uuid_1.v4)();
        return this;
    };
}
exports.AccessTokenable = AccessTokenable;
//# sourceMappingURL=AccessTokenable.js.map