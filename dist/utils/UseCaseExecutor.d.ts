import { UseCase } from '@agrippa-io/node-usecase';
import express from 'express';
export interface InterfaceRenderOptions {
    rootModel?: string;
    rootModelByIndex?: string[];
    serializeProperties?: string[];
    serializeByIndex?: string[][];
    hydrateFields?: string[];
    additionalInfo?: any;
    transform?: boolean;
    pathToModels?: string;
}
export declare class UseCaseExecutor {
    static hydrate(request: express.Request, options: InterfaceRenderOptions, result: any): Promise<any>;
    static renderUseCase(UseCase: UseCase, request: express.Request, response: express.Response, options: InterfaceRenderOptions): Promise<void>;
    execute<UseCaseClass extends UseCase, UseCaseArguments>(useCaseClass: new (UseCaseArguments: any) => UseCaseClass, useCaseArguments: UseCaseArguments, request: express.Request, response: express.Response, options: InterfaceRenderOptions): Promise<void>;
}
