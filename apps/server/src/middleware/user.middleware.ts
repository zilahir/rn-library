import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user/user.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}
  async use(request: Request, response: Response, next: NextFunction) {
    const user = await this.userService.getUserByDeviceId(request.body.user);
    if (user) {
      response.locals.user = user;
    }

    next();
  }
}
