"use client";
import Listings from "@/components/SearchPage/Listings";
import useAccount from "@/hooks/useAccount";
import useGetListings from "@/hooks/useGetListings";
import { Center, Container, Heading, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

export default function UserPage({ params }: { params: { id: string } }) {
  const [page, setPage] = useState(1);
  const { listings, loadingListings, getListings } = useGetListings();
  const { getAccount, account, isLoading: isAccountLoading } = useAccount();

  useEffect(() => {
    getAccount(params.id);
    getListings(page, params.id);
  }, [params.id]);

  return (
    <>
      <Container maxW={"7xl"}>
        {isAccountLoading ? (
          <Center>
            <Heading as={"h2"}>Loading...</Heading>
          </Center>
        ) : account ? (
          <Heading maxW="3xl" pl={"15%"} pt={"5"}>
            The homes of {account?.firstName + " " + account?.lastName}
          </Heading>
        ) : (
          <Center>
            <Heading as={"h2"}>Loading...</Heading>
          </Center>
        )}
        {loadingListings ? (
          <Center>
            <Heading as={"h2"}>Loading...</Heading>
          </Center>
        ) : listings ? (
          <Listings listings={listings} />
        ) : (
          <Center>
            <Heading as={"h2"}>No listings found.</Heading>
          </Center>
        )}
      </Container>
    </>
  );
}
