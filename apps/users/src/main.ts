import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './users.module';
import { RpcExceptionInterceptor } from '@app/common/filters/database/database-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://localhost:5672'],
  //     queue: 'user_queue',
  //     queueOptions: { durable: true },
  //   },
  // });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
        clientId: 'user-service',
      },
      consumer: {
        groupId: 'user-consumer-group',
      },
    },
  });
  app.useGlobalInterceptors(new RpcExceptionInterceptor());
  await app.startAllMicroservices();
  await app.listen(3004);
  console.log('User MS conectado ao RabbitMQ 🐇');
}
bootstrap();
