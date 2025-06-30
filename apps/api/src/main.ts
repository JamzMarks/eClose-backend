import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  // app.enableCors({
  //   origin: 'http://localhost:3001', // front
  //   credentials: true, // permitir cookies
  // });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, 
    transform: true,
    // exceptionFactory: (errors) => {
    //   const formattedErrors = errors.map((err) => ({
    //     field: err.property,
    //     messages: Object.values(err.constraints || {}),
    //   }));
    //   return new BadRequestException({
    //     message: 'Erro de validação',
    //     details: formattedErrors,
    //   });
    // }
  }));
  app.use(cookieParser())

  await app.listen(process.env.PORT || 3000);
  console.log('Gateway rodando na porta 3000 🚀');
}
bootstrap();