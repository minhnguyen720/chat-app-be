import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/by-receiver')
  async getChatByUsername(
    @Query('username') username: string,
    @Query('receiver') receiver: string,
  ) {
    return this.chatService.getChatByUsername(username, receiver);
  }

  // @Post('/add-message')
  // createMessage(@Body() chat: Chat) {
  //   this.chatService.createMessage(chat);
  // }
}
