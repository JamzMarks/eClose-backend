// shared/rmq-client.factory.ts
import { ClientsModule, Transport } from '@nestjs/microservices';
/**
 * Creates a RabbitMQ client for communication between microservices.
 * 
 * @param name - The name of the client.
 * @param queue - The name of the RabbitMQ queue to connect to.
 * @returns A configured ClientsModule instance for RabbitMQ communication.
 */
export function createRmqClient(name: string, queue: string) {
  return ClientsModule.register([
    {
      name,
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
        queue,
        queueOptions: { durable: true },
      },
    }
  ]);
}