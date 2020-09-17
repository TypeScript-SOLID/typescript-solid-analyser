import { HttpService, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { RepositoryDto } from './dto';

@Injectable()
export class RepositoriesService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(access_token: string): Promise<RepositoryDto[]> {
    const response = await this.httpService
      .get<Record<string, unknown>[]>('https://api.github.com/user/repos', {
        headers: { Authorization: `token ${access_token}` },
      })
      .toPromise();
    return response.data
      .filter((repo) => (repo.language as string)?.toLowerCase() === 'typescript')
      .map((repo) => plainToClass(RepositoryDto, repo, { strategy: 'excludeAll' }));
  }
}
