import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/services/users.service';

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
      const { userid, email, role } = user;
      return { userid, email, role };
    }
    throw new UnauthorizedException();
  }

  async login(_user: any) {
    const user = {
      email: _user.email,
      sub: _user.userid,
      role: _user.role,
    };

    return {
      access_token: this.jwtService.sign(user),
      user,
    };
  }
}
