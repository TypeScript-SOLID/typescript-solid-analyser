import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieSession from 'cookie-session';
import morgan from 'morgan';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const cookieSessionSecret = configService.get<string>('COOKIE_SESSION_SECRET');
  app.set('trust proxy', 1);
  app.enableCors();
  app.use(cookieSession({ name: 'SESSION', sameSite: 'lax', secret: cookieSessionSecret, secure: true }));
  app.use(morgan('common'));
  await app.listen(configService.get<number>('PORT'));
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
