import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AppService } from './app.service';
import { Server, Socket } from 'socket.io';
import { Chat } from './chat/entities/chat.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  constructor(private appService: AppService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: Chat,
  ): Promise<void> {
    const createMessagePromise = this.appService.createMessage(payload);
    const getReceiverByUsernamePromise = this.appService.getReceiverByUsername(
      payload.receiver,
    );
    const [receiver] = await Promise.all([
      getReceiverByUsernamePromise,
      createMessagePromise,
    ]);
    this.server.sockets.sockets.get(receiver.socketId).emit('message', payload);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Connected: ${client.id}`);
  }
}
