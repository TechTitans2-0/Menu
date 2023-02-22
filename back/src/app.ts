import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import sensible from '@fastify/sensible'
import { userRoutes } from './routes/user.routes'
import { productRoutes } from './routes/product.routes'
import { clientRoutes } from './routes/client.routes'
import { orderRoutes } from './routes/order.routes'
import { env } from './env'

const app = fastify()

// Plugins
app.register(cors)
app.register(jwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1h',
    iss: env.JWT_ISSUER,
  },
})

app.register(sensible)
// Routes
app.register(userRoutes, { prefix: '/api/users' })
app.register(productRoutes, { prefix: '/api/products' })
app.register(clientRoutes, { prefix: '/api/clients' })
app.register(orderRoutes, { prefix: '/api/orders' })

export default app
