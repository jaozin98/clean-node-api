/* eslint-disable no-restricted-syntax */
import { ValidationComposite, RequiredFieldValidation } from '../../../../validation/validators';
import { Validation } from '../../../../presentation/protocols/validation';
import { makeAddSurveyValidation } from './add-survey-validation-factory';

jest.mock('../../../../validation/validators/validation-composite');

describe('AddSurvey Validation Factory', () => {
  // Chamar ValidationComposite com todas as validações
  test('Shold call ValidationComposite with all validations', () => {
    makeAddSurveyValidation();
    const validations: Validation[] = [];

    for (const field of ['questions', 'answer']) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
