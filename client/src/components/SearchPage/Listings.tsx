import { Listing } from "@/entities/Listing";
import ListingCard from "./ListingCard";
import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Listings({ listings }: { listings: Listing[] }) {
  return (
    <Box>
      {listings ? (
        <Box>
          {listings.map((listing) => (
            <Box key={listing.id}>
              <ListingCard listing={listing} />
            </Box>
          ))}
        </Box>
      ) : (
        <Center>
          <Heading as={"h2"}>No listings found.</Heading>
        </Center>
      )}
    </Box>
  );
}
