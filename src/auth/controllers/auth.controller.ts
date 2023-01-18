import { Request, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../../libs/passport/jwt.guard';
import { LocalAuthGuard } from '../../libs/passport/local.guard';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() request) {
    return request.user;
  }
}
