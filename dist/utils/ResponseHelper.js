"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
const node_utils_1 = require("@agrippa-io/node-utils");
class ResponseHelper {
    static success(response, message, useCaseResult, additionalInfo = null) {
        node_utils_1.Logger.info(message);
        response.send(useCaseResult);
    }
    static internalServerError(response, error, useCaseResult, additionalInfo) {
        // TODO - Figure out what to perform the rest of the Arguments
        node_utils_1.Logger.error(error);
        response.status(error.status).send(error);
    }
}
exports.ResponseHelper = ResponseHelper;
//# sourceMappingURL=ResponseHelper.js.map