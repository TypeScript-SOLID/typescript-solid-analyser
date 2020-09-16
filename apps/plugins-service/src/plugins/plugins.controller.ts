import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreatePluginDto } from './dto/create-plugin.dto';
import { UpdatePluginDto } from './dto/update-plugin.dto';
import { UploadPluginDto } from './dto/upload-plugin.dto';
import { Plugin } from './interfaces';
import { PluginsService } from './plugins.service';

@UsePipes(ValidationPipe)
@Controller('plugins')
export class PluginsController {
  constructor(private readonly pluginsService: PluginsService) {}

  @Get()
  private async findAll(): Promise<Plugin[]> {
    return this.pluginsService.findAll();
  }

  @Get('/enabled')
  private async findEnabled(): Promise<Plugin[]> {
    return this.pluginsService.findEnabled();
  }

  @Get('/:id')
  private async findOne(@Param('id') id: string): Promise<string> {
    const pluginBase64Encoded = await this.pluginsService.getPluginAsBase64ById(id);
    return pluginBase64Encoded;
  }

  @Post('/upload')
  private async upload(@Body() uploadPluginDto: UploadPluginDto): Promise<{ filename: string }> {
    const filename = await this.pluginsService.upload(uploadPluginDto.dataUri);
    return { filename };
  }

  @Post()
  private async create(@Body() createPluginDto: CreatePluginDto): Promise<Plugin> {
    return this.pluginsService.create(createPluginDto.filename);
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
    return this.pluginsService.setEnabled(id, true);
  }

  @Patch('/:id/disable')
  private async disable(@Param('id') id: string): Promise<void> {
    return this.pluginsService.setEnabled(id, false);
  }
}
