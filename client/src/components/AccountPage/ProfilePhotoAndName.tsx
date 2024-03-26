import { Flex, Avatar, Box, Heading, Stack, Button } from "@chakra-ui/react";

export default function ProfilePhotoAndName({
  id,
  name,
  photo,
}: {
  id: string;
  name: string;
  photo: string;
}) {

  const handleChangePhotoClick = () => {
    console.log("Change photo clicked for user with id: ", id);
  };

  return (
    <Stack direction={"row"}>
      <Stack direction={"column"} justifyContent={"center"}>
        <Heading as={"h3"} size={"md"}>
          {name}
        </Heading>
        <Button variant={"link"} onClick={handleChangePhotoClick}>change photo</Button>
      </Stack>
      <Avatar name={name} src={photo} size={"lg"} />
    </Stack>
  );
}
