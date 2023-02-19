import { ProductsRepository } from '../repositories/ProductsRepository'
import { ProductsUseCase } from './ProductUseCase'
import { ProductsController } from './ProductController'

const productsRepository = new ProductsRepository()
const productsUseCase = new ProductsUseCase(productsRepository)
const productsController = new ProductsController()

export { productsController, productsUseCase }
