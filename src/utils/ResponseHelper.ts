import ErrorAPI from '@agrippa-io/node-errors/src/ErrorAPI'
import Logger from '@agrippa-io/node-utils/src/Logger'
import express from 'express'

export default class ResponseHelper {
  static success(response: express.Response, message: string, useCaseResult: any, additionalInfo: any = null) {
    Logger.info(message)
    response.send(useCaseResult)
  }

  static internalServerError(response: express.Response, error: ErrorAPI, useCaseResult: any, additionalInfo: any) {
    // TODO - Figure out what to perform the rest of the Arguments
    Logger.error(error)
    response.status(error.status).send(error)
  }
}
