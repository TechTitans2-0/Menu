import { ZodError } from 'zod'

export const zodErrorMap = (fieldErrors: any) => {
  if (Array.isArray(fieldErrors)) {
    return fieldErrors.map((fieldError: any) => {
      const { message, code } = fieldError
      const field = fieldError.path.join('.')
      return { field, message, code }
    })
  } else {
    return [{ message: fieldErrors }]
  }
}

export function handleError(err: any, res: any) {
  if (err instanceof ZodError) {
    const errors = zodErrorMap(err.issues)
    res.status(400).send(errors)
  } else {
    res.status(400).send(err)
  }
}
