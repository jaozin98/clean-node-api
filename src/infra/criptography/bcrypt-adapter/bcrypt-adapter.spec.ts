import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hash'));
  },
  async compare(): Promise<boolean> {
    return new Promise((resolve) => resolve(true));
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => new BcryptAdapter(salt);

describe('Bcrypt Adapter', () => {
  // Segurar hash de chamada com valor correto
  test('Shold call hash with correct value', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
  // Deve retornar um hash válido no sucesso do hash
  test('Shold return a valid hash on hash sucess', async () => {
    const sut = makeSut();
    const hash = await sut.hash('any_value');
    expect(hash).toBe('hash');
  });
  // Deve jogar se hash jogar'
  test('Shold throw if hash throw', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.hash('any_value');
    await expect(promise).rejects.toThrow();
  });
  // Reter a chamada comparar com o valor correto
  test('Shold call compare with correct value', async () => {
    const sut = makeSut();
    const compareSpy = jest.spyOn(bcrypt, 'compare');
    await sut.compare('any_value', 'any_hash');
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
  });
  // Deve retornar verdadeiro quando comparar sucessos'
  test('Shold return true when compare sucessds', async () => {
    const sut = makeSut();
    const isValid = await sut.compare('any_value', 'any_hash');
    expect(isValid).toBe(true);
  });
  // Deve retornar verdadeiro quando a comparação falhar'
  test('Shold return true when compare fails', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => new Promise((resolve) => resolve(false)));
    const isValid = await sut.compare('any_value', 'any_hash');
    expect(isValid).toBe(false);
  });
  // Deve arremessar se comparar arremesso
  test('Shold throw if compare throw', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => new Promise((_resolve, reject) => reject(new Error())));
    const promise = sut.compare('any_value', 'any_hash');
    await expect(promise).rejects.toThrow();
  });
});
