import { HttpService, Injectable } from '@nestjs/common';

import { RepositoryDto } from './dto/repository.dto';

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
      .map(
        (repo) =>
          new RepositoryDto(repo.id as number, repo.clone_url as string, repo.name as string, repo.full_name as string),
      );
  }
}
