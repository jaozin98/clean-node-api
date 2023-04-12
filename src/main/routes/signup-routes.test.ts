import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
   })

   afterAll(async () => {
     await MongoHelper.disconnect()
   })

   beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
   })

  test ('Should return an account on success', async () => {
   await request(app)
   .post('/api/signup')
   .send({
      name:'Joao',
      email:'joao.dev@email.com',
      password:'1234',
      passwordConfirmation:'1234'
   })
   .expect(200)
  })
})
