/* eslint-disable no-useless-constructor */
import { Order } from '@prisma/client'
import { OrderDTO } from '../dtos/OrderDTO'
import { IOrderRepository } from '../repositories/IOrderRepository'

export class OrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async create(data: OrderDTO): Promise<Order> {
    return await this.orderRepository.create(data)
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.findAll()
  }

  async findById(id: string): Promise<Order> {
    return await this.orderRepository.findById(id)
  }

  async findByClientId(clientId: string): Promise<Order[]> {
    return await this.orderRepository.findByClientId(clientId)
  }

  async update(id: string, data: OrderDTO): Promise<Order> {
    return await this.orderRepository.update(id, data)
  }

  async delete(id: string): Promise<Object> {
    await this.orderRepository.delete(id)

    return { message: 'Order deleted' }
  }
}
