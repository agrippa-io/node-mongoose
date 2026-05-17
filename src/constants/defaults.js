'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.DEFAULTS = void 0
var enum_sort_by_1 = require('src/constants/enum.sort.by')
var enum_sort_order_1 = require('src/constants/enum.sort.order')
exports.DEFAULTS = {
    PAGE_SIZE: 100,
    PAGE: 0,
    SORT_ORDER: enum_sort_order_1.ENUM_SORT_ORDER.ASC,
    SORT_BY: enum_sort_by_1.ENUM_SORT_BY.CREATED_AT,
}
