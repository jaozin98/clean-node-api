import request from 'supertest';
import { Collection } from 'mongodb';
import { sign } from 'jsonwebtoken';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import env from '../config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });
  describe('POST / serveys', () => {
    // Deve retornar uma conta com sucesso
    test('Should return 403 on add survey success', async () => {
      await request(app)
        .post('/api/serveys')
        .send({
          questions: 'Questions',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com',
            },
            {
              answer: 'Answer2',
            },
          ],
        });

      expect(403);
    });

    test('Should return 204 on add survey with valid accessToken', async () => {
      const { insertedId: id } = await accountCollection.insertOne({
        name: 'joao',
        email: 'joao.gabriel@mail.com',
        password: '123',
        role: 'admin',
      });
      const accessToken = sign({ id }, env.jwtSecret);
      await accountCollection.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            accessToken,
          },
        }
      );
      await request(app)
        .post('/api/serveys')
        .set('x-access-token', accessToken)
        .send({
          questions: 'Questions',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com',
            },
            {
              answer: 'Answer2',
            },
          ],
        });

      expect(204);
    });
  });
});
