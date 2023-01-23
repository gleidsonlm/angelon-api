import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DocumentModule } from './libs/mongoose/database.module';
import { RolesModule } from './roles/roles.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    // Mongoose using MongoDB Atlas and InMemory.
    DocumentModule,
    // Passport with local and jwt strategies.
    AuthModule,
    // Users module with CRUD resources.
    UserModule,
    // RoleBasedAccessControl handling.
    RolesModule,
  ],
})
export class ApplicationModule {}
