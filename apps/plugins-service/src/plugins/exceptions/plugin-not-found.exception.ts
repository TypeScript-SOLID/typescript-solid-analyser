import { HttpException, HttpStatus } from '@nestjs/common';

export class PluginNotFoundException extends HttpException {
  constructor() {
    super('Not found!', HttpStatus.NOT_FOUND);
  }
}
