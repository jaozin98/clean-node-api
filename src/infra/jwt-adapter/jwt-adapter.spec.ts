// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import { JwtAdapter } from './jwt-adapter';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return new Promise((resolve) => resolve('any_token'));
  },
}));

const makeSut = (): JwtAdapter => new JwtAdapter('secret');

describe('jwt Adapter', () => {
  // Deve indicativo de chamada com valores corretos
  test('Should call sign with correct values', async () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    await sut.encrypt('any_id');
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });
  // Deve retornar um token no sucesso do sinal
  test('Should return a token on sign  success', async () => {
    const sut = makeSut();
    const accessToken = await sut.encrypt('any_id');
    expect(accessToken).toBe('any_token');
  });
  // Deve jogar se o sinal jogar
  test('Should throw if sign throws', async () => {
    const sut = makeSut();
    jest.spyOn(jwt, 'sign').mockImplementation(() => {
      throw new Error();
    });
    const promise = sut.encrypt('any_id');
    expect(promise).rejects.toThrow();
  });
});
