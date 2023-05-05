/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
import { DbAddAccount } from './db-add-account';
import { AccountModel, AddAccountModel, Hasher, AddAccountRepository, LoadAccontByEmailRepository } from './db-add-account-protocols';

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(_value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'));
    }
  }
  return new HasherStub();
};
const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(_accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new AddAccountRepositoryStub();
};
const makeLoadAccontByEmailRepository = (): LoadAccontByEmailRepository => {
  class LoadAccontByEmailRepositoryStub implements LoadAccontByEmailRepository {
    async loadByEmail(_email: string): Promise<AccountModel> {
      return new Promise((resolve) => resolve(null));
    }
  }
  return new LoadAccontByEmailRepositoryStub();
};

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
});

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
});
type SutTypes = {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
  loadAccontByEmailRepositoryStub: LoadAccontByEmailRepository;
};

const makeSut = (): SutTypes => {
  const loadAccontByEmailRepositoryStub = makeLoadAccontByEmailRepository();
  const hasherStub = makeHasher();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccontByEmailRepositoryStub);

  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccontByEmailRepositoryStub,
  };
};

describe('DbAddAccount UseCase', () => {
  // Deve chamar o  com a senha correta
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const encryptSpy = jest.spyOn(hasherStub, 'hash');
    await sut.add(makeFakeAccountData());
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });

  // Deve lançar se o  lançar

  test('Should throw if AddAccountRepository  throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(
      new Promise((_resolve, reject) => {
        reject(new Error());
      })
    );
    const promise = sut.add(makeFakeAccountData());
    await expect(promise).rejects.toThrow();
  });
  // Deve chamar os valores corretos de AddAccountRepository

  test('Should call AddAccountRepository correct values ', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    await sut.add(makeFakeAccountData());
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password',
    });
  });
  // Deve retornar uma conta com sucesso

  test('Should return an account on success ', async () => {
    const { sut } = makeSut();
    const account = await sut.add(makeFakeAccountData());
    expect(account).toEqual(makeFakeAccount());
  });

  test('Should return null if LoadAccontByEmailRepository not return null ', async () => {
    const { sut, loadAccontByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccontByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve) => resolve(makeFakeAccount())));
    const account = await sut.add(makeFakeAccountData());
    expect(account).toBeNull();
  });

  test('Should call LoadAccontByEmailRepository with corret email', async () => {
    const { sut, loadAccontByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccontByEmailRepositoryStub, 'loadByEmail');
    await sut.add(makeFakeAccountData());
    expect(loadSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });
});
