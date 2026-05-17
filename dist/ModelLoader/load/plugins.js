"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlugins = void 0;
const fs = __importStar(require("fs"));
const node_utils_1 = require("@agrippa-io/node-utils");
const mongoose_batches_1 = __importDefault(require("mongoose-batches"));
function loadPlugins({ path, modelName, schema, }) {
    try {
        // Load default plugins
        schema.plugin(mongoose_batches_1.default);
        // Load Schema-specific plugins
        const pluginsPath = `${path}/${modelName}/plugins`;
        if (fs.existsSync(pluginsPath)) {
            const filenames = fs
                .readdirSync(pluginsPath)
                .map((filename) => filename.replace('.js', ''));
            for (const filename of filenames) {
                try {
                    const pluginConfig = require(`${path}/${modelName}/plugins/${filename}`)
                        .default;
                    const { plugin, options } = pluginConfig;
                    if (plugin) {
                        node_utils_1.Logger.info(`${modelName} - Plugin[${filename}]`);
                        schema.plugin(plugin, options || {});
                    }
                }
                catch (err) {
                    // do nothing
                }
            }
        }
    }
    catch (err) {
        if (!err.message.includes('Cannot find module')) {
            node_utils_1.Logger.error(`Failed to load plugins for Schema['${modelName}']`);
            node_utils_1.Logger.error(err);
        }
    }
    return schema;
}
exports.loadPlugins = loadPlugins;
