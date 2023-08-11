
export function validateSchema(data, schema) {
  const err = schema.validate(data).error
  if (err) return err

  return false
}
