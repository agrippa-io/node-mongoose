export declare const UNHANDLED_SERIALIZER_KEYS: {
    Source: string;
    Object: string;
    IndirectObject: string;
    Context: string;
    Ignore: string;
};
export interface InterfaceSerializerOptions {
    pathToModels?: string;
    serializeProperties?: string[];
    serializeByIndex?: string[] | string[][];
}
export interface IntefaceSerializeByIndex {
    pathToModels?: string;
    serializeByIndex?: string[] | string[][];
}
export interface InterfaceSerializeByIndexModel {
    pathToModels: string;
    serializeByIndex: string[];
}
export interface InterfaceSerializeByIndexFieldsOptions {
    serializeByIndex: string[][];
}
export declare class Serializer {
    static serialize(options: InterfaceSerializerOptions, data: any): any | any[];
    static serializeByIndex(options: IntefaceSerializeByIndex, data: any[]): any[];
    static serializeByIndexModel(options: InterfaceSerializeByIndexModel, data: any[]): any[];
    static serializeByIndexFields(options: InterfaceSerializeByIndexFieldsOptions, data: any[]): any[];
    static serializeArray(serializeProperties: string[], data: any[]): any[];
    static serializeObject(serializeProperties: string[], obj: any): any;
    static getSerializer(pathToModels: string, model: string): any;
}
