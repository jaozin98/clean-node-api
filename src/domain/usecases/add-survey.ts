export interface AddSurveyModel {
  questions: string;
  answers: SurveyAnswer[];
  date: Date;
}
export interface SurveyAnswer {
  image?: string;
  answer: string;
}
export interface AddSurvey {
  add(data: AddSurveyModel): Promise<void>;
}
