"use client";
import { AuthContext } from "@/AuthProvider";
import Listings from "@/components/SearchPage/Listings";
import Pagination from "@/components/SearchPage/Pagination";
import { BACKEND_URL } from "@/constants";
import { PaginationInfo } from "@/hooks/useGetListings";
import { Container, Heading } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

export default function SavedHomesPage() {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>(
    {} as PaginationInfo
  );
  const [loadingListings, setLoadingListings] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoadingListings(true);

    fetch(`${BACKEND_URL}/listing?page=${page}&savedBy=${user?.id}`)
      .then((response) => response.json())
      .then((data) => {
        setListings(data.listings);
        setPaginationInfo(data.pagination);
      });
    setLoadingListings(false);
  }, [page, user]);

  return (
    <>
      <Container maxW={"7xl"}>
        <Heading maxW="2xl" pl={"15%"} pt={"5"}>
          Saved homes.
        </Heading>
        <Listings listings={listings} paginationInfo={paginationInfo} />
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
