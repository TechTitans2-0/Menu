/* eslint-disable no-useless-constructor */
import { ProductDTO } from '../dtos/ProductDTO'
import { Products } from '@prisma/client'
import { IProductRepository } from '../repositories/IProductRepository'

class ProductsUseCase {
  constructor(private productsRepository: IProductRepository) {}

  async create(data: ProductDTO): Promise<Products> {
    return await this.productsRepository.create(data)
  }

  async findAll(): Promise<Products[]> {
    return await this.productsRepository.findAll()
  }

  async findById(id: string): Promise<Products> {
    return await this.productsRepository.findById(id)
  }

  async findByName(name: string): Promise<Products[]> {
    return await this.productsRepository.findByName(name)
  }

  async findByCategory(category: string): Promise<Products[]> {
    return await this.productsRepository.findByCategory(category)
  }

  async update(id: string, data: ProductDTO): Promise<Products> {
    return await this.productsRepository.update(id, data)
  }

  async delete(id: string): Promise<Object> {
    await this.productsRepository.delete(id)

    return { message: 'Product deleted' }
  }
}

export { ProductsUseCase }
