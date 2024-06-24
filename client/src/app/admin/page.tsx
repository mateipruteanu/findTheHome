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
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [activeButton, setActiveButton] = useState("Users");
  const [page, setPage] = useState(1);
  const [userSearchInput, setUserSearchInput] = useState("");
  const [listingSearchInput, setListingSearchInput] = useState("");

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

  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearchInput(e.target.value);
    getUsers(1, e.target.value);
  };

  const handleListingSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListingSearchInput(e.target.value);
    getListings(1, undefined, new URLSearchParams([["title", e.target.value]]));
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
          <Box>
            <Flex justifyContent="center" alignItems="center">
              <Input
                w={{ base: "100%", md: "45%" }}
                type="text"
                placeholder="Search by email"
                value={userSearchInput}
                onChange={handleUserSearch}
              />
            </Flex>
            <UserCards users={users} onUserUpdate={handleUpdateCard} />
          </Box>
        ) : (
          <Center flexDirection={"column"}>
            <Input
              w={{ base: "100%", md: "45%" }}
              type="text"
              placeholder="Search by title"
              value={listingSearchInput}
              onChange={handleListingSearch}
            />
            <Listings
              listings={listings}
              paginationInfo={listingPaginationInfo}
              onListingUpdate={handleUpdateCard}
              type="my-homes"
            />
          </Center>
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
