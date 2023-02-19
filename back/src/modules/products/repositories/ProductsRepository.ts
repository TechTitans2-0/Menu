import { PrismaClient, Products } from '@prisma/client'
import { ProductDTO } from '../dtos/ProductDTO'

import { IProductsRepository } from './IProductsRepository'

const prisma = new PrismaClient()

class ProductsRepository implements IProductsRepository {
  async create(data: ProductDTO): Promise<Products> {
    const productAlreadyExists = await prisma.products.findUnique({
      where: { name: data.name },
    })

    if (productAlreadyExists) {
      throw new Error('Product already exists')
    }

    return prisma.products.create({
      data,
    })
  }

  async findAll(): Promise<Products[]> {
    return prisma.products.findMany()
  }

  async findById(id: string): Promise<Products> {
    return prisma.products.findUniqueOrThrow({
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

  async findByCategory(category: string): Promise<ProductDTO[]> {
    return prisma.products.findMany({
      where: { category: { contains: category } },
    })
  }

  async update(id: string, data: ProductDTO): Promise<Products> {
    await this.findById(id)

    return prisma.products.update({
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
