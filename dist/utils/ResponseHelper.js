import { Logger } from '@agrippa-io/node-utils';
export class ResponseHelper {
    static success(response, message, useCaseResult, additionalInfo = null) {
        Logger.info(message);
        response.send(useCaseResult);
    }
    static internalServerError(response, error, useCaseResult, additionalInfo) {
        // TODO - Figure out what to perform the rest of the Arguments
        Logger.error(error);
        response.status(error.status).send(error);
    }
}
