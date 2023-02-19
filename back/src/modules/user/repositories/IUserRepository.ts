import { UserDTO } from '../dtos/UserDTO'

export interface IUserRepository {
  create(data: UserDTO): Promise<UserDTO>
  findById(id: string): Promise<UserDTO>
  findByEmail(email: string): Promise<UserDTO>
  findAll(): Promise<UserDTO[]>
  turnAdmin(id: string): Promise<void>
  update(id: string, data: UserDTO): Promise<UserDTO>
  delete(id: string): Promise<void>
}
