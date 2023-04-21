import { AccountModel } from "../../domain/models/account"


export interface LoadAccontByEmailRepository{
  load (email: string): Promise<AccountModel>
}
