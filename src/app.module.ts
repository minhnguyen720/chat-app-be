import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat/entities/chat.entity';
import { User } from './entities/user.entity';
import { ChatModule } from './chat/chat.module';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'chat_app',
      entities: [Chat, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Chat, User]),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway, ChatService],
})
export class AppModule {}
