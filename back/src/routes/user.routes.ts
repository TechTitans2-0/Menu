import { FastifyInstance } from 'fastify'
import { authenticateUser } from '../middlewares/authUser'
import { loginController, signUpController } from './'

export async function userRoutes(server: FastifyInstance) {
  server.post('/', signUpController.handle)
  server.post('/login', loginController.handle)
  server.get('/me', { preHandler: [authenticateUser] }, (request, reply) => {
    reply.send({ message: 'ok' })
  })
}
