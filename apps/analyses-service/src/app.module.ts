import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';

import { AnalysesModule } from './analyses/analyses.module';

@Module({
  imports: [AnalysesModule, ConfigModule.forRoot({ isGlobal: true, load: [configuration] })],
})
export class AppModule {}
