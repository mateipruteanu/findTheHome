import { Listing } from "@/entities/Listing";
import ListingCard from "./ListingCard";
import { Box } from "@chakra-ui/react";

export default function Listings() {
  const listings: Listing[] = [
    {
      id: "1",
      title: "Beautiful Central Apartment",
      description:
        "Central Irvine apartment: modern, convenient, great views, comfy, ideal location for urban living.",
      image: "https://dummyimage.com/600x400/c9c9c9/000",
      price: 1200000,
      estimatedPrice: 1450000,
      numOfBeds: 2,
      numOfBaths: 2,
      numOfMeterSquared: 150,
      homeType: "APARTMENT",
      listingType: "SALE",
      postedAt: "2024-03-04T13:52:36.311Z",
      posterId: "d76079bc-ad68-4884-a06c-41221691d6ae",
      address: {
        id: "cf73fb08-8f9e-4da1-ab9d-35a37a40f80b",
        country: "United States of America",
        city: "Irvine, CA",
        street: "3569 Alpaca Way",
        postalCode: "92614",
        listingId: "bad1f32c-7118-4c7f-8b58-bb682024619d",
      },
      postedBy: {
        id: "d76079bc-ad68-4884-a06c-41221691d6ae",
        email: "douglashernandez@gmail.com",
        photo: null,
        name: "Douglas Hernandez",
        role: "USER",
        lastLogin: "2024-03-04T13:44:21.833Z",
      },
    },
    {
      id: "2",
      title: "Charming San Francisco Apartment",
      image: "https://dummyimage.com/600x400/c9c9c9/000",
      description:
        "Cozy San Francisco apartment: historic charm, vibrant neighborhood, city skyline views, perfect urban oasis.",
      price: 800000,
      estimatedPrice: null,
      numOfBeds: 1,
      numOfBaths: 1,
      numOfMeterSquared: 75,
      homeType: "APARTMENT",
      listingType: "SALE",
      postedAt: "2024-03-04T13:57:32.912Z",
      posterId: "ba40047b-1f95-4c0f-b107-dde5d83df266",
      address: {
        id: "618782a5-7093-4b9b-ba6a-90117ce41120",
        country: "United States of America",
        city: "San Francisco, CA",
        street: "789 Lombard Street",
        postalCode: "94133",
        listingId: "03b85ee5-3021-4c7f-b90b-0c6790e27cc4",
      },
      postedBy: {
        id: "ba40047b-1f95-4c0f-b107-dde5d83df266",
        email: "heathergrady@gmail.com",
        photo: null,
        name: "Heather Grady",
        role: "USER",
        lastLogin: "2024-03-04T13:45:42.728Z",
      },
    },
    {
      id: "3",
      title: "Venice Beach House for Rent",
      image: "https://dummyimage.com/600x400/c9c9c9/000",
      description:
        "Inviting Venice Beach house: steps from the sand, relaxed vibe, ideal for coastal living.",
      price: 3000,
      estimatedPrice: null,
      numOfBeds: 2,
      numOfBaths: 1,
      numOfMeterSquared: 120,
      homeType: "HOUSE",
      listingType: "RENT",
      postedAt: "2024-03-08T08:36:13.146Z",
      posterId: "ba40047b-1f95-4c0f-b107-dde5d83df266",
      address: {
        id: "f1546a8c-0ba9-4745-bb4b-1795094b2f35",
        country: "United States of America",
        city: "Venice Beach, CA",
        street: "101 Oceanfront Walk",
        postalCode: "90291",
        listingId: "1817bd40-c9c7-4ca5-97a8-bf4b54cf1d75",
      },
      postedBy: {
        id: "ba40047b-1f95-4c0f-b107-dde5d83df266",
        email: "heathergrady@gmail.com",
        photo: null,
        name: "Heather Grady",
        role: "USER",
        lastLogin: "2024-03-04T13:45:42.728Z",
      },
    },
  ];

  return (
    <Box>
      {listings.map((listing) => (
        <Box key={listing.id}>
          <ListingCard listing={listing} />
        </Box>
      ))}
    </Box>
  );
}
