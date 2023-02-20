/* eslint-disable no-useless-constructor */
import { IClientRepository } from '../repositories/IClientRepository'
import { ClientDTO } from '../dtos/ClientDTO'
import { Client } from '@prisma/client'
import { blacklist } from '../../../middlewares/authUser'
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { env } from '../../../env'
import { ILogin } from '../../user/services/UserUseCase'

class ClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async signUp({
    name,
    cpf,
    password,
    phone,
    birthday,
    email,
  }: ClientDTO): Promise<Client> {
    const passHash = await hash(password, 8)
    const user = {
      name,
      cpf,
      password: passHash,
      phone,
      birthday,
      email,
    }
    return await this.clientRepository.create(user)
  }

  async login({ email, password }: ILogin): Promise<Object> {
    const client = await this.clientRepository.findByEmail(email)

    const passMatch = await compare(password, client.password)

    if (!passMatch) {
      throw new Error('Email/Password incorrect')
    }

    try {
      const token = sign({ email }, env.JWT_SECRET, {
        subject: client.id,
        expiresIn: '1d',
        issuer: env.JWT_ISSUER,
      })

      return { token }
    } catch (error) {
      throw new Error('Error generating token')
    }
  }

  async logout(token: string): Promise<Object> {
    blacklist.push(token)
    return { message: 'Logout success' }
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.findAll()
  }

  async findById(id: string): Promise<Client> {
    return await this.clientRepository.findById(id)
  }

  async findByName(name: string): Promise<Client[]> {
    return await this.clientRepository.findByName(name)
  }

  async findByCpf(cpf: string): Promise<Client> {
    return await this.clientRepository.findByCpf(cpf)
  }

  async findByEmail(email: string): Promise<Client> {
    return await this.clientRepository.findByEmail(email)
  }

  async update(id: string, data: ClientDTO): Promise<Client> {
    return await this.clientRepository.update(id, data)
  }

  async delete(id: string): Promise<Object> {
    await this.clientRepository.delete(id)

    return { message: 'Client deleted' }
  }
}

export { ClientUseCase }
