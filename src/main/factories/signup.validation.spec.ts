import { makeSingUpValidation } from "./signup-validation"
import { ValidationComposite } from "../../presentation/helpers/validators/validation-composite"
import { RequiredFieldValidation } from "../../presentation/helpers/validators/required-field-validation"
import { Validation } from "../../presentation/helpers/validators/validation"
import { CompareFieldsValidation } from "../../presentation/helpers/validators/compare-fields-validation"
import { EmailValidation } from "../../presentation/helpers/validators/email-validation"
import { EmailValidator } from "../../presentation/protocols/email-validator"


jest.mock('../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator =>{
  class EmailValidatorStub implements EmailValidator{
    isValid (_email: string): boolean {
      return true
    }
  }
 return new EmailValidatorStub()
}

describe('SignUpValidation Factory', ()  => {
  test ('Shold call ValidationComposite with all validatations', () => {
    makeSingUpValidation()
    const validations: Validation[] = []
    // eslint-disable-next-line no-restricted-syntax
    for (const field of ['nome','email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push (new CompareFieldsValidation('password', 'passwordConfrimation;'))
    validations.push (new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  } )
})
