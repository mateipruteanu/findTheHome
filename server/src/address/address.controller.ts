import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('address')
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  getAll() {
    return this.addressService.getAll({});
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.addressService.getOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update({ id }, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove({ id });
  }
}
