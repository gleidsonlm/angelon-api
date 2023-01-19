import { randomBytes } from 'node:crypto';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TestDocumentModule,
  closeInMongodConnection,
} from '../src/libs/mongoose/test-database.module';
import { UserModule } from '../src/users/users.module';
import { User, UserSchema } from '../src/users/schemas/user.schema';
import { CreateUserDto } from '../src/users/dtos/create-user.dto';
import { AuthModule } from '../src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../src/libs/passport/constants';

describe('Me E2E tests', () => {
  let app: INestApplication;

  const createUserDto = (): CreateUserDto => {
    return {
      email: `${randomBytes(8).toString('hex')}@angelon.app`,
      password: `${randomBytes(64).toString('hex')}`,
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
        AuthModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '300s' },
        }),
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

  it('POST /me creates an user', async () => {
    const data = createUserDto();
    const user = await request(app.getHttpServer()).post('/me').send(data);

    expect(user.body.userid).toBeDefined;
    expect(user.body.email).toBe(data.email);
    expect(user.status).toBe(201);
  });

  it('GET /me finds userself', async () => {
    const data = createUserDto();

    const userSaved = await request(app.getHttpServer()).post('/me').send(data);

    const login = await request(app.getHttpServer()).post('/auth/login').send({
      email: data.email,
      password: data.password,
    });
    const { access_token } = login.body;

    const user = await request(app.getHttpServer())
      .get('/me/')
      .set('Authorization', 'Bearer ' + access_token);

    expect(user.body.email).toBe(userSaved.body.email);
    expect(user.body.userid).toBe(userSaved.body.userid);
    expect(user.status).toBe(200);
  });

  it('PATCH /me updates userself', async () => {
    const data = createUserDto();

    const userSaved = await request(app.getHttpServer()).post('/me').send(data);

    const login = await request(app.getHttpServer()).post('/auth/login').send({
      email: data.email,
      password: data.password,
    });
    const { access_token } = login.body;

    const userUpdated = await request(app.getHttpServer())
      .patch('/me/')
      .set('Authorization', 'Bearer ' + access_token)
      .send({
        email: 'updated@angelon.app',
      });

    expect(userUpdated).toBeDefined;
    expect(userUpdated.body.userid).toBe(userSaved.body.userid);
    expect(userUpdated.body.email).toBe('updated@angelon.app');
    expect(userUpdated.status).toBe(200);
  });

  it('DELETE /me excludes userself', async () => {
    const data = createUserDto();

    await request(app.getHttpServer()).post('/me').send(data);

    const login = await request(app.getHttpServer()).post('/auth/login').send({
      email: data.email,
      password: data.password,
    });
    const { access_token } = login.body;

    const excludeAt = await request(app.getHttpServer())
      .delete('/me/', (error, response) => {
        expect(error).toBeNull();
        expect(response.status).toBe(200);
      })
      .set('Authorization', 'Bearer ' + access_token);

    expect(excludeAt.body).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    );
  });
});
