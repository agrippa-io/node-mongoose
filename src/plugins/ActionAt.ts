import capitalize from 'lodash/capitalize'

const SCHEMA_OPTION = {
  type: Date,
}

interface InterfaceActionAtOptions {
  action?: string
  field?: string
}

export default function ActionAt(
  schema,
  options: InterfaceActionAtOptions = {}
) {
  const action = options?.action || 'action'
  const field = options?.field || `${action}At`

  const schemaOption = {
    [field]: SCHEMA_OPTION,
  }

  schema.add(schemaOption)

  schema.methods[action] = () => {
    this[field] = new Date()
    return this
  }

  schema.methods[`remove${capitalize(action)}`] = () => {
    this[field] = null
    return this
  }
}
