"use client";

import {
  Stack,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import HeroSearch from "./HeroSearch";
import HeroSVG from "./HeroSVG";

export default function HeroSection() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack
      align={"center"}
      justify={"center"}
      direction={{ base: "column", md: "row" }}
    >
      <Stack flex={1}>
        <Heading
          fontWeight={"900"}
          fontSize={{ base: "3xl", sm: "4xl", lg: "7xl" }}
          pb={4}
        >
          <Text
            as={"span"}
            position={"relative"}
            fontWeight={"900"}
            fontSize={{ base: "xl", sm: "2xl", lg: "5xl" }}
          >
            i'm looking to...
          </Text>
          <br />
          <Text as={"span"} color={useColorModeValue("blue.800", "orange.400")}>
            findTheHome.
          </Text>
        </Heading>
        <HeroSearch />
      </Stack>
      <Flex
        flex={1}
        justify={"center"}
        align={"center"}
        position={"relative"}
        display={{ base: "none", md: "flex" }}
      >
        <HeroSVG />
      </Flex>
    </Stack>
  );
}
