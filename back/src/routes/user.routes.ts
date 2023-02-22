import { FastifyInstance } from 'fastify'
import { authUserMidlle } from '../middlewares/authUserMiddle'
import { userController } from '../modules/user/services/'

export async function userRoutes(app: FastifyInstance) {
  app.post('/signup', userController.signUp)
  app.post('/login', userController.login)
  app.post('/logout', { preHandler: authUserMidlle }, userController.logout)
  app.post(
    '/admin/:id',
    { preHandler: authUserMidlle },
    userController.turnAdmin,
  )
  app.get('/:id', { preHandler: authUserMidlle }, userController.findById)
  app.get(
    '/email/:email',
    { preHandler: authUserMidlle },
    userController.findByEmail,
  )
  app.get('/', userController.findAll)
  app.put('/:id', { preHandler: authUserMidlle }, userController.update)
  app.delete('/:id', { preHandler: authUserMidlle }, userController.delete)
}
