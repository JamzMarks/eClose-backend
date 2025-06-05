import { NestFactory } from '@nestjs/core';
import { EventsModule } from './events.module';
import { GlobalRpcExceptionFilter } from '@app/common/filters/rpc-exception.filter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(EventsModule, {
    transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'], 
        queue: 'event_queue',
        queueOptions: { durable: true },
      },
    })

  app.useGlobalFilters(new GlobalRpcExceptionFilter());
  await app.listen();
  console.log('Event MS conectado ao RabbitMQ 🐇');
}
bootstrap();
