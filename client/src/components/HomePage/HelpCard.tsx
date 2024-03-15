"use client";

import {
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Image,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { DarkModeColors, LightModeColors } from "@/colors";

interface Props {
  img: string;
  title: string;
  text: string;
  buttonText: string;
  buttonUrl: string;
}

export default function HelpCard(props: Props) {
  return (
    <Center py={"5"} minHeight={"450px"}>
      <Box
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("gray.50", "gray.900")}
        boxShadow={"2xl"}
        rounded={"2xl"}
        overflow={"hidden"}
      >
        <Stack
          textAlign={"center"}
          color={useColorModeValue("gray.50", "gray.900")}
          align={"center"}
        >
          <Image
            src={props.img}
            alt={props.buttonText + " icon"}
            boxSize="100px"
            objectFit="contain"
          />
        </Stack>

        <Flex
          bg={useColorModeValue("gray.50", "gray.900")}
          px={6}
          py={10}
          minHeight={"280px"}
          direction={"column"}
        >
          <Text textAlign={"center"} fontWeight={900} fontSize="2xl" mb={2}>
            {props.title}
          </Text>

          <Text
            textAlign={"center"}
            color={useColorModeValue("gray.700", "gray.400")}
            px={3}
          >
            {props.text}
          </Text>

          <Spacer />

          <Button
            mt={5}
            w={"full"}
            bg={LightModeColors.secondary}
            color={LightModeColors.text}
            rounded={"full"}
            onClick={() => console.log("[NotImplemented] " + props.buttonText)}
            _hover={{
              bg: "orange.400",
            }}
          >
            {props.buttonText}
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}
