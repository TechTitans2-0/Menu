import { FastifyRequest, FastifyReply } from 'fastify'
import { userUseCase } from '.'
import {
  createUserSchema,
  loginSchema,
  findByEmailSchema,
  findByIdSchema,
} from '../schemas/UserSchemas'

class UserController {
  async signUp(req: FastifyRequest, res: FastifyReply) {
    try {
      const userData = createUserSchema.parse(req.body)

      const user = await userUseCase.signUp(userData)

      res.status(200).send(user)
    } catch (err) {
      // const errors = err.flatten().fieldErrors
      res.status(400).send(err)
    }
  }

  async login(req: FastifyRequest, res: FastifyReply) {
    try {
      const { email, password } = loginSchema.parse(req.body)

      const token = await userUseCase.login({ email, password })

      res.status(200).send(token)
    } catch (err: any) {
      const errors = err.flatten().fieldErrors
      res.status(400).send(errors)
    }
  }

  async findById(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = findByIdSchema.parse(req.params)

      const user = await userUseCase.findById(id)

      res.status(200).send(user)
    } catch (err) {
      res.status(400).send(err)
    }
  }

  async findByEmail(req: FastifyRequest, res: FastifyReply) {
    try {
      const { email } = findByEmailSchema.parse(req.params)

      const user = await userUseCase.findByEmail(email)

      res.status(200).send(user)
    } catch (err) {
      res.status(400).send(err)
    }
  }

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const users = await userUseCase.findAll()

      res.status(200).send(users)
    } catch (err) {
      res.status(400).send(err)
    }
  }

  async update(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = findByIdSchema.parse(req.params)
      const userData = createUserSchema.parse(req.body)

      const user = await userUseCase.update(id, userData)

      res.status(200).send(user)
    } catch (err: any) {
      const errors = err.flatten().fieldErrors
      res.status(400).send(errors)
    }
  }

  async delete(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = findByIdSchema.parse(req.params)

      const user = await userUseCase.delete(id)

      res.status(200).send(user)
    } catch (err) {
      res.status(400).send(err)
    }
  }
}

export { UserController }
