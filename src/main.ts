import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentModule } from './libs/database.module';

async function bootstrap() {
  // Instance the application with the Mongoose "Documento Module",
  // User Module is instanced within that.
  const app = await NestFactory.create(DocumentModule);

  // Validation Pipe provides us decorators like @IsEmail and others.
  // https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(
    new ValidationPipe({
      // Strips request from any unmapped proprieties.
      // If no other suitable decorator, use @Allow.
      whitelist: true,
      // Auto-transform payload objects into DTO types.
      transform: true,
    }),
  );

  // Instance app listener
  await app.listen(3000);
}
bootstrap();
