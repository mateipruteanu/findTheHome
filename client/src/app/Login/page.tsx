"use client";
import { AuthContext } from "@/AuthProvider";
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
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, logout, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLoginButtonClick = () => {
    login(email, password)
      .then(() => {
        toast.success("Logged in successfully!");
        router.push("/");
      })
      .catch((error) => {
        toast.error("Could not log in :(");
        console.error("Error logging in ", error);
      });
  };

  const handleNewButtonClick = () => {
    console.log("The user is now:", user);
    toast.success("The user is now: " + user);
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
              <Flex position="relative" h="36px" alignItems="center">
                <Button
                  as={Link}
                  href={"/Login"}
                  bgColor={LightModeColors.primary}
                  color={LightModeColors.background}
                  variant={"solid"}
                  roundedLeft={"full"}
                  roundedRight={0}
                  w={"160px"}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  href={"/Register"}
                  bgColor={LightModeColors.background}
                  color={LightModeColors.primary}
                  variant={"outline"}
                  roundedRight={"full"}
                  roundedLeft={0}
                  w={"160px"}
                >
                  Register
                </Button>
              </Flex>
              <FormControl id="email">
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  borderRadius={"full"}
                  variant={"filled"}
                  boxShadow="md"
                  placeholder="Enter your email..."
                  onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Enter your password..."
                    onChange={(e) => setPassword(e.target.value)}
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
                onClick={handleLoginButtonClick}
              >
                Login
              </Button>
            </Stack>
          </Center>
        </Stack>
      </Container>
    </>
  );
}
