import { ObjectId } from 'mongodb';
import { AddAccountRepository } from '../../../../data/protocols/db/acount/add-account-repository';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { AccountModel } from '../../../../domain/models/account';
import { MongoHelper } from '../helpers/mongo-helper';
import { LoadAccontByEmailRepository } from '../../../../data/protocols/db/acount/load-account-by-email-repository';

export class AccountMongoRepository implements AddAccountRepository, LoadAccontByEmailRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const { insertedId: id } = await accountCollection.insertOne(accountData);
    const result = await accountCollection.findOne({ _id: id });
    return MongoHelper.map(result);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({ email });
    return account && MongoHelper.map(account);
  }

  async updateAccessToken(id: ObjectId, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          accessToken: token,
        },
      }
    );
  }
}
