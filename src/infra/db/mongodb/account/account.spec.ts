import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account-repository';

let accountCollection: Collection;

describe('Accopunt Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  const makeSut = (): AccountMongoRepository => new AccountMongoRepository();

  test('Shold return an accont on add success', async () => {
    const sut = makeSut();
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@mail.com');
    expect(account.password).toBe('any_password');
  });

  test('Shold return an accont on loadByEmail success', async () => {
    const sut = makeSut();
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    const account = await sut.loadByEmail('any_email@mail.com');
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@mail.com');
    expect(account.password).toBe('any_password');
  });

  test('Shold return null if loadByEmail fails', async () => {
    const sut = makeSut();
    const account = await sut.loadByEmail('any_email@mail.com');
    expect(account).toBeFalsy();
  });

  test('Shold update the account accessToken success', async () => {
    const sut = makeSut();
    const { insertedId: id } = await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    const fakeAccount = await accountCollection.findOne({ _id: id });
    expect(fakeAccount.accessToken).toBeFalsy();
    // eslint-disable-next-line no-underscore-dangle
    await sut.updateAccessToken(fakeAccount._id, 'any_token');
    // eslint-disable-next-line no-underscore-dangle
    const account = await accountCollection.findOne({ _id: fakeAccount._id });
    expect(account).toBeTruthy();
    // eslint-disable-next-line no-underscore-dangle
    expect(account._id).toBeTruthy();
    expect(account.accessToken).toBe('any_token');
  });
});
