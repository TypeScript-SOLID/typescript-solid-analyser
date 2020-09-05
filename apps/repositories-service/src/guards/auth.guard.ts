import { CanActivate, ExecutionContext, HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDto } from 'apps/auth-service/src/users/dto/user.dto';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';

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
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    if (req.session?.jwt) {
      try {
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        const { access_token, user } = jwt.verify(req.session.jwt, jwtSecret) as SessionPayload;
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
