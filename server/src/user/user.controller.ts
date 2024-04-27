import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Messages } from 'src/messages/messages.enum';
import { ErrorMessages } from 'src/messages/error-messages.enum';
import { AuthGuard } from 'src/auth/auth.guard';

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
  getAll(@Query() query: any) {
    return this.userService.getAll(query);
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
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: Messages.UserUpdated })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: ErrorMessages.CannotUpdateAccount,
  })
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
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = req.user.sub;
    return this.userService.update({ id }, userId, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: Messages.UserDeleted })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ErrorMessages.UserNotFound,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: ErrorMessages.CannotDeleteAccount,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ErrorMessages.InternalServerError,
  })
  delete(@Request() req, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.userService.delete({ id }, userId);
  }
}
