import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/messages/error-messages.enum';

export class CannotDeleteAccountException extends HttpException {
  constructor() {
    super(ErrorMessages.CannotDeleteAccountException, HttpStatus.FORBIDDEN);
  }
}
