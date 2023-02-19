/* eslint-disable no-useless-constructor */
import { IProductsRepository } from '../repositories/IProductsRepository'
import { ProductDTO } from '../dtos/ProductDTO'

class ProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async create(data: ProductDTO): Promise<ProductDTO> {
    return await this.productsRepository.create(data)
  }

  async findAll(): Promise<ProductDTO[]> {
    return await this.productsRepository.findAll()
  }

  async findById(id: string): Promise<ProductDTO> {
    return await this.productsRepository.findById(id)
  }

  async findByName(name: string): Promise<ProductDTO[]> {
    return await this.productsRepository.findByName(name)
  }

  async update(id: string, data: ProductDTO): Promise<ProductDTO> {
    return await this.productsRepository.update(id, data)
  }

  async delete(id: string): Promise<Object> {
    await this.productsRepository.delete(id)

    return { message: 'Product deleted' }
  }
}

export { ProductsUseCase }
