import UserRepository from '../repositories/UserRepository'
import { UserUseCase } from './UserUseCase'
import { UserController } from './UserController'

const userRepository = new UserRepository()
const userUseCase = new UserUseCase(userRepository)
const userController = new UserController()

export { userUseCase, userController }
