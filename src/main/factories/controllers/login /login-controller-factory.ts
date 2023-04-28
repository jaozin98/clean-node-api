import { makeLoginValidation } from './login-validation-factory';
import { Controller } from '../../../../presentation/protocols';
import { LoginController } from '../../../../presentation/controllers/login/login /login-controller.';
import { makeDbAuthentication } from '../../usecases/authentication/db-autentication-factory';
import { makeLogControllerDecorator } from '../../usecases/decorators/login-controller-factory';

export const mekeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation());
  return makeLogControllerDecorator(controller);
};
