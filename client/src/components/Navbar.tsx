"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/next-js";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { DarkModeColors, LightModeColors } from "@/colors";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/AuthProvider";
import toast from "react-hot-toast";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout, loading, user } = useContext(AuthContext);
  let username: string | undefined;
  const profilePhoto = "https://i.postimg.cc/3RMWR0s6/image.jpg";

  const handleLogoutButtonClick = () => {
    logout();
    toast.success("Logged out successfully!");
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Button variant="ghost" as={Link} href={"/"}>
            {colorMode === "light" ? (
              <Image
                src="./lightLogo.svg"
                alt="logo"
                width={150}
                height={150}
                priority={true}
              />
            ) : (
              <Image
                src="./darkLogo.svg"
                alt="logo"
                width={150}
                height={150}
                priority={true}
              />
            )}
          </Button>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              {loading ? <p>Loading...</p> : null}

              <Menu>
                {loading ? null : user ? (
                  <Box>
                    <Button
                      leftIcon={
                        <PlusSquareIcon
                          color={
                            colorMode === "light"
                              ? LightModeColors.primary
                              : DarkModeColors.primary
                          }
                        />
                      }
                      variant={"outline"}
                      rounded="full"
                      onClick={() =>
                        console.log("[NotImplemented] Add Listing")
                      }
                    >
                      Add Listing
                    </Button>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      cursor={"pointer"}
                      minW={0}
                      leftIcon={<Avatar size={"sm"} src={profilePhoto} />}
                      rightIcon={<ChevronDownIcon />}
                    >
                      {user?.name}
                    </MenuButton>
                  </Box>
                ) : (
                  <Button
                    as={Link}
                    href={"/Login"}
                    rounded={"full"}
                    cursor={"pointer"}
                  >
                    Login
                  </Button>
                )}

                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"xl"} src={profilePhoto} />
                  </Center>
                  <br />
                  <Center>
                    <p>Welcome, {user?.name}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem as={Link} href={"/SavedHomes"}>
                    Saved Homes
                  </MenuItem>
                  <MenuItem as={Link} href={"/my-homes"}>
                    My Listings
                  </MenuItem>
                  <MenuItem as={Link} href={"/Account"}>
                    My Account
                  </MenuItem>
                  <MenuItem onClick={handleLogoutButtonClick}>Logout</MenuItem>
                </MenuList>
              </Menu>

              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
