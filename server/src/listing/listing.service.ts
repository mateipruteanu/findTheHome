import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateListingDto } from './dto/update-listing.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { ListingNotFoundException } from './exceptions/listing-not-found.exception';
import { CreateListingDto } from './dto/create-listing.dto';
import { UserCantEditListingException } from 'src/user/exceptions/user-cant-edit-listing.exception';
import { UserCantDeleteListingException } from 'src/user/exceptions/user-cant-delete-listing.exception';
import Fuse from 'fuse.js';
import { PageNumberTooHighException } from './exceptions/page-number-high.exception';
import { PageNumberTooLowException } from './exceptions/page-number-low.exception';
import { Messages } from 'src/messages/messages.enum';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class ListingService {
  private readonly s3Client = new S3Client({ region: process.env.AWS_REGION });

  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(
    posterId: string,
    listing: CreateListingDto,
    file: Buffer,
    image_key: string,
  ) {
    const imageUrl = await this.uploadFile(image_key, file);

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
      image: imageUrl ? imageUrl : '',
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

  async uploadFile(key: string, file: Buffer) {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file,
      ACL: 'public-read',
    });

    await this.s3Client.send(command);
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return url;
  }

  async getAll(queryParams: any) {
    const { page, orderBy } = queryParams;

    if (page && parseInt(page) < 1) {
      throw new PageNumberTooLowException(page);
    }

    const where = await this.addToWhereQuery(queryParams);

    const totalListings = await this.prisma.listing.count({ where });
    const take = 5;
    const total_pages = Math.ceil(totalListings / take);

    if (page && parseInt(page) > total_pages && total_pages !== 0) {
      throw new PageNumberTooHighException(page, total_pages);
    }
    const skip = page ? (parseInt(page) - 1) * take : undefined;

    const current_page = page ? parseInt(page) : 1;
    let next_page = page ? current_page + 1 : 1;
    let previous_page = page ? current_page - 1 : 1;

    if (current_page === total_pages) {
      next_page = total_pages;
    }
    if (current_page === 1) {
      previous_page = 1;
    }

    return this.prisma.listing
      .findMany({
        include: {
          address: true,
          postedBy: true,
          savedBy: {
            select: { id: true },
          },
        },
        where,
        skip,
        take,
        orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      })
      .then((data) => {
        const listings = data.map((listing) => {
          return {
            ...listing,
            postedBy: {
              ...listing.postedBy,
              password: undefined,
            },
            numberOfSaves: listing.savedBy.length,
          };
        });
        return {
          listings,
          pagination: {
            previous_page,
            current_page,
            next_page,
            total_pages,
            records_on_page: listings.length,
            total_records: totalListings,
          },
        };
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

  async update(
    id: Prisma.ListingWhereUniqueInput,
    userId: string,
    updateListingDto: UpdateListingDto,
  ) {
    if (
      !(await this.userService.canUserModifyListing(userId, id)) &&
      !(await this.userService.isUserAdmin(userId))
    ) {
      throw new UserCantEditListingException();
    }

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

  async remove(id: Prisma.ListingWhereUniqueInput, userId: string) {
    const canUserModifyListing = await this.userService.canUserModifyListing(
      userId,
      id,
    );
    const isUserAdmin = await this.userService.isUserAdmin(userId);

    if (!canUserModifyListing && !isUserAdmin) {
      throw new UserCantDeleteListingException();
    }

    return this.prisma.listing
      .delete({ where: id })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new ListingNotFoundException();
        }
        throw new InternalServerErrorException(error);
      })
      .then((data) => {
        return data;
      });
  }

  async fuzzySearchCity(city: string): Promise<string> {
    const cities = await this.prisma.address.findMany({
      select: { city: true },
    });

    const options = {
      keys: ['city'],
    };

    const fuse = new Fuse(cities, options);
    const result = fuse.search(city);

    return result[0]?.item.city;
  }

  async saveListing(userId: string, listingId: string) {
    return this.prisma.user
      .update({
        where: {
          id: userId,
        },
        data: {
          savedListings: {
            connect: {
              id: listingId,
            },
          },
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new ListingNotFoundException();
        }
        throw new InternalServerErrorException();
      })
      .then(() => {
        return Messages.ListingSaved;
      });
  }

  async unsaveListing(userId: string, listingId: string) {
    return this.prisma.user
      .update({
        where: {
          id: userId,
        },
        data: {
          savedListings: {
            disconnect: {
              id: listingId,
            },
          },
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new ListingNotFoundException();
        }
        throw new InternalServerErrorException();
      })
      .then(() => {
        return Messages.ListingUnsaved;
      });
  }

  async addToWhereQuery(queryParams) {
    const {
      homeType,
      listingType,
      city,
      priceLowerThan,
      priceHigherThan,
      numOfBedsLowerThan,
      numOfBedsHigherThan,
      numOfBathsLowerThan,
      numOfBathsHigherThan,
      numOfMetersSquaredLowerThan,
      numOfMetersSquaredHigherThan,
      postalCode,
      posterId,
      savedBy,
    } = queryParams;

    const where = {};
    if (homeType) {
      where['homeType'] = homeType.toUpperCase();
    }
    if (listingType) {
      where['listingType'] = listingType.toUpperCase();
    }
    if (city) {
      const bestMatch = await this.fuzzySearchCity(city);
      if (bestMatch) {
        where['address'] = {
          city: bestMatch,
        };
      }
    }
    if (priceLowerThan) {
      where['price'] = {
        lte: parseInt(priceLowerThan),
      };
    }
    if (priceHigherThan) {
      where['price'] = {
        ...where['price'],
        gte: parseInt(priceHigherThan),
      };
    }
    if (posterId) {
      where['posterId'] = posterId;
    }
    if (savedBy) {
      where['savedBy'] = {
        some: {
          id: savedBy,
        },
      };
    }

    if (numOfBedsLowerThan) {
      where['numOfBeds'] = {
        lte: parseInt(numOfBedsLowerThan),
      };
    }

    if (numOfBedsHigherThan) {
      where['numOfBeds'] = {
        ...where['numOfBeds'],
        gte: parseInt(numOfBedsHigherThan),
      };
    }

    if (numOfBathsLowerThan) {
      where['numOfBaths'] = {
        lte: parseInt(numOfBathsLowerThan),
      };
    }

    if (numOfBathsHigherThan) {
      where['numOfBaths'] = {
        ...where['numOfBaths'],
        gte: parseInt(numOfBathsHigherThan),
      };
    }

    if (numOfMetersSquaredLowerThan) {
      where['numOfMeterSquared'] = {
        lte: parseInt(numOfMetersSquaredLowerThan),
      };
    }

    if (numOfMetersSquaredHigherThan) {
      where['numOfMeterSquared'] = {
        ...where['numOfMeterSquared'],
        gte: parseInt(numOfMetersSquaredHigherThan),
      };
    }

    if (postalCode) {
      where['address'] = {
        postalCode: postalCode,
      };
    }

    return where;
  }
}
