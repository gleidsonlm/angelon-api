import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { DocumentModule } from '../libs/mongoose/database.module';

@Module({
  imports: [
    DocumentModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
