import { FastifyReply, FastifyRequest } from 'fastify'

export async function authUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
}
