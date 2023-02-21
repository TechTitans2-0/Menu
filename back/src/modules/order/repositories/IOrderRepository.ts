import { Order } from '@prisma/client'
import { OrderDTO } from '../dtos/OrderDTO'

export interface IOrderRepository {
  create(data: OrderDTO): Promise<Order>
  findById(id: string): Promise<Order>
  findAll(): Promise<Order[]>
  findByClientId(clientId: string): Promise<Order[]>
  update(id: string, data: OrderDTO): Promise<Order>
  delete(id: string): Promise<void>
}
