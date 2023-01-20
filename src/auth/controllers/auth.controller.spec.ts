import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { jwtConstants } from '../../libs/passport/constants';
import {
  closeInMongodConnection,
  TestDocumentModule,
} from '../../libs/mongoose/test-database.module';
import { User, UserSchema } from '../../users/schemas/user.schema';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../../users/services/users.service';

describe('AuthController', () => {
  let authController: AuthController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TestDocumentModule(),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '300s' },
        }),
      ],
      providers: [AuthService, UserService],
      controllers: [AuthController],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  afterEach(async () => {
    closeInMongodConnection;
  });

  afterAll(async () => {
    closeInMongodConnection;
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});
