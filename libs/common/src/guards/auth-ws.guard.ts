import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { CommonService } from '../common.service';

@Injectable()
export class AuthWsGuard implements CanActivate {
  constructor(private readonly commonAuthService: CommonService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToWs().getClient().req as Request;
    return this.commonAuthService.validateWsRequest(req);
  }
}
