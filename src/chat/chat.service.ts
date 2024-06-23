import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}

  async getChatByUsername(username: string, receiver: string) {
    return await this.chatRepository.find({
      where: [
        {
          owner: username,
          receiver: receiver,
        },
        {
          owner: receiver,
          receiver: username,
        },
      ],
      order: {
        createdDate: 'ASC',
      },
    });
  }

  createMessage(chat: Chat) {
    this.chatRepository.save(chat);
  }
}
