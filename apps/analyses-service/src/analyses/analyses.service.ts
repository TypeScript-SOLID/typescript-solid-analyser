import { HttpService, Injectable } from '@nestjs/common';
import { PluginInstance } from '@tssa/common/interfaces';
import { cleanup } from '@tssa/common/utils';
import fs from 'fs';
import path from 'path';
import { dir } from 'tmp-promise';

import { AnalysisResultDto } from './dto/analysis-result.dto';
import { cloneRepo } from './utils/clone-repo.util';

@Injectable()
export class AnalysesService {
  constructor(private readonly httpService: HttpService) {}

  async performAnalysis(cloneUrl: string): Promise<AnalysisResultDto> {
    const response = await this.httpService
      .get<Record<string, unknown>[]>('http://localhost:3002/plugins/enabled')
      .toPromise();
    const instansiatedPlugins = await this.instantiatePlugins(response.data);
    const repoTmpDir = await dir();
    await cloneRepo(cloneUrl, repoTmpDir.path);
    const result = await this.executeTests(instansiatedPlugins, repoTmpDir.path);
    cleanup(repoTmpDir.path);
    console.log('result:', result);
    console.log('done');
    return new AnalysisResultDto(result);
  }

  private async instantiatePlugins(plugins: Record<string, unknown>[]): Promise<PluginInstance[]> {
    return Promise.all<PluginInstance>(
      plugins.map(async (plugin) => {
        const asdf = await this.httpService.get<string>(`http://localhost:3002/plugins/${plugin._id}`).toPromise();
        fs.writeFileSync(
          path.join('apps/analyses-service/tmp', plugin.name as string, plugin.main as string),
          asdf.data,
          { encoding: 'utf-8' },
        );
        return import(
          `C:/Users/JurekKiler/Desktop/typescript-solid-analyser/apps/analyses-service/tmp/${plugin.name}/${plugin.main}`
        );
      }),
    );
  }

  private async executeTests(plugins: PluginInstance[], pathToRepo: string): Promise<Record<string, unknown>[]> {
    return Promise.all<Record<string, unknown>>(plugins.map((plugin) => plugin.execute(pathToRepo)));
  }
}
