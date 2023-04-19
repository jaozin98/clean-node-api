import { MissingParamError } from "../../errors";
import { RequiredFieldValidation } from "./required-fields-validation";


const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation('field')

describe('RequiredField Validation', () => {
  test('Shold return a MissingParamError if validations fails', () => {
    const sut = makeSut()
   const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Shold not return  if validations succeeds', () => {
    const sut = makeSut()
   const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
} )
