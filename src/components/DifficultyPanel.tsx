import {
  Button,
  Container,
  Flex,
  Group,
  Select,
  Text,
  Title,
  createStyles,
} from '@mantine/core';
import { Category, CategoryLabel, Difficulty } from '../pages/Play';

const useStyles = createStyles(() => ({
  container: {
    minHeight: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

interface DifficultyPanel {
  category: Category;
  difficulty: Difficulty;
  onDifficultyChange: React.Dispatch<React.SetStateAction<Difficulty>>;

  onStart: () => void;
  onCancel: () => void;
}

const DifficultyPanel = ({
  category,
  difficulty,
  onDifficultyChange,
  onStart,
  onCancel,
}: DifficultyPanel) => {
  const { classes } = useStyles();

  const handleDifficultyChange = (difficulty: Difficulty | null) => {
    if (difficulty !== null) {
      onDifficultyChange(difficulty);
    }
  };

  return (
    <Container py="lg" size="xs" className={classes.container}>
      <Title order={1} size="h1" mt="lg" mb="2.5rem">
        {CategoryLabel[category].label}
      </Title>

      <Group position="apart" mb="lg" w="100%">
        <Text component="label" htmlFor="difficulty" fz="1.5rem">
          Difficulty:
        </Text>
        <Select
          id="difficulty"
          data={Object.values(Difficulty).map((diff) => ({
            value: diff,
            label: diff.charAt(0).toUpperCase() + diff.slice(1),
          }))}
          value={difficulty}
          onChange={handleDifficultyChange}
        />
      </Group>

      <Flex w="100%" gap="xs">
        <Button size="md" w="100%" onClick={onStart}>
          Start
        </Button>
        <Button size="md" color="red" w="100%" onClick={onCancel}>
          Cancel
        </Button>
      </Flex>
    </Container>
  );
};

export default DifficultyPanel;
