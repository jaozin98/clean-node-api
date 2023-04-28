import { SignUpController } from '../../../../presentation/controllers/login/signup/signup-controller';
import { Controller } from '../../../../presentation/protocols';
import { makeSingUpValidation } from './signup-validation-factory';
import { makeDbAuthentication } from '../../usecases/authentication/db-autentication-factory';
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory';
import { makeLogControllerDecorator } from '../../usecases/decorators/login-controller-factory';

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSingUpValidation(), makeDbAuthentication());
  return makeLogControllerDecorator(controller);
};
