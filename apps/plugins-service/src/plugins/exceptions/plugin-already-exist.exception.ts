import { HttpException, HttpStatus } from '@nestjs/common';
import { cleanup } from '@tssa/common/utils';

export class PluginAlreadyExistException extends HttpException {
  constructor(directoriesToCleanup?: string[]) {
    super('Plugin already exist', HttpStatus.BAD_REQUEST);

    if (directoriesToCleanup) {
      directoriesToCleanup.forEach((directory) => {
        cleanup(directory);
      });
    }
  }
}
