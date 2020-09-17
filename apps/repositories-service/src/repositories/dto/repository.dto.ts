import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class RepositoryDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  private readonly id: number;
  @Expose()
  @IsNotEmpty()
  @IsString()
  private readonly html_url: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  private readonly url: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  private readonly name: string;
  @Expose()
  @IsNotEmpty()
  @IsString()
  private readonly full_name: string;

  constructor(id: number, html_url: string, url: string, name: string, full_name: string) {
    this.id = id;
    this.html_url = html_url;
    this.url = url;
    this.name = name;
    this.full_name = full_name;
  }
}
