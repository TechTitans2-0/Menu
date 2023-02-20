import { z } from 'zod'

export const createUserSchema = z.object({
  name: z
    .string({
      required_error: 'O nome é obrigatório',
    })
    .min(3, { message: 'O nome deve ter pelo menos 2 caracteres' })
    .max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),
  email: z
    .string({
      required_error: 'O email é obrigatório',
    })
    .email({
      message: 'O email deve ser válido',
    }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 2 caracteres' })
    .max(50, { message: 'A senha deve ter no máximo 50 caracteres' }),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
})

export const findByIdSchema = z.object({
  id: z.string().uuid(),
})

export const findByEmailSchema = z.object({
  email: z.string().email(),
})
