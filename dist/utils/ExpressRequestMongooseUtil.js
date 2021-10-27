"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressRequestMongooseUtil = void 0;
const mongoose = __importStar(require("mongoose"));
const defaults_1 = require("../constants/defaults");
const enum_sort_order_1 = require("../constants/enum.sort.order");
const options_1 = require("../constants/options");
const type_sort_1 = require("../constants/type.sort");
class ExpressRequestMongooseUtil {
    constructor(request) {
        this._request = request;
    }
    requestArgs(ignore = []) {
        const args = Object.assign(Object.assign(Object.assign({}, ExpressRequestMongooseUtil.objectToArgs(this._request.query, ignore)), ExpressRequestMongooseUtil.objectToArgs(this._request.params, ignore)), ExpressRequestMongooseUtil.objectToArgs(this._request.body, ignore));
        return args;
    }
    static objectToArgs(obj, ignore = []) {
        return Object.keys(obj).reduce((args, key) => {
            if (options_1.OPTIONS[key]) {
                return args;
            }
            return Object.assign(Object.assign({}, args), { [key]: obj[key] });
        }, {});
    }
    requestOptions(ignore = []) {
        const options = Object.assign(Object.assign(Object.assign({}, ExpressRequestMongooseUtil.objectToMongooseOptions(this._request.query, ignore)), ExpressRequestMongooseUtil.objectToMongooseOptions(this._request.params, ignore)), ExpressRequestMongooseUtil.objectToMongooseOptions(this._request.body, ignore));
        return options;
    }
    static objectToMongooseOptions(obj, ignore = []) {
        return Object.keys(obj).reduce((options, key) => {
            if (ignore.includes(key)) {
                return options;
            }
            if (Object.values(options_1.OPTIONS).includes(key)) {
                return Object.assign(Object.assign({}, options), ExpressRequestMongooseUtil.mapRequestArgToMongoose(obj, key));
            }
            return options;
        }, {});
    }
    static mapRequestArgToMongoose(obj, key) {
        var _a;
        switch (key) {
            case options_1.OPTIONS.PAGE:
            case options_1.OPTIONS.PAGE_SIZE:
                const limit = parseInt(obj[options_1.OPTIONS.PAGE_SIZE] || defaults_1.DEFAULTS.PAGE_SIZE);
                return {
                    limit,
                    skip: parseInt(obj[options_1.OPTIONS.PAGE] || defaults_1.DEFAULTS.PAGE) * limit,
                };
            case options_1.OPTIONS.SORT_BY:
            case options_1.OPTIONS.SORT_ORDER:
                return {
                    sort: {
                        [obj[options_1.OPTIONS.SORT_BY] || defaults_1.DEFAULTS.SORT_BY]: ((_a = obj[options_1.OPTIONS.SORT_ORDER]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) === type_sort_1.TYPE_SORT.DESC
                            ? enum_sort_order_1.ENUM_SORT_ORDER.DESC
                            : enum_sort_order_1.ENUM_SORT_ORDER.ASC,
                    },
                };
            default:
                return { [key]: obj[key] };
        }
    }
    requestFilterQuery() {
        return Object.assign(Object.assign(Object.assign({}, ExpressRequestMongooseUtil.objectToFilterQuery(this._request.query)), ExpressRequestMongooseUtil.objectToFilterQuery(this._request.params)), ExpressRequestMongooseUtil.objectToFilterQuery(this._request.body));
    }
    queryFilterQuery() {
        return ExpressRequestMongooseUtil.objectToFilterQuery(this._request.query);
    }
    paramsFilterQuery() {
        return ExpressRequestMongooseUtil.objectToFilterQuery(this._request.params);
    }
    bodyFilterQuery() {
        return ExpressRequestMongooseUtil.objectToFilterQuery(this._request.body);
    }
    static objectToFilterQuery(obj) {
        return Object.keys(obj).reduce((query, key) => {
            const useKey = key === 'id' ? '_id' : key;
            if (useKey === 'ids') {
                query._id = ExpressRequestMongooseUtil.in(obj[key]);
                return query;
            }
            if (!Object.values(options_1.OPTIONS).includes(key)) {
                query[useKey] = obj[key];
            }
            return query;
        }, {});
    }
    queryUpdateQuery() {
        return ExpressRequestMongooseUtil.objectToUpdateQuery(this._request.query);
    }
    bodyUpdateQuery() {
        return ExpressRequestMongooseUtil.objectToUpdateQuery(this._request.body);
    }
    static objectToUpdateQuery(obj) {
        return Object.keys(obj).reduce((query, key) => {
            if (!Object.values(options_1.OPTIONS).includes(key)) {
                query[key] = obj[key];
            }
            return query;
        }, {});
    }
    static in(ids) {
        const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));
        return { $in: objectIds };
    }
}
exports.ExpressRequestMongooseUtil = ExpressRequestMongooseUtil;
//# sourceMappingURL=ExpressRequestMongooseUtil.js.map