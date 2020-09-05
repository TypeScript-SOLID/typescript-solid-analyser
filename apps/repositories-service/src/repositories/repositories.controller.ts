import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthGuard } from '../guards/auth.guard';
import { RepositoryDto } from './dto/repository.dto';
import { RepositoriesService } from './repositories.service';

@Controller('repositories')
@UseGuards(AuthGuard)
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get()
  async findAll(@Req() req: Request): Promise<RepositoryDto[]> {
    return this.repositoriesService.findAll(req.access_token);
  }
}
