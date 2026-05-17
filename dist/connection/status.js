"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = exports.MONGO_STATUS = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.MONGO_STATUS = {
    DISCONNECTED: 0,
    CONNECTED: 1,
    CONNECTING: 2,
    DISCONNECTING: 3,
};
function status() {
    return mongoose_1.default?.connection?.readyState ?? exports.MONGO_STATUS.DISCONNECTED;
}
exports.status = status;
