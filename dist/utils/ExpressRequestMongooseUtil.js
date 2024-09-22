import mongoose from 'mongoose';
import { DEFAULTS } from '../constants/defaults';
import { ENUM_SORT_ORDER } from '../constants/enum.sort.order';
import { OPTIONS } from '../constants/options';
import { TYPE_SORT } from '../constants/type.sort';
export class ExpressRequestMongooseUtil {
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
            if (OPTIONS[key]) {
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
            if (Object.values(OPTIONS).includes(key)) {
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
            case OPTIONS.PAGE:
            case OPTIONS.PAGE_SIZE:
                const page = parseInt(obj[OPTIONS.PAGE] || DEFAULTS.PAGE);
                const limit = parseInt(obj[OPTIONS.PAGE_SIZE] || DEFAULTS.PAGE_SIZE);
                return {
                    page,
                    pageSize: limit,
                    limit,
                    skip: page * limit,
                };
            case OPTIONS.SORT_BY:
            case OPTIONS.SORT_ORDER:
                return {
                    sort: {
                        [obj[OPTIONS.SORT_BY] || DEFAULTS.SORT_BY]: obj[OPTIONS.SORT_ORDER]?.toUpperCase() === TYPE_SORT.DESC
                            ? ENUM_SORT_ORDER.DESC
                            : ENUM_SORT_ORDER.ASC,
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
            if (!Object.values(OPTIONS).includes(key)) {
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
            if (!Object.values(OPTIONS).includes(key)) {
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
