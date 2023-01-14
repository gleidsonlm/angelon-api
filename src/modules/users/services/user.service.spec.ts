import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getRandomValues, randomBytes, randomFill, randomUUID } from 'crypto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../schemas/user.schema';
import { UserService } from './user.service';
import { Model } from 'mongoose';

const createUserDto = () => {
  const data: CreateUserDto = {
    email: `guest@angelon.app`,
    password: 'Password.42',
  };
  return data;
};

describe('User Service Create', () => {
  let userService: UserService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(createUserDto()),
            constructor: jest.fn().mockResolvedValue(createUserDto()),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(userModel).toBeDefined();
  });

  it('should create a new user', async () => {
    const userDto = createUserDto();

    jest.spyOn(userModel, 'create');
    const newUser = await userService.create(userDto);

    expect(newUser).toBeInstanceOf(User);
  });
});
