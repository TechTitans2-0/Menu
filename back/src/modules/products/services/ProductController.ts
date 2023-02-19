import { FastifyReply, FastifyRequest } from 'fastify'
import { productsUseCase } from '.'
import { handleError } from '../../../utils/errors'
import {
  createProductSchema,
  findByCategorySchema,
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
      handleError(error, res)
    }
  }

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const products = await productsUseCase.findAll()

      res.status(200).send(products)
    } catch (err) {
      handleError(err, res)
    }
  }

  async findById(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = await findByIdSchema.parseAsync(req.params)

      const product = await productsUseCase.findById(id)

      res.status(200).send(product)
    } catch (err) {
      handleError(err, res)
    }
  }

  async findByName(req: FastifyRequest, res: FastifyReply) {
    try {
      const { name } = await findByNameSchema.parseAsync(req.params)

      const product = await productsUseCase.findByName(name)

      res.status(200).send(product)
    } catch (err) {
      handleError(err, res)
    }
  }

  async findByCategory(req: FastifyRequest, res: FastifyReply) {
    try {
      const { category } = await findByCategorySchema.parseAsync(req.params)

      const product = await productsUseCase.findByCategory(category)

      res.status(200).send(product)
    } catch (err) {
      handleError(err, res)
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
      handleError(err, res)
    }
  }

  async delete(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = await findByIdSchema.parseAsync(req.params)

      const result = await productsUseCase.delete(id)

      res.status(200).send(result)
    } catch (err) {
      handleError(err, res)
    }
  }
}
