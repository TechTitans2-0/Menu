import { FastifyInstance } from 'fastify'
// import { authenticateUser } from '../middlewares/authUser'
import { productsController } from '../modules/products/services'
import { authUserMidlle } from '../middlewares/authUserMiddle'

export async function productRoutes(app: FastifyInstance) {
  app.post('/', productsController.create)
  app.get('/', productsController.findAll)
  app.get('/:id', { preHandler: authUserMidlle }, productsController.findById)
  app.get(
    '/name/:name',
    { preHandler: authUserMidlle },
    productsController.findByName,
  )
  app.get(
    '/category/:category',
    { preHandler: authUserMidlle },
    productsController.findByCategory,
  )
  app.put('/:id', { preHandler: authUserMidlle }, productsController.update)
  app.delete('/:id', { preHandler: authUserMidlle }, productsController.delete)
}
