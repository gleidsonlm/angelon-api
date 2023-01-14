import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { randomUUID } from 'node:crypto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const createUserDto = () => {
  const uuid = randomUUID() as string;
  const data: CreateUserDto = {
    email: `${uuid}@angelon.app`,
    password: 'Password.42',
  };
  return data;
};

describe('User Controller Create', () => {
  let userModel: UserService;
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

    userModel = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(userModel).toBeDefined();
  });
});
