import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { UsersService } from './users.service';
import { Model } from 'mongoose';

const createUserDto = (): CreateUserDto => {
  const uuid = randomUUID() as string;
  const data = {
    email: `${uuid}@angelon.app`,
    password: 'Password.42',
    name: 'John Doe',
    mobile: '14155550132',
  };
  console.log(data);
  return data;
};

describe('Users Service Create', () => {
  let usersService: UsersService;
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

    usersService = module.get<UsersService>(UsersService);
    usersModel = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create a new user', async () => {
    const userDto = createUserDto();
    console.log(userDto);

    const jestResult = jest
      .spyOn(usersModel, 'create')
      .mockImplementationOnce(() => Promise.resolve(createUserDto()));

    console.log(jestResult, jestResult.mockReturnValue);
    expect(jestResult.mockResolvedValue).toBeInstanceOf(User);
  });

  // it('', async () => {
  //   expect.not.stringMatching('');
  // });

  // it('should create an user', async () => {
  //   const userData = factoryUserData();

  //   const user = usersService.create(userData);

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

/* describe('Users Service Update', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
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

describe('Users Service Find', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
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
