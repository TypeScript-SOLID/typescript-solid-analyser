import { NextFunction, Request, Response } from 'express';

export function csrfProtection(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.cookie?.includes('XSRF-TOKEN')) {
    res.cookie('XSRF-TOKEN', req.csrfToken(), { secure: true });
  }
  next();
}
