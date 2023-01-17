import { Request, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/libs/passport/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return request.user;
  }
}
