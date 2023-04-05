// eslint-disable-next-line import/no-extraneous-dependencies
import validator from 'validator'
import { EmailValidatorAdapter } from './emails-validator-adapter'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))
// eslint-disable-next-line arrow-body-style
const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('Shold return false if validator returns false  ', () => {
     const sut =makeSut()
     jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
     const isValid = sut.isValid('invalid_email@mail.com')
     expect(isValid).toBe(false)
  })

  test('Shold return true if validator returns true  ', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
 })

  test('Shold call validator with correct email  ', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator,'isEmail')
    sut.isValid('any_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
 })
})
