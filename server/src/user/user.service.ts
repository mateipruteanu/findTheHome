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
import { WrongPasswordException } from './exceptions/wrong-password.exception';
import { PageNumberTooLowException } from 'src/listing/exceptions/page-number-low.exception';
import { PageNumberTooHighException } from 'src/listing/exceptions/page-number-high.exception';

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

  async getAll(queryParams: any) {
    const { page, orderBy } = queryParams;

    if (page && parseInt(page) < 1) {
      throw new PageNumberTooLowException(page);
    }

    const where = await this.addToWhereQuery(queryParams);

    const totalUsers = await this.prisma.user.count({ where });

    const take = 5;
    const total_pages = Math.ceil(totalUsers / take);

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

    return this.prisma.user
      .findMany({
        where,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          lastLogin: true,
          password: false,
          listings: {
            select: {
              id: true,
            },
          },
          savedListings: false,
        },
        skip,
        take,
        orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
      })
      .catch((error) => {
        if (error.code === 'P2025') {
          throw new UserNotFoundException();
        }
        console.log(error);
        throw new InternalServerErrorException(error);
      })
      .then((data) => {
        const users = data.map((user) => {
          return {
            ...user,
            password: undefined,
            numberOfListings: user.listings.length,
            listings: undefined,
          };
        });

        return {
          users: users,
          pagination: {
            previous_page,
            current_page,
            next_page,
            total_pages,
            records_on_page: users.length,
            total_records: totalUsers,
          },
        };
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

    const user = await this.prisma.user.findUnique({
      where: id,
      select: {
        password: true,
      },
    });

    if (!(await bcrypt.compare(updateUserDto.currentPassword, user.password))) {
      throw new WrongPasswordException();
    }

    if (id.id !== userId && !isUserAdmin) {
      throw new CannotUpdateAccountException();
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const data = { ...updateUserDto, currentPassword: undefined };

    return this.prisma.user
      .update({
        where: id,
        data: data,
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new EmailAlreadyExistsException();
        }
        if (error.code === 'P2025') {
          throw new UserNotFoundException();
        }
        throw new InternalServerErrorException('Error: ' + error.code);
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

  addToWhereQuery(queryParams: any) {
    const { email, role, firstName, lastName } = queryParams;
    let where = {};

    if (email) {
      where = {
        ...where,
        email: {
          contains: email,
          mode: 'insensitive',
        },
      };
    }

    if (role) {
      if (role.toUpperCase() === 'ADMIN' || role.toUpperCase() === 'USER') {
        where = {
          ...where,
          role: role.toUpperCase(),
        };
      }
    }

    if (firstName) {
      where = {
        ...where,
        firstName: {
          contains: firstName,
          mode: 'insensitive',
        },
      };
    }

    if (lastName) {
      where = {
        ...where,
        lastName: {
          contains: lastName,
          mode: 'insensitive',
        },
      };
    }

    return where;
  }
}
