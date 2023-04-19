import { MissingParamError } from "../../errors";
import { ValidationComposite } from "./validation-composite";
import { Validation } from "./validation";

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
  validationStub: Validation
}
const makeSut = (): SutTypes => {
const validationStub = makeValidation()
const sut = new ValidationComposite([validationStub])
return {
  sut,
  validationStub
}
}

describe('Validation Composite', () => {
  test('Shold Return an error if any validations fails ', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value'})
    expect(error).toEqual(new MissingParamError('field'))
  })
})