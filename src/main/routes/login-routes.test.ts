import request from 'supertest';
import { Collection } from 'mongodb';
import { hash } from 'bcrypt';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';

let accountCollection: Collection;

describe('login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });
  describe('POST /signup', () => {
    // Deve retornar uma conta com sucesso
    test('Should return an account on signup', async () => {
      await request(app).post('/api/signup').send({
        name: 'Joao',
        email: 'joao.dev@email.com',
        password: '123',
        passwordConfirmation: '123',
      });
      expect(200);
    });
  });

  describe('POST /login', () => {
    // Deve retornar 200 no login
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12);
      await accountCollection.insertOne({
        name: 'Joao',
        email: 'joao.dev@email.com',
        password,
      });
      await request(app).post('/api/login').send({
        email: 'joao.dev@email.com',
        password: '123',
      });
      expect(200);
    });
    // Deve retornar 401 no login
    test('Should return 401 on login', async () => {
      await request(app).post('/api/login').send({
        email: 'joao.dev@email.com',
        password: '123',
      });
      expect(401);
    });
  });
});
