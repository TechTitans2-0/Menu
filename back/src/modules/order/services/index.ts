import { OrderRepository } from '../repositories/OrderRepository'
import { OrderUseCase } from './OrderUseCase'
import { OrderController } from './OrderController'

const orderRepository = new OrderRepository()
const orderUseCase = new OrderUseCase(orderRepository)
const orderController = new OrderController()

export { orderController, orderUseCase }
