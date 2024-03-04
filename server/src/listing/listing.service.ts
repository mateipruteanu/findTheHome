import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateListingDto } from './dto/update-listing.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { CreateListingEntity } from './entity/create-listing.entity';
import { ListingNotFoundException } from './exceptions/listing-not-found.exception';

@Injectable()
export class ListingService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(posterId: string, listing: CreateListingEntity) {
    const listingData: Prisma.ListingCreateInput = {
      ...listing,
      postedBy: {
        connect: {
          id: posterId,
        },
      },
      address: {
        create: listing.address,
      },
      image: '',
    };

    return this.prisma.listing
      .create({
        data: listingData,
      })
      .catch(() => {
        throw new InternalServerErrorException();
      })
      .then((data) => {
        return data;
      });
  }

  getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ListingWhereUniqueInput;
    where?: Prisma.ListingWhereInput;
    orderBy?: Prisma.ListingOrderByWithRelationInput;
  }) {
    return this.prisma.listing
      .findMany({ ...params, include: { address: true, postedBy: true } })
      .catch(() => {
        throw new InternalServerErrorException();
      })
      .then((data) => {
        return data.map((listing) => {
          return {
            ...listing,
            postedBy: {
              ...listing.postedBy,
              password: undefined,
            },
          };
        });
      });
  }

  getOne(id: Prisma.ListingWhereUniqueInput) {
    return this.prisma.listing
      .findUniqueOrThrow({
        where: id,
        include: { address: true, postedBy: true },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new ListingNotFoundException();
        }
        throw new InternalServerErrorException();
      })
      .then((listing) => {
        return {
          ...listing,
          postedBy: {
            ...listing.postedBy,
            password: undefined,
          },
        };
      });
  }

  update(
    id: Prisma.ListingWhereUniqueInput,
    updateListingDto: UpdateListingDto,
  ) {
    const { address, ...listing } = updateListingDto;
    return this.prisma.listing
      .update({
        where: id,
        data: {
          ...listing,
          address: {
            update: address,
          },
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new ListingNotFoundException();
        }
        throw new InternalServerErrorException();
      })
      .then((data) => {
        return data;
      });
  }

  remove(id: Prisma.ListingWhereUniqueInput) {
    return this.prisma.listing
      .delete({ where: id })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new ListingNotFoundException();
        }
        // if (error.code === 'P2003') {
        //   throw new InternalServerErrorException(
        //     'Cannot delete a listing with existing bookings',
        //   );
        // }
        throw new InternalServerErrorException(error);
      })
      .then((data) => {
        return data;
      });
  }
}
