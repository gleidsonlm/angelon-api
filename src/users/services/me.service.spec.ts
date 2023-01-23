import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  TestDocumentModule,
} from '../../libs/mongoose/test-database.module';
import { User, UserSchema } from '../schemas/user.schema';
import { MeService } from './me.service';

describe('MeService', () => {
  let service: MeService;

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
      providers: [MeService],
    }).compile();

    service = module.get<MeService>(MeService);
  });

  afterEach(async () => {
    closeInMongodConnection();
  });

  afterAll(async () => {
    closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
