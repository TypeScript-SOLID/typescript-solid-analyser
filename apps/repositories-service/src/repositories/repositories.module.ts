import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from '@tssa/common';

import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';

@Module({
  imports: [CommonModule, HttpModule],
  controllers: [RepositoriesController],
  providers: [RepositoriesService],
})
export class RepositoriesModule {}
