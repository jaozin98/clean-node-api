import { AccountModel } from '../../../../domain/models/account';

export interface LoadAccontByTokenRepository {
  loadByToken(token: string, role?: string): Promise<AccountModel>;
}
