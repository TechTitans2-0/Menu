import fastify from 'fastify'
import { userRoutes } from './routes/user.routes'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)

app.register(userRoutes, { prefix: '/users' })

export default app
