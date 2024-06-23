import { Body, Controller, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put('/auth')
  async updateSocketId(@Body() payload) {
    await this.appService.updateSocketId(payload.username, payload.socket);
  }
}
