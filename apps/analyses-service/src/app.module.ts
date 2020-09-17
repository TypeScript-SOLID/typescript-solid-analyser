import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AnalysesModule } from './analyses/analyses.module';
import { configuration } from './config';

@Module({
  imports: [AnalysesModule, ConfigModule.forRoot({ isGlobal: true, load: [configuration] })],
})
export class AppModule {}
