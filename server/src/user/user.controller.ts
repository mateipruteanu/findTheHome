import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Messages } from 'src/messages/messages.enum';
import { ErrorMessages } from 'src/messages/error-messages.enum';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: Messages.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessages.BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  create(@Body() createUserDTO: CreateUserDto) {
    return this.userService.create(createUserDTO);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'All users' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  getAll() {
    return this.userService.getAll({});
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: Messages.UserFound })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.UserNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  getOne(@Param('id') id: string) {
    return this.userService.getOne({ id });
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: Messages.UserUpdated })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessages.BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.UserNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update({ id }, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: Messages.UserDeleted })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.UserNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  delete(@Param('id') id: string) {
    return this.userService.delete({ id });
  }
}
