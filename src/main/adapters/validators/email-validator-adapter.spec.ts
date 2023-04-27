import validator from 'validator';
import { EmailValidatorAdapter } from './emails-validator-adapter';

const makeSut = (): EmailValidatorAdapter => new EmailValidatorAdapter();

describe('EmailValidator Adapter', () => {
  // Deve retornar falso se o validador retornar falso'
  test('Should return false if validator returns false', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_email@mail.com');
    expect(isValid).toBe(false);
  });
  // Deve retornar true se o validador retornar true'
  test('Should return true if validator returns true', () => {
    const sut = makeSut();
    const isValid = sut.isValid('valid_email@mail.com');
    expect(isValid).toBe(true);
  });
  //  Deve ligar para o validador com o e-mail correto
  test('Should call validator with correct email', () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');
    sut.isValid('any_email@mail.com');
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
