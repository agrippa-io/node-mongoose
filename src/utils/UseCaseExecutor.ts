import * as path from 'path'

import UseCase from '@agrippa-io/node-usecase/src/UseCase'
import Logger from '@agrippa-io/node-utils/src/Logger'
import express from 'express'

import { Document } from 'mongoose'

import ExpressRequestMongooseUtil from './ExpressRequestMongooseUtil'
import Hydrator from './Hydrator'
import ResponseHelper from './ResponseHelper'
import Serializer from './Serializer'

export interface InterfaceRenderOptions {
  rootModel?: string
  rootModelByIndex?: string[]
  serializeProperties?: string[]
  serializeByIndex?: string[][]
  hydrateFields?: string[]
  additionalInfo?: any
  transform?: boolean
  pathToModels?: string
}

export default class UseCaseExecutor {
  static async hydrate(
    request: express.Request,
    options: InterfaceRenderOptions,
    result: any
  ) {
    const { rootModel, rootModelByIndex } = options
    const queryBuilder: ExpressRequestMongooseUtil<Document> = new ExpressRequestMongooseUtil<Document>(
      request
    )
    const queryOptions: any = queryBuilder.requestOptions()

    const fields: string[] = queryOptions.fields || []

    return await Hydrator.populate(result, fields, {
      rootModel,
      rootModelByIndex,
    })
  }

  static async renderUseCase(
    UseCase: UseCase,
    request: express.Request,
    response: express.Response,
    options: InterfaceRenderOptions
  ) {
    const info: any = options.additionalInfo || {}

    if (UseCase.success) {
      const populated: any = await this.hydrate(
        request,
        options,
        UseCase.result
      )
      let transformed: any

      if (options.transform) {
        const pathToModels =
          options.pathToModels || path.join(__dirname, '../../models')
        const serializer = Serializer.getSerializer(
          pathToModels,
          options.rootModel
        )

        transformed = await serializer?.transform?.(populated)
      }

      ResponseHelper.success(
        response,
        'Success!',
        transformed || populated,
        info
      )
    } else {
      ResponseHelper.internalServerError(
        response,
        UseCase.error,
        UseCase.result,
        info
      )
    }
  }

  async execute<UseCaseClass extends UseCase, UseCaseArguments>(
    useCaseClass: new (UseCaseArguments) => UseCaseClass,
    useCaseArguments: UseCaseArguments,
    request: express.Request,
    response: express.Response,
    options: InterfaceRenderOptions
  ) {
    Logger.info(`${useCaseClass.name} :: ${JSON.stringify(useCaseArguments)}`)

    const useCase = new useCaseClass(useCaseArguments)

    await useCase.perform()

    await UseCaseExecutor.renderUseCase(useCase, request, response, options)
  }
}
