import { ApiPropertyOptional } from '@nestjs/swagger';
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

export class UpdateListingDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  @IsOptional()
  @ApiPropertyOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  image?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsOptional()
  @ApiPropertyOptional()
  address?: CreateAddressDto;

  @IsNumber()
  @Min(1000)
  @IsOptional()
  @ApiPropertyOptional()
  price?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional()
  numOfBeds?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiPropertyOptional()
  numOfBaths?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  @ApiPropertyOptional()
  numOfMeterSquared?: number;
}
