import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { Borrow } from '../../schemas/borrow/borrow.schema';
import { UserService } from '../../services/user/user.service';
import { BorrowService } from '../../services/borrow/borrow.service';
import { User } from '../../schemas/user/user.schema';
export interface PikkuKirjastoUser {
  userId: string;
  _id: string;
}

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly borrowService: BorrowService,
  ) {}

  @Get('/:userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.userService.getUserById(userId);
  }

  @Post('/create')
  async createUser(@Body() createUserDto: PikkuKirjastoUser): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get('/borrows/:userId')
  async getUsersBorros(@Param('userId') userId: string): Promise<Borrow[]> {
    const thisUser = await this.userService.getUserByDeviceId(userId);
    if (thisUser) {
      return this.borrowService.getBorrowedBookByUser(thisUser._id);
    }
  }
}
