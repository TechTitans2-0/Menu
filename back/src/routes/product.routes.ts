import { FastifyInstance } from 'fastify'
// import { authenticateUser } from '../middlewares/authUser'
import { productsController } from '../modules/products/services'

export async function productRoutes(app: FastifyInstance) {
  app.post('/', productsController.create)
  app.get('/', productsController.findAll)
  app.get('/:id', productsController.findById)
  app.get('/name/:name', productsController.findByName)
  app.get('/category/:category', productsController.findByCategory)
  app.put('/:id', productsController.update)
  app.delete('/:id', productsController.delete)
}
