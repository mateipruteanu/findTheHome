import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailAlreadyExistsException } from './exceptions/email-exists.exception';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { Messages } from 'src/messages/messages.enum';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(user: CreateUserDto) {
    console.log('service: ', user);
    return this.prisma.user
      .create({
        data: user,
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

  update(id: Prisma.UserWhereUniqueInput, data: UpdateUserDto) {
    return this.prisma.user
      .update({
        where: id,
        data,
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

  delete(id: Prisma.UserWhereUniqueInput) {
    return this.prisma.user
      .delete({
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
          message: Messages.UserDeleted,
        };
      });
  }
}
