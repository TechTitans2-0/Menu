import { FastifyInstance } from 'fastify'
import { clientController } from '../modules/client/services'
import { authUserMidlle } from '../middlewares/authUserMiddle'

export async function clientRoutes(app: FastifyInstance) {
  app.get('/test', async (req, res) => {
    res.send({ hello: 'world' })
  })
  app.post('/signup', clientController.signUp)
  app.post('/login', clientController.login)
  app.post('/logout', { preHandler: authUserMidlle }, clientController.logout)
  app.get('/', clientController.findAll)
  app.get('/:id', { preHandler: authUserMidlle }, clientController.findById)
  app.get(
    '/name/:name',
    { preHandler: authUserMidlle },
    clientController.findByName,
  )
  app.get(
    '/email/:email',
    { preHandler: authUserMidlle },
    clientController.findByEmail,
  )
  app.get(
    '/cpf/:cpf',
    { preHandler: authUserMidlle },
    clientController.findByCpf,
  )
  app.put('/:id', { preHandler: authUserMidlle }, clientController.update)
  app.delete('/:id', { preHandler: authUserMidlle }, clientController.delete)
}
