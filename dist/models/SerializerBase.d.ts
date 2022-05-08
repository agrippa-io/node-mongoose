export declare class SerializerBase {
    static get fields(): any[];
    static get properties(): string[];
    static get associations(): string[];
    static get associationAliases(): Record<string, string>;
    static get aliasOrigin(): Record<string, string>;
    static get associationTypeMap(): Record<string, string>;
}
