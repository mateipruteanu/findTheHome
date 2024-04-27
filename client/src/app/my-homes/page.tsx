"use client";
import { AuthContext } from "@/AuthProvider";
import Listings from "@/components/SearchPage/Listings";
import Pagination from "@/components/SearchPage/Pagination";
import { BACKEND_URL } from "@/constants";
import { PaginationInfo } from "@/hooks/useGetListings";
import { Center, Container, Heading, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

export default function MyHomesPage() {
  const [listings, setListings] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [loadingListings, setLoadingListings] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>(
    {} as PaginationInfo
  );

  const onListingUpdate = () => {
    setTriggerFetch(!triggerFetch);
  }

  useEffect(() => {
    setLoadingListings(true);
    if (!user) return;
    fetch(`${BACKEND_URL}/listing?page=${page}&posterId=${user?.id}`)
      .then((response) => response.json())
      .then((data) => {
        setListings(data.listings);
        setPaginationInfo(data.pagination);
      });
    setLoadingListings(false);
  }, [user, page, triggerFetch]);


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
          <Listings
            listings={listings}
            type={"my-homes"}
            paginationInfo={paginationInfo}
            onListingUpdate={onListingUpdate}
          />
        ) : (
          <Center>
            <Heading as={"h2"}>No listings found.</Heading>
          </Center>
        )}
        {paginationInfo && paginationInfo.total_pages ? (
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
