import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from "../../../presentation/helpers/validators";
import { Validation } from "../../../presentation/protocols/validation";
import { EmailValidatorAdapter } from "../../../utils/emails-validator-adapter";



export const makeSingUpValidation = (): ValidationComposite =>{
const validations: Validation[] = []
  // eslint-disable-next-line no-restricted-syntax
  for (const field of ['nome','email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push (new CompareFieldsValidation('password', 'passwordConfrimation;'))
  validations.push (new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
