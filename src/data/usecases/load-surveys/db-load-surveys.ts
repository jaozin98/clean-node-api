import { SurveyModel } from '../../../domain/models/survey';
import { LoadSurveys } from '../../../domain/usecases/load-surveys';
import { LoadSurveyRepository } from '../../protocols/db/survey/load-survey-repository';

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveyRepository) {}

  async load(): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll();
    return surveys;
  }
}