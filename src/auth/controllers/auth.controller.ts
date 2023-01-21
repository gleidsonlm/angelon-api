import { Request, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../../libs/passport/jwt.guard';
import { LocalAuthGuard } from '../../libs/passport/local.guard';
import { Public } from '../../libs/passport/public.decorator';
import { Roles } from '../../roles/decorators/roles.decorator';
import { Role } from '../../users/interfaces/user.interface';
import { AuthService } from '../services/auth.service';

@Roles(Role.Guest)
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
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
