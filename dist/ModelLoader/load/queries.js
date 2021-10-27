"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_utils_1 = require("@agrippa-io/node-utils");
exports.default = (path, modelName, schema, isDefaultModule = true) => {
    try {
        const _path = `${path}/${modelName}/queries`;
        const queries = isDefaultModule
            ? require(_path).default
            : require(_path);
        Object.keys(queries).forEach((queryName) => {
            node_utils_1.Logger.info(`${modelName} - Query[${queryName}]`);
            schema.query[queryName] = queries[queryName];
        });
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.error(`Failed to load queries for Schema['${modelName}']`);
            node_utils_1.Logger.error(err);
        }
    }
    return schema;
};
//# sourceMappingURL=queries.js.map