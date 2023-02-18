import { User } from '@prisma/client'

export interface IUserRepository {
  create(data: User): Promise<User>
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User>
  findAll(): Promise<User[]>
  update(id: string, data: User): Promise<User>
  delete(id: string): Promise<Object>
}
