import { FastifyInstance } from 'fastify'
// import { authenticateUser } from '../middlewares/authUser'
import { orderController } from '../modules/order/services'
import { authUserMidlle } from '../middlewares/authUserMiddle'

export async function orderRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: authUserMidlle }, orderController.create)
  app.get('/', orderController.findAll)
  app.get('/:id', orderController.findById)
  app.get('/client/:clientId', orderController.findClientById)
  app.put('/:id', orderController.update)
  app.delete('/:id', orderController.delete)
}
