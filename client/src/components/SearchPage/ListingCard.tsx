"use client";

import { DarkModeColors, LightModeColors } from "@/colors";
import { Listing } from "@/entities/Listing";
import priceToString from "@/utils/priceToString";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { IconBathFilled, IconBedFilled, IconRuler2 } from "@tabler/icons-react";
import SpecsButton from "./SpecsButton";
import ListingOptions from "../ListingOptions";
import { useRouter } from "next/navigation";
import ListingModal from "../ListingModal";
import { AuthUser } from "@/AuthProvider";
import useSaveListing from "@/hooks/useSaveListing";
import SaveButton from "./SaveButton";
import { useState } from "react";
import { on } from "events";

export default function ListingCard({
  listing,
  type,
  user,
  onListingUpdate,
}: {
  listing: Listing;
  type?: "my-homes";
  user: AuthUser;
  onListingUpdate?: () => void;
}) {
  const router = useRouter();
  const cardModal = useDisclosure();
  const { saveListing, unsaveListing } = useSaveListing();

  const [isListingSaved, setIsListingSaved] = useState(
    listing.savedBy.some((savedByUser) => savedByUser?.id === user?.id) ?? false
  );

  const handleSaveListingButtonClick = () => {
    if (isListingSaved) {
      unsaveListing(listing);
      setIsListingSaved(false);
    } else {
      saveListing(listing);
      setIsListingSaved(true);
    }
    if (onListingUpdate) onListingUpdate();
  };

  return (
    <Box>
      <Center py={6}>
        <Stack
          borderRadius="3xl"
          w={{ sm: "100%", md: "4xl" }}
          height={{ sm: "476px", md: "15rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow="2xl"
          padding={4}
        >
          <Flex
            flex={1}
            bg="blue.200"
            borderRadius={"3xl"}
            maxW={{ sm: "30%", md: "35%" }}
          >
            <Image
              objectFit="cover"
              boxSize="100%"
              src={listing.image}
              alt={"listing image of " + listing.title}
              borderRadius={"3xl"}
            />
          </Flex>

          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="left"
            p={1}
            pt={2}
          >
            <Text fontWeight={600} color={"gray.500"} size="sm">
              <Button
                variant={"link"}
                onClick={() => {
                  router.push(`/user/${listing.postedBy.id}`);
                }}
              >
                {listing.postedBy.firstName + " " + listing.postedBy.lastName}
              </Button>
            </Text>
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              <Button
                variant={"link"}
                onClick={cardModal.onOpen}
                fontSize={"2xl"}
                color={useColorModeValue(
                  LightModeColors.text,
                  DarkModeColors.text
                )}
              >
                {listing.title}
              </Button>
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              {listing.address.street}, {listing.address.city}
            </Text>

            <Stack
              width={"100%"}
              direction={"row"}
              padding={2}
              justifyContent={"start"}
            >
              <SpecsButton
                icon={
                  <IconBedFilled
                    color={useColorModeValue(
                      LightModeColors.specsTextAndIcon,
                      "white"
                    )}
                  />
                }
                text={listing.numOfBeds.toString()}
              />
              <SpecsButton
                icon={
                  <IconBathFilled
                    color={useColorModeValue(
                      LightModeColors.specsTextAndIcon,
                      "white"
                    )}
                  />
                }
                text={listing.numOfBaths.toString()}
              />
              <SpecsButton
                icon={
                  <IconRuler2
                    color={useColorModeValue(
                      LightModeColors.specsTextAndIcon,
                      "white"
                    )}
                  />
                }
                text={listing.numOfMeterSquared.toString()}
              />
              <SpecsButton text={listing.listingType.toLowerCase()} />
              <SpecsButton text={listing.homeType.toLowerCase()} />
            </Stack>
          </Stack>

          <Stack justifyContent="start" alignItems="end" pt={3}>
            <Heading fontSize={"2xl"}>{priceToString(listing.price)}</Heading>

            {listing.estimatedPrice && (
              <Text fontWeight={600} color={"gray.500"} size="sm">
                {"(est.) " + priceToString(listing.estimatedPrice)}
              </Text>
            )}

            <Flex
              flex={1}
              justifyContent={{ base: "start", md: "end" }}
              alignItems={"end"}
            >
              {type === "my-homes" ? (
                <ListingOptions
                  listing={listing}
                  onListingUpdate={onListingUpdate}
                />
              ) : (
                <Button
                  borderRadius={"full"}
                  py={"6"}
                  bgColor={useColorModeValue(
                    LightModeColors.background,
                    "blue.800"
                  )}
                  border={"1px"}
                  borderColor={LightModeColors.softGray}
                  _hover={{
                    bgColor: LightModeColors.background,
                  }}
                  boxShadow="md"
                  onClick={handleSaveListingButtonClick}
                >
                  <SaveButton isListingSaved={isListingSaved} />
                </Button>
              )}
            </Flex>
          </Stack>
        </Stack>
      </Center>
      <ListingModal
        listing={listing}
        isOpen={cardModal.isOpen}
        onClose={cardModal.onClose}
      />
    </Box>
  );
}
