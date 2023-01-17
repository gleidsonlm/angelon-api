import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../libs/passport/local-auth.strategy';
import { AuthService } from './services/auth.service';
import { UserModule } from '../users/user.module';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
