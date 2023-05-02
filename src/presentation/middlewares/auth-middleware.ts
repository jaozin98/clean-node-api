import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/http-helper';
import { Middleware, HttpResponse, HttpRequest } from '../protocols';

export class AuthMiddleware implements Middleware {
  async handle(_HttpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbidden(new AccessDeniedError());
    return new Promise((resolve) => resolve(error));
  }
}
