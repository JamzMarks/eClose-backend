import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002,
    },
  });
  await app.listen();
  console.log('Auth MS rodando na porta 3002 🚀');
}
bootstrap();
