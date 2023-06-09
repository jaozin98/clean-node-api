/* eslint-disable no-restricted-syntax */
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../../presentation/helpers/validators';
import { Validation } from '../../../../presentation/protocols/validation';
import { EmailValidatorAdapter } from '../../../adapters/validators/emails-validator-adapter';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
