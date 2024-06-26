import { Body, Controller, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put('/auth')
  updateSocketId(@Body() payload) {
    this.appService.updateSocketId(payload.username, payload.socket);
  }

  @Put('/logout')
  logout(@Body() payload) {
    this.appService.logout(payload.username);
  }
}
