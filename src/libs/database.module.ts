import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/modules/users/user.module';
import * as dotenv from 'dotenv';

// MongoDB URL connection is a enviroment paramenter.
// It requires a ".env" file in the project root folder.
dotenv.config();

@Module({
  imports: [
    // User Module for '/user/' route, allows self-service functions.
    // User can only create, find, update, exclude, userself.
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
  ],
})
export class DocumentModule {}
