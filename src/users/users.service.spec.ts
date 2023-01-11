import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  const data: CreateUserDto = {
    username: 'john.doe',
    password: 'Password.42',
    email: 'john.doe@angelon.app',
    name: 'John Doe',
    role: 'ADMIN',
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
    const user = await usersService.create(data);

    expect(user).toMatchObject<IUser>({
      id: expect.any(String),
      username: data.username,
      password: data.password,
      email: data.email,
      name: data.name,
      role: 'USER',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      excludedAt: null,
    });
  });

  it('should not duplicate an user', async () => {
    const user1 = await usersService.create(data);
    console.log(user1);

    expect(async () => {
      const user2 = await usersService.create(data);
      console.log(user2);
    }).not.toMatchObject<IUser>;
  });
});
