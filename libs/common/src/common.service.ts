import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import cookieSession from 'cookie-session';
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
  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {}

  async validateWsRequest(req: Request): Promise<boolean> {
    const cookieSessionSecret = this.configService.get<string>('COOKIE_SESSION_SECRET');
    const session = cookieSession({ name: 'SESSION', sameSite: 'lax', secret: cookieSessionSecret, secure: true });
    return new Promise((resolve) => {
      session(req, {} as never, () => {
        resolve(this.validateRequest(req));
      });
    });
  }

  validateRequest(req: Request): boolean {
    if (!req.session?.jwt) throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
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
