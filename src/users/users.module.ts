import { Global, Module } from '@nestjs/common';
import { UserService } from './services/users.service';
import { UserController } from './controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { User, UserSchema } from './schemas/user.schema';
import { MeController } from './controllers/me.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../roles/guards/roles.guard';
import { JwtAuthGuard } from '../libs/passport/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../libs/passport/constants';
import { MeService } from './services/me.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [UserController, MeController],
  providers: [
    UserService,
    MeService,

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
