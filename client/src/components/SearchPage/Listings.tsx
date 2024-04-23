import { Listing } from "@/entities/Listing";
import ListingCard from "./ListingCard";
import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { PaginationInfo } from "@/hooks/useGetListings";

export default function Listings({
  listings,
  paginationInfo,
  type,
}: {
  listings: Listing[];
  paginationInfo: PaginationInfo;
  type?: "my-homes";
}) {
  return (
    <Box>
      <Center>
        <Text>{paginationInfo.total_records} listings found.</Text>
      </Center>
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
