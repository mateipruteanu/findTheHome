import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

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
  @ApiProperty()
  price: number;

  @IsNumber()
  @Min(1)
  @ApiProperty()
  numOfBeds: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty()
  numOfBaths: number;

  @IsNumber()
  @Min(1)
  @ApiProperty()
  numOfMeterSquared: number;

  @IsString()
  @ApiProperty()
  posterId: string;
}
