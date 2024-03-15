"use client";
import HelpSection from "@/components/HomePage/HelpSection";
import HeroSection from "@/components/HomePage/HeroSection";
import { Container } from "@chakra-ui/react";
import React from "react";

export default function Home() {
  const [count, setCount] = React.useState(0);

  function handleBlueClick() {
    console.log("Button clicked");
    setCount(count + 1);
  }

  function handleRedClick() {
    console.log("Button clicked");
    setCount(count - 1);
  }

  return (
    <Container maxW={"7xl"}>
      <HeroSection />
      <HelpSection />
    </Container>
  );
}
