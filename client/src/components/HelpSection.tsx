"use client";
import { Center, Container, Heading, Stack } from "@chakra-ui/react";
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
            text="With 35+ filters, findTheHome can help you easily find a home for rent that you'll love."
            buttonText="findTheRental"
            buttonUrl="Button Url"
          />
          <HelpCard
            img="./buyIcon.png"
            title="buy a home."
            text="With 100k+ homes for sale on the site, findTheHome help you find your home."
            buttonText="findTheHome"
            buttonUrl="Button Url"
          />
          <HelpCard
            img="./estimateIcon.png"
            title="estimate the price."
            text="With the advanced Machine Learning technology, we give accurate estimations for every home."
            buttonText="estimateThePrice"
            buttonUrl="Button Url"
          />
        </Stack>
      </Center>
    </>
  );
}
