import { Router } from 'express';
import { adaptRoute } from '../adapters/express/express-route-adapter';
import { makeSignUpController } from '../factories/controllers/signup/signup-controller-factory';
import { mekeLoginController } from '../factories/controllers/login /login-controller-factory';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  router.post('/login', adaptRoute(mekeLoginController()));
};
