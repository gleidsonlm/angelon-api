import { Global, Module } from '@nestjs/common';
import { UserService } from './services/users.service';
import { UserController } from './controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { User, UserSchema } from './schemas/user.schema';
import { MeController } from './controllers/me.controller';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController, MeController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
