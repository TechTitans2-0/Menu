import fastify from 'fastify'
import { env } from './env'
import { userRoutes } from './routes/user.routes'
import cookie from '@fastify/cookie'

export const server = fastify()

server.register(cookie)

server.register(userRoutes, { prefix: '/users' })

server
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`Server running on port ${env.PORT}`)
  })
