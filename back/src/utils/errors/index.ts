import { ZodError } from 'zod'
import { FastifyReply } from 'fastify'

export function handleError(err: any, reply: FastifyReply) {
  if (err instanceof ZodError) {
    const zodErrorMap = (fieldErrors: any) => {
      if (Array.isArray(fieldErrors)) {
        return fieldErrors.map(
          ({
            message,
            code,
            path,
          }: {
            message: string
            code?: string
            path: string[]
          }) => {
            const field = path.join('.')
            return { field, message, code }
          },
        )
      } else {
        return [{ message: fieldErrors }]
      }
    }

    const errors = zodErrorMap(err.issues)
    reply.code(400).send(errors)
  } else {
    reply.code(400).send(err)
  }
}
