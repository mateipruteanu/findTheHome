"use client";
import Listings from "@/components/SearchPage/Listings";
import SearchBar from "@/components/SearchPage/SearchBar";
import { Center, Container } from "@chakra-ui/react";
import React from "react";

export default function SearchPage() {
  return (
    <>
      <Container maxW={"7xl"}>
        <SearchBar />
        <Listings />
      </Container>
    </>
  );
}
