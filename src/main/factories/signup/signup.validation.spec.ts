import { makeSingUpValidation } from "./signup-validation"
import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from "../../../presentation/helpers/validators"
import { Validation } from "../../../presentation/protocols/validation"
import { EmailValidator } from "../../../presentation/protocols/email-validator"


jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator =>{
  class EmailValidatorStub implements EmailValidator{
    isValid (_email: string): boolean {
      return true
    }
  }
 return new EmailValidatorStub()
}

describe('SignUpValidation Factory', ()  => {
  // Chamar ValidationComposite com todas as validações
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
