export const zodErrorMap = (fieldErrors: any) => {
  if (Array.isArray(fieldErrors)) {
    return fieldErrors.map((fieldError: any) => {
      const { message, code } = fieldError
      const field = fieldError.path.join('.')
      return { field, message, code }
    })
  } else {
    return [{ message: fieldErrors.message }]
  }
}
