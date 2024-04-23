"use client";
import { LightModeColors } from "@/colors";
import ProfilePhotoAndName from "@/components/AccountPage/ProfilePhotoAndName";
import useAccount from "@/hooks/useAccount";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "@/AuthProvider";
import { UpdateAccountDTO } from "@/dtos/UpdateAccountDTO";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import removeEmptyProperties from "@/utils/removeEmptyProperties";

export default function Account() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateAccount, deleteAccount } = useAccount();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { user, logout } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleDeleteClick = () => {
    if (!user) {
      toast.error("User not found");
      return;
    }

    const data = deleteAccount(user.id);

    if (!data) {
      return;
    }
    onClose();
    logout();
  };

  const onCancelButtonClick = () => {
    router.back();
  };

  const onSaveButtonClick = async () => {
    const cleanedUserInfo = removeEmptyProperties(userInfo);
    if (!cleanedUserInfo) {
      toast.error("Could not save changes - user info is missing.");
      return;
    }

    if (!cleanedUserInfo.currentPassword) {
      toast.error("Enter your current password to save changes.");
      return;
    }

    if (
      cleanedUserInfo.newPassword &&
      cleanedUserInfo.newPassword !== cleanedUserInfo.confirmNewPassword
    ) {
      toast.error("Passwords do not match.");
      console.log("New Password: ", cleanedUserInfo.newPassword);
      console.log("Confirm Password: ", cleanedUserInfo.confirmPassword);
      return;
    }

    const updateAccountDTO: UpdateAccountDTO = {
      firstName: cleanedUserInfo.firstName,
      lastName: cleanedUserInfo.lastName,
      email: cleanedUserInfo.email,
      currentPassword: cleanedUserInfo.currentPassword,
      password: cleanedUserInfo.newPassword,
    };

    if (!user) {
      toast.error("User not found");
      return;
    }

    const data = await updateAccount(user.id, updateAccountDTO);
    if (data) {
      logout();
    }
  };

  return (
    <>
      {userInfo && user ? (
        <Box>
          <Container maxW={"7xl"}>
            <Box maxW="5xl" pl={{ base: 0, md: "15%" }} pt={"5"}>
              <Flex justifyContent="space-between">
                <Heading>My account.</Heading>
                <ProfilePhotoAndName
                  id={user.id}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  photo={user.photo}
                />
              </Flex>
              <Divider pt={5} />

              <Stack direction={"column"}>
                <Stack direction={"row"} justifyContent={"center"}>
                  <FormControl id="first-name">
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      borderRadius={"full"}
                      variant={"filled"}
                      boxShadow="md"
                      placeholder={user.firstName}
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          firstName: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl id="last-name">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      borderRadius={"full"}
                      variant={"filled"}
                      boxShadow="md"
                      placeholder={user.lastName}
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          lastName: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                </Stack>
                <Divider pt={5} />
                <Stack direction={"column"} justifyContent={"center"}>
                  <FormControl id="email">
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      type="email"
                      borderRadius={"full"}
                      variant={"filled"}
                      boxShadow="md"
                      placeholder={user.email}
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          email: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>New Password</FormLabel>
                    <Input
                      type="password"
                      borderRadius={"full"}
                      variant={"filled"}
                      boxShadow="md"
                      placeholder="*********"
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          newPassword: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl id="confirm-password">
                    <FormLabel>Confirm New Password</FormLabel>
                    <Input
                      type="password"
                      borderRadius={"full"}
                      variant={"filled"}
                      boxShadow="md"
                      placeholder="*********"
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          confirmNewPassword: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                  <FormControl id="current-password">
                    <FormLabel>Current Password</FormLabel>
                    <Input
                      type="password"
                      borderRadius={"full"}
                      variant={"filled"}
                      boxShadow="md"
                      placeholder="*********"
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          currentPassword: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
                </Stack>
              </Stack>

              <Flex justifyContent={"space-between"} pt={10}>
                <Button
                  variant={"ghost"}
                  colorScheme="red"
                  borderRadius={"full"}
                  alignSelf={"center"}
                  onClick={onOpen}
                >
                  delete account
                </Button>
                <Flex alignContent="flex-start">
                  <Button
                    variant={"ghost"}
                    borderRadius={"full"}
                    onClick={onCancelButtonClick}
                  >
                    cancel
                  </Button>
                  <Button
                    bgColor={LightModeColors.secondary}
                    borderRadius={"full"}
                    onClick={onSaveButtonClick}
                  >
                    save changes
                  </Button>
                </Flex>
              </Flex>
            </Box>
          </Container>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent borderRadius={"xl"}>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Account "{user.firstName + " " + user.lastName}"
                  forever?
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    ref={cancelRef}
                    onClick={onClose}
                    borderRadius={"full"}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={handleDeleteClick}
                    ml={3}
                    borderRadius={"full"}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      ) : (
        <Center>Loading...</Center>
      )}
    </>
  );
}
