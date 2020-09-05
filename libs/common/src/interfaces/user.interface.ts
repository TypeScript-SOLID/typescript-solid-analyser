export interface User {
  readonly id: string;
  readonly domain: string;
  readonly login: string;
  readonly email: string;
  readonly avatar_url: string;
  readonly repos_url: string;
}