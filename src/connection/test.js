'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.test = test
var status_1 = require('src/connection/status')
function test() {
    return (0, status_1.status)() === status_1.MONGO_STATUS.CONNECTED
}
