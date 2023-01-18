import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../libs/passport/local-auth.strategy';
import { AuthService } from './services/auth.service';
import { UserModule } from '../users/user.module';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../libs/passport/constants';
import { JwtStrategy } from '../libs/passport/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
