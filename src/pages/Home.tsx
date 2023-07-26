import { Link } from 'react-router-dom';
import { Button, Container, Image, Title, createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  container: {
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Home = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.container}>
      <Title order={1} mb="lg" className={classes.title}>
        Brainiac <Image src="./icon.svg" alt="icon" withPlaceholder ml="xs" />
      </Title>

      <Button component={Link} to="/play" size="lg" w="100%" maw="40rem">
        Play
      </Button>
    </Container>
  );
};

export default Home;
