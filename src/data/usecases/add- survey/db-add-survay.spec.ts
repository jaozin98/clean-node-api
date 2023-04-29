import { AddSurveyModel, AddSurveyRepository } from './db-add-servey-protocols';
import { DbAddSurvey } from './db-add-survey';

const makeFakeSurveyData = (): AddSurveyModel => ({
  questions: 'any_question',
  answers: [
    {
      image: 'any_image',
      answers: 'any_answer',
    },
  ],
});

describe('DbAddSurvey Usecase', () => {
  test('Shold call AddSurveyRepository wit correct value', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      async add(_surveyData: AddSurveyModel): Promise<void> {
        return new Promise((resolve) => resolve());
      }
    }
    const addSurveyRepositoryStub = new AddSurveyRepositoryStub();
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add');
    const sut = new DbAddSurvey(addSurveyRepositoryStub);
    const surveyData = makeFakeSurveyData();
    await sut.add(surveyData);
    expect(addSpy).toHaveBeenCalledWith();
  });
});
