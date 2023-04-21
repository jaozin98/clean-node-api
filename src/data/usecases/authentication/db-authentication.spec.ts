import { AccountModel } from "../../../domain/models/account"
import { AuthenticationModel } from "../../../domain/usecases/authentication"
import { LoadAccontByEmailRepository } from "../../protocols/load-account-by-email-repository"
import { DbAuthentication } from "./db-authentication"


const makeFakeAccount = (): AccountModel => ({

    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'

})

const makeLoadAccontByEmailRepository = (): LoadAccontByEmailRepository => {

class LoadAccontByEmailRepositoryStub implements LoadAccontByEmailRepository {
  async load (_email: string): Promise<AccountModel> {
    return new Promise(resolve => resolve(makeFakeAccount()))
  }
}
return new LoadAccontByEmailRepositoryStub()
}

const makeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
interface SutTypes {
  sut: DbAuthentication
  loadAccontByEmailRepositoryStub: LoadAccontByEmailRepository
}

const makeSut = (): SutTypes => {

  const loadAccontByEmailRepositoryStub = makeLoadAccontByEmailRepository()
  const sut = new DbAuthentication(loadAccontByEmailRepositoryStub)
  return {
    sut,
    loadAccontByEmailRepositoryStub
  }
}
describe ('Dbauthentication UseCase', () => {
  test('Should call LoadAccontByEmailRepository with corret email', async () => {
    const { sut, loadAccontByEmailRepositoryStub }= makeSut()
    const loadSpy = jest.spyOn(loadAccontByEmailRepositoryStub, 'load')
    await sut.auth(makeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
