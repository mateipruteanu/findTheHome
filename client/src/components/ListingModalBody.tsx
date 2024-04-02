import { Listing } from "@/entities/Listing";
import priceToString from "@/utils/priceToString";
import {
  Box,
  Stack,
  useColorModeValue,
  Image,
  Text,
  Heading,
  Divider,
  Flex,
} from "@chakra-ui/react";

export default function ListingModalBody({ listing }: { listing: Listing }) {
  const postedAt = new Date(listing.postedAt);

  return (
    <Box width={{ sm: "60rem", md: "75rem" }} pt={"3"}>
      <Stack
        borderRadius="3xl"
        height={{ sm: "476px", md: "25rem" }}
        direction={{ base: "column", md: "row" }}
      >
        <Box
          flex={1}
          bg="blue.200"
          borderRadius={"3xl"}
          maxW={{ sm: "30%", md: "35%" }}
        >
          <Image
            objectFit="cover"
            boxSize={{ sm: "50%", md: "100%" }}
            src={listing.image}
            alt={"listing image of " + listing.title}
            borderRadius={"3xl"}
          />
        </Box>
        <Stack direction={"column"} flex={1} p={4}>
          <Heading as="h2" size="lg">
            {listing.title}
          </Heading>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            direction={"row"}
          >
            <Text>
              {listing.postedBy.firstName + " " + listing.postedBy.lastName}
            </Text>
            <Heading
              display={"flex"}
              size={"md"}
              flexDir={"column"}
              alignItems={"flex-end"}
            >
              {priceToString(listing.price)}{" "}
              {listing.estimatedPrice ? (
                <Text color={"grey"}>
                  (est.) {priceToString(listing.estimatedPrice)}
                </Text>
              ) : null}
            </Heading>
          </Flex>
          <Divider />
          <Text>{listing.description}</Text>
          <Divider />
          <Stack direction={"row"} justify={"space-between"}>
            <Text>{listing.numOfBeds} beds</Text>
            <Text>{listing.numOfBaths} baths</Text>
            <Text>{listing.numOfMeterSquared} m²</Text>
          </Stack>
          <Divider />

          <Text>
            Home Type:{" "}
            {listing.homeType === "APARTMENT" ? "Apartment" : "House"}
          </Text>
          <Text>
            Listing Type: {listing.listingType === "RENT" ? "Rent" : "Sale"}
          </Text>
          <Text>Price: {priceToString(listing.price)}</Text>

          <Text>
            Posted on: {postedAt.toLocaleDateString()}, at{" "}
            {postedAt.toLocaleTimeString()}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
