import { NestFactory } from '@nestjs/core';
import { VenueModule } from './venue.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(VenueModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'venue_queue',           
      queueOptions: { durable: true },
    },
  });

  await app.listen();
  console.log('Venue MS conectado ao RabbitMQ 🐇');
}
bootstrap();