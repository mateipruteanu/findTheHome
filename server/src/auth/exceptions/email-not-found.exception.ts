import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/messages/error-messages.enum';

export class EmailNotFoundException extends HttpException {
  constructor() {
    super(ErrorMessages.EmailNotFound, HttpStatus.NOT_FOUND);
  }
}
