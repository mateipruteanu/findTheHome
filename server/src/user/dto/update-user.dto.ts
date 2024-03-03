import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsOptional()
  @ApiProperty()
  password?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  photo?: string;
}
