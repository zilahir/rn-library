import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';

interface SignInDTO {
  deviceId: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.auth(signInDto.deviceId);
  }
}
