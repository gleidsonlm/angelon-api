import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './application.module';

declare const module: any;

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
  // Hot-Module Replacement
  // https://docs.nestjs.com/recipes/hot-reload#hot-module-replacement
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // Instance app listener
  await app.listen(3000);
}
bootstrap();
