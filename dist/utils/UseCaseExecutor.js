import * as path from 'path';
import { Logger } from '@agrippa-io/node-utils';
import { ExpressRequestMongooseUtil } from './ExpressRequestMongooseUtil';
import { Hydrator } from './Hydrator';
import { ResponseHelper } from './ResponseHelper';
import { Serializer } from './Serializer';
export class UseCaseExecutor {
    static async hydrate(request, options, result) {
        const { rootModel, rootModelByIndex } = options;
        const queryBuilder = new ExpressRequestMongooseUtil(request);
        const queryOptions = queryBuilder.requestOptions();
        const fields = queryOptions.fields || [];
        return await Hydrator.populate(result, fields, {
            rootModel,
            rootModelByIndex,
        });
    }
    static async renderUseCase(UseCase, request, response, options) {
        const info = options.additionalInfo || {};
        if (UseCase.success) {
            const populated = await this.hydrate(request, options, UseCase.result);
            let transformed;
            if (options.transform) {
                const pathToModels = options.pathToModels || path.join(__dirname, '../../models');
                const serializer = Serializer.getSerializer(pathToModels, options.rootModel);
                transformed = await serializer?.transform?.(populated);
            }
            ResponseHelper.success(response, 'Success!', transformed || populated, info);
        }
        else {
            ResponseHelper.internalServerError(response, UseCase.error, UseCase.result, info);
        }
    }
    async execute(useCaseClass, useCaseArguments, request, response, options) {
        Logger.info(`${useCaseClass.name} :: ${JSON.stringify(useCaseArguments)}`);
        const useCase = new useCaseClass(useCaseArguments);
        await useCase.perform();
        await UseCaseExecutor.renderUseCase(useCase, request, response, options);
    }
}
