import { GetUserDTO } from "@/dtos/GetUserDTO";
import { Flex } from "@chakra-ui/react";
import UserCard from "./UserCard";
import { useState } from "react";

export default function UserCards({
  users,
  onUserDelete,
}: {
  users: GetUserDTO[];
  onUserDelete: () => void;
}) {
  return (
    <Flex flexDir={"column"} justifyContent="center" alignItems={'center'}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onUserDelete={onUserDelete} />
      ))}
    </Flex>
  );
}
