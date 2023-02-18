import fastify from 'fastify'
import { userRoutes } from './routes/user.routes'

const app = fastify()

app.register(userRoutes, { prefix: '/users' })

export default app
