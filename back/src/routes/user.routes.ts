import { FastifyInstance } from 'fastify'
import { authenticateUser } from '../middlewares/authUser'
import { loginController, signUpController, logoutController } from './'

export async function userRoutes(app: FastifyInstance) {
  app.post('/signup', signUpController.handle)
  app.post('/login', loginController.handle)
  app.post('/logout', { preHandler: authenticateUser }, logoutController.handle)
  app.get('/me', { preHandler: authenticateUser }, (request, reply) => {
    reply.send({ message: 'ok' })
  })

  app.decorateRequest('user', null)
}
