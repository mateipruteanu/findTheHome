import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function UserInfo({
  userInfo,
  setUserInfo,
}: {
  userInfo: any;
  setUserInfo: any;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      password: password,
      confirmPassword: confirmPassword,
    });
  }, [password, confirmPassword]);

  return (
    <Stack direction={"column"}>
      <Stack direction={"row"} justifyContent={"center"}>
        <FormControl id="first-name">
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            borderRadius={"full"}
            variant={"filled"}
            boxShadow="md"
            placeholder={userInfo.firstName}
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
            placeholder={userInfo.lastName}
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
            placeholder={userInfo.email}
            onChange={(e) => {
              setUserInfo({
                ...userInfo,
                email: e.target.value,
              });
            }}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            borderRadius={"full"}
            variant={"filled"}
            boxShadow="md"
            placeholder="*********"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
        <FormControl id="confirm-password">
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            borderRadius={"full"}
            variant={"filled"}
            boxShadow="md"
            placeholder="*********"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </FormControl>
      </Stack>
    </Stack>
  );
}
