import { FastifyInstance } from 'fastify'
import { authenticateUser } from '../middlewares/authUser'
import { userController } from '../modules/user/services/'

export async function userRoutes(app: FastifyInstance) {
  app.post('/signup', userController.signUp)
  app.post('/login', userController.login)
  app.post('/logout', { preHandler: authenticateUser }, userController.logout)
  app.get('/:id', userController.findById)
  app.get('/email/:email', userController.findByEmail)
  app.get('/', userController.findAll)
  app.put('/:id', userController.update)
  app.delete('/:id', userController.delete)

  app.decorateRequest('user', null)
}
