import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PluginInstance } from '@tssa/common/interfaces';
import { cleanup, writeFileFromStream } from '@tssa/common/utils';
import extract from 'extract-zip';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { dir } from 'tmp-promise';

import { AnalysisResultDto } from './dto';

@Injectable()
export class AnalysesService {
  private readonly PLUGINS_SERVICE_URL = this.configService.get<string>('PLUGINS_SERVICE_URL');

  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  async performAnalysis(access_token: string, url: string): Promise<AnalysisResultDto> {
    const response = await this.httpService
      .get<Record<string, unknown>[]>(`${this.PLUGINS_SERVICE_URL}/enabled`)
      .toPromise();
    const instansiatedPlugins = await this.instantiatePlugins(response.data);
    const repoTmpDir = await dir();
    await writeFileFromStream(url, resolve(repoTmpDir.path, 'repo.zip'), access_token);
    await extract(resolve(repoTmpDir.path, 'repo.zip'), { dir: repoTmpDir.path });
    const extractedRepositoryDirectoryName = readdirSync(repoTmpDir.path, { withFileTypes: true })
      .filter((file) => file.isDirectory())
      .pop().name;
    const pathToRepo = resolve(repoTmpDir.path, extractedRepositoryDirectoryName);
    const result = await this.executeTests(instansiatedPlugins, pathToRepo);
    cleanup(repoTmpDir.path);
    return new AnalysisResultDto(result);
  }

  private async instantiatePlugins(plugins: Record<string, unknown>[]): Promise<PluginInstance[]> {
    return Promise.all<PluginInstance>(
      plugins.map(async (plugin) => {
        const pluginModuleBase64Encoded = (
          await this.httpService.get<string>(`${this.PLUGINS_SERVICE_URL}/${plugin._id}`).toPromise()
        ).data;
        return import(/* webpackIgnore: true */ `data:text/javascript;base64,${pluginModuleBase64Encoded}`) as Promise<
          PluginInstance
        >;
      }),
    );
  }

  private async executeTests(plugins: PluginInstance[], pathToRepo: string): Promise<Record<string, unknown>[]> {
    return Promise.all<Record<string, unknown>>(plugins.map((plugin) => plugin.execute(pathToRepo)));
  }
}
