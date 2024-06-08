"use client";
import { Center, Heading, Stack } from "@chakra-ui/react";
import HelpCard from "./HelpCard";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function HelpSection() {
  return (
    <>
      <Center>
        <ChevronDownIcon w={10} h={10} />
        <Heading>see how we can help</Heading>
        <ChevronDownIcon w={10} h={10} />
      </Center>
      <Center>
        <Stack direction={{ base: "column", sm: "column", md: "row" }}>
          <HelpCard
            img="./rentIcon.png"
            title="rent a home."
            text="With our fine tuned filters, findTheHome can help you easily find a home for rent that you'll love."
            buttonText="findTheRental"
            buttonUrl="/search?homeType=apartment&listingType=rent&city="
          />
          <HelpCard
            img="./buyIcon.png"
            title="buy a home."
            text="With so many agency-free homes for sale on the site, findTheHome helps you find your home."
            buttonText="findTheHome"
            buttonUrl="/search?homeType=house&listingType=sale&city="
          />
          <HelpCard
            img="./estimateIcon.png"
            title="calculate the payment"
            text="findTheHome helps you find the home that fits your budget by calculating the potential monthly mortgage payment for you."
            buttonText="calculateThePayment"
            buttonUrl="/search?homeType=house&listingType=sale&city="
          />
        </Stack>
      </Center>
    </>
  );
}
