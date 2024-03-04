import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessages } from 'src/messages/error-messages.enum';
import { Messages } from 'src/messages/messages.enum';

@Controller('address')
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'All addresses' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  getAll() {
    return this.addressService.getAll({});
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: Messages.AddressFound })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.UserNotFound,
  })
  getOne(@Param('id') id: string) {
    return this.addressService.getOne({ id });
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: Messages.AddressUpdated })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessages.BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.AddressNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update({ id }, updateAddressDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: Messages.AddressDeleted })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.AddressNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  remove(@Param('id') id: string) {
    return this.addressService.remove({ id });
  }
}
