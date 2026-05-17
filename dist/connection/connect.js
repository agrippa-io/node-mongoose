"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const node_utils_1 = require("@agrippa-io/node-utils");
const mongoose_1 = __importDefault(require("mongoose"));
const status_1 = require("../connection/status");
async function connect(props) {
    if ((0, status_1.status)() === status_1.MONGO_STATUS.CONNECTED) {
        return mongoose_1.default;
    }
    const { uri, options } = props;
    await mongoose_1.default.connect(uri, options);
    // Handle Connection Events
    mongoose_1.default.connection.on('error', (err) => {
        node_utils_1.Logger.error('MongoDB Error', err);
    });
    mongoose_1.default.connection.on('connection', (data) => {
        node_utils_1.Logger.info('MongoDB - Connected', data);
    });
    mongoose_1.default.connection.on('fullsetup', (data) => {
        node_utils_1.Logger.info('MongoDB - Connected to Primary and at least one secondary Replica', data);
    });
    mongoose_1.default.connection.on('all', (data) => {
        node_utils_1.Logger.info('MongoDB - Connected to Primary and all secondary Replica', data);
    });
    mongoose_1.default.connection.on('disconnected', () => {
        node_utils_1.Logger.info('MongoDB - Disconnected');
    });
    mongoose_1.default.connection.on('reconnected', () => {
        node_utils_1.Logger.info('MongoDB - Reconnected');
    });
    mongoose_1.default.connection.on('reconnectFailed', (err) => {
        node_utils_1.Logger.error('MongoDB - Reconnection Failed - Maximum reconnectionTries reach', err);
    });
    return mongoose_1.default;
}
exports.connect = connect;
