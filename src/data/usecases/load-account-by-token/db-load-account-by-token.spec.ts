// eslint-disable-next-line max-classes-per-file
import { Decrypter } from '../../protocols/criptography/decrypter';
import { AccountModel } from '../add-account/db-add-account-protocols';
import { DbLoadAccountByToken } from './db-load-account-by-token';
import { LoadAccontByTokenRepository } from '../../protocols/db/acount/load-account-by-token-repository ';

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_id',
  email: 'valid_id',
  password: 'valid_id',
});

interface SutTypes {
  sut: DbLoadAccountByToken;
  decrypterStub: Decrypter;
  loadAccountByTokenRepositoryStub: LoadAccontByTokenRepository;
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(_value: string): Promise<string> {
      return new Promise((resolve) => resolve('any_value'));
    }
  }
  return new DecrypterStub();
};

const makeLoadAccountByTokenRepositoryStub = (): LoadAccontByTokenRepository => {
  class LoadAccontByTokenRepositoryStub implements LoadAccontByTokenRepository {
    async loadByToken(_token: string, _role?: string): Promise<AccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new LoadAccontByTokenRepositoryStub();
};

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter();
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepositoryStub();
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub);
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub,
  };
};

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.load('any_token', 'any_role');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  test('Should returtn null if decrypter returns null ', async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBeNull();
  });

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken');
    await sut.load('any_token', 'any_role');
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role');
  });

  test('Should returtn null if LoadAccountByTokenRepository returns null ', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBeNull();
  });

  test('Should returtn an account on success ', async () => {
    const { sut } = makeSut();
    const account = await sut.load('any_token', 'any_role');
    expect(account).toEqual(makeFakeAccount());
  });
});
