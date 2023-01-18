import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './application.module';
// import { RolesGuard } from './libs/roles/roles.guard';

async function bootstrap() {
  // Nest Factory is the app interface to HTTP
  // If needed to access the used platform API, goes with type:
  // NestFactory.create<NestExpressApplication>(AppModule);
  const app = await NestFactory.create(
    // Root module imports all needed for dependency injection.
    ApplicationModule,
  );

  // Validation Pipe provides us decorators like @IsEmail and others.
  // https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe());

  // Roles Guard check the role of the requester.
  // @Roles() decorator defines which role is allowed that resource.
  // app.useGlobalGuards(new RolesGuard(new Reflector()));

  // Instance app listener
  await app.listen(3000);
}
bootstrap();
