import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return user;
    }
    throw new UnauthorizedException();
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.userid,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
