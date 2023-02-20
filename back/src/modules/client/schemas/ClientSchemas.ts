import { z } from 'zod'

export const createClientSchema = z.object({
  name: z
    .string({
      required_error: 'O nome é obrigatório',
    })
    .min(3, { message: 'O nome deve ter pelo menos 2 caracteres' })
    .max(50, { message: 'O nome deve ter no máximo 50 caracteres' }),
  cpf: z
    .string({
      required_error: 'O cpf é obrigatório',
    })
    .refine(
      async (value) => {
        if (!/^\d{11}$/.test(value)) return false

        const cpfNumbers = value.split('').map(Number)

        let sum = 0
        for (let i = 0; i < 9; i++) {
          sum += cpfNumbers[i] * (10 - i)
        }

        let checkDigit1 = sum % 11
        if (checkDigit1 >= 2) {
          checkDigit1 = 11 - checkDigit1
        } else {
          checkDigit1 = 0
        }

        sum = 0
        for (let i = 0; i < 10; i++) {
          sum += cpfNumbers[i] * (11 - i)
        }

        let checkDigit2 = sum % 11
        if (checkDigit2 >= 2) {
          checkDigit2 = 11 - checkDigit2
        } else {
          checkDigit2 = 0
        }

        return cpfNumbers[9] === checkDigit1 && cpfNumbers[10] === checkDigit2
      },
      { message: 'CPF inválido' },
    ),

  email: z.string({ required_error: 'O email é obrigatorio' }).email(),
  password: z.string().min(6).max(15),
  birthday: z
    .string()
    .refine(
      async (value) => {
        const date = new Date(value)
        const minDate = new Date('1900-01-01')
        const maxDate = new Date()
        if (date <= minDate || date > maxDate) {
          return false
        }
        return date
      },
      { message: 'Data inválida' },
    )
    .transform((value) => new Date(value)),
  phone: z.string().min(10).max(11),
  orders: z.array(z.string()).optional(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(15),
})

export const findByIdSchema = z.object({
  id: z.string().uuid(),
})

export const findByNameSchema = z.object({
  name: z.string(),
})

export const findByEmailSchema = z.object({
  email: z.string().email(),
})

export const findByCpfSchema = z.object({
  cpf: z.string(),
})
