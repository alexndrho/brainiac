import { Button, Container, Flex, Select, Text, Title } from "@mantine/core";
import {
  CategoryEnum,
  CategoryLabel,
  DifficultyEnum,
  NumberOfQuestionType,
} from "@/types/PlayEnum";

interface DifficultyPanelProps {
  category: CategoryEnum;
  numberOfQuestions: NumberOfQuestionType;
  difficulty: DifficultyEnum;
  setNumberOfQuestions: (questions: NumberOfQuestionType) => void;
  setDifficulty: (difficulty: DifficultyEnum) => void;
  onStart: () => void;
  onCancel: () => void;
}

export default function DifficultyPanel({
  category,
  numberOfQuestions,
  difficulty,
  setNumberOfQuestions,
  setDifficulty,
  onStart,
  onCancel,
}: DifficultyPanelProps) {
  return (
    <Container size="xs">
      <Flex mih="100dvh" direction="column" justify="center">
        <Title mt="lg" ta="center" mb="xl">
          {CategoryLabel[category].label}
        </Title>

        <Flex justify="space-between" mb="lg" w="100%">
          <Text component="label" htmlFor="difficulty" fz="xl">
            Difficulty:
          </Text>
          <Select
            id="difficulty"
            data={Object.values(DifficultyEnum).map((diff) => ({
              value: diff,
              label: diff.charAt(0).toUpperCase() + diff.slice(1),
            }))}
            value={difficulty}
            onChange={(value) => setDifficulty(value as DifficultyEnum)}
          />
        </Flex>

        <Flex justify="space-between" mb="lg" w="100%">
          <Text component="label" htmlFor="question" fz="xl">
            Number of questions:
          </Text>
          <Select
            id="question"
            data={["10", "20", "30"]}
            value={numberOfQuestions.toString()}
            onChange={(value) =>
              setNumberOfQuestions((value || 10) as NumberOfQuestionType)
            }
          />
        </Flex>

        <Flex w="100%" gap="xs">
          <Button size="md" w="100%" onClick={onStart}>
            Start
          </Button>

          <Button size="md" color="red" w="100%" onClick={onCancel}>
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
