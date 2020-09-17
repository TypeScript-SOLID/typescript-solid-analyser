import { Logger, OnApplicationBootstrap, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { AuthWsGuard } from '@tssa/common/guards';
import { Request } from 'express';
import { Server } from 'ws';

import { AnalysesService } from './analyses.service';
import { RepositoryToAnalyzeDto } from './dto';
import { WsExceptionFilter } from './filters';

interface WebSocket {
  _socket: Record<string, unknown>;
  req: Request;
}

@UseGuards(AuthWsGuard)
@UseFilters(WsExceptionFilter)
@UsePipes(new ValidationPipe({ transform: true }))
@WebSocketGateway()
export class AnalysesGateway implements OnApplicationBootstrap, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly analysesService: AnalysesService) {}

  onApplicationBootstrap() {
    this.server.on('connection', (ws: Record<string, unknown>, req) => {
      ws.req = req;
    });
  }

  handleConnection(client: WebSocket): void {
    Logger.log(`Client connected ${client._socket.remoteAddress}`);
  }
  handleDisconnect(client: WebSocket): void {
    Logger.log(`Client disconnected ${client._socket.remoteAddress}`);
  }

  @SubscribeMessage('perform_analysis')
  async handlePerformAnalysis(
    @ConnectedSocket() client: WebSocket,
    @MessageBody() repositoryToAnalyzeDto: RepositoryToAnalyzeDto,
  ): Promise<WsResponse> {
    const { access_token } = client.req;
    const { url } = repositoryToAnalyzeDto;
    return this.analysesService.performAnalysis(access_token, url);
  }
}
