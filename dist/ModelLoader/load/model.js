import mongoose from 'mongoose';
import { loadSchema } from './schema';
export function loadModel(path, modelName) {
    const schema = loadSchema(path, modelName);
    return mongoose.model(modelName, schema);
}
