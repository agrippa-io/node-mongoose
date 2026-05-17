'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ResponseHelper = void 0
var node_utils_1 = require('@agrippa-io/node-utils')
var ResponseHelper = /** @class */ (function () {
    function ResponseHelper() {
    }
    ResponseHelper.success = function (response, message, useCaseResult, additionalInfo) {
        if (additionalInfo === void 0) { additionalInfo = null }
        node_utils_1.Logger.info(message)
        response.send(useCaseResult)
    }
    ResponseHelper.internalServerError = function (response, error, useCaseResult, additionalInfo) {
        // TODO - Figure out what to perform the rest of the Arguments
        node_utils_1.Logger.error(error)
        response.status(error.status).send(error)
    }
    return ResponseHelper
}())
exports.ResponseHelper = ResponseHelper
