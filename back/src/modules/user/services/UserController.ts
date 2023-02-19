import { FastifyReply, FastifyRequest } from 'fastify'
import { userUseCase } from '.'
import {
  createUserSchema,
  findByEmailSchema,
  findByIdSchema,
  loginSchema,
} from '../schemas/UserSchemas'
import { handleError } from '../../../utils/errors'

class UserController {
  async signUp(req: FastifyRequest, res: FastifyReply) {
    try {
      const { name, email, password } = await createUserSchema.parseAsync(
        req.body,
      )
      const user = await userUseCase.signUp({ name, email, password })

      res.status(201).send(user)
    } catch (err) {
      handleError(err, res)
    }
  }

  async login(req: FastifyRequest, res: FastifyReply) {
    try {
      const { email, password } = loginSchema.parse(req.body)

      const token = await userUseCase.login({ email, password })

      res.status(200).send(token)
    } catch (err: any) {
      handleError(err, res)
    }
  }

  async logout(req: FastifyRequest, res: FastifyReply) {
    try {
      const [token] = await Promise.all([userUseCase.logout()])

      res.status(200).send(token)
    } catch (err: any) {
      handleError(err, res)
    }
  }

  /**
   * Turn a user into an admin
   * @param req
   * @param res
   */
  async turnAdmin(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = findByIdSchema.parse(req.params)

      const result = await userUseCase.turnAdmin(id)

      res.status(200).send(result)
    } catch (err: any) {
      handleError(err, res)
    }
  }

  async findById(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = findByIdSchema.parse(req.params)

      const user = await userUseCase.findById(id)

      res.status(200).send(user)
    } catch (err) {
      handleError(err, res)
    }
  }

  async findByEmail(req: FastifyRequest, res: FastifyReply) {
    try {
      const { email } = findByEmailSchema.parse(req.params)

      const user = await userUseCase.findByEmail(email)

      res.status(200).send(user)
    } catch (err) {
      handleError(err, res)
    }
  }

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const users = await userUseCase.findAll()

      res.status(200).send(users)
    } catch (err) {
      handleError(err, res)
    }
  }

  async update(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = findByIdSchema.parse(req.params)
      const userData = createUserSchema.parse(req.body)

      const user = await userUseCase.update(id, userData)

      res.status(200).send(user)
    } catch (err: any) {
      handleError(err, res)
    }
  }

  async delete(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = findByIdSchema.parse(req.params)

      const user = await userUseCase.delete(id)

      res.status(200).send(user)
    } catch (err) {
      handleError(err, res)
    }
  }
}

export { UserController }
