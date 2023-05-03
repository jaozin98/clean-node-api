import { SurveyModel } from '../../../domain/models/survey';
import { LoadSurveyRepository } from '../../protocols/db/survey/load-survey-repository';
import { DbLoadSurveys } from './db-load-surveys';

const makeFakeSurveys = (): SurveyModel[] => [
  {
    id: 'any_id',
    questions: 'any_questions',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
    date: new Date(),
  },

  {
    id: 'other_id',
    questions: 'other_questions',
    answers: [
      {
        image: 'other_image',
        answer: 'other_answer',
      },
    ],
    date: new Date(),
  },
];

describe('DbLoadSurveys', () => {
  test('Shold call LoadSurveysRepository', async () => {
    class LoadSurveysRepositoryStub implements LoadSurveyRepository {
      async loadAll(): Promise<SurveyModel[]> {
        return new Promise((_resolve) => _resolve(makeFakeSurveys()));
      }
    }
    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });
});
