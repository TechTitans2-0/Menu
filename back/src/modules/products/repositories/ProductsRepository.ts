import { Products, PrismaClient } from '@prisma/client'
import { ProductDTO } from '../dtos/ProductDTO'

import { IProductsRepository } from './IProductsRepository'

const prisma = new PrismaClient()

class ProductsRepository implements IProductsRepository {
  async create(data: ProductDTO): Promise<Products> {
    const productAreadyExists = await prisma.products.findUnique({
      where: { name: data.name },
    })

    if (productAreadyExists) {
      throw new Error('Product already exists')
    }

    return await prisma.products.create({
      data,
    })
  }

  async findAll(): Promise<Products[]> {
    return await prisma.products.findMany()
  }

  async findById(id: string): Promise<Products> {
    return await prisma.products.findUniqueOrThrow({
      where: { id },
    })
  }

  async findByName(name: string): Promise<ProductDTO[]> {
    const products = await prisma.products.findMany({
      where: { name: { contains: name } },
    })
    console.log(products)
    return products
  }

  async update(id: string, data: ProductDTO): Promise<Products> {
    await this.findById(id)

    return await prisma.products.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.findById(id)

    await prisma.products.delete({
      where: { id },
    })
  }
}

export { ProductsRepository }
