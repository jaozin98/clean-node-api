import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository, LoadAccontByEmailRepository } from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  constructor(private readonly hesher: Hasher, private readonly addAccountRepository: AddAccountRepository, private readonly loadAccontByEmailRepository: LoadAccontByEmailRepository) {}

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    await this.loadAccontByEmailRepository.loadByEmail(accountData.email);
    const hashedPassword = await this.hesher.hash(accountData.password);
    const account = await this.addAccountRepository.add({ ...accountData, password: hashedPassword });
    return account;
  }
}
