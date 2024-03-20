"use client";
import Listings from "@/components/SearchPage/Listings";
import SearchBar from "@/components/SearchPage/SearchBar";
import { BACKEND_URL } from "@/constants";
import { Center, Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function SearchPage() {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingListings, setLoadingListings] = useState(false);

  useEffect(() => {
    setLoadingListings(true);
    fetch(`${BACKEND_URL}/listing?page=${page}`)
      .then((response) => response.json())
      .then((data) => setListings(data.listings));
    setLoadingListings(false);
  }, []);

  return (
    <>
      <Container maxW={"7xl"}>
        <SearchBar />
        <Listings listings={listings} />
      </Container>
    </>
  );
}
