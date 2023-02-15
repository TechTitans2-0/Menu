import { FastifyReply, FastifyRequest } from 'fastify'
import { blacklist } from '../../../middlewares/authUser'

class LogoutController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const token = request.headers.authorization?.split(' ')[1]
      blacklist.push(token as string)
      return reply.send({ message: '👋 Logout successful' })
    } catch {
      return reply.status(401).send({ error: '⚠️ Internal error' })
    }
  }
}

export { LogoutController }
