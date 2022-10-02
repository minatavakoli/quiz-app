export interface FormValuesTypes {
  amount: string;
  category: string;
  difficulty: string;
}

export interface QuizResponse {
  response_code: number;
  results: ResultsEntity[];
}
export interface ResultsEntity {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizeFormProps {
  data?: QuizResponse;
  isFetching: boolean;
  setFormValues: React.Dispatch<React.SetStateAction<FormValuesTypes>>;
}
