/* eslint-disable max-classes-per-file */
import { AccountModel } from "../../../domain/models/account"
import { AuthenticationModel } from "../../../domain/usecases/authentication"
import { LoadAccontByEmailRepository } from "../../protocols/db/load-account-by-email-repository"
import { DbAuthentication } from "./db-authentication"
import { HashComparer } from "../../protocols/criptography/hash-comparer"
import  { TokenGenerator } from "../../protocols/criptography/token-generator"

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
const makeTokenGenerator = (): TokenGenerator  => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate (_id: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new TokenGeneratorStub()
}

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
interface SutTypes {
  sut: DbAuthentication
  loadAccontByEmailRepositoryStub: LoadAccontByEmailRepository
  hashComparerStub: HashComparer
  tokenGeneratorStub: TokenGenerator
}

const makeSut = (): SutTypes => {

  const loadAccontByEmailRepositoryStub = makeLoadAccontByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const tokenGeneratorStub = makeTokenGenerator()
  const sut = new DbAuthentication(
    loadAccontByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub
    )
  return {
    sut,
    loadAccontByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub
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

  test('Should call TokenGenerator with corret id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth(makeFakeAuthentication())
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if TokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub }= makeSut()
    jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(new Promise((_resolve, reject) => reject (new Error())))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

   test('Shold call TokenGenerator with correctid', async () => {
    const { sut } =makeSut()
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBe('any_token')
   })
})
