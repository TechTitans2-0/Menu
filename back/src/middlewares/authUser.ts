import { FastifyRequest, FastifyReply } from 'fastify'
import { verify } from 'jsonwebtoken'
import { env } from '../env'

export async function authenticateUser(
  request: FastifyRequest,
  replay: FastifyReply,
  done: any,
) {
  try {
    const authHeader = request.headers.authorization

    if (authHeader) {
      const [, token] = authHeader.split(' ')

      verify(token, env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return replay.status(401).send({ error: 'Invalid token' })
        }
        done()
      })
    } else {
      return replay.status(401).send({ error: 'Token missing' })
    }
  } catch {
    return replay.status(401).send({ error: 'Invalid token' })
  }
}
