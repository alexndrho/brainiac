import { Button, Container, Flex, Input, Text, TextInput } from "@mantine/core";

export default function Join() {
  return (
    <Container size="xs">
      <Flex h="100dvh" direction="column" justify="center">
        <Flex>
          <Text component="label" htmlFor="code" fz="xl">
            Enter code:
          </Text>

          <Input id="code" />
        </Flex>

        <Button mt="md" size="md">
          Join
        </Button>
      </Flex>
    </Container>
  );
}
