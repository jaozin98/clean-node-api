import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token';
import { AccessDeniedError } from '../errors';
import { forbidden, ok, serverError } from '../helpers/http/http-helper';
import { Middleware, HttpResponse, HttpRequest } from '../protocols';

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken, private readonly role?: string) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token'];

    try {
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role);
        if (account) {
          return ok({ accountId: account.id });
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}