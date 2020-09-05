import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectPluginUploadException extends HttpException {
  constructor() {
    super('Plugin uploaded incorrectly', HttpStatus.BAD_REQUEST);
  }
}
