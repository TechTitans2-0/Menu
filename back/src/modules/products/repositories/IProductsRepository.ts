import { ProductDTO } from '../dtos/ProductDTO'

export interface IProductsRepository {
  create(data: ProductDTO): Promise<ProductDTO>
  findById(id: string): Promise<ProductDTO>
  findAll(): Promise<ProductDTO[]>
  findByName(name: string): Promise<ProductDTO[]>
  update(id: string, data: ProductDTO): Promise<ProductDTO>
  delete(id: string): Promise<void>
}
