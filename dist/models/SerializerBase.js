"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializerBase = void 0;
const constants_1 = require("../constants");
class SerializerBase {
    static get fields() {
        const aliasMap = this.associationAliases;
        return [
            ...constants_1.MONGOOSE_FIELDS,
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
exports.SerializerBase = SerializerBase;
