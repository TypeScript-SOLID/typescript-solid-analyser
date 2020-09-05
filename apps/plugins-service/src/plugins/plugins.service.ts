import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { cleanup, parsePackageJson } from '@tssa/common/utils';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { randomBytes } from 'crypto';
import extract from 'extract-zip';
import { Model } from 'mongoose';
import * as os from 'os';
import * as path from 'path';

import { UpdatePluginDto } from './dto/update-plugin.dto';
import {
  IncorrectPluginUploadException,
  InvalidPluginException,
  PluginAlreadyExistException,
  PluginDoesNotExistException,
} from './exceptions';
import { PluginsIdMismatchException } from './exceptions/plugins-id-mismatch.exception';
import { ExtractedPlugin } from './extracted-plugin';
import { Plugin, PluginInstance } from './interfaces';
import { fileExists, moveDir, writeFileFromBase64 } from './utils';

@Injectable()
export class PluginsService {
  private readonly pluginsPath: string;

  constructor(
    @InjectModel('Plugin') private readonly pluginModel: Model<Plugin>,
    private readonly configService: ConfigService,
  ) {
    this.pluginsPath = configService.get<string>('pluginsPath');
  }

  async findAll(): Promise<Plugin[]> {
    return this.pluginModel.find().sort({ name: 'asc' });
  }

  async upload(dataUri: string): Promise<string> {
    const pluginFileName = `${randomBytes(12).toString('hex')}.zip`;
    const pluginFilePath = path.join(os.tmpdir(), pluginFileName);
    await writeFileFromBase64(pluginFilePath, dataUri.split(',').pop());
    return pluginFileName;
  }

  async create(pluginFileName: string): Promise<Plugin> {
    const { pathToPluginZip, pathToExtractPlugin } = await this.getPaths(pluginFileName);
    const plugin: ExtractedPlugin = await this.extractZippedPlugin(pathToPluginZip, pathToExtractPlugin);
    if ((await this.pluginModel.findOne({ name: plugin.name })) !== null) {
      throw new PluginAlreadyExistException([pathToPluginZip, pathToExtractPlugin]);
    }
    const createdPlugin: Plugin = await new this.pluginModel(plugin).save();
    await moveDir(pathToExtractPlugin, path.join(this.pluginsPath, createdPlugin.name));
    cleanup(pathToPluginZip);
    return createdPlugin;
  }

  async update(updatePluginDto: UpdatePluginDto): Promise<Plugin> {
    const { pathToPluginZip, pathToExtractPlugin } = await this.getPaths(updatePluginDto.fileName);
    const extractedPlugin: ExtractedPlugin = await this.extractZippedPlugin(pathToPluginZip, pathToExtractPlugin);
    const pluginToUpdate: Plugin = await this.pluginModel
      .findById(updatePluginDto.id)
      .orFail(new PluginDoesNotExistException([pathToPluginZip, pathToExtractPlugin]));
    if (pluginToUpdate.get('_id', String) !== updatePluginDto.id) {
      throw new PluginsIdMismatchException([pathToPluginZip, pathToExtractPlugin]);
    }
    const updatedPlugin: Plugin = await pluginToUpdate.updateOne(extractedPlugin);
    await cleanup(path.join(this.pluginsPath, extractedPlugin.name));
    await moveDir(pathToExtractPlugin, path.join(this.pluginsPath, extractedPlugin.name));
    cleanup(pathToPluginZip);
    return updatedPlugin;
  }

  async delete(_id: string): Promise<void> {
    const deletedPlugin = await this.pluginModel.findOneAndDelete({ _id }).orFail(new PluginDoesNotExistException());
    cleanup(path.join(this.pluginsPath, deletedPlugin.name));
    return;
  }

  async setEnable(_id: string, is_enabled: boolean): Promise<void> {
    await this.pluginModel.findOneAndUpdate({ _id }, { is_enabled }).orFail(new PluginDoesNotExistException());
    return;
  }

  async loadEnabledPlugins(): Promise<PluginInstance[]> {
    const enabledPlugins = await this.pluginModel.find({ is_enabled: true }).sort({ name: 'asc' });
    return Promise.all<PluginInstance>(
      enabledPlugins.map(async (plugin) => {
        const pluginModulePath = path.join(this.pluginsPath, plugin.name, plugin.main);
        delete require.cache[require.resolve(pluginModulePath)];
        //TODO: ensure type
        const pluginInstance: PluginInstance = await import(pluginModulePath);
        return pluginInstance;
      }),
    );
  }

  private async getPaths(pluginZipName: string): Promise<{ pathToPluginZip: string; pathToExtractPlugin: string }> {
    const pathToPluginZip = path.join(os.tmpdir(), pluginZipName);
    if (!(await fileExists(pathToPluginZip))) throw new IncorrectPluginUploadException();
    const pathToExtractPlugin = pathToPluginZip.replace('.zip', '');
    return { pathToPluginZip, pathToExtractPlugin };
  }

  private async extractZippedPlugin(zippedFilePath: string, extractDestination: string): Promise<ExtractedPlugin> {
    await extract(zippedFilePath, { dir: extractDestination });
    const plugin = plainToClass(
      ExtractedPlugin,
      await parsePackageJson(path.join(extractDestination, 'package.json')),
      { excludeExtraneousValues: true },
    );
    try {
      await validateOrReject(plugin);
    } catch (errors) {
      throw new InvalidPluginException(errors, [zippedFilePath, extractDestination]);
    }
    return plugin;
  }
}
