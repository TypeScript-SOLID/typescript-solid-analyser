import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost): void {
    super.catch(exception, host);
    const ctx = host.switchToWs();
    const client = ctx.getClient<WebSocket>();
    client.send(JSON.stringify({ event: 'error', data: exception.message }));
  }
}
