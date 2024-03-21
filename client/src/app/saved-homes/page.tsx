"use client";
import Listings from "@/components/SearchPage/Listings";
import { Container, Heading } from "@chakra-ui/react";
import React from "react";

export default function SavedHomesPage() {
  return (
    <>
      <Container maxW={"7xl"}>
        <Heading maxW="2xl" pl={"15%"} pt={"5"}>
          Saved homes.
        </Heading>
        {/* <Listings /> */}
      </Container>
    </>
  );
}
