import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository } from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
  private readonly hesher: Hasher

  private readonly addAccountRepository: AddAccountRepository


    constructor (hesher:Hasher, addAccountRepository: AddAccountRepository) {
      this.hesher = hesher
      this.addAccountRepository = addAccountRepository
    }

 async add (accountData: AddAccountModel): Promise<AccountModel>{
  const hashedPassword = await this.hesher.hash(accountData.password)
  const account = await this.addAccountRepository.add({ ...accountData, password: hashedPassword})
    return account
  }
}
