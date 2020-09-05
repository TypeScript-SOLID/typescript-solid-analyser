import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { SessionPayload, User } from './interfaces';

declare module 'express' {
  interface Request {
    access_token: string;
    user: User;
  }
}

@Injectable()
export class CommonService {
  constructor(private readonly jwtService: JwtService) {}

  validateRequest(req: Request): boolean {
    if (!req.session?.jwt) return false;
    try {
      const { access_token, user } = this.jwtService.verify(req.session.jwt) as SessionPayload;
      req.access_token = access_token;
      req.user = user;
      return true;
    } catch (err) {
      Logger.error(err.message, err.stack);
      return false;
    }
  }
}
