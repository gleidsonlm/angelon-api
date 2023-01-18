import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserSchema } from '../../users/schemas/user.schema';
import { UserService } from '../../users/services/users.service';
import { TestDocumentModule } from '../mongoose/test-database.module';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  // Placeholder for module to resolve userService
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestDocumentModule(),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(new JwtStrategy(userService)).toBeDefined();
  });
});
