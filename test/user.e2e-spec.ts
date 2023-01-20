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

describe('User E2E tests', () => {
  let app: INestApplication;

  const data: CreateUserDto = {
    email: `${randomBytes(8).toString('hex')}@angelon.app`,
    password: `${randomBytes(24).toString('hex')}`,
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

  it('POST /users creates an user', async () => {
    const user = await request(app.getHttpServer()).post('/me').send(data);

    expect(user.body.userid).toBeDefined;
    expect(user.body.email).toBe(data.email);
    expect(user.status).toBe(201);
  });

  it(`GET /users finds many users`, async () => {
    const user = await request(app.getHttpServer()).post('/users').send(data);

    const login = await request(app.getHttpServer()).post('/auth/login').send({
      email: data.email,
      password: data.password,
    });
    const { access_token } = login.body;

    const users = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', 'Bearer ' + access_token);

    expect(users.body.length).toBe(1);
    expect(users.body[0].email).toBe(user.body.email);
    expect(users.body[0].userid).toBe(user.body.userid);
  });

  it(`GET /users/:userid finds one user`, async () => {
    const user = await request(app.getHttpServer()).post('/users').send(data);

    const login = await request(app.getHttpServer()).post('/auth/login').send({
      email: data.email,
      password: data.password,
    });
    const { access_token } = login.body;

    const userFound = await request(app.getHttpServer())
      .get('/users/' + user.body.userid)
      .set('Authorization', 'Bearer ' + access_token);

    expect(userFound.body.email).toBe(user.body.email);
    expect(userFound.body.userid).toBe(user.body.userid);
    expect(userFound.status).toBe(200);
  });

  it('PUT /users updates or creates an user', async () => {
    const user = await request(app.getHttpServer()).post('/users').send(data);

    expect(user.body.userid).toBeDefined;
    expect(user.body.email).toBe(data.email);
    expect(user.status).toBe(201);
  });

  it('PATCH /users/:userid updates one user', async () => {
    const user = await request(app.getHttpServer()).post('/users').send(data);

    const login = await request(app.getHttpServer()).post('/auth/login').send({
      email: data.email,
      password: data.password,
    });

    const updatedUser = await request(app.getHttpServer())
      .patch(`/users/${user.body.userid}`)
      .set('Authorization', `Bearer ${login.body.access_token}`)
      .send({
        email: 'updated@angelon.app',
      });

    expect(updatedUser.body.email).not.toEqual(user.body.email);
    expect(updatedUser.body.email).toEqual('updated@angelon.app');
  });

  it('DELETE /users/:userid excludes one user', async () => {
    await request(app.getHttpServer()).post('/users').send(data);

    const login = await request(app.getHttpServer()).post('/auth/login').send({
      email: data.email,
      password: data.password,
    });

    const excludeAt = await request(app.getHttpServer())
      .delete('/users/' + login.body.user.userid, (error, response) => {
        expect(error).toBeNull();
        expect(response.status).toBe(200);
      })
      .set('Authorization', 'Bearer ' + login.body.access_token);

    expect(excludeAt.body).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    );
  });
});
