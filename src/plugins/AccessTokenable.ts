import capitalize from 'lodash/capitalize'
import { v4 as uuid } from 'uuid'

const SCHEMA_OPTION = {
  type: String,
  default: uuid,
  required: true,
}

export default function AccessTokenable(schema, options = {}) {
  const schemaField = options.field || 'accessToken'
  const schemaOption = {
    [schemaField]: SCHEMA_OPTION,
  }

  schema.add(schemaOption)

  schema.methods[`regenerate${capitalize(schemaField)}`] = () => {
    this[schemaField] = uuid()
    return this
  }
}
