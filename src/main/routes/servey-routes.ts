import { Router } from 'express';
import { adaptRoute } from '../adapters/express/express-route-adapter';
import { mekeAddSurveyController } from '../factories/controllers/add-survey/add-survey-controller-factory';
import { mekeLoadSurveysController } from '../factories/controllers/load-surveys/load-survey-controller-factory';
import { adminAuth } from './middlewares/admin-auth';
import { auth } from './middlewares/auth';

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(mekeAddSurveyController()));
  router.get('/surveys', auth, adaptRoute(mekeLoadSurveysController()));
};
