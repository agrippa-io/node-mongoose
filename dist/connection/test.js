"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const status_1 = require("./status");
function test() {
    return (0, status_1.status)() === status_1.MONGO_STATUS.CONNECTED;
}
exports.test = test;
