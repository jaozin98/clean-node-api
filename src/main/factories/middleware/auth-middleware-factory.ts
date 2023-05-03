import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware';
import { Middleware } from '../../../presentation/protocols';
import { makeDbLoadAccountByToken } from '../usecases/load-account-by-token/db-load-account-by-token-factory';

export const makeAuthMiddleware = (_role?: string): Middleware => new AuthMiddleware(makeDbLoadAccountByToken());
