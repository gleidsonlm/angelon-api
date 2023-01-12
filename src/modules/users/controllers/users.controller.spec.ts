import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { randomUUID } from 'node:crypto';
import { CreateUserDto } from '../dto/create-user.dto';
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

describe('Users Controller Create', () => {
  let usersDocument: UsersService;
  let usersModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
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

    usersDocument = module.get<UsersService>(UsersService);
    usersModel = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(usersDocument).toBeDefined();
  });
});
