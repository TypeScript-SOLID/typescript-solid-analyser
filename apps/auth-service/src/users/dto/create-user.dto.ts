export interface CreateUserDto {
  readonly domain: string;
  readonly login: string;
  readonly email: string;
  readonly avatar_url: string;
  readonly repos_url: string;
}
