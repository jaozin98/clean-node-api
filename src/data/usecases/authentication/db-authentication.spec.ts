import { AccountModel } from "../../../domain/models/account"
import { LoadAccontByEmailRepository } from "../../protocols/load-account-by-email-repository"
import { DbAuthentication } from "./db-authentication"

describe ('Dbauthentication UseCase', () => {
  test('Should call LoadAccontByEmailRepository with corret email', async () => {
    class LoadAccontByEmailRepositoryStub implements LoadAccontByEmailRepository {
      async load (_email: string): Promise<AccountModel> {
        const account: AccountModel={
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password'

        }
        return new Promise(resolve => resolve(account))
      }
    }
    const loadAccontByEmailRepositoryStub = new LoadAccontByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccontByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccontByEmailRepositoryStub, 'load')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@qqmail.com')
  })
})
