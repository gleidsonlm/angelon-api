import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';

let usersService: UsersService;

const factoryUserData = (): CreateUserDto => {
  const userData = {
    email: `${randomUUID}@angelon.app`,
    password: 'Password.42',
    name: 'John Doe',
    mobile: '5583991446999',
  };
  return userData;
};

describe('Users Service Create', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create an user', async () => {
    const userData = factoryUserData();

    const user = usersService.create(userData);

    expect(user).toBeDefined;
  });
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
