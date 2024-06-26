import { Controller, Get, Param, Query } from '@nestjs/common';
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

  @Get('/latest-contact/:username')
  async getLatestContactList(@Param('username') username: string) {
    return await this.chatService.getLatestContactList(username);
  }
}
