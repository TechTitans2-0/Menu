import fastify from 'fastify'
import { userRoutes } from './routes/user.routes'
import { productRoutes } from './routes/product.routes'
import { clientRoutes } from './routes/client.routes'

const app = fastify()

app.register(userRoutes, { prefix: '/api/users' })
app.register(productRoutes, { prefix: '/api/products' })
app.register(clientRoutes, { prefix: '/api/clients' })

export default app
