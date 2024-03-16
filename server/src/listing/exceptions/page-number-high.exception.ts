import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from 'src/messages/error-messages.enum';

export class PageNumberTooHighException extends HttpException {
  constructor(page: number, total: number) {
    super(
      `${ErrorMessages.PageNumberTooHigh} (page: ${page}, total: ${total})`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
