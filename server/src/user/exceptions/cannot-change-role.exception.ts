import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/messages/error-messages.enum';

export class CannotChangeRoleException extends HttpException {
  constructor() {
    super(ErrorMessages.CannotChangeUserRole, HttpStatus.FORBIDDEN);
  }
}
