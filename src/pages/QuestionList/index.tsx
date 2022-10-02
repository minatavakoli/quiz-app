import {
  Box,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { QuestionListProps } from "./types";

function shuffleArray(array) {
  return array.sort((a, b) => 0.5 - Math.random());
}

const QuestionList = ({ data, setData }: QuestionListProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allAnswers, setAllAnswers] = useState<string[]>([]);
  const [value, setValue] = useState("1");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [total, setTotal] = useState(0);

  const toast = useToast();

  useEffect(() => {
    if (data) {
      const result = [
        ...data[currentQuestion].incorrect_answers,
        data[currentQuestion].correct_answer,
      ];
      setAllAnswers(shuffleArray(result));

      setCorrectAnswer(data[currentQuestion].correct_answer);
    }
  }, [data, currentQuestion]);

  useEffect(() => {
    if (data && total === data.length) {
      toast({
        title: "Result",
        description: `Number of correct answers ${correctAnswerCount}/${data.length}`,
        status: "success",
        duration: 3000,
        isClosable: false,
        position: "top",
      });

      setTimeout(() => {
        setData(undefined);
      }, 3000);
    }
  }, [total, data]);

  console.log(total);

  if (!data) {
    return <span />;
  }

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box p="2rem" borderRadius="10px" bg="#fff" w="60%" height="440px">
        <Text fontSize="4xl"> {data[currentQuestion].question}</Text>
        <Box mt="2rem">
          <RadioGroup
            onChange={(e) => {
              setValue(e);
              setTotal((current) => current + 1);

              if (e === correctAnswer) {
                setCorrectAnswerCount((current) => current + 1);
              }

              if (currentQuestion === data.length - 1) {
                return;
              }
              setCurrentQuestion((current) => current + 1);
            }}
            value={value}
          >
            <Stack direction="column">
              {allAnswers.map((item) => {
                return (
                  <Radio key={item} value={item}>
                    {item}
                  </Radio>
                );
              })}
            </Stack>
          </RadioGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionList;
