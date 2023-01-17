import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentModule } from './libs/database.module';

async function bootstrap() {
  // Nest Factory is the app interface to HTTP
  // If needed to access the used platform API, goes with type:
  // NestFactory.create<NestExpressApplication>(AppModule);
  const app = await NestFactory.create(
    // Instance the application with the Mongoose "Document Module",
    // User Module is instanced within that.
    DocumentModule,
  );

  // Validation Pipe provides us decorators like @IsEmail and others.
  // https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe());

  // Instance app listener
  await app.listen(3000);
}
bootstrap();
