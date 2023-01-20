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
import { UserService } from '../services/users.service';
import { UserController } from './users.controller';

describe('User Controller Create', () => {
  let userController: UserController;
  let module: TestingModule;

  const createUserDto: CreateUserDto = {
    email: 'test@test.com',
    password: 'test',
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
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
      controllers: [UserController],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  afterEach(async () => {
    closeInMongodConnection;
  });

  afterAll(async () => {
    closeInMongodConnection;
  });

  it('should create an user', async () => {
    const user = await userController.create(createUserDto);

    expect(user).toMatchObject({
      userid: expect.any(String),
      email: createUserDto.email,
    });
  });

  it('should not duplicate an user', async () => {
    await userController.create(createUserDto);

    try {
      await userController.create(createUserDto);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });

  it('should not create an user with invalid email', async () => {
    //todo: fix CreateUserDto @IsEmail() decorator not working?
    try {
      const user = await userController.create({ email: 'test' });

      expect(user).toThrow(HttpException);
    } catch (error) {
      expect(error).toBeUndefined;
    }
  });
});

describe('User Controller Find', () => {
  let userController: UserController;
  let module: TestingModule;

  const createUserDto = (): CreateUserDto => {
    return {
      email: `${randomBytes(8).toString('hex')}@angelon.app`,
      password: 'Password.42',
    };
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
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
      controllers: [UserController],
    }).compile();
    userController = module.get<UserController>(UserController);
  });

  afterEach(async () => {
    closeInMongodConnection;
  });

  afterAll(async () => {
    closeInMongodConnection;
  });

  it('should find one user', async () => {
    const user = await userController.create(createUserDto());
    const foundUser = await userController.findOne(user.userid);

    expect(foundUser).toMatchObject({
      userid: user.userid,
      email: user.email,
    });
  });

  it('should find many users', async () => {
    const user = await userController.create(createUserDto());

    const users = await userController.find();

    expect(users).toMatchObject(
      expect.arrayContaining([
        expect.objectContaining({
          userid: expect.any(String),
          email: user.email,
        }),
      ]),
    );
  });

  it('should not find an inexistent user', async () => {
    try {
      await userController.findOne('test');
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
});

describe('User Controller Update', () => {
  let userController: UserController;
  let module: TestingModule;

  const createUserDto = (): CreateUserDto => {
    return {
      email: `${randomBytes(8).toString('hex')}@angelon.app`,
      password: 'Password.42',
    };
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
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
      controllers: [UserController],
    }).compile();
    userController = module.get<UserController>(UserController);
  });

  afterEach(async () => {
    closeInMongodConnection;
  });

  afterAll(async () => {
    closeInMongodConnection;
  });

  it('should update an user', async () => {
    const user = await userController.create(createUserDto());

    const updatedUser = await userController.patch(user.userid, {
      email: 'update1@angelon.app',
    });

    expect(updatedUser).toMatchObject({
      userid: user.userid,
      email: updatedUser.email,
    });
  });

  it('should not update an inexistent user', async () => {
    try {
      await userController.patch('userid', {
        email: 'update1@angelo.app',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
});

describe('User Controller Exclude', () => {
  let userController: UserController;
  let module: TestingModule;

  const createUserDto = (): CreateUserDto => {
    return {
      email: `${randomBytes(8).toString('hex')}@angelon.app`,
      password: 'Password.42',
    };
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
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
      controllers: [UserController],
    }).compile();
    userController = module.get<UserController>(UserController);
  });

  afterEach(async () => {
    closeInMongodConnection;
  });

  afterAll(async () => {
    closeInMongodConnection;
  });

  it('should exclude an user', async () => {
    const user = await userController.create(createUserDto());

    const excludedUser = await userController.exclude(user.userid);

    expect(excludedUser).toMatchObject({
      userid: user.userid,
      excludeAt: expect.any(Date),
    });
  });

  it('should not exclude an inexistent user', async () => {
    try {
      const user = await userController.exclude('userid');
      expect(user).toThrow(HttpException);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
    }
  });
});
