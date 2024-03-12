import { useState } from "react";
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
  useColorModeValue,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { DarkModeColors, LightModeColors } from "@/colors";

export default function HeroSearch() {
  const [propertyType, setPropertyType] = useState("Apartment");
  const [activeButton, setActiveButton] = useState("For Sale");
  const [searchInput, setSearchInput] = useState("");
  const searchBackground = useColorModeValue(
    LightModeColors.background,
    DarkModeColors.background
  );

  const searchInputWidth = useBreakpointValue({ base: "250px", md: "450px" });
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
  };

  return (
    <Box>
      <Flex justify="left" wrap="wrap" h="50px">
        <InputGroup maxWidth={searchInputWidth} flexGrow={1} mr={2} h="50px">
          <InputLeftElement pointerEvents="none" h="50px">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Enter the city..."
            roundedLeft="full"
            borderRightRadius={0}
            variant="outline"
            backgroundColor={searchBackground}
            h="50px"
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
              h="50px"
            >
              {propertyType}
            </MenuButton>
            <MenuList>
              <MenuItem h="50px" onClick={() => setPropertyType("Apartment")}>
                Apartment
              </MenuItem>
              <MenuItem h="50px" onClick={() => setPropertyType("House")}>
                House
              </MenuItem>
            </MenuList>
          </Menu>
        </InputGroup>
        <Button
          leftIcon={<SearchIcon />}
          bg={LightModeColors.secondary}
          rounded="full"
          boxShadow="md"
          minWidth={searchButtonWidth}
          aria-label="Search"
          ml={2}
          h="50px"
          onClick={handleSearchButtonClick}
        >
          Search
        </Button>
      </Flex>

      <Flex justify="left" wrap="wrap" pt={4}>
        <Flex position="relative" h="36px" alignItems="center">
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
          >
            For Rent
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
