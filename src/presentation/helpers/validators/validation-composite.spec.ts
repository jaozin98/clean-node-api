import { MissingParamError } from "../../errors";
import { ValidationComposite } from "./validation-composite";
import { Validation } from "../../protocols/validation";

const makeValidation  = () => {
  class ValidationStub implements Validation {
    validate (_input: any): Error {
    return null

    }
  }
    return  new ValidationStub()
}
interface SutTypes{
  sut:ValidationComposite
  validationStubs: Validation[]
}
const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
   validationStubs
    }
  }

describe('Validation Composite', () => {
  // Deve retornar um erro se alguma validação falhar
  test('Shold Return an error if any validations fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value'})
    expect(error).toEqual(new MissingParamError('field'))
  })
 // Deve retornar o primeiro erro se mais uma validação falhar
  test('Shold Return the first error if more one validations fails ', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value'})
    expect(error).toEqual(new Error())
  })
  // Não deve retornar se a validação for bem-sucedida
  test('Shold not return if validation succeeds ', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value'})
    expect(error).toBeFalsy()
  })

})
