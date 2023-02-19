import { z } from 'zod'

export const createProductSchema = z.object({
  name: z
    .string({
      required_error: 'O nome é obrigatório',
    })
    .min(3, { message: 'O nome deve ter pelo menos 2 caracteres' })
    .max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),
  price: z.number({
    required_error: 'O preço é obrigatório',
  }),
  description: z
    .string()
    .min(6, { message: 'A descrição deve ter pelo menos 2 caracteres' })
    .max(50, { message: 'A descrição deve ter no máximo 50 caracteres' }),
  rating: z.number().min(0).max(5),
  category: z.string(),
})

export const findByIdSchema = z.object({
  id: z.string().uuid(),
})

export const findByNameSchema = z.object({
  name: z.string(),
})

export const findByCategorySchema = z.object({
  category: z.string(),
})
