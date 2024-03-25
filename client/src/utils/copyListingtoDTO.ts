import { CreateListingDTO } from "@/dtos/CreateListingDTO";
import { Listing } from "@/entities/Listing";

export default function copyListingToDTO(listing: Listing): CreateListingDTO {
  return {
    title: listing.title,
    description: listing.description,
    price: listing.price,
    address: {
      country: listing.address.country,
      city: listing.address.city,
      street: listing.address.street,
      postalCode: listing.address.postalCode,
    },
    image: listing.image,
    homeType: listing.homeType,
    listingType: listing.listingType,
    numOfBaths: listing.numOfBaths,
    numOfBeds: listing.numOfBeds,
    numOfMeterSquared: listing.numOfMeterSquared,
  };
}
