import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/messages/error-messages.enum';

export class PasswordsDoNotMatchException extends HttpException {
  constructor() {
    super(ErrorMessages.PasswordsDontMatch, HttpStatus.BAD_REQUEST);
  }
}
