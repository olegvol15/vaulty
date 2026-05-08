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
      borderColor="blackAlpha.200"
      borderWidth="1px"
      maxW="360px"
      overflow="hidden"
      rounded="xl"
      shadow="sm"
      transition="border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease"
      w="full"
      _hover={{
        borderColor: "blue.300",
        shadow: "md",
        transform: "translateY(-2px)",
      }}
    >
      <a
        href={href}
        aria-label={`Open ${name} vault`}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <Card.Body gap="5">
          <Flex align="start" justify="space-between" gap="4">
            <Flex
              align="center"
              bg="blue.50"
              color="blue.600"
              h="11"
              justify="center"
              rounded="lg"
              w="11"
            >
              <Icon as={LuFolderLock} boxSize="5" />
            </Flex>

            {isLocked ? (
              <Badge colorPalette="blue" variant="subtle">
                Locked
              </Badge>
            ) : null}
          </Flex>

          <Box>
            <Text color="gray.950" fontSize="lg" fontWeight="semibold">
              {name}
            </Text>
            <Text color="gray.600" lineClamp="2" mt="1" textStyle="sm">
              {description || "No description yet"}
            </Text>
          </Box>

          <Flex align="center" color="gray.500" justify="space-between">
            <HStack gap="1.5">
              <Icon as={LuFileText} boxSize="4" />
              <Text textStyle="sm">
                {noteCount} {noteCount === 1 ? "note" : "notes"}
              </Text>
            </HStack>

            <HStack gap="1.5">
              <Icon as={LuClock3} boxSize="4" />
              <Text textStyle="sm">{formatUpdatedAt(updatedAt)}</Text>
            </HStack>
          </Flex>
        </Card.Body>

        <Card.Footer
          alignItems="center"
          bg="blackAlpha.50"
          color="blue.600"
          fontWeight="medium"
          justifyContent="space-between"
          px="6"
          py="3"
        >
          <Text textStyle="sm">Open vault</Text>
          <Icon as={LuArrowRight} boxSize="4" />
        </Card.Footer>
      </a>
    </Card.Root>
  );
}
