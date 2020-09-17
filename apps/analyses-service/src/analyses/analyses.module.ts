import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from '@tssa/common';

import { AnalysesGateway } from './analyses.gateway';
import { AnalysesService } from './analyses.service';

@Module({
  imports: [CommonModule, HttpModule],
  providers: [AnalysesGateway, AnalysesService],
  exports: [AnalysesService],
})
export class AnalysesModule {}
