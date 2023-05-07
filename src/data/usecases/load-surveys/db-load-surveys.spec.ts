// eslint-disable-next-line max-classes-per-file
import { SurveyModel, LoadSurveyRepository } from './db-load-surveys-protocols';
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

type SutTypes = {
  sut: DbLoadSurveys;
  loadSurveysRepositoryStub: LoadSurveyRepository;
};

const makeLoadSurveyRepository = (): LoadSurveyRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveyRepository {
    async loadAll(): Promise<SurveyModel[]> {
      return new Promise((_resolve) => _resolve(makeFakeSurveys()));
    }
  }
  return new LoadSurveysRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveyRepository();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
  return {
    sut,
    loadSurveysRepositoryStub,
  };
};

describe('DbLoadSurveys', () => {
  test('Shold call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test('Shold return a list of Surveys on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.load();
    const fakeSurveys = makeFakeSurveys();
    expect(surveys).toEqual(
      fakeSurveys.map((survey) => ({
        ...survey,
        date: expect.any(Date),
      }))
    );
  });

  test('Shold throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
