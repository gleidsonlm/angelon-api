import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../schemas/user.schema';
import { UserService } from './user.service';
import { Model } from 'mongoose';

const createUserDto = () => {
  const uuid = randomUUID() as string;
  const data: CreateUserDto = {
    email: `${uuid}@angelon.app`,
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

  // it('', async () => {
  //   expect.not.stringMatching('');
  // });

  // it('should create an user', async () => {
  //   const userData = factoryUserData();

  //   const user = userModel.create(userData);

  //   expect(user).toBeDefined;
  //   console.log(user);
  // });
  /* 
  it('should not duplicate an user with same email', async () => {
    expect.not.stringMatching('');
  });

  it('should not create an user without valid email', async () => {
    expect.not.stringMatching('');
  }); */
});

/* describe('User Service Update', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userModel = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userModel).toBeDefined();
  });

  it('should update own user password & email', async () => {
    expect.not.stringMatching('');
  });

  it('should not update own user data, only password & email', async () => {
    expect.not.stringMatching('');
  });

  it('should not update own user email for an invalid address', async () => {
    expect.not.stringMatching('');
  });

  it('should not update own user password for weak one', async () => {
    expect.not.stringMatching('');
  });
});

describe('User Service Find', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userModel = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userModel).toBeDefined();
  });

  it('should be able to list all users', () => {
    expect.not.stringMatching('');
  });

  it('should be able to list up to 100 users', () => {
    expect.not.stringMatching('');
  });

  it('should be able to paginate the users list', () => {
    expect.not.stringMatching('');
  });

  it('should be able to query all users', () => {
    expect.not.stringMatching('');
  }); 
});*/
