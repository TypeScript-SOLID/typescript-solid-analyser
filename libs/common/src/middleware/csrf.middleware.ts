import { NextFunction, Request, Response } from 'express';

export function csrfProtection(req: Request, res: Response, next: NextFunction) {
  res.cookie('XSRF-TOKEN', req.csrfToken(), { secure: true });
  next();
}
