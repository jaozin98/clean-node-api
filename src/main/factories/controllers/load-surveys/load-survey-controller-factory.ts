import { LoadSurveysController } from '../../../../presentation/controllers/survey/load-survey/load-surveys-controller';
import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../usecases/decorators/login-controller-factory';
import { makeDbLoadSurveys } from '../../usecases/load-surveys/db-load-surveys';

export const mekeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys());
  return makeLogControllerDecorator(controller);
};
