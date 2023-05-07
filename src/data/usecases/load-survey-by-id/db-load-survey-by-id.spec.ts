import MockDate from 'mockdate';
import { LoadSurveyByIdRepository } from '../../protocols/db/survey/load-survey-by-id-repository';
import { SurveyModel } from '../../../domain/models/survey';
import { DbLoadSurveyById } from './db-load-survey-by-id';

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  questions: 'any_questions',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
  date: new Date(),
});

type SutTypes = {
  sut: DbLoadSurveyById;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
};

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(_id: string): Promise<SurveyModel> {
      return new Promise((_resolve) => _resolve(makeFakeSurvey()));
    }
  }
  return new LoadSurveyByIdRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);
  return {
    sut,
    loadSurveyByIdRepositoryStub,
  };
};

describe('DbAddSurveyById', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });
  test('Shold call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    await sut.loadById('any_id');
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });
});
