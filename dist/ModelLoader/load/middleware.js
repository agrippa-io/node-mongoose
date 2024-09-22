import { ErrorMissingMongooseHookRegistration } from '@agrippa-io/node-errors';
import { Logger } from '@agrippa-io/node-utils';
export const HOOKS_MONGOOSE = {
    PRE: 'pre',
    POST: 'post',
};
export function loadMiddleware({ path, modelName, schema, options = {}, isDefaultModule = true }) {
    try {
        const _path = `${path}/${modelName}/middleware`;
        const middleware = isDefaultModule
            ? require(_path).default
            : require(_path);
        for (const key of Object.keys(middleware)) {
            const [hook, methodName] = key.split('.');
            Logger.info(`${modelName} - Hook[${hook}][${methodName}]`);
            const handler = middleware[key];
            switch (hook) {
                case HOOKS_MONGOOSE.PRE:
                    schema.pre(methodName, options, handler);
                    break;
                case HOOKS_MONGOOSE.POST:
                    schema.post(methodName, options, handler);
                    break;
                default:
                    throw new ErrorMissingMongooseHookRegistration(`No hook registration for Schema.${hook}(${methodName}, handler)`);
            }
        }
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            Logger.error(`Failed to load middlewares for Schema['${modelName}']`);
            Logger.error(err);
        }
    }
    return schema;
}
