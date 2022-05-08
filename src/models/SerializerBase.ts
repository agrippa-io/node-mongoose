import { MONGOOSE_FIELDS } from '../constants'

export class SerializerBase {
  static get fields() {
    const aliasMap = this.associationAliases

    return [
      ...MONGOOSE_FIELDS,
      ...this.properties,
      ...this.associations,
      ...Object.values(aliasMap).reduce((allAliases, propAliases) => {
        return [...allAliases, ...propAliases]
      }, []),
    ]
  }

  static get properties(): string[] {
    return []
  }

  static get associations(): string[] {
    return []
  }

  static get associationAliases(): Record<string, string> {
    return {}
  }

  static get aliasOrigin(): Record<string, string> {
    return {}
  }

  static get associationTypeMap(): Record<string, string> {
    return {}
  }
}
