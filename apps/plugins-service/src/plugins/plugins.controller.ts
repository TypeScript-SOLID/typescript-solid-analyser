import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@tssa/common/guards';

import { CreatePluginDto } from './dto/create-plugin.dto';
import { UpdatePluginDto } from './dto/update-plugin.dto';
import { UploadPluginDto } from './dto/upload-plugin.dto';
import { Plugin } from './interfaces';
import { PluginsService } from './plugins.service';

@Controller('plugins')
@UseGuards(AuthGuard)
export class PluginsController {
  constructor(private readonly pluginsService: PluginsService) {}

  @Get()
  private async findAll(): Promise<Plugin[]> {
    return this.pluginsService.findAll();
  }

  @Post('/upload')
  private async upload(@Body() uploadPluginDto: UploadPluginDto): Promise<{ fileName: string }> {
    const fileName: string = await this.pluginsService.upload(uploadPluginDto.dataUri);
    return { fileName };
  }

  @Post()
  private async create(@Body() createPluginDto: CreatePluginDto): Promise<Plugin> {
    return this.pluginsService.create(createPluginDto.fileName);
  }

  @Put()
  private async update(@Body() updatePluginDto: UpdatePluginDto): Promise<Plugin> {
    return this.pluginsService.update(updatePluginDto);
  }

  @Delete('/:id')
  private async delete(@Param('id') id: string): Promise<void> {
    return this.pluginsService.delete(id);
  }

  @Patch('/:id/enable')
  private async enable(@Param('id') id: string): Promise<void> {
    return this.pluginsService.setEnable(id, true);
  }

  @Patch('/:id/disable')
  private async disable(@Param('id') id: string): Promise<void> {
    return this.pluginsService.setEnable(id, false);
  }
}
