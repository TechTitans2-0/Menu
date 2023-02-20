import { ProductRepository } from '../repositories/ProductRepository'
import { ProductsUseCase } from './ProductUseCase'
import { ProductsController } from './ProductController'

const productsRepository = new ProductRepository()
const productsUseCase = new ProductsUseCase(productsRepository)
const productsController = new ProductsController()

export { productsController, productsUseCase }
