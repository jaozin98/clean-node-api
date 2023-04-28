import { HttpRequest, Validation } from './add-survey-controller-protocols';
import { AddSurveyController } from './add-survey-controller';

const makeFakeRequest = (): HttpRequest => ({
  body: {
    questions: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
  },
});

describe('AddSurvey controller', () => {
  test('Shold call Validations with correc values', async () => {
    class ValidationStub implements Validation {
      validate(_input: any): Error {
        return null;
      }
    }
    const validationStub = new ValidationStub();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const sut = new AddSurveyController(validationStub);
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
