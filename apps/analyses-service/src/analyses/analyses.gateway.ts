import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';

import { AnalysesService } from './analyses.service';
import { RepositoryToAnalyzeDto } from './dto/repository-to-analyze.dto';
import { WsExceptionFilter } from './filters/ws-exception.filter';

interface WebSocket {
  _socket: Record<string, unknown>;
}

@UseFilters(new WsExceptionFilter())
@UsePipes(new ValidationPipe({ transform: true }))
@WebSocketGateway()
export class AnalysesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly analysesService: AnalysesService) {}

  handleConnection(client: WebSocket): void {
    Logger.log(`Client connected ${client._socket.remoteAddress}`);
  }
  handleDisconnect(client: WebSocket): void {
    Logger.log(`Client disconnected ${client._socket.remoteAddress}`);
  }

  @SubscribeMessage('perform_analysis')
  async handlePerformAnalysis(@MessageBody() repositoryToAnalyzeDto: RepositoryToAnalyzeDto): Promise<WsResponse> {
    return this.analysesService.performAnalysis(repositoryToAnalyzeDto.clone_url);
  }
}
