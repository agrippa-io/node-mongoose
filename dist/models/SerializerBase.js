import { MONGOOSE_FIELDS } from '../constants';
export class SerializerBase {
    static get fields() {
        const aliasMap = this.associationAliases;
        return [
            ...MONGOOSE_FIELDS,
            ...this.properties,
            ...this.associations,
            ...Object.values(aliasMap).reduce((allAliases, propAliases) => {
                return [...allAliases, ...propAliases];
            }, []),
        ];
    }
    static get properties() {
        return [];
    }
    static get associations() {
        return [];
    }
    static get associationAliases() {
        return {};
    }
    static get aliasOrigin() {
        return {};
    }
    static get associationTypeMap() {
        return {};
    }
}
