import { HttpException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { randomBytes } from 'node:crypto';
import {
  closeInMongodConnection,
  TestDocumentModule,
} from '../../../libs/test-database.module';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User, UserSchema } from '../schemas/user.schema';
import { UserService } from './user.service';

describe('User Service Create', () => {
  let userService: UserService;

  const createUserDto: CreateUserDto = {
    email: `${randomBytes(8).toString('hex')}@angelon.app`,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestDocumentModule(),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    closeInMongodConnection;
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a new user', async () => {
    const user = await userService.create(createUserDto);

    expect(user).toMatchObject({
      userid: expect.any(String),
      email: createUserDto.email,
    });
  });

  it('should not duplicate an user', async () => {
    await userService.create(createUserDto);

    expect(async () => {
      try {
        await userService.create(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });

  it('should not create user without email', async () => {
    try {
      await userService.create({ email: '' });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });

  // After all tests described, close InMemory MongoDB connection
  afterAll(async () => {
    closeInMongodConnection;
  });
});

describe('User Service Find', () => {
  let userService: UserService;

  const createUserDto: CreateUserDto = {
    email: `${randomBytes(8).toString('hex')}@angelon.app`,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestDocumentModule(),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    closeInMongodConnection;
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should find one user', async () => {
    const userCreated = await userService.create(createUserDto);
    const userFound = await userService.findOne(userCreated.userid);

    expect(userFound).toMatchObject({
      userid: userCreated.userid,
      email: userCreated.email,
    });
  });

  it('should find many users', async () => {
    await userService.create(createUserDto);

    const users = await userService.find();
    expect(users).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          userid: expect.any(String),
          email: createUserDto.email,
        }),
      ]),
    );
  });

  it('should not find an inexistent user', async () => {
    try {
      await userService.findOne(createUserDto.userid);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });

  // After all tests described, close InMemory MongoDB connection
  afterAll(async () => {
    closeInMongodConnection;
  });
});

describe('User Service Update', () => {
  let userService: UserService;

  const createUserDto: CreateUserDto = {
    email: `${randomBytes(8).toString('hex')}@angelon.app`,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestDocumentModule(),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    closeInMongodConnection;
  });

  afterAll(async () => {
    closeInMongodConnection;
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should update an user', async () => {
    const user = await userService.create(createUserDto);

    const updatedUser = await userService.update(user.userid, {
      email: 'updated@angelon.app',
      password: 'password',
    });

    expect(updatedUser.email).not.toEqual(user.email);
  });

  it('should not update an inexistent user', async () => {
    try {
      await userService.update(createUserDto.userid, {});
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
  // it('should be defined', () => {})
});

describe('User Service Exclude', () => {
  let userService: UserService;

  const createUserDto: CreateUserDto = {
    email: `${randomBytes(8).toString('hex')}@angelon.app`,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestDocumentModule(),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterEach(async () => {
    closeInMongodConnection;
  });

  afterAll(async () => {
    closeInMongodConnection;
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should exclude an user', async () => {
    const user = await userService.create(createUserDto);

    const excludedUser = await userService.exclude(user.userid);

    expect(excludedUser).toMatchObject({
      userid: user.userid,
      excludeAt: expect.any(Date),
    });
  });

  it('should not exclude an inexistent user', async () => {
    try {
      await userService.exclude(createUserDto.userid);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
});
