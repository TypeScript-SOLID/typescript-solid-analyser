import { HttpException, HttpService, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { CreateGithubUserDto } from '../users/dto/create-github-user.dto';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
  ) {}

  async githubLogin(code: string): Promise<{ access_token: string; user: UserDto }> {
    const access_token = await this.getGithubAccessToken(code);
    const githubUser = await this.getGithubUser(access_token);
    let user = await this.usersService.findOne(githubUser.login as string);
    if (user === null) {
      const email = await this.getGithubUsersPrimaryEmail(access_token);
      const createGithubUserDto = new CreateGithubUserDto(
        githubUser.login,
        email,
        githubUser.avatar_url,
        githubUser.repos_url,
      );
      user = await this.usersService.create(createGithubUserDto);
    }
    return { access_token, user: plainToClass(UserDto, user.toObject({ getters: true }), { strategy: 'excludeAll' }) };
  }

  private async getGithubAccessToken(code: string): Promise<string> {
    const response = await this.httpService
      .post<Record<string, string>>(
        'https://github.com/login/oauth/access_token',
        {
          client_id: this.configService.get<string>('CLIENT_ID'),
          client_secret: this.configService.get<string>('CLIENT_SECRET'),
          code,
        },
        {
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        },
      )
      .toPromise();
    const githubTokenResponse = response.data as Record<string, string>;
    if (githubTokenResponse.error) {
      Logger.error(githubTokenResponse.error_description + ' ' + githubTokenResponse.error_uri);
      throw new HttpException('Github connection issues occured', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return githubTokenResponse.access_token;
  }

  private async getGithubUser(access_token: string): Promise<Record<string, string>> {
    const response = await this.httpService
      .get<Record<string, string>>('https://api.github.com/user', {
        headers: { Authorization: `token ${access_token}` },
      })
      .toPromise();
    return response.data;
  }

  private async getGithubUsersPrimaryEmail(access_token: string): Promise<string> {
    const response = await this.httpService
      .get<Record<string, unknown>[]>('https://api.github.com/user/emails', {
        headers: { Authorization: `token ${access_token}` },
      })
      .toPromise();
    return response.data.filter(email => email.primary).shift().email as string;
  }
}
