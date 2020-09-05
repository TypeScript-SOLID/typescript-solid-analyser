import { Expose } from 'class-transformer';

import { CreateUserDto } from './create-user.dto';

export class CreateGithubUserDto implements CreateUserDto {
  readonly domain: string;
  @Expose() readonly login: string;
  @Expose() readonly email: string;
  @Expose() readonly avatar_url: string;
  @Expose() readonly repos_url: string;

  constructor(login: string, email: string, avatar_url: string, repos_url: string) {
    this.domain = 'github.com';
    this.login = login;
    this.email = email;
    this.avatar_url = avatar_url;
    this.repos_url = repos_url;
  }
}
