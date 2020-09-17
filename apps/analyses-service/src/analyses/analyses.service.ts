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
    const [instansiatedPlugins, pathToRepo] = await Promise.all<PluginInstance[], string>([
      this.getInstantiatedPlugins(),
      this.getPathToRepo(access_token, url),
    ]);
    const result = await this.executeTests(instansiatedPlugins, pathToRepo);
    cleanup(resolve(pathToRepo, '..'));
    return new AnalysisResultDto(result);
  }

  private async getPathToRepo(access_token: string, url: string): Promise<string> {
    const repoTmpDir = await dir();
    await writeFileFromStream(url, resolve(repoTmpDir.path, 'repo.zip'), access_token);
    await extract(resolve(repoTmpDir.path, 'repo.zip'), { dir: repoTmpDir.path });
    const extractedRepositoryDirectoryName = readdirSync(repoTmpDir.path, { withFileTypes: true }).find((file) =>
      file.isDirectory(),
    ).name;
    return resolve(repoTmpDir.path, extractedRepositoryDirectoryName);
  }

  private async getInstantiatedPlugins(): Promise<PluginInstance[]> {
    const response = await this.httpService.get<string[]>(`${this.PLUGINS_SERVICE_URL}/enabled`).toPromise();
    return Promise.all<PluginInstance>(
      response.data.map(
        (pluginBase64Encoded) => import(/* webpackIgnore: true */ `data:text/javascript;base64,${pluginBase64Encoded}`),
      ),
    );
  }

  private async executeTests(plugins: PluginInstance[], pathToRepo: string): Promise<Record<string, unknown>[]> {
    return Promise.all<Record<string, unknown>>(plugins.map((plugin) => plugin.execute(pathToRepo)));
  }
}
