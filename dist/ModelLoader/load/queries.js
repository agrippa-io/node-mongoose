import { Logger } from '@agrippa-io/node-utils';
export function loadQueries({ path, modelName, schema, isDefaultModule = true }) {
    try {
        const _path = `${path}/${modelName}/queries`;
        const queries = isDefaultModule
            ? require(_path).default
            : require(_path);
        Object.keys(queries).forEach((queryName) => {
            Logger.info(`${modelName} - Query[${queryName}]`);
            schema.query[queryName] = queries[queryName];
        });
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            Logger.error(`Failed to load queries for Schema['${modelName}']`);
            Logger.error(err);
        }
    }
    return schema;
}
