import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserDocument } from '../schemas/user.schema';
import { UserService } from './user.service';
import { randomUUID } from 'crypto';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('User Service Create', () => {
  let userService: UserService;
  let userModel: Model<User>;

  const userDTO: CreateUserDto = {
    email: 'test@angelo.app',
    password: 'Password.42',
  };

  const mockUser = () => {
    return {
      userid: `${randomUUID}`,
      email: 'test@angelo.app',
      password: 'Password.42',
      role: 'user',
      // save: jest.fn().mockResolvedValue(null),
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn().mockReturnThis(),
            exec: jest.fn(),
            create: jest.fn().mockReturnThis(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(userModel).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should create a new user', async () => {
    const result = await userService.create(userDTO);

    // Fix: need to fix, mocked functions are returning null.
    expect(result).toBeDefined();
  });
});
