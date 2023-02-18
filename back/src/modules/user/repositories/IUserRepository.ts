import { UserDTO } from '../dtos/UserDTO'

export interface IUserRepository {
  create(data: User): Promise<User>
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User>
  findAll(): Promise<User[]>
  turnAdmin(id: string): Promise<void>
  update(id: string, data: User): Promise<User>
  delete(id: string): Promise<void>
}
