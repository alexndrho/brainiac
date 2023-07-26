import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Title,
  createStyles,
} from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons-react';
import { Category, CategoryLabel } from '../pages/Play';

const useStyles = createStyles((theme) => ({
  container: {
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  category: {
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,

    fontSize: theme.fontSizes.xl,
    fontWeight: 600,
    color: theme.colors.gray[0],
    textAlign: 'center',

    cursor: 'pointer',
    userSelect: 'none',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '&:active': {
      transform: 'translateY(0.125rem)',
    },
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
    <Container className={classes.container}>
      <Title size="h2" mb="xl">
        Categories ✨
      </Title>

      <SimpleGrid cols={2} spacing="sm" w="100%">
        {(Object.keys(CategoryLabel) as Array<keyof typeof CategoryLabel>).map(
          (key) => (
            <Box
              key={crypto.randomUUID()}
              className={classes.category}
              bg={CategoryLabel[key].color}
              role="button"
              onClick={() => handleNextStep(key)}
            >
              {CategoryLabel[key].label}
            </Box>
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
