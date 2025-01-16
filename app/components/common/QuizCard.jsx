import React from "react";
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";

const QuizCard = ({ quiz }) => {
  return (
    <Card maxW="sm" __css={{ padding: "8px" }}>
      <CardBody>
        <Stack spacing="3">
          <Heading size="md">{quiz.title}</Heading>
          <Text>{quiz.description}</Text>
          <Divider />
          <Text>
            <strong>Questions:</strong> {quiz.questions.length}
          </Text>
          <Text>
            <strong>Attempts Allowed:</strong> {quiz.attemptsAllowed}
          </Text>
          <Text>
            <strong>Passing Score:</strong> {quiz.passingScore}%
          </Text>
        </Stack>
      </CardBody>
      <div className="flex justify-center mt-4">
        <Button colorScheme="yellow" variant="outline">
          Start Quiz
        </Button>
      </div>
    </Card>
  );
};

export default QuizCard;
