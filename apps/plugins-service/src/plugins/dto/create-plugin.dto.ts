import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePluginDto {
  @IsNotEmpty()
  @IsString()
  readonly fileName: string;
}
