import { ApiProperty } from '@nestjs/swagger';
import { IsPostalCode, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty()
  country: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty()
  city: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty()
  street: string;

  @IsString()
  @IsPostalCode('any')
  @ApiProperty()
  postalCode: string;
}
