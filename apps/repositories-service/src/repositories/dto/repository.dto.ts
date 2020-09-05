import { IsNotEmpty, IsString } from 'class-validator';

export class RepositoryDto {
  @IsNotEmpty()
  @IsString()
  private readonly id: number;
  @IsNotEmpty()
  @IsString()
  private readonly clone_url: string;
  @IsNotEmpty()
  @IsString()
  private readonly name: string;
  @IsNotEmpty()
  @IsString()
  private readonly full_name: string;

  constructor(id: number, clone_url: string, name: string, full_name: string) {
    this.id = id;
    this.clone_url = clone_url;
    this.name = name;
    this.full_name = full_name;
  }
}
