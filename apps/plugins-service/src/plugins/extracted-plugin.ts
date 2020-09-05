import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsSemVer, IsString } from 'class-validator';

export class ExtractedPlugin {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  main: string;
  @Expose()
  @IsNotEmpty()
  @IsSemVer()
  @IsString()
  version: string;
  @Expose()
  @IsOptional()
  @IsString()
  description: string;
  @Expose()
  @IsOptional()
  @IsString()
  author: string;

  constructor(name: string, main: string, version: string, description?: string, author?: string) {
    this.name = name;
    this.main = main;
    this.version = version;
    this.description = description || '';
    this.author = author || '';
  }
}
