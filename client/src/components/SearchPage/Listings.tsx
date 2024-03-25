import { Listing } from "@/entities/Listing";
import ListingCard from "./ListingCard";
import { Box, Center, Heading, Text } from "@chakra-ui/react";

export default function Listings({
  listings,
  type,
}: {
  listings: Listing[];
  type?: "my-homes";
}) {
  return (
    <Box>
      {listings ? (
        <Box>
          {listings.map((listing) => (
            <Box key={listing.id}>
              <ListingCard listing={listing} type={type} />
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
