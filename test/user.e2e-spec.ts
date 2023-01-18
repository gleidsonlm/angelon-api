import { randomBytes } from 'node:crypto';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TestDocumentModule,
  closeInMongodConnection,
} from '../src/libs/mongoose/test-database.module';
import { UserModule } from '../src/users/user.module';
import { User, UserSchema } from '../src/users/schemas/user.schema';
import { CreateUserDto } from '../src/users/dtos/create-user.dto';

describe('User E2E tests', () => {
  let app: INestApplication;

  const createUserDto = (): CreateUserDto => {
    return {
      email: `${randomBytes(8).toString('hex')}@angelon.app`,
      password: 'Password.42',
    };
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        UserModule,
        TestDocumentModule(),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });

  afterAll(async () => {
    await app.close();
    closeInMongodConnection();
  });

  it('POST /user creates an user', async () => {
    const data = createUserDto();
    const user = await request(app.getHttpServer()).post('/user').send(data);

    expect(user.body.userid).toBeDefined;
    expect(user.body.email).toBe(data.email);
    expect(user.status).toBe(201);
  });

  it(`GET /user finds many users`, async () => {
    const user = await request(app.getHttpServer())
      .post('/user')
      .send(createUserDto());

    const users = await request(app.getHttpServer()).get('/user');

    expect(users.body.length).toBe(1);
    expect(users.body[0].email).toBe(user.body.email);
    expect(users.body[0].userid).toBe(user.body.userid);
  });

  it(`GET /user/:id finds one user`, async () => {
    const userCreated = await request(app.getHttpServer())
      .post('/user')
      .send(createUserDto());

    const userFound = await request(app.getHttpServer()).get(
      `/user/${userCreated.body.userid}`,
    );

    expect(userFound.body.email).toBe(userCreated.body.email);
    expect(userFound.body.userid).toBe(userCreated.body.userid);
    expect(userFound.status).toBe(200);
  });

  it('PATCH /user/:id updates one user', async () => {
    const userCreated = await request(app.getHttpServer())
      .post('/user')
      .send(createUserDto());

    const userUpdated = await request(app.getHttpServer())
      .patch(`/user/${userCreated.body.userid}`)
      .send({ email: 'updated@angelon.app' });

    expect(userUpdated).toBeDefined;
    expect(userUpdated.body.userid).toBe(userCreated.body.userid);
    expect(userUpdated.body.email).toBe('updated@angelon.app');
    expect(userUpdated.status).toBe(200);
  });

  it('DELETE /user/:id excludes one user', async () => {
    const userCreated = await request(app.getHttpServer())
      .post('/user')
      .send(createUserDto());

    const userExcluded = await request(app.getHttpServer()).delete(
      `/user/${userCreated.body.userid}`,
      (error, response) => {
        expect(error).toBeNull();
        expect(response.status).toBe(200);
      },
    );

    const { excludeAt } = userExcluded.body;
    expect(excludeAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });
});
