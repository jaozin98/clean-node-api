import { AddSurveyRepository } from '../../../../data/usecases/add- survey/db-add-servey-protocols';
import { AddSurveyModel } from '../../../../domain/usecases/add-survey';
import { MongoHelper } from '../helpers/mongo-helper';

export class SurveyMongoRepository implements AddSurveyRepository {
  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(surveyData);
  }
}
