"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = void 0;
const node_utils_1 = require("@agrippa-io/node-utils");
const mongoose_1 = __importDefault(require("mongoose"));
async function disconnect() {
    node_utils_1.Logger.info('Mongo - Disconnecting...');
    await mongoose_1.default.connection.close();
    node_utils_1.Logger.info('Mongo - Disconnected');
}
exports.disconnect = disconnect;
