import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';
import { SurveyMongoRepository } from './survey-mongo-repository';

let surveyCollection: Collection;

const makeSut = (): SurveyMongoRepository => new SurveyMongoRepository();

describe('Survey Mongo Repository', () => {
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

  describe('add() ', () => {
    test('Shold add a survey on success', async () => {
      const sut = makeSut();
      await sut.add({
        questions: 'any_question',
        answers: [
          {
            image: 'any_image',
            answer: 'any_answer',
          },
          {
            answer: 'other_answer',
          },
        ],
        date: new Date(),
      });
      const survey = await surveyCollection.findOne({ questions: 'any_question' });
      expect(survey).toBeTruthy();
    });
  });
  describe('loadAll() ', () => {
    test('Shold load all  surveys on success', async () => {
      await surveyCollection.insertMany([
        {
          questions: 'any_question',
          answers: [
            {
              image: 'any_image',
              answer: 'any_answer',
            },
          ],
          date: new Date(),
        },
        {
          questions: 'other_question',
          answers: [
            {
              image: 'other_image',
              answer: 'other_answer',
            },
          ],
          date: new Date(),
        },
      ]);

      const sut = makeSut();
      const surveys = await sut.loadAll();
      expect(surveys.length).toBe(2);
      expect(surveys[0].questions).toBe('any_question');
      expect(surveys[1].questions).toBe('other_question');
    });

    test('Should load empty list', async () => {
      const sut = makeSut();
      const surveys = await sut.loadAll();
      expect(surveys.length).toBe(0);
    });
  });
});
