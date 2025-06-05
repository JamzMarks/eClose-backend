import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { RpcExceptionFilterToHttp } from './filters/rpc-exception-to-http.filter';
import { RpcErrorsInterceptor } from './interceptors/rpc-errors.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  app.useGlobalFilters(new RpcExceptionFilterToHttp())
  app.useGlobalInterceptors(new RpcErrorsInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
  console.log('Gateway rodando na porta 3000 🚀');
}
bootstrap();