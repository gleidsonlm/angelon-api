import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  TestDocumentModule,
} from '../../libs/mongoose/test-database.module';
import { User, UserSchema } from '../../users/schemas/user.schema';
import { RolesService } from '../services/roles.service';
import { RolesController } from './roles.controller';

describe('RolesController', () => {
  let controller: RolesController;

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
      controllers: [RolesController],
      providers: [RolesService],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(async () => {
    closeInMongodConnection();
  });

  afterAll(async () => {
    closeInMongodConnection();
  });
});
