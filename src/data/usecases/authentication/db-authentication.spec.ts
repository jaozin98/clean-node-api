/* eslint-disable max-classes-per-file */
import { DbAuthentication } from "./db-authentication"
import {
AccountModel,
AuthenticationModel,
LoadAccontByEmailRepository,
HashComparer,
Encrypter,
UpdateAccessTokenRepository
 } from './db-authentication-protocols'

const makeFakeAccount = (): AccountModel => ({

    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hashed_password'

})

const makeLoadAccontByEmailRepository = (): LoadAccontByEmailRepository => {
class LoadAccontByEmailRepositoryStub implements LoadAccontByEmailRepository {
  async load (_email: string): Promise<AccountModel> {
    return new Promise(resolve => resolve(makeFakeAccount()))
  }
}
return new LoadAccontByEmailRepositoryStub()
}
function makeHashComparer(): HashComparer {
  class HashComparerStub implements HashComparer {
    async compare (_value: string, _hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new HashComparerStub()
}

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeEncrypter = (): Encrypter  => {
  class EncrypterStub implements Encrypter {
    async encrypt (_value: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new EncrypterStub()
}
const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository  => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepositoryStub {
    async update (_id: string, _token: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}
interface SutTypes {
  sut: DbAuthentication
  loadAccontByEmailRepositoryStub: LoadAccontByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {

  const loadAccontByEmailRepositoryStub = makeLoadAccontByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const encrypterStub = makeEncrypter()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccontByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
    )
  return {
    sut,
    loadAccontByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}
describe ('Dbauthentication UseCase', () => {
  // Deve chamar LoadAccontBy Email Repository com o email correto
  test('Should call LoadAccontByEmailRepository with corret email', async () => {
    const { sut, loadAccontByEmailRepositoryStub }= makeSut()
    const loadSpy = jest.spyOn(loadAccontByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
  // Deve lançar se LoadAccontByEmailRepository lançar
  test('Should throw if LoadAccontByEmailRepository throws', async () => {
    const { sut, loadAccontByEmailRepositoryStub }= makeSut()
    jest.spyOn(loadAccontByEmailRepositoryStub, 'load').mockReturnValueOnce(new Promise((_resolve, reject) => reject (new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
  // Deve retornar LoadAccontByEmailRepository retorna nulo
  test('Should return LoadAccontByEmailRepository returns null', async () => {
    const { sut, loadAccontByEmailRepositoryStub }= makeSut()
    jest.spyOn(loadAccontByEmailRepositoryStub, 'load').mockReturnValueOnce(null)
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })
  // Deve chamar o Hash Comparer com a senha correta
  test('Should call HashComparer with corret password', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })
  // Deve lançar se HashComparer lançar
  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub }= makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((_resolve, reject) => reject (new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
  // Deve retornar null se HashComparer retornar false
  test('Should  returns null if HashComparer  returns false', async () => {
    const { sut, hashComparerStub }= makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise (resolve => resolve(false)))
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call EncrypterStub with corret id', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(makeFakeAuthentication())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if EncrypterStub throws', async () => {
    const { sut, encrypterStub }= makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((_resolve, reject) => reject (new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

   test('Shold return a token success', async () => {
    const { sut } =makeSut()
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBe('any_token')
   })
   test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const  updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update')
    await sut.auth(makeFakeAuthentication())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
   })
   test('Should throw if HashComparer throws', async () => {
    const { sut, updateAccessTokenRepositoryStub }= makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'update').mockReturnValueOnce(new Promise((_resolve, reject) => reject (new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
