import { test, beforeAll, afterAll, beforeEach, describe } from 'vitest'
import { execSync } from 'node:child_process'
import app from '../src/app'
import request from 'supertest'

describe('Users Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run migrate:reset')
    execSync('npm run migrate:tests')
  })

  test('signUp tests', async () => {
    await request(app.server)
      .post('/users/signup')
      .send({
        name: 'John Doe',
        email: 'email@email.com.br',
        password: '123456',
      })
      .expect(201)
  })

  test('login tests', async () => {
    await request(app.server).post('/users/signup').send({
      name: 'John Doe',
      email: 'email@email.com.br',
      password: '123456',
    })

    await request(app.server)
      .post('/users/login')
      .send({
        email: 'email@email.com.br',
        password: '123456',
      })
      .expect(200)
  })

  test('logout tests', async () => {
    await request(app.server)
      .post('/users/signup')
      .send({
        name: 'John Doe',
        email: 'email@email.com.br',
        password: '123456',
      })
      .expect(201)

    const login = await request(app.server)
      .post('/users/login')
      .send({
        email: 'email@email.com.br',
        password: '123456',
      })
      .expect(200)

    const token = login.body.token

    await request(app.server)
      .post('/users/logout')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  })
})
