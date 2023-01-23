import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      const passwordMatchs = await bcrypt.compare(password, user.password);
      if (passwordMatchs) {
        return user;
      } else {
        throw new UnauthorizedException();
      }
    }
    throw new UnauthorizedException();
  }

  async login(_user: any) {
    const user = {
      email: _user.email,
      sub: _user.userid,
      roles: _user.roles,
    };

    return {
      access_token: this.jwtService.sign(user),
      user,
    };
  }
}
