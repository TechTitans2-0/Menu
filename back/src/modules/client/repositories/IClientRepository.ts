import { ClientDTO } from '../dtos/ClientDTO'
import { Client } from '@prisma/client'

export interface IClientRepository {
  create(data: ClientDTO): Promise<Client>
  findById(id: string): Promise<Client>
  findByName(name: string): Promise<Client[]>
  findByEmail(email: string): Promise<Client>
  findByCpf(cpf: string): Promise<Client>
  findAll(): Promise<Client[]>
  update(id: string, data: ClientDTO): Promise<Client>
  delete(id: string): Promise<void>
}
