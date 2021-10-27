export interface InterfacePopulateOptions {
    rootModel?: string;
    rootModelByIndex?: string[];
    pathToModels?: string;
    serialize?: boolean;
}
export declare class Hydrator {
    static populate(data: any | any[], fields?: string[], options?: InterfacePopulateOptions): Promise<any>;
    static populateManyByIndex(data: any[], fields?: string[], options?: InterfacePopulateOptions): Promise<any[]>;
    static populateMany(data: any[], fields?: string[], options?: InterfacePopulateOptions): Promise<any[]>;
    static populateOne(data: any, fields?: string[], options?: InterfacePopulateOptions): Promise<any>;
    static hydrateNode(node: any, data: any): Promise<any>;
    static hydrateNodeDataArray(node: any, data: any[]): Promise<any[]>;
    static hydrateNodeData(node: any, data: any): Promise<any>;
    static fieldMap(pathToModels: any, key: any, model: any, fields?: any[]): {
        fieldKey: any;
        model: any;
        serializer: any;
        fields: any[];
    };
    static groupFields(fields: string[]): {};
}
