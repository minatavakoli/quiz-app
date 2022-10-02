import { QuizResponse, ResultsEntity } from "../QuizForm/types";

export interface QuestionListProps {
    data?:  ResultsEntity[]
    setData: React.Dispatch<React.SetStateAction<QuizResponse | undefined>>
}