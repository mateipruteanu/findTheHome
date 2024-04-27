import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/messages/error-messages.enum';

export class InvalidRoleException extends HttpException {
  constructor() {
    super(ErrorMessages.RoleInvalid, HttpStatus.BAD_REQUEST);
  }
}
