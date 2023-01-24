import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { randomBytes } from 'node:crypto';
import { AuthModule } from '../src/auth/auth.module';
import {
  TestDocumentModule,
  closeInMongodConnection,
} from '../src/libs/mongoose/test-database.module';
import { jwtConstants } from '../src/libs/passport/constants';
import { MockGuard } from '../src/libs/passport/mock.guard';
import { RolesGuard } from '../src/roles/guards/roles.guard';
import { CreateUserDto } from '../src/users/dtos/create-user.dto';
import { User, UserSchema } from '../src/users/schemas/user.schema';
import { UserModule } from '../src/users/users.module';
import { RolesModule } from '../src/roles/roles.module';

describe('Roles E2E tests', () => {
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
        RolesModule,
      ],
    })
      .overrideProvider(RolesGuard)
      .useClass(MockGuard)
      .compile();

    // Instantiate App
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    closeInMongodConnection();
  });

  it('should return all users role assingments', async () => {
    // factory the mock admin, role guard ignored.
    const data = createUserDto();
    // create the mock admin
    const admin = await request(app.getHttpServer()).post('/me').send(data);
    // jwt not ignored, fetch the access_token
    const { access_token } = (
      await request(app.getHttpServer()).post('/auth/login').send(data)
    ).body;
    // fetch the roles assignments list, considering only one user created
    const roles = await request(app.getHttpServer())
      .get('/roles')
      .set('Authorization', 'Bearer ' + access_token);
    // Expectations:
    // shall respond httpcode 200
    expect(roles.status).toBe(200);
    // shall respond all(=1) users created
    expect(roles.body[0].userid).toBe(admin.body.userid);
    // shall respond an array of objects. first entry is user created in test.
    expect(roles.body).toMatchObject([
      {
        userid: admin.body.userid,
        roles: { enum: 'guest' },
      },
    ]);
  });

  it('should return one user role assingments', async () => {
    // factory the mock user, role guard ignored.
    const data = createUserDto();
    // create the mock user
    const user = await request(app.getHttpServer()).post('/me').send(data);
    // jwt not ignored, fetch the access_token
    const { access_token } = (
      await request(app.getHttpServer()).post('/auth/login').send(data)
    ).body;
    // fetch the roles assignments list, considering only one user created
    const roles = await request(app.getHttpServer())
      .get('/roles/' + user.body.userid)
      .set('Authorization', 'Bearer ' + access_token);
    // shall respond httpcode 200
    expect(roles.status).toBe(200);
    // shall respond user roles
    expect(roles.body.userid).toBe(user.body.userid);
    // shall respond an array within an object.
    expect(roles.body).toMatchObject({
      userid: user.body.userid,
      roles: [{ enum: 'guest' }],
    });
  });

  it('should assign a role on user', async () => {
    // factory the mock user, role guard ignored.
    const data = createUserDto();
    // create the mock user
    const user = await request(app.getHttpServer()).post('/me').send(data);
    // jwt not ignored, fetch the access_token
    const { access_token } = (
      await request(app.getHttpServer()).post('/auth/login').send(data)
    ).body;
    const staff = await request(app.getHttpServer())
      .post('/roles')
      .send({
        userid: user.body.userid,
        role: 'staff',
      })
      .set({ Authorization: 'Bearer ' + access_token });
    /* Expectations */
    // shall respond httpcode 201
    expect(staff.status).toBe(201);
    // shall respond an array within an object.
    expect(staff.body).toMatchObject({
      userid: user.body.userid,
      roles: [
        expect.any(Object),
        expect.objectContaining({
          enum: 'staff',
        }),
      ],
    });
  });

  it('should remove a role on user', async () => {
    // factory the mock user, role guard ignored.
    const data = createUserDto();
    // create the mock user
    const user = await request(app.getHttpServer()).post('/me').send(data);
    // jwt not ignored, fetch the access_token
    const { access_token } = (
      await request(app.getHttpServer()).post('/auth/login').send(data)
    ).body;
    // add the role to be removed later
    await request(app.getHttpServer())
      .post('/roles')
      .send({
        userid: user.body.userid,
        role: 'staff',
      })
      .set({ Authorization: 'Bearer ' + access_token });
    // remove the role staff from the user
    const guest = await request(app.getHttpServer())
      .delete('/roles')
      .send({
        userid: user.body.userid,
        role: 'guest',
      })
      .set({ Authorization: 'Bearer ' + access_token });
    /* Expectations */
    // shall respond httpcode 200
    expect(guest.status).toBe(200);
    // shall respond an array within an object.
    expect(guest.body).toMatchObject({
      userid: user.body.userid,
      roles: [
        expect.any(Object),
        expect.not.objectContaining({
          enum: 'staff',
        }),
      ],
    });
  });
});
