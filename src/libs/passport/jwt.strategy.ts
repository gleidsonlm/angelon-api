import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../users/services/users.service';
import { jwtConstants } from '../passport/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      //todo: implement public key for signing https://github.com/mikenicholson/passport-jwt#configure-strategy
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    // check if user has the required role
    if (user.role !== payload.role) {
      throw new UnauthorizedException();
    }
    return { userid: payload.sub, email: payload.email, role: payload.role };
  }
}
