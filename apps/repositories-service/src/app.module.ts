import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configuration } from '../config';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] }), RepositoriesModule],
})
export class AppModule {}
