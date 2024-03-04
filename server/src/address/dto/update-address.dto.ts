import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsPostalCode,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  @ApiPropertyOptional()
  country: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  @ApiPropertyOptional()
  city: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @IsOptional()
  @ApiPropertyOptional()
  street: string;

  @IsString()
  @IsPostalCode('any')
  @IsOptional()
  @ApiPropertyOptional()
  postalCode: string;
}
