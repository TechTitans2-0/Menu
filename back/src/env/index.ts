import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  DATABASE_URL: z.string(),
  DATABASE_URL_TEST: z.string(),
  PORT: z.number().default(3333),
  JWT_SECRET: z.string(),
  JWT_ISSUER: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Environment variables are not valid', _env.error.format())

  throw new Error('Environment variables are not valid')
}

export const env = _env.data

if (env.NODE_ENV === 'test') {
  env.DATABASE_URL = env.DATABASE_URL_TEST
}
