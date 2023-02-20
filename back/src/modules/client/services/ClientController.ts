import { FastifyReply, FastifyRequest } from 'fastify'
import { clientUseCase } from '.'
import { handleError } from '../../../utils/errors'
import {
  createClientSchema,
  findByCpfSchema,
  findByEmailSchema,
  findByIdSchema,
  findByNameSchema,
  loginSchema,
} from '../schemas/ClientSchemas'

export class ClientController {
  async signUp(req: FastifyRequest, res: FastifyReply) {
    try {
      const { name, cpf, email, password, phone, birthday } =
        await createClientSchema.parseAsync(req.body)

      const product = await clientUseCase.signUp({
        name,
        cpf,
        email,
        password,
        phone,
        birthday,
      })

      return res.status(201).send(product)
    } catch (err) {
      handleError(err, res)
    }
  }

  async login(req: FastifyRequest, res: FastifyReply) {
    try {
      const { email, password } = await loginSchema.parseAsync(req.body)

      const product = await clientUseCase.login({
        email,
        password,
      })

      return res.status(201).send(product)
    } catch (err) {
      handleError(err, res)
    }
  }

  async logout(req: FastifyRequest, res: FastifyReply) {
    try {
      const token = req.headers.authorization as string
      const result = await clientUseCase.logout(token)

      res.status(200).send(result)
    } catch (err: any) {
      handleError(err, res)
    }
  }

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const products = await clientUseCase.findAll()

      res.status(200).send(products)
    } catch (err) {
      handleError(err, res)
    }
  }

  async findById(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = await findByIdSchema.parseAsync(req.params)

      const product = await clientUseCase.findById(id)

      res.status(200).send(product)
    } catch (err) {
      handleError(err, res)
    }
  }

  async findByName(req: FastifyRequest, res: FastifyReply) {
    try {
      const { name } = await findByNameSchema.parseAsync(req.params)

      const product = await clientUseCase.findByName(name)

      res.status(200).send(product)
    } catch (err) {
      handleError(err, res)
    }
  }

  async findByEmail(req: FastifyRequest, res: FastifyReply) {
    try {
      const { email } = await findByEmailSchema.parseAsync(req.params)

      const result = await clientUseCase.findByEmail(email)

      res.status(200).send(result)
    } catch (err) {
      handleError(err, res)
    }
  }

  async findByCpf(req: FastifyRequest, res: FastifyReply) {
    try {
      const { cpf } = await findByCpfSchema.parseAsync(req.params)

      const result = await clientUseCase.findByCpf(cpf)

      res.status(200).send(result)
    } catch (err) {
      handleError(err, res)
    }
  }

  async update(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = await findByIdSchema.parseAsync(req.params)
      const { name, cpf, email, password, phone, birthday } =
        await createClientSchema.parseAsync(req.body)

      const product = await clientUseCase.update(id, {
        name,
        cpf,
        email,
        password,
        phone,
        birthday,
      })

      res.status(200).send(product)
    } catch (err) {
      handleError(err, res)
    }
  }

  async delete(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = await findByIdSchema.parseAsync(req.params)

      const result = await clientUseCase.delete(id)

      res.status(200).send(result)
    } catch (err) {
      handleError(err, res)
    }
  }
}
