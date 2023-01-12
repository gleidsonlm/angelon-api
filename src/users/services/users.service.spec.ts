import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../interfaces/user.interface';
import { UsersService } from './users.service';

describe('Users Service Create', () => {
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
    const data = factoryUserData();

    const user = await usersService.create(data);

    expect(user).toMatchObject<IUser>({
      id: expect.any(String),
      email: data.email,
      password: data.password,
      name: data.name,
      mobile: data.mobile,
      role: 'USER',
      created: expect.any(Date),
      updated: null,
      excluded: null,
    });
  });

  it('should not duplicate an user', async () => {
    const data1 = factoryUserData();
    const user1 = await usersService.create(data1);
    console.log(user1);

    const data2 = factoryUserData();
    expect(async () => {
      const user2 = await usersService.create(data2);
      console.log(user2);
    }).not.toMatchObject<IUser>;
  });
});
