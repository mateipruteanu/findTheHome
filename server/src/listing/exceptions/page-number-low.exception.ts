import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/messages/error-messages.enum';

export class PageNumberTooLowException extends HttpException {
  constructor(page: number) {
    super(
      `${ErrorMessages.PageNumberTooLow} (page: ${page}, minimum:1)`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
