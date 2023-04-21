import { Authentication, AuthenticationModel } from "../../../domain/usecases/authentication";
import { LoadAccontByEmailRepository } from "../../protocols/load-account-by-email-repository";

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccontByEmailRepository

  constructor (loadAccountByEmailRepository: LoadAccontByEmailRepository){
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string>{
    await this.loadAccountByEmailRepository.load(authentication.email)
    return null

  }
}
