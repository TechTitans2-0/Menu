/* eslint-disable no-useless-constructor */
import { IUserRepository } from '../repositories/IUserRepository'
import { UserDTO } from '../dtos/UserDTO'
import { hash, compare } from 'bcrypt'
import { env } from '../../../env'
import { sign } from 'jsonwebtoken'

export interface ILogin {
  email: string
  password: string
}

class UserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async signUp({ name, email, password }: UserDTO): Promise<UserDTO> {
    const passHash = await hash(password, 8)

    const user = {
      name,
      email,
      password: passHash,
    }

    const createdUser = await this.userRepository.create(user)

    return createdUser
  }

  async login({ email, password }: ILogin): Promise<Object> {
    const user = await this.userRepository.findByEmail(email)

    const passMatch = await compare(password, user.password)

    if (!passMatch) {
      throw new Error('Email/Password incorrect')
    }

    try {
      const token = sign({ email }, env.JWT_SECRET, {
        subject: user.id,
        expiresIn: '1d',
        issuer: env.JWT_ISSUER,
      })

      return { token }
    } catch (error) {
      throw new Error('Error generating token')
    }
  }

  async logout(): Promise<Object> {
    return { message: 'Logout success' }
  }

  async turnAdmin(id: string): Promise<Object> {
    await this.userRepository.turnAdmin(id)

    return { message: 'User turned admin' }
  }

  async findById(id: string): Promise<UserDTO> {
    const user = await this.userRepository.findById(id)

    return user
  }

  async findByEmail(email: string): Promise<UserDTO> {
    const user = await this.userRepository.findByEmail(email)

    return user
  }

  async findAll(): Promise<UserDTO[]> {
    const users = await this.userRepository.findAll()

    return users
  }

  async update(id: string, data: UserDTO): Promise<UserDTO> {
    const user = await this.userRepository.update(id, data)

    return user
  }

  async delete(id: string): Promise<Object> {
    await this.userRepository.delete(id)

    return { message: 'User deleted' }
  }
}

export { UserUseCase }
