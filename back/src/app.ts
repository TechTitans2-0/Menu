import fastify from 'fastify'
import { userRoutes } from './routes/user.routes'
import { productRoutes } from './routes/product.routes'

const app = fastify()

app.register(userRoutes, { prefix: '/api/users' })
app.register(productRoutes, { prefix: '/api/products' })

export default app
