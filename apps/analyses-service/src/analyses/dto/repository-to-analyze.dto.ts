import { IsNotEmpty, IsUrl } from 'class-validator';

export class RepositoryToAnalyzeDto {
  @IsNotEmpty()
  @IsUrl()
  readonly url: string;
}
