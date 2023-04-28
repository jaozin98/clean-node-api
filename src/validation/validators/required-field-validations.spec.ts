import { MissingParamError } from '../../presentation/errors';
import { RequiredFieldValidation } from './required-field-validation';

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation('field');

describe('RequiredField Validation', () => {
  // Deve retornar um erro de parâmetro ausente se a validação falhar
  test('Shold return a MissingParam Error if validations fails', () => {
    const sut = makeSut();
    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('field'));
  });
  // Não deve retornar se as validações forem bem-sucedidas
  test('Shold not return  if validations succeeds', () => {
    const sut = makeSut();
    const error = sut.validate({ field: 'any_name' });
    expect(error).toBeFalsy();
  });
});
