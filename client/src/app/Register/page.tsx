"use client";
import { LightModeColors } from "@/colors";
import Listings from "@/components/SearchPage/Listings";
import SearchBar from "@/components/SearchPage/SearchBar";
import {
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Image,
} from "@chakra-ui/react";
import { IconEyeOff, IconEye } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterButtonClick = () => {
    console.log("Login Button Clicked");
  };

  return (
    <>
      <Container maxW={"7xl"}>
        <Stack spacing={8} py={10} direction={"row"}>
          <Image
            src="./loginRegisterSvg.svg"
            alt="findTheHome Image"
            height={"80vh"}
          />
          <Center flex={1} alignContent={"center"} justifyContent={"center"}>
            <Stack>
              <Flex
                position="relative"
                h="36px"
                alignContent="center"
                justifyContent={"center"}
              >
                <Button
                  as={Link}
                  href={"/Login"}
                  bgColor={LightModeColors.background}
                  color={LightModeColors.primary}
                  variant={"outline"}
                  onClick={() => {
                    console.log("Login Button Clicked");
                  }}
                  roundedLeft={"full"}
                  roundedRight={0}
                  w={"160px"}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  href={"/Register"}
                  bgColor={LightModeColors.primary}
                  color={LightModeColors.background}
                  variant={"solid"}
                  roundedRight={"full"}
                  roundedLeft={0}
                  w={"160px"}
                >
                  Register
                </Button>
              </Flex>

              <Stack direction={"row"}>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    borderRadius={"full"}
                    variant={"filled"}
                    boxShadow="md"
                  />
                </FormControl>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    borderRadius={"full"}
                    variant={"filled"}
                    boxShadow="md"
                  />
                </FormControl>
              </Stack>
              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  borderRadius={"full"}
                  variant={"filled"}
                  boxShadow="md"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    borderRadius={"full"}
                    variant={"filled"}
                    boxShadow="md"
                  />
                  <InputRightElement>
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      borderRadius={"full"}
                      variant={"outline"}
                    >
                      {showPassword ? <IconEyeOff /> : <IconEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    borderRadius={"full"}
                    variant={"filled"}
                    boxShadow="md"
                  />
                  <InputRightElement>
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      borderRadius={"full"}
                      variant={"outline"}
                    >
                      {showPassword ? <IconEyeOff /> : <IconEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                bg={LightModeColors.secondary}
                rounded="full"
                w={"50%"}
                alignSelf={"center"}
                boxShadow="md"
                aria-label="Search"
                ml={2}
                my={4}
                h="50px"
                onClick={handleRegisterButtonClick}
              >
                Register
              </Button>
            </Stack>
          </Center>
        </Stack>
      </Container>
    </>
  );
}
