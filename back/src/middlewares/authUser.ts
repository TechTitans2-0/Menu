import { FastifyRequest, FastifyReply } from 'fastify'
import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken'
import { env } from '../env'

export const blacklist: string[] = []

/**
 * Middleware para autenticação de usuário
 * @param request
 * @param reply
 */

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      return reply.status(401).send({ error: '⚠️ Token missing' })
    }

    const [bearer, token] = authHeader.split(' ')

    if (bearer !== 'Bearer' || !token) {
      return reply.status(401).send({ error: '⚠️ Invalid token format' })
    }
    if (blacklist.includes(token)) {
      return reply.status(401).send({ error: '⚠️ Invalid token' })
    }
    verify(token, env.JWT_SECRET, {
      issuer: 'api',
    })

    return
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return reply.status(401).send({ error: '⚠️ Invalid token' })
    } else if (error instanceof TokenExpiredError) {
      return reply.status(401).send({ error: '⚠️ Token expired' })
    } else {
      console.error(error)
      return reply.status(500).send({ error: 'Internal Server Error' })
    }
  }
}
