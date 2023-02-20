import { ClientRepository } from '../repositories/ClientRepository'
import { ClientUseCase } from './ClientUseCase'
import { ClientController } from './ClientController'

const clientRepository = new ClientRepository()
const clientUseCase = new ClientUseCase(clientRepository)
const clientController = new ClientController()

export { clientController, clientUseCase }
