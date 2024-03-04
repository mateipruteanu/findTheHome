import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/messages/error-messages.enum';

export class CannotUpdateAccountException extends HttpException {
  constructor() {
    super(ErrorMessages.CannotUpdateAccount, HttpStatus.FORBIDDEN);
  }
}
