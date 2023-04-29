export interface AddSurveyModel {
  questions: string;
  answers: SurveyAnswer[];
}
export interface SurveyAnswer {
  image: string;
  answers: string;
}
export interface AddSurvey {
  add(data: AddSurveyModel): Promise<void>;
}
