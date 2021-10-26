"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("@agrippa-io/node-utils/src");
const mongoose = __importStar(require("mongoose"));
const status_1 = __importStar(require("./status"));
function connect(props) {
    return __awaiter(this, void 0, void 0, function* () {
        if (status_1.default() === status_1.MONGO_STATUS.CONNECTED) {
            return mongoose;
        }
        const { uri, options } = props;
        yield mongoose.connect(uri, options);
        // Handle Connection Events
        mongoose.connection.on('error', (err) => {
            src_1.Logger.error('MongoDB Error', err);
        });
        mongoose.connection.on('fullsetup', (data) => {
            src_1.Logger.info('MongoDB - Connected to Primary and at least one secondary Replica', data);
        });
        mongoose.connection.on('all', (data) => {
            src_1.Logger.info('MongoDB - Connected to Primary and all secondary Replica', data);
        });
        mongoose.connection.on('disconnected', () => {
            src_1.Logger.info('MongoDB - Disconnected');
        });
        mongoose.connection.on('reconnected', () => {
            src_1.Logger.info('MongoDB - Reconnected');
        });
        mongoose.connection.on('reconnectFailed', (err) => {
            src_1.Logger.error('MongoDB - Reconnection Failed - Maximum reconnectionTries reach', err);
        });
        return mongoose;
    });
}
exports.default = connect;
//# sourceMappingURL=connect.js.map