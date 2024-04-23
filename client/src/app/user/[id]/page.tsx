"use client";
import { PaginationInfo } from "@/hooks/useGetListings";
import Listings from "@/components/SearchPage/Listings";
import Pagination from "@/components/SearchPage/Pagination";
import useAccount from "@/hooks/useAccount";
import useGetListings from "@/hooks/useGetListings";
import { Center, Container, Heading, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

export default function UserPage({ params }: { params: { id: string } }) {
  const [page, setPage] = useState(1);
  const { listings, loadingListings, getListings, paginationInfo } = useGetListings();
  const { getAccount, account, isLoading: isAccountLoading } = useAccount();

  useEffect(() => {
    getAccount(params.id);
    getListings(page, params.id);
  }, [params.id, page]);

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
          <Listings listings={listings} paginationInfo={paginationInfo} />
        ) : (
          <Center>
            <Heading as={"h2"}>No listings found.</Heading>
          </Center>
        )}
        {paginationInfo.total_pages ? (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={paginationInfo.total_pages}
          />
        ) : null}
      </Container>
    </>
  );
}
