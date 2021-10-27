import { Schema } from 'mongoose';
export declare const VIRTUALS_MONGOOSE: {
    GET: string;
    SET: string;
};
export declare function loadVirtuals(path: string, modelName: string, schema: Schema, isDefaultModule?: boolean): Schema<any, import("mongoose").Model<any, any, any, any>, {}>;
