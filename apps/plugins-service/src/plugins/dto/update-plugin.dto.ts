import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePluginDto {
  @IsNotEmpty()
  @IsString()
  readonly id: string;
  @IsNotEmpty()
  @IsString()
  readonly fileName: string;
}
