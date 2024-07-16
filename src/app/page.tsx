"use client";

import { Button, Container, Flex, Title } from "@mantine/core";
import Image from "next/image";
import icon from "@/assets/icon.svg";
import Link from "next/link";

export default function Home() {
  return (
    <Container h="100%" size="sm">
      <Flex h="100%" direction="column" justify="center">
        <Flex mb="lg" justify="center" align="center" gap="sm">
          <Title>Brainiac</Title>

          <Image src={icon} alt="Brainiac" width={32} height={32} />
        </Flex>

        <Button component={Link} href="/play" size="lg">
          Play
        </Button>
      </Flex>
    </Container>
  );
}
