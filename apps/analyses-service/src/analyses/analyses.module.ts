import { HttpModule, Module } from '@nestjs/common';

import { AnalysesGateway } from './analyses.gateway';
import { AnalysesService } from './analyses.service';

@Module({
  imports: [HttpModule],
  providers: [AnalysesGateway, AnalysesService],
  exports: [AnalysesService],
})
export class AnalysesModule {}
