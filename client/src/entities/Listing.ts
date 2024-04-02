import { Address } from "./Address";

export type Listing = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  estimatedPrice? : number | null;
  numOfBeds: number;
  numOfBaths: number;
  numOfMeterSquared: number;
  homeType: "APARTMENT" | "HOUSE";
  listingType: "RENT" | "SALE";
  address: Address;
  postedBy: {
    id: string;
    email: string;
    photo: string | null;
    firstName: string;
    lastName: string;
    role: "USER" | "ADMIN";
    lastLogin: string; // @TODO: could maybe use a date
  };
  postedAt: string; // @TODO: could maybe use a date
  posterId: string;
};
