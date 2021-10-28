import express from 'express';
import mongoose from 'mongoose';
export interface InterfaceMongooseOptions {
    limit?: number;
    skip?: number;
    sort?: any;
    fields?: string[];
}
export declare class ExpressRequestMongooseUtil<T extends mongoose.Document> {
    _request: express.Request;
    constructor(request: express.Request);
    requestArgs(ignore?: string[]): any;
    static objectToArgs(obj: any, ignore?: string[]): any;
    requestOptions(ignore?: string[]): any;
    static objectToMongooseOptions(obj: any, ignore?: string[]): any;
    static mapRequestArgToMongoose(obj: any, key: string): any;
    requestFilterQuery(): mongoose.FilterQuery<T>;
    queryFilterQuery(): mongoose.FilterQuery<T>;
    paramsFilterQuery(): mongoose.FilterQuery<T>;
    bodyFilterQuery(): mongoose.FilterQuery<T>;
    static objectToFilterQuery(obj: any): any;
    queryUpdateQuery(): mongoose.UpdateQuery<T>;
    bodyUpdateQuery(): mongoose.UpdateQuery<T>;
    static objectToUpdateQuery(obj: any): any;
    static in(ids: string[]): {
        $in: mongoose.Types.ObjectId[];
    };
}
