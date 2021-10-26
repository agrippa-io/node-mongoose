"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
const Logger_1 = __importDefault(require("@agrippa-io/node-utils/src/Logger"));
class ResponseHelper {
    static success(response, message, useCaseResult, additionalInfo = null) {
        Logger_1.default.info(message);
        response.send(useCaseResult);
    }
    static internalServerError(response, error, useCaseResult, additionalInfo) {
        // TODO - Figure out what to perform the rest of the Arguments
        Logger_1.default.error(error);
        response.status(error.status).send(error);
    }
}
exports.ResponseHelper = ResponseHelper;
//# sourceMappingURL=ResponseHelper.js.map