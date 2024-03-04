import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreateListingEntity {
  title: string;
  image?: string;
  description: string;
  address: CreateAddressDto;
  price: number;
  numOfBeds: number;
  numOfBaths: number;
  numOfMeterSquared: number;
}
