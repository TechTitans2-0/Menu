import { FastifyInstance } from 'fastify'
// import { authenticateUser } from '../middlewares/authUser'
import { orderController } from '../modules/order/services'
import { authUser } from '../middlewares/test'

export async function orderRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: authUser }, orderController.create)
  app.get('/', orderController.findAll)
  app.get('/:id', orderController.findById)
  app.get('/client/:clientId', orderController.findClientById)
  app.put('/:id', orderController.update)
  app.delete('/:id', orderController.delete)
}
