import { PrismaClient, User } from '@prisma/client'

import { IUserRepository } from './IUserRepository'

const prisma = new PrismaClient()

class UserRepository implements IUserRepository {
  async create({ name, email, password }: User): Promise<User> {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    return prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })
  }

  async turnAdmin(id: string): Promise<void> {
    await this.findById(id)

    await prisma.user.update({
      where: { id },
      data: {
        admin: true,
      },
    })
  }

  async findById(id: string): Promise<User> {
    return prisma.user.findUniqueOrThrow({
      where: { id },
    })
  }

  async findByEmail(email: string): Promise<User> {
    return prisma.user.findUniqueOrThrow({
      where: { email },
    })
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany()
  }

  async update(id: string, data: User): Promise<User> {
    await this.findById(id)

    return prisma.user.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.findById(id)

    await prisma.user.delete({
      where: { id },
    })
  }
}

export { UserRepository }
