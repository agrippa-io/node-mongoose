import mongoose from 'mongoose';
export declare function loadModel<Document extends mongoose.Document<any, any>>(path: string, modelName: string): mongoose.Model<Document, {}, {}, {}, mongoose.IfAny<Document, any, mongoose.Document<unknown, {}, Document> & mongoose.Require_id<Document>>, any>;
