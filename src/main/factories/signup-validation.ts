import { ValidationComposite } from "../../presentation/helpers/validators/validation-composite";
import { RequiredFieldValidation } from "../../presentation/helpers/validators/required-fields-validation"
import { Validation } from "../../presentation/helpers/validators/validation";
import { CompareFieldValidation } from "../../presentation/helpers/validators/compare-fields-validation"
import { EmailValidatorAdapter } from "../../utils/emails-validator-adapter";
import { EmailValidation } from "../../presentation/helpers/validators/email-validation"




export const makeSingUpValidation = (): ValidationComposite =>{
const validations: Validation[] = []
  // eslint-disable-next-line no-restricted-syntax
  for (const field of ['nome','email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push (new CompareFieldValidation('password', 'passwordConfrimation;'))
  validations.push (new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
