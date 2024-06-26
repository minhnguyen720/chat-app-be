import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/contact-list/:username')
  async getContactList(@Param('username') username: string) {
    return await this.userService.getContactList(username);
  }
}
