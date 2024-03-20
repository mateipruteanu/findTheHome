"use client";
import { AuthContext } from "@/AuthProvider";
import Listings from "@/components/SearchPage/Listings";
import { BACKEND_URL } from "@/constants";
import { Center, Container, Heading, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

export default function MyHomesPage() {
  const [listings, setListings] = useState([]);
  const { user, loading } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [loadingListings, setLoadingListings] = useState(false);

  useEffect(() => {
    setLoadingListings(true);
    if (!user) return;
    fetch(`${BACKEND_URL}/listing?page=${page}&posterId=${user?.id}`)
      .then((response) => response.json())
      .then((data) => setListings(data.listings));
    setLoadingListings(false);
  }, [user]);

  return (
    <>
      <Container maxW={"7xl"}>
        <Heading maxW="2xl" pl={"15%"} pt={"5"}>
          My homes.
        </Heading>
        {loadingListings ? (
          <Center>
            <Heading as={"h2"}>Loading listings...</Heading>
          </Center>
        ) : null}
        {loading ? (
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
