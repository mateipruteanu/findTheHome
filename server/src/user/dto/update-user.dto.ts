import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  lastName: string;

  @IsEmail()
  @MaxLength(50)
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  @IsOptional()
  @ApiPropertyOptional()
  password?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional()
  photo?: string;
}
