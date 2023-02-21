import { Order, PrismaClient } from '@prisma/client'
import { OrderDTO } from '../dtos/OrderDTO'

import { IOrderRepository } from './IOrderRepository'

const prisma = new PrismaClient()

class OrderRepository implements IOrderRepository {
  async create(data: OrderDTO): Promise<Order> {
    return prisma.order.create({
      data,
    })
  }

  async findAll(): Promise<Order[]> {
    return prisma.order.findMany()
  }

  async findById(id: string): Promise<Order> {
    return prisma.order.findUniqueOrThrow({
      where: { id },
    })
  }

  async findByClientId(clientId: string): Promise<Order[]> {
    return prisma.order.findMany({
      where: { clientId },
    })
  }

  async update(id: string, data: OrderDTO): Promise<Order> {
    await this.findById(id)

    return prisma.order.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.findById(id)

    await prisma.order.delete({
      where: { id },
    })
  }
}

export { OrderRepository }
