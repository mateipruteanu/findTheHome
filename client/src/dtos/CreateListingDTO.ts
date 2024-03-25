export type CreateListingDTO = {
  title: string;
  image?: string;
  description: string;
  price: number;
  numOfBeds: number;
  numOfBaths: number;
  numOfMeterSquared: number;
  homeType: "HOUSE" | "APARTMENT";
  listingType: "RENT" | "SALE";
  address: {
    country: string;
    city: string;
    street: string;
    postalCode: string;
  };
};
