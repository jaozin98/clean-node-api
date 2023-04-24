import { Authentication, AuthenticationModel } from "../../../domain/usecases/authentication";
import { HashComparer } from "../../protocols/criptography/hash-comparer";
import { LoadAccontByEmailRepository } from "../../protocols/db/load-account-by-email-repository";

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccontByEmailRepository

  private readonly hashComparer: HashComparer

  constructor (loadAccountByEmailRepository: LoadAccontByEmailRepository, hashComparer: HashComparer){
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashComparer = hashComparer
  }

  async auth (authentication: AuthenticationModel): Promise<string>{
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account){
    await this.hashComparer.compare(authentication.password, account.password )
    }
    return null

  }
}
