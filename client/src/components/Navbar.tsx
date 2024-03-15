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

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const username = "John Smith";
  const profilePhoto = "https://i.postimg.cc/3RMWR0s6/image.jpg";

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
                onClick={() => console.log("[NotImplemented] Add Listing")}
              >
                Add Listing
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  cursor={"pointer"}
                  minW={0}
                  leftIcon={<Avatar size={"sm"} src={profilePhoto} />}
                  rightIcon={<ChevronDownIcon />}
                >
                  {username}
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"xl"} src={profilePhoto} />
                  </Center>
                  <br />
                  <Center>
                    <p>Welcome, {username}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem as={Link} href={"/SavedHomes"}>
                    Saved Homes
                  </MenuItem>
                  <MenuItem as={Link} href={"/Account"}>
                    My Account
                  </MenuItem>
                  <MenuItem
                    onClick={() => console.log("[NotImplemented] Logout")}
                  >
                    Logout
                  </MenuItem>
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
