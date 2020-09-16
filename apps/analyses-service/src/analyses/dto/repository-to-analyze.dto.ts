import { IsNotEmpty, IsUrl } from 'class-validator';

export class RepositoryToAnalyzeDto {
  @IsNotEmpty()
  @IsUrl()
  readonly clone_url: string;
}
