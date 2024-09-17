import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Loader,
  Overlay,
  Progress,
  SimpleGrid,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { IconAlarm, IconArrowBackUp } from "@tabler/icons-react";
import { fetchQuestions } from "@/api/trivia";
import { CategoryEnum, CategoryLabel, DifficultyEnum } from "@/types/PlayEnum";
import { IconRepeat } from "@tabler/icons-react";
import classes from "@/styles/Game.module.css";

const INITIAL_COUNTDOWN = 4;
const TIMER = 15;

type Answer = {
  text: string;
  isClicked: boolean;
  isCorrect: boolean;
};

type Question = {
  question: string;
  answers: Answer[];
};

interface Game {
  category: CategoryEnum;
  numberOfQuestions: number;
  difficulty: DifficultyEnum;
  onCancel: () => void;
}

const Game = ({ category, numberOfQuestions, difficulty, onCancel }: Game) => {
  const [initialCountdown, setInitialCountdown] =
    useState<number>(INITIAL_COUNTDOWN);
  const [timer, setTimer] = useState<number>(TIMER);

  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [isUserAnswered, setIsUserAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const getQuestions = useCallback(async () => {
    try {
      const data = await fetchQuestions(
        category,
        numberOfQuestions,
        difficulty
      );

      const questions: Question[] = data.map((question) => {
        let answers = question.incorrectAnswers.map((answer) => ({
          text: answer,
          isClicked: false,
          isCorrect: false,
        }));

        answers.push({
          text: question.correctAnswer,
          isClicked: false,
          isCorrect: true,
        });

        answers = answers.sort(() => Math.random() - 0.5);
        return {
          question: question.question.text,
          answers: answers,
        };
      });

      setQuestions(questions);
    } catch (error) {
      console.error(error);
      setQuestions([]);
    }
  }, [category, numberOfQuestions, difficulty]);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  // initial count down
  useEffect(() => {
    if (!questions) return;
    let timer: NodeJS.Timeout;

    if (initialCountdown > 0) {
      timer = setTimeout(() => {
        setInitialCountdown(initialCountdown - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [questions, initialCountdown]);

  // timer for each question after initial countdown
  useEffect(() => {
    if (
      !questions ||
      initialCountdown !== 0 ||
      isUserAnswered ||
      questionNumber === questions.length
    )
      return;
    let time = null;

    if (timer > 0) {
      time = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setQuestionNumber(questionNumber + 1);
      setTimer(TIMER);
    }

    return () => {
      if (time) {
        clearTimeout(time);
      }
    };
  }, [timer, initialCountdown, questions, questionNumber, isUserAnswered]);

  const handleAnswerClick = (index: number) => {
    if (!questions || isUserAnswered) return;

    setIsUserAnswered(true);
    const newQuestions = [...questions];
    newQuestions[questionNumber].answers[index].isClicked = true;

    setQuestions(newQuestions);

    if (questions[questionNumber].answers[index].isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setQuestionNumber(questionNumber + 1);
      setIsUserAnswered(false);
      setTimer(15);
    }, 1000);
  };

  const handlePlayAgain = () => {
    setQuestions(null);
    setInitialCountdown(INITIAL_COUNTDOWN);
    setTimer(TIMER);
    setQuestionNumber(0);
    setIsUserAnswered(false);
    setScore(0);
    getQuestions();
  };

  if (questions && questionNumber >= questions.length) {
    return (
      <Container>
        <Flex
          mih="100vh"
          py="lg"
          direction="column"
          justify="center"
          align="center"
        >
          <Title mb="lg">{CategoryLabel[category].label}</Title>
          <Text mb="lg" fz="h2" fw="bold">
            Your score is{" "}
            <Text span inherit c="blue">
              {score}
            </Text>{" "}
            out of {questions.length}
          </Text>

          <Group>
            <Button
              aria-label="play again"
              size="md"
              onClick={() => handlePlayAgain()}
            >
              <IconRepeat />
            </Button>

            <Button
              aria-label="cancel quiz"
              size="md"
              color="gray"
              onClick={() => onCancel()}
            >
              <IconArrowBackUp />
            </Button>
          </Group>
        </Flex>
      </Container>
    );
  }

  return (
    <Container>
      <Flex
        mih="100vh"
        py="lg"
        direction="column"
        justify="center"
        align="start"
      >
        <Group mb="xl" w="100%" justify="space-between">
          <Title order={1} size="h1">
            {CategoryLabel[category].label}
          </Title>

          <Box c={timer <= 5 ? "red" : ""} className={classes.timer}>
            <IconAlarm />

            <Text fw="bold">{timer.toString().padStart(2, "0")}</Text>
          </Box>
        </Group>

        {!questions ? (
          <Loader size="xl" my="10rem" mx="auto" />
        ) : (
          <>
            {initialCountdown !== 0 && (
              <Overlay blur="15" center style={{ userSelect: "none" }}>
                <Text fz="6.5rem" fw="bolder">
                  {initialCountdown - 1 !== 0 ? initialCountdown - 1 : "GO!"}
                </Text>
              </Overlay>
            )}

            <Text mb="xl" fz="1.75rem" fw="bold" lh="1.25em">
              {questions[questionNumber].question}
            </Text>

            <SimpleGrid w="100%" cols={{ base: 1, md: 2 }}>
              {questions[questionNumber].answers.map((answer, index) => (
                <UnstyledButton
                  key={index}
                  className={`${classes["answer-button"]} ${
                    !isUserAnswered
                      ? ""
                      : answer.isCorrect
                      ? classes["answer-button--correct"]
                      : !answer.isClicked
                      ? ""
                      : classes["answer-button--incorrect"]
                  }`}
                  onClick={() => handleAnswerClick(index)}
                >
                  {answer.text}
                </UnstyledButton>
              ))}
            </SimpleGrid>

            <Progress
              my="md"
              w="100%"
              size="sm"
              radius="md"
              aria-label="quiz progress"
              value={Math.round((questionNumber / questions.length) * 100)}
            />

            <Button
              aria-label="cancel quiz"
              size="md"
              color="gray"
              onClick={() => onCancel()}
            >
              <IconArrowBackUp />
            </Button>
          </>
        )}
      </Flex>
    </Container>
  );
};

export default Game;
