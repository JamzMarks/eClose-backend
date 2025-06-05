
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const userClientProvider = {
  provide: 'USER_SERVICE',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: 'user_queue',
        queueOptions: {
          durable: true,
        },
      },
    });
  },
};