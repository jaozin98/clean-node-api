// eslint-disable-next-line import/no-extraneous-dependencies
import validator from 'validator'
import { EmailValidator } from "../protocols/email-validator";

export class EmailValidatorAdapter implements EmailValidator{
  isValid (email:string): boolean {
    return validator.isEmail(email)
  }
}
