export interface ILoadStatics {
    path: string;
    modelName: string;
    schema: any;
}
export declare function loadStatics({ path, modelName, schema, }: ILoadStatics): any;
