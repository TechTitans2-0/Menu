import { FastifyInstance } from 'fastify'
import { authenticateUser } from '../middlewares/authUser'
import { clientController } from '../modules/client/services'

export async function clientRoutes(app: FastifyInstance) {
  app.post('/signup', clientController.signUp)
  app.post('/login', clientController.login)
  app.post('/logout', { preHandler: authenticateUser }, clientController.logout)
  app.get('/', clientController.findAll)
  app.get('/:id', clientController.findById)
  app.get('/name/:name', clientController.findByName)
  app.get(
    '/email/:email',
    { preHandler: authenticateUser },
    clientController.findByEmail,
  )
  app.get('/cpf/:cpf', clientController.findByCpf)
  app.put('/:id', { preHandler: authenticateUser }, clientController.update)
  app.delete('/:id', { preHandler: authenticateUser }, clientController.delete)

  app.decorateRequest('user', null)
}
