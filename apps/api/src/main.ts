import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { RpcErrorsInterceptor } from './interceptors/rpc-errors.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/api-response.interceptor';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { HttpAdapterHost } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  app.enableCors({
    origin: 'http://localhost:3001', // seu front
    credentials: true, // permitir cookies
  });

  // const httpAdapterHost = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new HttpExceptionFilter (httpAdapterHost));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new RpcErrorsInterceptor());
  // app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(cookieParser())
  await app.listen(process.env.PORT ?? 3000);
  console.log('Gateway rodando na porta 3000 🚀');
}
bootstrap();