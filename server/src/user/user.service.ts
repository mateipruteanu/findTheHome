import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailAlreadyExistsException } from './exceptions/email-exists.exception';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { Messages } from 'src/messages/messages.enum';
import { ListingNotFoundException } from 'src/listing/exceptions/listing-not-found.exception';
import { CannotDeleteAccountException } from './exceptions/cannot-delete-account.exception';
import { CannotUpdateAccountException } from './exceptions/cannot-update-account.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user
      .create({
        data: createUserDto,
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new EmailAlreadyExistsException();
        }
        throw new InternalServerErrorException();
      })
      .then((data) => {
        return {
          ...data,
          password: undefined,
          message: Messages.UserCreated,
        };
      });
  }

  getAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    return this.prisma.user
      .findMany(params)
      .catch(() => {
        throw new InternalServerErrorException();
      })
      .then((data) => {
        return data.map((user) => {
          return {
            ...user,
            password: undefined,
          };
        });
      });
  }

  getOne(id: Prisma.UserWhereUniqueInput) {
    return this.prisma.user
      .findUniqueOrThrow({
        where: id,
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new UserNotFoundException();
        }
        throw new InternalServerErrorException();
      })
      .then((data) => {
        return {
          ...data,
          password: undefined,
          message: Messages.UserFound,
        };
      });
  }

  getByEmail(email: string) {
    return this.prisma.user
      .findUniqueOrThrow({
        where: {
          email: email,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new UserNotFoundException();
        }
        throw new InternalServerErrorException();
      })
      .then((data) => {
        return {
          ...data,
          message: Messages.UserFound,
        };
      });
  }

  async update(
    id: Prisma.UserWhereUniqueInput,
    userId: string,
    updateUserDto: UpdateUserDto,
  ) {
    const isUserAdmin = await this.isUserAdmin(userId);

    if (id.id !== userId && !isUserAdmin) {
      throw new CannotUpdateAccountException();
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.prisma.user
      .update({
        where: id,
        data: updateUserDto,
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new EmailAlreadyExistsException();
        }
        if (error.code === 'P2025') {
          throw new UserNotFoundException();
        }
        throw new InternalServerErrorException();
      })
      .then((data) => {
        return {
          ...data,
          password: undefined,
          message: Messages.UserUpdated,
        };
      });
  }

  async delete(id: Prisma.UserWhereUniqueInput, userId: string) {
    const isUserAdmin = await this.isUserAdmin(userId);

    if (id.id !== userId && !isUserAdmin) {
      throw new CannotDeleteAccountException();
    }

    return this.prisma.user
      .delete({
        where: id,
        include: {
          listings: true,
        },
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new UserNotFoundException();
        }
        throw new InternalServerErrorException(error);
      })
      .then((data) => {
        return {
          ...data,
          password: undefined,
          message: Messages.UserDeleted,
        };
      });
  }

  canUserModifyListing(userId: string, id: Prisma.ListingWhereUniqueInput) {
    return this.prisma.listing
      .findUnique({
        where: id,
        select: {
          postedBy: {
            select: {
              id: true,
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
      .then((data) => {
        return data.postedBy.id === userId;
      });
  }

  isUserAdmin(userId: string) {
    return this.prisma.user
      .findUnique({
        where: {
          id: userId,
        },
        select: {
          role: true,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      })
      .then((data) => {
        return data.role === 'ADMIN';
      });
  }
}
