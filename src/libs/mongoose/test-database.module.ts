import { MongooseModuleOptions, MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer: MongoMemoryServer;

/* InMemory MongoDB for testing
 * from https://dev.to/webeleon/unit-testing-nestjs-with-mongo-in-memory-54gd
 */

export const TestDocumentModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      // fix https://nodkz.github.io/mongodb-memory-server/docs/guides/migration/migrate7/#no-function-other-than-start-create-ensureinstance-will-be-starting-anything
      mongoMemoryServer = await MongoMemoryServer.create();
      const uri = mongoMemoryServer.getUri();
      return {
        uri,
        ...options,
      };
    },
  });

export const closeInMongodConnection = async () => {
  if (mongoMemoryServer) await mongoMemoryServer.stop();
};
