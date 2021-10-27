import { ErrorAPI } from '@agrippa-io/node-errors';
import express from 'express';
export declare class ResponseHelper {
    static success(response: express.Response, message: string, useCaseResult: any, additionalInfo?: any): void;
    static internalServerError(response: express.Response, error: ErrorAPI, useCaseResult: any, additionalInfo: any): void;
}
