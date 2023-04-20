// eslint-disable-next-line max-classes-per-file
import { LoginController } from "./login"
import { badRequest, serverError, unauthorized, ok } from "../../helpers/http-helper"
import { HttpRequest, Authentication, Validation } from "./login-protocols"
import {  MissingParamError } from "../../errors"


const makeAuthentication = (): Authentication  => {
  class AuthenticationStub  implements Authentication {
      async auth (_email: string, _password: string): Promise<string> {
      return new Promise(resolve => resolve ("any_token"))
    }
  }
  return new AuthenticationStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
  validate (_input: any): Error {
       return null
  }
  }
return new ValidationStub()
}
const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})
interface SutTypes{
  sut: LoginController
  authenticationStub: Authentication
  validationStub:  Validation

}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const validationStub = makeValidation()
  const sut = new LoginController( authenticationStub, validationStub)
  return {
    sut,
    authenticationStub,
    validationStub
  }
}
describe('login controller', () => {
  //  Deve chamar Autenticação com valores corretos
  test('Should call Authentication with correct values ', async () => {
    const {sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com','any_password')
  })
  // Deve retornar 401 se credencial inválida for fornecida
  test('Should return 401 if invalid credential are provided', async () => {
    const {sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorized())
  })
  // Deve retornar 500 lançamentos de autenticação
  test('Should return 500 Authentication throws ', async () => {
    const {sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise ((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  // Deve retornar 200 se uma credencial válida for fornecida
  test('Should return 200 if valid credential are provided', async () => {
    const {sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })
  // Deve chamar Validação com valores corretos
 test('Should call Validation with correct values', async() =>{
  const { sut, validationStub } = makeSut()
  const validateSpy= jest.spyOn(validationStub, 'validate')
  const httpRequest = makeFakeRequest()
  await sut.handle(httpRequest)
  expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
 })
 // Deve retornar 400 se a validação retornar um erro
test('Should return 400 if Validation returns an error', async() => {
  const { sut, validationStub } = makeSut()
  jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
  const httpResponse = await sut.handle(makeFakeRequest())
  expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
 })

})
