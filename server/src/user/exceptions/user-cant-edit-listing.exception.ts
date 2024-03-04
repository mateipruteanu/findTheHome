import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/messages/error-messages.enum';

export class UserCantEditListingException extends HttpException {
  constructor() {
    super(ErrorMessages.UserCantEditListing, HttpStatus.FORBIDDEN);
  }
}
