import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import morgan from 'morgan';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.set('trust proxy', 1);
  app.use(morgan('combined'));
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(configService.get<number>('PORT'));
  Logger.log(`Application is running on: ${await app.getUrl()}`);
};
bootstrap();
