import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async auth(deviceId: string): Promise<any> {
    let user;
    user = await this.userService.getUserByDeviceId(deviceId);

    if (!user) {
      await this.userService.createUser({ userId: deviceId });
      user = {
        userId: deviceId,
      };
    }

    const payload = { sub: user.userId };
    const signedJwt = await this.jwtService.signAsync(payload);
    return {
      token: signedJwt,
    };
  }
}
