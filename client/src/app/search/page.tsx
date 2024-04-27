"use client";
import Listings from "@/components/SearchPage/Listings";
import Pagination from "@/components/SearchPage/Pagination";
import SearchBar from "@/components/SearchPage/SearchBar";
import { BACKEND_URL } from "@/constants";
import { PaginationInfo } from "@/hooks/useGetListings";
import { Center, Container } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

export default function SearchPage() {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>(
    {} as PaginationInfo
  );
  const [loadingListings, setLoadingListings] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoadingListings(true);

    const homeType = searchParams.get("homeType")
      ? `&homeType=${searchParams.get("homeType")}`
      : "";
    const listingType = searchParams.get("listingType")
      ? `&listingType=${searchParams.get("listingType")}`
      : "";
    const city = searchParams.get("city")
      ? `&city=${searchParams.get("city")}`
      : "";
    const priceLowerThan = searchParams.get("priceLowerThan")
      ? `&priceLowerThan=${searchParams.get("priceLowerThan")}`
      : "";
    const priceHigherThan = searchParams.get("priceHigherThan")
      ? `&priceHigherThan=${searchParams.get("priceHigherThan")}`
      : "";
    const numOfBedsLowerThan = searchParams.get("numOfBedsLowerThan")
      ? `&numOfBedsLowerThan=${searchParams.get("numOfBedsLowerThan")}`
      : "";
    const numOfBedsHigherThan = searchParams.get("numOfBedsHigherThan")
      ? `&numOfBedsHigherThan=${searchParams.get("numOfBedsHigherThan")}`
      : "";
    const numOfBathsLowerThan = searchParams.get("numOfBathsLowerThan")
      ? `&numOfBathsLowerThan=${searchParams.get("numOfBathsLowerThan")}`
      : "";
    const numOfBathsHigherThan = searchParams.get("numOfBathsHigherThan")
      ? `&numOfBathsHigherThan=${searchParams.get("numOfBathsHigherThan")}`
      : "";
    const numOfMetersSquaredLowerThan = searchParams.get(
      "numOfMetersSquaredLowerThan"
    )
      ? `&numOfMetersSquaredLowerThan=${searchParams.get(
          "numOfMetersSquaredLowerThan"
        )}`
      : "";
    const numOfMetersSquaredHigherThan = searchParams.get(
      "numOfMetersSquaredHigherThan"
    )
      ? `&numOfMetersSquaredHigherThan=${searchParams.get(
          "numOfMetersSquaredHigherThan"
        )}`
      : "";
    const postalCode = searchParams.get("postalCode")
      ? `&postalCode=${searchParams.get("postalCode")}`
      : "";

    const URL = `${BACKEND_URL}/listing?page=${page}${homeType}${listingType}${city}${priceLowerThan}${priceHigherThan}${numOfBedsLowerThan}${numOfBedsHigherThan}${numOfBathsLowerThan}${numOfBathsHigherThan}${numOfMetersSquaredLowerThan}${numOfMetersSquaredHigherThan}${postalCode}`;

    console.log(URL);

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setListings(data.listings);
        setPaginationInfo(data.pagination);
      });
    setLoadingListings(false);
  }, [searchParams, page]);

  return (
    <>
      <Container maxW={"7xl"}>
        <Suspense fallback={<Center>Loading...</Center>}>
          <SearchBar searchParams={searchParams} />
        </Suspense>
        {loadingListings ? <Center>Loading...</Center> : null}
        <Listings listings={listings} paginationInfo={paginationInfo} />
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
