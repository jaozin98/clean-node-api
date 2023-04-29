import request from 'supertest';
import { Collection } from 'mongodb';
import app from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';

let surveyCollection: Collection;

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
  });
  describe('POST / serveys', () => {
    // Deve retornar uma conta com sucesso
    test('Should return an account on signup', async () => {
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

      expect(204);
    });
  });
});
