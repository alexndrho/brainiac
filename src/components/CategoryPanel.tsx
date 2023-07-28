import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  SimpleGrid,
  Title,
  createStyles,
} from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons-react';
import { Category, CategoryLabel } from '../pages/Play';

const useStyles = createStyles(() => ({
  container: {
    minHeight: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
}));

interface CategoryPanelProps {
  onNextStep: () => void;
  onCategoryChange: React.Dispatch<React.SetStateAction<Category>>;
  onCancel: () => void;
}

const CategoryPanel = ({
  onNextStep,
  onCategoryChange,
  onCancel,
}: CategoryPanelProps) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleNextStep = (category: Category) => {
    onCategoryChange(category);
    onNextStep();
  };

  const handleCancel = () => {
    onCancel();
    navigate(-1);
  };

  return (
    <Container py="lg" className={classes.container}>
      <Title size="h2" mb="xl">
        Categories ✨
      </Title>

      <SimpleGrid cols={2} spacing="sm" w="100%">
        {(Object.keys(CategoryLabel) as Array<keyof typeof CategoryLabel>).map(
          (key) => (
            <Button
              key={crypto.randomUUID()}
              size="xl"
              color={CategoryLabel[key].color}
              onClick={() => handleNextStep(key)}
              styles={(theme) => ({
                root: {
                  borderRadius: theme.radius.md,
                  height: 'auto',
                  padding: theme.spacing.xl,
                },

                label: {
                  overflow: 'visible',
                  whiteSpace: 'normal',
                  textAlign: 'center',
                },
              })}
            >
              {CategoryLabel[key].label}
            </Button>
          )
        )}
      </SimpleGrid>

      <Button
        aria-label="back"
        mt="md"
        size="md"
        color="gray"
        onClick={() => handleCancel()}
      >
        <IconArrowBackUp />
      </Button>
    </Container>
  );
};

export default CategoryPanel;
