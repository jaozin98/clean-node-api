import { SurveyAnswerModel } from '../models/survey';

export interface AddSurveyModel {
  questions: string;
  answers: SurveyAnswerModel[];
  date: Date;
}
export interface AddSurvey {
  add(data: AddSurveyModel): Promise<void>;
}
