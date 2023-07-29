import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Loader,
  Overlay,
  Progress,
  Text,
  Title,
  createStyles,
} from '@mantine/core';
import { IconAlarm, IconArrowBackUp } from '@tabler/icons-react';

import { Category, CategoryLabel, Difficulty } from '../pages/Play';
import fetchQuestions from '../api/fetchQuestions';
import { IconRepeat } from '@tabler/icons-react';

const INITIAL_COUNTDOWN = 4;
const TIMER = 15;

const useStyles = createStyles((theme) => ({
  container: {
    minHeight: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  timer: {
    width: '5rem',
    padding: theme.spacing.xs,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.dark[9],

    fontSize: '1.25rem',
    fontWeight: 'bold',

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  timerDanger: {
    color: theme.colors.red[6],
  },

  resultContainer: {
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

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
  category: Category;
  difficulty: Difficulty;
  onCancel: () => void;
}

const Game = ({ category, difficulty, onCancel }: Game) => {
  const { classes } = useStyles();

  const [initialCountdown, setInitialCountdown] =
    useState<number>(INITIAL_COUNTDOWN);
  const [timer, setTimer] = useState<number>(TIMER);

  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [isUserAnswered, setIsUserAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const getQuestions = useCallback(async () => {
    try {
      const data = await fetchQuestions(category, difficulty);

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
  }, [category, difficulty]);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  // initial count down
  useEffect(() => {
    if (!questions) return;
    let timer: number | undefined;

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
    let time = 0;

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
      <Container py="lg" className={classes.resultContainer}>
        <Title order={1} size="h1" mb="xl">
          {CategoryLabel[category].label}
        </Title>
        <Text mb="lg" fz="1.75rem" fw="bold" lh="1.25em">
          Your score is{' '}
          <Text span color="blue">
            {score}
          </Text>{' '}
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
      </Container>
    );
  }

  return (
    <Container py="lg" className={classes.container}>
      <Group mb="xl" w="100%" position="apart">
        <Title order={1} size="h1">
          {CategoryLabel[category].label}
        </Title>

        <Box
          className={`${classes.timer} ${
            timer <= 5 ? classes.timerDanger : ''
          }`}
        >
          <IconAlarm />
          {timer.toString().padStart(2, '0')}
        </Box>
      </Group>

      {!questions ? (
        <Loader size="xl" my="10rem" mx="auto" />
      ) : (
        <>
          {initialCountdown !== 0 && (
            <Overlay blur="15" center style={{ userSelect: 'none' }}>
              <Text fz="6.5rem" fw="bolder">
                {initialCountdown - 1 !== 0 ? initialCountdown - 1 : 'GO!'}
              </Text>
            </Overlay>
          )}

          <Text mb="lg" fz="1.75rem" fw="bold" lh="1.25em">
            {questions[questionNumber].question}
          </Text>

          <Flex w="100%" direction="column" gap="xs">
            {questions[questionNumber].answers.map((answer, index) => (
              <Button
                key={crypto.randomUUID()}
                role="button"
                color={
                  !isUserAnswered
                    ? 'blue'
                    : answer.isCorrect
                    ? 'green'
                    : !answer.isClicked
                    ? 'blue'
                    : answer.isCorrect
                    ? 'green'
                    : 'red'
                }
                onClick={() => handleAnswerClick(index)}
                styles={(theme) => ({
                  root: {
                    borderRadius: theme.radius.md,
                    height: 'auto',
                    padding: theme.spacing.lg,
                  },

                  label: {
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    overflow: 'visible',
                    whiteSpace: 'normal',
                    textAlign: 'center',
                  },
                })}
              >
                <Text>{answer.text}</Text>
              </Button>
            ))}
          </Flex>

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
    </Container>
  );
};

export default Game;
