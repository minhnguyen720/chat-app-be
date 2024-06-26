import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { User } from 'src/entities/user.entity';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getChatByUsername(username: string, receiver: string) {
    const result = await this.chatRepository.findOne({
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
    });
    if (!result) return undefined;
    else return result;
  }

  async getLatestContactList(username: string) {
    return await this.chatRepository.findOne({
      where: {
        owner: username,
      },
      select: {
        owner: true,
        receiver: true,
      },
    });
  }

  async createMessage(chat: ChatDto) {
    const targetChat = await this.chatRepository.findOne({
      where: {
        owner: chat.owner,
        receiver: chat.receiver,
      },
    });
    const newConversation = {
      status: 'sent',
      createdDate: chat.createdDate,
      content: chat.content,
    };

    if (targetChat === null) {
      await this.chatRepository.save({
        ...chat,
        conversation: [newConversation],
      });
    } else {
      targetChat.conversation.push(newConversation);
      await this.chatRepository.save(targetChat);
    }
  }
}
