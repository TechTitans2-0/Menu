import { FastifyReply, FastifyRequest } from 'fastify'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { env } from '../env'

export const blacklist = new Set()
/**
 * Middleware para autenticação de usuário
 * @param request
 * @param reply
 */
export async function authUserMidlle(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const token = request.headers.authorization

    await request.jwtVerify({
      allowedIss: env.JWT_ISSUER,
    })

    if (blacklist.has(token)) {
      reply.status(401).send({ error: '⚠️ Unauthorized' })
    }
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return reply.status(401).send({ error: '⚠️ Invalid token' })
    } else if (error instanceof TokenExpiredError) {
      return reply.status(401).send({ error: '⚠️ Token expired' })
    } else {
      console.error(error)
      return reply.status(500).send({ error: '❌ Internal Server Error' })
    }
  }
}
