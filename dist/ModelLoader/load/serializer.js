import { Logger } from '@agrippa-io/node-utils';
export function loadSerializer({ path, modelName, schema }) {
    try {
        const serializer = require(`${path}/${modelName}/serializer`).default;
        schema.statics.serializer = serializer;
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            Logger.warn(`Failed to attach Serializer for Schema['${modelName}']`);
            Logger.error(err);
        }
    }
    return schema;
}
