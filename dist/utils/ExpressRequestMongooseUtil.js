"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressRequestMongooseUtil = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants");
class ExpressRequestMongooseUtil {
    // Class Properties
    _request;
    constructor(request) {
        this._request = request;
    }
    requestArgs(ignore = []) {
        const args = {
            ...ExpressRequestMongooseUtil.objectToArgs(this._request.query, ignore),
            ...ExpressRequestMongooseUtil.objectToArgs(this._request.params, ignore),
            ...ExpressRequestMongooseUtil.objectToArgs(this._request.body, ignore),
        };
        return args;
    }
    static objectToArgs(obj, ignore = []) {
        return Object.keys(obj).reduce((args, key) => {
            if (constants_1.OPTIONS[key]) {
                return args;
            }
            return {
                ...args,
                [key]: obj[key],
            };
        }, {});
    }
    requestOptions(ignore = []) {
        const options = {
            ...ExpressRequestMongooseUtil.objectToMongooseOptions(this._request.query, ignore),
            ...ExpressRequestMongooseUtil.objectToMongooseOptions(this._request.params, ignore),
            ...ExpressRequestMongooseUtil.objectToMongooseOptions(this._request.body, ignore),
        };
        return options;
    }
    static objectToMongooseOptions(obj, ignore = []) {
        return Object.keys(obj).reduce((options, key) => {
            if (ignore.includes(key)) {
                return options;
            }
            if (Object.values(constants_1.OPTIONS).includes(key)) {
                return {
                    ...options,
                    ...ExpressRequestMongooseUtil.mapRequestArgToMongoose(obj, key),
                };
            }
            return options;
        }, {});
    }
    static mapRequestArgToMongoose(obj, key) {
        switch (key) {
            case constants_1.OPTIONS.PAGE:
            case constants_1.OPTIONS.PAGE_SIZE:
                const page = parseInt(obj[constants_1.OPTIONS.PAGE] || constants_1.DEFAULTS.PAGE);
                const limit = parseInt(obj[constants_1.OPTIONS.PAGE_SIZE] || constants_1.DEFAULTS.PAGE_SIZE);
                return {
                    page,
                    pageSize: limit,
                    limit,
                    skip: page * limit,
                };
            case constants_1.OPTIONS.SORT_BY:
            case constants_1.OPTIONS.SORT_ORDER:
                return {
                    sort: {
                        [obj[constants_1.OPTIONS.SORT_BY] || constants_1.DEFAULTS.SORT_BY]: obj[constants_1.OPTIONS.SORT_ORDER]?.toUpperCase() === constants_1.TYPE_SORT.DESC
                            ? constants_1.ENUM_SORT_ORDER.DESC
                            : constants_1.ENUM_SORT_ORDER.ASC,
                    },
                };
            default:
                return { [key]: obj[key] };
        }
    }
    requestFilterQuery() {
        return {
            ...ExpressRequestMongooseUtil.objectToFilterQuery(this._request.query),
            ...ExpressRequestMongooseUtil.objectToFilterQuery(this._request.params),
            ...ExpressRequestMongooseUtil.objectToFilterQuery(this._request.body),
        };
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
    querySort() {
        return ExpressRequestMongooseUtil.objectToSortQuery(this._request.query);
    }
    static objectToFilterQuery(obj) {
        return Object.keys(obj).reduce((query, key) => {
            const useKey = key === 'id' ? '_id' : key;
            if (useKey === 'ids') {
                query._id = ExpressRequestMongooseUtil.in(obj[key]);
                return query;
            }
            if (!Object.values(constants_1.OPTIONS).includes(key)) {
                query[useKey] = obj[key];
            }
            return query;
        }, {});
    }
    static objectToSortQuery(obj) {
        const sortBy = obj.sortBy ?? 'createdAt';
        const sortOrder = obj.sortOrder ?? 'asc';
        const sortOrderValue = sortOrder.toLowerCase() === 'asc' ? 1 : -1;
        return {
            [sortBy]: sortOrderValue,
        };
    }
    queryUpdateQuery() {
        return ExpressRequestMongooseUtil.objectToUpdateQuery(this._request.query);
    }
    bodyUpdateQuery() {
        return ExpressRequestMongooseUtil.objectToUpdateQuery(this._request.body);
    }
    static objectToUpdateQuery(obj) {
        return Object.keys(obj).reduce((query, key) => {
            if (!Object.values(constants_1.OPTIONS).includes(key)) {
                query[key] = obj[key];
            }
            return query;
        }, {});
    }
    static in(ids) {
        const objectIds = ids.map((id) => new mongoose_1.default.Types.ObjectId(id));
        return { $in: objectIds };
    }
}
exports.ExpressRequestMongooseUtil = ExpressRequestMongooseUtil;
