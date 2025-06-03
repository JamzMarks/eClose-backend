import { NestFactory } from '@nestjs/core';
import { VenueModule } from './venue.module';

async function bootstrap() {
  const app = await NestFactory.create(VenueModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
