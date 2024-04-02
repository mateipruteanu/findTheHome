import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @MaxLength(50)
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  @ApiProperty()
  confirmPassword: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  @ApiPropertyOptional()
  photo?: string;
}
