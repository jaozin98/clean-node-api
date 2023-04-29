/* eslint-disable no-restricted-syntax */
import { ValidationComposite, RequiredFieldValidation } from '../../../../validation/validators';
import { Validation } from '../../../../presentation/protocols/validation';

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = [];

  for (const field of ['questions', 'answer']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
