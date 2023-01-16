import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';

describe('User Service Create', () => {
  const userDTO: CreateUserDto = {
    email: 'test@angelo.app',
    password: 'Password.42',
  };
  let userService: UserService;
  let userController: UserController;

  beforeEach(async () => {
    const mockSave = jest.fn().mockResolvedValue(userDTO);

    const mockUserModel = {
      findOne: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ save: mockSave }),
      save: mockSave,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userController).toBeDefined();
  });
});
