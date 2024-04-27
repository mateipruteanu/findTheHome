import { LightModeColors } from "@/colors";
import { Flex, Button, Center } from "@chakra-ui/react";

export default function SelectorButton({
  activeButton,
  handleButtonToggle,
}: {
  activeButton: string;
  handleButtonToggle: (activeButton: string) => void;
}) {
  return (
    <Center>
      <Flex
        position="relative"
        h="36px"
        alignItems="center"
        w={{ base: "100%" }}
      >
        <Button
          bgColor={
            activeButton === "Users"
              ? LightModeColors.primary
              : LightModeColors.background
          }
          color={
            activeButton === "Users"
              ? LightModeColors.background
              : LightModeColors.primary
          }
          variant={activeButton === "Users" ? "solid" : "outline"}
          onClick={() => handleButtonToggle("Users")}
          roundedLeft={"full"}
          roundedRight={0}
          h={"26px"}
          w={{ base: "50%", md: "120px" }}
        >
          Users
        </Button>
        <Button
          bgColor={
            activeButton === "Listings"
              ? LightModeColors.primary
              : LightModeColors.background
          }
          color={
            activeButton === "Listings"
              ? LightModeColors.background
              : LightModeColors.primary
          }
          variant={activeButton === "Listings" ? "solid" : "outline"}
          onClick={() => handleButtonToggle("Listings")}
          roundedRight={"full"}
          roundedLeft={0}
          h={"26px"}
          w={{ base: "50%", md: "120px" }}
        >
          Listings
        </Button>
      </Flex>
    </Center>
  );
}
