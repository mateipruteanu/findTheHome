import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/messages/error-messages.enum';

export class EmailAlreadyExistsException extends HttpException {
  constructor() {
    super(ErrorMessages.EmailAlreadyExists, HttpStatus.BAD_REQUEST);
  }
}
