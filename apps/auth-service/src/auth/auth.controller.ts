import { Body, Controller, Get, HttpCode, HttpException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@tssa/common/guards';
import { Request, Response } from 'express';

import { UserDto } from '../users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/github-signin')
  @HttpCode(200)
  private async githubSignin(@Req() req: Request, @Body('code') code: string): Promise<UserDto> {
    if (!code) throw new HttpException('Not authorized!', 401);
    const { access_token, user } = await this.authService.githubLogin(code);
    req.session = { jwt: this.jwtService.sign({ access_token, user }) };
    return user;
  }

  @Post('/signout')
  @HttpCode(200)
  private signout(@Req() req: Request): void {
    req.session = null;
    return;
  }

  @Get('/authorize-in-github')
  private authorizeInGithub(@Res() res: Response): void {
    const clientId = this.configService.get<string>('CLIENT_ID');
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email%20repo`);
  }

  @Get('/current-user')
  @UseGuards(AuthGuard)
  private currentUser(@Req() req: Request): UserDto {
    //TODO sync user data with github
    return req.user;
  }
}
