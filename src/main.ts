import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipes so DTOs (CreateUserDto, UpdateUserDto, etc.)
  // are validated using class-validator decorators (@IsString, @IsEmail, etc.)
  // with transformation: string query/param values are converted to the
  // declared TypeScript types (e.g., string -> number, etc.)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties not defined in the DTO
      forbidNonWhitelisted: true, // throws an error if extra properties are sent
      transform: true, // converts payloads to instances of the DTO classes
    }),
  );

  // Wrap every successful response in the standard ApiResponse<T> shape:
  //   { success: true, data, meta: { timestamp, path } }
  app.useGlobalInterceptors(new TransformInterceptor());

  // Convert every error to the standard ApiErrorResponse shape:
  //   { success: false, error: { code, message, details? }, meta: { timestamp, path, statusCode } }
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Barber Shop API')
    .setDescription('API for managing a barber salon')
    .setVersion('1.0')
    .addTag('users', 'User management')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(`🚀 Application running at: http://localhost:${port}`, 'Bootstrap');
  Logger.log(`📚 Swagger available at: http://localhost:${port}/api-docs`, 'Bootstrap');
}
void bootstrap();
