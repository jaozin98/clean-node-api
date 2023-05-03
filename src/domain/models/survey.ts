export interface SurveyModel {
  id: string;
  questions: string;
  answers: SurveyAnswerModel[];
  date: Date;
}
export interface SurveyAnswerModel {
  image?: string;
  answer: string;
}
