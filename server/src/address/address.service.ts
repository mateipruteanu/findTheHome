import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { Messages } from 'src/messages/messages.enum';
import { AddressNotFoundException } from './exceptions/address-not-found.exception';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AddressWhereUniqueInput;
    where?: Prisma.AddressWhereInput;
    orderBy?: Prisma.AddressOrderByWithRelationInput;
  }) {
    return this.prisma.address
      .findMany(params)
      .catch(() => {
        throw new InternalServerErrorException();
      })
      .then((data) => {
        return data;
      });
  }

  getOne(id: Prisma.AddressWhereUniqueInput) {
    return this.prisma.address
      .findUniqueOrThrow({
        where: id,
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new AddressNotFoundException();
        }
        throw new InternalServerErrorException();
      })
      .then((data) => {
        return {
          ...data,
          message: Messages.AddressFound,
        };
      });
  }

  update(
    id: Prisma.AddressWhereUniqueInput,
    updateAddressDto: UpdateAddressDto,
  ) {
    return this.prisma.address
      .update({
        where: id,
        data: updateAddressDto,
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new AddressNotFoundException();
        }
        throw new InternalServerErrorException();
      })
      .then((data) => {
        return {
          ...data,
          message: Messages.AddressUpdated,
        };
      });
  }

  remove(id: Prisma.AddressWhereUniqueInput) {
    return this.prisma.address
      .delete({ where: id })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new AddressNotFoundException();
        }
        throw new InternalServerErrorException();
      })
      .then((data) => {
        return {
          ...data,
          message: Messages.AddressDeleted,
        };
      });
  }
}
