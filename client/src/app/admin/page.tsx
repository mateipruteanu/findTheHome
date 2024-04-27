"use client";
import SelectorButton from "@/components/AdminPage/SelectorButton";
import UserCards from "@/components/AdminPage/UserCards";
import Listings from "@/components/SearchPage/Listings";
import Pagination from "@/components/SearchPage/Pagination";
import useGetListings from "@/hooks/useGetListings";
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
  const {
    listings,
    loadingListings,
    getListings,
    paginationInfo: listingPaginationInfo,
  } = useGetListings();

  const handleButtonToggle = (listingType: string) => {
    setActiveButton(listingType);
  };

  const handleUpdateCard = () => {
    setTriggerFetch(!triggerFetch);
  };

  useEffect(() => {
    if (activeButton === "Users") {
      getUsers(page);
    } else {
      getListings(page);
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
          <UserCards users={users} onUserUpdate={handleUpdateCard} />
        ) : (
          <Listings
            listings={listings}
            paginationInfo={listingPaginationInfo}
            onListingUpdate={handleUpdateCard}
            type="my-homes"
          />
        )}

        {userPaginationInfo &&
        userPaginationInfo.total_pages &&
        activeButton === "Users" ? (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={userPaginationInfo.total_pages}
          />
        ) : null}
        {listingPaginationInfo &&
        listingPaginationInfo.total_pages &&
        activeButton === "Listings" ? (
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
