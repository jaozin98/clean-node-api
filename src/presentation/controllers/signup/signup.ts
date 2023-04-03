import { HttpResponse, HttpRequest, Controller, EmailValidator } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { AddAccount } from '../../../domain/usecases/add-account'


export class SignUpController implements Controller {
 private readonly emailValidator:EmailValidator

 private readonly addAccount:AddAccount

  constructor (emailValidator:EmailValidator, addAccount: AddAccount){
    this.emailValidator= emailValidator
    this.addAccount = addAccount
  }

  // eslint-disable-next-line consistent-return
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      // eslint-disable-next-line no-restricted-syntax
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const{ name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation){
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if(!isValid){
        return badRequest(new InvalidParamError('email'));
      }
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok (account)
    }catch (error){
      return serverError()
    }
  }
}



