import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { csrfProtection } from '@tssa/common/middleware';
import cookieSession from 'cookie-session';
import csurf from 'csurf';
import morgan from 'morgan';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const cookieSessionSecret = configService.get<string>('COOKIE_SESSION_SECRET');
  app.set('trust proxy', 1);
  app.use(cookieSession({ name: 'SESSION', sameSite: 'lax', secret: cookieSessionSecret, secure: true }));
  app.use(morgan('combined'));
  app.use(csurf());
  app.use(csrfProtection);
  await app.listen(configService.get<number>('PORT'));
  Logger.log(`Application is running on: ${await app.getUrl()}`);
};
bootstrap();
