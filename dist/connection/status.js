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
    var _a, _b;
    return (_b = (_a = mongoose_1.default === null || mongoose_1.default === void 0 ? void 0 : mongoose_1.default.connection) === null || _a === void 0 ? void 0 : _a.readyState) !== null && _b !== void 0 ? _b : exports.MONGO_STATUS.DISCONNECTED;
}
exports.status = status;
