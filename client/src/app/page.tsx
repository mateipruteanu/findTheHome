"use client";
import AddEditModal from "@/components/AddEditModal";
import HelpSection from "@/components/HomePage/HelpSection";
import HeroSection from "@/components/HomePage/HeroSection";
import { Container } from "@chakra-ui/react";
import React from "react";

export default function Home() {

  return (
    <Container maxW={"7xl"}>
      <HeroSection />
      <HelpSection />
    </Container>
  );
}
