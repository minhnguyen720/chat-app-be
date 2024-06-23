import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ChatService } from './chat/chat.service';
import { Chat } from './chat/entities/chat.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly chatService: ChatService,
  ) {}

  createMessage(chat: Chat) {
    this.chatService.createMessage(chat);
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
    this.userRepository.save({ ...user, socketId: socketId });
  }
}
