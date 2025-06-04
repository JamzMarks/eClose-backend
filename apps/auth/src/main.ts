import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { GlobalRpcExceptionFilter } from '@app/common/filters/rpc-exception.filter';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'auth_queue',           
      queueOptions: { durable: true },
    },
  });

  app.useGlobalFilters(new GlobalRpcExceptionFilter());
  await app.listen();
  console.log('Auth MS conectado ao RabbitMQ 🐇');
}
bootstrap();
