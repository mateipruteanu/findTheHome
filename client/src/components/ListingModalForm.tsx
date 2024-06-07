import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import ImageUpload from "./ImageUpload";

export default function ListingModalForm({
  listingDetails,
  setListingDetails,
}: {
  listingDetails: any;
  setListingDetails: any;
}) {
  const handleFileUpload = (file: File[]) => {
    // @TODO: Handle file upload
  };

  return (
    <Stack direction={"column"} spacing={5}>
      <Stack direction={"row"}>
        <FormControl id="image">
          {/* <FormLabel>Upload an Image</FormLabel>
          <Input
            type="text"
            borderRadius={"full"}
            variant={"filled"}
            boxShadow="md"
            placeholder="Enter image URL..."
            value={listingDetails.image}
            onChange={(e) => {
              setListingDetails({
                ...listingDetails,
                image: e.target.value,
              });
            }}
          /> */}
          <ImageUpload
            size="100px"
            rounded="xl"
            onUpdateFile={(file) => handleFileUpload(file)}
            multiple={true}
          />
        </FormControl>
        <FormControl id="title" isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            borderRadius={"full"}
            variant={"filled"}
            boxShadow="md"
            placeholder="Enter listing title..."
            value={listingDetails.title}
            onChange={(e) => {
              setListingDetails({
                ...listingDetails,
                title: e.target.value,
              });
            }}
          />
        </FormControl>
      </Stack>
      <FormControl id="description" isRequired>
        <FormLabel>Description</FormLabel>
        <Textarea
          borderRadius={"xl"}
          variant={"filled"}
          boxShadow="md"
          placeholder="Enter a description..."
          value={listingDetails.description}
          onChange={(e) => {
            setListingDetails({
              ...listingDetails,
              description: e.target.value,
            });
          }}
        />
      </FormControl>
      <FormControl id="price" isRequired>
        <FormLabel>Price</FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children="$"
          />
          <Input
            type="number"
            borderRadius={"full"}
            variant={"filled"}
            boxShadow="md"
            placeholder="Enter the price..."
            value={listingDetails.price}
            onChange={(e) => {
              setListingDetails({
                ...listingDetails,
                price: parseFloat(e.target.value),
              });
            }}
          />
        </InputGroup>
      </FormControl>
      <Stack direction={"row"}>
        <FormControl id="numofbeds" isRequired>
          <FormLabel>Number of Beds</FormLabel>
          <Input
            type="number"
            borderRadius={"full"}
            variant={"filled"}
            boxShadow="md"
            placeholder="Enter the number of beds..."
            value={listingDetails.numOfBeds}
            onChange={(e) => {
              setListingDetails({
                ...listingDetails,
                numOfBeds: parseInt(e.target.value),
              });
            }}
          />
        </FormControl>
        <FormControl id="numofbaths" isRequired>
          <FormLabel>Number of Baths</FormLabel>
          <Input
            type="number"
            borderRadius={"full"}
            variant={"filled"}
            boxShadow="md"
            placeholder="Enter the number of baths..."
            value={listingDetails.numOfBaths}
            onChange={(e) => {
              setListingDetails({
                ...listingDetails,
                numOfBaths: parseInt(e.target.value),
              });
            }}
          />
        </FormControl>
        <FormControl id="numofmetersquared" isRequired>
          <FormLabel>Number of m²</FormLabel>
          <Input
            type="number"
            borderRadius={"full"}
            variant={"filled"}
            boxShadow="md"
            placeholder="Enter the number of m²..."
            value={listingDetails.numOfMeterSquared}
            onChange={(e) => {
              setListingDetails({
                ...listingDetails,
                numOfMeterSquared: parseInt(e.target.value),
              });
            }}
          />
        </FormControl>
      </Stack>
      <Stack direction={"row"}>
        <FormControl id="hometype" isRequired>
          <FormLabel>Home Type</FormLabel>
          <Menu>
            <MenuButton
              as={Button}
              variant="outline"
              width={"100%"}
              borderRadius={"full"}
              rightIcon={<ChevronDownIcon />}
              h="50px"
            >
              {listingDetails.homeType.toLowerCase() === "house"
                ? "House"
                : "Apartment"}
            </MenuButton>
            <MenuList>
              <MenuItem
                h="50px"
                onClick={() => {
                  setListingDetails({
                    ...listingDetails,
                    homeType: "HOUSE",
                  });
                }}
              >
                House
              </MenuItem>
              <MenuItem
                h="50px"
                onClick={() =>
                  setListingDetails({
                    ...listingDetails,
                    homeType: "APARTMENT",
                  })
                }
              >
                Apartment
              </MenuItem>
            </MenuList>
          </Menu>
        </FormControl>
        <FormControl id="listingtype" isRequired>
          <FormLabel>Listing Type</FormLabel>
          <Menu>
            <MenuButton
              as={Button}
              variant="outline"
              borderRadius={"full"}
              width={"100%"}
              rightIcon={<ChevronDownIcon />}
              h="50px"
            >
              {listingDetails.listingType.toLowerCase() === "rent"
                ? "Rent"
                : "Sale"}
            </MenuButton>
            <MenuList>
              <MenuItem
                h="50px"
                onClick={() => {
                  setListingDetails({
                    ...listingDetails,
                    listingType: "RENT",
                  });
                }}
              >
                Rent
              </MenuItem>
              <MenuItem
                h="50px"
                onClick={() =>
                  setListingDetails({
                    ...listingDetails,
                    listingType: "SALE",
                  })
                }
              >
                Sale
              </MenuItem>
            </MenuList>
          </Menu>
        </FormControl>
      </Stack>
      <Heading as="h3" size="md">
        Address
      </Heading>
      <Stack direction={"row"}>
        <FormControl id="country" isRequired>
          <FormLabel>Country</FormLabel>
          <Input
            type="text"
            borderRadius={"full"}
            variant={"filled"}
            boxShadow="md"
            placeholder="Enter the country..."
            value={listingDetails.address.country}
            onChange={(e) => {
              setListingDetails({
                ...listingDetails,
                address: { ...listingDetails.address, country: e.target.value },
              });
            }}
          />
        </FormControl>
        <FormControl id="city" isRequired>
          <FormLabel>City</FormLabel>
          <Input
            type="text"
            borderRadius={"full"}
            variant={"filled"}
            boxShadow="md"
            placeholder="Enter the city..."
            value={listingDetails.address.city}
            onChange={(e) => {
              setListingDetails({
                ...listingDetails,
                address: { ...listingDetails.address, city: e.target.value },
              });
            }}
          />
        </FormControl>
      </Stack>
      <Stack direction={"row"}>
        <FormControl id="street" isRequired>
          <FormLabel>Street</FormLabel>
          <Input
            type="text"
            borderRadius={"full"}
            variant={"filled"}
            boxShadow="md"
            placeholder="Enter the street..."
            value={listingDetails.address.street}
            onChange={(e) => {
              setListingDetails({
                ...listingDetails,
                address: { ...listingDetails.address, street: e.target.value },
              });
            }}
          />
        </FormControl>
        <FormControl id="postalCode" isRequired>
          <FormLabel>Postal Code</FormLabel>
          <Input
            type="text"
            borderRadius={"full"}
            variant={"filled"}
            boxShadow="md"
            placeholder="Enter the postal code..."
            value={listingDetails.address.postalCode}
            onChange={(e) => {
              setListingDetails({
                ...listingDetails,
                address: {
                  ...listingDetails.address,
                  postalCode: e.target.value,
                },
              });
            }}
          />
        </FormControl>
      </Stack>
    </Stack>
  );
}
