// eslint-disable-next-line max-classes-per-file
import { AddSurveyModel, AddSurveyRepository } from './db-add-servey-protocols';
import { DbAddSurvey } from './db-add-survey';

const makeFakeSurveyData = (): AddSurveyModel => ({
  questions: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
});

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(_surveyData: AddSurveyModel): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new AddSurveyRepositoryStub();
};

interface SutTypes {
  sut: DbAddSurvey;
  addSurveyRepositoryStub: AddSurveyRepository;
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository();
  const sut = new DbAddSurvey(addSurveyRepositoryStub);
  return {
    sut,
    addSurveyRepositoryStub,
  };
};

describe('DbAddSurvey Usecase', () => {
  test('Shold call AddSurveyRepository wit correct value', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const surveyData = makeFakeSurveyData();
    await sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith(surveyData);
  });
});