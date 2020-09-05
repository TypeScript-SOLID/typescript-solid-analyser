import { Expose } from 'class-transformer';

export class UserDto {
  @Expose() readonly id: string;
  @Expose() readonly domain: string;
  @Expose() readonly login: string;
  @Expose() readonly email: string;
  @Expose() readonly avatar_url: string;
  @Expose() readonly repos_url: string;
}
