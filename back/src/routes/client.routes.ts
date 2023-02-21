import { FastifyInstance } from 'fastify'
import { clientController } from '../modules/client/services'
import { authUser } from '../middlewares/test'

export async function clientRoutes(app: FastifyInstance) {
  app.post('/signup', clientController.signUp)
  app.post('/login', clientController.login)
  app.post('/logout', { preHandler: authUser }, clientController.logout)
  app.get('/', clientController.findAll)
  app.get('/:id', clientController.findById)
  app.get('/name/:name', clientController.findByName)
  app.get('/email/:email', clientController.findByEmail)
  app.get('/cpf/:cpf', clientController.findByCpf)
  app.put('/:id', clientController.update)
  app.delete('/:id', clientController.delete)
}
