import { Button, Container, Flex, SimpleGrid, Title } from "@mantine/core";
import Link from "next/link";
import { CategoryEnum, CategoryLabel } from "@/types/PlayEnum";
import { IconArrowBackUp } from "@tabler/icons-react";

interface CategoryPanelProps {
  setCategory: (category: CategoryEnum) => void;
}

export default function CategoryPanel({ setCategory }: CategoryPanelProps) {
  return (
    <Container>
      <Flex mih="100dvh" direction="column" justify="center" align="start">
        <Title mb="lg">Categories ✨</Title>

        <SimpleGrid cols={2} spacing="sm" w="100%">
          {(
            Object.keys(CategoryLabel) as Array<keyof typeof CategoryLabel>
          ).map((key) => (
            <Button
              key={key}
              color={CategoryLabel[key].color}
              size="xl"
              onClick={() => setCategory(key)}
            >
              {CategoryLabel[key].label}
            </Button>
          ))}
        </SimpleGrid>

        <Button
          component={Link}
          href="/"
          aria-label="back"
          mt="md"
          size="md"
          color="gray"
        >
          <IconArrowBackUp />
        </Button>
      </Flex>
    </Container>
  );
}
