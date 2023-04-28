import { InvalidParamError } from '../../presentation/errors';
import { CompareFieldsValidation } from './compare-fields-validation';

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation('field', 'fieldToCompare');

describe('CompareFields Validation', () => {
  // Deve retornar um InvalidParamError se as validações falharem
  test('Shold return a InvalidParamError if validations fails', () => {
    const sut = makeSut();
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'wrong_value',
    });
    expect(error).toEqual(new InvalidParamError('fieldToCompare'));
  });
  // Não deve retornar se as validações forem bem-sucedidas
  test('Shold not return  if validations succeeds', () => {
    const sut = makeSut();
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value',
    });
    expect(error).toBeFalsy();
  });
});
