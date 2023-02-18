import { User, PrismaClient } from '@prisma/client'

import { IUserRepository } from './IUserRepository'

const prisma = new PrismaClient()

class UserRepository implements IUserRepository {
  async create({ name, email, password }: User): Promise<User> {
    const userAreadyExists = await this.findByEmail(email)

    if (userAreadyExists) {
      throw new Error('User already exists')
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })

    return user
  }

  async findById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany()
    return users
  }

  async update(id: string, data: User): Promise<User> {
    await this.findById(id)

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    })

    return updatedUser
  }

  async delete(id: string): Promise<Object> {
    await this.findById(id)

    await prisma.user.delete({
      where: { id },
    })

    return { message: 'User deleted' }
  }
}

export default UserRepository
