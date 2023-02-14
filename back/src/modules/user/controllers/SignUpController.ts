import { FastifyReply, FastifyRequest } from 'fastify'
import { createUserSchema } from '../schemas'
import { SignUpUseCase } from '../useCases/'

class SignUpController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, password } = createUserSchema(request.body).data

      const signUpController = new SignUpUseCase()

      await signUpController.execute({
        name,
        email,
        password,
      })

      return reply.status(201).send({ name, email, password })
    } catch (error) {
      return reply.status(400).send(error)
    }
  }
}

export { SignUpController }
