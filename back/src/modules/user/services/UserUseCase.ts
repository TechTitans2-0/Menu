/* eslint-disable no-useless-constructor */
import { IUserRepository } from '../repositories/IUserRepository'
import { UserDTO } from '../dtos/UserDTO'
import { User } from '@prisma/client'
import { blacklist } from '../../../middlewares/authUserMiddle'
import { compare, hash } from 'bcrypt'
import { env } from '../../../env'
import { sign } from 'jsonwebtoken'

export interface ILogin {
  email: string
  password: string
}

class UserUseCase {
  constructor(private userRepository: IUserRepository) {}
  /**
   * Create a new user
   * @name String
   * @email String
   * @password String
   */
  async signUp({ name, email, password }: UserDTO): Promise<User> {
    const passHash = await hash(password, 8)

    const user = {
      name,
      email,
      password: passHash,
    }

    return await this.userRepository.create(user)
  }

  /**
   * Login a user
   * @email String
   * @password - string
   * @return JWT
   */
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

  /**
   * Logout a user
   */
  async logout(token: string): Promise<Object> {
    blacklist.add(token)
    return { message: 'Logout success' }
  }

  /**
   * Turn user admin
   * @id String
   */
  async turnAdmin(id: string): Promise<Object> {
    await this.userRepository.turnAdmin(id)

    return { message: 'User turned admin' }
  }

  /**
   * Find User by id
   * @id String
   */
  async findById(id: string): Promise<User> {
    return await this.userRepository.findById(id)
  }

  /**
   * Find User by email
   * @email String
   */
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email)
  }

  /**
   * Show all users
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  /**
   * Update user
   * @id String
   * @data name?, email?, admin?, password?
   **/
  async update(id: string, data: UserDTO): Promise<User> {
    return await this.userRepository.update(id, data)
  }

  /**
   * Delete user
   * @id String
   **/
  async delete(id: string): Promise<Object> {
    await this.userRepository.delete(id)

    return { message: 'User deleted' }
  }
}

export { UserUseCase }
