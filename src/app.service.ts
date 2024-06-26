import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ChatService } from './chat/chat.service';
import { ChatDto } from './chat/dto/chat.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly chatService: ChatService,
  ) {}

  async createMessage(chat: ChatDto) {
    await this.chatService.createMessage(chat);
    return await this.chatService.getChatByUsername(chat.owner, chat.receiver);
  }

  async getReceiverByUsername(username: string) {
    const receiver = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    return receiver;
  }

  async updateSocketId(username: string, socketId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    this.userRepository.save({ ...user, socketId: socketId, online: true });
  }

  async logout(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    this.userRepository.save({ ...user, socketId: null, online: false });
  }
}
