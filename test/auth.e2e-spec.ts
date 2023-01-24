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
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../src/libs/passport/constants';
import { RolesModule } from '../src/roles/roles.module';

describe('Auth E2E tests', () => {
  let app: INestApplication;

  const createUserDto = (): CreateUserDto => {
    return {
      email: `${randomBytes(8).toString('hex')}@angelon.app`,
      password: `${randomBytes(8).toString('hex')}`,
    };
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TestDocumentModule(),
        MongooseModule.forFeature([
          {
            name: User.name,
            schema: UserSchema,
          },
        ]),
        UserModule,
        AuthModule,
        RolesModule,
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

  it(`GET /auth/login authenticates one user`, async () => {
    const data = createUserDto();

    const user = await request(app.getHttpServer()).post('/me').send(data);

    const login = await request(app.getHttpServer()).post('/auth/login').send({
      email: data.email,
      password: data.password,
    });
    expect(login.status).toBe(201);
    expect(login.body).toHaveProperty('access_token');
    expect(login.body).toHaveProperty('user');
    // decode token
    const jwtService: JwtService = await app.resolve(JwtService);
    const decoded = jwtService.decode(login.body.access_token);

    // test token
    expect(decoded).toHaveProperty('iat');
    expect(decoded).toHaveProperty('exp');
    expect(decoded.sub).toEqual(user.body.userid);
    expect(decoded).toMatchObject({
      email: user.body.email,
      sub: user.body.userid,
      roles: user.body.roles,
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it(`GET /profile returns user profile`, async () => {
    const data = createUserDto();

    await request(app.getHttpServer()).post('/me').send(data);

    const login = await request(app.getHttpServer()).post('/auth/login').send({
      email: data.email,
      password: data.password,
    });
    expect(login.status).toBe(201);
    expect(login.body).toHaveProperty('access_token');

    const profile = await request(app.getHttpServer())
      .get('/profile')
      .set('Authorization', `Bearer ${login.body.access_token}`);

    expect(profile.body.userid).toEqual(login.body.user.sub);
    expect(profile.body.email).toEqual(data.email);
  });
});
