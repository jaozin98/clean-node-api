import { EmailValidatorAdapter } from "./emails-validator"

describe('EmailValidator Adapter', () => {
  test('Shold return false if validator returns false  ', () => {
     const sut = new EmailValidatorAdapter()
     const isValid = sut.isValid('invalid_email@mail.com')
     expect(isValid).toBe(false)
  })
})
