import { ProductDTO } from '../dtos/ProductDTO'
import { Products } from '@prisma/client'

export interface IProductRepository {
  create(data: ProductDTO): Promise<Products>
  findById(id: string): Promise<Products>
  findAll(): Promise<Products[]>
  findByName(name: string): Promise<Products[]>
  findByCategory(category: string): Promise<Products[]>
  update(id: string, data: ProductDTO): Promise<Products>
  delete(id: string): Promise<void>
}
