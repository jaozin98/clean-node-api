/* eslint-disable no-restricted-syntax */
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from "../../../../presentation/helpers/validators"
import { Validation } from "../../../../presentation/protocols/validation"
import { EmailValidator } from "../../../../presentation/protocols/email-validator"
import { makeLoginValidation } from "./login-validation"

jest.mock('../../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator =>{
  class EmailValidatorStub implements EmailValidator{
    isValid (_email: string): boolean {
      return true
    }
  }
 return new EmailValidatorStub()
}

describe('LoginValidation Factory', ()  => {
  // Chamar ValidationComposite com todas as validações
  test ('Shold call ValidationComposite with all validatations', () => {
    makeLoginValidation()
    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push (new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  } )
})
