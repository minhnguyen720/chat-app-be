import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AppService } from './app.service';
import { Server, Socket } from 'socket.io';
import { ChatDto } from './chat/dto/chat.dto';

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
    @MessageBody() payload: ChatDto,
  ): Promise<void> {
    try {
      const createMessagePromise = this.appService.createMessage(payload);
      const getReceiverByUsernamePromise =
        this.appService.getReceiverByUsername(payload.receiver);
      const [receiver, conversation] = await Promise.all([
        getReceiverByUsernamePromise,
        createMessagePromise,
      ]);
      if (
        receiver !== null &&
        receiver.socketId !== undefined &&
        receiver.socketId !== null &&
        receiver.online
      ) {
        const receiverSocketInstance = this.server.sockets.sockets.get(
          receiver.socketId,
        );
        if (receiverSocketInstance)
          receiverSocketInstance.emit('message', conversation);
      }
    } catch (error) {
      console.error(error);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Connected: ${client.id}`);
  }
}
