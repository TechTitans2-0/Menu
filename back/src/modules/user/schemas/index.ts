import { z } from 'zod'

export function createUserSchema(data: unknown) {
  const schema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const user = schema.safeParse(data)

  if (user.success === false) {
    throw new Error()
  }

  return user
}

export function loginUserSchema(data: unknown) {
  const schema = z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  })

  const user = schema.safeParse(data)

  if (user.success === false) {
    throw new Error()
  }

  return user
}
