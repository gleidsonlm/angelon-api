import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './libs/mongoose/database.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    // Mongoose using MongoDB Atlas and InMemory.
    DocumentModule,
    // Users module with CRUD resources.
    UserModule,
    // Passport with local and jwt strategies.
    AuthModule,
  ],
})
export class ApplicationModule {}
