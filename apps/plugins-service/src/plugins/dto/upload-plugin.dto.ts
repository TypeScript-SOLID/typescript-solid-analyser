import { IsDataURI, IsNotEmpty, Matches } from 'class-validator';

export class UploadPluginDto {
  @IsDataURI()
  @IsNotEmpty()
  @Matches(/^data:application\/x-zip-compressed;base64.*$/)
  readonly dataUri: string;
}
