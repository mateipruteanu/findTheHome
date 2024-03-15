import { Image } from "@chakra-ui/react";

export default function HeroSVG() {
  return (
    <Image
      alt="Hero Image"
      objectFit="contain"
      maxWidth={{ base: "400", md: "500px", lg: "600px" }}
      maxHeight={{ base: "400px", md: "500px", lg: "600px" }}
      src="/HeroImage.png"
    />
  );
}
