import { Router } from 'express';
import { adaptRoute } from '../adapters/express/express-route-adapter';
import { mekeAddSurveyController } from '../factories/controllers/add-survey/add-survey-controller-factory';

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(mekeAddSurveyController()));
};
