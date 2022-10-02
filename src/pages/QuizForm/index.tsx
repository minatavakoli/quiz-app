import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Field, Formik } from "formik";
import { useState } from "react";
import { FormValuesTypes, QuizeFormProps, QuizResponse } from "./types";

const QuizForm = ({data, isFetching, setFormValues}: QuizeFormProps) => {


  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box p="2rem" borderRadius="10px" bg="#fff" w="40%" height="440px">
        <Text fontWeight="bold" fontSize="4xl">
          Setup Quiz
        </Text>

        <Formik
          initialValues={{
            count: "0",
            category: "",
            difficulty: "",
          }}
          onSubmit={(values) => {
            setFormValues({
              amount: values.count,
              difficulty: values.difficulty,
              category: values.category,
            });
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="count">Number Of Questions</FormLabel>
                  <Field
                    as={Input}
                    id="count"
                    name="count"
                    type="number"
                    variant="filled"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <Select
                    placeholder="Select option"
                    onChange={handleChange}
                    value={values.category}
                    name="category"
                    id="category"
                  >
                    <option value="21">Sports</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="difficulty">Select Difficulty</FormLabel>
                  <Select
                    placeholder="Select option"
                    onChange={handleChange}
                    value={values.difficulty}
                    name="difficulty"
                    id="difficulty"
                  >
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="purple"
                  width="full"
                  isLoading={isFetching}
                >
                  Start
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default QuizForm;
