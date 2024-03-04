import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/messages/error-messages.enum';

export class UserCantDeleteListingException extends HttpException {
  constructor() {
    super(ErrorMessages.UserCantDeleteListing, HttpStatus.FORBIDDEN);
  }
}
