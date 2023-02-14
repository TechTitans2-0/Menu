import { FastifyReply, FastifyRequest } from 'fastify'
import { loginUserSchema } from '../schemas'
import { LoginUseCase } from '../useCases/'

class LoginController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { password, email } = loginUserSchema(request.body).data

      const loginUseCase = new LoginUseCase()

      const user = await loginUseCase.execute({
        email,
        password,
      })

      return reply.status(200).send(user)
    } catch (error) {
      return reply.status(400).send(error)
    }
  }
}

export { LoginController }
