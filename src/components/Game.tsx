import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Loader,
  Text,
  Title,
  createStyles,
} from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons-react';

import { Category, CategoryLabel, Difficulty } from '../pages/Play';
import getQuestions from '../api/getQuestions';

const useStyles = createStyles((theme) => ({
  container: {
    minHeight: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  resultContainer: {
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn: {
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    color: theme.colors.gray[0],
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',

    '&:active': {
      transform: 'translateY(2px)',
    },
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

  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [isUserAnswered, setIsUserAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    getQuestions(category, difficulty)
      .then((data) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category, difficulty]);

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
    }, 1000);
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
        <Button
          aria-label="cancel-quiz"
          size="md"
          color="gray"
          onClick={() => onCancel()}
        >
          <IconArrowBackUp />
        </Button>
      </Container>
    );
  }

  return (
    <Container py="lg" className={classes.container}>
      <Title order={1} size="h1" mb="xl">
        {CategoryLabel[category].label}
      </Title>

      {!questions ? (
        <Loader size="xl" mt="xl" mx="auto" />
      ) : (
        <>
          <Text mb="lg" fz="1.75rem" fw="bold" lh="1.25em">
            {questions[questionNumber].question}
          </Text>

          <Flex w="100%" direction="column" gap="xs">
            {questions[questionNumber].answers.map((answer, index) => (
              <Box
                key={crypto.randomUUID()}
                role="button"
                className={classes.btn}
                bg={
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
              >
                <Text>{answer.text}</Text>
              </Box>
            ))}
          </Flex>
          <Button
            aria-label="cancel-quiz"
            mt="md"
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
