import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './users.module';
// import { GlobalRpcExceptionFilter } from '@app/common/filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], 
      queue: 'user_queue',
      queueOptions: { durable: true },
    },
  });

  // app.useGlobalFilters(new GlobalRpcExceptionFilter());
  await app.listen();
  console.log('User MS conectado ao RabbitMQ 🐇');
}
bootstrap();
