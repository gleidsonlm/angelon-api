import { HttpException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { randomBytes } from 'node:crypto';
import {
  closeInMongodConnection,
  TestDocumentModule,
} from '../../libs/mongoose/test-database.module';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User, UserSchema } from '../schemas/user.schema';
import { UserService } from './users.service';

describe('User Service Create', () => {
  let userService: UserService;

  const createUserDto: CreateUserDto = {
    email: `${randomBytes(8).toString('hex')}@angelon.app`,
    password: `${randomBytes(8).toString('hex')}`,
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
    closeInMongodConnection();
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

  it('should not create user with invalid email', async () => {
    try {
      await userService.create({
        email: '',
        password: createUserDto.password,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });

  // After all tests described, close InMemory MongoDB connection
  afterAll(async () => {
    closeInMongodConnection();
  });
});

describe('User Service Find', () => {
  let userService: UserService;

  const createUserDto: CreateUserDto = {
    email: `${randomBytes(8).toString('hex')}@angelon.app`,
    password: `${randomBytes(8).toString('hex')}`,
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
    closeInMongodConnection();
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
    closeInMongodConnection();
  });
});

describe('User Service Update', () => {
  let userService: UserService;

  const createUserDto: CreateUserDto = {
    email: `${randomBytes(8).toString('hex')}@angelon.app`,
    password: `${randomBytes(8).toString('hex')}`,
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
    closeInMongodConnection();
  });

  afterAll(async () => {
    closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should update an user', async () => {
    const user = await userService.create(createUserDto);

    const updatedUser = await userService.patch(user.userid, {
      email: 'updated@angelon.app',
      password: 'password',
    });

    expect(updatedUser.email).not.toEqual(user.email);
  });

  it('should not update an inexistent user', async () => {
    try {
      await userService.patch(createUserDto.userid, {});
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
  // it('should be defined', () => {})
});

describe('User Service Patch', () => {
  let userService: UserService;

  const createUserDto: CreateUserDto = {
    email: `${randomBytes(8).toString('hex')}@angelon.app`,
    password: `${randomBytes(8).toString('hex')}`,
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
    closeInMongodConnection();
  });

  afterAll(async () => {
    closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should patch an user', async () => {
    const user = await userService.create(createUserDto);

    const patchedUserByEmail = await userService.patch(user.userid, {
      email: 'updated@angelon.app',
    });

    const patchedUserByPassword = await userService.patch(user.userid, {
      password: 'updatedPassword',
    });

    const patchedUserByBoth = await userService.patch(user.userid, {
      email: 'updatedAgain@angelon.app',
      password: null,
    });

    expect(patchedUserByEmail.email).not.toEqual(user.email);
    expect(patchedUserByPassword.email).not.toEqual(user.password);
    expect(patchedUserByBoth.email).not.toEqual(user.email);
    expect(patchedUserByBoth.email).not.toEqual(user.password);
  });

  // it('should toggle user as staff', async () => {
  //   const user = await userService.create(createUserDto);
  //   const staffed = await userService.staff(user.userid);
  //   expect(staffed.roles).toContainEqual({ enum: Role.Staff });
  // });
});

describe('User Service Exclude', () => {
  let userService: UserService;

  const createUserDto: CreateUserDto = {
    email: `${randomBytes(8).toString('hex')}@angelon.app`,
    password: `${randomBytes(8).toString('hex')}@angelon.app`,
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
    closeInMongodConnection();
  });

  afterAll(async () => {
    closeInMongodConnection();
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
