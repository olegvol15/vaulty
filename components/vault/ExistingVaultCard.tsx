"use client";

import {
  Badge,
  Box,
  Card,
  Flex,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { LuArrowRight, LuClock3, LuFileText, LuFolderLock } from "react-icons/lu";

type ExistingVaultCardProps = {
  id: string;
  name: string;
  description?: string;
  noteCount: number;
  updatedAt: Date | string;
  href?: string;
  isLocked?: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function formatUpdatedAt(value: Date | string) {
  const date = typeof value === "string" ? new Date(value) : value;

  if (Number.isNaN(date.getTime())) {
    return "Recently updated";
  }

  return dateFormatter.format(date);
}

export default function ExistingVaultCard({
  id,
  name,
  description,
  noteCount,
  updatedAt,
  href = `/vault/${id}`,
  isLocked = true,
}: ExistingVaultCardProps) {
  return (
    <Card.Root
      asChild
      bg="whiteAlpha.100"
      borderColor="whiteAlpha.200"
      borderWidth="1px"
      maxW="300px"
      minH="210px"
      overflow="hidden"
      rounded="lg"
      shadow="xl"
      transition="border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease"
      w="full"
      _hover={{
        borderColor: "blue.300",
        shadow: "0 18px 50px rgba(14, 165, 233, 0.18)",
        transform: "translateY(-2px)",
      }}
    >
      <a
        href={href}
        aria-label={`Open ${name} vault`}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <Card.Body gap="4" p="5">
          <Flex align="start" justify="space-between" gap="4">
            <Flex
              align="center"
              bg="whiteAlpha.100"
              color="blue.200"
              h="10"
              justify="center"
              rounded="lg"
              w="10"
            >
              <Icon as={LuFolderLock} boxSize="4" />
            </Flex>

            {isLocked ? (
              <Badge colorPalette="blue" variant="subtle" rounded="md">
                Locked
              </Badge>
            ) : null}
          </Flex>

          <Box>
            <Text color="white" fontSize="md" fontWeight="semibold">
              {name}
            </Text>
            <Text color="gray.300" lineClamp="2" mt="1.5" textStyle="xs">
              {description || "No description yet"}
            </Text>
          </Box>

          <Flex
            align="center"
            color="gray.400"
            gap="3"
            justify="space-between"
            wrap="wrap"
          >
            <HStack gap="1.5">
              <Icon as={LuFileText} boxSize="4" />
              <Text textStyle="xs">
                {noteCount} {noteCount === 1 ? "note" : "notes"}
              </Text>
            </HStack>

            <HStack gap="1.5">
              <Icon as={LuClock3} boxSize="4" />
              <Text textStyle="xs">{formatUpdatedAt(updatedAt)}</Text>
            </HStack>
          </Flex>
        </Card.Body>

        <Card.Footer
          alignItems="center"
          bg="blackAlpha.300"
          color="blue.200"
          fontWeight="medium"
          justifyContent="space-between"
          px="5"
          py="2.5"
        >
          <Text textStyle="xs">Open vault</Text>
          <Icon as={LuArrowRight} boxSize="4" />
        </Card.Footer>
      </a>
    </Card.Root>
  );
}
