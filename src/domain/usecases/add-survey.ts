export interface AddSurveyModel {
  questions: string;
  answers: Surveyanswer[];
}
export interface Surveyanswer {
  image: string;
  answers: string;
}
export interface AddSurvey {
  add(data: AddSurveyModel): Promise<void>;
}
