import fastify from 'fastify'
import { userRoutes } from './routes/user.routes'
import { productRoutes } from './routes/product.routes'

const app = fastify()

app.register(userRoutes, { prefix: '/users' })
app.register(productRoutes, { prefix: '/products' })

export default app
