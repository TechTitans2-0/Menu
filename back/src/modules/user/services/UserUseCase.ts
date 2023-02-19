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
  /**
   * Create a new user
   * @name String
   * @email String
   * @password String
   */
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
  async logout(): Promise<Object> {
    return { message: 'Logout success' }
  }

  /**
   * Turn user a admin
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
  async findById(id: string): Promise<UserDTO> {
    const user = await this.userRepository.findById(id)

    return user
  }

  /**
   * Find User by email
   * @email String
   */
  async findByEmail(email: string): Promise<UserDTO> {
    const user = await this.userRepository.findByEmail(email)

    return user
  }

  /**
   * Show all users
   */
  async findAll(): Promise<UserDTO[]> {
    const users = await this.userRepository.findAll()

    return users
  }

  /**
   * Update user
   * @id String
   * @data name?, email?, admin?, password?
   **/
  async update(id: string, data: UserDTO): Promise<UserDTO> {
    const user = await this.userRepository.update(id, data)

    return user
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
