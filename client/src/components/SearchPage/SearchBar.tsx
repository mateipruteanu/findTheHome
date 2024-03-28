"use client";
import { DarkModeColors, LightModeColors } from "@/colors";
import { SearchIcon, ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { URLSearchParams as SearchParams } from "url";

export default function SearchBar({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const router = useRouter();
  const [propertyType, setPropertyType] = useState(() => {
    if (searchParams.get("homeType") === "apartment") {
      return "Apartment";
    } else if (searchParams.get("homeType") === "house") {
      return "House";
    } else {
      return "Apartment";
    }
  });
  const [activeButton, setActiveButton] = useState(() => {
    if (searchParams.get("listingType") === "sale") {
      return "For Sale";
    } else if (searchParams.get("listingType") === "rent") {
      return "For Rent";
    } else {
      return "For Sale";
    }
  });
  const [searchInput, setSearchInput] = useState(() => {
    if (searchParams.get("city")) {
      return searchParams.get("city") as string;
    } else {
      return "";
    }
  });
  const searchBackground = useColorModeValue(
    LightModeColors.background,
    DarkModeColors.background
  );

  const searchInputWidth = useBreakpointValue({ base: "100%", md: "450px" });
  const dropdownWidth = useBreakpointValue({
    base: "130px",
    sm: "140px",
    md: "140px",
  });
  const searchButtonWidth = useBreakpointValue({
    base: "100px",
    sm: "120px",
    md: "130px",
  });

  const handleListingTypeToggle = (value: string) => {
    setActiveButton(value);
  };

  const handleSearchButtonClick = () => {
    console.log(
      "Searching for",
      propertyType.toLowerCase(),
      "that is",
      activeButton.toLowerCase().trim(),
      "in",
      searchInput.trim()
    );

    const listingType = activeButton.toLowerCase().trim().includes("for sale")
      ? "sale"
      : "rent";

    const searchQuery = new URLSearchParams({
      homeType: propertyType.toLowerCase(),
      listingType,
      city: searchInput.trim(),
    });

    console.log(searchQuery.toString());

    router.push(`/search?${searchQuery.toString()}`);
  };

  const handleFiltersButtonClick = () => {
    console.log("Filters button clicked");
  };

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" pt={4}>
      <Flex
        direction={{ base: "column", md: "row" }}
        wrap="wrap"
        justifyContent="center"
        alignItems="center"
        w="full"
      >
        <InputGroup
          maxWidth={searchInputWidth}
          flexGrow={1}
          mr={2}
          h="40px"
          mb={{ base: 2, md: 0 }}
          zIndex={"10"}
        >
          <InputLeftElement pointerEvents="none" h="40px">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Enter the city..."
            roundedLeft="full"
            borderRightRadius={0}
            variant="outline"
            backgroundColor={searchBackground}
            h="40px"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Menu>
            <MenuButton
              as={Button}
              variant="outline"
              borderLeftRadius={0}
              borderRightRadius={"full"}
              rightIcon={<ChevronDownIcon />}
              minWidth={dropdownWidth}
              backgroundColor={searchBackground}
              h="40px"
            >
              {propertyType}
            </MenuButton>
            <MenuList>
              <MenuItem h="40px" onClick={() => setPropertyType("Apartment")}>
                Apartment
              </MenuItem>
              <MenuItem h="40px" onClick={() => setPropertyType("House")}>
                House
              </MenuItem>
            </MenuList>
          </Menu>
        </InputGroup>
        <Button
          leftIcon={<IconAdjustmentsHorizontal />}
          bg={"transparent"}
          border="1px"
          borderColor={LightModeColors.softGray}
          rounded="full"
          boxShadow="md"
          minWidth={searchButtonWidth}
          aria-label="Search"
          ml={2}
          h="40px"
          onClick={handleFiltersButtonClick}
          display={{ base: "none", md: "flex" }}
        >
          Filters
        </Button>
        <Button
          leftIcon={<SearchIcon />}
          bg={LightModeColors.secondary}
          rounded="full"
          boxShadow="md"
          minWidth={searchButtonWidth}
          aria-label="Search"
          ml={2}
          h="40px"
          onClick={handleSearchButtonClick}
          display={{ base: "none", md: "flex" }}
        >
          Search
        </Button>
      </Flex>

      <Flex
        wrap="wrap"
        justifyContent="start"
        alignItems="center"
        w="full"
        maxW={"3xl"}
        pl={{ base: 0, md: 5 }}
      >
        <Flex
          position="relative"
          h="36px"
          alignItems="center"
          w={{ base: "100%" }}
        >
          <Button
            bgColor={
              activeButton === "For Sale"
                ? LightModeColors.primary
                : LightModeColors.background
            }
            color={
              activeButton === "For Sale"
                ? LightModeColors.background
                : LightModeColors.primary
            }
            variant={activeButton === "For Sale" ? "solid" : "outline"}
            onClick={() => handleListingTypeToggle("For Sale")}
            roundedLeft={"full"}
            roundedRight={0}
            h={"26px"}
            w={{ base: "50%", md: "120px" }}
          >
            For Sale
          </Button>
          <Button
            bgColor={
              activeButton === "For Rent"
                ? LightModeColors.primary
                : LightModeColors.background
            }
            color={
              activeButton === "For Rent"
                ? LightModeColors.background
                : LightModeColors.primary
            }
            variant={activeButton === "For Rent" ? "solid" : "outline"}
            onClick={() => handleListingTypeToggle("For Rent")}
            roundedRight={"full"}
            roundedLeft={0}
            h={"26px"}
            w={{ base: "50%", md: "120px" }}
          >
            For Rent
          </Button>
        </Flex>
      </Flex>
      <Button
        leftIcon={<IconAdjustmentsHorizontal />}
        bg={"transparent"}
        border="1px"
        borderColor={LightModeColors.softGray}
        rounded="full"
        boxShadow="md"
        width={"100%"}
        my={2}
        aria-label="Search"
        h="40px"
        onClick={handleFiltersButtonClick}
        display={{ base: "flex", md: "none" }}
      >
        Filters
      </Button>
      <Button
        leftIcon={<SearchIcon />}
        bg={LightModeColors.secondary}
        rounded="full"
        boxShadow="md"
        width={"100%"}
        aria-label="Search"
        h="40px"
        onClick={handleSearchButtonClick}
        display={{ base: "block", md: "none" }}
      >
        Search
      </Button>
    </Flex>
  );
}
