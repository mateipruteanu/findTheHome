"use client";
import SelectorButton from "@/components/AdminPage/SelectorButton";
import UserCards from "@/components/AdminPage/UserCards";
import Pagination from "@/components/SearchPage/Pagination";
import useGetUsers from "@/hooks/useGetUsers";
import {
  Heading,
  Box,
  Container,
  Button,
  Flex,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [activeButton, setActiveButton] = useState("Users");
  const [page, setPage] = useState(1);
  const {
    users,
    loadingUsers,
    getUsers,
    paginationInfo: userPaginationInfo,
  } = useGetUsers();

  const handleButtonToggle = (listingType: string) => {
    setActiveButton(listingType);
  };

  const handleRemoveCard = () => {
    setTriggerFetch(!triggerFetch);
  };

  useEffect(() => {
    if (activeButton === "Users") {
      getUsers(page);
    } else {
      // fetch listings
    }
  }, [activeButton, page, triggerFetch]);

  return (
    <Box>
      <Container maxW={"7xl"}>
        <Center flexDir={"column"}>
          <Heading as="h1" size="lg" pt={"5"}>
            Admin Dashboard
          </Heading>
          <SelectorButton
            activeButton={activeButton}
            handleButtonToggle={handleButtonToggle}
          />
        </Center>
        {activeButton === "Users" ? (
          <UserCards users={users} onUserDelete={handleRemoveCard} />
        ) : (
          <Box>TBD</Box>
        )}

        {userPaginationInfo && userPaginationInfo.total_pages ? (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={userPaginationInfo.total_pages}
          />
        ) : null}
      </Container>
    </Box>
  );
}
