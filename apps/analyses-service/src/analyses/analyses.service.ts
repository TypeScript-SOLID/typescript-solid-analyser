import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PluginInstance } from '@tssa/common/interfaces';
import { cleanup } from '@tssa/common/utils';
import { writeFile } from '@tssa/common/utils/write-file.util';
import { Clone } from 'nodegit';
import path from 'path';
import { dir } from 'tmp-promise';

import { AnalysisResultDto } from './dto/analysis-result.dto';

@Injectable()
export class AnalysesService {
  private readonly tmpDir: string = this.configService.get<string>('TMP');

  constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

  async performAnalysis(cloneUrl: string): Promise<AnalysisResultDto> {
    const response = await this.httpService
      .get<Record<string, unknown>[]>('http://localhost:3002/plugins/enabled')
      .toPromise();
    const instansiatedPlugins = await this.instantiatePlugins(response.data);
    const repoTmpDir = await dir();
    await Clone.clone(cloneUrl, repoTmpDir.path);
    const result = await this.executeTests(instansiatedPlugins, repoTmpDir.path);
    cleanup(repoTmpDir.path);
    console.log('result:', result);
    console.log('done');
    return new AnalysisResultDto(result);
  }

  private async instantiatePlugins(plugins: Record<string, unknown>[]): Promise<PluginInstance[]> {
    return Promise.all<PluginInstance>(
      plugins.map(async (plugin) => {
        const pluginModule = await this.httpService
          .get<string>(`http://localhost:3002/plugins/${plugin._id}`)
          .toPromise();
        const resolvedPluginModulePath = path.resolve(this.tmpDir, plugin.name as string, plugin.main as string);
        writeFile(resolvedPluginModulePath, pluginModule.data);
        delete require.cache[require.resolve(resolvedPluginModulePath)];
        return import(resolvedPluginModulePath) as Promise<PluginInstance>;
      }),
    );
  }

  private async executeTests(plugins: PluginInstance[], pathToRepo: string): Promise<Record<string, unknown>[]> {
    return Promise.all<Record<string, unknown>>(plugins.map((plugin) => plugin.execute(pathToRepo)));
  }
}
