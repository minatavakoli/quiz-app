import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import "./App.css";
import QuestionList from "./pages/QuestionList";
import QuizForm from "./pages/QuizForm";
import { FormValuesTypes, QuizResponse } from "./pages/QuizForm/types";


function App() {
  const [formValues, setFormValues] = useState<FormValuesTypes>({
    amount: "",
    category: "",
    difficulty: "",
  });

  const [data, setData] = useState<QuizResponse | undefined>(undefined)





  const {  isFetching } = useQuery(
    ["quiz", formValues],
    () => {
      return axios
        .get<QuizResponse>(
          `https://opentdb.com/api.php?amount=${formValues.amount}&difficulty=${formValues.difficulty}&category=${formValues.category}&type=multiple`
        )
        .then(function (response) {
          return response.data;
        });
    },
    {
      enabled: !!(
        formValues.amount &&
        formValues.category &&
        formValues.difficulty
      ),
      onSuccess: data => {
        setData(data)
      }
    }
  );

  return (
    <div>
      {data ?  (
        <QuestionList data={data.results} setData={setData} />
      ) : (
        <QuizForm
          data={data}
          isFetching={isFetching}
          setFormValues={setFormValues}
        />
      )}
    </div>
  );
}

export default App;
