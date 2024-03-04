import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/messages/error-messages.enum';

export class WrongPasswordException extends HttpException {
  constructor() {
    super(ErrorMessages.WrongPassword, HttpStatus.BAD_REQUEST);
  }
}
