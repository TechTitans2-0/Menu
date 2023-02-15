import { prisma } from '../../../database'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { env } from '../../../env'

interface ILoginRequest {
  email: string
  password: string
}

class LoginUseCase {
  async execute({ email, password }: ILoginRequest) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new Error('Email/Password incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email/Password incorrect')
    }

    try {
      const token = sign({ email }, env.JWT_SECRET, {
        subject: user.id,
        expiresIn: '1d',
        issuer: 'api',
      })

      return token
    } catch (error) {
      throw new Error('Error generating token')
    }
  }
}

export { LoginUseCase }
