import { prisma } from '../../../database'
import { hash } from 'bcrypt'

interface ISignUpRequest {
  name: string
  email: string
  password: string
}

class SignUpUseCase {
  async execute({ name, email, password }: ISignUpRequest) {
    const userAreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userAreadyExists) {
      throw new Error('User already exists')
    }

    const passwordHash = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    })

    return user
  }
}

export { SignUpUseCase }
