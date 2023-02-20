import { UserDTO } from '../dtos/UserDTO'
import { User } from '@prisma/client'

export interface IUserRepository {
  create(data: UserDTO): Promise<User>
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User>
  findAll(): Promise<User[]>
  turnAdmin(id: string): Promise<void>
  update(id: string, data: UserDTO): Promise<User>
  delete(id: string): Promise<void>
}
