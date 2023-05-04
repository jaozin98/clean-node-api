import { Router } from 'express';
import { adaptRoute } from '../adapters/express/express-route-adapter';
import { mekeAddSurveyController } from '../factories/controllers/add-survey/add-survey-controller-factory';
import { makeAuthMiddleware } from '../factories/middleware/auth-middleware-factory';
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter';
import { mekeLoadSurveysController } from '../factories/controllers/load-surveys/load-survey-controller-factory';

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'));
  const auth = adaptMiddleware(makeAuthMiddleware('admin'));

  router.post('/surveys', adminAuth, adaptRoute(mekeAddSurveyController()));
  router.get('/surveys', auth, adaptRoute(mekeLoadSurveysController()));
};
