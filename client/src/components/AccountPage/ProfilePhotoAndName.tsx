import { Flex, Avatar, Box, Heading, Stack, Button } from "@chakra-ui/react";

export default function ProfilePhotoAndName({
  id,
  firstName,
  lastName,
  photo,
}: {
  id: string;
  firstName: string;
  lastName: string;
  photo: string;
}) {
  return (
    <Stack direction={"row"}>
      <Stack direction={"column"} justifyContent={"center"}>
        <Heading as={"h3"} size={"md"}>
          {firstName + " " + lastName}
        </Heading>
      </Stack>
      <Avatar name={firstName + " " + lastName} src={photo} size={"lg"} />
    </Stack>
  );
}
