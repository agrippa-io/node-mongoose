'use strict'
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p]
        }
        return t
    }
    return __assign.apply(this, arguments)
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.ExpressRequestMongooseUtil = void 0
var mongoose_1 = require('mongoose')
var constants_1 = require('src/constants')
var ExpressRequestMongooseUtil = /** @class */ (function () {
    function ExpressRequestMongooseUtil(request) {
        this._request = request
    }
    ExpressRequestMongooseUtil.prototype.requestArgs = function (ignore) {
        if (ignore === void 0) { ignore = [] }
        var args = __assign(__assign(__assign({}, ExpressRequestMongooseUtil.objectToArgs(this._request.query, ignore)), ExpressRequestMongooseUtil.objectToArgs(this._request.params, ignore)), ExpressRequestMongooseUtil.objectToArgs(this._request.body, ignore))
        return args
    }
    ExpressRequestMongooseUtil.objectToArgs = function (obj, ignore) {
        if (ignore === void 0) { ignore = [] }
        return Object.keys(obj).reduce(function (args, key) {
            var _a
            if (constants_1.OPTIONS[key]) {
                return args
            }
            return __assign(__assign({}, args), (_a = {}, _a[key] = obj[key], _a))
        }, {})
    }
    ExpressRequestMongooseUtil.prototype.requestOptions = function (ignore) {
        if (ignore === void 0) { ignore = [] }
        var options = __assign(__assign(__assign({}, ExpressRequestMongooseUtil.objectToMongooseOptions(this._request.query, ignore)), ExpressRequestMongooseUtil.objectToMongooseOptions(this._request.params, ignore)), ExpressRequestMongooseUtil.objectToMongooseOptions(this._request.body, ignore))
        return options
    }
    ExpressRequestMongooseUtil.objectToMongooseOptions = function (obj, ignore) {
        if (ignore === void 0) { ignore = [] }
        return Object.keys(obj).reduce(function (options, key) {
            if (ignore.includes(key)) {
                return options
            }
            if (Object.values(constants_1.OPTIONS).includes(key)) {
                return __assign(__assign({}, options), ExpressRequestMongooseUtil.mapRequestArgToMongoose(obj, key))
            }
            return options
        }, {})
    }
    ExpressRequestMongooseUtil.mapRequestArgToMongoose = function (obj, key) {
        var _a, _b
        var _c
        switch (key) {
            case constants_1.OPTIONS.PAGE:
            case constants_1.OPTIONS.PAGE_SIZE:
                var page = parseInt(obj[constants_1.OPTIONS.PAGE] || constants_1.DEFAULTS.PAGE)
                var limit = parseInt(obj[constants_1.OPTIONS.PAGE_SIZE] || constants_1.DEFAULTS.PAGE_SIZE)
                return {
                    page: page,
                    pageSize: limit,
                    limit: limit,
                    skip: page * limit,
                }
            case constants_1.OPTIONS.SORT_BY:
            case constants_1.OPTIONS.SORT_ORDER:
                return {
                    sort: (_a = {},
                        _a[obj[constants_1.OPTIONS.SORT_BY] || constants_1.DEFAULTS.SORT_BY] = ((_c = obj[constants_1.OPTIONS.SORT_ORDER]) === null || _c === void 0 ? void 0 : _c.toUpperCase()) === constants_1.TYPE_SORT.DESC
                            ? constants_1.ENUM_SORT_ORDER.DESC
                            : constants_1.ENUM_SORT_ORDER.ASC,
                        _a),
                }
            default:
                return _b = {}, _b[key] = obj[key], _b
        }
    }
    ExpressRequestMongooseUtil.prototype.requestFilterQuery = function () {
        return __assign(__assign(__assign({}, ExpressRequestMongooseUtil.objectToFilterQuery(this._request.query)), ExpressRequestMongooseUtil.objectToFilterQuery(this._request.params)), ExpressRequestMongooseUtil.objectToFilterQuery(this._request.body))
    }
    ExpressRequestMongooseUtil.prototype.queryFilterQuery = function () {
        return ExpressRequestMongooseUtil.objectToFilterQuery(this._request.query)
    }
    ExpressRequestMongooseUtil.prototype.paramsFilterQuery = function () {
        return ExpressRequestMongooseUtil.objectToFilterQuery(this._request.params)
    }
    ExpressRequestMongooseUtil.prototype.bodyFilterQuery = function () {
        return ExpressRequestMongooseUtil.objectToFilterQuery(this._request.body)
    }
    ExpressRequestMongooseUtil.prototype.querySort = function () {
        return ExpressRequestMongooseUtil.objectToSortQuery(this._request.query)
    }
    ExpressRequestMongooseUtil.objectToFilterQuery = function (obj) {
        return Object.keys(obj).reduce(function (query, key) {
            var useKey = key === 'id' ? '_id' : key
            if (useKey === 'ids') {
                query._id = ExpressRequestMongooseUtil.in(obj[key])
                return query
            }
            if (!Object.values(constants_1.OPTIONS).includes(key)) {
                query[useKey] = obj[key]
            }
            return query
        }, {})
    }
    ExpressRequestMongooseUtil.objectToSortQuery = function (obj) {
        var _a
        var _b, _c
        var sortBy = (_b = obj.sortBy) !== null && _b !== void 0 ? _b : 'createdAt'
        var sortOrder = (_c = obj.sortOrder) !== null && _c !== void 0 ? _c : 'asc'
        var sortOrderValue = sortOrder.toLowerCase() === 'asc' ? 1 : -1
        return _a = {},
            _a[sortBy] = sortOrderValue,
            _a
    }
    ExpressRequestMongooseUtil.prototype.queryUpdateQuery = function () {
        return ExpressRequestMongooseUtil.objectToUpdateQuery(this._request.query)
    }
    ExpressRequestMongooseUtil.prototype.bodyUpdateQuery = function () {
        return ExpressRequestMongooseUtil.objectToUpdateQuery(this._request.body)
    }
    ExpressRequestMongooseUtil.objectToUpdateQuery = function (obj) {
        return Object.keys(obj).reduce(function (query, key) {
            if (!Object.values(constants_1.OPTIONS).includes(key)) {
                query[key] = obj[key]
            }
            return query
        }, {})
    }
    ExpressRequestMongooseUtil.in = function (ids) {
        var objectIds = ids.map(function (id) { return new mongoose_1.default.Types.ObjectId(id) })
        return { $in: objectIds }
    }
    return ExpressRequestMongooseUtil
}())
exports.ExpressRequestMongooseUtil = ExpressRequestMongooseUtil
