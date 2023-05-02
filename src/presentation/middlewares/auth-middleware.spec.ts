import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/http-helper';
import { AuthMiddleware } from './auth-middleware';

describe('Auth Middleware', () => {
  test('Shold return 403 if x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
});
