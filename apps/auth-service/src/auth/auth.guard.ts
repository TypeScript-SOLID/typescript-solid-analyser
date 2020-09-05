import { CanActivate, ExecutionContext, HttpException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { UserDto } from '../users/dto/user.dto';

interface SessionPayload {
  readonly access_token: string;
  readonly user: UserDto;
}

declare module 'express' {
  interface Request {
    access_token: string;
    user: UserDto;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    if (req.session?.jwt) {
      try {
        const { access_token, user } = this.jwtService.verify(req.session.jwt) as SessionPayload;
        req.access_token = access_token;
        req.user = user;
        return true;
      } catch (err) {
        Logger.error(err.message, err.stack);
      }
    }
    throw new HttpException('Not authorized!', 401);
  }
}
