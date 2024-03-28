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
import { useContext } from "react";
import { AuthContext } from "@/AuthProvider";
import { Routes } from "@/routes";
import AddEditModal from "./AddEditModal";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout, loading, user } = useContext(AuthContext);

  const handleLogoutButtonClick = () => {
    logout();
  };

  const handleAddListingButtonClick = () => {
    onOpen();
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

              {loading ? null : user ? (
                <Box>
                  <Menu>
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
                      onClick={handleAddListingButtonClick}
                    >
                      Add Listing
                    </Button>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      cursor={"pointer"}
                      minW={0}
                      leftIcon={<Avatar size={"sm"} src={user?.photo} />}
                      rightIcon={<ChevronDownIcon />}
                    >
                      {user?.name}
                    </MenuButton>

                    <MenuList alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar size={"xl"} src={user?.photo} />
                      </Center>
                      <br />
                      <Center>
                        <p>Welcome, {user?.name}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem as={Link} href={Routes.SAVED_HOMES}>
                        Saved Homes
                      </MenuItem>
                      <MenuItem as={Link} href={Routes.MY_HOMES}>
                        My Homes
                      </MenuItem>
                      <MenuItem as={Link} href={Routes.ACCOUNT}>
                        My Account
                      </MenuItem>
                      <MenuItem onClick={handleLogoutButtonClick}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              ) : (
                <Stack direction={'row'}>
                  <Button
                    as={Link}
                    href={Routes.LOGIN}
                    rounded={"full"}
                    cursor={"pointer"}
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    href={Routes.REGISTER}
                    rounded={"full"}
                    cursor={"pointer"}
                    display={{ base: "none", md: "flex" }}
                  >
                    Register
                  </Button>
                </Stack>
              )}

              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <AddEditModal isOpen={isOpen} OnClose={onClose} mode={"add"} />
    </>
  );
}
