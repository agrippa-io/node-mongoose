"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enum_sort_by_1 = __importDefault(require("./enum.sort.by"));
const enum_sort_order_1 = __importDefault(require("./enum.sort.order"));
exports.default = {
    PAGE_SIZE: 100,
    PAGE: 0,
    SORT_ORDER: enum_sort_order_1.default.ASC,
    SORT_BY: enum_sort_by_1.default.CREATED_AT,
};
//# sourceMappingURL=defaults.js.map