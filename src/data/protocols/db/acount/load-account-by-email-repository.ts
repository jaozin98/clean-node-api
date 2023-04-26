import { AccountModel } from '../../../../domain/models/account';

export interface LoadAccontByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel>;
}
