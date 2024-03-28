import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { ListingType, HomeType } from '@prisma/client';

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  image?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty()
  description: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @ApiProperty()
  address: CreateAddressDto;

  @IsNumber()
  @Min(1000)
  @Max(100000000)
  @ApiProperty()
  price: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  @ApiProperty()
  numOfBeds: number;

  @IsNumber()
  @IsPositive()
  @Max(100)
  @ApiProperty()
  numOfBaths: number;

  @IsNumber()
  @Min(1)
  @Max(10000)
  @ApiProperty()
  numOfMeterSquared: number;

  @IsEnum(HomeType, {
    message: 'homeType must be a valid home type (APARTMENT, HOUSE)',
  })
  @ApiProperty({ enum: HomeType, description: 'APARTMENT or HOUSE' })
  homeType: HomeType;

  @IsEnum(ListingType, {
    message: 'listingType must be a valid listing type (SALE, RENT)',
  })
  @ApiProperty({ enum: ListingType, description: 'SALE or RENT' })
  listingType: ListingType;
}
