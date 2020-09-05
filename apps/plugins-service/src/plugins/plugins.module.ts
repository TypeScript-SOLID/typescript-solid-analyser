import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '@tssa/common';

import { Plugin, PluginSchema } from './models/plugin.model';
import { PluginsController } from './plugins.controller';
import { PluginsService } from './plugins.service';

@Module({
  imports: [CommonModule, MongooseModule.forFeature([{ name: Plugin.name, schema: PluginSchema }])],
  controllers: [PluginsController],
  providers: [PluginsService],
  exports: [PluginsService],
})
export class PluginsModule {}
