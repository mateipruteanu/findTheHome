import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/messages/error-messages.enum';

export class AddressNotFoundException extends HttpException {
  constructor() {
    super(ErrorMessages.AddressNotFound, HttpStatus.NOT_FOUND);
  }
}
