"use client";
import { LightModeColors } from "@/colors";
import ProfilePhotoAndName from "@/components/AccountPage/ProfilePhotoAndName";
import UserInfo from "@/components/AccountPage/UserInfo";
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
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext, AuthUser } from "@/AuthProvider";
import { UpdateAccountDTO } from "@/dtos/UpdateAccountDTO";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Account() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, error, getAccount, updateAccount, deleteAccount } =
    useAccount();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { user, logout } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({
    ...user,
    password: undefined,
    confirmPassword: undefined,
  });

  useEffect(() => {
    setUserInfo({ ...user, password: undefined, confirmPassword: undefined });
    console.log("User info updated:", userInfo);
  }, [user]);

  const handleDeleteClick = () => {
    // @TODO
    console.log("Delete clicked for user with id: ", (userInfo as AuthUser).id);
    toast.success("Account deleted successfully.");
    onClose();
    logout();
  };

  const onCancelButtonClick = () => {
    // @TODO
    console.log("Cancel clicked for user with id: ", (userInfo as AuthUser).id);
  };

  const onSaveButtonClick = () => {
    // @TODO
    if (!userInfo) {
      toast.error("Could not save changes - user info is missing.");
      return;
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      toast.error(
        `Passwords do not match., ${userInfo.password}, ${userInfo.confirmPassword}`
      );

      return;
    }

    const updateAccountDTO: UpdateAccountDTO = {
      name: userInfo.name,
      email: userInfo.email,
      photo: userInfo.photo,
      password: userInfo.password,
    };
    console.log("Updating user with this", updateAccountDTO);
    // updateAccount((userInfo as AuthUser).id, userInfo as UpdateAccountDTO);
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
                  name={user.name}
                  photo={user.photo}
                />
              </Flex>
              <Divider pt={5} />
              <UserInfo userInfo={user} setUserInfo={setUserInfo} />
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
                  Delete Account "{user.name}" forever?
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
