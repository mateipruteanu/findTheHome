import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/messages/error-messages.enum';

export class ListingNotFoundException extends HttpException {
  constructor() {
    super(ErrorMessages.ListingNotFound, HttpStatus.NOT_FOUND);
  }
}
