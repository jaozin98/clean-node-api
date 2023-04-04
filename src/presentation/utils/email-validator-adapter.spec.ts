// eslint-disable-next-line import/no-extraneous-dependencies
import validator from 'validator'
import { EmailValidatorAdapter } from "./emails-validator"

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  test('Shold return false if validator returns false  ', () => {
     const sut = new EmailValidatorAdapter()
     jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
     const isValid = sut.isValid('invalid_email@mail.com')
     expect(isValid).toBe(false)
  })

  test('Shold return true if validator returns true  ', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
 })

})
