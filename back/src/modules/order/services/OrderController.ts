import { FastifyReply, FastifyRequest } from 'fastify'
import { orderUseCase } from '.'
import { handleError } from '../../../utils/errors'
import { createOrderSchema, subSchema } from '../schemas/OrderSchema'

export class OrderController {
  async create(req: FastifyRequest, res: FastifyReply) {
    try {
      if (!req.user) {
        res.status(401).send({ message: 'Unauthorized' })
      }

      const userId = await subSchema.parseAsync(req.user)
      const body = await createOrderSchema.parseAsync(req.body)
      const data = {
        ...body,
        clientId: userId.sub,
      }

      const product = await orderUseCase.create(data)

      return res.status(201).send(product)
    } catch (err) {
      handleError(err, res)
    }
  }

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const products = await orderUseCase.findAll()

      res.status(200).send(products)
    } catch (err) {
      handleError(err, res)
    }
  }

  async findById(req: FastifyRequest, res: FastifyReply) {
    try {
      res.status(200).send()
    } catch (err) {
      handleError(err, res)
    }
  }

  async findClientById(req: FastifyRequest, res: FastifyReply) {
    try {
      res.status(200).send()
    } catch (err) {
      handleError(err, res)
    }
  }

  async update(req: FastifyRequest, res: FastifyReply) {
    try {
      res.status(200).send()
    } catch (err) {
      handleError(err, res)
    }
  }

  async delete(req: FastifyRequest, res: FastifyReply) {
    try {
      res.status(200).send()
    } catch (err) {
      handleError(err, res)
    }
  }
}
