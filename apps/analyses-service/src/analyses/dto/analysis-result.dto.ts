import { WsResponse } from '@nestjs/websockets';

export class AnalysisResultDto implements WsResponse {
  event: string;
  data: Record<string, unknown>[];

  constructor(result: Record<string, unknown>[]) {
    this.event = 'analysis_result';
    this.data = result;
  }
}
