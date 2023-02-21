import { FastifyInstance } from 'fastify'
import { authenticateUser } from '../middlewares/authUser'
import { userController } from '../modules/user/services/'

export async function userRoutes(app: FastifyInstance) {
  app.post('/signup', userController.signUp)
  app.post('/login', userController.login)
  app.post('/logout', { preHandler: authenticateUser }, userController.logout)
  app.post(
    '/admin/:id',
    { preHandler: authenticateUser },
    userController.turnAdmin,
  )
  app.get('/:id', { preHandler: authenticateUser }, userController.findById)
  app.get(
    '/email/:email',
    { preHandler: authenticateUser },
    userController.findByEmail,
  )
  app.get('/', userController.findAll)
  app.put('/:id', { preHandler: authenticateUser }, userController.update)
  app.delete('/:id', { preHandler: authenticateUser }, userController.delete)
}
