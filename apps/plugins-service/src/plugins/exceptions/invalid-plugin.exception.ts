import { HttpException, HttpStatus } from '@nestjs/common';
import { cleanup } from '@tssa/common/utils';
import { ValidationError } from 'class-validator';

export class InvalidPluginException extends HttpException {
  constructor(errors: ValidationError[], pathsToCleanUp: string[]) {
    super(
      {
        message: 'Invalid plugin',
        status: HttpStatus.BAD_REQUEST,
        details: errors.map((err) => {
          return { property: err.property, constraints: err.constraints };
        }),
      },
      HttpStatus.BAD_REQUEST,
    );

    pathsToCleanUp.forEach((path) => {
      cleanup(path);
    });
  }
}
