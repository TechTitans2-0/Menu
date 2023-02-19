import { FastifyRequest, FastifyReply } from 'fastify'
import { ZodError } from 'zod'
import { zodErrorMap } from '../../../utils/errors'
import { productsUseCase } from '.'
import {
  createProductSchema,
  findByIdSchema,
  findByNameSchema,
} from '../schemas/ProductSchemas'

export class ProductsController {
  async create(req: FastifyRequest, res: FastifyReply) {
    try {
      const { name, price, description, rating, category } =
        await createProductSchema.parseAsync(req.body)

      const product = await productsUseCase.create({
        name,
        price,
        description,
        rating,
        category,
      })

      return res.status(201).send(product)
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send(zodErrorMap(error))
      }
      return res.status(500).send(error)
    }
  }

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const products = await productsUseCase.findAll()

      res.status(200).send(products)
    } catch (err) {
      res.status(400).send(err)
    }
  }

  async findById(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = await findByIdSchema.parseAsync(req.params)

      const product = await productsUseCase.findById(id)

      res.status(200).send(product)
    } catch (err) {
      res.status(400).send(err)
    }
  }

  async findByName(req: FastifyRequest, res: FastifyReply) {
    try {
      const { name } = await findByNameSchema.parseAsync(req.params)

      const product = await productsUseCase.findByName(name)

      res.status(200).send(product)
    } catch (err) {
      res.status(400).send(err)
    }
  }

  async update(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = await findByIdSchema.parseAsync(req.params)
      const { name, price, description, rating, category } =
        await createProductSchema.parseAsync(req.body)

      const product = await productsUseCase.update(id, {
        name,
        price,
        description,
        rating,
        category,
      })

      res.status(200).send(product)
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = zodErrorMap(err.issues)

        res.status(400).send(errors)
      } else {
        res.status(400).send(err)
      }
    }
  }

  async delete(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = await findByIdSchema.parseAsync(req.params)

      const result = await productsUseCase.delete(id)

      res.status(200).send(result)
    } catch (err) {
      res.status(400).send(err)
    }
  }
}
