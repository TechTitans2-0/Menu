import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
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

export const updateUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(50),
})
